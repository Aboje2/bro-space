import { ENDPOINTS } from "../../utils/constant"
// import { ILoginRes } from "@/types/api.types"
import useCustomMutation from "../../hooks/requestHooks/use-mutationaction"

const useCreateAccount = () => {
  return useCustomMutation<FormData>({
    method: "post",
    endpoint: ENDPOINTS.CREATE_USER,
    // showSuccessToast: false,
  })
}

export default useCreateAccount
