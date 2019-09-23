<template>
  <div class="contacts">
       <div class="smilbanner">
             <img src="../../assets/bannerb.jpg" alt="">
        </div>
     <div class="homelist">
         <div class="title">请添加待检测联系人</div>
         <div class="listtext">最多可添加3人</div>
          <div class="formlist">
            <Form ref="formDynamic" :model="formDynamic">
               <div class="phoneinput"
                 v-for="(item, index) in formDynamic.contactList"                 
                 :key="index"
                 :prop="'contactList.' + index + '.value'"
               >
                    <div class="imgwarp" @click="handleRemove(index)">
                       <img src="../../assets/1.png" alt class="phoneinputimg">
                    </div>
                    <input
                    type="tel"
                    maxlength="11"
                    placeholder="请输入待检联系人的手机号"
                    id="phonename"
                    v-model="item.phone"
                    oninput="if(value.length > 11)value = value.slice(0, 11)"
                    >
              </div>
              <div class="phoneinputone">
                    <div class="imgwarp" @click="handleAdd" v-if='formDynamic.contactList.length <3'>
                       <img src="../../assets/2.png" alt class="phoneinputimg setionimg">
                    </div>
                    <div class="imgwarp" v-else='formDynamic.contactList.length >2'>
                       <img src="../../assets/2.png" alt class="phoneinputimg setionimg">
                    </div>
                    <div class="input">添加联系人</div>
               </div>
              <!-- <div class="tiaoli">
                    <div  @click="tiaoliclick">
                    <img :src="require('../../assets/'+imgurl)" alt class="cheackinput">
                    </div>
                    <span class="agreement">您已同意《征信服务协议》</span>
              </div> -->
               <div class="logobtnwarp">
                    <div class="logobtn" @click="logoclick(teleponenum)">立即检测</div>
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
                        title="紧急联系人风险检测"
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
            </Form>
         </div>
     </div>
  </div>
</template>

<script>
 export default {
      data () {
            return {
               remove:"",
               msg: '',
               teleponenum:'',
               imgurl: 'checknone.png',
               concent: null,
               cheackinput: false,
               myretapemode: false,
               count: "",
               index: 1,
               value:[],
               dialog:false,
               lodinglist:false,
               timer:null,
               formDynamic: {
                    contactList: [
                        {
                            phone: '', 
                        }
                    ]
                }
            }
        },
        created:function(){
          sessionStorage.removeItem('username')
          sessionStorage.removeItem('idcard')
          sessionStorage.removeItem('teleponenum')
          sessionStorage.removeItem('teleponenum1')
          sessionStorage.removeItem('serverspwd')
        },
        mounted(){
          sessionStorage.setItem('routerAAA',"/contacts")
          let session = sessionStorage['phone']
          if(session != null){
            this.formDynamic.contactList[0].phone = session
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
            //add添加
            handleAdd () {
                this.index++;
                this.formDynamic.contactList.push({
                    phone: '',
                    index: this.formDynamic.contactList.index,
                    status: 1
                });
                if(this.formDynamic.contactList.length >2){
                    console.log(this.formDynamic.contactList.length)           
                }                                
            },
            //remove移除
            handleRemove (index) {
              this.remove=index
              this.formDynamic.contactList=this.formDynamic.contactList.filter((item,index) => {
                return (this.remove!=index);
                });

            },
            //用户协议
            tiaoliclick () {
                this.concent++;
                if (this.concent % 2 != 0) {
                    this.cheackinput = true
                    this.imgurl = 'x.png'
                }else if(this.formDynamic.contactList[0].phone == ''){
                      this.$layer.msg('检测联系人不能为空')
                }else {
                    this.cheackinput = false
                    this.imgurl = 'checknone.png'
                }
            },
            //立即检测
            logoclick(){
                    if(this.formDynamic.contactList == ''){
                        this.$layer.msg('请至少添加一个联系人')
                    }else if(this.formDynamic.contactList[0].phone == ''){
                        this.$layer.msg('待检测联系人不能为空')
                    }else{
                        let contacts = {}
                        this.$server.detection(this.formDynamic).then(data =>{
                        sessionStorage.setItem("phone", this.formDynamic.contactList[0].phone)                           
                            if(data.code == 1001){
                                this.$layer.msg("待检测联系人不能为空")
                            }else if(data.code == 1101){
                                this.$layer.msg("您还未登录，请登录")
                                this.$router.push({path:'./login'})
                            }else if(data.code == 1103){
                                this.$layer.msg('用户信息失效，请登录')
                                this.$router.push({path:'./login'})
                            }else{
                                if(data.code == 200){
                                    this.lodinglist = true
                                    sessionStorage.removeItem('phone')
                                    localStorage.removeItem('routerAAA')
                                    let pay = {
                                          orderId:data.data.orderId,
                                          ip:'124.204.64.154'
                                        } 
                                    this.$server.payment(pay).then(data =>{
                                        clearInterval(this.timer)                                      
                                                if(data.code ==200){
                                                    this.msg = data.data
                                                    this.myretapemode = true
                                                    this.lodinglist = false
                                                this.timer =setInterval(()=>{
                                                let godpay = data.data.orderId
                                                this.$server.paystatus(godpay).then(data =>{
                                                    if(data.data.payStatus == 12){
                                                        clearInterval(this.timer)
                                                        setTimeout(()=>{
                                                           this.$router.push({path:'/myreport'})
                                                        },2000)
                                                        
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
        },
        beforeDestroy() {
                clearInterval(this.timer);        
                this.timer = null;
            },
    }
</script>
<style>
.contacts{
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
.ivu-input-type{
    width: 400px;
}
.smilbanner{
    width: 100%;
    min-width: 800px;
}
.homelist{
    margin: 0px 25%;
    position: relative;
    top: 10px;
    left: 0;
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
#btnSendCode {
    width: 8rem;
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
.phoneinputone{
    width: 100%;
    margin: 20px 0;
    border-radius: 5px;
}
.phoneinputone .input{
    width: 100%;
    height: 45px;
    text-align: left;
    position: relative;
    top: 15px;
    left: 28px;
    color: #366eff;
}
.phoneinput input{
    width: 90%;
    height: 45px;
    border: none;
}
.setionimg{
    position: relative;
    left: 2px;
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
#qrcode img{
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
.listtext{
    font-size: 0.4rem;
    color: #888888;
    text-align: left;
    margin-top: 5px;
}
.disable {
    pointer-events: none;
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
.lodingimg p{
    width: 215px;
    color: #fff;
    font-size: 16px;
}
@-webkit-keyframes rotation {
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
    }
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
