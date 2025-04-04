"use client";

import { useAtom } from "jotai";

import LoginPopUp from "./login-popup";
import SignUpPopUp from "./signup-popup";
import { globalConfigAtom } from "./atoms/global.atom";

const POP_UPS_IDS = {
  LOGIN: "login",
  SIGN_UP: "sign-up",
};

const InitGlobalAppPopUps = () => {
  const [globalConfig, setGlobalConfig] = useAtom(globalConfigAtom);

  const handlePopupChange = (id: string) => {
    const isPopupOpen = globalConfig.activePopupsIds.includes(id);
    return setGlobalConfig(
      isPopupOpen
        ? { ...globalConfig, activePopupsIds: [] }
        : { ...globalConfig, activePopupsIds: [id] }
    );
  };

  return (
    <>
      <LoginPopUp
        onClose={() => handlePopupChange(POP_UPS_IDS.LOGIN)}
        isOpen={globalConfig.activePopupsIds.includes(POP_UPS_IDS.LOGIN)}
        onOpenSignUpPopUp={() => {
          handlePopupChange(POP_UPS_IDS.SIGN_UP);
        }}
      />
      <SignUpPopUp
        onClose={() => handlePopupChange(POP_UPS_IDS.SIGN_UP)}
        isOpen={globalConfig.activePopupsIds.includes(POP_UPS_IDS.SIGN_UP)}
        onOpenLoginPopUp={() => {
          handlePopupChange(POP_UPS_IDS.LOGIN);
        }}
      />
    </>
  );
};

export default InitGlobalAppPopUps;
