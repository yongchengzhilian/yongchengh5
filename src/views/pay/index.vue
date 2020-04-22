<template>
  <div>
    <div class="header">
      <img
        :src="avatar"
        class="image"
      >
      <div>
        <div class="name">{{ name }}</div>
        <div class="content">
          <span class="shengyu">剩余红线</span>
          <span>{{ count }}</span>
        </div>
      </div>
    </div>
    <div class="buy-box">
      <div v-if="orderNum >= 3" class="din price">￥19.8</div>
      <div v-if="orderNum < 3" class="din price">￥9.9</div>
      <div v-if="orderNum < 3" class="din text-throw">￥19.8</div>
    </div>
    <div class="buy-box mt-20">
      <div class="buy-button" @click="buy">立即购买</div>
    </div>
    <div class="container">
      <div class="title">价格说明</div>
      <div class="tip-box mt20">
        <div class="icon icon2" />
        <div class="font-26-999">新用户前3条红线半价</div>
      </div>
    </div>
    <div class="container">
      <div class="title">红线说明</div>
      <div class="mt20 tip-box">
        <div class="icon icon1" />
        <div class="font-26-999">红线是本平台用于查看对方联系方式的道具, 购买后不可退还</div>
      </div>
      <div class="tip-box">
        <div class="icon icon2" />
        <div class="font-26-999">当您申请查看对方联系方式的时候, 将消耗您一条红线</div>
      </div>
      <div class="tip-box">
        <div class="icon icon3" />
        <div class="font-26-999">每条红线保证获取一名异性的联系方式, 若对方不同意红线立即退回, 若对方无反应，红线将在24小时后退回</div>
      </div>
      <div class="tip-box">
        <div class="icon icon4" />
        <div class="font-26-999">第一次提交资料审核成功后可免费获得1根红线</div>
      </div>
    </div>
    <div class="container">
      <div class="title">安全提示</div>
      <div class="mt20 tip-box">
        <div class="icon icon1" />
        <div class="font-26-999">请不要轻易透露您的联系方式</div>
      </div>
      <div class="tip-box">
        <div class="icon icon2" />
        <div class="font-26-999">线下见面的地点尽量选择人多的地方</div>
      </div>
      <div class="tip-box">
        <div class="icon icon3" />
        <div class="font-26-999">若对方提及借款、投资或索要礼物, 请务必提高警惕, 并及时举报</div>
      </div>
      <div class="tip-box">
        <div class="icon icon4" />
        <div class="font-26-999">自尊自爱、理性交友、不轻易发生亲密关系</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPayInfo,
  getPayNum
} from '../../api/pay'
import {
  getParameterByName
} from '../../utils/utils'
import { Dialog } from 'vant'

export default {
  name: 'Index',
  data() {
    return {
      uid: '',
      name: '',
      avatar: '',
      orderNum: '',
      count: ''
    }
  },
  created() {
    // window.open()
  },
  async mounted() {
    this.uid = getParameterByName('id')
    this.name = getParameterByName('name')
    this.avatar = getParameterByName('avatar')
    this.count = getParameterByName('count')
    // console.log(this.uid)
    if (+this.uid === 100) {
      location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb55e464ea69e3136&redirect_uri=https://www.aidou.online/api/app/jsPay/getOAuth&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1'
    } else {
      Dialog({ message: this.uid })
    }
    this.orderNum = await getPayNum(this.uid)

    // Dialog({ message: '提示' })
    // Dialog.alert('dddd')
  },
  methods: {
    async buy() {
      const data = await getPayInfo(this.uid)
      const result = data.data.data
      wx.config({
        debug: false,
        appId: result.appId,
        timestamp: result.timeStamp,
        nonceStr: result.nonceStr,
        signature: result.paySign,
        jsApiList: ['chooseWXPay ']
      })
      wx.ready(() => {
        wx.chooseWXPay({
          timestamp: result.timeStamp,
          nonceStr: result.nonceStr,
          package: result.package,
          signType: result.signType,
          paySign: result.paySign,
          success: (res) => {
            if (res.errMsg === 'chooseWXPay:ok') {
              Dialog({ message: '支付成功' })
              this.getUserinfo()
            }
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
  .header{
    .padding(30rem);
    background: #333;
    display: flex;
    color: #fff;
    align-items: center;
    .image{
      .width(180rem);
      .height(180rem);
      .border-radius(180rem);
      .margin-right(40rem);
    }
    .content{
      .font-size(26rem);
      .margin-top(30rem);
    }
    .shengyu{
      .margin-right(10rem);
    }
    .name{
      font-weight: 600;
      .font-size(36rem);
    }
  }
  .buy-box{
    .padding(30rem);
    background: #f9f9f9;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    .price{
      .font-size(72rem);
      color: #333;
      .margin-right(20rem);
    }
    .text-throw{
      position: relative;
      .bottom(8rem);
      .font-size(36rem);
      color: #999;
      text-decoration: line-through;
    }
    .buy-button{
      .width(400rem);
      .height(80rem);
      .font-size(28rem);
      color: #fff;
      background: #333;
      .border-radius(10rem);
      box-sizing: border-box;
      text-align: center;
      .line-height(80rem);
    }
  }
  .mt-20{
    .margin-top(-20rem);
  }
  .container{
    .padding(40rem);
    .title{
      .font-size(26rem);
      font-weight: 600;
      color: #333;
    }
  }
  .tip-box{
    position: relative;
    .margin-bottom(16rem);
    .padding-left(30rem);
    .icon{
      position: absolute;
      .width(16rem);
      .height(16rem);
      left: 0;
      .top(10rem);
      transform: rotate(45deg);
    }
    .icon1{
      background: #c0ffc9;
    }
    .icon2{
      background: #bbf5ff;
    }
    .icon3{
      background: #ffdbc1;
    }
    .icon4{
      background: #cfc8ff;
    }
  }
</style>
