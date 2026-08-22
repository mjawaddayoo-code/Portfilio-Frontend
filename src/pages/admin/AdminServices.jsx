import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as Icons from 'lucide-react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';
import Loader from '../../components/ui/Loader';
import EmptyState from '../../components/ui/EmptyState';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import api, { getErrorMessage } from '../../services/api';

const emptyForm = { title: '', description: '', icon: 'Code2' };
const ICON_OPTIONS = ['Code2', 'Layout', 'Server', 'Database', 'Globe', 'Smartphone', 'Rocket', 'ShieldCheck', 'Cloud', 'GitBranch'];

const AdminServices = () => {
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
      const { data } = await api.get('/services');
      setItems(data.data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (item) => { setEditing(item); setForm(item); setModalOpen(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await api.put(`/services/${editing._id}`, form);
        toast.success('Service updated');
      } else {
        await api.post('/services', form);
        toast.success('Service added');
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
      await api.delete(`/services/${deleteTarget._id}`);
      toast.success('Service deleted');
      setDeleteTarget(null);
      fetchItems();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout title="Services">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted">{items.length} service(s)</p>
        <button onClick={openCreate} className="btn-primary"><Plus className="h-4 w-4" /> Add service</button>
      </div>

      {loading ? (
        <Loader label="Loading services…" />
      ) : items.length === 0 ? (
        <EmptyState icon={Icons.Sparkles} title="No services yet" action={<button onClick={openCreate} className="btn-primary"><Plus className="h-4 w-4" /> Add service</button>} />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = Icons[item.icon] || Icons.Code2;
            return (
              <div key={item._id} className="card-glass p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-muted">{item.description}</p>
                <div className="mt-4 flex gap-2 border-t border-line pt-4">
                  <button onClick={() => openEdit(item)} className="btn-secondary flex-1 !py-2 text-xs"><Pencil className="h-3.5 w-3.5" /> Edit</button>
                  <button onClick={() => setDeleteTarget(item)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 py-2 text-xs font-semibold text-red-500 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit service' : 'Add service'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-field">Title</label>
            <input required className="input-field" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Full-Stack Web Development" />
          </div>
          <div>
            <label className="label-field">Description</label>
            <textarea required rows={3} className="input-field resize-none" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          </div>
          <div>
            <label className="label-field">Icon</label>
            <select className="input-field" value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}>
              {ICON_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Saving…' : 'Save service'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteTarget} title={`Delete "${deleteTarget?.title}"?`} description="This action cannot be undone." onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleting} />
    </AdminLayout>
  );
};

export default AdminServices;
