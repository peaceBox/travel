<template>
  <v-layout row justify-center align-center>
    <GmapMap
      :center="{ lat: 34.402934, lng: 132.456019 }"
      :zoom="10"
      map-type-id="roadmap"
      class="gmap"
    >
      <GmapMarker
        v-for="(m, index) in markers"
        :key="index"
        :position="{ lat: m.lat, lng: m.lng }"
        :clickable="true"
        @click="onPinClick(m)"
      />
    </GmapMap>
    <place-details-modal
      v-model="dialog"
      :content="dialogContent"
      :travel-id="travelId"
    />
  </v-layout>
</template>

<script>
import data from '@/plugins/data.json'
import placeDetailsModal from '@/components/placeDetailsModal'
import placeDetails from '@/plugins/placeDetails'

export default {
  components: {
    placeDetailsModal
  },
  data() {
    return {
      markers: [],
      dialog: false,
      dialogContent: null,
      travelId: ''
    }
  },
  mounted() {
    this.$nuxt.$emit('updateHeader', '見る')
    this.createTable()
    this.travelId = this.$route.query.travelId
  },
  methods: {
    createTable() {
      switch (decodeURI(this.$route.query.type)) {
        case '見る/全部':
          this.markers = data.filter((e) => {
            const pattern = /見る\/.*/
            return e.genre.match(pattern)
          })
          break
        case '食べる':
          // TODO: レストラン群
          break
        case 'ホテル':
          // ホテルに。
          break
        case '遊ぶ/全部':
          this.markers = data.filter((e) => {
            const pattern = /遊ぶ\/.*/
            return e.genre.match(pattern)
          })
          break
        case '全部':
          this.markers = data
          break
        default:
          this.markers = data.filter((e) => {
            return e.genre === decodeURI(this.$route.query.type)
          })
      }
    },
    onPinClick(object) {
      this.dialog = true
      placeDetails(object.placeId).then((res) => {
        const obj = object
        obj.details = res
        this.dialogContent = obj
      })
    }
  }
}
</script>
<style>
.gmap {
  width: 100vw;
  height: 100vh;
  margin: 0;
}
</style>
