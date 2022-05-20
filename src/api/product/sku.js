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

/**
 * 添加sku
 * @param {object} skuInfo
 */
export const addSkuApi = (skuInfo) => {
  return request({
    url: `/admin/product/saveSkuInfo`,
    method: "post",
    data: skuInfo
  })
}

/**
 * 查看spu下的sku
 * @param {number} spuId
 */
export const getSkuApi = (spuId) => {
  return request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: "get",
  })
}

