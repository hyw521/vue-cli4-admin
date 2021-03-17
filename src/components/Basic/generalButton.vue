<template>
  <div class="button-div">
    <el-button
      :class="value.className"
      :loading="loadingStatus"
      type="normal"
      @click="handle"
    >{{ value.text }}</el-button
    >
  </div>
</template>

<script>
import waves from '@/directive/waves' // Waves directive
export default {
  directives: { waves },
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loadingStatus: false
    }
  },
  methods: {
    handle() {
      if (this.value.isOpenLoading) {
        this.loadingStatus = true
      }
      this.$emit('handle', () => {
        this.loadingStatus = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.blue-button {
  background-color: $blueButton;
  border-color: $blueButton;
  &:focus {
    border-color: $blueButton;
  }
}
.yellow-button {
  background-color: $yellowButton;
  border-color: $yellowButton;
  &:focus {
    border-color: $yellowButton;
  }
}
.green-button {
  background-color: $greenButton;
  border-color: $greenButton;
  &:focus {
    border-color: $greenButton;
  }
}
.red-button {
  background-color: $redButton;
  border-color: $redButton;
  &:focus {
    border-color: $redButton;
  }
}
.white-button {
  background-color: #ffffff;
  border-color: #dcdfe6;
  color: rgba($color: #000000, $alpha: 0.8) !important;
  &:focus {
    border-color: #dcdfe6;
  }
}
.search-button {
  height: 36px;
  padding: 10px 15px;
  background-color: $blue;
  color: white;
  border-radius: 4px;
  &::before {
    padding-right: 10px;
    // margin-right: 10px;
  }
  &:focus {
    border-color: $blue;
  }
}

::v-deep {
  .operate-small-button {
    height: 32px;
    padding: 9px 15px;
    color: white;
    border-radius: 4px;
    span {
      display: inline-block;
      transform: scale(0.9);
    }
    &::before {
      padding-right: 10px;
      // margin-right: 10px;
    }
  }

  .operate-button {
    height: 36px;
    padding: 10px 15px;
    color: white;
    border-radius: 4px;
    &::before {
      padding-right: 10px;
      // margin-right: 10px;
    }
    &:focus {
      border-color: $blue;
    }
  }
}

@media screen and (min-width: 1280px) and (max-width: 1499px) {
  ::v-deep.search-button {
    height: 32px;
    padding: 8px 13px;
    border-radius: 4px;
    span {
      font-size: 12px;
    }
    &::before {
      font-size: 12px;
    }
  }
  ::v-deep.operate-small-button {
    height: 28px;
    padding: 5px 13px;
    border-radius: 4px;
    span {
      font-size: 12px;
      display: inline-block;
      transform: scale(1) !important;
    }
    &::before {
      font-size: 12px;
    }
  }
  ::v-deep.operate-button {
    height: 32px;
    padding: 8px 13px;
    border-radius: 4px;
    span {
      font-size: 12px;
    }
    &::before {
      font-size: 12px;
    }
  }
}
</style>
