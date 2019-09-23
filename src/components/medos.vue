<template>
  <div class="helloworld">
    <!-- banner图 -->
    <div class="banner">
      <div class="banner_text">
        <div class="banner_title">征信查询</div>
        <div class="banner_test">
          <div>珍惜信用</div>
          <div class="text_right">创造财富</div>
        </div>
      </div>
    </div>
    <!-- nav导航栏 -->
    <div class="nav">
        <div class="nav_header">
            <div class="item" @click="clickItem('/')" :class="{active: $route.path==='/'}">
              <p>黑名单风险检测</p>
            </div>
            <div class="item" @click="clickItem('/operator')" :class="{active: $route.path==='/operator'}">
              <p>运营商诊断</p>
            </div>
             <div class="item" @click="clickItem('/home')" :class="{active: $route.path==='/home'}">
              <p>紧急联系人风险检测</p>
            </div>
             <div class="item" @click="clickItem('/me')" :class="{active: $route.path==='/me'}">
              <p>我的报告</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'helloworld',
  // data () {
  //   return {
  //     msg: '征信网pc版'
  //   }
  // }
  methods:{
        clickItem:function(path){
            this.$router.push(path);
        }
      }
}
</script>
<style scoped>
.nav_header{
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #cbcbcb;
}
.item{
    width: 25%;
    float:left;
  }
  .item p{
    margin:0;
    font-size: 15px;
    cursor:default;
  }
  .active{
    background: rgb(0,118,225);
    color:#fff;
  }
.banner{width: 100%;height: 400px;background-image: url("../../assets/banner.jpg");background-position: 100% 100%;background-repeat: no-repeat;background-size: 100% 100%;}
.banner_text{width: 250px;position: relative;top: 50%;left: 10%;}
.banner_title{font-size: 24px;letter-spacing: 20px;}
.banner_test{display:flex;margin: 20px 10px;font-size: 16px;}
.text_right{margin-left: 80px;}
.nav{height:800px;margin: 50px 15%;border: 1px solid #cbcbcb;}

</style>
