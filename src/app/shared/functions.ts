export const getDatePlus5Years = (): string => {
  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() + 5);
  return currentDate.toISOString().slice(0, 10);
};
