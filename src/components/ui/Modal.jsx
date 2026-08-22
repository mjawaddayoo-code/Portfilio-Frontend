import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ open, onClose, title, children, maxWidth = 'max-w-lg' }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-ink/40 backdrop-blur-sm px-4 py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={`w-full ${maxWidth} rounded-2xl bg-white p-6 shadow-card-hover`}
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
            <button onClick={onClose} className="text-muted hover:text-ink">
              <X className="h-5 w-5" />
            </button>
          </div>
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Modal;
