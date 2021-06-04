import { combineReducers } from "redux";
import { IAuthState, defaultState as authDState, reducer as authReducer } from "./authReducer";

export interface IReducerState {
  auth: IAuthState
}

export const initialReducerState: IReducerState = {
  auth: authDState
};

const reducers = combineReducers<IReducerState>({
  auth: authReducer
});

export default reducers;
