export const formatDate = (date) => {
  if (!date) return;
  const d = new Date(date);

  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
    .format(d)
    .toLowerCase();
};
