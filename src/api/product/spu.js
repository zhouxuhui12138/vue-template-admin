import request from "@/utils/request"

/**
 * 获取spu列表
 * @param {number} page 页数
 * @param {number} limit 一页显示多少
 * @param {number} category3Id 三级分类id 
 */
export const getSpuListApi = (page, limit, category3Id) => {
  return request({
    url: `/admin/product/${page}/${limit}`,
    method: "get",
    params: {
      category3Id
    }
  })
}