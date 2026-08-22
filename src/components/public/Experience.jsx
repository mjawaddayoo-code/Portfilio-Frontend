import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Loader from '../ui/Loader';
import EmptyState from '../ui/EmptyState';
import { formatDateRange } from '../../utils/format';

const Experience = ({ experience, loading }) => (
  <section id="experience" className="bg-white py-24">
    <div className="container-app">
      <SectionHeading eyebrow="Experience" title="Where I've worked." align="center" />

      <div className="mx-auto mt-14 max-w-2xl">
        {loading ? (
          <Loader label="Loading experience…" />
        ) : !experience || experience.length === 0 ? (
          <EmptyState icon={Briefcase} title="No experience listed yet" />
        ) : (
          <div className="relative border-l border-line pl-8">
            {experience.map((exp, i) => (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative mb-10 last:mb-0"
              >
                <span className="absolute -left-[38px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-indigo-500 bg-white" />
                <span className="font-mono text-xs text-indigo-500">
                  {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                </span>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink">{exp.position}</h3>
                <p className="text-sm font-medium text-muted">
                  {exp.company}
                  {exp.location ? ` · ${exp.location}` : ''}
                </p>
                {exp.description && (
                  <p className="mt-2 text-sm leading-relaxed text-muted">{exp.description}</p>
                )}
                {exp.technologies?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {exp.technologies.map((t) => (
                      <span key={t} className="rounded-md bg-canvas px-2 py-0.5 font-mono text-[11px] text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  </section>
);

export default Experience;
