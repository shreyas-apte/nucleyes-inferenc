import { ThemeConfig } from "./types/global-config.type";
import { Message } from "./types/assistant.type";

export const gptModels = [
  {
    label: "GPT-3",
    value: "gpt-3",
  },
  {
    label: "GPT-4",
    value: "gpt-4",
  },
  {
    label: "GPT-5",
    value: "gpt-5",
  },
  {
    label: "GPT-6",
    value: "gpt-6",
  },
  {
    label: "GPT-7",
    value: "gpt-7",
  },
  {
    label: "GPT-8",
    value: "gpt-8",
  },
  {
    label: "GPT-9",
    value: "gpt-9",
  },
  {
    label: "GPT-10",
    value: "gpt-10",
  },
];

export const messages: Message[] = [
  {
    sender: {
      id: "ifdosf",
      name: "Aakash Sharma",
      image: "https://picsum.photos/200",
    },
    type: "user",
    status: "draft",
    id: "fnskdgldsnsd",
    createdAt: "2024-03-18T10:17:59.733Z",
    text: "Is there any other free alternative of getting an expert’s advice?",
  },
  {
    sender: {
      id: "1dkf",
      name: "inferenc AI",
      image: "/logo.svg",
    },
    type: "bot",
    status: "draft",
    id: "fnskdglnsd",
    createdAt: "2024-03-18T10:17:56.733Z",
    text: "Congratulations for your new home. We do offer onsite expert consultation but, onsite consultation are always paid. You can schedule a site visit by clicking here. you can also try creating a solution yourself it easy just takes 5 minutes Start Now. https://youtube.com",
  },
];

export interface AppInfo {
  id: string;
  name: string;
  image: string;
  description: string;
}

export const allAppsInfo: AppInfo[] = [
  {
    id: "1",
    name: "webflow",
    image: "webflow.png",
    description: "Give your webflow website AI chat capabilities, hazel-free.",
  },
  {
    id: "2",
    name: "slack",
    image: "slack.png",
    description:
      "Streamline your task automation and improved team collaboration.",
  },
  {
    id: "3",
    name: "intercom",
    image: "intercom.png",
    description: "Link your AI chat assistant with intercom seamlessly.",
  },
];

export interface IntegrationsInfo {
  id: string;
  name: string;
  image: string;
  description: string;
}

export const allIntegrationsInfo: IntegrationsInfo[] = [
  {
    id: "1",
    name: "zapier",
    image: "zapier.png",
    description:
      "Connect Apps and Automate Workflows with Zapier — No Coding Required.",
  },
  {
    id: "2",
    name: "make",
    image: "make.png",
    description:
      "Build And Automate Anything In One Platform. Quick, Easy & Cost-Effective.",
  },
];

export const defaultThemeConfig: ThemeConfig = {
  name: "dark",
  type: "dark",
  colors: {
    primaryColor: "#25AE9D",
    secondaryColor: "#65EBF3",
  },
};
