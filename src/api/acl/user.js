import request from "@/utils/request"

// 获取用户信息
export const getInfo = () => {
  return request({
    url: "/admin/acl/index/info",
    method: "get",
  })
}

// 获取用户列表 带搜索
export const getUserList = (page, limit, params) => {
  return request({
    url: `/admin/acl/user/${page}/${limit}`,
    method: "get",
    params,
  })
}

// 更新用户信息
export const updateUser = data => {
  return request({
    url: `/admin/acl/user/update`,
    method: "put",
    data,
  })
}

// 删除用户
export const deleteUser = id => {
  return request({
    url: `/admin/acl/user/remove/${id}`,
    method: "delete",
  })
}

// 获取用户的所有角色
export const getUserRoles = id => {
  return request({
    url: `/admin/acl/user/toAssign/${id}`,
    method: "get",
  })
}
