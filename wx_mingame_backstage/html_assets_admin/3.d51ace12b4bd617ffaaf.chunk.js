webpackJsonp([3],{46:function(e,t,r){r(63);var n=r(18)(r(57),r(72),"data-v-58c43f48",null);n.options.__file="D:\\phpStudy\\WWW\\jx\\work\\jx_game\\src\\views\\index.vue",n.esModule&&Object.keys(n.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),n.options.functional&&console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions."),e.exports=n.exports},50:function(e,t,r){"use strict";var n=String.prototype.replace,o=/%20/g;e.exports={default:"RFC3986",formatters:{RFC1738:function(e){return n.call(e,o,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},51:function(e,t,r){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=Object.prototype.hasOwnProperty,i=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}();t.arrayToObject=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},n=0;n<e.length;++n)void 0!==e[n]&&(r[n]=e[n]);return r},t.merge=function(e,r,i){if(!r)return e;if("object"!==(void 0===r?"undefined":n(r))){if(Array.isArray(e))e.push(r);else{if("object"!==(void 0===e?"undefined":n(e)))return[e,r];(i.plainObjects||i.allowPrototypes||!o.call(Object.prototype,r))&&(e[r]=!0)}return e}if("object"!==(void 0===e?"undefined":n(e)))return[e].concat(r);var a=e;return Array.isArray(e)&&!Array.isArray(r)&&(a=t.arrayToObject(e,i)),Array.isArray(e)&&Array.isArray(r)?(r.forEach(function(r,a){o.call(e,a)?e[a]&&"object"===n(e[a])?e[a]=t.merge(e[a],r,i):e.push(r):e[a]=r}),e):Object.keys(r).reduce(function(e,n){var o=r[n];return Object.prototype.hasOwnProperty.call(e,n)?e[n]=t.merge(e[n],o,i):e[n]=o,e},a)},t.decode=function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(t){return e}},t.encode=function(e){if(0===e.length)return e;for(var t="string"==typeof e?e:String(e),r="",n=0;n<t.length;++n){var o=t.charCodeAt(n);45===o||46===o||95===o||126===o||o>=48&&o<=57||o>=65&&o<=90||o>=97&&o<=122?r+=t.charAt(n):o<128?r+=i[o]:o<2048?r+=i[192|o>>6]+i[128|63&o]:o<55296||o>=57344?r+=i[224|o>>12]+i[128|o>>6&63]+i[128|63&o]:(n+=1,o=65536+((1023&o)<<10|1023&t.charCodeAt(n)),r+=i[240|o>>18]+i[128|o>>12&63]+i[128|o>>6&63]+i[128|63&o])}return r},t.compact=function(e,r){if("object"!==(void 0===e?"undefined":n(e))||null===e)return e;var o=r||[],i=o.indexOf(e);if(-1!==i)return o[i];if(o.push(e),Array.isArray(e)){for(var a=[],c=0;c<e.length;++c)e[c]&&"object"===n(e[c])?a.push(t.compact(e[c],o)):void 0!==e[c]&&a.push(e[c]);return a}return Object.keys(e).forEach(function(r){e[r]=t.compact(e[r],o)}),e},t.isRegExp=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},t.isBuffer=function(e){return null!==e&&void 0!==e&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))}},52:function(e,t,r){"use strict";var n=r(54),o=r(53),i=r(50);e.exports={formats:i,parse:o,stringify:n}},53:function(e,t,r){"use strict";var n=r(51),o=Object.prototype.hasOwnProperty,i={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:n.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},a=function(e,t){for(var r={},n=e.split(t.delimiter,t.parameterLimit===1/0?void 0:t.parameterLimit),i=0;i<n.length;++i){var a,c,s=n[i],l=-1===s.indexOf("]=")?s.indexOf("="):s.indexOf("]=")+1;-1===l?(a=t.decoder(s),c=t.strictNullHandling?null:""):(a=t.decoder(s.slice(0,l)),c=t.decoder(s.slice(l+1))),o.call(r,a)?r[a]=[].concat(r[a]).concat(c):r[a]=c}return r},c=function(e,t,r){if(!e.length)return t;var n,o=e.shift();if("[]"===o)n=[],n=n.concat(c(e,t,r));else{n=r.plainObjects?Object.create(null):{};var i="["===o.charAt(0)&&"]"===o.charAt(o.length-1)?o.slice(1,-1):o,a=parseInt(i,10);!isNaN(a)&&o!==i&&String(a)===i&&a>=0&&r.parseArrays&&a<=r.arrayLimit?(n=[],n[a]=c(e,t,r)):n[i]=c(e,t,r)}return n},s=function(e,t,r){if(e){var n=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,i=/(\[[^[\]]*])/,a=/(\[[^[\]]*])/g,s=i.exec(n),l=s?n.slice(0,s.index):n,u=[];if(l){if(!r.plainObjects&&o.call(Object.prototype,l)&&!r.allowPrototypes)return;u.push(l)}for(var f=0;null!==(s=a.exec(n))&&f<r.depth;){if(f+=1,!r.plainObjects&&o.call(Object.prototype,s[1].slice(1,-1))&&!r.allowPrototypes)return;u.push(s[1])}return s&&u.push("["+n.slice(s.index)+"]"),c(u,t,r)}};e.exports=function(e,t){var r=t||{};if(null!==r.decoder&&void 0!==r.decoder&&"function"!=typeof r.decoder)throw new TypeError("Decoder has to be a function.");if(r.delimiter="string"==typeof r.delimiter||n.isRegExp(r.delimiter)?r.delimiter:i.delimiter,r.depth="number"==typeof r.depth?r.depth:i.depth,r.arrayLimit="number"==typeof r.arrayLimit?r.arrayLimit:i.arrayLimit,r.parseArrays=!1!==r.parseArrays,r.decoder="function"==typeof r.decoder?r.decoder:i.decoder,r.allowDots="boolean"==typeof r.allowDots?r.allowDots:i.allowDots,r.plainObjects="boolean"==typeof r.plainObjects?r.plainObjects:i.plainObjects,r.allowPrototypes="boolean"==typeof r.allowPrototypes?r.allowPrototypes:i.allowPrototypes,r.parameterLimit="number"==typeof r.parameterLimit?r.parameterLimit:i.parameterLimit,r.strictNullHandling="boolean"==typeof r.strictNullHandling?r.strictNullHandling:i.strictNullHandling,""===e||null===e||void 0===e)return r.plainObjects?Object.create(null):{};for(var o="string"==typeof e?a(e,r):e,c=r.plainObjects?Object.create(null):{},l=Object.keys(o),u=0;u<l.length;++u){var f=l[u],p=s(f,o[f],r);c=n.merge(c,p,r)}return n.compact(c)}},54:function(e,t,r){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=r(51),i=r(50),a={brackets:function(e){return e+"[]"},indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},c=Date.prototype.toISOString,s={delimiter:"&",encode:!0,encoder:o.encode,encodeValuesOnly:!1,serializeDate:function(e){return c.call(e)},skipNulls:!1,strictNullHandling:!1},l=function e(t,r,n,i,a,c,s,l,u,f,p,d){var y=t;if("function"==typeof s)y=s(r,y);else if(y instanceof Date)y=f(y);else if(null===y){if(i)return c&&!d?c(r):r;y=""}if("string"==typeof y||"number"==typeof y||"boolean"==typeof y||o.isBuffer(y)){if(c){return[p(d?r:c(r))+"="+p(c(y))]}return[p(r)+"="+p(String(y))]}var m=[];if(void 0===y)return m;var b;if(Array.isArray(s))b=s;else{var v=Object.keys(y);b=l?v.sort(l):v}for(var g=0;g<b.length;++g){var h=b[g];a&&null===y[h]||(m=Array.isArray(y)?m.concat(e(y[h],n(r,h),n,i,a,c,s,l,u,f,p,d)):m.concat(e(y[h],r+(u?"."+h:"["+h+"]"),n,i,a,c,s,l,u,f,p,d)))}return m};e.exports=function(e,t){var r=e,o=t||{};if(null!==o.encoder&&void 0!==o.encoder&&"function"!=typeof o.encoder)throw new TypeError("Encoder has to be a function.");var c=void 0===o.delimiter?s.delimiter:o.delimiter,u="boolean"==typeof o.strictNullHandling?o.strictNullHandling:s.strictNullHandling,f="boolean"==typeof o.skipNulls?o.skipNulls:s.skipNulls,p="boolean"==typeof o.encode?o.encode:s.encode,d="function"==typeof o.encoder?o.encoder:s.encoder,y="function"==typeof o.sort?o.sort:null,m=void 0!==o.allowDots&&o.allowDots,b="function"==typeof o.serializeDate?o.serializeDate:s.serializeDate,v="boolean"==typeof o.encodeValuesOnly?o.encodeValuesOnly:s.encodeValuesOnly;if(void 0===o.format)o.format=i.default;else if(!Object.prototype.hasOwnProperty.call(i.formatters,o.format))throw new TypeError("Unknown format option provided.");var g,h,O=i.formatters[o.format];"function"==typeof o.filter?(h=o.filter,r=h("",r)):Array.isArray(o.filter)&&(h=o.filter,g=h);var j=[];if("object"!==(void 0===r?"undefined":n(r))||null===r)return"";var w;w=o.arrayFormat in a?o.arrayFormat:"indices"in o?o.indices?"indices":"repeat":"indices";var _=a[w];g||(g=Object.keys(r)),y&&g.sort(y);for(var x=0;x<g.length;++x){var S=g[x];f&&null===r[S]||(j=j.concat(l(r[S],S,_,u,f,p?d:null,h,y,m,b,O,v)))}return j.join(c)}},55:function(e,t,r){"use strict";r.d(t,"f",function(){return l}),r.d(t,"g",function(){return u}),r.d(t,"i",function(){return f}),r.d(t,"h",function(){return p}),r.d(t,"a",function(){return d}),r.d(t,"j",function(){return y}),r.d(t,"k",function(){return m}),r.d(t,"e",function(){return b}),r.d(t,"d",function(){return v}),r.d(t,"c",function(){return g}),r.d(t,"b",function(){return h});var n=r(6),o=r.n(n),i=r(7),a=r(19),c=r(52),s=o.a.create({baseURL:"/admin",transformRequest:[function(e){return e&&e.append?e:c.stringify(e)}],transformResponse:[function(e){var t={};return e=JSON.parse(e),t.status=e.status,t.msg=e.msg,t.list=e.list,2==t.status?(localStorage.clear(),a.vm.$Notice.warning({title:"请重新登录",duration:3,onClose:function(){a.router.push({path:"/login"})}})):e.data&&e.data.token&&(i.a.$setStorage("realname",e.data.realname),i.a.$setStorage("token",e.data.token)),t}]});s.interceptors.request.use(function(e){var t=i.a.$getStorage("token");return t&&(e.headers.token=t),e});var l=function(){return s.get("query/all")},u=function(e){return s.post("insert",e)},f=function(e){return s.post("delete",e)},p=function(e){return s.post("modify",e)},d=function(e){return s.post("login",e)},y=function(e){return s.post("query/fuzzy",e)},m=function(){return s.get("exit")},b=function(e){return s.post("banner/insert",e)},v=function(e){return s.post("banner/modify",e)},g=function(e){return s.post("banner/delete",e)},h=function(){return s.get("banner/query")}},57:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(55),o={publicset:{item1:"公众号游戏",item2:"游戏设置"},bannerset:{item1:"公众号游戏",item2:"轮播图设置"},appletsset:{item1:"小程序游戏",item2:"游戏设置"}};t.default={data:function(){return{breadcrumb:{item1:"公众号游戏",item2:"设置"},isLoding:!1,realname:"",activeName:""}},methods:{selectHandler:function(e){this.breadcrumb=o[e]},logout:function(){var e=this;r.i(n.k)().then(function(t){var r=t.data,n=r.msg;0==r.status?e.$Notice.success({title:"成功！",desc:"退出成功！请重新登录",duration:3,onClose:function(){localStorage.clear(),e.$router.push({path:"/login"})}}):e.$Notice.error({title:"错误",desc:""+n})})}},beforeRouteEnter:function(e,t,r){r(function(t){t.activeName=e.path.substring(1),t.activeName=""==t.activeName?"publicset":t.activeName;var r=t.$Util.$getStorage("realname");r&&(t.isLoding=!0,t.realname=r)})}}},63:function(e,t){},69:function(e,t,r){e.exports=r.p+"d3e0e6774b104f268cba7d3c405c75b5.png"},72:function(e,t,r){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"layout"},[n("Layout",[n("Header",[n("Menu",{attrs:{mode:"horizontal",theme:"dark"}},[n("div",{staticClass:"layout-logo"},[n("img",{attrs:{src:r(69),alt:""}})]),e._v(" "),n("div",{staticClass:"layout-nav"},[n("h2",[e._v("小游戏后台管理系统")]),e._v(" "),e.isLoding?n("div",{staticClass:"user"},[n("Icon",{attrs:{type:"ios-person-outline",size:"22"}}),e._v("创始人\n                        "),n("span",{on:{click:e.logout}},[e._v("退出")])],1):e._e()])])],1),e._v(" "),n("Layout",[n("Sider",{style:{background:"#fff"},attrs:{"hide-trigger":""}},[n("Menu",{attrs:{"active-name":e.activeName,theme:"light",width:"auto",accordion:"","open-names":["public"]},on:{"on-select":e.selectHandler}},[n("Submenu",{attrs:{name:"public"}},[n("template",{slot:"title"},[n("Icon",{attrs:{type:"ios-game-controller-b",size:"18"}}),e._v("\n                            公众号游戏\n                        ")],1),e._v(" "),n("MenuItem",{attrs:{name:"publicset",to:{path:"/"}}},[n("span",{staticClass:"item"},[e._v("游戏设置")])]),e._v(" "),n("MenuItem",{attrs:{name:"bannerset",to:{path:"/bannerset"}}},[n("span",{staticClass:"item"},[e._v("轮播图设置")])])],2),e._v(" "),n("Submenu",{attrs:{name:"applets"}},[n("template",{slot:"title"},[n("Icon",{attrs:{type:"md-game-controller-b",size:"18"}}),e._v("\n                            小程序游戏\n                        ")],1),e._v(" "),n("MenuItem",{attrs:{name:"appletsset",to:{path:"/appletsset"}}},[n("span",{staticClass:"item"},[e._v("游戏设置")])])],2)],1)],1),e._v(" "),n("Layout",{style:{padding:"0 24px 24px"}},[n("Breadcrumb",{style:{margin:"24px 0"}},[n("BreadcrumbItem",[e._v(e._s(e.breadcrumb.item1))]),e._v(" "),n("BreadcrumbItem",[e._v(e._s(e.breadcrumb.item2))])],1),e._v(" "),n("router-view",{staticClass:"ivu-layout-content",style:{padding:"24px"}})],1)],1)],1)],1)},staticRenderFns:[]},e.exports.render._withStripped=!0}});