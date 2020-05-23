<template>
  <v-layout row justify-center align-center>
    <GmapMap
      :center="{ lat: 10, lng: 10 }"
      :zoom="7"
      map-type-id="terrain"
      style="width: 100vw; height:100vh;margin:0;"
    >
      <GmapMarker
        v-for="(m, index) in markers"
        :key="index"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
    </GmapMap>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      markers: [
        { position: { lng: 10.2, lat: 10 } },
        { position: { lng: 10.1, lat: 10 } }
      ]
    }
  },
  mounted() {
    this.$nuxt.$emit('updateHeader', '見る')
  }
}
</script>
