<?php
/**
 * Plugin Name: Biyum Storage
 * Description: Almacenamiento de proyectos y configuración del sitio Biyum vía REST API (reemplaza Supabase).
 * Version: 1.0.2
 * Author: Biyum
 * License: GPL-2.0-or-later
 *
 * Expone endpoints en /wp-json/biyum/v1/:
 *   GET    /projects            Lista de proyectos
 *   GET    /projects/{id}       Proyecto por ID o slug
 *   POST   /projects            Crear proyecto (requiere token)
 *   PUT    /projects/{id}       Actualizar proyecto (requiere token)
 *   DELETE /projects/{id}       Eliminar proyecto (requiere token)
 *   POST   /media               Subir imagen a la librería (requiere token, multipart campo "file")
 *   GET    /media               Listar media de la librería (requiere token)
 *   DELETE /media/{id}          Eliminar media de la librería (requiere token)
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

function biyum_clean_text( $str ) {
	return html_entity_decode( sanitize_text_field( $str ), ENT_QUOTES, 'UTF-8' );
}

function biyum_sanitize_project_input( $body ) {
	if ( ! is_array( $body ) ) {
		return new WP_Error( 'biyum_invalid', 'Cuerpo no válido', array( 'status' => 400 ) );
	}

	$images = isset( $body['images'] ) && is_array( $body['images'] ) ? biyum_normalize_images( $body['images'] ) : array();

	return array(
		'title'           => isset( $body['title'] ) ? biyum_clean_text( $body['title'] ) : '',
		'description'     => isset( $body['description'] ) ? wp_kses_post( $body['description'] ) : '',
		'category'        => isset( $body['category'] ) ? biyum_clean_text( $body['category'] ) : '',
		'cover_image_url' => isset( $body['cover_image_url'] ) ? esc_url_raw( $body['cover_image_url'] ) : '',
		'cover_image_id'  => isset( $body['cover_image_id'] ) && null !== $body['cover_image_id'] ? (int) $body['cover_image_id'] : null,
		'images'          => $images,
		'video_url'       => isset( $body['video_url'] ) && $body['video_url'] ? esc_url_raw( $body['video_url'] ) : null,
		'client'          => isset( $body['client'] ) && $body['client'] ? biyum_clean_text( $body['client'] ) : null,
		'year'            => isset( $body['year'] ) && $body['year'] ? biyum_clean_text( $body['year'] ) : null,
		'services'        => isset( $body['services'] ) && is_array( $body['services'] )
			? array_values( array_map( 'biyum_clean_text', $body['services'] ) ) : array(),
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

function biyum_send_nocache() {
	nocache_headers();
	header( 'Cache-Control: no-store, no-cache, must-revalidate, max-age=0' );
	header( 'Pragma: no-cache' );
	header( 'X-LiteSpeed-Cache-Control: no-cache, no-store, must-revalidate' );
	if ( class_exists( 'LiteSpeed\Control' ) && method_exists( 'LiteSpeed\Control', 'set_nocache' ) ) {
		\LiteSpeed\Control::set_nocache( 'biyum-dynamic' );
	}
	do_action( 'litespeed_control_set_nocache', 'biyum-dynamic' );
}

function biyum_purge_litespeed() {
	if ( class_exists( 'LiteSpeed\Purge' ) && method_exists( 'LiteSpeed\Purge', 'purge_all' ) ) {
		\LiteSpeed\Purge::purge_all();
	}
	do_action( 'litespeed_purge_all' );
	if ( function_exists( 'wp_cache_flush' ) ) {
		wp_cache_flush();
	}
	header( 'X-LiteSpeed-Purge: *' );
}

function biyum_rest_list_projects() {
	$posts = get_posts( array(
		'post_type'      => 'biyum_proyecto',
		'post_status'    => 'publish',
		'posts_per_page' => -1,
		'orderby'        => 'menu_order',
		'order'          => 'ASC',
	) );
	$data = array_map( 'biyum_project_to_array', $posts );

	biyum_send_nocache();

	return $data;
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
	biyum_send_nocache();
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
	biyum_purge_litespeed();
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
	biyum_purge_litespeed();
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
	biyum_purge_litespeed();
	return array(
		'success' => true,
		'id'      => (string) $post_id,
	);
}

function biyum_rest_get_config_handler() {
	biyum_send_nocache();
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
	biyum_purge_litespeed();
	return array(
		'success' => true,
		'config'  => biyum_get_config(),
	);
}

/* --------------------------------------------------------------------- *
 *  Subida de imágenes (media library)
 * --------------------------------------------------------------------- */

