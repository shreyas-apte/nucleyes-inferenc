import { useState } from "react";
import { Input, Checkbox, Button, Divider } from "@nextui-org/react";

import cx from "../utils/cx";
import TrashIcon from "../assets/icons/trash.svg";
import ContainerTile from "../components/container-tile";
import LinkOutlineIcon from "../assets/icons/link-outline.svg";
import LinkAltOutlineIcon from "../assets/icons/link-alt-outline.svg";

const AddUrls = () => {
  const [isContainerDrawerActive, setContainerDrawerActive] = useState(false);

  return (
    <ContainerTile
      title="Add URLs"
      // moreCount={2}
      // collapsedChildren={<></>}
      isDrawerActive={isContainerDrawerActive}
      onChangeDrawerActive={setContainerDrawerActive}
      icon={<LinkOutlineIcon className="w-5 h-5 shrink-0" />}
    >
      <div className="flex flex-col gap-6 mt-6">
        <Input
          radius="sm"
          type="text"
          variant="bordered"
          labelPlacement="outside"
          placeholder="URL"
          startContent={
            <LinkOutlineIcon className="w-5 h-5 text-grey shrink-0" />
          }
        />
        <Checkbox
          classNames={{
            icon: "text-white",
          }}
          radius="sm"
          size="sm"
        >
          Import All Connected URLs
        </Checkbox>

        <Button radius="sm" color="primary">
          Fetch URLs
        </Button>

        <ImportableUrls />

        <Button radius="sm" color="primary">
          Import
        </Button>

        <Divider />

        <ConnectedUrls />
      </div>
    </ContainerTile>
  );
};

const ImportableUrls = () => {
  return (
    <div className="flex flex-col gap-6">
      <ImportableUrl
        url="https://google.com/asd/sdf/asd/sdf/asd/sdf/asd"
        checked={false}
        handleChange={(checked) => console.log(checked)}
      />
      <ImportableUrl
        url="https://google.com/asd/sdf/asd/sdf/asd/sdf/asd"
        checked={true}
        handleChange={(checked) => console.log(checked)}
      />
    </div>
  );
};

type ImportableUrlProps = {
  url: string;
  checked: boolean;
  handleChange: (checked: boolean) => void;
};

const ImportableUrl = ({ url, checked, handleChange }: ImportableUrlProps) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        isSelected={checked}
        onValueChange={handleChange}
        className="w-full"
        classNames={{
          icon: "text-white",
          label: "text-grey grow truncate",
        }}
        radius="sm"
        size="sm"
      >
        {url}
      </Checkbox>
    </div>
  );
};

const ConnectedUrls = () => {
  return (
    <div>
      <div className="flex gap-2 mb-3 items-center justify-between">
        <h3 className="text-base font-semibold">Connected URLs</h3>
        <LinkAltOutlineIcon className="w-6 h-6 text-primary" />
      </div>

      <UrlConnection
        status="connecting"
        url="https://google.com/asd/sdf/asd/sdf/asd/sdf/asd"
      />
      <UrlConnection
        status="connected"
        url="https://google.com/asd/sdf/asd/sdf/asd/sdf/asd"
      />
      <UrlConnection
        status="error"
        url="https://google.com/asd/sdf/asd/sdf/asd/sdf/asd"
      />
    </div>
  );
};

type UrlConnectionProps = {
  url: string;
  status: "connected" | "connecting" | "error";
  handleRemove?: () => void;
};

const UrlConnection = ({ status, url, handleRemove }: UrlConnectionProps) => {
  const isPulsating = status === "connecting";

  const colors =
    status === "error"
      ? {
          innerCircle: "bg-red-500",
          outerCircle: "bg-red-500/20",
        }
      : status === "connected"
      ? {
          innerCircle: "bg-primary",
          outerCircle: "bg-primary/20",
        }
      : {
          innerCircle: "bg-yellow-500",
          outerCircle: "bg-yellow-500/20",
        };

  return (
    <div className="p-1 group text-grey text-sm hover:bg-default-100 rounded-md flex items-center gap-2">
      <span className="relative w-3 h-3 shrink-0">
        <span
          className={cx("w-3 h-3 absolute rounded-full", colors.outerCircle, {
            "animate-pulse": isPulsating,
          })}
        />
        <span
          className={cx(
            "w-1.5 h-1.5 absolute top-[3px] left-[3px] rounded-full",
            colors.innerCircle
          )}
        />
        <span className="sr-only">{status}</span>
      </span>
      <p className="grow truncate">{url}</p>
      <Button
        onClick={handleRemove}
        color="danger"
        size="sm"
        isIconOnly
        className="opacity-0 transition-none pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100"
        variant="light"
      >
        <TrashIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default AddUrls;
