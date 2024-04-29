import Link from "next/link";

import { Container } from "@/components/Container";
import { DynamicBreadcrumbs } from "@/components/DynamicBreadcrumbs";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Gradient } from "@/components/Gradient";

import { STEPS } from "@/constants/steps";
import { TStep, TStepContent } from "@/types/steps";

import { IoChevronBack } from "react-icons/io5";

const renderStepsContent = (content: TStepContent, index: number) => {
  return (
    <li key={index}>
      <span>{content.title} </span>
      <span className="dark:text-greydark text-greylight">
        {content.description}
      </span>
    </li>
  );
};

const renderSteps = (step: TStep, index: number) => {
  return (
    <li key={index}>
      <h3 className="font-semibold text-lg mb-1">
        {index + 1}. {step.step}
      </h3>

      <ul>{step.content.map(renderStepsContent)}</ul>

      <Separator className="my-4" />
    </li>
  );
};

export default function UsagePage() {
  return (
    <Container>
      <div className="w-full mb-10">
        <DynamicBreadcrumbs />

        <article className="w-full mt-5">
          <div className="space-y-2 mb-10">
            <h1 className="text-4xl font-semibold">Usage</h1>
            <p className="dark:text-greydark text-greylight ">
              Get started with our intuitive interface. Our app allows you to
              track your expenses, and view detailed financial reports all in
              one place. Keep an eye on your daily spendings. Use it
              anytime, anywhere to maintain control over your financial health.
            </p>
          </div>

          <div className="space-y-4 mb-16">
            <ul>{STEPS.steps.map(renderSteps)}</ul>
          </div>
        </article>

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
