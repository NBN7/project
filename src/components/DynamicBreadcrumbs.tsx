"use client";

import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const DynamicBreadcrumbs = () => {
  const pathname = usePathname();

  const pathnames = pathname
    .split("/")
    .filter((path) => path && path !== "docs");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage className="dark:text-greydark text-greylight">
            Docs
          </BreadcrumbPage>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {pathnames.length === 0 && (
          <BreadcrumbItem>
            <BreadcrumbPage>Introduction</BreadcrumbPage>
          </BreadcrumbItem>
        )}

        {pathnames.map((path) => (
          <BreadcrumbItem key={path}>
            <BreadcrumbPage className="capitalize">{path}</BreadcrumbPage>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
