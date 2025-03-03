import { cn } from "@workspace/ui/lib/utils";

export const RootRouteWrapper: React.FC<React.ComponentPropsWithoutRef<"div">> = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col justify-center items-center w-full min-h-[var(--screen-height)]", className)}>
      {children}
    </div>
  );
};
