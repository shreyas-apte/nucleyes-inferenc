import type { ForwardedRef, ReactElement } from "react";
import { forwardRef } from "react";

type AutoRefFunction = {
  (props: any): ReactElement | null;
  displayName?: string;
};

export function autoRef<
  Fn extends AutoRefFunction,
  Props extends { ref?: RefType },
  RefType
>(fn: Fn) {
  const AutoRef = (props: Props, ref: ForwardedRef<RefType>) =>
    fn({ ...props, ref });
  AutoRef.displayName = fn.displayName || fn.name || "AutoRef";
  return forwardRef(AutoRef) as unknown as Fn;
}
