import { TSteps } from "@/types";

export const STEPS: TSteps = Object.freeze({
  steps: [
    {
      step: "Registration",
      content: [
        {
          title: "Open the app:",
          description: "Launch the app and sign up using your Google account.",
        },
      ],
    },
    {
      step: "Create a transaction",
      content: [
        {
          title: "Transaction creation:",
          description:
            'Navigate to "Create" in the "Transactions" section, enter details and save.',
        },
      ],
    },
    {
      step: "View your finances",
      content: [
        {
          title: "Review transactions:",
          description:
            'View and manage your transactions and overall balance in the "Transactions" section.',
        },
      ],
    },
    {
      step: "Set and Track Goals",
      content: [
        {
          title: "Manage goals:",
          description:
            'Go to the "Goals" section to create, view, and track your financial goals.',
        },
      ],
    },
    {
      step: "Analyze Monthly Expenses",
      content: [
        {
          title: "Examine expenses:",
          description:
            'Check your spending patterns via charts in the "Profile" section.',
        },
      ],
    },
    {
      step: "Export Transactions",
      content: [
        {
          title: "Data export:",
          description:
            'Download your transaction details as a JSON or CSV file from the "Profile" section.',
        },
      ],
    },
  ],
} as const);
