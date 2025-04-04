import React from "react";
import cx from "../utils/cx";
import { autoRef } from "@utils/autoref";
import { Controller, FieldPath, FieldValues } from "react-hook-form";
import {
  Input as NextUiInput,
  InputProps as NextUiInputProps,
} from "@nextui-org/react";

type InputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  textSize?: "small" | "default";
} & NextUiInputProps;

function InputWithoutRef<T extends FieldValues>({
  name,
  className,
  disabled,
  textSize = "default",
  ...rest
}: InputProps<T>) {
  return (
    <Controller
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <NextUiInput
          id={name}
          disabled={disabled}
          className={cx(
            {
              "text-sm p-1": textSize === "small",
            },
            className
          )}
          {...field}
          {...rest}
        />
      )}
    />
  );
}

const Input = autoRef(InputWithoutRef);

export default Input;
