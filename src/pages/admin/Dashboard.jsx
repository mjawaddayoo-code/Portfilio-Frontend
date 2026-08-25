import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FolderKanban,
  Star,
  Inbox,
  MailWarning,
  Boxes,
  Sparkles,
  Briefcase,
  Award,
} from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';
import Loader from '../../components/ui/Loader';
import StatusBadge from '../../components/admin/StatusBadge';
import api, { getErrorMessage } from '../../services/api';
import { formatDateTime } from '../../utils/format';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const CARDS = [
  { key: 'totalProjects', label: 'Total Projects', icon: FolderKanban, gradient: 'from-indigo-500 to-violet-500' },
  { key: 'featuredProjects', label: 'Featured Projects', icon: Star, gradient: 'from-amber-400 to-rose-400' },
  { key: 'totalMessages', label: 'Total Messages', icon: Inbox, gradient: 'from-mint-400 to-cyan-400' },
  { key: 'unreadMessages', label: 'Unread Messages', icon: MailWarning, gradient: 'from-rose-400 to-violet-500' },
  { key: 'totalSkills', label: 'Total Skills', icon: Boxes, gradient: 'from-cyan-400 to-indigo-500' },
  { key: 'totalServices', label: 'Total Services', icon: Sparkles, gradient: 'from-mint-400 to-indigo-500' },
  { key: 'totalCertificates', label: 'Total Certificates', icon: Award, gradient: 'from-violet-500 to-cyan-400' },
];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
     
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <Loader fullHeight label="Loading dashboard…" />
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CARDS.map(({ key, label, icon: Icon, gradient }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="card-glass p-5 transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-sm`}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-2xl font-bold text-ink">{stats?.[key] ?? 0}</p>
                <p className="text-sm text-muted">{label}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-base font-semibold text-ink">Recent Messages</h2>
              <Link to="/admin/messages" className="text-sm font-medium text-indigo-600 hover:underline">
                View all
              </Link>
            </div>
            <div className="card-glass overflow-hidden">
              {!stats?.recentMessages || stats.recentMessages.length === 0 ? (
                <p className="p-6 text-center text-sm text-muted">No messages yet.</p>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-canvas text-xs uppercase text-muted">
                    <tr>
                      <th className="px-5 py-3 font-medium">From</th>
                      <th className="px-5 py-3 font-medium">Subject</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                      <th className="px-5 py-3 font-medium">Received</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {stats.recentMessages.map((m) => (
                      <tr key={m._id} className="hover:bg-canvas/60">
                        <td className="px-5 py-3">
                          <p className="font-medium text-ink">{m.name}</p>
                          <p className="text-xs text-muted">{m.email}</p>
                        </td>
                        <td className="px-5 py-3 text-ink">{m.subject}</td>
                        <td className="px-5 py-3"><StatusBadge status={m.status} /></td>
                        <td className="px-5 py-3 text-xs text-muted">{formatDateTime(m.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default Dashboard;
