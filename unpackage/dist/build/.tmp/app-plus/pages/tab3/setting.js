(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab3/setting"],{"1a63":function(n,t,e){"use strict";e.r(t);var u=e("3910"),i=e("447a");for(var o in i)"default"!==o&&function(n){e.d(t,n,function(){return i[n]})}(o);e("9466");var c,a=e("f0c5"),s=Object(a["a"])(i["default"],u["b"],u["c"],!1,null,"2dc59447",null,!1,u["a"],c);t["default"]=s.exports},3910:function(n,t,e){"use strict";var u={"uni-nav-bar":()=>e.e("components/uni-nav-bar/uni-nav-bar").then(e.bind(null,"a5f2")),"uni-list":()=>e.e("components/uni-list/uni-list").then(e.bind(null,"cb59")),"uni-list-item":()=>e.e("components/uni-list-item/uni-list-item").then(e.bind(null,"a055"))},i=function(){var n=this,t=n.$createElement;n._self._c},o=[];e.d(t,"b",function(){return i}),e.d(t,"c",function(){return o}),e.d(t,"a",function(){return u})},"447a":function(n,t,e){"use strict";e.r(t);var u=e("d73d"),i=e.n(u);for(var o in u)"default"!==o&&function(n){e.d(t,n,function(){return u[n]})}(o);t["default"]=i.a},"645a":function(n,t,e){},9466:function(n,t,e){"use strict";var u=e("645a"),i=e.n(u);i.a},d73d:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={components:{},data:function(){return{}},watch:{},computed:{},created:function(){},activated:function(){},deactivated:function(){},mounted:function(){},methods:{onClickBack:function(){n.navigateBack({delta:1})},onAddress:function(){this.$router.push({path:"/address"})},onLogout:function(){n.showModal({title:"提示",content:"注销账号后，该账号里所有数据将被清空。",success:function(t){t.confirm&&n.toastSuccess("退出成功")}})},onExit:function(){n.showModal({title:"提示",content:"您确定要退出登录吗？",success:function(t){t.confirm&&(n.navigateTo({url:"/pages/login/login"}),n.toastSuccess("退出成功"))}})}}};t.default=e}).call(this,e("6e42")["default"])},ede3:function(n,t,e){"use strict";(function(n){e("0007"),e("921b");u(e("66fd"));var t=u(e("1a63"));function u(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("6e42")["createPage"])}},[["ede3","common/runtime","common/vendor"]]]);