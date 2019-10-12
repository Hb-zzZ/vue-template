<template>
  <div class="upload-show text-body">
    <div v-for="(file,index) in fileList" :key="index" class="upload-list">
      <button class="flex items-center cursor-p" @click="handlePreview(file)">
        <i class="el-icon-document svg-icon-mr" />
        <span class="file-name" :title="file.name">{{file.name}}</span>
      </button>
      <div class="flex items-center">
        <span class="download-size">({{file.size || 0}})</span>
        <button class="download-href" @click.stop.prevent="handleDownload(file)">下载</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  filters: {
    sizeFilter(length) {
      const decimals = 10000

      return Math.floor((length / 1024 / 1024) * decimals) / decimals
    }
  },
  props: {
    fileList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    handleDownload(file) {
      this.$emit('handleDownload', file)

      if (!file.id) {
        this.$message.warning('当前没有可下载文件')
      } else {
        // this.$fetch.misc.download({ id: file.id })
      }
    },
    handlePreview(file) {
      // const previewHttp = this.$common.getPreviewHttp(file)

      // if (previewHttp) {
      //   window.open(previewHttp)
      // } else {
      //   this.$message.warning('该文件暂不支持预览')
      // }
    }
  }
}
</script>


<style lang="scss" scoped>
.upload-show {
  width: 100%;
  @include createFlex($direction: col);
  padding: 0px 20px;

  .upload-list {
    width: 100%;
    @include createFlex($content: between);

    .file-name {
      @include singleOverHidden($max-width: 340px);
    }

    .download-size {
      margin-right: 10px;
    }

    &:not(:first-child) {
      margin-top: 15px;
    }
  }
}
</style>
