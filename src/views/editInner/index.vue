<template>
  <div>
    <div class="top-inner-left">
      <el-button @click="addLevalOne">添加一级目录</el-button>
      <el-button @click="addLevalTwo">添加二级目录</el-button>
      <el-button @click="see">查看内容</el-button>
    </div>
    <div class="edit-container">
      <div class="directory">
        <draggable :directory="contentList" />
      </div>
      <div class="content-inner">
        <div
          v-for="item in contentList"
          :key="item.name.index"
          class="tinymce-div"
        >
          <tinymce :content-obj="item.name" />
          <div
            v-for="n in item.levalTwoList"
            :key="n.name.index"
            class="tinymce-div"
          >
            <tinymce :content-obj="n.name" />
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
      contentList: [
        {
          name: { content: '<h1>我是第一个一级目录</h1>', index: '1' },
          levalTwoList: [
            { name: { content: '<h2>2级目录one</h2>', index: '11' }},
            { name: { content: '<h2>2级目录</h2>', index: '12 ' }},
            { name: { content: '<h2>2级目录12份饭</h2>', index: '13' }},
            { name: { content: '<h2>2级目大苏打录</h2>', index: '14 ' }}
          ]
        },
        {
          name: { content: '<h1>我是第二个一级目录</h1>', index: '2' },
          levalTwoList: []
        },
        {
          name: { content: '<h1>我是第三个一级目录</h1>', index: '3 ' },
          levalTwoList: []
        },
        {
          name: { content: '<h1>我是第四个一级目录</h1>', index: '4' },
          levalTwoList: [
            { name: { content: '<h2>2级目录four</h2>', index: '41' }},
            { name: { content: '<h2>2级目录five</h2>', index: '42' }}
          ]
        }
      ]
      // contentList: [
      //   {
      //     content: `<ul>
      //   <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      // </ul>`,
      //     directory: "11111",
      //   },
      //   { content: "<h1>胡永伟</h1>", directory: "22222" },
      // ],
    }
  },
  methods: {
    addLevalOne() {
      const obj = {
        content: '<p style="color:red">111111</p>',
        directory: '55555'
      }
      this.contentList.push(obj)
    },
    addLevalTwo() {},
    see() {
      console.log(this.contentList)
    }
  }
}
</script>

<style lang="scss" scope>
.content-inner {
  border: 1px solid #eee;
  margin: 50px;
  flex-grow: 1;
}
.top-inner-left {
  position: fixed;
  top: 0px;
  left: 0px;
  height: 103px;
  width: 15%;
  background-color: white;
  z-index: 999;
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
  }
}
</style>
