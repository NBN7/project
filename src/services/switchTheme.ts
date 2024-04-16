export const switchTheme = async (id: string) => {
  const response = await fetch(`/api/users/${id}/switchTheme`, {
    method: "POST",
  });
  const data = await response.json();

  return data;
};
