<template>
  <div class="dashboard">
    <card />
    <sale />
  </div>
</template>

<script>
import Card from './card/index.vue'
import Sale from './sale/index.vue'

export default {
  components: { Card, Sale },
  name: 'Dashboard',
}
</script>

<style lang="scss" scoped>

</style>
