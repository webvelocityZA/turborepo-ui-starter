import { useRouter } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { TonConnectButton, useTonWallet } from "@workspace/ton-connect-sdk-react-ui";

import { Header } from "@/components/Header";

export const HeaderContainer: React.FC<React.ComponentPropsWithoutRef<typeof Header>> = (props) => {
  const headerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const wallet = useTonWallet();

  /**
   * This effect is used to set the header height as a CSS variable
   * to be used in the main content to avoid overlapping
   */
  useEffect(() => {
    const handleResize = () => {
      document.documentElement.style.setProperty("--header-height", `${headerRef.current?.offsetHeight}px`);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /**
   * biome-ignore lint/correctness/useExhaustiveDependencies:
   * We dont need to add router to the dependencies because
   * we only want to invalidate the router when the wallet changes
   * It allows us to redirect the user to the correct route
   */
  useEffect(() => {
    router.invalidate();
  }, [wallet]);

  return (
    <Header {...props} ref={headerRef}>
      <TonConnectButton />
    </Header>
  );
};
