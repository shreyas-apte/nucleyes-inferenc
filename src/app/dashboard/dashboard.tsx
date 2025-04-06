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
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

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
    >
      <MainDashBoardContent
        messages={chatMessages}
        isAiResponding={isAiResponding}
        assistantDetails={details}
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
  onChangeLogsBarDrawer,
}: {
  children: React.ReactNode;
  details: Assistant;
  isLogsBarActive: boolean;
  onChangeLogsBarDrawer: (value: boolean) => void;
}) => {
  const [assistantInfoSize, setAssistantInfoSize] = useState<{
    width: number;
    height: number;
  }>();
  const [isAssistantInfoCollapsed, setIsAssistantInfoCollapsed] = useState(false);

  return (
    <AppLayout>
      <section className="flex-1 flex items-stretch justify-between bg-background-secondary">
        <div className={`relative transition-all duration-300 ease-in-out ${isAssistantInfoCollapsed ? 'w-[50px]' : ''}`}>
          {isAssistantInfoCollapsed ? (
            <div className="fixed top-[76px] h-[calc(100vh-76px)] bg-background-primary border-r border-background-tertiary w-[50px] flex flex-col items-center">
              <div className="flex justify-center w-full px-3 py-2">
                <Button 
                  isIconOnly 
                  size="sm" 
                  variant="light" 
                  onClick={() => setIsAssistantInfoCollapsed(false)}
                >
                  <ArrowRightIcon className="w-5 h-5 text-white" />
                </Button>
              </div>
              <div className="w-8 h-8 rounded-full bg-background-secondary flex items-center justify-center mt-4">
                <Image 
                  src={details?.details?.image || "/logo.svg"} 
                  alt={details?.details?.name || "Assistant"} 
                  width={20} 
                  height={20} 
                  className="rounded-full"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col bg-background-primary min-w-[340px] w-1/4 h-[calc(100vh-76px)]">
              <div className="flex justify-end px-3 py-2 border-r border-background-tertiary">
                <Button 
                  isIconOnly 
                  size="sm" 
                  variant="light" 
                  onClick={() => setIsAssistantInfoCollapsed(true)}
                >
                  <ArrowLeftIcon className="w-5 h-5 text-white" />
                </Button>
              </div>
              <div className="overflow-hidden h-[calc(100%-40px)]">
                <AssistantInfo
                  basicDetails={details.details}
                  onResize={(size) => {
                    setAssistantInfoSize(size);
                  }}
                />
              </div>
            </div>
          )}
        </div>
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
  onMessageSubmit,
}: {
  messages: Message[];
  isAiResponding?: boolean;
  assistantDetails?: Assistant;
  onChangeLogsDrawer?: (value: boolean) => void;
  onMessageSubmit?: (message: string) => void;
}) => {
  return (
    <div className="relative flex-1 flex flex-col h-[calc(100vh-76px)] overflow-x-hidden">
      <div className="absolute top-6 w-[calc(100%-64px)] flex justify-between items-center px-8 z-10">
        <div></div>
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
      
      <div className="flex-1 flex flex-col-reverse overflow-y-auto overflow-x-hidden px-8 pt-16 pb-28">
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
    <div className={`flex gap-x-4 ${className || ""} max-w-full`}>
      <Image
        width={24}
        height={24}
        src={message.sender.image}
        alt={message.sender.name}
        className="shrink-0 w-6 h-6 rounded-full"
      />
      <div className="flex-1 min-w-0 overflow-hidden">
        <h4 className="text-base font-semibold">{message.sender.name}</h4>
        {message.type === "bot" ? (
          <div className="markdown-content mt-0.5 text-sm font-normal overflow-hidden">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              components={{
                a: ({node, ...props}) => <a className="text-primary hover:underline" {...props} />,
                p: ({node, ...props}) => <p className="my-2 break-words" {...props} />,
                h1: ({node, ...props}) => <h1 className="text-xl font-bold my-3 break-words" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-lg font-bold my-2 break-words" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-md font-bold my-2 break-words" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc ml-4 my-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal ml-4 my-2" {...props} />,
                li: ({node, ...props}) => <li className="my-1 break-words" {...props} />,
                code: ({node, className, children, ...props}) => {
                  const match = /language-(\w+)/.exec(className || '');
                  return match ? (
                    <div className="my-3 overflow-auto rounded-md bg-gray-800 max-w-full">
                      <pre className={`${className} p-2 text-xs overflow-auto whitespace-pre-wrap break-all`}>
                        <code className={className} {...props}>{children}</code>
                      </pre>
                    </div>
                  ) : (
                    <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-xs break-all" {...props}>
                      {children}
                    </code>
                  );
                },
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-gray-200 pl-4 italic my-2 break-words" {...props} />
                ),
                table: ({node, ...props}) => (
                  <div className="overflow-x-auto my-4 max-w-full">
                    <table className="w-full divide-y divide-gray-300 table-auto" {...props} />
                  </div>
                ),
                th: ({node, ...props}) => (
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider bg-gray-100 dark:bg-gray-700 break-words" {...props} />
                ),
                td: ({node, ...props}) => (
                  <td className="px-3 py-2 text-sm break-words" {...props} />
                ),
                tr: ({node, ...props}) => (
                  <tr className="even:bg-gray-50 dark:even:bg-gray-800" {...props} />
                ),
                img: ({node, ...props}) => (
                  <img className="max-w-full h-auto rounded my-2" {...props} alt={props.alt || 'Image'} />
                ),
              }}
            >
              {message.text}
            </ReactMarkdown>
          </div>
        ) : (
          <Linkify>
            <p className="[&>a]:text-primary mt-0.5 text-sm font-normal break-words">
              {message.text}
            </p>
          </Linkify>
        )}
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
