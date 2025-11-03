export const getDaysUntilDue = (dueDay) => {
  const today = new Date();
  const utcToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());

  const buildDue = (year, month, day) => {
    const candidate = new Date(year, month, day);
    if (candidate.getDate() !== day) return new Date(year, month + 1, 0);
    return candidate;
  };

  let dueDate = buildDue(today.getFullYear(), today.getMonth(), Number(dueDay));
  if (Date.UTC(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate()) <= utcToday) {
    const next = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    dueDate = buildDue(next.getFullYear(), next.getMonth(), Number(dueDay));
  }

  const utcDue = Date.UTC(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
  return Math.ceil((utcDue - utcToday) / (1000 * 60 * 60 * 24));
};
