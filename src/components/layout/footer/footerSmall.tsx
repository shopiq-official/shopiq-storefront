"use client";
import styles from "./footer.module.css";
import Link from "next/link";
import { useState } from "react";
// import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import DownIcon from "@/assets/Icons/dropDown.svg";

const FooterSmall = ({ categories, store }: any) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<Number | null>(null);

  return (
    <>
      <div className={styles.footer_sm}>
        {/* <Image src={Logo} alt="" /> */}
        <ul className={styles.footer_content}>
          <li className={styles.store}>
            <span
              onClick={() => {
                isDropdownOpen === 1
                  ? setIsDropdownOpen(null)
                  : setIsDropdownOpen(1);
              }}
            >
              <h4>VISIT STORE</h4>
              {isDropdownOpen == 1 ? <DownIcon /> : <DownIcon />}
            </span>
            {isDropdownOpen == 1 && (
              <ul key={1}>
                <li>{[store?.addLine1, store?.addLine2]}</li>
                <li>
                  <a
                    href="https://maps.app.goo.gl/jRSrFjHQhKNJGZUc6"
                    target="_blank"
                  >
                    Visit Store
                  </a>{" "}
                </li>
              </ul>
            )}
          </li>
          <li>
            <span
              onClick={() => {
                isDropdownOpen === 2
                  ? setIsDropdownOpen(null)
                  : setIsDropdownOpen(2);
              }}
            >
              <h4>CATEGORIES</h4>
              {isDropdownOpen == 2 ? <DownIcon /> : <DownIcon />}
            </span>
            {isDropdownOpen == 2 && (
              <ul className={styles.list_center} key={2} id={styles.cat}>
                {categories?.map((nav: any, index: any) => {
                  return (
                    <li key={index}>
                      <Link
                        aria-label="Category"
                        href={`products?category=${nav?.title}`}
                      >
                        {nav?.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
          <li>
            <span
              onClick={() => {
                isDropdownOpen === 3
                  ? setIsDropdownOpen(null)
                  : setIsDropdownOpen(3);
              }}
            >
              <h4>ABOUT US</h4>
              {isDropdownOpen == 3 ? <DownIcon /> : <DownIcon />}{" "}
            </span>
            {isDropdownOpen === 3 && (
              <ul className={styles.list_center} key={3}>
                <Link aria-label="know more about the brand" href={"#"}>
                  Know The Brand
                </Link>
                <li>
                  <Link aria-label="contact us" href={"/contact-us"}>
                    Contact Us
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <span
              onClick={() => {
                isDropdownOpen === 4
                  ? setIsDropdownOpen(null)
                  : setIsDropdownOpen(4);
              }}
            >
              <h4>POLICIES</h4>
              {isDropdownOpen == 4 ? <DownIcon /> : <DownIcon />}
            </span>
            {isDropdownOpen === 4 && (
              <ul className={styles.list_center} key={4}>
                <li>
                  <Link aria-label="policy pages" href={"/policies/shipping"}>
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="policy pages"
                    href={"/policies/cancellation"}
                  >
                    Cancellation policy
                  </Link>
                </li>
                <li>
                  <Link aria-label="policy pages" href={"/policies/terms"}>
                    Terms & conditions
                  </Link>
                </li>
                <li>
                  <Link aria-label="policy pages" href={"/policies/privacy"}>
                    Privacy policy
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default FooterSmall;
