<template>
  <div>
    <el-input
      v-model="value[value.key]"
      :clearable="value.clearable"
      :disabled="value.disabled"
      :class="value.className"
      :placeholder="value.placeholder"
      :prefix-icon="value.icon"
      @keyup.13.native="handleFilter"
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
    handleFilter() {
      this.$emit('handleFilter')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
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
</style>
