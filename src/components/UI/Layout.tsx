import React from "react";
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import Logo from "./Logo";
import { AccountCircle } from "@material-ui/icons";
import { useLoginModal } from "../modals/LoginModal";

interface LayoutProps {
  children: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
  const { modal, openModal } = useLoginModal();
  return (
    <>
      <header>
        <AppBar position="static" style={{ backgroundColor: "white" }}>
          <Toolbar>
            <Logo size={30} />
            <div
              style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
            >
              <IconButton aria-label="account or login" color="primary">
                <AccountCircle onClick={openModal} />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </header>
      <main>{children}</main>
      {modal}
    </>
  );
}

export default Layout;
