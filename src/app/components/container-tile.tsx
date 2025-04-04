import { useState } from "react";

import LeftDrawer from "./left-drawer";
import RightDrawer from "./right-drawer";
import PlusCircleSolidIcon from "../assets/icons/plus-circle-solid.svg";

const ContainerTile: React.FC<{
  title: string;
  moreCount?: number;
  icon: React.ReactNode;
  children: React.ReactNode;
  drawerSide?: "left" | "right";
  collapsedChildren?: React.ReactNode;
  isDrawerActive: boolean;
  onChangeDrawerActive: (value: boolean) => void;
}> = ({
  icon,
  title,
  moreCount,
  children,
  isDrawerActive,
  collapsedChildren,
  drawerSide = "left",
  onChangeDrawerActive,
}) => {
  return (
    <>
      <div
        className="border-2 border-default-200 hover:border-default-400 rounded-lg p-3 cursor-pointer"
        onClick={() => onChangeDrawerActive(true)}
      >
        <div className="w-full flex justify-between items-center">
          <div className="flex-1 flex items-center gap-x-2 text-grey text-sm">
            {icon}
            <h4>{title}</h4>
          </div>
          <PlusCircleSolidIcon className="text-primary w-5 h-5" />
        </div>
        {collapsedChildren && (
          <div className="mt-3 mb-2">{collapsedChildren}</div>
        )}
        {moreCount && (
          <small className="text-primary font-medium text-sm">
            +{moreCount} more
          </small>
        )}
      </div>
      {drawerSide === "left" ? (
        <LeftDrawer
          label={title}
          isActive={isDrawerActive}
          onClose={() => onChangeDrawerActive(false)}
        >
          {children}
        </LeftDrawer>
      ) : (
        <RightDrawer
          label={title}
          isActive={isDrawerActive}
          onClose={() => onChangeDrawerActive(false)}
        >
          {children}
        </RightDrawer>
      )}
    </>
  );
};

export default ContainerTile;
