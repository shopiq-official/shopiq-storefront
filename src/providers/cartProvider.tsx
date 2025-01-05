"use client";

import { getCart } from "@/redux/cart.slice";
import { CartState } from "@/types";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CartProvider = ({ children }: { children: ReactNode }) => {
  const status = useSelector((state: CartState) => state.retaino.state);
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (status === "ready") {
      dispatch(getCart());
    }
  }, [status]);

  return <>{children}</>;
};

export default CartProvider;
