export const deleteUser = async (id: string) => {
  const response = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });
  const data = response.json();

  return data;
};
