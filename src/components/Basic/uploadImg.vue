<template>
  <div>
    <el-upload
      ref="elUpload"
      :action="api + 'DataFile/Post'"
      :headers="headers"
      :before-upload="beforeUpload"
      :on-success="uploadSuccess"
      :file-list="queryObj.fileList"
      :disabled="uploadImgObj.isShow"
      list-type="picture-card"
      accept=".png, .jpg, .jpeg, .gif, .bmp, .svg"
    >
      <i slot="default" class="el-icon-plus" />
      <div slot="file" slot-scope="{ file }">
        <img :src="file.url" class="el-upload-list__item-thumbnail" alt="" >
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in" />
          </span>
          <span
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download" />
          </span>
          <span
            v-if="!uploadImgObj.isShow"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete" />
          </span>
        </span>
      </div>
    </el-upload>
    <animationDialog
      :show-obj="showImgObj"
      class="img-dialog"
      @closed="closeDialog"
    >
      <div class="view-img">
        <img :src="dialogImageUrl" alt="" >
      </div>
    </animationDialog>
  </div>
</template>
<script>
import { getAccessToken } from '@/utils/auth'
import animationDialog from '@/components/Basic/animationDialog'
export default {
  components: {
    animationDialog
  },
  props: {
    uploadImgObj: {
      type: Object,
      default: () => {}
    },
    queryObj: {
      type: Object,
      default: () => []
    }
  },
  data() {
    return {
      showImgObj: {
        duration: 201,
        animation: 'door',
        value: false,
        name: 'img',
        iconClass: '产品',
        text: '图片预览'
      },
      api: window.g.BASE_API,
      HTTP: window.g.HTTP,
      headers: { Authorization: `Bearer ${getAccessToken()}` },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    beforeUpload(file) {
      if (
        /\.png|\.PNG|\.jpg|\.JPG|\.jpeg|\.JPEG|\.gif|\.GIF|\.bmp|\.BMP|\.svg|\.SVG/.test(
          file.name
        )
      ) {
        console.log(1)
      } else {
        this.$message.error('只允许上传图片!')
        return false
      }
    },
    uploadSuccess(response, file, fileList) {
      fileList.map((item) => {
        if (item.response && !item.response.Path.includes(this.HTTP)) {
          item.response.Path = this.HTTP + '/' + item.response.Path
        }
      })
      this.queryObj.fileList = fileList
      console.log(this.queryObj.fileList)
    },
    handleRemove(file) {
      const fileList = this.$refs.elUpload.uploadFiles
      const index = fileList.findIndex((fileItem) => {
        return fileItem.uid === file.uid
      })
      fileList.splice(index, 1)
      this.queryObj.fileList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.showImgObj.value = true
    },
    handleDownload(file) {
      const down = document.createElement('a')
      down.target = '_blank'
      down.href = file.url
      down.download = file.name // 默认为文件的名字
      document.body.appendChild(down)
      down.click()
      down.remove()
    },
    closeDialog() {
      this.showImgObj.value = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.img-dialog {
  ::v-deep {
    .vodal-dialog {
      .view-img {
        text-align: center;
        width: 100%;
        height: calc(100% - 50px);
        overflow: scroll;
        &::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        &::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          border-radius: 5px;
          // -webkit-box-shadow: inset 0 0 5px rgba(218, 218, 218, 0.2);
          // box-shadow: inset 0 0 5px rgba(218, 218, 218, 0.2);
          background: rgba($color: #000000, $alpha: 0.1);
          &:hover {
            background: rgba($color: #000000, $alpha: 0.2);
          }
        }
        &::-webkit-scrollbar-track {
          /*滚动条里面轨道*/
          // -webkit-box-shadow: inset 0 0 5px rgba(218, 218, 218, 0.2);
          // box-shadow: inset 0 0 5px rgba(47, 167, 223, 0.2);
          border-radius: 0;
          background: white;
        }
        img {
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
