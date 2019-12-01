import icon from '../../static/images/EVCicon.png'

function Map () {
  this.map = {}
  this.markerT = {}
  this.myposition = 0

  this.show = function (element, item, lat, lng) {
    this.myposition = new window.google.maps.LatLng(lat, lng)
    var features = []
    var iconEVC = {
      url: icon,
      scaledSize: new window.google.maps.Size(25, 25),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(0, 0)
    }
    item.forEach(function (v, i) {
      var place = {
        position: new window.google.maps.LatLng(item[i].lat[0], item[i].lng[0]),
        icon: iconEVC
      }
      features.push(place)
    })
    var myplace = {
      position: this.myposition
    }
    features.push(myplace)
    const optionmap = {
      zoom: 11,
      center: this.myposition
    }
    const map = new window.google.maps.Map(element, optionmap)
    this.map = map
    this.markerT = this.addMarker(features, map, item)
  }
  this.addMarker = function (features, map, item) {
    var markerArr = []
    features.forEach(function (feature) {
      const marker = new window.google.maps.Marker({
        position: feature.position,
        icon: feature.icon,
        map: map
      })
      markerArr.push(marker)
      marker.addListener('click', function () {
        var clickedlng = Math.round(marker.getPosition().lng() * 1000000) / 1000000
        var clickedlat = marker.getPosition().lat()
        var content = ''
        item.forEach(function (v, i) {
          if (v.lat[0] === clickedlat && v.lng[0] === clickedlng) {
            content = '<div><strong><' + v.statNm[0] + '></strong></div>' +
                      '<table><tr><td>' + v.stat[0] + '</td></tr>' +
                      '<tr><td>' + v.chgerType[0] + '</td></tr>' +
                      '<tr><td>' + v.useTime[0] + '</td></tr></table>'
          }
        })
        if (this.myposition.lat() === marker.getPosition().lat() && this.myposition.lng() === marker.getPosition().lng()) {
          content = '<div><strong>My Position</strong></div>'
        }
        var pos = map.getZoom()
        map.setZoom(14)
        map.setCenter(marker.getPosition())
        var infowindow = new window.google.maps.InfoWindow({
          content: content
        })
        infowindow.open(marker.get('map'), marker)

        window.setTimeout(function () {
          map.setZoom(pos)
          map.setCenter(this.myposition)
          infowindow.close(marker.get('map'), marker)
        }, 2000)
      })
    })
    return markerArr
  }
}
module.exports = new Map()
