import { createReducer } from "@reduxjs/toolkit";
import { Group } from "../../../shared/models";
import { setGroups } from "./actions";

export interface State {
  items: Group[];
  page?: number;
  size?: number;
  total?: number;
  query?: Object;
}

const initialState: State = {
  items: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setGroups, (state, { payload: { entries, page, size, total, query } }) => {
    state.items = entries;
    state.page = page;
    state.size = size;
    state.total = total;
    state.query = query;
  });
});
