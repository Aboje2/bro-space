import { ENDPOINTS, NAMESPACE } from "../../utils/constant"
import useQueryActionHook from "../../hooks/requestHooks/use-queryaction"
import { BroCatList } from "app/services/api/api.types"

const useGetCategories = () => {
  return useQueryActionHook<BroCatList>({
    method: "get",
    endpoint: ENDPOINTS.GET_LIST_CATEGORY,
    queryKey: [NAMESPACE.GET_LIST_CATEGORY],
    refetchInterval: 10000,

    // refetchOnWindowFocus: isActive,
    // enabled: !!bidId,
  })
}

export default useGetCategories
