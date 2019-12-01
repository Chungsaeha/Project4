<template>
  <section>
    <div class="row">
      <div class="col-sm-12">
        <div class="col-sm-1"><router-link id="home" to="/"><span class="glyphicon glyphicon-home"></span></router-link></div>
        <div class="btn-group col-sm-3">
          <button type="button" class="btn btn-default">{{ mymenu }}</button>
          <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu" role="menu">
            <li><a class="dropdown" v-on:click="menuName">EVC Name</a></li>
            <li><a class="dropdown" v-on:click="menuLocation">EVC Location</a></li>
          </ul>
        </div>
        <div v-if="menu" class="input-group col-sm-7">
          <input type="text" class="form-control" v-model="myinput">
          <span class="input-group-btn">
            <button id="search" type="button" class="btn btn-default" v-on:click="searchName">Search</button>
          </span>
        </div>
        <div style="margin: 5px 0px 0px 0px;" v-else class="searchMenu form-group col-sm-8">
          <!-- 여기도 v-model로 양방향 바인딩 구현하자 -->
          <select v-model="city" v-on:change="choiceCity" class="areaSearch form-control">
            <option class="menu-header">시 / 도</option>
            <option class="menu-list" v-for="city in cities">{{ city }}</option>
          </select>
          <select v-model="town" v-on:change="choiceTown" class="areaSearch form-control">
            <option class="menu-header">시 / 군 / 구</option>
            <option class="menu-list" v-for="town in towns">{{ town }}</option>
          </select>
          <select v-model="street" v-on:change="choiceStreet" class="areaSearch form-control">
            <option class="menu-header">도로명 / 건물번호</option>
            <option class="menu-list" v-for="street in streets">{{ street }}</option>
          </select>
        </div>
      </div>
      <div style="overflow:scroll; height:290px;" v-if="list" class="col-sm-12">
        <ul class="list-group">
          <!-- blogs array for Loop -->
          <li v-for="blog in blogs">
            <p id="EVClist" class="list-group-item EVClist" v-on:click="showInfo">{{ blog.statNm[0] }}<span class="pull-right">{{ Math.round(blog.distance) }}Km</span></p>
          </li>
        </ul>
      </div>
      <div v-else class="col-sm-12">
        <button id="back" class="clickbtn btn btn-default" v-on:click="showTitle">Back</button>
        <button class="clickbtn navibtn btn btn-default pull-right" v-on:click="showNavigation">Navigation</button>
        <ul class="list-group">
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
            <p id="showlist"class="list-group-item">Status<span class="pull-right">{{ descSitu }}</span></p>
          </li>
          <li>
            <p id="showlist"class="list-group-item">Type<span class="pull-right">{{ descType }}</span></p>
          </li>
          <li>
            <p id="showlist"class="list-group-item">Available Time<span class="pull-right">{{ descTime }}</span></p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<!-- v-model - 방향 데이터 바인딩을 가능하게 해줌. -->
