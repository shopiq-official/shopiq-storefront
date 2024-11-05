// import { social_media_links } from "@/data/footer";
import { FOOTER_EMAIL, social_media_links } from "@/lib/constants";

import Image from "next/image";
import styles from "./footer.module.css";
import logo from "../../../../public/images/logo.png";

import Link from "next/link";

import { getAllStores, getCategories, getCompliance } from "@/api";
import { Suspense } from "react";
import { ClientFooter } from "./clientFooter";
// import { ClientFooter } from "./footerClientPart";

const Footer = async (props: any) => {
  const categories = await getCategories();

  const stores = await getAllStores();

  const addLine1 = stores?.addressLine1;
  const addLine2 = stores?.addressLine2;
  const pin = stores?.pincode;
  const city = stores?.city;
  const state = stores?.state;
  const country = stores?.country;

  const compliance: any = await getCompliance();
  const complianceList = compliance.compliances;

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <ul className={styles.footer_content}>
          <li className={styles.icon_section}>
            <Image src={logo} alt="" />
            <div className={styles.below_logo}>
              <div className={styles.store}>
                <h5>VISIT STORE</h5>
                <p>
                  {addLine1}
                  <br />
                  {addLine2}
                  <br />
                  {city}, {state}, {country} - {pin}
                </p>
                <Link
                  aria-label="get directions"
                  href="https://maps.app.goo.gl/jRSrFjHQhKNJGZUc6"
                  target="_blank"
                >
                  Get Direction
                </Link>
              </div>

              <a href={`mailto:${FOOTER_EMAIL}`}>{FOOTER_EMAIL}</a>
              <div className={styles.social_container}>
                {social_media_links.map((val, index) => {
                  return (
                    <Link aria-label="Social media" key={index} href={val.link}>
                      <val.icon />
                    </Link>
                  );
                })}
              </div>
            </div>
          </li>
          <li>
            <h4>Categories</h4>

            <ul className={styles.list_center} id={styles.cat}>
              {categories?.slice(0, 5)?.map((nav: any, index: any) => {
                return (
                  <li key={index}>
                    <Link
                      aria-label="product category"
                      href={`products?category=${nav?.title}`}
                    >
                      {nav?.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>
            <h4 style={{ visibility: "hidden" }}>Second </h4>
            <ul className={styles.list_center} id={styles.cat}>
              {categories?.slice(5, 10)?.map((nav: any, index: any) => {
                return (
                  <li key={index}>
                    <Link
                      aria-label="product category"
                      href={`products?category=${nav?.title}`}
                    >
                      {nav?.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>
            <h4>ABOUT US</h4>
            <ul className={styles.list_center}>
              <Link aria-label="Know more about the brand" href={"#"}>
                Know The Brand
              </Link>
              <li>
                <Link aria-label="Contact us for support" href={"/contact-us"}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <h4>POLICIES</h4>
            <ul className={styles.list_center}>
              <li>
                <Link aria-label="shipping policy" href={"/policies/shipping"}>
                  Shipping Policy
                </Link>
              </li>
              {/* <li>
                <Link href={"/policies/cancellation"}>Cancellation policy</Link>
              </li> */}
              <li>
                <Link
                  aria-label="website terms and policy"
                  href={"/policies/terms"}
                >
                  Terms & conditions
                </Link>
              </li>
              {/* <li>
                <Link href={"/policies/privacy"}>Privacy policy</Link>
              </li> */}
              <li>
                <Link
                  aria-label="return policy"
                  href={"/policies/return-policy"}
                >
                  Return policy
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <Suspense fallback={<p>Loading......</p>}>
        <ClientFooter
          categories={categories}
          store={{ addLine1, addLine2, pin, city, state, country }}
        />
      </Suspense>
    </div>
  );
};

export default Footer;
