<template>
  <div class="myreport">
      <div v-show="orderList==''">
          <div><img src="../../assets/no.png" alt=""></div>
          <div>暂无报告哦！！！</div>
      </div>
      <div class="bigmyreport">
     <div class="list_text"
     v-for="(item,index) in orderList"
     :key='index'
     >
         <div class="myreport_left">
             <div class="time">{{item.createDate}}</div>
             <div class="circle"></div>
         </div>
         <div class="myreport_right">
             <div class="myreport_title">{{item.productName}}<div>{{item.name}}&nbsp;{{item.idCard}}</div>
             <div class="goodlist" v-if="item.creditType == 2" v-for='k in item.contacts'>{{k.phone}}</div>
             <div class="goodlist" v-if="item.creditType == 3">{{item.phone}}</div></div>
             <div class="myreport_status">{{item.orderStatusRemark}}</div>
             <div class="myreport_bottom">
                 <button  @click="imgwarpclick(item)" v-if="item.payStatus == 10 || item.reportStatus == 32">{{orderType(item.payStatus)}}</button>
                 <button class="generate" v-if="item.payStatus==12 && item.reportStatus == 30">报告待生成</button>
                 <button class="generate" v-if="item.payStatus==12 && item.reportStatus == 31 || item.reportStatus == 34">报告生成中</button>
                 <button class="generate" v-if="item.payStatus==12 && item.reportStatus == 33">报告生成失败</button>
                 <Modal
                    title="该平台不支持自动扣款，请用户用支付宝微信扫码支付"
                    v-model="myretapemode"
                    :mask-closable="false"
                    class="myreportseta"
                    :closable='false'
                    class-name="vertical-center-modal">
                    <div class="mastart" @click="dialog">X</div>
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
         </div>   
     </div>
     <div class="lodings" v-show="lodinglist">
        <div class='lodingimg'><img src="../../assets/zhuans.png" alt=""><div class="loginsize">加载中。。。</div></div>
     </div>
     <!-- <div class="pages"><Page :total="dataCount" :page-size="pageSize" @on-change="changepage"></Page></div> -->
     </div>
  </div>
</template>

<script>
 export default {
     name:'myreport',
     props: {},
        data () {
            return {
                list:'', //接口获取的总数据
                pageSize:10,  //每页显示的条数
                dataCount:0, // 总数据的条目
                orderList:[],//展示的数据
                pageCurrent:1,

                arrtime:[],
                // pagetotal:20,
                msg:'',
                num:30,
                isShow: true,
                payStatus:'',
                creditType:1,
                myretapemode: false,
                keyword:"",
                configs: [],
                sort: {},
                lodinglist:false,
            }
            
        },
          created: function(){
              this.getorderlist() //定义方法
              this.changepage();
              sessionStorage.removeItem('username')
              sessionStorage.removeItem('idcard')
              sessionStorage.removeItem('teleponenum')
              sessionStorage.removeItem('teleponenum1')
              sessionStorage.removeItem('serverspwd')
              sessionStorage.removeItem('phone')
          },
        methods:{
            //订单状态
            changeType(payStatus){   
                return payStatus==12? "订单完成":"未支付";
            },
            //支付状态
            orderType(payStatus){
                return payStatus==10? "去支付":"查看";
            },
            //请求列表
            getorderlist(index){              
                let looklist = {
                // start:this.page,
                // limit:this.pagetotal,
                }
                this.$server.orderslist(looklist).then(data =>{
                    console.log(data.data)
                    // this.dataCount = data.data.total
                    this.orderList=data.data.rows;
                    this.list = data.data
                    // this.arrtime = data.data.rows
                    // if(this.dataCount < this.pageSize){
                    //   this.orderList = this.list
                    // }else{
                    //   this.orderList = this.list.slice(0,this.pageSize); 
                    // }
                })
            },
            //分页操作
            changepage(index){
                let _start = ( index - 1 ) * this.pageSize;
                let _end = index * this.pageSize;
                this.orderList = this.list.slice(_start,_end);
            },
            dialog(){
                this.$router.go(0)
            },


             //查看or支付
            imgwarpclick(e){
                    console.log(e.payStatus)
                   if(e.payStatus == 12){//判断订单列表支付状态如果是12则跳转详情
                       if(e.creditType == 1){
                           this.$router.push({path:'/riskdetail',query:{orderId:e.orderId},name:'riskdetail'})
                       }else if(e.creditType == 2){
                           this.$router.push({path:'/contactsdetail',query:{orderId:e.orderId},name:'contactsdetail'})
                       }else if(e.creditType == 3){
                           this.$router.push({path:'/operatordetail',query:{orderId:e.orderId},name:'operatordetail'})
                       }
                       
                   }else{//未支付（10）状态走支付接口
                     this.lodinglist = true
                      let pay = {
                                  orderId:e.orderId,
                                  ip:'124.204.64.154'
                                }                     
                      this.$server.payment(pay).then(data =>{
                              if(data.code == 200){
                                this.msg = data.data
                                this.myretapemode = true
                                this.lodinglist = false
                              let timer = setInterval(()=>{
                              let godpay = e.orderId
                                    this.$server.paystatus(godpay).then(data =>{
                                        if(data.data.payStatus == 12){
                                             this.$layer.msg("支付成功")
                                             clearInterval(timer)
                                             this.$router.go(0)                                
                                            // this.$router.push({path:'/myreport'})
                                        }else if(data.data.payStatus == 13){
                                            this.$layer.msg("支付失败，请重新支付")
                                    }
                                        
                                })
                              },2000)
                            }else{
                              this.$layer.msg(data.msg)
                            }                        
                      })
                   }
            },
        },
    }
