import { FieldValues, FieldPath, useController } from "react-hook-form";
import Chip from "./Chip";
import cx from "../utils/cx";

type FormControlProps<T extends FieldValues> = {
  children: React.ReactNode;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  name: FieldPath<T>;
  optional?: boolean;
  size?: "small" | "default";
};

function FormControl<T extends FieldValues>({
  children,
  description,
  error,
  name,
  label,
  optional,
  size,
}: FormControlProps<T>) {
  const { fieldState } = useController({ name });

  const _error = error ?? fieldState.error?.message;

  return (
    <div className="grid gap-1">
      {label && (
        <div
          className={cx("flex w-full justify-between", {
            "text-xs pl-1 uppercase tracking-wide text-text/50":
              size === "small",
          })}
        >
          <label htmlFor={name}>{label}</label>
          {optional && (
            <Chip size="extraSmall" intent="neutral" className="text-text/50">
              Optional
            </Chip>
          )}
        </div>
      )}
      {description && <p className="text-text/50 text-sm">{description}</p>}
      <div>{children}</div>
      {_error && <p className="text-sm text-danger">{_error}</p>}
    </div>
  );
}

export default FormControl;
