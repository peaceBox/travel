const axios = require('axios')
// This API key must have access to Maps JavaScript API
export default (placeId) => {
  return new Promise((resolve) => {
    axios
      .get(
        `https://api.travel.sugokunaritai.dev/map/details?placeId=${placeId}`
      )
      .then((res) => {
        console.log(res.data.result)

        resolve(res.data.result)
      })
  })
}
