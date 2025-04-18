import { ENDPOINTS } from "../../utils/constant"
import { secureRequest } from "../../services/api/broApi"
import { BroResponseType, SecureRequestProps, ResponseErrorType } from "../../services/api/"
import { UseQueryOptions, useQuery } from "@tanstack/react-query"

export const getQueryAction = (payload: any) => {
  const { endpoint, method, body, headers, isQuikeeApi = true } = payload
  const API_BASE_URL = ENDPOINTS.BASE_URL
  const url = isQuikeeApi ? API_BASE_URL + endpoint : endpoint

  return {
    queryFn: () => {
      return secureRequest({
        url,
        method,
        body,
        headers,
      })
    },
    ...payload,
  }
}

function useQueryActionHook<T>(
  data: Partial<SecureRequestProps> & Partial<UseQueryOptions> & { endpoint: string },
) {
  const { queryFn, queryKey, endpoint, ...others } = getQueryAction({
    ...data,
  })

  const queryResult = useQuery<BroResponseType<T>, ResponseErrorType>({
    queryFn,
    queryKey: queryKey || endpoint,
    onError: (err: any) => {
      if (err && err?.response?.data?.status === 401) {
        // Push the error
        // window.location.reload();
      } else {
        //  push the error
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    ...others,
  })

  return {
    ...queryResult,
    value: queryResult.data?.data,
  }
}

export default useQueryActionHook
