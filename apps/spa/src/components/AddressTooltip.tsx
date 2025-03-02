import type React from "react";
import { useState } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip";

interface AddressTooltip extends React.ComponentPropsWithoutRef<typeof Tooltip> {
  trigger: React.ReactNode;
}

export const AddressTooltip: React.FC<AddressTooltip> = ({ children, trigger, ...props }) => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip {...props} open={open}>
      <TooltipTrigger
        onMouseEnter={() => {
          setOpen(true);
        }}
        onMouseLeave={() => {
          setOpen(false);
        }}
        onFocus={() => {
          setOpen(true);
        }}
        onBlur={() => {
          setOpen(false);
        }}
        className="underline decoration-dashed decoration-current"
      >
        {trigger}
      </TooltipTrigger>
      <TooltipContent
        showArrow
        collisionPadding={10}
        className="dark px-2 py-1 text-xs max-w-[200px] break-all text-center"
      >
        {children}
      </TooltipContent>
    </Tooltip>
  );
};
