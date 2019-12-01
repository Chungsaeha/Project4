<template>
  <section v-on:touchstart="touchD" v-on:touchend="touchU">
    <div class='container'>
      <div ref="carousel" class='carousel'>
        <router-link id='menu1' to='/list'><p class='item a'> {{ menu1 }} <i class='glyphicon glyphicon-list'></i></p>
        </router-link>
        <router-link id='menu2' to='/search'><p class='item b'> {{ menu2 }} <i class='glyphicon glyphicon-search'></i></p>
        </router-link>
        <router-link id='menu3' to='/favorite'><p class='item c'> {{ menu3 }} <i class='glyphicon glyphicon-star'></i></p>
        </router-link>
        <router-link id='menu4' to='/report'>
          <p class='item d'>
              {{ menu4 }}<i class='glyphicon glyphicon-stats'></i>
          </p>
        </router-link>
      </div>
    </div>
    <button class="next" v-on:click="nextMove">NEXT</button>
    <button class="prev" v-on:click="prevMove">PREV</button>
  </section>
</template>

<script>
import axios from 'axios'
import tracking from '../viewModels/tracking'

export default {
  data () {
    return {
      e: '',
      currdeg: 0,
      menu1: 'Near EVC',
      menu2: 'Search EVC',
      menu3: 'My EVC',
      menu4: 'Analysis',
      initX: 0,
      lat: 0,
      lng: 0
    }
  },
  methods: {
    rotate: function (e) {
      var carousel = this.$refs.carousel
      if (e === 'n') {
        this.currdeg = this.currdeg - 90
      }
      if (e === 'p') {
        this.currdeg = this.currdeg + 90
      }
      carousel.style.setProperty('transform', 'rotateY(' + this.currdeg + 'deg)')
    },
    getLocation: function () {
      /* HTTPS method */
      return axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCRTcJ1lUjy6BX5paKi3fEw0Bsz_VI9toE').then((response) => {
        return response.data.location
      })
    },
    touchD: function () {
      this.initX = event.changedTouches[0].pageX
    },
    touchU: function () {
      var upX = event.changedTouches[0].pageX
      var minRange = this.initX - 20
      var maxRange = this.initX + 20
      if (upX > maxRange || upX < minRange) {
        if (upX > maxRange) {
          this.rotate('p')
        } else {
          this.rotate('n')
        }
      }
    },
    nextMove: function () {
      this.e = 'n'
      this.rotate(this.e)
    },
    prevMove: function () {
      this.e = 'p'
      this.rotate(this.e)
    }
  },
  mounted: function () {
    this.getLocation().then((returnVal) => {
      this.lat = returnVal.lat
      this.lng = returnVal.lng
      console.log('현재위치 :' + this.lat + ' , ' + this.lng)
      tracking.trackingPage(this.lat, this.lng)
    })
  }
}
</script>
<style lang='scss' scoped>
.section {
  font: 15px/20px Arial, sans-serif;
}
.carousel{
  width: 60%;
  height: 60%;
  position: absolute;
  transform: translateZ(-250px);
  transform-style: preserve-3d;
  transition: transform .5s;
  transform: rotateY(0deg);
}

.container {
  width: 250px;
  height: 250px;
  position: relative;
  perspective: 1000px;
  padding: 4em;
}

.item {
  display: block;
  position: absolute;
  width: 138px;
  height: 138px;
  line-height: 138px;
  font-size: 1.5em;
  text-align: center;
  color: #FFF;
  opacity: 0.80;
  border-radius: 10px;
}

.a {
  transform: rotateY(0deg) translateZ(200px);
  background: #ed1c24;
}
.b {
  transform: rotateY(90deg) translateZ(200px);
  background: #0072bc;
}
.c {
  transform: rotateY(180deg) translateZ(200px);
  background: #39b54a;
}
.d {
  transform: rotateY(270deg) translateZ(200px);
  background: #f26522;
}

.next, .prev {
  font-size: 20px;
  color: white;
  background-color: black;
  position: absolute;
  top: 280px;
  padding: 0.5em 1.5em;
  cursor: pointer;
  border-radius: 10px;
  border-top: 1px solid #151515;
  box-shadow: 5px 5px 5px #151515;
  transition: box-shadow 0.1s, top 0.1s;
}

.next { right: 3em; }
.prev { left: 3em; }
</style>