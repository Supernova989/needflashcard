import { Response } from "../../../shared/api";

export type BackendLoginResponse = Response<{
  token: string;
}>;
