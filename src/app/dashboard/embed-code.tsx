import { useState } from "react";
import { Button } from "@nextui-org/react";

import Pulse from "../components/pulse";
import ContainerTile from "../components/container-tile";

import CopyOutlineIcon from "../assets/icons/copy-outline.svg";
import CodedOutlineIcon from "../assets/icons/code-outline.svg";

const EmbedCode = () => {
  const [isContainerDrawerActive, setContainerDrawerActive] = useState(false);

  return (
    <ContainerTile
      drawerSide="right"
      title="Embed Code In Your Website"
      // moreCount={2}
      collapsedChildren={<CollapsedContainer />}
      isDrawerActive={isContainerDrawerActive}
      onChangeDrawerActive={setContainerDrawerActive}
      icon={<CodedOutlineIcon className="w-5 h-5 shrink-0" />}
    >
      <EmbedCodeView />
    </ContainerTile>
  );
};

export default EmbedCode;

const CollapsedContainer = () => {
  return (
    <div className="flex items-center gap-x-2">
      <Pulse isPulsating size={16} status="connected" />
      <p className="text-sm font-medium">Active</p>
    </div>
  );
};

const themeColors = [
  "#FF6161",
  "#FFA754",
  "#08CE99",
  "#AAAAAA",
  "#0A66C2",
  "#36C5F0",
] as const;
export type ColorTheme = (typeof themeColors)[number];

const code = `<!-- Inferenc Assistant -->\n<script>(function(w,d,s,l,i){w[l]=w[l]|\n[];w[l].push({'gtm.start':\nnew Date().getTime(),event:'gtm.js'});var\nf=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,'script','dataLayer','GTM-THV6TNW');</script>\n<!-- End Inferenc Assistant -->`;

const EmbedCodeView = () => {
  const [activeThemeColor, setActiveThemeColor] =
    useState<ColorTheme>("#FF6161");

  return (
    <div className="ml-2 mt-6 flex-1 flex flex-col">
      <small className="text-sm font-normal">
        Create your own chat support for your website. It’s simple, no coding
        skill required.
      </small>
      <div className="my-6">
        <label className="text-grey text-sm font-medium">
          Select a theme color
        </label>
        <div className="mt-4 flex items-center gap-x-2 flex-nowrap overflow-x-auto no-scrollbar">
          {themeColors.map((color) => (
            <div
              key={color}
              className="p-1 border-2 rounded-[28px] flex items-center gap-x-2 cursor-pointer"
              style={{
                borderColor: color === activeThemeColor ? color : "transparent",
              }}
              onClick={() => setActiveThemeColor(color)}
            >
              <div
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: color }}
              />
              {color === activeThemeColor ? (
                <p className="text-white text-sm font-normal mr-2">{color}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="text-grey text-sm font-medium">
          Install to website
        </label>
        <ol className="pl-4 gap-y-2 list-decimal text-sm font-normal mt-4">
          <li>
            Copy the customized code below and paste it to every page of your
            website.
          </li>
          <li className="mt-3">
            Paste the code as high in the{" "}
            <span className="border border-default-400 bg-default-200 rounded-md text-xs px-1 mx-1">
              &lt;head/&gt;
            </span>
            tag of the HTML Code.
          </li>
        </ol>
        <div
          className="relative my-6 p-4 border bg-default-400 bg-opacity-10 rounded-md"
          style={{
            borderColor: activeThemeColor,
          }}
        >
          <pre className="text-xs block overflow-auto no-scrollbar">{code}</pre>
          <div className="absolute z-10 top-4 right-4">
            <Button isIconOnly size="sm" radius="sm">
              <CopyOutlineIcon
                className="w-5 h-5"
                style={{ color: activeThemeColor }}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
