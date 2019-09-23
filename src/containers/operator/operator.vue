<template>
  <div class="operator">
       <div class="smilbanner">
             <img src="../../assets/bannerc.jpg" alt="">
        </div>
     <div class="homelist">
         <div class="title">请输入运营商信息</div>
          <div class="formlist">
               <div class="phoneinput">
                    <div class="imgwarp">
                       <img src="../../assets/s.png" alt class="phoneinputimg">
                    </div>
                    <input
                    type="tel"
                    maxlength="11"
                    placeholder="手机号"
                    v-model="teleponenum1"
                    id="phonename"
                    oninput="if(value.length > 11)value = value.slice(0, 11)"
                    >
              </div>
              <div class="phoneinput">
                    <div class="imgwarp">
                       <img src="../../assets/m.png" alt class="phoneinputimg">
                    </div>
                    <input
                    type="tel"
                    placeholder="手机服务密码"
                    id="usernamelist"
                    v-model="serverspwd"
                    oninput="if(value.length > 6)value = value.slice(0, 6)"
                    >
               </div>
              <div class="phoneinput" id="yanzhengmainput" v-show="yzcode">
                    <div class="imgwarp">
                       <img src="../../assets/yz.png" alt class="phoneinputimg">
                    </div>
                    <input
                    type="tel"
                    placeholder="验证码"
                    id="codeinput"
                    class="imagesad"
                    v-model="codeWord"
                    @blur="animateWidth"
                    >
                    <!-- <div class="loginImgBtn" id="btnSendCodes" @click="getCode">
                        <span v-show="show">获取验证码</span>
                        <span v-show="!show" class="count">{{count}}秒后重新获取</span>
                    </div> -->
               </div>
              <!-- <div class="tiaoli">
                    <div @click="tiaoliclick">
                    <img :src="require('../../assets/'+imgurl)" alt class="cheackinput">
                    </div>
                    <span class="agreement">您已同意《征信服务协议》</span>
              </div> -->
               <div class="logobtnwarp">
                    <div class="logobtn" @click="logoclick">立即检测</div>
                    <Modal
                    title="该平台不支持自动扣款，请用户用微信扫码支付"
                    v-model="myretapemode"
                    class="myreportseta"
                    :closable='false'
                    :mask-closable="false"
                    class-name="vertical-center-modal">
                    <div class="mastart" @click="dialog = true">X</div>
                    <Modal
                        v-model="dialog"
                        :closable='false'
                        @on-ok="ok"
                        title="运营商诊断"
                        @on-cancel="cancel">
                        <p style="font-size: 16px;">是否放弃本次支付，可以在我的报告页面重新支付</p>
                    </Modal>
                        <div class="paylist">
                            <!-- <div class="paypng">
                            <div id="qrcode"></div>
                            </div> -->
                            <div class="wxpay"><img :src="msg.wxPayQrCode" alt=""></div>
                        </div>
                        <div class="paytext">
                            <div>服务名称</div>
                            <div>{{msg.productName}}</div>
                        </div>
                        <div class="paytext">
                            <div>价格</div>
                            <div class="money">￥{{msg.price}}<span class="moey">￥{{msg.originalPrice}}</span></div>
                        </div>              
                    <div slot="footer"></div>
                    </Modal>
               </div>
               <div class="lodings" v-show="lodinglist">
                   <div class='lodingimg'><img src="../../assets/zhuans.png" alt=""><div class="loginsize">加载中。。。</div></div>
               </div>
         </div>
     </div>
  </div>
</template>

