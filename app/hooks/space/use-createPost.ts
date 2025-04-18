import { ENDPOINTS } from "../../utils/constant"
// import { ILoginRes } from "@/types/api.types"
import useCustomMutation from "../../hooks/requestHooks/use-mutationaction"

const useCreatePost = () => {
  return useCustomMutation<any, FormData>({
    method: "post",
    endpoint: ENDPOINTS.CREATE_POST,
    invalidateKeys: ["products"],
    // shouldInvalidate: (data) => !!data?.success,
    // showSuccessToast: false,
  })
}

export default useCreatePost
