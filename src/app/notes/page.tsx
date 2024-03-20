"use client";

import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

import { IoIosInformationCircleOutline } from "react-icons/io";

export default function NotesPage() {
  return (
    <main className="w-full flex flex-col items-center">
      <Tabs
        classNames={{
          cursor: "w-full bg-gradient-to-tr from-[#0070F0] to-[#19cfff]",
          tabContent: "group-data-[selected=true]:text-white",
        }}
        aria-label="Tabs"
        radius="lg"
      >
        <Tab key="Recent" title="Recent">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 p-2">
            <Card className="max-w-[400px]">
              <div className="absolute z-50 top-0 right-0 flex items-center justify-center w-12 h-12 ">
                <Popover placement="top" backdrop="opaque">
                  <PopoverTrigger>
                    <Button
                      className="bg-transparent"
                      isIconOnly
                      radius="full"
                      aria-label="Information"
                    >
                      <IoIosInformationCircleOutline className="dark:text-icondark"/>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <h4 className="text-small font-bold">Technologies</h4>
                      <p className="text-tiny">paragraph</p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md">NextUI</p>
                  <p className="text-small text-default-500">nextui.org</p>
                </div>
              </CardHeader>
              <CardBody>
                <p>
                  Make beautiful websites regardless of your design experience.
                </p>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
            <Card className="max-w-[400px]">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md">NextUI</p>
                  <p className="text-small text-default-500">nextui.org</p>
                </div>
              </CardHeader>
              <CardBody>
                <p>
                  Make beautiful websites regardless of your design experience.
                </p>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
            <Card className="max-w-[400px]">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md">NextUI</p>
                  <p className="text-small text-default-500">nextui.org</p>
                </div>
              </CardHeader>
              <CardBody>
                <p>
                  Make beautiful websites regardless of your design experience.
                </p>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
          </div>
        </Tab>
        <Tab key="Important" title="Important">
          <p>Tab 2</p>
        </Tab>
        <Tab key="Other" title="Other">
          <p>Tab 3</p>
        </Tab>
      </Tabs>
    </main>
  );
}
