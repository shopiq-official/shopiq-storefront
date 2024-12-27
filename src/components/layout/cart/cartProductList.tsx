"use client";

import styles from "./cartProductList.module.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Delete from "@/assets/Icons/trash.svg";
import Add from "@/assets/Icons/add.svg";
import Minus from "@/assets/Icons/minus.svg";
import { useDispatch, useSelector } from "react-redux";
import { capitalize } from "@/lib/capitalize";
import { numToString } from "@/lib/numToString";
import { deleteCartItem, updateCart } from "@/redux/cart.slice";
import { calculateAdvancePricing } from "@/lib/calcPrice";
import { CartProduct, CartProductVariant } from "@/types";

const CartProductList = ({
  item,
  index,
}: {
  item: CartProduct;
  index: number;
}) => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  // console.log(item)

  useEffect(() => {
    let temp: Record<string, string[]> = {};
    item?.variant?.forEach((val: CartProductVariant) => {
      if (val?.options_name && val?.options_value) {
        temp[val?.options_name] = val?.options_value;
      }
    });
    //  console.log(temp)
    const actualPrice = calculateAdvancePricing(item.productId, temp);
    setPrice(actualPrice);
    // console.log(actualPrice)
  }, [item]);

  return (
    <li className={styles.product} key={index}>
      <div className={styles.left}>
        <div className={styles.img}>
          <Image
            src={`${item.mediaUrl}`}
            alt={item?.productId?.title ?? ""}
            fill={true}
          />
        </div>
        <div className={styles.about_product}>
          <p className={styles.product_category}>{item.productId.category}</p>
          <h2>{capitalize(item?.productId?.title ?? "")}</h2>
          {item?.variant?.length !== 0 && (
            <ul className={styles.variants}>
              {item?.variant?.map((val: CartProductVariant, index: number) => {
                return (
                  <li key={index}>
                    {val.options_name == "custom-1"
                      ? "Design"
                      : val.options_name == "custom-2"
                      ? "Fit"
                      : val.options_name}{" "}
                    :{" "}
                    {val.options_name == "color" &&
                    Array.isArray(val.options_value)
                      ? val?.options_value[0]?.split(":")[0]
                      : val.options_value}
                  </li>
                );
              })}
            </ul>
          )}

          <div className={styles.quantity_container}>
            <div
              className={`${styles.qc_decrease}`}
              onClick={() => {
                dispatch<any>(
                  updateCart({
                    index,
                    type: "decrease",
                    id: item.productId._id,
                  })
                );
              }}
            >
              <Minus />
            </div>
            <div className={styles.qc_value}>
              {numToString(item.quantity, 2)}
            </div>
            <div
              className={styles.qc_increase}
              onClick={() => {
                dispatch<any>(
                  updateCart({
                    index,
                    type: "increase",
                    id: item.productId._id,
                  })
                );
              }}
            >
              <Add />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <h2>₹{price * item.quantity}</h2>

        <div className="custom-tooltip">
          <span className="tooltip-text">
            <Delete
              onClick={() => {
                //   deleteFromCart({ id: item.productId._id, index });
                dispatch<any>(
                  deleteCartItem({ id: item.productId._id, index })
                );
              }}
            />
          </span>
          <span className="tooltip-content">Delete</span>
        </div>
      </div>
    </li>
  );
};

export default CartProductList;
