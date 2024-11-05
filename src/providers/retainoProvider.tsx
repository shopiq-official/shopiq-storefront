"use client";
import { setReady } from "@/redux/retaino.slice";
import { useRetainoStore } from "@/store/retaino/retaino.store";
import Script from "next/script";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

declare global {
  interface Window {
    Retaino: {
      isLoggedIn: () => boolean;
      getUserId: () => string;
      LogoutUser: (path: string) => void;
      UserInfo: () => void;
      getAccessToken: () => string;
      CheckoutRetaino: any;
      LoginWindow: any;
      loading: any;
    };
  }
}

// In this we have used Redux because I think we have added the script with
// strategy as afterInteractivity which can delay the load of Retaino script
// until then is the components are loaded we don't wont to re-render them again
// using context api

export const RetainoProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkScriptLoaded = () => {
      if (window?.Retaino) {
        dispatch(setReady());
        try {
          clearInterval(interval);
        } catch (err) {}
      }
    };

    checkScriptLoaded();

    var interval = setInterval(checkScriptLoaded, 1000);

    return () => clearInterval(interval);
  }, []);

  return <>{children}</>;
};
