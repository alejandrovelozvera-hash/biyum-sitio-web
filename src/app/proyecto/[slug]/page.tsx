import { notFound } from "next/navigation";
import { Project } from "@/types";
import { getProjects, getProjectByIdentifier } from "@/lib/wp-storage";
import { demoProjects } from "@/lib/demo-data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectGallery from "@/components/ProjectGallery";
import Link from "next/link";
import { ArrowLeft } from "@/components/Icons";

export const dynamicParams = true;

export async function generateStaticParams() {
  const projects = await getProjects().catch(() => []);
  return (projects.length ? projects : demoProjects).map((p) => ({ slug: p.slug }));
}

async function getProject(slug: string) {
  const project = await getProjectByIdentifier(slug);
  if (project) return project as Project;

  const demo = demoProjects.find((p) => p.slug === slug);
  return (demo as Project) || null;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-32 md:pt-40">
        <div className="max-w-[1400px] mx-auto px-8">
          <Link href="/#portafolio" className="inline-flex items-center gap-2 text-muted hover:text-gold text-sm transition-colors mb-16">
            <ArrowLeft size={14} /> Volver
          </Link>
          <div className="max-w-3xl mb-20">
            {project.category && (<p className="text-gold text-xs tracking-wider mb-4">{project.category}</p>)}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gold tracking-tighter leading-[0.92]">{project.title}</h1>
            <p className="text-secondary text-lg mt-8 leading-relaxed max-w-2xl">{project.description}</p>
            <div className="flex flex-wrap gap-10 mt-10">
              {project.client && (<div><p className="text-muted text-xs tracking-widest uppercase mb-2">Cliente</p><p className="text-gold-dark text-sm">{project.client}</p></div>)}
              {project.year && (<div><p className="text-muted text-xs tracking-widest uppercase mb-2">Año</p><p className="text-gold-dark text-sm">{project.year}</p></div>)}
              {project.services && project.services.length > 0 && (
                <div><p className="text-muted text-xs tracking-widest uppercase mb-2">Servicios</p>
                  <div className="flex flex-wrap gap-2">{project.services.map((s) => (<span key={s} className="text-gold-dark text-xs bg-surface border border-gold/20 px-3 py-1.5">{s}</span>))}</div>
                </div>
              )}
            </div>
          </div>
          <ProjectGallery project={project} />
        </div>
      </main>
      <Footer />
    </>
  );
}