import request from "@/utils/request"

// 获取一级分类接口
export const getCategoryOneListApi = () => {
  return request({
    url: "/admin/product/getCategory1",
    method: "get",
  })
}

/**
 * 获取二级分类的接口
 * @param {string} id 一级分类的id
 */
export const getCategoryTwoListApi = id => {
  return request({
    url: "/admin/product/getCategory2/" + id,
    method: "get",
  })
}

/**
 * 获取三级分类的接口
 * @param {string} id 二级分类的id
 */
export const getCategoryThreeListApi = id => {
  return request({
    url: "/admin/product/getCategory3/" + id,
    method: "get",
  })
}

/**
 * 获取三级分类的接口
 * @param {string} id 二级分类的id
 */
export const getAttrListApi = (id1, id2, id3) => {
  return request({
    url: `/admin/product/attrInfoList/${id1}/${id2}/${id3}`,
    method: "get",
  })
}
