import { Response } from "../../../shared/models";

export type BackendLoginResponse = Response<{
  token: string;
}>;
