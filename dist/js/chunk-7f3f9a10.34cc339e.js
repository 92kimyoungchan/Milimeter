(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7f3f9a10"],{"150b":function(e,n,t){},"53da":function(e,n,t){"use strict";var o=t("150b"),i=t.n(o);i.a},e0de:function(e,n,t){"use strict";t.r(n);var o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("button",{directives:[{name:"google-signin-button",rawName:"v-google-signin-button",value:e.clientId,expression:"clientId"}],staticClass:"google-signin-button"},[e._v(" Continue with Google ")])},i=[],c=t("2b0e"),u=c["a"].directive("google-signin-button",{bind:function(e,n,t){l();let o=n.value,i=document.createElement("script");function c(){gapi.load("auth2",()=>{const n=gapi.auth2.init({client_id:o,cookiepolicy:"single_host_origin"});n.attachClickHandler(e,{},u,s)})}function u(e){t.context.OnGoogleAuthSuccess(e.getAuthResponse().id_token),e.disconnect()}function s(e){t.context.OnGoogleAuthFail(e)}function l(){if(!t.context.OnGoogleAuthSuccess)throw new Error("The method OnGoogleAuthSuccess must be defined on the component");if(!t.context.OnGoogleAuthFail)throw new Error("The method OnGoogleAuthFail must be defined on the component")}i.setAttribute("src","https://apis.google.com/js/api:client.js"),document.head.appendChild(i),i.onload=c}}),s={directives:{GoogleSignInButton:u},name:"TestPage",data:function(){return{clientId:"56019965047-0t3qrkpa4420if93b557lp6ub32ah2e4.apps.googleusercontent.com"}},created:function(){},methods:{OnGoogleAuthSuccess:function(e){console.log("Dsd"),console.log("dd",e)},OnGoogleAuthFail:function(e){console.log("error",e)}},computed:{},components:{}},l=s,a=(t("53da"),t("2877")),d=Object(a["a"])(l,o,i,!1,null,"10a584af",null);n["default"]=d.exports}}]);
//# sourceMappingURL=chunk-7f3f9a10.34cc339e.js.map