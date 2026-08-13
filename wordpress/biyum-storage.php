<?php
/**
 * Plugin Name: Biyum Storage
 * Description: Almacenamiento de proyectos y configuración del sitio Biyum vía REST API (reemplaza Supabase).
 * Version: 1.0.0
 * Author: Biyum
 * License: GPL-2.0-or-later
 *
 * Expone endpoints en /wp-json/biyum/v1/:
 *   GET    /projects            Lista de proyectos
 *   GET    /projects/{id}       Proyecto por ID o slug
 *   POST   /projects            Crear proyecto (requiere token)
 *   PUT    /projects/{id}       Actualizar proyecto (requiere token)
 *   DELETE /projects/{id}       Eliminar proyecto (requiere token)
 *   GET    /config              Configuración del sitio (hero slides + categorías)
 *   PUT    /config              Guardar configuración (requiere token)
 *
 * El token se configura en Ajustes > Biyum Storage o mediante el filtro
 * 'biyum_api_token'. Debe enviarse en el header 'X-Biyum-Token'.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'BIYUM_NAMESPACE', 'biyum/v1' );

/* --------------------------------------------------------------------- *
 *  Activación / custom post type
 * --------------------------------------------------------------------- */

function biyum_register_post_type() {
	register_post_type( 'biyum_proyecto', array(
		'labels'       => array(
			'name'          => 'Proyectos',
			'singular_name' => 'Proyecto',
		),
		'public'       => false,
		'show_ui'      => false,
		'show_in_rest' => false,
		'supports'     => array( 'title', 'editor', 'page-attributes', 'custom-fields' ),
		'show_in_menu' => false,
		'rewrite'      => false,
	) );
}
add_action( 'init', 'biyum_register_post_type' );

function biyum_activate() {
	biyum_register_post_type();
	flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'biyum_activate' );

/* --------------------------------------------------------------------- *
 *  Token de autenticación
 * --------------------------------------------------------------------- */

function biyum_get_token() {
	$token = get_option( 'biyum_api_token', '' );
	return apply_filters( 'biyum_api_token', $token );
}

function biyum_check_write_auth() {
	$potential = array(
		isset( $_SERVER['HTTP_X_BIYUM_TOKEN'] ) ? $_SERVER['HTTP_X_BIYUM_TOKEN'] : '',
		isset( $_SERVER['HTTP_AUTHORIZATION'] ) ? $_SERVER['HTTP_AUTHORIZATION'] : '',
	);
	$sent      = '';
	foreach ( $potential as $candidate ) {
		if ( is_string( $candidate ) && $candidate ) {
			$sent = $candidate;
			break;
		}
	}
	$expected = biyum_get_token();
	if ( '' === $expected || $sent !== $expected ) {
		return new WP_Error( 'biyum_unauthorized', 'No autorizado', array( 'status' => 401 ) );
	}
	return true;
}

/* --------------------------------------------------------------------- *
 *  Conversión proyecto <-> JSON
 * --------------------------------------------------------------------- */

function biyum_project_to_array( $post ) {
	$data = get_post_meta( $post->ID, '_biyum_data', true );
	if ( ! is_array( $data ) ) {
		$data = array();
	}
	$images = isset( $data['images'] ) && is_array( $data['images'] ) ? $data['images'] : array();
	$defaults = array(
		'id'              => (string) $post->ID,
		'title'           => $post->post_title,
		'slug'            => $post->post_name,
		'description'     => $post->post_content,
		'category'        => '',
		'cover_image_url' => '',
		'cover_image_id'  => null,
		'images'          => array(),
		'video_url'       => null,
		'client'          => null,
		'year'            => null,
		'services'        => array(),
		'featured'        => false,
		'order_index'     => (int) $post->menu_order,
		'created_at'      => $post->post_date_gmt,
		'updated_at'      => $post->post_modified_gmt,
	);

	$out = wp_parse_args( $data, $defaults );
	$out['id']          = (string) $post->ID;
	$out['title']       = $post->post_title;
	$out['slug']        = $post->post_name;
	$out['description'] = isset( $data['description'] ) ? $data['description'] : $post->post_content;
	$out['order_index'] = (int) $post->menu_order;
	$out['images']      = biyum_normalize_images( $images );
	$out['featured']    = ! empty( $out['featured'] );
	$out['services']    = is_array( $out['services'] ) ? array_values( $out['services'] ) : array();
	$out['cover_image_id'] = null !== $out['cover_image_id'] ? (int) $out['cover_image_id'] : null;

	return $out;
}

