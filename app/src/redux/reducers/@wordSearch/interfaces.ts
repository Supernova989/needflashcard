import { Response, Suggestion } from "../../../shared/models";

export interface SearchWordSuggestion extends Suggestion {}

export interface AddWordSuggestionPayload {
  query: string;
  suggestions: SearchWordSuggestion[];
}

export type SearchWordsResponse = Response<SearchWordSuggestion[]>;
