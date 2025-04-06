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
} from "@heroui/react";
import React, { HTMLAttributes, useRef, useState, useEffect } from "react";
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
  const [dashboardConfig, setDashboardConfig] = useAtom(dashboardAtom);
  const [chatMessages, setChatMessages] = useState([...messages]);
  const [isAiResponding, setIsAiResponding] = useState(false);

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

  // Function to get response from Gemini
  const getAiResponse = async (userMessage: string) => {
    try {
      setIsAiResponding(true);
      
      // Call Gemini API
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          model: details.details.model,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from Gemini');
      }

      const data = await response.json();
      
      // Create AI response message
      const aiMessage: Message = {
        id: `ai-message-${Date.now()}`,
        text: data.text || "I'm not sure how to respond to that.",
        type: "bot",
        status: "sent",
        createdAt: new Date().toISOString(),
        sender: {
          id: "assistant",
          name: details.details.name || "AI Assistant",
          image: details.details.image || "https://picsum.photos/200",
        },
      };

      // Add AI message to chat
      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: `error-message-${Date.now()}`,
        text: "Sorry, I encountered an error while processing your request.",
        type: "bot",
        status: "sent",
        createdAt: new Date().toISOString(),
        sender: {
          id: "assistant",
          name: details.details.name || "AI Assistant",
          image: details.details.image || "https://picsum.photos/200",
        },
      };
      
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAiResponding(false);
    }
  };

  const handleMessageSubmit = async (message: string) => {
    if (!message.trim()) return;
    
    // Create a new user message
    const newMessage: Message = {
      id: `user-message-${Date.now()}`,
      text: message,
      type: "user",
      status: "sent",
      createdAt: new Date().toISOString(),
      sender: {
        id: "user",
        name: "You",
        image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      },
    };
    
    // Add the new message to the chat history
    setChatMessages(prev => [...prev, newMessage]);
    
    // Get AI response
    await getAiResponse(message);
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
        messages={chatMessages}
        isAiResponding={isAiResponding}
        assistantDetails={details}
        onChangeThreadsDrawer={handleChangeThreadsDrawer}
        onChangeLogsDrawer={isLogsBarActive ? undefined : handleChangeLogsBar}
        onMessageSubmit={handleMessageSubmit}
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
  messages: chatMessages,
  isAiResponding,
  assistantDetails,
  onChangeLogsDrawer,
  onChangeThreadsDrawer,
  onMessageSubmit,
}: {
  messages: Message[];
  isAiResponding?: boolean;
  assistantDetails?: Assistant;
  onChangeLogsDrawer?: (value: boolean) => void;
  onChangeThreadsDrawer?: (value: boolean) => void;
  onMessageSubmit?: (message: string) => void;
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
        {chatMessages.map((message, index) => (
          <MessageItem
            message={message}
            key={message.id}
            isLastItem={index === chatMessages.length - 1}
          />
        ))}
        {isAiResponding && (
          <div className="flex gap-x-4">
            <Image
              width={24}
              height={24}
              src={assistantDetails?.details?.image || "https://picsum.photos/200"}
              alt={assistantDetails?.details?.name || "AI Assistant"}
              className="shrink-0 w-6 h-6 rounded-full"
            />
            <div className="flex-1">
              <h4 className="text-base font-semibold">{assistantDetails?.details?.name || "AI Assistant"}</h4>
              <p className="mt-0.5 text-sm font-normal">
                <span className="inline-block w-2 h-2 bg-primary rounded-full mr-1 animate-pulse"></span>
                <span className="inline-block w-2 h-2 bg-primary rounded-full mr-1 animate-pulse" style={{ animationDelay: "300ms" }}></span>
                <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "600ms" }}></span>
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="absolute w-[calc(100%-64px)] bottom-0 mt-auto bg-background-secondary pb-8">
        <MessageBox onSubmit={onMessageSubmit} isDisabled={isAiResponding} />
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

const MessageBox = ({ 
  onSubmit,
  isDisabled 
}: { 
  onSubmit?: (message: string) => void;
  isDisabled?: boolean;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");

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

    // Handle Enter key press (without shift)
    if (e.key === "Enter" && !e.shiftKey && onSubmit && !isDisabled) {
      e.preventDefault();
      if (message.trim()) {
        onSubmit(message);
        setMessage(""); // Clear the input after sending
      }
    }
  };

  const handleSendClick = () => {
    if (onSubmit && message.trim() && !isDisabled) {
      onSubmit(message);
      setMessage(""); // Clear the input after sending
    }
  };

  return (
    <div>
      <div className="min-h-[80px] flex items-start justify-between gap-x-2 mx-6 bg-background-primary rounded-md overflow-hidden p-4 border border-background-tertiary">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question..."
          disabled={isDisabled}
          className="flex-1 bg-transparent border-none outline-none resize-none max-h-[30vh]"
        />
        <Button 
          isIconOnly 
          variant="light" 
          size="md" 
          color="primary" 
          onClick={handleSendClick}
          disabled={isDisabled || !message.trim()}
        >
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
