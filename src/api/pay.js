import request from '@/utils/request'

export function getPayNum(uid) {
  return request({
    url: `yongcheng/pay/orderNum`,
    method: 'post',
    data: {
      uid
    }
  })
}

export function getPayInfo(uid) {
  return request({
    url: `yongcheng/pay/order/xcx`,
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
