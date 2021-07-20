import { Response, ResponsePagination } from "../../../shared/models";
import { Group } from "../../../shared/models";

// export type GetGroupsResponse = ResponsePagination<Group>;
export type GetGroupsResponse = Response<Group[]>;

export type PayloadSetGroups = {
  groups: Group[];
  size?: number;
  page?: number;
};
