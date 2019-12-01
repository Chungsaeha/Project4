import axios from 'axios'
export default {
  trackingPage: function (lat, lng) {
    var obj = {}
    obj.ip = window.ip()
    obj.host = location.host
    obj.path = location.hash /* hash(pathname) */
    obj.referrer = sessionStorage.getItem('last-url')

    if (navigator.appVersion.indexOf('Win') !== -1) obj.OS = 'Windows'
    if (navigator.appVersion.indexOf('Mac') !== -1) obj.OS = 'Mac'
    if (navigator.appVersion.indexOf('X11') !== -1) obj.OS = 'UNIX'
    if (navigator.appVersion.indexOf('Linux') !== -1) obj.OS = 'Linux'

    /* Test 용 Date, Time  */
    var d = this.randomDate(new Date(2017, 0, 1), new Date())
    obj.date = ('0' + (d.getMonth() + 1)).slice(-2) + '.' + ('0' + d.getDate()).slice(-2)
    obj.time = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2)
    obj.lat = lat.toString()
    obj.lon = lng.toString()
    var objs = JSON.stringify(obj)
    // axios.post('http://192.168.0.207:8080/tracking', { pageData: objs })
    axios.post('http://192.168.0.224:8080/getdata', { jsonData: objs })
    sessionStorage.setItem('last-url', location.href)
  },
  randomDate: function (start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  },
  trackingList: function (target) {
    var evc = {}
    evc.name = target.statNm[0]
    evc.city = target.city
    evc.town = target.town
    evc.street = target.street
    evc.type = target.chgerType[0]
    evc.state = target.stat[0]
    evc.useTime = target.useTime[0]
    evc.distance = Math.round(target.distance) + 'KM'
    var d = new Date()
    evc.date = ('0' + (d.getMonth() + 1)).slice(-2) + '.' + ('0' + d.getDate()).slice(-2)
    var evcS = JSON.stringify(evc)
    // axios.post('http://192.168.0.207:3000/tracking', { listData: evcS })
    axios.post('http://192.168.0.224:8080/getevc', { jsonData: evcS })
  }
}
