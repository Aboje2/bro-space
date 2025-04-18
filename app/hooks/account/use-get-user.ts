import { ENDPOINTS, NAMESPACE } from "../../utils/constant"
import useQueryActionHook from "../../hooks/requestHooks/use-queryaction"
import { BroUserResponse } from "app/services/api/api.types"

const useGetUser = () => {
  return useQueryActionHook<BroUserResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_USER,
    queryKey: [NAMESPACE.GET_USER],
    refetchInterval: 10000,

    // refetchOnWindowFocus: isActive,
    // enabled: !!bidId,
  })
}

export default useGetUser
