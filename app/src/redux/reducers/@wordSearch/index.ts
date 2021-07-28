import { createReducer } from "@reduxjs/toolkit";
import { SearchWordSuggestion } from "./interfaces";
import { addSuggestions } from "./actions";

export interface State {
  queries: Record<string, SearchWordSuggestion[]>;
}

const initialState: State = {
  queries: {},
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(addSuggestions, (state, { payload }) => {
    state.queries[payload.query] = payload.suggestions;
  });
});
