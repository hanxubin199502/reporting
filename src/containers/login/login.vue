<template>
  <div class="login" :class="dingwei">
    <div class="concentwarp">
        <div class="welcome"><img src="../../assets/dl.png" alt ></div>
      <div class="phoneinput">
        <div class="imgwarp">
            <img src="../../assets/s.png" alt class="phoneinputimg">
        </div>
        <input
          type="tel"
          maxlength="11"
          placeholder="手机号"
          v-model="phone"
          id="phonename"
          oninput="if(value.length > 11)value = value.slice(0, 11)"
        >
      </div>
      <div class="phoneinput" id="yanzhengmainput">
        <div class="imgwarp">
            <img src="../../assets/yz.png" alt class="phoneinputimg">
        </div>
        <input
          type="tel"
          placeholder="验证码"
          v-model="codeWord"
          class="imagesa"
          :disabled="disabled"
          @blur="animateWidth"
          id="codeinput"
        >
        <div class="loginImgBtn" @click="getCode" id="btnSendCode">
          <span v-show="show" >获取验证码</span>
          <span v-show="!show" class="count">{{count}}秒后获取</span>
        </div>
      </div>
      <div class="logobtnwarp">
        <button  class="logobtn" @click="logoclick">登录</button>
        <div class="btnzhezhao" v-show="btnzhezhao"></div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      Auseragreement: false,
      disabled: true,
      msg: '',
      show: true,
      count: "",
      cheackinput: false,
      concent: null,
      phone: "",
      codeWord: "",
      wxwarp: false,
      btnzhezhao: false,
      imgurl: 'checknone.png',
      logowarp: false,
      dingwei: "fixedfalse",
      useragreementwarp: false,
    }
  },
  methods: {
    touchmove () {

    },
    useragreement () {
      this.useragreementwarp = true
      document.body.scrollTop = 0
      this.dingwei = "fixedtrue"
    },
    Auseragreementclick () {
      this.Auseragreement = false
    },
    Closethedealclick () {
      this.useragreementwarp = false
    },
    // 验证码   
    getCode () {
        if(this.phone == ""){
            this.$layer.msg("请输入查询人手机号")
        }else if(this.phone.length != 11){
            this.$layer.msg("请输入正确的手机号")
        }else{
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.$server.regsms(this.phone).then(data => {
            console.log(data)
            if (data.code == "200") {
              this.disabled = false
              this.$layer.msg('已发送验证码')
            } else {
              this.$layer.msg('获取验证码失败')
            }
          })
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)

        }
      }   
    },
    // 登录
    logoclick () {
        if(this.phone == ""){
            this.$layer.msg("请输入查询人手机号")
        }else if(this.phone.length != 11){
            this.$layer.msg("请输入正确的手机号")
        }else if (this.codeWord == "") {
        this.$layer.msg("请输入验证码")
        }else{
        this.btnzhezhao = true
        if (sessionStorage.getItem('router')) {       
          let logoObj = {
            phone: this.phone,
            code: this.codeWord
          }
          this.$server.logo(logoObj).then(data => {
            this.btnzhezhao = false
            console.log(data)
            if (data.code == "200") {
              localStorage.setItem("accessToken", data.data.accessToken)
              this.$router.replace({ path: '/contacts' })
            }
          })
        } else {
          let logoObj = {
            phone: this.phone,
            code: this.codeWord
          }
          this.$server.logo(logoObj).then(data => {
            this.btnzhezhao = false
            console.log(data)
            if (data.code == "200") {
              this.$layer.msg('登录成功')
              localStorage.setItem("accessToken", data.data.accessToken)
              this.$router.replace({ path: sessionStorage.getItem('routerAAA') })
              // this.$router.replace({ path: '/' })
            }else if(data.code == "1000"){
              this.$layer.msg(data.msg)
            }
          })
        }
      }
    },
    animateWidth () {
      document.body.scrollTop = 0;
    }
  },
  created:function(){
    console.log(this.$route.path)
      if(this.$route.path == '/login'){
        console.log(this.$route.path)
         if(localStorage.getItem("accessToken")){
           this.$router.push({path:'/'})
      }
    }
  }
}

</script>
<style scoped>
.login {
    margin: 0px 15%;
    height: 100%;
    min-width: 1088px;
    overfrow:hidden;
    position: relative;
    bottom: 50px;
    background-image: url("../../assets/bj.png");
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;

}
.welcome{
    margin: 40px 0;
    margin-top: 20px;
    position: relative;
    bottom: 60px;
}
.head {
  width: 100%;
  height: 1.25rem;
  box-sizing: border-box;
  border-bottom: 1px solid #f2f2f2;
  color: #222;
}
.headauto {
  width: 95%;
  margin: 0 auto;
  text-align: center;
  line-height: 1.25rem;
  font-size: 0.45rem;
  position: relative;
}
.headimg {
  width: 0.373rem;
  height: 0.373rem;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -0.1865rem;
}
.concentwarp {
    margin: 0px 30%;
    position: relative;
    top: 175px;
    left: 263px;
    margin-bottom: 30%;
}
.logotitle {
  font-size: 0.45rem;
  margin-top: 0.8rem;
  color: #222;
}
.phoneinputimg {
  margin: 12px 12px;
  float: left;
  margin-top: 15px;
}
.phoneinput{
    width: 100%;
    border: 1px solid #cbcbcb;
    margin: 40px 0;
    border-radius: 5px;
}
.phoneinput input{
    width: 90%;
    height: 45px;
    border: none;
}
.phoneinput #codeinput {
  background: #fff;
}
.imgwarp {
  width: 1rem;
  height: 1.2rem;
  float: left;
}
.imagesa{
    width: 70% !important;
    height: 45px;
    border: none;
    background-color: #fff;
}
.phoneinput input:focus{
    outline: none;
}
#yanzhengimg {
  width: 0.46rem;
  height: 0.46rem;
  margin-top: 0.33rem;
}
#btnSendCode {
    width: 20%;
    text-align: center;
    line-height: 2.8rem;
    float: right;
    font-size: 0.373rem;
    color: #fff;
    background: #366eff;
    border-radius: 5px;
}
.logobtnwarp{
    width: 100%;
    height: 45px;
}
.logobtn{
    width: 100%;
    height: 45px;
    border: 1px solid #cbcbcb;
    border-radius: 5px;
    line-height: 45px;
    background-color: #366eff;
    color: #fff;
}
.btnzhezhao {
  width: 100%;
  height: 1.06rem;
  top: 0;
  left: 0;
  z-index: 5;
  position: absolute;
}
</style>
