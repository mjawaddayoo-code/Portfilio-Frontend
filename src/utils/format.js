export const formatDate = (date, options = { month: 'short', year: 'numeric' }) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', options);
};

export const formatDateRange = (start, end, current) => {
  const startStr = formatDate(start);
  const endStr = current || !end ? 'Present' : formatDate(end);
  return `${startStr} — ${endStr}`;
};

export const formatDateTime = (date) =>
  new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

export const classNames = (...classes) => classes.filter(Boolean).join(' ');
