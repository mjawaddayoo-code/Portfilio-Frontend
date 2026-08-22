import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Github, Linkedin, Facebook, Instagram } from 'lucide-react';
import toast from 'react-hot-toast';
import SectionHeading from './SectionHeading';
import api, { getErrorMessage } from '../../services/api';

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' };

const Contact = ({ profile }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (form.message.trim().length < 5) errs.message = 'Message is too short';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const { data } = await api.post('/messages', form);
      setSubmitted(data);
      setForm(initialForm);
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container-app grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something together."
            description="Have a project in mind or a role to fill? Send a message and I'll get back to you personally."
          />

          <div className="mt-8 space-y-3">
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="card-glass flex items-center gap-3 px-4 py-3 text-sm text-ink transition-all hover:-translate-y-0.5 hover:shadow-glow">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-sm">
                  <Mail className="h-4 w-4" />
                </span>
                {profile.email}
              </a>
            )}
            {profile?.phone && (
              <a href={`tel:${profile.phone}`} className="card-glass flex items-center gap-3 px-4 py-3 text-sm text-ink transition-all hover:-translate-y-0.5 hover:shadow-glow-cyan">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-white shadow-sm">
                  <Phone className="h-4 w-4" />
                </span>
                {profile.phone}
              </a>
            )}
            {profile?.location && (
              <div className="card-glass flex items-center gap-3 px-4 py-3 text-sm text-ink">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-violet-500 text-white shadow-sm">
                  <MapPin className="h-4 w-4" />
                </span>
                {profile.location}
              </div>
            )}
          </div>

          {(profile?.github || profile?.linkedin || profile?.facebook || profile?.instagram) && (
            <div className="mt-6 flex gap-2.5">
              {profile?.github && (
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-white/80 text-muted shadow-card backdrop-blur transition-all hover:-translate-y-0.5 hover:text-indigo-600">
                  <Github className="h-4 w-4" />
                </a>
              )}
              {profile?.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-white/80 text-muted shadow-card backdrop-blur transition-all hover:-translate-y-0.5 hover:text-indigo-600">
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {profile?.facebook && (
                <a href={profile.facebook} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-white/80 text-muted shadow-card backdrop-blur transition-all hover:-translate-y-0.5 hover:text-indigo-600">
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {profile?.instagram && (
                <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-white/80 text-muted shadow-card backdrop-blur transition-all hover:-translate-y-0.5 hover:text-indigo-600">
                  <Instagram className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="card-glass p-6 shadow-card-hover sm:p-8"
        >
          {submitted ? (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-mint-500/10 text-mint-500">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">Message received!</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{submitted.message}</p>
              <button onClick={() => setSubmitted(null)} className="btn-secondary mt-6">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="label-field" htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Muhammad Jawad"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label className="label-field" htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="jawad@company.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="label-field" htmlFor="phone">Phone <span className="text-muted font-normal">(optional)</span></label>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="+92 555 000 1234"
                  />
                </div>
                <div>
                  <label className="label-field" htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Project inquiry"
                  />
                  {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                </div>
              </div>

              <div>
                <label className="label-field" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="input-field resize-none"
                  placeholder="Tell me about your project…"
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
              </div>

              <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto">
                {submitting ? 'Sending…' : 'Send message'} <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
