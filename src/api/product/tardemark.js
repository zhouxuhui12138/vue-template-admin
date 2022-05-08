import request from "@/utils/request"

// 获取品牌列表
export const getTardMarkListApi = (page, limit) => {
  return request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: "get",
  })
}

// 添加品牌
export const addBrandApi = data => {
  return request({
    url: `/admin/product/baseTrademark/save`,
    method: "post",
    data,
  })
}

// 修改品牌
export const updateBrandApi = data => {
  return request({
    url: `/admin/product/baseTrademark/update`,
    method: "put",
    data,
  })
}

// 删除品牌
export const deleteBrandApi = id => {
  return request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: "delete",
  })
}
