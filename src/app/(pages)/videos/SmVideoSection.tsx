"use client";
import React, { useRef, useEffect, useState } from "react";
import styles from "./deals.module.css";
import Image from "next/image";
import ProductCard from "./productCard";

const SmVideoSection = ({ vid, index }: any) => {
  const [loading, setLoading] = useState(true);
  const videoRef: any = useRef();
  const imageRef: any = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        loadVideo();
      } else {
        handleVideoPause();
      }
    }, options);

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [imageRef]);

  useEffect(() => {
    if (videoRef.current) {
    }
  }, [videoRef]);

  const loadVideo = () => {
    if (!videoRef.current.src) {
      videoRef.current.src = vid?.productVideoUrl;
      videoRef.current.load();
      videoRef.current.addEventListener("loadeddata", handleVideoPlay);
    } else {
      handleVideoPlay();
    }
  };

  const handleVideoPause = () => {
    setLoading(true);
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    if (imageRef.current) {
      imageRef.current.style.opacity = 1;
      imageRef.current.style.transition = "opacity 0.5s";
    }
  };

  const handleVideoPlay = () => {
    setLoading(false);
    videoRef.current.play();
    if (imageRef.current) {
      imageRef.current.style.opacity = 0;
      imageRef.current.style.transition = "opacity 0.5s";
    }
  };

  return (
    <>
      <div className={styles.vd} id="video">
        <Image
          ref={imageRef}
          src={vid?.productImageUrl || "/placeholder.jpg"}
          alt=""
          width={1179}
          height={2556}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 1,
            transition: "0.5s",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        {loading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              background: "rgba(0,0,0,.3)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span className="loader"></span>
          </div>
        )}
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        ></video>
        <ProductCard products={vid.productId} />
      </div>
    </>
  );
};

export default SmVideoSection;
