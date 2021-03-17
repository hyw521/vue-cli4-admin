<template>
  <div>
    <el-select
      v-model="value[value.key]"
      :clearable="value.clearable"
      :disabled="value.disabled"
      :filterable="value.filterable"
      :remote="value.remote"
      :remote-method="remoteMethod"
      :class="value.className"
      :placeholder="value.placeholder"
      :prefix-icon="value.icon"
      @change="handleFilter"
      @focus="focus"
    >
      <el-option
        v-for="(item, i) in value[value.optionsKey]"
        :key="i"
        :label="item.label"
        :value="item.value"
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
    return {}
  },
  methods: {
    handleFilter() {
      this.$emit('handleFilter')
    },
    remoteMethod(query) {
      this.$emit('remoteMethod', query)
    },
    focus(val) {
      this.$emit('focus')
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
@media screen and (min-width: 1500px) and (max-width: 1700px) {
  .normal-input {
    width: 180px;
    height: 36px;
  }
  .flex-input {
    flex: 1;
  }
}
@media screen and (min-width: 1280px) and (max-width: 1499px) {
  .normal-input {
    width: 160px;
    height: 32px;
  }
  .flex-input {
    flex: 1;
  }
  .normal-input {
    margin-right: 10px;
    ::v-deep.el-input__inner {
      font-size: 12px;
      height: 32px;
      line-height: 32px;
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
