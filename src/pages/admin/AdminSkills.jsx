import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, Boxes } from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';
import Loader from '../../components/ui/Loader';
import EmptyState from '../../components/ui/EmptyState';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import api, { getErrorMessage } from '../../services/api';

const emptyForm = { name: '', category: '', proficiency: 70 };

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/skills');
      setSkills(data.data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSkills(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (skill) => { setEditing(skill); setForm(skill); setModalOpen(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, proficiency: Number(form.proficiency) };
      if (editing) {
        await api.put(`/skills/${editing._id}`, payload);
        toast.success('Skill updated');
      } else {
        await api.post('/skills', payload);
        toast.success('Skill added');
      }
      setModalOpen(false);
      fetchSkills();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/skills/${deleteTarget._id}`);
      toast.success('Skill deleted');
      setDeleteTarget(null);
      fetchSkills();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout title="Skills">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted">{skills.length} skill(s)</p>
        <button onClick={openCreate} className="btn-primary"><Plus className="h-4 w-4" /> Add skill</button>
      </div>

      {loading ? (
        <Loader label="Loading skills…" />
      ) : skills.length === 0 ? (
        <EmptyState icon={Boxes} title="No skills yet" action={<button onClick={openCreate} className="btn-primary"><Plus className="h-4 w-4" /> Add skill</button>} />
      ) : (
        <div className="card-glass overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-canvas text-xs uppercase text-muted">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Proficiency</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {skills.map((s) => (
                <tr key={s._id} className="hover:bg-canvas/60">
                  <td className="px-5 py-3 font-medium text-ink">{s.name}</td>
                  <td className="px-5 py-3 text-muted">{s.category}</td>
                  <td className="px-5 py-3 text-muted">{s.proficiency}%</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(s)} className="rounded-lg p-2 text-muted hover:bg-canvas hover:text-indigo-600"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => setDeleteTarget(s)} className="rounded-lg p-2 text-muted hover:bg-red-50 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit skill' : 'Add skill'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-field">Name</label>
            <input required className="input-field" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="React.js" />
          </div>
          <div>
            <label className="label-field">Category</label>
            <input required className="input-field" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="Frontend" />
          </div>
          <div>
            <label className="label-field">Proficiency: {form.proficiency}%</label>
            <input type="range" min="0" max="100" className="w-full accent-indigo-500" value={form.proficiency} onChange={(e) => setForm((f) => ({ ...f, proficiency: e.target.value }))} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Saving…' : 'Save skill'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteTarget} title={`Delete "${deleteTarget?.name}"?`} description="This action cannot be undone." onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleting} />
    </AdminLayout>
  );
};

export default AdminSkills;
