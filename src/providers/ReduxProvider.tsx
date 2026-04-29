"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { CartHydration } from "./CartHydration";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CartHydration />
      {children}
    </Provider>
  );
}
