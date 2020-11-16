<template>
  <div>
    <div class="top-nav">
      <div class="top-inner-right">
        <el-button @click="see">预览</el-button>
      </div>
    </div>

    <div class="edit-container">
      <div class="directory">
        <draggable :directory="contentList" />
      </div>
      <div class="content-inner">
        <div class="fake-tinymc">
          <tinymce :content-obj="fake" :flag="flag" />
        </div>

        <div
          v-for="item in contentList"
          :key="item.name.index"
          class="one-tinymce-div"
          :class="'one-tinymce' + item.name.index"
        >
          <tinymce v-if="item.name.content" :content-obj="item.name" />
          <div
            v-for="n in item.levalTwoList"
            :key="n.name.index"
            class="two-tinymce-div"
            :class="'two-tinymce' + n.name.index"
          >
            <tinymce v-if="n.name.content" :content-obj="n.name" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tinymce from '@/views/components-demo/tinymce'
import draggable from './draggable'
export default {
  components: {
    tinymce,
    draggable
  },
  data() {
    return {
      flag: true,
      fake: {
        content: '<h1>我是第一个一级目录</h1>'
      }, // 没有的富文本框只是显示头给用户看的
      contentList: [
        {
          name: {
            content: '<h1>我是第一个一级目录</h1>',
            index: '1',
            leval: 'one'
          },
          levalTwoList: [
            {
              name: {
                content: '<h2>2级目录one</h2>',
                index: '11',
                leval: 'two'
              }
            },
            {
              name: { content: '<h2>2级目录</h2>', index: '12 ', leval: 'two' }
            },
            {
              name: {
                content: '<h2>2级目录12份饭</h2>',
                index: '13',
                leval: 'two'
              }
            },
            {
              name: {
                content: '<h2>2级目大苏打录</h2>',
                index: '14 ',
                leval: 'two'
              }
            }
          ]
        },
        {
          name: {
            content: '<h1>我是第二个一级目录</h1>',
            index: '2',
            leval: 'one'
          },
          levalTwoList: []
        },
        {
          name: {
            content: '<h1>我是第三个一级目录</h1>',
            index: '3',
            leval: 'one'
          },
          levalTwoList: []
        },
        {
          name: {
            content: "<h1 id='red'>我是第四个一级目录</h1>",
            index: '4',
            leval: 'one'
          },
          levalTwoList: [
            {
              name: {
                content: '<h2>2级目录four</h2>',
                index: '41',
                leval: 'two'
              }
            },
            {
              name: {
                content: '<h2>2级目录five</h2>',
                index: '42',
                leval: 'two'
              }
            }
          ]
        }
      ]
    }
  },
  methods: {
    addLevalOne() {
      const userSelection = window.getSelection()
      const parentNode = userSelection.baseNode.parentNode
      console.log(userSelection)
      console.log(userSelection.baseNode.parentNode)
      const addInner = '你是猪吗'
      parentNode.innerText = parentNode.innerText + addInner
    },
    addLevalTwo() {},
    see() {
      console.log(this.contentList)
    }
  }
}
</script>

<style lang="scss" scope>
.top-nav {
  position: fixed;
  top: 0px;
  right: 0px;
  height: 68px;
  width: 100%;
  background-color: white;
  z-index: 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  .top-inner-right {
    float: right;
  }
}

.edit-container {
  margin: 123px auto 0px;
  display: flex;
  @media screen and (min-width: 1380px) {
    width: 1360px;
  }
  @media screen and (max-width: 1379px) {
    width: 1100px;
  }
  .directory {
    margin-left: 20px;
    width: 260px;
    position: fixed;
  }
  .content-inner {
    border: 1px solid #eee;
    margin: 50px;
    margin-left: 310px;
    flex-grow: 1;
    .fake-tinymc {
      .mce-edit-area {
        display: none;
      }
      .mce-statusbar {
        display: none;
      }
    }
  }
}
</style>
