import { Loader2 } from 'lucide-react';

const Loader = ({ label = 'Loading…', fullHeight = false }) => (
  <div
    className={`flex flex-col items-center justify-center gap-3 text-muted ${
      fullHeight ? 'min-h-[40vh]' : 'py-12'
    }`}
  >
    <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export default Loader;
