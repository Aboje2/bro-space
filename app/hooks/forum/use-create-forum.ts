import { ENDPOINTS } from "../../utils/constant"
import { accountResponse } from "app/services/api/api.types"
import useCustomMutation from "../../hooks/requestHooks/use-mutationaction"

const useCreateForum = () => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.CREATE_FORUM,
    // showSuccessToast: false,
  })
}

export default useCreateForum
