import React, { useEffect, useState } from "react";
import { Button, Modal, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import getClient from "../../lib/client";
import UserSlice from "../../store/user";
import { RootState } from "../../store";

interface LoginModalProps {
  open: boolean;
  onClose(): any;
}

function LoginModal({ open, onClose }: LoginModalProps) {
  const {handleSubmit, register} = useForm();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user) onClose();
  }, [user, onClose]);
  function submit({userId, password}: any) {
    getClient().post('/api/v1/user/issue', {userId, password})
      .then(({data}) => {
        console.log(data.data);
        dispatch(UserSlice.actions.setToken(data.data));
      }).catch(e => {
        alert(e.message);
    })
  }
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
        <form onSubmit={handleSubmit(submit)}>
          <TextField
            name="userId"
            inputRef={register({required: true})}
            label="아이디"
            variant="outlined"
            fullWidth
          />
          <TextField
            name="password"
            inputRef={register({required: true})}
            label="비밀번호"
            type="password"
            variant="outlined"
            fullWidth
            style={{ marginTop: 16 }}
          />
          <Button variant="contained" color="primary" style={{marginTop: 16}} type="submit" fullWidth>
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