function biyum_rest_upload_media( $request ) {
	$auth = biyum_check_write_auth();
	if ( is_wp_error( $auth ) ) {
		return $auth;
	}

	$files = $request->get_file_params();
	if ( empty( $files['file'] ) || ! is_array( $files['file'] ) ) {
		return new WP_Error( 'biyum_no_file', 'No se recibió archivo (campo "file")', array( 'status' => 400 ) );
	}
	$file = $files['file'];
	if ( isset( $file['error'] ) && UPLOAD_ERR_OK !== (int) $file['error'] ) {
		return new WP_Error( 'biyum_upload_error', 'Error al recibir el archivo: ' . $file['error'], array( 'status' => 400 ) );
	}

	// set server vars para que media_handle_upload funcione con el filename
	$_SERVER['HTTP_CONTENT_DISPOSITION'] = 'attachment; filename="' . ( isset( $file['name'] ) ? $file['name'] : 'imagen.jpg' ) . '"';

	require_once ABSPATH . 'wp-admin/includes/image.php';
	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/media.php';

	$attachment_id = media_handle_upload( 'file', 0 );
	if ( is_wp_error( $attachment_id ) ) {
		return new WP_Error( 'biyum_upload_failed', $attachment_id->get_error_message(), array( 'status' => 500 ) );
	}

	$meta   = wp_get_attachment_metadata( $attachment_id );
	$source = wp_get_attachment_url( $attachment_id );

	$thumb_src  = wp_get_attachment_image_src( $attachment_id, 'thumbnail' );
	$medium_src = wp_get_attachment_image_src( $attachment_id, 'medium' );

	return array(
		'id'     => (int) $attachment_id,
		'title'  => get_the_title( $attachment_id ),
		'url'    => $source,
		'thumb'  => $thumb_src ? $thumb_src[0] : $source,
		'medium' => $medium_src ? $medium_src[0] : $source,
		'alt'    => get_post_meta( $attachment_id, '_wp_attachment_image_alt', true ),
		'width'  => isset( $meta['width'] ) ? (int) $meta['width'] : 0,
		'height' => isset( $meta['height'] ) ? (int) $meta['height'] : 0,
	);
}

function biyum_rest_list_media( $request ) {
	$page = isset( $request['page'] ) ? max( 1, (int) $request['page'] ) : 1;
	$per  = 100;
	$args = array(
		'post_type'      => 'attachment',
		'post_status'    => 'inherit',
		'post_mime_type' => 'image',
		'posts_per_page' => $per,
		'paged'          => $page,
	);

	if ( isset( $request['search'] ) && $request['search'] ) {
		$args['s'] = sanitize_text_field( $request['search'] );
	}

	$query = new WP_Query( $args );

	$items = array_map( 'biyum_media_item_to_array', $query->posts );

	return array(
		'items' => $items,
		'total' => (int) $query->found_posts,
		'pages' => (int) $query->max_num_pages,
	);
}

function biyum_media_item_to_array( $attachment ) {
	$attachment_id = $attachment->ID;
	$meta   = wp_get_attachment_metadata( $attachment_id );
	$source = wp_get_attachment_url( $attachment_id );
	$thumb_src  = wp_get_attachment_image_src( $attachment_id, 'thumbnail' );
	$medium_src = wp_get_attachment_image_src( $attachment_id, 'medium' );

	return array(
		'id'     => (int) $attachment_id,
		'title'  => get_the_title( $attachment_id ),
		'url'    => $source,
		'thumb'  => $thumb_src ? $thumb_src[0] : $source,
		'medium' => $medium_src ? $medium_src[0] : $source,
		'alt'    => get_post_meta( $attachment_id, '_wp_attachment_image_alt', true ),
		'width'  => isset( $meta['width'] ) ? (int) $meta['width'] : 0,
		'height' => isset( $meta['height'] ) ? (int) $meta['height'] : 0,
		'filename' => wp_basename( $source ),
	);
}

function biyum_rest_delete_media( $request ) {
	$auth = biyum_check_write_auth();
	if ( is_wp_error( $auth ) ) {
		return $auth;
	}
	$attachment_id = (int) $request['id'];
	if ( ! wp_attachment_is_image( $attachment_id ) ) {
		return new WP_Error( 'biyum_not_found', 'No se encontró la imagen', array( 'status' => 404 ) );
	}
	$deleted = wp_delete_attachment( $attachment_id, true );
	if ( ! $deleted ) {
		return new WP_Error( 'biyum_delete_failed', 'No se pudo eliminar', array( 'status' => 500 ) );
	}
	biyum_purge_litespeed();
	return array(
		'success' => true,
		'id'      => (int) $attachment_id,
	);
}

function biyum_register_routes() {
	register_rest_route( BIYUM_NAMESPACE, '/media', array(
		array(
			'methods'             => 'POST',
			'callback'            => 'biyum_rest_upload_media',
			'permission_callback' => '__return_true',
		),
		array(
			'methods'             => 'GET',
			'callback'            => 'biyum_rest_list_media',
			'permission_callback' => '__return_true',
		),
	) );
	register_rest_route( BIYUM_NAMESPACE, '/media/(?P<id>\d+)', array(
		array(
			'methods'             => 'DELETE',
			'callback'            => 'biyum_rest_delete_media',
			'permission_callback' => '__return_true',
		),
	) );
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