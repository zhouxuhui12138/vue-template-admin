import request from '@/utils/request'

// 获取用户信息
export const getInfo = () => {
  return request({
    url: '/admin/acl/index/info',
    method: 'get',
  })
}

// 获取用户列表 带搜索
export const getUserList = (page, limit, params) => {
  return request({
    url: `/admin/acl/user/${page}/${limit}`,
    method: 'get',
    params
  })
}