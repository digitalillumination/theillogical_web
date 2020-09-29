import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Logo from "./Logo";
import LayoutAccount from "./LayoutAccount";

interface LayoutProps {
  children: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
  const history = useHistory();
  return (
    <>
      <header>
        <AppBar position="static" style={{ backgroundColor: "white" }}>
          <Toolbar>
            <div style={{display: 'inline-block', cursor: 'pointer'}} onClick={() => history.push('/')}><Logo size={30} /></div>
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
