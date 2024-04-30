import { Container } from "@/components/Container";

import { GoalsTabs } from "@/components/Goals/GoalsTabs";

import { Separator } from "@/components/ui/separator";

export default function GoalsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container contentClassName="gap-0">
      <GoalsTabs />
      <Separator className="mb-10" />

      {children}
    </Container>
  );
}
