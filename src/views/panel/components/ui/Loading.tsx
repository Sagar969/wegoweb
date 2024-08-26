import { cn } from "@/utils/cn";
import { Spin } from "antd";
import { CSSProperties } from "react";

interface PropType {
  containerStyles?: CSSProperties;
  style?: CSSProperties;
  containerClassName?: string;
  className?: string;
}

export default function Loading({
  style,
  containerStyles,
  containerClassName,
  className,
}: PropType) {
  return (
    <>
      <div
        className={cn(
          "h-full flex items-center justify-center",
          containerClassName
        )}
        style={containerStyles}
      >
        <Spin className={className} style={style} />
      </div>
    </>
  );
}
