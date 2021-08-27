export const SERVER_PATH = "https://backend-ben-ecommerce.herokuapp.com/";
export const FRONT_END_SERVER_PATH =
  "https://frontend-ben-ecommerce.herokuapp.com/";
export const PREFIX_PATH = "api/All/";
export const FIRST_PAGE = 1;
export const USER_DATA = {
  GET_USER_DATA: "auth/users/me/",
  REGISTER_USER: "auth/users/",
};

export const ITEMS_URLS = {
  GET_ITEM_BY_ID: "api/All/getItemById/product_code=",
  GET_ALL_ITEMS: "api/All/",
  SEARCH_ITEMS_BY_PARAMS: "searchItem/params=",
};

export const PARAMS_TO_SEARCH = {
  GENDER: "gender=",
  STYLE: "style=",
  CATEGORY: "category=",
  KIDS_GENDER: "kids_gender=",
};

export const AUTHORIZATION = {
  JWT_PREFIX_TOKEN: "JWT ",
  CREATE_JWT_TOKEN: "auth/jwt/create/",
  ACTIVATE_JWT_TOKEN: "auth/users/activation/",
  JWT_VERIFY: "auth/jwt/verify/",
};

export const ADMIN_URLS = {
  SEND_EMAIL: "api/Admin/sendEmail/",
  GET_ALL_USERS: "api/Admin/getAllUsers/",
};

export const ORDERS_URLS = {
  ADD_ORDER_TO_HISTORY: "api/All/addtohistoryorders",
  GET_ORDERS_BY_EMAIL: "api/All/getOrdersByEmail/email=",
  GET_ONE_ORDER_BY_ORDER_NUMBER:
    "api/All/getOneOrderByOrderNumber/orderNumber=",
};
