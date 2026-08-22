import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Loader from '../ui/Loader';
import EmptyState from '../ui/EmptyState';
import { formatDateRange } from '../../utils/format';

const Education = ({ education, loading }) => (
  <section id="education" className="py-24">
    <div className="container-app">
      <SectionHeading eyebrow="Education" title="Academic background." align="center" />

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {loading ? (
          <Loader label="Loading education…" />
        ) : !education || education.length === 0 ? (
          <EmptyState icon={GraduationCap} title="No education listed yet" />
        ) : (
          education.map((edu, i) => (
            <motion.div
              key={edu._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="mt-4 block font-mono text-xs text-indigo-500">
                {formatDateRange(edu.startDate, edu.endDate, edu.current)}
              </span>
              <h3 className="mt-1 font-display text-base font-semibold text-ink">{edu.degree}</h3>
              <p className="text-sm text-muted">{edu.institution}</p>
              {edu.grade && <p className="mt-1 text-xs text-muted">Grade: {edu.grade}</p>}
              {edu.description && <p className="mt-2 text-sm leading-relaxed text-muted">{edu.description}</p>}
            </motion.div>
          ))
        )}
      </div>
    </div>
  </section>
);

export default Education;
