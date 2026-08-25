import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, X, ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Loader from '../ui/Loader';
import EmptyState from '../ui/EmptyState';
import { formatDate } from '../../utils/format';

const Certificates = ({ certificates, loading }) => {
  const [preview, setPreview] = useState(null);

  const handleView = (cert) => {
    if (cert.certificateUrl) {
      window.open(cert.certificateUrl, '_blank', 'noopener,noreferrer');
    } else if (cert.image) {
      setPreview(cert);
    }
  };

  return (
    <section
      id="certificates"
      className="relative overflow-hidden bg-slate-50 py-24 md:py-28"
    >
      {/* ================= BACKGROUND ANIMATION ================= */}

      <motion.div
        animate={{
          x: [0, -35, 0],
          y: [0, 25, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-violet-100/60 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-indigo-100/50 blur-3xl"
      />

      <div className="container-app relative">

        {/* ================= HEADING ================= */}

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
        >
          <SectionHeading
            eyebrow="Certificates"
            title="Certifications & credentials."
            description="Courses and certifications that back up the skills above."
            align="center"
          />
        </motion.div>

        {/* ================= CERTIFICATES ================= */}

        <div className="mt-14">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center py-10"
            >
              <Loader label="Loading certificates…" />
            </motion.div>
          ) : !certificates || certificates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <EmptyState
                icon={Award}
                title="No certificates yet"
                description="Certificates added from the admin panel will appear here."
              />
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {certificates.map((cert, i) => (
                  <motion.article
                    layout
                    key={cert._id}
                    initial={{
                      opacity: 0,
                      y: 40,
                      scale: 0.92,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                      margin: '-70px',
                    }}
                    transition={{
                      duration: 0.6,
                      delay: (i % 3) * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{
                      y: -8,
                    }}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-2xl"
                  >

                    {/* ================= IMAGE ================= */}

                    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-indigo-50 to-violet-50">

                      {cert.image ? (
                        <motion.img
                          src={cert.image}
                          alt={cert.title}
                          loading="lazy"
                          initial={{
                            scale: 1.06,
                          }}
                          whileInView={{
                            scale: 1,
                          }}
                          whileHover={{
                            scale: 1.08,
                          }}
                          transition={{
                            duration: 0.7,
                            ease: 'easeOut',
                          }}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <motion.div
                          animate={{
                            y: [0, -5, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="flex h-full w-full items-center justify-center text-violet-300"
                        >
                          <Award className="h-12 w-12" />
                        </motion.div>
                      )}

                      {/* Image overlay */}

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      {/* View button */}

                      <motion.button
                        onClick={() => handleView(cert)}
                        initial={{
                          opacity: 0,
                          y: 15,
                          scale: 0.85,
                        }}
                        whileHover={{
                          scale: 1.05,
                        }}
                        whileTap={{
                          scale: 0.95,
                        }}
                        className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-white/95 px-4 py-2.5 text-sm font-semibold text-indigo-600 opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:opacity-100"
                      >
                        View Certificate
                        <ArrowUpRight className="h-4 w-4" />
                      </motion.button>

                      {/* Award badge */}

                      <motion.div
                        initial={{
                          opacity: 0,
                          scale: 0.7,
                          rotate: -10,
                        }}
                        whileInView={{
                          opacity: 1,
                          scale: 1,
                          rotate: 0,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: 0.25,
                          type: 'spring',
                        }}
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-violet-600 shadow-lg backdrop-blur"
                      >
                        <Award className="h-5 w-5" />
                      </motion.div>
                    </div>

                    {/* ================= CONTENT ================= */}

                    <div className="p-6">

                      {/* Date */}

                      <motion.div
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
                        className="inline-flex rounded-full bg-violet-50 px-3 py-1 font-mono text-xs font-medium text-violet-600"
                      >
                        {formatDate(cert.issueDate)}
                      </motion.div>

                      {/* Title */}

                      <h3 className="mt-3 font-display text-xl font-bold text-ink transition-colors duration-300 group-hover:text-violet-600">
                        {cert.title}
                      </h3>

                      {/* Organization */}

                      <p className="mt-1 text-sm font-medium text-muted">
                        {cert.organization}
                      </p>

                      {/* Button */}

                      <motion.button
                        onClick={() => handleView(cert)}
                        whileHover={{
                          x: 3,
                        }}
                        whileTap={{
                          scale: 0.97,
                        }}
                        className="group/view mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <span>View Certificate</span>

                        <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover/view:-translate-y-0.5 group-hover/view:translate-x-0.5" />
                      </motion.button>
                    </div>

                    {/* Bottom animated line */}

                    <motion.div
                      initial={{
                        scaleX: 0,
                      }}
                      whileHover={{
                        scaleX: 1,
                      }}
                      transition={{
                        duration: 0.45,
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

      {/* ================= PREVIEW MODAL ================= */}

      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-md"
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.85,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative w-full max-w-3xl rounded-3xl bg-white p-4 shadow-2xl sm:p-5"
              onClick={(e) => e.stopPropagation()}
            >

              {/* Close */}

              <motion.button
                onClick={() => setPreview(null)}
                whileHover={{
                  scale: 1.08,
                  rotate: 90,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                className="absolute -right-3 -top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-xl transition-colors hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </motion.button>

              {/* Certificate */}

              <motion.img
                initial={{
                  opacity: 0,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.1,
                  duration: 0.4,
                }}
                src={preview.image}
                alt={preview.title}
                className="max-h-[72vh] w-full rounded-2xl object-contain"
              />

              {/* Modal info */}

              <div className="mt-4 text-center">
                <h3 className="font-display text-lg font-bold text-ink">
                  {preview.title}
                </h3>

                <p className="mt-1 text-sm text-muted">
                  {preview.organization}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;