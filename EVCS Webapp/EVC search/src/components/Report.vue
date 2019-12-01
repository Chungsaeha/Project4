<template>
	<section>
		<div class="row">
      <div class="col-sm-3">
      	<router-link id="home" to="/">
      		<span class="glyphicon glyphicon-home"></span>
      	</router-link>
      </div>
      <div class="col-sm-12">
        <div id="EVClist" class="list-group-item EVClist col-sm-12">GO TO Analysis Page
          <a href="http://192.168.0.224:8080/showdata" target="_blank"><span id="report" class="glyphicon glyphicon-stats"></span></a>
        </div>
      </div>
		</div>
	</section>
</template>
<script>
import tracking from '../viewModels/tracking'
import evcs from '../viewModels/evcs'

export default {
  data () {
    return {
      link: 'Go to Trakcing, Analysis Tool'
    }
  },
  mounted: function () {
    evcs.Location().then((returnVal) => {
      console.log('현재위치 :' + returnVal.lat + ' , ' + returnVal.lng)
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
    font-size: 30px;
}

.glyphicon-home {
  font-size: 50px;
  color: #f26522;
  padding: 2px;
}

.list-group-item {
  background-color: black;
  color: white;
}

#report {
  font-size: 40px;
  color: #f26522;
}

#report:hover {
  color: white;
}

</style>