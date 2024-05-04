export const transformDate = (date: string | Date) => {
  const options = {
    weekday: "long" as const,
    year: "numeric" as const,
    month: "long" as const,
    day: "2-digit" as const,
  };

  const formattedDate = new Date(date).toLocaleDateString("en-US", options);

  return formattedDate;
};
