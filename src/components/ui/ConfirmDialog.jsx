import { AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ConfirmDialog = ({ open, title, description, confirmLabel = 'Delete', onConfirm, onCancel, loading }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 backdrop-blur-sm px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
      >
        <motion.div
          className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-card-hover"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <button onClick={onCancel} className="text-muted hover:text-ink">
              <X className="h-5 w-5" />
            </button>
          </div>
          <h3 className="mt-4 font-display text-lg font-semibold text-ink">{title}</h3>
          {description && <p className="mt-1.5 text-sm text-muted">{description}</p>}
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-600 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Deleting…' : confirmLabel}
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ConfirmDialog;
