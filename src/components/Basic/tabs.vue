<template>
  <div>
    <el-tabs
      v-model="value.activeName"
      :before-leave="beforeLeave"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="item in value.tabPanes"
        :name="item.flag"
        :key="item.flag"
      >
        <span slot="label">{{ item.name }}</span>
        <slot
          :name="item.flag"
      /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  // mounted() {
  //   const doms = document.querySelectorAll('.el-tabs__content>div')
  //   for (var dom of doms) {
  //     dom.addEventListener('scroll', this.scrollCallback)
  //   }
  // },
  methods: {
    handleClick(value) {
      this.$emit('handleClick', value)
    },
    beforeLeave(newActive, oldActive) {
      let result
      this.$emit('beforeLeave', { newActive, oldActive }, (val) => {
        result = val
      })
      return result
    },
    scrollCallback() {
      this.$debounce(() => {
        // const doms = document.querySelectorAll('.vodal-title')
        // for (var dom of doms) {
        //   dom.dblclick = function () {
        //     debugger
        //   }
        //   dom.dblclick()
        // }
      }, 50)
    }
  }
  // beforeDestroy() {
  //   const doms = document.querySelectorAll('.el-tabs__content>div')
  //   for (var dom of doms) {
  //     dom.removeEventListener('scroll', this.scrollCallback)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
::v-deep {
  .el-tabs {
    .el-tabs__active-bar {
      height: 3px;
      margin-left: 18px;
    }
    .el-tabs__nav-wrap::after {
      background: #f97021;
      opacity: 0.1;
    }
    .el-tabs__nav {
      padding-left: 18px;
      .el-tabs__item {
        font-weight: 600;
        font-size: 14px;
        font-family: 'Source Han Sans CN';
        color: rgba($color: #010000, $alpha: 0.6);
      }
      .el-tabs__item.is-active {
        color: $blue;
      }
    }
    .el-tabs__content {
      & > div {
        height: 450px;
        overflow: auto;
        padding-bottom: 64px;
        &::-webkit-scrollbar {
          width: 4px;
        }
      }
      & > div::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 5px;
        // -webkit-box-shadow: inset 0 0 5px rgba(218, 218, 218, 0.2);
        // box-shadow: inset 0 0 5px rgba(218, 218, 218, 0.2);
        background: rgba($color: #000000, $alpha: 0.1);
        &:hover {
          background: rgba($color: #000000, $alpha: 0.2);
        }
      }
      & > div::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        // -webkit-box-shadow: inset 0 0 5px rgba(218, 218, 218, 0.2);
        // box-shadow: inset 0 0 5px rgba(47, 167, 223, 0.2);
        border-radius: 0;
        background: white;
      }
    }
  }
}
::v-deep {
  @media screen and (min-width: 1280px) and (max-width: 1499px) {
    .el-tabs {
      .el-tabs__active-bar {
        height: 2px;
        margin-left: 18px;
      }
      .el-tabs__nav {
        padding-left: 18px;
        .el-tabs__item {
          font-size: 14px;
        }
      }
      .el-tabs__content {
        & > div {
          height: 375px;
          overflow: auto;
          padding-bottom: 64px;
          &::-webkit-scrollbar {
            width: 4px;
          }
        }
        & > div::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          border-radius: 5px;
          background: rgba($color: #000000, $alpha: 0.1);
          &:hover {
            background: rgba($color: #000000, $alpha: 0.2);
          }
        }
        & > div::-webkit-scrollbar-track {
          /*滚动条里面轨道*/
          border-radius: 0;
          background: white;
        }
      }
    }
  }
}
</style>
