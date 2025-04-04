"use client";

import { useAtom } from "jotai";

import Dashboard from "./dashboard/dashboard";
import { inferencAtom } from "./atoms/inferenc.atom";

const DefaultDashboard = () => {
  const [inferencAssitantDetails, setInferencAssistantDetails] =
    useAtom(inferencAtom);

  return (
    <Dashboard
      details={inferencAssitantDetails}
      onDetailsChange={setInferencAssistantDetails}
    />
  );
};

export default DefaultDashboard;
