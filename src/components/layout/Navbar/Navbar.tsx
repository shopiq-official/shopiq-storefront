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
import { Category, Discount, Product } from "@/types";

export const Navbar = async () => {
  const categories: Record<string, string | number | string[]> =
    await getCategoriesOfType();
  const bestSellers = (await getBestSeller()) as unknown as { data: Product[] };
  const cat: Category = await getCategories();
  const bannerDiscounts = (await getDiscountsApi()) as unknown as {
    discounts: Discount[];
  };

  let banners = bannerDiscounts.discounts?.filter(
    (val: Discount) => val.visibility && val.visibility.banner
  );

  return (
    <>
      {banners?.length > 0 && <Banners data={banners} />}
      <div className={styles.container}>
        <div className={styles.nav_second_row}>
          <div className={styles.logo_container}>
            <Link href="/" aria-label="Logo">
              <Image src="" width="200" height="500" alt="add your logo here" />
            </Link>
          </div>
          <div className={styles.navmenu}>
            <ul>
              <li>
                <Link aria-label="Shop More products" href="/products">
                  Shop
                </Link>
              </li>

              <li>
                <Link aria-label="Collections page" href="/collections">
                  Collections
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
