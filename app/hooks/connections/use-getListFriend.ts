import { ENDPOINTS, NAMESPACE } from "../../utils/constant"
import useQueryActionHook from "../../hooks/requestHooks/use-queryaction"
// import { BroDetail } from "app/services/api/api.types"

const useGetListFriend = () => {
  return useQueryActionHook<any>({
    method: "get",
    endpoint: ENDPOINTS.GET_LIST_FRIENDS,
    queryKey: [NAMESPACE.GET_LIST_FRIENDS],
    refetchInterval: 10000,

    // refetchOnWindowFocus: isActive,
    // enabled: !!bidId,
  })
}

export default useGetListFriend
