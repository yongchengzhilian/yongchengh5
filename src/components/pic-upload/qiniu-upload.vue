<template>
  <div class="upload-info">
    <div>

      <!--<div>-->
      <!--<img v-if="uploadPicUrl" class="pic-box" :src="uploadPicUrl">-->
      <!--</div>-->
    </div>
    <!--<div>-->
    <!--<el-button type="primary" :loading="loading" @click="handleSubmit">提交</el-button>-->
    <!--<el-button type="info" plain>取消</el-button>-->
    <!--</div>-->
    <el-upload
      ref="upload"
      class="upload-pic"
      :action="domain"
      :data="QiniuData"
      :list-type="listType"
      :on-remove="handleRemove"
      :on-error="uploadError"
      :on-success="uploadSuccess"
      :before-remove="beforeRemove"
      :before-upload="beforeAvatarUpload"
      :limit="limit"
      multiple
      :on-exceed="handleExceed"
      :file-list="list"
    >
      <!--<el-upload-->
      <!--action="https://jsonplaceholder.typicode.com/posts/"-->
      <!--list-type="picture-card"-->
      <!--&gt;-->
      <!--<i class="el-icon-plus" />-->
      <!--</el-upload>-->
      <!--<el-button size="small" type="primary">选择图片</el-button>-->
      <slot />
    </el-upload>
  </div>
</template>

<script>
import {
  getQiniuToken
} from '../../api/product'

export default {
  props: {
    listType: {
      type: String,
      value: 'picture-card'
    },
    limit: {
      type: Number,
      value: 9
    },
    fileList: {
      type: Array,
      value: []
    }
  },
  data() {
    return {
      loading: false,
      QiniuData: {
        key: '', // 图片名字处理
        token: '' // 七牛云token
      },
      domain: 'http://up-z2.qiniup.com', // 七牛云的上传地址（华南区）
      qiniuaddr: 'http://pze6q2d92.bkt.clouddn.com', // 七牛云的图片外链地址
      uploadPicUrl: '', // 提交到后台图片地址,
      list: []
    }
  },
  computed: {
    // list() {
    //   return this.fileList.map(item => {
    //     return {
    //       name: `pic_${parseInt(Math.random() * 10000)}.jpeg`,
    //       url: item
    //     }
    //   })
    // }
  },
  watch: {
    fileList(data) {
      console.log('img', data)
      if (!data.length) {
        this.$refs.upload.clearFiles()
        this.list = []
      } else if (data.length && !this.list.length) {
        this.list = data.map(item => {
          return {
            name: `pic_${parseInt(Math.random() * 10000)}.jpeg`,
            url: item
          }
        })
      }
    }
  },
  mounted() {
    this.getQiniuToken()
    this.list = this.fileList.map(item => {
      return {
        name: `pic_${parseInt(Math.random() * 10000)}.jpeg`,
        url: item
      }
    })
  },
  methods: {
    handleRemove(file, fileList) {
      const removePicUrl = `${this.qiniuaddr}/${file.response.key}`
      console.log('remove', file, fileList)
      this.$emit('remove', fileList)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 张图片，如需更换，请删除上一张图片在重新选择！`
      )
    },
    beforeAvatarUpload(file) {
      const isPNG = file.type === 'image/png'
      const isJPEG = file.type === 'image/jpeg'
      const isJPG = file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isPNG && !isJPEG && !isJPG) {
        this.$message.error('上传头像图片只能是 jpg、png、jpeg 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return false
      }
      this.QiniuData.key = `upload_pic_${file.name}`
    },
    uploadSuccess(response, file, fileList) {
      console.log('success', response, file, fileList, this.list)
      const uploadPicUrl = `${this.qiniuaddr}/${response.key}`
      this.$emit('upload-success', uploadPicUrl)
    },
    uploadError(err, file, fileList) {
      this.$message({
        message: '上传出错，请重试！',
        type: 'error',
        center: true
      })
    },
    beforeRemove(file, fileList) {
      // console.log('beforeremove', file, fileList)
      return this.$confirm(`确定移除 ${file.name}?`)
    },

    // 请求后台拿七牛云token
    getQiniuToken() {
      getQiniuToken()
        .then(res => {
          this.QiniuData.token = res.data
        })
    }
  }
}
</script>
