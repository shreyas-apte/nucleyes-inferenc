"use client";

import React, { HTMLAttributes } from "react";
import { useRouter } from "next/navigation";
import { Button, Divider, Input } from "@nextui-org/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

import TrashIcon from "../assets/icons/trash.svg";
import CopyAltIcon from "../assets/icons/copy-alt-outline.svg";

import cx from "../utils/cx";

const UserAccount = () => {
  const router = useRouter();

  return (
    <section className="flex-1 flex justify-center">
      <div className="flex-1 max-w-3xl">
        <div className="flex items-center gap-x-4 mt-6 -mb-2">
          <Button isIconOnly variant="light" size="sm" onClick={router.back}>
            <ArrowLeftIcon className="w-6 h-6" width={24} height={24} />
          </Button>
          <h3 className="font-semibold text-base">User Account</h3>
        </div>
        <BasicDetails />
        <ManageAccess />
        <ManageApiKey />
        <BillingAndPlans />
      </div>
    </section>
  );
};

export default UserAccount;

const ProfileItem: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  title,
  children,
  className,
}) => {
  return (
    <div className={cx("bg-background-primary rounded-xl p-6 my-6", className)}>
      <h4 className="text-base font-semibold text-text">{title}</h4>
      <Divider className="mt-4 mb-6" />
      {children}
    </div>
  );
};

const BasicDetails = () => {
  return (
    <ProfileItem title="Profile Setting">
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        <Input
          radius="sm"
          type="text"
          label="Name"
          variant="bordered"
          labelPlacement="outside"
          placeholder="John Doe"
          value="Aakash Sharma"
        />
        <Input
          radius="sm"
          type="email"
          isDisabled
          label="Email"
          variant="faded"
          labelPlacement="outside"
          placeholder="john.doe@gmail.com"
          value="9267aakashsharma@gmail.com"
        />
        <Input
          radius="sm"
          type="text"
          variant="bordered"
          labelPlacement="outside"
          label="Company / Website"
          placeholder="Redmond"
          value="Smartify Delhi"
        />
        <Input
          radius="sm"
          type="text"
          isDisabled
          label="Role"
          variant="faded"
          labelPlacement="outside"
          placeholder="Admin"
          value="Admin"
        />
        <Input
          radius="sm"
          type="password"
          label="Password"
          variant="bordered"
          labelPlacement="outside"
          placeholder="Min. 8 characters"
          value="dsadkasldas"
          endContent={
            <Button variant="light" color="primary" size="sm">
              Change
            </Button>
          }
        />
      </div>
    </ProfileItem>
  );
};

const ManageAccess = () => {
  return (
    <ProfileItem title="Manage Access">
      <div className="grid grid-cols-12 gap-y-4">
        <>
          <div className="col-span-6">
            <p className="font-medium text-sm text-grey">
              9267aakashsharma@gmail.com (You)
            </p>
          </div>
          <div className="col-span-3 -mt-1">
            <div className="flex items-center gap-x-1 text-sm font-normal">
              Admin
              <Button isIconOnly size="sm" variant="light">
                <ChevronDownIcon width={16} height={16} />
              </Button>
            </div>
          </div>
          <div className="col-span-3 flex">
            <Button
              size="sm"
              variant="light"
              color="danger"
              className="-mt-1 ml-auto"
            >
              Remove
            </Button>
          </div>
        </>
        <>
          <div className="col-span-6">
            <p className="font-medium text-sm text-grey">
              9267aakashsharma@gmail.com (You)
            </p>
          </div>
          <div className="col-span-3 -mt-1">
            <div className="flex items-center gap-x-1 text-sm font-normal">
              Admin
              <Button isIconOnly size="sm" variant="light">
                <ChevronDownIcon width={16} height={16} />
              </Button>
            </div>
          </div>
          <div className="col-span-3 flex">
            <Button
              size="sm"
              variant="light"
              color="danger"
              className="-mt-1 ml-auto"
            >
              Remove
            </Button>
          </div>
        </>
        <>
          <div className="col-span-6">
            <p className="font-medium text-sm text-grey">
              9267aakashsharma@gmail.com (You)
            </p>
          </div>
          <div className="col-span-3 -mt-1">
            <div className="flex items-center gap-x-1 text-sm font-normal">
              Admin
              <Button isIconOnly size="sm" variant="light">
                <ChevronDownIcon width={16} height={16} />
              </Button>
            </div>
          </div>
          <div className="col-span-3 flex">
            <Button
              size="sm"
              variant="light"
              color="danger"
              className="-mt-1 ml-auto"
            >
              Remove
            </Button>
          </div>
        </>
      </div>
    </ProfileItem>
  );
};

const ManageApiKey = () => {
  return (
    <ProfileItem title="Manage Your API Key">
      <div>
        <p className="text-grey font-medium text-sm">
          Generate faster responses with zero waiting time. Unlock total privacy
          and unlimited credits for response generation by using your own OpenAI
          API key.
        </p>
        <div className="flex items-center gap-x-8 mt-6">
          <div className="max-w-[60%] flex-1">
            <Input
              radius="sm"
              type="text"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Min. 8 characters"
              value="xxxxxxxxxxxxxxxxxxxx"
              className="text-gray-400 mb-2"
              endContent={
                <div className="flex items-center justify-end gap-x-1">
                  <Button color="primary" variant="light" isIconOnly size="sm">
                    <CopyAltIcon className="w-6 h-6 shrink-0" />
                  </Button>
                  <Button color="danger" variant="light" isIconOnly size="sm">
                    <TrashIcon className="w-5 h-5 shrink-0" />
                  </Button>
                </div>
              }
            />
            <small className="text-grey text-sm font-normal">
              Available models: GPT 3.5, GPT 4, GPT 4 turbo
            </small>
          </div>
          <div className="flex items-center gap-x-2 text-primary">
            <CheckCircleIcon width={20} height={20} />
            <h6>Verified</h6>
          </div>
        </div>
      </div>
    </ProfileItem>
  );
};

const BillingAndPlans = () => {
  return (
    <ProfileItem title="Billing & Plans">
      <div className="grid grid-cols-3 gap-6 my-6">
        <div className="bg-background-secondary border border-gray-800 rounded-lg p-3">
          <small className="text-grey text-sm font-medium">Current Plan</small>
          <div className="mt-2 font-semibold text-base text-text flex justify-between items-center">
            <p>Free Trial</p>
            <span className="text-warning-400 underline cursor-pointer">
              Upgrade
            </span>
          </div>
        </div>
        <div className="bg-background-secondary border border-gray-800 rounded-lg p-3">
          <small className="text-grey text-sm font-medium">Valid Till</small>
          <div className="mt-2 font-semibold text-base text-text flex justify-between items-center">
            <p>19 May 2024</p>
          </div>
        </div>
        <div className="bg-background-secondary border border-gray-800 rounded-lg p-3">
          <small className="text-grey text-sm font-medium">Billing Cycle</small>
          <div className="mt-2 font-semibold text-base text-text flex justify-between items-center">
            <p>NA</p>
          </div>
        </div>
      </div>
    </ProfileItem>
  );
};
