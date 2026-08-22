import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import Loader from '../ui/Loader';
import EmptyState from '../ui/EmptyState';
import { Boxes } from 'lucide-react';

const GRADIENTS = ['from-indigo-500 to-violet-500', 'from-cyan-400 to-indigo-500', 'from-violet-500 to-rose-400', 'from-mint-400 to-cyan-400'];

const Skills = ({ skills, loading }) => {
  const grouped = (skills || []).reduce((acc, s) => {
    acc[s.category] = acc[s.category] || [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <section id="skills" className="section-cyan relative overflow-hidden py-24">
      <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-cyan-100 opacity-70 blur-3xl" />
      <div className="container-app relative">
        <SectionHeading
          eyebrow="Skills"
          title="Technologies I work with daily."
          description="A practical toolkit built for shipping full-stack products end to end."
          align="center"
        />

        <div className="mt-14">
          {loading ? (
            <Loader label="Loading skills…" />
          ) : Object.keys(grouped).length === 0 ? (
            <EmptyState icon={Boxes} title="Skills coming soon" description="Add skills from the admin panel to showcase them here." />
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {Object.entries(grouped).map(([category, items], gi) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: gi * 0.06 }}
                  className="card-glass p-6 transition-all hover:-translate-y-1 hover:shadow-glow-cyan"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-br ${GRADIENTS[gi % GRADIENTS.length]}`} />
                    <h3 className="font-display text-base font-semibold text-ink">{category}</h3>
                  </div>
                  <div className="mt-5 space-y-4">
                    {items.map((skill) => (
                      <div key={skill._id}>
                        <div className="mb-1.5 flex items-center justify-between text-sm">
                          <span className="font-medium text-ink">{skill.name}</span>
                          <span className="font-mono text-xs text-muted">{skill.proficiency}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-canvas">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className={`h-full rounded-full bg-gradient-to-r ${GRADIENTS[gi % GRADIENTS.length]}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
