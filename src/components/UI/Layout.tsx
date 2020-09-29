import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import Logo from "./Logo";
import LayoutAccount from "./LayoutAccount";

interface LayoutProps {
  children: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
  return (
    <>
      <header>
        <AppBar position="static" style={{ backgroundColor: "white" }}>
          <Toolbar>
            <Logo size={30} />
            <div
              style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
            >
              <LayoutAccount />
            </div>
          </Toolbar>
        </AppBar>
      </header>
      <main>{children}</main>
    </>
  );
}

export default Layout;
