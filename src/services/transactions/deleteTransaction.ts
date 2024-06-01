export const deleteTransaction = async (
  userId: string,
  transactionId: string
) => {
  const response = await fetch(
    `api/users/${userId}/transactions/${transactionId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`${response.status}: ${errorData.error}`);
  }

  const data = await response.json();

  return data;
};
