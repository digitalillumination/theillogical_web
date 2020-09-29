import React, { useState } from "react";
import { Modal, TextField } from "@material-ui/core";

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