<script>
import tracking from '../viewModels/tracking'
import evcs from '../viewModels/evcs'
import favor from '../viewModels/favor'
export default {
  data () {
    return {
      /* v-model: interactive binding */
      city: '시 / 도',
      town: '시 / 군 / 구',
      street: '도로명 / 건물번호',
      myinput: '',
      mymenu: 'EVC Name',
      /* v-for */
      blogs: [],
      origins: [],
      cities: [],
      towns: [],
      streets: [],
      /* v-if */
      isFavor: 0,
      list: true,
      menu: true
    }
  },
  /* v-on : Event  ---> in methods */
  methods: {
    /* When List clicked, show the specific info in clicked list */
    showInfo: function () {
      this.showDecs()
      let target = this.blogs.find((n) => {
        return n.statNm[0] === event.target.firstChild.data
      })
      this.isFavor = target.chosen
      this.descName = target.statNm[0]
      this.descAddr = target.addrDoro[0]
      this.descTime = target.useTime[0]
      this.descSitu = target.stat[0]
      this.descType = target.chgerType[0]

      tracking.trackingList(target)
    },
    showDecs: function () {
      this.list = false
    },
    showTitle: function () {
      this.list = true
    },
    showNavigation: function () {
      let clicked = event.target.parentNode.innerText.split('\n')
      let target = this.origins.find((n) => {
        return n.statNm[0] === clicked[1]
      })
      window.Kakao.Navi.start({
        name: clicked[1],
        x: target.lng[0],
        y: target.lat[0],
        coordType: 'wgs84'
      })
    },
    menuName: function () {
      this.menu = true
      this.mymenu = 'EVC Name'
      this.showTitle()
      if (this.blogs) {
        this.blogs = []
      }
    },
    menuLocation: function () {
      this.menu = false
      this.mymenu = 'EVC Location'
      this.showTitle()
      if (this.blogs) {
        this.blogs = []
      }
    },
    searchName: function () {
      this.showTitle()
      let searchedN = this.myinput
      if (!searchedN) {
        alert('검색어를 입력해주세요.')
      } else {
        let target = this.origins.filter((n) => {
          return n.statNm[0].indexOf(searchedN) !== -1
        })
        target.sort((a, b) => {
          return a.distance - b.distance
        })
        favor.Setter(target)
        this.blogs = target
      }
    },
    choiceCity: function () {
      let target = this.origins.filter((v, i) => {
        if (v.city === this.city) {
          return v
        }
      })
      let town = []
      target.forEach((v, i) => {
        if (town.indexOf(v.town) === -1) town.push(v.town)
      })
      this.showTitle()
      town.sort()
      this.towns = town
      this.town = '시 / 군 / 구'
      this.street = '도로명 / 건물번호'
      if (this.streets) {
        this.streets = []
      }
      favor.Setter(target)
      this.blogs = target
    },
    choiceTown: function () {
      let target = this.origins.filter((v, i) => {
        if (v.city === this.city && v.town === this.town) {
          return v
        }
      })
      let street = []
      target.forEach((v, i) => {
        if (v.street) {
          if (street.indexOf(v.street) === -1) street.push(v.street)
        }
      })
      this.showTitle()
      street.sort()
      this.streets = street
      this.street = '도로명 / 건물번호'
      favor.Setter(target)
      this.blogs = target
    },
    choiceStreet: function () {
      let street = this.street
      street = street.replace(/(\s*)/g, '')
      let target = this.origins.filter((v, i) => {
        v.addr = v.addrDoro[0].replace(/(\s*)/g, '')
        if (v.addr.indexOf(street) !== -1) {
          return v
        }
      })
      this.showTitle()
      favor.Setter(target)
      this.blogs = target
    },
    sendMyEVC: function () {
      let clicked = event.target.parentNode.innerText
      let target = this.blogs.find((n) => {
        return n.statNm[0] === clicked
      })
      target.chosen = true
      event.target.className += ' changeStar'
      console.log(target)
      let resultState = favor.Insert(target)
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
    /* axios sync --> After getLocation, getEVCinfo */
    evcs.Location().then((returnVal) => {
      this.lat = returnVal.lat
      this.lng = returnVal.lng

      console.log('현재위치 :' + this.lat + ' , ' + this.lng)
      evcs.Info(this.lat, this.lng).then((returnVal) => {
        let city = []
        this.origins = returnVal
        returnVal.forEach((v, i) => {
          if (city.indexOf(v.city) === -1) city.push(v.city)
        })
        city.sort()
        this.cities = city
      })
      tracking.trackingPage(this.lat, this.lng)
    })
  }
}
</script>

<style lang='scss' scoped>
section {
    overflow-y: auto;
    position: relative;
    background: #2a2a2a;
    height:360px;
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

.glyphicon-home {
  font-size: 50px;  
  color: #0072bc;
  margin: 5px 0px 5px 0px;
}

#showlist:hover {
  color: white;
  background-color: black;
}

.btn, input, .dropdown {
  font-size: 19px;
  height: 40px;
  margin: 15px 0px 0px 0px;
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

.areaSearch {
  font-size: 15px;
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