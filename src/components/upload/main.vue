<template>
  <div>
    <el-upload
      :before-upload="beforeAvatarUpload"
      :on-success="handleAvatarSuccess"
      @click.native="clickUpload"
      :disabled="disabled"
      :style="imgSize"
      name="file"
      :action="action"
      :headers="headers"
      :show-file-list="false"
      class="avatar-uploader fl"
      accept="image/png, image/jpeg">

      <img
        v-if="imgUrl"
        :src="imgUrl + zoomImgSize(size, size)"
        class="avatar"
        :style="imgSize"
        :class="{'not-allowed': disabled}" />

      <i
        v-else
        :style="imgSize"
        class="el-icon-plus avatar-uploader-icon upload-icon"></i>

      <div v-if="imgUrl && !disabled" :class="{'opacity1': maskStatus}" class="mask-box">
        <i v-if="!progress" :style="imgSize" class="el-icon-upload upload-icon"></i>

        <i v-else
         :style="imgSize"
         :class="{'el-icon-success': progress === 'suc', 'el-icon-loading': progress === 'uploading'}"
         class="dib upload-icon progress-style"></i>
      </div>
    </el-upload>

    <el-popover
      ref="tipPopover"
      placement="right"
      title=""
      width="150"
      trigger="hover">
      <div class="fz12">
        建议尺寸：{{ tipsWidth || '600' }}PX * {{ tipsHeight || '460' }}PX<br>
        支持格式：JPG/PNG
      </div>
    </el-popover>
    <span v-popover:tipPopover class="fl ml12" :style="tipsStyle">
      <lh-svg v-if="!!tipsWidth" icon-class="icon-info" class="theme-gray"></lh-svg>
    </span>
  </div>
</template>

<script>
  import { API_PATH } from '@/config/env'
  export default {
    // 这样就可以很轻易的修改组件名，又不用修改文件名
    name: 'LhUpload',
    props: ['disabled', 'imgUrl', 'size', 'tipsWidth', 'tipsHeight'],
    data () {
      return {
        action: API_PATH + '/supervisor/file/upload',
        progress: '',
        maskStatus: false,
        headers: {
          token: sessionStorage.getItem('token')
        }
      }
    },
    computed: {
      imgSize() {
        let size = this.size || 80
        return {
          width: size + 'px',
          height: size + 'px',
          lineHeight: size + 'px'
        }
      },
      tipsStyle() {
        let size = this.size || 80
        return {
          lineHeight: size + 'px'
        }
      }
    },
    mounted() {
      // console.log('test', this.tipsWidth);
    },
    methods: {
      clickUpload() {
        this.maskStatus = true
      },
      beforeAvatarUpload(file) {
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isLt1M) {
          this.setMsg('上传图片大小不能超过 1MB!');
          return false
        }

        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
          this.progress = 'uploading'
          return true
        }

        this.setMsg('上传图片只能是 JPG和PNG 格式!');
        return false
      },
      handleAvatarSuccess(res, file) {
        if (res.status === 'true') {
          this.progress = 'suc'
          setTimeout(_ => {
            this.maskStatus = false
          }, 500)
          setTimeout(_ => {
            this.progress = ''
          }, 600)
          this.$emit('uploadImg', res.info.path)
        } else {
          this.setMsg('上传图片失败！')
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "src/styles/variables";
  .avatar-uploader {
    position: relative;
    margin-bottom: 2px;

    &:hover {
      .mask-box {
        opacity: 1;
      }
    }
    @mixin comStyle {
      width: 80px;
      height: 80px;
      line-height: 80px;
      font-size: 24px;
      color: #fff;
      text-align: center;
      cursor: pointer;
      border-radius: 6px;
      overflow: hidden;
    }
    .upload-icon {
      @include comStyle;
    }
    .progress-style {
      position: absolute;
      z-index: 3;
      top: 0;
      left: 0;
      opacity: 1;
      background-color: transparent;
    }
    .avatar-uploader-icon {
      @include comStyle;
      color: #8c939d;
      border: 1px dashed #d9d9d9;

      &:hover {
        border-color: $theme-blue;
      }
    }
    .el-icon-success {
      color: $theme-green;
    }
    .mask-box {
      opacity: 0;
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      text-align: center;
      color: #fff;
      background-color: rgba(0, 0, 0, .5);
      transition: opacity .3s;
      border-radius: 6px;
    }
    .opacity1 {
      opacity: 1;
    }
    .theme-gray {
      vertical-align: middle;
    }
    .avatar {
      display: block;
      border-radius: 6px;
    }
  }
</style>
