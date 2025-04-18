import { ENDPOINTS } from "../../utils/constant"
// import { ILoginRes } from "@/types/api.types"
import useCustomMutation from "../../hooks/requestHooks/use-mutationaction"

const useDeclineConnection = (connectId: string) => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.DECLINE_CONNECTION_REQUEST(connectId),
    // showSuccessToast: false,
  })
}

export default useDeclineConnection
