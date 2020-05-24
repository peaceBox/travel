<template>
  <v-card class="mx-auto" max-width="600" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4"></div>
        <v-list-item-title class="headline mb-1">
          <v-text-field label="旅行のタイトル"></v-text-field>
        </v-list-item-title>
        <v-row justify="space-around">
          <v-date-picker
            v-model="selected"
            color="#CC3F50"
            range
            @change="saveDate()"
          ></v-date-picker>
        </v-row>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      selected: []
    }
  },
  computed: {
    startDate() {
      return new Date(this.selected[0])
    },
    finishDate() {
      return new Date(this.selected[1])
    }
  },
  methods: {
    saveDate() {
      axios
        .post(`https://api.travel.sugokunaritai.dev/date`, {
          travelId: this.$route.query.travelId,
          startDate: Math.floor(this.startDate.getTime() / 1000),
          finishDate: Math.floor(this.finishDate.getTime() / 1000)
        })
        .then((res) => {})
    }
  }
}
</script>
