export const ENDPOINTS = {
  BASE_URL: __DEV__ ? "https://korededavid.pythonanywhere.com/" : "",

  // USERS ENDPOINTS
  LOGIN: "auth/jwt/create/",
  CREATE_USER: "auth/users/",
  AUTH_REFRESH_TOKEN: "auth/jwt/refresh",
  // CREATE_USER: "users/create-account",
  GET_USER: "auth/users/",
  // ENDPOINTS FOR SPACE
  CREATE_POST: "space/post/",
  GET_POST: (postId: string) => `space/post/${postId}`,
  GET_LIST_POST: (pageNumber: number) => `space/posts?page=${pageNumber}`,
  GET_LIST_CATEGORY: "space/categories",
  // FEEDS ENDPOINTS
  GET_LIST_FEED: (pageNumber: number) => `feed/?page=${pageNumber}`,
  // CONNECTIONS ENDPOINTS
  SEND_CONNECTION_REQUEST: "connections/",
  CANCEL_CONNECTION_REQUEST: (connectId: string) => `connections/cancel/${connectId}`,
  ACCEPT_CONNECTION_REQUEST: (connectId: string) => `connections/accept/${connectId}`,
  DECLINE_CONNECTION_REQUEST: (connectId: string) => `connections/decline/${connectId}`,
  GET_LIST_FRIENDS: "connections/friends",
}

export const NAMESPACE = {
  GET_LIST_CATEGORY: "space/categories",
}

export const BROSPACE = {
  STOREID: "bro46374683",
  REFRESH_TOKEN: "brosdyuihu8990djwi",
  USER: "bro099jnj0jj09jm9j",
  LOGIN: "bro5YFT76F6898989H",
}
