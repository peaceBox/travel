<template>
  <v-dialog :value="value" max-width="600" @input="$emit('input', value)">
    <v-card>
      <v-card-title class="headline">
        <span style="color:#CC3F50;font-weight:bold;">
          {{ content !== null ? content.name : '' }}
        </span>
      </v-card-title>

      <v-card-text>ここにサービスの詳細</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="gray darken-1" text @click="$emit('input', false)"
          >閉じる</v-btn
        >
        <v-btn color="#CC3F50" street-address @click="$emit('input', false)">
          <span style="color:#fff;font-weight:bold;" @click="addPlace()"
            >予定に追加</span
          >
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import axios from 'axios'
export default {
  props: ['value', 'content', 'travelId'],
  methods: {
    addPlace() {
      console.log({
        travelId: this.travelId,
        placeId: this.content.placeId
      })
      axios
        .post('https://api.travel.sugokunaritai.dev/place', {
          travelId: this.travelId,
          placeId: this.content.placeId
        })
        .then((res) => {
          this.$emit('input', false)
        })
    }
  }
}
</script>
