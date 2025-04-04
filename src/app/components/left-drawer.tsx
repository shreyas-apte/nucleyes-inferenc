import React from "react";
import cx from "../utils/cx";
import { Button } from "@nextui-org/react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

const LeftDrawer = ({
  onClose,
  children,
  isActive,
  label,
  leftOffset = 0,
}: {
  label: string;
  isActive: boolean;
  onClose: () => void;
  leftOffset?: string | number;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cx(
        "no-scrollbar fixed border-r-1 top-[76px] h-[calc(100vh-76px)] bg-background-primary transition-transform overflow-x-hidden overflow-y-auto flex flex-col px-4 py-6 w-1/5 min-w-[300px]",
        {
          "border-background-tertiary z-50": isActive,
          "border-transparent -z-10": !isActive,
        }
      )}
      style={{
        left: isActive
          ? leftOffset || 0
          : `calc(${leftOffset}${
              typeof leftOffset === "number" ? "px" : ""
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

export default LeftDrawer;
