"use client";
import React, { useRef } from "react";
import styles from "./magnify.module.css";
import Image from "next/image";

const MyReactImageMagnify = ({ img }: { img: string }) => {
  let ref = useRef(null);
  let imgRef = useRef<HTMLImageElement | null>(null);

  const handleMove = (event: any, e: any) => {
    let rect = e.target?.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    // Calculate the percentage position of the cursor within the container
    var percentX = (x / rect.width) * 100;
    var percentY = (y / rect.height) * 100;

    imgRef.current!.style.transform = `scale(2) translate(calc(${
      -percentX / 2
    }%), ${-percentY / 2}%)`;
  };

  return (
    <>
      <div
        className={styles.container}
        onMouseOver={(e: any) => {
          ref = e.target;
          ref = e.target.addEventListener("mousemove", (event: MouseEvent) =>
            handleMove(event, e)
          );
        }}
        onMouseLeave={(e) => {
          e.target.removeEventListener("mousemove", (event: any) =>
            handleMove(event, e)
          );
        }}
      >
        <Image height={1000} width={1000} src={img} alt="" />
        <div className={styles.hover_image}>
          <div>
            <Image src={img} height={2000} width={20000} alt="" ref={imgRef} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyReactImageMagnify;
