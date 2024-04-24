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
  const data = await response.json();

  return data;
};
