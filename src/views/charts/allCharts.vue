<template>
  <div>
    <div class="chart-container">
      <Histogram height="100%" width="100%" />
    </div>
    <div class="chart-container">
      <WaterPolo id="water-polo" height="50%" width="100%" />
    </div>
  </div>
</template>

<script>
import Histogram from '@/components/Charts/Histogram'
import WaterPolo from '@/components/Charts/WaterPolo'

export default {
  name: 'AllCharts',
  components: { Histogram, WaterPolo }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

