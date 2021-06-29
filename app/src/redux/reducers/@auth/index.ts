import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { ac_login } from "./actions";

const storage: Storage = localStorage;
const TOKEN_STORAGE_NAME = "__token";

export interface State {
  token?: string;
  userID?: string;
}

export const initialState: State = {
  token: storage.getItem(TOKEN_STORAGE_NAME) || "", // restore token from storage on app load
};

export type Payload = {
  token?: string;
  userID?: string;
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(ac_login.type, (state, { payload }: PayloadAction<Payload>) => {
    state.token = payload.token;
    state.userID = payload.userID;
    if (payload.token) {
      storage.setItem(TOKEN_STORAGE_NAME, payload.token);
    }
  });
});
