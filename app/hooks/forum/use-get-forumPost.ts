import { ENDPOINTS, NAMESPACE } from "../../utils/constant"
import useQueryActionHook from "../../hooks/requestHooks/use-queryaction"
import { ForumDetailResponse } from "app/services/api/api.types"

const useGetForumPost = (forumId: string, forumPostId: string) => {
  return useQueryActionHook<ForumDetailResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_SINGLE_FORUM_POST(forumId, forumPostId),
    queryKey: [NAMESPACE.GET_SINGLE_FORUM_POST],
    refetchInterval: 10000,

    // refetchOnWindowFocus: isActive,
    // enabled: !!bidId,
  })
}

export default useGetForumPost
