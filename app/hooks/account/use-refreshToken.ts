import { ENDPOINTS } from "../../utils/constant"
// import { ILoginRes } from "@/types/api.types"
import useCustomMutation from "../../hooks/requestHooks/use-mutationaction"

const useRefreshToken = () => {
  return useCustomMutation({
    method: "post",
    endpoint: "",
    // showSuccessToast: false,
  })
}

export default useRefreshToken
