import { atom } from "jotai";
import { Assistant } from "../types/assistant.type";

export const inferencAtom = atom<Assistant>({
  details: {
    name: "inferenc",
    description: "This is inferenc assistant",
    isPublished: true,
    image: "/logo.svg",
    urls: [],
    files: [],
    model: "GPT-1",
    platform: "Dall-e",
  },
});
