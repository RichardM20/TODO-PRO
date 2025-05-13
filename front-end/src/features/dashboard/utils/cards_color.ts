export const getCardColor = (index: number) => {
  const colors = ["bg-amber-100", "bg-sky-100", "bg-rose-100", "bg-orange-100"];
  return colors[index % colors.length];
};