function biyum_normalize_images( $images ) {
	$out = array();
	if ( ! is_array( $images ) ) {
		return $out;
	}
	foreach ( $images as $img ) {
		if ( ! is_array( $img ) ) {
			continue;
		}
		$out[] = array(
			'id'     => isset( $img['id'] ) ? (int) $img['id'] : 0,
			'url'    => isset( $img['url'] ) ? $img['url'] : '',
			'thumb'  => isset( $img['thumb'] ) ? $img['thumb'] : ( isset( $img['url'] ) ? $img['url'] : '' ),
			'medium' => isset( $img['medium'] ) ? $img['medium'] : '',
			'alt'    => isset( $img['alt'] ) ? $img['alt'] : '',
			'width'  => isset( $img['width'] ) ? (int) $img['width'] : 0,
			'height' => isset( $img['height'] ) ? (int) $img['height'] : 0,
		);
	}
	return $out;
}

function biyum_sanitize_project_input( $body ) {
	if ( ! is_array( $body ) ) {
		return new WP_Error( 'biyum_invalid', 'Cuerpo no válido', array( 'status' => 400 ) );
	}

	$images = isset( $body['images'] ) && is_array( $body['images'] ) ? biyum_normalize_images( $body['images'] ) : array();

	return array(
		'title'           => isset( $body['title'] ) ? sanitize_text_field( $body['title'] ) : '',
		'description'     => isset( $body['description'] ) ? wp_kses_post( $body['description'] ) : '',
		'category'        => isset( $body['category'] ) ? sanitize_text_field( $body['category'] ) : '',
		'cover_image_url' => isset( $body['cover_image_url'] ) ? esc_url_raw( $body['cover_image_url'] ) : '',
		'cover_image_id'  => isset( $body['cover_image_id'] ) && null !== $body['cover_image_id'] ? (int) $body['cover_image_id'] : null,
		'images'          => $images,
		'video_url'       => isset( $body['video_url'] ) && $body['video_url'] ? esc_url_raw( $body['video_url'] ) : null,
		'client'          => isset( $body['client'] ) && $body['client'] ? sanitize_text_field( $body['client'] ) : null,
		'year'            => isset( $body['year'] ) && $body['year'] ? sanitize_text_field( $body['year'] ) : null,
		'services'        => isset( $body['services'] ) && is_array( $body['services'] )
			? array_values( array_map( 'sanitize_text_field', $body['services'] ) ) : array(),
		'featured'        => ! empty( $body['featured'] ),
		'order_index'     => isset( $body['order_index'] ) ? (int) $body['order_index'] : 0,
	);
}

function biyum_build_slug( $title, $existing_id = 0 ) {
	$slug = sanitize_title( $title );
	if ( ! $slug ) {
		$slug = 'proyecto-' . wp_generate_password( 6, false );
	}
	$args = array(
		'name'        => $slug,
		'post_type'   => 'biyum_proyecto',
		'numberposts' => 1,
		'post_status' => 'any',
	);
	if ( $existing_id ) {
		$args['exclude'] = array( (int) $existing_id );
	}
	$existing = get_posts( $args );
	$base     = $slug;
	$n        = 2;
	while ( $existing ) {
		$slug     = $base . '-' . $n;
		$n++;
		$args['name']        = $slug;
		$args['numberposts'] = 1;
		$existing = get_posts( $args );
	}
	return $slug;
}

function biyum_save_project( $body, $post_id = 0 ) {
	$clean = biyum_sanitize_project_input( $body );
	if ( is_wp_error( $clean ) ) {
		return $clean;
	}
	if ( '' === $clean['title'] ) {
		return new WP_Error( 'biyum_missing_title', 'El título es obligatorio', array( 'status' => 400 ) );
	}

	$slug         = $post_id ? sanitize_title( get_post_field( 'post_name', $post_id ) ) : '';
	if ( ! $slug ) {
		$slug = biyum_build_slug( $clean['title'], $post_id );
	}

	$post_args = array(
		'post_type'   => 'biyum_proyecto',
		'post_title'  => $clean['title'],
		'post_name'   => $slug,
		'post_status' => 'publish',
		'menu_order'  => $clean['order_index'],
	);

	if ( $post_id ) {
		$post_args['ID'] = (int) $post_id;
		$result = wp_update_post( $post_args, true );
	} else {
		$result = wp_insert_post( $post_args, true );
	}

	if ( is_wp_error( $result ) ) {
		return $result;
	}

	update_post_meta( $result, '_biyum_data', $clean );

	$post = get_post( $result );
	return array( 'project' => biyum_project_to_array( $post ) );
}

