import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, X } from 'lucide-react';
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
    <section id="certificates" className="section-purple relative overflow-hidden py-24">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-violet-100 opacity-70 blur-3xl" />

      <div className="container-app relative">
        <SectionHeading
          eyebrow="Certificates"
          title="Certifications & credentials."
          description="Courses and certifications that back up the skills above."
          align="center"
        />

        <div className="mt-14">
          {loading ? (
            <Loader label="Loading certificates…" />
          ) : !certificates || certificates.length === 0 ? (
            <EmptyState icon={Award} title="No certificates yet" description="Certificates added from the admin panel will appear here." />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {certificates.map((cert, i) => (
                <motion.div
                  key={cert._id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                  className="card-glass group overflow-hidden"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-brand-soft">
                    {cert.image ? (
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-violet-300">
                        <Award className="h-10 w-10" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/40 group-hover:opacity-100">
                      <button
                        onClick={() => handleView(cert)}
                        className="btn-primary !py-2 text-xs"
                      >
                        View Certificate <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="font-mono text-xs text-violet-500">{formatDate(cert.issueDate)}</span>
                    <h3 className="mt-1 font-display text-base font-semibold text-ink">{cert.title}</h3>
                    <p className="mt-1 text-sm text-muted">{cert.organization}</p>
                    <button
                      onClick={() => handleView(cert)}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:underline"
                    >
                      View Certificate <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {preview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 backdrop-blur-sm px-4"
          onClick={() => setPreview(null)}
        >
          <div className="relative max-w-2xl rounded-2xl bg-white p-4 shadow-card-hover" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPreview(null)}
              className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink shadow-card hover:bg-canvas"
            >
              <X className="h-4 w-4" />
            </button>
            <img src={preview.image} alt={preview.title} className="max-h-[75vh] w-full rounded-xl object-contain" />
            <div className="mt-3 text-center">
              <h3 className="font-display text-base font-semibold text-ink">{preview.title}</h3>
              <p className="text-sm text-muted">{preview.organization}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;
