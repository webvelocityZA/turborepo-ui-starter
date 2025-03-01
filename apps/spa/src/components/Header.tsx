import React from "react";

import { cn } from "@workspace/ui/lib/utils";

export const Header = React.forwardRef<HTMLDivElement, React.ComponentPropsWithRef<"div">>(
  ({ children, className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={cn(
        "fixed left-0 top-0",
        "container flex items-center justify-between py-2",
        "backdrop-blur-sm border-b shadow",
        className,
      )}
    >
      Logo
      {children}
    </div>
  ),
);
