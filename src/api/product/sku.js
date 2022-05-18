import request from "@/utils/request"

/**
 * 获取sku图片列表
 * @param {number} spuId 页数
 */
export const getImageListApi = (spuId) => {
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: "get",
  })
}

/**
 * 获取平台属性
 * @param {number} category1Id
 * @param {number} category2Id
 * @param {number} category3Id
 */
export const getAttrInfoApi = (category1Id, category2Id, category3Id) => {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  })
}

/**
 * 获取销售属性
 * @param {number} spuId
 */
export const getSaleAttrApi = (spuId) => {
  return request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: "get",
  })
}

