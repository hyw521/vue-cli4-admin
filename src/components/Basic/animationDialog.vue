<template>
  <vodal
    :show="showObj.value"
    :duration="showObj.duration"
    :animation="showObj.animation"
    @hide="hide"
  >
    <div v-if="!showObj.customTop" class="vodal-title">
      <svg-icon :icon-class="showObj.iconClass || ''" /><span>{{
        showObj.text
      }}</span>
    </div>
    <div v-if="!showObj.customTop" class="line" />
    <div slot="customTop" />
    <slot />
  </vodal>
</template>

<script>
import Vodal from 'vodal'
export default {
  name: 'AnimationDialog',
  components: {
    Vodal
  },
  props: {
    showObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  watch: {
    showObj: {
      handler(n, o) {
        if (n.noScroll) {
          return
        }
        if (n.value) {
          this.stopSrcoll()
        } else {
          this.openSrcoll()
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      const body = document.querySelector('.container')
      if (body.append) {
        body.append(this.$el)
      } else {
        body.appendChild(this.$el)
      }
    })
  },
  methods: {
    hide() {
      const dom = document.elementFromPoint(event.clientX, event.clientY)
      if (dom.className === 'vodal-close') {
        this.showObj.value = false
        this.$emit('closed', this.showObj)
        if (this.showObj.noScroll) {
          return
        }
        this.openSrcoll()
      } else {
        this.$confirm('是否关闭弹框?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.showObj.value = false
            this.$emit('closed', this.showObj)
            if (this.showObj.noScroll) {
              return
            }
            this.openSrcoll()
          })
          .catch(() => {})
      }
    },
    stopSrcoll() {
      var mo = function(e) {
        e.preventDefault()
      }
      document.body.style.overflow = 'hidden'
      document.addEventListener('touchmove', mo, false) // 禁止页面滑动
    },
    openSrcoll() {
      var mo = function(e) {
        e.preventDefault()
      }
      document.body.style.overflow = '' // 出现滚动条
      document.removeEventListener('touchmove', mo, false)
    }
  }
}
</script>

<style>
@import 'vodal/common.css';
@import 'vodal/rotate.css';
@import 'vodal/zoom.css';
@import 'vodal/flip.css';
@import 'vodal/door.css';
.vodal-dialog {
  width: 90% !important;
  height: 94.6% !important;
  background-color: #f9f9f9;
  border-radius: 6px;
}
</style>

