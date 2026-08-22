import { motion } from 'framer-motion';

const SectionHeading = ({ eyebrow, title, description, align = 'left' }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.5 }}
    className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}
  >
    {eyebrow && (
      <span className="eyebrow rounded-full bg-indigo-50 px-3 py-1">
        {eyebrow}
      </span>
    )}
    <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
    {description && <p className="mt-3 text-base leading-relaxed text-muted">{description}</p>}
  </motion.div>
);

export default SectionHeading;
