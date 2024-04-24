import { Container } from "@/components/Container";
import { DynamicBreadcrumbs } from "@/components/DynamicBreadcrumbs";

export default function UsagePage() {
  return (
    <Container>
      <div className="w-full mb-10">
        <DynamicBreadcrumbs />
      </div>
    </Container>
  );
}
