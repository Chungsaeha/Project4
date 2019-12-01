<template>
  <section>
    <div class="row">
      <div class="col-sm-12">
        <router-link id="home" to="/">
          <span class="glyphicon glyphicon-home"></span>
        </router-link>
      </div>
      <div style="overflow:scroll; height:260px;" class="col-sm-6">
        <ul v-if="list" class="list-group EVCmenu">
          <!-- blogs array for Loop -->
          <li id="EVClist" v-for="blog in blogs">
            <p class="list-group-item EVClist" v-on:click="showInfo">{{ blog.statNm[0] }}<span class="pull-right">{{ Math.round(blog.distance) }}Km</span></p>
          </li>
        </ul>
        <ul v-else class="list-group">
          <button id="back" class="clickbtn btn btn-default" v-on:click="showTitle">Back</button>
          <button class="clickbtn navibtn btn btn-default pull-right" v-on:click="showNavigation">Navigation</button>
          <li>
            <p v-if="isFavor" id="list-head" class="showlist list-group-item"><strong>{{ descName }}</strong><span class="changeStar pull-right glyphicon glyphicon-star" v-on:click="sendMyEVC"></span>
            </p>
            <p v-else id="list-head" class="showlist list-group-item"><strong>{{ descName }}</strong><span class="pull-right glyphicon glyphicon-star" v-on:click="sendMyEVC"></span>
            </p>         
          </li>
          <li>
            <p id="showlist" class="list-group-item">Address<span class="pull-right">{{ descAddr }}</span></p>          
          </li>
          <li>
            <p id="showlist" class="showlist list-group-item">Status<span class="pull-right">{{ descSitu }}</span></p>
          </li>
          <li>
            <p id="showlist" class="showlist list-group-item">Type<span class="pull-right">{{ descType }}</span></p>
          </li>
          <li>
            <p id="showlist" class="showlist list-group-item">Available Time<span class="pull-right">{{ descTime }}</span></p>
          </li>
        </ul>
      </div>
      <div class="col-sm-6">
        <div class='google-map' id='mymap' ref="mymap"></div>
      </div>
    </div>
  </section>
</template>
<script>
/*
  ES6 Module : File using JS code
  ES6: Ramda / let,const / class
  You can use the keywords like import and export
  Automatically "use strict"
    1.export : use module out of this code
    2.import : use module in this code
*/
/* same with AJAX in javascript */
import tracking from '../viewModels/tracking'
import evcs from '../viewModels/evcs'
import icon from '../../static/images/EVCicon.png'
import icon2 from '../../static/images/EVCicon2.png'
import Favor from '../viewModels/favor'
import Map from '../viewModels/map'

