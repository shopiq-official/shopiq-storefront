"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const LoadMoreBtn = ({ total, searchParams, len }: any) => {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(false);
  }, [len]);

  return (
    <>
      {total > 15 * (searchParams?.page ? Number(searchParams?.page) : 1) && (
        <div
          style={{
            width: "100%",
            gridColumn: "1/-1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          {load ? (
            <span className="loader"></span>
          ) : (
            <Link
              href={`/products?${getQueryString(searchParams, true)}`}
              scroll={false}
              style={{
                background: "black",
                color: "white",
                fontSize: "1.1rem",
                padding: "5px 15px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => setLoad(true)}
            >
              Load More
            </Link>
          )}
        </div>
      )}
    </>
  );
};

const getQueryString = (searchParams: any, increase = false) => {
  let queryString = "";

  for (let key in searchParams) {
    if (searchParams.hasOwnProperty(key)) {
      if (searchParams[key] !== "") {
        queryString += `${encodeURIComponent(key)}=${encodeURIComponent(
          key === "page" && increase
            ? Number(searchParams[key]) + 1
            : searchParams[key]
        )}&`;
      }
    }
  }

  if (queryString.length > 0) {
    queryString = queryString.slice(0, -1);
    if (!queryString.includes("page=")) {
      if (increase) {
        queryString = `page=2&${queryString}`;
      } else {
        queryString = `page=1&${queryString}`;
      }
    }
  } else {
    queryString = increase ? "page=2" : "page=1";
  }

  return queryString;
};
