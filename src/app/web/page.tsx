import { getProjects } from "@/lib/wp-storage";
import { demoProjects } from "@/lib/demo-data";
import Header from "@/components/Header";
import PortfolioGrid from "@/components/PortfolioGrid";
import Footer from "@/components/Footer";

async function getProjectsData() {
  const projects = await getProjects();
  return projects && projects.length > 0 ? projects : (demoProjects as any[]);
}

export default async function WebProjectsPage() {
  const projects = await getProjectsData();
  const webProjects = projects.filter((p: any) => p.category === "web-design");

  return (
    <main className="bg-background">
      <Header />
      <section className="py-20 md:py-24 px-6 md:px-16 max-w-[1400px] mx-auto">
        <div className="max-w-3xl mb-16 md:mb-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gold tracking-tighter leading-[0.92] mb-6">
            Proyectos Web
          </h1>
          <p className="text-secondary text-lg leading-relaxed max-w-2xl">
            Desarrollo web a medida, WordPress custom, UX/UI y optimización técnica.
            Sitios rápidos, accesibles y pensados para convertir.
          </p>
        </div>
        {webProjects.length > 0 ? (
          <PortfolioGrid projects={webProjects} />
        ) : (
          <div className="text-center py-20">
            <p className="text-muted text-lg">
              Próximamente más proyectos de diseño web.
            </p>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}