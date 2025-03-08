import { ENDPOINTS } from "../../utils/constant"
// import { ILoginRes } from "@/types/api.types"
import useCustomMutation from "../../hooks/requestHooks/use-mutationaction"

const useAuthLogin = () => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.LOGIN,
    // showSuccessToast: false,
  })
}

export default useAuthLogin
