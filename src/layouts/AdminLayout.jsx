import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Inbox,
  Boxes,
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
  UserCog,
  LogOut,
  Terminal,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const NAV = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/messages', label: 'Messages', icon: Inbox },
  { to: '/admin/skills', label: 'Skills', icon: Boxes },
  { to: '/admin/education', label: 'Education', icon: GraduationCap },
  { to: '/admin/certificates', label: 'Certificates', icon: Award },
  { to: '/admin/services', label: 'Services', icon: Sparkles },
  { to: '/admin/profile', label: 'Profile Settings', icon: UserCog },
];

const AdminLayout = ({ children, title }) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-2 px-5 py-6">
        {admin?.logoUrl ? (
          <img src={admin.logoUrl} alt="Logo" className="h-9 w-9 rounded-xl object-cover shadow-sm" />
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-cta text-white shadow-glow">
            <Terminal className="h-4 w-4" />
          </span>
        )}
        <span className="font-display text-base font-semibold text-ink">Admin Panel</span>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-cta text-white shadow-glow'
                  : 'text-muted hover:bg-white hover:text-indigo-600'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-line px-3 py-4">
        <div className="mb-2 truncate px-3 text-xs text-muted">{admin?.email}</div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-white hover:text-rose-500"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-hero bg-canvas lg:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 flex-col border-r border-line bg-section-indigo/60 backdrop-blur-xl lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileOpen(false)} />
          <aside className="relative flex w-64 flex-col bg-white">
            <button className="absolute right-3 top-5 text-muted" onClick={() => setMobileOpen(false)}>
              <X className="h-5 w-5" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-white/80 px-5 py-4 backdrop-blur-xl lg:px-8">
          <button className="text-ink lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="font-display text-lg font-semibold text-ink">{title}</h1>
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-indigo-600 hover:underline">
            View site ↗
          </a>
        </header>
        <main className="px-5 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
