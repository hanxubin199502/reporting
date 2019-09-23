<template>
  <div class="riskdetail">
     <div class="detaillist">
         <div class="credit">
            <div class="detectionimg" v-if="detailList.risk_level== '低'">
                <img src="../../assets/p1.png" alt="">
                <div class="reports">
                    <div class="listpros">无风险</div>
                    <div class="listrop">报告更新时间：{{messagelist.create_date}}</div>
                </div>
                <div class="rating">"风险水平越高，申贷通过率越底"</div>
            </div>
            <div class="detectionimg" v-if="detailList.risk_level== '中'">
                <img src="../../assets/p2.png" alt="">
                <div class="reports">
                    <div class="listpros">中风险</div>
                    <div class="listrop">报告更新时间：{{messagelist.create_date}}</div>
                </div>
                <div class="rating">"风险水平越高，申贷通过率越底"</div>
            </div>
            <div class="detectionimg" v-if="detailList.risk_level== '高'">
                <img src="../../assets/p3.png" alt="">
                <div class="reports">
                    <div class="listpros">高风险</div>
                    <div class="listrop">报告更新时间：{{messagelist.create_date}}</div>
                </div>
                <div class="rating">"风险水平越高，申贷通过率越底"</div>
            </div>
         </div>
         <div class="basic">
             <div class="detailname">----基本信息----</div>
             <div class="firstname">
                <div class="nameleft">姓名：</div>
                <div class="nameright">{{detailList.base_info.name}}</div>
             </div>
             <div class="firstname">
                <div class="nameleft">手机号：</div>
                <div class="nameright">{{detailList.base_info.phone}}</div>
             </div>
             <div class="firstname">
                <div class="nameleft">运营商：</div>
                <div class="nameright">{{detailList.base_info.operator}}</div>
             </div>
             <div class="firstname">
                <div class="nameleft">号码归属地：</div>
                <div class="nameright">{{detailList.base_info.phone_location}}</div>
             </div>
             <div class="firstname">
                <div class="nameleft">身份证号码：</div>
                <div class="nameright">{{detailList.base_info.id_card}}</div>
             </div>
             <div class="firstname">
                <div class="nameleft">开户时长：</div>
                <div class="nameright">{{detailList.base_info.register_days}}天</div>
             </div>
         </div>
         <div class="unscrambless flex"><img src="../../assets/jd@3x.png" alt=""><p class="ambletext">{{detailList.base_info.remark}}</p></div>
         <!-- 运营商概况 -->
         <div class="overview" >
             <div class="detailtitle detailimg">运营商概况</div>
             <div>
                <pirese :id="id" :option="option"></pirese>
            </div>
            <div class="carousel">
                <div class="bigcarousel">
                  <div>
                     <Carousel dots='none' arrow='always'>
                        <Carousel-item v-for='(item,index) in bannerList' :key='index'>
                            <div class="demo-carousel">
                                <div class="party_muth">{{item.month}}</div>
                                <div class="calltime flex">
                                   <div class="smilmad">
                                     <div class="party_num">{{item.call_out_count}}</div>
                                     <div class="party">主叫次数</div>
                                   </div>
                                   <div class="smilmad">
                                     <div class="party_num">{{item.call_in_count}}</div>
                                     <div class="party">被叫次数</div>
                                   </div>
                                   <div class="smilmads">
                                     <div class="party_num">{{item.call_time}}</div>
                                     <div class="party">通话时长(分)</div>
                                   </div>
                                </div>
                            </div>                            
                        </Carousel-item>
                    </Carousel>
                  </div>
                </div>
            </div>           
         </div>
         <div class="unscramblesma flex"><img src="../../assets/jd@3x.png" alt=""><p class="ambletext">近6个月月均话费和通话次数，反映了个人通话的稳定性，在一定程度上会影响贷款机构对您的评估</p></div>
         <!-- 运营商行为检测 -->
         <div class="naxtlists" >
             <div class="detailtitle detailimg">行为检测</div>
             <div class="nextname">
                <div class="nextleft">最近常用通话地</div>
                <div class="nextright goodate">暂无数据</div>
             </div>
             <div class="nextname">
                <div class="nextleft">最近连续静默天数</div>
                <div class="nextright goodate">0</div>
             </div>
             <div class="nextname">
                <div class="nextleft">月均静默天数</div>
                <div class="nextright goodate">0</div>
             </div>
             <div class="nextname">
                <div class="nextleft">互通电话号码个数</div>
                <div class="nextright goodate">0</div>
             </div>
         </div>
         <div class="esetsrambles flex"><img src="../../assets/jd@3x.png" alt=""><p class="ambletext">稳定的通话状态有利于贷款机构的放款，若静默天数过多、互通电话号码较少的话代表"圈子"较小，会影响下款通过率。</p></div>
         <!-- 通话行为分析 -->
         <div class="naxtlistss" >
             <div class="detailtitle detailimg">通话行为分析</div>
             <div class="nextname">
                <div class="nextleft">夜间通话占比是否过多</div>
                <div class="nextright goodate">{{detailList.call_behavior_analysis.is_more_night_calls_proportion}}</div>
             </div>
             <div class="nextname">
                <div class="nextleft">有效联系人数量是否较少</div>
                <div class="nextright goodate">{{detailList.call_behavior_analysis.is_less_valid_contacts_number}}</div>
             </div>
             <div class="nextname">
                <div class="nextleft">通话频率异常(过多/过少/剧增/剧减)</div>
                <div class="nextright goodate">{{detailList.call_behavior_analysis.contact_frequency_exception}}</div>
             </div>
             <div class="nextname">
                <div class="nextleft">社交通信信息多为陌生号码</div>
                <div class="nextright goodate">{{detailList.call_behavior_analysis.is_more_strange_number_in_contacts}}</div>
             </div>
             <div class="nextname">
                <div class="nextleft">通话记录异常号码占比过多</div>
                <div class="nextright goodate">{{detailList.call_behavior_analysis.is_more_exception_number_in_call_records}}</div>
             </div>
         </div>
         <div class="unscramblesea flex"><img src="../../assets/jd@3x.png" alt=""><p class="ambletext">{{detailList.call_behavior_analysis.remark}}</p></div>
          <!-- 借贷联系情况 -->
         <div class="textlists" >
             <div class="detailtitle detailimg">借贷联系情况</div>
             <div class="contactinfor flex">
                 <div class="contactleft">与借贷通话的号码数量(个)</div>
                 <div class="contactright">
                     <div class="contactbigyuan">0</div>
                 </div>
             </div>
             <div class="nextname">
                <div class="nextleft">社交通信信息多为陌生号码</div>
                <div class="nextright goodate">未命中</div>
             </div>
             <div class="nextname">
                <div class="nextleft">通话记录异常号码占比过多</div>
                <div class="nextright goodate">未命中</div>
             </div>
         </div>
         <div class="moncramblesea flex"><img src="../../assets/jd@3x.png" alt=""><p class="ambletext">与借贷机构的通话频率一定程度代表着借款活跃度，能够反 映您是否在多个借贷平台有借款行为，与借贷通话过多会影响到贷款机构对您的评估，不利于下款。</p></div>
        <!-- TOP5联系人黑名单检测 -->
         <div class="firstlist" >
             <div class="detailtitle detailimg">TOP5联系人黑名单检测</div>
             <div class="nextname">
                <div class="nextleft">TOP5联系人中不良信息名单占比是否过高</div>
                <div class="nextright goodate">{{detailList.top5_contact_black_list.is_more_bad_list_proportion}}</div>
             </div>
             <div class="nextname">
                <div class="nextleft">TOP5联系人中是否网贷申请平台过多</div>
                <div class="nextright goodate">{{detailList.top5_contact_black_list.is_more_loan_platform}}</div>
             </div>
         </div>
         <div class="firstnuster flex"><img src="../../assets/jd@3x.png" alt=""><p class="ambletext">{{detailList.top5_contact_black_list.remark}}</p></div>
         <!-- 通话标签 -->
         <div class="nextgerlist" >
             <div class="detailtitle detailimg">通话标签</div>
             <div class="nextname">
                <div class="nextleft">通讯对象是否异常(过多集中于金融机构</div>
                <div class="nextright goodate">{{detailList.call_label.is_exception_contact_object}}</div>
             </div>
             <div class="nextname">
                <div class="nextleft">或还款通知或催收机构)</div>
                <div class="nextright goodate"></div>
             </div>
         </div>
         <div class="nexstnuster flex"><img src="../../assets/jd@3x.png" alt=""><p class="xiaofei">{{detailList.call_label.remark}}</p></div>
         
     </div>
  </div>
