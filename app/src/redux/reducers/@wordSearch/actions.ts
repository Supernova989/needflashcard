import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_WORD_SUGGESTIONS, SEARCH_WORDS } from "../../types";
import { AppAsyncThunkApi } from "../../store";
import apiClient from "../../../shared/api";

import { getBearer } from "../../../shared/utils";
import { AddWordSuggestionPayload, SearchWordsResponse, SearchWordSuggestion } from "./interfaces";

export const addSuggestions = createAction<AddWordSuggestionPayload>(ADD_WORD_SUGGESTIONS);

export const searchWords = createAsyncThunk<SearchWordSuggestion[], string, AppAsyncThunkApi>(
  SEARCH_WORDS,
  async (query, { dispatch, getState, rejectWithValue }) => {
    try {
      const response = await apiClient.request<SearchWordsResponse>({
        method: "GET",
        headers: { Authorization: getBearer(getState().auth.token) },
        url: "/v1/words",
        params: { q: query },
      });
      if (!response.data?.payload) {
        return [];
      }
      dispatch(addSuggestions({ query, suggestions: response.data.payload }));
      return response.data.payload;
    } catch (e) {
      return rejectWithValue(e.response?.data.error_code);
    }
  }
);
