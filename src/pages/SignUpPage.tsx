import React from 'react';
import styled from "styled-components";
import { Button, TextField, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import getClient from "../lib/client";
import { useHistory } from 'react-router-dom';

function SignUpPage() {
  const {handleSubmit, register, watch, errors} = useForm({
    mode: "onChange"
  });
  const password = watch("password");
  const history = useHistory();

  function submit({ userId, password, username }: any) {
    getClient().post('/api/v1/user', {userId, password, username})
      .then(() => {
        alert("회원 가입이 완료되었습니다.");
        history.replace("/");
      })
      .catch((e) => {
        console.error(e);
        alert(e.message);
      })
  }
  return (
    <Layout>
      <Typography variant="h4">회원가입</Typography>
      <form className="form" onSubmit={handleSubmit(submit)}>
        <TextField
          name="userId"
          inputRef={register({minLength: 6, maxLength: 24})}
          label="아이디"
          fullWidth
          required
          error={errors.userId}
        />
        <TextField
          type="password"
          name="password"
          inputRef={register}
          label="비밀번호"
          fullWidth
          required
          />
          <TextField
            name="passwordAccept"
            type="password"
            inputRef={register({
              validate: passwordAccept => password === passwordAccept
            })}
            label="비밀번호 확인"
            fullWidth
            required
            error={errors.passwordAccept}
          />
          <TextField
            name="username"
            inputRef={register}
            label="유저명"
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            회원가입
          </Button>
      </form>
    </Layout>
  )
}

const Layout = styled.div`
  padding: 5vh 10vw;
  
  .form {
    > * {
      margin-top: 16px;
    }
  }
`;

export default SignUpPage;