<template>
  <div class="riskdetail">
     <div class="detaillist">
         <div class="credit">
           <div>
                <pie :id="id" :option="option"></pie>
            </div>
         </div>
  
         <!-- 紧急联系人风险检测 -->
         <div class="naxtlist" >
             <div class="detailtitle detailimg">联系人风险检测</div>
             <div class="nextname">
                <div class="leftnext special">联系人名单</div>
                <!-- <div class="nextright badnate"><img  class="warning" src="../../assets/ts@3x.png" alt="" />已上黑名单</div> -->
             </div>
             <div class="nextname"
              v-for="items in itemsList"
              >
                <div class="nextleft">{{items.contact_phone}}</div>
                <div class="nextright godnate">{{items.contact_loan_bad}}</div>
             </div>
         </div>
         <div class="unscramble"><img src="../../assets/jd@3x.png" alt="">{{itemsremark.contacts_remark}}</div>
     </div>
  </div>
</template>
<script>

import pie from '@/containers/pie/pie.vue';
 export default {
     name:'riskdetail',
     components: {
            pie
        },
        data () {
            return {
                itemsList:[],
                itemsremark:[],
                id: 'test',
                option: {
                    chart: {
                        type: 'pie',
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: '紧急联系人风险检测'
                    },
                    subtitle: {
                        text: ''
                    },
                    tooltip: {
                    pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            depth: 25,
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            }
                        }
                    },
                    series: [{
                    type: 'pie',
                    colorByPoint: true,
                    data: [{
                            name: '无风险',
                            y: 100,
                            sliced: true,
                            selected: true
                        }, {
                            name: '风险中等',
                            y: 0
                        }, {
                            name: '风险极高',
                            y: 0
                        }]
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
                    console.log(data)
                    this.itemsList=data.data.contacts.contact_list
                    this.itemsremark = data.data.contacts
                    this.option.subtitle.text = data.data.create_date
                    console.log(this.option.subtitle.text)
                })
            },
            
        }
        
    }
</script>
<style scope>
.riskdetail{
    margin: 0px 15%;
    margin-top: -51px;
    height: 618px;
    min-width: 800px;
}
.detaillist{
    margin: 0 25%;
    min-width:592px;
    background-color: #ebe4e4;
    border: 1px solid #cbcbcb;
    border-top: none;
}
.basic{
    margin: 0 10%;
    height: 220px;
    background-color: #fff;
    position: relative;
    bottom: 100px;
    border-radius: 8px;
    text-align: center;
}
.detailimg{
    position: relative;
    left: 30%;
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
    background-color: #fff;
    border-radius: 8px;
    text-align: center;
    margin-top: 18px;
}
.naxtlists{
    margin: 0 10%;
    height:220px;
    background-color: #fff;
    position: relative;
    bottom: 60px;
    border-radius: 8px;
    text-align: center;
}
.aligntext{
    margin: 0 10%;
    height:380px;
    background-color: #fff;
    position: relative;
    bottom: 80px;
    border-radius: 8px;
    text-align: center;
}
.nextname{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin:3% 10%;
    position: relative;
    bottom: 20px;
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
    font-size: 1rem;
    color: #615c5c;
    font-weight: bold;
    margin-bottom: 200px;
}
.unscramble img{
    width: 40px;
    position: relative;
    top: 5px;
}
.unscrambles{
    margin: 0 18%;
    position: relative;
    bottom: 40px;
    font-size: 1rem;
    color: #615c5c;
    font-weight: bold;
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
</style>
