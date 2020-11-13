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
        <div :title="item.name.content | filterOneDirectory" @click="hrefTo()">
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
            <span :title="n.name.content | filterTwoDirectory">{{
              n.name.content | filterTwoDirectory
            }}</span>
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
      dragging: false
    }
  },
  methods: {
    start(e) {
      if (e[0].name === '') {
        return false
      }
    },
    checkMove: function(e) {
      window.console.log(e)
    },
    onDel(index, directory) {
      directory.splice(index, 1)
    },
    // 锚点跳转
    hrefTo() {
      document.querySelector('#red').scrollIntoView(true)
      console.log(window.scrollY)
      window.scrollY = window.scrollY + 68
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
