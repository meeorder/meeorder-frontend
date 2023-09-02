/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/health/ping": {
    get: operations["HealthController_getPing"];
  };
  "/categories": {
    get: operations["CategoriesController_getAllCategories"];
    post: operations["CategoriesController_createCategory"];
  };
  "/categories/{id}": {
    get: operations["CategoriesController_getCategory"];
    put: operations["CategoriesController_updateCategory"];
    delete: operations["CategoriesController_deleteCategory"];
  };
  "/categories/rank": {
    patch: operations["CategoriesController_updateRank"];
  };
  "/addons": {
    get: operations["AddonsController_getAllAddons"];
    post: operations["AddonsController_createAddon"];
  };
  "/addons/{id}": {
    get: operations["AddonsController_getAddon"];
    put: operations["AddonsController_updateAddon"];
    delete: operations["AddonsController_deleteAddon"];
  };
  "/menus": {
    get: operations["MenusController_getMenus"];
    post: operations["MenusController_createMenu"];
    delete: operations["MenusController_removeMenus"];
  };
  "/menus/{id}": {
    get: operations["MenusController_getMenuById"];
    put: operations["MenusController_updateMenuById"];
    delete: operations["MenusController_removeMenuById"];
  };
  "/menus/{id}/publish": {
    patch: operations["MenusController_publishMenuById"];
  };
  "/menus/{id}/unpublish": {
    patch: operations["MenusController_unpublishMenuById"];
  };
  "/orders": {
    get: operations["OrdersController_getOrders"];
    post: operations["OrdersController_createOrder"];
  };
  "/orders/{id}/preparing": {
    patch: operations["OrdersController_preparing"];
  };
  "/orders/{id}/ready_to_serve": {
    patch: operations["OrdersController_readyToServe"];
  };
  "/orders/{id}/done": {
    patch: operations["OrdersController_done"];
  };
  "/orders/{id}/cancel": {
    patch: operations["OrdersController_cancel"];
  };
  "/sessions": {
    get: operations["SessionController_getSessions"];
    post: operations["SessionController_createSession"];
  };
  "/sessions/{id}": {
    get: operations["SessionController_getSession"];
    delete: operations["SessionController_deleteSession"];
  };
  "/sessions/table/{id}": {
    get: operations["SessionController_getSessionByTable"];
  };
  "/sessions/{id}/finish": {
    patch: operations["SessionController_finishSession"];
  };
  "/sessions/{id}/orders": {
    get: operations["SessionController_getOrdersBySession"];
  };
  "/tables": {
    get: operations["TablesController_getTables"];
    post: operations["TablesController_createTable"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    HealthResponseDto: {
      msg: Record<string, never>;
    };
    CreateCategoryDto: {
      title: string;
    };
    CategorySchema: {
      /** @description Category ID */
      _id: string;
      title: string;
      menus: string[];
      rank: number;
    };
    UpdateCategoryDto: {
      title: string;
      menus: string[];
      rank: number;
    };
    RankDto: {
      rank: string[];
    };
    CreateAddonDto: {
      title: string;
      price: number;
    };
    AddonSchema: {
      /** @description Addon ID */
      _id: string;
      title: string;
      price: number;
    };
    GetMenuByIdResponseDto: {
      /** @description Menu ID */
      _id: string;
      image: string;
      title: string;
      description: string;
      price: number;
      category: string;
      addons: components["schemas"]["AddonSchema"][];
      /** Format: date-time */
      published_at: string;
      /** Format: date-time */
      deleted_at: string;
    };
    GetAllMenuResponseDto: {
      category: components["schemas"]["CategorySchema"];
      menus: components["schemas"]["GetMenuByIdResponseDto"][];
    };
    CreateMenuDto: {
      image: string;
      title: string;
      description: string;
      price: number;
      category: string;
      addons: string[];
    };
    MenuSchema: {
      /** @description Menu ID */
      _id: string;
      image: string;
      title: string;
      description: string;
      price: number;
      category: string;
      addons: string[];
      /** Format: date-time */
      published_at: string;
      /** Format: date-time */
      deleted_at: string;
    };
    Orders: {
      /** @description menu is ObjectID */
      menu: string;
      /** @description Array of ObjectID */
      addons?: string[];
      additional_info?: string;
    };
    CreateOrderDto: {
      /** @description session is ObjectID */
      session: string;
      orders: components["schemas"]["Orders"][];
    };
    SessionSchema: {
      /** @description Session ID */
      _id: string;
      /**
       * Format: date-time
       * @description Session creation date
       */
      created_at: string;
      /**
       * Format: date-time
       * @description Session finish date
       */
      finished_at: string | null;
      /** @description User ID */
      uid: string | null;
      /** @description Table ID */
      table: number;
    };
    OrderGetDto: {
      /** @description Orders ID */
      _id: string;
      /** Format: date-time */
      created_at: string;
      /** @enum {string} */
      status: "IN_QUEUE" | "PREPARING" | "READY_TO_SERVE" | "DONE";
      /** @description Array of MenuID */
      addons: string[];
      /** @description Additional info */
      additional_info: string;
      /**
       * Format: date-time
       * @description for cancel status
       */
      cancelled_at: string;
      session: components["schemas"]["SessionSchema"];
      menu: components["schemas"]["MenuSchema"];
    };
    CreateSessionDto: {
      /** @description User ID */
      uid?: string;
      /** @description Table ID */
      table: number;
    };
    OrdersSchema: {
      /** Format: date-time */
      created_at: string;
      /** @enum {string} */
      status: "IN_QUEUE" | "PREPARING" | "READY_TO_SERVE" | "DONE";
      /** @description Session ID */
      session: string;
      /** @description Menu ID */
      menu: string;
      /** @description Array of MenuID */
      addons: string[];
      /** @description Additional info */
      additional_info: string;
      /**
       * Format: date-time
       * @description for cancel status
       */
      cancelled_at: string;
    };
    OrdersListDto: {
      /** @description table number */
      table: number;
      /** @description total price */
      total_price: number;
      /** @description discount price */
      discount_price: number;
      /** @description net price */
      net_price: number;
      orders: components["schemas"]["OrdersSchema"][];
    };
    TablesDto: {
      _id: number;
    };
    TablesSchema: {
      _id: number;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {
  HealthController_getPing: {
    responses: {
      /** @description Health status */
      200: {
        content: {
          "application/json": components["schemas"]["HealthResponseDto"];
        };
      };
    };
  };
  CategoriesController_getAllCategories: {
    responses: {
      /** @description Get all categories */
      200: {
        content: {
          "application/json": components["schemas"]["CategorySchema"][];
        };
      };
    };
  };
  CategoriesController_createCategory: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateCategoryDto"];
      };
    };
    responses: {
      /** @description Created new category */
      201: {
        content: {
          "application/json": components["schemas"]["CreateCategoryDto"];
        };
      };
    };
  };
  CategoriesController_getCategory: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** @description Get category by ID */
      200: {
        content: {
          "application/json": components["schemas"]["CategorySchema"];
        };
      };
      /** @description Category not found */
      404: {
        content: never;
      };
    };
  };
  CategoriesController_updateCategory: {
    parameters: {
      path: {
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateCategoryDto"];
      };
    };
    responses: {
      /** @description Update category */
      200: {
        content: {
          "application/json": components["schemas"]["UpdateCategoryDto"];
        };
      };
      /** @description Category not found */
      404: {
        content: never;
      };
    };
  };
  CategoriesController_deleteCategory: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** @description Deleted category */
      204: {
        content: never;
      };
      /** @description Category not found */
      404: {
        content: never;
      };
    };
  };
  CategoriesController_updateRank: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["RankDto"];
      };
    };
    responses: {
      /** @description Change category rank */
      204: {
        content: never;
      };
    };
  };
  AddonsController_getAllAddons: {
    responses: {
      /** @description Get all addons */
      200: {
        content: {
          "application/json": components["schemas"]["AddonSchema"][];
        };
      };
    };
  };
  AddonsController_createAddon: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateAddonDto"];
      };
    };
    responses: {
      /** @description Created addon */
      201: {
        content: {
          "application/json": components["schemas"]["CreateAddonDto"];
        };
      };
    };
  };
  AddonsController_getAddon: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** @description Get addon by Id */
      200: {
        content: {
          "application/json": components["schemas"]["AddonSchema"];
        };
      };
      /** @description Addon not found */
      404: {
        content: never;
      };
    };
  };
  AddonsController_updateAddon: {
    parameters: {
      path: {
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateAddonDto"];
      };
    };
    responses: {
      /** @description Updated addon */
      200: {
        content: {
          "application/json": components["schemas"]["CreateAddonDto"];
        };
      };
      /** @description Addon not found */
      404: {
        content: never;
      };
    };
  };
  AddonsController_deleteAddon: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** @description Deleted addon */
      204: {
        content: never;
      };
      /** @description Addon not found */
      404: {
        content: never;
      };
    };
  };
  MenusController_getMenus: {
    parameters: {
      query: {
        status: "published" | "draft" | "all";
      };
    };
    responses: {
      /** @description Get all menus */
      200: {
        content: {
          "application/json": components["schemas"]["GetAllMenuResponseDto"][];
        };
      };
    };
  };
  MenusController_createMenu: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateMenuDto"];
      };
    };
    responses: {
      /** @description The menu has been successfully created. */
      201: {
        content: {
          "application/json": components["schemas"]["MenuSchema"];
        };
      };
    };
  };
  MenusController_removeMenus: {
    parameters: {
      query: {
        ids: string[];
      };
    };
    responses: {
      /** @description The menus have been successfully deleted. */
      200: {
        content: never;
      };
      /** @description No menu found */
      204: {
        content: never;
      };
    };
  };
  MenusController_getMenuById: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** @description Get menu by id */
      200: {
        content: {
          "application/json": components["schemas"]["GetMenuByIdResponseDto"];
        };
      };
      /** @description No menu found */
      404: {
        content: never;
      };
    };
  };
  MenusController_updateMenuById: {
    parameters: {
      path: {
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateMenuDto"];
      };
    };
    responses: {
      /** @description The menu has been successfully updated. */
      200: {
        content: never;
      };
      /** @description No menu found */
      404: {
        content: never;
      };
    };
  };
  MenusController_removeMenuById: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** @description The menu has been successfully deleted. */
      200: {
        content: never;
      };
      /** @description No menu found */
      204: {
        content: never;
      };
    };
  };
  MenusController_publishMenuById: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** @description The menu has been successfully published. */
      200: {
        content: never;
      };
      /** @description No menu found */
      404: {
        content: never;
      };
    };
  };
  MenusController_unpublishMenuById: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** @description The menu has been successfully unpublished. */
      200: {
        content: never;
      };
      /** @description No menu found */
      404: {
        content: never;
      };
    };
  };
  OrdersController_getOrders: {
    responses: {
      /** @description Get all orders */
      200: {
        content: {
          "application/json": components["schemas"]["OrderGetDto"][];
        };
      };
    };
  };
  OrdersController_createOrder: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateOrderDto"];
      };
    };
    responses: {
      /** @description Create order */
      201: {
        content: never;
      };
    };
  };
  OrdersController_preparing: {
    parameters: {
      path: {
        /** @description Session ID (ObjectId) */
        id: string;
      };
    };
    responses: {
      /** @description Set order status to preparing */
      204: {
        content: never;
      };
    };
  };
  OrdersController_readyToServe: {
    parameters: {
      path: {
        /** @description Session ID (ObjectId) */
        id: string;
      };
    };
    responses: {
      /** @description Set order status to ready to serve */
      204: {
        content: never;
      };
    };
  };
  OrdersController_done: {
    parameters: {
      path: {
        /** @description Session ID (ObjectId) */
        id: string;
      };
    };
    responses: {
      /** @description Set order status to done */
      204: {
        content: never;
      };
    };
  };
  OrdersController_cancel: {
    parameters: {
      path: {
        /** @description Session ID (ObjectId) */
        id: string;
      };
    };
    responses: {
      /** @description Cancel order */
      204: {
        content: never;
      };
    };
  };
  SessionController_getSessions: {
    parameters: {
      query?: {
        finished?: boolean;
      };
    };
    responses: {
      /** @description Sessions list */
      200: {
        content: {
          "application/json": components["schemas"]["SessionSchema"][];
        };
      };
    };
  };
  SessionController_createSession: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateSessionDto"];
      };
    };
    responses: {
      /** @description Session created */
      201: {
        content: {
          "application/json": components["schemas"]["SessionSchema"];
        };
      };
    };
  };
  SessionController_getSession: {
    parameters: {
      path: {
        /** @description Session ID (ObjectID) */
        id: string;
      };
    };
    responses: {
      /** @description Session */
      200: {
        content: {
          "application/json": components["schemas"]["SessionSchema"];
        };
      };
    };
  };
  SessionController_deleteSession: {
    parameters: {
      path: {
        /** @description Session ID (ObjectId) */
        id: string;
      };
    };
    responses: {
      /** @description Session deleted */
      204: {
        content: never;
      };
      /** @description Session not found */
      404: {
        content: never;
      };
    };
  };
  SessionController_getSessionByTable: {
    parameters: {
      path: {
        /** @description Table ID */
        id: number;
      };
    };
    responses: {
      /** @description Session */
      200: {
        content: {
          "application/json": components["schemas"]["SessionSchema"];
        };
      };
      /** @description No session found in the table */
      404: {
        content: never;
      };
    };
  };
  SessionController_finishSession: {
    parameters: {
      path: {
        /** @description Session ID (ObjectId) */
        id: string;
      };
    };
    responses: {
      /** @description Session finished */
      204: {
        content: never;
      };
      /** @description Session not found */
      404: {
        content: never;
      };
    };
  };
  SessionController_getOrdersBySession: {
    parameters: {
      path: {
        /** @description Session ID (ObjectId) */
        id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["OrdersListDto"];
        };
      };
    };
  };
  TablesController_getTables: {
    responses: {
      /** @description Get tables */
      200: {
        content: {
          "application/json": components["schemas"]["TablesSchema"][];
        };
      };
    };
  };
  TablesController_createTable: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["TablesDto"];
      };
    };
    responses: {
      /** @description Create table */
      201: {
        content: never;
      };
    };
  };
}
