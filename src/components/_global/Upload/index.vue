<template>
  <el-upload
    ref="upload"
    class="el-custom-upload"
    :action="uploadAction"
    :limit="limit"
    :accept="acceptList"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :on-exceed="handleExceed"
    :on-error="handleFail"
    :file-list="tempFileList"
    :auto-upload="autoUpload"
    :before-upload="verifyUpload"
    :show-file-list="showFileList"
    :on-change="handleChange"
    :headers="headers"
  >
    <slot>
      <el-button slot="trigger" class="upload-button" size="normal" type="operate">
        <svg-icon icon-class="wenjianjia" />
        <span>选择文件</span>
      </el-button>
      <div class="handle-upload-wrap">
        <div class="handle-upload-inner">
          <div class="tip-wrap">
            <slot name="prefix" />
          </div>

          <div class="upload-other">
            <!-- <el-button
            class="upload-button"
            style="margin-left: 10px;"
            size="normal"
            type="save"
            @click.stop="submitUpload"
            >上传文件</el-button>-->
            <slot name="suffix" />
          </div>
        </div>
      </div>

      <!-- <div v-show="isShowUploadTip" slot="tip" class="el-upload__tip">
        <svg-icon icon-class="chucuozhushi" class-name="svg-icon-mr" />
        <span>{{uploadTip}}</span>
      </div>-->
    </slot>
  </el-upload>
</template>

<script>
import defaultSettings from '@/settings'
import { mapGetters } from 'vuex'

export default {
  props: {
    action: {
      type: String,
      default: ''
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    limit: {
      type: Number,
      default: 1
    },
    showFileList: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tempFileList: [],
      isShowUploadTip: false,
      defaultAction: '/wy/ftp/file/upload',
      docList: {
        jpg: 'image/jpeg',
        jpeg: '',
        png: 'image/png',
        gif: 'image/gif',
        bmp: 'image/bmp',
        pdf: 'application/pdf',
        doc: 'application/msword',
        dot: '',
        docx:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        dotx:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
        docm: 'application/vnd.ms-word.document.macroenabled.12',
        dotm: 'application/vnd.ms-word.template.macroenabled.12',
        xls: 'application/vnd.ms-excel',
        xlt: 'application/vnd.ms-excel',
        xla: 'application/vnd.ms-excel',
        xlsx:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        xltx:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
        xltm: 'application/vnd.ms-excel.template.macroenabled.12',
        xlam: 'application/vnd.ms-excel.addin.macroenabled.12',
        xlsb: 'application/vnd.ms-excel.sheet.binary.macroenabled.12',
        ppt: 'application/vnd.ms-powerpoint',
        pot: 'application/vnd.ms-powerpoint',
        pps: 'application/vnd.ms-powerpoint',
        ppa: 'application/vnd.ms-powerpoint',
        pptx:
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        potx:
          'application/vnd.openxmlformats-officedocument.presentationml.template',
        ppsx:
          'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
        ppam: 'application/vnd.ms-powerpoint.addin.macroenabled.12',
        pptm: 'application/vnd.ms-powerpoint.presentation.macroenabled.12',
        potm: 'application/vnd.ms-powerpoint.template.macroenabled.12',
        ppsm: 'application/vnd.ms-powerpoint.slideshow.macroenabled.12',
        etx: 'text/x-setext',
        etc: 'application/x-earthtime',
        wps: 'application/vnd.ms-works',
        wpt: 'x-lml/x-gps',
        rtf: 'application/rtf',
        txt: 'text/plain',
        zip: 'application/zip',
        rar: 'application/x-rar-compressed',
        '7z': 'application/x-7z-compressed'
      }
    }
  },
  computed: {
    ...mapGetters(['token']),
    uploadTip() {
      const fileLength = this.tempFileList.length
      return fileLength === 0 ? '未上传文件' : `已上传${fileLength}个文件`
    },
    acceptList() {
      let list = ''
      Object.keys(this.docList).forEach((key, index) => {
        if (index === this.docList.length - 1) {
          list += this.docList[key]
        } else {
          list += this.docList[key] + ','
        }
      })
      return list
    },
    uploadAction() {
      const http = defaultSettings.http

      if (this.action) {
        return http + this.action
      } else {
        return http + this.defaultAction
      }
    },
    headers() {
      return {
        token: this.token
      }
    }
  },
  watch: {
    fileList: {
      immediate: true,
      handler() {
        this.tempFileList = this.fileList
      }
    },
    tempFileList() {
      this.isShowUploadTip = this.tempFileList.length > 0
      this.$emit('update:fileList', this.tempFileList)
      this.$emit('handleChangeFileList', { fileList: this.tempFileList })
    }
  },
  methods: {
    submitUpload() {
      this.$refs['upload'].submit()
    },
    verifyUpload(file) {
      let suffix = file.name.substr(file.name.lastIndexOf('.'))
      suffix = suffix.substr(1).toLowerCase()

      if (!Object.keys(this.docList).includes(suffix)) {
        this.$message.warning('暂不支持上传该文件')
        return false
      }
      if (file.size / 1024 / 1024 / 1024 > 2) {
        this.$message.warning('暂不支持大小超过2G的文件')
        return false
      }
    },
    handleSuccess(response, file, fileList) {
      this.isShowUploadTip = fileList.length > 0

      if (Number(response.code) === 200) {
        const id = this.$common.lodash.get(response, 'body.data.id')
        const length = this.$common.lodash.get(response, 'body.data.length', 0)
        const size = this.$common.lodash.get(response, 'body.data.size', 0)

        file.id = id
        file.fileId = id
        file.length = length
        file.size = size
        this.tempFileList = fileList

        this.$emit('handleSuccess', { response, file, fileList })
      } else {
        this.handleFail(response, file, fileList)
      }
    },
    handleFail(error, file, fileList) {
      this.$message.error(error.msg || '上传出错')

      this.$emit('handleFail', { error, file, fileList })
    },
    handleRemove(file, fileList) {
      this.isShowUploadTip = fileList.length > 0

      this.tempFileList = fileList
      this.$emit('handleRemove', { file, fileList })
    },
    handlePreview(file, fileList) {
      this.$emit('handlePreview', { file, fileList })
    },
    handleExceed(files, fileList) {
      this.$message.warning('超出文件可上传个数')
      this.$emit('handleExceed', { files, fileList })
    },
    handleChange(file, fileList) {
      this.isShowUploadTip = fileList.length > 0

      this.$emit('handleChange', { file, fileList })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-custom-upload {
  width: 100%;
  text-align: right;

  .upload-button {
    width: 120px;
  }
  .el-upload__tip {
    font-size: $text-body;
    margin-top: 10px;
  }
  /deep/ .el-upload-list,
  .el-upload__tip {
    width: 100%;
    text-align: left;
  }

  /deep/ .el-upload-list__item .el-icon-upload-success {
    color: $success-color;
  }

  /deep/ .el-upload-list__item-name {
    color: $tip-color;
    padding-left: 0px;
    @include singleOverHidden($max-width: 340px);

    .el-icon-document {
      margin-right: 6px;
    }
  }
  /deep/ .el-upload {
    // float: right;
  }
}
.handle-upload-wrap {
  padding-left: 10px;
  float: right;
}
.handle-upload-inner {
  width: 100%;
  @include createFlex($items: center, $content: between);

  .upload-other {
    @include createFlex($items: center);

    .upload-button {
      padding: 0px;
      width: 105px;
      font-size: $text-body;
    }
  }
}
</style>
