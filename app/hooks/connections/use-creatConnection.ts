import { ENDPOINTS } from "../../utils/constant"
// import { ILoginRes } from "@/types/api.types"
import useCustomMutation from "../requestHooks/use-mutationaction"

const useCreateConnection = () => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.SEND_CONNECTION_REQUEST,
    // showSuccessToast: false,
  })
}

export default useCreateConnection
