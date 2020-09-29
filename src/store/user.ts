import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import JWT from 'jsonwebtoken';
interface UserType {
  user?: UserData
}
interface UserData {
  token: string
  userId: string,
  username: string,
  id: string
}

const tokenFromStorage = window && window.sessionStorage && window.sessionStorage.getItem("token");

const initialState: UserType = {
  user: (tokenFromStorage && getData(tokenFromStorage)) || undefined
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      window && window.sessionStorage && window.sessionStorage.setItem("token", action.payload);
      state.user = getData(action.payload);
    },
    unsetToken(state) {
      window && window.sessionStorage && window.sessionStorage.removeItem("token");
      state.user = undefined;
    }
  }
});

function getData(token: string): UserData {
  const data = JWT.decode(token) as any;

  return { token, ...data };
}
export default UserSlice;