import axios from 'axios'
export default {
  /* get EVCS Lists from proxy Server using API */
  Info: function (lat, lng) {
    return axios.post('http://192.168.0.224:3000/EVCS').then((response) => {
      var item = response.data.item
      for (var i = 0; i < item.length; i += 1) {
        var addr = item[i].addrDoro[0].split(' ')
        addr = addr.filter(function (v, i) { return v })
        item[i].lat[0] = Math.round(item[i].lat[0] * 1000000) / 1000000
        item[i].lng[0] = Math.round(item[i].lng[0] * 1000000) / 1000000
        item[i].distance = this.Dist(item[i].lat[0], lat, item[i].lng[0], lng)
        item[i].stat[0] = this.Stat(item[i].stat[0])
        item[i].chgerType[0] = this.Type(item[i].chgerType[0])
        item[i].city = addr[0]
        item[i].town = addr[1]
        if (!addr[3]) {
          item[i].street = addr[2]
        } else {
          item[i].street = addr[2] + ' ' + addr[3]
        }
      }
      item.sort(function (a, b) {
        return a.distance - b.distance
      })

      if (location.hash === '#/list') {
        item = item.filter(function (value) {
          return value.distance < 11
        })
      }
      return item
    }, (error) => {
      console.log(error)
    })
  },
  Dist: function (lat1, lat2, lng1, lng2) {
    var gaplat = Math.abs(lat1 - lat2) /* latitude gap */
    var gaplng = Math.abs(lng1 - lng2) /* longitude gap */
    var R = 6371
    var dLat = gaplat * Math.PI / 180
    var dLng = gaplng * Math.PI / 180
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var distance = R * c
    return distance
  },
  Stat: function (stat) {
    if (stat === '1') {
      return '통신 이상'
    }
    if (stat === '2') {
      return '충전 대기'
    }
    if (stat === '3') {
      return '충전 중'
    }
    if (stat === '4') {
      return '운영 중지'
    }
    if (stat === '5') {
      return '점검 중'
    }
  },
  Type: function (type) {
    if (type === '01') {
      return 'DC차데모'
    }
    if (type === '03') {
      return 'DC차데모/AC3상'
    }
    if (type === '06') {
      return 'DC차데모/AC3상/DC콤보'
    }
  },
  Location: function () {
    /* HTTPS method */
    return axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCRTcJ1lUjy6BX5paKi3fEw0Bsz_VI9toE').then((response) => {
      return response.data.location
    })
  }
}

