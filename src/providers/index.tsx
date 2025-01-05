"use client";
import { RecoilRoot } from "recoil";

import { KeyContextProvider } from "./keyProvider";
import { RetainoProvider } from "./retainoProvider";
import { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import CartProvider from "./cartProvider";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { AnalyticsPart } from "@/components/analyticsPart/analyticsPart";

const ExitProvider = dynamic(() => import("./exitProvider"), { ssr: false });

// Global Store
// - Context Api
// - Redux

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <RecoilRoot>
      <Provider store={store}>
        <KeyContextProvider>
          <RetainoProvider>
            <CartProvider>
              <Suspense>
                <AnalyticsPart />
              </Suspense>
              <ExitProvider />
              {children}
            </CartProvider>
          </RetainoProvider>
        </KeyContextProvider>
      </Provider>
    </RecoilRoot>
  );
};

export default Providers;
