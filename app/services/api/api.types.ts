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
