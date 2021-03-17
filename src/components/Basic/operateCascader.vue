<template>
  <div>
    <el-cascader
      :ref="value.ref"
      v-model="value[value.key]"
      :placeholder="value.placeholder"
      :options="value.options"
      :props="value.props"
      :filterable="value.filterable"
      :clearable="value.clearable"
      :disabled="value.disabled"
      @change="change"
    />
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
  methods: {
    change(value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
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
        &[style='height: 36px;'] {
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
