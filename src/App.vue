<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
/*调节富文本框顶部的样式*/
.mce-tinymce {
  box-shadow: none !important;
  .mce-top-part::before {
    box-shadow: none !important;
  }
  .mce-menubar {
    border: none !important;
  }
}
</style>
