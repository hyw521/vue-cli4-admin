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
      @end="end"
    >
      <li
        v-for="item in directory"
        :key="item.name.index"
        closable
        class="leval-one"
        :class="{ isCurrent: item.name.isCurrent }"
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
          @end="end"
        >
          <li
            v-for="n in item.levalTwoList"
            v-if="n.name.content"
            :key="n.name.index"
            closable
            class="leval-two"
            :class="{ isCurrent: n.name.isCurrent }"
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
      topHeightList: [],
      timer: null,
      ITEM: { name: { isCurrent: false }} // 解决当显示二级目录是，滚动条上滑满足了一级目录但二级目录没取消的问题
    }
  },
  mounted() {
    setTimeout(() => {
      this.getTopHeightList()
      window.addEventListener('scroll', this.scrollCallback)
      this.timer = setInterval(() => {
        this.getTopHeightList()
        // 隔10秒更新下数组，因为编辑内容后高度就发生变化了
      }, 10000)
    }, 1000)
  },
  beforeDestroy() {
    this.timer = null
    window.removeEventListener('scroll', this.scrollCallback)
  },
  methods: {
    // 获取每个目录到顶部的距离数组
    getTopHeightList() {
      this.topHeightList = []
      const oneTinymceDivs = document.querySelectorAll(
        '.content-inner>.one-tinymce-div'
      )
      for (let i = 0; i < oneTinymceDivs.length; i++) {
        const dom = oneTinymceDivs[i]
        const childDoms = dom.childNodes // 获取二级目录dom元素
        let index
        let topHeight = 0
        let reuseValue = topHeight // 复用一级目录的值计算二级目录的值
        for (let c = 0; c < childDoms.length; c++) {
          // 获取二级目录距离顶部的高度
          if (childDoms[c].className.includes('two-tinymce-div')) {
            topHeight = (function(c, childDoms) {
              let value = reuseValue
              for (let j = 1; j <= c; j++) {
                value += childDoms[j].offsetHeight
              }
              return value
            })(c, childDoms)
            index = childDoms[c].className.substring(27)
          } else {
            // 获取一级目录距离顶部的高度
            topHeight = (function(i, oneTinymceDivs) {
              let value = childDoms[c].offsetHeight
              for (let j = 0; j < i; j++) {
                value += oneTinymceDivs[j].offsetHeight
              }
              return value
            })(i, oneTinymceDivs)
            reuseValue = topHeight
            index = oneTinymceDivs[i].className.substring(27)
          }
          this.topHeightList.push({ topHeight, index })
        }
      }
      console.log(this.topHeightList)
    },
    scrollCallback() {
      this.$debounce(() => {
        const top = window.scrollY
        console.log(top, 'top')
        try {
          this.topHeightList.forEach((item) => {
            if (item.topHeight > top) {
              this.directory.map((x) => {
                if (x.name.index === item.index) {
                  x.name.isCurrent = true
                  console.log(this.ITEM, 'ITEM')
                  if (this.ITEM !== x) {
                    this.ITEM.name.isCurrent = false
                    this.ITEM = x
                  }
                } else {
                  x.name.isCurrent = false
                  x.levalTwoList.map((y) => {
                    if (y.name.index === item.index) {
                      y.name.isCurrent = true
                      if (this.ITEM !== y) {
                        this.ITEM.name.isCurrent = false
                        this.ITEM = y
                      }
                    } else {
                      y.name.isCurrent = false
                    }
                  })
                }
              })
              console.log(this.directory)
              throw '已经满足条件跳出循环'
            }
          })
        } catch (error) {
          // 抛出异常跳出forEach循环
        }
      }, 50)
    },
    start(e) {
      if (e[0].name === '') {
        return false
      }
    },
    end() {
      this.dragging = false
      this.getTopHeightList()
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
    .isCurrent {
      & > div {
        color: #459df5;
      }
      & > span {
        color: #459df5;
      }
    }
  }
}
</style>
