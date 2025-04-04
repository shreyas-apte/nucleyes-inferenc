import React from "react";
import cx from "../utils/cx";
import { Button } from "@nextui-org/react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

const RightDrawer = ({
  onClose,
  children,
  isActive,
  label,
  rightOffset = 0,
}: {
  label: string;
  isActive: boolean;
  onClose: () => void;
  rightOffset?: string | number;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cx(
        "fixed border-l-1 top-[76px] h-[calc(100vh-76px)] bg-background-primary transition-transform overflow-hidden flex flex-col py-6 px-4 min-w-[240px] w-1/5",
        {
          "border-background-tertiary z-50": isActive,
          "border-transparent -z-10": !isActive,
        }
      )}
      style={{
        right: isActive
          ? rightOffset || 0
          : `calc(${rightOffset}${
              typeof rightOffset === "number" ? "px" : ""
            } - 100%)` || "-100%",
      }}
    >
      <div className="flex items-center gap-x-2">
        <Button size="sm" variant="light" isIconOnly onClick={onClose}>
          <ArrowLeftIcon className="w-5 h-5 font-bold text-white" />
        </Button>
        <h4 className="text-base font-semibold text-gray-50">{label}</h4>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default RightDrawer;
