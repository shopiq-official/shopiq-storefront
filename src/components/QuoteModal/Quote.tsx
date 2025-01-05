"use client";

import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Quote.module.css";
import { RxCross2 } from "react-icons/rx";
import api, { submitContact } from "@/api";
import toast from "react-hot-toast";
import { Product } from "@/types";

interface QuoteProps {
  product?: string;

  close: React.Dispatch<React.SetStateAction<boolean>>;
}

const Quote = ({ product, close }: QuoteProps) => {
  // console.log(product);
  const [contactdata, setContactData] = useState<any>({
    identifier: "YOUR_IDENTIFIER",
    firstName: "",
    lastName: "",
    personalEmail: "",
    mobileNumber: "",
    product: product,
    message: "Request Quote",
    consent: {
      agree: "true",
      date: new Date(),
    },
    typeName: "deals",
    userDeviceDetails: JSON.parse(
      localStorage.getItem("userDeviceDetails") || "{}"
    ),
    createdAt: new Date(),
    campaign: JSON.parse(localStorage.getItem("campaign") || "{}"),
  });
  const sendContact = async () => {
    try {
      const res = await submitContact(contactdata);
      // console.log(res);
      toast.success("Contact Saved");
      close(false);
    } catch (error) {
      console.error(error);
      toast.error("Error Occured");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name == "date") {
      setContactData({
        ...contactdata,
        consent: { ...contactdata.consent, date: value },
      });
    } else {
      // console.log(name, value);
      setContactData({ ...contactdata, [name]: value });
    }
  };
  function disablePastDates() {
    var today: Date | string = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    // @ts-ignore
    document?.getElementById("myDate").setAttribute("min", today);
  }
  // console.log(contactdata);
  const modalContent = (
    <div className={styles.outer_overlay}>
      <div className={styles.modal_main}>
        <h2>Request Quote</h2>
        <span className={styles.cross} onClick={() => close(false)}>
          <span className={styles.inner_cross}>
            <RxCross2 color="white" className={styles.mob_close_icon} />
          </span>
        </span>
        <div className={styles.form_group}>
          <label htmlFor="product">Selected Product</label>
          <input
            type="text"
            id="product"
            style={{ textTransform: "capitalize" }}
            value={product}
            name="product"
            disabled
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="Your First Name"
            name="firstName"
            onChange={handleChange}
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            placeholder="Your Last Name"
            name="lastName"
            onChange={handleChange}
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="personalEmail">Email Address</label>
          <input
            type="email"
            id="personalEmail"
            placeholder="Email Address"
            name="personalEmail"
            onChange={handleChange}
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="tel"
            id="mobileNumber"
            placeholder="Mobile Number"
            name="mobileNumber"
            onChange={handleChange}
          />
        </div>
        {/* <div className={styles.form_group}>
          <label htmlFor="myDate">Date</label>
          <input
            type="date"
            id="myDate"
            placeholder="Choose a Date"
            name="date"
            onFocus={disablePastDates}
            onChange={handleChange}
          />
        </div> */}
        <div className={styles.btn_group}>
          <button onClick={sendContact}>Contact Us</button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default Quote;
