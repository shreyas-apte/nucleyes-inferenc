import React from "react";
import cx from "../utils/cx";

const Pulse = ({
  size = 12,
  isPulsating = false,
  status = "connected",
}: {
  size?: number;
  status: "connected" | "connecting" | "error";
  isPulsating: boolean;
}) => {
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
    <span
      className="relative shrink-0"
      style={{
        width: size,
        height: size,
      }}
    >
      <span
        className={cx("absolute rounded-full", colors.outerCircle, {
          "animate-pulse": isPulsating,
        })}
        style={{
          width: size,
          height: size,
        }}
      />
      <span
        className={cx(
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full",
          colors.innerCircle
        )}
        style={{
          width: size / 2,
          height: size / 2,
        }}
      />
      <span className="sr-only">{status}</span>
    </span>
  );
};

export default Pulse;
