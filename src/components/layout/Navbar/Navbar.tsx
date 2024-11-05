import Link from "next/link";
import styles from "./navbar.module.css";
import Image from "next/image";
import { NavDropDown } from "./dropDown";
import {
  getBestSeller,
  getCategories,
  getCategoriesOfType,
  getDiscountsApi,
} from "@/api";
import { IconsPart } from "./IconsPart";
import { Suspense } from "react";
import { navSequence } from "@/lib/navSequence";
import Banners from "./banner";

export const Navbar = async () => {
  const categories: any = await getCategoriesOfType();
  const bestSellers: any = await getBestSeller();
  const cat = await getCategories();
  const bannerDiscounts: any = await getDiscountsApi();

  let banners = bannerDiscounts.discounts.filter(
    (val: any) => val.visibility.banner
  );

  return (
    <>
      <Banners data={banners} />
      <div className={styles.container}>
        <div className={styles.nav_second_row}>
          <div className={styles.logo_container}>
            <Link href="/" aria-label="Logo">
              <Image
                src="/images/logo.webp"
                width="200"
                height="500"
                alt="logo"
              />
            </Link>
          </div>
          <div className={styles.navmenu}>
            <ul>
              <li>
                <Link aria-label="Shop More products" href="/products">
                  Shop
                </Link>
              </li>
              {navSequence(Object.keys(categories)).map(
                (cate: any, index: number) => {
                  return (
                    <NavDropDown
                      title={cate}
                      categories={categories[cate]}
                      key={index}
                    />
                  );
                }
              )}
              <li>
                <Link aria-label="Collections page" href="/collections">
                  Collections
                </Link>
              </li>
              <li>
                <Link aria-label="videos" href="/videos">
                  Product Videos
                </Link>
              </li>
              <li>
                <Link aria-label="Blogs page" href="/blogs">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>
          <Suspense fallback={<ul className={styles.icons}></ul>}>
            <IconsPart
              cat={cat}
              bs={bestSellers?.data || []}
              data={categories}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
};
