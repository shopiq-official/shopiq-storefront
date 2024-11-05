"use client";
import { atom } from "recoil";

export const keyState = atom({
  key: "keyStateValue",
  default: { status: "loading", key: null },
});
