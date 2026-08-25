import { motion } from 'framer-motion';
import { GraduationCap, CalendarDays, Award } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Loader from '../ui/Loader';
import EmptyState from '../ui/EmptyState';
import { formatDateRange } from '../../utils/format';

const Education = ({ education, loading }) => (
  <section
    id="education"
    className="relative overflow-hidden bg-slate-50 py-24 md:py-28"
  >
    {/* Background decoration */}
    <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-indigo-100/50 blur-3xl" />
    <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-violet-100/50 blur-3xl" />

    <div className="container-app relative">

      {/* Heading */}
      <SectionHeading
        eyebrow="Education"
        title="My learning journey."
        description="The education and learning experiences that helped shape my skills and passion for technology."
        align="center"
      />

      {/* Education */}
      <div className="relative mx-auto mt-14 max-w-5xl">

        {/* Timeline line */}
        {!loading && education?.length > 0 && (
          <div className="pointer-events-none absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-indigo-200 via-violet-200 to-transparent md:block" />
        )}

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader label="Loading education…" />
          </div>
        ) : !education || education.length === 0 ? (
          <EmptyState
            icon={GraduationCap}
            title="No education listed yet"
          />
        ) : (
          <div className="space-y-6">
            {education.map((edu, i) => (
              <motion.div
                key={edu._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.12,
                  ease: 'easeOut',
                }}
                className="group relative md:pl-16"
              >

                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: i * 0.12 + 0.15,
                  }}
                  className="absolute left-0 top-7 z-10 hidden h-12 w-12 items-center justify-center rounded-2xl border-4 border-slate-50 bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg md:flex"
                >
                  <GraduationCap className="h-5 w-5" />
                </motion.div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.25 }}
                  className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 group-hover:shadow-xl md:p-7"
                >

                  {/* Hover glow */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-100/60 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative">

                    {/* Mobile icon */}
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 md:hidden">
                      <GraduationCap className="h-6 w-6" />
                    </div>

                    {/* Date */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1.5 font-mono text-xs font-medium text-indigo-600">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {formatDateRange(
                          edu.startDate,
                          edu.endDate,
                          edu.current
                        )}
                      </span>

                      {edu.current && (
                        <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-600">
                          Currently Studying
                        </span>
                      )}
                    </div>

                    {/* Degree */}
                    <h3 className="mt-4 font-display text-xl font-bold text-ink transition-colors duration-300 group-hover:text-indigo-600">
                      {edu.degree}
                    </h3>

                    {/* Institution */}
                    <p className="mt-1 text-sm font-medium text-muted">
                      {edu.institution}
                    </p>

                    {/* Grade */}
                    {edu.grade && (
                      <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-600">
                        <Award className="h-4 w-4 text-indigo-500" />
                        <span>
                          Grade: <strong>{edu.grade}</strong>
                        </span>
                      </div>
                    )}

                    {/* Description */}
                    {edu.description && (
                      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
                        {edu.description}
                      </p>
                    )}

                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  </section>
);

export default Education;