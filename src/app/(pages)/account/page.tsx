"use client";

import { useEffect, useState } from "react";
import api from "@/api";
import { useSelector } from "react-redux";
import styles from "./account.module.css";
import LogoutIcon from "@/assets/Icons/logout.svg";
import { retainoState } from "@/store/retaino/retaino.atom";
import { useRouter } from "next/navigation";
import { Metadata } from "next";
import Orders from "@/components/account/orders";
import { CartState } from "@/types";

const Account = () => {
  // Get the current status from the Redux store
  const retainoStatus: string = useSelector(
    (state: CartState) => state.retaino.state
  );
  const router = useRouter();

  // Show a loading spinner while the status is loading
  if (retainoStatus === "loading")
    return (
      <div
        style={{
          height: "90vh",
          width: "90vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="loader"></span>
      </div>
    );

  // Redirect to home if the user is not logged in
  if (!window?.Retaino?.isLoggedIn()) {
    router.push("/");
  }

  // Function to handle logout
  const onLogoutClick = () => {
    window.Retaino.LogoutUser("/"); // Log the user out and redirect to home
    localStorage.setItem(`${process.env.NEXT_PUBLIC_CART_NAME}`, "[]"); // Clear the cart in local storage
  };

  return (
    <div className={styles.container}>
      {/* Head section with welcome text and account details and logout button */}
      <div className={styles.main_heading}>
        <h3>Welcome!</h3>
        <div className={styles.btn_group}>
          <button onClick={() => window?.Retaino?.UserInfo()}>
            Account Details
          </button>
          <div className="custom-tooltip">
            <span className="tooltip-text">
              <LogoutIcon onClick={onLogoutClick} />
            </span>
            <span className="tooltip-content">Logout</span>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <ul className={styles.sections}>
          <li className={styles.active}>Orders</li>
        </ul>
        <div>
          <Orders /> {/* Component to display user orders */}
        </div>
      </div>
    </div>
  );
};

export default Account;
