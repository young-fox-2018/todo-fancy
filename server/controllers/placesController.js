const axios = require('axios')

class PlaceController {

  static getNearbyPlace (req, res) {
    let query = req.params.type
    let location = req.params.location
    console.log('hore', query, location)
    axios({
      url: `https://maps.googleapis.com/maps/api/place/textsearch/json?location=${location}&radius=2000&query=${query}&key=${process.env.PLACE_KEY}`,
      method: 'get'
    })
      .then(data => {
        let results = data.data
        res.status(200).json({
          data: results
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 'failed',
          message: err.message
        })
      })
  }

}

module.exports = PlaceController
