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
                <div class="nameright">{{detailList.name}}</div>
             </div>
             <div class="firstname">
                <div class="nameleft">手机号：</div>
                <div class="nameright">{{detailList.phone}}</div>
             </div>
             <div class="firstname">
                <div class="nameleft">身份证号：</div>
                <div class="nameright">{{detailList.id_card}}</div>
             </div>
         </div>
         <!-- 黑名单检测 -->
         <div class="naxtlist" >
             <div class="detailtitle detailimg">黑名单风险检测</div>
             <div class="nextname">
                <div class="nextleft">违法犯罪黑名单</div>
                <div class="nextright goodate">{{detailList.black_list_detection.black_list_crime}}</div>
             </div>
             <div class="nextname">
                <div class="nextleft">高法黑名单</div>
                <div class="nextright goodate">{{detailList.black_list_detection.black_list_high_court}}</div>
             </div>
             <div class="nextname">
                <div class="nextleft">失信被执行人黑名单</div>
                <div class="nextright goodate">{{detailList.black_list_detection.black_list_dishonesty_execute}}</div>
             </div>
             <div class="nextname">
                <div class="nextleft">同行业贷款不良信息名单</div>
                <div class="nextright goodate">{{detailList.black_list_detection.black_list_loan_bad}}</div>
             </div>
             <div class="nextname">
                <div class="nextleft">同行业贷款欺诈黑名单</div>
                <div class="nextright goodate">{{detailList.black_list_detection.black_list_loan_fraud}}</div>
             </div>
             <div class="nextname">
                <div class="nextleft">不良嗜好贴吧黑名单</div>
                <div class="nextright goodate">{{detailList.black_list_detection.black_list_baidu_tieba}}</div>
             </div>
         </div>
         <div class="unscramble"><img src="../../assets/jd@3x.png" alt="">{{detailList.black_list_detection.black_list_remark}}</div>
         <!-- 多平台网贷检测 -->
         <div class="aligntext" >
             <div class="detailtitle detailimg">多平台网贷检测</div>
             <div class="detailtable">
                 <div class="tablebr"></div>
                 <div class="tablebr">近1个月</div>
                 <div class="tablebr">近3个月</div>
                 <div class="tablebr">近6个月</div>
                 <div class="tablebr">近12个月</div>
             </div>
             <div class="detailtable">
                 <div class="tablebr">大型消费金融行业贷款时间平台数</div>
                 <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_1m_large_consume_finance_platform_num}}</div>
                 <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_3m_large_consume_finance_platform_num}}</div>
                 <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_6m_large_consume_finance_platform_num}}</div>
                 <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_12m_large_consume_finance_platform_num}}</div>
             </div>
             <div class="detailtable">
                 <div class="tablebr">P2P网贷行业贷款事件平台数</div>
                 <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_1m_p2p_platform_num}}</div>
                 <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_3m_p2p_platform_num}}</div>
                 <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_6m_p2p_platform_num}}</div>
                 <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_12m_p2p_platform_num}}</div>
             </div>
             <div class="detailtable">
                 <div class="tablebr">一般消费分期行业贷款事件平台数</div>
                 <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_1m_general_consume_stage_platform_num}}</div>
                 <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_3m_general_consume_stage_platform_num}}</div>
                 <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_6m_general_consume_stage_platform_num}}</div>
                 <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_12m_general_consume_stage_platform_num}}</div>
             </div>
             <div class="detailtable">
                 <div class="tablebr">总计借贷平台是否过多</div>
                 <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_1m_platform_mun}}</div>
                 <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_3m_platform_mun}}</div>
                 <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_6m_platform_mun}}</div>
                 <div class="tablebr">{{detailList.multi_loan_detection.multi_loan_12m_platform_mun}}</div>
             </div>
         </div>
         <div class="unscrambless"><img src="../../assets/jd@3x.png" alt="">{{detailList.multi_loan_detection.multi_loan_remark}}</div>
         <!-- 网贷逾期检测 -->
         <div class="naxtlists" >
             <div class="detailtitle detailimg">网贷逾期检测</div>
             <div class="nextname">
                <div class="nextleft">当前是否正在逾期</div>
                <div class="nextright goodate">{{detailList.overdue_detection.overdue_is_overdue_ing}}</div>
             </div>
             <div class="nextname">
                <div class="nextleft">历史是否存在长时间恶意逾期</div>
                <div class="nextright goodate">{{detailList.overdue_detection.overdue_is_due_time_too_long}}</div>
             </div>
             <div class="nextname">
                <div class="nextleft">历史累计逾期次数是否较多</div>
                <div class="nextright goodate">{{detailList.overdue_detection.overdue_is_due_times_too_many}}</div>
             </div>
         </div>
         <div class="unscrambles"><img src="../../assets/jd@3x.png" alt="">{{detailList.overdue_detection.overdue_remark}}</div>
         
     </div>
  </div>
</template>
<script>
 export default {
     name:'riskdetail',
        data () {
            return {
                detailList:[],
                messagelist:[],
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
                    this.detailList=data.data.black_list
                    this.messagelist=data.data
                })
            },           
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
    height: 220px;
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
}
.firstname{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin:5% 10%;
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
    bottom: 10px;
    font-size: 1rem;
    color: #615c5c;
    font-weight: bold;
    background-color:#cbcbcb;
}
.unscrambless img{
    width: 40px;
    position: relative;
    top: 5px;
}
.unscrambles{
    margin: 10px 18%;
    font-size: 1rem;
    color: #615c5c;
    font-weight: bold;
    background-color:#cbcbcb;
}
.unscrambles img{
    width: 40px;
    position: relative;
    top: 5px;
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
</style>
