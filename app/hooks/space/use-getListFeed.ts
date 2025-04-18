import { ENDPOINTS, NAMESPACE } from "../../utils/constant"
import useQueryActionHook from "../../hooks/requestHooks/use-queryaction"
// import { BroDetail } from "app/services/api/api.types"

const useGetListFeed = (page: any) => {
  return useQueryActionHook<any>({
    method: "get",
    endpoint: ENDPOINTS.GET_LIST_FEED(1),
    queryKey: [NAMESPACE.GET_LIST_FEED, page],
    refetchInterval: 10000,

    // refetchOnWindowFocus: isActive,
    // enabled: !!bidId,
  })
}

export default useGetListFeed
