<template>
  <div>
    <PictureMagnifier />
  </div>
</template>

<script>
import { getTenantId } from '@/api/demo'
import PictureMagnifier from '@/components/PictureMagnifier'
export default {
  name: 'ApiDeom',
  components: {
    PictureMagnifier
  },
  data() {
    return {}
  },
  created() {
    this.getTenantId()
  },
  methods: {
    async getTenantId() {
      try {
        await getTenantId(1)
      } catch (error) {
        this.$message.error(error.response.data)
      }
    }
  }
}
</script>

<style lang="scss">
</style>
