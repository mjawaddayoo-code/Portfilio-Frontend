import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, GraduationCap } from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';
import Loader from '../../components/ui/Loader';
import EmptyState from '../../components/ui/EmptyState';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import api, { getErrorMessage } from '../../services/api';
import { formatDateRange } from '../../utils/format';

const emptyForm = { degree: '', institution: '', location: '', startDate: '', endDate: '', current: false, grade: '', description: '' };
const toInputDate = (d) => (d ? new Date(d).toISOString().slice(0, 10) : '');

const AdminEducation = () => {
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
      const { data } = await api.get('/education');
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
    setForm({ ...item, startDate: toInputDate(item.startDate), endDate: toInputDate(item.endDate) });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, endDate: form.current ? null : form.endDate || null };
    try {
      if (editing) {
        await api.put(`/education/${editing._id}`, payload);
        toast.success('Education updated');
      } else {
        await api.post('/education', payload);
        toast.success('Education added');
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
      await api.delete(`/education/${deleteTarget._id}`);
      toast.success('Education deleted');
      setDeleteTarget(null);
      fetchItems();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout title="Education">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted">{items.length} entr{items.length === 1 ? 'y' : 'ies'}</p>
        <button onClick={openCreate} className="btn-primary"><Plus className="h-4 w-4" /> Add education</button>
      </div>

      {loading ? (
        <Loader label="Loading education…" />
      ) : items.length === 0 ? (
        <EmptyState icon={GraduationCap} title="No education yet" action={<button onClick={openCreate} className="btn-primary"><Plus className="h-4 w-4" /> Add education</button>} />
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item._id} className="card-glass flex items-start justify-between gap-4 p-5">
              <div>
                <span className="font-mono text-xs text-indigo-500">{formatDateRange(item.startDate, item.endDate, item.current)}</span>
                <h3 className="mt-1 font-display text-base font-semibold text-ink">{item.degree}</h3>
                <p className="text-sm text-muted">{item.institution}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => openEdit(item)} className="rounded-lg p-2 text-muted hover:bg-canvas hover:text-indigo-600"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => setDeleteTarget(item)} className="rounded-lg p-2 text-muted hover:bg-red-50 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit education' : 'Add education'} maxWidth="max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-field">Degree</label>
              <input required className="input-field" value={form.degree} onChange={(e) => setForm((f) => ({ ...f, degree: e.target.value }))} />
            </div>
            <div>
              <label className="label-field">Institution</label>
              <input required className="input-field" value={form.institution} onChange={(e) => setForm((f) => ({ ...f, institution: e.target.value }))} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-field">Location</label>
              <input className="input-field" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />
            </div>
            <div>
              <label className="label-field">Grade</label>
              <input className="input-field" value={form.grade} onChange={(e) => setForm((f) => ({ ...f, grade: e.target.value }))} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-field">Start date</label>
              <input required type="date" className="input-field" value={form.startDate} onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))} />
            </div>
            <div>
              <label className="label-field">End date</label>
              <input type="date" disabled={form.current} className="input-field disabled:opacity-50" value={form.endDate} onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))} />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="checkbox" checked={form.current} onChange={(e) => setForm((f) => ({ ...f, current: e.target.checked }))} className="h-4 w-4 rounded border-line text-indigo-500 focus:ring-indigo-300" />
            Currently studying here
          </label>
          <div>
            <label className="label-field">Description</label>
            <textarea rows={3} className="input-field resize-none" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Saving…' : 'Save'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteTarget} title={`Delete "${deleteTarget?.degree}"?`} description="This action cannot be undone." onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleting} />
    </AdminLayout>
  );
};

export default AdminEducation;
