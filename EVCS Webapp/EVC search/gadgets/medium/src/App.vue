<template>
  <div id="app">
    <obg-button>Midium</obg-button>
  </div>
</template>

<script>
import button from 'obigo-js-ui/src/components/button'

export default {
  name: 'home',
  components: {
    'obg-button': button
  }
}
</script>

<style>
#app {
  position: relative;
  width: 390px;
  height: 178px;
  background:#1a1a1a;
  color: #ffffff;
  font-family: 'OpenSans-Regular';
}
</style>
