/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 *
 */
import { QueryFunction, QueryKey } from "@tanstack/react-query"
import { AxiosRequestHeaders, AxiosResponse, Method } from "axios"

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: "https://korededavid.pythonanywhere.com/"

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

export type MethodTypes = "get" | "post" | "patch" | "put" | "delete"

export interface SecureRequestProps<T = Record<string, unknown>> {
  method?: Method
  url: string
  body?: Record<string, unknown> | FormData
  // isQuikeeApi?: boolean
  baseURL?: string
  // headers?: AxiosRequestHeaders
  headers: any
  endpoint?: string
  queryKey?: string | string[] | number[]
  invalidateKeys?: string | string[] | number[]
  shouldInvalidate?: (data: any) => boolean
  // showSuccessToast?: boolean
  // showFailureToast?: boolean
  token?: string
  queryFn?: QueryFunction<BroResponseType<T>, QueryKey>
}

export type BroResponseType<D = Record<string, unknown>> = AxiosResponse<
  CredentialsServerResponseModel<D>
>

export type CredentialsServerResponseModel<T> = {
  data: T
  oid?: any
  success: boolean
  status: number
  message: string
  count?: number
  next?: null
  previous?: null
}

export interface ResponseErrorType {
  message: string
  success: boolean
  status: number
  errors?: Record<string, unknown>
}

export interface accountResponse {
  uuid: string
  email: string
  phone_number: string
  full_name: string
  profile_picture: string
  gender: string
  location: string
  username: string
  is_verified: boolean
  is_active: boolean
  tokens: {
    refresh: string
    access: string
  }
}

export type BroCatList = {
  uuid: string
  updated_at: Date
  created_at: Date
  name: string
  image: string
  description: string
}[]

export interface allPostResposne {
  allow_connection: boolean
  anonymous: boolean
  category: {
    image: string
    name: string
    uuid: string
  }
  created_at: Date
  media: any
  text: string
  topic: string
  updated_at: Date
  user: {
    profile_picture: string
    username: string
    uuid: string
  }
  uuid: string
}

export type allPostRes = {
  allow_connection: boolean
  anonymous: boolean
  category: {
    image: string
    name: string
    uuid: string
  }
  created_at: Date
  media: any
  text: string
  topic: string
  updated_at: Date
  user: {
    profile_picture: string
    username: string
    uuid: string
  }
  uuid: string
}[]

export interface BroDetail {
  user: {
    uuid: string
    profile_picture: string
    username: string
  }
  category: {
    uuid: string
    name: string
    image: string
  }
  media: [
    {
      file_type: string
      file: string
    },
    {
      file_type: string
      file: string
    },
  ]
  uuid: string
  updated_at: Date
  created_at: Date
  text: string
  title: string
  topic?: string
  anonymous: boolean
  allow_connection: boolean
  forum_member: {
    forum: {}
  }
}

// export interface NetworkingType {
//   // count: number
//   data: [
//     {
//       category: string
//       created_at: Date
//       creator: {
//         profile_picture: string
//         username: string
//         uuid: string
//       }
//       display_picture: string
//       display_total_number_of_members: boolean
//       narration: string
//       open_to_anyone: boolean
//       title: string
//       updated_at: Date
//       uuid: string
//     },
//   ]
//   message: string
//   next: null
//   previous: null
//   status: number
//   success: boolean
// }

export type BroNetworkRes = {
  category: string
  created_at: Date
  creator: {
    profile_picture: string
    username: string
    uuid: string
  }
  display_picture: string
  display_total_number_of_members: boolean
  narration: string
  open_to_anyone: boolean
  title: string
  updated_at: Date
  uuid: string
}[]

export interface BroUserResponse {
  email: string
  full_name: string
  gender: string
  is_active: boolean
  is_verified: boolean
  location: boolean
  phone_number: number
  profile_picture: string
  tokens: null
  username: string
  uuid: string
}

export type ForumListResp = {
  allow_connection: boolean
  anonymous: boolean
  category: {
    image: string
    name: string
    uuid: string
  }
  created_at: Date
  media: any
  text: string
  topic: string
  updated_at: Date
  user: {
    profile_picture: string
    username: string
    uuid: string
  }
  uuid: string
  forum_member: {
    forum: { display_picture: string; title: string; uuid: string }
    member: { profile_picture: string; username: string; uuid: string }
    uuid: string
  }
}[]

export type ForumDetailResponse = {
  allow_connection: boolean
  anonymous: boolean
  created_at: Date
  forum_member: {
    forum: { display_picture: string; title: string; uuid: string }
    member: { profile_picture: string; username: string; uuid: string }
    uuid: string
  }
  media: { image: string[] }
  text: string
  topic: string
  updated_at: Date
  uuid: string
}
