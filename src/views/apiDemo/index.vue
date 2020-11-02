<template>
  <div>1111</div>
</template>

<script>
import { getTenantId } from "@/api/demo";
export default {
  name: "apiDeom",
  data() {
    return {};
  },
  created() {
    this.getTenantId();
  },
  methods: {
    async getTenantId() {
      try {
        await getTenantId(1);
      } catch (error) {
        this.$message.error(error.response.data);
      }
    },
  },
};
</script>

<style lang="scss">
</style>