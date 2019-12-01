<template>
  <div id="app">
    <obg-button>Large</obg-button>
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
  height: 362px;
  background:#1a1a1a;
  color: #ffffff;
  font-family: 'OpenSans-Regular';
}
</style>
