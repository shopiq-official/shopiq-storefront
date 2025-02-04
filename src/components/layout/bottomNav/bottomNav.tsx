"use client";
import { useState } from "react";
import styles from "./bottomNav.module.css";

import SearchIcon from "@/assets/Icons/nav/search.svg";
import HomeIcon from "@/assets/Icons/nav/home.svg";
import ProductIcon from "@/assets/Icons/nav/products.svg";
import CartIcon from "@/assets/Icons/nav/bag.svg";
import ReelIcon from "@/assets/Icons/nav/reels.svg";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { CartState } from "@/types";

interface BottomNavChildProp {
  cartLength?: number;
  OpenCart: React.Dispatch<React.SetStateAction<boolean>>;
  openSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const BottomNav = ({
  cartLength,
  OpenCart,
  openSearch,
}: BottomNavChildProp) => {
  const router = useRouter();
  const pathname = usePathname();
  const cart = useSelector((state: CartState) => state.cart.cart.length);

  const handleCart = () => {
    OpenCart(true);
  };

  return (
    <>
      <div className={styles.bottom_nav_main}>
        <div className={styles.icons_fixed}>
          <Link
            href="/"
            className={`${pathname === "/" ? styles.selected : ""}`}
          >
            <HomeIcon />
          </Link>
          <Link
            href="/products"
            className={`${
              pathname?.includes("/products") ? styles.selected : ""
            }`}
          >
            <ProductIcon />
          </Link>

          <Link
            href="/videos"
            className={`${
              pathname?.includes("/videos") ? styles.selected : ""
            }`}
            style={{ display: "flex", alignItems: "center" }}
          >
            <ReelIcon />
          </Link>

          <span className={styles.search_icon} onClick={() => openSearch(true)}>
            <SearchIcon />
          </span>
          <span
            onClick={handleCart}
            className={`${pathname?.includes("/cart") ? styles.selected : ""} ${
              styles.cart
            }`}
          >
            {cart > 0 && <div className={styles.bubble}>{cart}</div>}
            <CartIcon />
          </span>
        </div>
      </div>
    </>
  );
};

export default BottomNav;
