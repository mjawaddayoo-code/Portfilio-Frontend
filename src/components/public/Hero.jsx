import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Facebook, Instagram, Mail, User } from 'lucide-react';

const CODE_LINES = [
  { indent: 0, text: 'const developer = {' },
  { indent: 1, text: "name: 'Muhammad Jawad'," },
  { indent: 1, text: "role: 'Full-Stack Developer'," },
  { indent: 1, text: "stack: ['React', 'Node', 'MongoDB']," },
  { indent: 1, text: 'available: true,' },
  { indent: 0, text: '};' },
];

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.85.505 3.579 1.383 5.062L2 22l5.076-1.332A9.94 9.94 0 0 0 12.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.187a8.16 8.16 0 0 1-4.166-1.142l-.299-.177-3.012.79.804-2.936-.194-.302A8.166 8.166 0 1 1 20.166 12a8.176 8.176 0 0 1-8.165 8.187z"/>
  </svg>
);

const TypedCode = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (visibleLines >= CODE_LINES.length) return;
    const currentLine = CODE_LINES[visibleLines].text;
    if (charCount < currentLine.length) {
      const t = setTimeout(() => setCharCount((c) => c + 1), 22);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setVisibleLines((l) => l + 1);
      setCharCount(0);
    }, 220);
    return () => clearTimeout(t);
  }, [charCount, visibleLines]);

  return (
    <div className="w-full rounded-2xl border border-line bg-[#0F172A] p-5 font-mono text-[13px] leading-relaxed shadow-card-hover sm:text-sm">
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-mint-400" />
        <span className="ml-3 text-xs text-slate-500">profile.js</span>
      </div>
      <div>
        {CODE_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{ paddingLeft: `${line.indent * 16}px` }} className="text-slate-200">
            <CodeLine text={line.text} />
          </div>
        ))}
        {visibleLines < CODE_LINES.length && (
          <div style={{ paddingLeft: `${CODE_LINES[visibleLines].indent * 16}px` }} className="text-slate-200">
            <CodeLine text={CODE_LINES[visibleLines].text.slice(0, charCount)} />
            <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 animate-blink bg-indigo-400" />
          </div>
        )}
      </div>
    </div>
  );
};

const CodeLine = ({ text }) => {
  const parts = text.split(/('.*?')/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("'") ? (
          <span key={i} className="text-mint-400">{part}</span>
        ) : (
          <span key={i} className="text-indigo-300">{part}</span>
        )
      )}
    </>
  );
};

const Hero = ({ profile }) => {
  const socials = [
    { icon: Github, url: profile?.github },
    { icon: Linkedin, url: profile?.linkedin },
    { icon: Facebook, url: profile?.facebook },
    { icon: Instagram, url: profile?.instagram },
    { icon: WhatsAppIcon, url: profile?.whatsapp ? `https://wa.me/${profile.whatsapp.replace(/\D/g, '')}` : null },
    { icon: Mail, url: profile?.email ? `mailto:${profile.email}` : null },
  ].filter((s) => s.url);

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-hero" />
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
      <div className="pointer-events-none absolute -left-20 top-40 h-72 w-72 rounded-full bg-cyan-100 opacity-70 blur-3xl animate-pulse-soft" />
      <div className="pointer-events-none absolute -right-16 top-10 h-80 w-80 rounded-full bg-violet-100 opacity-70 blur-3xl animate-pulse-soft" />

      <div className="container-app relative grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow rounded-full bg-white/70 px-3 py-1 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-mint-400" />
            Available for new projects
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
            {profile?.name || 'Muhammad Jawad'},<br />
            <span className="text-gradient">Full-Stack</span> Web Developer.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            {profile?.bio ||
              'I design and build complete web applications — from responsive React interfaces to secure Node.js APIs and MongoDB data layers — end to end.'}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#contact" className="btn-primary">
              Start a project <ArrowRight className="h-4 w-4" />
            </a>
            {profile?.resumeUrl && (
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Download className="h-4 w-4" /> Resume
              </a>
            )}
          </div>

          {socials.length > 0 && (
            <div className="mt-7 flex items-center gap-2.5">
              {socials.map(({ icon: Icon, url }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-white/80 text-muted shadow-card backdrop-blur transition-all hover:-translate-y-0.5 hover:text-indigo-600 hover:shadow-glow"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="relative animate-float">
            <div className="absolute inset-0 -m-4 rounded-[2rem] bg-gradient-brand opacity-20 blur-2xl" />
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border-4 border-white bg-gradient-brand-soft shadow-card-hover">
              {profile?.profileImage ? (
                <img src={profile.profileImage} alt={profile?.name || 'Profile photo'} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-indigo-300">
                  <User className="h-20 w-20" />
                </div>
              )}
            </div>
          </div>

          <motion.div
            className="absolute -bottom-10 -left-10 hidden w-[105%] animate-float-slow sm:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <TypedCode />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
