<template>
  <div>
    <el-select
      :ref="value.ref"
      v-model="value[value.key]"
      :clearable="value.clearable"
      :disabled="value.disabled"
      :filterable="value.filterable"
      :remote="value.remote"
      :remote-method="remoteMethod"
      :loading="value.loading"
      :class="value.className"
      :placeholder="value.placeholder"
      :prefix-icon="value.icon"
      :multiple="value.multiple"
      :collapse-tags="value.collapseTags"
      @change="change"
      @focus="focus"
      @clear="clear"
      @blur="blur"
    >
      <el-option
        v-for="item in value[value.optionsKey]"
        :key="item.value"
        :label="item.label"
        :value="value.valueKey ? item : item.value"
        :value-key="value.valueKey"
        :style="{ 'min-width': minWidth + 2 + 'px' }"
      >
        <div v-if="value.optionsIcon">
          <i class="el-icon-search" />
          <span>{{ item.label }}</span>
        </div>
      </el-option>
    </el-select>
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
    return {
      minWidth: ''
    }
  },
  methods: {
    change(value) {
      this.$emit('change', value)
    },
    focus(val) {
      // 解决加了动画弹框导致组件下拉框最小宽度失效的问题
      this.minWidth = val.srcElement.clientWidth
      const domEmpty = document.getElementsByClassName(
        'el-select-dropdown__empty'
      )
      if (domEmpty.length > 0) {
        for (var dom of domEmpty) {
          dom.style['min-width'] = val.srcElement.clientWidth + 2 + 'px'
        }
      }
      this.$emit('focus')
    },
    remoteMethod(query) {
      this.$emit('remoteMethod', query)
    },
    clear() {
      this.$emit('clear')
    },
    blur() {
      this.$emit('blur')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.normal-input {
  margin-right: 10px;
  ::v-deep.el-input__inner {
    font-size: 14px;
    &:focus {
      border-color: $blue;
    }
    &::-webkit-input-placeholder {
      /* WebKit, Blink, Edge */
      color: #c0c4cc;
      font-size: 14px;
    }
    &:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #c0c4cc;
      font-size: 14px;
    }
    &::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #c0c4cc;
      font-size: 14px;
    }
    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #c0c4cc;
      font-size: 14px;
    }
  }
}
.multiple-input {
  margin-right: 10px;
  ::v-deep.el-input__inner {
    font-size: 14px;
    &:focus {
      border-color: $blue;
    }
    &::-webkit-input-placeholder {
      /* WebKit, Blink, Edge */
      color: #c0c4cc;
      font-size: 14px;
    }
    &:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #c0c4cc;
      font-size: 14px;
    }
    &::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #c0c4cc;
      font-size: 14px;
    }
    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #c0c4cc;
      font-size: 14px;
    }
  }
}
@media screen and (min-width: 1500px) and (max-width: 1700px) {
  ::v-deep {
    .normal-input {
      width: 180px;
      height: 36px !important;
    }
  }
}
@media screen and (min-width: 1280px) and (max-width: 1499px) {
  ::v-deep {
    .normal-input {
      width: 160px;
      height: 32px !important;
    }
  }
  ::v-deep {
    .normal-input {
      margin-right: 10px;
      .el-input__inner {
        height: 32px !important;
        line-height: 32px;
        font-size: 12px;
        &:focus {
          border-color: $blue;
        }
        &::-webkit-input-placeholder {
          /* WebKit, Blink, Edge */
          font-size: 12px;
        }
        &:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          font-size: 12px;
        }
        &::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          font-size: 12px;
        }
        &:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          font-size: 12px;
        }
      }
    }
    .multiple-input {
      margin-right: 10px;
      .el-input__inner {
        &[style="height: 36px;"] {
          height: 32px !important;
          line-height: 32px;
        }
        font-size: 12px;
        &:focus {
          border-color: $blue;
        }
        &::-webkit-input-placeholder {
          /* WebKit, Blink, Edge */
          font-size: 12px;
        }
        &:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          font-size: 12px;
        }
        &::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          font-size: 12px;
        }
        &:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          font-size: 12px;
        }
      }
    }
  }
}
</style>