<script>
 export default {
     name:'operator',
        data () {
            return {
               serverspwd:'',
               codeWord:'',
               msg: '',
               teleponenum1:'',
               imgurl: 'checknone.png',
               concent: null,
               cheackinput: false,
               myretapemode: false,
               count: "",
               show: true,
               orderId:'',
               disabled: true,
               lodinglist:false,
               dialog:false,
               timer:null,
               yzcode:false,        
            }
        },
        created:function(){
          sessionStorage.removeItem('username')
          sessionStorage.removeItem('idcard')
          sessionStorage.removeItem('teleponenum')
          sessionStorage.removeItem('phone')
        },
        mounted:function(){
          sessionStorage.setItem('routerAAA',"/operator")
          let session = sessionStorage['teleponenum1']
          let sessioned = sessionStorage['serverspwd']
          if(session != null){
            this.teleponenum1 = session
          }
           if(sessioned != null){
            this.serverspwd = sessioned
          }
        },
        methods: {
             ok(){
                setTimeout(()=>{
                   this.$router.push({path:'./myreport'})
                },2000)
              
            },
            cancel(){
               this.dialog = false
               this.myretapemode = false
               clearInterval(this.timer)
               this.timer = null
            },
            //获取验证码
            // getCode () {
            //     if (this.teleponenum == "") {
            //         this.$layer.msg("请输入查询人手机号")
            //     } else if (this.teleponenum.length != 11) {
            //         this.$layer.msg("请输入正确手机号")
            //     }else if(this.serverspwd == ""){
            //         this.$layer.msg("手机服务密码不能为空")
            //     }else if(this.serverspwd.length !=6){
            //         this.$layer.msg('请输入正确的手机服务密码')
            //     }else {
            //         const TIME_COUNT = 60;
            //         if (!this.timer) {
            //         this.count = TIME_COUNT;
            //         this.show = false;
            //         let regsmsoper = {
            //             phone: this.teleponenum,
            //             phonePassword: this.serverspwd
            //         }
            //         this.$server.operater(regsmsoper).then(data => {
            //             console.log(data)
            //             this.orderId = data.data.orderId
            //             if (data.code == "200") {
            //             this.disabled = false
            //             this.$layer.msg('验证码发送成功')
            //             } else {
            //             this.$layer.msg(data.msg)
            //             }
            //         })
            //         this.timer = setInterval(() => {
            //             if (this.count > 0 && this.count <= TIME_COUNT) {
            //             this.count--;
            //             } else {
            //             this.show = true;
            //             clearInterval(this.timer);
            //             this.timer = null;
            //             }
            //         }, 1000)

            //         }

            //     }
            //     },
             //立即检测
            logoclick() {
                if(this.teleponenum1 == ""){
                    this.$layer.msg("请输入查询人手机号")
                }else if(this.teleponenum1.length !=11){
                    this.$layer.msg("请输入正确的手机号")
                }else if(this.serverspwd == ""){
                    this.$layer.msg("请输入查询人手机服务密码")
                }else if(this.serverspwd.length !=6){
                    this.$layer.msg('请输入正确的手机服务密码')
                }
                else{
                    let operction = {
                        phonePassword:this.serverspwd,
                        phone:this.teleponenum1,
                        phoneCaptcha:this.codeWord,
                        orderId:this.orderId
                    }
                    this.lodinglist = true
                    this.$server.operdiately(operction).then(data =>{
                    sessionStorage.setItem("teleponenum1", this.teleponenum1)
                    sessionStorage.setItem("serverspwd", this.serverspwd)
                    if(data.code == 1101){
                      this.$layer.msg('您还未登录，请登录')
                      this.$router.push({path:'./login'})
                    }else if(data.code == 1103){
                      this.$layer.msg('用户信息失效，请登录')
                      this.$router.push({path:'./login'})
                    }else{
                      if(data.code == 200){
                          if(data.data.isNeedCode == true){
                             this.yzcode = true
                             this.lodinglist = false
                              this.orderId = data.data.orderId                               
                              }else if(data.data.isNeedCode == false){
                                this.lodinglist = true
                                sessionStorage.removeItem('teleponenum1')
                                sessionStorage.removeItem('serverspwd')
                                localStorage.removeItem('routerAAA')
                                    let pay = {
                                      orderId:data.data.orderId,
                                      ip:'124.204.64.154'
                                    }                           
                                    this.$server.payment(pay).then(data =>{
                                        console.log(data)                                       
                                            if(data.code == 200){
                                              this.msg = data.data
                                              this.myretapemode = true
                                              this.lodinglist = false
                                              this.$layer.msg('请填写手机验证码')
                                               this.timer = setInterval(()=>{
                                                let godpay = data.data.orderId
                                                this.$server.paystatus(godpay).then(data =>{                                                
                                                    if(data.data.payStatus == 12){                                           
                                                        this.$layer.msg("支付成功")  
                                                        clearInterval(this.timer)
                                                        setTimeout(() =>{
                                                          this.$router.push({path:'./myreport'})
                                                        },2000)                                                                               
                                                    }else if(data.data.payStatus == 13){
                                                        this.$layer.msg("支付失败，请重新支付")
                                                    }                                                
                                                })
                                            },2000)                                  
                                        }          
                                    })
                                }                                
                          }else{
                          this.lodinglist = false
                          this.$layer.msg(data.msg)
                        }
                    }
                    })
                }
            },
            animateWidth () {
            document.body.scrollTop = 0;
            },
            //用户协议
            tiaoliclick () {
                this.concent++;
                if (this.concent % 2 != 0) {
                    this.cheackinput = true
                    this.imgurl = 'x.png'
                } else {
                    this.cheackinput = false
                    this.imgurl = 'checknone.png'
                }
            },
        },
        beforeDestroy() {
                clearInterval(this.timer);        
                this.timer = null;
            },
    }
