import useQueryActionHook from "../../hooks/requestHooks/use-queryaction"
import { allPostRes } from "app/services/api/api.types"
import { ENDPOINTS, NAMESPACE } from "../../utils/constant"

const useGetPostList = () => {
  return useQueryActionHook<allPostRes>({
    method: "get",
    endpoint: ENDPOINTS.GET_LIST_POST(1),
    queryKey: [NAMESPACE.GET_LIST_POST],
    refetchInterval: 10000,

    // refetchOnWindowFocus: isActive,
    // enabled: !!bidId,
  })
}

export default useGetPostList
