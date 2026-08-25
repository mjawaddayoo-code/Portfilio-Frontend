import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Server,
  Workflow,
  Sparkles,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import Loader from "../ui/Loader";
import EmptyState from "../ui/EmptyState";

const GRADIENTS = [
  "from-indigo-500 to-violet-500",
  "from-cyan-400 to-indigo-500",
  "from-violet-500 to-rose-400",
  "from-emerald-400 to-cyan-400",
];

const ICONS = [Code2, Database, Server, Workflow];

const Skills = ({ skills, loading }) => {
  const grouped = (skills || []).reduce((acc, skill) => {
    const category = skill.category || "Other";

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(skill);
    return acc;
  }, {});

  const categories = Object.entries(grouped);

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-slate-50 py-24 md:py-28"
    >
      {/* ================= BACKGROUND ================= */}

      <motion.div
        animate={{
          x: [0, 35, 0],
          y: [0, -25, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -35, 0],
          y: [0, 25, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-violet-100/60 blur-3xl"
      />

      <div className="container-app relative">

        {/* ================= HEADING ================= */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <SectionHeading
            eyebrow="Skills"
            title="Technologies I work with."
            description="A practical toolkit I use to build modern, responsive and reliable web applications."
            align="center"
          />
        </motion.div>

        {/* ================= SKILLS ================= */}

        <div className="relative mx-auto mt-14 max-w-5xl">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center py-10"
            >
              <Loader label="Loading skills…" />
            </motion.div>
          ) : categories.length === 0 ? (
            <EmptyState
              icon={Code2}
              title="No skills available"
              description="Skills added from the admin panel will appear here."
            />
          ) : (
            <motion.div
              layout
              className="grid gap-6 md:grid-cols-2"
            >
              {categories.map(([category, items], categoryIndex) => {
                const Icon =
                  ICONS[categoryIndex % ICONS.length];

                const gradient =
                  GRADIENTS[
                    categoryIndex % GRADIENTS.length
                  ];

                return (
                  <motion.article
                    layout
                    key={category}
                    initial={{
                      opacity: 0,
                      y: 45,
                      x: categoryIndex % 2 === 0 ? -30 : 30,
                      scale: 0.96,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      x: 0,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                      margin: "-80px",
                    }}
                    transition={{
                      duration: 0.65,
                      delay: categoryIndex * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{
                      y: -6,
                    }}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl md:p-7"
                  >

                    {/* Hover Glow */}

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.18 }}
                      transition={{ duration: 0.3 }}
                      className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br ${gradient} blur-3xl`}
                    />

                    <div className="relative">

                      {/* ================= HEADER ================= */}

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-4">

                          <motion.div
                            initial={{
                              opacity: 0,
                              scale: 0.5,
                              rotate: -15,
                            }}
                            whileInView={{
                              opacity: 1,
                              scale: 1,
                              rotate: 0,
                            }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.55,
                              delay:
                                categoryIndex * 0.12 + 0.15,
                              type: "spring",
                              stiffness: 180,
                              damping: 12,
                            }}
                            whileHover={{
                              scale: 1.08,
                              rotate: 5,
                            }}
                            className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
                          >
                            <Icon className="h-6 w-6" />
                          </motion.div>

                          <div>
                            <h3 className="font-display text-lg font-bold text-ink transition-colors duration-300 group-hover:text-indigo-600">
                              {category}
                            </h3>

                            <p className="mt-0.5 text-xs text-muted">
                              {items.length}{" "}
                              {items.length === 1
                                ? "technology"
                                : "technologies"}
                            </p>
                          </div>
                        </div>

                        <motion.div
                          animate={{
                            y: [0, -4, 0],
                            rotate: [0, 5, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: categoryIndex * 0.3,
                          }}
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-indigo-400"
                        >
                          <Sparkles className="h-4 w-4" />
                        </motion.div>

                      </div>

                      {/* ================= DIVIDER ================= */}

                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.7,
                          delay: categoryIndex * 0.12 + 0.3,
                        }}
                        className="my-6 h-px bg-slate-100"
                      />

                      {/* ================= SKILL ITEMS ================= */}

                      <div className="space-y-5">
                        {items.map((skill, index) => (
                          <motion.div
                            key={skill._id || skill.name}
                            initial={{
                              opacity: 0,
                              x: -25,
                            }}
                            whileInView={{
                              opacity: 1,
                              x: 0,
                            }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.5,
                              delay:
                                categoryIndex * 0.12 +
                                0.35 +
                                index * 0.1,
                              ease: "easeOut",
                            }}
                          >

                            {/* NAME + PERCENTAGE */}

                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-sm font-semibold text-ink">
                                {skill.name}
                              </span>

                              <motion.span
                                initial={{
                                  opacity: 0,
                                  scale: 0.7,
                                }}
                                whileInView={{
                                  opacity: 1,
                                  scale: 1,
                                }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 0.4,
                                  delay:
                                    categoryIndex * 0.12 +
                                    0.55 +
                                    index * 0.1,
                                }}
                                className="font-mono text-xs font-medium text-muted"
                              >
                                {skill.proficiency}%
                              </motion.span>
                            </div>

                            {/* PROGRESS BAR */}

                            <div className="relative h-2 overflow-hidden rounded-full bg-slate-100">

                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{
                                  width: `${skill.proficiency}%`,
                                }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 1.1,
                                  delay:
                                    categoryIndex * 0.12 +
                                    0.45 +
                                    index * 0.1,
                                  ease: [0.16, 1, 0.3, 1],
                                }}
                                className={`relative h-full rounded-full bg-gradient-to-r ${gradient}`}
                              >
                                {/* Moving shine */}

                                <motion.span
                                  animate={{
                                    x: ["-100%", "200%"],
                                  }}
                                  transition={{
                                    duration: 1.8,
                                    repeat: Infinity,
                                    repeatDelay: 2,
                                    ease: "easeInOut",
                                  }}
                                  className="absolute inset-y-0 w-12 bg-white/30 blur-sm"
                                />
                              </motion.div>

                            </div>
                          </motion.div>
                        ))}
                      </div>

                    </div>

                    {/* Bottom Animated Line */}

                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.45 }}
                      className={`absolute bottom-0 left-0 right-0 h-1 origin-left bg-gradient-to-r ${gradient}`}
                    />

                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;