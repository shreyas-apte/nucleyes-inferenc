import { ChevronRightIcon } from "@heroicons/react/24/outline";

import CodeTerminalOutlineIcon from "../assets/icons/code-terminal-outline.svg";

const Developers = () => {
  return (
    <div className="p-3 border-2 rounded-lg border-default-200 hover:border-default-400 mt-auto text-grey flex items-center justify-between gap-x-2 cursor-pointer">
      <div className="flex items-center gap-x-2">
        <CodeTerminalOutlineIcon className="w-5 h-5" />
        <span className="text-sm font-normal">Developers</span>
      </div>
      <ChevronRightIcon width={20} height={20} />
    </div>
  );
};

export default Developers;
