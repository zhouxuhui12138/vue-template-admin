import request from "@/utils/request"

// 获取一级分类
export const getCategoryOneListApi = () => {
  return request({
    url: "/admin/product/getCategory1",
    method: "get",
  })
}

/**
 * 获取二级分类
 * @param {string} id 一级分类的id
 */
export const getCategoryTwoListApi = id => {
  return request({
    url: "/admin/product/getCategory2/" + id,
    method: "get",
  })
}

/**
 * 获取三级分类
 * @param {string} id 二级分类的id
 */
export const getCategoryThreeListApi = id => {
  return request({
    url: "/admin/product/getCategory3/" + id,
    method: "get",
  })
}

/**
 * 获取分类属性
 */
export const getAttrListApi = (id1, id2, id3) => {
  return request({
    url: `/admin/product/attrInfoList/${id1}/${id2}/${id3}`,
    method: "get",
  })
}

/**
 * 添加与修改属性接口
 */
export const updataAndAddAttr = (data) => {
  return request({
    url: `/admin/product/saveAttrInfo`,
    method: "post",
    data
  })
}
