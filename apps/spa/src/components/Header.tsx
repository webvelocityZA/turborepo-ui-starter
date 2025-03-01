import React from "react";

import { cn } from "@workspace/ui/lib/utils";

export const Header = React.forwardRef<HTMLDivElement, React.ComponentPropsWithRef<"div">>(
  ({ children, className, ...props }, ref) => (
    <div {...props} ref={ref} className={cn("container flex items-center justify-between py-2", className)}>
      Logo
      {children}
    </div>
  ),
);
