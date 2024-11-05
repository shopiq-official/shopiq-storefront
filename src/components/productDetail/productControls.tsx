"use client";

import { useEffect, useState } from "react";
import styles from "./productControls.module.css";
import { useRouter } from "next/navigation";
import Minus from "@/assets/Icons/minus.svg";
import Add from "@/assets/Icons/add.svg";
import { numToString } from "@/lib/numToString";
import toast from "react-hot-toast";
import {calculateAdvancePricing } from "@/lib/calcPrice";
import { handlePaymentApi, placeOrder } from "@/api";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cart.slice";
import { useKeyContext } from "@/providers/keyProvider";
import Quote from "../QuoteModal/Quote";
import { CheckisOutOfStock, CheckisQuantityAvailable } from "@/lib/checkOutOfStock";

let current_order = "";

// 66557ba0aa0843531d8c7518

const ProductControls = ({ data, discounts }: any) => {
  const router = useRouter();
  const [variants, setVariants]: any = useState({});
  const [selectedvariant, setSelectedVariant]: any = useState({});
  const [quantity, setQuantity] = useState(1);
  const [actualPrice, setActualPrice] = useState<any>(0);
  const [showQuote, setShowQuote] = useState(false);
  const [loading, setLoading] = useState(false);
  const cart = useSelector((state: any) => state.cart.cart);
  const { key, isShippingChargeActive, shippingCharge }: any = useKeyContext();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

  const dispatch = useDispatch();

  
  useEffect(() => {
    for (let i = 0; i < data.variant.length; i++) {
      const variant = data.variant[i];
      // console.log(variant);
      
      setVariants((prevVariants: any) => {
        // Create a copy of the previous state
        const newVariants = { ...prevVariants };

        // Check if the variant name already exists in state
        if (newVariants.hasOwnProperty(variant.options_name)) {
          // Check if the value already exists in the array
        //  console.log(newVariants)
          if (
            !newVariants[variant.options_name].some(
              (i: any) => variant.options_value[0]==i
            )
          ) {
            // If it doesn't exist, add the value to the array
            // newVariants[variant.options_name].push(variant.options_value[0]);

            variant.options_value.forEach(
              (val: any) => (newVariants[variant.options_name]?.push(val))
            );
          }
        } else {
          // console.log(variant?.options_value)
          // If the variant name doesn't exist, create a new array with the options value
           let temp: any = [];
          variant.options_value.forEach(
            (val: any) => {
             
              temp.push(val);
              
              
            }
          );
          newVariants[variant.options_name] = temp;
          // console.log(newVariants)
          
        }
      //  console.log(newVariants)
        return newVariants;
      });
    }
  }, []);

  const handleColorVariant = (color: any) => {
    let selectedColor = data.variant.filter(
      (variant: any) => variant.options_value[0] === color
    );
    if (data.advancePricing) {
      // selectedvariant['color'] = color;
      setSelectedVariant({...selectedvariant,['color']:color})
    }
    if (!data?.advancePricing) {
   
      if (selectedColor) router.push("/products/" + selectedColor[0].slug);
 }
  };

 

  const handleShowQuote = () => {
    setShowQuote(true);
  };

  const handleBuyNow = () => {
    let sub_total: any = data?.advancePricing
      ? calculateAdvancePricing(data,selectedvariant)
      : data.pricing.price;
// console.log(sub_total)
    let igst = data.pricing.igst;

    let tax: any = igst;

    let productId = data._id;

    if (Object.keys(selectedvariant).length !== 0 && selectedvariant?.size) {
      const dv = data.variant;

      for (let i = 0; i < dv.length; i++) {
        if (
          dv[i].options_name === "size" &&
          dv[i].options_value.includes(selectedvariant?.size)
        ) {
          productId = dv[i].variantProductId._id;
          break;
        }
      }
    }

    let common_payload: any = {
      products: [
        {
          productId: productId,
          quantity,
          mediaUrl: data.mediaUrl[0],
          variant: Object.keys(selectedvariant).map((val) => ({
            options_name: val,
            options_value: [selectedvariant[val]],
          })),
        },
      ],
      total: sub_total * quantity,
      subTotal: sub_total * quantity,
      tax: tax,
      orderStatus: false,
      paymentStatus: "unpaid",
      date: new Date(),
    };

    placeOrder(common_payload)
      .then((res: any) => {
        const r = res;

        current_order = res.data.order2._id;

        setLoading(false);

        window?.Retaino?.CheckoutRetaino(
          [
            {
              productId: productId,
              title: data?.title,
              price: data?.pricing.price,
              quantity,
              image: process.env.NEXT_PUBLIC_IMAGE + data.mediaUrl[0],
              variants: Object.keys(selectedvariant).map((val) => ({
                key: val,
                value: selectedvariant[val],
              })),
              category: data?.category,
            },
          ],
          sub_total * quantity,
          key,
          handlePayment,
          res.data.order2._id,
          process.env.NEXT_PUBLIC_IDENTIFIER,
          discounts,
          {
            isShippingChargeActive,
            shippingCharge,
          }
        );
      })
      .catch((err: any) => {
        toast.error("Something went wrong.");
        setLoading(false);
      });

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
  // console.log(variants)
  // console.log(variants)
  // console.log(selectedvariant)
  useEffect(() => {
    if (data?.advancePricing) {
      // console.log(selectedvariant);
      let vart: any = {};
      Object.keys(variants)?.forEach((val: any) => {
        // console.log(val)

        vart = { ...vart, [val]: variants[val][0] };
        // console.log(vart);
        // selectedvariant
        setSelectedVariant({ ...vart });
      });
      // console.log(vart)
    }
  }, [data?.advancePricing, variants]);


 
  useEffect(() => {
   
  const amount= calculateAdvancePricing(data,selectedvariant)
  setActualPrice(amount)
  }, [selectedvariant])

   const isOutOfStock: any = CheckisOutOfStock(data?.inventory, quantity);
   const isQtyAvailable: any = CheckisQuantityAvailable(
     data?.inventory,
     quantity
   );
  
  
  return (
    <>
      <div className={styles.variants_main}>
        <div className={styles.variants_container}>
          {Object.keys(variants).map((val: any, index: any) => {
            return (
              <>
                {val == "color" ? (
                  <>
                    {variants.color[0] !== undefined && (
                      <div
                        className={styles.colors}
                        style={{ alignItems: "center" }}
                        key={index}
                      >
                        <p
                          style={{
                            textTransform: "capitalize",
                            color: "grey",
                            // border: "1px solid red",
                            minWidth: "55px",
                          }}
                        >
                          {val} :
                        </p>

                        {variants[val].map((color: any, index: any) => {
                          return (
                            <div
                              key={index}
                              className={styles.color}
                              style={{
                                // padding: "2px",
                                background: color?.split(":")[1],
                                border:
                                  selectedvariant["color"] === color
                                    ? "2px solid white"
                                    : "",
                                outline:
                                  selectedvariant["color"] === color
                                    ? "2px solid var(--primary)"
                                    : "1px solid var(--primary)",
                              }}
                              onClick={() => handleColorVariant(color)}
                            ></div>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : val == "custom-1" || val == "custom-2" ? (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                    className={styles.sizes}
                  >
                    <p
                      style={{
                        textTransform: "capitalize",
                        color: "grey",
                        // border: "1px solid red",
                        minWidth: "55px",
                      }}
                    >
                      {val == "custom-1" ? "Design" : "Fit"} :
                    </p>
                    <div className={styles.variant} key={index}>
                      {variants[val].map((value: any, ind: any) => {
                        return (
                          <div
                            key={ind}
                            style={{
                              cursor: "pointer",
                              backgroundColor:
                                selectedvariant[val] === value
                                  ? "var(--primary)"
                                  : "",
                              color:
                                selectedvariant[val] === value
                                  ? "var(--neutral)"
                                  : "",
                            }}
                            onClick={() =>
                              setSelectedVariant({
                                ...selectedvariant,
                                [val]: value,
                              })
                            }
                          >
                            {value}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                    className={styles.sizes}
                  >
                    <p
                      style={{
                        textTransform: "capitalize",
                        color: "grey",
                        minWidth: "55px",
                      }}
                    >
                      {val} :
                    </p>
                    <div className={styles.variant} key={index}>
                      {variants[val].map((value: any, ind: any) => {
                        return (
                          <div
                            key={ind}
                            style={{
                              cursor: "pointer",
                              backgroundColor:
                                selectedvariant["size"] === value
                                  ? "var(--primary)"
                                  : "",
                              color:
                                selectedvariant["size"] === value
                                  ? "var(--neutral)"
                                  : "",
                            }}
                            onClick={() =>
                              setSelectedVariant({
                                ...selectedvariant,
                                size: value,
                              })
                            }
                          >
                            {value}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
      <div className={styles.actions}>
        {!isOutOfStock && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <p style={{ color: "grey" }}>Quantity :</p>
            <div className={styles.quantity_container}>
              <div
                className={`${styles.qc_decrease} ${
                  quantity === 1 && styles.qc_fade
                }`}
                onClick={() => {
                  if (quantity > 1) setQuantity((prev) => prev - 1);
                }}
              >
                <Minus />
              </div>
              <div className={styles.qc_value}>{numToString(quantity, 2)}</div>
              <div
                className={styles.qc_increase}
                onClick={() =>
                  setQuantity((prev) =>
                    isQtyAvailable ? prev + 1 : prev
                  )
                }
              >
                <Add />
              </div>
            </div>
          </div>
        )}
        <div className={styles.pricing}>
          <span>
            {!!actualPrice && <h2>₹{actualPrice}</h2>}
            {!!data?.pricing?.comparePrice && (
              <h4>₹{data.pricing?.comparePrice}</h4>
            )}
          </span>
          {data?.pricing?.igst > 0 && (
            <h5>Price inclusive of {data?.pricing?.igst}% GST. </h5>
          )}
          {isOutOfStock && (
            <p
              style={{
                color: "red",
                width: "fit-content",
                marginTop: "10px",
              }}
            >
              This Product is Currently Out of Stock.
            </p>
          )}
        </div>
        <div className={styles.main_actions}>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
            className={styles.main_btn_group}
          >
            <button
              className={styles.buy_btn}
              onClick={() => {
                if (!selectedvariant?.size && variants?.size) {
                  toast.error("Select any size variant.");
                } else {
                  handleBuyNow();
                }
              }}
              style={{
                cursor: isOutOfStock ? "not-allowed" : "pointer",
                background: isOutOfStock
                  ? "var(--secondary)"
                  : "var(--primary)",
              }}
              disabled={isOutOfStock}
            >
              BUY NOW
            </button>
            <button
              onClick={() => {
                if (!selectedvariant?.size && variants?.size) {
                  toast.error("Please select any Size");
                  return;
                } else {
                  dispatch<any>(
                    addToCart({ data, variants: selectedvariant, quantity })
                  );
                }
              }}
              className={styles.cart_btn}
              style={{
                cursor: isOutOfStock ? "not-allowed" : "pointer",
                color: isOutOfStock ? "var(--secondary)" : "var(--primary)",
              }}
              disabled={isOutOfStock}
            >
              {"ADD TO CART"}
            </button>

         

            {data.requestQuote && (
              <h5
                className={styles.request_btn}
                onClick={() => handleShowQuote()}
              >
                Request Quote
              </h5>
            )}
          </span>
        </div>
        <div className={styles.description}>
          <h3>description</h3>
          <div
            className={`${styles.text} ${
              isExpanded ? styles.expanded : styles.collapsed
            }`}
          >
            <p
              dangerouslySetInnerHTML={{
                __html: data?.description?.replace(/&nbsp;/g, " "),
              }}
            ></p>
          </div>
          <button onClick={toggleExpand} className={styles.toggleButton}>
            {isExpanded ? "See Less ▲" : "See More ▼"}
          </button>
        </div>
      </div>
      {showQuote && <Quote product={data?.title} close={setShowQuote} />}
    </>
  );
};

export default ProductControls;
