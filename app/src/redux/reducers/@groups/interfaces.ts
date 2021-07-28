import { PaginationData, Response, ResponsePagination } from "../../../shared/models";
import { Group } from "../../../shared/models";

export type GetGroupsResponse = ResponsePagination<Group>;
export type CreateGroupResponse = Response<Group>;

export type PayloadAddGroup = Group;

export type PayloadSetGroups = PaginationData<Group> & { query?: Object };
