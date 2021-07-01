import React from "react";
import App from "../../App";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router-dom";
import { ROUTES } from "../../routes";
import { ReduxTestWrapper as RTW } from "../../components/ReduxTestWrapper";
import { rootReducer } from "../../redux/store";
import { delay } from "../../shared/utils";
import { BackendLoginResponse } from "../../redux/reducers/@auth/interfaces";
import { configureStore } from "@reduxjs/toolkit";

const token = "tokenYouAreLookingFor";

const server = setupServer(
  rest.post("/api/authenticate", (req, res, ctx) => {
    const body: BackendLoginResponse = { token };
    return res(ctx.json(body));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: any) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe("Page Login", () => {
  const store = configureStore({ reducer: rootReducer });
  const validEmail = "user@domain.com";
  const password = "aVeryGoodPassword";

  test("Renders page with form on it", async () => {
    const container = render(
      <RTW store={store}>
        <MemoryRouter initialEntries={[ROUTES.LOGIN]}>
          <App />
        </MemoryRouter>
      </RTW>
    );

    await waitFor(() => screen.getByTestId("page"));

    const emailInput = container.getByTestId("email-input");
    const pwdInput = screen.getByTestId("password-input");
    const button = screen.getByTestId("login-btn");

    expect(emailInput).toBeInTheDocument();
    expect(pwdInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("Opens HOME page when entering valid credentials", async () => {
    const container = render(
      <RTW store={store}>
        <MemoryRouter initialEntries={[ROUTES.LOGIN]}>
          <App />
        </MemoryRouter>
      </RTW>
    );
    await waitFor(() => screen.getByTestId("page"));

    const emailInput = container.getByTestId("email-input");
    const pwdInput = screen.getByTestId("password-input");
    const button = screen.getByTestId("login-btn");

    await waitFor(() => {
      fireEvent.change(emailInput, { target: { value: validEmail } });
    });
    await waitFor(() => {
      fireEvent.change(pwdInput, { target: { value: password } });
    });
    await waitFor(() => {
      fireEvent.click(button);
    });

    await delay(200);

    expect(store.getState().auth.token).toBe(token);
  });
});
