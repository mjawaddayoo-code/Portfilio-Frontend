import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Inbox, Trash2, Archive, Send, Mail, Phone } from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';
import Loader from '../../components/ui/Loader';
import EmptyState from '../../components/ui/EmptyState';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import StatusBadge from '../../components/admin/StatusBadge';
import api, { getErrorMessage } from '../../services/api';
import { formatDateTime } from '../../utils/format';

const FILTERS = ['All', 'New', 'Read', 'Replied', 'Archived'];

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/messages', { params: filter !== 'All' ? { status: filter } : {} });
      setMessages(data.data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, [filter]);

  const openMessage = async (msg) => {
    try {
      const { data } = await api.get(`/messages/${msg._id}`);
      setSelected(data.data);
      setReplyText('');
      fetchMessages(); // status may have flipped to Read
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const { data } = await api.patch(`/messages/${id}/status`, { status });
      toast.success(`Marked as ${status}`);
      setSelected((s) => (s?._id === id ? data.data : s));
      fetchMessages();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setSending(true);
    try {
      const { data } = await api.post(`/messages/${selected._id}/reply`, { text: replyText });
      toast.success(data.emailSent ? 'Reply sent by email' : 'Reply saved (email not configured)');
      setSelected(data.data);
      setReplyText('');
      fetchMessages();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/messages/${deleteTarget._id}`);
      toast.success('Message deleted');
      if (selected?._id === deleteTarget._id) setSelected(null);
      setDeleteTarget(null);
      fetchMessages();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout title="Messages">
      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              filter === f ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-line bg-white text-muted hover:border-indigo-300 hover:text-indigo-600'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader label="Loading messages…" />
      ) : messages.length === 0 ? (
        <EmptyState icon={Inbox} title="No messages" description="Messages from your contact form will appear here." />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <div className="card-glass divide-y divide-line overflow-hidden">
            {messages.map((m) => (
              <button
                key={m._id}
                onClick={() => openMessage(m)}
                className={`block w-full px-5 py-4 text-left transition-colors hover:bg-canvas/60 ${selected?._id === m._id ? 'bg-indigo-50/60' : ''}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate font-medium text-ink">{m.name}</p>
                  <StatusBadge status={m.status} />
                </div>
                <p className="mt-0.5 truncate text-sm text-muted">{m.subject}</p>
                <p className="mt-1 text-xs text-muted">{formatDateTime(m.createdAt)}</p>
              </button>
            ))}
          </div>

          <div className="card-glass p-6">
            {!selected ? (
              <div className="flex h-full min-h-[300px] items-center justify-center text-sm text-muted">
                Select a message to view details
              </div>
            ) : (
              <div>
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-4">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">{selected.subject}</h3>
                    <p className="mt-1 text-sm text-muted">
                      From <span className="font-medium text-ink">{selected.name}</span> · {formatDateTime(selected.createdAt)}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted">
                      <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {selected.email}</span>
                      {selected.phone && <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {selected.phone}</span>}
                    </div>
                  </div>
                  <StatusBadge status={selected.status} />
                </div>

                <div className="mt-4 rounded-lg bg-canvas p-4 text-sm leading-relaxed text-ink">
                  {selected.message}
                </div>

                {selected.replies?.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <p className="text-xs font-semibold uppercase text-muted">Your replies</p>
                    {selected.replies.map((r, i) => (
                      <div key={i} className="rounded-lg border border-indigo-100 bg-indigo-50/50 p-4 text-sm text-ink">
                        <p className="whitespace-pre-line">{r.text}</p>
                        <p className="mt-2 text-xs text-muted">
                          {formatDateTime(r.sentAt)} · {r.emailSent ? 'Emailed to visitor' : 'Saved only (email not configured)'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <form onSubmit={handleReply} className="mt-5 space-y-3">
                  <label className="label-field">Reply</label>
                  <textarea
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Write your reply…"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex gap-2">
                      {selected.status !== 'Archived' && (
                        <button type="button" onClick={() => updateStatus(selected._id, 'Archived')} className="btn-secondary !py-2 text-xs">
                          <Archive className="h-3.5 w-3.5" /> Archive
                        </button>
                      )}
                      <button type="button" onClick={() => setDeleteTarget(selected)} className="flex items-center gap-1.5 rounded-lg border border-red-200 px-4 py-2 text-xs font-semibold text-red-500 hover:bg-red-50">
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                    <button type="submit" disabled={sending || !replyText.trim()} className="btn-primary !py-2 text-xs">
                      {sending ? 'Sending…' : 'Send reply'} <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <ConfirmDialog open={!!deleteTarget} title="Delete this message?" description="This action cannot be undone." onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleting} />
    </AdminLayout>
  );
};

export default AdminMessages;
