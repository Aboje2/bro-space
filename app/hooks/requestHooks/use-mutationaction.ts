import { ENDPOINTS } from "../../utils/constant"
import { secureRequest } from "../../services/api/broApi"
import { formatErrors } from "../../utils/component.utils"

import { BroResponseType, SecureRequestProps, ResponseErrorType } from "../../services/api/"
import { UseMutationOptions, useMutation } from "@tanstack/react-query"
// import useNotification from "./use-notification"

const getMutationAction = (mutationData: any) => {
  const { endpoint, method, headers, isQuikeeApi = true } = mutationData
  const API_BASE_URL = ENDPOINTS.BASE_URL

  const url = isQuikeeApi ? API_BASE_URL + endpoint : endpoint

  return {
    mutationFn: (body: Record<string, unknown>) =>
      secureRequest({
        url,
        method,
        body,
        headers,
      }),
    ...mutationData,
  }
}

function useCustomMutation<P = Record<string, unknown>, T = Record<string, unknown>>(
  mutationData: Partial<SecureRequestProps> & Partial<UseMutationOptions> & { endpoint: string },
) {
  const {
    mutationFn,
    endpoint,
    showSuccessToast = true,
    showFailureToast = true,
    ...others
  } = getMutationAction({
    ...mutationData,
  })
  //   const { toast } = useNotification()

  const mutatationResult = useMutation<BroResponseType<P>, ResponseErrorType, T>({
    mutationFn,
    mutationKey: endpoint,

    onError: (err: any) => {
      console.log(err, "showing error from mutation")
      if (showFailureToast) {
        // toast({
        //   // title: `Request Failed`,
        //   description: `${formatErrors(err.response?.data?.errors!, err?.response?.data?.message)}`,
        //   appearance: "error",
        // })
      }
      mutatationResult.reset()
    },
    onSettled: (res: any, err: any) => {
      if (err) mutatationResult.reset()
      console.log(err, "showing err from settled")
      // if (!err && showSuccessToast) {
      //   // toast({
      //   //   // title: `Request Successful`,
      //   //   description: `${res?.data?.message}`,
      //   //   appearance: "success",
      //   // })
      // }
      return
    },
    retry: false,
    refetchOnWindowFocus: false,
    ...others,
  })

  return { ...mutatationResult, value: mutatationResult?.data?.data }
}

export default useCustomMutation
