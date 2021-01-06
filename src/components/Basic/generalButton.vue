<template>
  <div>
    <el-button :class="value.className" type="normal">{{
      value.text
    }}</el-button>
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
      console.log(111)
      this.$emit('handleFilter')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.search-button {
  height: 36px;
  padding: 10px 15px;
  background-color: $blue;
  color: white;
  border-radius: 4px;
  &::before {
    margin-right: 10px;
  }
  &:focus {
    border-color: $blue;
  }
}
</style>
