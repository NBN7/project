import Link from "next/link";

import { Container } from "@/components/Container";
import { DynamicBreadcrumbs } from "@/components/DynamicBreadcrumbs";

import { Button } from "@/components/ui/button";

import { IoChevronBack } from "react-icons/io5";

export default function UsagePage() {
  return (
    <Container>
      <div className="w-full mb-10">
        <DynamicBreadcrumbs />

        <article className="w-full mt-5"></article>

        <div className="w-full flex justify-start">
          <Link href="/docs">
            <Button variant="outline">
              <IoChevronBack className="mr-2" />
              <span>Introduction</span>
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
