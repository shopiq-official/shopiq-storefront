"use client";
import React, { useState } from "react";
import Image from "next/image";
import CloseIcon from "@/assets/Icons/cross.svg";

import styles from "./exitPopup.module.css";
import { submitContact } from "@/api";

interface childProp {
  open: React.Dispatch<React.SetStateAction<boolean>>;
}
const ExitPopup: React.FC<childProp> = ({ open }) => {
  const [email, setEmail] = useState("");

  const handleShow = () => {
    open(false);
  };

  const handleContact = async () => {
    if (!email) {
      return;
    } else {
      try {
        const res = await submitContact({
          personalEmail: email,
          identifier: process.env.NEXT_PUBLIC_IDENTIFIER ?? "",
        });
        open(false);
      } catch (error) {
        open(false);
      }
    }
  };

  return (
    <div className={styles.outer_overlay}>
      <div className={styles.modal_main}>
        <div className={styles.left_part}>
          <div>
            <h2>Be the first to know</h2>
            <p>
              Get the latest releases and design inspiration delivered to your
              inbox
            </p>
            <input
              type="text"
              placeholder="Enter Email Address"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className={styles.btn_group}>
              <button onClick={handleContact}>Continue</button>
              <button onClick={handleShow}>No Thanks</button>
            </div>
          </div>
        </div>
        <div className={styles.right_part}>
          <span className={styles.cross} onClick={handleShow}>
            <span className={styles.inner_cross}>
              <CloseIcon className={styles.mob_close_icon} />
            </span>
          </span>
          <Image
            src={"/placeholder.jpg"}
            alt="..."
            height={1000}
            width={1000}
          />
        </div>
      </div>
    </div>
  );
};

export default ExitPopup;
