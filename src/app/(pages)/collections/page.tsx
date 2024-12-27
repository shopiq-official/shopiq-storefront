import styles from "./collections.module.css";
import React from "react";
import Image from "next/image";

import Link from "next/link";
import { getCollections } from "@/api";
import { capitalize } from "@/lib/capitalize";
import { Collection } from "@/types";

async function Collections() {
  const collections = await getCollections();

  return (
    <>
      <div className={styles.main_container}>
        <h1>Collections</h1>
        <div className={styles.collection_cards}>
          {collections.map((val: Collection, ind: number) => {
            return (
              <>
                <Link
                  className={styles.cards}
                  href={"products?collectionName=" + val?.title}
                  aria-label="products collections"
                >
                  <Image
                    src={val?.media[0]?.mediaUrl}
                    alt="..."
                    height={1500}
                    width={1500}
                  />
                  <h3>{capitalize(val?.title ?? "")}</h3>
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Collections;
