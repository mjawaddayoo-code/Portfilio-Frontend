const styles = {
  New: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  Read: 'bg-slate-50 text-slate-600 border-slate-200',
  Replied: 'bg-mint-500/10 text-mint-500 border-mint-500/20',
  Archived: 'bg-amber-400/10 text-amber-500 border-amber-400/20',
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
      styles[status] || styles.New
    }`}
  >
    {status}
  </span>
);

export default StatusBadge;
