import { ENDPOINTS } from "../../utils/constant"
// import { ILoginRes } from "@/types/api.types"
import useCustomMutation from "../../hooks/requestHooks/use-mutationaction"

const useAcceptConnection = (connectId: string) => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.ACCEPT_CONNECTION_REQUEST(connectId),
    // showSuccessToast: false,
  })
}

export default useAcceptConnection
