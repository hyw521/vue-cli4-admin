<template>
  <div>
    <div class="components-container">
      <div>
        <tinymce v-model="contentObj.content" :height="300" />
      </div>
      <!-- <div class="editor-content" v-html="content" /> -->
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  props: {
    contentObj: {
      type: Object,
      default: ''
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scope>
.editor-content {
  margin-top: 20px;
}
.mce-tinymce {
  width: 70% !important;
  top: 0px !important;
  left: 15% !important;
  border: 0px !important;
  position: fixed !important;
}
</style>

