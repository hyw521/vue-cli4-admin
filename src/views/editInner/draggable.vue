<template>
  <div id="directory">
    <div>
      <span>目录</span>
    </div>
    <draggable
      :list="directory"
      :disabled="!enabled"
      :move="checkMove(directory)"
      class="all-leval-one"
      ghost-class="ghost"
      @start="start(directory)"
      @end="dragging = false"
    >
      <li
        v-for="item in directory"
        :key="item.index"
        closable
        class="leval-one"
        @close="onDel(index, directory)"
      >
        <div
          :title="item.name.content | filterOneDirectory"
          :class="'one-directory' + item.name.index"
          @click="hrefTo(item)"
        >
          {{ item.name.content | filterOneDirectory }}
        </div>
        <draggable
          :list="item.levalTwoList"
          :disabled="!enabled"
          :move="checkMove(item.levalTwoList)"
          class="all-leval-two"
          ghost-class="ghost"
          @start="start(item.levalTwoList)"
          @end="dragging = false"
        >
          <li
            v-for="n in item.levalTwoList"
            v-if="n.name.content"
            :key="n.index"
            closable
            class="leval-two"
            @close="onDel(index, item.levalTwoList)"
          >
            <span
              :title="n.name.content | filterTwoDirectory"
              :class="'two-directory' + n.name.index"
              @click="hrefTo(n)"
            >{{ n.name.content | filterTwoDirectory }}</span>
          </li>
        </draggable>
      </li>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  filters: {
    filterOneDirectory(val) {
      let target = ''
      const rgValue = val.match(/^<h1.*>.*<\/h1>/i)
      if (rgValue !== null) {
        target = rgValue[0].replace(/<\/h1>|&nbsp;/gi, '')
        target = target.replace(/<h1.*>/gi, '')
      }
      return target
    },
    filterTwoDirectory(val) {
      let target = ''
      const rgValue = val.match(/^<h2.*>.*<\/h2>/i)
      if (rgValue !== null) {
        target = rgValue[0].replace(/<\/h2>|&nbsp;/i, '')
        target = target.replace(/<h2.*>/i, '')
      }
      return target
    }
  },
  props: {
    directory: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      enabled: true,
      dragging: false,
      topHeightList: []
    }
  },
  mounted() {
    setTimeout(() => {
      this.getTopHeightList()
      const scrollCallback = () => {
        this.$debounce(() => {
          const top = $scrollBox.scrollTop
          const tt = $scrollBox.clientHeight
          let num = 0
          for (let n = 0; n < 7; n++) {
            if (top >= n * tt && top <= (n + 1) * tt) {
              num = n
            }
            this.isSelected = liIds[num] + '-selected'
          }
        }, 100)
      }
      $scrollBox.addEventListener('scroll', scrollCallback)
    }, 1000)
  },
  methods: {
    getTopHeightList() {
      this.topHeightList = []
      const oneTinymceDivs = document.querySelectorAll(
        '.content-inner>.one-tinymce-div'
      )
      for (let i = 0; i < oneTinymceDivs.length; i++) {
        const topHeight = (function(i, oneTinymceDivs) {
          let value = 0
          for (let j = 0; j < i; j++) {
            value += oneTinymceDivs[j].offsetHeight
          }
          return value
        })(i, oneTinymceDivs)
        const index = oneTinymceDivs[i].className.substring(27)
        this.topHeightList.push({ topHeight, index })
      }
      console.log(this.topHeightList)
    },
    start(e) {
      if (e[0].name === '') {
        return false
      }
    },
    checkMove: function(e) {},
    onDel(index, directory) {
      directory.splice(index, 1)
    },
    // 锚点跳转
    hrefTo(query) {
      let topHeight = 0
      if (query.name.leval === 'one') {
        const Class = 'one-tinymce' + query.name.index
        const tinymceDivs = document.querySelectorAll(
          '.content-inner>.one-tinymce-div'
        )
        for (let i = 0; i < tinymceDivs.length; i++) {
          if (tinymceDivs[i].className.includes(Class)) {
            // console.log(tinymceDivs[i].className, "break");
            break
          } else {
            topHeight += tinymceDivs[i].offsetHeight
            // console.log(tinymceDivs[i].className);
          }
        }
      } else {
        const Class = 'two-tinymce' + query.name.index
        const selfDom = document.querySelector('.' + Class)
        const parent = selfDom.parentNode
        const allChildDoms = parent.childNodes
        const oneLevalTinymceDivs = document.querySelectorAll(
          '.content-inner>.one-tinymce-div'
        )
        for (let i = 0; i < oneLevalTinymceDivs.length; i++) {
          if (oneLevalTinymceDivs[i].className.includes(parent.className)) {
            // console.log(tinymceDivs[i].className, "break");
            break
          } else {
            topHeight += oneLevalTinymceDivs[i].offsetHeight
            // console.log(tinymceDivs[i].className);
          }
        }
        for (let j = 0; j < allChildDoms.length; j++) {
          if (allChildDoms[j].className.includes(Class)) {
            // console.log(tinymceDivs[i].className, "break");
            break
          } else {
            topHeight += allChildDoms[j].offsetHeight
            // console.log(tinymceDivs[i].className);
          }
        }
      }
      // document.querySelector("#red").scrollIntoView(false);
      window.scrollTo(0, topHeight)
      console.log(window.scrollY, topHeight)
    }
  }
}
</script>

<style lang="scss">
#directory {
  width: 100%;
  .all-leval-one {
    padding-top: 30px;
    .leval-one {
      width: 100%;
      cursor: pointer;
      text-align: left;
      margin-bottom: 16px;
      list-style: none;
      font-size: 16px;
      & > div {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .all-leval-two {
        .leval-two {
          font-size: 14px;
          color: #837f7f;
          margin-top: 6px;
          position: relative;
          &:before {
            content: "";
            position: absolute;
            width: 3px;
            height: 3px;
            left: 8px;
            top: 11px;
            border-radius: 1px;
            background: #bbb;
          }
          span {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: inline-block;
            line-height: 20px;
            padding-top: 2px;
            padding-left: 20px;
          }
        }
      }
    }
  }
}
</style>
