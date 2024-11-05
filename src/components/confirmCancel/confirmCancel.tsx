// Import necessary libraries and styles
import React, { useEffect } from "react";
import styles from "./confirmCancel.module.css";
import { checkProductStatus } from "@/lib/checkProductStatus";

// Define the ConfirmCancel component
const ConfirmCancel = ({
  productId, // ID of the product to check status
  setConfirmCancel, // Function to set the confirmation state
  UpdateOrderStatus, // Function to update the order status
  getOrder, // Function to retrieve the order details
}: {
  productId: any;
  setConfirmCancel: any;
  UpdateOrderStatus: any;
  getOrder: any;
}) => {
  // Get button values and toast message based on product status
  const { btn1value, btn2value, toastvalue } = checkProductStatus(productId);

  return (
    <>
      <div className={styles.main_div} onClick={(e) => e.stopPropagation()}>
        <h2>Are you sure about cancelling your order? </h2>
        <div className={styles.btn_section}>
          {/* Button to confirm order cancellation */}
          <button onClick={() => UpdateOrderStatus()}>{btn1value}</button>
          {/* Button to cancel the confirmation */}
          <button onClick={() => setConfirmCancel()}>{btn2value}</button>
        </div>
      </div>
    </>
  );
};

// Export the ConfirmCancel component
export default ConfirmCancel;
