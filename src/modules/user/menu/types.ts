import { type GetAllMenusResponse } from "@/modules/services/menus";

export type Menu = GetAllMenusResponse[number]["menus"][number];
export type Category = GetAllMenusResponse[number]["category"];
