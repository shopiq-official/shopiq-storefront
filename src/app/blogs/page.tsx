"use client";
import React, { useEffect, useState } from "react";
import styles from "./blogs.module.css";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const identifier = process.env.NEXT_PUBLIC_IDENTIFIER;

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = () => {
    axios({
      url: `https://backend.cftcommerce.com/api/blogs?identifier=${identifier}`,
      method: "GET",
    })
      .then((res: any) => {
        setBlogs(res.data.blogs);
      })
      .catch((err: any) => {});
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Blogs</h1>
      </div>
      <div className={styles.blogs}>
        {blogs?.map((blog: any, index: any) => {
          return (
            <Link href={`/blogs/${blog.slug}`} key={index}>
              <div className={styles.blog}>
                <div className={styles.blog_image}>
                  <Image
                    src={process.env.NEXT_PUBLIC_IMAGE + blog.image}
                    height={1500}
                    width={1500}
                    alt=""
                  />
                </div>
                <div className={styles.blog_content}>
                  <h3>{blog.title}</h3>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
