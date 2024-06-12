import { toastCall } from "@/utils/toastCall";

import type { Transaction } from "@/types/transaction";

export const downloadCSVTransactions = async (
  transactions: Transaction[] | undefined
) => {
  try {
    if (!transactions || transactions.length === 0) {
      throw new Error("No transactions to export");
    }

    const headers = Object.keys(transactions[0]).join(",");
    const rows = transactions.map((transaction) =>
      Object.values(transaction).join(",")
    );
    const csvContent = [headers, ...rows].join("\n");

    // create a blob with the transactions data as csv
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    // create a temporary url for the blob
    const url = URL.createObjectURL(blob);
    // create an anchor element which is not added to the dom
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();

    // revoke the object url to free up memory
    URL.revokeObjectURL(url);
    toastCall("Transactions exported successfully");
  } catch (error) {
    if (error instanceof Error) {
      toastCall(error.message);
    } else {
      toastCall("Failed to export transactions");
    }
  }
};
