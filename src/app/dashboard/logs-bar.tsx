import { Button } from "@nextui-org/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import EmbedCode from "./embed-code";
import Developers from "./developers";
import ConnectedApps from "./connected-apps";
import AssistantIntegrations from "./assistant-integrations";

const LogsBar = ({
  onChangeOpen,
}: {
  onChangeOpen: (value: boolean) => void;
}) => {
  return (
    <div className="flex flex-col gap-y-5 bg-background-primary border-l-1 border-background-tertiary shrink-0 min-w-[240px] w-1/5 px-4 py-6 max-h-[calc(100vh-76px)] overflow-y-auto no-scrollbar">
      <div className="flex items-center justify-between">
        <h2>Deploy Assistant</h2>
        <Button
          isIconOnly
          size="sm"
          variant="light"
          onClick={() => onChangeOpen(false)}
        >
          <XMarkIcon width={20} height={20} />
        </Button>
      </div>
      <ConnectedApps />
      <EmbedCode />
      <AssistantIntegrations />
      <Developers />
    </div>
  );
};

export default LogsBar;
