import Vue from 'vue'
import Router from 'vue-router'
import index from '@/containers/index/index' //顶部导航（公共）
import home from '@/containers/home/home'    //黑名单风险检测
import operator from '@/containers/operator/operator'  //运营商诊断
import contacts from '@/containers/contacts/contacts'  //紧急联系人风险检测
import myreport from '@/containers/myreport/myreport' //我的报告
import riskdetail from '@/containers/riskdetail/riskdetail' //查看详情
import login from '@/containers/login/login'//登录
import highcharts from '@/containers/highcharts/highcharts' //chart
import contactsdetail from '@/containers/contactsdetail/contactsdetail' //联系人详情
import pie from '@/containers/pie/pie'
import pirese from '@/containers/pirese/pirese'
import operatordetail from '@/containers/operatordetail/operatordetail' //运营商诊断详情
// import blacklist from '@/sidebar/blacklist/blacklist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/',
      name: 'home',
      meta:{index:0,navindex:0},
      component: home
    },
    {
      path: '/home',
      name: 'home',
      meta:{index:0,navindex:0},
      component: home
    },
    {
      path:'/operator',
      name:'operator',
      meta:{index:1,navindex:1},
      component:operator
    },
    {
      path:'/contacts',
      name:'contacts',
      meta:{index:2,navindex:2},
      component:contacts
    },
    {
      path:'/myreport',
      name:'myreport',
      meta:{index:2,navindex:2},
      component:myreport
    },
    {
      path:'/riskdetail',
      name:'riskdetail',
      component:riskdetail
    },
    {
      path:'/contactsdetail',
      name:'contactsdetail',
      component:contactsdetail
    },
    {
      path:'/pie',
      name:'pie',
      component:pie
    },
    {
      path:'/pirese',
      name:'pirese',
      component:pirese
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/highcharts',
      name:'highcharts',
      component:highcharts
    },
    {
      path:'/operatordetail',
      name:'operatordetail',
      component:operatordetail
    },
 
 

  ]
})
