<template>
  <div>z</div>
</template>

<script>
import { getPayInfo } from '../../api/pay'

export default {
  name: 'Index',
  async mounted() {
    const data = await getPayInfo()
    const result = data.data.data
    console.log(result)
    wx.config({
      debug: false,
      appId: result.appId,
      timestamp: result.timeStamp,
      nonceStr: result.nonceStr,
      signature: result.paySign,
      jsApiList: ['chooseWXPay ']
    })
    console.log(222)
    wx.ready(() => {
      console.log(wx)
      wx.chooseWXPay({
        timestamp: result.timeStamp,
        nonceStr: result.nonceStr,
        package: result.package,
        signType: result.signType,
        paySign: result.paySign
      })
    })
  }
}
</script>

<style scoped>

</style>
