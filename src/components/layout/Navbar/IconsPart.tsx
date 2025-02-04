"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import AccountIcon from "@/assets/Icons/nav/user.svg";
import SearchIcon from "@/assets/Icons/nav/search.svg";
import CartIcon from "@/assets/Icons/nav/bag.svg";
import styles from "./iconsPart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { localToCloud } from "@/redux/cart.slice";
import toast from "react-hot-toast";
import { keyContextProps, useKeyContext } from "@/providers/keyProvider";
import BottomNav from "../bottomNav/bottomNav";
import MobileMenu from "./mobileMenu";
import { useUTMData } from "@/hooks/utmData";
import { useUserInfo } from "@/hooks/useUserInfo";
import { CartState, Category, Product } from "@/types";

const Search = dynamic(() => import("../search/search"));
const Cart = dynamic(() => import("../cart/cart"));

interface IconsPartProps {
  cat: Category[];
  bs: Product[];
  data: Record<string, string[]>;
}

export const IconsPart = ({ cat, bs, data }: IconsPartProps) => {
  // console.log("cat data", cat);
  useUTMData();
  const { getUserDeviceDetails } = useUserInfo();
  getUserDeviceDetails();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { key }: keyContextProps = useKeyContext();
  const [innerWidth, setInnerWidth] = useState(0);

  const [search, setSearch] = useState(false);
  const [cart, setCart] = useState(false);
  const [menu, setMenu] = useState(false);

  const cartLength = useSelector((state: CartState) => {
    return state.cart.cart?.length || 0;
  });

  useEffect(() => {
    setInnerWidth(window.innerWidth);
    console.log(window.innerWidth);
  }, []);

  return (
    <>
      {(pathname !== "/videos" || innerWidth > 700) && (
        <ul className={styles.icons}>
          <li className={styles.search_icon} onClick={() => setSearch(true)}>
            <SearchIcon />
          </li>
          <li className={styles.cart_icon} onClick={() => setCart(true)}>
            <CartIcon />
            {cartLength > 0 && (
              <div className={styles.bubble}>{cartLength}</div>
            )}
          </li>
          <li
            className={styles.account_icon}
            onClick={() => {
              if (window?.Retaino?.isLoggedIn()) {
                router.push("/account");
              } else {
                window?.Retaino.LoginWindow(key, "", () => {
                  toast.success("Login successfully.");
                  dispatch<any>(localToCloud());
                });
              }
            }}
          >
            <AccountIcon />
          </li>
          <li
            className={`${styles.menu_icon} ${menu && styles.active_menu}`}
            onClick={() => setMenu((prev) => !prev)}
          >
            <div></div>
            <div></div>
            <div></div>
          </li>
        </ul>
      )}
      <Search
        open={search}
        onClose={() => setSearch(false)}
        categories={cat}
        bestSeller={bs}
      />

      <Cart open={cart} onClose={() => setCart(false)} />

      <BottomNav
        openSearch={() => setSearch(true)}
        OpenCart={() => setCart(true)}
        cartLength={cartLength}
      />
      <MobileMenu
        categories={cat}
        data={data}
        open={menu}
        onClose={() => setMenu(false)}
      />
    </>
  );
};
