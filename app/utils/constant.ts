export const ENDPOINTS = {
  BASE_URL: __DEV__ ? "https://korededavid.pythonanywhere.com/" : "",

  // USERS ENDPOINTS
  LOGIN: "auth/jwt/create/",
  CREATE_USER: "auth/users/",
  AUTH_REFRESH_TOKEN: "auth/jwt/refresh",
  GET_USER: "auth/users/",
  // ENDPOINTS FOR SPACE/CATEGORIES
  CREATE_POST: "space/posts/",
  GET_POST: (uuid: string) => `space/posts/${uuid}`,

  GET_LIST_POST: (pageNumber: number) => `space/posts?page=${pageNumber}`,
  //CATEGORIES ENDPOINTS
  GET_LIST_CATEGORIES: "space/categories",
  GET_CATEGORY_POST: (cat_uuid: string, post_uuid: string) =>
    `space/categories/${cat_uuid}/posts/${post_uuid}/`,
  GET_LIST_CATEGORY: (catId: string) => `/space/categories/${catId}/posts/`,
  CREATE_CATEGORY_POST: "space/categories/posts/",

  // FEEDS ENDPOINTS
  GET_LIST_FEED: (pageNumber: number) => `feed/?page=${pageNumber}`,
  // CONNECTIONS ENDPOINTS
  SEND_CONNECTION_REQUEST: "connections/",
  CANCEL_CONNECTION_REQUEST: (connectId: string) => `connections/cancel/${connectId}`,
  ACCEPT_CONNECTION_REQUEST: (connectId: string) => `connections/accept/${connectId}`,
  DECLINE_CONNECTION_REQUEST: (connectId: string) => `connections/decline/${connectId}`,
  GET_LIST_FRIENDS: "connections/friends",
  //FORUM
  GET_LIST_FORUM: "networking/forums/",
  CREATE_FORUM: "networking/forums/",
  JOIN_FORUM: "networking/forums/join/",
  CREATE_FORUM_POST: (forumId: string) => `networking/forums/${forumId}/posts/`,
  GET_FORUM_POST: (forumId: string) => `networking/forums/${forumId}/posts/`,
  GET_SINGLE_FORUM_POST: (forumId: string, forumPostId: string) =>
    `networking/forums/${forumId}/posts/${forumPostId}/`,
}

export const NAMESPACE = {
  GET_LIST_CATEGORIES: " GET_LIST_CATEGORIES",
  GET_LIST_CATEGORY: " GET_LIST_CATEGORY",
  GET_USER: "GET_USER",
  GET_POST: "GET_POST",
  GET_LIST_POST: "GET_LIST_POST",
  GET_LIST_FEED: "GET_LIST_FEED",
  GET_LIST_FRIENDS: "GET_LIST_FRIENDS",
  GET_CATEGORY_POST: "GET_CATEGORY_POST",
  GET_LIST_FORUM: "GET_LIST_FORUM",
  GET_FORUM_POST: " GET_FORUM_POST",
  GET_SINGLE_FORUM_POST: "GET_SINGLE_FORUM_POST",
}

export const BROSPACE = {
  STOREID: "bro46374683",
  REFRESH_TOKEN: "brosdyuihu8990djwi",
  USER: "bro099jnj0jj09jm9j",
  LOGIN: "bro5YFT76F6898989H",
}
