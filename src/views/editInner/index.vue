<template>
  <div>
    <div class="top-inner-left">
      <el-button @click="add">添加目录</el-button>
      <el-button @click="see">查看内容</el-button>
    </div>
    <div class="edit-container">
      <div class="directory">
        <draggable />
      </div>
      <div class="content-inner">
        <div v-for="(item, i) in contentList" :key="i">
          <tinymce :content-obj="item" />
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
          content: `<ul>
        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      </ul>`,
          directory: '11111'
        },
        { content: '<h1>胡永伟</h1>', directory: '22222' }
      ]
    }
  },
  methods: {
    add() {
      const obj = {
        content: '<p style="color:red">111111</p>',
        directory: '55555'
      }
      this.contentList.push(obj)
    },
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
