<template>
  <div>
    <div class="steps-draw">
      <div
        v-for="item in value.innerList"
        :class="`${item.isLine ? 'step-line' : 'no-step-line'}`"
        :key="item.index"
        class="steps-draw-item"
      >
        <div
          v-if="!item.isLine"
          :class="{ 'is-active': value.active === item.number }"
          class="steps-draw-item-inner"
        >
          <div>
            <div>{{ item.number }}</div>
          </div>
          <div>{{ item.name }}</div>
        </div>
        <div v-if="item.isLine" />
      </div>
    </div>
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
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";
.steps-draw {
  display: flex;
  .no-step-line {
    width: 85px;
  }
  .step-line {
    flex: 1;
    & > div {
      margin-top: 20px;
      height: 2px;
      background-color: #ededed;
    }
  }
  .steps-draw-item {
    .steps-draw-item-inner {
      & > div:nth-child(1) {
        width: 100%;
        & > div {
          width: 40px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border-radius: 50%;
          background-color: #ffffff;
          border: 1px solid #cdcdcd;
          color: rgba($color: #000000, $alpha: 0.5);
          margin: 0 auto;
        }
      }
      & > div:nth-child(2) {
        font-size: 14px;
        color: rgba($color: #000000, $alpha: 0.5);
        width: 85px;
        text-align: center;
        margin-top: 11px;
      }
    }
    .is-active {
      & > div:nth-child(1) {
        & > div {
          color: #ffffff !important;
          background-color: $blue !important;
          border-color: $blue !important;
        }
      }
      & > div:nth-child(2) {
        color: $blue;
      }
    }
  }
}
@media screen and (min-width: 1280px) and (max-width: 1499px) {
  .steps-draw {
    display: flex;
    .no-step-line {
      width: 85px;
    }
    .step-line {
      flex: 1;
      & > div {
        margin-top: 15px;
        height: 2px;
      }
    }
    .steps-draw-item {
      .steps-draw-item-inner {
        & > div:nth-child(1) {
          width: 100%;
          & > div {
            width: 32px;
            height: 32px;
            line-height: 32px;
            border-radius: 50%;
          }
        }
        & > div:nth-child(2) {
          font-size: 12px;
          width: 85px;
          margin-top: 11px;
        }
      }
    }
  }
}
</style>
