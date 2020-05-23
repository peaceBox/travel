<template>
  <v-layout row justify-center align-center>
    <GmapMap
      :center="{ lat: 34.402934, lng: 132.456019 }"
      :zoom="10"
      map-type-id="terrain"
      style="width: 100vw; height:100vh;margin:0;"
    >
      <GmapMarker
        v-for="(m, index) in markers"
        :key="index"
        :position="{ lat: m.lat, lng: m.lng }"
        :clickable="true"
        @click="onPinClick(m)"
      />
    </GmapMap>

    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="headline">
          {{ dialogContent !== null ? dialogContent.name : '' }}
        </v-card-title>

        <v-card-text>ここにサービスの詳細</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray darken-1" text @click="dialog = false"
            >閉じる</v-btn
          >
          <v-btn color="green darken-1" text @click="dialog = false"
            >予定に追加</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import data from '@/plugins/data.json'
export default {
  data() {
    return {
      markers: [],
      dialog: false,
      dialogContent: null
    }
  },
  mounted() {
    this.$nuxt.$emit('updateHeader', '見る')
    this.createTable()
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
          console.log('Default called')
          this.markers = data.filter((e) => {
            return e.genre === decodeURI(this.$route.query.type)
          })
      }
    },
    onPinClick(object) {
      this.dialog = true
      this.dialogContent = object
    }
  }
}
</script>
