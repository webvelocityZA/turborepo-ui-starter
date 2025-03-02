import React from "react";

import { cn } from "@workspace/ui/lib/utils";

export const Header = React.forwardRef<HTMLDivElement, React.ComponentPropsWithRef<"div">>(
  ({ children, className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={cn("fixed w-full left-0 top-0", "backdrop-blur-sm bg-background/80 border-b shadow", className)}
    >
      <div className="container flex items-center justify-between py-2">
        Logo
        {children}
      </div>
    </div>
  ),
);
