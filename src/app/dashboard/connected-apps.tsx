import Image from "next/image";
import { useState } from "react";
import { sentenceCase } from "change-case";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button, Checkbox, Divider, Input } from "@nextui-org/react";

import { allAppsInfo, AppInfo } from "../constants";
import ContainerTile from "../components/container-tile";
import CheckAltIcon from "../assets/icons/check-alt.svg";
import PuzzleBlockOutlineIcon from "../assets/icons/puzzle-block-outline.svg";

const ConnectedApps = () => {
  const [isContainerDrawerActive, setContainerDrawerActive] = useState(false);
  const [activeView, setActiveView] = useState<"all-apps" | AppInfo["name"]>(
    "all-apps"
  );

  return (
    <ContainerTile
      drawerSide="right"
      title={
        activeView === "all-apps"
          ? "Connect with Apps"
          : `Install ${sentenceCase(activeView)}`
      }
      isDrawerActive={isContainerDrawerActive}
      collapsedChildren={<CollapsedContainer />}
      onChangeDrawerActive={(value) => {
        activeView === "all-apps"
          ? setContainerDrawerActive(value)
          : setActiveView("all-apps");
      }}
      icon={<PuzzleBlockOutlineIcon className="w-5 h-5 shrink-0" />}
    >
      <ContainerViewManager
        type={activeView}
        onUpdateActiveView={setActiveView}
      />
    </ContainerTile>
  );
};

export default ConnectedApps;

const CollapsedContainer = () => {
  return (
    <div className="flex flex-col gap-y-3">
      {allAppsInfo.map((app) => (
        <div className="flex items-center gap-x-2" key={app.id}>
          <Image
            width={20}
            height={20}
            alt={app.name}
            src={`/assets/icons/${app.image}`}
          />
          <h4 className="text-sm font-normal">{sentenceCase(app.name)}</h4>
        </div>
      ))}
    </div>
  );
};

const ContainerViewManager = ({
  type,
  onUpdateActiveView,
}: {
  type: "all-apps" | AppInfo["name"];
  onUpdateActiveView: (view: "all-apps" | AppInfo["name"]) => void;
}) => {
  const activeApp = allAppsInfo.find((app) => app.name === type);

  const handleBack = () => {
    onUpdateActiveView("all-apps");
  };

  switch (type) {
    case "all-apps":
      return <AllApps onUpdateActiveView={onUpdateActiveView} />;
    default:
      return activeApp ? (
        <SingleApp app={activeApp} onBack={handleBack} />
      ) : null;
  }
};

const AllApps = ({
  onUpdateActiveView,
}: {
  onUpdateActiveView: (view: "all-apps" | AppInfo["name"]) => void;
}) => {
  return (
    <div className="mt-4 flex-1 flex flex-col gap-y-4">
      {allAppsInfo.map((app) => (
        <div
          key={app.id}
          className="rounded-lg py-2 px-4 border border-background-tertiary cursor-pointer"
          onClick={() => onUpdateActiveView(app.name)}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-2">
              <Image
                width={20}
                height={20}
                alt={app.name}
                src={`/assets/icons/${app.image}`}
              />
              <h4 className="text-sm font-normal">{sentenceCase(app.name)}</h4>
            </div>
            <Button size="sm" variant="light" isIconOnly>
              <ChevronRightIcon width={16} height={16} />
            </Button>
          </div>
          <p className="text-sm font-normal my-2">{app.description}</p>
          <div className="flex items-center gap-x-1 text-primary">
            <CheckAltIcon className="shrink-0 w-5 h-5" />
            <small className="text-sm font-normal">Installed</small>
          </div>
        </div>
      ))}
    </div>
  );
};

const SingleApp = ({ app, onBack }: { app: AppInfo; onBack: () => void }) => {
  return (
    <div className="mt-6 ml-2 flex-1 flex flex-col">
      <div className="flex items-center gap-x-3">
        <Image
          width={22}
          height={22}
          alt={app.name}
          src={`/assets/icons/${app.image}`}
        />
        <h3 className="text-base font-semibold">{sentenceCase(app.name)}</h3>
      </div>
      <p className="text-sm font-normal my-4">{app.description}</p>
      <Input
        radius="sm"
        type="email"
        label="Email"
        size="sm"
        variant="bordered"
      />
      <div className="mt-6 flex flex-col gap-y-4">
        <Checkbox
          classNames={{
            icon: "text-white",
          }}
          radius="sm"
          size="sm"
        >
          I’ve read user terms and conditions
        </Checkbox>
        <Checkbox
          className="my"
          classNames={{
            icon: "text-white",
          }}
          radius="sm"
          size="sm"
        >
          Agree read and write permissions.
        </Checkbox>
      </div>
      <Button color="primary" variant="solid" className="my-6" radius="sm">
        Install {sentenceCase(app.name)}
      </Button>
      <Divider />
    </div>
  );
};
