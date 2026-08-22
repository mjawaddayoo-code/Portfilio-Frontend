import { motion } from 'framer-motion';
import { Code2, Layers, ShieldCheck, Zap } from 'lucide-react';
import SectionHeading from './SectionHeading';

const POINTS = [
  { icon: Layers, title: 'End-to-end ownership', text: 'Comfortable across the whole stack — UI, API, database, and deployment.', gradient: 'from-indigo-500 to-violet-500' },
  { icon: Zap, title: 'Performance-minded', text: 'I care about load times, clean queries, and code that scales.', gradient: 'from-cyan-400 to-indigo-500' },
  { icon: ShieldCheck, title: 'Secure by default', text: 'JWT auth, input validation, and sane defaults on every project.', gradient: 'from-mint-400 to-cyan-400' },
  { icon: Code2, title: 'Readable code', text: 'Structured, documented, and easy for the next developer to pick up.', gradient: 'from-violet-500 to-rose-400' },
];

const About = ({ profile }) => (
  <section id="about" className="section-blue relative overflow-hidden py-24">
    <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-indigo-100 opacity-60 blur-3xl" />
    <div className="container-app grid gap-14 lg:grid-cols-2 lg:items-start">
      <SectionHeading
        eyebrow="About me"
        title="I build reliable products, not just interfaces."
        description={
          profile?.bio ||
          `I'm ${profile?.name || 'Muhammad Jawad'}, a Full-Stack Web Developer working primarily with the MERN stack. I enjoy turning ambiguous requirements into clean, working software — and I sweat the details other people skip.`
        }
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {POINTS.map(({ icon: Icon, title, text, gradient }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="card-glass p-5 transition-all hover:-translate-y-1 hover:shadow-glow"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-sm`}>
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-base font-semibold text-ink">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default About;
