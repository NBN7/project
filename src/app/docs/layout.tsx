import { Container } from "@/components/Container";
import { DynamicBreadcrumbs } from "@/components/DynamicBreadcrumbs";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container>
      <div className="w-full mb-10">
        <DynamicBreadcrumbs />
        {children}
      </div>
    </Container>
  );
}
