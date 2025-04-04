"use client";

import Image from "next/image";
import Linkify from "linkify-react";
import { useAtom } from "jotai/react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { HTMLAttributes, useRef, useState } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

import Threads from "./threads";
import LogsBar from "./logs-bar";
import { messages } from "../constants";
import AppLayout from "./dashboard-layout";
import AssistantInfo from "./assistant-info";
import { dashboardAtom } from "../atoms/dashboard.atom";
import { Assistant, Message } from "../types/assistant.type";

import ReloadIcon from "../assets/icons/reload.svg";
import CopyAltIcon from "../assets/icons/copy-alt-outline.svg";
import BrushOutlineIcon from "../assets/icons/brush-outline.svg";
import DisLikeOutlineIcon from "../assets/icons/thumbs-down-outline.svg";
import SendArrowOutlineIcon from "../assets/icons/send-arrow-outline.svg";
import DoubleArrowRightOutlineIcon from "../assets/icons/double-arrow-right-outline.svg";

export default function Dashboard({
  details,
  onDetailsChange,
}: {
  details: Assistant;
  onDetailsChange: (details: Assistant) => void;
}) {
  const { data: token } = useSession();
  console.log({ token });
  const [dashboardConfig, setDashboardConfig] = useAtom(dashboardAtom);

  const isLogsBarActive = dashboardConfig.isLogsBarOpen;
  const isShareModalOpen = dashboardConfig.isShareModalActive;
  const isThreadsDrawerActive = dashboardConfig.isThreadsActive;

  const handleChangeThreadsDrawer = (value: boolean) => {
    setDashboardConfig({
      ...dashboardConfig,
      isThreadsActive: value,
    });
  };

  const handleChangeLogsBar = (value: boolean) => {
    setDashboardConfig({
      ...dashboardConfig,
      isLogsBarOpen: value,
    });
  };

  const handleShareModalOpen = (value: boolean) => {
    setDashboardConfig({
      ...dashboardConfig,
      isShareModalActive: value,
    });
  };

  return (
    <DashboardLayout
      details={details}
      isLogsBarActive={isLogsBarActive}
      onChangeLogsBarDrawer={handleChangeLogsBar}
      isThreadsDrawerActive={isThreadsDrawerActive}
      onChangeThreadsDrawer={handleChangeThreadsDrawer}
    >
      <MainDashBoardContent
        onChangeThreadsDrawer={handleChangeThreadsDrawer}
        onChangeLogsDrawer={isLogsBarActive ? undefined : handleChangeLogsBar}
      />
      <ShareModalDashboardContent
        isOpen={isShareModalOpen}
        onOpenChange={handleShareModalOpen}
      />
    </DashboardLayout>
  );
}

const DashboardLayout = ({
  details,
  children,
  isLogsBarActive,
  isThreadsDrawerActive,
  onChangeLogsBarDrawer,
  onChangeThreadsDrawer,
}: {
  children: React.ReactNode;
  details: Assistant;
  isLogsBarActive: boolean;
  isThreadsDrawerActive: boolean;
  onChangeLogsBarDrawer: (value: boolean) => void;
  onChangeThreadsDrawer: (value: boolean) => void;
}) => {
  const [assistantInfoSize, setAssistantInfoSize] = useState<{
    width: number;
    height: number;
  }>();

  return (
    <AppLayout>
      <section className="flex-1 flex items-stretch justify-between bg-background-secondary">
        <AssistantInfo
          basicDetails={details.details}
          onResize={(size) => {
            setAssistantInfoSize(size);
            console.log(size);
          }}
        />
        <Threads
          isDrawerActive={isThreadsDrawerActive}
          leftOffset={assistantInfoSize?.width || 0}
          onChangeDrawerActive={onChangeThreadsDrawer}
        />
        {children}
        {isLogsBarActive ? (
          <LogsBar onChangeOpen={onChangeLogsBarDrawer} />
        ) : null}
      </section>
    </AppLayout>
  );
};

