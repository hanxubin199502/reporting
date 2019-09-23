<template>
  <div class="hello">
    <!-- banner图 -->
    <div class="banner">
    </div>
    <!-- 侧边栏 -->
    <div class="smaillist">
      <Button @click="value1 = true" class="alignaitem" type="primary">征信报告查询</Button>
      <Drawer :closable="false" v-model="value1">
           <Tabs value="name1"  @on-click='nameclick'>
              <TabPane label="黑名单风险检测" name="name1">
                <div class="homelistsmd">
                <div class="titles">请输入查询对象身份信息</div>
                     <div class="formlist">
                          <div class="phoneinput">
                                  <div class="imgwarps">
                                    <img src="../../assets/xm.png" alt class="phoneinputimg">
                                  </div>
                                  <input
                                  type="tel"
                                  placeholder="姓名"
                                  id="usernamelist"
                                  v-model="objname"
                                  >
                            </div>
                            <div class="phoneinput" id="yanzhengmainput">
                                  <div class="imgwarps">
                                    <img src="../../assets/ID.png" alt class="phoneinputimg">
                                  </div>
                                  <input
                                  type="tel"
                                  maxlength="18"
                                  placeholder="身份证号"
                                  id="codeinput"
                                  v-model="identitcard"
                                  oninput="if(value.length > 18)value = value.slice(0, 18)"
                                  >
                            </div>
                            <div class="phoneinput">
                                  <div class="imgwarps">
                                    <img src="../../assets/s.png" alt class="phoneinputimg">
                                  </div>
                                  <input
                                  type="tel"
                                  maxlength="11"
                                  placeholder="手机号"
                                  id="phonename"
                                  v-model="phonenum"
                                  oninput="if(value.length > 11)value = value.slice(0, 11)"
                                  >
                            </div>
                           <!--  <div class="tiaoli">
                                  <div @click="tiaoliclicks">
                                  <img :src="require('../../assets/'+imgurl)" alt class="cheackinputs">
                                  </div>
                                  <span class="agreement">您已同意《征信服务协议》</span>
                            </div> -->
                            <div class="logobtnwarp">
                                  <div class="logobtn" style="text-align:center;" @click="immediately">立即检测</div>
                                  <div class="father"><!-- 登录页面 -->
                                    <div class="mask" v-show="maskShow" @click="setMaskShow"><div class="closema">X</div></div>
                                    <div class="childslist" id="child" v-show="maskShow">
                                        <div class="loginbox">
                                            <div class="welcomeyour">欢迎登录</div>
                                            <div class="fromlist">
                                              <div>
                                                  <img src="../../assets/s.png" alt class="phoneinputimg">
                                              </div>
                                              <input
                                              type="text"
                                              maxlength="11"
                                              placeholder="手机号"
                                              v-model="loginnum"
                                              oninput="if(value.length > 11)value = value.slice(0, 11)"
                                            >
                                            </div>
                                            <div class="fromlist">
                                              <div>
                                                  <img src="../../assets/yz.png" alt class="phoneinputimg">
                                              </div>
                                              <input
                                              type="tel"
                                              placeholder="验证码"
                                              class="indec"
                                              v-model="vfcode"
                                              :disabled="disabled"
                                              @blur="animateWidth"
                                             >
                                             <div class="obtain" @click="getvfcode">
                                              <span v-show="vsshow" >获取验证码</span>
                                              <span v-show="!vsshow" class="counts">{{counts}}秒后重新获取</span>
                                             </div>
                                              <div class="logobtnwarps">
                                                <div class="logobtns" @click="marchlogo">立即登录</div>
                                              </div>
                                            </div>
                    
                                        </div>
                                    </div>
                                  </div>
                                  <div class="father">     <!-- 支付页面 -->
                                    <div class="mask" v-show="payShow" @click="setpayShow"><div class="closema">X</div></div>
                                    <div class="childslist" id="child" v-show="payShow">
                                        <div class="loginbox1">
                                            <div class="welcomeyour">该平台不支持自动扣款，请用户用支付宝微信扫码支付</div>                                        
                                            <div class="paylisttext">
                                              <!-- <div class="paylistleft"><img :src="msges.aliPayQrCode" alt=""></div> -->
                                              <div class="paylistright"><img :src="msges.wxPayQrCode" alt=""></div>
                                            </div>
                                            <div class="payname">
                                                <div>服务名称</div>
                                                <div>{{msges.productName}}</div>
                                            </div>
                                            <div class="paynames">
                                              <div>价格</div>
                                              <div class="mouents">￥{{msges.price}}<span class="moung">￥{{msges.originalPrice}}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                  </div>
                                  <div class="lodinglist" v-show='modloding'><img src="../../assets/zhuans.png" alt=""><div class="loginsizemd">加载中。。。</div></div>
                            </div>
                      </div>
                </div>
                <!-- <div class="msgtan" v-show='namesho'>姓名不能为空</div> -->
              </TabPane>
              <TabPane label="运营商诊断" name="name2">
                <div class="homelistsmd">
                    <div class="titles">请输入运营商信息</div>
                     <div class="formlist">
                          <div class="phoneinput">
                                <div class="imgwarps">
                                  <img src="../../assets/s.png" alt class="phoneinputimg">
                                </div>
                                <input
                                type="tel"
                                maxlength="11"
                                placeholder="手机号"
                                id="phonename"
                                v-model='teleponenum'
                                oninput="if(value.length > 11)value = value.slice(0, 11)"
                                >
                          </div>
                          <div class="phoneinput">
                                <div class="imgwarps">
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
                          <div class="phoneinput" id="yanzhengmainput" v-show='yzcode'>
                                <div class="imgwarps">
                                  <img src="../../assets/yz.png" alt class="phoneinputimg">
                                </div>
                                <input
                                type="tel"
                                placeholder="验证码"
                                id="codeinput"
                                class="imagesas"
                                v-model="codeWord"
                                @blur="animateWidth"
                                >
                                <!-- <div class="loginImgBtn" id="btnSendCode" @click="getCode">
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
                                <div class="logobtn" @click='logoclick' style="text-align:center;">立即检测</div>
                          </div>
                          <div class="father"><!-- 登录页面 -->
                                    <div class="maskmeta" v-show="maskShowmeta" @click="setMaskShowsw"><div class="closema">X</div></div>
                                    <div class="modestart" id="child" v-show="maskShowmeta">
                                        <div class="loginbox">
                                            <div class="welcomeyour">欢迎登录</div>
                                            <div class="fromlist">
                                              <div>
                                                  <img src="../../assets/s.png" alt class="phoneinputimg">
                                              </div>
                                              <input
                                              type="text"
                                              maxlength="11"
                                              placeholder="手机号"
                                              v-model="loginnum"
                                              oninput="if(value.length > 11)value = value.slice(0, 11)"
                                            >
                                            </div>
                                            <div class="fromlist">
                                              <div>
                                                  <img src="../../assets/yz.png" alt class="phoneinputimg">
                                              </div>
                                              <input
                                              type="tel"
                                              placeholder="验证码"
                                              class="indec"
                                              v-model="vfcode"
                                              :disabled="disabled"
                                              @blur="animateWidth"
                                             >
                                             <div class="obtain" @click="getvfcode">
                                              <span v-show="vsshow" >获取验证码</span>
                                              <span v-show="!vsshow" class="counts">{{counts}}秒后重新获取</span>
                                             </div>
                                              <div class="logobtnwarps">
                                                <div class="logobtns" @click="marchlogo2">立即登录</div>
                                              </div>
                                            </div>
                    
                                        </div>
                                    </div>
                                  </div>
                           <div class="father">     <!-- 支付页面 -->
                              <div class="masktert" v-show="paymyShow" @click="setpayShow"><div class="closema">X</div></div>
                              <div class="childslistmast" id="child" v-show="paymyShow">
                                  <div class="loginbox1">
                                      <div class="welcomeyour">该平台不支持自动扣款，请用户用支付宝微信扫码支付</div>                                        
                                      <div class="paylisttext">
                                        <!-- <div class="paylistleft"><img :src="msges.aliPayQrCode" alt=""></div> -->
                                        <div class="paylistright"><img :src="msgesbol.wxPayQrCode" alt=""></div>
                                      </div>
                                      <div class="payname">
                                          <div>服务名称</div>
                                          <div>{{msgesbol.productName}}</div>
                                      </div>
                                      <div class="paynames">
                                        <div>价格</div>
                                        <div class="mouents">￥{{msgesbol.price}}<span class="moung">￥{{msgesbol.originalPrice}}</span></div>
                                      </div>
                                  </div>
                              </div>
                            </div>
                            <div class="lodinglist1" v-show='modlodingmst'><img src="../../assets/zhuans.png" class="lodingimg" alt=""><div class="loginsizemba">加载中。。。</div></div>
                    </div>    
                 </div>
              </TabPane>
              <TabPane label="紧急联系人风险检测" name="name3">
                <div class="basiceing ">
                     <div class="titlesead">请添加待检测联系人</div>
                       <div class="formlist">
                          <div class="phoneinput"
                          v-for="(item, index) in formDynamic.contactList"
                          :key='index'
                          :prop="'contactList.'+ index + '.value'"
                          >
                                <div class="imgwarpse" @click="superRemove(index)">
                                  <img src="../../assets/1.png" alt class="" >
                                </div>
                                <input
                                type="tel"
                                maxlength="11"
                                placeholder="请输入待检联系人的手机号"
                                id="phonename"
                                v-model="item.phone"
                                class="warpinput"
                                oninput="if(value.length > 11)value = value.slice(0, 11)"
                                >
                          </div>
                          <div class="phoneinputone">
                                <div class="imgwarpse" @click="superAdd" v-if='formDynamic.contactList.length <3'>
                                  <img src="../../assets/2.png" alt class=" setionimg">
                                </div>
                                <div class="imgwarpse" v-else='formDynamic.contactList.length >2'>
                                   <img src="../../assets/2.png" alt class=" setionimg">
                                </div>
                                <div class="inputsing">添加联系人</div>
                          </div>
                         
                          <div class="logobtnwarp">
                                <div class="logobtn" style="text-align:center;" @click="Contactsdet">立即检测</div>
                          </div>
                          <div class="father"><!-- 登录页面 -->
                                    <div class="maskhead" v-show='statmodeo' @click="setmodeoShow" ><div class="closema">X</div></div>
                                    <div class="masklistart" id="child" v-show='statmodeo'>
                                        <div class="loginbox">
                                            <div class="welcomeyour">欢迎登录</div>
                                            <div class="fromlist">
                                              <div>
                                                  <img src="../../assets/s.png" alt class="phoneinputimg">
                                              </div>
                                              <input
                                              type="text"
                                              maxlength="11"
                                              placeholder="手机号"
                                              v-model="loginnum"
                                              oninput="if(value.length > 11)value = value.slice(0, 11)"
                                            >
                                            </div>
                                            <div class="fromlist">
                                              <div>
                                                  <img src="../../assets/yz.png" alt class="phoneinputimg">
                                              </div>
                                              <input
                                              type="tel"
                                              placeholder="验证码"
                                              class="indec"
                                              v-model="vfcode"
                                              :disabled="disabled"
                                              @blur="animateWidth"
                                             >
                                             <div class="obtain" @click="getvfcode">
                                              <span v-show="vsshow" >获取验证码</span>
                                              <span v-show="!vsshow" class="counts">{{counts}}秒后重新获取</span>
                                             </div>
                                              <div class="logobtnwarps">
                                                <div class="logobtns" @click="marchlogo1">立即登录</div>
                                              </div>
                                            </div>
                    
                                        </div>
                                    </div>
                                  </div>
                           <div class="father">     <!-- 支付页面 -->
                            <div class="masklist" v-show="contpayShow" @click="setcontpayShow"><div class="closema">X</div></div>
                            <div class="childslistext" id="child" v-show="contpayShow">
                                <div class="loginbox1">
                                    <div class="welcomeyour">该平台不支持自动扣款，请用户用支付宝微信扫码支付</div>                                        
                                    <div class="paylisttext">
                                      <!-- <div class="paylistleft"><img :src="msges.aliPayQrCode" alt=""></div> -->
                                      <div class="paylistright"><img :src="msg.wxPayQrCode" alt=""></div>
                                    </div>
                                    <div class="payname">
                                        <div>服务名称</div>
                                        <div>{{msg.productName}}</div>
                                    </div>
                                    <div class="paynames">
                                      <div>价格</div>
                                      <div class="mouents">￥{{msg.price}}<span class="moung">￥{{msg.originalPrice}}</span></div>
                                    </div>
                                </div>
                            </div>
                          </div>
                          <div class="lodinglistdeo" v-show='deomarlist'><img src="../../assets/zhuans.png" alt=""><div class="loginsizembase">加载中。。。</div></div>
                    </div>
                </div>
              </TabPane>
              <TabPane label="我的报告" name="name4">
                <div class="homelists">
                       <div v-show="oriderlisttext==''" class="noreport">
                            <div><img src="../../assets/no.png" alt=""></div>
                            <div class="textreport">暂无报告哦！！！</div>
                       </div>
                      <div class="myreports"
                        v-for="item in oriderlisttext "
                      >
                           <div class="myreportone">
                                <div class="myreportleft">{{item.productName}}</div>
                                <div class="myreportright">{{item.orderStatusRemark}}</div>
                           </div>
                           <div class="myreportwo">
                                <div class="myreportbig">
                                  <div>{{item.name}}&nbsp;&nbsp;{{item.idCard}}</div>
                                  <div v-if="item.creditType == 2"  v-for='k in item.contacts'>{{k.phone}}</div>
                                  <div  v-if="item.creditType == 3" >{{item.phone}}</div>
                                  <div style="margin-top:5px;">{{item.createDate}}</div>
                                </div>
                                <div class="myreportsml">
                                  <button class="examine" @click="imgwarpclick(item)" v-if='item.payStatus == 10 || item.reportStatus == 32'>{{orderType(item.payStatus)}}</button>
                                  <button class="generate" v-if="item.payStatus==12 && item.reportStatus == 30">报告待生成</button>
                                  <button class="generate" v-if="item.payStatus==12 && item.reportStatus == 31 || item.reportStatus == 34">报告生成中</button>
                                  <button class="generate" v-if="item.payStatus==12 &&item.reportStatus == 33">报告生成失败</button>
                                </div>
                           </div>
                      </div>
                </div>
                 <div class="father">     
                    <div class="biglistone" v-show="mypayShow" @click="mysetpayShow"><div class="closema">X</div></div>
                    <div class="layerlistone layerfunts"  v-show="mypayShow">
                        <div class="loginbox1">
                            <div class="welcomeyour">该平台不支持自动扣款，请用户用支付宝微信扫码支付</div>                                        
                            <div class="paylisttextinf">
                              <!-- <div class="paylistleft"><img :src="msges.aliPayQrCode" alt=""></div> -->
                              <div class="paylistright"><img :src="msgests.wxPayQrCode" alt=""></div>
                            </div>
                            <div class="payname">
                                <div>服务名称</div>
                                <div>{{msgests.productName}}</div>
                            </div>
                            <div class="paynames">
                              <div>价格</div>
                              <div class="mouents">￥{{msgests.price}}<span class="moung">￥{{msgests.originalPrice}}</span></div>
                            </div>
                        </div>
                    </div>
                  </div>
                  <!-- 黑名单检测详情 -->
                  <div class="biglayer">
                        <div class="biglist" v-show="detailmodel" @click="detailmodelist">
                            <div class="closema">X</div>
                        </div>
                        <div class="layerlist layerfun" v-show="detailmodel">
                            <div class="credits">
                              <div class="detectionimg" v-if="emergid.risk_level== '低'">
                                  <img src="../../assets/p1.png" alt="">
                                  <div class="reportse">
                                      <div class="listprose">低风险</div>
                                      <div class="listrop">报告更新时间：{{emergidmg.create_date}}</div>
                                  </div>
                                  <div class="ratings">"风险水平越高，申贷通过率越底"</div>
                              </div>
                              <div class="detectionimg" v-if="emergid.risk_level== '中'">
                                  <img src="../../assets/p2.png" alt="">
                                  <div class="reportse">
                                      <div class="listprose">中风险</div>
                                      <div class="listrop">报告更新时间：{{emergidmg.create_date}}</div>
                                  </div>
                                  <div class="ratings">"风险水平越高，申贷通过率越底"</div>
                              </div>
                              <div class="detectionimg" v-if="emergid.risk_level== '高'">
                                  <img src="../../assets/p3.png" alt="">
                                  <div class="reportse">
                                      <div class="listprose">高风险</div>
                                      <div class="listrop">报告更新时间：{{emergidmg.create_date}}</div>
                                  </div>
                                  <div class="ratings">"风险水平越高，申贷通过率越底"</div>
                              </div>
                            </div>
                             <div class="basice">
                                  <div class="detailtitles">----基本信息----</div>
                                  <div class="firstname">
                                      <div class="nameleft">姓名：</div>
                                      <div class="nameright">{{emergid.name}}</div>
                                  </div>
                                  <div class="firstname">
                                      <div class="nameleft">手机号：</div>
                                      <div class="nameright">{{emergid.phone}}</div>
                                  </div>
                                  <div class="firstname">
                                      <div class="nameleft">身份证号：</div>
                                      <div class="nameright">{{emergid.id_card}}</div>
                                  </div>
                              </div>
                              <div class="naxtlistse" >
                                  <div class="detailtitle detailimgse">黑名单风险检测</div>
                                  <div class="nextname">
                                      <div class="leftnext special">黑名单高风险检测</div>
                                  </div>
                                  <div class="nextname">
                                      <div class="nextleft">违法犯罪黑名单</div>
                                      <div class="nextright godnate">{{mbleid.black_list_crime}}</div>
                                  </div>
                                  <div class="nextname">
                                      <div class="nextleft">高法黑名单</div>
                                      <div class="nextright godnate">{{mbleid.black_list_high_court}}</div>
                                  </div>
                                  <div class="nextname">
                                      <div class="nextleft">失信被执行人黑名单</div>
                                      <div class="nextright goodate">{{mbleid.black_list_dishonesty_execute}}</div>
                                  </div>
                                  <div class="nextname">
                                      <div class="nextleft">同行业贷款不良信息名单</div>
                                      <div class="nextright goodate">{{mbleid.black_list_loan_bad}}</div>
                                  </div>
                                  <div class="nextname">
                                      <div class="nextleft">同行业贷款欺诈黑名单</div>
                                      <div class="nextright goodate">{{mbleid.black_list_loan_fraud}}</div>
                                  </div>
                                  <div class="nextname">
                                      <div class="nextleft">不良嗜好贴吧黑名单</div>
                                      <div class="nextright goodate">{{mbleid.black_list_baidu_tieba}}</div>
                                  </div>
                              </div>
                              <div class="unscramblesele"><img src="../../assets/jd@3x.png" alt="">{{mbleid.black_list_remark}}</div>
                              <div class="aligntextmas" >
                                  <div class="detailtitle detailimgs"></div>
                                  <div class="nextname">
                                      <div class="leftnext special">多平台网贷检测</div>
                                  </div>
                                  <div class="detailtable">
                                      <div class="tablebr"></div>
                                      <div class="tablebr">近1个月</div>
                                      <div class="tablebr">近3个月</div>
                                      <div class="tablebr">近6个月</div>
                                      <div class="tablebr">近12个月</div>
                                  </div>
                                  <div class="detailtable">
                                      <div class="tablebr">大型消费金融行业贷款时间平台数</div>
                                      <div class="tablebr">{{method.multi_loan_1m_large_consume_finance_platform_num}}</div>
                                      <div class="tablebr">{{method.multi_loan_3m_large_consume_finance_platform_num}}</div>
                                      <div class="tablebr">{{method.multi_loan_6m_large_consume_finance_platform_num}}</div>
                                      <div class="tablebr">{{method.multi_loan_12m_large_consume_finance_platform_num}}</div>
                                  </div>
                                  <div class="detailtable">
                                      <div class="tablebr">P2P网贷行业贷款事件平台数</div>
                                      <div class="tablebr">{{method.multi_loan_1m_p2p_platform_num}}</div>
                                      <div class="tablebr">{{method.multi_loan_3m_p2p_platform_num}}</div>
                                      <div class="tablebr">{{method.multi_loan_6m_p2p_platform_num}}</div>
                                      <div class="tablebr">{{method.multi_loan_12m_p2p_platform_num}}</div>
                                  </div>
                                  <div class="detailtable">
                                      <div class="tablebr">一般消费分期行业贷款事件平台数</div>
                                      <div class="tablebr">{{method.multi_loan_1m_general_consume_stage_platform_num}}</div>
                                      <div class="tablebr">{{method.multi_loan_3m_general_consume_stage_platform_num}}</div>
                                      <div class="tablebr">{{method.multi_loan_6m_general_consume_stage_platform_num}}</div>
                                      <div class="tablebr">{{method.multi_loan_12m_general_consume_stage_platform_num}}</div>
                                  </div>
                                  <div class="detailtable">
                                      <div class="tablebr">总计借贷平台是否过多</div>
                                      <div class="tablebr">{{method.multi_loan_1m_platform_mun}}</div>
                                      <div class="tablebr">{{method.multi_loan_3m_platform_mun}}</div>
                                      <div class="tablebr">{{method.multi_loan_6m_platform_mun}}</div>
                                      <div class="tablebr">{{method.multi_loan_12m_platform_mun}}</div>
                                  </div>
                              </div>
                               <div class="unscramblese"><img src="../../assets/jd@3x.png" alt="">{{method.multi_loan_remark}}</div>
                              <div class="naxtlistsing" >
                                  <div class="detailtitle detailimgs"></div>
                                  <div class="nextname">
                                      <div class="leftnext special">网贷逾期检测</div>
                                  </div>
                                  <div class="nextname">
                                      <div class="nextleft">当前是否正在逾期</div>
                                      <div class="nextright godnate">{{Overdue.overdue_is_overdue_ing}}</div>
                                  </div>
                                  <div class="nextname">
                                      <div class="nextleft">历史是否存在长时间恶意逾期</div>
                                      <div class="nextright godnate">{{Overdue.overdue_is_due_time_too_long}}</div>
                                  </div>
                                  <div class="nextname">
                                      <div class="nextleft">历史累计逾期次数是否较多</div>
                                      <div class="nextright godnate">{{Overdue.overdue_is_due_times_too_many}}</div>
                                  </div>
                              </div>
                              <div class="unscramblesele"><img src="../../assets/jd@3x.png" alt="">{{Overdue.overdue_remark}}</div>
                        </div>
                  </div>
                  <!-- 运营商详情 -->
                   <div class="biglayer">
                        <div class="biglist" v-show="detailmodela" @click="detailmodealist"><div class="closema">X</div></div>
                        <div class="layerlist layerfun" v-show="detailmodela">
                            <div class="credits">
                              <div class="detectionimg">
                                  <img src="../../assets/p1.png" alt="">
                                  <div class="reportse">
                                      <div class="listprose">低风险</div>
                                      <div class="listrop">报告更新时间：{{meaberlist.create_date}}</div>
                                  </div>
                                  <div class="ratings">"风险水平越高，申贷通过率越底"</div>
                              </div>              
                            </div>
                             <div class="basiceing1">
                                  <div class="detailtitles">----基本信息----</div>
                                  <div class="firstname">
                                      <div class="nameleft">姓名：</div>
                                      <div class="nameright">{{opermdel.name}}</div>
                                  </div>
                                  <div class="firstname">
                                      <div class="nameleft">手机号：</div>
                                      <div class="nameright">{{opermdel.phone}}</div>
                                  </div>
                                  <div class="firstname">
                                      <div class="nameleft">运营商：</div>
                                      <div class="nameright">{{opermdel.operator}}</div>
                                  </div>
                                  <div class="firstname">
                                      <div class="nameleft">号码归属地：</div>
                                      <div class="nameright">{{opermdel.phone_location}}</div>
                                  </div>
                                  <div class="firstname">
                                      <div class="nameleft">身份证号码：</div>
                                      <div class="nameright">{{opermdel.id_card}}</div>
                                  </div>
                                  <div class="firstname">
                                      <div class="nameleft">开户时长：</div>
                                      <div class="nameright">{{opermdel.register_days}}天</div>
                                  </div>
                              </div>
                              <div class="unscrambleseing"><img src="../../assets/jd@3x.png" alt="">{{opermdel.remark}}</div>
                              <!-- 运营商概况 -->
                              <!-- <div class="naxtlistseormer" >
                                  <div class="detailtitle detailimgse">运营商概况</div>
                                   <div>
                                       <pirese :id="id" :option="option"></pirese>
                                   </div>
                              </div>
                              <div class="unscramblese"><img src="../../assets/jd@3x.png" alt="">稳定的通话状态有利于贷款机构的放款，若静默天数过多、互通电话号码较少的话代表"圈子"较小，会影响下款通过率。</div> -->
                              <div class="naxtlistseorm" >
                                  <div class="detailtitle detailimgse">行为检测</div>
                                  <div class="nextname">
                                      <div class="nextleft">最近常用通话地</div>
                                      <div class="nextright godnate">暂无数据</div>
                                  </div>
                                  <div class="nextname">
                                      <div class="nextleft">最近连续静默天数</div>
                                      <div class="nextright godnate">0</div>
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
                              <div class="unscramblese"><img src="../../assets/jd@3x.png" alt="">稳定的通话状态有利于贷款机构的放款，若静默天数过多、互通电话号码较少的话代表"圈子"较小，会影响下款通过率。</div>
                              <!-- 通话行为分析 -->
                               <div class="naxtlistseormse" >
                                  <div class="detailtitle detailimgse">通话行为分析</div>
                                  <div class="nextname">
                                      <div class="nextleft">夜间通话占比是否过多</div>
                                      <div class="nextright godnate">良好</div>
                                  </div>
                                  <div class="nextname">
                                      <div class="nextleft">有效联系人数量是否较少</div>
                                      <div class="nextright godnate">良好</div>
                                  </div>
                                  <div class="nextname">
                                      <div class="nextleft">通信频率异常</div>
                                      <div class="nextright goodate">未命中</div>
                                  </div>
                                  <div class="nextname">
                                      <div class="nextleft">社交通讯信息多为陌生号码</div>
                                      <div class="nextright goodate">未命中</div>
                                  </div>
                                   <div class="nextname">
                                      <div class="nextleft">通话记录异常号码占比过多</div>
                                      <div class="nextright goodate">未命中</div>
                                  </div>
                              </div>
                              <div class="unscramblese"><img src="../../assets/jd@3x.png" alt="">与借贷机构的通话频率一定程度代表着借款活跃度，能够反 映您是否在多个借贷平台有借款行为，与借贷通话过多会影响到贷款机构对您的评估，不利于下款。</div>
                              <!-- top5联系人黑名单检测 -->
                               <div class="naxtlistseormset" >
                                  <div class="detailtitle detailimgse">top5联系人黑名单检测</div>
                                  <div class="nextname">
                                      <div class="nextleft">TOP5中不良信息占比是否过高</div>
                                      <div class="nextright godnate">未命中</div>
                                  </div>
                                  <div class="nextname">
                                      <div class="nextleft">TOP5中是否网贷申请平台过多</div>
                                      <div class="nextright godnate">未命中</div>
                                  </div>
                              </div>
                              <div class="unscramblese"><img src="../../assets/jd@3x.png" alt="">经常与风险较高的人群沟通，会被认定为存在一定的风险因素，不利于机构对您的放款评估。</div>
                              <!-- 通话标签 -->
                              <div class="naxtlistseormset" >
                                  <div class="detailtitle detailimgse">通话标签</div>
                                  <div class="nextname">
                                      <div class="nextleft">通话对象是否异常(过多集中于</div>
                                      <div class="nextright godnate">未命中</div>
                                  </div>
                                  <div class="nextname">
                                      <div class="nextleft">金融机构或还款通知或催收机构</div>
                                      <div class="nextright godnate"></div>
                                  </div>
                              </div>
                              <div class="unscramblese"><img src="../../assets/jd@3x.png" alt="">保持良好的通话习惯，有利于机构对您的放款评估。</div>
                        </div>
                  </div>
                  <!-- 紧急联系人风险检测详情 -->
                  <div class="biglayer">
                        <div class="biglist" v-show="contactnodel" @click="detailcontact"><div class="closema">X</div></div>
                        <div class="layerlist layerfun" v-show="contactnodel">
                            <div class="credits">
                              <div>
                                  <pie :id="id" :option="option"></pie>
                              </div>
                            </div>
                              <div class="naxtlistseing">
                                  <div class="detailtitle detailimgse">联系人风险检测</div>
                                  <div class="nextname">
                                      <div class="leftnext special">联系人名单</div>
                                      <!-- <div class="nextright badnate"><img  class="warning" src="../../assets/ts@3x.png" alt="" />已上黑名单</div> -->
                                  </div>
                                  <div class="nextname"
                                     v-for="idears in emergencey"
                                  >
                                      <div class="nextleft">{{idears.contact_phone}}</div>
                                      <div class="nextright godnate">{{idears.contact_loan_bad}}</div>
                                  </div>
                              </div>
                              <div class="unscrambleseable"><img src="../../assets/jd@3x.png" alt="">建议更换存在风险的联系人，申请借贷时，机构会对申请人的紧急联系人进行信用评估，为了不影响贷款通过率，建议不要选择命中风险的联系人作为您的紧急联系人。</div>
                        </div>
                  </div>
              </TabPane>
           </Tabs>
      </Drawer>
    </div>
    <!-- nav导航栏 -->
    <div class="nav">
        <div class="nav_header">
            <div class="item" @click="clickItem('/home')" :class="{active: $route.path==='/home'}">
              <p>黑名单风险检测</p>
            </div>
            <div class="item" @click="clickItem('/operator')" :class="{active: $route.path==='/operator'}">
              <p>运营商诊断</p>
            </div>
             <div class="item" @click="clickItem('/contacts')" :class="{active: $route.path==='/contacts'}">
              <p>紧急联系人风险检测</p>
            </div>
             <div class="item" @click="clickItem('/myreport')" :class="{active: $route.path==='/myreport'}">
              <p>我的报告</p>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import pie from '@/containers/pie/pie.vue';
import pirese from '@/containers/pirese/pirese.vue';
import layer from 'vue-layer'
export default {
  inject:['reload'],
  name: 'hello',
  components: {
            pie,
            pirese
        },
  data () {
    return {
      objname:'',
      identitcard:'',
      phonenum:'',
      isDisable: false,
      cheackinputs: false,
      cheackinput: false,
      concent: null,
      vsshow: true,
      msges:'',
      msgests:'',
      msgesbol:'',
      deomarlist:false,
      msg:'',
      orderId:'',
      counts: "",
      loginnum:"",
      vfcode:"",
      disabled: true,
      payShow:false,
      oriderlisttext:[],
      arr:[],
      index: 1,
      value1: false,
      maskShow:false,
      mypayShow:false,
      imgurl: 'checknone.png',
      page:1,
      pagetotle:20,
      personman:'',
      phonename:'',
      teleponenum:'',
      codeWord:'',
      serverspwd:'',
      count: "",
      show: true,
      paymyShow:false,
      modloding:false,
      modlodingmst:false,
      statmodeo:false,
      formDynamic: {
          contactList: [
              {
                  phone: '',
              }
          ]
      },
      detailmodel:false,
      detailmodela:false,
      yzcode:false,
      orderdetaillist:[],
      id:[],
      contactnodel:false,
      emergencey:[],
      emergid:[],
      method:[],
      mbleid:[],
      Overdue:[],
      serverspwd:'',
      emergidmg:[],
      marests:[],
      teleponenum:'',
      id: 'test',
      opermdel:[],
      meaberlist:[],
      contpayShow:false,
      maskShowmeta:false,
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
              text: '最近更新时间：2019-7-2'
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
      },
    }
  },
  created:function(){
    this.getordertext() //定义方法
    let ordsid = this.oriderlisttext.orderId
  },
  methods:{
          //顶部导航
          clickItem:function(path){
                  this.$router.push(path);
          },
          //我的报告订单状态
          changeType(payStatus){   
              return payStatus==12? "订单完成":"待支付";
          },
           //我的报告支付状态
          orderType(payStatus){
              return payStatus==10? "去支付":"查看";
          },
          //黑名单立即检测
          immediately(){
              if(this.objname == ""){
                    this.$Notice.error({title:"姓名不能为空",duration: 1})
                }else if(this.identitcard == ""){
                    this.$Notice.error({title:"身份证号不能为空",duration: 1})
                }else if(this.identitcard.length != 18){
                    this.$Notice.error({title:"请填写正确的身份证号",duration: 1})
                }else if(this.phonenum == ""){
                    this.$Notice.error({title:"请输入手机号",duration: 1})
                }else if(this.phonenum.length !=11){
                    this.$Notice.error({title:"请填写正确的手机号",duration: 1})
                }
                // else if(this.cheackinputs == false){
                //     this.$layer.msg("请阅读协议后检测")
                // }
                else{
                  let detection = {
                      name:this.objname,
                      phone:this.phonenum,
                      idCard:this.identitcard
                  }
                  this.$server.immediately(detection).then(data =>{
                    console.log(data)
                    if(data.code ==1103){
                      this.$Notice.error({title:"信息失效，请重新登录",duration: 1})
                      this.maskShow = true
                    }else if(data.code ==  1101){
                      this.$Notice.error({title:"您还未登录，请登录",duration: 1})
                      this.maskShow = true
                    }else{
                      this.modloding = true
                      if(data.code == 200){
                          let pay = {
                                  orderId:data.data.orderId,
                                  ip:'124.204.64.154'
                                }
                          this.$server.payment(pay).then(data =>{
                              //console.log(data.data.aliPayQrCode)
                                      if(data.code == 200){
                                        this.modloding = false
                                        this.msges = data.data
                                        this.payShow = true
                                      let timer = setInterval(() =>{
                                      let godpay = data.data.orderId
                                      this.$server.paystatus(godpay).then(data =>{                                                
                                          if(data.data.payStatus == 12){                                                   
                                              this.$Notice.error({title:"支付成功",duration: 1})  
                                              clearInterval(timer)                                       
                                              this.payShow = false
                                              this.$router.go(0)
                                          }else if(data.data.payStatus == 13){
                                              this.$Notice.error({title:"支付失败，请重新支付",duration: 1})
                                          }                                                
                                      })
                                    },2000)                                  
                                  }                                                                         
                          })
                       }else{
                        this.modloding = false
                        this.$layer.msg(data.msg)
                       }
                            

                    }
                    
                  })

                }
          },
          //获取验证码
            getCode () {
                if (this.teleponenum == "") {
                    this.$Notice.error({title:"请输入查询人手机号",duration: 1})
                } else if (this.teleponenum.length != 11) {
                    this.$Notice.error({title:"请输入正确手机号",duration: 1})
                }else if(this.serverspwd == ""){
                    this.$Notice.error({title:"手机服务密码不能为空",duration: 1})
                }else if(this.serverspwd.length !=6){
                    this.$Notice.error({title:'请输入正确的手机服务密码',duration: 1})
                }else {
                    const TIME_COUNT = 60;
                    if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    let regsmsoper = {
                        phone: this.teleponenum,
                        phonePassword: this.serverspwd
                    }
                    this.$server.operater(regsmsoper).then(data => {
                        console.log(data)
                        this.orderId = data.data.orderId
                        if (data.code == "200") {
                        this.disabled = false
                        this.$Notice.error({title:'验证码发送成功',duration: 1})
                        } else {
                        this.$layer.msg(data.msg)
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
           //运营商立即检测
            logoclick() {
                if(this.teleponenum == ""){
                    this.$Notice.error({title:"请输入查询人手机号",duration: 1})
                }else if(this.teleponenum.length !=11){
                    this.$Notice.error({title:"请输入正确的手机号",duration: 1})
                }else if(this.serverspwd == ""){
                    this.$Notice.error({title:"请输入查询人手机服务密码",duration: 1})
                }else if(this.serverspwd.length !=6){
                    this.$Notice.error({title:'请输入正确的手机服务密码',duration: 1})
                }
                // else if(this.cheackinput == false){
                //     this.$layer.msg("该功能暂未开放")
                // }
                else{
                    let operction = {
                        phonePassword:this.serverspwd,
                        phone:this.teleponenum,
                        phoneCaptcha:this.codeWord,
                        orderId:this.orderId
                    }
                    this.$server.operdiately(operction).then(data =>{
                        console.log(data)
                        if(data.code == 1101){
                            this.$Notice.error({title:'您还未登录，请登录',duration: 1})
                            this.maskShowmeta = true
                        }else if(data.code == 1103){
                          this.$Notice.error({title:'用户信息失效，请登录',duration: 1})
                          this.maskShowmeta = true
                        }else if(data.code == 1000){
                          this.$Notice.error({title:data.msg,duration: 1})
                        }else{
                          if(data.data.isNeedCode == true){
                          this.yzcode = true
                          this.orderId = data.data.orderId
                          }else if(data.data.isNeedCode == false){
                                this.modlodingmst = true              
                                let pay = {
                                  orderId:data.data.orderId,
                                  ip:'124.204.64.154'
                                }                           
                                this.$server.payment(pay).then(data =>{
                                    console.log(data)
                                    this.modlodingmst = false
                                    this.paymyShow = true
                                    this.msgesbol = data.data
                                    clearInterval(timer)
                                    let timer = setInterval(()=>{
                                        if(data.code == 200){
                                            let godpay = data.data.orderId
                                            this.$server.paystatus(godpay).then(data =>{                                                
                                                if(data.data.payStatus == 12){                                                   
                                                    clearInterval(timer)
                                                    this.paymyShow = false
                                                    this.$router.go(0)                                                                                                                                           
                                                }else if(data.data.payStatus == 13){
                                                    this.$Notice.error({title:"支付失败，请重新支付",duration: 1})
                                                }                                                
                                            })                                   
                                        }        
                                    },2000)
                                })

                           }
                          this.$Notice.error({title:data.msg,duration: 1})
                        }
                        
                    })
                }
            },
          setMaskShow(){
               this.maskShow = false
          },
          setpayShow(){
            this.payShow = false
          },
          mysetpayShow(){
            this.mypayShow = false
          },
          detailmodelist(){
            this.detailmodel = false
          },
          detailmodealist(){
            this.detailmodela = false
          },
          detailcontact(){
             this.contactnodel = false
          },
          setcontpayShow(){
            this.contpayShow = false
          },
          setmodeoShow(){
            this.statmodeo = false
          },
          setMaskShowsw(){
            this.maskShowmeta = false
          },
          //登录页获取验证码
          getvfcode () {
              if(this.loginnum == ""){
                  this.$Notice.error({title:"手机号不能为空",duration: 1})
              }else if(this.loginnum.length != 11){
                  this.$Notice.error({title:"请输入正确的手机号",duration: 1})
              }else{
              const TIME_COUNT = 60;
              if (!this.timer) {
                this.counts = TIME_COUNT;
                this.vsshow = false;
                this.$server.regsms(this.loginnum).then(data => {
                  console.log(data)
                  if (data.code == "200") {
                    this.disabled = false
                    this.$Notice.error({title:'已发送验证码',duration: 1})
                  } else {
                    this.$Notice.error({title:'获取验证码失败',duration: 1})
                  }
                })
                this.timer = setInterval(() => {
                  if (this.counts > 0 && this.counts <= TIME_COUNT) {
                    this.counts--;
                  } else {
                    this.vsshow = true;
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000)
              }
            }   
          },
          //黑名单立即登录
          marchlogo () {
              if(this.loginnum == ""){
                  this.$Notice.error({title:"手机号不能为空",duration: 1})
              }else if(this.loginnum.length != 11){
                  this.$Notice.error({title:"请输入正确的手机号",duration: 1})
              }else if (this.vfcode == "") {
                  this.$Notice.error({title:"请输入验证码",duration: 1})
              }else{
                  this.btnzhezhao = true
              if (sessionStorage.getItem('router')) {       
                let logoObj = {
                  phone: this.loginnum,
                  code: this.vfcode
                }
                this.$server.logo(logoObj).then(data => {
                  this.btnzhezhao = false
                  console.log(data)
                  if (data.code == "200") {
                    localStorage.setItem("accessToken", data.data.accessToken)
                  }

                })
              } else {
                let logoObj = {
                  phone: this.loginnum,
                  code: this.vfcode
                }
                this.$server.logo(logoObj).then(data => {
                  this.btnzhezhao = false
                  console.log(data)
                  if (data.code == "200") {
                    this.$Notice.error({title:'登录成功',duration: 1})
                    localStorage.setItem("accessToken", data.data.accessToken)
                    this.maskShow = false
                  }else if(data.code == "1000"){
                    this.$Notice.error({title:data.msg,duration: 1})
                  }
                })
              }
            }
          },
          //联系人检测登录
          marchlogo1 () {
              if(this.loginnum == ""){
                  this.$Notice.error({title:"手机号不能为空",duration: 1})
              }else if(this.loginnum.length != 11){
                  this.$Notice.error({title:"请输入正确的手机号",duration: 1})
              }else if (this.vfcode == "") {
                  this.$Notice.error({title:"请输入验证码",duration: 1})
              }else{
              this.btnzhezhao = true
              if (sessionStorage.getItem('router')) {       
                let logoObj = {
                  phone: this.loginnum,
                  code: this.vfcode
                }
                this.$server.logo(logoObj).then(data => {
                  this.btnzhezhao = false
                  console.log(data)
                  if (data.code == "200") {
                    localStorage.setItem("accessToken", data.data.accessToken)
                  }

                })
              } else {
                let logoObj = {
                  phone: this.loginnum,
                  code: this.vfcode
                }
                this.$server.logo(logoObj).then(data => {
                  this.btnzhezhao = false
                  console.log(data)
                  if (data.code == "200") {
                    this.$Notice.error({title:'登录成功',duration: 1})
                    localStorage.setItem("accessToken", data.data.accessToken)
                    this.statmodeo = false
                  }else if(data.code == "1000"){
                    this.$Notice.error({title:data.msg,duration: 1})
                  }
                })
              }
            }
          },
          marchlogo2 () {
              if(this.loginnum == ""){
                  this.$Notice.error({title:"手机号不能为空",duration: 1})
              }else if(this.loginnum.length != 11){
                  this.$Notice.error({title:"请输入正确的手机号",duration: 1})
              }else if (this.vfcode == "") {
                  this.$Notice.error({title:"请输入验证码",duration: 1})
              }else{
              this.btnzhezhao = true
              if (sessionStorage.getItem('router')) {       
                let logoObj = {
                  phone: this.loginnum,
                  code: this.vfcode
                }
                this.$server.logo(logoObj).then(data => {
                  this.btnzhezhao = false
                  console.log(data)
                  if (data.code == "200") {
                    localStorage.setItem("accessToken", data.data.accessToken)
                  }

                })
              } else {
                let logoObj = {
                  phone: this.loginnum,
                  code: this.vfcode
                }
                this.$server.logo(logoObj).then(data => {
                  this.btnzhezhao = false
                  console.log(data)
                  if (data.code == "200") {
                    this.$Notice.error({title:'登录成功',duration: 1})
                    localStorage.setItem("accessToken", data.data.accessToken)
                    this.maskShowmeta = false
                  }else if(data.code == "1000"){
                    this.$Notice.error({title:data.msg,duration: 1})
                  }
                })
              }
            }
          },
          //联系人add添加
            superAdd () {
              console.log('123')
                this.index++;
                this.formDynamic.contactList.push({
                    value: '',
                    index: this.formDynamic.contactList.index,
                    status: 1
                });                                   
            },
          //联系人remove移除
            superRemove (index) {
                 this.remove=index
                  this.formDynamic.contactList=this.formDynamic.contactList.filter((item,index) => {
                    return (this.remove!=index);
                    });
            },
          //联系人立即检测
          Contactsdet(){
            if(this.formDynamic.contactList == ''){
               this.$Notice.error({title:'至少添加一个手机号',duration: 1})
            }else if(this.formDynamic.contactList[0].phone == ''){
               this.$Notice.error({title:'联系人手机号不能为空',duration: 1})
            }else{
                let contacts = {}
                    this.$server.detection(this.formDynamic).then(data =>{
                        if(data.code == 1001){
                          this.$Notice.error({title:'联系人不能为空',duration: 1})
                        }else if(data.code == 1103){
                          this.$Notice.error({title:'用户信息失效，请登录',duration: 1})
                          this.statmodeo = true
                        }else if(data.code == 1101){
                          this.$Notice.error({title:'您还未登录，请登录',duration: 1})
                          this.statmodeo = true
                        }else{
                              if(data.code == 200){
                                this.deomarlist = true
                                let pay = {
                                      orderId:data.data.orderId,
                                      ip:'124.204.64.154'
                                    } 
                                this.$server.payment(pay).then(data =>{
                                            if(data.code ==200){
                                              this.deomarlist = false
                                              this.msg = data.data
                                              this.contpayShow = true
                                            let timer =setInterval(()=>{//轮询（每隔2秒请求一次接口用于监听paystatus状态）
                                            let godpay = data.data.orderId
                                            this.$server.paystatus(godpay).then(data =>{
                                                if(data.data.payStatus == 12){
                                                    this.$Notice.error({title:"支付成功",duration: 1})
                                                    clearInterval(timer)
                                                    this.contpayShow = false
                                                    this.$router.go(0)
                                                }else if(data.data.payStatus == 13){
                                                    this.$Notice.error({title:"支付失败，请重新支付",duration: 1})
                                              }
                                            })
                                          },2000)
                                      }
                                })
                            }else{
                              this.deomarlist = false
                              this.$Notice.error({title:data.msg,duration: 1})
                            }
                        }
                    })
                }
            },
           //请求我的报告列表
          getordertext(){            
              let looklist = {
              start:this.page,
              limit:this.pagetotle,
              }
              this.$server.orderslist(looklist).then(data =>{
                  // console.log(data.data)
                  this.oriderlisttext=data.data.rows;
                  // this.arr = data.data.rows[0].contacts[0]
                  // console.log(arr.phone)    
              })
          },
          nameclick(e){
            if(e == 'name4'){
              this.getordertext()
            }     
          },
          //查看or支付
          imgwarpclick(e){
            console.log(e)
            if(e.payStatus == 12){//侧边栏的特殊性无法实现二级页面只能是蒙层的形式判断为1则展示黑名单检测详情
                if(e.creditType == 1){
                    let delorider = e.orderId
                    this.detailmodel = true
                    this.$server.examinelist(delorider).then(data =>{
                     console.log(data.data.black_list)
                     this.emergid = data.data.black_list
                     this.mbleid = data.data.black_list.black_list_detection
                     this.method = data.data.black_list.multi_loan_detection
                     this.Overdue = data.data.black_list.overdue_detection
                     this.emergidmg = data.data
                     
                  })  
                }else if(e.creditType == 2){//类型为2的时候展示联系人风险检测详情
                     let ordid = e.orderId
                     this.contactnodel = true
                     this.$server.examinelist(ordid).then(data =>{
                     console.log(data.data.contacts)
                     this.emergencey = data.data.contacts.contact_list
                  })
                }else if(e.creditType == 3){
                  let deloriders = e.orderId
                    this.detailmodela = true
                    this.$server.examinelist(deloriders).then(data =>{
                     console.log(data.data.operator)
                     this.opermdel = data.data.operator.base_info
                     this.meaberlist = data.data
                    
                  })  
    
                }
                
            }else{//未支付（10）状态走支付接口
              let pay = {
                      orderId:e.orderId,
                      ip:'124.204.64.154'
                    }                    
              this.$server.payment(pay).then(data =>{
                  this.msgests = data.data
                  this.mypayShow = true
                  clearInterval(timer)
                  let timer = setInterval(()=>{
                      if(data.code == 200){
                      let godpay = e.orderId
                            this.$server.paystatus(godpay).then(data =>{
                                if(data.data.payStatus == 12){
                                      this.$Notice.error({title:"支付成功",duration: 1})
                                      clearInterval(timer)
                                      this.mypayShow = false
                                      this.$router.go(0)                                 
                                }else if(data.data.payStatus == 13){
                                    this.$Notice.error({title:"支付失败，请重新支付",duration: 1})
                            }
                                
                        })
                    }

                  },2000)
              })
            }                
          },
          //联系人用户协议
          contactsclick(){
              this.concent++;
                if (this.concent % 2 != 0) {
                    this.cheackinput = true
                    this.imgurl = 'x.png'
                } else {
                    this.cheackinput = false
                    this.imgurl = 'checknone.png'
                }
          },
            //用户协议
            tiaoliclicks () {
                this.concent++;
                if (this.concent % 2 != 0) {
                    this.cheackinputs = true
                    this.imgurl = 'x.png'
                } else {
                    this.cheackinputs = false
                    this.imgurl = 'checknone.png'
                }
            },
            tiaoliclick () {
                this.concent++;
                if (this.concent % 2 != 0) {
                    this.cheackinputs = true
                    this.imgurl = 'x.png'
                } else {
                    this.cheackinputs = false
                    this.imgurl = 'checknone.png'
                }
            },
            animateWidth () {
              document.body.scrollTop = 0;
            },
            
      }
}
</script>
<style>
@import './index.less';
@import './black.less';
.hello{padding: 0;margin: 0;min-width: 1088px;}
.nav{min-width: 1088px;}
.nav_header{
  height: 60px;
  line-height: 60px;
/*  border-bottom: 1px solid #cbcbcb;*/
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
.smaillist{
  position: fixed;
  right: 10px;
  top: 45%;
  z-index: 1000;
}
.ivu-drawer{
  height: 0px !important;
  margin-top:15%;
}
.ivu-drawer-content {
    width: 100%;
    height: 440px !important;
    position: absolute;
    top: 2% !important;
    /*bottom: 0;*/
    right: 0;
    background-color: #fff;
    border: 0;
    background-clip: padding-box;
    box-shadow: 0 4px 12px rgba(0,0,0,.15);
    border-radius: 8px;
}
.ivu-drawer-body{
  padding: 0 8px !important;
  height: 460px !important;
}
.ivu-drawer-no-header{
  width: 560px !important;
  height: 460px !important;
}
.titles{
    float: left;
    font-size: 14px;
    color: #000;
    margin: 10px 0;
    font-weight: bold;
}
.ivu-btn-primary{
  width: 50px !important;
  height: 140px !important;
  writing-mode: vertical-lr;
}
.ivu-input-prefix i{
    font-size: 16px;
    line-height: 45px;
    color: #808695;
}
.ivu-input {
    display: inline-block;
    width: 100%;
    height: 45px !important;
    line-height: 1.5;
    padding:10px 30px !important;
    font-size: 12px;
    border: 1px solid #dddee1;
    border-radius: 0px;
    color: #495060;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: text;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
}
.ivu-input-type {
    width: 100% !important;
}
.ivu-form-item-content{
  text-align: center;
}
.protocol{
  display: inline;
  color: #2d8cf0;
}
.inputset{
    width: 61%;
    height: 45px;
    padding: 4px 7px;
    border: 1px solid #eae2e2;
}
.buttoms{
  width: 38%;
  height: 45px;
  background: rgb(0,118,225);
  border: none;
  border-radius: 5px;
}
.myreports{
  width: 100%;
  /* height: 150px; */
  border-radius: 5px;
  margin-bottom: 10px;
  border: 1px solid #cbcbcb;
}
.myreportone{
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #cbcbcb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.myreportleft{
  width: 45%;
  float: left;
  margin: 0 20px;
  font-size: 14px;
  font-weight: bold;
}
.myreportright{
  width: 45%;
  float: right;
  text-align: right;
  margin: 0 20px;
  font-size: 14px;
  font-weight: bold;
}
.myreportwo{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.myreportbig{
  width: 45%;
  margin: 20px 20px;
  float: left;

}
.myreportsml{
  width: 45%;
  margin: 20px 20px;
  float: right;
  text-align: right;
}
.examine{
  width: 60px;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  color: #fff;
  background-color: #376eff;
  border: none;
}
.mytype{
  margin-top: 10px;
}
.rightcol{
  color: #ffc85d;
}
.lother{
  color: #ff1d36;
}
.paylisttext{
    width: 100%;
    height: 165px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.paylistleft{
    height: 255px;
    width: 220px;
    margin-top: 100px;
    margin-left: 10px;
    background-image: url("../../assets/pay.png");
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    text-align: center;
}
.paylistright{
    margin: 0 auto;
    height: 255px;
    width: 220px;
    margin-top: 100px;
    /* margin-right: 10px; */
    background-image: url("../../assets/wxpay.jpg");
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    text-align: center;
}
.paylistleft img{
    width: 111px;
    margin-top: 122px;
}
.paylistright img{
    width: 111px;
    margin-top: 122px;
}
.alignaitem span{
  writing-mode: vertical-lr;
  letter-spacing: 2px;
  font-size: 16px;
  position: relative;
  right: 3px;
}
.imgwarpse {
    position: relative;
    top: 12px;
    float: left;
    left: 12px;
}
.inputsing{
  width: 100%;
    height: 45px;
    text-align: left;
    position: relative;
    top: 12px;
    left: 25px;
    color: #366eff;
}
.childslist{
    position: fixed;
    width: 470px;
    height: 380px;
    border: 1px solid #ccc;
    text-align: center;
    top: 0;
    left: calc(50% - 233px);
    background: #fff;
    border-radius: 10px;
}
.modestart{
    position: fixed;
    width: 470px;
    height: 369px;
    border: 1px solid #ccc;
    text-align: center;
    top: 0px;
    left: 582px;
    background: #fff;
    border-radius: 10px;
}
.masklistart{
  position: fixed;
  width: 470px;
  height: 380px;
  border: 1px solid #ccc;
  text-align: center;
  top: -1px;
  left: 1125px;
  background: #fff;
  border-radius: 10px;
}
.maskmeta{
  width: 100%;
  height: 404px;
  position: fixed;
  left: 545px;
  top: -16px;
  background: #000;
  opacity: .3;
}
.ivu-tabs-nav{
  position:fixed;
  right: 0;
  background: #fff;
  z-index: 1000;
}
#btnSendCode {
  width: 8rem;
  border: 1px solid #2d8cf0;
  text-align: center;
  line-height: 2.8rem;
  float: right;
  font-size: .373rem;
  color: #2d8cf0;
  border-radius: 5px;
  cursor: default;
}
.masktert{
  width: 100%;
  height: 410px;
  position: fixed;
  top: -17px;
  bottom: 0;
  right: -560px;
  background: #000;
  opacity: 0.3;
}
.childslistmast{
  position: fixed;
  width: 470px;
  height: 400px;
  border: 1px solid #ccc;
  text-align: center;
  top: 0;
  background: #fff;
  border-radius: 10px;
}
.basiceing{
    margin: 0 10%;
    height: 267px;
    background-color: #fff;
    position: relative;
    /*bottom: 35px;*/
    /*top: 40px;*/
    border-radius: 8px;
    text-align: center;
}
.basiceing1{
    margin: 0 10%;
    height: 290px;
    background-color: #fff;
    position: relative;
    bottom: 35px;
    border-radius: 8px;
    text-align: center;
}
.unscrambleseing{
    height: 44px;
    margin: 0 18%;
    font-size: 0.9rem;
    color: #615c5c;
    font-weight: bold;
    position: relative;
    bottom: 23px;
}
.unscrambleseing img{
    width: 35px;
    position: relative;
    top: 5px;
}
.naxtlistseormer{
    margin: 0 10%;
    height: 450px;
    background-color: #fff;
    position: relative;
    bottom: -14px;
    border-radius: 8px;
    text-align: center;
}
.naxtlistseorm{
    margin: 0 10%;
    height: 194px;
    background-color: #fff;
    position: relative;
    bottom: -14px;
    border-radius: 8px;
    text-align: center;
}
.naxtlistseormse{
    margin: 0 10%;
    height: 227px;
    background-color: #fff;
    position: relative;
    bottom: -14px;
    border-radius: 8px;
    text-align: center;
}
.naxtlistseormset{
    margin: 0 10%;
    height: 125px;
    background-color: #fff;
    position: relative;
    bottom: -28px;
    border-radius: 8px;
    text-align: center;
}
.lodinglist{
    width: 100%;
    height: 404px;
    position: fixed;
    top: -16px;
    right: 0px;
    background: #000;
    opacity: 0.3;
}
.lodinglist img{
    width: 120px;
    height: 120px;
    margin-left: 40%;
    margin-top:24%;
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
.lodinglistdeo{
    width: 100%;
    height: 404px;
    position: fixed;
    top: -16px;
    right: -1088px;
    background: #000;
    opacity: 0.3;
}
.lodinglistdeo img{
    width: 120px;
    height: 120px;
    margin-top: 22%;
    margin-left: -6%;
    -webkit-transform: rotate(360deg);
    animation: rotation 8s linear infinite;
    -moz-animation: rotation 8s linear infinite;
    -webkit-animation: rotation 8s linear infinite;
    -o-animation: rotation 8s linear infinite;
}
.lodinglist1{
    width: 100%;
    height: 404px;
    position: fixed;
    top: -16px;
    right: -544px;
    background: #000;
    opacity: 0.3;
}
.lodinglist1 img{
   width: 120px;
    height: 120px;
    margin-left: -6%;
    margin-top: -6%;
    -webkit-transform: rotate(360deg);
    animation: rotation 8s linear infinite;
    -moz-animation: rotation 8s linear infinite;
    -webkit-animation: rotation 8s linear infinite;
    -o-animation: rotation 8s linear infinite;
  }
.lodingimg{
    width: 40px;
    height: 40px;
    position: relative;
    top: 164px;
    left: 25%;
}
.unscramblesele{
    height: 70px;
    margin: 0 18%;
    font-size: 0.9rem;
    color: #615c5c;
    font-weight: bold;
}
.unscramblesele img{
  width: 35px;
    position: relative;
    top: 5px;
}
.unscramblese{
    height: 70px;
    margin: 0 18%;
    font-size: 0.9rem;
    color: #615c5c;
    font-weight: bold;
    margin-top: 30px;
}
.aligntextmas{
    margin: 0 10%;
    background-color: #fff;
    position: relative;
    border-radius: 8px;
    text-align: center;
    height: 380px;
    top: 10px;
}
.generate{
    background-color: #6d6868 !important;
    border: 1px solid #6d6868;
    color: #fff;
    border-radius: 5px;
}
.maskhead{
    width: 100%;
    height: 403px;
    position: fixed;
    left: 1087px;
    bottom: 8px;
    background: #000;
    opacity: 0.3;
}
.titlesead{
    float: left;
    font-size: 14px;
    color: #000;
    font-weight: bold;
}
.msgtan{
    width: 30%;
    height: 35px;
    border-radius: 5px;
    background: #000;
    opacity: 0.6;
    position: fixed;
    top: 40%;
    left: 35%;
    color: #fff;
    text-align: center;
    line-height: 35px;
}
.closema{
  float: left;
  margin-left: 12px;
  margin-top: 5px;
  color: #fff;
  font-size: 24px;
  cursor: default;
}
.loginsizemd{
  width: 80px;
  position: relative;
  left: 246px;
  bottom: 74px;
  color: #fff;
}
.loginsizemba{
  width: 80px;
  position: relative;
  left: 240px;
  top: 45%;
  color: #fff;
}
.loginsizembase{
  width: 80px;
  position: relative;
  left: 220px;
  bottom: 18%;
  color: #fff;
}
.ivu-notice{
    width: 207px !important;
    margin-right: 183px !important;
    position: fixed;
    z-index: 1010;
    top: 335px !important;
    /* background: #000; */
}
.ivu-notice-notice{
  background: rgba(0,0,0,0.6) !important;
}
.ivu-notice-title{
  color: #fff !important;
  text-align:center;
  margin-left: 0px !important;
}
.ivu-icon{
  display: none !important;
}
</style>
