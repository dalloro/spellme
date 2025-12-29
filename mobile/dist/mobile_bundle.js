(()=>{var nu=()=>{};var su=function(r){let e=[],n=0;for(let i=0;i<r.length;i++){let s=r.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&i+1<r.length&&(r.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++i)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},sf=function(r){let e=[],n=0,i=0;for(;n<r.length;){let s=r[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){let a=r[n++];e[i++]=String.fromCharCode((s&31)<<6|a&63)}else if(s>239&&s<365){let a=r[n++],c=r[n++],l=r[n++],d=((s&7)<<18|(a&63)<<12|(c&63)<<6|l&63)-65536;e[i++]=String.fromCharCode(55296+(d>>10)),e[i++]=String.fromCharCode(56320+(d&1023))}else{let a=r[n++],c=r[n++];e[i++]=String.fromCharCode((s&15)<<12|(a&63)<<6|c&63)}}return e.join("")},ou={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();let n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<r.length;s+=3){let a=r[s],c=s+1<r.length,l=c?r[s+1]:0,d=s+2<r.length,f=d?r[s+2]:0,g=a>>2,w=(a&3)<<4|l>>4,v=(l&15)<<2|f>>6,C=f&63;d||(C=64,c||(v=64)),i.push(n[g],n[w],n[v],n[C])}return i.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(su(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):sf(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();let n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<r.length;){let a=n[r.charAt(s++)],l=s<r.length?n[r.charAt(s)]:0;++s;let f=s<r.length?n[r.charAt(s)]:64;++s;let w=s<r.length?n[r.charAt(s)]:64;if(++s,a==null||l==null||f==null||w==null)throw new ps;let v=a<<2|l>>4;if(i.push(v),f!==64){let C=l<<4&240|f>>2;if(i.push(C),w!==64){let V=f<<6&192|w;i.push(V)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}},ps=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},of=function(r){let e=su(r);return ou.encodeByteArray(e,!0)},qn=function(r){return of(r).replace(/\./g,"")},au=function(r){try{return ou.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function cu(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var af=()=>cu().__FIREBASE_DEFAULTS__,cf=()=>{if(typeof process>"u"||typeof process.env>"u")return;let r=process.env.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},uf=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=r&&au(r[1]);return e&&JSON.parse(e)},gs=()=>{try{return nu()||af()||cf()||uf()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},lf=r=>{var e,n;return(n=(e=gs())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[r]},uu=r=>{let e=lf(r);if(!e)return;let n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},ys=()=>{var r;return(r=gs())===null||r===void 0?void 0:r.config};var Lr=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}};function Fr(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function lu(r){return(await fetch(r,{credentials:"include"})).ok}function hu(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let n={alg:"none",type:"JWT"},i=e||"demo-project",s=r.iat||0,a=r.sub||r.user_id;if(!a)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let c=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:a,user_id:a,firebase:{sign_in_provider:"custom",identities:{}}},r);return[qn(JSON.stringify(n)),qn(JSON.stringify(c)),""].join(".")}var Un={};function hf(){let r={prod:[],emulator:[]};for(let e of Object.keys(Un))Un[e]?r.emulator.push(e):r.prod.push(e);return r}function df(r){let e=document.getElementById(r),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",r),n=!0),{created:n,element:e}}var ru=!1;function du(r,e){if(typeof window>"u"||typeof document>"u"||!Fr(window.location.host)||Un[r]===e||Un[r]||ru)return;Un[r]=e;function n(v){return`__firebase__banner__${v}`}let i="__firebase__banner",a=hf().prod.length>0;function c(){let v=document.getElementById(i);v&&v.remove()}function l(v){v.style.display="flex",v.style.background="#7faaf0",v.style.position="fixed",v.style.bottom="5px",v.style.left="5px",v.style.padding=".5em",v.style.borderRadius="5px",v.style.alignItems="center"}function d(v,C){v.setAttribute("width","24"),v.setAttribute("id",C),v.setAttribute("height","24"),v.setAttribute("viewBox","0 0 24 24"),v.setAttribute("fill","none"),v.style.marginLeft="-6px"}function f(){let v=document.createElement("span");return v.style.cursor="pointer",v.style.marginLeft="16px",v.style.fontSize="24px",v.innerHTML=" &times;",v.onclick=()=>{ru=!0,c()},v}function g(v,C){v.setAttribute("id",C),v.innerText="Learn more",v.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",v.setAttribute("target","__blank"),v.style.paddingLeft="5px",v.style.textDecoration="underline"}function w(){let v=df(i),C=n("text"),V=document.getElementById(C)||document.createElement("span"),N=n("learnmore"),D=document.getElementById(N)||document.createElement("a"),U=n("preprendIcon"),M=document.getElementById(U)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(v.created){let G=v.element;l(G),g(D,N);let et=f();d(M,U),G.append(M,V,D,et),document.body.appendChild(G)}a?(V.innerText="Preview backend disconnected.",M.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(M.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,V.innerText="Preview backend running in this workspace."),V.setAttribute("id",C)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",w):w()}function fu(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ff(){var r;let e=(r=gs())===null||r===void 0?void 0:r.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function mu(){return!ff()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function _s(){try{return typeof indexedDB=="object"}catch{return!1}}function pu(){return new Promise((r,e)=>{try{let n=!0,i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),r(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var a;e(((a=s.error)===null||a===void 0?void 0:a.message)||"")}}catch(n){e(n)}})}var mf="FirebaseError",Qt=class r extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=mf,Object.setPrototypeOf(this,r.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,jn.prototype.create)}},jn=class{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){let i=n[0]||{},s=`${this.service}/${e}`,a=this.errors[e],c=a?pf(a,i):"Error",l=`${this.serviceName}: ${c} (${s}).`;return new Qt(s,l,i)}};function pf(r,e){return r.replace(gf,(n,i)=>{let s=e[i];return s!=null?String(s):`<${i}?>`})}var gf=/\{\$([^}]+)}/g;function je(r,e){if(r===e)return!0;let n=Object.keys(r),i=Object.keys(e);for(let s of n){if(!i.includes(s))return!1;let a=r[s],c=e[s];if(iu(a)&&iu(c)){if(!je(a,c))return!1}else if(a!==c)return!1}for(let s of i)if(!n.includes(s))return!1;return!0}function iu(r){return r!==null&&typeof r=="object"}var zg=4*60*60*1e3;function Jt(r){return r&&r._delegate?r._delegate:r}var Xt=class{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var Se="[DEFAULT]";var ws=class{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){let i=new Lr;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{let s=this.getOrInitializeService({instanceIdentifier:n});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;let i=this.normalizeInstanceIdentifier(e?.identifier),s=(n=e?.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(a){if(s)return null;throw a}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(_f(e))try{this.getOrInitializeService({instanceIdentifier:Se})}catch{}for(let[n,i]of this.instancesDeferred.entries()){let s=this.normalizeInstanceIdentifier(n);try{let a=this.getOrInitializeService({instanceIdentifier:s});i.resolve(a)}catch{}}}}clearInstance(e=Se){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Se){return this.instances.has(e)}getOptions(e=Se){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let s=this.getOrInitializeService({instanceIdentifier:i,options:n});for(let[a,c]of this.instancesDeferred.entries()){let l=this.normalizeInstanceIdentifier(a);i===l&&c.resolve(s)}return s}onInit(e,n){var i;let s=this.normalizeInstanceIdentifier(n),a=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;a.add(e),this.onInitCallbacks.set(s,a);let c=this.instances.get(s);return c&&e(c,s),()=>{a.delete(e)}}invokeOnInitCallbacks(e,n){let i=this.onInitCallbacks.get(n);if(i)for(let s of i)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:yf(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Se){return this.component?this.component.multipleInstances?e:Se:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function yf(r){return r===Se?void 0:r}function _f(r){return r.instantiationMode==="EAGER"}var Mr=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let n=new ws(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}};var wf=[],W;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(W||(W={}));var vf={debug:W.DEBUG,verbose:W.VERBOSE,info:W.INFO,warn:W.WARN,error:W.ERROR,silent:W.SILENT},If=W.INFO,Ef={[W.DEBUG]:"log",[W.VERBOSE]:"log",[W.INFO]:"info",[W.WARN]:"warn",[W.ERROR]:"error"},Tf=(r,e,...n)=>{if(e<r.logLevel)return;let i=new Date().toISOString(),s=Ef[e];if(s)console[s](`[${i}]  ${r.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},$e=class{constructor(e){this.name=e,this._logLevel=If,this._logHandler=Tf,this._userLogHandler=null,wf.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in W))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?vf[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,W.DEBUG,...e),this._logHandler(this,W.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,W.VERBOSE,...e),this._logHandler(this,W.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,W.INFO,...e),this._logHandler(this,W.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,W.WARN,...e),this._logHandler(this,W.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,W.ERROR,...e),this._logHandler(this,W.ERROR,...e)}};var bf=(r,e)=>e.some(n=>r instanceof n),gu,yu;function Af(){return gu||(gu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Sf(){return yu||(yu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var _u=new WeakMap,Is=new WeakMap,wu=new WeakMap,vs=new WeakMap,Ts=new WeakMap;function Rf(r){let e=new Promise((n,i)=>{let s=()=>{r.removeEventListener("success",a),r.removeEventListener("error",c)},a=()=>{n(Nt(r.result)),s()},c=()=>{i(r.error),s()};r.addEventListener("success",a),r.addEventListener("error",c)});return e.then(n=>{n instanceof IDBCursor&&_u.set(n,r)}).catch(()=>{}),Ts.set(e,r),e}function Cf(r){if(Is.has(r))return;let e=new Promise((n,i)=>{let s=()=>{r.removeEventListener("complete",a),r.removeEventListener("error",c),r.removeEventListener("abort",c)},a=()=>{n(),s()},c=()=>{i(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",a),r.addEventListener("error",c),r.addEventListener("abort",c)});Is.set(r,e)}var Es={get(r,e,n){if(r instanceof IDBTransaction){if(e==="done")return Is.get(r);if(e==="objectStoreNames")return r.objectStoreNames||wu.get(r);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Nt(r[e])},set(r,e,n){return r[e]=n,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function vu(r){Es=r(Es)}function Pf(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){let i=r.call(Br(this),e,...n);return wu.set(i,e.sort?e.sort():[e]),Nt(i)}:Sf().includes(r)?function(...e){return r.apply(Br(this),e),Nt(_u.get(this))}:function(...e){return Nt(r.apply(Br(this),e))}}function Df(r){return typeof r=="function"?Pf(r):(r instanceof IDBTransaction&&Cf(r),bf(r,Af())?new Proxy(r,Es):r)}function Nt(r){if(r instanceof IDBRequest)return Rf(r);if(vs.has(r))return vs.get(r);let e=Df(r);return e!==r&&(vs.set(r,e),Ts.set(e,r)),e}var Br=r=>Ts.get(r);function Eu(r,e,{blocked:n,upgrade:i,blocking:s,terminated:a}={}){let c=indexedDB.open(r,e),l=Nt(c);return i&&c.addEventListener("upgradeneeded",d=>{i(Nt(c.result),d.oldVersion,d.newVersion,Nt(c.transaction),d)}),n&&c.addEventListener("blocked",d=>n(d.oldVersion,d.newVersion,d)),l.then(d=>{a&&d.addEventListener("close",()=>a()),s&&d.addEventListener("versionchange",f=>s(f.oldVersion,f.newVersion,f))}).catch(()=>{}),l}var xf=["get","getKey","getAll","getAllKeys","count"],Vf=["put","add","delete","clear"],bs=new Map;function Iu(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(bs.get(e))return bs.get(e);let n=e.replace(/FromIndex$/,""),i=e!==n,s=Vf.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(s||xf.includes(n)))return;let a=async function(c,...l){let d=this.transaction(c,s?"readwrite":"readonly"),f=d.store;return i&&(f=f.index(l.shift())),(await Promise.all([f[n](...l),s&&d.done]))[0]};return bs.set(e,a),a}vu(r=>({...r,get:(e,n,i)=>Iu(e,n)||r.get(e,n,i),has:(e,n)=>!!Iu(e,n)||r.has(e,n)}));var Ss=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(kf(n)){let i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}};function kf(r){let e=r.getComponent();return e?.type==="VERSION"}var Rs="@firebase/app",Tu="0.13.2";var Yt=new $e("@firebase/app"),Nf="@firebase/app-compat",Of="@firebase/analytics-compat",Lf="@firebase/analytics",Ff="@firebase/app-check-compat",Mf="@firebase/app-check",Bf="@firebase/auth",zf="@firebase/auth-compat",Uf="@firebase/database",qf="@firebase/data-connect",jf="@firebase/database-compat",$f="@firebase/functions",Gf="@firebase/functions-compat",Kf="@firebase/installations",Wf="@firebase/installations-compat",Hf="@firebase/messaging",Qf="@firebase/messaging-compat",Jf="@firebase/performance",Xf="@firebase/performance-compat",Yf="@firebase/remote-config",Zf="@firebase/remote-config-compat",tm="@firebase/storage",em="@firebase/storage-compat",nm="@firebase/firestore",rm="@firebase/ai",im="@firebase/firestore-compat",sm="firebase",om="11.10.0";var Cs="[DEFAULT]",am={[Rs]:"fire-core",[Nf]:"fire-core-compat",[Lf]:"fire-analytics",[Of]:"fire-analytics-compat",[Mf]:"fire-app-check",[Ff]:"fire-app-check-compat",[Bf]:"fire-auth",[zf]:"fire-auth-compat",[Uf]:"fire-rtdb",[qf]:"fire-data-connect",[jf]:"fire-rtdb-compat",[$f]:"fire-fn",[Gf]:"fire-fn-compat",[Kf]:"fire-iid",[Wf]:"fire-iid-compat",[Hf]:"fire-fcm",[Qf]:"fire-fcm-compat",[Jf]:"fire-perf",[Xf]:"fire-perf-compat",[Yf]:"fire-rc",[Zf]:"fire-rc-compat",[tm]:"fire-gcs",[em]:"fire-gcs-compat",[nm]:"fire-fst",[im]:"fire-fst-compat",[rm]:"fire-vertex","fire-js":"fire-js",[sm]:"fire-js-all"};var zr=new Map,cm=new Map,Ps=new Map;function bu(r,e){try{r.container.addComponent(e)}catch(n){Yt.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,n)}}function $n(r){let e=r.name;if(Ps.has(e))return Yt.debug(`There were multiple attempts to register component ${e}.`),!1;Ps.set(e,r);for(let n of zr.values())bu(n,r);for(let n of cm.values())bu(n,r);return!0}function Cu(r,e){let n=r.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),r.container.getProvider(e)}function Pu(r){return r==null?!1:r.settings!==void 0}var um={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},le=new jn("app","Firebase",um);var Ds=class{constructor(e,n,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Xt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw le.create("app-deleted",{appName:this._name})}};var Du=om;function ks(r,e={}){let n=r;typeof e!="object"&&(e={name:e});let i=Object.assign({name:Cs,automaticDataCollectionEnabled:!0},e),s=i.name;if(typeof s!="string"||!s)throw le.create("bad-app-name",{appName:String(s)});if(n||(n=ys()),!n)throw le.create("no-options");let a=zr.get(s);if(a){if(je(n,a.options)&&je(i,a.config))return a;throw le.create("duplicate-app",{appName:s})}let c=new Mr(s);for(let d of Ps.values())c.addComponent(d);let l=new Ds(n,i,c);return zr.set(s,l),l}function xu(r=Cs){let e=zr.get(r);if(!e&&r===Cs&&ys())return ks();if(!e)throw le.create("no-app",{appName:r});return e}function he(r,e,n){var i;let s=(i=am[r])!==null&&i!==void 0?i:r;n&&(s+=`-${n}`);let a=s.match(/\s|\//),c=e.match(/\s|\//);if(a||c){let l=[`Unable to register library "${s}" with version "${e}":`];a&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),a&&c&&l.push("and"),c&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Yt.warn(l.join(" "));return}$n(new Xt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}var lm="firebase-heartbeat-database",hm=1,Gn="firebase-heartbeat-store",As=null;function Vu(){return As||(As=Eu(lm,hm,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(Gn)}catch(n){console.warn(n)}}}}).catch(r=>{throw le.create("idb-open",{originalErrorMessage:r.message})})),As}async function dm(r){try{let n=(await Vu()).transaction(Gn),i=await n.objectStore(Gn).get(ku(r));return await n.done,i}catch(e){if(e instanceof Qt)Yt.warn(e.message);else{let n=le.create("idb-get",{originalErrorMessage:e?.message});Yt.warn(n.message)}}}async function Au(r,e){try{let i=(await Vu()).transaction(Gn,"readwrite");await i.objectStore(Gn).put(e,ku(r)),await i.done}catch(n){if(n instanceof Qt)Yt.warn(n.message);else{let i=le.create("idb-set",{originalErrorMessage:n?.message});Yt.warn(i.message)}}}function ku(r){return`${r.name}!${r.options.appId}`}var fm=1024,mm=30,xs=class{constructor(e){this.container=e,this._heartbeatsCache=null;let n=this.container.getProvider("app").getImmediate();this._storage=new Vs(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,n;try{let s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),a=Su();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===a||this._heartbeatsCache.heartbeats.some(c=>c.date===a))return;if(this._heartbeatsCache.heartbeats.push({date:a,agent:s}),this._heartbeatsCache.heartbeats.length>mm){let c=gm(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(c,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(i){Yt.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let n=Su(),{heartbeatsToSend:i,unsentEntries:s}=pm(this._heartbeatsCache.heartbeats),a=qn(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}catch(n){return Yt.warn(n),""}}};function Su(){return new Date().toISOString().substring(0,10)}function pm(r,e=fm){let n=[],i=r.slice();for(let s of r){let a=n.find(c=>c.agent===s.agent);if(a){if(a.dates.push(s.date),Ru(n)>e){a.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Ru(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}var Vs=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return _s()?pu().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let n=await dm(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){let s=await this.read();return Au(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){let s=await this.read();return Au(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}};function Ru(r){return qn(JSON.stringify({version:2,heartbeats:r})).length}function gm(r){if(r.length===0)return-1;let e=0,n=r[0].date;for(let i=1;i<r.length;i++)r[i].date<n&&(n=r[i].date,e=i);return e}function ym(r){$n(new Xt("platform-logger",e=>new Ss(e),"PRIVATE")),$n(new Xt("heartbeat",e=>new xs(e),"PRIVATE")),he(Rs,Tu,r),he(Rs,Tu,"esm2017"),he("fire-js","")}ym("");var _m="firebase",wm="11.10.0";he(_m,wm,"app");var Nu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Ou={};var Zt,Ns;(function(){var r;function e(b,p){function _(){}_.prototype=p.prototype,b.D=p.prototype,b.prototype=new _,b.prototype.constructor=b,b.C=function(I,T,S){for(var y=Array(arguments.length-2),Kt=2;Kt<arguments.length;Kt++)y[Kt-2]=arguments[Kt];return p.prototype[T].apply(I,y)}}function n(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(i,n),i.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(b,p,_){_||(_=0);var I=Array(16);if(typeof p=="string")for(var T=0;16>T;++T)I[T]=p.charCodeAt(_++)|p.charCodeAt(_++)<<8|p.charCodeAt(_++)<<16|p.charCodeAt(_++)<<24;else for(T=0;16>T;++T)I[T]=p[_++]|p[_++]<<8|p[_++]<<16|p[_++]<<24;p=b.g[0],_=b.g[1],T=b.g[2];var S=b.g[3],y=p+(S^_&(T^S))+I[0]+3614090360&4294967295;p=_+(y<<7&4294967295|y>>>25),y=S+(T^p&(_^T))+I[1]+3905402710&4294967295,S=p+(y<<12&4294967295|y>>>20),y=T+(_^S&(p^_))+I[2]+606105819&4294967295,T=S+(y<<17&4294967295|y>>>15),y=_+(p^T&(S^p))+I[3]+3250441966&4294967295,_=T+(y<<22&4294967295|y>>>10),y=p+(S^_&(T^S))+I[4]+4118548399&4294967295,p=_+(y<<7&4294967295|y>>>25),y=S+(T^p&(_^T))+I[5]+1200080426&4294967295,S=p+(y<<12&4294967295|y>>>20),y=T+(_^S&(p^_))+I[6]+2821735955&4294967295,T=S+(y<<17&4294967295|y>>>15),y=_+(p^T&(S^p))+I[7]+4249261313&4294967295,_=T+(y<<22&4294967295|y>>>10),y=p+(S^_&(T^S))+I[8]+1770035416&4294967295,p=_+(y<<7&4294967295|y>>>25),y=S+(T^p&(_^T))+I[9]+2336552879&4294967295,S=p+(y<<12&4294967295|y>>>20),y=T+(_^S&(p^_))+I[10]+4294925233&4294967295,T=S+(y<<17&4294967295|y>>>15),y=_+(p^T&(S^p))+I[11]+2304563134&4294967295,_=T+(y<<22&4294967295|y>>>10),y=p+(S^_&(T^S))+I[12]+1804603682&4294967295,p=_+(y<<7&4294967295|y>>>25),y=S+(T^p&(_^T))+I[13]+4254626195&4294967295,S=p+(y<<12&4294967295|y>>>20),y=T+(_^S&(p^_))+I[14]+2792965006&4294967295,T=S+(y<<17&4294967295|y>>>15),y=_+(p^T&(S^p))+I[15]+1236535329&4294967295,_=T+(y<<22&4294967295|y>>>10),y=p+(T^S&(_^T))+I[1]+4129170786&4294967295,p=_+(y<<5&4294967295|y>>>27),y=S+(_^T&(p^_))+I[6]+3225465664&4294967295,S=p+(y<<9&4294967295|y>>>23),y=T+(p^_&(S^p))+I[11]+643717713&4294967295,T=S+(y<<14&4294967295|y>>>18),y=_+(S^p&(T^S))+I[0]+3921069994&4294967295,_=T+(y<<20&4294967295|y>>>12),y=p+(T^S&(_^T))+I[5]+3593408605&4294967295,p=_+(y<<5&4294967295|y>>>27),y=S+(_^T&(p^_))+I[10]+38016083&4294967295,S=p+(y<<9&4294967295|y>>>23),y=T+(p^_&(S^p))+I[15]+3634488961&4294967295,T=S+(y<<14&4294967295|y>>>18),y=_+(S^p&(T^S))+I[4]+3889429448&4294967295,_=T+(y<<20&4294967295|y>>>12),y=p+(T^S&(_^T))+I[9]+568446438&4294967295,p=_+(y<<5&4294967295|y>>>27),y=S+(_^T&(p^_))+I[14]+3275163606&4294967295,S=p+(y<<9&4294967295|y>>>23),y=T+(p^_&(S^p))+I[3]+4107603335&4294967295,T=S+(y<<14&4294967295|y>>>18),y=_+(S^p&(T^S))+I[8]+1163531501&4294967295,_=T+(y<<20&4294967295|y>>>12),y=p+(T^S&(_^T))+I[13]+2850285829&4294967295,p=_+(y<<5&4294967295|y>>>27),y=S+(_^T&(p^_))+I[2]+4243563512&4294967295,S=p+(y<<9&4294967295|y>>>23),y=T+(p^_&(S^p))+I[7]+1735328473&4294967295,T=S+(y<<14&4294967295|y>>>18),y=_+(S^p&(T^S))+I[12]+2368359562&4294967295,_=T+(y<<20&4294967295|y>>>12),y=p+(_^T^S)+I[5]+4294588738&4294967295,p=_+(y<<4&4294967295|y>>>28),y=S+(p^_^T)+I[8]+2272392833&4294967295,S=p+(y<<11&4294967295|y>>>21),y=T+(S^p^_)+I[11]+1839030562&4294967295,T=S+(y<<16&4294967295|y>>>16),y=_+(T^S^p)+I[14]+4259657740&4294967295,_=T+(y<<23&4294967295|y>>>9),y=p+(_^T^S)+I[1]+2763975236&4294967295,p=_+(y<<4&4294967295|y>>>28),y=S+(p^_^T)+I[4]+1272893353&4294967295,S=p+(y<<11&4294967295|y>>>21),y=T+(S^p^_)+I[7]+4139469664&4294967295,T=S+(y<<16&4294967295|y>>>16),y=_+(T^S^p)+I[10]+3200236656&4294967295,_=T+(y<<23&4294967295|y>>>9),y=p+(_^T^S)+I[13]+681279174&4294967295,p=_+(y<<4&4294967295|y>>>28),y=S+(p^_^T)+I[0]+3936430074&4294967295,S=p+(y<<11&4294967295|y>>>21),y=T+(S^p^_)+I[3]+3572445317&4294967295,T=S+(y<<16&4294967295|y>>>16),y=_+(T^S^p)+I[6]+76029189&4294967295,_=T+(y<<23&4294967295|y>>>9),y=p+(_^T^S)+I[9]+3654602809&4294967295,p=_+(y<<4&4294967295|y>>>28),y=S+(p^_^T)+I[12]+3873151461&4294967295,S=p+(y<<11&4294967295|y>>>21),y=T+(S^p^_)+I[15]+530742520&4294967295,T=S+(y<<16&4294967295|y>>>16),y=_+(T^S^p)+I[2]+3299628645&4294967295,_=T+(y<<23&4294967295|y>>>9),y=p+(T^(_|~S))+I[0]+4096336452&4294967295,p=_+(y<<6&4294967295|y>>>26),y=S+(_^(p|~T))+I[7]+1126891415&4294967295,S=p+(y<<10&4294967295|y>>>22),y=T+(p^(S|~_))+I[14]+2878612391&4294967295,T=S+(y<<15&4294967295|y>>>17),y=_+(S^(T|~p))+I[5]+4237533241&4294967295,_=T+(y<<21&4294967295|y>>>11),y=p+(T^(_|~S))+I[12]+1700485571&4294967295,p=_+(y<<6&4294967295|y>>>26),y=S+(_^(p|~T))+I[3]+2399980690&4294967295,S=p+(y<<10&4294967295|y>>>22),y=T+(p^(S|~_))+I[10]+4293915773&4294967295,T=S+(y<<15&4294967295|y>>>17),y=_+(S^(T|~p))+I[1]+2240044497&4294967295,_=T+(y<<21&4294967295|y>>>11),y=p+(T^(_|~S))+I[8]+1873313359&4294967295,p=_+(y<<6&4294967295|y>>>26),y=S+(_^(p|~T))+I[15]+4264355552&4294967295,S=p+(y<<10&4294967295|y>>>22),y=T+(p^(S|~_))+I[6]+2734768916&4294967295,T=S+(y<<15&4294967295|y>>>17),y=_+(S^(T|~p))+I[13]+1309151649&4294967295,_=T+(y<<21&4294967295|y>>>11),y=p+(T^(_|~S))+I[4]+4149444226&4294967295,p=_+(y<<6&4294967295|y>>>26),y=S+(_^(p|~T))+I[11]+3174756917&4294967295,S=p+(y<<10&4294967295|y>>>22),y=T+(p^(S|~_))+I[2]+718787259&4294967295,T=S+(y<<15&4294967295|y>>>17),y=_+(S^(T|~p))+I[9]+3951481745&4294967295,b.g[0]=b.g[0]+p&4294967295,b.g[1]=b.g[1]+(T+(y<<21&4294967295|y>>>11))&4294967295,b.g[2]=b.g[2]+T&4294967295,b.g[3]=b.g[3]+S&4294967295}i.prototype.u=function(b,p){p===void 0&&(p=b.length);for(var _=p-this.blockSize,I=this.B,T=this.h,S=0;S<p;){if(T==0)for(;S<=_;)s(this,b,S),S+=this.blockSize;if(typeof b=="string"){for(;S<p;)if(I[T++]=b.charCodeAt(S++),T==this.blockSize){s(this,I),T=0;break}}else for(;S<p;)if(I[T++]=b[S++],T==this.blockSize){s(this,I),T=0;break}}this.h=T,this.o+=p},i.prototype.v=function(){var b=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);b[0]=128;for(var p=1;p<b.length-8;++p)b[p]=0;var _=8*this.o;for(p=b.length-8;p<b.length;++p)b[p]=_&255,_/=256;for(this.u(b),b=Array(16),p=_=0;4>p;++p)for(var I=0;32>I;I+=8)b[_++]=this.g[p]>>>I&255;return b};function a(b,p){var _=l;return Object.prototype.hasOwnProperty.call(_,b)?_[b]:_[b]=p(b)}function c(b,p){this.h=p;for(var _=[],I=!0,T=b.length-1;0<=T;T--){var S=b[T]|0;I&&S==p||(_[T]=S,I=!1)}this.g=_}var l={};function d(b){return-128<=b&&128>b?a(b,function(p){return new c([p|0],0>p?-1:0)}):new c([b|0],0>b?-1:0)}function f(b){if(isNaN(b)||!isFinite(b))return w;if(0>b)return D(f(-b));for(var p=[],_=1,I=0;b>=_;I++)p[I]=b/_|0,_*=4294967296;return new c(p,0)}function g(b,p){if(b.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(b.charAt(0)=="-")return D(g(b.substring(1),p));if(0<=b.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=f(Math.pow(p,8)),I=w,T=0;T<b.length;T+=8){var S=Math.min(8,b.length-T),y=parseInt(b.substring(T,T+S),p);8>S?(S=f(Math.pow(p,S)),I=I.j(S).add(f(y))):(I=I.j(_),I=I.add(f(y)))}return I}var w=d(0),v=d(1),C=d(16777216);r=c.prototype,r.m=function(){if(N(this))return-D(this).m();for(var b=0,p=1,_=0;_<this.g.length;_++){var I=this.i(_);b+=(0<=I?I:4294967296+I)*p,p*=4294967296}return b},r.toString=function(b){if(b=b||10,2>b||36<b)throw Error("radix out of range: "+b);if(V(this))return"0";if(N(this))return"-"+D(this).toString(b);for(var p=f(Math.pow(b,6)),_=this,I="";;){var T=et(_,p).g;_=U(_,T.j(p));var S=((0<_.g.length?_.g[0]:_.h)>>>0).toString(b);if(_=T,V(_))return S+I;for(;6>S.length;)S="0"+S;I=S+I}},r.i=function(b){return 0>b?0:b<this.g.length?this.g[b]:this.h};function V(b){if(b.h!=0)return!1;for(var p=0;p<b.g.length;p++)if(b.g[p]!=0)return!1;return!0}function N(b){return b.h==-1}r.l=function(b){return b=U(this,b),N(b)?-1:V(b)?0:1};function D(b){for(var p=b.g.length,_=[],I=0;I<p;I++)_[I]=~b.g[I];return new c(_,~b.h).add(v)}r.abs=function(){return N(this)?D(this):this},r.add=function(b){for(var p=Math.max(this.g.length,b.g.length),_=[],I=0,T=0;T<=p;T++){var S=I+(this.i(T)&65535)+(b.i(T)&65535),y=(S>>>16)+(this.i(T)>>>16)+(b.i(T)>>>16);I=y>>>16,S&=65535,y&=65535,_[T]=y<<16|S}return new c(_,_[_.length-1]&-2147483648?-1:0)};function U(b,p){return b.add(D(p))}r.j=function(b){if(V(this)||V(b))return w;if(N(this))return N(b)?D(this).j(D(b)):D(D(this).j(b));if(N(b))return D(this.j(D(b)));if(0>this.l(C)&&0>b.l(C))return f(this.m()*b.m());for(var p=this.g.length+b.g.length,_=[],I=0;I<2*p;I++)_[I]=0;for(I=0;I<this.g.length;I++)for(var T=0;T<b.g.length;T++){var S=this.i(I)>>>16,y=this.i(I)&65535,Kt=b.i(T)>>>16,En=b.i(T)&65535;_[2*I+2*T]+=y*En,M(_,2*I+2*T),_[2*I+2*T+1]+=S*En,M(_,2*I+2*T+1),_[2*I+2*T+1]+=y*Kt,M(_,2*I+2*T+1),_[2*I+2*T+2]+=S*Kt,M(_,2*I+2*T+2)}for(I=0;I<p;I++)_[I]=_[2*I+1]<<16|_[2*I];for(I=p;I<2*p;I++)_[I]=0;return new c(_,0)};function M(b,p){for(;(b[p]&65535)!=b[p];)b[p+1]+=b[p]>>>16,b[p]&=65535,p++}function G(b,p){this.g=b,this.h=p}function et(b,p){if(V(p))throw Error("division by zero");if(V(b))return new G(w,w);if(N(b))return p=et(D(b),p),new G(D(p.g),D(p.h));if(N(p))return p=et(b,D(p)),new G(D(p.g),p.h);if(30<b.g.length){if(N(b)||N(p))throw Error("slowDivide_ only works with positive integers.");for(var _=v,I=p;0>=I.l(b);)_=St(_),I=St(I);var T=Z(_,1),S=Z(I,1);for(I=Z(I,2),_=Z(_,2);!V(I);){var y=S.add(I);0>=y.l(b)&&(T=T.add(_),S=y),I=Z(I,1),_=Z(_,1)}return p=U(b,T.j(p)),new G(T,p)}for(T=w;0<=b.l(p);){for(_=Math.max(1,Math.floor(b.m()/p.m())),I=Math.ceil(Math.log(_)/Math.LN2),I=48>=I?1:Math.pow(2,I-48),S=f(_),y=S.j(p);N(y)||0<y.l(b);)_-=I,S=f(_),y=S.j(p);V(S)&&(S=v),T=T.add(S),b=U(b,y)}return new G(T,b)}r.A=function(b){return et(this,b).h},r.and=function(b){for(var p=Math.max(this.g.length,b.g.length),_=[],I=0;I<p;I++)_[I]=this.i(I)&b.i(I);return new c(_,this.h&b.h)},r.or=function(b){for(var p=Math.max(this.g.length,b.g.length),_=[],I=0;I<p;I++)_[I]=this.i(I)|b.i(I);return new c(_,this.h|b.h)},r.xor=function(b){for(var p=Math.max(this.g.length,b.g.length),_=[],I=0;I<p;I++)_[I]=this.i(I)^b.i(I);return new c(_,this.h^b.h)};function St(b){for(var p=b.g.length+1,_=[],I=0;I<p;I++)_[I]=b.i(I)<<1|b.i(I-1)>>>31;return new c(_,b.h)}function Z(b,p){var _=p>>5;p%=32;for(var I=b.g.length-_,T=[],S=0;S<I;S++)T[S]=0<p?b.i(S+_)>>>p|b.i(S+_+1)<<32-p:b.i(S+_);return new c(T,b.h)}i.prototype.digest=i.prototype.v,i.prototype.reset=i.prototype.s,i.prototype.update=i.prototype.u,Ns=Ou.Md5=i,c.prototype.add=c.prototype.add,c.prototype.multiply=c.prototype.j,c.prototype.modulo=c.prototype.A,c.prototype.compare=c.prototype.l,c.prototype.toNumber=c.prototype.m,c.prototype.toString=c.prototype.toString,c.prototype.getBits=c.prototype.i,c.fromNumber=f,c.fromString=g,Zt=Ou.Integer=c}).apply(typeof Nu<"u"?Nu:typeof self<"u"?self:typeof window<"u"?window:{});var Ur=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},te={};var Os,vm,Ge,Ls,Kn,qr,Fs,Ms,Bs;(function(){var r,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,u,h){return o==Array.prototype||o==Object.prototype||(o[u]=h.value),o};function n(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ur=="object"&&Ur];for(var u=0;u<o.length;++u){var h=o[u];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var i=n(this);function s(o,u){if(u)t:{var h=i;o=o.split(".");for(var m=0;m<o.length-1;m++){var A=o[m];if(!(A in h))break t;h=h[A]}o=o[o.length-1],m=h[o],u=u(m),u!=m&&u!=null&&e(h,o,{configurable:!0,writable:!0,value:u})}}function a(o,u){o instanceof String&&(o+="");var h=0,m=!1,A={next:function(){if(!m&&h<o.length){var R=h++;return{value:u(R,o[R]),done:!1}}return m=!0,{done:!0,value:void 0}}};return A[Symbol.iterator]=function(){return A},A}s("Array.prototype.values",function(o){return o||function(){return a(this,function(u,h){return h})}});var c=c||{},l=this||self;function d(o){var u=typeof o;return u=u!="object"?u:o?Array.isArray(o)?"array":u:"null",u=="array"||u=="object"&&typeof o.length=="number"}function f(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function g(o,u,h){return o.call.apply(o.bind,arguments)}function w(o,u,h){if(!o)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var A=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(A,m),o.apply(u,A)}}return function(){return o.apply(u,arguments)}}function v(o,u,h){return v=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?g:w,v.apply(null,arguments)}function C(o,u){var h=Array.prototype.slice.call(arguments,1);return function(){var m=h.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function V(o,u){function h(){}h.prototype=u.prototype,o.aa=u.prototype,o.prototype=new h,o.prototype.constructor=o,o.Qb=function(m,A,R){for(var k=Array(arguments.length-2),Y=2;Y<arguments.length;Y++)k[Y-2]=arguments[Y];return u.prototype[A].apply(m,k)}}function N(o){let u=o.length;if(0<u){let h=Array(u);for(let m=0;m<u;m++)h[m]=o[m];return h}return[]}function D(o,u){for(let h=1;h<arguments.length;h++){let m=arguments[h];if(d(m)){let A=o.length||0,R=m.length||0;o.length=A+R;for(let k=0;k<R;k++)o[A+k]=m[k]}else o.push(m)}}class U{constructor(u,h){this.i=u,this.j=h,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function M(o){return/^[\s\xa0]*$/.test(o)}function G(){var o=l.navigator;return o&&(o=o.userAgent)?o:""}function et(o){return et[" "](o),o}et[" "]=function(){};var St=G().indexOf("Gecko")!=-1&&!(G().toLowerCase().indexOf("webkit")!=-1&&G().indexOf("Edge")==-1)&&!(G().indexOf("Trident")!=-1||G().indexOf("MSIE")!=-1)&&G().indexOf("Edge")==-1;function Z(o,u,h){for(let m in o)u.call(h,o[m],m,o)}function b(o,u){for(let h in o)u.call(void 0,o[h],h,o)}function p(o){let u={};for(let h in o)u[h]=o[h];return u}let _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function I(o,u){let h,m;for(let A=1;A<arguments.length;A++){m=arguments[A];for(h in m)o[h]=m[h];for(let R=0;R<_.length;R++)h=_[R],Object.prototype.hasOwnProperty.call(m,h)&&(o[h]=m[h])}}function T(o){var u=1;o=o.split(":");let h=[];for(;0<u&&o.length;)h.push(o.shift()),u--;return o.length&&h.push(o.join(":")),h}function S(o){l.setTimeout(()=>{throw o},0)}function y(){var o=$i;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class Kt{constructor(){this.h=this.g=null}add(u,h){let m=En.get();m.set(u,h),this.h?this.h.next=m:this.g=m,this.h=m}}var En=new U(()=>new bd,o=>o.reset());class bd{constructor(){this.next=this.g=this.h=null}set(u,h){this.h=u,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let Tn,bn=!1,$i=new Kt,ec=()=>{let o=l.Promise.resolve(void 0);Tn=()=>{o.then(Ad)}};var Ad=()=>{for(var o;o=y();){try{o.h.call(o.g)}catch(h){S(h)}var u=En;u.j(o),100>u.h&&(u.h++,o.next=u.g,u.g=o)}bn=!1};function oe(){this.s=this.s,this.C=this.C}oe.prototype.s=!1,oe.prototype.ma=function(){this.s||(this.s=!0,this.N())},oe.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function mt(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}mt.prototype.h=function(){this.defaultPrevented=!0};var Sd=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{let h=()=>{};l.addEventListener("test",h,u),l.removeEventListener("test",h,u)}catch{}return o}();function An(o,u){if(mt.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var h=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget){if(St){t:{try{et(u.nodeName);var A=!0;break t}catch{}A=!1}A||(u=null)}}else h=="mouseover"?u=o.fromElement:h=="mouseout"&&(u=o.toElement);this.relatedTarget=u,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:Rd[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&An.aa.h.call(this)}}V(An,mt);var Rd={2:"touch",3:"pen",4:"mouse"};An.prototype.h=function(){An.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Sn="closure_listenable_"+(1e6*Math.random()|0),Cd=0;function Pd(o,u,h,m,A){this.listener=o,this.proxy=null,this.src=u,this.type=h,this.capture=!!m,this.ha=A,this.key=++Cd,this.da=this.fa=!1}function wr(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function vr(o){this.src=o,this.g={},this.h=0}vr.prototype.add=function(o,u,h,m,A){var R=o.toString();o=this.g[R],o||(o=this.g[R]=[],this.h++);var k=Ki(o,u,m,A);return-1<k?(u=o[k],h||(u.fa=!1)):(u=new Pd(u,this.src,R,!!m,A),u.fa=h,o.push(u)),u};function Gi(o,u){var h=u.type;if(h in o.g){var m=o.g[h],A=Array.prototype.indexOf.call(m,u,void 0),R;(R=0<=A)&&Array.prototype.splice.call(m,A,1),R&&(wr(u),o.g[h].length==0&&(delete o.g[h],o.h--))}}function Ki(o,u,h,m){for(var A=0;A<o.length;++A){var R=o[A];if(!R.da&&R.listener==u&&R.capture==!!h&&R.ha==m)return A}return-1}var Wi="closure_lm_"+(1e6*Math.random()|0),Hi={};function nc(o,u,h,m,A){if(m&&m.once)return ic(o,u,h,m,A);if(Array.isArray(u)){for(var R=0;R<u.length;R++)nc(o,u[R],h,m,A);return null}return h=Yi(h),o&&o[Sn]?o.K(u,h,f(m)?!!m.capture:!!m,A):rc(o,u,h,!1,m,A)}function rc(o,u,h,m,A,R){if(!u)throw Error("Invalid event type");var k=f(A)?!!A.capture:!!A,Y=Ji(o);if(Y||(o[Wi]=Y=new vr(o)),h=Y.add(u,h,m,k,R),h.proxy)return h;if(m=Dd(),h.proxy=m,m.src=o,m.listener=h,o.addEventListener)Sd||(A=k),A===void 0&&(A=!1),o.addEventListener(u.toString(),m,A);else if(o.attachEvent)o.attachEvent(oc(u.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return h}function Dd(){function o(h){return u.call(o.src,o.listener,h)}let u=xd;return o}function ic(o,u,h,m,A){if(Array.isArray(u)){for(var R=0;R<u.length;R++)ic(o,u[R],h,m,A);return null}return h=Yi(h),o&&o[Sn]?o.L(u,h,f(m)?!!m.capture:!!m,A):rc(o,u,h,!0,m,A)}function sc(o,u,h,m,A){if(Array.isArray(u))for(var R=0;R<u.length;R++)sc(o,u[R],h,m,A);else m=f(m)?!!m.capture:!!m,h=Yi(h),o&&o[Sn]?(o=o.i,u=String(u).toString(),u in o.g&&(R=o.g[u],h=Ki(R,h,m,A),-1<h&&(wr(R[h]),Array.prototype.splice.call(R,h,1),R.length==0&&(delete o.g[u],o.h--)))):o&&(o=Ji(o))&&(u=o.g[u.toString()],o=-1,u&&(o=Ki(u,h,m,A)),(h=-1<o?u[o]:null)&&Qi(h))}function Qi(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[Sn])Gi(u.i,o);else{var h=o.type,m=o.proxy;u.removeEventListener?u.removeEventListener(h,m,o.capture):u.detachEvent?u.detachEvent(oc(h),m):u.addListener&&u.removeListener&&u.removeListener(m),(h=Ji(u))?(Gi(h,o),h.h==0&&(h.src=null,u[Wi]=null)):wr(o)}}}function oc(o){return o in Hi?Hi[o]:Hi[o]="on"+o}function xd(o,u){if(o.da)o=!0;else{u=new An(u,this);var h=o.listener,m=o.ha||o.src;o.fa&&Qi(o),o=h.call(m,u)}return o}function Ji(o){return o=o[Wi],o instanceof vr?o:null}var Xi="__closure_events_fn_"+(1e9*Math.random()>>>0);function Yi(o){return typeof o=="function"?o:(o[Xi]||(o[Xi]=function(u){return o.handleEvent(u)}),o[Xi])}function pt(){oe.call(this),this.i=new vr(this),this.M=this,this.F=null}V(pt,oe),pt.prototype[Sn]=!0,pt.prototype.removeEventListener=function(o,u,h,m){sc(this,o,u,h,m)};function vt(o,u){var h,m=o.F;if(m)for(h=[];m;m=m.F)h.push(m);if(o=o.M,m=u.type||u,typeof u=="string")u=new mt(u,o);else if(u instanceof mt)u.target=u.target||o;else{var A=u;u=new mt(m,o),I(u,A)}if(A=!0,h)for(var R=h.length-1;0<=R;R--){var k=u.g=h[R];A=Ir(k,m,!0,u)&&A}if(k=u.g=o,A=Ir(k,m,!0,u)&&A,A=Ir(k,m,!1,u)&&A,h)for(R=0;R<h.length;R++)k=u.g=h[R],A=Ir(k,m,!1,u)&&A}pt.prototype.N=function(){if(pt.aa.N.call(this),this.i){var o=this.i,u;for(u in o.g){for(var h=o.g[u],m=0;m<h.length;m++)wr(h[m]);delete o.g[u],o.h--}}this.F=null},pt.prototype.K=function(o,u,h,m){return this.i.add(String(o),u,!1,h,m)},pt.prototype.L=function(o,u,h,m){return this.i.add(String(o),u,!0,h,m)};function Ir(o,u,h,m){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();for(var A=!0,R=0;R<u.length;++R){var k=u[R];if(k&&!k.da&&k.capture==h){var Y=k.listener,dt=k.ha||k.src;k.fa&&Gi(o.i,k),A=Y.call(dt,m)!==!1&&A}}return A&&!m.defaultPrevented}function ac(o,u,h){if(typeof o=="function")h&&(o=v(o,h));else if(o&&typeof o.handleEvent=="function")o=v(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:l.setTimeout(o,u||0)}function cc(o){o.g=ac(()=>{o.g=null,o.i&&(o.i=!1,cc(o))},o.l);let u=o.h;o.h=null,o.m.apply(null,u)}class Vd extends oe{constructor(u,h){super(),this.m=u,this.l=h,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:cc(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Rn(o){oe.call(this),this.h=o,this.g={}}V(Rn,oe);var uc=[];function lc(o){Z(o.g,function(u,h){this.g.hasOwnProperty(h)&&Qi(u)},o),o.g={}}Rn.prototype.N=function(){Rn.aa.N.call(this),lc(this)},Rn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Zi=l.JSON.stringify,kd=l.JSON.parse,Nd=class{stringify(o){return l.JSON.stringify(o,void 0)}parse(o){return l.JSON.parse(o,void 0)}};function ts(){}ts.prototype.h=null;function hc(o){return o.h||(o.h=o.i())}function dc(){}var Cn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function es(){mt.call(this,"d")}V(es,mt);function ns(){mt.call(this,"c")}V(ns,mt);var Ee={},fc=null;function Er(){return fc=fc||new pt}Ee.La="serverreachability";function mc(o){mt.call(this,Ee.La,o)}V(mc,mt);function Pn(o){let u=Er();vt(u,new mc(u))}Ee.STAT_EVENT="statevent";function pc(o,u){mt.call(this,Ee.STAT_EVENT,o),this.stat=u}V(pc,mt);function It(o){let u=Er();vt(u,new pc(u,o))}Ee.Ma="timingevent";function gc(o,u){mt.call(this,Ee.Ma,o),this.size=u}V(gc,mt);function Dn(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){o()},u)}function xn(){this.g=!0}xn.prototype.xa=function(){this.g=!1};function Od(o,u,h,m,A,R){o.info(function(){if(o.g)if(R)for(var k="",Y=R.split("&"),dt=0;dt<Y.length;dt++){var Q=Y[dt].split("=");if(1<Q.length){var gt=Q[0];Q=Q[1];var yt=gt.split("_");k=2<=yt.length&&yt[1]=="type"?k+(gt+"="+Q+"&"):k+(gt+"=redacted&")}}else k=null;else k=R;return"XMLHTTP REQ ("+m+") [attempt "+A+"]: "+u+`
`+h+`
`+k})}function Ld(o,u,h,m,A,R,k){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+A+"]: "+u+`
`+h+`
`+R+" "+k})}function Be(o,u,h,m){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+Md(o,h)+(m?" "+m:"")})}function Fd(o,u){o.info(function(){return"TIMEOUT: "+u})}xn.prototype.info=function(){};function Md(o,u){if(!o.g)return u;if(!u)return null;try{var h=JSON.parse(u);if(h){for(o=0;o<h.length;o++)if(Array.isArray(h[o])){var m=h[o];if(!(2>m.length)){var A=m[1];if(Array.isArray(A)&&!(1>A.length)){var R=A[0];if(R!="noop"&&R!="stop"&&R!="close")for(var k=1;k<A.length;k++)A[k]=""}}}}return Zi(h)}catch{return u}}var Tr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},yc={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},rs;function br(){}V(br,ts),br.prototype.g=function(){return new XMLHttpRequest},br.prototype.i=function(){return{}},rs=new br;function ae(o,u,h,m){this.j=o,this.i=u,this.l=h,this.R=m||1,this.U=new Rn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new _c}function _c(){this.i=null,this.g="",this.h=!1}var wc={},is={};function ss(o,u,h){o.L=1,o.v=Cr(Wt(u)),o.m=h,o.P=!0,vc(o,null)}function vc(o,u){o.F=Date.now(),Ar(o),o.A=Wt(o.v);var h=o.A,m=o.R;Array.isArray(m)||(m=[String(m)]),Nc(h.i,"t",m),o.C=0,h=o.j.J,o.h=new _c,o.g=Yc(o.j,h?u:null,!o.m),0<o.O&&(o.M=new Vd(v(o.Y,o,o.g),o.O)),u=o.U,h=o.g,m=o.ca;var A="readystatechange";Array.isArray(A)||(A&&(uc[0]=A.toString()),A=uc);for(var R=0;R<A.length;R++){var k=nc(h,A[R],m||u.handleEvent,!1,u.h||u);if(!k)break;u.g[k.key]=k}u=o.H?p(o.H):{},o.m?(o.u||(o.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,u)):(o.u="GET",o.g.ea(o.A,o.u,null,u)),Pn(),Od(o.i,o.u,o.A,o.l,o.R,o.m)}ae.prototype.ca=function(o){o=o.target;let u=this.M;u&&Ht(o)==3?u.j():this.Y(o)},ae.prototype.Y=function(o){try{if(o==this.g)t:{let yt=Ht(this.g);var u=this.g.Ba();let qe=this.g.Z();if(!(3>yt)&&(yt!=3||this.g&&(this.h.h||this.g.oa()||Uc(this.g)))){this.J||yt!=4||u==7||(u==8||0>=qe?Pn(3):Pn(2)),os(this);var h=this.g.Z();this.X=h;e:if(Ic(this)){var m=Uc(this.g);o="";var A=m.length,R=Ht(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Te(this),Vn(this);var k="";break e}this.h.i=new l.TextDecoder}for(u=0;u<A;u++)this.h.h=!0,o+=this.h.i.decode(m[u],{stream:!(R&&u==A-1)});m.length=0,this.h.g+=o,this.C=0,k=this.h.g}else k=this.g.oa();if(this.o=h==200,Ld(this.i,this.u,this.A,this.l,this.R,yt,h),this.o){if(this.T&&!this.K){e:{if(this.g){var Y,dt=this.g;if((Y=dt.g?dt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!M(Y)){var Q=Y;break e}}Q=null}if(h=Q)Be(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,as(this,h);else{this.o=!1,this.s=3,It(12),Te(this),Vn(this);break t}}if(this.P){h=!0;let xt;for(;!this.J&&this.C<k.length;)if(xt=Bd(this,k),xt==is){yt==4&&(this.s=4,It(14),h=!1),Be(this.i,this.l,null,"[Incomplete Response]");break}else if(xt==wc){this.s=4,It(15),Be(this.i,this.l,k,"[Invalid Chunk]"),h=!1;break}else Be(this.i,this.l,xt,null),as(this,xt);if(Ic(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),yt!=4||k.length!=0||this.h.h||(this.s=1,It(16),h=!1),this.o=this.o&&h,!h)Be(this.i,this.l,k,"[Invalid Chunked Response]"),Te(this),Vn(this);else if(0<k.length&&!this.W){this.W=!0;var gt=this.j;gt.g==this&&gt.ba&&!gt.M&&(gt.j.info("Great, no buffering proxy detected. Bytes received: "+k.length),fs(gt),gt.M=!0,It(11))}}else Be(this.i,this.l,k,null),as(this,k);yt==4&&Te(this),this.o&&!this.J&&(yt==4?Hc(this.j,this):(this.o=!1,Ar(this)))}else nf(this.g),h==400&&0<k.indexOf("Unknown SID")?(this.s=3,It(12)):(this.s=0,It(13)),Te(this),Vn(this)}}}catch{}finally{}};function Ic(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Bd(o,u){var h=o.C,m=u.indexOf(`
`,h);return m==-1?is:(h=Number(u.substring(h,m)),isNaN(h)?wc:(m+=1,m+h>u.length?is:(u=u.slice(m,m+h),o.C=m+h,u)))}ae.prototype.cancel=function(){this.J=!0,Te(this)};function Ar(o){o.S=Date.now()+o.I,Ec(o,o.I)}function Ec(o,u){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Dn(v(o.ba,o),u)}function os(o){o.B&&(l.clearTimeout(o.B),o.B=null)}ae.prototype.ba=function(){this.B=null;let o=Date.now();0<=o-this.S?(Fd(this.i,this.A),this.L!=2&&(Pn(),It(17)),Te(this),this.s=2,Vn(this)):Ec(this,this.S-o)};function Vn(o){o.j.G==0||o.J||Hc(o.j,o)}function Te(o){os(o);var u=o.M;u&&typeof u.ma=="function"&&u.ma(),o.M=null,lc(o.U),o.g&&(u=o.g,o.g=null,u.abort(),u.ma())}function as(o,u){try{var h=o.j;if(h.G!=0&&(h.g==o||cs(h.h,o))){if(!o.K&&cs(h.h,o)&&h.G==3){try{var m=h.Da.g.parse(u)}catch{m=null}if(Array.isArray(m)&&m.length==3){var A=m;if(A[0]==0){t:if(!h.u){if(h.g)if(h.g.F+3e3<o.F)kr(h),xr(h);else break t;ds(h),It(18)}}else h.za=A[1],0<h.za-h.T&&37500>A[2]&&h.F&&h.v==0&&!h.C&&(h.C=Dn(v(h.Za,h),6e3));if(1>=Ac(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else Ae(h,11)}else if((o.K||h.g==o)&&kr(h),!M(u))for(A=h.Da.g.parse(u),u=0;u<A.length;u++){let Q=A[u];if(h.T=Q[0],Q=Q[1],h.G==2)if(Q[0]=="c"){h.K=Q[1],h.ia=Q[2];let gt=Q[3];gt!=null&&(h.la=gt,h.j.info("VER="+h.la));let yt=Q[4];yt!=null&&(h.Aa=yt,h.j.info("SVER="+h.Aa));let qe=Q[5];qe!=null&&typeof qe=="number"&&0<qe&&(m=1.5*qe,h.L=m,h.j.info("backChannelRequestTimeoutMs_="+m)),m=h;let xt=o.g;if(xt){let Or=xt.g?xt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Or){var R=m.h;R.g||Or.indexOf("spdy")==-1&&Or.indexOf("quic")==-1&&Or.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(us(R,R.h),R.h=null))}if(m.D){let ms=xt.g?xt.g.getResponseHeader("X-HTTP-Session-Id"):null;ms&&(m.ya=ms,tt(m.I,m.D,ms))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-o.F,h.j.info("Handshake RTT: "+h.R+"ms")),m=h;var k=o;if(m.qa=Xc(m,m.J?m.ia:null,m.W),k.K){Sc(m.h,k);var Y=k,dt=m.L;dt&&(Y.I=dt),Y.B&&(os(Y),Ar(Y)),m.g=k}else Kc(m);0<h.i.length&&Vr(h)}else Q[0]!="stop"&&Q[0]!="close"||Ae(h,7);else h.G==3&&(Q[0]=="stop"||Q[0]=="close"?Q[0]=="stop"?Ae(h,7):hs(h):Q[0]!="noop"&&h.l&&h.l.ta(Q),h.v=0)}}Pn(4)}catch{}}var zd=class{constructor(o,u){this.g=o,this.map=u}};function Tc(o){this.l=o||10,l.PerformanceNavigationTiming?(o=l.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function bc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Ac(o){return o.h?1:o.g?o.g.size:0}function cs(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function us(o,u){o.g?o.g.add(u):o.h=u}function Sc(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}Tc.prototype.cancel=function(){if(this.i=Rc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let o of this.g.values())o.cancel();this.g.clear()}};function Rc(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let u=o.i;for(let h of o.g.values())u=u.concat(h.D);return u}return N(o.i)}function Ud(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(d(o)){for(var u=[],h=o.length,m=0;m<h;m++)u.push(o[m]);return u}u=[],h=0;for(m in o)u[h++]=o[m];return u}function qd(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(d(o)||typeof o=="string"){var u=[];o=o.length;for(var h=0;h<o;h++)u.push(h);return u}u=[],h=0;for(let m in o)u[h++]=m;return u}}}function Cc(o,u){if(o.forEach&&typeof o.forEach=="function")o.forEach(u,void 0);else if(d(o)||typeof o=="string")Array.prototype.forEach.call(o,u,void 0);else for(var h=qd(o),m=Ud(o),A=m.length,R=0;R<A;R++)u.call(void 0,m[R],h&&h[R],o)}var Pc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function jd(o,u){if(o){o=o.split("&");for(var h=0;h<o.length;h++){var m=o[h].indexOf("="),A=null;if(0<=m){var R=o[h].substring(0,m);A=o[h].substring(m+1)}else R=o[h];u(R,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function be(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof be){this.h=o.h,Sr(this,o.j),this.o=o.o,this.g=o.g,Rr(this,o.s),this.l=o.l;var u=o.i,h=new On;h.i=u.i,u.g&&(h.g=new Map(u.g),h.h=u.h),Dc(this,h),this.m=o.m}else o&&(u=String(o).match(Pc))?(this.h=!1,Sr(this,u[1]||"",!0),this.o=kn(u[2]||""),this.g=kn(u[3]||"",!0),Rr(this,u[4]),this.l=kn(u[5]||"",!0),Dc(this,u[6]||"",!0),this.m=kn(u[7]||"")):(this.h=!1,this.i=new On(null,this.h))}be.prototype.toString=function(){var o=[],u=this.j;u&&o.push(Nn(u,xc,!0),":");var h=this.g;return(h||u=="file")&&(o.push("//"),(u=this.o)&&o.push(Nn(u,xc,!0),"@"),o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&o.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(Nn(h,h.charAt(0)=="/"?Kd:Gd,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",Nn(h,Hd)),o.join("")};function Wt(o){return new be(o)}function Sr(o,u,h){o.j=h?kn(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function Rr(o,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);o.s=u}else o.s=null}function Dc(o,u,h){u instanceof On?(o.i=u,Qd(o.i,o.h)):(h||(u=Nn(u,Wd)),o.i=new On(u,o.h))}function tt(o,u,h){o.i.set(u,h)}function Cr(o){return tt(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function kn(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Nn(o,u,h){return typeof o=="string"?(o=encodeURI(o).replace(u,$d),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function $d(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var xc=/[#\/\?@]/g,Gd=/[#\?:]/g,Kd=/[#\?]/g,Wd=/[#\?@]/g,Hd=/#/g;function On(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function ce(o){o.g||(o.g=new Map,o.h=0,o.i&&jd(o.i,function(u,h){o.add(decodeURIComponent(u.replace(/\+/g," ")),h)}))}r=On.prototype,r.add=function(o,u){ce(this),this.i=null,o=ze(this,o);var h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(u),this.h+=1,this};function Vc(o,u){ce(o),u=ze(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function kc(o,u){return ce(o),u=ze(o,u),o.g.has(u)}r.forEach=function(o,u){ce(this),this.g.forEach(function(h,m){h.forEach(function(A){o.call(u,A,m,this)},this)},this)},r.na=function(){ce(this);let o=Array.from(this.g.values()),u=Array.from(this.g.keys()),h=[];for(let m=0;m<u.length;m++){let A=o[m];for(let R=0;R<A.length;R++)h.push(u[m])}return h},r.V=function(o){ce(this);let u=[];if(typeof o=="string")kc(this,o)&&(u=u.concat(this.g.get(ze(this,o))));else{o=Array.from(this.g.values());for(let h=0;h<o.length;h++)u=u.concat(o[h])}return u},r.set=function(o,u){return ce(this),this.i=null,o=ze(this,o),kc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},r.get=function(o,u){return o?(o=this.V(o),0<o.length?String(o[0]):u):u};function Nc(o,u,h){Vc(o,u),0<h.length&&(o.i=null,o.g.set(ze(o,u),N(h)),o.h+=h.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";let o=[],u=Array.from(this.g.keys());for(var h=0;h<u.length;h++){var m=u[h];let R=encodeURIComponent(String(m)),k=this.V(m);for(m=0;m<k.length;m++){var A=R;k[m]!==""&&(A+="="+encodeURIComponent(String(k[m]))),o.push(A)}}return this.i=o.join("&")};function ze(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function Qd(o,u){u&&!o.j&&(ce(o),o.i=null,o.g.forEach(function(h,m){var A=m.toLowerCase();m!=A&&(Vc(this,m),Nc(this,A,h))},o)),o.j=u}function Jd(o,u){let h=new xn;if(l.Image){let m=new Image;m.onload=C(ue,h,"TestLoadImage: loaded",!0,u,m),m.onerror=C(ue,h,"TestLoadImage: error",!1,u,m),m.onabort=C(ue,h,"TestLoadImage: abort",!1,u,m),m.ontimeout=C(ue,h,"TestLoadImage: timeout",!1,u,m),l.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else u(!1)}function Xd(o,u){let h=new xn,m=new AbortController,A=setTimeout(()=>{m.abort(),ue(h,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:m.signal}).then(R=>{clearTimeout(A),R.ok?ue(h,"TestPingServer: ok",!0,u):ue(h,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(A),ue(h,"TestPingServer: error",!1,u)})}function ue(o,u,h,m,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),m(h)}catch{}}function Yd(){this.g=new Nd}function Zd(o,u,h){let m=h||"";try{Cc(o,function(A,R){let k=A;f(A)&&(k=Zi(A)),u.push(m+R+"="+encodeURIComponent(k))})}catch(A){throw u.push(m+"type="+encodeURIComponent("_badmap")),A}}function Ln(o){this.l=o.Ub||null,this.j=o.eb||!1}V(Ln,ts),Ln.prototype.g=function(){return new Pr(this.l,this.j)},Ln.prototype.i=function(o){return function(){return o}}({});function Pr(o,u){pt.call(this),this.D=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}V(Pr,pt),r=Pr.prototype,r.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=u,this.readyState=1,Mn(this)},r.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;let u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(u.body=o),(this.D||l).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Fn(this)),this.readyState=0},r.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Mn(this)),this.g&&(this.readyState=3,Mn(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Oc(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function Oc(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}r.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?Fn(this):Mn(this),this.readyState==3&&Oc(this)}},r.Ra=function(o){this.g&&(this.response=this.responseText=o,Fn(this))},r.Qa=function(o){this.g&&(this.response=o,Fn(this))},r.ga=function(){this.g&&Fn(this)};function Fn(o){o.readyState=4,o.l=null,o.j=null,o.v=null,Mn(o)}r.setRequestHeader=function(o,u){this.u.append(o,u)},r.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";let o=[],u=this.h.entries();for(var h=u.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=u.next();return o.join(`\r
`)};function Mn(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Pr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Lc(o){let u="";return Z(o,function(h,m){u+=m,u+=":",u+=h,u+=`\r
`}),u}function ls(o,u,h){t:{for(m in h){var m=!1;break t}m=!0}m||(h=Lc(h),typeof o=="string"?h!=null&&encodeURIComponent(String(h)):tt(o,u,h))}function rt(o){pt.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}V(rt,pt);var tf=/^https?$/i,ef=["POST","PUT"];r=rt.prototype,r.Ha=function(o){this.J=o},r.ea=function(o,u,h,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():rs.g(),this.v=this.o?hc(this.o):hc(rs),this.g.onreadystatechange=v(this.Ea,this);try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(R){Fc(this,R);return}if(o=h||"",h=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var A in m)h.set(A,m[A]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(let R of m.keys())h.set(R,m.get(R));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(h.keys()).find(R=>R.toLowerCase()=="content-type"),A=l.FormData&&o instanceof l.FormData,!(0<=Array.prototype.indexOf.call(ef,u,void 0))||m||A||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[R,k]of h)this.g.setRequestHeader(R,k);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{zc(this),this.u=!0,this.g.send(o),this.u=!1}catch(R){Fc(this,R)}};function Fc(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.m=5,Mc(o),Dr(o)}function Mc(o){o.A||(o.A=!0,vt(o,"complete"),vt(o,"error"))}r.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,vt(this,"complete"),vt(this,"abort"),Dr(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Dr(this,!0)),rt.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?Bc(this):this.bb())},r.bb=function(){Bc(this)};function Bc(o){if(o.h&&typeof c<"u"&&(!o.v[1]||Ht(o)!=4||o.Z()!=2)){if(o.u&&Ht(o)==4)ac(o.Ea,0,o);else if(vt(o,"readystatechange"),Ht(o)==4){o.h=!1;try{let k=o.Z();t:switch(k){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break t;default:u=!1}var h;if(!(h=u)){var m;if(m=k===0){var A=String(o.D).match(Pc)[1]||null;!A&&l.self&&l.self.location&&(A=l.self.location.protocol.slice(0,-1)),m=!tf.test(A?A.toLowerCase():"")}h=m}if(h)vt(o,"complete"),vt(o,"success");else{o.m=6;try{var R=2<Ht(o)?o.g.statusText:""}catch{R=""}o.l=R+" ["+o.Z()+"]",Mc(o)}}finally{Dr(o)}}}}function Dr(o,u){if(o.g){zc(o);let h=o.g,m=o.v[0]?()=>{}:null;o.g=null,o.v=null,u||vt(o,"ready");try{h.onreadystatechange=m}catch{}}}function zc(o){o.I&&(l.clearTimeout(o.I),o.I=null)}r.isActive=function(){return!!this.g};function Ht(o){return o.g?o.g.readyState:0}r.Z=function(){try{return 2<Ht(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),kd(u)}};function Uc(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function nf(o){let u={};o=(o.g&&2<=Ht(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(M(o[m]))continue;var h=T(o[m]);let A=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();let R=u[A]||[];u[A]=R,R.push(h)}b(u,function(m){return m.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Bn(o,u,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||u}function qc(o){this.Aa=0,this.i=[],this.j=new xn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Bn("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Bn("baseRetryDelayMs",5e3,o),this.cb=Bn("retryDelaySeedMs",1e4,o),this.Wa=Bn("forwardChannelMaxRetries",2,o),this.wa=Bn("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Tc(o&&o.concurrentRequestLimit),this.Da=new Yd,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=qc.prototype,r.la=8,r.G=1,r.connect=function(o,u,h,m){It(0),this.W=o,this.H=u||{},h&&m!==void 0&&(this.H.OSID=h,this.H.OAID=m),this.F=this.X,this.I=Xc(this,null,this.W),Vr(this)};function hs(o){if(jc(o),o.G==3){var u=o.U++,h=Wt(o.I);if(tt(h,"SID",o.K),tt(h,"RID",u),tt(h,"TYPE","terminate"),zn(o,h),u=new ae(o,o.j,u),u.L=2,u.v=Cr(Wt(h)),h=!1,l.navigator&&l.navigator.sendBeacon)try{h=l.navigator.sendBeacon(u.v.toString(),"")}catch{}!h&&l.Image&&(new Image().src=u.v,h=!0),h||(u.g=Yc(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Ar(u)}Jc(o)}function xr(o){o.g&&(fs(o),o.g.cancel(),o.g=null)}function jc(o){xr(o),o.u&&(l.clearTimeout(o.u),o.u=null),kr(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&l.clearTimeout(o.s),o.s=null)}function Vr(o){if(!bc(o.h)&&!o.s){o.s=!0;var u=o.Ga;Tn||ec(),bn||(Tn(),bn=!0),$i.add(u,o),o.B=0}}function rf(o,u){return Ac(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=u.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Dn(v(o.Ga,o,u),Qc(o,o.B)),o.B++,!0)}r.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;let A=new ae(this,this.j,o),R=this.o;if(this.S&&(R?(R=p(R),I(R,this.S)):R=this.S),this.m!==null||this.O||(A.H=R,R=null),this.P)t:{for(var u=0,h=0;h<this.i.length;h++){e:{var m=this.i[h];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break e}m=void 0}if(m===void 0)break;if(u+=m,4096<u){u=h;break t}if(u===4096||h===this.i.length-1){u=h+1;break t}}u=1e3}else u=1e3;u=Gc(this,A,u),h=Wt(this.I),tt(h,"RID",o),tt(h,"CVER",22),this.D&&tt(h,"X-HTTP-Session-Id",this.D),zn(this,h),R&&(this.O?u="headers="+encodeURIComponent(String(Lc(R)))+"&"+u:this.m&&ls(h,this.m,R)),us(this.h,A),this.Ua&&tt(h,"TYPE","init"),this.P?(tt(h,"$req",u),tt(h,"SID","null"),A.T=!0,ss(A,h,null)):ss(A,h,u),this.G=2}}else this.G==3&&(o?$c(this,o):this.i.length==0||bc(this.h)||$c(this))};function $c(o,u){var h;u?h=u.l:h=o.U++;let m=Wt(o.I);tt(m,"SID",o.K),tt(m,"RID",h),tt(m,"AID",o.T),zn(o,m),o.m&&o.o&&ls(m,o.m,o.o),h=new ae(o,o.j,h,o.B+1),o.m===null&&(h.H=o.o),u&&(o.i=u.D.concat(o.i)),u=Gc(o,h,1e3),h.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),us(o.h,h),ss(h,m,u)}function zn(o,u){o.H&&Z(o.H,function(h,m){tt(u,m,h)}),o.l&&Cc({},function(h,m){tt(u,m,h)})}function Gc(o,u,h){h=Math.min(o.i.length,h);var m=o.l?v(o.l.Na,o.l,o):null;t:{var A=o.i;let R=-1;for(;;){let k=["count="+h];R==-1?0<h?(R=A[0].g,k.push("ofs="+R)):R=0:k.push("ofs="+R);let Y=!0;for(let dt=0;dt<h;dt++){let Q=A[dt].g,gt=A[dt].map;if(Q-=R,0>Q)R=Math.max(0,A[dt].g-100),Y=!1;else try{Zd(gt,k,"req"+Q+"_")}catch{m&&m(gt)}}if(Y){m=k.join("&");break t}}}return o=o.i.splice(0,h),u.D=o,m}function Kc(o){if(!o.g&&!o.u){o.Y=1;var u=o.Fa;Tn||ec(),bn||(Tn(),bn=!0),$i.add(u,o),o.v=0}}function ds(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Dn(v(o.Fa,o),Qc(o,o.v)),o.v++,!0)}r.Fa=function(){if(this.u=null,Wc(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Dn(v(this.ab,this),o)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,It(10),xr(this),Wc(this))};function fs(o){o.A!=null&&(l.clearTimeout(o.A),o.A=null)}function Wc(o){o.g=new ae(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var u=Wt(o.qa);tt(u,"RID","rpc"),tt(u,"SID",o.K),tt(u,"AID",o.T),tt(u,"CI",o.F?"0":"1"),!o.F&&o.ja&&tt(u,"TO",o.ja),tt(u,"TYPE","xmlhttp"),zn(o,u),o.m&&o.o&&ls(u,o.m,o.o),o.L&&(o.g.I=o.L);var h=o.g;o=o.ia,h.L=1,h.v=Cr(Wt(u)),h.m=null,h.P=!0,vc(h,o)}r.Za=function(){this.C!=null&&(this.C=null,xr(this),ds(this),It(19))};function kr(o){o.C!=null&&(l.clearTimeout(o.C),o.C=null)}function Hc(o,u){var h=null;if(o.g==u){kr(o),fs(o),o.g=null;var m=2}else if(cs(o.h,u))h=u.D,Sc(o.h,u),m=1;else return;if(o.G!=0){if(u.o)if(m==1){h=u.m?u.m.length:0,u=Date.now()-u.F;var A=o.B;m=Er(),vt(m,new gc(m,h)),Vr(o)}else Kc(o);else if(A=u.s,A==3||A==0&&0<u.X||!(m==1&&rf(o,u)||m==2&&ds(o)))switch(h&&0<h.length&&(u=o.h,u.i=u.i.concat(h)),A){case 1:Ae(o,5);break;case 4:Ae(o,10);break;case 3:Ae(o,6);break;default:Ae(o,2)}}}function Qc(o,u){let h=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(h*=2),h*u}function Ae(o,u){if(o.j.info("Error code "+u),u==2){var h=v(o.fb,o),m=o.Xa;let A=!m;m=new be(m||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Sr(m,"https"),Cr(m),A?Jd(m.toString(),h):Xd(m.toString(),h)}else It(2);o.G=0,o.l&&o.l.sa(u),Jc(o),jc(o)}r.fb=function(o){o?(this.j.info("Successfully pinged google.com"),It(2)):(this.j.info("Failed to ping google.com"),It(1))};function Jc(o){if(o.G=0,o.ka=[],o.l){let u=Rc(o.h);(u.length!=0||o.i.length!=0)&&(D(o.ka,u),D(o.ka,o.i),o.h.i.length=0,N(o.i),o.i.length=0),o.l.ra()}}function Xc(o,u,h){var m=h instanceof be?Wt(h):new be(h);if(m.g!="")u&&(m.g=u+"."+m.g),Rr(m,m.s);else{var A=l.location;m=A.protocol,u=u?u+"."+A.hostname:A.hostname,A=+A.port;var R=new be(null);m&&Sr(R,m),u&&(R.g=u),A&&Rr(R,A),h&&(R.l=h),m=R}return h=o.D,u=o.ya,h&&u&&tt(m,h,u),tt(m,"VER",o.la),zn(o,m),m}function Yc(o,u,h){if(u&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Ca&&!o.pa?new rt(new Ln({eb:h})):new rt(o.pa),u.Ha(o.J),u}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Zc(){}r=Zc.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function Nr(){}Nr.prototype.g=function(o,u){return new Et(o,u)};function Et(o,u){pt.call(this),this.g=new qc(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(o?o["X-WebChannel-Client-Profile"]=u.va:o={"X-WebChannel-Client-Profile":u.va}),this.g.S=o,(o=u&&u.Sb)&&!M(o)&&(this.g.m=o),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!M(u)&&(this.g.D=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new Ue(this)}V(Et,pt),Et.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Et.prototype.close=function(){hs(this.g)},Et.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.u&&(h={},h.__data__=Zi(o),o=h);u.i.push(new zd(u.Ya++,o)),u.G==3&&Vr(u)},Et.prototype.N=function(){this.g.l=null,delete this.j,hs(this.g),delete this.g,Et.aa.N.call(this)};function tu(o){es.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){t:{for(let h in u){o=h;break t}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}V(tu,es);function eu(){ns.call(this),this.status=1}V(eu,ns);function Ue(o){this.g=o}V(Ue,Zc),Ue.prototype.ua=function(){vt(this.g,"a")},Ue.prototype.ta=function(o){vt(this.g,new tu(o))},Ue.prototype.sa=function(o){vt(this.g,new eu)},Ue.prototype.ra=function(){vt(this.g,"b")},Nr.prototype.createWebChannel=Nr.prototype.g,Et.prototype.send=Et.prototype.o,Et.prototype.open=Et.prototype.m,Et.prototype.close=Et.prototype.close,Bs=te.createWebChannelTransport=function(){return new Nr},Ms=te.getStatEventTarget=function(){return Er()},Fs=te.Event=Ee,qr=te.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Tr.NO_ERROR=0,Tr.TIMEOUT=8,Tr.HTTP_ERROR=6,Kn=te.ErrorCode=Tr,yc.COMPLETE="complete",Ls=te.EventType=yc,dc.EventType=Cn,Cn.OPEN="a",Cn.CLOSE="b",Cn.ERROR="c",Cn.MESSAGE="d",pt.prototype.listen=pt.prototype.K,Ge=te.WebChannel=dc,vm=te.FetchXmlHttpFactory=Ln,rt.prototype.listenOnce=rt.prototype.L,rt.prototype.getLastError=rt.prototype.Ka,rt.prototype.getLastErrorCode=rt.prototype.Ba,rt.prototype.getStatus=rt.prototype.Z,rt.prototype.getResponseJson=rt.prototype.Oa,rt.prototype.getResponseText=rt.prototype.oa,rt.prototype.send=rt.prototype.ea,rt.prototype.setWithCredentials=rt.prototype.Ha,Os=te.XhrIo=rt}).apply(typeof Ur<"u"?Ur:typeof self<"u"?self:typeof window<"u"?window:{});var Lu="@firebase/firestore",Fu="4.8.0";var lt=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};lt.UNAUTHENTICATED=new lt(null),lt.GOOGLE_CREDENTIALS=new lt("google-credentials-uid"),lt.FIRST_PARTY=new lt("first-party-uid"),lt.MOCK_USER=new lt("mock-user");var gn="11.10.0";var xe=new $e("@firebase/firestore");function Ke(){return xe.logLevel}function O(r,...e){if(xe.logLevel<=W.DEBUG){let n=e.map(Sa);xe.debug(`Firestore (${gn}): ${r}`,...n)}}function ee(r,...e){if(xe.logLevel<=W.ERROR){let n=e.map(Sa);xe.error(`Firestore (${gn}): ${r}`,...n)}}function ge(r,...e){if(xe.logLevel<=W.WARN){let n=e.map(Sa);xe.warn(`Firestore (${gn}): ${r}`,...n)}}function Sa(r){if(typeof r=="string")return r;try{return function(n){return JSON.stringify(n)}(r)}catch{return r}}function B(r,e,n){let i="Unexpected state";typeof e=="string"?i=e:n=e,Al(r,i,n)}function Al(r,e,n){let i=`FIRESTORE (${gn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${r.toString(16)})`;if(n!==void 0)try{i+=" CONTEXT: "+JSON.stringify(n)}catch{i+=" CONTEXT: "+n}throw ee(i),new Error(i)}function X(r,e,n,i){let s="Unexpected state";typeof n=="string"?s=n:i=n,r||Al(e,s,i)}function q(r,e){return r}var P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},F=class extends Qt{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var Ot=class{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}};var Qr=class{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},$s=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(lt.UNAUTHENTICATED))}shutdown(){}},Gs=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}},Ks=class{constructor(e){this.t=e,this.currentUser=lt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){X(this.o===void 0,42304);let i=this.i,s=d=>this.i!==i?(i=this.i,n(d)):Promise.resolve(),a=new Ot;this.o=()=>{this.i++,this.currentUser=this.u(),a.resolve(),a=new Ot,e.enqueueRetryable(()=>s(this.currentUser))};let c=()=>{let d=a;e.enqueueRetryable(async()=>{await d.promise,await s(this.currentUser)})},l=d=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=d,this.o&&(this.auth.addAuthTokenListener(this.o),c())};this.t.onInit(d=>l(d)),setTimeout(()=>{if(!this.auth){let d=this.t.getImmediate({optional:!0});d?l(d):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),a.resolve(),a=new Ot)}},0),c()}getToken(){let e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(i=>this.i!==e?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(X(typeof i.accessToken=="string",31837,{l:i}),new Qr(i.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){let e=this.auth&&this.auth.getUid();return X(e===null||typeof e=="string",2055,{h:e}),new lt(e)}},Ws=class{constructor(e,n,i){this.P=e,this.T=n,this.I=i,this.type="FirstParty",this.user=lt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);let e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}},Hs=class{constructor(e,n,i){this.P=e,this.T=n,this.I=i}getToken(){return Promise.resolve(new Ws(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable(()=>n(lt.FIRST_PARTY))}shutdown(){}invalidateToken(){}},Jr=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},Qs=class{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Pu(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){X(this.o===void 0,3512);let i=a=>{a.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${a.error.message}`);let c=a.token!==this.m;return this.m=a.token,O("FirebaseAppCheckTokenProvider",`Received ${c?"new":"existing"} token.`),c?n(a.token):Promise.resolve()};this.o=a=>{e.enqueueRetryable(()=>i(a))};let s=a=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=a,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(a=>s(a)),setTimeout(()=>{if(!this.appCheck){let a=this.V.getImmediate({optional:!0});a?s(a):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Jr(this.p));let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(X(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new Jr(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}};function Im(r){let e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let i=0;i<r;i++)n[i]=Math.floor(256*Math.random());return n}function Sl(){return new TextEncoder}var Yn=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516),i="";for(;i.length<20;){let s=Im(40);for(let a=0;a<s.length;++a)i.length<20&&s[a]<n&&(i+=e.charAt(s[a]%62))}return i}};function $(r,e){return r<e?-1:r>e?1:0}function Js(r,e){let n=0;for(;n<r.length&&n<e.length;){let i=r.codePointAt(n),s=e.codePointAt(n);if(i!==s){if(i<128&&s<128)return $(i,s);{let a=Sl(),c=Em(a.encode(Mu(r,n)),a.encode(Mu(e,n)));return c!==0?c:$(i,s)}}n+=i>65535?2:1}return $(r.length,e.length)}function Mu(r,e){return r.codePointAt(e)>65535?r.substring(e,e+2):r.substring(e,e+1)}function Em(r,e){for(let n=0;n<r.length&&n<e.length;++n)if(r[n]!==e[n])return $(r[n],e[n]);return $(r.length,e.length)}function tn(r,e,n){return r.length===e.length&&r.every((i,s)=>n(i,e[s]))}var Bu="__name__",Xr=class r{constructor(e,n,i){n===void 0?n=0:n>e.length&&B(637,{offset:n,range:e.length}),i===void 0?i=e.length-n:i>e.length-n&&B(1746,{length:i,range:e.length-n}),this.segments=e,this.offset=n,this.len=i}get length(){return this.len}isEqual(e){return r.comparator(this,e)===0}child(e){let n=this.segments.slice(this.offset,this.limit());return e instanceof r?e.forEach(i=>{n.push(i)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,i=this.limit();n<i;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){let i=Math.min(e.length,n.length);for(let s=0;s<i;s++){let a=r.compareSegments(e.get(s),n.get(s));if(a!==0)return a}return $(e.length,n.length)}static compareSegments(e,n){let i=r.isNumericId(e),s=r.isNumericId(n);return i&&!s?-1:!i&&s?1:i&&s?r.extractNumericId(e).compare(r.extractNumericId(n)):Js(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Zt.fromString(e.substring(4,e.length-2))}},st=class r extends Xr{construct(e,n,i){return new r(e,n,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let n=[];for(let i of e){if(i.indexOf("//")>=0)throw new F(P.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);n.push(...i.split("/").filter(s=>s.length>0))}return new r(n)}static emptyPath(){return new r([])}},Tm=/^[_a-zA-Z][_a-zA-Z0-9]*$/,bt=class r extends Xr{construct(e,n,i){return new r(e,n,i)}static isValidIdentifier(e){return Tm.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),r.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Bu}static keyField(){return new r([Bu])}static fromServerFormat(e){let n=[],i="",s=0,a=()=>{if(i.length===0)throw new F(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(i),i=""},c=!1;for(;s<e.length;){let l=e[s];if(l==="\\"){if(s+1===e.length)throw new F(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let d=e[s+1];if(d!=="\\"&&d!=="."&&d!=="`")throw new F(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);i+=d,s+=2}else l==="`"?(c=!c,s++):l!=="."||c?(i+=l,s++):(a(),s++)}if(a(),c)throw new F(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new r(n)}static emptyPath(){return new r([])}};var z=class r{constructor(e){this.path=e}static fromPath(e){return new r(st.fromString(e))}static fromName(e){return new r(st.fromString(e).popFirst(5))}static empty(){return new r(st.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&st.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return st.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new r(new st(e.slice()))}};function bm(r,e,n){if(!n)throw new F(P.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function Am(r,e,n,i){if(e===!0&&i===!0)throw new F(P.INVALID_ARGUMENT,`${r} and ${n} cannot be used together.`)}function zu(r){if(!z.isDocumentKey(r))throw new F(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function Rl(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function Ra(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{let e=function(i){return i.constructor?i.constructor.name:null}(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":B(12329,{type:typeof r})}function Lt(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new F(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let n=Ra(r);throw new F(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return r}function ct(r,e){let n={typeString:r};return e&&(n.value=e),n}function dr(r,e){if(!Rl(r))throw new F(P.INVALID_ARGUMENT,"JSON must be an object");let n;for(let i in e)if(e[i]){let s=e[i].typeString,a="value"in e[i]?{value:e[i].value}:void 0;if(!(i in r)){n=`JSON missing required field: '${i}'`;break}let c=r[i];if(s&&typeof c!==s){n=`JSON field '${i}' must be a ${s}.`;break}if(a!==void 0&&c!==a.value){n=`Expected '${i}' field to equal '${a.value}'`;break}}if(n)throw new F(P.INVALID_ARGUMENT,n);return!0}var Uu=-62135596800,qu=1e6,J=class r{static now(){return r.fromMillis(Date.now())}static fromDate(e){return r.fromMillis(e.getTime())}static fromMillis(e){let n=Math.floor(e/1e3),i=Math.floor((e-1e3*n)*qu);return new r(n,i)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new F(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new F(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<Uu)throw new F(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new F(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/qu}_compareTo(e){return this.seconds===e.seconds?$(this.nanoseconds,e.nanoseconds):$(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:r._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(dr(e,r._jsonSchema))return new r(e.seconds,e.nanoseconds)}valueOf(){let e=this.seconds-Uu;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};J._jsonSchemaVersion="firestore/timestamp/1.0",J._jsonSchema={type:ct("string",J._jsonSchemaVersion),seconds:ct("number"),nanoseconds:ct("number")};var j=class r{static fromTimestamp(e){return new r(e)}static min(){return new r(new J(0,0))}static max(){return new r(new J(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var Zn=-1,Xs=class{constructor(e,n,i,s){this.indexId=e,this.collectionGroup=n,this.fields=i,this.indexState=s}};Xs.UNKNOWN_ID=-1;function Sm(r,e){let n=r.toTimestamp().seconds,i=r.toTimestamp().nanoseconds+1,s=j.fromTimestamp(i===1e9?new J(n+1,0):new J(n,i));return new Ve(s,z.empty(),e)}function Rm(r){return new Ve(r.readTime,r.key,Zn)}var Ve=class r{constructor(e,n,i){this.readTime=e,this.documentKey=n,this.largestBatchId=i}static min(){return new r(j.min(),z.empty(),Zn)}static max(){return new r(j.max(),z.empty(),Zn)}};function Cm(r,e){let n=r.readTime.compareTo(e.readTime);return n!==0?n:(n=z.comparator(r.documentKey,e.documentKey),n!==0?n:$(r.largestBatchId,e.largestBatchId))}var Pm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",Ys=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}};async function yn(r){if(r.code!==P.FAILED_PRECONDITION||r.message!==Pm)throw r;O("LocalStore","Unexpectedly lost primary lease")}var x=class r{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&B(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new r((i,s)=>{this.nextCallback=a=>{this.wrapSuccess(e,a).next(i,s)},this.catchCallback=a=>{this.wrapFailure(n,a).next(i,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{let n=e();return n instanceof r?n:r.resolve(n)}catch(n){return r.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):r.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):r.reject(n)}static resolve(e){return new r((n,i)=>{n(e)})}static reject(e){return new r((n,i)=>{i(e)})}static waitFor(e){return new r((n,i)=>{let s=0,a=0,c=!1;e.forEach(l=>{++s,l.next(()=>{++a,c&&a===s&&n()},d=>i(d))}),c=!0,a===s&&n()})}static or(e){let n=r.resolve(!1);for(let i of e)n=n.next(s=>s?r.resolve(s):i());return n}static forEach(e,n){let i=[];return e.forEach((s,a)=>{i.push(n.call(this,s,a))}),this.waitFor(i)}static mapArray(e,n){return new r((i,s)=>{let a=e.length,c=new Array(a),l=0;for(let d=0;d<a;d++){let f=d;n(e[f]).next(g=>{c[f]=g,++l,l===a&&i(c)},g=>s(g))}})}static doWhile(e,n){return new r((i,s)=>{let a=()=>{e()===!0?n().next(()=>{a()},s):i()};a()})}};function Dm(r){let e=r.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function _n(r){return r.name==="IndexedDbTransactionError"}var en=class{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=i=>this._e(i),this.ae=i=>n.writeSequenceNumber(i))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.ae&&this.ae(e),e}};en.ue=-1;var Ca=-1;function Di(r){return r==null}function tr(r){return r===0&&1/r==-1/0}function xm(r){return typeof r=="number"&&Number.isInteger(r)&&!tr(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}var Cl="";function Vm(r){let e="";for(let n=0;n<r.length;n++)e.length>0&&(e=ju(e)),e=km(r.get(n),e);return ju(e)}function km(r,e){let n=e,i=r.length;for(let s=0;s<i;s++){let a=r.charAt(s);switch(a){case"\0":n+="";break;case Cl:n+="";break;default:n+=a}}return n}function ju(r){return r+Cl+""}var Nm="remoteDocuments",Pl="owner";var Dl="mutationQueues";var xl="mutations";var Vl="documentMutations",Om="remoteDocumentsV14";var kl="remoteDocumentGlobal";var Nl="targets";var Ol="targetDocuments";var Ll="targetGlobal",Fl="collectionParents";var Ml="clientMetadata";var Bl="bundles";var zl="namedQueries";var Lm="indexConfiguration";var Fm="indexState";var Mm="indexEntries";var Ul="documentOverlays";var Bm="globals";var zm=[Dl,xl,Vl,Nm,Nl,Pl,Ll,Ol,Ml,kl,Fl,Bl,zl],vy=[...zm,Ul],Um=[Dl,xl,Vl,Om,Nl,Pl,Ll,Ol,Ml,kl,Fl,Bl,zl,Ul],qm=Um,jm=[...qm,Lm,Fm,Mm];var Iy=[...jm,Bm];function $u(r){let e=0;for(let n in r)Object.prototype.hasOwnProperty.call(r,n)&&e++;return e}function Ie(r,e){for(let n in r)Object.prototype.hasOwnProperty.call(r,n)&&e(n,r[n])}function ql(r){for(let e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}var it=class r{constructor(e,n){this.comparator=e,this.root=n||Ft.EMPTY}insert(e,n){return new r(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Ft.BLACK,null,null))}remove(e){return new r(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ft.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){let i=this.comparator(e,n.key);if(i===0)return n.value;i<0?n=n.left:i>0&&(n=n.right)}return null}indexOf(e){let n=0,i=this.root;for(;!i.isEmpty();){let s=this.comparator(e,i.key);if(s===0)return n+i.left.size;s<0?i=i.left:(n+=i.left.size+1,i=i.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,i)=>(e(n,i),!1))}toString(){let e=[];return this.inorderTraversal((n,i)=>(e.push(`${n}:${i}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Je(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Je(this.root,e,this.comparator,!1)}getReverseIterator(){return new Je(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Je(this.root,e,this.comparator,!0)}},Je=class{constructor(e,n,i,s){this.isReverse=s,this.nodeStack=[];let a=1;for(;!e.isEmpty();)if(a=n?i(e.key,n):1,n&&s&&(a*=-1),a<0)e=this.isReverse?e.left:e.right;else{if(a===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},Ft=class r{constructor(e,n,i,s,a){this.key=e,this.value=n,this.color=i??r.RED,this.left=s??r.EMPTY,this.right=a??r.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,i,s,a){return new r(e??this.key,n??this.value,i??this.color,s??this.left,a??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let s=this,a=i(e,s.key);return s=a<0?s.copy(null,null,null,s.left.insert(e,n,i),null):a===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,i)),s.fixUp()}removeMin(){if(this.left.isEmpty())return r.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let i,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return r.EMPTY;i=s.right.min(),s=s.copy(i.key,i.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,r.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,r.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw B(43730,{key:this.key,value:this.value});if(this.right.isRed())throw B(14113,{key:this.key,value:this.value});let e=this.left.check();if(e!==this.right.check())throw B(27949);return e+(this.isRed()?0:1)}};Ft.EMPTY=null,Ft.RED=!0,Ft.BLACK=!1;Ft.EMPTY=new class{constructor(){this.size=0}get key(){throw B(57766)}get value(){throw B(16141)}get color(){throw B(16727)}get left(){throw B(29726)}get right(){throw B(36894)}copy(e,n,i,s,a){return this}insert(e,n,i){return new Ft(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var ht=class r{constructor(e){this.comparator=e,this.data=new it(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,i)=>(e(n),!1))}forEachInRange(e,n){let i=this.data.getIteratorFrom(e[0]);for(;i.hasNext();){let s=i.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let i;for(i=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();i.hasNext();)if(!e(i.getNext().key))return}firstAfterOrEqual(e){let n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Yr(this.data.getIterator())}getIteratorFrom(e){return new Yr(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(i=>{n=n.add(i)}),n}isEqual(e){if(!(e instanceof r)||this.size!==e.size)return!1;let n=this.data.getIterator(),i=e.data.getIterator();for(;n.hasNext();){let s=n.getNext().key,a=i.getNext().key;if(this.comparator(s,a)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(n=>{e.push(n)}),e}toString(){let e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){let n=new r(this.comparator);return n.data=e,n}},Yr=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var Ct=class r{constructor(e){this.fields=e,e.sort(bt.comparator)}static empty(){return new r([])}unionWith(e){let n=new ht(bt.comparator);for(let i of this.fields)n=n.add(i);for(let i of e)n=n.add(i);return new r(n.toArray())}covers(e){for(let n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return tn(this.fields,e.fields,(n,i)=>n.isEqual(i))}};var Zr=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var wt=class r{constructor(e){this.binaryString=e}static fromBase64String(e){let n=function(s){try{return atob(s)}catch(a){throw typeof DOMException<"u"&&a instanceof DOMException?new Zr("Invalid base64 string: "+a):a}}(e);return new r(n)}static fromUint8Array(e){let n=function(s){let a="";for(let c=0;c<s.length;++c)a+=String.fromCharCode(s[c]);return a}(e);return new r(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){let i=new Uint8Array(n.length);for(let s=0;s<n.length;s++)i[s]=n.charCodeAt(s);return i}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return $(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};wt.EMPTY_BYTE_STRING=new wt("");var $m=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ne(r){if(X(!!r,39018),typeof r=="string"){let e=0,n=$m.exec(r);if(X(!!n,46558,{timestamp:r}),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}let i=new Date(r);return{seconds:Math.floor(i.getTime()/1e3),nanos:e}}return{seconds:nt(r.seconds),nanos:nt(r.nanos)}}function nt(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function re(r){return typeof r=="string"?wt.fromBase64String(r):wt.fromUint8Array(r)}var jl="server_timestamp",$l="__type__",Gl="__previous_value__",Kl="__local_write_time__";function Pa(r){var e,n;return((n=(((e=r?.mapValue)===null||e===void 0?void 0:e.fields)||{})[$l])===null||n===void 0?void 0:n.stringValue)===jl}function xi(r){let e=r.mapValue.fields[Gl];return Pa(e)?xi(e):e}function er(r){let e=ne(r.mapValue.fields[Kl].timestampValue);return new J(e.seconds,e.nanos)}var Zs=class{constructor(e,n,i,s,a,c,l,d,f,g){this.databaseId=e,this.appId=n,this.persistenceKey=i,this.host=s,this.ssl=a,this.forceLongPolling=c,this.autoDetectLongPolling=l,this.longPollingOptions=d,this.useFetchStreams=f,this.isUsingEmulator=g}},ti="(default)",ei=class r{constructor(e,n){this.projectId=e,this.database=n||ti}static empty(){return new r("","")}get isDefaultDatabase(){return this.database===ti}isEqual(e){return e instanceof r&&e.projectId===this.projectId&&e.database===this.database}};var Da="__type__",Wl="__max__",jr={mapValue:{fields:{__type__:{stringValue:Wl}}}},xa="__vector__",nn="value";function ye(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Pa(r)?4:Ql(r)?9007199254740991:Hl(r)?10:11:B(28295,{value:r})}function zt(r,e){if(r===e)return!0;let n=ye(r);if(n!==ye(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return er(r).isEqual(er(e));case 3:return function(s,a){if(typeof s.timestampValue=="string"&&typeof a.timestampValue=="string"&&s.timestampValue.length===a.timestampValue.length)return s.timestampValue===a.timestampValue;let c=ne(s.timestampValue),l=ne(a.timestampValue);return c.seconds===l.seconds&&c.nanos===l.nanos}(r,e);case 5:return r.stringValue===e.stringValue;case 6:return function(s,a){return re(s.bytesValue).isEqual(re(a.bytesValue))}(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return function(s,a){return nt(s.geoPointValue.latitude)===nt(a.geoPointValue.latitude)&&nt(s.geoPointValue.longitude)===nt(a.geoPointValue.longitude)}(r,e);case 2:return function(s,a){if("integerValue"in s&&"integerValue"in a)return nt(s.integerValue)===nt(a.integerValue);if("doubleValue"in s&&"doubleValue"in a){let c=nt(s.doubleValue),l=nt(a.doubleValue);return c===l?tr(c)===tr(l):isNaN(c)&&isNaN(l)}return!1}(r,e);case 9:return tn(r.arrayValue.values||[],e.arrayValue.values||[],zt);case 10:case 11:return function(s,a){let c=s.mapValue.fields||{},l=a.mapValue.fields||{};if($u(c)!==$u(l))return!1;for(let d in c)if(c.hasOwnProperty(d)&&(l[d]===void 0||!zt(c[d],l[d])))return!1;return!0}(r,e);default:return B(52216,{left:r})}}function nr(r,e){return(r.values||[]).find(n=>zt(n,e))!==void 0}function rn(r,e){if(r===e)return 0;let n=ye(r),i=ye(e);if(n!==i)return $(n,i);switch(n){case 0:case 9007199254740991:return 0;case 1:return $(r.booleanValue,e.booleanValue);case 2:return function(a,c){let l=nt(a.integerValue||a.doubleValue),d=nt(c.integerValue||c.doubleValue);return l<d?-1:l>d?1:l===d?0:isNaN(l)?isNaN(d)?0:-1:1}(r,e);case 3:return Gu(r.timestampValue,e.timestampValue);case 4:return Gu(er(r),er(e));case 5:return Js(r.stringValue,e.stringValue);case 6:return function(a,c){let l=re(a),d=re(c);return l.compareTo(d)}(r.bytesValue,e.bytesValue);case 7:return function(a,c){let l=a.split("/"),d=c.split("/");for(let f=0;f<l.length&&f<d.length;f++){let g=$(l[f],d[f]);if(g!==0)return g}return $(l.length,d.length)}(r.referenceValue,e.referenceValue);case 8:return function(a,c){let l=$(nt(a.latitude),nt(c.latitude));return l!==0?l:$(nt(a.longitude),nt(c.longitude))}(r.geoPointValue,e.geoPointValue);case 9:return Ku(r.arrayValue,e.arrayValue);case 10:return function(a,c){var l,d,f,g;let w=a.fields||{},v=c.fields||{},C=(l=w[nn])===null||l===void 0?void 0:l.arrayValue,V=(d=v[nn])===null||d===void 0?void 0:d.arrayValue,N=$(((f=C?.values)===null||f===void 0?void 0:f.length)||0,((g=V?.values)===null||g===void 0?void 0:g.length)||0);return N!==0?N:Ku(C,V)}(r.mapValue,e.mapValue);case 11:return function(a,c){if(a===jr.mapValue&&c===jr.mapValue)return 0;if(a===jr.mapValue)return 1;if(c===jr.mapValue)return-1;let l=a.fields||{},d=Object.keys(l),f=c.fields||{},g=Object.keys(f);d.sort(),g.sort();for(let w=0;w<d.length&&w<g.length;++w){let v=Js(d[w],g[w]);if(v!==0)return v;let C=rn(l[d[w]],f[g[w]]);if(C!==0)return C}return $(d.length,g.length)}(r.mapValue,e.mapValue);default:throw B(23264,{le:n})}}function Gu(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return $(r,e);let n=ne(r),i=ne(e),s=$(n.seconds,i.seconds);return s!==0?s:$(n.nanos,i.nanos)}function Ku(r,e){let n=r.values||[],i=e.values||[];for(let s=0;s<n.length&&s<i.length;++s){let a=rn(n[s],i[s]);if(a)return a}return $(n.length,i.length)}function sn(r){return to(r)}function to(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(n){let i=ne(n);return`time(${i.seconds},${i.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(n){return re(n).toBase64()}(r.bytesValue):"referenceValue"in r?function(n){return z.fromName(n).toString()}(r.referenceValue):"geoPointValue"in r?function(n){return`geo(${n.latitude},${n.longitude})`}(r.geoPointValue):"arrayValue"in r?function(n){let i="[",s=!0;for(let a of n.values||[])s?s=!1:i+=",",i+=to(a);return i+"]"}(r.arrayValue):"mapValue"in r?function(n){let i=Object.keys(n.fields||{}).sort(),s="{",a=!0;for(let c of i)a?a=!1:s+=",",s+=`${c}:${to(n.fields[c])}`;return s+"}"}(r.mapValue):B(61005,{value:r})}function Kr(r){switch(ye(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:let e=xi(r);return e?16+Kr(e):16;case 5:return 2*r.stringValue.length;case 6:return re(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(i){return(i.values||[]).reduce((s,a)=>s+Kr(a),0)}(r.arrayValue);case 10:case 11:return function(i){let s=0;return Ie(i.fields,(a,c)=>{s+=a.length+Kr(c)}),s}(r.mapValue);default:throw B(13486,{value:r})}}function eo(r){return!!r&&"integerValue"in r}function Va(r){return!!r&&"arrayValue"in r}function Wu(r){return!!r&&"nullValue"in r}function Hu(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Wr(r){return!!r&&"mapValue"in r}function Hl(r){var e,n;return((n=(((e=r?.mapValue)===null||e===void 0?void 0:e.fields)||{})[Da])===null||n===void 0?void 0:n.stringValue)===xa}function Hn(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){let e={mapValue:{fields:{}}};return Ie(r.mapValue.fields,(n,i)=>e.mapValue.fields[n]=Hn(i)),e}if(r.arrayValue){let e={arrayValue:{values:[]}};for(let n=0;n<(r.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Hn(r.arrayValue.values[n]);return e}return Object.assign({},r)}function Ql(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===Wl}var Ty={mapValue:{fields:{[Da]:{stringValue:xa},[nn]:{arrayValue:{}}}}};var Tt=class r{constructor(e){this.value=e}static empty(){return new r({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let i=0;i<e.length-1;++i)if(n=(n.mapValue.fields||{})[e.get(i)],!Wr(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Hn(n)}setAll(e){let n=bt.emptyPath(),i={},s=[];e.forEach((c,l)=>{if(!n.isImmediateParentOf(l)){let d=this.getFieldsMap(n);this.applyChanges(d,i,s),i={},s=[],n=l.popLast()}c?i[l.lastSegment()]=Hn(c):s.push(l.lastSegment())});let a=this.getFieldsMap(n);this.applyChanges(a,i,s)}delete(e){let n=this.field(e.popLast());Wr(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return zt(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let i=0;i<e.length;++i){let s=n.mapValue.fields[e.get(i)];Wr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(i)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,i){Ie(n,(s,a)=>e[s]=a);for(let s of i)delete e[s]}clone(){return new r(Hn(this.value))}};function Jl(r){let e=[];return Ie(r.fields,(n,i)=>{let s=new bt([n]);if(Wr(i)){let a=Jl(i.mapValue).fields;if(a.length===0)e.push(s);else for(let c of a)e.push(s.child(c))}else e.push(s)}),new Ct(e)}var Vt=class r{constructor(e,n,i,s,a,c,l){this.key=e,this.documentType=n,this.version=i,this.readTime=s,this.createTime=a,this.data=c,this.documentState=l}static newInvalidDocument(e){return new r(e,0,j.min(),j.min(),j.min(),Tt.empty(),0)}static newFoundDocument(e,n,i,s){return new r(e,1,n,j.min(),i,s,0)}static newNoDocument(e,n){return new r(e,2,n,j.min(),j.min(),Tt.empty(),0)}static newUnknownDocument(e,n){return new r(e,3,n,j.min(),j.min(),Tt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(j.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Tt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Tt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=j.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof r&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new r(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var on=class{constructor(e,n){this.position=e,this.inclusive=n}};function Qu(r,e,n){let i=0;for(let s=0;s<r.position.length;s++){let a=e[s],c=r.position[s];if(a.field.isKeyField()?i=z.comparator(z.fromName(c.referenceValue),n.key):i=rn(c,n.data.field(a.field)),a.dir==="desc"&&(i*=-1),i!==0)break}return i}function Ju(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let n=0;n<r.position.length;n++)if(!zt(r.position[n],e.position[n]))return!1;return!0}var an=class{constructor(e,n="asc"){this.field=e,this.dir=n}};function Gm(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}var ni=class{},ut=class r extends ni{constructor(e,n,i){super(),this.field=e,this.op=n,this.value=i}static create(e,n,i){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,i):new ro(e,n,i):n==="array-contains"?new oo(e,i):n==="in"?new ao(e,i):n==="not-in"?new co(e,i):n==="array-contains-any"?new uo(e,i):new r(e,n,i)}static createKeyFieldInFilter(e,n,i){return n==="in"?new io(e,i):new so(e,i)}matches(e){let n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(rn(n,this.value)):n!==null&&ye(this.value)===ye(n)&&this.matchesComparison(rn(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return B(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},Ut=class r extends ni{constructor(e,n){super(),this.filters=e,this.op=n,this.he=null}static create(e,n){return new r(e,n)}matches(e){return Xl(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}};function Xl(r){return r.op==="and"}function Yl(r){return Km(r)&&Xl(r)}function Km(r){for(let e of r.filters)if(e instanceof Ut)return!1;return!0}function no(r){if(r instanceof ut)return r.field.canonicalString()+r.op.toString()+sn(r.value);if(Yl(r))return r.filters.map(e=>no(e)).join(",");{let e=r.filters.map(n=>no(n)).join(",");return`${r.op}(${e})`}}function Zl(r,e){return r instanceof ut?function(i,s){return s instanceof ut&&i.op===s.op&&i.field.isEqual(s.field)&&zt(i.value,s.value)}(r,e):r instanceof Ut?function(i,s){return s instanceof Ut&&i.op===s.op&&i.filters.length===s.filters.length?i.filters.reduce((a,c,l)=>a&&Zl(c,s.filters[l]),!0):!1}(r,e):void B(19439)}function th(r){return r instanceof ut?function(n){return`${n.field.canonicalString()} ${n.op} ${sn(n.value)}`}(r):r instanceof Ut?function(n){return n.op.toString()+" {"+n.getFilters().map(th).join(" ,")+"}"}(r):"Filter"}var ro=class extends ut{constructor(e,n,i){super(e,n,i),this.key=z.fromName(i.referenceValue)}matches(e){let n=z.comparator(e.key,this.key);return this.matchesComparison(n)}},io=class extends ut{constructor(e,n){super(e,"in",n),this.keys=eh("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}},so=class extends ut{constructor(e,n){super(e,"not-in",n),this.keys=eh("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}};function eh(r,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(i=>z.fromName(i.referenceValue))}var oo=class extends ut{constructor(e,n){super(e,"array-contains",n)}matches(e){let n=e.data.field(this.field);return Va(n)&&nr(n.arrayValue,this.value)}},ao=class extends ut{constructor(e,n){super(e,"in",n)}matches(e){let n=e.data.field(this.field);return n!==null&&nr(this.value.arrayValue,n)}},co=class extends ut{constructor(e,n){super(e,"not-in",n)}matches(e){if(nr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!nr(this.value.arrayValue,n)}},uo=class extends ut{constructor(e,n){super(e,"array-contains-any",n)}matches(e){let n=e.data.field(this.field);return!(!Va(n)||!n.arrayValue.values)&&n.arrayValue.values.some(i=>nr(this.value.arrayValue,i))}};var lo=class{constructor(e,n=null,i=[],s=[],a=null,c=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=i,this.filters=s,this.limit=a,this.startAt=c,this.endAt=l,this.Pe=null}};function Xu(r,e=null,n=[],i=[],s=null,a=null,c=null){return new lo(r,e,n,i,s,a,c)}function ka(r){let e=q(r);if(e.Pe===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(i=>no(i)).join(","),n+="|ob:",n+=e.orderBy.map(i=>function(a){return a.field.canonicalString()+a.dir}(i)).join(","),Di(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(i=>sn(i)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(i=>sn(i)).join(",")),e.Pe=n}return e.Pe}function Na(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<r.orderBy.length;n++)if(!Gm(r.orderBy[n],e.orderBy[n]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let n=0;n<r.filters.length;n++)if(!Zl(r.filters[n],e.filters[n]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!Ju(r.startAt,e.startAt)&&Ju(r.endAt,e.endAt)}function ho(r){return z.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}var cn=class{constructor(e,n=null,i=[],s=[],a=null,c="F",l=null,d=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=i,this.filters=s,this.limit=a,this.limitType=c,this.startAt=l,this.endAt=d,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}};function Wm(r,e,n,i,s,a,c,l){return new cn(r,e,n,i,s,a,c,l)}function Vi(r){return new cn(r)}function Yu(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function Hm(r){return r.collectionGroup!==null}function Qn(r){let e=q(r);if(e.Te===null){e.Te=[];let n=new Set;for(let a of e.explicitOrderBy)e.Te.push(a),n.add(a.field.canonicalString());let i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(c){let l=new ht(bt.comparator);return c.filters.forEach(d=>{d.getFlattenedFilters().forEach(f=>{f.isInequality()&&(l=l.add(f.field))})}),l})(e).forEach(a=>{n.has(a.canonicalString())||a.isKeyField()||e.Te.push(new an(a,i))}),n.has(bt.keyField().canonicalString())||e.Te.push(new an(bt.keyField(),i))}return e.Te}function Mt(r){let e=q(r);return e.Ie||(e.Ie=Qm(e,Qn(r))),e.Ie}function Qm(r,e){if(r.limitType==="F")return Xu(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map(s=>{let a=s.dir==="desc"?"asc":"desc";return new an(s.field,a)});let n=r.endAt?new on(r.endAt.position,r.endAt.inclusive):null,i=r.startAt?new on(r.startAt.position,r.startAt.inclusive):null;return Xu(r.path,r.collectionGroup,e,r.filters,r.limit,n,i)}}function fo(r,e,n){return new cn(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,n,r.startAt,r.endAt)}function ki(r,e){return Na(Mt(r),Mt(e))&&r.limitType===e.limitType}function nh(r){return`${ka(Mt(r))}|lt:${r.limitType}`}function We(r){return`Query(target=${function(n){let i=n.path.canonicalString();return n.collectionGroup!==null&&(i+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(i+=`, filters: [${n.filters.map(s=>th(s)).join(", ")}]`),Di(n.limit)||(i+=", limit: "+n.limit),n.orderBy.length>0&&(i+=`, orderBy: [${n.orderBy.map(s=>function(c){return`${c.field.canonicalString()} (${c.dir})`}(s)).join(", ")}]`),n.startAt&&(i+=", startAt: ",i+=n.startAt.inclusive?"b:":"a:",i+=n.startAt.position.map(s=>sn(s)).join(",")),n.endAt&&(i+=", endAt: ",i+=n.endAt.inclusive?"a:":"b:",i+=n.endAt.position.map(s=>sn(s)).join(",")),`Target(${i})`}(Mt(r))}; limitType=${r.limitType})`}function Ni(r,e){return e.isFoundDocument()&&function(i,s){let a=s.key.path;return i.collectionGroup!==null?s.key.hasCollectionId(i.collectionGroup)&&i.path.isPrefixOf(a):z.isDocumentKey(i.path)?i.path.isEqual(a):i.path.isImmediateParentOf(a)}(r,e)&&function(i,s){for(let a of Qn(i))if(!a.field.isKeyField()&&s.data.field(a.field)===null)return!1;return!0}(r,e)&&function(i,s){for(let a of i.filters)if(!a.matches(s))return!1;return!0}(r,e)&&function(i,s){return!(i.startAt&&!function(c,l,d){let f=Qu(c,l,d);return c.inclusive?f<=0:f<0}(i.startAt,Qn(i),s)||i.endAt&&!function(c,l,d){let f=Qu(c,l,d);return c.inclusive?f>=0:f>0}(i.endAt,Qn(i),s))}(r,e)}function Jm(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function rh(r){return(e,n)=>{let i=!1;for(let s of Qn(r)){let a=Xm(s,e,n);if(a!==0)return a;i=i||s.field.isKeyField()}return 0}}function Xm(r,e,n){let i=r.field.isKeyField()?z.comparator(e.key,n.key):function(a,c,l){let d=c.data.field(a),f=l.data.field(a);return d!==null&&f!==null?rn(d,f):B(42886)}(r.field,e,n);switch(r.dir){case"asc":return i;case"desc":return-1*i;default:return B(19790,{direction:r.dir})}}var ie=class{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){let n=this.mapKeyFn(e),i=this.inner[n];if(i!==void 0){for(let[s,a]of i)if(this.equalsFn(s,e))return a}}has(e){return this.get(e)!==void 0}set(e,n){let i=this.mapKeyFn(e),s=this.inner[i];if(s===void 0)return this.inner[i]=[[e,n]],void this.innerSize++;for(let a=0;a<s.length;a++)if(this.equalsFn(s[a][0],e))return void(s[a]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){let n=this.mapKeyFn(e),i=this.inner[n];if(i===void 0)return!1;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return i.length===1?delete this.inner[n]:i.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Ie(this.inner,(n,i)=>{for(let[s,a]of i)e(s,a)})}isEmpty(){return ql(this.inner)}size(){return this.innerSize}};var Ym=new it(z.comparator);function se(){return Ym}var ih=new it(z.comparator);function Wn(...r){let e=ih;for(let n of r)e=e.insert(n.key,n);return e}function sh(r){let e=ih;return r.forEach((n,i)=>e=e.insert(n,i.overlayedDocument)),e}function Re(){return Jn()}function oh(){return Jn()}function Jn(){return new ie(r=>r.toString(),(r,e)=>r.isEqual(e))}var Zm=new it(z.comparator),tp=new ht(z.comparator);function K(...r){let e=tp;for(let n of r)e=e.add(n);return e}var ep=new ht($);function np(){return ep}function Oa(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:tr(e)?"-0":e}}function ah(r){return{integerValue:""+r}}function rp(r,e){return xm(e)?ah(e):Oa(r,e)}var un=class{constructor(){this._=void 0}};function ip(r,e,n){return r instanceof ln?function(s,a){let c={fields:{[$l]:{stringValue:jl},[Kl]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return a&&Pa(a)&&(a=xi(a)),a&&(c.fields[Gl]=a),{mapValue:c}}(n,e):r instanceof ke?uh(r,e):r instanceof Ne?lh(r,e):function(s,a){let c=ch(s,a),l=Zu(c)+Zu(s.Ee);return eo(c)&&eo(s.Ee)?ah(l):Oa(s.serializer,l)}(r,e)}function sp(r,e,n){return r instanceof ke?uh(r,e):r instanceof Ne?lh(r,e):n}function ch(r,e){return r instanceof hn?function(i){return eo(i)||function(a){return!!a&&"doubleValue"in a}(i)}(e)?e:{integerValue:0}:null}var ln=class extends un{},ke=class extends un{constructor(e){super(),this.elements=e}};function uh(r,e){let n=hh(e);for(let i of r.elements)n.some(s=>zt(s,i))||n.push(i);return{arrayValue:{values:n}}}var Ne=class extends un{constructor(e){super(),this.elements=e}};function lh(r,e){let n=hh(e);for(let i of r.elements)n=n.filter(s=>!zt(s,i));return{arrayValue:{values:n}}}var hn=class extends un{constructor(e,n){super(),this.serializer=e,this.Ee=n}};function Zu(r){return nt(r.integerValue||r.doubleValue)}function hh(r){return Va(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}function op(r,e){return r.field.isEqual(e.field)&&function(i,s){return i instanceof ke&&s instanceof ke||i instanceof Ne&&s instanceof Ne?tn(i.elements,s.elements,zt):i instanceof hn&&s instanceof hn?zt(i.Ee,s.Ee):i instanceof ln&&s instanceof ln}(r.transform,e.transform)}var mo=class{constructor(e,n){this.version=e,this.transformResults=n}},de=class r{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new r}static exists(e){return new r(void 0,e)}static updateTime(e){return new r(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function Hr(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}var dn=class{};function dh(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new ri(r.key,de.none()):new Oe(r.key,r.data,de.none());{let n=r.data,i=Tt.empty(),s=new ht(bt.comparator);for(let a of e.fields)if(!s.has(a)){let c=n.field(a);c===null&&a.length>1&&(a=a.popLast(),c=n.field(a)),c===null?i.delete(a):i.set(a,c),s=s.add(a)}return new qt(r.key,i,new Ct(s.toArray()),de.none())}}function ap(r,e,n){r instanceof Oe?function(s,a,c){let l=s.value.clone(),d=el(s.fieldTransforms,a,c.transformResults);l.setAll(d),a.convertToFoundDocument(c.version,l).setHasCommittedMutations()}(r,e,n):r instanceof qt?function(s,a,c){if(!Hr(s.precondition,a))return void a.convertToUnknownDocument(c.version);let l=el(s.fieldTransforms,a,c.transformResults),d=a.data;d.setAll(fh(s)),d.setAll(l),a.convertToFoundDocument(c.version,d).setHasCommittedMutations()}(r,e,n):function(s,a,c){a.convertToNoDocument(c.version).setHasCommittedMutations()}(0,e,n)}function Xn(r,e,n,i){return r instanceof Oe?function(a,c,l,d){if(!Hr(a.precondition,c))return l;let f=a.value.clone(),g=nl(a.fieldTransforms,d,c);return f.setAll(g),c.convertToFoundDocument(c.version,f).setHasLocalMutations(),null}(r,e,n,i):r instanceof qt?function(a,c,l,d){if(!Hr(a.precondition,c))return l;let f=nl(a.fieldTransforms,d,c),g=c.data;return g.setAll(fh(a)),g.setAll(f),c.convertToFoundDocument(c.version,g).setHasLocalMutations(),l===null?null:l.unionWith(a.fieldMask.fields).unionWith(a.fieldTransforms.map(w=>w.field))}(r,e,n,i):function(a,c,l){return Hr(a.precondition,c)?(c.convertToNoDocument(c.version).setHasLocalMutations(),null):l}(r,e,n)}function cp(r,e){let n=null;for(let i of r.fieldTransforms){let s=e.data.field(i.field),a=ch(i.transform,s||null);a!=null&&(n===null&&(n=Tt.empty()),n.set(i.field,a))}return n||null}function tl(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!function(i,s){return i===void 0&&s===void 0||!(!i||!s)&&tn(i,s,(a,c)=>op(a,c))}(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}var Oe=class extends dn{constructor(e,n,i,s=[]){super(),this.key=e,this.value=n,this.precondition=i,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}},qt=class extends dn{constructor(e,n,i,s,a=[]){super(),this.key=e,this.data=n,this.fieldMask=i,this.precondition=s,this.fieldTransforms=a,this.type=1}getFieldMask(){return this.fieldMask}};function fh(r){let e=new Map;return r.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){let i=r.data.field(n);e.set(n,i)}}),e}function el(r,e,n){let i=new Map;X(r.length===n.length,32656,{Ae:n.length,Re:r.length});for(let s=0;s<n.length;s++){let a=r[s],c=a.transform,l=e.data.field(a.field);i.set(a.field,sp(c,l,n[s]))}return i}function nl(r,e,n){let i=new Map;for(let s of r){let a=s.transform,c=n.data.field(s.field);i.set(s.field,ip(a,c,e))}return i}var ri=class extends dn{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},po=class extends dn{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var go=class{constructor(e,n,i,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=i,this.mutations=s}applyToRemoteDocument(e,n){let i=n.mutationResults;for(let s=0;s<this.mutations.length;s++){let a=this.mutations[s];a.key.isEqual(e.key)&&ap(a,e,i[s])}}applyToLocalView(e,n){for(let i of this.baseMutations)i.key.isEqual(e.key)&&(n=Xn(i,e,n,this.localWriteTime));for(let i of this.mutations)i.key.isEqual(e.key)&&(n=Xn(i,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){let i=oh();return this.mutations.forEach(s=>{let a=e.get(s.key),c=a.overlayedDocument,l=this.applyToLocalView(c,a.mutatedFields);l=n.has(s.key)?null:l;let d=dh(c,l);d!==null&&i.set(s.key,d),c.isValidDocument()||c.convertToNoDocument(j.min())}),i}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),K())}isEqual(e){return this.batchId===e.batchId&&tn(this.mutations,e.mutations,(n,i)=>tl(n,i))&&tn(this.baseMutations,e.baseMutations,(n,i)=>tl(n,i))}},yo=class r{constructor(e,n,i,s){this.batch=e,this.commitVersion=n,this.mutationResults=i,this.docVersions=s}static from(e,n,i){X(e.mutations.length===i.length,58842,{Ve:e.mutations.length,me:i.length});let s=function(){return Zm}(),a=e.mutations;for(let c=0;c<a.length;c++)s=s.insert(a[c].key,i[c].version);return new r(e,n,i,s)}};var _o=class{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var wo=class{constructor(e,n){this.count=e,this.unchangedNames=n}};var ot,H;function up(r){switch(r){case P.OK:return B(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return B(15467,{code:r})}}function mh(r){if(r===void 0)return ee("GRPC error has no .code"),P.UNKNOWN;switch(r){case ot.OK:return P.OK;case ot.CANCELLED:return P.CANCELLED;case ot.UNKNOWN:return P.UNKNOWN;case ot.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case ot.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case ot.INTERNAL:return P.INTERNAL;case ot.UNAVAILABLE:return P.UNAVAILABLE;case ot.UNAUTHENTICATED:return P.UNAUTHENTICATED;case ot.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case ot.NOT_FOUND:return P.NOT_FOUND;case ot.ALREADY_EXISTS:return P.ALREADY_EXISTS;case ot.PERMISSION_DENIED:return P.PERMISSION_DENIED;case ot.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case ot.ABORTED:return P.ABORTED;case ot.OUT_OF_RANGE:return P.OUT_OF_RANGE;case ot.UNIMPLEMENTED:return P.UNIMPLEMENTED;case ot.DATA_LOSS:return P.DATA_LOSS;default:return B(39323,{code:r})}}(H=ot||(ot={}))[H.OK=0]="OK",H[H.CANCELLED=1]="CANCELLED",H[H.UNKNOWN=2]="UNKNOWN",H[H.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",H[H.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",H[H.NOT_FOUND=5]="NOT_FOUND",H[H.ALREADY_EXISTS=6]="ALREADY_EXISTS",H[H.PERMISSION_DENIED=7]="PERMISSION_DENIED",H[H.UNAUTHENTICATED=16]="UNAUTHENTICATED",H[H.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",H[H.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",H[H.ABORTED=10]="ABORTED",H[H.OUT_OF_RANGE=11]="OUT_OF_RANGE",H[H.UNIMPLEMENTED=12]="UNIMPLEMENTED",H[H.INTERNAL=13]="INTERNAL",H[H.UNAVAILABLE=14]="UNAVAILABLE",H[H.DATA_LOSS=15]="DATA_LOSS";var rl=null;var lp=new Zt([4294967295,4294967295],0);function il(r){let e=Sl().encode(r),n=new Ns;return n.update(e),new Uint8Array(n.digest())}function sl(r){let e=new DataView(r.buffer),n=e.getUint32(0,!0),i=e.getUint32(4,!0),s=e.getUint32(8,!0),a=e.getUint32(12,!0);return[new Zt([n,i],0),new Zt([s,a],0)]}var vo=class r{constructor(e,n,i){if(this.bitmap=e,this.padding=n,this.hashCount=i,n<0||n>=8)throw new Ce(`Invalid padding: ${n}`);if(i<0)throw new Ce(`Invalid hash count: ${i}`);if(e.length>0&&this.hashCount===0)throw new Ce(`Invalid hash count: ${i}`);if(e.length===0&&n!==0)throw new Ce(`Invalid padding when bitmap length is 0: ${n}`);this.fe=8*e.length-n,this.ge=Zt.fromNumber(this.fe)}pe(e,n,i){let s=e.add(n.multiply(Zt.fromNumber(i)));return s.compare(lp)===1&&(s=new Zt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;let n=il(e),[i,s]=sl(n);for(let a=0;a<this.hashCount;a++){let c=this.pe(i,s,a);if(!this.ye(c))return!1}return!0}static create(e,n,i){let s=e%8==0?0:8-e%8,a=new Uint8Array(Math.ceil(e/8)),c=new r(a,s,n);return i.forEach(l=>c.insert(l)),c}insert(e){if(this.fe===0)return;let n=il(e),[i,s]=sl(n);for(let a=0;a<this.hashCount;a++){let c=this.pe(i,s,a);this.we(c)}}we(e){let n=Math.floor(e/8),i=e%8;this.bitmap[n]|=1<<i}},Ce=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};var ii=class r{constructor(e,n,i,s,a){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=i,this.documentUpdates=s,this.resolvedLimboDocuments=a}static createSynthesizedRemoteEventForCurrentChange(e,n,i){let s=new Map;return s.set(e,rr.createSynthesizedTargetChangeForCurrentChange(e,n,i)),new r(j.min(),s,new it($),se(),K())}},rr=class r{constructor(e,n,i,s,a){this.resumeToken=e,this.current=n,this.addedDocuments=i,this.modifiedDocuments=s,this.removedDocuments=a}static createSynthesizedTargetChangeForCurrentChange(e,n,i){return new r(i,n,K(),K(),K())}};var Xe=class{constructor(e,n,i,s){this.Se=e,this.removedTargetIds=n,this.key=i,this.be=s}},si=class{constructor(e,n){this.targetId=e,this.De=n}},oi=class{constructor(e,n,i=wt.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=i,this.cause=s}},ai=class{constructor(){this.ve=0,this.Ce=ol(),this.Fe=wt.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=K(),n=K(),i=K();return this.Ce.forEach((s,a)=>{switch(a){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:i=i.add(s);break;default:B(38017,{changeType:a})}}),new rr(this.Fe,this.Me,e,n,i)}ke(){this.xe=!1,this.Ce=ol()}qe(e,n){this.xe=!0,this.Ce=this.Ce.insert(e,n)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,X(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}},Io=class{constructor(e){this.We=e,this.Ge=new Map,this.ze=se(),this.je=$r(),this.Je=$r(),this.He=new it($)}Ye(e){for(let n of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(n,e.be):this.Xe(n,e.key,e.be);for(let n of e.removedTargetIds)this.Xe(n,e.key,e.be)}et(e){this.forEachTarget(e,n=>{let i=this.tt(n);switch(e.state){case 0:this.nt(n)&&i.Be(e.resumeToken);break;case 1:i.Ue(),i.Oe||i.ke(),i.Be(e.resumeToken);break;case 2:i.Ue(),i.Oe||this.removeTarget(n);break;case 3:this.nt(n)&&(i.Ke(),i.Be(e.resumeToken));break;case 4:this.nt(n)&&(this.rt(n),i.Be(e.resumeToken));break;default:B(56790,{state:e.state})}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Ge.forEach((i,s)=>{this.nt(s)&&n(s)})}it(e){let n=e.targetId,i=e.De.count,s=this.st(n);if(s){let a=s.target;if(ho(a))if(i===0){let c=new z(a.path);this.Xe(n,c,Vt.newNoDocument(c,j.min()))}else X(i===1,20013,{expectedCount:i});else{let c=this.ot(n);if(c!==i){let l=this._t(e),d=l?this.ut(l,e,c):1;if(d!==0){this.rt(n);let f=d===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(n,f)}rl?.ct(function(g,w,v,C,V){var N,D,U,M,G,et;let St={localCacheCount:g,existenceFilterCount:w.count,databaseId:v.database,projectId:v.projectId},Z=w.unchangedNames;return Z&&(St.bloomFilter={applied:V===0,hashCount:(N=Z?.hashCount)!==null&&N!==void 0?N:0,bitmapLength:(M=(U=(D=Z?.bits)===null||D===void 0?void 0:D.bitmap)===null||U===void 0?void 0:U.length)!==null&&M!==void 0?M:0,padding:(et=(G=Z?.bits)===null||G===void 0?void 0:G.padding)!==null&&et!==void 0?et:0,mightContain:b=>{var p;return(p=C?.mightContain(b))!==null&&p!==void 0&&p}}),St}(c,e.De,this.We.lt(),l,d))}}}}_t(e){let n=e.De.unchangedNames;if(!n||!n.bits)return null;let{bits:{bitmap:i="",padding:s=0},hashCount:a=0}=n,c,l;try{c=re(i).toUint8Array()}catch(d){if(d instanceof Zr)return ge("Decoding the base64 bloom filter in existence filter failed ("+d.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw d}try{l=new vo(c,s,a)}catch(d){return ge(d instanceof Ce?"BloomFilter error: ":"Applying bloom filter failed: ",d),null}return l.fe===0?null:l}ut(e,n,i){return n.De.count===i-this.ht(e,n.targetId)?0:2}ht(e,n){let i=this.We.getRemoteKeysForTarget(n),s=0;return i.forEach(a=>{let c=this.We.lt(),l=`projects/${c.projectId}/databases/${c.database}/documents/${a.path.canonicalString()}`;e.mightContain(l)||(this.Xe(n,a,null),s++)}),s}Pt(e){let n=new Map;this.Ge.forEach((a,c)=>{let l=this.st(c);if(l){if(a.current&&ho(l.target)){let d=new z(l.target.path);this.Tt(d).has(c)||this.It(c,d)||this.Xe(c,d,Vt.newNoDocument(d,e))}a.Ne&&(n.set(c,a.Le()),a.ke())}});let i=K();this.Je.forEach((a,c)=>{let l=!0;c.forEachWhile(d=>{let f=this.st(d);return!f||f.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(i=i.add(a))}),this.ze.forEach((a,c)=>c.setReadTime(e));let s=new ii(e,n,this.He,this.ze,i);return this.ze=se(),this.je=$r(),this.Je=$r(),this.He=new it($),s}Ze(e,n){if(!this.nt(e))return;let i=this.It(e,n.key)?2:0;this.tt(e).qe(n.key,i),this.ze=this.ze.insert(n.key,n),this.je=this.je.insert(n.key,this.Tt(n.key).add(e)),this.Je=this.Je.insert(n.key,this.dt(n.key).add(e))}Xe(e,n,i){if(!this.nt(e))return;let s=this.tt(e);this.It(e,n)?s.qe(n,1):s.Qe(n),this.Je=this.Je.insert(n,this.dt(n).delete(e)),this.Je=this.Je.insert(n,this.dt(n).add(e)),i&&(this.ze=this.ze.insert(n,i))}removeTarget(e){this.Ge.delete(e)}ot(e){let n=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let n=this.Ge.get(e);return n||(n=new ai,this.Ge.set(e,n)),n}dt(e){let n=this.Je.get(e);return n||(n=new ht($),this.Je=this.Je.insert(e,n)),n}Tt(e){let n=this.je.get(e);return n||(n=new ht($),this.je=this.je.insert(e,n)),n}nt(e){let n=this.st(e)!==null;return n||O("WatchChangeAggregator","Detected inactive target",e),n}st(e){let n=this.Ge.get(e);return n&&n.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new ai),this.We.getRemoteKeysForTarget(e).forEach(n=>{this.Xe(e,n,null)})}It(e,n){return this.We.getRemoteKeysForTarget(e).has(n)}};function $r(){return new it(z.comparator)}function ol(){return new it(z.comparator)}var hp={asc:"ASCENDING",desc:"DESCENDING"},dp={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},fp={and:"AND",or:"OR"},Eo=class{constructor(e,n){this.databaseId=e,this.useProto3Json=n}};function To(r,e){return r.useProto3Json||Di(e)?e:{value:e}}function ci(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function ph(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function mp(r,e){return ci(r,e.toTimestamp())}function Bt(r){return X(!!r,49232),j.fromTimestamp(function(n){let i=ne(n);return new J(i.seconds,i.nanos)}(r))}function La(r,e){return bo(r,e).canonicalString()}function bo(r,e){let n=function(s){return new st(["projects",s.projectId,"databases",s.database])}(r).child("documents");return e===void 0?n:n.child(e)}function gh(r){let e=st.fromString(r);return X(Ih(e),10190,{key:e.toString()}),e}function Ao(r,e){return La(r.databaseId,e.path)}function zs(r,e){let n=gh(e);if(n.get(1)!==r.databaseId.projectId)throw new F(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+r.databaseId.projectId);if(n.get(3)!==r.databaseId.database)throw new F(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+r.databaseId.database);return new z(_h(n))}function yh(r,e){return La(r.databaseId,e)}function pp(r){let e=gh(r);return e.length===4?st.emptyPath():_h(e)}function So(r){return new st(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function _h(r){return X(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function al(r,e,n){return{name:Ao(r,e),fields:n.value.mapValue.fields}}function gp(r,e){let n;if("targetChange"in e){e.targetChange;let i=function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:B(39313,{state:f})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],a=function(f,g){return f.useProto3Json?(X(g===void 0||typeof g=="string",58123),wt.fromBase64String(g||"")):(X(g===void 0||g instanceof Buffer||g instanceof Uint8Array,16193),wt.fromUint8Array(g||new Uint8Array))}(r,e.targetChange.resumeToken),c=e.targetChange.cause,l=c&&function(f){let g=f.code===void 0?P.UNKNOWN:mh(f.code);return new F(g,f.message||"")}(c);n=new oi(i,s,a,l||null)}else if("documentChange"in e){e.documentChange;let i=e.documentChange;i.document,i.document.name,i.document.updateTime;let s=zs(r,i.document.name),a=Bt(i.document.updateTime),c=i.document.createTime?Bt(i.document.createTime):j.min(),l=new Tt({mapValue:{fields:i.document.fields}}),d=Vt.newFoundDocument(s,a,c,l),f=i.targetIds||[],g=i.removedTargetIds||[];n=new Xe(f,g,d.key,d)}else if("documentDelete"in e){e.documentDelete;let i=e.documentDelete;i.document;let s=zs(r,i.document),a=i.readTime?Bt(i.readTime):j.min(),c=Vt.newNoDocument(s,a),l=i.removedTargetIds||[];n=new Xe([],l,c.key,c)}else if("documentRemove"in e){e.documentRemove;let i=e.documentRemove;i.document;let s=zs(r,i.document),a=i.removedTargetIds||[];n=new Xe([],a,s,null)}else{if(!("filter"in e))return B(11601,{At:e});{e.filter;let i=e.filter;i.targetId;let{count:s=0,unchangedNames:a}=i,c=new wo(s,a),l=i.targetId;n=new si(l,c)}}return n}function yp(r,e){let n;if(e instanceof Oe)n={update:al(r,e.key,e.value)};else if(e instanceof ri)n={delete:Ao(r,e.key)};else if(e instanceof qt)n={update:al(r,e.key,e.data),updateMask:Sp(e.fieldMask)};else{if(!(e instanceof po))return B(16599,{Rt:e.type});n={verify:Ao(r,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(i=>function(a,c){let l=c.transform;if(l instanceof ln)return{fieldPath:c.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof ke)return{fieldPath:c.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Ne)return{fieldPath:c.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof hn)return{fieldPath:c.field.canonicalString(),increment:l.Ee};throw B(20930,{transform:c.transform})}(0,i))),e.precondition.isNone||(n.currentDocument=function(s,a){return a.updateTime!==void 0?{updateTime:mp(s,a.updateTime)}:a.exists!==void 0?{exists:a.exists}:B(27497)}(r,e.precondition)),n}function _p(r,e){return r&&r.length>0?(X(e!==void 0,14353),r.map(n=>function(s,a){let c=s.updateTime?Bt(s.updateTime):Bt(a);return c.isEqual(j.min())&&(c=Bt(a)),new mo(c,s.transformResults||[])}(n,e))):[]}function wp(r,e){return{documents:[yh(r,e.path)]}}function vp(r,e){let n={structuredQuery:{}},i=e.path,s;e.collectionGroup!==null?(s=i,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=i.popLast(),n.structuredQuery.from=[{collectionId:i.lastSegment()}]),n.parent=yh(r,s);let a=function(f){if(f.length!==0)return vh(Ut.create(f,"and"))}(e.filters);a&&(n.structuredQuery.where=a);let c=function(f){if(f.length!==0)return f.map(g=>function(v){return{field:He(v.field),direction:Tp(v.dir)}}(g))}(e.orderBy);c&&(n.structuredQuery.orderBy=c);let l=To(r,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(f){return{before:f.inclusive,values:f.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(f){return{before:!f.inclusive,values:f.position}}(e.endAt)),{Vt:n,parent:s}}function Ip(r){let e=pp(r.parent),n=r.structuredQuery,i=n.from?n.from.length:0,s=null;if(i>0){X(i===1,65062);let g=n.from[0];g.allDescendants?s=g.collectionId:e=e.child(g.collectionId)}let a=[];n.where&&(a=function(w){let v=wh(w);return v instanceof Ut&&Yl(v)?v.getFilters():[v]}(n.where));let c=[];n.orderBy&&(c=function(w){return w.map(v=>function(V){return new an(Qe(V.field),function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(V.direction))}(v))}(n.orderBy));let l=null;n.limit&&(l=function(w){let v;return v=typeof w=="object"?w.value:w,Di(v)?null:v}(n.limit));let d=null;n.startAt&&(d=function(w){let v=!!w.before,C=w.values||[];return new on(C,v)}(n.startAt));let f=null;return n.endAt&&(f=function(w){let v=!w.before,C=w.values||[];return new on(C,v)}(n.endAt)),Wm(e,s,c,a,l,"F",d,f)}function Ep(r,e){let n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return B(28987,{purpose:s})}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function wh(r){return r.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":let i=Qe(n.unaryFilter.field);return ut.create(i,"==",{doubleValue:NaN});case"IS_NULL":let s=Qe(n.unaryFilter.field);return ut.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let a=Qe(n.unaryFilter.field);return ut.create(a,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let c=Qe(n.unaryFilter.field);return ut.create(c,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return B(61313);default:return B(60726)}}(r):r.fieldFilter!==void 0?function(n){return ut.create(Qe(n.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return B(58110);default:return B(50506)}}(n.fieldFilter.op),n.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(n){return Ut.create(n.compositeFilter.filters.map(i=>wh(i)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return B(1026)}}(n.compositeFilter.op))}(r):B(30097,{filter:r})}function Tp(r){return hp[r]}function bp(r){return dp[r]}function Ap(r){return fp[r]}function He(r){return{fieldPath:r.canonicalString()}}function Qe(r){return bt.fromServerFormat(r.fieldPath)}function vh(r){return r instanceof ut?function(n){if(n.op==="=="){if(Hu(n.value))return{unaryFilter:{field:He(n.field),op:"IS_NAN"}};if(Wu(n.value))return{unaryFilter:{field:He(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(Hu(n.value))return{unaryFilter:{field:He(n.field),op:"IS_NOT_NAN"}};if(Wu(n.value))return{unaryFilter:{field:He(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:He(n.field),op:bp(n.op),value:n.value}}}(r):r instanceof Ut?function(n){let i=n.getFilters().map(s=>vh(s));return i.length===1?i[0]:{compositeFilter:{op:Ap(n.op),filters:i}}}(r):B(54877,{filter:r})}function Sp(r){let e=[];return r.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function Ih(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}var ir=class r{constructor(e,n,i,s,a=j.min(),c=j.min(),l=wt.EMPTY_BYTE_STRING,d=null){this.target=e,this.targetId=n,this.purpose=i,this.sequenceNumber=s,this.snapshotVersion=a,this.lastLimboFreeSnapshotVersion=c,this.resumeToken=l,this.expectedCount=d}withSequenceNumber(e){return new r(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new r(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new r(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new r(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}};var Ro=class{constructor(e){this.gt=e}};function Rp(r){let e=Ip({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?fo(e,e.limit,"L"):e}var ui=class{constructor(){}bt(e,n){this.Dt(e,n),n.vt()}Dt(e,n){if("nullValue"in e)this.Ct(n,5);else if("booleanValue"in e)this.Ct(n,10),n.Ft(e.booleanValue?1:0);else if("integerValue"in e)this.Ct(n,15),n.Ft(nt(e.integerValue));else if("doubleValue"in e){let i=nt(e.doubleValue);isNaN(i)?this.Ct(n,13):(this.Ct(n,15),tr(i)?n.Ft(0):n.Ft(i))}else if("timestampValue"in e){let i=e.timestampValue;this.Ct(n,20),typeof i=="string"&&(i=ne(i)),n.Mt(`${i.seconds||""}`),n.Ft(i.nanos||0)}else if("stringValue"in e)this.xt(e.stringValue,n),this.Ot(n);else if("bytesValue"in e)this.Ct(n,30),n.Nt(re(e.bytesValue)),this.Ot(n);else if("referenceValue"in e)this.Bt(e.referenceValue,n);else if("geoPointValue"in e){let i=e.geoPointValue;this.Ct(n,45),n.Ft(i.latitude||0),n.Ft(i.longitude||0)}else"mapValue"in e?Ql(e)?this.Ct(n,Number.MAX_SAFE_INTEGER):Hl(e)?this.Lt(e.mapValue,n):(this.kt(e.mapValue,n),this.Ot(n)):"arrayValue"in e?(this.qt(e.arrayValue,n),this.Ot(n)):B(19022,{Qt:e})}xt(e,n){this.Ct(n,25),this.$t(e,n)}$t(e,n){n.Mt(e)}kt(e,n){let i=e.fields||{};this.Ct(n,55);for(let s of Object.keys(i))this.xt(s,n),this.Dt(i[s],n)}Lt(e,n){var i,s;let a=e.fields||{};this.Ct(n,53);let c=nn,l=((s=(i=a[c].arrayValue)===null||i===void 0?void 0:i.values)===null||s===void 0?void 0:s.length)||0;this.Ct(n,15),n.Ft(nt(l)),this.xt(c,n),this.Dt(a[c],n)}qt(e,n){let i=e.values||[];this.Ct(n,50);for(let s of i)this.Dt(s,n)}Bt(e,n){this.Ct(n,37),z.fromName(e).path.forEach(i=>{this.Ct(n,60),this.$t(i,n)})}Ct(e,n){e.Ft(n)}Ot(e){e.Ft(2)}};ui.Ut=new ui;var Co=class{constructor(){this.Dn=new Po}addToCollectionParentIndex(e,n){return this.Dn.add(n),x.resolve()}getCollectionParents(e,n){return x.resolve(this.Dn.getEntries(n))}addFieldIndex(e,n){return x.resolve()}deleteFieldIndex(e,n){return x.resolve()}deleteAllFieldIndexes(e){return x.resolve()}createTargetIndexes(e,n){return x.resolve()}getDocumentsMatchingTarget(e,n){return x.resolve(null)}getIndexType(e,n){return x.resolve(0)}getFieldIndexes(e,n){return x.resolve([])}getNextCollectionGroupToUpdate(e){return x.resolve(null)}getMinOffset(e,n){return x.resolve(Ve.min())}getMinOffsetFromCollectionGroup(e,n){return x.resolve(Ve.min())}updateCollectionGroup(e,n,i){return x.resolve()}updateIndexEntries(e,n){return x.resolve()}},Po=class{constructor(){this.index={}}add(e){let n=e.lastSegment(),i=e.popLast(),s=this.index[n]||new ht(st.comparator),a=!s.has(i);return this.index[n]=s.add(i),a}has(e){let n=e.lastSegment(),i=e.popLast(),s=this.index[n];return s&&s.has(i)}getEntries(e){return(this.index[e]||new ht(st.comparator)).toArray()}};var by=new Uint8Array(0);var cl={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Eh=41943040,Rt=class r{static withCacheSize(e){return new r(e,r.DEFAULT_COLLECTION_PERCENTILE,r.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,i){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=i}};Rt.DEFAULT_COLLECTION_PERCENTILE=10,Rt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Rt.DEFAULT=new Rt(Eh,Rt.DEFAULT_COLLECTION_PERCENTILE,Rt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Rt.DISABLED=new Rt(-1,0,0);var sr=class r{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new r(0)}static ur(){return new r(-1)}};var ul="LruGarbageCollector",Cp=1048576;function ll([r,e],[n,i]){let s=$(r,n);return s===0?$(e,i):s}var Do=class{constructor(e){this.Tr=e,this.buffer=new ht(ll),this.Ir=0}dr(){return++this.Ir}Er(e){let n=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(n);else{let i=this.buffer.last();ll(n,i)<0&&(this.buffer=this.buffer.delete(i).add(n))}}get maxValue(){return this.buffer.last()[0]}},xo=class{constructor(e,n,i){this.garbageCollector=e,this.asyncQueue=n,this.localStore=i,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){O(ul,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){_n(n)?O(ul,"Ignoring IndexedDB error during garbage collection: ",n):await yn(n)}await this.Rr(3e5)})}},Vo=class{constructor(e,n){this.Vr=e,this.params=n}calculateTargetCount(e,n){return this.Vr.mr(e).next(i=>Math.floor(n/100*i))}nthSequenceNumber(e,n){if(n===0)return x.resolve(en.ue);let i=new Do(n);return this.Vr.forEachTarget(e,s=>i.Er(s.sequenceNumber)).next(()=>this.Vr.gr(e,s=>i.Er(s))).next(()=>i.maxValue)}removeTargets(e,n,i){return this.Vr.removeTargets(e,n,i)}removeOrphanedDocuments(e,n){return this.Vr.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(O("LruGarbageCollector","Garbage collection skipped; disabled"),x.resolve(cl)):this.getCacheSize(e).next(i=>i<this.params.cacheSizeCollectionThreshold?(O("LruGarbageCollector",`Garbage collection skipped; Cache size ${i} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),cl):this.pr(e,n))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,n){let i,s,a,c,l,d,f,g=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(w=>(w>this.params.maximumSequenceNumbersToCollect?(O("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${w}`),s=this.params.maximumSequenceNumbersToCollect):s=w,c=Date.now(),this.nthSequenceNumber(e,s))).next(w=>(i=w,l=Date.now(),this.removeTargets(e,i,n))).next(w=>(a=w,d=Date.now(),this.removeOrphanedDocuments(e,i))).next(w=>(f=Date.now(),Ke()<=W.DEBUG&&O("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${c-g}ms
	Determined least recently used ${s} in `+(l-c)+`ms
	Removed ${a} targets in `+(d-l)+`ms
	Removed ${w} documents in `+(f-d)+`ms
Total Duration: ${f-g}ms`),x.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:a,documentsRemoved:w})))}};function Pp(r,e){return new Vo(r,e)}var ko=class{constructor(){this.changes=new ie(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,Vt.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();let i=this.changes.get(n);return i!==void 0?x.resolve(i):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};var No=class{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}};var Oo=class{constructor(e,n,i,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=i,this.indexManager=s}getDocument(e,n){let i=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(i=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(i!==null&&Xn(i.mutation,s,Ct.empty(),J.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(i=>this.getLocalViewOfDocuments(e,i,K()).next(()=>i))}getLocalViewOfDocuments(e,n,i=K()){let s=Re();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,i).next(a=>{let c=Wn();return a.forEach((l,d)=>{c=c.insert(l,d.overlayedDocument)}),c}))}getOverlayedDocuments(e,n){let i=Re();return this.populateOverlays(e,i,n).next(()=>this.computeViews(e,n,i,K()))}populateOverlays(e,n,i){let s=[];return i.forEach(a=>{n.has(a)||s.push(a)}),this.documentOverlayCache.getOverlays(e,s).next(a=>{a.forEach((c,l)=>{n.set(c,l)})})}computeViews(e,n,i,s){let a=se(),c=Jn(),l=function(){return Jn()}();return n.forEach((d,f)=>{let g=i.get(f.key);s.has(f.key)&&(g===void 0||g.mutation instanceof qt)?a=a.insert(f.key,f):g!==void 0?(c.set(f.key,g.mutation.getFieldMask()),Xn(g.mutation,f,g.mutation.getFieldMask(),J.now())):c.set(f.key,Ct.empty())}),this.recalculateAndSaveOverlays(e,a).next(d=>(d.forEach((f,g)=>c.set(f,g)),n.forEach((f,g)=>{var w;return l.set(f,new No(g,(w=c.get(f))!==null&&w!==void 0?w:null))}),l))}recalculateAndSaveOverlays(e,n){let i=Jn(),s=new it((c,l)=>c-l),a=K();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(c=>{for(let l of c)l.keys().forEach(d=>{let f=n.get(d);if(f===null)return;let g=i.get(d)||Ct.empty();g=l.applyToLocalView(f,g),i.set(d,g);let w=(s.get(l.batchId)||K()).add(d);s=s.insert(l.batchId,w)})}).next(()=>{let c=[],l=s.getReverseIterator();for(;l.hasNext();){let d=l.getNext(),f=d.key,g=d.value,w=oh();g.forEach(v=>{if(!a.has(v)){let C=dh(n.get(v),i.get(v));C!==null&&w.set(v,C),a=a.add(v)}}),c.push(this.documentOverlayCache.saveOverlays(e,f,w))}return x.waitFor(c)}).next(()=>i)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(i=>this.recalculateAndSaveOverlays(e,i))}getDocumentsMatchingQuery(e,n,i,s){return function(c){return z.isDocumentKey(c.path)&&c.collectionGroup===null&&c.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):Hm(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,i,s):this.getDocumentsMatchingCollectionQuery(e,n,i,s)}getNextDocuments(e,n,i,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,i,s).next(a=>{let c=s-a.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,i.largestBatchId,s-a.size):x.resolve(Re()),l=Zn,d=a;return c.next(f=>x.forEach(f,(g,w)=>(l<w.largestBatchId&&(l=w.largestBatchId),a.get(g)?x.resolve():this.remoteDocumentCache.getEntry(e,g).next(v=>{d=d.insert(g,v)}))).next(()=>this.populateOverlays(e,f,a)).next(()=>this.computeViews(e,d,f,K())).next(g=>({batchId:l,changes:sh(g)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new z(n)).next(i=>{let s=Wn();return i.isFoundDocument()&&(s=s.insert(i.key,i)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,i,s){let a=n.collectionGroup,c=Wn();return this.indexManager.getCollectionParents(e,a).next(l=>x.forEach(l,d=>{let f=function(w,v){return new cn(v,null,w.explicitOrderBy.slice(),w.filters.slice(),w.limit,w.limitType,w.startAt,w.endAt)}(n,d.child(a));return this.getDocumentsMatchingCollectionQuery(e,f,i,s).next(g=>{g.forEach((w,v)=>{c=c.insert(w,v)})})}).next(()=>c))}getDocumentsMatchingCollectionQuery(e,n,i,s){let a;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,i.largestBatchId).next(c=>(a=c,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,i,a,s))).next(c=>{a.forEach((d,f)=>{let g=f.getKey();c.get(g)===null&&(c=c.insert(g,Vt.newInvalidDocument(g)))});let l=Wn();return c.forEach((d,f)=>{let g=a.get(d);g!==void 0&&Xn(g.mutation,f,Ct.empty(),J.now()),Ni(n,f)&&(l=l.insert(d,f))}),l})}};var Lo=class{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,n){return x.resolve(this.Br.get(n))}saveBundleMetadata(e,n){return this.Br.set(n.id,function(s){return{id:s.id,version:s.version,createTime:Bt(s.createTime)}}(n)),x.resolve()}getNamedQuery(e,n){return x.resolve(this.Lr.get(n))}saveNamedQuery(e,n){return this.Lr.set(n.name,function(s){return{name:s.name,query:Rp(s.bundledQuery),readTime:Bt(s.readTime)}}(n)),x.resolve()}};var Fo=class{constructor(){this.overlays=new it(z.comparator),this.kr=new Map}getOverlay(e,n){return x.resolve(this.overlays.get(n))}getOverlays(e,n){let i=Re();return x.forEach(n,s=>this.getOverlay(e,s).next(a=>{a!==null&&i.set(s,a)})).next(()=>i)}saveOverlays(e,n,i){return i.forEach((s,a)=>{this.wt(e,n,a)}),x.resolve()}removeOverlaysForBatchId(e,n,i){let s=this.kr.get(i);return s!==void 0&&(s.forEach(a=>this.overlays=this.overlays.remove(a)),this.kr.delete(i)),x.resolve()}getOverlaysForCollection(e,n,i){let s=Re(),a=n.length+1,c=new z(n.child("")),l=this.overlays.getIteratorFrom(c);for(;l.hasNext();){let d=l.getNext().value,f=d.getKey();if(!n.isPrefixOf(f.path))break;f.path.length===a&&d.largestBatchId>i&&s.set(d.getKey(),d)}return x.resolve(s)}getOverlaysForCollectionGroup(e,n,i,s){let a=new it((f,g)=>f-g),c=this.overlays.getIterator();for(;c.hasNext();){let f=c.getNext().value;if(f.getKey().getCollectionGroup()===n&&f.largestBatchId>i){let g=a.get(f.largestBatchId);g===null&&(g=Re(),a=a.insert(f.largestBatchId,g)),g.set(f.getKey(),f)}}let l=Re(),d=a.getIterator();for(;d.hasNext()&&(d.getNext().value.forEach((f,g)=>l.set(f,g)),!(l.size()>=s)););return x.resolve(l)}wt(e,n,i){let s=this.overlays.get(i.key);if(s!==null){let c=this.kr.get(s.largestBatchId).delete(i.key);this.kr.set(s.largestBatchId,c)}this.overlays=this.overlays.insert(i.key,new _o(n,i));let a=this.kr.get(n);a===void 0&&(a=K(),this.kr.set(n,a)),this.kr.set(n,a.add(i.key))}};var Mo=class{constructor(){this.sessionToken=wt.EMPTY_BYTE_STRING}getSessionToken(e){return x.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,x.resolve()}};var or=class{constructor(){this.qr=new ht(at.Qr),this.$r=new ht(at.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,n){let i=new at(e,n);this.qr=this.qr.add(i),this.$r=this.$r.add(i)}Kr(e,n){e.forEach(i=>this.addReference(i,n))}removeReference(e,n){this.Wr(new at(e,n))}Gr(e,n){e.forEach(i=>this.removeReference(i,n))}zr(e){let n=new z(new st([])),i=new at(n,e),s=new at(n,e+1),a=[];return this.$r.forEachInRange([i,s],c=>{this.Wr(c),a.push(c.key)}),a}jr(){this.qr.forEach(e=>this.Wr(e))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){let n=new z(new st([])),i=new at(n,e),s=new at(n,e+1),a=K();return this.$r.forEachInRange([i,s],c=>{a=a.add(c.key)}),a}containsKey(e){let n=new at(e,0),i=this.qr.firstAfterOrEqual(n);return i!==null&&e.isEqual(i.key)}},at=class{constructor(e,n){this.key=e,this.Hr=n}static Qr(e,n){return z.comparator(e.key,n.key)||$(e.Hr,n.Hr)}static Ur(e,n){return $(e.Hr,n.Hr)||z.comparator(e.key,n.key)}};var Bo=class{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.er=1,this.Yr=new ht(at.Qr)}checkEmpty(e){return x.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,i,s){let a=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let c=new go(a,n,i,s);this.mutationQueue.push(c);for(let l of s)this.Yr=this.Yr.add(new at(l.key,a)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return x.resolve(c)}lookupMutationBatch(e,n){return x.resolve(this.Zr(n))}getNextMutationBatchAfterBatchId(e,n){let i=n+1,s=this.Xr(i),a=s<0?0:s;return x.resolve(this.mutationQueue.length>a?this.mutationQueue[a]:null)}getHighestUnacknowledgedBatchId(){return x.resolve(this.mutationQueue.length===0?Ca:this.er-1)}getAllMutationBatches(e){return x.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){let i=new at(n,0),s=new at(n,Number.POSITIVE_INFINITY),a=[];return this.Yr.forEachInRange([i,s],c=>{let l=this.Zr(c.Hr);a.push(l)}),x.resolve(a)}getAllMutationBatchesAffectingDocumentKeys(e,n){let i=new ht($);return n.forEach(s=>{let a=new at(s,0),c=new at(s,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([a,c],l=>{i=i.add(l.Hr)})}),x.resolve(this.ei(i))}getAllMutationBatchesAffectingQuery(e,n){let i=n.path,s=i.length+1,a=i;z.isDocumentKey(a)||(a=a.child(""));let c=new at(new z(a),0),l=new ht($);return this.Yr.forEachWhile(d=>{let f=d.key.path;return!!i.isPrefixOf(f)&&(f.length===s&&(l=l.add(d.Hr)),!0)},c),x.resolve(this.ei(l))}ei(e){let n=[];return e.forEach(i=>{let s=this.Zr(i);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){X(this.ti(n.batchId,"removed")===0,55003),this.mutationQueue.shift();let i=this.Yr;return x.forEach(n.mutations,s=>{let a=new at(s.key,n.batchId);return i=i.delete(a),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Yr=i})}rr(e){}containsKey(e,n){let i=new at(n,0),s=this.Yr.firstAfterOrEqual(i);return x.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,x.resolve()}ti(e,n){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){let n=this.Xr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}};var zo=class{constructor(e){this.ni=e,this.docs=function(){return new it(z.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){let i=n.key,s=this.docs.get(i),a=s?s.size:0,c=this.ni(n);return this.docs=this.docs.insert(i,{document:n.mutableCopy(),size:c}),this.size+=c-a,this.indexManager.addToCollectionParentIndex(e,i.path.popLast())}removeEntry(e){let n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){let i=this.docs.get(n);return x.resolve(i?i.document.mutableCopy():Vt.newInvalidDocument(n))}getEntries(e,n){let i=se();return n.forEach(s=>{let a=this.docs.get(s);i=i.insert(s,a?a.document.mutableCopy():Vt.newInvalidDocument(s))}),x.resolve(i)}getDocumentsMatchingQuery(e,n,i,s){let a=se(),c=n.path,l=new z(c.child("__id-9223372036854775808__")),d=this.docs.getIteratorFrom(l);for(;d.hasNext();){let{key:f,value:{document:g}}=d.getNext();if(!c.isPrefixOf(f.path))break;f.path.length>c.length+1||Cm(Rm(g),i)<=0||(s.has(g.key)||Ni(n,g))&&(a=a.insert(g.key,g.mutableCopy()))}return x.resolve(a)}getAllFromCollectionGroup(e,n,i,s){B(9500)}ri(e,n){return x.forEach(this.docs,i=>n(i))}newChangeBuffer(e){return new Uo(this)}getSize(e){return x.resolve(this.size)}},Uo=class extends ko{constructor(e){super(),this.Or=e}applyChanges(e){let n=[];return this.changes.forEach((i,s)=>{s.isValidDocument()?n.push(this.Or.addEntry(e,s)):this.Or.removeEntry(i)}),x.waitFor(n)}getFromCache(e,n){return this.Or.getEntry(e,n)}getAllFromCache(e,n){return this.Or.getEntries(e,n)}};var qo=class{constructor(e){this.persistence=e,this.ii=new ie(n=>ka(n),Na),this.lastRemoteSnapshotVersion=j.min(),this.highestTargetId=0,this.si=0,this.oi=new or,this.targetCount=0,this._i=sr.ar()}forEachTarget(e,n){return this.ii.forEach((i,s)=>n(s)),x.resolve()}getLastRemoteSnapshotVersion(e){return x.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return x.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),x.resolve(this.highestTargetId)}setTargetsMetadata(e,n,i){return i&&(this.lastRemoteSnapshotVersion=i),n>this.si&&(this.si=n),x.resolve()}hr(e){this.ii.set(e.target,e);let n=e.targetId;n>this.highestTargetId&&(this._i=new sr(n),this.highestTargetId=n),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,n){return this.hr(n),this.targetCount+=1,x.resolve()}updateTargetData(e,n){return this.hr(n),x.resolve()}removeTargetData(e,n){return this.ii.delete(n.target),this.oi.zr(n.targetId),this.targetCount-=1,x.resolve()}removeTargets(e,n,i){let s=0,a=[];return this.ii.forEach((c,l)=>{l.sequenceNumber<=n&&i.get(l.targetId)===null&&(this.ii.delete(c),a.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),x.waitFor(a).next(()=>s)}getTargetCount(e){return x.resolve(this.targetCount)}getTargetData(e,n){let i=this.ii.get(n)||null;return x.resolve(i)}addMatchingKeys(e,n,i){return this.oi.Kr(n,i),x.resolve()}removeMatchingKeys(e,n,i){this.oi.Gr(n,i);let s=this.persistence.referenceDelegate,a=[];return s&&n.forEach(c=>{a.push(s.markPotentiallyOrphaned(e,c))}),x.waitFor(a)}removeMatchingKeysForTargetId(e,n){return this.oi.zr(n),x.resolve()}getMatchingKeysForTargetId(e,n){let i=this.oi.Jr(n);return x.resolve(i)}containsKey(e,n){return x.resolve(this.oi.containsKey(n))}};var li=class{constructor(e,n){this.ai={},this.overlays={},this.ui=new en(0),this.ci=!1,this.ci=!0,this.li=new Mo,this.referenceDelegate=e(this),this.hi=new qo(this),this.indexManager=new Co,this.remoteDocumentCache=function(s){return new zo(s)}(i=>this.referenceDelegate.Pi(i)),this.serializer=new Ro(n),this.Ti=new Lo(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new Fo,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let i=this.ai[e.toKey()];return i||(i=new Bo(n,this.referenceDelegate),this.ai[e.toKey()]=i),i}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,n,i){O("MemoryPersistence","Starting transaction:",e);let s=new jo(this.ui.next());return this.referenceDelegate.Ii(),i(s).next(a=>this.referenceDelegate.di(s).next(()=>a)).toPromise().then(a=>(s.raiseOnCommittedEvent(),a))}Ei(e,n){return x.or(Object.values(this.ai).map(i=>()=>i.containsKey(e,n)))}},jo=class extends Ys{constructor(e){super(),this.currentSequenceNumber=e}},$o=class r{constructor(e){this.persistence=e,this.Ai=new or,this.Ri=null}static Vi(e){return new r(e)}get mi(){if(this.Ri)return this.Ri;throw B(60996)}addReference(e,n,i){return this.Ai.addReference(i,n),this.mi.delete(i.toString()),x.resolve()}removeReference(e,n,i){return this.Ai.removeReference(i,n),this.mi.add(i.toString()),x.resolve()}markPotentiallyOrphaned(e,n){return this.mi.add(n.toString()),x.resolve()}removeTarget(e,n){this.Ai.zr(n.targetId).forEach(s=>this.mi.add(s.toString()));let i=this.persistence.getTargetCache();return i.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(a=>this.mi.add(a.toString()))}).next(()=>i.removeTargetData(e,n))}Ii(){this.Ri=new Set}di(e){let n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return x.forEach(this.mi,i=>{let s=z.fromPath(i);return this.fi(e,s).next(a=>{a||n.removeEntry(s,j.min())})}).next(()=>(this.Ri=null,n.apply(e)))}updateLimboDocument(e,n){return this.fi(e,n).next(i=>{i?this.mi.delete(n.toString()):this.mi.add(n.toString())})}Pi(e){return 0}fi(e,n){return x.or([()=>x.resolve(this.Ai.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ei(e,n)])}},hi=class r{constructor(e,n){this.persistence=e,this.gi=new ie(i=>Vm(i.path),(i,s)=>i.isEqual(s)),this.garbageCollector=Pp(this,n)}static Vi(e,n){return new r(e,n)}Ii(){}di(e){return x.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}mr(e){let n=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next(i=>n.next(s=>i+s))}yr(e){let n=0;return this.gr(e,i=>{n++}).next(()=>n)}gr(e,n){return x.forEach(this.gi,(i,s)=>this.Sr(e,i,s).next(a=>a?x.resolve():n(s)))}removeTargets(e,n,i){return this.persistence.getTargetCache().removeTargets(e,n,i)}removeOrphanedDocuments(e,n){let i=0,s=this.persistence.getRemoteDocumentCache(),a=s.newChangeBuffer();return s.ri(e,c=>this.Sr(e,c,n).next(l=>{l||(i++,a.removeEntry(c,j.min()))})).next(()=>a.apply(e)).next(()=>i)}markPotentiallyOrphaned(e,n){return this.gi.set(n,e.currentSequenceNumber),x.resolve()}removeTarget(e,n){let i=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,i)}addReference(e,n,i){return this.gi.set(i,e.currentSequenceNumber),x.resolve()}removeReference(e,n,i){return this.gi.set(i,e.currentSequenceNumber),x.resolve()}updateLimboDocument(e,n){return this.gi.set(n,e.currentSequenceNumber),x.resolve()}Pi(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=Kr(e.data.value)),n}Sr(e,n,i){return x.or([()=>this.persistence.Ei(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{let s=this.gi.get(n);return x.resolve(s!==void 0&&s>i)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}};var Go=class r{constructor(e,n,i,s){this.targetId=e,this.fromCache=n,this.Is=i,this.ds=s}static Es(e,n){let i=K(),s=K();for(let a of n.docChanges)switch(a.type){case 0:i=i.add(a.doc.key);break;case 1:s=s.add(a.doc.key)}return new r(e,n.fromCache,i,s)}};var Ko=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}};var Wo=class{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return mu()?8:Dm(fu())>0?6:4}()}initialize(e,n){this.gs=e,this.indexManager=n,this.As=!0}getDocumentsMatchingQuery(e,n,i,s){let a={result:null};return this.ps(e,n).next(c=>{a.result=c}).next(()=>{if(!a.result)return this.ys(e,n,s,i).next(c=>{a.result=c})}).next(()=>{if(a.result)return;let c=new Ko;return this.ws(e,n,c).next(l=>{if(a.result=l,this.Rs)return this.Ss(e,n,c,l.size)})}).next(()=>a.result)}Ss(e,n,i,s){return i.documentReadCount<this.Vs?(Ke()<=W.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",We(n),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),x.resolve()):(Ke()<=W.DEBUG&&O("QueryEngine","Query:",We(n),"scans",i.documentReadCount,"local documents and returns",s,"documents as results."),i.documentReadCount>this.fs*s?(Ke()<=W.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",We(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Mt(n))):x.resolve())}ps(e,n){if(Yu(n))return x.resolve(null);let i=Mt(n);return this.indexManager.getIndexType(e,i).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=fo(n,null,"F"),i=Mt(n)),this.indexManager.getDocumentsMatchingTarget(e,i).next(a=>{let c=K(...a);return this.gs.getDocuments(e,c).next(l=>this.indexManager.getMinOffset(e,i).next(d=>{let f=this.bs(n,l);return this.Ds(n,f,c,d.readTime)?this.ps(e,fo(n,null,"F")):this.vs(e,f,n,d)}))})))}ys(e,n,i,s){return Yu(n)||s.isEqual(j.min())?x.resolve(null):this.gs.getDocuments(e,i).next(a=>{let c=this.bs(n,a);return this.Ds(n,c,i,s)?x.resolve(null):(Ke()<=W.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),We(n)),this.vs(e,c,n,Sm(s,Zn)).next(l=>l))})}bs(e,n){let i=new ht(rh(e));return n.forEach((s,a)=>{Ni(e,a)&&(i=i.add(a))}),i}Ds(e,n,i,s){if(e.limit===null)return!1;if(i.size!==n.size)return!0;let a=e.limitType==="F"?n.last():n.first();return!!a&&(a.hasPendingWrites||a.version.compareTo(s)>0)}ws(e,n,i){return Ke()<=W.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",We(n)),this.gs.getDocumentsMatchingQuery(e,n,Ve.min(),i)}vs(e,n,i,s){return this.gs.getDocumentsMatchingQuery(e,i,s).next(a=>(n.forEach(c=>{a=a.insert(c.key,c)}),a))}};var Fa="LocalStore",Dp=3e8,Ho=class{constructor(e,n,i,s){this.persistence=e,this.Cs=n,this.serializer=s,this.Fs=new it($),this.Ms=new ie(a=>ka(a),Na),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(i)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Oo(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.Fs))}};function xp(r,e,n,i){return new Ho(r,e,n,i)}async function Th(r,e){let n=q(r);return await n.persistence.runTransaction("Handle user change","readonly",i=>{let s;return n.mutationQueue.getAllMutationBatches(i).next(a=>(s=a,n.Ns(e),n.mutationQueue.getAllMutationBatches(i))).next(a=>{let c=[],l=[],d=K();for(let f of s){c.push(f.batchId);for(let g of f.mutations)d=d.add(g.key)}for(let f of a){l.push(f.batchId);for(let g of f.mutations)d=d.add(g.key)}return n.localDocuments.getDocuments(i,d).next(f=>({Bs:f,removedBatchIds:c,addedBatchIds:l}))})})}function Vp(r,e){let n=q(r);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",i=>{let s=e.batch.keys(),a=n.Os.newChangeBuffer({trackRemovals:!0});return function(l,d,f,g){let w=f.batch,v=w.keys(),C=x.resolve();return v.forEach(V=>{C=C.next(()=>g.getEntry(d,V)).next(N=>{let D=f.docVersions.get(V);X(D!==null,48541),N.version.compareTo(D)<0&&(w.applyToRemoteDocument(N,f),N.isValidDocument()&&(N.setReadTime(f.commitVersion),g.addEntry(N)))})}),C.next(()=>l.mutationQueue.removeMutationBatch(d,w))}(n,i,e,a).next(()=>a.apply(i)).next(()=>n.mutationQueue.performConsistencyCheck(i)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(i,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(i,function(l){let d=K();for(let f=0;f<l.mutationResults.length;++f)l.mutationResults[f].transformResults.length>0&&(d=d.add(l.batch.mutations[f].key));return d}(e))).next(()=>n.localDocuments.getDocuments(i,s))})}function bh(r){let e=q(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.hi.getLastRemoteSnapshotVersion(n))}function kp(r,e){let n=q(r),i=e.snapshotVersion,s=n.Fs;return n.persistence.runTransaction("Apply remote event","readwrite-primary",a=>{let c=n.Os.newChangeBuffer({trackRemovals:!0});s=n.Fs;let l=[];e.targetChanges.forEach((g,w)=>{let v=s.get(w);if(!v)return;l.push(n.hi.removeMatchingKeys(a,g.removedDocuments,w).next(()=>n.hi.addMatchingKeys(a,g.addedDocuments,w)));let C=v.withSequenceNumber(a.currentSequenceNumber);e.targetMismatches.get(w)!==null?C=C.withResumeToken(wt.EMPTY_BYTE_STRING,j.min()).withLastLimboFreeSnapshotVersion(j.min()):g.resumeToken.approximateByteSize()>0&&(C=C.withResumeToken(g.resumeToken,i)),s=s.insert(w,C),function(N,D,U){return N.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=Dp?!0:U.addedDocuments.size+U.modifiedDocuments.size+U.removedDocuments.size>0}(v,C,g)&&l.push(n.hi.updateTargetData(a,C))});let d=se(),f=K();if(e.documentUpdates.forEach(g=>{e.resolvedLimboDocuments.has(g)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(a,g))}),l.push(Np(a,c,e.documentUpdates).next(g=>{d=g.Ls,f=g.ks})),!i.isEqual(j.min())){let g=n.hi.getLastRemoteSnapshotVersion(a).next(w=>n.hi.setTargetsMetadata(a,a.currentSequenceNumber,i));l.push(g)}return x.waitFor(l).next(()=>c.apply(a)).next(()=>n.localDocuments.getLocalViewOfDocuments(a,d,f)).next(()=>d)}).then(a=>(n.Fs=s,a))}function Np(r,e,n){let i=K(),s=K();return n.forEach(a=>i=i.add(a)),e.getEntries(r,i).next(a=>{let c=se();return n.forEach((l,d)=>{let f=a.get(l);d.isFoundDocument()!==f.isFoundDocument()&&(s=s.add(l)),d.isNoDocument()&&d.version.isEqual(j.min())?(e.removeEntry(l,d.readTime),c=c.insert(l,d)):!f.isValidDocument()||d.version.compareTo(f.version)>0||d.version.compareTo(f.version)===0&&f.hasPendingWrites?(e.addEntry(d),c=c.insert(l,d)):O(Fa,"Ignoring outdated watch update for ",l,". Current version:",f.version," Watch version:",d.version)}),{Ls:c,ks:s}})}function Op(r,e){let n=q(r);return n.persistence.runTransaction("Get next mutation batch","readonly",i=>(e===void 0&&(e=Ca),n.mutationQueue.getNextMutationBatchAfterBatchId(i,e)))}function Lp(r,e){let n=q(r);return n.persistence.runTransaction("Allocate target","readwrite",i=>{let s;return n.hi.getTargetData(i,e).next(a=>a?(s=a,x.resolve(s)):n.hi.allocateTargetId(i).next(c=>(s=new ir(e,c,"TargetPurposeListen",i.currentSequenceNumber),n.hi.addTargetData(i,s).next(()=>s))))}).then(i=>{let s=n.Fs.get(i.targetId);return(s===null||i.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.Fs=n.Fs.insert(i.targetId,i),n.Ms.set(e,i.targetId)),i})}async function Qo(r,e,n){let i=q(r),s=i.Fs.get(e),a=n?"readwrite":"readwrite-primary";try{n||await i.persistence.runTransaction("Release target",a,c=>i.persistence.referenceDelegate.removeTarget(c,s))}catch(c){if(!_n(c))throw c;O(Fa,`Failed to update sequence numbers for target ${e}: ${c}`)}i.Fs=i.Fs.remove(e),i.Ms.delete(s.target)}function hl(r,e,n){let i=q(r),s=j.min(),a=K();return i.persistence.runTransaction("Execute query","readwrite",c=>function(d,f,g){let w=q(d),v=w.Ms.get(g);return v!==void 0?x.resolve(w.Fs.get(v)):w.hi.getTargetData(f,g)}(i,c,Mt(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,i.hi.getMatchingKeysForTargetId(c,l.targetId).next(d=>{a=d})}).next(()=>i.Cs.getDocumentsMatchingQuery(c,e,n?s:j.min(),n?a:K())).next(l=>(Fp(i,Jm(e),l),{documents:l,qs:a})))}function Fp(r,e,n){let i=r.xs.get(e)||j.min();n.forEach((s,a)=>{a.readTime.compareTo(i)>0&&(i=a.readTime)}),r.xs.set(e,i)}var di=class{constructor(){this.activeTargetIds=np()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}};var Jo=class{constructor(){this.Fo=new di,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,i){}addLocalQueryTarget(e,n=!0){return n&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,n,i){this.Mo[e]=n}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new di,Promise.resolve()}handleUserChange(e,n,i){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};var Xo=class{xo(e){}shutdown(){}};var dl="ConnectivityMonitor",fi=class{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){O(dl,"Network connectivity changed: AVAILABLE");for(let e of this.ko)e(0)}Lo(){O(dl,"Network connectivity changed: UNAVAILABLE");for(let e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var Gr=null;function Yo(){return Gr===null?Gr=function(){return 268435456+Math.round(2147483648*Math.random())}():Gr++,"0x"+Gr.toString(16)}var Us="RestConnection",Mp={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"},Zo=class{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let n=e.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.$o=n+"://"+e.host,this.Uo=`projects/${i}/databases/${s}`,this.Ko=this.databaseId.database===ti?`project_id=${i}`:`project_id=${i}&database_id=${s}`}Wo(e,n,i,s,a){let c=Yo(),l=this.Go(e,n.toUriEncodedString());O(Us,`Sending RPC '${e}' ${c}:`,l,i);let d={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(d,s,a);let{host:f}=new URL(l),g=Fr(f);return this.jo(e,l,d,i,g).then(w=>(O(Us,`Received RPC '${e}' ${c}: `,w),w),w=>{throw ge(Us,`RPC '${e}' ${c} failed with error: `,w,"url: ",l,"request:",i),w})}Jo(e,n,i,s,a,c){return this.Wo(e,n,i,s,a)}zo(e,n,i){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+gn}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((s,a)=>e[a]=s),i&&i.headers.forEach((s,a)=>e[a]=s)}Go(e,n){let i=Mp[e];return`${this.$o}/v1/${n}:${i}`}terminate(){}};var ta=class{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}};var _t="WebChannelConnection",ea=class extends Zo{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,n,i,s,a){let c=Yo();return new Promise((l,d)=>{let f=new Os;f.setWithCredentials(!0),f.listenOnce(Ls.COMPLETE,()=>{try{switch(f.getLastErrorCode()){case Kn.NO_ERROR:let w=f.getResponseJson();O(_t,`XHR for RPC '${e}' ${c} received:`,JSON.stringify(w)),l(w);break;case Kn.TIMEOUT:O(_t,`RPC '${e}' ${c} timed out`),d(new F(P.DEADLINE_EXCEEDED,"Request time out"));break;case Kn.HTTP_ERROR:let v=f.getStatus();if(O(_t,`RPC '${e}' ${c} failed with status:`,v,"response text:",f.getResponseText()),v>0){let C=f.getResponseJson();Array.isArray(C)&&(C=C[0]);let V=C?.error;if(V&&V.status&&V.message){let N=function(U){let M=U.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(M)>=0?M:P.UNKNOWN}(V.status);d(new F(N,V.message))}else d(new F(P.UNKNOWN,"Server responded with status "+f.getStatus()))}else d(new F(P.UNAVAILABLE,"Connection failed."));break;default:B(9055,{c_:e,streamId:c,l_:f.getLastErrorCode(),h_:f.getLastError()})}}finally{O(_t,`RPC '${e}' ${c} completed.`)}});let g=JSON.stringify(s);O(_t,`RPC '${e}' ${c} sending request:`,s),f.send(n,"POST",g,i,15)})}P_(e,n,i){let s=Yo(),a=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],c=Bs(),l=Ms(),d={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(d.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(d.useFetchStreams=!0),this.zo(d.initMessageHeaders,n,i),d.encodeInitMessageHeaders=!0;let g=a.join("");O(_t,`Creating RPC '${e}' stream ${s}: ${g}`,d);let w=c.createWebChannel(g,d);this.T_(w);let v=!1,C=!1,V=new ta({Ho:D=>{C?O(_t,`Not sending because RPC '${e}' stream ${s} is closed:`,D):(v||(O(_t,`Opening RPC '${e}' stream ${s} transport.`),w.open(),v=!0),O(_t,`RPC '${e}' stream ${s} sending:`,D),w.send(D))},Yo:()=>w.close()}),N=(D,U,M)=>{D.listen(U,G=>{try{M(G)}catch(et){setTimeout(()=>{throw et},0)}})};return N(w,Ge.EventType.OPEN,()=>{C||(O(_t,`RPC '${e}' stream ${s} transport opened.`),V.s_())}),N(w,Ge.EventType.CLOSE,()=>{C||(C=!0,O(_t,`RPC '${e}' stream ${s} transport closed`),V.__(),this.I_(w))}),N(w,Ge.EventType.ERROR,D=>{C||(C=!0,ge(_t,`RPC '${e}' stream ${s} transport errored. Name:`,D.name,"Message:",D.message),V.__(new F(P.UNAVAILABLE,"The operation could not be completed")))}),N(w,Ge.EventType.MESSAGE,D=>{var U;if(!C){let M=D.data[0];X(!!M,16349);let G=M,et=G?.error||((U=G[0])===null||U===void 0?void 0:U.error);if(et){O(_t,`RPC '${e}' stream ${s} received error:`,et);let St=et.status,Z=function(_){let I=ot[_];if(I!==void 0)return mh(I)}(St),b=et.message;Z===void 0&&(Z=P.INTERNAL,b="Unknown error status: "+St+" with message "+et.message),C=!0,V.__(new F(Z,b)),w.close()}else O(_t,`RPC '${e}' stream ${s} received:`,M),V.a_(M)}}),N(l,Fs.STAT_EVENT,D=>{D.stat===qr.PROXY?O(_t,`RPC '${e}' stream ${s} detected buffering proxy`):D.stat===qr.NOPROXY&&O(_t,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{V.o_()},0),V}terminate(){this.u_.forEach(e=>e.close()),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter(n=>n===e)}};function qs(){return typeof document<"u"?document:null}function Oi(r){return new Eo(r,!0)}var mi=class{constructor(e,n,i=1e3,s=1.5,a=6e4){this.Fi=e,this.timerId=n,this.d_=i,this.E_=s,this.A_=a,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();let n=Math.floor(this.R_+this.p_()),i=Math.max(0,Date.now()-this.m_),s=Math.max(0,n-i);s>0&&O("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.R_} ms, delay with jitter: ${n} ms, last attempt: ${i} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,s,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}};var fl="PersistentStream",pi=class{constructor(e,n,i,s,a,c,l,d){this.Fi=e,this.w_=i,this.S_=s,this.connection=a,this.authCredentialsProvider=c,this.appCheckCredentialsProvider=l,this.listener=d,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new mi(e,n)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,n){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():n&&n.code===P.RESOURCE_EXHAUSTED?(ee(n.toString()),ee("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):n&&n.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(n)}U_(){}auth(){this.state=1;let e=this.K_(this.b_),n=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([i,s])=>{this.b_===n&&this.W_(i,s)},i=>{e(()=>{let s=new F(P.UNKNOWN,"Fetching auth token failed: "+i.message);return this.G_(s)})})}W_(e,n){let i=this.K_(this.b_);this.stream=this.z_(e,n),this.stream.Zo(()=>{i(()=>this.listener.Zo())}),this.stream.e_(()=>{i(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(s=>{i(()=>this.G_(s))}),this.stream.onMessage(s=>{i(()=>++this.C_==1?this.j_(s):this.onNext(s))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return O(fl,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return n=>{this.Fi.enqueueAndForget(()=>this.b_===e?n():(O(fl,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}},na=class extends pi{constructor(e,n,i,s,a,c){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,i,s,c),this.serializer=a}z_(e,n){return this.connection.P_("Listen",e,n)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();let n=gp(this.serializer,e),i=function(a){if(!("targetChange"in a))return j.min();let c=a.targetChange;return c.targetIds&&c.targetIds.length?j.min():c.readTime?Bt(c.readTime):j.min()}(e);return this.listener.J_(n,i)}H_(e){let n={};n.database=So(this.serializer),n.addTarget=function(a,c){let l,d=c.target;if(l=ho(d)?{documents:wp(a,d)}:{query:vp(a,d).Vt},l.targetId=c.targetId,c.resumeToken.approximateByteSize()>0){l.resumeToken=ph(a,c.resumeToken);let f=To(a,c.expectedCount);f!==null&&(l.expectedCount=f)}else if(c.snapshotVersion.compareTo(j.min())>0){l.readTime=ci(a,c.snapshotVersion.toTimestamp());let f=To(a,c.expectedCount);f!==null&&(l.expectedCount=f)}return l}(this.serializer,e);let i=Ep(this.serializer,e);i&&(n.labels=i),this.k_(n)}Y_(e){let n={};n.database=So(this.serializer),n.removeTarget=e,this.k_(n)}},ra=class extends pi{constructor(e,n,i,s,a,c){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,i,s,c),this.serializer=a}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,n){return this.connection.P_("Write",e,n)}j_(e){return X(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,X(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){X(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();let n=_p(e.writeResults,e.commitTime),i=Bt(e.commitTime);return this.listener.ta(i,n)}na(){let e={};e.database=So(this.serializer),this.k_(e)}X_(e){let n={streamToken:this.lastStreamToken,writes:e.map(i=>yp(this.serializer,i))};this.k_(n)}};var ia=class{},sa=class extends ia{constructor(e,n,i,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=i,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new F(P.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,n,i,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Wo(e,bo(n,i),s,a,c)).catch(a=>{throw a.name==="FirebaseError"?(a.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new F(P.UNKNOWN,a.toString())})}Jo(e,n,i,s,a){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([c,l])=>this.connection.Jo(e,bo(n,i),s,c,l,a)).catch(c=>{throw c.name==="FirebaseError"?(c.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),c):new F(P.UNKNOWN,c.toString())})}terminate(){this.ra=!0,this.connection.terminate()}},oa=class{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){let n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(ee(n),this._a=!1):O("OnlineStateTracker",n)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}};var Le="RemoteStore",aa=class{constructor(e,n,i,s,a){this.localStore=e,this.datastore=n,this.asyncQueue=i,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=a,this.Ea.xo(c=>{i.enqueueAndForget(async()=>{Fe(this)&&(O(Le,"Restarting streams for network reachability change."),await async function(d){let f=q(d);f.Ia.add(4),await fr(f),f.Aa.set("Unknown"),f.Ia.delete(4),await Li(f)}(this))})}),this.Aa=new oa(i,s)}};async function Li(r){if(Fe(r))for(let e of r.da)await e(!0)}async function fr(r){for(let e of r.da)await e(!1)}function Ah(r,e){let n=q(r);n.Ta.has(e.targetId)||(n.Ta.set(e.targetId,e),Ua(n)?za(n):wn(n).x_()&&Ba(n,e))}function Ma(r,e){let n=q(r),i=wn(n);n.Ta.delete(e),i.x_()&&Sh(n,e),n.Ta.size===0&&(i.x_()?i.B_():Fe(n)&&n.Aa.set("Unknown"))}function Ba(r,e){if(r.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(j.min())>0){let n=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}wn(r).H_(e)}function Sh(r,e){r.Ra.$e(e),wn(r).Y_(e)}function za(r){r.Ra=new Io({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>r.Ta.get(e)||null,lt:()=>r.datastore.serializer.databaseId}),wn(r).start(),r.Aa.aa()}function Ua(r){return Fe(r)&&!wn(r).M_()&&r.Ta.size>0}function Fe(r){return q(r).Ia.size===0}function Rh(r){r.Ra=void 0}async function Bp(r){r.Aa.set("Online")}async function zp(r){r.Ta.forEach((e,n)=>{Ba(r,e)})}async function Up(r,e){Rh(r),Ua(r)?(r.Aa.la(e),za(r)):r.Aa.set("Unknown")}async function qp(r,e,n){if(r.Aa.set("Online"),e instanceof oi&&e.state===2&&e.cause)try{await async function(s,a){let c=a.cause;for(let l of a.targetIds)s.Ta.has(l)&&(await s.remoteSyncer.rejectListen(l,c),s.Ta.delete(l),s.Ra.removeTarget(l))}(r,e)}catch(i){O(Le,"Failed to remove targets %s: %s ",e.targetIds.join(","),i),await gi(r,i)}else if(e instanceof Xe?r.Ra.Ye(e):e instanceof si?r.Ra.it(e):r.Ra.et(e),!n.isEqual(j.min()))try{let i=await bh(r.localStore);n.compareTo(i)>=0&&await function(a,c){let l=a.Ra.Pt(c);return l.targetChanges.forEach((d,f)=>{if(d.resumeToken.approximateByteSize()>0){let g=a.Ta.get(f);g&&a.Ta.set(f,g.withResumeToken(d.resumeToken,c))}}),l.targetMismatches.forEach((d,f)=>{let g=a.Ta.get(d);if(!g)return;a.Ta.set(d,g.withResumeToken(wt.EMPTY_BYTE_STRING,g.snapshotVersion)),Sh(a,d);let w=new ir(g.target,d,f,g.sequenceNumber);Ba(a,w)}),a.remoteSyncer.applyRemoteEvent(l)}(r,n)}catch(i){O(Le,"Failed to raise snapshot:",i),await gi(r,i)}}async function gi(r,e,n){if(!_n(e))throw e;r.Ia.add(1),await fr(r),r.Aa.set("Offline"),n||(n=()=>bh(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{O(Le,"Retrying IndexedDB access"),await n(),r.Ia.delete(1),await Li(r)})}function Ch(r,e){return e().catch(n=>gi(r,n,e))}async function Fi(r){let e=q(r),n=_e(e),i=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:Ca;for(;jp(e);)try{let s=await Op(e.localStore,i);if(s===null){e.Pa.length===0&&n.B_();break}i=s.batchId,$p(e,s)}catch(s){await gi(e,s)}Ph(e)&&Dh(e)}function jp(r){return Fe(r)&&r.Pa.length<10}function $p(r,e){r.Pa.push(e);let n=_e(r);n.x_()&&n.Z_&&n.X_(e.mutations)}function Ph(r){return Fe(r)&&!_e(r).M_()&&r.Pa.length>0}function Dh(r){_e(r).start()}async function Gp(r){_e(r).na()}async function Kp(r){let e=_e(r);for(let n of r.Pa)e.X_(n.mutations)}async function Wp(r,e,n){let i=r.Pa.shift(),s=yo.from(i,e,n);await Ch(r,()=>r.remoteSyncer.applySuccessfulWrite(s)),await Fi(r)}async function Hp(r,e){e&&_e(r).Z_&&await async function(i,s){if(function(c){return up(c)&&c!==P.ABORTED}(s.code)){let a=i.Pa.shift();_e(i).N_(),await Ch(i,()=>i.remoteSyncer.rejectFailedWrite(a.batchId,s)),await Fi(i)}}(r,e),Ph(r)&&Dh(r)}async function ml(r,e){let n=q(r);n.asyncQueue.verifyOperationInProgress(),O(Le,"RemoteStore received new credentials");let i=Fe(n);n.Ia.add(3),await fr(n),i&&n.Aa.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Ia.delete(3),await Li(n)}async function Qp(r,e){let n=q(r);e?(n.Ia.delete(2),await Li(n)):e||(n.Ia.add(2),await fr(n),n.Aa.set("Unknown"))}function wn(r){return r.Va||(r.Va=function(n,i,s){let a=q(n);return a.ia(),new na(i,a.connection,a.authCredentials,a.appCheckCredentials,a.serializer,s)}(r.datastore,r.asyncQueue,{Zo:Bp.bind(null,r),e_:zp.bind(null,r),n_:Up.bind(null,r),J_:qp.bind(null,r)}),r.da.push(async e=>{e?(r.Va.N_(),Ua(r)?za(r):r.Aa.set("Unknown")):(await r.Va.stop(),Rh(r))})),r.Va}function _e(r){return r.ma||(r.ma=function(n,i,s){let a=q(n);return a.ia(),new ra(i,a.connection,a.authCredentials,a.appCheckCredentials,a.serializer,s)}(r.datastore,r.asyncQueue,{Zo:()=>Promise.resolve(),e_:Gp.bind(null,r),n_:Hp.bind(null,r),ea:Kp.bind(null,r),ta:Wp.bind(null,r)}),r.da.push(async e=>{e?(r.ma.N_(),await Fi(r)):(await r.ma.stop(),r.Pa.length>0&&(O(Le,`Stopping write stream with ${r.Pa.length} pending writes`),r.Pa=[]))})),r.ma}var ca=class r{constructor(e,n,i,s,a){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=i,this.op=s,this.removalCallback=a,this.deferred=new Ot,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(c=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,i,s,a){let c=Date.now()+i,l=new r(e,n,c,s,a);return l.start(i),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new F(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function qa(r,e){if(ee("AsyncQueue",`${e}: ${r}`),_n(r))return new F(P.UNAVAILABLE,`${e}: ${r}`);throw r}var yi=class r{static emptySet(e){return new r(e.comparator)}constructor(e){this.comparator=e?(n,i)=>e(n,i)||z.comparator(n.key,i.key):(n,i)=>z.comparator(n.key,i.key),this.keyedMap=Wn(),this.sortedSet=new it(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,i)=>(e(n),!1))}add(e){let n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){let n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof r)||this.size!==e.size)return!1;let n=this.sortedSet.getIterator(),i=e.sortedSet.getIterator();for(;n.hasNext();){let s=n.getNext().key,a=i.getNext().key;if(!s.isEqual(a))return!1}return!0}toString(){let e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){let i=new r;return i.comparator=this.comparator,i.keyedMap=e,i.sortedSet=n,i}};var _i=class{constructor(){this.fa=new it(z.comparator)}track(e){let n=e.doc.key,i=this.fa.get(n);i?e.type!==0&&i.type===3?this.fa=this.fa.insert(n,e):e.type===3&&i.type!==1?this.fa=this.fa.insert(n,{type:i.type,doc:e.doc}):e.type===2&&i.type===2?this.fa=this.fa.insert(n,{type:2,doc:e.doc}):e.type===2&&i.type===0?this.fa=this.fa.insert(n,{type:0,doc:e.doc}):e.type===1&&i.type===0?this.fa=this.fa.remove(n):e.type===1&&i.type===2?this.fa=this.fa.insert(n,{type:1,doc:i.doc}):e.type===0&&i.type===1?this.fa=this.fa.insert(n,{type:2,doc:e.doc}):B(63341,{At:e,ga:i}):this.fa=this.fa.insert(n,e)}pa(){let e=[];return this.fa.inorderTraversal((n,i)=>{e.push(i)}),e}},fn=class r{constructor(e,n,i,s,a,c,l,d,f){this.query=e,this.docs=n,this.oldDocs=i,this.docChanges=s,this.mutatedKeys=a,this.fromCache=c,this.syncStateChanged=l,this.excludesMetadataChanges=d,this.hasCachedResults=f}static fromInitialDocuments(e,n,i,s,a){let c=[];return n.forEach(l=>{c.push({type:0,doc:l})}),new r(e,n,yi.emptySet(n),c,i,s,!0,!1,a)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ki(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let n=this.docChanges,i=e.docChanges;if(n.length!==i.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==i[s].type||!n[s].doc.isEqual(i[s].doc))return!1;return!0}};var ua=class{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(e=>e.ba())}},la=class{constructor(){this.queries=pl(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(n,i){let s=q(n),a=s.queries;s.queries=pl(),a.forEach((c,l)=>{for(let d of l.wa)d.onError(i)})})(this,new F(P.ABORTED,"Firestore shutting down"))}};function pl(){return new ie(r=>nh(r),ki)}async function xh(r,e){let n=q(r),i=3,s=e.query,a=n.queries.get(s);a?!a.Sa()&&e.ba()&&(i=2):(a=new ua,i=e.ba()?0:1);try{switch(i){case 0:a.ya=await n.onListen(s,!0);break;case 1:a.ya=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(c){let l=qa(c,`Initialization of query '${We(e.query)}' failed`);return void e.onError(l)}n.queries.set(s,a),a.wa.push(e),e.va(n.onlineState),a.ya&&e.Ca(a.ya)&&ja(n)}async function Vh(r,e){let n=q(r),i=e.query,s=3,a=n.queries.get(i);if(a){let c=a.wa.indexOf(e);c>=0&&(a.wa.splice(c,1),a.wa.length===0?s=e.ba()?0:1:!a.Sa()&&e.ba()&&(s=2))}switch(s){case 0:return n.queries.delete(i),n.onUnlisten(i,!0);case 1:return n.queries.delete(i),n.onUnlisten(i,!1);case 2:return n.onLastRemoteStoreUnlisten(i);default:return}}function Jp(r,e){let n=q(r),i=!1;for(let s of e){let a=s.query,c=n.queries.get(a);if(c){for(let l of c.wa)l.Ca(s)&&(i=!0);c.ya=s}}i&&ja(n)}function Xp(r,e,n){let i=q(r),s=i.queries.get(e);if(s)for(let a of s.wa)a.onError(n);i.queries.delete(e)}function ja(r){r.Da.forEach(e=>{e.next()})}var ha,gl;(gl=ha||(ha={})).Fa="default",gl.Cache="cache";var wi=class{constructor(e,n,i){this.query=e,this.Ma=n,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=i||{}}Ca(e){if(!this.options.includeMetadataChanges){let i=[];for(let s of e.docChanges)s.type!==3&&i.push(s);e=new fn(e.query,e.docs,e.oldDocs,i,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),n=!0):this.Ba(e,this.onlineState)&&(this.La(e),n=!0),this.Oa=e,n}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let n=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),n=!0),n}Ba(e,n){if(!e.fromCache||!this.ba())return!0;let i=n!=="Offline";return(!this.options.ka||!i)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Na(e){if(e.docChanges.length>0)return!0;let n=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}La(e){e=fn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==ha.Cache}};var vi=class{constructor(e){this.key=e}},Ii=class{constructor(e){this.key=e}},da=class{constructor(e,n){this.query=e,this.Ha=n,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=K(),this.mutatedKeys=K(),this.Xa=rh(e),this.eu=new yi(this.Xa)}get tu(){return this.Ha}nu(e,n){let i=n?n.ru:new _i,s=n?n.eu:this.eu,a=n?n.mutatedKeys:this.mutatedKeys,c=s,l=!1,d=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,f=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((g,w)=>{let v=s.get(g),C=Ni(this.query,w)?w:null,V=!!v&&this.mutatedKeys.has(v.key),N=!!C&&(C.hasLocalMutations||this.mutatedKeys.has(C.key)&&C.hasCommittedMutations),D=!1;v&&C?v.data.isEqual(C.data)?V!==N&&(i.track({type:3,doc:C}),D=!0):this.iu(v,C)||(i.track({type:2,doc:C}),D=!0,(d&&this.Xa(C,d)>0||f&&this.Xa(C,f)<0)&&(l=!0)):!v&&C?(i.track({type:0,doc:C}),D=!0):v&&!C&&(i.track({type:1,doc:v}),D=!0,(d||f)&&(l=!0)),D&&(C?(c=c.add(C),a=N?a.add(g):a.delete(g)):(c=c.delete(g),a=a.delete(g)))}),this.query.limit!==null)for(;c.size>this.query.limit;){let g=this.query.limitType==="F"?c.last():c.first();c=c.delete(g.key),a=a.delete(g.key),i.track({type:1,doc:g})}return{eu:c,ru:i,Ds:l,mutatedKeys:a}}iu(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,i,s){let a=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;let c=e.ru.pa();c.sort((g,w)=>function(C,V){let N=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return B(20277,{At:D})}};return N(C)-N(V)}(g.type,w.type)||this.Xa(g.doc,w.doc)),this.su(i),s=s!=null&&s;let l=n&&!s?this.ou():[],d=this.Za.size===0&&this.current&&!s?1:0,f=d!==this.Ya;return this.Ya=d,c.length!==0||f?{snapshot:new fn(this.query,e.eu,a,c,e.mutatedKeys,d===0,f,!1,!!i&&i.resumeToken.approximateByteSize()>0),_u:l}:{_u:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new _i,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach(n=>this.Ha=this.Ha.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ha=this.Ha.delete(n)),this.current=e.current)}ou(){if(!this.current)return[];let e=this.Za;this.Za=K(),this.eu.forEach(i=>{this.au(i.key)&&(this.Za=this.Za.add(i.key))});let n=[];return e.forEach(i=>{this.Za.has(i)||n.push(new Ii(i))}),this.Za.forEach(i=>{e.has(i)||n.push(new vi(i))}),n}uu(e){this.Ha=e.qs,this.Za=K();let n=this.nu(e.documents);return this.applyChanges(n,!0)}cu(){return fn.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}},$a="SyncEngine",fa=class{constructor(e,n,i){this.query=e,this.targetId=n,this.view=i}},ma=class{constructor(e){this.key=e,this.lu=!1}},pa=class{constructor(e,n,i,s,a,c){this.localStore=e,this.remoteStore=n,this.eventManager=i,this.sharedClientState=s,this.currentUser=a,this.maxConcurrentLimboResolutions=c,this.hu={},this.Pu=new ie(l=>nh(l),ki),this.Tu=new Map,this.Iu=new Set,this.du=new it(z.comparator),this.Eu=new Map,this.Au=new or,this.Ru={},this.Vu=new Map,this.mu=sr.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}};async function Yp(r,e,n=!0){let i=Mh(r),s,a=i.Pu.get(e);return a?(i.sharedClientState.addLocalQueryTarget(a.targetId),s=a.view.cu()):s=await kh(i,e,n,!0),s}async function Zp(r,e){let n=Mh(r);await kh(n,e,!0,!1)}async function kh(r,e,n,i){let s=await Lp(r.localStore,Mt(e)),a=s.targetId,c=r.sharedClientState.addLocalQueryTarget(a,n),l;return i&&(l=await tg(r,e,a,c==="current",s.resumeToken)),r.isPrimaryClient&&n&&Ah(r.remoteStore,s),l}async function tg(r,e,n,i,s){r.gu=(w,v,C)=>async function(N,D,U,M){let G=D.view.nu(U);G.Ds&&(G=await hl(N.localStore,D.query,!1).then(({documents:b})=>D.view.nu(b,G)));let et=M&&M.targetChanges.get(D.targetId),St=M&&M.targetMismatches.get(D.targetId)!=null,Z=D.view.applyChanges(G,N.isPrimaryClient,et,St);return _l(N,D.targetId,Z._u),Z.snapshot}(r,w,v,C);let a=await hl(r.localStore,e,!0),c=new da(e,a.qs),l=c.nu(a.documents),d=rr.createSynthesizedTargetChangeForCurrentChange(n,i&&r.onlineState!=="Offline",s),f=c.applyChanges(l,r.isPrimaryClient,d);_l(r,n,f._u);let g=new fa(e,n,c);return r.Pu.set(e,g),r.Tu.has(n)?r.Tu.get(n).push(e):r.Tu.set(n,[e]),f.snapshot}async function eg(r,e,n){let i=q(r),s=i.Pu.get(e),a=i.Tu.get(s.targetId);if(a.length>1)return i.Tu.set(s.targetId,a.filter(c=>!ki(c,e))),void i.Pu.delete(e);i.isPrimaryClient?(i.sharedClientState.removeLocalQueryTarget(s.targetId),i.sharedClientState.isActiveQueryTarget(s.targetId)||await Qo(i.localStore,s.targetId,!1).then(()=>{i.sharedClientState.clearQueryState(s.targetId),n&&Ma(i.remoteStore,s.targetId),ga(i,s.targetId)}).catch(yn)):(ga(i,s.targetId),await Qo(i.localStore,s.targetId,!0))}async function ng(r,e){let n=q(r),i=n.Pu.get(e),s=n.Tu.get(i.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(i.targetId),Ma(n.remoteStore,i.targetId))}async function rg(r,e,n){let i=lg(r);try{let s=await function(c,l){let d=q(c),f=J.now(),g=l.reduce((C,V)=>C.add(V.key),K()),w,v;return d.persistence.runTransaction("Locally write mutations","readwrite",C=>{let V=se(),N=K();return d.Os.getEntries(C,g).next(D=>{V=D,V.forEach((U,M)=>{M.isValidDocument()||(N=N.add(U))})}).next(()=>d.localDocuments.getOverlayedDocuments(C,V)).next(D=>{w=D;let U=[];for(let M of l){let G=cp(M,w.get(M.key).overlayedDocument);G!=null&&U.push(new qt(M.key,G,Jl(G.value.mapValue),de.exists(!0)))}return d.mutationQueue.addMutationBatch(C,f,U,l)}).next(D=>{v=D;let U=D.applyToLocalDocumentSet(w,N);return d.documentOverlayCache.saveOverlays(C,D.batchId,U)})}).then(()=>({batchId:v.batchId,changes:sh(w)}))}(i.localStore,e);i.sharedClientState.addPendingMutation(s.batchId),function(c,l,d){let f=c.Ru[c.currentUser.toKey()];f||(f=new it($)),f=f.insert(l,d),c.Ru[c.currentUser.toKey()]=f}(i,s.batchId,n),await mr(i,s.changes),await Fi(i.remoteStore)}catch(s){let a=qa(s,"Failed to persist write");n.reject(a)}}async function Nh(r,e){let n=q(r);try{let i=await kp(n.localStore,e);e.targetChanges.forEach((s,a)=>{let c=n.Eu.get(a);c&&(X(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?c.lu=!0:s.modifiedDocuments.size>0?X(c.lu,14607):s.removedDocuments.size>0&&(X(c.lu,42227),c.lu=!1))}),await mr(n,i,e)}catch(i){await yn(i)}}function yl(r,e,n){let i=q(r);if(i.isPrimaryClient&&n===0||!i.isPrimaryClient&&n===1){let s=[];i.Pu.forEach((a,c)=>{let l=c.view.va(e);l.snapshot&&s.push(l.snapshot)}),function(c,l){let d=q(c);d.onlineState=l;let f=!1;d.queries.forEach((g,w)=>{for(let v of w.wa)v.va(l)&&(f=!0)}),f&&ja(d)}(i.eventManager,e),s.length&&i.hu.J_(s),i.onlineState=e,i.isPrimaryClient&&i.sharedClientState.setOnlineState(e)}}async function ig(r,e,n){let i=q(r);i.sharedClientState.updateQueryState(e,"rejected",n);let s=i.Eu.get(e),a=s&&s.key;if(a){let c=new it(z.comparator);c=c.insert(a,Vt.newNoDocument(a,j.min()));let l=K().add(a),d=new ii(j.min(),new Map,new it($),c,l);await Nh(i,d),i.du=i.du.remove(a),i.Eu.delete(e),Ga(i)}else await Qo(i.localStore,e,!1).then(()=>ga(i,e,n)).catch(yn)}async function sg(r,e){let n=q(r),i=e.batch.batchId;try{let s=await Vp(n.localStore,e);Lh(n,i,null),Oh(n,i),n.sharedClientState.updateMutationState(i,"acknowledged"),await mr(n,s)}catch(s){await yn(s)}}async function og(r,e,n){let i=q(r);try{let s=await function(c,l){let d=q(c);return d.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let g;return d.mutationQueue.lookupMutationBatch(f,l).next(w=>(X(w!==null,37113),g=w.keys(),d.mutationQueue.removeMutationBatch(f,w))).next(()=>d.mutationQueue.performConsistencyCheck(f)).next(()=>d.documentOverlayCache.removeOverlaysForBatchId(f,g,l)).next(()=>d.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,g)).next(()=>d.localDocuments.getDocuments(f,g))})}(i.localStore,e);Lh(i,e,n),Oh(i,e),i.sharedClientState.updateMutationState(e,"rejected",n),await mr(i,s)}catch(s){await yn(s)}}function Oh(r,e){(r.Vu.get(e)||[]).forEach(n=>{n.resolve()}),r.Vu.delete(e)}function Lh(r,e,n){let i=q(r),s=i.Ru[i.currentUser.toKey()];if(s){let a=s.get(e);a&&(n?a.reject(n):a.resolve(),s=s.remove(e)),i.Ru[i.currentUser.toKey()]=s}}function ga(r,e,n=null){r.sharedClientState.removeLocalQueryTarget(e);for(let i of r.Tu.get(e))r.Pu.delete(i),n&&r.hu.pu(i,n);r.Tu.delete(e),r.isPrimaryClient&&r.Au.zr(e).forEach(i=>{r.Au.containsKey(i)||Fh(r,i)})}function Fh(r,e){r.Iu.delete(e.path.canonicalString());let n=r.du.get(e);n!==null&&(Ma(r.remoteStore,n),r.du=r.du.remove(e),r.Eu.delete(n),Ga(r))}function _l(r,e,n){for(let i of n)i instanceof vi?(r.Au.addReference(i.key,e),ag(r,i)):i instanceof Ii?(O($a,"Document no longer in limbo: "+i.key),r.Au.removeReference(i.key,e),r.Au.containsKey(i.key)||Fh(r,i.key)):B(19791,{yu:i})}function ag(r,e){let n=e.key,i=n.path.canonicalString();r.du.get(n)||r.Iu.has(i)||(O($a,"New document in limbo: "+n),r.Iu.add(i),Ga(r))}function Ga(r){for(;r.Iu.size>0&&r.du.size<r.maxConcurrentLimboResolutions;){let e=r.Iu.values().next().value;r.Iu.delete(e);let n=new z(st.fromString(e)),i=r.mu.next();r.Eu.set(i,new ma(n)),r.du=r.du.insert(n,i),Ah(r.remoteStore,new ir(Mt(Vi(n.path)),i,"TargetPurposeLimboResolution",en.ue))}}async function mr(r,e,n){let i=q(r),s=[],a=[],c=[];i.Pu.isEmpty()||(i.Pu.forEach((l,d)=>{c.push(i.gu(d,e,n).then(f=>{var g;if((f||n)&&i.isPrimaryClient){let w=f?!f.fromCache:(g=n?.targetChanges.get(d.targetId))===null||g===void 0?void 0:g.current;i.sharedClientState.updateQueryState(d.targetId,w?"current":"not-current")}if(f){s.push(f);let w=Go.Es(d.targetId,f);a.push(w)}}))}),await Promise.all(c),i.hu.J_(s),await async function(d,f){let g=q(d);try{await g.persistence.runTransaction("notifyLocalViewChanges","readwrite",w=>x.forEach(f,v=>x.forEach(v.Is,C=>g.persistence.referenceDelegate.addReference(w,v.targetId,C)).next(()=>x.forEach(v.ds,C=>g.persistence.referenceDelegate.removeReference(w,v.targetId,C)))))}catch(w){if(!_n(w))throw w;O(Fa,"Failed to update sequence numbers: "+w)}for(let w of f){let v=w.targetId;if(!w.fromCache){let C=g.Fs.get(v),V=C.snapshotVersion,N=C.withLastLimboFreeSnapshotVersion(V);g.Fs=g.Fs.insert(v,N)}}}(i.localStore,a))}async function cg(r,e){let n=q(r);if(!n.currentUser.isEqual(e)){O($a,"User change. New user:",e.toKey());let i=await Th(n.localStore,e);n.currentUser=e,function(a,c){a.Vu.forEach(l=>{l.forEach(d=>{d.reject(new F(P.CANCELLED,c))})}),a.Vu.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,i.removedBatchIds,i.addedBatchIds),await mr(n,i.Bs)}}function ug(r,e){let n=q(r),i=n.Eu.get(e);if(i&&i.lu)return K().add(i.key);{let s=K(),a=n.Tu.get(e);if(!a)return s;for(let c of a){let l=n.Pu.get(c);s=s.unionWith(l.view.tu)}return s}}function Mh(r){let e=q(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=Nh.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=ug.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=ig.bind(null,e),e.hu.J_=Jp.bind(null,e.eventManager),e.hu.pu=Xp.bind(null,e.eventManager),e}function lg(r){let e=q(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=sg.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=og.bind(null,e),e}var mn=class{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Oi(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,n){return null}Fu(e,n){return null}vu(e){return xp(this.persistence,new Wo,e.initialUser,this.serializer)}Du(e){return new li($o.Vi,this.serializer)}bu(e){return new Jo}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};mn.provider={build:()=>new mn};var ya=class extends mn{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,n){X(this.persistence.referenceDelegate instanceof hi,46915);let i=this.persistence.referenceDelegate.garbageCollector;return new xo(i,e.asyncQueue,n)}Du(e){let n=this.cacheSizeBytes!==void 0?Rt.withCacheSize(this.cacheSizeBytes):Rt.DEFAULT;return new li(i=>hi.Vi(i,n),this.serializer)}};var ar=class{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=i=>yl(this.syncEngine,i,1),this.remoteStore.remoteSyncer.handleCredentialChange=cg.bind(null,this.syncEngine),await Qp(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new la}()}createDatastore(e){let n=Oi(e.databaseInfo.databaseId),i=function(a){return new ea(a)}(e.databaseInfo);return function(a,c,l,d){return new sa(a,c,l,d)}(e.authCredentials,e.appCheckCredentials,i,n)}createRemoteStore(e){return function(i,s,a,c,l){return new aa(i,s,a,c,l)}(this.localStore,this.datastore,e.asyncQueue,n=>yl(this.syncEngine,n,0),function(){return fi.C()?new fi:new Xo}())}createSyncEngine(e,n){return function(s,a,c,l,d,f,g){let w=new pa(s,a,c,l,d,f);return g&&(w.fu=!0),w}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(s){let a=q(s);O(Le,"RemoteStore shutting down."),a.Ia.add(5),await fr(a),a.Ea.shutdown(),a.Aa.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}};ar.provider={build:()=>new ar};var Ei=class{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):ee("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,n){setTimeout(()=>{this.muted||e(n)},0)}};var we="FirestoreClient",_a=class{constructor(e,n,i,s,a){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=i,this.databaseInfo=s,this.user=lt.UNAUTHENTICATED,this.clientId=Yn.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=a,this.authCredentials.start(i,async c=>{O(we,"Received user=",c.uid),await this.authCredentialListener(c),this.user=c}),this.appCheckCredentials.start(i,c=>(O(we,"Received new app check token=",c),this.appCheckCredentialListener(c,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();let e=new Ot;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){let i=qa(n,"Failed to shutdown persistence");e.reject(i)}}),e.promise}};async function js(r,e){r.asyncQueue.verifyOperationInProgress(),O(we,"Initializing OfflineComponentProvider");let n=r.configuration;await e.initialize(n);let i=n.initialUser;r.setCredentialChangeListener(async s=>{i.isEqual(s)||(await Th(e.localStore,s),i=s)}),e.persistence.setDatabaseDeletedListener(()=>{ge("Terminating Firestore due to IndexedDb database deletion"),r.terminate().then(()=>{O("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(s=>{ge("Terminating Firestore due to IndexedDb database deletion failed",s)})}),r._offlineComponents=e}async function wl(r,e){r.asyncQueue.verifyOperationInProgress();let n=await hg(r);O(we,"Initializing OnlineComponentProvider"),await e.initialize(n,r.configuration),r.setCredentialChangeListener(i=>ml(e.remoteStore,i)),r.setAppCheckTokenChangeListener((i,s)=>ml(e.remoteStore,s)),r._onlineComponents=e}async function hg(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){O(we,"Using user provided OfflineComponentProvider");try{await js(r,r._uninitializedComponentsProvider._offline)}catch(e){let n=e;if(!function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(n))throw n;ge("Error using user provided cache. Falling back to memory cache: "+n),await js(r,new mn)}}else O(we,"Using default OfflineComponentProvider"),await js(r,new ya(void 0));return r._offlineComponents}async function Bh(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(O(we,"Using user provided OnlineComponentProvider"),await wl(r,r._uninitializedComponentsProvider._online)):(O(we,"Using default OnlineComponentProvider"),await wl(r,new ar))),r._onlineComponents}function dg(r){return Bh(r).then(e=>e.syncEngine)}async function wa(r){let e=await Bh(r),n=e.eventManager;return n.onListen=Yp.bind(null,e.syncEngine),n.onUnlisten=eg.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=Zp.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=ng.bind(null,e.syncEngine),n}function fg(r,e,n={}){let i=new Ot;return r.asyncQueue.enqueueAndForget(async()=>function(a,c,l,d,f){let g=new Ei({next:v=>{g.Ou(),c.enqueueAndForget(()=>Vh(a,w));let C=v.docs.has(l);!C&&v.fromCache?f.reject(new F(P.UNAVAILABLE,"Failed to get document because the client is offline.")):C&&v.fromCache&&d&&d.source==="server"?f.reject(new F(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):f.resolve(v)},error:v=>f.reject(v)}),w=new wi(Vi(l.path),g,{includeMetadataChanges:!0,ka:!0});return xh(a,w)}(await wa(r),r.asyncQueue,e,n,i)),i.promise}function zh(r){let e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}var vl=new Map;var Uh="firestore.googleapis.com",Il=!0,Ti=class{constructor(e){var n,i;if(e.host===void 0){if(e.ssl!==void 0)throw new F(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Uh,this.ssl=Il}else this.host=e.host,this.ssl=(n=e.ssl)!==null&&n!==void 0?n:Il;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Eh;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Cp)throw new F(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Am("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=zh((i=e.experimentalLongPollingOptions)!==null&&i!==void 0?i:{}),function(a){if(a.timeoutSeconds!==void 0){if(isNaN(a.timeoutSeconds))throw new F(P.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (must not be NaN)`);if(a.timeoutSeconds<5)throw new F(P.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (minimum allowed value is 5)`);if(a.timeoutSeconds>30)throw new F(P.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(i,s){return i.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},cr=class{constructor(e,n,i,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=i,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ti({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new F(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new F(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ti(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(i){if(!i)return new $s;switch(i.type){case"firstParty":return new Hs(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new F(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){let i=vl.get(n);i&&(O("ComponentProvider","Removing Datastore"),vl.delete(n),i.terminate())}(this),Promise.resolve()}};function Ka(r,e,n,i={}){var s;r=Lt(r,cr);let a=Fr(e),c=r._getSettings(),l=Object.assign(Object.assign({},c),{emulatorOptions:r._getEmulatorOptions()}),d=`${e}:${n}`;a&&(lu(`https://${d}`),du("Firestore",!0)),c.host!==Uh&&c.host!==d&&ge("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");let f=Object.assign(Object.assign({},c),{host:d,ssl:a,emulatorOptions:i});if(!je(f,l)&&(r._setSettings(f),i.mockUserToken)){let g,w;if(typeof i.mockUserToken=="string")g=i.mockUserToken,w=lt.MOCK_USER;else{g=hu(i.mockUserToken,(s=r._app)===null||s===void 0?void 0:s.options.projectId);let v=i.mockUserToken.sub||i.mockUserToken.user_id;if(!v)throw new F(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");w=new lt(v)}r._authCredentials=new Gs(new Qr(g,w))}}var bi=class r{constructor(e,n,i){this.converter=n,this._query=i,this.type="query",this.firestore=e}withConverter(e){return new r(this.firestore,e,this._query)}},ft=class r{constructor(e,n,i){this.converter=n,this._key=i,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ur(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new r(this.firestore,e,this._key)}toJSON(){return{type:r._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,i){if(dr(n,r._jsonSchema))return new r(e,i||null,new z(st.fromString(n.referencePath)))}};ft._jsonSchemaVersion="firestore/documentReference/1.0",ft._jsonSchema={type:ct("string",ft._jsonSchemaVersion),referencePath:ct("string")};var ur=class r extends bi{constructor(e,n,i){super(e,n,Vi(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new ft(this.firestore,null,new z(e))}withConverter(e){return new r(this.firestore,e,this._path)}};function Pt(r,e,...n){if(r=Jt(r),arguments.length===1&&(e=Yn.newId()),bm("doc","path",e),r instanceof cr){let i=st.fromString(e,...n);return zu(i),new ft(r,null,new z(i))}{if(!(r instanceof ft||r instanceof ur))throw new F(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let i=r._path.child(st.fromString(e,...n));return zu(i),new ft(r.firestore,r instanceof ur?r.converter:null,new z(i))}}var El="AsyncQueue",Ai=class{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new mi(this,"async_queue_retry"),this.oc=()=>{let i=qs();i&&O(El,"Visibility state changed to "+i.visibilityState),this.F_.y_()},this._c=e;let n=qs();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;let n=qs();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});let n=new Ot;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!_n(e))throw e;O(El,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){let n=this._c.then(()=>(this.nc=!0,e().catch(i=>{throw this.tc=i,this.nc=!1,ee("INTERNAL UNHANDLED ERROR: ",Tl(i)),i}).then(i=>(this.nc=!1,i))));return this._c=n,n}enqueueAfterDelay(e,n,i){this.ac(),this.sc.indexOf(e)>-1&&(n=0);let s=ca.createAndSchedule(this,e,n,i,a=>this.lc(a));return this.ec.push(s),s}ac(){this.tc&&B(47125,{hc:Tl(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(let n of this.ec)if(n.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((n,i)=>n.targetTimeMs-i.targetTimeMs);for(let n of this.ec)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){let n=this.ec.indexOf(e);this.ec.splice(n,1)}};function Tl(r){let e=r.message||"";return r.stack&&(e=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),e}function bl(r){return function(n,i){if(typeof n!="object"||n===null)return!1;let s=n;for(let a of i)if(a in s&&typeof s[a]=="function")return!0;return!1}(r,["next","error","complete"])}var ve=class extends cr{constructor(e,n,i,s){super(e,n,i,s),this.type="firestore",this._queue=new Ai,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new Ai(e),this._firestoreClient=void 0,await e}}};function qh(r,e){let n=typeof r=="object"?r:xu(),i=typeof r=="string"?r:e||ti,s=Cu(n,"firestore").getImmediate({identifier:i});if(!s._initialized){let a=uu("firestore");a&&Ka(s,...a)}return s}function Wa(r){if(r._terminated)throw new F(P.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||mg(r),r._firestoreClient}function mg(r){var e,n,i;let s=r._freezeSettings(),a=function(l,d,f,g){return new Zs(l,d,f,g.host,g.ssl,g.experimentalForceLongPolling,g.experimentalAutoDetectLongPolling,zh(g.experimentalLongPollingOptions),g.useFetchStreams,g.isUsingEmulator)}(r._databaseId,((e=r._app)===null||e===void 0?void 0:e.options.appId)||"",r._persistenceKey,s);r._componentsProvider||!((n=s.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((i=s.localCache)===null||i===void 0)&&i._onlineComponentProvider)&&(r._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),r._firestoreClient=new _a(r._authCredentials,r._appCheckCredentials,r._queue,a,r._componentsProvider&&function(l){let d=l?._online.build();return{_offline:l?._offline.build(d),_online:d}}(r._componentsProvider))}var fe=class r{constructor(e){this._byteString=e}static fromBase64String(e){try{return new r(wt.fromBase64String(e))}catch(n){throw new F(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new r(wt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:r._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(dr(e,r._jsonSchema))return r.fromBase64String(e.bytes)}};fe._jsonSchemaVersion="firestore/bytes/1.0",fe._jsonSchema={type:ct("string",fe._jsonSchemaVersion),bytes:ct("string")};var pn=class{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new F(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new bt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};var lr=class{constructor(e){this._methodName=e}};var me=class r{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new F(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new F(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return $(this._lat,e._lat)||$(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:r._jsonSchemaVersion}}static fromJSON(e){if(dr(e,r._jsonSchema))return new r(e.latitude,e.longitude)}};me._jsonSchemaVersion="firestore/geoPoint/1.0",me._jsonSchema={type:ct("string",me._jsonSchemaVersion),latitude:ct("number"),longitude:ct("number")};var pe=class r{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(i,s){if(i.length!==s.length)return!1;for(let a=0;a<i.length;++a)if(i[a]!==s[a])return!1;return!0}(this._values,e._values)}toJSON(){return{type:r._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(dr(e,r._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(n=>typeof n=="number"))return new r(e.vectorValues);throw new F(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}};pe._jsonSchemaVersion="firestore/vectorValue/1.0",pe._jsonSchema={type:ct("string",pe._jsonSchemaVersion),vectorValues:ct("object")};var pg=/^__.*__$/,va=class{constructor(e,n,i){this.data=e,this.fieldMask=n,this.fieldTransforms=i}toMutation(e,n){return this.fieldMask!==null?new qt(e,this.data,this.fieldMask,n,this.fieldTransforms):new Oe(e,this.data,n,this.fieldTransforms)}},Si=class{constructor(e,n,i){this.data=e,this.fieldMask=n,this.fieldTransforms=i}toMutation(e,n){return new qt(e,this.data,this.fieldMask,n,this.fieldTransforms)}};function jh(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw B(40011,{Ec:r})}}var Ia=class r{constructor(e,n,i,s,a,c){this.settings=e,this.databaseId=n,this.serializer=i,this.ignoreUndefinedProperties=s,a===void 0&&this.Ac(),this.fieldTransforms=a||[],this.fieldMask=c||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new r(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var n;let i=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Rc({path:i,mc:!1});return s.fc(e),s}gc(e){var n;let i=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Rc({path:i,mc:!1});return s.Ac(),s}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return Ri(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(jh(this.Ec)&&pg.test(e))throw this.wc('Document fields cannot begin and end with "__"')}},Ea=class{constructor(e,n,i){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=i||Oi(e)}Dc(e,n,i,s=!1){return new Ia({Ec:e,methodName:n,bc:i,path:bt.emptyPath(),mc:!1,Sc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function $h(r){let e=r._freezeSettings(),n=Oi(r._databaseId);return new Ea(r._databaseId,!!e.ignoreUndefinedProperties,n)}function gg(r,e,n,i,s,a={}){let c=r.Dc(a.merge||a.mergeFields?2:0,e,n,s);Ha("Data must be an object, but it was:",c,i);let l=Gh(i,c),d,f;if(a.merge)d=new Ct(c.fieldMask),f=c.fieldTransforms;else if(a.mergeFields){let g=[];for(let w of a.mergeFields){let v=Ta(e,w,n);if(!c.contains(v))throw new F(P.INVALID_ARGUMENT,`Field '${v}' is specified in your field mask but missing from your input data.`);Wh(g,v)||g.push(v)}d=new Ct(g),f=c.fieldTransforms.filter(w=>d.covers(w.field))}else d=null,f=c.fieldTransforms;return new va(new Tt(l),d,f)}var hr=class r extends lr{_toFieldTransform(e){if(e.Ec!==2)throw e.Ec===1?e.wc(`${this._methodName}() can only appear at the top level of your update data`):e.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof r}};function yg(r,e,n,i){let s=r.Dc(1,e,n);Ha("Data must be an object, but it was:",s,i);let a=[],c=Tt.empty();Ie(i,(d,f)=>{let g=Qa(e,d,n);f=Jt(f);let w=s.gc(g);if(f instanceof hr)a.push(g);else{let v=Mi(f,w);v!=null&&(a.push(g),c.set(g,v))}});let l=new Ct(a);return new Si(c,l,s.fieldTransforms)}function _g(r,e,n,i,s,a){let c=r.Dc(1,e,n),l=[Ta(e,i,n)],d=[s];if(a.length%2!=0)throw new F(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let v=0;v<a.length;v+=2)l.push(Ta(e,a[v])),d.push(a[v+1]);let f=[],g=Tt.empty();for(let v=l.length-1;v>=0;--v)if(!Wh(f,l[v])){let C=l[v],V=d[v];V=Jt(V);let N=c.gc(C);if(V instanceof hr)f.push(C);else{let D=Mi(V,N);D!=null&&(f.push(C),g.set(C,D))}}let w=new Ct(f);return new Si(g,w,c.fieldTransforms)}function Mi(r,e){if(Kh(r=Jt(r)))return Ha("Unsupported field value:",e,r),Gh(r,e);if(r instanceof lr)return function(i,s){if(!jh(s.Ec))throw s.wc(`${i._methodName}() can only be used with update() and set()`);if(!s.path)throw s.wc(`${i._methodName}() is not currently supported inside arrays`);let a=i._toFieldTransform(s);a&&s.fieldTransforms.push(a)}(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return function(i,s){let a=[],c=0;for(let l of i){let d=Mi(l,s.yc(c));d==null&&(d={nullValue:"NULL_VALUE"}),a.push(d),c++}return{arrayValue:{values:a}}}(r,e)}return function(i,s){if((i=Jt(i))===null)return{nullValue:"NULL_VALUE"};if(typeof i=="number")return rp(s.serializer,i);if(typeof i=="boolean")return{booleanValue:i};if(typeof i=="string")return{stringValue:i};if(i instanceof Date){let a=J.fromDate(i);return{timestampValue:ci(s.serializer,a)}}if(i instanceof J){let a=new J(i.seconds,1e3*Math.floor(i.nanoseconds/1e3));return{timestampValue:ci(s.serializer,a)}}if(i instanceof me)return{geoPointValue:{latitude:i.latitude,longitude:i.longitude}};if(i instanceof fe)return{bytesValue:ph(s.serializer,i._byteString)};if(i instanceof ft){let a=s.databaseId,c=i.firestore._databaseId;if(!c.isEqual(a))throw s.wc(`Document reference is for database ${c.projectId}/${c.database} but should be for database ${a.projectId}/${a.database}`);return{referenceValue:La(i.firestore._databaseId||s.databaseId,i._key.path)}}if(i instanceof pe)return function(c,l){return{mapValue:{fields:{[Da]:{stringValue:xa},[nn]:{arrayValue:{values:c.toArray().map(f=>{if(typeof f!="number")throw l.wc("VectorValues must only contain numeric values.");return Oa(l.serializer,f)})}}}}}}(i,s);throw s.wc(`Unsupported field value: ${Ra(i)}`)}(r,e)}function Gh(r,e){let n={};return ql(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Ie(r,(i,s)=>{let a=Mi(s,e.Vc(i));a!=null&&(n[i]=a)}),{mapValue:{fields:n}}}function Kh(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof J||r instanceof me||r instanceof fe||r instanceof ft||r instanceof lr||r instanceof pe)}function Ha(r,e,n){if(!Kh(n)||!Rl(n)){let i=Ra(n);throw i==="an object"?e.wc(r+" a custom object"):e.wc(r+" "+i)}}function Ta(r,e,n){if((e=Jt(e))instanceof pn)return e._internalPath;if(typeof e=="string")return Qa(r,e);throw Ri("Field path arguments must be of type string or ",r,!1,void 0,n)}var wg=new RegExp("[~\\*/\\[\\]]");function Qa(r,e,n){if(e.search(wg)>=0)throw Ri(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,n);try{return new pn(...e.split("."))._internalPath}catch{throw Ri(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,n)}}function Ri(r,e,n,i,s){let a=i&&!i.isEmpty(),c=s!==void 0,l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let d="";return(a||c)&&(d+=" (found",a&&(d+=` in field ${i}`),c&&(d+=` in document ${s}`),d+=")"),new F(P.INVALID_ARGUMENT,l+r+d)}function Wh(r,e){return r.some(n=>n.isEqual(e))}var Ci=class{constructor(e,n,i,s,a){this._firestore=e,this._userDataWriter=n,this._key=i,this._document=s,this._converter=a}get id(){return this._key.path.lastSegment()}get ref(){return new ft(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new ba(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let n=this._document.data.field(Hh("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}},ba=class extends Ci{data(){return super.data()}};function Hh(r,e){return typeof e=="string"?Qa(r,e):e instanceof pn?e._internalPath:e._delegate._internalPath}function vg(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new F(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}var Aa=class{convertValue(e,n="none"){switch(ye(e)){case 0:return null;case 1:return e.booleanValue;case 2:return nt(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(re(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw B(62114,{value:e})}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){let i={};return Ie(e,(s,a)=>{i[s]=this.convertValue(a,n)}),i}convertVectorValue(e){var n,i,s;let a=(s=(i=(n=e.fields)===null||n===void 0?void 0:n[nn].arrayValue)===null||i===void 0?void 0:i.values)===null||s===void 0?void 0:s.map(c=>nt(c.doubleValue));return new pe(a)}convertGeoPoint(e){return new me(nt(e.latitude),nt(e.longitude))}convertArray(e,n){return(e.values||[]).map(i=>this.convertValue(i,n))}convertServerTimestamp(e,n){switch(n){case"previous":let i=xi(e);return i==null?null:this.convertValue(i,n);case"estimate":return this.convertTimestamp(er(e));default:return null}}convertTimestamp(e){let n=ne(e);return new J(n.seconds,n.nanos)}convertDocumentKey(e,n){let i=st.fromString(e);X(Ih(i),9688,{name:e});let s=new ei(i.get(1),i.get(3)),a=new z(i.popFirst(5));return s.isEqual(n)||ee(`Document ${a} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),a}};function Ig(r,e,n){let i;return i=r?n&&(n.merge||n.mergeFields)?r.toFirestore(e,n):r.toFirestore(e):e,i}var Pe=class{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},De=class r extends Ci{constructor(e,n,i,s,a,c){super(e,n,i,s,c),this._firestore=e,this._firestoreImpl=e,this.metadata=a}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let n=new Ye(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){let i=this._document.data.field(Hh("DocumentSnapshot.get",e));if(i!==null)return this._userDataWriter.convertValue(i,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new F(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e=this._document,n={};return n.type=r._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}};De._jsonSchemaVersion="firestore/documentSnapshot/1.0",De._jsonSchema={type:ct("string",De._jsonSchemaVersion),bundleSource:ct("string","DocumentSnapshot"),bundleName:ct("string"),bundle:ct("string")};var Ye=class extends De{data(e={}){return super.data(e)}},Ze=class r{constructor(e,n,i,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new Pe(s.hasPendingWrites,s.fromCache),this.query=i}get docs(){let e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(i=>{e.call(n,new Ye(this._firestore,this._userDataWriter,i.key,i,new Pe(this._snapshot.mutatedKeys.has(i.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new F(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,a){if(s._snapshot.oldDocs.isEmpty()){let c=0;return s._snapshot.docChanges.map(l=>{let d=new Ye(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Pe(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:d,oldIndex:-1,newIndex:c++}})}{let c=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>a||l.type!==3).map(l=>{let d=new Ye(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Pe(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter),f=-1,g=-1;return l.type!==0&&(f=c.indexOf(l.doc.key),c=c.delete(l.doc.key)),l.type!==1&&(c=c.add(l.doc),g=c.indexOf(l.doc.key)),{type:Eg(l.type),doc:d,oldIndex:f,newIndex:g}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new F(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e={};e.type=r._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Yn.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;let n=[],i=[],s=[];return this.docs.forEach(a=>{a._document!==null&&(n.push(a._document),i.push(this._userDataWriter.convertObjectMap(a._document.data.value.mapValue.fields,"previous")),s.push(a.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}};function Eg(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return B(61501,{type:r})}}function Qh(r){r=Lt(r,ft);let e=Lt(r.firestore,ve);return fg(Wa(e),r._key).then(n=>Zh(e,r,n))}Ze._jsonSchemaVersion="firestore/querySnapshot/1.0",Ze._jsonSchema={type:ct("string",Ze._jsonSchemaVersion),bundleSource:ct("string","QuerySnapshot"),bundleName:ct("string"),bundle:ct("string")};var Pi=class extends Aa{constructor(e){super(),this.firestore=e}convertBytes(e){return new fe(e)}convertReference(e){let n=this.convertDocumentKey(e,this.firestore._databaseId);return new ft(this.firestore,null,n)}};function Jh(r,e,n){r=Lt(r,ft);let i=Lt(r.firestore,ve),s=Ig(r.converter,e,n);return Yh(i,[gg($h(i),"setDoc",r._key,s,r.converter!==null,n).toMutation(r._key,de.none())])}function jt(r,e,n,...i){r=Lt(r,ft);let s=Lt(r.firestore,ve),a=$h(s),c;return c=typeof(e=Jt(e))=="string"||e instanceof pn?_g(a,"updateDoc",r._key,e,n,i):yg(a,"updateDoc",r._key,e),Yh(s,[c.toMutation(r._key,de.exists(!0))])}function Xh(r,...e){var n,i,s;r=Jt(r);let a={includeMetadataChanges:!1,source:"default"},c=0;typeof e[c]!="object"||bl(e[c])||(a=e[c++]);let l={includeMetadataChanges:a.includeMetadataChanges,source:a.source};if(bl(e[c])){let w=e[c];e[c]=(n=w.next)===null||n===void 0?void 0:n.bind(w),e[c+1]=(i=w.error)===null||i===void 0?void 0:i.bind(w),e[c+2]=(s=w.complete)===null||s===void 0?void 0:s.bind(w)}let d,f,g;if(r instanceof ft)f=Lt(r.firestore,ve),g=Vi(r._key.path),d={next:w=>{e[c]&&e[c](Zh(f,r,w))},error:e[c+1],complete:e[c+2]};else{let w=Lt(r,bi);f=Lt(w.firestore,ve),g=w._query;let v=new Pi(f);d={next:C=>{e[c]&&e[c](new Ze(f,v,w,C))},error:e[c+1],complete:e[c+2]},vg(r._query)}return function(v,C,V,N){let D=new Ei(N),U=new wi(C,D,V);return v.asyncQueue.enqueueAndForget(async()=>xh(await wa(v),U)),()=>{D.Ou(),v.asyncQueue.enqueueAndForget(async()=>Vh(await wa(v),U))}}(Wa(f),g,l,d)}function Yh(r,e){return function(i,s){let a=new Ot;return i.asyncQueue.enqueueAndForget(async()=>rg(await dg(i),s,a)),a.promise}(Wa(r),e)}function Zh(r,e,n){let i=n.docs.get(e._key),s=new Pi(r);return new De(r,s,e._key,i,new Pe(n.hasPendingWrites,n.fromCache),e.converter)}function td(){return new hr("deleteField")}(function(e,n=!0){(function(s){gn=s})(Du),$n(new Xt("firestore",(i,{instanceIdentifier:s,options:a})=>{let c=i.getProvider("app").getImmediate(),l=new ve(new Ks(i.getProvider("auth-internal")),new Qs(c,i.getProvider("app-check-internal")),function(f,g){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new F(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ei(f.options.projectId,g)}(c,s),c);return a=Object.assign({useFetchStreams:n},a),l._setSettings(a),l},"PUBLIC").setMultipleInstances(!0)),he(Lu,Fu,e),he(Lu,Fu,"esm2017")})();function ed(r,e,n,i){if(!r)return{valid:!1,error:"empty"};if(r.length<4)return{valid:!1,error:"tooShort"};let s=e.letters[0].toLowerCase();if(!r.includes(s))return{valid:!1,error:"missingCenter"};let a=new Set(e.letters.map(d=>d.toLowerCase()));for(let d of r)if(!a.has(d))return{valid:!1,error:"badLetter"};if(!e.words.includes(r))return i&&i.has&&i.has(r)?{valid:!1,error:"notInWordList"}:{valid:!1,error:"notValidWord"};if(n.includes(r))return{valid:!1,error:"alreadyFound"};let c=new Set(r).size===7;return{valid:!0,score:r.length===4?1:r.length+(c?7:0),isPangram:c}}var Me=[{key:"beginner",pct:0},{key:"goodStart",pct:.02},{key:"movingUp",pct:.05},{key:"good",pct:.08},{key:"solid",pct:.15},{key:"niceLvl",pct:.25},{key:"great",pct:.4},{key:"amazing",pct:.5},{key:"genius",pct:.7},{key:"queenBee",pct:1}],Ja={en:{name:"English",flag:"\u{1F1FA}\u{1F1F8}",dailyName:"NYT Daily"},it:{name:"Italiano",flag:"\u{1F1EE}\u{1F1F9}",dailyName:"Apegramma"}};function nd(){let r=["Happy","Lucky","Sunny","Cool","Bright","Swift","Calm"],e=["Bee","Hive","Honey","Comb","Wing","Pollen","Nectar"],n=Math.floor(Math.random()*99)+1,i=r[Math.floor(Math.random()*r.length)],s=e[Math.floor(Math.random()*e.length)];return`${i}-${s}-${n}`}async function rd(r=!1){let e="https://nytbee.com/",n=r?`https://corsproxy.io/?${encodeURIComponent(e)}`:e,i=await fetch(n);if(!i.ok)throw new Error("Failed to fetch NYT puzzle");let s=await i.text(),c=new DOMParser().parseFromString(s,"text/html"),l=Array.from(c.querySelectorAll('a[id^="link-definition-"]')).map(D=>D.id.replace("link-definition-","").toLowerCase()).filter(D=>D.length>=4);if(l.length===0)throw new Error("No words found on page");let d=new Set(l[0].split(""));l.forEach(D=>{let U=new Set(D.split(""));d=new Set([...d].filter(M=>U.has(M)))});let f=Array.from(d)[0]?.toUpperCase();if(!f)throw new Error("Center letter detection failed");let w=Array.from(c.querySelectorAll("script")).map(D=>D.textContent).join(" ").match(/\[\s*"[A-Z]"(?:\s*,\s*"[A-Z]"){6}\s*\]/gi)||[],v=null;for(let D of w){let U=D.match(/[A-Z]/gi).map(M=>M.toUpperCase());if(U.includes(f)){let M=U.filter(G=>G!==f);v=[f,...M];break}}if(!v)throw new Error("Could not match letters to word list");let C=l.reduce((D,U)=>{let M=U.length===4?1:U.length;return new Set(U).size===7&&(M+=7),D+M},0),N="nyt-"+new Date().toISOString().split("T")[0];return{puzzleId:N,puzzle:{id:N,letters:v,words:l,maxScore:C,author:"NYT Daily"}}}async function id(r=!1){let e="https://www.laregione.ch/giochi/apegramma",n=r?`https://corsproxy.io/?${encodeURIComponent(e)}`:e,i=await fetch(n);if(!i.ok)throw new Error("Fetch failed");let a=(await i.text()).match(/<div[^>]*id="jsonDati"[^>]*>(.*?)<\/div>/);if(!a)throw new Error("Data not found");let c=JSON.parse(a[1]);if(!c.data||!c.data.letters)throw new Error("Invalid data structure");let l=c.data,d=l.central.toLowerCase(),g=l.letters.toLowerCase().split(" ").map(D=>D.trim()).filter(D=>D).filter(D=>D!==d).sort(),w=[d,...g],v=Object.keys(l.validWords),C=0;v.forEach(D=>{let U=D.length===4?1:D.length;new Set(D).size===7&&(U+=7),C+=U});let N="apegramma-"+new Date().toISOString().split("T")[0];return{puzzleId:N,puzzle:{id:N,letters:w,words:v,maxScore:C,author:"Apegramma Daily"}}}var Xa=168*60*60*1e3;async function sd(r,e,n,i){if(!e)return;let s=Pt(r,"rooms",e.toLowerCase()),a=J.fromMillis(Date.now()+Xa);await jt(s,{[`foundWords.${n}`]:i,expiresAt:a})}async function od(r,e,n,i){if(e)try{let s=Pt(r,"rooms",e.toLowerCase()),a=J.fromMillis(Date.now()+Xa);await jt(s,{puzzleId:n,language:i,foundWords:{},expiresAt:a})}catch(s){console.error("Error syncing puzzle:",s)}}async function ad(r,e,n){if(e)try{let i=Pt(r,"rooms",e.toLowerCase()),s=J.fromMillis(Date.now()+Xa);await jt(i,{[`players.${n}.online`]:!0,[`players.${n}.lastActive`]:J.now(),expiresAt:s})}catch(i){console.warn("Heartbeat failed:",i)}}var cd=168*60*60*1e3;async function ud(r,e,n,i,s,a,c){let l=Pt(r,"rooms",e),d=J.fromMillis(Date.now()+cd);await Jh(l,{code:n,puzzleId:i,language:s,createdAt:J.now(),expiresAt:d,players:{[a]:{nickname:c,online:!0,lastActive:J.now()}},foundWords:{}})}async function ld(r,e,n,i){let s=Pt(r,"rooms",e),a=await Qh(s);if(!a.exists())throw new Error("Room not found");let c=J.fromMillis(Date.now()+cd);return await jt(s,{[`players.${n}`]:{nickname:i,online:!0,lastActive:J.now()},expiresAt:c}),a.data()}async function hd(r,e,n){if(!e)return;let i=Pt(r,"rooms",e);try{await jt(i,{[`players.${n}`]:td()})}catch(s){console.warn("Error removing player from room:",s)}}var Tg={apiKey:"AIzaSyDummyKeyForFreeTier",projectId:"spelling-bee-relay-1025"},bg=ks(Tg),Gt=qh(bg),yd=localStorage.getItem("sb_use_emulator")==="true";yd&&(console.log("Using Firestore Emulator at 127.0.0.1:8080"),Ka(Gt,"127.0.0.1",8080));globalThis.switchMultiplayerEnv=()=>{let r=!yd;localStorage.setItem("sb_use_emulator",r),location.reload()};var E={playerId:localStorage.getItem("sb_playerId")||crypto.randomUUID(),currentInput:"",foundWords:[],wordFinders:{},score:0,puzzle:null,puzzleId:null,language:localStorage.getItem("sb_language")||"en",attributionMode:0,multiplayer:{roomCode:null,nickname:localStorage.getItem("sb_nickname")||"",teammates:[],step:"nickname"},dbRefs:{}};localStorage.setItem("sb_playerId",E.playerId);window.state=E;var Ya=null,pr=null;function ji(){return E.language==="it"?typeof PUZZLES_IT<"u"?PUZZLES_IT:{}:PUZZLES}function Ag(){return E.language==="it"?typeof VALID_WORDS_IT<"u"?VALID_WORDS_IT:new Set:VALID_WORDS}var L={input:document.getElementById("input-text"),cursor:document.querySelector(".cursor"),score:document.getElementById("score"),messageArea:document.getElementById("message-area"),levelText:document.getElementById("current-level"),wordsList:document.getElementById("words-list"),foundCount:document.getElementById("found-count"),toggleWordsBtn:document.getElementById("toggle-words-btn"),toggleAttributionBtn:document.getElementById("toggle-attribution-btn"),deleteBtn:document.getElementById("delete-btn"),enterBtn:document.getElementById("enter-btn"),restartBtn:document.getElementById("restart-btn"),shuffleBtn:document.getElementById("shuffle-btn"),dotsContainer:document.querySelector(".dots-container"),cells:{center:document.getElementById("cell-center"),outer:[document.getElementById("cell-1"),document.getElementById("cell-2"),document.getElementById("cell-3"),document.getElementById("cell-4"),document.getElementById("cell-5"),document.getElementById("cell-6")]},multi:{btn:document.getElementById("multiplayer-btn"),screen:document.getElementById("multiplayer-screen"),closeBtn:document.getElementById("close-multi-btn"),stepNickname:document.getElementById("multi-setup"),stepMenu:document.getElementById("multi-menu"),stepJoin:document.getElementById("multi-join"),stepActive:document.getElementById("multi-active"),nicknameInput:document.getElementById("nickname-input"),saveNicknameBtn:document.getElementById("save-nickname-btn"),createRoomBtn:document.getElementById("create-room-btn"),roomCodeInput:document.getElementById("room-code-input"),confirmJoinBtn:document.getElementById("join-confirm-btn"),backBtn:document.getElementById("join-back-btn"),leaveBtn:document.getElementById("leave-room-btn"),activeRoomCode:document.getElementById("active-room-code"),playerList:document.getElementById("player-list"),displayNickname:document.getElementById("display-nickname"),editNicknameMenu:document.getElementById("edit-nickname-menu"),editNicknameRoom:document.getElementById("edit-nickname-room"),banner:document.getElementById("multiplayer-banner"),bannerRoomCode:document.getElementById("banner-room-code"),shareRoomBtnMenu:document.getElementById("share-room-btn-menu"),shareRoomBtnActive:document.getElementById("share-room-btn-active"),shareBannerBtn:document.getElementById("share-banner-btn")}};document.addEventListener("DOMContentLoaded",Sg);async function Sg(){if(Rg(),!E.puzzle)await vd();else{let n=ji();!E.puzzle&&n[E.puzzleId]&&(E.puzzle=n[E.puzzleId])}let e=new URLSearchParams(window.location.search).get("room");e?zi(e,!1).catch(n=>{console.warn("Failed to join room from URL:",n),window.history.replaceState({},document.title,window.location.pathname)}):E.multiplayer.roomCode&&zi(E.multiplayer.roomCode,!1).catch(()=>{E.multiplayer.roomCode=null,kt()}),yr(),$t(),At(),qi(),In(),Cg()}function Rg(){let r=localStorage.getItem("sb_mobile_state");if(r){let e=JSON.parse(r);Object.assign(E,e)}}function kt(){localStorage.setItem("sb_mobile_state",JSON.stringify(E))}function Bi(r){if(typeof r=="string"&&r.startsWith("nyt-")){E.puzzleId!==r&&wd(!1);return}if(typeof r=="string"&&r.startsWith("apegramma-")){E.puzzleId!==r&&Id(!1);return}let n=ji()[r];if(n){let i=E.puzzleId!==r;E.puzzleId=r,E.puzzle=n,i&&(E.foundWords=[],E.score=0,E.currentInput=""),kt(),yr(),$t(),At()}}function _d(){let r=ji(),e=Object.keys(r);if(e.length===0)return;if(e.length===1){Bi(e[0]);return}let n,i=0,s=E.puzzleId;do n=e[Math.floor(Math.random()*e.length)],i++;while(n===s&&i<10);Bi(n),E.multiplayer.roomCode?Ui(E.puzzleId):Dt(t("newRandomPuzzle"),1e3)}function yr(){if(!E.puzzle)return;L.cells.center.textContent=E.puzzle.letters[0].toUpperCase();let r=E.puzzle.letters.slice(1);L.cells.outer.forEach((e,n)=>{e.textContent=r[n].toUpperCase(),e.dataset.letter=r[n]})}function Cg(){L.cells.center.onclick=()=>Za(E.puzzle.letters[0]),L.cells.outer.forEach(n=>{n.onclick=()=>Za(n.dataset.letter)}),L.deleteBtn.onclick=dd,L.enterBtn.onclick=fd,L.shuffleBtn.onclick=Fg,L.restartBtn.onclick=()=>{E.multiplayer.roomCode&&!confirm(t("confirmChangeGame"))||_d()},L.nytDailyBtn=document.getElementById("nyt-daily-btn"),L.nytDailyBtn.onclick=()=>{E.multiplayer.roomCode&&!confirm(t("confirmChangeGame"))||vd()};let r=document.getElementById("lang-btn"),e=document.getElementById("lang-menu");r&&e&&(r.onclick=n=>{n.stopPropagation(),e.classList.toggle("hidden")},e.querySelectorAll("button[data-lang]").forEach(n=>{n.onclick=()=>{let i=n.dataset.lang;e.classList.add("hidden"),i!==E.language&&Dg(i)}}),document.addEventListener("click",()=>{e.classList.add("hidden")})),L.levelContainer=document.querySelector(".level-container"),L.levelContainer.onclick=xg,L.levelContainer.style.cursor="pointer",L.multi.btn.onclick=vn,L.multi.closeBtn.onclick=()=>L.multi.screen.style.display="none",L.multi.saveNicknameBtn.onclick=pd,L.multi.saveNicknameBtn.onclick=pd,L.multi.createRoomBtn.onclick=Ed,document.getElementById("join-room-btn").onclick=()=>{E.multiplayer.step="join",vn()},L.multi.confirmJoinBtn.onclick=Vg,L.multi.backBtn.onclick=()=>{E.multiplayer.step="menu",vn()},L.multi.leaveBtn.onclick=Og,L.multi.shareRoomBtnMenu.onclick=tc,L.multi.shareRoomBtnActive.onclick=tc,L.multi.shareBannerBtn.onclick=tc,L.toggleWordsBtn.onclick=()=>{let n=L.wordsList.classList.toggle("hidden");L.toggleWordsBtn.innerText=n?t("show"):t("hide")},L.toggleAttributionBtn.onclick=()=>{E.attributionMode=(E.attributionMode+1)%3,kt(),At()},L.multi.editNicknameMenu.onclick=n=>{n.preventDefault(),gd()},L.multi.editNicknameRoom.onclick=n=>{n.preventDefault(),gd()},document.addEventListener("keydown",n=>{if(n.target.tagName==="INPUT"||n.target.tagName==="TEXTAREA"||n.target.isContentEditable)return;let i=n.key.toLowerCase();i==="backspace"?(dd(),n.preventDefault()):i==="enter"?(fd(),n.preventDefault()):E.puzzle&&E.puzzle.letters.map(s=>s.toLowerCase()).includes(i)&&(Za(i),n.preventDefault())})}function Za(r){E.currentInput.length<20&&(E.currentInput+=r.toLowerCase(),L.input.innerText=E.currentInput)}function dd(){E.currentInput=E.currentInput.slice(0,-1),L.input.innerText=E.currentInput}function fd(){let r=E.currentInput;if(!r)return;let e=Pg(r);e.valid?(E.foundWords.push(r),E.score+=e.score,E.foundWords.sort(),E.wordFinders[r]=E.playerId,kt(),$t(),At(),Dt(e.isPangram?t("pangram"):t("nice"),1500),Lg(r)):Dt(e.error,1e3),setTimeout(()=>{E.currentInput="",L.input.innerText=""},500)}function Pg(r){let e=ed(r,E.puzzle,E.foundWords,Ag());return e.valid?e:{valid:!1,error:t(e.error)}}function Dt(r,e){L.messageArea.innerText=r,L.messageArea.classList.add("visible"),setTimeout(()=>L.messageArea.classList.remove("visible"),e)}function $t(){if(L.score.innerText=E.score,!E.puzzle)return;let r=E.puzzle.maxScore,e=0;Me.forEach((i,s)=>{E.score>=Math.floor(r*i.pct)&&(e=s)}),L.levelText.innerText=t(Me[e].key),L.dotsContainer.innerHTML="";let n=document.createElement("div");n.className="progress-line-fill",n.style.width=`${e/(Me.length-1)*100}%`,L.dotsContainer.appendChild(n),Me.forEach((i,s)=>{let a=document.createElement("div");a.className=`dot ${s<=e?"active":""} ${s===e?"current":""}`,a.style.left=`${s/(Me.length-1)*100}%`,L.dotsContainer.appendChild(a)})}function At(){L.foundCount.innerText=`${E.foundWords.length} ${E.foundWords.length!==1?t("words"):t("word")}`,L.wordsList.innerHTML="";let r=E.attributionMode,e=E.multiplayer.rawPlayers||{},n=["#f7da21","#4ecdc4","#ff6b6b","#a8e6cf","#dfe6e9","#fd79a8","#74b9ff"],i={},s=0;if(E.foundWords.forEach(a=>{let c=E.wordFinders[a];c&&!i[c]&&(i[c]=n[s++%n.length])}),r===0)E.foundWords.forEach(a=>{let c=document.createElement("span");c.innerText=a,c.className="found-word",L.wordsList.appendChild(c)});else if(r===1)E.foundWords.forEach(a=>{let c=E.wordFinders[a],l=i[c]||"#ccc",d=document.createElement("span");d.innerText=a,d.style.color=l,d.className="found-word",L.wordsList.appendChild(d)});else{let a={};E.foundWords.forEach(c=>{let l=E.wordFinders[c];a[l]||(a[l]=[]),a[l].push(c)}),Object.keys(a).sort((c,l)=>{if(c===E.playerId)return-1;if(l===E.playerId)return 1;let d=gr(c,e),f=gr(l,e);return d.localeCompare(f)}).forEach(c=>{let l=gr(c,e),d=i[c]||"#ccc",f=document.createElement("div");f.className="word-section",f.innerHTML=`<div class="word-section-header" style="color: ${d}">${l} (${a[c].length})</div><div class="word-section-words"></div>`,a[c].forEach(g=>{let w=document.createElement("span");w.innerText=g,w.style.color=d,w.className="found-word",f.querySelector(".word-section-words").appendChild(w)}),L.wordsList.appendChild(f)})}}function gr(r,e){if(!r)return t("unknown");let n=e[r];if(!n)return r.length>20?t("ghost"):r;let i=n.nickname||t("anonymous"),s=Object.entries(e).filter(([c,l])=>(l.nickname||"Anonymous")===i).sort(([c],[l])=>c.localeCompare(l));if(s.length<=1)return i;let a=s.findIndex(([c])=>c===r);return`${i} (#${a+1})`}async function wd(r=!0){try{let{puzzleId:e,puzzle:n}=await rd(!0),i=E.puzzleId!==e;E.puzzleId=e,E.puzzle=n,i&&(E.foundWords=[],E.score=0),kt(),yr(),$t(),At(),Dt(t("nytDailyLoaded"),2e3),r&&E.multiplayer.roomCode&&Ui(E.puzzleId)}catch(e){console.error("NYT Load Error:",e),Dt(t("nytLoadFailed"),2e3)}}async function vd(r=!0){E.language==="it"?await Id(r):await wd(r)}async function Id(r=!0){Dt(t("fetchingApegramma"),2e3);try{let{puzzleId:e,puzzle:n}=await id(!0),i=E.puzzleId!==e;E.puzzleId=e,E.puzzle=n,i&&(E.foundWords=[],E.score=0,E.currentInput=""),kt(),yr(),$t(),At(),qi(),In(),Dt(t("apegrammLoaded"),2e3),r&&E.multiplayer.roomCode&&Ui(E.puzzleId)}catch(e){console.warn("Scraping failed, trying local fallback",e);try{let n=new Date,i=ji(),s=Object.keys(i).length;if(s===0)throw new Error("No Italian puzzles loaded");let a=(n.getFullYear()*366+n.getMonth()*31+n.getDate())%s,c=i[a],d="apegramma-"+new Date().toISOString().split("T")[0];E.puzzleId=d,E.puzzle={...c,id:d,author:"Apegramma Daily (Offline)"},E.foundWords=[],E.score=0,E.currentInput="",kt(),yr(),$t(),At(),qi(),In(),Dt(t("apegrammLoaded"),2e3),r&&E.multiplayer.roomCode&&Ui(E.puzzleId)}catch(n){console.error(n),Dt(t("errorLoadingApegramma"),3e3)}}}function Dg(r){Ja[r]&&(E.multiplayer.roomCode&&E.multiplayer.step==="active"&&!confirm(t("confirmChangeGame"))||(E.language=r,localStorage.setItem("sb_language",r),E.foundWords=[],E.score=0,E.currentInput="",_d(),In()))}function In(){let r=Ja[E.language];if(!r)return;let e=document.getElementById("lang-flag");e&&(e.textContent=r.flag);let n=document.getElementById("nyt-daily-btn");n&&(n.title=r.dailyName);let i=(C,V)=>{let N=document.getElementById(C);N&&(N.innerText=t(V))},s=(C,V)=>{let N=document.getElementById(C);N&&(N.placeholder=t(V))},a=(C,V)=>{let N=document.getElementById(C);N&&(N.title=t(V))};a("multiplayer-btn","multiplayer"),a("lang-btn","language"),a("restart-btn","newRandomPuzzleTitle"),i("score-label","scoreLabel"),i("delete-btn","delete"),i("enter-btn","enter");let c=L.wordsList.classList.contains("hidden");L.toggleWordsBtn.textContent=c?t("show"):t("hide"),i("save-nickname-btn","continue"),i("create-room-btn","createRoom"),i("join-room-btn","joinRoomManually"),i("join-confirm-btn","join"),i("join-back-btn","back"),i("leave-room-btn","leaveRoom"),i("share-room-link-text-menu","shareRoomLink");let l=document.querySelector("#multi-setup p");l&&(l.innerText=t("chooseNickname"));let d=document.querySelector("#multi-join p");d&&(d.innerText=t("enterRoomCode"));let f=document.querySelector(".multi-header h3");f&&(f.innerText=t("multiplayer"));let g=document.querySelector(".modal-header h2");g&&(g.innerText=t("rankings")),i("logged-in-label","loggedInAs"),i("players-label","players"),i("room-code-label","roomCode"),i("banner-room-label","room"),i("edit-label-menu","edit"),i("edit-label-room","edit"),s("nickname-input","anonymous"),s("room-code-input","roomCode");let w=document.getElementById("share-banner-btn");w&&(w.title=t("shareRoomLink"));let v=document.getElementById("share-room-btn-active");v&&(v.title=t("shareRoomLink")),typeof $t=="function"&&$t(),typeof At=="function"&&At(),E.multiplayer.step==="active"&&typeof _r=="function"&&_r()}function xg(){let r=document.getElementById("rankings-modal"),e=document.getElementById("rankings-list");e.innerHTML="";let n=document.createElement("div");n.className="ranking-row ranking-header",n.innerHTML=`
        <span class="rank-name">${t("rank")}</span>
        <span class="rank-score">${t("minimumScore")}</span>
    `,e.appendChild(n);let i=E.puzzle.maxScore;[...Me].reverse().forEach(s=>{let a=document.createElement("div");a.className=`ranking-row ${E.score>=Math.floor(i*s.pct)?"reached":""}`,a.innerHTML=`<span class="rank-name">${t(s.key)}</span><span class="rank-score">${Math.floor(i*s.pct)}</span>`,e.appendChild(a)}),r.style.display="block",window.onclick=s=>{s.target==r&&(r.style.display="none")},document.getElementById("close-rankings-btn").onclick=()=>{r.style.display="none"}}async function zi(r,e=!0){let n=r.toLowerCase().trim(),i=await ld(Gt,n,E.playerId,E.multiplayer.nickname);E.multiplayer.roomCode=n,E.multiplayer.displayCode=i.code||n,E.multiplayer.step="active",i.language&&i.language!==E.language&&(E.language=i.language,localStorage.setItem("sb_language",i.language),In()),i.puzzleId&&i.puzzleId!==E.puzzleId&&await Bi(i.puzzleId),i.foundWords&&(E.foundWords=Object.keys(i.foundWords),E.wordFinders={...i.foundWords},E.score=E.foundWords.reduce((s,a)=>{let c=Td(a);return s+(c.valid?c.score:0)},0),E.foundWords.sort(),At(),$t()),kt(),Ng(n),qi(),e&&vn(),window.location.search.includes("room=")&&window.history.replaceState({},document.title,window.location.pathname)}async function Ed(){let r=nd(),e=r.toLowerCase();await ud(Gt,e,r,E.puzzleId,E.language,E.playerId,E.multiplayer.nickname),await zi(r)}async function tc(){if(!E.multiplayer.roomCode)try{await Ed()}catch(i){console.error("Failed to create room for sharing:",i);return}let r=E.multiplayer.displayCode||E.multiplayer.roomCode.toUpperCase(),e=`${window.location.origin}${window.location.pathname}?room=${r}`,n=E.language==="it"?"Entra nella mia stanza di Spelling Bee!":"Join my Spelling Bee room!";navigator.share?navigator.share({title:"Spelling Bee Multiplayer",text:n,url:e}).catch(()=>md(e)):md(e)}function md(r){navigator.clipboard.writeText(r).then(()=>{let e=E.language==="it"?"Link copiato negli appunti!":"Link copied to clipboard!";Dt(e,2e3)})}function Vg(){let r=L.multi.roomCodeInput.value.trim().toLowerCase();r&&zi(r).catch(e=>Dt(t("roomNotFound"),2e3))}async function kg(){await ad(Gt,E.multiplayer.roomCode,E.playerId)}function Ng(r){Ya&&Ya(),pr&&clearInterval(pr),pr=setInterval(kg,3e4),Ya=Xh(Pt(Gt,"rooms",r),e=>{let n=e.data();if(n){if(E.multiplayer.rawPlayers=n.players||{},n.players){let i=Date.now();E.multiplayer.teammates=Object.entries(n.players).map(([s,a])=>{let c=a.lastActive?.toMillis?a.lastActive.toMillis():0,l=a.online&&i-c<9e4;return{playerId:s,nickname:a.nickname,online:l}}),_r()}else E.multiplayer.teammates=[],_r();if(n.foundWords){let i=!1;Object.keys(n.foundWords).forEach(s=>{let a=n.foundWords[s];if(E.wordFinders[s]=a,!E.foundWords.includes(s)&&(E.foundWords.push(s),i=!0,a!==E.playerId)){let c=gr(a,n.players||{});Dt(`${c} ${t("foundWord")} ${s}`,2e3)}}),(i||E.foundWords.length>0)&&(E.score=E.foundWords.reduce((s,a)=>{let c=Td(a);return s+(c.valid?c.score:0)},0),E.foundWords.sort(),kt(),At(),$t())}n.language&&n.language!==E.language&&(E.language=n.language,localStorage.setItem("sb_language",n.language),In()),n.puzzleId&&n.puzzleId!==E.puzzleId&&Bi(n.puzzleId)}})}function Td(r){if(!E.puzzle||!E.puzzle.words.includes(r))return{valid:!1};let e=new Set(r).size===7;return{valid:!0,score:r.length===4?1:r.length+(e?7:0)}}function _r(){L.multi.playerList.innerHTML="";let r=E.multiplayer.rawPlayers||{};E.multiplayer.teammates.forEach(e=>{let n=document.createElement("div");n.className=`player-item ${e.playerId===E.playerId?"self":""}`;let i=gr(e.playerId,r);n.innerHTML=`
            <div class="player-status ${e.online?"online":"offline"}"></div>
            <span>${i} ${e.playerId===E.playerId?`(${t("you")})`:""}</span>
        `,L.multi.playerList.appendChild(n)})}function vn(){L.multi.screen.style.display="flex",[L.multi.stepNickname,L.multi.stepMenu,L.multi.stepJoin,L.multi.stepActive].forEach(e=>e.classList.add("hidden")),E.multiplayer.step==="nickname"&&E.multiplayer.nickname&&(E.multiplayer.step="menu");let r=E.multiplayer.step;r==="nickname"?L.multi.stepNickname.classList.remove("hidden"):r==="menu"?(L.multi.stepMenu.classList.remove("hidden"),L.multi.displayNickname.innerText=E.multiplayer.nickname):r==="join"?L.multi.stepJoin.classList.remove("hidden"):r==="active"&&(L.multi.stepActive.classList.remove("hidden"),L.multi.activeRoomCode.innerText=E.multiplayer.displayCode||E.multiplayer.roomCode,_r())}function pd(){let r=L.multi.nicknameInput.value.trim();if(r){if(E.multiplayer.nickname=r,localStorage.setItem("sb_nickname",r),E.multiplayer.roomCode){let e=Pt(Gt,"rooms",E.multiplayer.roomCode);jt(e,{[`players.${E.playerId}.nickname`]:r}).catch(n=>console.warn("Nickname update failed:",n))}E.multiplayer.step="menu",vn(),At()}}async function Og(){confirm(t("leaveRoomConfirm"))&&(pr&&clearInterval(pr),await hd(Gt,E.multiplayer.roomCode,E.playerId),E.multiplayer.roomCode=null,E.multiplayer.step="menu",kt(),location.reload())}function gd(){let r=prompt("New nickname:",E.multiplayer.nickname);if(r&&r.trim()){let e=r.trim();if(E.multiplayer.nickname=e,kt(),E.multiplayer.roomCode){let n=Pt(Gt,"rooms",E.multiplayer.roomCode);jt(n,{[`players.${E.playerId}.nickname`]:e}).catch(i=>console.warn("Nickname update failed:",i))}vn(),At()}}function Lg(r){sd(Gt,E.multiplayer.roomCode,r,E.playerId)}async function Ui(r){await od(Gt,E.multiplayer.roomCode,r,E.language)}function qi(){E.multiplayer.roomCode?(L.multi.banner.classList.remove("hidden"),L.multi.bannerRoomCode.innerText=E.multiplayer.displayCode||E.multiplayer.roomCode):L.multi.banner.classList.add("hidden")}function Fg(){if(!E.puzzle)return;let r=E.puzzle.letters.slice(1);for(let e=r.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[r[e],r[n]]=[r[n],r[e]]}L.cells.outer.forEach((e,n)=>{e.textContent=r[n].toUpperCase(),e.dataset.letter=r[n]})}})();
/*! Bundled license information:

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/webchannel-wrapper/dist/webchannel-blob/esm/webchannel_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
  * @license
  * Copyright 2020 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law | agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=mobile_bundle.js.map
