import { cn } from "@workspace/ui/lib/utils";

export const RootRouteWrapper: React.FC<React.ComponentPropsWithoutRef<"div">> = ({ children, className }) => {
  return <div className={cn("flex flex-col justify-center items-center w-full h-screen", className)}>{children}</div>;
};
