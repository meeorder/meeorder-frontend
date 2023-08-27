import {
  type GetAllMenusResponse,
  type GetMenuByIdResponse,
} from "@/modules/services/menus";

export type Menu = GetMenuByIdResponse;
export type Category = GetAllMenusResponse[number]["category"];
