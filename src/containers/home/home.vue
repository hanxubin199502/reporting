<template>
  <div class="hellos">
       <div class="smilbanner">
             <img src="../../assets/bannera.jpg" alt="">
        </div>
     <div class="homelist">
         <div class="title">请输入查询对象身份信息</div>
         <div class="formlist">
             <div class="phoneinput">
                    <div class="imgwarp">
                       <img src="../../assets/xm.png" alt class="phoneinputimg">
                    </div>
                    <input
                    type="tel"
                    placeholder="姓名"
                    id="usernamelist"
                    v-model="username"
                    >
               </div>
              <div class="phoneinput" id="yanzhengmainput">
                    <div class="imgwarp">
                       <img src="../../assets/ID.png" alt class="phoneinputimg">
                    </div>
                    <input
                    type="tel"
                    maxlength="18"
                    placeholder="身份证号"
                    id="codeinput"
                    v-model="idcard"
                    oninput="if(value.length > 18)value = value.slice(0, 18)"
                    >
               </div>
               <div class="phoneinput">
                    <div class="imgwarp">
                       <img src="../../assets/s.png" alt class="phoneinputimg">
                    </div>
                    <input
                    type="tel"
                    maxlength="11"
                    placeholder="手机号"
                    v-model="teleponenum"
                    id="phonename"
                    oninput="if(value.length > 11)value = value.slice(0, 11)"
                    >
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
                    title="该平台不支持自动扣款，请用户用支付宝微信扫码支付"
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
                        title="黑名单风险检测"
                        @on-cancel="cancel">
                        <p style="font-size: 16px;">是否放弃本次支付，可以在我的报告页面重新支付</p>
                    </Modal>
                        <div class="paylist">
                            <!-- <div class="paypng">
                            <div id="qrcode"><img :src="msg.aliPayQrCode" alt=""></div>
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
     name:'hellos',
        data () {
            return {
               username:'',
               idcard:'',
               msg:'',
               teleponenum:'',
               imgurl: 'checknone.png',
               concent: null,
               cheackinput: false,
               myretapemode: false,
               iconList: [],
               settime:'',
               timer:null,
               loadmodel:false,
               lodinglist:false,
               dialog:false,
                
            }
        },
        created:function(){
          sessionStorage.removeItem('teleponenum1')
          sessionStorage.removeItem('serverspwd')
          sessionStorage.removeItem('phone')
        },
        mounted:function(){
          sessionStorage.setItem('routerAAA',"/home")
          let session = sessionStorage['username']
          let sessions = sessionStorage['idcard']
          let sessioned = sessionStorage['teleponenum']
          if(session != null){
            this.username = session
          }
          if(sessions != null){
            this.idcard = sessions
          }
          if(sessioned != null){
            this.teleponenum = sessioned
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
            //立即检测
            logoclick() {
                if(this.username == ""){
                    this.$layer.msg("姓名不能为空")
                }else if(this.idcard == ""){
                    this.$layer.msg("身份证号不能为空")
                }else if(this.idcard.length != 18){
                    this.$layer.msg("请填写正确的身份证号")
                }else if(this.teleponenum == ""){
                    this.$layer.msg("请输入手机号")
                }else if(this.teleponenum.length !=11){
                    this.$layer.msg("请填写正确的手机号")
                }
                // else if(this.cheackinput == false){
                //     this.$layer.msg("请阅读协议后检测")
                // }
                else{
                    let detection = {
                        name:this.username,
                        phone:this.teleponenum,
                        idCard:this.idcard
                    }
                    this.$server.immediately(detection).then(data =>{
                      sessionStorage.setItem("username", this.username)
                      sessionStorage.setItem("idcard", this.idcard)
                      sessionStorage.setItem("teleponenum", this.teleponenum)
                        if(data.code == 1101){
                            this.$layer.msg("您还未登录，请登录")
                            setTimeout(function(){
                            },2000)
                            this.$router.push({path:'./login'})
                        }else if(data.code == 1103){
                          this.$layer.msg("用户信息失效，请登录")
                          this.$router.push({path:'./login'})
                        }
                        else{
                             if(data.code == 200){
                              this.lodinglist = true
                              sessionStorage.removeItem('username')
                              sessionStorage.removeItem('idcard')
                              sessionStorage.removeItem('teleponenum')
                              localStorage.removeItem('routerAAA')
                                 let pay = {
                                  orderId:data.data.orderId,
                                  ip:'124.204.64.154'
                                } 
                                this.$server.payment(pay).then(data =>{
                                    //console.log(data.data.aliPayQrCode)                                   
                                            if(data.code == 200){
                                              this.msg = data.data                                 
                                              this.myretapemode = true
                                              this.lodinglist = false
                                            this.timer = setInterval(() =>{
                                            let godpay = data.data.orderId
                                            this.$server.paystatus(godpay).then(data =>{                                                
                                                if(data.data.payStatus == 12){
                                                    clearInterval(this.timer)                                                   
                                                    this.$layer.msg("支付成功")                                                                                                         
                                                    this.$router.push({path:'./myreport'})                                                                                      
                                                }else if(data.data.payStatus == 13){
                                                    this.$layer.msg("支付失败，请重新支付")
                                                }                                            
                                            })
                                          },2000)                                 
                                        }                                                                                                        
                                })
                            }else{
                              this.$layer.msg(data.msg)
                            }                  
                        }
                    })
                }
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
<style>
.hellos{
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
    /* border: 1px solid red; */
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
#qrcode img{
    width: 146px;
    margin-top: 60%;
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
.demo-spin-icon-load{
      animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
      from { transform: rotate(0deg);}
      50%  { transform: rotate(180deg);}
      to   { transform: rotate(360deg);}
  }
  .demo-spin-col{
      height: 100px;
      position: relative;
      border: 1px solid #eee;
  }
  .mastart{
  width: 30px;
  position: relative;
  bottom: 52px;
  left: 579px;
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
