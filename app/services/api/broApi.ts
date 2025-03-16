// import { CustomMethod, SecureRequestProps } from "@/types/api.types"
import axios from "axios"
import { ENDPOINTS, BROSPACE } from "../../utils/constant"
import { MethodTypes, SecureRequestProps } from "../api/api.types"
import { saveString, loadString } from "../../utils/storage/storage"

axios.interceptors.request.use(
  async (config) => {
    const token = await loadString(BROSPACE.USER)

    if (token) {
      config.headers["Authorization"] = "Bearer " + token
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

axios.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const baseURL = ENDPOINTS.BASE_URL
    const originalRequest = error.config

    const refresh = await loadString(BROSPACE.REFRESH_TOKEN)
    let retryNum = 0
    if (
      error?.response?.status === 401 &&
      (error?.response?.data?.message === "Authentication credentials were not provided." ||
        error?.response?.data?.message === "Given token not valid for any token type") &&
      refresh
    ) {
      retryNum++
      return axios
        .post(baseURL + ENDPOINTS.AUTH_REFRESH_TOKEN, {
          refresh,
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            saveString(BROSPACE.USER, res?.data?.data?.access)
            axios.defaults.headers.common["Authorization"] = "Bearer " + res?.data?.data?.access
            return axios(originalRequest)
          }
        })
        .catch((err) => {
          console.log(err)
          window.location.replace("/login")
        })
    }
    return Promise.reject(error)
  },
)

export const secureRequest = async ({
  url,
  method = "get",
  body = undefined,
  headers: requestHeader,
}: SecureRequestProps) => {
  const givenMethod = method.toLocaleLowerCase() as MethodTypes

  // const headers = { ...requestHeader }
  const headers = {
    Accept: "application/json;charset=utf-8",
    "Content-Type": "application/json;charset=utf-8",
    ...requestHeader,
  }

  // const isFormData = body instanceof FormData

  if (givenMethod === "get" || givenMethod === "delete") {
    //dont include body in GET request request will fail
    return axios[givenMethod](url, {
      params: {
        ...body,
      },
      headers,
    })
  }

  return axios[givenMethod](url, body, {
    headers,
  })
}