</template>
<script>
import pirese from '@/containers/pirese/pirese.vue'
 export default {
     name:'riskdetail',
     components:{
         pirese
     },
        data () {
            return {
                detailList:[],
                messagelist:[],
                behaviorlist:[],
                bannerList:[],
                mark:0,
                id: 'test',
                option: {
                    chart: {
                        type: 'column',
                    },
                    title: {
                        text: '月话费(元)'
                    },
                    xAxis: {
                        categories: [],
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: '额度（元）'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} 元</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            borderWidth: 0
                        }
                    },
                    series: [{
                        name:'月话费',
                        data: [],
                        color:'#e7a76f'
                    }]
                }
            }     
        },
        mounted(){
           let examine = this.$route.query.orderId
           this.getorderdetail(examine)

        },
        methods:{
            getorderdetail(examine){
                this.$server.examinelist(examine).then(data =>{
                    console.log(data.data)
                    this.detailList=data.data.operator
                    this.messagelist=data.data
                    let newList=data.data.operator.operator_info.call_list
                    this.option.series[0].data=newList.map(item=>item.month_bill).map(Number)
                    this.option.xAxis.categories=newList.map(item=>item.month)
                    this.bannerList = newList.map(item=>item)
                })
            },
           autoPlay () {  
              this.mark++;  
              if (this.mark === 3) { //当遍历到最后一张图片置零  
                this.mark = 0  
              }  
            },  
            play () {  
              setInterval(this.autoPlay, 2500)  
            },  
            change (i) {  
              this.mark = i  
            }
            
        },
        created () {  
          this.play()  
        } 
        
    }
