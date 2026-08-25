import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Mail,
  User,
} from "lucide-react";

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.85.505 3.579 1.383 5.062L2 22l5.076-1.332A9.94 9.94 0 0 0 12.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.187a8.16 8.16 0 0 1-4.166-1.142l-.299-.177-3.012.79.804-2.936-.194-.302A8.166 8.166 0 1 1 20.166 12a8.176 8.176 0 0 1-8.165 8.187z" />
  </svg>
);

const Hero = ({ profile }) => {
  const socials = [
    { icon: Github, url: profile?.github },
    { icon: Linkedin, url: profile?.linkedin },
    { icon: Facebook, url: profile?.facebook },
    { icon: Instagram, url: profile?.instagram },
    {
      icon: WhatsAppIcon,
      url: profile?.whatsapp
        ? `https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`
        : null,
    },
    {
      icon: Mail,
      url: profile?.email ? `mailto:${profile.email}` : null,
    },
  ].filter((s) => s.url);

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-hero" />

      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-60 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_60%,transparent_100%)]" />

      {/* Left Glow */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-20 top-40 h-72 w-72 rounded-full bg-cyan-100 opacity-70 blur-3xl"
      />

      {/* Right Glow */}
      <motion.div
        animate={{
          x: [0, -25, 0],
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-16 top-10 h-80 w-80 rounded-full bg-violet-100 opacity-70 blur-3xl"
      />

      <div className="container-app relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">

        {/* ================= LEFT CONTENT ================= */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          {/* Availability */}
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            className="eyebrow inline-flex rounded-full bg-white/70 px-4 py-2 shadow-sm backdrop-blur"
          >
            <motion.span
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.6, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="h-1.5 w-1.5 rounded-full bg-mint-400"
            />

            Available for new projects
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.35,
              ease: "easeOut",
            }}
            className="mt-6 text-4xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-6xl"
          >
            {profile?.name || "Muhammad Jawad"},
            <br />

            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.55,
              }}
              className="text-gradient"
            >
              MERN-Stack
            </motion.span>{" "}
            Developer.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.7,
            }}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
          >
            I’m a MERN Stack Developer focused on building modern,
            user-friendly web applications, along with smart workflow
            automation and process optimization.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.85,
            }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#contact"
              whileHover={{
                scale: 1.05,
                y: -4,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="btn-primary"
            >
              Start a project
              <ArrowRight className="h-4 w-4" />
            </motion.a>

            {profile?.resumeUrl && (
              <motion.a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.05,
                  y: -4,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="btn-secondary"
              >
                <Download className="h-4 w-4" />
                Resume
              </motion.a>
            )}
          </motion.div>

          {/* Social Icons */}
          {socials.length > 0 && (
            <div className="mt-8 flex items-center gap-2.5">
              {socials.map(({ icon: Icon, url }, i) => (
                <motion.a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{
                    opacity: 0,
                    y: 20,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: 1 + i * 0.1,
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.12,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-white/80 text-muted shadow-card backdrop-blur transition-colors hover:text-indigo-600 hover:shadow-glow"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          )}
        </motion.div>

        {/* ================= RIGHT SIDE ================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.65,
            rotate: -10,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.3,
            type: "spring",
            stiffness: 90,
            damping: 12,
          }}
          className="relative mx-auto w-full max-w-[380px]"
        >
          {/* Big Glow */}
          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.18, 0.35, 0.18],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-8 rounded-[3rem] bg-gradient-brand blur-3xl"
          />

          {/* Rotating Ring */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -inset-4 rounded-[3rem] border border-dashed border-indigo-300/40"
          />

          {/* Profile Picture */}
          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.05,
              rotate: 2,
            }}
            className="group relative aspect-square overflow-hidden rounded-[2.5rem] border-[6px] border-white bg-gradient-brand-soft shadow-2xl"
          >
            {profile?.profileImage ? (
              <img
                src={profile.profileImage}
                alt={profile?.name || "Profile photo"}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-indigo-300">
                <User className="h-24 w-24" />
              </div>
            )}

            {/* Image Shine */}
            <motion.div
              initial={{ x: "-150%" }}
              animate={{ x: "150%" }}
              transition={{
                duration: 1.2,
                delay: 1.5,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute inset-y-0 w-1/3 skew-x-[-20deg] bg-white/25 blur-lg"
            />
          </motion.div>

          {/* Floating Code Badge */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -8, 0],
            }}
            transition={{
              opacity: {
                duration: 0.3,
                delay: 1,
              },
              scale: {
                duration: 0.5,
                delay: 1,
                type: "spring",
              },
              y: {
                duration: 3,
                delay: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="absolute -right-5 top-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white bg-white text-lg font-bold text-indigo-500 shadow-xl"
          >
            {"</>"}
          </motion.div>

          {/* Floating Automation Badge */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, 8, 0],
            }}
            transition={{
              opacity: {
                duration: 0.3,
                delay: 1.2,
              },
              scale: {
                duration: 0.5,
                delay: 1.2,
                type: "spring",
              },
              y: {
                duration: 3.5,
                delay: 1.7,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="absolute -bottom-4 -left-4 flex h-14 w-14 items-center justify-center rounded-full border border-white bg-white text-xl shadow-xl"
          >
            ⚡
          </motion.div>

          {/* Floating Stars */}
          <motion.span
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 1, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-7 top-20 text-2xl text-indigo-400"
          >
            ✦
          </motion.span>

          <motion.span
            animate={{
              y: [0, 15, 0],
              opacity: [0.3, 1, 0.3],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-8 bottom-24 text-xl text-violet-400"
          >
            ✦
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;