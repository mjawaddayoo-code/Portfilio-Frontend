import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, FolderKanban, Star } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Loader from '../ui/Loader';
import EmptyState from '../ui/EmptyState';

const Projects = ({ projects, loading }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const set = new Set((projects || []).map((p) => p.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [projects]);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return projects || [];
    return (projects || []).filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <section id="projects" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute -left-10 bottom-0 h-72 w-72 rounded-full bg-indigo-50 opacity-70 blur-3xl" />
      <div className="container-app relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Projects"
            title="Things I've shipped."
            description="A selection of full-stack builds — client, server, and database working together."
          />

          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    activeCategory === cat
                      ? 'border-transparent bg-gradient-cta text-white shadow-glow'
                      : 'border-line bg-white text-muted hover:border-indigo-300 hover:text-indigo-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12">
          {loading ? (
            <Loader label="Loading projects…" />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={FolderKanban}
              title="No projects yet"
              description="Projects added from the admin panel will appear here automatically."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project, i) => (
                <motion.article
                  key={project._id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                  className="group card flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow"
                >
                  <div className="relative aspect-video overflow-hidden bg-canvas">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-indigo-200">
                        <FolderKanban className="h-10 w-10" />
                      </div>
                    )}
                    {project.featured && (
                      <span className="badge-gradient absolute right-3 top-3">
                        <Star className="mr-1 h-3 w-3 fill-white" /> Featured
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <span className="inline-flex w-fit items-center rounded-full bg-indigo-50 px-2.5 py-0.5 font-mono text-xs font-medium text-indigo-600">{project.category}</span>
                    <h3 className="mt-1.5 font-display text-lg font-semibold text-ink">{project.title}</h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>

                    {project.technologies?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-violet-50 px-2 py-0.5 font-mono text-[11px] text-violet-600"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 flex items-center gap-4 border-t border-line pt-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-indigo-600"
                        >
                          <Github className="h-4 w-4" /> Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-indigo-600"
                        >
                          <ExternalLink className="h-4 w-4" /> Live demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
