// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueI18n from 'vue-i18n'
import {server} from './util/util'
import layer from 'vue-layer'
import highcharts from 'highcharts'
import Highcharts from 'highcharts/highstock'
import HighchartsMore from 'highcharts/highcharts-more.js'
import SolidGauge from 'highcharts/modules/solid-gauge.js'
import Wordcloud from  'highcharts/modules/wordcloud'
HighchartsMore(highcharts)
SolidGauge(highcharts)
Vue.use(iView)
Vue.use(VueI18n)
Vue.prototype.$layer = layer(Vue)
Vue.config.productionTip = false
Vue.prototype.$server=server
Vue.use(highcharts)
Wordcloud(Highcharts)




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  methods:{
         moreChart(){
           let options = this.getMoreOptions(this,type);
           if(this.chart){
             this.chart.destory();
           };
           this.chart = new Highcharts.Chart('highcharts-more', options);
         }
  }
})
