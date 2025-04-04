import { useState } from "react";
import Image from "next/image";
import { sentenceCase } from "change-case";
import { Button } from "@nextui-org/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

import CheckAltIcon from "../assets/icons/check-alt.svg";
import ContainerTile from "../components/container-tile";
import { allIntegrationsInfo, IntegrationsInfo } from "../constants";
import ConnectPathOutlineIcon from "../assets/icons/connect-path-outline.svg";

const AssistantIntegrations = () => {
  const [isContainerDrawerActive, setContainerDrawerActive] = useState(false);
  const [activeView, setActiveView] = useState<
    "all-integrations" | IntegrationsInfo["name"]
  >("all-integrations");

  return (
    <ContainerTile
      drawerSide="right"
      title={
        activeView === "all-integrations"
          ? "Integrations"
          : `Integrate ${sentenceCase(activeView)}`
      }
      // moreCount={2}
      collapsedChildren={<CollapsedContainer />}
      isDrawerActive={isContainerDrawerActive}
      onChangeDrawerActive={(value) => {
        activeView === "all-integrations"
          ? setContainerDrawerActive(value)
          : setActiveView("all-integrations");
      }}
      icon={<ConnectPathOutlineIcon className="w-5 h-5 shrink-0" />}
    >
      <ContainerViewManager
        type={activeView}
        onUpdateActiveView={setActiveView}
      />
    </ContainerTile>
  );
};

export default AssistantIntegrations;

const CollapsedContainer = () => {
  return (
    <div className="flex flex-col gap-y-3">
      {allIntegrationsInfo.map((integration) => (
        <div className="flex items-center gap-x-2" key={integration.id}>
          <Image
            width={20}
            height={20}
            alt={integration.name}
            src={`/assets/icons/${integration.image}`}
          />
          <h4 className="text-sm font-normal">
            {sentenceCase(integration.name)}
          </h4>
        </div>
      ))}
    </div>
  );
};

const ContainerViewManager = ({
  type,
  onUpdateActiveView,
}: {
  type: "all-integrations" | IntegrationsInfo["name"];
  onUpdateActiveView: (
    view: "all-integrations" | IntegrationsInfo["name"]
  ) => void;
}) => {
  const activeIntegration = allIntegrationsInfo.find(
    (integration) => integration.name === type
  );

  const handleBack = () => {
    onUpdateActiveView("all-integrations");
  };

  switch (type) {
    case "all-integrations":
      return <AllIntegrations onUpdateActiveView={onUpdateActiveView} />;
    default:
      return activeIntegration
        ? //   <SingleIntegration integration={activeIntegration} onBack={handleBack} />
          null
        : null;
  }
};

const AllIntegrations = ({
  onUpdateActiveView,
}: {
  onUpdateActiveView: (
    view: "all-integrations" | IntegrationsInfo["name"]
  ) => void;
}) => {
  return (
    <div className="mt-4 flex-1 flex flex-col gap-y-4">
      {allIntegrationsInfo.map((integration) => (
        <div
          key={integration.id}
          className="rounded-lg py-2 px-4 border border-background-tertiary cursor-pointer"
          onClick={() => onUpdateActiveView(integration.name)}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-2">
              <Image
                width={20}
                height={20}
                alt={integration.name}
                src={`/assets/icons/${integration.image}`}
              />
              <h4 className="text-sm font-normal">
                {sentenceCase(integration.name)}
              </h4>
            </div>
            <Button size="sm" variant="light" isIconOnly>
              <ChevronRightIcon width={16} height={16} />
            </Button>
          </div>
          <p className="text-sm font-normal my-2">{integration.description}</p>
          <div className="flex items-center gap-x-1 text-primary">
            <CheckAltIcon className="shrink-0 w-5 h-5" />
            <small className="text-sm font-normal">Connected</small>
          </div>
        </div>
      ))}
    </div>
  );
};
