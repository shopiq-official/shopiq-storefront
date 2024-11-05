"use client";
import { atom } from "recoil";

export const cartState = atom({
  key: "userCartState",
  default: null,
});
