(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-75fdd620"],{"2bb8":function(t,e,a){"use strict";var n=function(t){switch(typeof t){case"string":return t;case"boolean":return t?"true":"false";case"number":return isFinite(t)?t:"";default:return""}};t.exports=function(t,e,a,o){return e=e||"&",a=a||"=",null===t&&(t=void 0),"object"===typeof t?r(s(t),(function(s){var o=encodeURIComponent(n(s))+a;return i(t[s])?r(t[s],(function(t){return o+encodeURIComponent(n(t))})).join(e):o+encodeURIComponent(n(t[s]))})).join(e):o?encodeURIComponent(n(o))+a+encodeURIComponent(n(t)):""};var i=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)};function r(t,e){if(t.map)return t.map(e);for(var a=[],n=0;n<t.length;n++)a.push(e(t[n],n));return a}var s=Object.keys||function(t){var e=[];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&e.push(a);return e}},"5ee4":function(t,e,a){"use strict";e.decode=e.parse=a("a2d3"),e.encode=e.stringify=a("2bb8")},a0ed:function(t,e,a){},a2d3:function(t,e,a){"use strict";function n(t,e){return Object.prototype.hasOwnProperty.call(t,e)}t.exports=function(t,e,a,r){e=e||"&",a=a||"=";var s={};if("string"!==typeof t||0===t.length)return s;var o=/\+/g;t=t.split(e);var l=1e3;r&&"number"===typeof r.maxKeys&&(l=r.maxKeys);var c=t.length;l>0&&c>l&&(c=l);for(var u=0;u<c;++u){var p,d,f,h,g=t[u].replace(o,"%20"),b=g.indexOf(a);b>=0?(p=g.substr(0,b),d=g.substr(b+1)):(p=g,d=""),f=decodeURIComponent(p),h=decodeURIComponent(d),n(s,f)?i(s[f])?s[f].push(h):s[f]=[s[f],h]:s[f]=h}return s};var i=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}},b0c6:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"staff"},[a("div",{staticClass:"staff-bottom"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.staffInfo,stripe:""}},[a("el-table-column",{attrs:{prop:"id",label:"编号",width:"80px",align:"center"}}),a("el-table-column",{attrs:{prop:"username",label:"姓名",width:"140px",align:"center"}}),a("el-table-column",{attrs:{prop:"telephone",label:"手机号",width:"140px",align:"center"}}),a("el-table-column",{attrs:{prop:"idCard",label:"身份证号",width:"130px",align:"center"}}),a("el-table-column",{attrs:{prop:"bankCard",label:"银行卡号",width:"130px",align:"center"}}),a("el-table-column",{attrs:{prop:"registerTime",label:"注册时间",width:"130px",align:"center"}}),a("el-table-column",{attrs:{prop:"status",label:"状态",width:"100px",align:"center"}}),a("el-table-column",{staticClass:"caozuo",attrs:{label:"操作",width:"185px",align:"center",color:"lightblue"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("a",{staticClass:"caozuo",on:{click:function(a){return t.sure(e.row.id)}}},[t._v("审核")])]}}])})],1)],1),a("div",{staticClass:"staff-footer"},[a("el-pagination",{attrs:{"current-page":t.currentPage1,"page-size":t.pageSize,layout:"total, prev, pager, next",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage1=e},"update:current-page":function(e){t.currentPage1=e}}})],1),a("el-dialog",{attrs:{title:"审核员工",visible:t.dialogVisible,width:"650px"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("span",{staticClass:"text1"},[t._v("用户名:")]),t._v(t._s(t.username)),a("span",{staticClass:"text2"}),a("span",{staticClass:"text1"},[t._v("身份证号:")]),a("span",[t._v(t._s(t.idCard))]),a("br"),a("span",{staticClass:"text3"},[t._v("身份证正面照")]),a("span",[t._v("身份证反面照")]),a("br"),a("img",{staticClass:"img",staticStyle:{"margin-right":"115px"},attrs:{src:t.photo1,alt:""}}),a("img",{staticClass:"img",attrs:{src:t.photo2,alt:""}}),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"danger"},on:{click:t.rejectIt}},[t._v("拒绝审核")]),a("el-button",{attrs:{type:"primary"},on:{click:t.passIt}},[t._v("审核通过")])],1)])],1)},i=[],r=a("5ee4"),s=a.n(r),o={name:"Staff",data:function(){return{input:"",staffInfo:[],total:0,currentPage1:1,pageSize:6,Staff:{},dialogVisible:!1,username:"",idCard:"",photo1:"",photo2:"",obj:{}}},created:function(){this.findAll()},methods:{rejectIt:function(){var t=this,e=this;this.obj.status="禁用",this.$axios.post("/waiter/saveOrUpdate",s.a.stringify(this.obj)).then((function(a){200==a.data.status&&(t.$message({type:"error",message:"审核不通过!"}),e.findAll(),e.dialogVisible=!1)}))},passIt:function(){var t=this,e=this;this.obj.status="启用",this.$axios.post("/waiter/saveOrUpdate",s.a.stringify(this.obj)).then((function(a){200==a.data.status&&t.$message({type:"success",message:"审核通过!"}),e.findAll(),e.dialogVisible=!1}))},sure:function(t){var e=this;this.dialogVisible=!0,this.$axios.get("/waiter/findWaiterById",{params:{id:t}}).then((function(t){e.obj=t.data.data,e.username=e.obj.username,e.idCard=e.obj.idCard,e.photo1=e.obj.idcardPhotoPositive,e.photo2=e.obj.idcardPhotoNegative}))},findAll:function(){var t=this,e=this.currentPage1-1,a={page:e,pageSize:this.pageSize};this.$axios.post("/waiter/query",s.a.stringify(a)).then((function(e){console.log(e),t.staffInfo=e.data.data.list,t.total=e.data.data.total}))},handleSizeChange:function(t){},handleCurrentChange:function(t){this.findAll()},deleteById:function(t){var e=t.id,a=this;this.$axios.get("waiter/deleteById",{params:{id:e}}).then((function(t){a.findAll()}))},open1:function(t){var e=this;this.$confirm("此操作将永久删除该栏目信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.deleteById(t),e.$message({type:"success",message:"删除成功!"})})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))}}},l=o,c=(a("b3bc"),a("9ca4")),u=Object(c["a"])(l,n,i,!1,null,"084ba2b8",null);e["default"]=u.exports},b3bc:function(t,e,a){"use strict";var n=a("a0ed"),i=a.n(n);i.a}}]);