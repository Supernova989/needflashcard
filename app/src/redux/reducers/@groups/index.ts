import { createReducer } from "@reduxjs/toolkit";
import { Group } from "../../../shared/models";
import { setGroups } from "./actions";

export interface State {
  items: Group[];
  page?: number;
  size?: number;
  total?: number;
}

const initialState: State = {
  items: []
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setGroups, (state, { payload: { groups, page, size, total } }) => {
    state.items = groups;
    state.page = page;
    state.size = size;
    state.total = total;
  });
});
