import { createAction } from "@reduxjs/toolkit";
import { Payload } from "./index";
import { LOG_IN } from "../../types";
import { AppThunk } from "../../store";
import apiClient from "../../../shared/api";

export const ac_login = createAction<Payload>(LOG_IN);