/* --------------------------------------------------------------------- *
 *  Configuración del sitio
 * --------------------------------------------------------------------- */

function biyum_get_config() {
	$stored = get_option( 'biyum_site_config', array() );
	if ( ! is_array( $stored ) ) {
		$stored = array();
	}
	$defaults = array(
		'hero_slides' => array(),
		'categories'  => array(),
	);
	$stored = wp_parse_args( $stored, $defaults );
	$stored['hero_slides'] = is_array( $stored['hero_slides'] ) ? array_values( $stored['hero_slides'] ) : array();
	$stored['categories']  = is_array( $stored['categories'] ) ? array_values( $stored['categories'] ) : array();
	return $stored;
}

function biyum_sanitize_config_input( $body ) {
	if ( ! is_array( $body ) ) {
		return new WP_Error( 'biyum_invalid', 'Cuerpo no válido', array( 'status' => 400 ) );
	}
	$slides = array();
	if ( isset( $body['slides'] ) && is_array( $body['slides'] ) ) {
		foreach ( $body['slides'] as $s ) {
			if ( ! is_array( $s ) ) {
				continue;
			}
			$slides[] = array(
				'image_url' => isset( $s['image_url'] ) ? esc_url_raw( $s['image_url'] ) : '',
				'title'     => isset( $s['title'] ) ? sanitize_text_field( $s['title'] ) : '',
				'subtitle'  => isset( $s['subtitle'] ) ? sanitize_text_field( $s['subtitle'] ) : '',
				'cta_text'  => isset( $s['cta_text'] ) ? sanitize_text_field( $s['cta_text'] ) : '',
				'cta_link'  => isset( $s['cta_link'] ) ? esc_url_raw( $s['cta_link'] ) : '',
			);
		}
	}
	$categories = array();
	if ( isset( $body['categories'] ) && is_array( $body['categories'] ) ) {
		foreach ( $body['categories'] as $c ) {
			if ( ! is_array( $c ) ) {
				continue;
			}
			$name = isset( $c['name'] ) ? sanitize_text_field( $c['name'] ) : '';
			if ( '' === $name ) {
				continue;
			}
			$categories[] = array(
				'id'          => isset( $c['id'] ) ? sanitize_text_field( $c['id'] ) : 'cat-' . wp_generate_password( 6, false ),
				'name'        => $name,
				'slug'        => isset( $c['slug'] ) ? sanitize_title( $c['slug'] ) : sanitize_title( $name ),
				'order_index' => isset( $c['order_index'] ) ? (int) $c['order_index'] : count( $categories ),
			);
		}
	}
	return array( 'hero_slides' => $slides, 'categories' => $categories );
}

/* --------------------------------------------------------------------- *
 *  Handlers REST
 * --------------------------------------------------------------------- */

function biyum_rest_list_projects() {
	$posts = get_posts( array(
		'post_type'      => 'biyum_proyecto',
		'post_status'    => 'publish',
		'posts_per_page' => -1,
		'orderby'        => 'menu_order',
		'order'          => 'ASC',
	) );
	return array_map( 'biyum_project_to_array', $posts );
}

function biyum_rest_get_project( $request ) {
	$identifier = $request['id'];
	if ( is_numeric( $identifier ) ) {
		$post = get_post( (int) $identifier );
	} else {
		$post = get_posts( array(
			'post_type'      => 'biyum_proyecto',
			'name'           => sanitize_title( $identifier ),
			'post_status'    => 'publish',
			'posts_per_page' => 1,
		) );
		$post = $post ? $post[0] : null;
	}
	if ( ! $post || 'biyum_proyecto' !== $post->post_type ) {
		return new WP_Error( 'biyum_not_found', 'No encontrado', array( 'status' => 404 ) );
	}
	return biyum_project_to_array( $post );
}

function biyum_rest_create_project( $request ) {
	$auth = biyum_check_write_auth();
	if ( is_wp_error( $auth ) ) {
		return $auth;
	}
	$result = biyum_save_project( $request->get_json_params() );
	if ( is_wp_error( $result ) ) {
		return $result;
	}
	return $result['project'];
}

function biyum_rest_update_project( $request ) {
	$auth = biyum_check_write_auth();
	if ( is_wp_error( $auth ) ) {
		return $auth;
	}
	$post_id = (int) $request['id'];
	if ( ! get_post( $post_id ) ) {
		return new WP_Error( 'biyum_not_found', 'No encontrado', array( 'status' => 404 ) );
	}
	$result = biyum_save_project( $request->get_json_params(), $post_id );
	if ( is_wp_error( $result ) ) {
		return $result;
	}
	return $result['project'];
}

