<template>
  <div>
    <el-input
      :ref="value.ref"
      v-model="value[value.key]"
      :clearable="value.clearable"
      :disabled="value.disabled"
      :class="value.className"
      :placeholder="value.placeholder"
      :prefix-icon="value.icon"
      :maxlength="value.maxlength"
      :show-word-limit="value.showWordLimit"
      :type="value.type"
      :autosize="value.autosize"
      @input="input"
      @focus="focus"
      @keyup.native="keyup"
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
    input(value) {
      this.$emit('input', value)
    },
    focus() {
      this.$emit('focus')
    },
    keyup() {
      if (this.value.onlyNumber) {
        this.value[this.value.key] = this.value[this.value.key].replace(
          /[^\d.]/g,
          ''
        )
      }
      this.$emit('keyup')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.normal-input {
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
::v-deep {
  .el-textarea {
    width: 99% !important;
    min-height: 70px;
    .el-textarea__inner {
      min-height: 70px !important;
      color: #000000;
      &:focus {
        border-color: $blue;
      }
    }
  }
}
@media screen and (min-width: 1500px) and (max-width: 1700px) {
  ::v-deep.normal-input {
    width: 180px;
    height: 36px;
    margin-right: 10px;
    input {
      height: 36px;
      line-height: 36px;
    }
  }
}
@media screen and (min-width: 1280px) and (max-width: 1499px) {
  ::v-deep {
    .el-textarea {
      width: 99% !important;
      min-height: 60px;
    }
  }
  ::v-deep.normal-input {
    width: 160px;
    height: 32px;
    margin-right: 10px;
    input {
      height: 32px;
      line-height: 32px;
    }
  }
  .normal-input {
    ::v-deep.el-input__inner {
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
</style>
