"use client";
import React, { useEffect, useState } from "react";
import styles from "./cart.module.css";
import Cross from "@/assets/Icons/cross.svg";
import { useRouter } from "next/navigation";
import st from "./carts.module.css";
import toast, { Toaster } from "react-hot-toast";

import { calcPrice, calculateAdvancePricing } from "@/lib/calcPrice";
import { useSelector } from "react-redux";
import CartProductList from "./cartProductList";
import { getDiscountsApi, handlePaymentApi, placeOrder } from "@/api";
import { useKeyContext } from "@/providers/keyProvider";

type Props = {
  open: boolean;
  onClose: () => void;
};

let current_order = "";

const Cart = (props: Props) => {
const {
  key,
  isShippingChargeActive,
  shippingCharge,
}: any = useKeyContext();
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const cart = useSelector((state: any) => state.cart.cart);

  const emptyCart = () => {};

  useEffect(() => {
    getDiscounts();
  }, []);

  const PriceCalculator = () => {
    if (cart?.length == 0 || cart == null) {
      return 0;
    }

    const totalPrice = cart.reduce((accumulator: any, currentValue: any) => {
      if (currentValue?.productId?.advancePricing) {
         let temp: any = {};
         currentValue?.variant?.forEach((val: any) => {
           temp[val.options_name] = val.options_value;
         });
        const actualPrice = calculateAdvancePricing(currentValue.productId, temp);
        const subtotal = actualPrice * currentValue.quantity;
        return accumulator+ subtotal
      }
      else {
        
        const price = currentValue.productId.pricing.price;
  
        const subtotal = price * currentValue.quantity;
  
        return accumulator + subtotal;
      }
    }, 0);

    return totalPrice;
  };

  const getDiscounts = async () => {
    try {
      const res: any = await getDiscountsApi();

      setDiscounts(res.discounts);
    } catch (e) {
      setDiscounts([]);
    }
  };

  const handleBuyNow = () => {
    props.onClose();
    let total = 0;
    let igst = 0;

    cart.forEach((p: any) => {
      const data = p.productId;

      let sub_total: any = data?.advancePricing
        ? calcPrice(data?.advancePricingValues)
        : data.pricing.price;
      igst = data.pricing.igst;
      total += sub_total * p.quantity;
    });

    const common_payload = {
      products: cart.map((val: any) => ({
        productId: val.productId?._id,
        quantity: val.quantity,
        variant: val.variant,
      })),
      total,
      subTotal: total,
      tax: igst,
      orderStatus: false,
      paymentStatus: "unpaid",
      date: new Date(),
    };

    placeOrder(common_payload)
      .then((r) => {
        current_order = r.data.order2._id;
        setLoading(false);

        window.Retaino.CheckoutRetaino(
          cart?.map((val: any) => ({
            productId: val.productId?._id,
            title: val.productId?.title,
            price: val.productId?.pricing.price,
            quantity: val.quantity,
            image: process.env.NEXT_PUBLIC_IMAGE + val.mediaUrl,
            variants: val.variant.map((vall: any) => {
              return { key: vall.options_name, value: vall.options_value };
            }),
            category: val?.productId?.category,
          })),
          total,
          key,
          handlePayment,
          r.data.order2._id,
          process.env.NEXT_PUBLIC_IDENTIFIER,
          discounts,
          {
            isShippingChargeActive,
            shippingCharge,
          }
        );
      })
      .catch(() => {});
    emptyCart();
    return;
  };

  const handlePayment = (res: any) => {
    const data: any = {
      customerId: res.userId,
      modeOfPayment: res.payment_type === "cod" ? "cod" : "pg",
      paymentStatus: res.payment_type === "cod" ? "unpaid" : "paid",
      orderStatus: true,
      billingAddress: res.billing_address,
      shippingAddress: res.shipping_address,
    };

    if (res?.couponId) {
      data.discount = [
        { couponId: res?.couponId, totalDiscount: res?.totalDiscount },
      ];
    }

    handlePaymentApi(data, current_order, res.token)
      .then((ress: any) => {
        res?.when_order_is_placed(() => {
          router.push("/account");
        });
      })
      .catch((err: any) => {});
  };


  return (
    <>
      <Toaster />
      <div
        className={`${styles.container} ${props.open && styles.container_open}`}
      >
        {cart?.length > 0 || cart === null ? (
          <div className={st.cart_container}>
            <div className={st.head}>
              <h1>Shopping Cart</h1>
              <span className={styles.cross} onClick={props.onClose}>
                <span className={styles.inner_cross}>
                  <Cross />
                </span>
              </span>
            </div>
            <ul
              className={styles.card_container}
              style={{ overflowY: "auto" }}
              // key={index}
            >
              {cart?.map((item: any, index: any) => {
                return (
                  <>
                    <CartProductList item={item} index={index} />
                  </>
                );
              })}
            </ul>

            <div className={st.checkout_section}>
              <span>
                <h5>SUBTOTAL</h5> <h5>Rs. {PriceCalculator()}</h5>
              </span>
              <h6>Shipping,taxes and discount codes calculated at checkout</h6>
              {loading ? (
                <div className={st.loading_btn}>
                  <span></span>
                </div>
              ) : (
                <button onClick={handleBuyNow}>Proceed to Checkout</button>
              )}
            </div>
          </div>
        ) : (
          <>
            <span
              className={styles.cross}
              onClick={() => {
                props.onClose();
              }}
              style={{
                position: "absolute",
                top: "15px",
                right: "20px",
                zIndex: "10000",
              }}
            >
              <span className={styles.inner_cross}>
                <Cross />
              </span>
            </span>
            <div className={styles.empty_container}>
              <h4>Your cart is empty</h4>
              <p
                onClick={() => {
                  router.push("/products");
                  props.onClose();
                }}
              >
                back to shopping
              </p>
            </div>
          </>
        )}
      </div>
      {props.open && (
        <div className={styles.close} onClick={props.onClose}></div>
      )}
    </>
  );
};

export default Cart;
