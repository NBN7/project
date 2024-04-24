import Link from "next/link";

import { Container } from "@/components/Container";
import { DynamicBreadcrumbs } from "@/components/DynamicBreadcrumbs";
import { Gradient } from "@/components/Gradient";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { FAQ } from "@/constants/faq";

import { IoChevronForward } from "react-icons/io5";

export default function DocsPage() {
  return (
    <Container>
      <div className="w-full mb-10">
        <DynamicBreadcrumbs />

        <article className="w-full mt-5">
          <div className="space-y-2 mb-5">
            <h1 className="text-4xl font-semibold">Introduction</h1>
            <p className="dark:text-greydark text-greylight ">
              Take control of your finances. Our app helps you manage your money
              smartly, easily, and quickly. Start saving and reach your
              financial goals today.
            </p>
          </div>

          <div className="space-y-4 mb-16">
            <p>
              <Gradient text="[App Name]" /> is more than just a number-tracking
              tool; it's designed to facilitate thoughtful and strategic
              financial management. Our user-friendly application not only helps
              you understand your spending habits but also empowers you to
              achieve your financial goals with ease and confidence.
            </p>

            <p>
              Whether you're monitoring daily expenses or planning long-term
              savings, <Gradient text="[App Name]" /> seamlessly fits your
              financial needs. Join us and simplify your financial management in
              ways you never imagined.
            </p>
          </div>

          <h2 className="text-xl font-semibold">FAQ</h2>
          <Accordion type="single" collapsible className="w-full mb-10">
            {FAQ.map((faq) => (
              <AccordionItem key={faq.item} value={faq.item}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="w-full flex justify-end">
            <Link href="/docs/usage">
              <Button variant="outline">
                <span>Usage</span>
                <IoChevronForward className="ml-2" />
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </Container>
  );
}