</script>
<style scoped>
.riskdetail{
    margin: 0px 15%;
    margin-top: -51px;
    height: 618px;
    min-width: 800px;
}
.detaillist{
    margin: 0 20%;
    min-width:810px;
    background-color: #ebe4e4;
}
.credit{
    width: 100%;
    height: 460px;
    background-image: linear-gradient(0deg,#2ece7f,#12ad57);
}
.basic{
    margin: 0 10%;
    height: 300px;
    background-color: #fff;
    position: relative;
    bottom: 60px;
    border-radius: 8px;
    text-align: center;
}
.detailimg{
    position: relative;
    left: 35%;
    bottom: 8px;
    width: 200px;
    height: 30px;
    background-image: url("../../assets/bq@3x.png");
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.detailimgs{
    position: relative;
    left: 30%;
    bottom: 8px;
    width: 200px;
    height: 30px;
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.detailtitle{
    font-size: 1rem;
    font-weight: bold;
}
.detailname{
    font-size: 1rem;
    font-weight: bold;
    position: relative;
    top: 8px;
    color: #cbcbcb;
}
.firstname{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin:3% 10%;
}
.nameleft{
    font-size: 1rem;
    font-weight: bold;
}
.nameright{
    font-size: 1rem;
    font-weight: bold;
}
.naxtlist{
    margin: 0 10%;
    height:325px;
    background-color: #fff;
    position: relative;
    bottom: 40px;
    border-radius: 8px;
    text-align: center;
}
.naxtlists{
    margin: 0 10%;
    height:220px;
    background-color: #fff;
    border-radius: 8px;
    text-align: center;
    position: relative;
    top: 20px;
}
.textlists{
    margin: 0 10%;
    height:300px;
    background-color: #fff;
    border-radius: 8px;
    text-align: center;
    position: relative;
    bottom: 20px;
}
.overview{
    margin: 0 10%;
    height:560px;
    background-color: #fff;
    border-radius: 8px;
    text-align: center;
    position: relative;
    bottom: 20px;
}
.naxtlistss{
    margin: 0 10%;
    height:275px;
    background-color: #fff;
    border-radius: 8px;
    text-align: center;
    position: relative;
    top: 70px;
}
.firstlist{
    margin: 0 10%;
    height:150px;
    background-color: #fff;
    border-radius: 8px;
    text-align: center;
    position: relative;
    bottom: 22px;
}
.nextgerlist{
    margin: 0 10%;
    height:150px;
    background-color: #fff;
    border-radius: 8px;
    text-align: center;
    position: relative;
    top: 24px;
}
.aligntext{
    margin: 0 10%;
    height:330px;
    background-color: #fff;
    position: relative;
    bottom: 20px;
    border-radius: 8px;
    text-align: center;
}
.nextname{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin:3% 10%;
}
.nextleft{
    font-size: 1rem; 
}
.leftnext{
    font-size: 1rem;
    font-weight: bold;
}
.nextright{
    font-size: 1rem;
    font-weight: bold;
}
.unscramble{
    margin: 0 18%;
    position: relative;
    bottom: 30px;
    font-size: 1rem;
    color: #615c5c;
    font-weight: bold;
    background-color:#cbcbcb;
}
.unscramble img{
    width: 40px;
    position: relative;
    top: 5px;
}
.unscrambless{
    margin: 0 18%;
    position: relative;
    bottom: 45px;
    font-size: 1rem;
    color: #615c5c;
    font-weight: bold;
    background-color:#cbcbcb;
}
.unscrambless img{
    width: 40px;
    position: relative;
    bottom: 9px;
    left: 2px;
}
.esetsrambles{
    margin: 0 18%;
    position: relative;
    top: 40px;
    font-size: 1rem;
    color: #615c5c;
    font-weight: bold;
    background-color:#cbcbcb;
}
.esetsrambles img{
    width: 40px;
    position: relative;
    bottom: 9px;
    left: 2px;
}
.unscramblesea{
    margin: 65px 18%;
    position: relative;
    top: 22px;
    font-size: 1rem;
    color: #615c5c;
    font-weight: bold;
    background-color:#cbcbcb;
}
.unscramblesea img{
    width: 40px;
    position: relative;
    bottom: 9px;
    left: 2px;
}
.moncramblesea{
    margin: 20px 18%;
    position: relative;
    bottom: 22px;
    font-size: 1rem;
    color: #615c5c;
    font-weight: bold;
    background-color:#cbcbcb;
}
.moncramblesea img{
    width: 40px;
    position: relative;
    top: -22px;
    left: 2px;
}
.firstnuster{
    margin: 0px 18%;
    position: relative;
    top: 0px;
    font-size: 1rem;
    color: #615c5c;
    font-weight: bold;
    background-color:#cbcbcb;
}
.firstnuster img{
    width: 40px;
    position: relative;
    bottom: 12px;
    left: 2px;
}
.nexstnuster{
    margin: 64px 18%;
    position: relative;
    bottom: 20px;
    font-size: 1rem;
    color: #615c5c;
    font-weight: bold;
    background-color:#cbcbcb;
}
.nexstnuster img{
    width: 40px;
    float: left;
}
.unscramblesma{
    margin: 0px 18%;
    font-size: 1rem;
    color: #615c5c;
    font-weight: bold;
    background-color:#cbcbcb;
}
.unscramblesma img{
    width: 40px;
    position: relative;
    bottom: 4px;
    left: 2px;
}
.badnate{
    color: #f80404;
}
.godnate{
    color: #49f804;
}
.goodate{
    color: #f86604;
}
.warning{
    width: 15px;
    height: 15px;
    position: relative;
    top: 2px;
    right: 4px;
}
.special{
    border-left: 2px solid #f82004;
    position: relative;
    right: 20px;
    padding: 0 18px;
}
.detailtable{
    margin: 3% 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.tablebr{
    width: 20%;
}
.detectionimg img{
    width: 100%;
}
.reports{
    position: relative;
    bottom: 130px;
}
.listpros{
    font-size: 40px;
    color: #fff;
}
.listrop{
    font-size: 16px;
    color: #fff;
}
.rating{
    position: relative;
    bottom: 106px;
    color: #fff;
    font-size: 24px;
}
.contactinfor{
    margin: 3% 10%;
    height: 150px;
}
.contactleft{
    width: 50%;
    height: 150px;
    line-height: 150px;
    font-size: 16px;
    border-right: 1px solid #cbcbcb;
}
.contactright{
    margin: auto;
}
.contactbigyuan{
    width: 150px;
    height: 150px;
    border-radius: 100px;
    border: 34px solid #cbcbcb;
    color: #84f50c;
    line-height: 80px;
    font-size: 16px;
}
.flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.ambletext{
    text-align: left;
    word-break: break-all;
}
.xiaofei{
    float: left;
    position: relative;
    right: 110px;
}

.carousel{
  width: 100%;
  height: 115px;
}
.bigcarousel{
  margin:10px 5%;
  height: 100px;
}
.ivu-carousel-item{
  height: 130px !important;
}
.demo-carousel{
  height: 100px;
}
.calltime{
  height: 65px;
  margin-top: 6px;
}
.ivu-carousel button{
  right: -58px !important;
}
.party_num{
  font-weight: bold;
  font-size: 18px;
}
.party{
  color: #615c5c;
}
.party_muth{
  font-size: 18px;
}
.smilmad{
  border-right: 1px solid #cbcbcb;
  width: 33.33%;
}
.smilmads{
  width: 33.33%;
}
</style>
