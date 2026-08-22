import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, Star, Github, ExternalLink, FolderKanban } from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';
import Loader from '../../components/ui/Loader';
import EmptyState from '../../components/ui/EmptyState';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import ImageUploadField from '../../components/admin/ImageUploadField';
import api, { getErrorMessage } from '../../services/api';

const emptyForm = {
  title: '',
  description: '',
  image: '',
  technologies: '',
  githubUrl: '',
  liveUrl: '',
  category: 'Full-Stack',
  featured: false,
};

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/projects');
      setProjects(data.data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (project) => {
    setEditing(project);
    setForm({
      ...project,
      technologies: (project.technologies || []).join(', '),
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      technologies: form.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };
    try {
      if (editing) {
        await api.put(`/projects/${editing._id}`, payload);
        toast.success('Project updated');
      } else {
        await api.post('/projects', payload);
        toast.success('Project created');
      }
      setModalOpen(false);
      fetchProjects();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/projects/${deleteTarget._id}`);
      toast.success('Project deleted');
      setDeleteTarget(null);
      fetchProjects();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout title="Projects">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted">{projects.length} project(s)</p>
        <button onClick={openCreate} className="btn-primary">
          <Plus className="h-4 w-4" /> Add project
        </button>
      </div>

      {loading ? (
        <Loader label="Loading projects…" />
      ) : projects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No projects yet"
          description="Add your first project to showcase it on the public site."
          action={
            <button onClick={openCreate} className="btn-primary">
              <Plus className="h-4 w-4" /> Add project
            </button>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project._id} className="card-glass overflow-hidden transition-all hover:-translate-y-1 hover:shadow-glow">
              <div className="relative aspect-video bg-canvas">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-indigo-200">
                    <FolderKanban className="h-8 w-8" />
                  </div>
                )}
                {project.featured && (
                  <span className="badge-gradient absolute right-2 top-2">
                    <Star className="mr-1 h-3 w-3 fill-white" /> Featured
                  </span>
                )}
              </div>
              <div className="p-4">
                <span className="font-mono text-xs text-indigo-500">{project.category}</span>
                <h3 className="mt-1 font-display text-base font-semibold text-ink">{project.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{project.description}</p>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted">
                  {project.githubUrl && <Github className="h-3.5 w-3.5" />}
                  {project.liveUrl && <ExternalLink className="h-3.5 w-3.5" />}
                </div>
                <div className="mt-4 flex gap-2 border-t border-line pt-4">
                  <button onClick={() => openEdit(project)} className="btn-secondary flex-1 !py-2 text-xs">
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteTarget(project)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 py-2 text-xs font-semibold text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit project' : 'Add project'} maxWidth="max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-field">Title</label>
            <input required className="input-field" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          </div>
          <div>
            <label className="label-field">Description</label>
            <textarea required rows={3} className="input-field resize-none" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          </div>
          <ImageUploadField
            label="Project image"
            value={form.image}
            onChange={(url) => setForm((f) => ({ ...f, image: url }))}
            aspect="aspect-video"
            rounded="rounded-xl"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-field">GitHub URL</label>
              <input className="input-field" value={form.githubUrl} onChange={(e) => setForm((f) => ({ ...f, githubUrl: e.target.value }))} />
            </div>
            <div>
              <label className="label-field">Live Demo URL</label>
              <input className="input-field" value={form.liveUrl} onChange={(e) => setForm((f) => ({ ...f, liveUrl: e.target.value }))} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-field">Category</label>
              <input className="input-field" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} />
            </div>
            <div>
              <label className="label-field">Technologies (comma-separated)</label>
              <input className="input-field" placeholder="React, Node.js, MongoDB" value={form.technologies} onChange={(e) => setForm((f) => ({ ...f, technologies: e.target.value }))} />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} className="h-4 w-4 rounded border-line text-indigo-500 focus:ring-indigo-300" />
            Mark as featured
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Saving…' : 'Save project'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title={`Delete "${deleteTarget?.title}"?`}
        description="This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </AdminLayout>
  );
};

export default AdminProjects;
