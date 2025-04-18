import { ENDPOINTS } from "../../utils/constant"
import { accountResponse } from "app/services/api/api.types"
import useCustomMutation from "../../hooks/requestHooks/use-mutationaction"

const useCreateForumPost = (forumId: string) => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.CREATE_FORUM_POST(forumId),
    // showSuccessToast: false,
  })
}

export default useCreateForumPost
