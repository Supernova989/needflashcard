import { LOG_IN } from "../types";
import { AnyAction } from "redux";

const storage = localStorage;
const tokenStorageName = "__token";

export interface IAuthState {
  token?: string,
  userID?: string,
}

export const defaultState: IAuthState = {};

export const reducer = (state: IAuthState = defaultState, action: AnyAction): IAuthState => {
  switch (action.type) {
    case LOG_IN: {
    }
  }
  return state;
};