/* It is same to export */
/* Unlike Angular.js, All of modules is in Component Logic */
export default {
  data () {
    return {
      blogs: [],
      markerT: {},
      myposition: {},
      infowindow: {},
      descName: '',
      descAddr: '',
      descTime: '',
      descSitu: '',
      descType: '',
      isFavor: 0,
      index: 0,
      icon: true,
      list: true,
      init: true
    }
  },
  methods: {
    /* When List clicked, show the specific info in clicked list */
    showInfo: function () {
      this.showDecs()
      if (event.target.firstChild.data) {
        let target = this.blogs.find((n) => {
          return n.statNm[0] === event.target.firstChild.data
        })
        this.isFavor = target.chosen
        this.descName = target.statNm[0]
        this.descAddr = target.addrDoro[0]
        this.descTime = target.useTime[0]
        this.descSitu = target.stat[0]
        this.descType = target.chgerType[0]

        for (var i in Map.markerT) {
          var marker = Map.markerT[i]
          var clickedlng = Math.round(marker.getPosition().lng() * 1000000) / 1000000
          var clickedlat = marker.getPosition().lat()
          var clickedIcon = {
            url: icon2,
            scaledSize: new window.google.maps.Size(25, 25),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(0, 0)
          }
          if (target.lat[0] === clickedlat && target.lng[0] === clickedlng) {
            this.index = i
            break
          }
        }

        marker = Map.markerT[this.index]
        marker.setIcon(clickedIcon)
        Map.map.setCenter(marker.getPosition())
        let infowindow = new window.google.maps.InfoWindow({
          content: '<div><strong>' + target.statNm[0] + '</strong></div>'
        })
        if (infowindow) {
          this.infowindow = infowindow
          infowindow.open(marker.get('map'), marker)
        }
        tracking.trackingList(target)
      }
    },
    showDecs: function () {
      this.list = false
    },
    showTitle: function () {
      this.list = true
      let originIcon = {
        url: icon,
        scaledSize: new window.google.maps.Size(25, 25),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(0, 0)
      }
      Map.markerT[this.index].setIcon(originIcon)
      Map.map.setCenter(Map.myposition)
      this.infowindow.close(Map.markerT[this.index].get('map'), Map.markerT[this.index])
    },
    showNavigation: function () {
      var clicked = event.target.parentNode.innerText.split('\n')
      let target = this.blogs.find((n) => {
        return n.statNm[0] === clicked[1]
      })
      window.Kakao.Navi.start({
        name: clicked[1],
        x: target.lng[0],
        y: target.lat[0],
        coordType: 'wgs84'
      })
    },
    sendMyEVC: function () {
      var clicked = event.target.parentNode.innerText
      let target = this.blogs.find((n) => {
        return n.statNm[0] === clicked
      })
      target.chosen = true
      event.target.className += ' changeStar'
      let resultState = Favor.Insert(target)
      if (resultState === 'success') {
        alert('My EVC에 추가되었습니다.')
      }
      if (resultState === 'fail') {
        alert('이미 추가한 EVC 입니다.')
      }
    }
  },
  /* mounted : The state that DOM, Components are available  */
  mounted: function () {
    evcs.Location().then((returnVal) => {
      const element = this.$refs.mymap
      const lat = returnVal.lat
      const lng = returnVal.lng
      console.log('현재위치 :' + lat + ' , ' + lng)
      evcs.Info(lat, lng).then((returnVal) => {
        if (Favor.Setter(returnVal)) {
          this.blogs = returnVal
          Map.show(element, returnVal, lat, lng)
        }
      })
      tracking.trackingPage(lat, lng)
    })
  },
  /* when calculated */
  computed: {
    sortedItems: function () {
      function compare (a, b) {
        if (a.statNm[0] > b.statNm[0]) return 1
        if (a.statNm[0] < b.statNm[0]) return -1
        return 0
      }
      return this.blogs.sort(compare)
    }
  }
}
</script>

<style lang='scss' scoped>
section {
    overflow-y: auto;
    position: relative;
    height: 340px;
    background: #2a2a2a;
    color: #2a2a2a;
    font: 15px/20px Arial, sans-serif;
}

.list-group-item:hover {
  color: black;
  background-color: white; 
}

.navibtn:hover {
  color: white;
  background-color: black;
}

.list-group-item {
  font-size: 15px;
  color: white;
  background-color: black;
  height: 40px;
}

#list-head {
  color: black;
  background-color: white;
}

#showlist:hover {
  color: white;
  background-color: black;
}

.google-map {
  position: relative;
  padding-bottom: 67%;
  height: 0;
  overflow: hidden;
}

.glyphicon {
  font-size: 50px;
  color: #ed1c24;
  padding: 2px;
}

.btn {
  font-size: 20px;
  height: 50px;
}

.clickbtn {
  font-size: 17px;
  height: 40px;
  background-color: #0174DF;
  color: white;
}
.clickbtn:hover {
  background-color: white;
  color: #0174DF;
}

.glyphicon-star {
  font-size: 20px;
  padding: 0 0 5px 0;
  color: #BDBDBD;
}

.changeStar {
  font-size: 20px;
  padding: 0 0 5px 0;
  color: #39b54a;
}
</style>