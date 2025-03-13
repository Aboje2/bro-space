import { ENDPOINTS } from "../../utils/constant"
import { accountResponse } from "app/services/api/api.types"
import useCustomMutation from "../../hooks/requestHooks/use-mutationaction"

const useCreateAccount = () => {
  return useCustomMutation<accountResponse>({
    method: "post",
    endpoint: ENDPOINTS.CREATE_USER,
    // showSuccessToast: false,
  })
}

export default useCreateAccount
