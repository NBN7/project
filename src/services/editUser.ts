interface EditUserParams {
  id: string;
  name: string | null;
  role: string | null;
}

export const editUser = async ({ id, name, role }: EditUserParams) => {
  const response = await fetch(`/api/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, role }),
  });
  const data = response.json();

  return data;
};
