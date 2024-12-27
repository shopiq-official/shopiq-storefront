"use client";
import React, { useEffect, useState } from "react";
import styles from "./slug.module.css";
import axios from "axios";
import Image from "next/image";
import { Blog } from "@/types";

const identifier = process.env.NEXT_PUBLIC_IDENTIFIER;

const Page = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = () => {
    axios({
      method: "GET",
      url:
        `https://api.shopiq.app/api/blogs/?identifier=${identifier}&slug=` +
        props?.params?.slug,
    })
      .then((res: Record<string, any>) => {
        setBlog(res.data.blogs[0]);
        setLoading(false);
      })
      .catch((err: Error) => {});
  };

  if (loading)
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="loader" />
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image src={blog?.image || ""} height={1500} width={1500} alt="" />
        <div className={styles.heading}>
          <h1>{blog?.title}</h1>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.page}>
          <p style={{ color: "grey", paddingBottom: "20px" }}>
            Created At:{" "}
            {blog?.createdAt &&
              String(blog.createdAt)
                .split("T")[0]
                .split("-")
                .reverse()
                .join("-")}{" "}
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: blog?.body ? blog.body.replace(/&nbsp;/g, " ") : "",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Page;
