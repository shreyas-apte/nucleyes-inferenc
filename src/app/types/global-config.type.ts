export interface ThemeConfig {
  name: string;
  type: "dark" | "light";
  colors: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export interface GlobalAppConfig {
  theme: "dark" | "light" | "theme";
  themeConfig: ThemeConfig;
  activePopupsIds: string[];
}
