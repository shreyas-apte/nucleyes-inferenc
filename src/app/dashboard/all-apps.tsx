import Image from "next/image";
import { useState } from "react";

import ContainerTile from "../components/container-tile";
import WidgetAppsOutlineIcon from "../assets/icons/apps-outline.svg";

const AllApps = () => {
  const [isContainerDrawerActive, setContainerDrawerActive] = useState(false);

  return (
    <ContainerTile
      title="Apps"
      moreCount={2}
      collapsedChildren={<CollapsedContainer />}
      isDrawerActive={isContainerDrawerActive}
      onChangeDrawerActive={setContainerDrawerActive}
      icon={<WidgetAppsOutlineIcon className="w-5 h-5 shrink-0" />}
    >
      <p>fds</p>
    </ContainerTile>
  );
};

export default AllApps;

const CollapsedContainer = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center gap-x-2">
        <Image
          width={20}
          height={20}
          alt="loom"
          src={`/assets/icons/loom.png`}
        />
        <h4 className="text-sm font-normal">Loom</h4>
      </div>
      <div className="flex items-center gap-x-2">
        <Image
          width={20}
          height={20}
          alt="notion"
          src={`/assets/icons/notion.png`}
        />
        <h4 className="text-sm font-normal">Notion</h4>
      </div>
    </div>
  );
};
