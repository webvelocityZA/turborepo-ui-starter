import { TriangleAlert } from "lucide-react";

import { Typography } from "@workspace/ui/components/typography";

import { RootRouteWrapper } from "@/components/RootRouteWrapper";
import { CONFIG } from "@/config";

export const Placeholder: React.FC<Omit<React.ComponentPropsWithoutRef<typeof RootRouteWrapper>, "children">> = (
  props,
) => {
  return (
    <RootRouteWrapper {...props}>
      <TriangleAlert size={80} className="text-destructive" />
      <Typography.H1>Access denied</Typography.H1>
      <Typography.Muted>
        Please open this application in{" "}
        <a href={CONFIG.VITE_TG_BOT_URL} className="text-primary underline">
          Telegram
        </a>
      </Typography.Muted>
    </RootRouteWrapper>
  );
};
