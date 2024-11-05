import { createStore } from "zustand/vanilla";

export type RetainoStateType = {
  status: string;
};

export type RetainoActions = {
  setToReact: () => void;
};

export type RetainoState = RetainoStateType & RetainoActions;

export const initialState: RetainoStateType = { status: "loading" };

export const useRetainoStore = (initState: RetainoStateType = initialState) => {
  return createStore<any>()((set) => ({
    ...initState,
    setToReady: () => set((state: any) => ({ state: "ready" })),
  }));
};
