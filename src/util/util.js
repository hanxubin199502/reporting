import Vue from 'vue';
import axios from 'axios';
import router from '../router'

export const server = {
    regsms: function (regsmsObj) {
        return post(`/login/code/${regsmsObj}`); //验证码
    },
    logo: function (logoObj) {
    return post('/login', logoObj); //登录
    },
    immediately:function(detection){
        return post('/api/blackList',detection); //黑名单立即检测
    },
    payment:function(pay){
        return post('/pay/doPay/pc',pay);
    },
    paystatus:function(godpay){
        return post(`/order/${godpay}`);
    },
    orderslist:function(start,limit){
        return post(`/order/list/1/40`);
    },
    detection:function(contacts){
        return post('/api/contacts',contacts);
    },
    examinelist:function(examine){
        return post(`/order/viewReport/${examine}`)
    },
    operater:function(regsmsoper){
        return post('/api/operator/code/',regsmsoper)  //运营商获取验证码
    },
    operdiately:function(operction){
        return post('/api/operator',operction)  //运营商检测
    },


}

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, data)
        .then(response => {
          resolve(response.data);
        //   if (response.data.respCode == "0003") {
        //     console.log(router.history.current.name)
        //     sessionStorage.setItem("router", router.history.current.name)
        //     // store.commit("alert",true)
        //     // store.commit("msg",response.data.respMsg)
        //     // localStorage.removeItem('sessionCode'),
        //     //   localStorage.removeItem('sessionId')
        //   }
  
        }, err => {
          reject(err)
        })
    })
  }

axios.defaults.timeout = 30000; //网络超时 
axios.defaults.baseURL = 'http://124.204.64.154:8889/lmhd-boot-gateway-crapi'
// axios.defaults.baseURL = 'http://phkd.duobaogo.cn:21880/'

//http request 拦截器  
axios.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/json',
      accessToken:localStorage.getItem("accessToken") || ''
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);
//响应拦截器即异常处理 
axios.interceptors.response.use(response => {
  console.log(response.data.code)
  switch (response.data.code) {
    case "1103":
      localStorage.removeItem('accessToken')
      router.replace({
        path:'../login'
      })
      // this.$layer.msg("用户登录失效，请重新登录")
      // this.$router.push({path:'../containers/login/login'})
    //   break;
    // case "1101":
    //   router.replace({
    //     path:'../login'
    //   })
  }
  return response
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        console.log('错误请求')
        break;
      case 401:
        console.log('未授权，请重新登录')
        break;
      case 403:
        console.log('拒绝访问')
        break;
      case 404:
        console.log('请求错误,未找到该资源')
        break;
      case 405:
        console.log('请求方法未允许')
        break;
      case 408:
        console.log('请求超时')
        break;
      case 500:
        console.log('服务器端出错')
        break;
      case 501:
        console.log('网络未实现')
        break;
      case 502:
        console.log('网络错误')
        break;
      case 503:
        console.log('服务不可用')
        break;
      case 504:
        console.log('网络超时')
        break;
      case 505:
        console.log('http版本不支持该请求')
        break;
      default:
        console.log(`连接错误${err.response.status}`)
    }
  } else {
    console.log('连接到服务器失败')
    // 断网处理
  }
  return Promise.reject(err)
})


export let token = "4e6566d7ddf84dd5bd5926bf8ad05046" //版本号
export default ({

})
