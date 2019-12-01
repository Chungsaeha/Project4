<template>
	<section>
		<div class="row">
        <div class="col-sm-12">
          <router-link id="home" to="/">
            <span class="glyphicon glyphicon-home"></span>
          </router-link>
        </div>
	      <div v-if="list" class="col-sm-12" style="overflow:scroll; height:250px;">
	        <ul class="list-group">
            <li>
              <p style="background-color:#0174DF; color:white;" id="EVClist" class="list-group-item EVClist">INSERT INTO your favorite EVC</p>
            </li>
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
              <p id="list-head" class="showlist list-group-item">
                <strong>{{ descName }}</strong>
                <span class="pull-right glyphicon glyphicon-star" v-on:click="deleteMyEVC"></span>
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

<script>
  import tracking from '../viewModels/tracking'
  import evcs from '../viewModels/evcs'
  import favor from '../viewModels/favor'

  export default {
    data () {
      return {
        blogs: [],
        list: true
      }
    },
    methods: {
      /* When List clicked, show the specific info in clicked list */
      showInfo: function () {
        this.showDecs()
        var target = this.blogs.find((n) => {
          return n.statNm[0] === event.target.firstChild.data
        })
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
      deleteMyEVC: function () {
        var clicked = event.target.parentNode.innerText
        var target = this.blogs.find((n) => {
          return n.statNm[0] === clicked
        })
        var resultState = favor.Delete(target)
        if (resultState === 'success') {
          this.blogs = this.blogs.filter((n) => {
            if (n.statNm[0] === target.statNm[0]) return false
            return true
          })
          alert('MyEVC에서 삭제되었습니다.')
          this.showTitle()
        }
      },
      showNavigation: function () {
        var clicked = event.target.parentNode.innerText.split('\n')
        var target = this.blogs.find((n) => {
          return n.statNm[0] === clicked[1]
        })
        window.Kakao.Navi.start({
          name: clicked[1],
          x: target.lng[0],
          y: target.lat[0],
          coordType: 'wgs84'
        })
      }
    },
    mounted: function () {
      evcs.Location().then((returnVal) => {
        console.log('현재위치 :' + returnVal.lat + ' , ' + returnVal.lng)
        var favorArr = favor.Getter()
        this.blogs = favorArr.sort((a, b) => {
          return a.distance - b.distance
        })
        tracking.trackingPage(returnVal.lat, returnVal.lng)
      })
    }
  }
</script>

<style lang='scss' scoped>
section {
    overflow-y: auto;
    position: relative;
    height: 363px;
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

.glyphicon {
  font-size: 50px;  
  color: #39b54a;
  padding: 2px;
}

#showlist:hover {
  color: white;
  background-color: black;
}

.btn, input, .dropdown, .form-control {
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
  color: #39b54a;
}
</style>