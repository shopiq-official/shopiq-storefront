"use client";
import { usePathname } from "next/navigation";

import styles from "./footer.module.css";
import FooterSmall from "./footerSmall";

export const ClientFooter = ({ categories, store }: any) => {
  const pathname = usePathname();
  const website = process.env.NEXT_PUBLIC_WEBSITE_URL;

  return (
    <>
      {pathname === "/" && (
        <>
          <div className={styles.smallfooter_main}>
            <FooterSmall categories={categories} store={store} />
          </div>
        </>
      )}

      <div className={styles.bottom_stripp}>
        <div>
          Copyright © WEBSITE_NAME 2024 All rights reserved | Powered by{" "}
          <a
            href={`https://www.shopiq.app/?utm_source=${website}&utm_medium=footer&utm_campaign=clientclick`}
            target="_blank"
          >
            ShopIQ
          </a>
          .
        </div>
      </div>
    </>
  );
};
