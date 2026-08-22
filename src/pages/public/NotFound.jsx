import { Link } from 'react-router-dom';
import { Terminal } from 'lucide-react';

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-4 text-center">
    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white">
      <Terminal className="h-6 w-6" />
    </span>
    <h1 className="mt-6 font-display text-3xl font-bold text-ink">404</h1>
    <p className="mt-2 text-muted">This page doesn&apos;t exist.</p>
    <Link to="/" className="btn-primary mt-6">Back home</Link>
  </div>
);

export default NotFound;
