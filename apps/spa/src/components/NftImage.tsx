import type React from "react";
import { useLayoutEffect, useState } from "react";

import { cn } from "@workspace/ui/lib/utils";

import unknownNftImage from "@/assets/images/landscape-placeholder.svg";

type NftImageProps = React.ComponentPropsWithoutRef<"img">;

export const NftImage: React.FC<NftImageProps> = ({ src, ...imgProps }) => {
  const loadingStatus = useImageLoadingStatus(src, imgProps.referrerPolicy);

  const ImgComponentProps = { ...imgProps, loading: "lazy" as const };

  if (loadingStatus === "error" || !src) {
    return <UnknownImage alt="error" {...imgProps} />;
  }

  if (loadingStatus !== "loaded") {
    return <span style={ImgComponentProps.style} className={cn("inline-block", ImgComponentProps.className)} />;
  }

  return <img {...ImgComponentProps} alt={imgProps.alt ?? src} src={src} />;
};

export const UnknownImage: React.FC<NftImageProps> = (props) => {
  const ImgComponentProps = { ...props, loading: "lazy" as const };

  return <img {...ImgComponentProps} alt="error" src={unknownNftImage} />;
};

type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error";

/**
 * @see https://github.com/radix-ui/primitives/blob/660060a765634e9cc7bf4513f41e8dabc9824d74/packages/react/avatar/src/Avatar.tsx#L119
 */
function useImageLoadingStatus(src?: string | null, referrerPolicy?: React.HTMLAttributeReferrerPolicy) {
  const [loadingStatus, setLoadingStatus] = useState<ImageLoadingStatus>("idle");

  useLayoutEffect(() => {
    if (!src) {
      setLoadingStatus("error");
      return;
    }

    let isMounted = true;
    const image = new window.Image();

    const updateStatus = (status: ImageLoadingStatus) => () => {
      if (!isMounted) return;
      setLoadingStatus(status);
    };

    setLoadingStatus("loading");
    image.onload = updateStatus("loaded");
    image.onerror = updateStatus("error");
    image.src = src;
    if (referrerPolicy) {
      image.referrerPolicy = referrerPolicy;
    }

    return () => {
      isMounted = false;
    };
  }, [src, referrerPolicy]);

  return loadingStatus;
}
