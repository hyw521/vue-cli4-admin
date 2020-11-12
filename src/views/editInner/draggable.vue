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
        v-for="(item, index) in directory"
        :key="index"
        closable
        class="leval-one"
        @close="onDel(index, directory)"
      >
        <div>{{ item.name }}</div>
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
            v-for="(n, index) in item.levalTwoList"
            :key="index"
            closable
            class="leval-two"
            @close="onDel(index, item.levalTwoList)"
          >
            <span>{{ n.name }}</span>
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
  data() {
    return {
      enabled: true,
      dragging: false,
      directory: [
        {
          name: '我是第一个一级目录',
          levalTwoList: [
            { name: '2级目录one' },
            { name: '2级目录' },
            { name: '2级目录12份饭' },
            { name: '2级目大苏打录' }
          ]
        },
        { name: '我是第二个一级目录', levalTwoList: [] },
        { name: '我是第三个一级目录', levalTwoList: [] },
        {
          name: '我是第四个一级目录',
          levalTwoList: [{ name: '2级目录four' }, { name: '2级目录five' }]
        }
      ]
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
    }
  }
}
</script>

<style lang="scss">
#directory {
  .all-leval-one {
    padding-top: 30px;
    .leval-one {
      width: 100%;
      cursor: pointer;
      text-align: left;
      margin-bottom: 16px;
      list-style: none;
      font-size: 16px;
      .all-leval-two {
        .leval-two {
          font-size: 14px;
          color: #837f7f;
          list-style: disc;
          padding-left: 5px;
          margin-top: 6px;
          span {
            display: inline-block;
            line-height: 20px;
            padding-top: 2px;
          }
        }
      }
    }
  }
}
</style>
