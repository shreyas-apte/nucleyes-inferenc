import { atom } from "jotai";
import { GlobalAppConfig } from "../types/global-config.type";
import { defaultThemeConfig } from "../constants";

export const globalConfigAtom = atom<GlobalAppConfig>({
  theme: "dark",
  activePopupsIds: ["login"], // ["login"],
  themeConfig: defaultThemeConfig,
});
