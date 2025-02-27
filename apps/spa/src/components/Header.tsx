import type React from "react";

import { TonConnectButton } from "@workspace/ton-connect-sdk-react-ui";
import { cn } from "@workspace/ui/lib/utils";

export const Header: React.FC<Omit<React.ComponentPropsWithoutRef<"div">, "children">> = ({ className, ...props }) => (
  <div {...props} className={cn("container flex items-center justify-between", className)}>
    Logo
    <TonConnectButton />
  </div>
);
