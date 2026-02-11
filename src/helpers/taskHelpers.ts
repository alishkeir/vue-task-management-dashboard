export const formatStatusLabel = (status: string): string => {
  const clean = status.replace(/_/g, ' ');
  return clean.charAt(0).toUpperCase() + clean.slice(1);
};
