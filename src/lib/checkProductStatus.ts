import { Order } from "@/types";

export const checkProductStatus = (product: Order) => {
  if (product === undefined) {
    return {
      btn1value: " ",
      btn2value: "",
      toastvalue: "",
    };
  }

  const { modeOfPayment, paymentStatus, fulfilmentStatus } = product;

  if (
    fulfilmentStatus !== "cancelled" &&
    modeOfPayment == "cod" &&
    paymentStatus !== "paid"
  ) {
    return {
      btn1value: " Yes, Cancel my order.",
      btn2value: "No, Don’t cancel my order",
      toastvalue: "Your order has been cancelled.",
      payload: {
        fulfilmentStatus: "cancelled",
      },
    };
  } else if (fulfilmentStatus == "completed" && paymentStatus == "paid") {
    return {
      btn1value: " Return and Initiate Refund.",
      btn2value: "No, Don’t cancel my order",
      toastvalue: "We have initiated the refund and return",
      payload: {
        returnStatus: "requested",
        refundStatus: "requested",
        fulfilmentStatus: "cancelled",
      },
    };
  } else if (
    (fulfilmentStatus == "packaging" ||
      fulfilmentStatus == "shipped" ||
      fulfilmentStatus == "outfordelivery") &&
    paymentStatus == "paid"
  ) {
    return {
      btn1value: " Cancel and Initiate Refund.",
      btn2value: "No, Don’t cancel my order",
      toastvalue: " We have initiated refund for your order.",
      payload: {
        returnStatus: "requested",
        refundStatus: "requested",
        fulfilmentStatus: "cancelled",
      },
    };
  } else {
    return {
      btn1value: " Cancel and Initiate Refund.",
      btn2value: "No, Don’t cancel my order",
      toastvalue: " We have initiated refund for your order.",
      payload: {
        returnStatus: "requested",
        refundStatus: "requested",
        fulfilmentStatus: "cancelled",
      },
    };
  }
};