function biyum_rest_delete_project( $request ) {
	$auth = biyum_check_write_auth();
	if ( is_wp_error( $auth ) ) {
		return $auth;
	}
	$post_id = (int) $request['id'];
	if ( ! get_post( $post_id ) ) {
		return new WP_Error( 'biyum_not_found', 'No encontrado', array( 'status' => 404 ) );
	}
	wp_delete_post( $post_id, true );
	return array(
		'success' => true,
		'id'      => (string) $post_id,
	);
}

function biyum_rest_get_config_handler() {
	return biyum_get_config();
}

function biyum_rest_update_config_handler( $request ) {
	$auth = biyum_check_write_auth();
	if ( is_wp_error( $auth ) ) {
		return $auth;
	}
	$clean = biyum_sanitize_config_input( $request->get_json_params() );
	if ( is_wp_error( $clean ) ) {
		return $clean;
	}
	$current = biyum_get_config();
	$stored  = array_merge( $current, $clean );
	update_option( 'biyum_site_config', $stored, false );
	return array(
		'success' => true,
		'config'  => biyum_get_config(),
	);
}

function biyum_register_routes() {
	register_rest_route( BIYUM_NAMESPACE, '/projects', array(
		array(
			'methods'             => 'GET',
			'callback'            => 'biyum_rest_list_projects',
			'permission_callback' => '__return_true',
		),
		array(
			'methods'             => 'POST',
			'callback'            => 'biyum_rest_create_project',
			'permission_callback' => '__return_true',
		),
	) );
	register_rest_route( BIYUM_NAMESPACE, '/projects/(?P<id>[^/]+)', array(
		array(
			'methods'             => 'GET',
			'callback'            => 'biyum_rest_get_project',
			'permission_callback' => '__return_true',
		),
		array(
			'methods'             => 'PUT',
			'callback'            => 'biyum_rest_update_project',
			'permission_callback' => '__return_true',
		),
		array(
			'methods'             => 'DELETE',
			'callback'            => 'biyum_rest_delete_project',
			'permission_callback' => '__return_true',
		),
	) );
	register_rest_route( BIYUM_NAMESPACE, '/config', array(
		array(
			'methods'             => 'GET',
			'callback'            => 'biyum_rest_get_config_handler',
			'permission_callback' => '__return_true',
		),
		array(
			'methods'             => 'PUT',
			'callback'            => 'biyum_rest_update_config_handler',
			'permission_callback' => '__return_true',
		),
	) );
}
add_action( 'rest_api_init', 'biyum_register_routes' );

/* --------------------------------------------------------------------- *
 *  Ajustes del token (administración)
 * --------------------------------------------------------------------- */

function biyum_settings_menu() {
	add_options_page( 'Biyum Storage', 'Biyum Storage', 'manage_options', 'biyum-storage', 'biyum_settings_page' );
}
add_action( 'admin_menu', 'biyum_settings_menu' );

function biyum_settings_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	if ( isset( $_POST['biyum_token_nonce'] ) && wp_verify_nonce( $_POST['biyum_token_nonce'], 'biyum_save_token' ) ) {
		update_option( 'biyum_api_token', sanitize_text_field( $_POST['biyum_api_token'] ) );
		echo '<div class="notice notice-success"><p>Token guardado.</p></div>';
	}
	$token = biyum_get_token();
	?>
	<div class="wrap">
		<h1>Biyum Storage</h1>
		<p>Token de autenticación para las escrituras (crear/editar/borrar proyectos y config). Debe coincidir con la variable <code>BIYUM_WP_TOKEN</code> de la app Next.js y enviarse en el header <code>X-Biyum-Token</code>.</p>
		<form method="post">
			<?php wp_nonce_field( 'biyum_save_token', 'biyum_token_nonce' ); ?>
			<table class="form-table">
				<tr>
					<th scope="row"><label for="biyum_api_token">Token</label></th>
					<td>
						<input name="biyum_api_token" id="biyum_api_token" type="text" class="regular-text" value="<?php echo esc_attr( $token ); ?>" />
						<p class="description">Déjalo vacío para desactivar las escrituras.</p>
					</td>
				</tr>
			</table>
			<?php submit_button( 'Guardar token' ); ?>
		</form>
	</div>
	<?php
}