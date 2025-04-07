import { atom } from "jotai";
import { Assistant } from "../types/assistant.type";

export const inferencAtom = atom<Assistant>({
  details: {
    name: "Inferenc AI",
    description: "This is inferenc assistant",
    isPublished: true,
    image: "/logo.svg",
    urls: [],
    files: [],
    model: "Gemini-Pro",
    platform: "Gemini",
  },
});
