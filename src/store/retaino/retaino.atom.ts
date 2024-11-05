import { atom } from "recoil";

export const retainoState = atom({
  key: "retainoState",
  default: { status: "loading" },
});
