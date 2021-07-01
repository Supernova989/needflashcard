import { FC } from "react";
import { configureStore, Store } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { rootReducer, RootState } from "../../redux/store";

interface Props {
  preloadedState?: RootState;
  store?: Store;
}

export const ReduxTestWrapper: FC<Props> = ({ children, store, preloadedState }) => {
  return (
    <Provider store={store ? store : configureStore({ reducer: rootReducer, preloadedState })}>{children}</Provider>
  );
};
