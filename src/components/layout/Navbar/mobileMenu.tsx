import React, { useEffect, useState } from "react";
import styles from "./mobileMenu.module.css";

import Link from "next/link";
import { social_media_links } from "@/lib/footer";
import RightIcon from "@/assets/Icons/nav/arrow.svg";
import Image from "next/image";
import { navSequence } from "@/lib/navSequence";

const MobileMenu = ({ categories, open, data, onClose }: any) => {
  const [Showhim, setShowHim] = useState(false);
  const [Showher, setShowHer] = useState(false);
  const [ShowProud, setShowProud] = useState(false);
  const [ShowAccessories, SetShowAccessories] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  return (
    <div
      className={`${styles.container} ${open && styles.container_active}`}
      style={{ overflow: "auto" }}
    >
      <ul>
        <Link href={"/products"} onClick={onClose}>
          <li>Shop</li>
        </Link>
        {navSequence(Object.keys(data)).map((val: any, index: number) => {
          return (
            <DynamicNav
              val={val}
              data={data[val]}
              onClose={onClose}
              key={index}
            />
          );
        })}
        <Link href={"/collections"} onClick={onClose}>
          <li>Collections</li>
        </Link>
        <Link href={"/blogs"} onClick={onClose}>
          <li>Blogs</li>
        </Link>
      </ul>

      <Link
        style={{ width: "100%", display: "flex", paddingTop: "10px" }}
        href="https://www.YOUR_IDENTIFIER/blogs/the-impact-of-fast-fashion-on-the-environment-lessons-from-global-case-studies"
        onClick={onClose}
      >
        <Image
          src="/images/hamburger-image.jpeg"
          height={500}
          width={500}
          alt=""
          style={{ width: "85%", height: "auto", marginInline: "auto" }}
        />
      </Link>

      <ul className={styles.social_icons}>
        {social_media_links.map((val, index) => {
          return (
            <li key={index}>
              <Link key={index} href={val.link} onClick={onClose}>
                <val.icon />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const DynamicNav = ({ val, data, onClose }: any) => {
  const [show, setShow] = useState(false);

  if (data.length === 0)
    return (
      <Link href={`/${val}`} onClick={onClose}>
        <li>{val}</li>
      </Link>
    );

  return (
    <>
      <li>
        <div
          onClick={() => setShow((prev) => !prev)}
          className={styles.cat_top}
        >
          {val}
          <RightIcon
            className={`${styles.sub_menu_open_icon} ${
              show && styles.sub_menu_open_icon_active
            }`}
          />
        </div>

        <span
          className={`${styles.sub_menu} ${show && styles.sub_menu_active}`}
        >
          {data?.map((vall: any, ind: any) => {
            return (
              <Link href={`/${val}/${vall}`} key={ind} onClick={onClose}>
                <ol style={{ textTransform: "capitalize" }}>{vall}</ol>
              </Link>
            );
          })}
        </span>
      </li>
    </>
  );
};

export default MobileMenu;
