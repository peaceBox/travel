const axios = require('axios')
const data = require('./data')

const APIKEY = 'put your Google Place API token'

let progress = 0

function getHello() {
  if (progress < data.length) {
    const e = data[progress]
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
          e.lat
        },${e.lng}&radius=1&&key=${APIKEY}&&keyword=${encodeURI(e.name)}`
      )
      .then((res) => {
        if (
          res &&
          res.data &&
          res.data.results &&
          res.data.results.length > 0
        ) {
          data[progress].placeId = res.data.results[0].id
          console.error(
            res.data.results[0].id +
              ' ' +
              e.name +
              '→' +
              res.data.results[0].name
          )
          setTimeout(getHello, 1000)
          progress++
        } else {
          console.error('Cannot find' + progress)
          setTimeout(getHello, 1000)
          progress++
        }
      })
      .catch((e) => {
        console.error(e + ', i:' + progress)
        progress++
      })
  } else {
    console.log(JSON.stringify(data))
  }
}

setTimeout(getHello, 1000)
