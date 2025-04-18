import { ENDPOINTS, NAMESPACE } from "../../utils/constant"
import useQueryActionHook from "../../hooks/requestHooks/use-queryaction"
import { BroNetworkRes } from "app/services/api/api.types"

const useGetForumList = () => {
  return useQueryActionHook<BroNetworkRes>({
    method: "get",
    endpoint: ENDPOINTS.GET_LIST_FORUM,
    queryKey: [NAMESPACE.GET_LIST_FORUM],
    refetchInterval: 10000,

    // refetchOnWindowFocus: isActive,
    // enabled: !!bidId,
  })
}

export default useGetForumList
