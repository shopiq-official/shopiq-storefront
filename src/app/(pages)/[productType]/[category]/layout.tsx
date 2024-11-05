import { Viewport } from "next";
import { ReactNode } from "react";

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