const MainDashBoardContent = ({
  onChangeLogsDrawer,
  onChangeThreadsDrawer,
}: {
  onChangeLogsDrawer?: (value: boolean) => void;
  onChangeThreadsDrawer?: (value: boolean) => void;
}) => {
  return (
    <div className="relative flex-1 flex flex-col max-h-[calc(100vh-76px)] px-8 overflow-y-auto no-scrollbar">
      <div className="absolute top-6 w-[calc(100%-64px)] flex justify-between items-center">
        {onChangeThreadsDrawer ? (
          <Button
            isIconOnly
            size="sm"
            variant="light"
            onClick={() => onChangeThreadsDrawer(true)}
          >
            <DoubleArrowRightOutlineIcon />
          </Button>
        ) : null}
        <div className="flex justify-end gap-x-2 items-center">
          <Button isIconOnly size="sm" variant="light">
            <BrushOutlineIcon />
          </Button>
          {onChangeLogsDrawer ? (
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onClick={() => onChangeLogsDrawer(true)}
            >
              <AdjustmentsHorizontalIcon width={26} height={26} />
            </Button>
          ) : null}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-end gap-y-8 p-8 mb-28">
        {messages.map((message, index) => (
          <MessageItem
            message={message}
            key={message.id}
            isLastItem={index === messages.length - 1}
          />
        ))}
      </div>
      <div className="absolute w-[calc(100%-64px)] bottom-0 mt-auto bg-background-secondary pb-8">
        <MessageBox />
      </div>
    </div>
  );
};

const MessageItem = ({
  message,
  isLastItem,
}: {
  message: Message;
  isLastItem?: boolean;
}) => {
  return (
    <div className="flex gap-x-4">
      <Image
        width={24}
        height={24}
        src={message.sender.image}
        alt={message.sender.name}
        className="shrink-0 w-6 h-6 rounded-full"
      />
      <div className="flex-1">
        <h4 className="text-base font-semibold">{message.sender.name}</h4>
        <Linkify>
          {/* {message.type === "bot" ? (
            <TypeAnimation
              sequence={[message.text]}
              wrapper="span"
              speed={50}
              repeat={0}
              className="[&>a]:text-blue-600 mt-0.5 text-sm font-normal whitespace-break-spaces break-word block"
            />
          ) : ( */}
          <p className="[&>a]:text-primary mt-0.5 text-sm font-normal whitespace-break-spaces break-word">
            {message.text}
          </p>
          {/* )} */}
        </Linkify>
        {isLastItem && message.type === "bot" ? (
          <div className="flex items-center gap-x-4 text-grey mt-3">
            <CopyAltIcon className="w-5 h-5 shrink-0" />
            <ReloadIcon className="w-5 h-5 shrink-0" />
            <DisLikeOutlineIcon className="w-5 h-5 shrink-0" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

const MessageBox = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "inherit";
    const computed = window.getComputedStyle(textarea);
    const height =
      parseInt(computed.getPropertyValue("border-top-width"), 10) +
      parseInt(computed.getPropertyValue("padding-top"), 10) +
      textarea.scrollHeight +
      parseInt(computed.getPropertyValue("padding-bottom"), 10) +
      parseInt(computed.getPropertyValue("border-bottom-width"), 10);
    textarea.style.height = `${height}px`;
  };

  return (
    <div>
      <div className="min-h-[80px] flex items-start justify-between gap-x-2 mx-6 bg-background-primary rounded-md overflow-hidden p-4 border border-background-tertiary">
        <textarea
          ref={textareaRef}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question..."
          className="flex-1 bg-transparent border-none outline-none resize-none max-h-[30vh]"
          defaultValue="NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
        />
        <Button isIconOnly variant="light" size="md" color="primary">
          <SendArrowOutlineIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

const ShareModalDashboardContent = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
}) => {
  return (
    <Modal size="5xl" isOpen={isOpen} onClose={() => onOpenChange(false)}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-2">
              Try Inferenc
            </ModalHeader>
            <ModalBody>
              <div className="relative flex-1 flex flex-col justify-end min-h-[50vh] max-h-[calc(100vh-76px)] px-2 overflow-y-auto no-scrollbar">
                <div className="flex-1 flex flex-col justify-end gap-y-8 p-8 mb-28">
                  {messages.map((message, index) => (
                    <MessageItem
                      message={message}
                      key={message.id}
                      isLastItem={index === messages.length - 1}
                    />
                  ))}
                </div>
                <div className="shrink-0">
                  <MessageBox />
                </div>
              </div>
            </ModalBody>
            {/* <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Share
              </Button>
            </ModalFooter> */}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
