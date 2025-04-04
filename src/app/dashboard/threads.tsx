import Image from "next/image";
import Linkify from "linkify-react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Accordion, AccordionItem, Divider } from "@nextui-org/react";

import LeftDrawer from "../components/left-drawer";

const Threads = ({
  leftOffset,
  isDrawerActive,
  onChangeDrawerActive,
}: {
  isDrawerActive?: boolean;
  leftOffset: string | number;
  onChangeDrawerActive?: (value: boolean) => void;
}) => {
  return (
    <LeftDrawer
      label="Threads"
      leftOffset={leftOffset}
      isActive={isDrawerActive || false}
      onClose={() =>
        onChangeDrawerActive ? onChangeDrawerActive(false) : null
      }
    >
      <div className="flex-1 flex flex-col mt-4 ml-2">
        <Divider />
        <div className="my-4">
          <label className="text-grey text-sm font-medium">Last 7 days</label>
          <Accordion isCompact variant="splitted" className="mt-2">
            <AccordionItem
              key="1"
              aria-label="How to get free smart home estimate"
              title={
                <p className="text-sm text-white font-normal">
                  How to get free smart home estimate
                </p>
              }
              className="bg-background-secondary border border-background-tertiary !rounded-md px-3 -mx-2 my-0.5"
              indicator={<ChevronRightIcon width={16} height={16} />}
            >
              <Thread />
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="What type of wireless integration available"
              title={
                <p className="text-sm text-white font-normal">
                  What type of wireless integration available
                </p>
              }
              className="bg-background-secondary border border-background-tertiary !rounded-md px-3 -mx-2 my-0.5"
              indicator={<ChevronRightIcon width={16} height={16} />}
            >
              <Thread />
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label="What will be a lum sum cost of automation"
              title={
                <p className="text-sm text-white font-normal">
                  What will be a lum sum cost of automation
                </p>
              }
              className="bg-background-secondary border border-background-tertiary !rounded-md px-3 -mx-2 my-0.5"
              indicator={<ChevronRightIcon width={16} height={16} />}
            >
              <Thread />
            </AccordionItem>
            <AccordionItem
              key="4"
              aria-label="How much I should spend in creating my h..."
              title={
                <p className="text-sm text-white font-normal">
                  How much I should spend in creating my h...
                </p>
              }
              className="bg-background-secondary border border-background-tertiary !rounded-md px-3 -mx-2 my-0.5"
              indicator={<ChevronRightIcon width={16} height={16} />}
            >
              <Thread />
            </AccordionItem>
            <AccordionItem
              key="5"
              aria-label="Can I get the devices with a discounted price"
              title={
                <p className="text-sm text-white font-normal">
                  Can I get the devices with a discounted price
                </p>
              }
              className="bg-background-secondary border border-background-tertiary !rounded-md px-3 -mx-2 my-0.5"
              indicator={<ChevronRightIcon width={16} height={16} />}
            >
              <Thread />
            </AccordionItem>
          </Accordion>
        </div>
        <div className="my-4">
          <label className="text-grey text-sm font-medium">
            Previous Chats
          </label>
          <Accordion isCompact variant="splitted" className="mt-2">
            <AccordionItem
              key="1"
              aria-label="How to get free smart home estimate"
              title={
                <p className="text-sm text-white font-normal">
                  How to get free smart home estimate
                </p>
              }
              className="bg-background-secondary border border-background-tertiary !rounded-md px-3 -mx-2 my-0.5"
              indicator={<ChevronRightIcon width={16} height={16} />}
            >
              <Thread />
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="What type of wireless integration available"
              title={
                <p className="text-sm text-white font-normal">
                  What type of wireless integration available
                </p>
              }
              className="bg-background-secondary border border-background-tertiary !rounded-md px-3 -mx-2 my-0.5"
              indicator={<ChevronRightIcon width={16} height={16} />}
            >
              <Thread />
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label="What will be a lum sum cost of automation"
              title={
                <p className="text-sm text-white font-normal">
                  What will be a lum sum cost of automation
                </p>
              }
              className="bg-background-secondary border border-background-tertiary !rounded-md px-3 -mx-2 my-0.5"
              indicator={<ChevronRightIcon width={16} height={16} />}
            >
              <Thread />
            </AccordionItem>
            <AccordionItem
              key="4"
              aria-label="How much I should spend in creating my h..."
              title={
                <p className="text-sm text-white font-normal">
                  How much I should spend in creating my h...
                </p>
              }
              className="bg-background-secondary border border-background-tertiary !rounded-md px-3 -mx-2 my-0.5"
              indicator={<ChevronRightIcon width={16} height={16} />}
            >
              <Thread />
            </AccordionItem>
            <AccordionItem
              key="5"
              aria-label="Can I get the devices with a discounted price"
              title={
                <p className="text-sm text-white font-normal">
                  Can I get the devices with a discounted price
                </p>
              }
              className="bg-background-secondary border border-background-tertiary !rounded-md px-3 -mx-2 my-0.5"
              indicator={<ChevronRightIcon width={16} height={16} />}
            >
              <Thread />
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </LeftDrawer>
  );
};

export default Threads;

const Thread = () => {
  return (
    <div className="relative mb-2 flex flex-col gap-y-2">
      <span className="w-[1px] h-full absolute left-[10px] -top-2 bg-background-tertiary z-0" />
      <div className="flex items-start gap-x-2 z-10">
        <Image
          width={20}
          height={20}
          src="/logo.svg"
          alt="inferenc"
          className="shrink-0 w-5 h-5"
        />
        <Linkify>
          <p className="[&>a]:text-primary text-sm font-normal whitespace-break-spaces break-word">
            You can use our free smart home estimator toll it easy just takes 2
            mins to complete: https://smartify.in/estimates
          </p>
        </Linkify>
      </div>
      <p className="text-sm font-normal whitespace-break-spaces break-word z-10 bg-background-secondary p-2 border border-background-tertiary rounded-md">
        After creating the estimate, can I download the estimation details?
      </p>
      <div className="flex items-start gap-x-2 z-10">
        <Image
          width={20}
          height={20}
          src="/logo.svg"
          alt="inferenc"
          className="shrink-0 w-5 h-5"
        />
        <Linkify>
          <p className="[&>a]:text-primary text-sm font-normal whitespace-break-spaces break-word">
            Yes, You can download the final estimate although it’s best to ask
            an smart home expert for and accurate automation cost.
          </p>
        </Linkify>
      </div>
      <p className="cursor-pointer text-primary z-10 ml-2 text-sm font-semibold">
        Load Chat
      </p>
    </div>
  );
};
