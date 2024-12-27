"use client";
import React, { useState } from "react";
import styles from "./contactus.module.css";
import InputField from "./InputField";
import toast from "react-hot-toast";
import axios from "axios";

const ContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!firstName && !email && !mobile && !date) {
      toast.error("Please fill in the details to submit.");
      return false;
    }

    return true;
  };

  const clearData = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setMobile("");
    setDate("");
    setMessage("");
  };

  // Function to handle form submission
  const onSubmit = () => {
    if (validate()) {
      setLoading(true);
      axios({
        url: "https://api.shopiq.app/api/contacts",
        method: "POST",
        data: {
          identifier: process.env.NEXT_PUBLIC_IDENTIFIER,
          firstName,
          lastName,
          personalEmail: email,
          mobileNumber: mobile,
          date,
          message,
          userDeviceDetails: JSON.parse(
            localStorage.getItem("userDeviceDetails") || "{}"
          ),
          createdAt: new Date(),
          campaign: JSON.parse(localStorage.getItem("campaign") || "{}"),
        },
      })
        .then(() => {
          setLoading(false);
          clearData();
          toast.success("Appointment booked successfully.");
        })
        .catch(() => {
          setLoading(false);
          toast.error("Something went wrong while submitting form");
        });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.side_image}>
        <img src={"/assets/contactUs/contact.webp"} alt="side" />
      </div>
      <div className={styles.contact_form_section}>
        <h2>Contact Us</h2>
        <div className={styles.fields_container}>
          <InputField
            type="text"
            value={firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFirstName(e.target.value)
            }
            isLocked={false}
            placeholder="First Name"
          />
          <InputField
            type="text"
            value={lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLastName(e.target.value)
            }
            isLocked={false}
            placeholder="Last Name"
          />
          <InputField
            type="text"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            isLocked={false}
            placeholder="Email Address"
          />
          <InputField
            type="number"
            value={mobile}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMobile(e.target.value)
            }
            isLocked={false}
            placeholder="Mobile Number"
          />

          <textarea
            placeholder="Message"
            value={message}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMessage(e.target.value)
            }
          />
          {loading ? (
            <button style={{ background: "var(--primary)" }}>
              <span className="loader_btn"></span>
            </button>
          ) : (
            <button style={{ background: "var(--primary)" }} onClick={onSubmit}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
