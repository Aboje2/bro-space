import { ENDPOINTS } from "../../utils/constant"
import { accountResponse } from "app/services/api/api.types"
import useCustomMutation from "../../hooks/requestHooks/use-mutationaction"

const useJoinForum = () => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.JOIN_FORUM,
    // showSuccessToast: false,
  })
}

export default useJoinForum
