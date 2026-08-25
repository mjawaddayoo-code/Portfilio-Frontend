import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  FolderKanban,
  Star,
  ArrowUpRight,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import Loader from '../ui/Loader';
import EmptyState from '../ui/EmptyState';

const Projects = ({ projects, loading }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const set = new Set(
      (projects || [])
        .map((p) => p.category)
        .filter(Boolean)
    );

    return ['All', ...Array.from(set)];
  }, [projects]);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return projects || [];

    return (projects || []).filter(
      (p) => p.category === activeCategory
    );
  }, [projects, activeCategory]);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-slate-50 py-24 md:py-28"
    >
      {/* ================= BACKGROUND ================= */}

      <motion.div
        animate={{
          x: [0, 35, 0],
          y: [0, -25, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-violet-100/60 blur-3xl"
      />

      <div className="container-app relative">

        {/* ================= HEADER ================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            margin: '-80px',
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
          className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between"
        >
          <SectionHeading
            eyebrow="Projects"
            title="Things I've shipped."
            description="A selection of full-stack builds — client, server, and database working together."
          />

          {/* ================= FILTERS ================= */}

          {categories.length > 1 && (
            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.2,
              }}
              className="flex flex-wrap gap-2"
            >
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? 'border-transparent bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-200'
                      : 'border-slate-200 bg-white text-muted hover:border-indigo-300 hover:text-indigo-600'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* ================= PROJECTS ================= */}

        <div className="mt-14">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader label="Loading projects…" />
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={FolderKanban}
              title="No projects yet"
              description="Projects added from the admin panel will appear here automatically."
            />
          ) : (
            <motion.div
              layout
              className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <motion.article
                    layout
                    key={project._id}
                    initial={{
                      opacity: 0,
                      x: i % 2 === 0 ? -60 : 60,
                      y: 30,
                      scale: 0.94,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      y: 20,
                    }}
                    transition={{
                      duration: 0.65,
                      delay: (i % 3) * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{
                      y: -8,
                    }}
                    className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-2xl"
                  >

                    {/* ================= IMAGE ================= */}

                    <div className="relative aspect-video overflow-hidden bg-slate-100">

                      {project.image ? (
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          initial={{
                            scale: 1.08,
                          }}
                          whileInView={{
                            scale: 1,
                          }}
                          whileHover={{
                            scale: 1.08,
                          }}
                          transition={{
                            duration: 0.7,
                          }}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-indigo-200">
                          <FolderKanban className="h-12 w-12" />
                        </div>
                      )}

                      {/* Image overlay */}

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      {/* Featured */}

                      {project.featured && (
                        <motion.span
                          initial={{
                            opacity: 0,
                            y: -15,
                            scale: 0.8,
                          }}
                          whileInView={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.45,
                            delay: 0.3,
                            type: 'spring',
                          }}
                          className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg"
                        >
                          <Star className="h-3 w-3 fill-white" />
                          Featured
                        </motion.span>
                      )}

                      {/* View icon */}

                      <motion.div
                        initial={{
                          opacity: 0,
                          scale: 0.7,
                        }}
                        whileHover={{
                          scale: 1,
                        }}
                        className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-indigo-600 opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:opacity-100"
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </motion.div>
                    </div>

                    {/* ================= CONTENT ================= */}

                    <div className="flex flex-1 flex-col p-6">

                      {/* Category */}

                      <motion.span
                        initial={{
                          opacity: 0,
                          x: -10,
                        }}
                        whileInView={{
                          opacity: 1,
                          x: 0,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: 0.15,
                        }}
                        className="inline-flex w-fit rounded-full bg-indigo-50 px-3 py-1 font-mono text-xs font-medium text-indigo-600"
                      >
                        {project.category}
                      </motion.span>

                      {/* Title */}

                      <h3 className="mt-3 font-display text-xl font-bold text-ink transition-colors duration-300 group-hover:text-indigo-600">
                        {project.title}
                      </h3>

                      {/* Description */}

                      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-muted">
                        {project.description}
                      </p>

                      {/* Technologies */}

                      {project.technologies?.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-1.5">
                          {project.technologies
                            .slice(0, 4)
                            .map((tech, index) => (
                              <motion.span
                                key={tech}
                                initial={{
                                  opacity: 0,
                                  scale: 0.8,
                                }}
                                whileInView={{
                                  opacity: 1,
                                  scale: 1,
                                }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 0.3,
                                  delay: index * 0.05,
                                }}
                                className="rounded-lg bg-violet-50 px-2.5 py-1 font-mono text-[11px] font-medium text-violet-600"
                              >
                                {tech}
                              </motion.span>
                            ))}
                        </div>
                      )}

                      {/* Divider */}

                      <div className="my-5 h-px bg-slate-100" />

                      {/* ================= PREMIUM ACTION BUTTONS ================= */}

                      <div className="flex items-center gap-3">

                        {/* GitHub */}

                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{
                              y: -3,
                              scale: 1.03,
                            }}
                            whileTap={{
                              scale: 0.96,
                            }}
                            className="group/github inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-slate-800 hover:bg-slate-900 hover:text-white hover:shadow-lg"
                          >
                            <Github className="h-4 w-4 transition-transform duration-300 group-hover/github:rotate-12" />

                            <span>GitHub</span>
                          </motion.a>
                        )}

                        {/* Live Demo */}

                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{
                              y: -3,
                              scale: 1.03,
                            }}
                            whileTap={{
                              scale: 0.96,
                            }}
                            className="group/demo inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition-all duration-300 hover:from-indigo-600 hover:to-violet-600 hover:shadow-xl hover:shadow-indigo-300"
                          >
                            <span>Live Demo</span>

                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/demo:-translate-y-0.5 group-hover/demo:translate-x-0.5" />
                          </motion.a>
                        )}

                      </div>
                    </div>

                    {/* Bottom hover line */}

                    <motion.div
                      initial={{
                        scaleX: 0,
                      }}
                      whileHover={{
                        scaleX: 1,
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                      className="absolute bottom-0 left-0 right-0 h-1 origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400"
                    />

                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;