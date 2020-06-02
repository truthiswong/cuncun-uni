
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/init","pages/login/guide","pages/login/login","pages/tabs/tab1","pages/tabs/tab2","pages/tabs/tab3","pages/tab1/failBox","pages/tab1/book","pages/tab1/clothes","pages/tab1/shoes","pages/tab1/storage","pages/tab1/groceries","pages/tab1/search","pages/login/agreement","pages/tab1/orderBack","pages/tab1/orderBackPay","pages/tab1/orderBackSuccess","pages/tab1/orderBackDetails","pages/tab2/addOrder","pages/tab2/orderDetails","pages/tab2/orderStorageDetails","pages/tab2/orderPay","pages/tab2/orderSuccess","pages/tab2/picker","pages/tab3/setting","pages/tab3/payDetails","pages/tab3/other","pages/tab3/otherPage1","pages/tab3/otherPage3","pages/tab3/realName","pages/tab3/realNameFail","pages/tab3/realNameSuccess","pages/tab3/address","pages/tab3/addAddress","pages/tab3/addAddressConform","pages/tab3/changePhone","components/customSteps"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"cuncun-app","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#FFFFFF","navigationStyle":"custom"},"tabBar":{"list":[{"pagePath":"pages/tabs/tab1","text":"存存","iconPath":"static/tabs/tab1_off.png","selectedIconPath":"static/tabs/tab1_on.png"},{"pagePath":"pages/tabs/tab2","text":"订单","iconPath":"static/tabs/tab2_off.png","selectedIconPath":"static/tabs/tab2_on.png"},{"pagePath":"pages/tabs/tab3","text":"我的","iconPath":"static/tabs/tab3_off.png","selectedIconPath":"static/tabs/tab3_on.png"}],"backgroundColor":"#ffffff","color":"#888888","selectedColor":"rgba(59, 193, 187, 1)"},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":false,"autoclose":false},"appname":"存存","compilerVersion":"2.7.9","entryPagePath":"pages/login/init","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/init","meta":{"isQuit":true},"window":{"navigationBarTitleText":"入口页"}},{"path":"/pages/login/guide","meta":{},"window":{"navigationBarTitleText":"引导页","titleNView":false,"bounce":"none"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录","bounce":"none","popGesture":"none"}},{"path":"/pages/tabs/tab1","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"存存","bounce":"none"}},{"path":"/pages/tabs/tab2","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的订单","onReachBottomDistance":100,"bounce":"none"}},{"path":"/pages/tabs/tab3","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","bounce":"none"}},{"path":"/pages/tab1/failBox","meta":{},"window":{"navigationBarTitleText":"未过安检的箱子","bounce":"none"}},{"path":"/pages/tab1/book","meta":{},"window":{"navigationBarTitleText":"我的书架","bounce":"none"}},{"path":"/pages/tab1/clothes","meta":{},"window":{"navigationBarTitleText":"我的衣柜","bounce":"none"}},{"path":"/pages/tab1/shoes","meta":{},"window":{"navigationBarTitleText":"我的鞋柜","bounce":"none"}},{"path":"/pages/tab1/storage","meta":{},"window":{"navigationBarTitleText":"我的储藏室","bounce":"none"}},{"path":"/pages/tab1/groceries","meta":{},"window":{"navigationBarTitleText":"我的杂物架","bounce":"none"}},{"path":"/pages/tab1/search","meta":{},"window":{"navigationBarTitleText":"搜索","onReachBottomDistance":100,"bounce":"none"}},{"path":"/pages/login/agreement","meta":{},"window":{"navigationBarTitleText":"用户协议","bounce":"none"}},{"path":"/pages/tab1/orderBack","meta":{},"window":{"navigationBarTitleText":"返送清单","bounce":"none"}},{"path":"/pages/tab1/orderBackPay","meta":{},"window":{"navigationBarTitleText":"返送清单支付","bounce":"none"}},{"path":"/pages/tab1/orderBackSuccess","meta":{},"window":{"navigationBarTitleText":"返送清单完成","bounce":"none","popGesture":"none"}},{"path":"/pages/tab1/orderBackDetails","meta":{},"window":{"navigationBarTitleText":"返送清单详情","bounce":"none","popGesture":"none"}},{"path":"/pages/tab2/addOrder","meta":{},"window":{"navigationBarTitleText":"添加存单","bounce":"none"}},{"path":"/pages/tab2/orderDetails","meta":{},"window":{"navigationBarTitleText":"存单详情","bounce":"none","popGesture":"none"}},{"path":"/pages/tab2/orderStorageDetails","meta":{},"window":{"navigationBarTitleText":"存储订单详情","bounce":"none"}},{"path":"/pages/tab2/orderPay","meta":{},"window":{"navigationBarTitleText":"存单支付","bounce":"none"}},{"path":"/pages/tab2/orderSuccess","meta":{},"window":{"navigationBarTitleText":"存单成功","bounce":"none","popGesture":"none"}},{"path":"/pages/tab2/picker","meta":{},"window":{"navigationBarTitleText":"时间日期选择","bounce":"none"}},{"path":"/pages/tab3/setting","meta":{},"window":{"navigationBarTitleText":"设置","bounce":"none"}},{"path":"/pages/tab3/payDetails","meta":{},"window":{"navigationBarTitleText":"消费明细","onReachBottomDistance":100,"bounce":"none"}},{"path":"/pages/tab3/other","meta":{},"window":{"navigationBarTitleText":"其它","bounce":"none"}},{"path":"/pages/tab3/otherPage1","meta":{},"window":{"navigationBarTitleText":"存存服务协议","bounce":"none"}},{"path":"/pages/tab3/otherPage3","meta":{},"window":{"navigationBarTitleText":"关于存存","bounce":"none"}},{"path":"/pages/tab3/realName","meta":{},"window":{"navigationBarTitleText":"实名认证","bounce":"none"}},{"path":"/pages/tab3/realNameFail","meta":{},"window":{"navigationBarTitleText":"实名认证失败","bounce":"none"}},{"path":"/pages/tab3/realNameSuccess","meta":{},"window":{"navigationBarTitleText":"实名认证成功","bounce":"none","popGesture":"none"}},{"path":"/pages/tab3/address","meta":{},"window":{"navigationBarTitleText":"地址","bounce":"none","popGesture":"none"}},{"path":"/pages/tab3/addAddress","meta":{},"window":{"navigationBarTitleText":"添加地址","bounce":"none"}},{"path":"/pages/tab3/addAddressConform","meta":{},"window":{"navigationBarTitleText":"确认地址","bounce":"none"}},{"path":"/pages/tab3/changePhone","meta":{},"window":{"navigationBarTitleText":"修改手机号","bounce":"none"}},{"path":"/components/customSteps","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
