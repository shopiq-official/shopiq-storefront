"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./deals.module.css";
import Image from "next/image";
import ProductCard from "./productCard";

const ImageAndVideoSwitch = ({ media }: { media: Record<string, string> }) => {
  const [isVideoLoaded, setVideoLoaded] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleLoad = () => {
      setVideoLoaded(true);
    };

    if (videoRef?.current) {
      setVideoLoaded(false);

      videoRef?.current.addEventListener("loadeddata", handleLoad);
    }

    return () => {
      videoRef?.current?.removeEventListener("loadeddata", handleLoad);
    };
  }, [videoRef]);

  const handleHover = () => {
    if (videoRef.current) videoRef.current.play();
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  if (!media?.productVideoUrl) {
    return (
      <div className={styles.video_card}>
        <Image
          src={media?.productImageUrl || "/placeholder.jpg"}
          alt=""
          height={563}
          width={1000}
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        />
        <ProductCard products={media.productId} />
      </div>
    );
  }

  return (
    <div
      className={`${styles.video_card} ${
        isHovered && isVideoLoaded && styles.video_card_hover
      }`}
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      >
        <source src={media?.productVideoUrl} />
      </video>
      {isHovered && !isVideoLoaded && (
        <div className={styles.video_loading}>
          <span className="loader"></span>
        </div>
      )}
      <Image
        src={media?.productImageUrl || "/placeholder.jpg"}
        height={1000}
        width={1000}
        alt=""
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          zIndex: 10,
        }}
        fill={true}
      />

      <ProductCard products={media.productId} />
    </div>
  );
};

export default ImageAndVideoSwitch;
