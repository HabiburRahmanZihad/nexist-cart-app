"use client";

import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { CartHydration } from "./CartHydration";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CartHydration />
      {children}
    </Provider>
  );
}
