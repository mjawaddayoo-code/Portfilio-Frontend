import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import SectionHeading from './SectionHeading';
import Loader from '../ui/Loader';
import EmptyState from '../ui/EmptyState';

const GRADIENTS = ['from-indigo-500 to-violet-500', 'from-cyan-400 to-indigo-500', 'from-rose-400 to-violet-500', 'from-mint-400 to-cyan-400', 'from-amber-400 to-rose-400'];

const Services = ({ services, loading }) => (
  <section id="services" className="section-peach relative overflow-hidden py-24">
    <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-amber-100 opacity-60 blur-3xl" />
    <div className="container-app relative">
      <SectionHeading
        eyebrow="Services"
        title="How I can help."
        description="MERN-Stack Developer, from the first component to the production database."
        align="center"
      />

      <div className="mt-14">
        {loading ? (
          <Loader label="Loading services…" />
        ) : !services || services.length === 0 ? (
          <EmptyState icon={Icons.Sparkles} title="Services coming soon" />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = Icons[service.icon] || Icons.Code2;
              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                  className="card-glass group p-6 transition-all hover:-translate-y-1.5 hover:shadow-glow"
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} text-white shadow-sm transition-transform group-hover:-translate-y-0.5 group-hover:scale-110`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold text-ink">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  </section>
);

export default Services;
