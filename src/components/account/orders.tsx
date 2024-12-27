"use client";

import React, { useEffect, useState } from "react";
import styles from "./orders.module.css";
import Image from "next/image";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { checkProductStatus } from "@/lib/checkProductStatus";
import { capitalize } from "@/lib/capitalize";
import { formatDate } from "@/lib/formateDate";
import ConfirmCancel from "../confirmCancel/confirmCancel";
import { Order, Product } from "@/types";

const Orders = () => {
  // State variables for managing order data and loading states
  const [cancelLoader, setCancelLoader] = useState<boolean>(false);
  const [confirmCancel, setConfirmCancel] = useState<boolean>(false);
  const [productid, setproductId] = useState<Order>();
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Destructure values from checkProductStatus based on productid
  const { btn1value, btn2value, toastvalue, payload } =
    checkProductStatus(productid);

  useEffect(() => {
    getOrder(); // Fetch orders on component mount
  }, []);

  const getOrder = () => {
    // Fetch orders from the API
    axios({
      url: `https://api.shopiq.app/api/orders/getordersbyuserid?userId=${window?.Retaino?.getUserId()}&identifier=${
        process.env.NEXT_PUBLIC_IDENTIFIER
      }`,
      method: "GET",
    })
      .then((res) => {
        setData(res.data.orders); // Set order data
        setLoading(false); // Update loading state
      })
      .catch((error) => {
        setLoading(false); // Update loading state on error
      });
  };

  let count = 0;

  // Count the number of orders with a status
  data?.forEach((element: Order) => {
    if (element.orderStatus) {
      count++;
    }
  });

  if (loading) {
    // Loader while fetching data
    return (
      <h3
        style={{ textAlign: "center", fontSize: "1.4rem", marginBlock: "5vh" }}
      >
        <span className="loader"></span>
      </h3>
    );
  }

  if (data === undefined || count == 0) {
    // Message when no orders are found
    return (
      <h3
        style={{ textAlign: "center", fontSize: "1.4rem", marginBlock: "5vh" }}
      >
        No Orders Found
      </h3>
    );
  }

  const UpdateOrderStatus = () => {
    // Function to update the order status
    return new Promise((resolve, reject) => {
      axios({
        url: `https://api.shopiq.app/api/orders/product/user/${
          productid?._id || ""
        }`,
        method: "PATCH",
        data: checkProductStatus(productid).payload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "RETAINO_ACCESS_TOKEN"
          )}`,
        },
      })
        .then((res) => {
          resolve(true); // Resolve promise on success
          getOrder(); // Refresh orders
          toast.success(toastvalue); // Show success toast
          setConfirmCancel(false); // Close confirmation modal
        })
        .catch((err: Error) => {
          reject(true); // Reject promise on error
          setConfirmCancel(false); // Close confirmation modal
          toast.error("An Error Occured"); // Show error toast
        });
    });
  };

  const handelOpenConfirmModal = (product: Order) => {
    // Open confirmation modal for canceling an order
    setConfirmCancel(true);
    setproductId(product);
  };

  return (
    <>
      <ul className={styles.orders}>
        {data
          .filter((value: Order) => value.orderStatus === true) // Filter active orders
          ?.map((val: Order, index: number) => {
            return (
              <li key={index}>
                <div className={styles.main_head}>
                  <div className={styles.id_and_date}>
                    <h5 className={styles.order_id}> #{val.orderRefId}</h5>
                    <h4>{formatDate(String(val?.date))}</h4>
                  </div>
                  <div className={styles.price_and_actions}>
                    {val.returnStatus == "requested" ? (
                      // Button for return requested status
                      <button
                        style={{
                          color: "red",
                          border: "1px solid red",
                          cursor: "not-allowed",
                        }}
                      >
                        Return Requested
                      </button>
                    ) : val.refundStatus == "requested" ? (
                      // Button for refund requested status
                      <button
                        style={{
                          color: "red",
                          border: "1px solid red",
                          cursor: "not-allowed",
                        }}
                      >
                        Return Requested
                      </button>
                    ) : val.fulfilmentStatus == "cancelled" ? (
                      // Button for cancelled status
                      <button
                        style={{
                          color: "red",
                          border: "1px solid red",
                          cursor: "not-allowed",
                        }}
                      >
                        Cancelled
                      </button>
                    ) : val.fulfilmentStatus == "completed" ? (
                      <></> // No action for completed orders
                    ) : (
                      // Button to cancel order
                      <button
                        onClick={() => handelOpenConfirmModal(val)}
                        style={{ cursor: "pointer" }}
                      >
                        {cancelLoader ? (
                          <span className="btn_loader"></span>
                        ) : (
                          <p>Cancel Order</p>
                        )}
                      </button>
                    )}
                  </div>
                </div>
                <ul className={styles.order_products}>
                  {val?.products?.map(
                    (p_data: Record<string, any>, index: number) => {
                      return (
                        <li key={index}>
                          <div className={styles.about_product}>
                            {/* product image */}
                            <div className={styles.product_img}>
                              <Image
                                src={
                                  p_data?.mediaUrl ||
                                  p_data.productId?.mediaUrl[0]
                                }
                                alt="product Image ..."
                                height={1500}
                                width={1500}
                              />
                            </div>

                            {/* product details */}
                            <div className={styles.product_details}>
                              <span
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <h5> #{val.orderRefId}</h5>
                                {capitalize(p_data.productId?.category)}
                              </span>
                              <h3>{capitalize(p_data.productId?.title)}</h3>
                              <ul className={styles.variant_details}>
                                <li>Quantity : {p_data.quantity}</li>
                                <li>
                                  Price : ₹{p_data.productId?.pricing.price}
                                </li>
                                <li>
                                  Payment :{" "}
                                  {val.modeOfPayment === "cod"
                                    ? "COD"
                                    : "Online"}
                                </li>
                                <li>
                                  Order Status :{" "}
                                  {capitalize(val?.fulfilmentStatus ?? "")}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>
                      );
                    }
                  )}
                </ul>
              </li>
            );
          })}
        <Toaster />
      </ul>
      {confirmCancel && (
        <div
          style={{
            position: "fixed",
            top: "0px",
            left: "0px",
            height: "100vh",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "grid",
            placeItems: "center",
          }}
          onClick={() => setConfirmCancel(false)}
        >
          <ConfirmCancel
            productId={productid}
            setConfirmCancel={setConfirmCancel}
            UpdateOrderStatus={UpdateOrderStatus}
            getOrder={() => getOrder()}
          />
        </div>
      )}
    </>
  );
};

export default Orders;
