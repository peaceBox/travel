import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

// This API key must have access to Maps JavaScript API
const APIKey = 'AIzaSyCgOm__vdrF5Ta3wWvrVW6Wq7FSMdU7O-k'

Vue.use(VueGoogleMaps, {
  load: {
    key: APIKey,
    libraries: 'places'
  }
})
