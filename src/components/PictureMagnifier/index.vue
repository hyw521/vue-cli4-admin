<template>
  <div id="PictureMagnifier">
    <div
      class="small-box"
      :style="{
        height: configs.width + 'px',
        width: configs.height + 'px',
      }"
      @mouseover="handOver"
      @mousemove="handMove"
      @mouseout="handOut"
    >
      <img class="smallPic" :src="smallSrc">
      <div
        v-show="showMask"
        class="magnifier-zoom"
        :style="{
          background: configs.maskColor,
          height: configs.maskWidth + 'px',
          width: configs.maskHeight + 'px',
          opacity: configs.maskOpacity,
          transform: transformMask,
        }"
      />
    </div>
    <!-- 大图, 注意误差 -->
    <div
      v-show="showMagnifier"
      class="magnifier-layer"
      :style="{
        width: configs.width + 'px',
        height: configs.height + 'px',
      }"
    >
      <!-- left: configs.width + 20 + 'px', -->
      <div
        class="big-box"
        :style="{
          width: bigWidth + 'px',
          height: bigHeight + 'px',
          left: moveLeft,
          top: moveTop,
        }"
      >
        <div
          class="big-box-img"
          :style="{
            width: bigWidth - 0 + 'px',
            height: bigHeight - 0 + 'px',
          }"
        >
          <img
            :src="bigSrc"
            :style="{
              width: bigWidth - 0 + 'px',
              height: bigHeight - 0 + 'px',
            }"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgObj: {},
      moveLeft: 0,
      moveTop: 0,
      transformMask: `translate(0px, 0px)`,
      showMagnifier: false,
      showMask: false,
      init: false,
      smallSrc:
        'https://file1.vedeng.com/upload/2020-09/11/image/360x360/1599787985000_8440.jpg',
      bigSrc:
        'https://file1.vedeng.com/upload/2020-09/11/image/800x800/1599787985000_8440.jpg',
      configs: {
        width: 360, // 放大区域
        height: 360, // 放大区域
        maskWidth: 120, // 遮罩
        maskHeight: 120, // 遮罩
        maskColor: 'rgba(25,122,255,0.5)', // 遮罩样式
        maskOpacity: 0.6,
        scale: 3 // 放大比例
      }
    }
  },
  computed: {
    bigWidth() {
      return this.configs.scale * this.configs.width
    },
    bigHeight() {
      return this.configs.scale * this.configs.height
    }
  },
  methods: {
    handMove(e) {
      document.documentElement.style.cursor = 'crosshair'
      // 动态获取小图的位置（或者监听 scroll ）
      const imgRectNow = this.imgObj.getBoundingClientRect()
      const objX = e.clientX - imgRectNow.left
      const objY = e.clientY - imgRectNow.top
      console.log(objX, objY)
      // 计算初始的遮罩左上角的坐标
      let maskX = objX - this.configs.maskWidth / 2
      let maskY = objY - this.configs.maskHeight / 2

      // 判断是否超出界限,并纠正
      maskX = maskX < 0 ? 0 : maskX
      maskY = maskY < 0 ? 0 : maskY

      if (maskX + this.configs.maskWidth >= imgRectNow.width) {
        maskX = imgRectNow.width - this.configs.maskWidth
      }
      if (maskY + this.configs.maskHeight >= imgRectNow.height) {
        maskY = imgRectNow.height - this.configs.maskHeight
      }

      // 遮罩移动
      this.transformMask = `translate(${maskX}px, ${maskY}px)`

      // 背景图移动
      this.moveLeft = -maskX * this.configs.scale + 'px'
      this.moveTop = -maskY * this.configs.scale + 'px'
    },
    handOut() {
      document.documentElement.style.cursor = 'default'
      this.showMagnifier = false
      this.showMask = false
    },
    handOver() {
      if (!this.init) {
        this.init = true
        this.imgObj = this.$el.getElementsByClassName('small-box')[0]
      }
      this.showMagnifier = true
      this.showMask = true
    }
  }
}
</script>

<style lang="scss">
#PictureMagnifier {
  display: flex;
  margin-top: 100px;
  margin-left: 100px;
  .small-box {
    border: 1px solid rebeccapurple;
    position: relative;
    .magnifier-zoom {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .magnifier-layer {
    overflow: hidden;
    border: 1px solid royalblue;
    position: relative;
    .big-box {
      position: absolute;
    }
  }
}
</style>
