"use client";

import { getCart } from "@/redux/cart.slice";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CartProvider = ({ children }: { children: ReactNode }) => {
  const status = useSelector((state: any) => state.retaino.state);
  const cartStatus = useSelector((state: any) => state.cart.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "ready") {
      dispatch<any>(getCart());
    }
  }, [status]);

  return <>{children}</>;
};

export default CartProvider;
