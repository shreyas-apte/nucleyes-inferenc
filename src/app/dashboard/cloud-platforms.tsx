import Image from "next/image";
import { useState } from "react";
import { sentenceCase } from "change-case";

import ContainerTile from "../components/container-tile";
import CloudUploadOutlineIcon from "../assets/icons/cloud-upload-outline.svg";

const CloudPlatforms = () => {
  const [isContainerDrawerActive, setContainerDrawerActive] = useState(false);

  return (
    <ContainerTile
      title="Cloud Platforms"
      // moreCount={2}
      collapsedChildren={<CollapsedContainer />}
      isDrawerActive={isContainerDrawerActive}
      onChangeDrawerActive={setContainerDrawerActive}
      icon={<CloudUploadOutlineIcon className="w-5 h-5 shrink-0" />}
    >
      <p>fds</p>
    </ContainerTile>
  );
};

export default CloudPlatforms;

const CollapsedContainer = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center gap-x-2">
        <Image
          width={20}
          height={20}
          alt="Google drive"
          src={`/assets/icons/google-drive.png`}
        />
        <h4 className="text-sm font-normal">Google Drive</h4>
      </div>
      <div className="flex items-center gap-x-2">
        <Image
          width={20}
          height={20}
          alt="dropbox"
          src={`/assets/icons/dropbox.png`}
        />
        <h4 className="text-sm font-normal">Dropbox</h4>
      </div>
    </div>
  );
};
