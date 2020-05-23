import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCgOm__vdrF5Ta3wWvrVW6Wq7FSMdU7O-k',
    libraries: 'places'
  }
})
