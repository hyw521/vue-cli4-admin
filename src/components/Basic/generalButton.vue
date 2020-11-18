<template>
  <div>
    <!-- <i class="el-icon-search icon"></i> -->
    <span
      :class="value.className"
      @click="handleFilter"
    >{{ value.text }}
    </span>
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
@mixin colorBtn($color) {
  background: $color;
  &:hover {
    color: $color;
    &:before,
    &:after {
      background: $color;
    }
  }
}
.light-blue-btn {
  @include colorBtn($light-blue);
}
.red-btn {
  @include colorBtn($red);
}
.pink-btn {
  @include colorBtn($pink);
}
.green-btn {
  @include colorBtn($green);
}
.tiffany-btn {
  @include colorBtn($tiffany);
}
.yellow-btn {
  @include colorBtn($yellow);
}
.blue-btn {
  @include colorBtn($blue);
}
.pan-btn {
  font-size: 14px;
  color: #fff;
  height: 36px;
  line-height: 36px;
  width: 105px;
  text-align: center;
  border-radius: 8px;
  border: none;
  outline: none;
  transition: 1000ms ease all;
  position: relative;
  display: inline-block;
  &:hover {
    background: #fff;
    cursor: pointer;
    &:before,
    &:after {
      width: 100%;
      transition: 1000ms ease all;
    }
  }
  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 2px;
    width: 0;
    transition: 400ms ease all;
  }
  &::after {
    right: inherit;
    top: inherit;
    left: 0;
    bottom: 0;
  }
}
.icon {
  position: relative;
}
</style>
