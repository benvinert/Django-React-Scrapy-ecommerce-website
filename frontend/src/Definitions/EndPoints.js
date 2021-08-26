export const SERVER_PATH = "https://backend-ben-ecommerce.herokuapp.com/";

export const USER_DATA = {
  GET_USER_DATA: "auth/users/me/",
};

export const ITEMS_URLS = {
  GET_ITEM_BY_ID: "api/All/getItemById/product_code=",
  GET_ALL_ITEMS: "api/All/",
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
