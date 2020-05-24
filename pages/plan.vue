<template>
  <v-layout>
    <v-container>
      <div style="margin-bottom:10px;">
        <plan-config />
      </div>
      <v-divider />
      <draggable tag="div">
        <div
          v-for="e in places"
          :key="e.order"
          style="margin-bottom:10px;margin-top:10px;"
        >
          <place-card :place-id="e.placeId" />
        </div>
      </draggable>
      <v-col align="center">
        <v-btn
          bottom
          style="margin-bottom:50px; width:500px;"
          color="#CC3F50"
          @click="save()"
          ><span style="font-weight:bold;color:#fff"
            >計画を保存する</span
          ></v-btn
        >
      </v-col>
    </v-container>
  </v-layout>
</template>
<script>
import axios from 'axios'
import draggable from 'vuedraggable'
import planConfig from '@/components/planConfig'
import placeCard from '@/components/placeCard'

export default {
  components: {
    planConfig,
    placeCard,
    draggable
  },
  data() {
    return { places: [], startDate: new Date(), finalDate: new Date() }
  },
  mounted() {
    axios
      .get(
        `https://api.travel.sugokunaritai.dev/place?travelId=${this.$route.query.travelId}`
      )
      .then((res) => {
        res.data.forEach((res, i) => {
          const p = { placeId: res.placeId, uuid: res.uuid }
          this.places.push(p)
        })
      })
    this.$nuxt.$emit('updateHeader', '旅行を計画する')
  },
  methods: {
    save() {
      const placeData = []
      this.places.forEach((e, i) => {
        const tmp = {
          placeId: e.placeId,
          turn: i,
          date: new Date(), // TODO: 日付実装
          UUID: e.uuid
        }

        placeData.push(tmp)
      })

      axios
        .post(
          `https://api.travel.sugokunaritai.dev/place?travelId=${this.$route.query.travelId}`
        )
        .then((res) => {
          console.log(res)
        })
    }
  }
}
</script>
