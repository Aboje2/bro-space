import { ENDPOINTS } from "../../utils/constant"
import { accountResponse } from "app/services/api/api.types"
import useCustomMutation from "../../hooks/requestHooks/use-mutationaction"

const useCreateCategoryPost = () => {
  return useCustomMutation({
    method: "post",
    endpoint: ENDPOINTS.CREATE_CATEGORY_POST,
    // showSuccessToast: false,
  })
}

export default useCreateCategoryPost