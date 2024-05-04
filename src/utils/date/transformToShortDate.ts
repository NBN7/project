export const transformToShortDate = (date: string | Date) => {
  const options = {
    day: "2-digit" as const,
    month: "2-digit" as const,
    year: "numeric" as const,
  };

  const shortDate = new Date(date).toLocaleDateString("en-GB", options); // en-GB utiliza por defecto el formato dd/mm/yyyy

  return shortDate;
};
