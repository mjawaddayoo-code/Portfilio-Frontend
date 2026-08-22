import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, Award, ExternalLink } from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';
import Loader from '../../components/ui/Loader';
import EmptyState from '../../components/ui/EmptyState';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import ImageUploadField from '../../components/admin/ImageUploadField';
import api, { getErrorMessage } from '../../services/api';
import { formatDate } from '../../utils/format';

const emptyForm = { title: '', organization: '', image: '', issueDate: '', certificateUrl: '' };
const toInputDate = (d) => (d ? new Date(d).toISOString().slice(0, 10) : '');

const AdminCertificates = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/certificates');
      setItems(data.data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (item) => {
    setEditing(item);
    setForm({ ...item, issueDate: toInputDate(item.issueDate) });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await api.put(`/certificates/${editing._id}`, form);
        toast.success('Certificate updated');
      } else {
        await api.post('/certificates', form);
        toast.success('Certificate added');
      }
      setModalOpen(false);
      fetchItems();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/certificates/${deleteTarget._id}`);
      toast.success('Certificate deleted');
      setDeleteTarget(null);
      fetchItems();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout title="Certificates">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted">{items.length} certificate(s)</p>
        <button onClick={openCreate} className="btn-primary"><Plus className="h-4 w-4" /> Add certificate</button>
      </div>

      {loading ? (
        <Loader label="Loading certificates…" />
      ) : items.length === 0 ? (
        <EmptyState icon={Award} title="No certificates yet" description="Add your first certificate to showcase it on the public site." action={<button onClick={openCreate} className="btn-primary"><Plus className="h-4 w-4" /> Add certificate</button>} />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((cert) => (
            <div key={cert._id} className="card-glass overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-brand-soft">
                {cert.image ? (
                  <img src={cert.image} alt={cert.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-violet-300">
                    <Award className="h-8 w-8" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <span className="font-mono text-xs text-violet-500">{formatDate(cert.issueDate)}</span>
                <h3 className="mt-1 font-display text-base font-semibold text-ink">{cert.title}</h3>
                <p className="mt-1 text-sm text-muted">{cert.organization}</p>
                {cert.certificateUrl && (
                  <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:underline">
                    View link <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                <div className="mt-4 flex gap-2 border-t border-line pt-4">
                  <button onClick={() => openEdit(cert)} className="btn-secondary flex-1 !py-2 text-xs"><Pencil className="h-3.5 w-3.5" /> Edit</button>
                  <button onClick={() => setDeleteTarget(cert)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 py-2 text-xs font-semibold text-red-500 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit certificate' : 'Add certificate'} maxWidth="max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <ImageUploadField
            label="Certificate image"
            value={form.image}
            onChange={(url) => setForm((f) => ({ ...f, image: url }))}
            aspect="aspect-[4/3]"
            rounded="rounded-xl"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-field">Certificate title</label>
              <input required className="input-field" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            </div>
            <div>
              <label className="label-field">Issuing organization</label>
              <input required className="input-field" value={form.organization} onChange={(e) => setForm((f) => ({ ...f, organization: e.target.value }))} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-field">Issue date</label>
              <input required type="date" className="input-field" value={form.issueDate} onChange={(e) => setForm((f) => ({ ...f, issueDate: e.target.value }))} />
            </div>
            <div>
              <label className="label-field">Certificate URL <span className="text-muted font-normal">(optional)</span></label>
              <input className="input-field" placeholder="https://…" value={form.certificateUrl} onChange={(e) => setForm((f) => ({ ...f, certificateUrl: e.target.value }))} />
            </div>
          </div>
          <p className="text-xs text-muted">
            If a Certificate URL is set, &quot;View Certificate&quot; opens it in a new tab. Otherwise it opens the uploaded image in a preview.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Saving…' : 'Save certificate'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteTarget} title={`Delete "${deleteTarget?.title}"?`} description="This action cannot be undone." onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleting} />
    </AdminLayout>
  );
};

export default AdminCertificates;
