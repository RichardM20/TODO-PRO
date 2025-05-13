export const getCardColor = (index: number) => {
  const colors = ["bg-amber-100", "bg-sky-100", "bg-rose-100", "bg-orange-100"];
  return colors[index % colors.length];
};

export const getTypeColor = (index: number) => {
  const colors = ["bg-purple-50", "bg-sky-50", "bg-rose-50", "bg-red-50"];
  return colors[index % colors.length];
};
