import { Action, configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import UserSlice from "./user";
import MusicSlice from "./music";


const reducer = combineReducers({
  [UserSlice.name]: UserSlice.reducer,
  [MusicSlice.name]: MusicSlice.reducer
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

const store = configureStore({
  reducer,
  middleware: [thunk]
});

export type RootState = ReturnType<typeof reducer>;
export default store;