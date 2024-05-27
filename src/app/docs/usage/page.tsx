import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { STEPS } from "@/constants/docs/steps";
import { TStep, TStepContent } from "@/types/steps";

import { ROUTES } from "@/constants/routes";

import { IoChevronBack } from "react-icons/io5";

const renderStepContent = (content: TStepContent, index: number) => {
  return (
    <li key={index}>
      <span>{content.title} </span>
      <span className="dark:text-greydark text-greylight">
        {content.description}
      </span>
    </li>
  );
};

const renderStep = (step: TStep, index: number) => {
  return (
    <li key={index}>
      <h3 className="font-semibold text-base mb-1">
        {index + 1}. {step.step}
      </h3>

      <ul>{step.content.map(renderStepContent)}</ul>

      <Separator className="sm:my-6 my-4" />
    </li>
  );
};

export default function UsagePage() {
  return (
    <div className="duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
      <article className="w-full mt-5">
        <div className="space-y-2 mb-10">
          <h1 className="text-4xl font-semibold">Usage</h1>
          <p className="dark:text-greydark text-greylight ">
            Get started with our intuitive interface. Our app allows you to
            track your expenses, and view detailed financial reports all in one
            place. Keep an eye on your daily spendings. Use it anytime, anywhere
            to maintain control over your financial health.
          </p>
        </div>

        <ul className="space-y-4 mb-16 text-sm">
          {STEPS.steps.map(renderStep)}
        </ul>
      </article>

      <div className="w-full flex justify-start">
        <Link href={ROUTES.DOCS.ROOT}>
          <Button variant="outline">
            <IoChevronBack className="mr-2" />
            <span>Introduction</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
