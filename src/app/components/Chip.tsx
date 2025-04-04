import React from "react";
import cx from "../utils/cx";
import { cva, type VariantProps } from "class-variance-authority";

const chipVariants = cva("flex items-center w-fit", {
  variants: {
    intent: {
      primary: ["bg-primary/10", "border-primary", "text-primary"],
      danger: ["bg-danger/10", "border-danger", "text-danger"],
      neutral: ["bg-text/10", "border-text", "text-text"],
      secondary: ["bg-secondary/10", "border-secondary", "text-secondary-dark"],
      tertiary: ["bg-tertiary/10", "border-tertiary", "text-tertiary-dark"],
    },
    size: {
      extraSmall: ["text-xs", "py-px", "px-0.5", "rounded"],
      small: ["text-sm", "py-px", "px-0.5", "rounded"],
      medium: ["text-sm", "py-0.5", "px-1", "rounded-md"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  icon?: React.ReactNode;
}

const Chip = ({
  className,
  intent,
  children,
  size,
  icon,
  ...props
}: ChipProps) => {
  return (
    <span className={cx(chipVariants({ intent, className, size }))} {...props}>
      {icon && (
        <span
          className={cx({
            "mr-2": size === "small",
            "mr-2.5": size === "medium",
          })}
        >
          {icon}
        </span>
      )}
      {children}
    </span>
  );
};

export default Chip;
