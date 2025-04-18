import { ENDPOINTS } from "../../utils/constant"
// import { ILoginRes } from "@/types/api.types"
import useCustomMutation from "../requestHooks/use-mutationaction"

const useCancelConnection = (connectId: string) => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.CANCEL_CONNECTION_REQUEST(connectId),
    // showSuccessToast: false,
  })
}

export default useCancelConnection
