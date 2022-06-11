<template>
  <div class="dashboard">
    <card />
    <sale />
    <home-footer />
  </div>
</template>

<script>
import Card from './card/index.vue'
import Sale from './sale/index.vue'
import HomeFooter from './footer/index.vue'

export default {
  components: { Card, Sale, HomeFooter },
  name: 'Dashboard',
}
</script>

<style lang="scss" scoped>

</style>
