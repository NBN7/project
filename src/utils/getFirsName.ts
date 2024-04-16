export const getFirstName = (fullName: string) => {
  const firstName = fullName.split(" ")[0];

  return firstName;
};
