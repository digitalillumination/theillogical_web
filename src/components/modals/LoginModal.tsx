import React, { useState } from "react";
import { Button, Modal, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";

interface LoginModalProps {
  open: boolean;
  onClose(): any;
}

function LoginModal({ open, onClose }: LoginModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          background: "white",
          maxWidth: 320,
          margin: "auto",
          marginTop: "30vh",
          padding: "48px 1.5em",
          paddingBottom: "24px"
        }}
      >
        <form>
          <TextField label="아이디" variant="outlined" fullWidth />
          <TextField
            label="비밀번호"
            type="text"
            variant="outlined"
            fullWidth
            style={{ marginTop: 16 }}
          />
          <Button variant="contained" color="primary" style={{marginTop: 16}} fullWidth>
            로그인
          </Button>
          <div style={{marginTop: 16}}>
            아이디가 없으신가요? <Link to="/signup" onClick={onClose}>회원가입</Link>
          </div>
        </form>
      </div>
    </Modal>
  );
}
export function useLoginModal() {
  const [open, setOpen] = useState(false);

  const modal = <LoginModal open={open} onClose={() => setOpen(false)} />;
  function openModal() {
    setOpen(true);
  }

  return {
    open,
    openModal,
    setOpen,
    modal,
  };
}
