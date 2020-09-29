import React, { useState } from "react";
import { useLoginModal } from "../modals/LoginModal";
import { AccountCircle } from "@material-ui/icons";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useHistory } from "react-router-dom";

function LayoutAccount() {
  const [open, setOpen] = useState(false);
  const { modal, openModal } = useLoginModal();
  const history = useHistory();
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <>
      <IconButton aria-label="account or login" color="primary">
        <AccountCircle onClick={!user ? openModal : () => setOpen(true)} />
      </IconButton>
      {user && (
        <Menu
          open={open}
          onClose={() => setOpen(false)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}>
          <MenuItem onClick={() => history.push("/user/"+user.id)}>내 계정 보기</MenuItem>
        </Menu>
      )}
      {!user && modal}
    </>
  )
}

export default LayoutAccount;