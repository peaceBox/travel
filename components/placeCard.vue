<template>
  <v-card class="mx-auto" max-width="600" outlined>
    <v-card-title class="headline mb-1">{{
      abstruct != null ? abstruct.name : ''
    }}</v-card-title>
    <v-container>
      <v-row>
        <div
          :style="
            content != null
              ? `background-image:url('https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyCgOm__vdrF5Ta3wWvrVW6Wq7FSMdU7O-k&&photoreference=${getPhotoRef()}&&maxwidth=720&&maxheight=500');height:300px;width: 100%;`
              : ''
          "
          class="sight-image"
        />
      </v-row>

      <v-card-actions>
        <v-textarea placeholder="ノートを入力"></v-textarea>
      </v-card-actions>
    </v-container>
  </v-card>
</template>
<script>
import placeDetails from '../plugins/placeDetails'
import data from '../plugins/data.json'

export default {
  props: ['placeId'],
  data() {
    return {
      content: null,
      abstruct: null
    }
  },
  created() {
    placeDetails(this.placeId).then((res) => {
      this.content = res
      this.abstruct = data.filter((a) => {
        return a.placeId === this.placeId
      })[0]

      console.log(this.content)
    })
  },
  methods: {
    getPhotoRef() {
      const portraits = this.content.photos.filter((e) => {
        return e.width > e.height
      })

      if (portraits.length > 0) {
        return portraits[0].photo_reference
      } else {
        return this.content.photos[0].photo_reference
      }
    }
  }
}
</script>
<style>
.sight-image {
  background-size: cover;
}
</style>
