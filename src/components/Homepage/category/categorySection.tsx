import React, { Suspense } from "react";
import styles from "./categorySection.module.css";
import { getCategories } from "@/api";
import Link from "next/link";
import Image from "next/image";
import { capitalize } from "@/lib/capitalize";
import CategoryCarousel from "./categoryCarousel";

const CategorySection = async () => {
  const category = await getCategories();

  console.log(category);
  return (
    <div className={styles.categories_div}>
      <div className={styles.category_head}>
        <h1>Shop By Categories</h1>
      </div>
      <div className={styles.categories_main}>
        {category?.map((val: any, ind: any) => {
          return (
            <Link key={ind} href={"/" + val.title} className={styles.category}>
              {!!val?.media?.length && (
                <Image
                  src={val.media[0].mediaUrl || "/placeholder.jpg"}
                  width={1500}
                  height={1500}
                  alt="not found"
                />
              )}
              <h4>{capitalize(val?.title)}</h4>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySection;
