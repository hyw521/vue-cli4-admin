<template>
  <div>
    <el-select
      v-model="value[value.key]"
      :clearable="value.clearable"
      :disabled="value.disabled"
      :class="value.className"
      :placeholder="value.placeholder"
      :prefix-icon="value.icon"
      @change="handleFilter"
    >
      <el-option
        v-for="(item, i) in value[value.optionsKey]"
        :key="i"
        :label="item.label"
        :value="item.value"
      />
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
  .normal-input {
    width: 180px;
    height: 30px;
  }
}
</style>
