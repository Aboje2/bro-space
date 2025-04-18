import { ENDPOINTS, NAMESPACE } from "../../utils/constant"
import useQueryActionHook from "../../hooks/requestHooks/use-queryaction"
import { BroDetail } from "app/services/api/api.types"

const useGetPost = (postId: string) => {
  return useQueryActionHook<BroDetail>({
    method: "get",
    endpoint: ENDPOINTS.GET_POST(postId),
    queryKey: [NAMESPACE.GET_POST, postId],
    refetchInterval: 10000,

    // refetchOnWindowFocus: isActive,
    // enabled: !!bidId,
  })
}

export default useGetPost
