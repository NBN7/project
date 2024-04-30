import { Container } from "@/components/Container";

import { TransactionTabs } from "@/components/Transactions/TransactionTabs";

import { Separator } from "@/components/ui/separator";

export default function TransactionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container contentClassName="gap-0">
      <TransactionTabs />
      <Separator className="mb-10" />

      {children}
    </Container>
  );
}
