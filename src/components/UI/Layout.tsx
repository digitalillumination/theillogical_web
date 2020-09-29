import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import Logo from "./Logo";

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
          </Toolbar>
        </AppBar>
      </header>
      <main>{children}</main>
    </>
  );
}

export default Layout;
