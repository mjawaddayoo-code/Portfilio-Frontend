import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Save, KeyRound } from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';
import Loader from '../../components/ui/Loader';
import ImageUploadField from '../../components/admin/ImageUploadField';
import { useAuth } from '../../context/AuthContext';
import api, { getErrorMessage } from '../../services/api';

const FIELDS = [
  { key: 'name', label: 'Full name' },
  { key: 'title', label: 'Professional title' },
  { key: 'email', label: 'Public email' },
  { key: 'phone', label: 'Phone' },
  { key: 'location', label: 'Location' },
  { key: 'resumeUrl', label: 'Resume/CV URL' },
];

const SOCIAL_FIELDS = [
  { key: 'github', label: 'GitHub URL' },
  { key: 'linkedin', label: 'LinkedIn URL' },
  { key: 'facebook', label: 'Facebook URL' },
  { key: 'instagram', label: 'Instagram URL' },
  { key: 'whatsapp', label: 'WhatsApp number (with country code)' },
  { key: 'twitter', label: 'Twitter URL' },
  { key: 'website', label: 'Website URL' },
];

const AdminProfile = () => {
  const { setAdmin } = useAuth();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [pwSaving, setPwSaving] = useState(false);

  useEffect(() => {
    api
      .get('/auth/me')
      .then(({ data }) => setForm(data.admin))
      .catch((error) => toast.error(getErrorMessage(error)))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put('/profile', form);
      setAdmin(data.data);
      localStorage.setItem('portfolio_admin', JSON.stringify(data.data));
      toast.success('Profile updated — changes are live on your portfolio');
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    setPwSaving(true);
    try {
      await api.put('/profile/password', {
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      });
      toast.success('Password updated');
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setPwSaving(false);
    }
  };

  if (loading || !form) {
    return (
      <AdminLayout title="Profile Settings">
        <Loader fullHeight label="Loading profile…" />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Profile Settings">
      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <form onSubmit={handleSave} className="card-glass space-y-6 p-6">
          <div>
            <h2 className="font-display text-base font-semibold text-ink">Photo &amp; logo</h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <ImageUploadField
                label="Profile photo"
                value={form.profileImage}
                onChange={(url) => setForm((f) => ({ ...f, profileImage: url }))}
                aspect="aspect-square"
                rounded="rounded-2xl"
                helpText="Shown in the Hero section of your portfolio."
              />
              <ImageUploadField
                label="Logo"
                value={form.logoUrl}
                onChange={(url) => setForm((f) => ({ ...f, logoUrl: url }))}
                aspect="aspect-square"
                rounded="rounded-xl"
                helpText="Shown in the navbar, footer and favicon."
              />
            </div>
          </div>

          <div>
            <h2 className="font-display text-base font-semibold text-ink">Public profile</h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              {FIELDS.map(({ key, label }) => (
                <div key={key}>
                  <label className="label-field">{label}</label>
                  <input
                    className="input-field"
                    value={form[key] || ''}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  />
                </div>
              ))}
            </div>
            <div className="mt-5">
              <label className="label-field">Bio</label>
              <textarea
                rows={4}
                className="input-field resize-none"
                value={form.bio || ''}
                onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <h2 className="font-display text-base font-semibold text-ink">Social &amp; contact links</h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              {SOCIAL_FIELDS.map(({ key, label }) => (
                <div key={key}>
                  <label className="label-field">{label}</label>
                  <input
                    className="input-field"
                    value={form[key] || ''}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end border-t border-line pt-5">
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? 'Saving…' : 'Save changes'} <Save className="h-4 w-4" />
            </button>
          </div>
        </form>

        <form onSubmit={handlePasswordChange} className="card-glass h-fit space-y-5 p-6">
          <h2 className="font-display text-base font-semibold text-ink">Change password</h2>
          <div>
            <label className="label-field">Current password</label>
            <input
              type="password"
              required
              className="input-field"
              value={pwForm.currentPassword}
              onChange={(e) => setPwForm((f) => ({ ...f, currentPassword: e.target.value }))}
            />
          </div>
          <div>
            <label className="label-field">New password</label>
            <input
              type="password"
              required
              minLength={6}
              className="input-field"
              value={pwForm.newPassword}
              onChange={(e) => setPwForm((f) => ({ ...f, newPassword: e.target.value }))}
            />
          </div>
          <div>
            <label className="label-field">Confirm new password</label>
            <input
              type="password"
              required
              minLength={6}
              className="input-field"
              value={pwForm.confirmPassword}
              onChange={(e) => setPwForm((f) => ({ ...f, confirmPassword: e.target.value }))}
            />
          </div>
          <button type="submit" disabled={pwSaving} className="btn-secondary w-full">
            {pwSaving ? 'Updating…' : 'Update password'} <KeyRound className="h-4 w-4" />
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
