<template>
  <div id='app'>
    <router-view></router-view>
    <obg-footer :mask=false @back='onBack' @more='onMore' disable='right'></obg-footer>
  </div>
</template>

<script>
import footer from 'obigo-js-ui-rnbs/src/components/footer'

export default {
  name: 'home',
  components: {
    'obg-footer': footer
  },
  methods: {
    onBack (evt) {
      console.log(evt)
      if (window.applicationFramework) {
        window.applicationFramework.applicationManager.getOwnerApplication(window.document).back()
      }
    },
    onMore (evt) {
      console.log(evt)
    }
  }
}
</script>

<style lang="scss">
@import '~obigo-js-ui-rnbs/dist/styles/reset.scss';
@import '~obigo-js-ui-rnbs/dist/styles/icon.scss';
@import '~obigo-js-ui-rnbs/dist/styles/theme.scss';

#app{
  position: relative;
  width: 800px;
  height: 423px;
  background:#2a2a2a;
  color: #ffffff;
}
</style>
