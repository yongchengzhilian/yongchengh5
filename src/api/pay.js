import request from '@/utils/request'

export function getPayInfo(userId) {
  return request({
    url: `app/order/pay`,
    method: 'post',
    data: {
      platform: 'h5',
      itemId: 1,
      userId
    }
  })
}

export function getUserInfo(uid) {
  return request({
    url: `app/jsPay/selectPayUserInfo/${uid}`
  })
}
