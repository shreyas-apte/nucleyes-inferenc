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
    <div className="relative flex-1 flex flex-col h-[calc(100vh-76px)]">
      <div className="absolute top-6 w-[calc(100%-64px)] flex justify-between items-center px-8 z-10">
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
      
      <div className="flex-1 flex flex-col-reverse overflow-y-auto px-8 pt-16 pb-28">
        {isAiResponding && (
          <div className="flex gap-x-4 mb-8">
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
        {chatMessages.map((message, index) => (
          <MessageItem
            message={message}
            key={message.id}
            isLastItem={index === chatMessages.length - 1}
            className="mb-8"
          />
        )).reverse()}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-background-secondary py-3 px-8 border-t border-background-tertiary">
        <MessageBox onSubmit={onMessageSubmit} isDisabled={isAiResponding} />
      </div>
    </div>
  );
};

const MessageItem = ({
  message,
  isLastItem,
  className,
}: {
  message: Message;
  isLastItem?: boolean;
  className?: string;
}) => {
  return (
    <div className={`flex gap-x-4 ${className || ""}`}>
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
          <p className="[&>a]:text-primary mt-0.5 text-sm font-normal whitespace-break-spaces break-word">
            {message.text}
          </p>
        </Linkify>
        {isLastItem && message.type === "bot" ? (
          <div className="flex items-center gap-x-4 text-grey mt-3">
            <CopyAltIcon className="w-5 h-5 shrink-0 cursor-pointer hover:text-primary" />
            <ReloadIcon className="w-5 h-5 shrink-0 cursor-pointer hover:text-primary" />
            <DisLikeOutlineIcon className="w-5 h-5 shrink-0 cursor-pointer hover:text-primary" />
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

  // Reset textarea height when message is cleared
  useEffect(() => {
    if (message === "" && textareaRef.current) {
      textareaRef.current.style.height = "24px"; // Reset to single line height
    }
  }, [message]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = "24px";
    
    // Set the height based on content with a maximum of ~4 lines
    const lineHeight = 24; // Approximate line height in pixels
    const maxHeight = lineHeight * 4; // 4 lines max
    
    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${newHeight}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle Enter key press (without shift)
    if (e.key === "Enter" && !e.shiftKey && onSubmit && !isDisabled) {
      e.preventDefault();
      if (message.trim()) {
        onSubmit(message);
        setMessage(""); // Clear the input after sending
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustTextareaHeight();
  };

  const handleSendClick = () => {
    if (onSubmit && message.trim() && !isDisabled) {
      onSubmit(message);
      setMessage(""); // Clear the input after sending
    }
  };

  return (
    <div className="mx-6 bg-background-primary rounded-md overflow-hidden border border-background-tertiary">
      <div className="flex items-center justify-between">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question..."
          disabled={isDisabled}
          rows={1}
          className="flex-1 bg-transparent border-none outline-none resize-none overflow-y-auto px-3 py-2 min-h-[40px] text-sm"
          style={{ height: "24px" }}
        />
        <Button 
          isIconOnly 
          variant="light" 
          size="sm" 
          color="primary" 
          onClick={handleSendClick}
          disabled={isDisabled || !message.trim()}
          className="mr-2"
        >
          <SendArrowOutlineIcon className="w-4 h-4" />
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
              <div className="relative flex flex-col min-h-[50vh] max-h-[70vh]">
                <div className="flex-1 flex flex-col-reverse overflow-y-auto px-2 py-4 pb-20">
                  {messages.map((message, index) => (
                    <MessageItem
                      message={message}
                      key={message.id}
                      isLastItem={index === messages.length - 1}
                      className="mb-6"
                    />
                  )).reverse()}
                </div>
                <div className="sticky bottom-0 bg-background-primary py-2 border-t border-background-tertiary">
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
