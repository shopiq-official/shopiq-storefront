"use client";

import { getKey, getWebsiteData } from "@/api";
import { keyState } from "@/store/key/key.atom";
import { createContext, useContext, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

// In this we will use context API because
// the key value is fetched once when application
// loads for the first time and didn't require further
// updates for which context api is the best solution

const KeyContext = createContext({});

export const KeyContextProvider = ({ children }: any) => {
  const [key, setKey] = useState(null);
  const [status, setStatus] = useState("loading");
  const [isMinOrderValueActive, setIsMinOrderValueActive] = useState(false);
  const [isShippingChargeActive, setIsShippingChargeActive] = useState(false);
  const [minOrderValue, setMinOrderValue] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);

  useEffect(() => {
    async function getKeyValue() {
      const res = await getKey();
      setKey(res.key);
      setStatus("ready");
    }

    async function getData() {
      const res: any = await getWebsiteData();
      console.log("ressss ::: ", res);
      setIsMinOrderValueActive(res?.data?.isMinOrderValueActive || false);
      setMinOrderValue(res?.data?.minOrderValue || 0);
      setIsShippingChargeActive(res?.data?.isShippingChargeActive);
      setShippingCharge(res?.data?.shippingCharge);
    }

    getKeyValue();
    getData();
  }, []);

  return (
    <KeyContext.Provider
      value={{
        key,
        status,
        isMinOrderValueActive,
        minOrderValue,
        isShippingChargeActive,
        shippingCharge,
      }}
    >
      {children}
    </KeyContext.Provider>
  );
};

export const useKeyContext = () => {
  return useContext(KeyContext);
};

export type keyContextProps = {
  key?: string;
  status?: string;
  isMinOrderValueActive?: boolean;
  minOrderValue?: number;
  isShippingChargeActive?: boolean;
  shippingCharge?: number;
};
