<template>
  <v-layout>
    <v-container>
      <plan-config />
    </v-container>
  </v-layout>
</template>
<script>
import planConfig from '@/components/planConfig'
export default {
  components: {
    planConfig
  },
  mounted() {
    this.$nuxt.$emit('updateHeader', '旅行を計画する')
  }
}
</script>
