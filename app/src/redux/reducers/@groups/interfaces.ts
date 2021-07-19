import { Response, ResponsePagination } from "../../../shared/api";
import { Group } from "../../../shared/models";

export type GetGroupsResponse = ResponsePagination<Group>;
