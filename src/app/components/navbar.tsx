"use client";

import React from "react";
import Link from "next/link";
import { useAtom } from "jotai/react";
import { Avatar, Button, Divider, CircularProgress } from "@nextui-org/react";

import { dashboardAtom } from "../atoms/dashboard.atom";

import LogoFull from "../assets/logo-full.svg";

const Navbar = () => {
  const [dashboardConfig, setDashboardConfig] = useAtom(dashboardAtom);

  const handleShareModal = () => {
    setDashboardConfig({
      ...dashboardConfig,
      isShareModalActive: true,
    });
  };

  return (
    <nav className="bg-background-primary h-[76px] flex items-center justify-between px-6 border-b-1 border-background-tertiary">
      <div className="flex justify-between items-center gap-x-6">
        <LogoFull className="w-[112px] h-6 text-white" />
        <Divider orientation="vertical" className="h-6" />
        <Link href="/profile">
          <Avatar
            name="holy"
            size="sm"
            className="w-8 h-8"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          />
        </Link>
      </div>
      <div className="flex items-center gap-x-4">
        <div className="flex items-center gap-x-2 mr-4">
          <CircularProgress
            size="md"
            value={79}
            color="primary"
            showValueLabel={true}
            aria-label="Loading..."
          />
          <div className="flex flex-col justify-center items-center">
            <small className="text-white text-opacity-60 text-[10px]">
              Token usage
            </small>
            <p className="text-white font-bold text-xs">839K / 1M</p>
          </div>
        </div>
        <Button
          radius="sm"
          variant="bordered"
          color="default"
          onClick={handleShareModal}
        >
          Share
        </Button>
        <Button radius="sm" variant="solid" color="primary">
          Publish
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
