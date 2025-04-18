import { ENDPOINTS, NAMESPACE } from "../../utils/constant"
import useQueryActionHook from "../../hooks/requestHooks/use-queryaction"
import { ForumListResp } from "app/services/api/api.types"

const useGetForumListPost = (forumId: string) => {
  return useQueryActionHook<ForumListResp>({
    method: "get",
    endpoint: ENDPOINTS.GET_FORUM_POST(forumId),
    queryKey: [NAMESPACE.GET_FORUM_POST],
    refetchInterval: 10000,

    // refetchOnWindowFocus: isActive,
    // enabled: !!bidId,
  })
}

export default useGetForumListPost
