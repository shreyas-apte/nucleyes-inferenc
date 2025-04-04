export interface Assistant {
  details: AssistantBasicDetails;
}

export interface AssistantBasicDetails {
  name: string;
  image?: string;
  isPublished: boolean;
  description: string;
  platform: AI_Platform;
  model: AssistantModel;
  urls: AssistantUrl[];
  files: AssistantFile[];
}

export type AI_Platform = "OpenAI" | "Dall-e";

export type AssistantModel = "GPT-1" | "GPT-2" | "GPT-3" | "GPT-4";

export interface AssistantUrl {
  id: string;
  label?: string;
  url: string;
  isConnected: boolean;
}

export interface AssistantFile {
  id: string;
  url: string;
  name: string;
  isConnected: boolean;
}

interface AvailableApp {}

interface ConnectedApp {}

interface CloudPlatform {}

interface EmbeddedWebsite {}

interface Integration {}

export interface User {
  id: string;
  name: string;
  image: string;
  tokenUsed: number;
}

export interface UploadedFile extends File {
  url: string;
}

export type MessageStatus = "draft" | "sending" | "sent";

export type MessageType = "bot" | "user";

export interface Message {
  sender: {
    id: string;
    name: string;
    image: string;
  };
  status: MessageStatus;
  text: string;
  id: string;
  type: MessageType;
  createdAt: string;
}
