import { useEffect, useRef } from "react";

import { TonConnectButton } from "@workspace/ton-connect-sdk-react-ui";

import { Header } from "@/components/Header";

export const HeaderContainer: React.FC<React.ComponentPropsWithoutRef<typeof Header>> = (props) => {
  const headerRef = useRef<HTMLDivElement>(null);

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

  return (
    <Header {...props} ref={headerRef}>
      <TonConnectButton />
    </Header>
  );
};
