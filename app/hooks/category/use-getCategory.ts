import { ENDPOINTS, NAMESPACE } from "../../utils/constant"
import useQueryActionHook from "../requestHooks/use-queryaction"
import { allPostRes } from "app/services/api/api.types"

const useGetCategory = (catId: string) => {
  return useQueryActionHook<allPostRes>({
    method: "get",
    endpoint: ENDPOINTS.GET_LIST_CATEGORY(catId),
    queryKey: [NAMESPACE.GET_LIST_CATEGORY],
    refetchInterval: 10000,

    // refetchOnWindowFocus: isActive,
    // enabled: !!bidId,
  })
}

export default useGetCategory
