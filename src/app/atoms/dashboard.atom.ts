import { atom } from "jotai";
import { DashboardConfig } from "../types/dashboard.type";

export const dashboardAtom = atom<DashboardConfig>({
  isLogsBarOpen: true,
  isShareModalActive: false,
});
