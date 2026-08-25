import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Workflow,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const CARDS = [
  {
    icon: Code2,
    title: "Clean Development",
    text: "I write clean and organized code that is easy to understand and maintain.",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    icon: Database,
    title: "Backend & APIs",
    text: "I build reliable APIs, authentication systems, and database-driven applications.",
    color: "text-cyan-500",
    bg: "bg-cyan-50",
  },
  {
    icon: Workflow,
    title: "Smart Automation",
    text: "I create automated workflows that save time and reduce repetitive work.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    text: "I focus on secure authentication, validation, and reliable application performance.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
];

const SKILLS = ["React", "Node.js", "Express", "MongoDB", "n8n"];

const About = ({ profile }) => (
  <section
    id="about"
    className="relative overflow-hidden bg-slate-50 py-24"
  >
    {/* Background decoration */}
    <motion.div
      animate={{
        x: [0, 20, 0],
        y: [0, -15, 0],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-indigo-100/50 blur-3xl"
    />

    <motion.div
      animate={{
        x: [0, -20, 0],
        y: [0, 15, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-violet-100/50 blur-3xl"
    />

    <div className="container-app relative">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full"
        >
          {/* About badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              <Sparkles className="h-4 w-4" />
            </motion.div>

            About Me
          </motion.div>

          {/* Heading */}
          <h2 className="font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
            I build modern
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="block bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent"
            >
              experiences for the web.
            </motion.span>
          </h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 max-w-xl text-base leading-7 text-muted"
          >
            {profile?.bio ||
              `I'm ${
                profile?.name || "Muhammad Jawad"
              }, a MERN Stack Developer focused on building modern, responsive, and user-friendly web applications. I enjoy turning ideas into real products and creating simple solutions that make a difference.`}
          </motion.p>

          {/* Skills */}
          <div className="mt-8 flex flex-wrap gap-3">
            {SKILLS.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{
                  opacity: 0,
                  scale: 0.7,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.45 + index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -5,
                  scale: 1.06,
                }}
                className="cursor-default rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-shadow duration-300 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE — 2 × 2 CARDS */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {CARDS.map(
            ({ icon: Icon, title, text, color, bg }, index) => (
              <motion.div
                key={title}
                initial={{
                  opacity: 0,
                  y: 35,
                  scale: 0.95,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  margin: "-80px",
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -7,
                  transition: { duration: 0.25 },
                }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-indigo-100/50 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon */}
                <motion.div
                  whileHover={{
                    rotate: [0, -8, 8, 0],
                    scale: 1.08,
                  }}
                  transition={{ duration: 0.4 }}
                  className={`relative flex h-12 w-12 items-center justify-center rounded-2xl ${bg} ${color}`}
                >
                  <Icon className="h-6 w-6" />
                </motion.div>

                {/* Content */}
                <h3 className="relative mt-5 text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-indigo-600">
                  {title}
                </h3>

                <p className="relative mt-2 text-sm leading-6 text-muted">
                  {text}
                </p>
              </motion.div>
            )
          )}
        </div>
      </div>
    </div>
  </section>
);

export default About;