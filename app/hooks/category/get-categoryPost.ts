import { ENDPOINTS, NAMESPACE } from "../../utils/constant"
import useQueryActionHook from "../../hooks/requestHooks/use-queryaction"
import { BroDetail } from "app/services/api/api.types"

const useGetCategoryPost = (catId: string, catPostId: string) => {
  return useQueryActionHook<BroDetail>({
    method: "get",
    endpoint: ENDPOINTS.GET_CATEGORY_POST(catId, catPostId),
    queryKey: [NAMESPACE.GET_CATEGORY_POST],
    refetchInterval: 10000,

    // refetchOnWindowFocus: isActive,
    // enabled: !!bidId,
  })
}

export default useGetCategoryPost
