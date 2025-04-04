"use client";

import { useCallback, useState } from "react";
import { Button, Divider, Tooltip } from "@nextui-org/react";
import { FileRejection, useDropzone } from "react-dropzone";
import { XCircleIcon } from "@heroicons/react/20/solid";

import cx from "../utils/cx";
import useUpload from "../hooks/use-upload";
import { UploadedFile } from "../types/assistant.type";
import ContainerTile from "../components/container-tile";
import { getPreSignedUrl } from "../queries/presigned-url";

import TrashIcon from "../assets/icons/trash.svg";
import LinkOutlineIcon from "../assets/icons/link-outline.svg";
import LinkAltOutlineIcon from "../assets/icons/link-alt-outline.svg";
import DocumentOutlineIcon from "../assets/icons/document-outline.svg";
import PlusCircleSolidIcon from "../assets/icons/plus-circle-solid.svg";

const UploadFiles = () => {
  const { uploadFile } = useUpload();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isContainerDrawerActive, setContainerDrawerActive] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        console.log("accepted files: ", acceptedFiles);
        const uploadedFiles = await Promise.all(
          acceptedFiles.map(async (file) => {
            const url = await uploadDroppedFile(file);
            await uploadFile(url, file);
            return {
              ...file,
              url,
            } as UploadedFile;
          })
        );
        setUploadedFiles(uploadedFiles);
      } catch (error) {
        console.error(error);
      }
    },
    [uploadFile]
  );

  const onDropRejected = useCallback((rejectedFiles: FileRejection[]) => {
    // Error log unsupported files
  }, []);

  const uploadDroppedFile = async (file: File) => {
    const { data } = await getPreSignedUrl(file.name);
    if (data) return data as string;
    else throw new Error("Could not find pre-signed url");
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "text/*": [".csv", ".txt"],
      "application/msword": [".doc"],
      "application/pdf": [".pdf"],
    },
    multiple: true,
  });

  return (
    <ContainerTile
      title="Upload Files"
      // moreCount={2}
      // collapsedChildren={<></>}
      isDrawerActive={isContainerDrawerActive}
      onChangeDrawerActive={setContainerDrawerActive}
      icon={<DocumentOutlineIcon className="w-5 h-5 shrink-0" />}
    >
      <div className="mt-4 flex-1 flex flex-col">
        <div>
          <div
            className="min-h-[120px] flex flex-col border rounded-lg border-background-tertiary mb-1 p-3"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {uploadedFiles.length > 0 ? (
              <div>
                <div className="flex justify-between items-center">
                  <div className="flex-1 flex items-center gap-x-2 text-grey text-sm">
                    <DocumentOutlineIcon className="w-5 h-5 shrink-0 text-grey" />
                    <h4>Uploaded Files</h4>
                  </div>
                  <Button isIconOnly variant="light" size="sm" onClick={open}>
                    <PlusCircleSolidIcon className="text-primary w-5 h-5" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3 mt-3">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.url}
                      className="pl-2 pr-1 py-0.5 rounded-2xl shrink-0 bg-background-secondary flex gap-x-0.5 items-center"
                    >
                      <Tooltip content={file.name}>
                        <p className="text-text text-sm max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {file.name}
                        </p>
                      </Tooltip>
                      <XCircleIcon
                        width={16}
                        height={16}
                        className="cursor-pointer text-gray-200"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex gap-x-2 items-center my-auto mx-auto">
                <DocumentOutlineIcon className="w-5 h-5 shrink-0 text-grey" />
                <p className="font-medium text-sm text-grey">
                  Drag your files here or{" "}
                  <span className="text-primary underline underline-offset-4 cursor-pointer">
                    upload
                  </span>
                </p>
              </div>
            )}
          </div>
          <small className="text-grey text-xs font-normal">
            Supported formats - PDF, DOC, CSV, DOCX
          </small>
        </div>
        <Divider className="my-4" />
        <ConnectedFiles />
      </div>
    </ContainerTile>
  );
};

export default UploadFiles;

const ConnectedFiles = () => {
  return (
    <div>
      <div className="flex gap-2 mb-3 items-center justify-between">
        <h3 className="text-base font-semibold">Connected Files</h3>
        <LinkAltOutlineIcon className="w-6 h-6 text-primary" />
      </div>

      <FileConnection status="connecting" name="document.pdf" />
      <FileConnection status="connected" name="data.csv" />
      <FileConnection status="error" name="faq.pdf" />
    </div>
  );
};

type FileConnectionProps = {
  name: string;
  status: "connected" | "connecting" | "error";
  handleRemove?: () => void;
};

const FileConnection = ({
  status,
  name,
  handleRemove,
}: FileConnectionProps) => {
  const isPulsating = status === "connecting";

  const colors =
    status === "error"
      ? {
          innerCircle: "bg-red-500",
          outerCircle: "bg-red-500/20",
        }
      : status === "connected"
      ? {
          innerCircle: "bg-primary",
          outerCircle: "bg-primary/20",
        }
      : {
          innerCircle: "bg-yellow-500",
          outerCircle: "bg-yellow-500/20",
        };

  return (
    <div className="p-1 group text-grey text-sm hover:bg-default-100 rounded-md flex items-center gap-2">
      <span className="relative w-3 h-3 shrink-0">
        <span
          className={cx("w-3 h-3 absolute rounded-full", colors.outerCircle, {
            "animate-pulse": isPulsating,
          })}
        />
        <span
          className={cx(
            "w-1.5 h-1.5 absolute top-[3px] left-[3px] rounded-full",
            colors.innerCircle
          )}
        />
        <span className="sr-only">{status}</span>
      </span>
      <p className="grow truncate">{name}</p>
      <Button
        onClick={handleRemove}
        color="danger"
        size="sm"
        isIconOnly
        className="opacity-0 transition-none pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100"
        variant="light"
      >
        <TrashIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};
