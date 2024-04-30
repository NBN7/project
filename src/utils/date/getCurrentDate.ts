export const getCurrentDate = () => {
  const now = new Date();

  const dateOptions = {
    weekday: "long" as const,
    year: "numeric" as const,
    month: "long" as const,
    day: "2-digit" as const,
  };

  const hourOptions = {
    hour: "numeric" as const,
    minute: "2-digit" as const,
    hour12: true,
  };

  const formattedDate = now.toLocaleDateString("en-US", dateOptions);
  const formattedHour = now.toLocaleTimeString("en-US", hourOptions);

  return `${formattedDate} at ${formattedHour}`;
};
