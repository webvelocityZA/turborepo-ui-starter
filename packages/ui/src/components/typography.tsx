import { cn } from "@workspace/ui/lib/utils";

const H1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h1 {...props} className={cn("text-2xl font-bold", className)} />
);

const Muted: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => (
  <p {...props} className={cn("text-lg text-muted-foreground", className)} />
);

export const Typography = {
  H1,
  Muted,
};
