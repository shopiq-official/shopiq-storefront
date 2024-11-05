import React, { useEffect } from "react";
import styles from "./confirmCancel.module.css";
import { checkProductStatus } from "@/lib/checkProductStatus";

const ConfirmCancel = ({
  productId,
  setConfirmCancel,
  UpdateOrderStatus,
  getOrder,
}: {
  productId: any;
  setConfirmCancel: any;
  UpdateOrderStatus: any;
  getOrder: any;
}) => {
  const { btn1value, btn2value, toastvalue } = checkProductStatus(productId);

  return (
    <>
      <div className={styles.main_div} onClick={(e) => e.stopPropagation()}>
        <h2>Are you sure about cancelling your order? </h2>
        <div className={styles.btn_section}>
          <button onClick={() => UpdateOrderStatus()}>{btn1value}</button>
          <button onClick={() => setConfirmCancel()}>{btn2value}</button>
        </div>
      </div>
    </>
  );
};

export default ConfirmCancel;
