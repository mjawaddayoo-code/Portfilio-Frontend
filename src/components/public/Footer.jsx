import { Github, Linkedin, Facebook, Instagram, Mail, Terminal } from 'lucide-react';

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.85.505 3.579 1.383 5.062L2 22l5.076-1.332A9.94 9.94 0 0 0 12.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.187a8.16 8.16 0 0 1-4.166-1.142l-.299-.177-3.012.79.804-2.936-.194-.302A8.166 8.166 0 1 1 20.166 12a8.176 8.176 0 0 1-8.165 8.187z"/>
  </svg>
);

const Footer = ({ profile }) => {
  const year = new Date().getFullYear();
  const socials = [
    { icon: Github, url: profile?.github, label: 'GitHub' },
    { icon: Linkedin, url: profile?.linkedin, label: 'LinkedIn' },
    { icon: Facebook, url: profile?.facebook, label: 'Facebook' },
    { icon: Instagram, url: profile?.instagram, label: 'Instagram' },
    { icon: WhatsAppIcon, url: profile?.whatsapp ? `https://wa.me/${profile.whatsapp.replace(/\D/g, '')}` : null, label: 'WhatsApp' },
    { icon: Mail, url: profile?.email ? `mailto:${profile.email}` : null, label: 'Email' },
  ].filter((s) => s.url);

  const links = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#certificates', label: 'Certificates' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-line bg-section-indigo">
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-indigo-100 opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-violet-100 opacity-60 blur-3xl" />

      <div className="container-app relative py-14">
        <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <a href="#top" className="flex items-center justify-center gap-2 font-display text-lg font-semibold text-ink sm:justify-start">
              {profile?.logoUrl ? (
                <img src={profile.logoUrl} alt={`${profile?.name || 'logo'}`} className="h-9 w-9 rounded-lg object-cover shadow-sm" />
              ) : (
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-cta text-white shadow-glow">
                  <Terminal className="h-4 w-4" />
                </span>
              )}
              {profile?.name || 'Muhammad Jawad'}
            </a>
            <p className="mt-2 text-sm text-muted">{profile?.title || 'Full-Stack Web Developer'}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-muted transition-colors hover:text-indigo-600">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {socials.length > 0 ? (
              socials.map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-white text-muted shadow-card transition-all hover:-translate-y-0.5 hover:text-indigo-600 hover:shadow-card-hover"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))
            ) : (
              <span className="text-xs text-muted">Social links coming soon</span>
            )}
          </div>
        </div>

        <div className="mt-10 border-t border-line/80 pt-6 text-center">
          <p className="font-mono text-xs text-muted">
            © {year} {profile?.name || 'Muhammad Jawad'}. Built with React &amp; Node.js.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