</script>
<style >
.operator{
    margin: 0px 15%;
    margin-top: -51px;
    height: 666px;
    min-width: 1088px;
    margin-bottom: 200px;
    border:1px solid #cbcbcb;
    border-top:none;
}
.title{
    text-align: left;
    font-size: 1rem;
    font-weight: bold;
}
.formlist{
    width: 100%;
    height: 300px;
    float: left;
}
.tiaoli {
  width: 100%;
  height: 2rem;
  margin-top: 0.4rem;
  font-size: 0.34rem;
}
.tiaoli div {
  color: #999;
  display: inline;
}
.cheackinput {
  width: 18px;
  height: 18px;
}
.agreement{
  position: relative;
  bottom: 6px;
}
#btnSendCodes{
    width: 20%;
    border: 1px solid #2d8cf0;
    text-align: center;
    line-height: 2.8rem;
    float: right;
    font-size: 0.373rem;
    color: #2d8cf0;
    border-radius: 5px;
    cursor:default;
}
.imgwarp {
  width: 1rem;
  height: 1.2rem;
  float: left;
}
.phoneinputimg {
  margin: 12px 12px;
  float: left;
  margin-top: 15px;
}
.phoneinput{
    width: 100%;
    border: 1px solid #cbcbcb;
    margin: 20px 0;
    border-radius: 5px;
}
.phoneinput input{
    width: 90%;
    height: 45px;
    border: none;
}
.imagesad{
    width: 90% !important;
    height: 45px;
    border: none;
    background-color: #fff;
}
.phoneinput input:focus{
    outline: none;
}
.smilbanner{
    width: 100%;
    min-width: 800px;
}
.smilbanner img{
    width: 100%;
    height: 100%;
}
.homelist{
    margin: 0px 25%;
    position: relative;
    top: 10px;
    left: 0;
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
    background-color: #57a3f3;
    color: #fff;
    cursor:default;
}
.myreportseta{
    text-align: center;
    font-size: 1rem;
}
.ivu-modal-content{
    width: 40rem !important;
}
.paylist{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.paypng{
    width: 18rem;
    height: 22rem;
    background-image: url("../../assets/pay.png");
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.wxpay{
    margin: 0 auto;
    width: 18rem;
    height: 22rem;
    background-image: url("../../assets/wxpay.jpg");
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.wxpay img{
    width: 146px;
    margin-top: 60%;
}
.paytext{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem 0;
    font-size: 1rem;
    font-weight: bold;
}
.money{
    font-size: 1.5rem;
}
.moey{
    font-size: 0.5rem;
    float: right;
    margin-top: 0.7rem;
    text-decoration:line-through;
    width:80px;
    height:20px;
    line-height:20px
}
.lodings{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(3, 3, 3, 0.3);
}
.load_title{
     font-family: 'Open Sans';
      color: #fff;
      font-size: 19px;
      width: 100%;
      text-align: center;
      position: absolute;
      top: 60%;
      opacity: 1;
      line-height: 30px;
}
.lodingimg{
      position: absolute;
      top: 40%;
      left: 45%;
}
.lodingimg img{
     width: 180px;
     -webkit-transform: rotate(360deg);
    animation: rotation 8s linear infinite;
    -moz-animation: rotation 8s linear infinite;
    -webkit-animation: rotation 8s linear infinite;
    -o-animation: rotation 8s linear infinite;
}
 @-webkit-keyframes rotation {
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
    }
}
.mastart{
      position: relative;
      bottom: 52px;
      left: 297px;
      font-size: 16px;
      cursor:default;
}
.ivu-btn-large{
      width: 60px !important;
      height: 40px !important;
}
.loginsize{
  width: 115px;
  position: relative;
  left: 40px;
  bottom: 105px;
  color: #fff;
  font-size: 14px;
}
</style>
