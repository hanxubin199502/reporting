<template>
  <div id="app">
    <index :class='$route.meta.navindex'/>
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
import index from './containers/index/index'
export default {
  components:{
    index,
  },
  name: 'App',
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return {
      isRouterAlive:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
      this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
