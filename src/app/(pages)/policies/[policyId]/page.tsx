"use client";
import { useEffect, useState } from "react";
// import React, { useEffect, useState } from "react";
// import { Metadata } from "next";
import styles from "./policies.module.css";
import { Metadata } from "next";

import axios from "axios";
import Head from "next/head";
import { capitalize } from "@/lib/capitalize";
import { Compliance } from "@/types";

const Policies = (props: { params: Record<string, string> }) => {
  const [policy, setPolicy] = useState<Compliance>();
  const [loading, setLoading] = useState(true);
  // const policy = getPolicy();

  useEffect(() => {
    getPolicy();
  }, []);

  function getPolicy() {
    axios
      .get("https://api.shopiq.app/api/compliances?identifier=YOUR_IDENTIFIER")
      .then((res) => {
        let temp = res.data.compliances.find((val: Compliance) => {
          if (val.typeName === props.params.policyId) {
            return true;
          }
          if (
            val.typeName === "refund" &&
            props.params.policyId === "return-policy"
          )
            return true;
          return false;
        });
        setPolicy(temp);
        document.title = capitalize(
          `${temp?.title} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME_FOR_TITLE}`
        );
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  return (
    <>
      {loading ? (
        <div
          style={{
            height: "60vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className="loader"></span>
        </div>
      ) : (
        <div className={styles.container}>
          {policy ? (
            <>
              <div className={styles.header}>
                <h1>{policy.title}</h1>
              </div>
              <div className={styles.content}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: policy?.body?.replace(/&nbsp;/g, " ") ?? "",
                  }}
                  className={styles.content_body}
                ></div>
              </div>
            </>
          ) : (
            <div className={styles.not_found}>not found</div>
          )}
        </div>
      )}
    </>
  );
};

export default Policies;
