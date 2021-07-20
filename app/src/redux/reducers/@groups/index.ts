import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { Group } from "../../../shared/models";
import { ac_setGroups } from "./actions";

export interface State {
  items: Group[];
  page?: number;
  size?: number;
}
const initialState: State = {
  items: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(ac_setGroups, (state, { payload: { groups, page, size } }) => {
    state.items = groups;
    state.page = page;
    state.size = size;
  });
});
