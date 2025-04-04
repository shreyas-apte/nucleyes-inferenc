"use client";

import { useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Avatar } from "@nextui-org/react";
import { CameraIcon } from "@heroicons/react/24/solid";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";

import AddUrls from "./add-urls";
import AllApps from "./all-apps";
import { gptModels } from "../constants";
import UploadFiles from "./upload-files";
import CloudPlatforms from "./cloud-platforms";
import { AssistantBasicDetails } from "../types/assistant.type";

import TrashIcon from "../assets/icons/trash.svg";
import CloneIcon from "../assets/icons/clone.svg";
import SettingsIcon from "../assets/icons/settings.svg";
import PlusCircleSolidIcon from "../assets/icons/plus-circle-solid.svg";

// const views = ["info", "model", "data-source"] as const;
// type View = (typeof views)[number];

const AssistantInfo = ({
  onResize,
  basicDetails,
}: {
  basicDetails: AssistantBasicDetails;
  onResize?: ({ width, height }: { width: number; height: number }) => void;
}) => {
  const assistantInfoRef = useRef<HTMLDivElement>(null);
  // const [activeView, setActiveView] = useState<View>("info");
  const onDrop = useCallback((_acceptedFiles: File[]) => {
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    const sidebar = assistantInfoRef.current;
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      // NOTE: min-width: 300, 32 is horizontal padding, 1px for right border
      onResize?.({ width: width > 300 ? width + 32 + 1 : 300 + 1, height });
    });

    if (sidebar) {
      resizeObserver.observe(sidebar);
    }

    return () => {
      if (sidebar) {
        resizeObserver.unobserve(sidebar);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={assistantInfoRef}
      className="bg-background-primary border-r-1 border-background-tertiary flex-shrink-0 min-w-[300px] w-1/5 px-4 py-6 max-h-[calc(100vh-76px)] overflow-y-auto no-scrollbar"
    >
      <div className="pb-5 border-b-1 border-background-tertiary flex items-center justify-between gap-x-2">
        <Button
          radius="sm"
          variant="solid"
          color="primary"
          startContent={
            <PlusCircleSolidIcon className="w-4 h-4 text-white shrink-0" />
          }
        >
          Create New
        </Button>
        <div className="flex-1 shrink-0">
          <Select
            fullWidth
            radius="sm"
            variant="bordered"
            labelPlacement="outside"
            placeholder="Select Assistant"
          >
            {gptModels.map((model) => (
              <SelectItem key={model.value} value={model.value}>
                {model.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      {/* <Tabs aria-label="Views" fullWidth className="mt-5">
        {views.map((view) => (
          <Tab
            key={view}
            name={view}
            value={activeView}
            title={sentenceCase(view)}
            onClick={() => {
              setActiveView(view);
            }}
          />
        ))}
      </Tabs> */}
      <div className="my-5">
        {basicDetails.image ? (
          <div className="relative w-fit">
            <Avatar src="/logo.svg" name="assistant" />
            <div
              className="absolute top-1/2 left-2/3 transform bg-background-secondary w-5 h-5 rounded-full flex items-center justify-center cursor-pointer"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <CameraIcon className="w-2.5 h-2.5 text-[#838294]" />
            </div>
          </div>
        ) : (
          <div
            className="bg-background-secondary w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <CameraIcon className="w-4 h-4 text-[#838294]" />
          </div>
        )}
      </div>
      <div className="mt-12">
        <Input
          radius="sm"
          type="text"
          label="Name"
          variant="bordered"
          labelPlacement="outside"
          placeholder="Demo assistant"
        />
        <Textarea
          radius="sm"
          className="my-6"
          variant="bordered"
          labelPlacement="outside"
          label="Define Role & Instruction"
          placeholder="Enter bot instructions"
        />
        <div className="mt-6 flex justify-between items-center gap-x-2">
          <Select
            radius="sm"
            fullWidth
            label="AI Platform"
            variant="bordered"
            labelPlacement="outside"
            placeholder="AI platform"
          >
            {gptModels.map((model) => (
              <SelectItem key={model.value} value={model.value}>
                {model.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            radius="sm"
            fullWidth
            label="Model"
            variant="bordered"
            labelPlacement="outside"
            placeholder="Select model"
          >
            {gptModels.map((model) => (
              <SelectItem key={model.value} value={model.value}>
                {model.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col my-5 gap-y-5">
          <AddUrls />
          <UploadFiles />
          <CloudPlatforms />
          <AllApps />
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div className="flex-1 flex items-center gap-x-4">
            <Button
              radius="sm"
              startContent={<TrashIcon className="w-5 h-5 text-grey" />}
            >
              Delete
            </Button>
            <Button
              startContent={<CloneIcon className="w-5 h-5 text-grey" />}
              radius="sm"
            >
              Clone
            </Button>
          </div>
          <Button isIconOnly radius="sm">
            <SettingsIcon className="w-5 h-5 text-grey" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssistantInfo;
