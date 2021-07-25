import { ResponsePagination } from "../../../shared/models";
import { Group } from "../../../shared/models";

export type GetGroupsResponse = ResponsePagination<Group>;

export type PayloadSetGroups = {
  groups: Group[];
  size?: number;
  page?: number;
  total?: number;
};