</script>
<style>
.myreport{
    margin: 0px 25%;
    border-top: none;
    min-width: 800px;
}
.list_text{
    width: 100%;
}
.myreport_left{
    width: 20%;
    height: 100px;
    float: left;
}
.myreport_right{
    width: 80%;
    height: 100px;
    border-left: 1px solid #cbcbcb;
    float:right;
}
.time{
    position: relative;
    top: 40%;
    font-size: 14px;
}
.circle{
    width: 15px;
    height: 15px;
    border-radius: 15px;
    position: relative;
    left: 96.2%;
    top: 20px;
    background-color: #3871fc;
}
.myreport_title{
    width: 33%;
    display: inline;
    float: left;
    margin: 4% 0;
    text-align: left;
    margin-left: 25px;
}
.myreport_status{
    width: 33%;
    display: inline;
    line-height: 8;
}
.myreport_bottom{
    width: 33%;
    display: inline;
    float: right;
    margin: 4% 0;
}
.myreport_bottom button{
    width: 100px;
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: #366eff;
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
.goodlist{
    position: relative;
    bottom: 18px;
}
.pages{
    margin-bottom: 8%;
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
@-webkit-keyframes rotation{
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
    }
}
@-moz-keyframes rotation{
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
    }
}
@-o-keyframes rotation{
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
    }
}
@keyframes rotation{
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
    }
}
.lodingimg img{
     width: 180px;
    -webkit-transform: rotate(360deg);
    animation: rotation 8s linear infinite;
    -moz-animation: rotation 8s linear infinite;
    -webkit-animation: rotation 8s linear infinite;
    -o-animation: rotation 8s linear infinite;
}
.generate{
    background-color: #6d6868 !important;
    border: 1px solid #6d6868;
}
.bigmyreport{
  width: 100%;
  height: 500px;
  /*border: 1px solid red;*/
}
.mastart{
  width: 30px;
  position: relative;
  bottom: 52px;
  left: 579px;
  font-size: 16px;
  cursor:default;
  }
.loginsize{
  width: 115px;
  position: relative;
  left: 40px;
  bottom: 105px;
  color: #fff;
  font-size: 14px;
}
.ivu-modal-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55,55,55,.6);
    /*opacity: 0.07 !important;*/
    height: 100%;
}
.ivu-modal-content{
    box-shadow:none !important;
}
</style>
