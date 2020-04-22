import request from '@/utils/request'

export function getPayNum(uid) {
  return request({
    url: `yongcheng/order/orderNum`,
    method: 'post',
    data: {
      uid
    }
  })
}

export function getUserInfo(uid) {
  return request({
    url: `app/jsPay/selectPayUserInfo/${uid}`
  })
}
