export const deleteUser = async (id: string) => {
  const response = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`${response.status}: ${errorData.error}`);
  }

  const data = await response.json();

  return data;
};
