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
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  return (
    <>
      {!user
        ? <div style={{color: 'blue', cursor: 'pointer'}} onClick={openModal}>로그인</div>
        : <IconButton aria-label="account" color="primary" onClick={(e) => {
          setAnchor(e.currentTarget)
          setOpen(true);
        }} >
          <AccountCircle/>
        </IconButton>
      }
      {user && (
        <Menu
          open={open}
          onClose={() => setOpen(false)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          anchorEl={anchor}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}>
          <MenuItem onClick={() => history.push("/user/" + user.id)}>내 계정 보기</MenuItem>
          <MenuItem onClick={() => history.push('/upload')}>작업물 올리기</MenuItem>
        </Menu>
      )}
      {!user && modal}
    </>
  )
}

export default LayoutAccount;