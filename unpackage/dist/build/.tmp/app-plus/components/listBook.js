(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/listBook"],{"3c83":function(t,o,e){"use strict";var n,r=function(){var t=this,o=t.$createElement;t._self._c},a=[];e.d(o,"b",function(){return r}),e.d(o,"c",function(){return a}),e.d(o,"a",function(){return n})},"5d77":function(t,o,e){"use strict";var n=e("b99e"),r=e.n(n);r.a},6193:function(t,o,e){"use strict";e.r(o);var n=e("3c83"),r=e("6954");for(var a in r)"default"!==a&&function(t){e.d(o,t,function(){return r[t]})}(a);e("5d77");var u,i=e("f0c5"),s=Object(i["a"])(r["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],u);o["default"]=s.exports},6954:function(t,o,e){"use strict";e.r(o);var n=e("848f"),r=e.n(n);for(var a in n)"default"!==a&&function(t){e.d(o,t,function(){return n[t]})}(a);o["default"]=r.a},"848f":function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var n=r(e("b5ea"));function r(t){return t&&t.__esModule?t:{default:t}}var a={name:"listBook",data:function(){return{showBooks:[]}},props:{books:{type:Array}},created:function(){this.showBooks=this.formateBooks(this.books)},watch:{books:function(){this.showBooks=this.formateBooks(this.books)}},methods:{formateBooks:function(t){var o=[],e=!0,r=!1,a=void 0;try{for(var u,i=this.books[Symbol.iterator]();!(e=(u=i.next()).done);e=!0){var s=u.value;s["view"]=n.default.fixView(s.view),s["created_at"]=n.default.relativeTime(s.created_at),o.push(s)}}catch(f){r=!0,a=f}finally{try{e||null==i.return||i.return()}finally{if(r)throw a}}return o}}};o.default=a},b99e:function(t,o,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/listBook-create-component',
    {
        'components/listBook-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("6193"))
        })
    },
    [['components/listBook-create-component']]
]);
