export const getUsernameAbbreviation = (name: string) => {
  const nameAbbreviation = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return nameAbbreviation;
};
