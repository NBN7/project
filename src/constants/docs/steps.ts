import { TSteps } from "@/types/steps";

export const STEPS: TSteps = Object.freeze({
  steps: [
    {
      step: "Registration",
      content: [
        {
          title: "Open the app:",
          description: "Launch the app on your device.",
        },
        {
          title: "Create an account:",
          description: "Sign up using your google account.",
        },
      ],
    },
    {
      step: "Create a transaction",
      content: [
        {
          title: 'Navigate to the "Create" section:',
          description: 'Once logged in, go to "Create".',
        },
        {
          title: "Enter transaction details:",
          description:
            "Add the description, amount, and date of the transaction.",
        },
        {
          title: "Save the transaction:",
          description:
            'Review the details and confirm by clicking "Create transaction" to add it to your account.',
        },
      ],
    },
    {
      step: "View your finances",
      content: [
        {
          title: 'Go to the "Application" section:',
          description:
            "Here, you can view your overall balance and all past transactions.",
        },
        {
          title: "Manage transactions:",
          description:
            "If necessary, you can delete individual or all transactions from this section to keep your records up-to-date.",
        },
      ],
    },
    {
      step: "Analyze Monthly Expenses",
      content: [
        {
          title: 'Visit the "Profile" section:',
          description:
            "Access graphs and charts that visualize your spending habits over the month.",
        },
        {
          title: "Adjust settings:",
          description:
            "In the same section, you can also update your name and description as needed to personalize your profile.",
        },
      ],
    },
  ],
} as const);
