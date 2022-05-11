import request from "@/utils/request"

/**
 * 获取spu列表
 * @param {number} page 页数
 * @param {number} limit 一页显示多少
 * @param {string} category3Id 三级分类id
 */
export const getSpuListApi = (page, limit, category3Id) => {
  return request({
    url: `/admin/product/${page}/${limit}`,
    method: "get",
    params: {
      category3Id,
    },
  })
}

/**
 * 获取spu信息
 * @param {string} id spuId
 */
export const getSpuApi = id => {
  return request({
    url: `/admin/product/getSpuById/${id}`,
    method: "get",
  })
}

/**
 * 获取品牌信息
 */
export const getBrandApi = () => {
  return request({
    url: `/admin/product/baseTrademark/getTrademarkList`,
    method: "get",
  })
}

/**
 * 获取spu图片
 * @param {string} id spuId
 */
export const getSpuImgApi = id => {
  return request({
    url: `/admin/product/spuImageList/${id}`,
    method: "get",
  })
}

/**
 * 获取平台销售属性
 */
export const getSaleAttrApi = () => {
  return request({
    url: `/admin/product/baseSaleAttrList`,
    method: "get",
  })
}
