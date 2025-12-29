(()=>{var eu=()=>{};var iu=function(r){let e=[],n=0;for(let i=0;i<r.length;i++){let s=r.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&i+1<r.length&&(r.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++i)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Wd=function(r){let e=[],n=0,i=0;for(;n<r.length;){let s=r[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){let a=r[n++];e[i++]=String.fromCharCode((s&31)<<6|a&63)}else if(s>239&&s<365){let a=r[n++],c=r[n++],l=r[n++],d=((s&7)<<18|(a&63)<<12|(c&63)<<6|l&63)-65536;e[i++]=String.fromCharCode(55296+(d>>10)),e[i++]=String.fromCharCode(56320+(d&1023))}else{let a=r[n++],c=r[n++];e[i++]=String.fromCharCode((s&15)<<12|(a&63)<<6|c&63)}}return e.join("")},su={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();let n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<r.length;s+=3){let a=r[s],c=s+1<r.length,l=c?r[s+1]:0,d=s+2<r.length,f=d?r[s+2]:0,g=a>>2,w=(a&3)<<4|l>>4,I=(l&15)<<2|f>>6,C=f&63;d||(C=64,c||(I=64)),i.push(n[g],n[w],n[I],n[C])}return i.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(iu(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):Wd(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();let n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<r.length;){let a=n[r.charAt(s++)],l=s<r.length?n[r.charAt(s)]:0;++s;let f=s<r.length?n[r.charAt(s)]:64;++s;let w=s<r.length?n[r.charAt(s)]:64;if(++s,a==null||l==null||f==null||w==null)throw new ms;let I=a<<2|l>>4;if(i.push(I),f!==64){let C=l<<4&240|f>>2;if(i.push(C),w!==64){let x=f<<6&192|w;i.push(x)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}},ms=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Hd=function(r){let e=iu(r);return su.encodeByteArray(e,!0)},qn=function(r){return Hd(r).replace(/\./g,"")},ou=function(r){try{return su.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function au(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var Qd=()=>au().__FIREBASE_DEFAULTS__,Jd=()=>{if(typeof process>"u"||typeof process.env>"u")return;let r=process.env.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},Xd=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=r&&ou(r[1]);return e&&JSON.parse(e)},ps=()=>{try{return eu()||Qd()||Jd()||Xd()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},Yd=r=>{var e,n;return(n=(e=ps())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[r]},cu=r=>{let e=Yd(r);if(!e)return;let n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},gs=()=>{var r;return(r=ps())===null||r===void 0?void 0:r.config};var Or=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}};function Lr(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function uu(r){return(await fetch(r,{credentials:"include"})).ok}function lu(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let n={alg:"none",type:"JWT"},i=e||"demo-project",s=r.iat||0,a=r.sub||r.user_id;if(!a)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let c=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:a,user_id:a,firebase:{sign_in_provider:"custom",identities:{}}},r);return[qn(JSON.stringify(n)),qn(JSON.stringify(c)),""].join(".")}var Un={};function Zd(){let r={prod:[],emulator:[]};for(let e of Object.keys(Un))Un[e]?r.emulator.push(e):r.prod.push(e);return r}function tf(r){let e=document.getElementById(r),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",r),n=!0),{created:n,element:e}}var nu=!1;function hu(r,e){if(typeof window>"u"||typeof document>"u"||!Lr(window.location.host)||Un[r]===e||Un[r]||nu)return;Un[r]=e;function n(I){return`__firebase__banner__${I}`}let i="__firebase__banner",a=Zd().prod.length>0;function c(){let I=document.getElementById(i);I&&I.remove()}function l(I){I.style.display="flex",I.style.background="#7faaf0",I.style.position="fixed",I.style.bottom="5px",I.style.left="5px",I.style.padding=".5em",I.style.borderRadius="5px",I.style.alignItems="center"}function d(I,C){I.setAttribute("width","24"),I.setAttribute("id",C),I.setAttribute("height","24"),I.setAttribute("viewBox","0 0 24 24"),I.setAttribute("fill","none"),I.style.marginLeft="-6px"}function f(){let I=document.createElement("span");return I.style.cursor="pointer",I.style.marginLeft="16px",I.style.fontSize="24px",I.innerHTML=" &times;",I.onclick=()=>{nu=!0,c()},I}function g(I,C){I.setAttribute("id",C),I.innerText="Learn more",I.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",I.setAttribute("target","__blank"),I.style.paddingLeft="5px",I.style.textDecoration="underline"}function w(){let I=tf(i),C=n("text"),x=document.getElementById(C)||document.createElement("span"),k=n("learnmore"),V=document.getElementById(k)||document.createElement("a"),z=n("preprendIcon"),U=document.getElementById(z)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(I.created){let G=I.element;l(G),g(V,k);let et=f();d(U,z),G.append(U,x,V,et),document.body.appendChild(G)}a?(x.innerText="Preview backend disconnected.",U.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(U.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,x.innerText="Preview backend running in this workspace."),x.setAttribute("id",C)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",w):w()}function du(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ef(){var r;let e=(r=ps())===null||r===void 0?void 0:r.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function fu(){return!ef()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function ys(){try{return typeof indexedDB=="object"}catch{return!1}}function mu(){return new Promise((r,e)=>{try{let n=!0,i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),r(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var a;e(((a=s.error)===null||a===void 0?void 0:a.message)||"")}}catch(n){e(n)}})}var nf="FirebaseError",Ht=class r extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=nf,Object.setPrototypeOf(this,r.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,jn.prototype.create)}},jn=class{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){let i=n[0]||{},s=`${this.service}/${e}`,a=this.errors[e],c=a?rf(a,i):"Error",l=`${this.serviceName}: ${c} (${s}).`;return new Ht(s,l,i)}};function rf(r,e){return r.replace(sf,(n,i)=>{let s=e[i];return s!=null?String(s):`<${i}?>`})}var sf=/\{\$([^}]+)}/g;function je(r,e){if(r===e)return!0;let n=Object.keys(r),i=Object.keys(e);for(let s of n){if(!i.includes(s))return!1;let a=r[s],c=e[s];if(ru(a)&&ru(c)){if(!je(a,c))return!1}else if(a!==c)return!1}for(let s of i)if(!n.includes(s))return!1;return!0}function ru(r){return r!==null&&typeof r=="object"}var Dg=4*60*60*1e3;function Qt(r){return r&&r._delegate?r._delegate:r}var Jt=class{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var Se="[DEFAULT]";var _s=class{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){let i=new Or;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{let s=this.getOrInitializeService({instanceIdentifier:n});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;let i=this.normalizeInstanceIdentifier(e?.identifier),s=(n=e?.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(a){if(s)return null;throw a}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(af(e))try{this.getOrInitializeService({instanceIdentifier:Se})}catch{}for(let[n,i]of this.instancesDeferred.entries()){let s=this.normalizeInstanceIdentifier(n);try{let a=this.getOrInitializeService({instanceIdentifier:s});i.resolve(a)}catch{}}}}clearInstance(e=Se){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Se){return this.instances.has(e)}getOptions(e=Se){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let s=this.getOrInitializeService({instanceIdentifier:i,options:n});for(let[a,c]of this.instancesDeferred.entries()){let l=this.normalizeInstanceIdentifier(a);i===l&&c.resolve(s)}return s}onInit(e,n){var i;let s=this.normalizeInstanceIdentifier(n),a=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;a.add(e),this.onInitCallbacks.set(s,a);let c=this.instances.get(s);return c&&e(c,s),()=>{a.delete(e)}}invokeOnInitCallbacks(e,n){let i=this.onInitCallbacks.get(n);if(i)for(let s of i)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:of(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Se){return this.component?this.component.multipleInstances?e:Se:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function of(r){return r===Se?void 0:r}function af(r){return r.instantiationMode==="EAGER"}var Fr=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let n=new _s(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}};var cf=[],W;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(W||(W={}));var uf={debug:W.DEBUG,verbose:W.VERBOSE,info:W.INFO,warn:W.WARN,error:W.ERROR,silent:W.SILENT},lf=W.INFO,hf={[W.DEBUG]:"log",[W.VERBOSE]:"log",[W.INFO]:"info",[W.WARN]:"warn",[W.ERROR]:"error"},df=(r,e,...n)=>{if(e<r.logLevel)return;let i=new Date().toISOString(),s=hf[e];if(s)console[s](`[${i}]  ${r.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},$e=class{constructor(e){this.name=e,this._logLevel=lf,this._logHandler=df,this._userLogHandler=null,cf.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in W))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?uf[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,W.DEBUG,...e),this._logHandler(this,W.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,W.VERBOSE,...e),this._logHandler(this,W.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,W.INFO,...e),this._logHandler(this,W.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,W.WARN,...e),this._logHandler(this,W.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,W.ERROR,...e),this._logHandler(this,W.ERROR,...e)}};var ff=(r,e)=>e.some(n=>r instanceof n),pu,gu;function mf(){return pu||(pu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function pf(){return gu||(gu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var yu=new WeakMap,vs=new WeakMap,_u=new WeakMap,ws=new WeakMap,Es=new WeakMap;function gf(r){let e=new Promise((n,i)=>{let s=()=>{r.removeEventListener("success",a),r.removeEventListener("error",c)},a=()=>{n(kt(r.result)),s()},c=()=>{i(r.error),s()};r.addEventListener("success",a),r.addEventListener("error",c)});return e.then(n=>{n instanceof IDBCursor&&yu.set(n,r)}).catch(()=>{}),Es.set(e,r),e}function yf(r){if(vs.has(r))return;let e=new Promise((n,i)=>{let s=()=>{r.removeEventListener("complete",a),r.removeEventListener("error",c),r.removeEventListener("abort",c)},a=()=>{n(),s()},c=()=>{i(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",a),r.addEventListener("error",c),r.addEventListener("abort",c)});vs.set(r,e)}var Is={get(r,e,n){if(r instanceof IDBTransaction){if(e==="done")return vs.get(r);if(e==="objectStoreNames")return r.objectStoreNames||_u.get(r);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return kt(r[e])},set(r,e,n){return r[e]=n,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function wu(r){Is=r(Is)}function _f(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){let i=r.call(Mr(this),e,...n);return _u.set(i,e.sort?e.sort():[e]),kt(i)}:pf().includes(r)?function(...e){return r.apply(Mr(this),e),kt(yu.get(this))}:function(...e){return kt(r.apply(Mr(this),e))}}function wf(r){return typeof r=="function"?_f(r):(r instanceof IDBTransaction&&yf(r),ff(r,mf())?new Proxy(r,Is):r)}function kt(r){if(r instanceof IDBRequest)return gf(r);if(ws.has(r))return ws.get(r);let e=wf(r);return e!==r&&(ws.set(r,e),Es.set(e,r)),e}var Mr=r=>Es.get(r);function Iu(r,e,{blocked:n,upgrade:i,blocking:s,terminated:a}={}){let c=indexedDB.open(r,e),l=kt(c);return i&&c.addEventListener("upgradeneeded",d=>{i(kt(c.result),d.oldVersion,d.newVersion,kt(c.transaction),d)}),n&&c.addEventListener("blocked",d=>n(d.oldVersion,d.newVersion,d)),l.then(d=>{a&&d.addEventListener("close",()=>a()),s&&d.addEventListener("versionchange",f=>s(f.oldVersion,f.newVersion,f))}).catch(()=>{}),l}var vf=["get","getKey","getAll","getAllKeys","count"],If=["put","add","delete","clear"],Ts=new Map;function vu(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(Ts.get(e))return Ts.get(e);let n=e.replace(/FromIndex$/,""),i=e!==n,s=If.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(s||vf.includes(n)))return;let a=async function(c,...l){let d=this.transaction(c,s?"readwrite":"readonly"),f=d.store;return i&&(f=f.index(l.shift())),(await Promise.all([f[n](...l),s&&d.done]))[0]};return Ts.set(e,a),a}wu(r=>({...r,get:(e,n,i)=>vu(e,n)||r.get(e,n,i),has:(e,n)=>!!vu(e,n)||r.has(e,n)}));var As=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Ef(n)){let i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}};function Ef(r){let e=r.getComponent();return e?.type==="VERSION"}var Ss="@firebase/app",Eu="0.13.2";var Xt=new $e("@firebase/app"),Tf="@firebase/app-compat",bf="@firebase/analytics-compat",Af="@firebase/analytics",Sf="@firebase/app-check-compat",Rf="@firebase/app-check",Cf="@firebase/auth",Pf="@firebase/auth-compat",Df="@firebase/database",xf="@firebase/data-connect",Vf="@firebase/database-compat",kf="@firebase/functions",Nf="@firebase/functions-compat",Of="@firebase/installations",Lf="@firebase/installations-compat",Ff="@firebase/messaging",Mf="@firebase/messaging-compat",Bf="@firebase/performance",zf="@firebase/performance-compat",Uf="@firebase/remote-config",qf="@firebase/remote-config-compat",jf="@firebase/storage",$f="@firebase/storage-compat",Gf="@firebase/firestore",Kf="@firebase/ai",Wf="@firebase/firestore-compat",Hf="firebase",Qf="11.10.0";var Rs="[DEFAULT]",Jf={[Ss]:"fire-core",[Tf]:"fire-core-compat",[Af]:"fire-analytics",[bf]:"fire-analytics-compat",[Rf]:"fire-app-check",[Sf]:"fire-app-check-compat",[Cf]:"fire-auth",[Pf]:"fire-auth-compat",[Df]:"fire-rtdb",[xf]:"fire-data-connect",[Vf]:"fire-rtdb-compat",[kf]:"fire-fn",[Nf]:"fire-fn-compat",[Of]:"fire-iid",[Lf]:"fire-iid-compat",[Ff]:"fire-fcm",[Mf]:"fire-fcm-compat",[Bf]:"fire-perf",[zf]:"fire-perf-compat",[Uf]:"fire-rc",[qf]:"fire-rc-compat",[jf]:"fire-gcs",[$f]:"fire-gcs-compat",[Gf]:"fire-fst",[Wf]:"fire-fst-compat",[Kf]:"fire-vertex","fire-js":"fire-js",[Hf]:"fire-js-all"};var Br=new Map,Xf=new Map,Cs=new Map;function Tu(r,e){try{r.container.addComponent(e)}catch(n){Xt.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,n)}}function $n(r){let e=r.name;if(Cs.has(e))return Xt.debug(`There were multiple attempts to register component ${e}.`),!1;Cs.set(e,r);for(let n of Br.values())Tu(n,r);for(let n of Xf.values())Tu(n,r);return!0}function Ru(r,e){let n=r.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),r.container.getProvider(e)}function Cu(r){return r==null?!1:r.settings!==void 0}var Yf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ue=new jn("app","Firebase",Yf);var Ps=class{constructor(e,n,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Jt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ue.create("app-deleted",{appName:this._name})}};var Pu=Qf;function Vs(r,e={}){let n=r;typeof e!="object"&&(e={name:e});let i=Object.assign({name:Rs,automaticDataCollectionEnabled:!0},e),s=i.name;if(typeof s!="string"||!s)throw ue.create("bad-app-name",{appName:String(s)});if(n||(n=gs()),!n)throw ue.create("no-options");let a=Br.get(s);if(a){if(je(n,a.options)&&je(i,a.config))return a;throw ue.create("duplicate-app",{appName:s})}let c=new Fr(s);for(let d of Cs.values())c.addComponent(d);let l=new Ps(n,i,c);return Br.set(s,l),l}function Du(r=Rs){let e=Br.get(r);if(!e&&r===Rs&&gs())return Vs();if(!e)throw ue.create("no-app",{appName:r});return e}function le(r,e,n){var i;let s=(i=Jf[r])!==null&&i!==void 0?i:r;n&&(s+=`-${n}`);let a=s.match(/\s|\//),c=e.match(/\s|\//);if(a||c){let l=[`Unable to register library "${s}" with version "${e}":`];a&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),a&&c&&l.push("and"),c&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Xt.warn(l.join(" "));return}$n(new Jt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}var Zf="firebase-heartbeat-database",tm=1,Gn="firebase-heartbeat-store",bs=null;function xu(){return bs||(bs=Iu(Zf,tm,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(Gn)}catch(n){console.warn(n)}}}}).catch(r=>{throw ue.create("idb-open",{originalErrorMessage:r.message})})),bs}async function em(r){try{let n=(await xu()).transaction(Gn),i=await n.objectStore(Gn).get(Vu(r));return await n.done,i}catch(e){if(e instanceof Ht)Xt.warn(e.message);else{let n=ue.create("idb-get",{originalErrorMessage:e?.message});Xt.warn(n.message)}}}async function bu(r,e){try{let i=(await xu()).transaction(Gn,"readwrite");await i.objectStore(Gn).put(e,Vu(r)),await i.done}catch(n){if(n instanceof Ht)Xt.warn(n.message);else{let i=ue.create("idb-set",{originalErrorMessage:n?.message});Xt.warn(i.message)}}}function Vu(r){return`${r.name}!${r.options.appId}`}var nm=1024,rm=30,Ds=class{constructor(e){this.container=e,this._heartbeatsCache=null;let n=this.container.getProvider("app").getImmediate();this._storage=new xs(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,n;try{let s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),a=Au();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===a||this._heartbeatsCache.heartbeats.some(c=>c.date===a))return;if(this._heartbeatsCache.heartbeats.push({date:a,agent:s}),this._heartbeatsCache.heartbeats.length>rm){let c=sm(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(c,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(i){Xt.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let n=Au(),{heartbeatsToSend:i,unsentEntries:s}=im(this._heartbeatsCache.heartbeats),a=qn(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}catch(n){return Xt.warn(n),""}}};function Au(){return new Date().toISOString().substring(0,10)}function im(r,e=nm){let n=[],i=r.slice();for(let s of r){let a=n.find(c=>c.agent===s.agent);if(a){if(a.dates.push(s.date),Su(n)>e){a.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Su(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}var xs=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ys()?mu().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let n=await em(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){let s=await this.read();return bu(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){let s=await this.read();return bu(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}};function Su(r){return qn(JSON.stringify({version:2,heartbeats:r})).length}function sm(r){if(r.length===0)return-1;let e=0,n=r[0].date;for(let i=1;i<r.length;i++)r[i].date<n&&(n=r[i].date,e=i);return e}function om(r){$n(new Jt("platform-logger",e=>new As(e),"PRIVATE")),$n(new Jt("heartbeat",e=>new Ds(e),"PRIVATE")),le(Ss,Eu,r),le(Ss,Eu,"esm2017"),le("fire-js","")}om("");var am="firebase",cm="11.10.0";le(am,cm,"app");var ku=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Nu={};var Yt,ks;(function(){var r;function e(b,p){function _(){}_.prototype=p.prototype,b.D=p.prototype,b.prototype=new _,b.prototype.constructor=b,b.C=function(E,T,S){for(var y=Array(arguments.length-2),Gt=2;Gt<arguments.length;Gt++)y[Gt-2]=arguments[Gt];return p.prototype[T].apply(E,y)}}function n(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(i,n),i.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(b,p,_){_||(_=0);var E=Array(16);if(typeof p=="string")for(var T=0;16>T;++T)E[T]=p.charCodeAt(_++)|p.charCodeAt(_++)<<8|p.charCodeAt(_++)<<16|p.charCodeAt(_++)<<24;else for(T=0;16>T;++T)E[T]=p[_++]|p[_++]<<8|p[_++]<<16|p[_++]<<24;p=b.g[0],_=b.g[1],T=b.g[2];var S=b.g[3],y=p+(S^_&(T^S))+E[0]+3614090360&4294967295;p=_+(y<<7&4294967295|y>>>25),y=S+(T^p&(_^T))+E[1]+3905402710&4294967295,S=p+(y<<12&4294967295|y>>>20),y=T+(_^S&(p^_))+E[2]+606105819&4294967295,T=S+(y<<17&4294967295|y>>>15),y=_+(p^T&(S^p))+E[3]+3250441966&4294967295,_=T+(y<<22&4294967295|y>>>10),y=p+(S^_&(T^S))+E[4]+4118548399&4294967295,p=_+(y<<7&4294967295|y>>>25),y=S+(T^p&(_^T))+E[5]+1200080426&4294967295,S=p+(y<<12&4294967295|y>>>20),y=T+(_^S&(p^_))+E[6]+2821735955&4294967295,T=S+(y<<17&4294967295|y>>>15),y=_+(p^T&(S^p))+E[7]+4249261313&4294967295,_=T+(y<<22&4294967295|y>>>10),y=p+(S^_&(T^S))+E[8]+1770035416&4294967295,p=_+(y<<7&4294967295|y>>>25),y=S+(T^p&(_^T))+E[9]+2336552879&4294967295,S=p+(y<<12&4294967295|y>>>20),y=T+(_^S&(p^_))+E[10]+4294925233&4294967295,T=S+(y<<17&4294967295|y>>>15),y=_+(p^T&(S^p))+E[11]+2304563134&4294967295,_=T+(y<<22&4294967295|y>>>10),y=p+(S^_&(T^S))+E[12]+1804603682&4294967295,p=_+(y<<7&4294967295|y>>>25),y=S+(T^p&(_^T))+E[13]+4254626195&4294967295,S=p+(y<<12&4294967295|y>>>20),y=T+(_^S&(p^_))+E[14]+2792965006&4294967295,T=S+(y<<17&4294967295|y>>>15),y=_+(p^T&(S^p))+E[15]+1236535329&4294967295,_=T+(y<<22&4294967295|y>>>10),y=p+(T^S&(_^T))+E[1]+4129170786&4294967295,p=_+(y<<5&4294967295|y>>>27),y=S+(_^T&(p^_))+E[6]+3225465664&4294967295,S=p+(y<<9&4294967295|y>>>23),y=T+(p^_&(S^p))+E[11]+643717713&4294967295,T=S+(y<<14&4294967295|y>>>18),y=_+(S^p&(T^S))+E[0]+3921069994&4294967295,_=T+(y<<20&4294967295|y>>>12),y=p+(T^S&(_^T))+E[5]+3593408605&4294967295,p=_+(y<<5&4294967295|y>>>27),y=S+(_^T&(p^_))+E[10]+38016083&4294967295,S=p+(y<<9&4294967295|y>>>23),y=T+(p^_&(S^p))+E[15]+3634488961&4294967295,T=S+(y<<14&4294967295|y>>>18),y=_+(S^p&(T^S))+E[4]+3889429448&4294967295,_=T+(y<<20&4294967295|y>>>12),y=p+(T^S&(_^T))+E[9]+568446438&4294967295,p=_+(y<<5&4294967295|y>>>27),y=S+(_^T&(p^_))+E[14]+3275163606&4294967295,S=p+(y<<9&4294967295|y>>>23),y=T+(p^_&(S^p))+E[3]+4107603335&4294967295,T=S+(y<<14&4294967295|y>>>18),y=_+(S^p&(T^S))+E[8]+1163531501&4294967295,_=T+(y<<20&4294967295|y>>>12),y=p+(T^S&(_^T))+E[13]+2850285829&4294967295,p=_+(y<<5&4294967295|y>>>27),y=S+(_^T&(p^_))+E[2]+4243563512&4294967295,S=p+(y<<9&4294967295|y>>>23),y=T+(p^_&(S^p))+E[7]+1735328473&4294967295,T=S+(y<<14&4294967295|y>>>18),y=_+(S^p&(T^S))+E[12]+2368359562&4294967295,_=T+(y<<20&4294967295|y>>>12),y=p+(_^T^S)+E[5]+4294588738&4294967295,p=_+(y<<4&4294967295|y>>>28),y=S+(p^_^T)+E[8]+2272392833&4294967295,S=p+(y<<11&4294967295|y>>>21),y=T+(S^p^_)+E[11]+1839030562&4294967295,T=S+(y<<16&4294967295|y>>>16),y=_+(T^S^p)+E[14]+4259657740&4294967295,_=T+(y<<23&4294967295|y>>>9),y=p+(_^T^S)+E[1]+2763975236&4294967295,p=_+(y<<4&4294967295|y>>>28),y=S+(p^_^T)+E[4]+1272893353&4294967295,S=p+(y<<11&4294967295|y>>>21),y=T+(S^p^_)+E[7]+4139469664&4294967295,T=S+(y<<16&4294967295|y>>>16),y=_+(T^S^p)+E[10]+3200236656&4294967295,_=T+(y<<23&4294967295|y>>>9),y=p+(_^T^S)+E[13]+681279174&4294967295,p=_+(y<<4&4294967295|y>>>28),y=S+(p^_^T)+E[0]+3936430074&4294967295,S=p+(y<<11&4294967295|y>>>21),y=T+(S^p^_)+E[3]+3572445317&4294967295,T=S+(y<<16&4294967295|y>>>16),y=_+(T^S^p)+E[6]+76029189&4294967295,_=T+(y<<23&4294967295|y>>>9),y=p+(_^T^S)+E[9]+3654602809&4294967295,p=_+(y<<4&4294967295|y>>>28),y=S+(p^_^T)+E[12]+3873151461&4294967295,S=p+(y<<11&4294967295|y>>>21),y=T+(S^p^_)+E[15]+530742520&4294967295,T=S+(y<<16&4294967295|y>>>16),y=_+(T^S^p)+E[2]+3299628645&4294967295,_=T+(y<<23&4294967295|y>>>9),y=p+(T^(_|~S))+E[0]+4096336452&4294967295,p=_+(y<<6&4294967295|y>>>26),y=S+(_^(p|~T))+E[7]+1126891415&4294967295,S=p+(y<<10&4294967295|y>>>22),y=T+(p^(S|~_))+E[14]+2878612391&4294967295,T=S+(y<<15&4294967295|y>>>17),y=_+(S^(T|~p))+E[5]+4237533241&4294967295,_=T+(y<<21&4294967295|y>>>11),y=p+(T^(_|~S))+E[12]+1700485571&4294967295,p=_+(y<<6&4294967295|y>>>26),y=S+(_^(p|~T))+E[3]+2399980690&4294967295,S=p+(y<<10&4294967295|y>>>22),y=T+(p^(S|~_))+E[10]+4293915773&4294967295,T=S+(y<<15&4294967295|y>>>17),y=_+(S^(T|~p))+E[1]+2240044497&4294967295,_=T+(y<<21&4294967295|y>>>11),y=p+(T^(_|~S))+E[8]+1873313359&4294967295,p=_+(y<<6&4294967295|y>>>26),y=S+(_^(p|~T))+E[15]+4264355552&4294967295,S=p+(y<<10&4294967295|y>>>22),y=T+(p^(S|~_))+E[6]+2734768916&4294967295,T=S+(y<<15&4294967295|y>>>17),y=_+(S^(T|~p))+E[13]+1309151649&4294967295,_=T+(y<<21&4294967295|y>>>11),y=p+(T^(_|~S))+E[4]+4149444226&4294967295,p=_+(y<<6&4294967295|y>>>26),y=S+(_^(p|~T))+E[11]+3174756917&4294967295,S=p+(y<<10&4294967295|y>>>22),y=T+(p^(S|~_))+E[2]+718787259&4294967295,T=S+(y<<15&4294967295|y>>>17),y=_+(S^(T|~p))+E[9]+3951481745&4294967295,b.g[0]=b.g[0]+p&4294967295,b.g[1]=b.g[1]+(T+(y<<21&4294967295|y>>>11))&4294967295,b.g[2]=b.g[2]+T&4294967295,b.g[3]=b.g[3]+S&4294967295}i.prototype.u=function(b,p){p===void 0&&(p=b.length);for(var _=p-this.blockSize,E=this.B,T=this.h,S=0;S<p;){if(T==0)for(;S<=_;)s(this,b,S),S+=this.blockSize;if(typeof b=="string"){for(;S<p;)if(E[T++]=b.charCodeAt(S++),T==this.blockSize){s(this,E),T=0;break}}else for(;S<p;)if(E[T++]=b[S++],T==this.blockSize){s(this,E),T=0;break}}this.h=T,this.o+=p},i.prototype.v=function(){var b=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);b[0]=128;for(var p=1;p<b.length-8;++p)b[p]=0;var _=8*this.o;for(p=b.length-8;p<b.length;++p)b[p]=_&255,_/=256;for(this.u(b),b=Array(16),p=_=0;4>p;++p)for(var E=0;32>E;E+=8)b[_++]=this.g[p]>>>E&255;return b};function a(b,p){var _=l;return Object.prototype.hasOwnProperty.call(_,b)?_[b]:_[b]=p(b)}function c(b,p){this.h=p;for(var _=[],E=!0,T=b.length-1;0<=T;T--){var S=b[T]|0;E&&S==p||(_[T]=S,E=!1)}this.g=_}var l={};function d(b){return-128<=b&&128>b?a(b,function(p){return new c([p|0],0>p?-1:0)}):new c([b|0],0>b?-1:0)}function f(b){if(isNaN(b)||!isFinite(b))return w;if(0>b)return V(f(-b));for(var p=[],_=1,E=0;b>=_;E++)p[E]=b/_|0,_*=4294967296;return new c(p,0)}function g(b,p){if(b.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(b.charAt(0)=="-")return V(g(b.substring(1),p));if(0<=b.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=f(Math.pow(p,8)),E=w,T=0;T<b.length;T+=8){var S=Math.min(8,b.length-T),y=parseInt(b.substring(T,T+S),p);8>S?(S=f(Math.pow(p,S)),E=E.j(S).add(f(y))):(E=E.j(_),E=E.add(f(y)))}return E}var w=d(0),I=d(1),C=d(16777216);r=c.prototype,r.m=function(){if(k(this))return-V(this).m();for(var b=0,p=1,_=0;_<this.g.length;_++){var E=this.i(_);b+=(0<=E?E:4294967296+E)*p,p*=4294967296}return b},r.toString=function(b){if(b=b||10,2>b||36<b)throw Error("radix out of range: "+b);if(x(this))return"0";if(k(this))return"-"+V(this).toString(b);for(var p=f(Math.pow(b,6)),_=this,E="";;){var T=et(_,p).g;_=z(_,T.j(p));var S=((0<_.g.length?_.g[0]:_.h)>>>0).toString(b);if(_=T,x(_))return S+E;for(;6>S.length;)S="0"+S;E=S+E}},r.i=function(b){return 0>b?0:b<this.g.length?this.g[b]:this.h};function x(b){if(b.h!=0)return!1;for(var p=0;p<b.g.length;p++)if(b.g[p]!=0)return!1;return!0}function k(b){return b.h==-1}r.l=function(b){return b=z(this,b),k(b)?-1:x(b)?0:1};function V(b){for(var p=b.g.length,_=[],E=0;E<p;E++)_[E]=~b.g[E];return new c(_,~b.h).add(I)}r.abs=function(){return k(this)?V(this):this},r.add=function(b){for(var p=Math.max(this.g.length,b.g.length),_=[],E=0,T=0;T<=p;T++){var S=E+(this.i(T)&65535)+(b.i(T)&65535),y=(S>>>16)+(this.i(T)>>>16)+(b.i(T)>>>16);E=y>>>16,S&=65535,y&=65535,_[T]=y<<16|S}return new c(_,_[_.length-1]&-2147483648?-1:0)};function z(b,p){return b.add(V(p))}r.j=function(b){if(x(this)||x(b))return w;if(k(this))return k(b)?V(this).j(V(b)):V(V(this).j(b));if(k(b))return V(this.j(V(b)));if(0>this.l(C)&&0>b.l(C))return f(this.m()*b.m());for(var p=this.g.length+b.g.length,_=[],E=0;E<2*p;E++)_[E]=0;for(E=0;E<this.g.length;E++)for(var T=0;T<b.g.length;T++){var S=this.i(E)>>>16,y=this.i(E)&65535,Gt=b.i(T)>>>16,En=b.i(T)&65535;_[2*E+2*T]+=y*En,U(_,2*E+2*T),_[2*E+2*T+1]+=S*En,U(_,2*E+2*T+1),_[2*E+2*T+1]+=y*Gt,U(_,2*E+2*T+1),_[2*E+2*T+2]+=S*Gt,U(_,2*E+2*T+2)}for(E=0;E<p;E++)_[E]=_[2*E+1]<<16|_[2*E];for(E=p;E<2*p;E++)_[E]=0;return new c(_,0)};function U(b,p){for(;(b[p]&65535)!=b[p];)b[p+1]+=b[p]>>>16,b[p]&=65535,p++}function G(b,p){this.g=b,this.h=p}function et(b,p){if(x(p))throw Error("division by zero");if(x(b))return new G(w,w);if(k(b))return p=et(V(b),p),new G(V(p.g),V(p.h));if(k(p))return p=et(b,V(p)),new G(V(p.g),p.h);if(30<b.g.length){if(k(b)||k(p))throw Error("slowDivide_ only works with positive integers.");for(var _=I,E=p;0>=E.l(b);)_=At(_),E=At(E);var T=Z(_,1),S=Z(E,1);for(E=Z(E,2),_=Z(_,2);!x(E);){var y=S.add(E);0>=y.l(b)&&(T=T.add(_),S=y),E=Z(E,1),_=Z(_,1)}return p=z(b,T.j(p)),new G(T,p)}for(T=w;0<=b.l(p);){for(_=Math.max(1,Math.floor(b.m()/p.m())),E=Math.ceil(Math.log(_)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),S=f(_),y=S.j(p);k(y)||0<y.l(b);)_-=E,S=f(_),y=S.j(p);x(S)&&(S=I),T=T.add(S),b=z(b,y)}return new G(T,b)}r.A=function(b){return et(this,b).h},r.and=function(b){for(var p=Math.max(this.g.length,b.g.length),_=[],E=0;E<p;E++)_[E]=this.i(E)&b.i(E);return new c(_,this.h&b.h)},r.or=function(b){for(var p=Math.max(this.g.length,b.g.length),_=[],E=0;E<p;E++)_[E]=this.i(E)|b.i(E);return new c(_,this.h|b.h)},r.xor=function(b){for(var p=Math.max(this.g.length,b.g.length),_=[],E=0;E<p;E++)_[E]=this.i(E)^b.i(E);return new c(_,this.h^b.h)};function At(b){for(var p=b.g.length+1,_=[],E=0;E<p;E++)_[E]=b.i(E)<<1|b.i(E-1)>>>31;return new c(_,b.h)}function Z(b,p){var _=p>>5;p%=32;for(var E=b.g.length-_,T=[],S=0;S<E;S++)T[S]=0<p?b.i(S+_)>>>p|b.i(S+_+1)<<32-p:b.i(S+_);return new c(T,b.h)}i.prototype.digest=i.prototype.v,i.prototype.reset=i.prototype.s,i.prototype.update=i.prototype.u,ks=Nu.Md5=i,c.prototype.add=c.prototype.add,c.prototype.multiply=c.prototype.j,c.prototype.modulo=c.prototype.A,c.prototype.compare=c.prototype.l,c.prototype.toNumber=c.prototype.m,c.prototype.toString=c.prototype.toString,c.prototype.getBits=c.prototype.i,c.fromNumber=f,c.fromString=g,Yt=Nu.Integer=c}).apply(typeof ku<"u"?ku:typeof self<"u"?self:typeof window<"u"?window:{});var zr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Zt={};var Ns,um,Ge,Os,Kn,Ur,Ls,Fs,Ms;(function(){var r,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,u,h){return o==Array.prototype||o==Object.prototype||(o[u]=h.value),o};function n(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof zr=="object"&&zr];for(var u=0;u<o.length;++u){var h=o[u];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var i=n(this);function s(o,u){if(u)t:{var h=i;o=o.split(".");for(var m=0;m<o.length-1;m++){var A=o[m];if(!(A in h))break t;h=h[A]}o=o[o.length-1],m=h[o],u=u(m),u!=m&&u!=null&&e(h,o,{configurable:!0,writable:!0,value:u})}}function a(o,u){o instanceof String&&(o+="");var h=0,m=!1,A={next:function(){if(!m&&h<o.length){var R=h++;return{value:u(R,o[R]),done:!1}}return m=!0,{done:!0,value:void 0}}};return A[Symbol.iterator]=function(){return A},A}s("Array.prototype.values",function(o){return o||function(){return a(this,function(u,h){return h})}});var c=c||{},l=this||self;function d(o){var u=typeof o;return u=u!="object"?u:o?Array.isArray(o)?"array":u:"null",u=="array"||u=="object"&&typeof o.length=="number"}function f(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function g(o,u,h){return o.call.apply(o.bind,arguments)}function w(o,u,h){if(!o)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var A=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(A,m),o.apply(u,A)}}return function(){return o.apply(u,arguments)}}function I(o,u,h){return I=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?g:w,I.apply(null,arguments)}function C(o,u){var h=Array.prototype.slice.call(arguments,1);return function(){var m=h.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function x(o,u){function h(){}h.prototype=u.prototype,o.aa=u.prototype,o.prototype=new h,o.prototype.constructor=o,o.Qb=function(m,A,R){for(var N=Array(arguments.length-2),Y=2;Y<arguments.length;Y++)N[Y-2]=arguments[Y];return u.prototype[A].apply(m,N)}}function k(o){let u=o.length;if(0<u){let h=Array(u);for(let m=0;m<u;m++)h[m]=o[m];return h}return[]}function V(o,u){for(let h=1;h<arguments.length;h++){let m=arguments[h];if(d(m)){let A=o.length||0,R=m.length||0;o.length=A+R;for(let N=0;N<R;N++)o[A+N]=m[N]}else o.push(m)}}class z{constructor(u,h){this.i=u,this.j=h,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function U(o){return/^[\s\xa0]*$/.test(o)}function G(){var o=l.navigator;return o&&(o=o.userAgent)?o:""}function et(o){return et[" "](o),o}et[" "]=function(){};var At=G().indexOf("Gecko")!=-1&&!(G().toLowerCase().indexOf("webkit")!=-1&&G().indexOf("Edge")==-1)&&!(G().indexOf("Trident")!=-1||G().indexOf("MSIE")!=-1)&&G().indexOf("Edge")==-1;function Z(o,u,h){for(let m in o)u.call(h,o[m],m,o)}function b(o,u){for(let h in o)u.call(void 0,o[h],h,o)}function p(o){let u={};for(let h in o)u[h]=o[h];return u}let _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(o,u){let h,m;for(let A=1;A<arguments.length;A++){m=arguments[A];for(h in m)o[h]=m[h];for(let R=0;R<_.length;R++)h=_[R],Object.prototype.hasOwnProperty.call(m,h)&&(o[h]=m[h])}}function T(o){var u=1;o=o.split(":");let h=[];for(;0<u&&o.length;)h.push(o.shift()),u--;return o.length&&h.push(o.join(":")),h}function S(o){l.setTimeout(()=>{throw o},0)}function y(){var o=ji;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class Gt{constructor(){this.h=this.g=null}add(u,h){let m=En.get();m.set(u,h),this.h?this.h.next=m:this.g=m,this.h=m}}var En=new z(()=>new fd,o=>o.reset());class fd{constructor(){this.next=this.g=this.h=null}set(u,h){this.h=u,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let Tn,bn=!1,ji=new Gt,tc=()=>{let o=l.Promise.resolve(void 0);Tn=()=>{o.then(md)}};var md=()=>{for(var o;o=y();){try{o.h.call(o.g)}catch(h){S(h)}var u=En;u.j(o),100>u.h&&(u.h++,o.next=u.g,u.g=o)}bn=!1};function se(){this.s=this.s,this.C=this.C}se.prototype.s=!1,se.prototype.ma=function(){this.s||(this.s=!0,this.N())},se.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function mt(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}mt.prototype.h=function(){this.defaultPrevented=!0};var pd=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{let h=()=>{};l.addEventListener("test",h,u),l.removeEventListener("test",h,u)}catch{}return o}();function An(o,u){if(mt.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var h=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget){if(At){t:{try{et(u.nodeName);var A=!0;break t}catch{}A=!1}A||(u=null)}}else h=="mouseover"?u=o.fromElement:h=="mouseout"&&(u=o.toElement);this.relatedTarget=u,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:gd[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&An.aa.h.call(this)}}x(An,mt);var gd={2:"touch",3:"pen",4:"mouse"};An.prototype.h=function(){An.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Sn="closure_listenable_"+(1e6*Math.random()|0),yd=0;function _d(o,u,h,m,A){this.listener=o,this.proxy=null,this.src=u,this.type=h,this.capture=!!m,this.ha=A,this.key=++yd,this.da=this.fa=!1}function _r(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function wr(o){this.src=o,this.g={},this.h=0}wr.prototype.add=function(o,u,h,m,A){var R=o.toString();o=this.g[R],o||(o=this.g[R]=[],this.h++);var N=Gi(o,u,m,A);return-1<N?(u=o[N],h||(u.fa=!1)):(u=new _d(u,this.src,R,!!m,A),u.fa=h,o.push(u)),u};function $i(o,u){var h=u.type;if(h in o.g){var m=o.g[h],A=Array.prototype.indexOf.call(m,u,void 0),R;(R=0<=A)&&Array.prototype.splice.call(m,A,1),R&&(_r(u),o.g[h].length==0&&(delete o.g[h],o.h--))}}function Gi(o,u,h,m){for(var A=0;A<o.length;++A){var R=o[A];if(!R.da&&R.listener==u&&R.capture==!!h&&R.ha==m)return A}return-1}var Ki="closure_lm_"+(1e6*Math.random()|0),Wi={};function ec(o,u,h,m,A){if(m&&m.once)return rc(o,u,h,m,A);if(Array.isArray(u)){for(var R=0;R<u.length;R++)ec(o,u[R],h,m,A);return null}return h=Xi(h),o&&o[Sn]?o.K(u,h,f(m)?!!m.capture:!!m,A):nc(o,u,h,!1,m,A)}function nc(o,u,h,m,A,R){if(!u)throw Error("Invalid event type");var N=f(A)?!!A.capture:!!A,Y=Qi(o);if(Y||(o[Ki]=Y=new wr(o)),h=Y.add(u,h,m,N,R),h.proxy)return h;if(m=wd(),h.proxy=m,m.src=o,m.listener=h,o.addEventListener)pd||(A=N),A===void 0&&(A=!1),o.addEventListener(u.toString(),m,A);else if(o.attachEvent)o.attachEvent(sc(u.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return h}function wd(){function o(h){return u.call(o.src,o.listener,h)}let u=vd;return o}function rc(o,u,h,m,A){if(Array.isArray(u)){for(var R=0;R<u.length;R++)rc(o,u[R],h,m,A);return null}return h=Xi(h),o&&o[Sn]?o.L(u,h,f(m)?!!m.capture:!!m,A):nc(o,u,h,!0,m,A)}function ic(o,u,h,m,A){if(Array.isArray(u))for(var R=0;R<u.length;R++)ic(o,u[R],h,m,A);else m=f(m)?!!m.capture:!!m,h=Xi(h),o&&o[Sn]?(o=o.i,u=String(u).toString(),u in o.g&&(R=o.g[u],h=Gi(R,h,m,A),-1<h&&(_r(R[h]),Array.prototype.splice.call(R,h,1),R.length==0&&(delete o.g[u],o.h--)))):o&&(o=Qi(o))&&(u=o.g[u.toString()],o=-1,u&&(o=Gi(u,h,m,A)),(h=-1<o?u[o]:null)&&Hi(h))}function Hi(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[Sn])$i(u.i,o);else{var h=o.type,m=o.proxy;u.removeEventListener?u.removeEventListener(h,m,o.capture):u.detachEvent?u.detachEvent(sc(h),m):u.addListener&&u.removeListener&&u.removeListener(m),(h=Qi(u))?($i(h,o),h.h==0&&(h.src=null,u[Ki]=null)):_r(o)}}}function sc(o){return o in Wi?Wi[o]:Wi[o]="on"+o}function vd(o,u){if(o.da)o=!0;else{u=new An(u,this);var h=o.listener,m=o.ha||o.src;o.fa&&Hi(o),o=h.call(m,u)}return o}function Qi(o){return o=o[Ki],o instanceof wr?o:null}var Ji="__closure_events_fn_"+(1e9*Math.random()>>>0);function Xi(o){return typeof o=="function"?o:(o[Ji]||(o[Ji]=function(u){return o.handleEvent(u)}),o[Ji])}function pt(){se.call(this),this.i=new wr(this),this.M=this,this.F=null}x(pt,se),pt.prototype[Sn]=!0,pt.prototype.removeEventListener=function(o,u,h,m){ic(this,o,u,h,m)};function vt(o,u){var h,m=o.F;if(m)for(h=[];m;m=m.F)h.push(m);if(o=o.M,m=u.type||u,typeof u=="string")u=new mt(u,o);else if(u instanceof mt)u.target=u.target||o;else{var A=u;u=new mt(m,o),E(u,A)}if(A=!0,h)for(var R=h.length-1;0<=R;R--){var N=u.g=h[R];A=vr(N,m,!0,u)&&A}if(N=u.g=o,A=vr(N,m,!0,u)&&A,A=vr(N,m,!1,u)&&A,h)for(R=0;R<h.length;R++)N=u.g=h[R],A=vr(N,m,!1,u)&&A}pt.prototype.N=function(){if(pt.aa.N.call(this),this.i){var o=this.i,u;for(u in o.g){for(var h=o.g[u],m=0;m<h.length;m++)_r(h[m]);delete o.g[u],o.h--}}this.F=null},pt.prototype.K=function(o,u,h,m){return this.i.add(String(o),u,!1,h,m)},pt.prototype.L=function(o,u,h,m){return this.i.add(String(o),u,!0,h,m)};function vr(o,u,h,m){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();for(var A=!0,R=0;R<u.length;++R){var N=u[R];if(N&&!N.da&&N.capture==h){var Y=N.listener,dt=N.ha||N.src;N.fa&&$i(o.i,N),A=Y.call(dt,m)!==!1&&A}}return A&&!m.defaultPrevented}function oc(o,u,h){if(typeof o=="function")h&&(o=I(o,h));else if(o&&typeof o.handleEvent=="function")o=I(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:l.setTimeout(o,u||0)}function ac(o){o.g=oc(()=>{o.g=null,o.i&&(o.i=!1,ac(o))},o.l);let u=o.h;o.h=null,o.m.apply(null,u)}class Id extends se{constructor(u,h){super(),this.m=u,this.l=h,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:ac(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Rn(o){se.call(this),this.h=o,this.g={}}x(Rn,se);var cc=[];function uc(o){Z(o.g,function(u,h){this.g.hasOwnProperty(h)&&Hi(u)},o),o.g={}}Rn.prototype.N=function(){Rn.aa.N.call(this),uc(this)},Rn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Yi=l.JSON.stringify,Ed=l.JSON.parse,Td=class{stringify(o){return l.JSON.stringify(o,void 0)}parse(o){return l.JSON.parse(o,void 0)}};function Zi(){}Zi.prototype.h=null;function lc(o){return o.h||(o.h=o.i())}function hc(){}var Cn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function ts(){mt.call(this,"d")}x(ts,mt);function es(){mt.call(this,"c")}x(es,mt);var Ee={},dc=null;function Ir(){return dc=dc||new pt}Ee.La="serverreachability";function fc(o){mt.call(this,Ee.La,o)}x(fc,mt);function Pn(o){let u=Ir();vt(u,new fc(u))}Ee.STAT_EVENT="statevent";function mc(o,u){mt.call(this,Ee.STAT_EVENT,o),this.stat=u}x(mc,mt);function It(o){let u=Ir();vt(u,new mc(u,o))}Ee.Ma="timingevent";function pc(o,u){mt.call(this,Ee.Ma,o),this.size=u}x(pc,mt);function Dn(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){o()},u)}function xn(){this.g=!0}xn.prototype.xa=function(){this.g=!1};function bd(o,u,h,m,A,R){o.info(function(){if(o.g)if(R)for(var N="",Y=R.split("&"),dt=0;dt<Y.length;dt++){var Q=Y[dt].split("=");if(1<Q.length){var gt=Q[0];Q=Q[1];var yt=gt.split("_");N=2<=yt.length&&yt[1]=="type"?N+(gt+"="+Q+"&"):N+(gt+"=redacted&")}}else N=null;else N=R;return"XMLHTTP REQ ("+m+") [attempt "+A+"]: "+u+`
`+h+`
`+N})}function Ad(o,u,h,m,A,R,N){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+A+"]: "+u+`
`+h+`
`+R+" "+N})}function Be(o,u,h,m){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+Rd(o,h)+(m?" "+m:"")})}function Sd(o,u){o.info(function(){return"TIMEOUT: "+u})}xn.prototype.info=function(){};function Rd(o,u){if(!o.g)return u;if(!u)return null;try{var h=JSON.parse(u);if(h){for(o=0;o<h.length;o++)if(Array.isArray(h[o])){var m=h[o];if(!(2>m.length)){var A=m[1];if(Array.isArray(A)&&!(1>A.length)){var R=A[0];if(R!="noop"&&R!="stop"&&R!="close")for(var N=1;N<A.length;N++)A[N]=""}}}}return Yi(h)}catch{return u}}var Er={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},gc={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},ns;function Tr(){}x(Tr,Zi),Tr.prototype.g=function(){return new XMLHttpRequest},Tr.prototype.i=function(){return{}},ns=new Tr;function oe(o,u,h,m){this.j=o,this.i=u,this.l=h,this.R=m||1,this.U=new Rn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new yc}function yc(){this.i=null,this.g="",this.h=!1}var _c={},rs={};function is(o,u,h){o.L=1,o.v=Rr(Kt(u)),o.m=h,o.P=!0,wc(o,null)}function wc(o,u){o.F=Date.now(),br(o),o.A=Kt(o.v);var h=o.A,m=o.R;Array.isArray(m)||(m=[String(m)]),kc(h.i,"t",m),o.C=0,h=o.j.J,o.h=new yc,o.g=Xc(o.j,h?u:null,!o.m),0<o.O&&(o.M=new Id(I(o.Y,o,o.g),o.O)),u=o.U,h=o.g,m=o.ca;var A="readystatechange";Array.isArray(A)||(A&&(cc[0]=A.toString()),A=cc);for(var R=0;R<A.length;R++){var N=ec(h,A[R],m||u.handleEvent,!1,u.h||u);if(!N)break;u.g[N.key]=N}u=o.H?p(o.H):{},o.m?(o.u||(o.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,u)):(o.u="GET",o.g.ea(o.A,o.u,null,u)),Pn(),bd(o.i,o.u,o.A,o.l,o.R,o.m)}oe.prototype.ca=function(o){o=o.target;let u=this.M;u&&Wt(o)==3?u.j():this.Y(o)},oe.prototype.Y=function(o){try{if(o==this.g)t:{let yt=Wt(this.g);var u=this.g.Ba();let qe=this.g.Z();if(!(3>yt)&&(yt!=3||this.g&&(this.h.h||this.g.oa()||zc(this.g)))){this.J||yt!=4||u==7||(u==8||0>=qe?Pn(3):Pn(2)),ss(this);var h=this.g.Z();this.X=h;e:if(vc(this)){var m=zc(this.g);o="";var A=m.length,R=Wt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Te(this),Vn(this);var N="";break e}this.h.i=new l.TextDecoder}for(u=0;u<A;u++)this.h.h=!0,o+=this.h.i.decode(m[u],{stream:!(R&&u==A-1)});m.length=0,this.h.g+=o,this.C=0,N=this.h.g}else N=this.g.oa();if(this.o=h==200,Ad(this.i,this.u,this.A,this.l,this.R,yt,h),this.o){if(this.T&&!this.K){e:{if(this.g){var Y,dt=this.g;if((Y=dt.g?dt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!U(Y)){var Q=Y;break e}}Q=null}if(h=Q)Be(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,os(this,h);else{this.o=!1,this.s=3,It(12),Te(this),Vn(this);break t}}if(this.P){h=!0;let Ct;for(;!this.J&&this.C<N.length;)if(Ct=Cd(this,N),Ct==rs){yt==4&&(this.s=4,It(14),h=!1),Be(this.i,this.l,null,"[Incomplete Response]");break}else if(Ct==_c){this.s=4,It(15),Be(this.i,this.l,N,"[Invalid Chunk]"),h=!1;break}else Be(this.i,this.l,Ct,null),os(this,Ct);if(vc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),yt!=4||N.length!=0||this.h.h||(this.s=1,It(16),h=!1),this.o=this.o&&h,!h)Be(this.i,this.l,N,"[Invalid Chunked Response]"),Te(this),Vn(this);else if(0<N.length&&!this.W){this.W=!0;var gt=this.j;gt.g==this&&gt.ba&&!gt.M&&(gt.j.info("Great, no buffering proxy detected. Bytes received: "+N.length),ds(gt),gt.M=!0,It(11))}}else Be(this.i,this.l,N,null),os(this,N);yt==4&&Te(this),this.o&&!this.J&&(yt==4?Wc(this.j,this):(this.o=!1,br(this)))}else Gd(this.g),h==400&&0<N.indexOf("Unknown SID")?(this.s=3,It(12)):(this.s=0,It(13)),Te(this),Vn(this)}}}catch{}finally{}};function vc(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Cd(o,u){var h=o.C,m=u.indexOf(`
`,h);return m==-1?rs:(h=Number(u.substring(h,m)),isNaN(h)?_c:(m+=1,m+h>u.length?rs:(u=u.slice(m,m+h),o.C=m+h,u)))}oe.prototype.cancel=function(){this.J=!0,Te(this)};function br(o){o.S=Date.now()+o.I,Ic(o,o.I)}function Ic(o,u){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Dn(I(o.ba,o),u)}function ss(o){o.B&&(l.clearTimeout(o.B),o.B=null)}oe.prototype.ba=function(){this.B=null;let o=Date.now();0<=o-this.S?(Sd(this.i,this.A),this.L!=2&&(Pn(),It(17)),Te(this),this.s=2,Vn(this)):Ic(this,this.S-o)};function Vn(o){o.j.G==0||o.J||Wc(o.j,o)}function Te(o){ss(o);var u=o.M;u&&typeof u.ma=="function"&&u.ma(),o.M=null,uc(o.U),o.g&&(u=o.g,o.g=null,u.abort(),u.ma())}function os(o,u){try{var h=o.j;if(h.G!=0&&(h.g==o||as(h.h,o))){if(!o.K&&as(h.h,o)&&h.G==3){try{var m=h.Da.g.parse(u)}catch{m=null}if(Array.isArray(m)&&m.length==3){var A=m;if(A[0]==0){t:if(!h.u){if(h.g)if(h.g.F+3e3<o.F)Vr(h),Dr(h);else break t;hs(h),It(18)}}else h.za=A[1],0<h.za-h.T&&37500>A[2]&&h.F&&h.v==0&&!h.C&&(h.C=Dn(I(h.Za,h),6e3));if(1>=bc(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else Ae(h,11)}else if((o.K||h.g==o)&&Vr(h),!U(u))for(A=h.Da.g.parse(u),u=0;u<A.length;u++){let Q=A[u];if(h.T=Q[0],Q=Q[1],h.G==2)if(Q[0]=="c"){h.K=Q[1],h.ia=Q[2];let gt=Q[3];gt!=null&&(h.la=gt,h.j.info("VER="+h.la));let yt=Q[4];yt!=null&&(h.Aa=yt,h.j.info("SVER="+h.Aa));let qe=Q[5];qe!=null&&typeof qe=="number"&&0<qe&&(m=1.5*qe,h.L=m,h.j.info("backChannelRequestTimeoutMs_="+m)),m=h;let Ct=o.g;if(Ct){let Nr=Ct.g?Ct.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Nr){var R=m.h;R.g||Nr.indexOf("spdy")==-1&&Nr.indexOf("quic")==-1&&Nr.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(cs(R,R.h),R.h=null))}if(m.D){let fs=Ct.g?Ct.g.getResponseHeader("X-HTTP-Session-Id"):null;fs&&(m.ya=fs,tt(m.I,m.D,fs))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-o.F,h.j.info("Handshake RTT: "+h.R+"ms")),m=h;var N=o;if(m.qa=Jc(m,m.J?m.ia:null,m.W),N.K){Ac(m.h,N);var Y=N,dt=m.L;dt&&(Y.I=dt),Y.B&&(ss(Y),br(Y)),m.g=N}else Gc(m);0<h.i.length&&xr(h)}else Q[0]!="stop"&&Q[0]!="close"||Ae(h,7);else h.G==3&&(Q[0]=="stop"||Q[0]=="close"?Q[0]=="stop"?Ae(h,7):ls(h):Q[0]!="noop"&&h.l&&h.l.ta(Q),h.v=0)}}Pn(4)}catch{}}var Pd=class{constructor(o,u){this.g=o,this.map=u}};function Ec(o){this.l=o||10,l.PerformanceNavigationTiming?(o=l.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Tc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function bc(o){return o.h?1:o.g?o.g.size:0}function as(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function cs(o,u){o.g?o.g.add(u):o.h=u}function Ac(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}Ec.prototype.cancel=function(){if(this.i=Sc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let o of this.g.values())o.cancel();this.g.clear()}};function Sc(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let u=o.i;for(let h of o.g.values())u=u.concat(h.D);return u}return k(o.i)}function Dd(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(d(o)){for(var u=[],h=o.length,m=0;m<h;m++)u.push(o[m]);return u}u=[],h=0;for(m in o)u[h++]=o[m];return u}function xd(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(d(o)||typeof o=="string"){var u=[];o=o.length;for(var h=0;h<o;h++)u.push(h);return u}u=[],h=0;for(let m in o)u[h++]=m;return u}}}function Rc(o,u){if(o.forEach&&typeof o.forEach=="function")o.forEach(u,void 0);else if(d(o)||typeof o=="string")Array.prototype.forEach.call(o,u,void 0);else for(var h=xd(o),m=Dd(o),A=m.length,R=0;R<A;R++)u.call(void 0,m[R],h&&h[R],o)}var Cc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Vd(o,u){if(o){o=o.split("&");for(var h=0;h<o.length;h++){var m=o[h].indexOf("="),A=null;if(0<=m){var R=o[h].substring(0,m);A=o[h].substring(m+1)}else R=o[h];u(R,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function be(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof be){this.h=o.h,Ar(this,o.j),this.o=o.o,this.g=o.g,Sr(this,o.s),this.l=o.l;var u=o.i,h=new On;h.i=u.i,u.g&&(h.g=new Map(u.g),h.h=u.h),Pc(this,h),this.m=o.m}else o&&(u=String(o).match(Cc))?(this.h=!1,Ar(this,u[1]||"",!0),this.o=kn(u[2]||""),this.g=kn(u[3]||"",!0),Sr(this,u[4]),this.l=kn(u[5]||"",!0),Pc(this,u[6]||"",!0),this.m=kn(u[7]||"")):(this.h=!1,this.i=new On(null,this.h))}be.prototype.toString=function(){var o=[],u=this.j;u&&o.push(Nn(u,Dc,!0),":");var h=this.g;return(h||u=="file")&&(o.push("//"),(u=this.o)&&o.push(Nn(u,Dc,!0),"@"),o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&o.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(Nn(h,h.charAt(0)=="/"?Od:Nd,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",Nn(h,Fd)),o.join("")};function Kt(o){return new be(o)}function Ar(o,u,h){o.j=h?kn(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function Sr(o,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);o.s=u}else o.s=null}function Pc(o,u,h){u instanceof On?(o.i=u,Md(o.i,o.h)):(h||(u=Nn(u,Ld)),o.i=new On(u,o.h))}function tt(o,u,h){o.i.set(u,h)}function Rr(o){return tt(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function kn(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Nn(o,u,h){return typeof o=="string"?(o=encodeURI(o).replace(u,kd),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function kd(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Dc=/[#\/\?@]/g,Nd=/[#\?:]/g,Od=/[#\?]/g,Ld=/[#\?@]/g,Fd=/#/g;function On(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function ae(o){o.g||(o.g=new Map,o.h=0,o.i&&Vd(o.i,function(u,h){o.add(decodeURIComponent(u.replace(/\+/g," ")),h)}))}r=On.prototype,r.add=function(o,u){ae(this),this.i=null,o=ze(this,o);var h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(u),this.h+=1,this};function xc(o,u){ae(o),u=ze(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function Vc(o,u){return ae(o),u=ze(o,u),o.g.has(u)}r.forEach=function(o,u){ae(this),this.g.forEach(function(h,m){h.forEach(function(A){o.call(u,A,m,this)},this)},this)},r.na=function(){ae(this);let o=Array.from(this.g.values()),u=Array.from(this.g.keys()),h=[];for(let m=0;m<u.length;m++){let A=o[m];for(let R=0;R<A.length;R++)h.push(u[m])}return h},r.V=function(o){ae(this);let u=[];if(typeof o=="string")Vc(this,o)&&(u=u.concat(this.g.get(ze(this,o))));else{o=Array.from(this.g.values());for(let h=0;h<o.length;h++)u=u.concat(o[h])}return u},r.set=function(o,u){return ae(this),this.i=null,o=ze(this,o),Vc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},r.get=function(o,u){return o?(o=this.V(o),0<o.length?String(o[0]):u):u};function kc(o,u,h){xc(o,u),0<h.length&&(o.i=null,o.g.set(ze(o,u),k(h)),o.h+=h.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";let o=[],u=Array.from(this.g.keys());for(var h=0;h<u.length;h++){var m=u[h];let R=encodeURIComponent(String(m)),N=this.V(m);for(m=0;m<N.length;m++){var A=R;N[m]!==""&&(A+="="+encodeURIComponent(String(N[m]))),o.push(A)}}return this.i=o.join("&")};function ze(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function Md(o,u){u&&!o.j&&(ae(o),o.i=null,o.g.forEach(function(h,m){var A=m.toLowerCase();m!=A&&(xc(this,m),kc(this,A,h))},o)),o.j=u}function Bd(o,u){let h=new xn;if(l.Image){let m=new Image;m.onload=C(ce,h,"TestLoadImage: loaded",!0,u,m),m.onerror=C(ce,h,"TestLoadImage: error",!1,u,m),m.onabort=C(ce,h,"TestLoadImage: abort",!1,u,m),m.ontimeout=C(ce,h,"TestLoadImage: timeout",!1,u,m),l.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else u(!1)}function zd(o,u){let h=new xn,m=new AbortController,A=setTimeout(()=>{m.abort(),ce(h,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:m.signal}).then(R=>{clearTimeout(A),R.ok?ce(h,"TestPingServer: ok",!0,u):ce(h,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(A),ce(h,"TestPingServer: error",!1,u)})}function ce(o,u,h,m,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),m(h)}catch{}}function Ud(){this.g=new Td}function qd(o,u,h){let m=h||"";try{Rc(o,function(A,R){let N=A;f(A)&&(N=Yi(A)),u.push(m+R+"="+encodeURIComponent(N))})}catch(A){throw u.push(m+"type="+encodeURIComponent("_badmap")),A}}function Ln(o){this.l=o.Ub||null,this.j=o.eb||!1}x(Ln,Zi),Ln.prototype.g=function(){return new Cr(this.l,this.j)},Ln.prototype.i=function(o){return function(){return o}}({});function Cr(o,u){pt.call(this),this.D=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}x(Cr,pt),r=Cr.prototype,r.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=u,this.readyState=1,Mn(this)},r.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;let u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(u.body=o),(this.D||l).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Fn(this)),this.readyState=0},r.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Mn(this)),this.g&&(this.readyState=3,Mn(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Nc(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function Nc(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}r.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?Fn(this):Mn(this),this.readyState==3&&Nc(this)}},r.Ra=function(o){this.g&&(this.response=this.responseText=o,Fn(this))},r.Qa=function(o){this.g&&(this.response=o,Fn(this))},r.ga=function(){this.g&&Fn(this)};function Fn(o){o.readyState=4,o.l=null,o.j=null,o.v=null,Mn(o)}r.setRequestHeader=function(o,u){this.u.append(o,u)},r.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";let o=[],u=this.h.entries();for(var h=u.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=u.next();return o.join(`\r
`)};function Mn(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Cr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Oc(o){let u="";return Z(o,function(h,m){u+=m,u+=":",u+=h,u+=`\r
`}),u}function us(o,u,h){t:{for(m in h){var m=!1;break t}m=!0}m||(h=Oc(h),typeof o=="string"?h!=null&&encodeURIComponent(String(h)):tt(o,u,h))}function rt(o){pt.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}x(rt,pt);var jd=/^https?$/i,$d=["POST","PUT"];r=rt.prototype,r.Ha=function(o){this.J=o},r.ea=function(o,u,h,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():ns.g(),this.v=this.o?lc(this.o):lc(ns),this.g.onreadystatechange=I(this.Ea,this);try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(R){Lc(this,R);return}if(o=h||"",h=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var A in m)h.set(A,m[A]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(let R of m.keys())h.set(R,m.get(R));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(h.keys()).find(R=>R.toLowerCase()=="content-type"),A=l.FormData&&o instanceof l.FormData,!(0<=Array.prototype.indexOf.call($d,u,void 0))||m||A||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[R,N]of h)this.g.setRequestHeader(R,N);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Bc(this),this.u=!0,this.g.send(o),this.u=!1}catch(R){Lc(this,R)}};function Lc(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.m=5,Fc(o),Pr(o)}function Fc(o){o.A||(o.A=!0,vt(o,"complete"),vt(o,"error"))}r.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,vt(this,"complete"),vt(this,"abort"),Pr(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Pr(this,!0)),rt.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?Mc(this):this.bb())},r.bb=function(){Mc(this)};function Mc(o){if(o.h&&typeof c<"u"&&(!o.v[1]||Wt(o)!=4||o.Z()!=2)){if(o.u&&Wt(o)==4)oc(o.Ea,0,o);else if(vt(o,"readystatechange"),Wt(o)==4){o.h=!1;try{let N=o.Z();t:switch(N){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break t;default:u=!1}var h;if(!(h=u)){var m;if(m=N===0){var A=String(o.D).match(Cc)[1]||null;!A&&l.self&&l.self.location&&(A=l.self.location.protocol.slice(0,-1)),m=!jd.test(A?A.toLowerCase():"")}h=m}if(h)vt(o,"complete"),vt(o,"success");else{o.m=6;try{var R=2<Wt(o)?o.g.statusText:""}catch{R=""}o.l=R+" ["+o.Z()+"]",Fc(o)}}finally{Pr(o)}}}}function Pr(o,u){if(o.g){Bc(o);let h=o.g,m=o.v[0]?()=>{}:null;o.g=null,o.v=null,u||vt(o,"ready");try{h.onreadystatechange=m}catch{}}}function Bc(o){o.I&&(l.clearTimeout(o.I),o.I=null)}r.isActive=function(){return!!this.g};function Wt(o){return o.g?o.g.readyState:0}r.Z=function(){try{return 2<Wt(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),Ed(u)}};function zc(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Gd(o){let u={};o=(o.g&&2<=Wt(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(U(o[m]))continue;var h=T(o[m]);let A=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();let R=u[A]||[];u[A]=R,R.push(h)}b(u,function(m){return m.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Bn(o,u,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||u}function Uc(o){this.Aa=0,this.i=[],this.j=new xn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Bn("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Bn("baseRetryDelayMs",5e3,o),this.cb=Bn("retryDelaySeedMs",1e4,o),this.Wa=Bn("forwardChannelMaxRetries",2,o),this.wa=Bn("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Ec(o&&o.concurrentRequestLimit),this.Da=new Ud,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=Uc.prototype,r.la=8,r.G=1,r.connect=function(o,u,h,m){It(0),this.W=o,this.H=u||{},h&&m!==void 0&&(this.H.OSID=h,this.H.OAID=m),this.F=this.X,this.I=Jc(this,null,this.W),xr(this)};function ls(o){if(qc(o),o.G==3){var u=o.U++,h=Kt(o.I);if(tt(h,"SID",o.K),tt(h,"RID",u),tt(h,"TYPE","terminate"),zn(o,h),u=new oe(o,o.j,u),u.L=2,u.v=Rr(Kt(h)),h=!1,l.navigator&&l.navigator.sendBeacon)try{h=l.navigator.sendBeacon(u.v.toString(),"")}catch{}!h&&l.Image&&(new Image().src=u.v,h=!0),h||(u.g=Xc(u.j,null),u.g.ea(u.v)),u.F=Date.now(),br(u)}Qc(o)}function Dr(o){o.g&&(ds(o),o.g.cancel(),o.g=null)}function qc(o){Dr(o),o.u&&(l.clearTimeout(o.u),o.u=null),Vr(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&l.clearTimeout(o.s),o.s=null)}function xr(o){if(!Tc(o.h)&&!o.s){o.s=!0;var u=o.Ga;Tn||tc(),bn||(Tn(),bn=!0),ji.add(u,o),o.B=0}}function Kd(o,u){return bc(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=u.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Dn(I(o.Ga,o,u),Hc(o,o.B)),o.B++,!0)}r.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;let A=new oe(this,this.j,o),R=this.o;if(this.S&&(R?(R=p(R),E(R,this.S)):R=this.S),this.m!==null||this.O||(A.H=R,R=null),this.P)t:{for(var u=0,h=0;h<this.i.length;h++){e:{var m=this.i[h];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break e}m=void 0}if(m===void 0)break;if(u+=m,4096<u){u=h;break t}if(u===4096||h===this.i.length-1){u=h+1;break t}}u=1e3}else u=1e3;u=$c(this,A,u),h=Kt(this.I),tt(h,"RID",o),tt(h,"CVER",22),this.D&&tt(h,"X-HTTP-Session-Id",this.D),zn(this,h),R&&(this.O?u="headers="+encodeURIComponent(String(Oc(R)))+"&"+u:this.m&&us(h,this.m,R)),cs(this.h,A),this.Ua&&tt(h,"TYPE","init"),this.P?(tt(h,"$req",u),tt(h,"SID","null"),A.T=!0,is(A,h,null)):is(A,h,u),this.G=2}}else this.G==3&&(o?jc(this,o):this.i.length==0||Tc(this.h)||jc(this))};function jc(o,u){var h;u?h=u.l:h=o.U++;let m=Kt(o.I);tt(m,"SID",o.K),tt(m,"RID",h),tt(m,"AID",o.T),zn(o,m),o.m&&o.o&&us(m,o.m,o.o),h=new oe(o,o.j,h,o.B+1),o.m===null&&(h.H=o.o),u&&(o.i=u.D.concat(o.i)),u=$c(o,h,1e3),h.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),cs(o.h,h),is(h,m,u)}function zn(o,u){o.H&&Z(o.H,function(h,m){tt(u,m,h)}),o.l&&Rc({},function(h,m){tt(u,m,h)})}function $c(o,u,h){h=Math.min(o.i.length,h);var m=o.l?I(o.l.Na,o.l,o):null;t:{var A=o.i;let R=-1;for(;;){let N=["count="+h];R==-1?0<h?(R=A[0].g,N.push("ofs="+R)):R=0:N.push("ofs="+R);let Y=!0;for(let dt=0;dt<h;dt++){let Q=A[dt].g,gt=A[dt].map;if(Q-=R,0>Q)R=Math.max(0,A[dt].g-100),Y=!1;else try{qd(gt,N,"req"+Q+"_")}catch{m&&m(gt)}}if(Y){m=N.join("&");break t}}}return o=o.i.splice(0,h),u.D=o,m}function Gc(o){if(!o.g&&!o.u){o.Y=1;var u=o.Fa;Tn||tc(),bn||(Tn(),bn=!0),ji.add(u,o),o.v=0}}function hs(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Dn(I(o.Fa,o),Hc(o,o.v)),o.v++,!0)}r.Fa=function(){if(this.u=null,Kc(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Dn(I(this.ab,this),o)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,It(10),Dr(this),Kc(this))};function ds(o){o.A!=null&&(l.clearTimeout(o.A),o.A=null)}function Kc(o){o.g=new oe(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var u=Kt(o.qa);tt(u,"RID","rpc"),tt(u,"SID",o.K),tt(u,"AID",o.T),tt(u,"CI",o.F?"0":"1"),!o.F&&o.ja&&tt(u,"TO",o.ja),tt(u,"TYPE","xmlhttp"),zn(o,u),o.m&&o.o&&us(u,o.m,o.o),o.L&&(o.g.I=o.L);var h=o.g;o=o.ia,h.L=1,h.v=Rr(Kt(u)),h.m=null,h.P=!0,wc(h,o)}r.Za=function(){this.C!=null&&(this.C=null,Dr(this),hs(this),It(19))};function Vr(o){o.C!=null&&(l.clearTimeout(o.C),o.C=null)}function Wc(o,u){var h=null;if(o.g==u){Vr(o),ds(o),o.g=null;var m=2}else if(as(o.h,u))h=u.D,Ac(o.h,u),m=1;else return;if(o.G!=0){if(u.o)if(m==1){h=u.m?u.m.length:0,u=Date.now()-u.F;var A=o.B;m=Ir(),vt(m,new pc(m,h)),xr(o)}else Gc(o);else if(A=u.s,A==3||A==0&&0<u.X||!(m==1&&Kd(o,u)||m==2&&hs(o)))switch(h&&0<h.length&&(u=o.h,u.i=u.i.concat(h)),A){case 1:Ae(o,5);break;case 4:Ae(o,10);break;case 3:Ae(o,6);break;default:Ae(o,2)}}}function Hc(o,u){let h=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(h*=2),h*u}function Ae(o,u){if(o.j.info("Error code "+u),u==2){var h=I(o.fb,o),m=o.Xa;let A=!m;m=new be(m||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Ar(m,"https"),Rr(m),A?Bd(m.toString(),h):zd(m.toString(),h)}else It(2);o.G=0,o.l&&o.l.sa(u),Qc(o),qc(o)}r.fb=function(o){o?(this.j.info("Successfully pinged google.com"),It(2)):(this.j.info("Failed to ping google.com"),It(1))};function Qc(o){if(o.G=0,o.ka=[],o.l){let u=Sc(o.h);(u.length!=0||o.i.length!=0)&&(V(o.ka,u),V(o.ka,o.i),o.h.i.length=0,k(o.i),o.i.length=0),o.l.ra()}}function Jc(o,u,h){var m=h instanceof be?Kt(h):new be(h);if(m.g!="")u&&(m.g=u+"."+m.g),Sr(m,m.s);else{var A=l.location;m=A.protocol,u=u?u+"."+A.hostname:A.hostname,A=+A.port;var R=new be(null);m&&Ar(R,m),u&&(R.g=u),A&&Sr(R,A),h&&(R.l=h),m=R}return h=o.D,u=o.ya,h&&u&&tt(m,h,u),tt(m,"VER",o.la),zn(o,m),m}function Xc(o,u,h){if(u&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Ca&&!o.pa?new rt(new Ln({eb:h})):new rt(o.pa),u.Ha(o.J),u}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Yc(){}r=Yc.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function kr(){}kr.prototype.g=function(o,u){return new Et(o,u)};function Et(o,u){pt.call(this),this.g=new Uc(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(o?o["X-WebChannel-Client-Profile"]=u.va:o={"X-WebChannel-Client-Profile":u.va}),this.g.S=o,(o=u&&u.Sb)&&!U(o)&&(this.g.m=o),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!U(u)&&(this.g.D=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new Ue(this)}x(Et,pt),Et.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Et.prototype.close=function(){ls(this.g)},Et.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.u&&(h={},h.__data__=Yi(o),o=h);u.i.push(new Pd(u.Ya++,o)),u.G==3&&xr(u)},Et.prototype.N=function(){this.g.l=null,delete this.j,ls(this.g),delete this.g,Et.aa.N.call(this)};function Zc(o){ts.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){t:{for(let h in u){o=h;break t}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}x(Zc,ts);function tu(){es.call(this),this.status=1}x(tu,es);function Ue(o){this.g=o}x(Ue,Yc),Ue.prototype.ua=function(){vt(this.g,"a")},Ue.prototype.ta=function(o){vt(this.g,new Zc(o))},Ue.prototype.sa=function(o){vt(this.g,new tu)},Ue.prototype.ra=function(){vt(this.g,"b")},kr.prototype.createWebChannel=kr.prototype.g,Et.prototype.send=Et.prototype.o,Et.prototype.open=Et.prototype.m,Et.prototype.close=Et.prototype.close,Ms=Zt.createWebChannelTransport=function(){return new kr},Fs=Zt.getStatEventTarget=function(){return Ir()},Ls=Zt.Event=Ee,Ur=Zt.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Er.NO_ERROR=0,Er.TIMEOUT=8,Er.HTTP_ERROR=6,Kn=Zt.ErrorCode=Er,gc.COMPLETE="complete",Os=Zt.EventType=gc,hc.EventType=Cn,Cn.OPEN="a",Cn.CLOSE="b",Cn.ERROR="c",Cn.MESSAGE="d",pt.prototype.listen=pt.prototype.K,Ge=Zt.WebChannel=hc,um=Zt.FetchXmlHttpFactory=Ln,rt.prototype.listenOnce=rt.prototype.L,rt.prototype.getLastError=rt.prototype.Ka,rt.prototype.getLastErrorCode=rt.prototype.Ba,rt.prototype.getStatus=rt.prototype.Z,rt.prototype.getResponseJson=rt.prototype.Oa,rt.prototype.getResponseText=rt.prototype.oa,rt.prototype.send=rt.prototype.ea,rt.prototype.setWithCredentials=rt.prototype.Ha,Ns=Zt.XhrIo=rt}).apply(typeof zr<"u"?zr:typeof self<"u"?self:typeof window<"u"?window:{});var Ou="@firebase/firestore",Lu="4.8.0";var lt=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};lt.UNAUTHENTICATED=new lt(null),lt.GOOGLE_CREDENTIALS=new lt("google-credentials-uid"),lt.FIRST_PARTY=new lt("first-party-uid"),lt.MOCK_USER=new lt("mock-user");var gn="11.10.0";var xe=new $e("@firebase/firestore");function Ke(){return xe.logLevel}function O(r,...e){if(xe.logLevel<=W.DEBUG){let n=e.map(Aa);xe.debug(`Firestore (${gn}): ${r}`,...n)}}function te(r,...e){if(xe.logLevel<=W.ERROR){let n=e.map(Aa);xe.error(`Firestore (${gn}): ${r}`,...n)}}function pe(r,...e){if(xe.logLevel<=W.WARN){let n=e.map(Aa);xe.warn(`Firestore (${gn}): ${r}`,...n)}}function Aa(r){if(typeof r=="string")return r;try{return function(n){return JSON.stringify(n)}(r)}catch{return r}}function M(r,e,n){let i="Unexpected state";typeof e=="string"?i=e:n=e,bl(r,i,n)}function bl(r,e,n){let i=`FIRESTORE (${gn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${r.toString(16)})`;if(n!==void 0)try{i+=" CONTEXT: "+JSON.stringify(n)}catch{i+=" CONTEXT: "+n}throw te(i),new Error(i)}function J(r,e,n,i){let s="Unexpected state";typeof n=="string"?s=n:i=n,r||bl(e,s,i)}function q(r,e){return r}var P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},F=class extends Ht{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var Nt=class{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}};var Hr=class{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},js=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(lt.UNAUTHENTICATED))}shutdown(){}},$s=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}},Gs=class{constructor(e){this.t=e,this.currentUser=lt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){J(this.o===void 0,42304);let i=this.i,s=d=>this.i!==i?(i=this.i,n(d)):Promise.resolve(),a=new Nt;this.o=()=>{this.i++,this.currentUser=this.u(),a.resolve(),a=new Nt,e.enqueueRetryable(()=>s(this.currentUser))};let c=()=>{let d=a;e.enqueueRetryable(async()=>{await d.promise,await s(this.currentUser)})},l=d=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=d,this.o&&(this.auth.addAuthTokenListener(this.o),c())};this.t.onInit(d=>l(d)),setTimeout(()=>{if(!this.auth){let d=this.t.getImmediate({optional:!0});d?l(d):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),a.resolve(),a=new Nt)}},0),c()}getToken(){let e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(i=>this.i!==e?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(J(typeof i.accessToken=="string",31837,{l:i}),new Hr(i.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){let e=this.auth&&this.auth.getUid();return J(e===null||typeof e=="string",2055,{h:e}),new lt(e)}},Ks=class{constructor(e,n,i){this.P=e,this.T=n,this.I=i,this.type="FirstParty",this.user=lt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);let e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}},Ws=class{constructor(e,n,i){this.P=e,this.T=n,this.I=i}getToken(){return Promise.resolve(new Ks(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable(()=>n(lt.FIRST_PARTY))}shutdown(){}invalidateToken(){}},Qr=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},Hs=class{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Cu(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){J(this.o===void 0,3512);let i=a=>{a.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${a.error.message}`);let c=a.token!==this.m;return this.m=a.token,O("FirebaseAppCheckTokenProvider",`Received ${c?"new":"existing"} token.`),c?n(a.token):Promise.resolve()};this.o=a=>{e.enqueueRetryable(()=>i(a))};let s=a=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=a,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(a=>s(a)),setTimeout(()=>{if(!this.appCheck){let a=this.V.getImmediate({optional:!0});a?s(a):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Qr(this.p));let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(J(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new Qr(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}};function lm(r){let e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let i=0;i<r;i++)n[i]=Math.floor(256*Math.random());return n}function Al(){return new TextEncoder}var Yn=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516),i="";for(;i.length<20;){let s=lm(40);for(let a=0;a<s.length;++a)i.length<20&&s[a]<n&&(i+=e.charAt(s[a]%62))}return i}};function $(r,e){return r<e?-1:r>e?1:0}function Qs(r,e){let n=0;for(;n<r.length&&n<e.length;){let i=r.codePointAt(n),s=e.codePointAt(n);if(i!==s){if(i<128&&s<128)return $(i,s);{let a=Al(),c=hm(a.encode(Fu(r,n)),a.encode(Fu(e,n)));return c!==0?c:$(i,s)}}n+=i>65535?2:1}return $(r.length,e.length)}function Fu(r,e){return r.codePointAt(e)>65535?r.substring(e,e+2):r.substring(e,e+1)}function hm(r,e){for(let n=0;n<r.length&&n<e.length;++n)if(r[n]!==e[n])return $(r[n],e[n]);return $(r.length,e.length)}function tn(r,e,n){return r.length===e.length&&r.every((i,s)=>n(i,e[s]))}var Mu="__name__",Jr=class r{constructor(e,n,i){n===void 0?n=0:n>e.length&&M(637,{offset:n,range:e.length}),i===void 0?i=e.length-n:i>e.length-n&&M(1746,{length:i,range:e.length-n}),this.segments=e,this.offset=n,this.len=i}get length(){return this.len}isEqual(e){return r.comparator(this,e)===0}child(e){let n=this.segments.slice(this.offset,this.limit());return e instanceof r?e.forEach(i=>{n.push(i)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,i=this.limit();n<i;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){let i=Math.min(e.length,n.length);for(let s=0;s<i;s++){let a=r.compareSegments(e.get(s),n.get(s));if(a!==0)return a}return $(e.length,n.length)}static compareSegments(e,n){let i=r.isNumericId(e),s=r.isNumericId(n);return i&&!s?-1:!i&&s?1:i&&s?r.extractNumericId(e).compare(r.extractNumericId(n)):Qs(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Yt.fromString(e.substring(4,e.length-2))}},st=class r extends Jr{construct(e,n,i){return new r(e,n,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let n=[];for(let i of e){if(i.indexOf("//")>=0)throw new F(P.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);n.push(...i.split("/").filter(s=>s.length>0))}return new r(n)}static emptyPath(){return new r([])}},dm=/^[_a-zA-Z][_a-zA-Z0-9]*$/,bt=class r extends Jr{construct(e,n,i){return new r(e,n,i)}static isValidIdentifier(e){return dm.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),r.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Mu}static keyField(){return new r([Mu])}static fromServerFormat(e){let n=[],i="",s=0,a=()=>{if(i.length===0)throw new F(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(i),i=""},c=!1;for(;s<e.length;){let l=e[s];if(l==="\\"){if(s+1===e.length)throw new F(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let d=e[s+1];if(d!=="\\"&&d!=="."&&d!=="`")throw new F(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);i+=d,s+=2}else l==="`"?(c=!c,s++):l!=="."||c?(i+=l,s++):(a(),s++)}if(a(),c)throw new F(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new r(n)}static emptyPath(){return new r([])}};var B=class r{constructor(e){this.path=e}static fromPath(e){return new r(st.fromString(e))}static fromName(e){return new r(st.fromString(e).popFirst(5))}static empty(){return new r(st.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&st.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return st.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new r(new st(e.slice()))}};function fm(r,e,n){if(!n)throw new F(P.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function mm(r,e,n,i){if(e===!0&&i===!0)throw new F(P.INVALID_ARGUMENT,`${r} and ${n} cannot be used together.`)}function Bu(r){if(!B.isDocumentKey(r))throw new F(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function Sl(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function Sa(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{let e=function(i){return i.constructor?i.constructor.name:null}(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":M(12329,{type:typeof r})}function Ot(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new F(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let n=Sa(r);throw new F(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return r}function ct(r,e){let n={typeString:r};return e&&(n.value=e),n}function dr(r,e){if(!Sl(r))throw new F(P.INVALID_ARGUMENT,"JSON must be an object");let n;for(let i in e)if(e[i]){let s=e[i].typeString,a="value"in e[i]?{value:e[i].value}:void 0;if(!(i in r)){n=`JSON missing required field: '${i}'`;break}let c=r[i];if(s&&typeof c!==s){n=`JSON field '${i}' must be a ${s}.`;break}if(a!==void 0&&c!==a.value){n=`Expected '${i}' field to equal '${a.value}'`;break}}if(n)throw new F(P.INVALID_ARGUMENT,n);return!0}var zu=-62135596800,Uu=1e6,X=class r{static now(){return r.fromMillis(Date.now())}static fromDate(e){return r.fromMillis(e.getTime())}static fromMillis(e){let n=Math.floor(e/1e3),i=Math.floor((e-1e3*n)*Uu);return new r(n,i)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new F(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new F(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<zu)throw new F(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new F(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Uu}_compareTo(e){return this.seconds===e.seconds?$(this.nanoseconds,e.nanoseconds):$(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:r._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(dr(e,r._jsonSchema))return new r(e.seconds,e.nanoseconds)}valueOf(){let e=this.seconds-zu;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};X._jsonSchemaVersion="firestore/timestamp/1.0",X._jsonSchema={type:ct("string",X._jsonSchemaVersion),seconds:ct("number"),nanoseconds:ct("number")};var j=class r{static fromTimestamp(e){return new r(e)}static min(){return new r(new X(0,0))}static max(){return new r(new X(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var Zn=-1,Js=class{constructor(e,n,i,s){this.indexId=e,this.collectionGroup=n,this.fields=i,this.indexState=s}};Js.UNKNOWN_ID=-1;function pm(r,e){let n=r.toTimestamp().seconds,i=r.toTimestamp().nanoseconds+1,s=j.fromTimestamp(i===1e9?new X(n+1,0):new X(n,i));return new Ve(s,B.empty(),e)}function gm(r){return new Ve(r.readTime,r.key,Zn)}var Ve=class r{constructor(e,n,i){this.readTime=e,this.documentKey=n,this.largestBatchId=i}static min(){return new r(j.min(),B.empty(),Zn)}static max(){return new r(j.max(),B.empty(),Zn)}};function ym(r,e){let n=r.readTime.compareTo(e.readTime);return n!==0?n:(n=B.comparator(r.documentKey,e.documentKey),n!==0?n:$(r.largestBatchId,e.largestBatchId))}var _m="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",Xs=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}};async function yn(r){if(r.code!==P.FAILED_PRECONDITION||r.message!==_m)throw r;O("LocalStore","Unexpectedly lost primary lease")}var D=class r{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new r((i,s)=>{this.nextCallback=a=>{this.wrapSuccess(e,a).next(i,s)},this.catchCallback=a=>{this.wrapFailure(n,a).next(i,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{let n=e();return n instanceof r?n:r.resolve(n)}catch(n){return r.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):r.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):r.reject(n)}static resolve(e){return new r((n,i)=>{n(e)})}static reject(e){return new r((n,i)=>{i(e)})}static waitFor(e){return new r((n,i)=>{let s=0,a=0,c=!1;e.forEach(l=>{++s,l.next(()=>{++a,c&&a===s&&n()},d=>i(d))}),c=!0,a===s&&n()})}static or(e){let n=r.resolve(!1);for(let i of e)n=n.next(s=>s?r.resolve(s):i());return n}static forEach(e,n){let i=[];return e.forEach((s,a)=>{i.push(n.call(this,s,a))}),this.waitFor(i)}static mapArray(e,n){return new r((i,s)=>{let a=e.length,c=new Array(a),l=0;for(let d=0;d<a;d++){let f=d;n(e[f]).next(g=>{c[f]=g,++l,l===a&&i(c)},g=>s(g))}})}static doWhile(e,n){return new r((i,s)=>{let a=()=>{e()===!0?n().next(()=>{a()},s):i()};a()})}};function wm(r){let e=r.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function _n(r){return r.name==="IndexedDbTransactionError"}var en=class{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=i=>this._e(i),this.ae=i=>n.writeSequenceNumber(i))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.ae&&this.ae(e),e}};en.ue=-1;var Ra=-1;function Pi(r){return r==null}function tr(r){return r===0&&1/r==-1/0}function vm(r){return typeof r=="number"&&Number.isInteger(r)&&!tr(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}var Rl="";function Im(r){let e="";for(let n=0;n<r.length;n++)e.length>0&&(e=qu(e)),e=Em(r.get(n),e);return qu(e)}function Em(r,e){let n=e,i=r.length;for(let s=0;s<i;s++){let a=r.charAt(s);switch(a){case"\0":n+="";break;case Rl:n+="";break;default:n+=a}}return n}function qu(r){return r+Rl+""}var Tm="remoteDocuments",Cl="owner";var Pl="mutationQueues";var Dl="mutations";var xl="documentMutations",bm="remoteDocumentsV14";var Vl="remoteDocumentGlobal";var kl="targets";var Nl="targetDocuments";var Ol="targetGlobal",Ll="collectionParents";var Fl="clientMetadata";var Ml="bundles";var Bl="namedQueries";var Am="indexConfiguration";var Sm="indexState";var Rm="indexEntries";var zl="documentOverlays";var Cm="globals";var Pm=[Pl,Dl,xl,Tm,kl,Cl,Ol,Nl,Fl,Vl,Ll,Ml,Bl],ly=[...Pm,zl],Dm=[Pl,Dl,xl,bm,kl,Cl,Ol,Nl,Fl,Vl,Ll,Ml,Bl,zl],xm=Dm,Vm=[...xm,Am,Sm,Rm];var hy=[...Vm,Cm];function ju(r){let e=0;for(let n in r)Object.prototype.hasOwnProperty.call(r,n)&&e++;return e}function ve(r,e){for(let n in r)Object.prototype.hasOwnProperty.call(r,n)&&e(n,r[n])}function Ul(r){for(let e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}var it=class r{constructor(e,n){this.comparator=e,this.root=n||Lt.EMPTY}insert(e,n){return new r(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Lt.BLACK,null,null))}remove(e){return new r(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Lt.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){let i=this.comparator(e,n.key);if(i===0)return n.value;i<0?n=n.left:i>0&&(n=n.right)}return null}indexOf(e){let n=0,i=this.root;for(;!i.isEmpty();){let s=this.comparator(e,i.key);if(s===0)return n+i.left.size;s<0?i=i.left:(n+=i.left.size+1,i=i.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,i)=>(e(n,i),!1))}toString(){let e=[];return this.inorderTraversal((n,i)=>(e.push(`${n}:${i}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Je(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Je(this.root,e,this.comparator,!1)}getReverseIterator(){return new Je(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Je(this.root,e,this.comparator,!0)}},Je=class{constructor(e,n,i,s){this.isReverse=s,this.nodeStack=[];let a=1;for(;!e.isEmpty();)if(a=n?i(e.key,n):1,n&&s&&(a*=-1),a<0)e=this.isReverse?e.left:e.right;else{if(a===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},Lt=class r{constructor(e,n,i,s,a){this.key=e,this.value=n,this.color=i??r.RED,this.left=s??r.EMPTY,this.right=a??r.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,i,s,a){return new r(e??this.key,n??this.value,i??this.color,s??this.left,a??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let s=this,a=i(e,s.key);return s=a<0?s.copy(null,null,null,s.left.insert(e,n,i),null):a===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,i)),s.fixUp()}removeMin(){if(this.left.isEmpty())return r.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let i,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return r.EMPTY;i=s.right.min(),s=s.copy(i.key,i.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,r.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,r.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});let e=this.left.check();if(e!==this.right.check())throw M(27949);return e+(this.isRed()?0:1)}};Lt.EMPTY=null,Lt.RED=!0,Lt.BLACK=!1;Lt.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(e,n,i,s,a){return this}insert(e,n,i){return new Lt(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var ht=class r{constructor(e){this.comparator=e,this.data=new it(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,i)=>(e(n),!1))}forEachInRange(e,n){let i=this.data.getIteratorFrom(e[0]);for(;i.hasNext();){let s=i.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let i;for(i=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();i.hasNext();)if(!e(i.getNext().key))return}firstAfterOrEqual(e){let n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Xr(this.data.getIterator())}getIteratorFrom(e){return new Xr(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(i=>{n=n.add(i)}),n}isEqual(e){if(!(e instanceof r)||this.size!==e.size)return!1;let n=this.data.getIterator(),i=e.data.getIterator();for(;n.hasNext();){let s=n.getNext().key,a=i.getNext().key;if(this.comparator(s,a)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(n=>{e.push(n)}),e}toString(){let e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){let n=new r(this.comparator);return n.data=e,n}},Xr=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var Rt=class r{constructor(e){this.fields=e,e.sort(bt.comparator)}static empty(){return new r([])}unionWith(e){let n=new ht(bt.comparator);for(let i of this.fields)n=n.add(i);for(let i of e)n=n.add(i);return new r(n.toArray())}covers(e){for(let n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return tn(this.fields,e.fields,(n,i)=>n.isEqual(i))}};var Yr=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var wt=class r{constructor(e){this.binaryString=e}static fromBase64String(e){let n=function(s){try{return atob(s)}catch(a){throw typeof DOMException<"u"&&a instanceof DOMException?new Yr("Invalid base64 string: "+a):a}}(e);return new r(n)}static fromUint8Array(e){let n=function(s){let a="";for(let c=0;c<s.length;++c)a+=String.fromCharCode(s[c]);return a}(e);return new r(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){let i=new Uint8Array(n.length);for(let s=0;s<n.length;s++)i[s]=n.charCodeAt(s);return i}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return $(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};wt.EMPTY_BYTE_STRING=new wt("");var km=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ee(r){if(J(!!r,39018),typeof r=="string"){let e=0,n=km.exec(r);if(J(!!n,46558,{timestamp:r}),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}let i=new Date(r);return{seconds:Math.floor(i.getTime()/1e3),nanos:e}}return{seconds:nt(r.seconds),nanos:nt(r.nanos)}}function nt(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function ne(r){return typeof r=="string"?wt.fromBase64String(r):wt.fromUint8Array(r)}var ql="server_timestamp",jl="__type__",$l="__previous_value__",Gl="__local_write_time__";function Ca(r){var e,n;return((n=(((e=r?.mapValue)===null||e===void 0?void 0:e.fields)||{})[jl])===null||n===void 0?void 0:n.stringValue)===ql}function Di(r){let e=r.mapValue.fields[$l];return Ca(e)?Di(e):e}function er(r){let e=ee(r.mapValue.fields[Gl].timestampValue);return new X(e.seconds,e.nanos)}var Ys=class{constructor(e,n,i,s,a,c,l,d,f,g){this.databaseId=e,this.appId=n,this.persistenceKey=i,this.host=s,this.ssl=a,this.forceLongPolling=c,this.autoDetectLongPolling=l,this.longPollingOptions=d,this.useFetchStreams=f,this.isUsingEmulator=g}},Zr="(default)",ti=class r{constructor(e,n){this.projectId=e,this.database=n||Zr}static empty(){return new r("","")}get isDefaultDatabase(){return this.database===Zr}isEqual(e){return e instanceof r&&e.projectId===this.projectId&&e.database===this.database}};var Pa="__type__",Kl="__max__",qr={mapValue:{fields:{__type__:{stringValue:Kl}}}},Da="__vector__",nn="value";function ge(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Ca(r)?4:Hl(r)?9007199254740991:Wl(r)?10:11:M(28295,{value:r})}function Bt(r,e){if(r===e)return!0;let n=ge(r);if(n!==ge(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return er(r).isEqual(er(e));case 3:return function(s,a){if(typeof s.timestampValue=="string"&&typeof a.timestampValue=="string"&&s.timestampValue.length===a.timestampValue.length)return s.timestampValue===a.timestampValue;let c=ee(s.timestampValue),l=ee(a.timestampValue);return c.seconds===l.seconds&&c.nanos===l.nanos}(r,e);case 5:return r.stringValue===e.stringValue;case 6:return function(s,a){return ne(s.bytesValue).isEqual(ne(a.bytesValue))}(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return function(s,a){return nt(s.geoPointValue.latitude)===nt(a.geoPointValue.latitude)&&nt(s.geoPointValue.longitude)===nt(a.geoPointValue.longitude)}(r,e);case 2:return function(s,a){if("integerValue"in s&&"integerValue"in a)return nt(s.integerValue)===nt(a.integerValue);if("doubleValue"in s&&"doubleValue"in a){let c=nt(s.doubleValue),l=nt(a.doubleValue);return c===l?tr(c)===tr(l):isNaN(c)&&isNaN(l)}return!1}(r,e);case 9:return tn(r.arrayValue.values||[],e.arrayValue.values||[],Bt);case 10:case 11:return function(s,a){let c=s.mapValue.fields||{},l=a.mapValue.fields||{};if(ju(c)!==ju(l))return!1;for(let d in c)if(c.hasOwnProperty(d)&&(l[d]===void 0||!Bt(c[d],l[d])))return!1;return!0}(r,e);default:return M(52216,{left:r})}}function nr(r,e){return(r.values||[]).find(n=>Bt(n,e))!==void 0}function rn(r,e){if(r===e)return 0;let n=ge(r),i=ge(e);if(n!==i)return $(n,i);switch(n){case 0:case 9007199254740991:return 0;case 1:return $(r.booleanValue,e.booleanValue);case 2:return function(a,c){let l=nt(a.integerValue||a.doubleValue),d=nt(c.integerValue||c.doubleValue);return l<d?-1:l>d?1:l===d?0:isNaN(l)?isNaN(d)?0:-1:1}(r,e);case 3:return $u(r.timestampValue,e.timestampValue);case 4:return $u(er(r),er(e));case 5:return Qs(r.stringValue,e.stringValue);case 6:return function(a,c){let l=ne(a),d=ne(c);return l.compareTo(d)}(r.bytesValue,e.bytesValue);case 7:return function(a,c){let l=a.split("/"),d=c.split("/");for(let f=0;f<l.length&&f<d.length;f++){let g=$(l[f],d[f]);if(g!==0)return g}return $(l.length,d.length)}(r.referenceValue,e.referenceValue);case 8:return function(a,c){let l=$(nt(a.latitude),nt(c.latitude));return l!==0?l:$(nt(a.longitude),nt(c.longitude))}(r.geoPointValue,e.geoPointValue);case 9:return Gu(r.arrayValue,e.arrayValue);case 10:return function(a,c){var l,d,f,g;let w=a.fields||{},I=c.fields||{},C=(l=w[nn])===null||l===void 0?void 0:l.arrayValue,x=(d=I[nn])===null||d===void 0?void 0:d.arrayValue,k=$(((f=C?.values)===null||f===void 0?void 0:f.length)||0,((g=x?.values)===null||g===void 0?void 0:g.length)||0);return k!==0?k:Gu(C,x)}(r.mapValue,e.mapValue);case 11:return function(a,c){if(a===qr.mapValue&&c===qr.mapValue)return 0;if(a===qr.mapValue)return 1;if(c===qr.mapValue)return-1;let l=a.fields||{},d=Object.keys(l),f=c.fields||{},g=Object.keys(f);d.sort(),g.sort();for(let w=0;w<d.length&&w<g.length;++w){let I=Qs(d[w],g[w]);if(I!==0)return I;let C=rn(l[d[w]],f[g[w]]);if(C!==0)return C}return $(d.length,g.length)}(r.mapValue,e.mapValue);default:throw M(23264,{le:n})}}function $u(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return $(r,e);let n=ee(r),i=ee(e),s=$(n.seconds,i.seconds);return s!==0?s:$(n.nanos,i.nanos)}function Gu(r,e){let n=r.values||[],i=e.values||[];for(let s=0;s<n.length&&s<i.length;++s){let a=rn(n[s],i[s]);if(a)return a}return $(n.length,i.length)}function sn(r){return Zs(r)}function Zs(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(n){let i=ee(n);return`time(${i.seconds},${i.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(n){return ne(n).toBase64()}(r.bytesValue):"referenceValue"in r?function(n){return B.fromName(n).toString()}(r.referenceValue):"geoPointValue"in r?function(n){return`geo(${n.latitude},${n.longitude})`}(r.geoPointValue):"arrayValue"in r?function(n){let i="[",s=!0;for(let a of n.values||[])s?s=!1:i+=",",i+=Zs(a);return i+"]"}(r.arrayValue):"mapValue"in r?function(n){let i=Object.keys(n.fields||{}).sort(),s="{",a=!0;for(let c of i)a?a=!1:s+=",",s+=`${c}:${Zs(n.fields[c])}`;return s+"}"}(r.mapValue):M(61005,{value:r})}function Gr(r){switch(ge(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:let e=Di(r);return e?16+Gr(e):16;case 5:return 2*r.stringValue.length;case 6:return ne(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(i){return(i.values||[]).reduce((s,a)=>s+Gr(a),0)}(r.arrayValue);case 10:case 11:return function(i){let s=0;return ve(i.fields,(a,c)=>{s+=a.length+Gr(c)}),s}(r.mapValue);default:throw M(13486,{value:r})}}function to(r){return!!r&&"integerValue"in r}function xa(r){return!!r&&"arrayValue"in r}function Ku(r){return!!r&&"nullValue"in r}function Wu(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Kr(r){return!!r&&"mapValue"in r}function Wl(r){var e,n;return((n=(((e=r?.mapValue)===null||e===void 0?void 0:e.fields)||{})[Pa])===null||n===void 0?void 0:n.stringValue)===Da}function Hn(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){let e={mapValue:{fields:{}}};return ve(r.mapValue.fields,(n,i)=>e.mapValue.fields[n]=Hn(i)),e}if(r.arrayValue){let e={arrayValue:{values:[]}};for(let n=0;n<(r.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Hn(r.arrayValue.values[n]);return e}return Object.assign({},r)}function Hl(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===Kl}var fy={mapValue:{fields:{[Pa]:{stringValue:Da},[nn]:{arrayValue:{}}}}};var Tt=class r{constructor(e){this.value=e}static empty(){return new r({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let i=0;i<e.length-1;++i)if(n=(n.mapValue.fields||{})[e.get(i)],!Kr(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Hn(n)}setAll(e){let n=bt.emptyPath(),i={},s=[];e.forEach((c,l)=>{if(!n.isImmediateParentOf(l)){let d=this.getFieldsMap(n);this.applyChanges(d,i,s),i={},s=[],n=l.popLast()}c?i[l.lastSegment()]=Hn(c):s.push(l.lastSegment())});let a=this.getFieldsMap(n);this.applyChanges(a,i,s)}delete(e){let n=this.field(e.popLast());Kr(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return Bt(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let i=0;i<e.length;++i){let s=n.mapValue.fields[e.get(i)];Kr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(i)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,i){ve(n,(s,a)=>e[s]=a);for(let s of i)delete e[s]}clone(){return new r(Hn(this.value))}};function Ql(r){let e=[];return ve(r.fields,(n,i)=>{let s=new bt([n]);if(Kr(i)){let a=Ql(i.mapValue).fields;if(a.length===0)e.push(s);else for(let c of a)e.push(s.child(c))}else e.push(s)}),new Rt(e)}var Pt=class r{constructor(e,n,i,s,a,c,l){this.key=e,this.documentType=n,this.version=i,this.readTime=s,this.createTime=a,this.data=c,this.documentState=l}static newInvalidDocument(e){return new r(e,0,j.min(),j.min(),j.min(),Tt.empty(),0)}static newFoundDocument(e,n,i,s){return new r(e,1,n,j.min(),i,s,0)}static newNoDocument(e,n){return new r(e,2,n,j.min(),j.min(),Tt.empty(),0)}static newUnknownDocument(e,n){return new r(e,3,n,j.min(),j.min(),Tt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(j.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Tt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Tt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=j.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof r&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new r(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var on=class{constructor(e,n){this.position=e,this.inclusive=n}};function Hu(r,e,n){let i=0;for(let s=0;s<r.position.length;s++){let a=e[s],c=r.position[s];if(a.field.isKeyField()?i=B.comparator(B.fromName(c.referenceValue),n.key):i=rn(c,n.data.field(a.field)),a.dir==="desc"&&(i*=-1),i!==0)break}return i}function Qu(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let n=0;n<r.position.length;n++)if(!Bt(r.position[n],e.position[n]))return!1;return!0}var an=class{constructor(e,n="asc"){this.field=e,this.dir=n}};function Nm(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}var ei=class{},ut=class r extends ei{constructor(e,n,i){super(),this.field=e,this.op=n,this.value=i}static create(e,n,i){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,i):new no(e,n,i):n==="array-contains"?new so(e,i):n==="in"?new oo(e,i):n==="not-in"?new ao(e,i):n==="array-contains-any"?new co(e,i):new r(e,n,i)}static createKeyFieldInFilter(e,n,i){return n==="in"?new ro(e,i):new io(e,i)}matches(e){let n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(rn(n,this.value)):n!==null&&ge(this.value)===ge(n)&&this.matchesComparison(rn(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},zt=class r extends ei{constructor(e,n){super(),this.filters=e,this.op=n,this.he=null}static create(e,n){return new r(e,n)}matches(e){return Jl(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}};function Jl(r){return r.op==="and"}function Xl(r){return Om(r)&&Jl(r)}function Om(r){for(let e of r.filters)if(e instanceof zt)return!1;return!0}function eo(r){if(r instanceof ut)return r.field.canonicalString()+r.op.toString()+sn(r.value);if(Xl(r))return r.filters.map(e=>eo(e)).join(",");{let e=r.filters.map(n=>eo(n)).join(",");return`${r.op}(${e})`}}function Yl(r,e){return r instanceof ut?function(i,s){return s instanceof ut&&i.op===s.op&&i.field.isEqual(s.field)&&Bt(i.value,s.value)}(r,e):r instanceof zt?function(i,s){return s instanceof zt&&i.op===s.op&&i.filters.length===s.filters.length?i.filters.reduce((a,c,l)=>a&&Yl(c,s.filters[l]),!0):!1}(r,e):void M(19439)}function Zl(r){return r instanceof ut?function(n){return`${n.field.canonicalString()} ${n.op} ${sn(n.value)}`}(r):r instanceof zt?function(n){return n.op.toString()+" {"+n.getFilters().map(Zl).join(" ,")+"}"}(r):"Filter"}var no=class extends ut{constructor(e,n,i){super(e,n,i),this.key=B.fromName(i.referenceValue)}matches(e){let n=B.comparator(e.key,this.key);return this.matchesComparison(n)}},ro=class extends ut{constructor(e,n){super(e,"in",n),this.keys=th("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}},io=class extends ut{constructor(e,n){super(e,"not-in",n),this.keys=th("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}};function th(r,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(i=>B.fromName(i.referenceValue))}var so=class extends ut{constructor(e,n){super(e,"array-contains",n)}matches(e){let n=e.data.field(this.field);return xa(n)&&nr(n.arrayValue,this.value)}},oo=class extends ut{constructor(e,n){super(e,"in",n)}matches(e){let n=e.data.field(this.field);return n!==null&&nr(this.value.arrayValue,n)}},ao=class extends ut{constructor(e,n){super(e,"not-in",n)}matches(e){if(nr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!nr(this.value.arrayValue,n)}},co=class extends ut{constructor(e,n){super(e,"array-contains-any",n)}matches(e){let n=e.data.field(this.field);return!(!xa(n)||!n.arrayValue.values)&&n.arrayValue.values.some(i=>nr(this.value.arrayValue,i))}};var uo=class{constructor(e,n=null,i=[],s=[],a=null,c=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=i,this.filters=s,this.limit=a,this.startAt=c,this.endAt=l,this.Pe=null}};function Ju(r,e=null,n=[],i=[],s=null,a=null,c=null){return new uo(r,e,n,i,s,a,c)}function Va(r){let e=q(r);if(e.Pe===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(i=>eo(i)).join(","),n+="|ob:",n+=e.orderBy.map(i=>function(a){return a.field.canonicalString()+a.dir}(i)).join(","),Pi(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(i=>sn(i)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(i=>sn(i)).join(",")),e.Pe=n}return e.Pe}function ka(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<r.orderBy.length;n++)if(!Nm(r.orderBy[n],e.orderBy[n]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let n=0;n<r.filters.length;n++)if(!Yl(r.filters[n],e.filters[n]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!Qu(r.startAt,e.startAt)&&Qu(r.endAt,e.endAt)}function lo(r){return B.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}var cn=class{constructor(e,n=null,i=[],s=[],a=null,c="F",l=null,d=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=i,this.filters=s,this.limit=a,this.limitType=c,this.startAt=l,this.endAt=d,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}};function Lm(r,e,n,i,s,a,c,l){return new cn(r,e,n,i,s,a,c,l)}function xi(r){return new cn(r)}function Xu(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function Fm(r){return r.collectionGroup!==null}function Qn(r){let e=q(r);if(e.Te===null){e.Te=[];let n=new Set;for(let a of e.explicitOrderBy)e.Te.push(a),n.add(a.field.canonicalString());let i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(c){let l=new ht(bt.comparator);return c.filters.forEach(d=>{d.getFlattenedFilters().forEach(f=>{f.isInequality()&&(l=l.add(f.field))})}),l})(e).forEach(a=>{n.has(a.canonicalString())||a.isKeyField()||e.Te.push(new an(a,i))}),n.has(bt.keyField().canonicalString())||e.Te.push(new an(bt.keyField(),i))}return e.Te}function Ft(r){let e=q(r);return e.Ie||(e.Ie=Mm(e,Qn(r))),e.Ie}function Mm(r,e){if(r.limitType==="F")return Ju(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map(s=>{let a=s.dir==="desc"?"asc":"desc";return new an(s.field,a)});let n=r.endAt?new on(r.endAt.position,r.endAt.inclusive):null,i=r.startAt?new on(r.startAt.position,r.startAt.inclusive):null;return Ju(r.path,r.collectionGroup,e,r.filters,r.limit,n,i)}}function ho(r,e,n){return new cn(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,n,r.startAt,r.endAt)}function Vi(r,e){return ka(Ft(r),Ft(e))&&r.limitType===e.limitType}function eh(r){return`${Va(Ft(r))}|lt:${r.limitType}`}function We(r){return`Query(target=${function(n){let i=n.path.canonicalString();return n.collectionGroup!==null&&(i+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(i+=`, filters: [${n.filters.map(s=>Zl(s)).join(", ")}]`),Pi(n.limit)||(i+=", limit: "+n.limit),n.orderBy.length>0&&(i+=`, orderBy: [${n.orderBy.map(s=>function(c){return`${c.field.canonicalString()} (${c.dir})`}(s)).join(", ")}]`),n.startAt&&(i+=", startAt: ",i+=n.startAt.inclusive?"b:":"a:",i+=n.startAt.position.map(s=>sn(s)).join(",")),n.endAt&&(i+=", endAt: ",i+=n.endAt.inclusive?"a:":"b:",i+=n.endAt.position.map(s=>sn(s)).join(",")),`Target(${i})`}(Ft(r))}; limitType=${r.limitType})`}function ki(r,e){return e.isFoundDocument()&&function(i,s){let a=s.key.path;return i.collectionGroup!==null?s.key.hasCollectionId(i.collectionGroup)&&i.path.isPrefixOf(a):B.isDocumentKey(i.path)?i.path.isEqual(a):i.path.isImmediateParentOf(a)}(r,e)&&function(i,s){for(let a of Qn(i))if(!a.field.isKeyField()&&s.data.field(a.field)===null)return!1;return!0}(r,e)&&function(i,s){for(let a of i.filters)if(!a.matches(s))return!1;return!0}(r,e)&&function(i,s){return!(i.startAt&&!function(c,l,d){let f=Hu(c,l,d);return c.inclusive?f<=0:f<0}(i.startAt,Qn(i),s)||i.endAt&&!function(c,l,d){let f=Hu(c,l,d);return c.inclusive?f>=0:f>0}(i.endAt,Qn(i),s))}(r,e)}function Bm(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function nh(r){return(e,n)=>{let i=!1;for(let s of Qn(r)){let a=zm(s,e,n);if(a!==0)return a;i=i||s.field.isKeyField()}return 0}}function zm(r,e,n){let i=r.field.isKeyField()?B.comparator(e.key,n.key):function(a,c,l){let d=c.data.field(a),f=l.data.field(a);return d!==null&&f!==null?rn(d,f):M(42886)}(r.field,e,n);switch(r.dir){case"asc":return i;case"desc":return-1*i;default:return M(19790,{direction:r.dir})}}var re=class{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){let n=this.mapKeyFn(e),i=this.inner[n];if(i!==void 0){for(let[s,a]of i)if(this.equalsFn(s,e))return a}}has(e){return this.get(e)!==void 0}set(e,n){let i=this.mapKeyFn(e),s=this.inner[i];if(s===void 0)return this.inner[i]=[[e,n]],void this.innerSize++;for(let a=0;a<s.length;a++)if(this.equalsFn(s[a][0],e))return void(s[a]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){let n=this.mapKeyFn(e),i=this.inner[n];if(i===void 0)return!1;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return i.length===1?delete this.inner[n]:i.splice(s,1),this.innerSize--,!0;return!1}forEach(e){ve(this.inner,(n,i)=>{for(let[s,a]of i)e(s,a)})}isEmpty(){return Ul(this.inner)}size(){return this.innerSize}};var Um=new it(B.comparator);function ie(){return Um}var rh=new it(B.comparator);function Wn(...r){let e=rh;for(let n of r)e=e.insert(n.key,n);return e}function ih(r){let e=rh;return r.forEach((n,i)=>e=e.insert(n,i.overlayedDocument)),e}function Re(){return Jn()}function sh(){return Jn()}function Jn(){return new re(r=>r.toString(),(r,e)=>r.isEqual(e))}var qm=new it(B.comparator),jm=new ht(B.comparator);function K(...r){let e=jm;for(let n of r)e=e.add(n);return e}var $m=new ht($);function Gm(){return $m}function Na(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:tr(e)?"-0":e}}function oh(r){return{integerValue:""+r}}function Km(r,e){return vm(e)?oh(e):Na(r,e)}var un=class{constructor(){this._=void 0}};function Wm(r,e,n){return r instanceof ln?function(s,a){let c={fields:{[jl]:{stringValue:ql},[Gl]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return a&&Ca(a)&&(a=Di(a)),a&&(c.fields[$l]=a),{mapValue:c}}(n,e):r instanceof ke?ch(r,e):r instanceof Ne?uh(r,e):function(s,a){let c=ah(s,a),l=Yu(c)+Yu(s.Ee);return to(c)&&to(s.Ee)?oh(l):Na(s.serializer,l)}(r,e)}function Hm(r,e,n){return r instanceof ke?ch(r,e):r instanceof Ne?uh(r,e):n}function ah(r,e){return r instanceof hn?function(i){return to(i)||function(a){return!!a&&"doubleValue"in a}(i)}(e)?e:{integerValue:0}:null}var ln=class extends un{},ke=class extends un{constructor(e){super(),this.elements=e}};function ch(r,e){let n=lh(e);for(let i of r.elements)n.some(s=>Bt(s,i))||n.push(i);return{arrayValue:{values:n}}}var Ne=class extends un{constructor(e){super(),this.elements=e}};function uh(r,e){let n=lh(e);for(let i of r.elements)n=n.filter(s=>!Bt(s,i));return{arrayValue:{values:n}}}var hn=class extends un{constructor(e,n){super(),this.serializer=e,this.Ee=n}};function Yu(r){return nt(r.integerValue||r.doubleValue)}function lh(r){return xa(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}function Qm(r,e){return r.field.isEqual(e.field)&&function(i,s){return i instanceof ke&&s instanceof ke||i instanceof Ne&&s instanceof Ne?tn(i.elements,s.elements,Bt):i instanceof hn&&s instanceof hn?Bt(i.Ee,s.Ee):i instanceof ln&&s instanceof ln}(r.transform,e.transform)}var fo=class{constructor(e,n){this.version=e,this.transformResults=n}},he=class r{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new r}static exists(e){return new r(void 0,e)}static updateTime(e){return new r(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function Wr(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}var dn=class{};function hh(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new ni(r.key,he.none()):new Oe(r.key,r.data,he.none());{let n=r.data,i=Tt.empty(),s=new ht(bt.comparator);for(let a of e.fields)if(!s.has(a)){let c=n.field(a);c===null&&a.length>1&&(a=a.popLast(),c=n.field(a)),c===null?i.delete(a):i.set(a,c),s=s.add(a)}return new Ut(r.key,i,new Rt(s.toArray()),he.none())}}function Jm(r,e,n){r instanceof Oe?function(s,a,c){let l=s.value.clone(),d=tl(s.fieldTransforms,a,c.transformResults);l.setAll(d),a.convertToFoundDocument(c.version,l).setHasCommittedMutations()}(r,e,n):r instanceof Ut?function(s,a,c){if(!Wr(s.precondition,a))return void a.convertToUnknownDocument(c.version);let l=tl(s.fieldTransforms,a,c.transformResults),d=a.data;d.setAll(dh(s)),d.setAll(l),a.convertToFoundDocument(c.version,d).setHasCommittedMutations()}(r,e,n):function(s,a,c){a.convertToNoDocument(c.version).setHasCommittedMutations()}(0,e,n)}function Xn(r,e,n,i){return r instanceof Oe?function(a,c,l,d){if(!Wr(a.precondition,c))return l;let f=a.value.clone(),g=el(a.fieldTransforms,d,c);return f.setAll(g),c.convertToFoundDocument(c.version,f).setHasLocalMutations(),null}(r,e,n,i):r instanceof Ut?function(a,c,l,d){if(!Wr(a.precondition,c))return l;let f=el(a.fieldTransforms,d,c),g=c.data;return g.setAll(dh(a)),g.setAll(f),c.convertToFoundDocument(c.version,g).setHasLocalMutations(),l===null?null:l.unionWith(a.fieldMask.fields).unionWith(a.fieldTransforms.map(w=>w.field))}(r,e,n,i):function(a,c,l){return Wr(a.precondition,c)?(c.convertToNoDocument(c.version).setHasLocalMutations(),null):l}(r,e,n)}function Xm(r,e){let n=null;for(let i of r.fieldTransforms){let s=e.data.field(i.field),a=ah(i.transform,s||null);a!=null&&(n===null&&(n=Tt.empty()),n.set(i.field,a))}return n||null}function Zu(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!function(i,s){return i===void 0&&s===void 0||!(!i||!s)&&tn(i,s,(a,c)=>Qm(a,c))}(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}var Oe=class extends dn{constructor(e,n,i,s=[]){super(),this.key=e,this.value=n,this.precondition=i,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}},Ut=class extends dn{constructor(e,n,i,s,a=[]){super(),this.key=e,this.data=n,this.fieldMask=i,this.precondition=s,this.fieldTransforms=a,this.type=1}getFieldMask(){return this.fieldMask}};function dh(r){let e=new Map;return r.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){let i=r.data.field(n);e.set(n,i)}}),e}function tl(r,e,n){let i=new Map;J(r.length===n.length,32656,{Ae:n.length,Re:r.length});for(let s=0;s<n.length;s++){let a=r[s],c=a.transform,l=e.data.field(a.field);i.set(a.field,Hm(c,l,n[s]))}return i}function el(r,e,n){let i=new Map;for(let s of r){let a=s.transform,c=n.data.field(s.field);i.set(s.field,Wm(a,c,e))}return i}var ni=class extends dn{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},mo=class extends dn{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var po=class{constructor(e,n,i,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=i,this.mutations=s}applyToRemoteDocument(e,n){let i=n.mutationResults;for(let s=0;s<this.mutations.length;s++){let a=this.mutations[s];a.key.isEqual(e.key)&&Jm(a,e,i[s])}}applyToLocalView(e,n){for(let i of this.baseMutations)i.key.isEqual(e.key)&&(n=Xn(i,e,n,this.localWriteTime));for(let i of this.mutations)i.key.isEqual(e.key)&&(n=Xn(i,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){let i=sh();return this.mutations.forEach(s=>{let a=e.get(s.key),c=a.overlayedDocument,l=this.applyToLocalView(c,a.mutatedFields);l=n.has(s.key)?null:l;let d=hh(c,l);d!==null&&i.set(s.key,d),c.isValidDocument()||c.convertToNoDocument(j.min())}),i}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),K())}isEqual(e){return this.batchId===e.batchId&&tn(this.mutations,e.mutations,(n,i)=>Zu(n,i))&&tn(this.baseMutations,e.baseMutations,(n,i)=>Zu(n,i))}},go=class r{constructor(e,n,i,s){this.batch=e,this.commitVersion=n,this.mutationResults=i,this.docVersions=s}static from(e,n,i){J(e.mutations.length===i.length,58842,{Ve:e.mutations.length,me:i.length});let s=function(){return qm}(),a=e.mutations;for(let c=0;c<a.length;c++)s=s.insert(a[c].key,i[c].version);return new r(e,n,i,s)}};var yo=class{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var _o=class{constructor(e,n){this.count=e,this.unchangedNames=n}};var ot,H;function Ym(r){switch(r){case P.OK:return M(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return M(15467,{code:r})}}function fh(r){if(r===void 0)return te("GRPC error has no .code"),P.UNKNOWN;switch(r){case ot.OK:return P.OK;case ot.CANCELLED:return P.CANCELLED;case ot.UNKNOWN:return P.UNKNOWN;case ot.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case ot.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case ot.INTERNAL:return P.INTERNAL;case ot.UNAVAILABLE:return P.UNAVAILABLE;case ot.UNAUTHENTICATED:return P.UNAUTHENTICATED;case ot.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case ot.NOT_FOUND:return P.NOT_FOUND;case ot.ALREADY_EXISTS:return P.ALREADY_EXISTS;case ot.PERMISSION_DENIED:return P.PERMISSION_DENIED;case ot.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case ot.ABORTED:return P.ABORTED;case ot.OUT_OF_RANGE:return P.OUT_OF_RANGE;case ot.UNIMPLEMENTED:return P.UNIMPLEMENTED;case ot.DATA_LOSS:return P.DATA_LOSS;default:return M(39323,{code:r})}}(H=ot||(ot={}))[H.OK=0]="OK",H[H.CANCELLED=1]="CANCELLED",H[H.UNKNOWN=2]="UNKNOWN",H[H.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",H[H.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",H[H.NOT_FOUND=5]="NOT_FOUND",H[H.ALREADY_EXISTS=6]="ALREADY_EXISTS",H[H.PERMISSION_DENIED=7]="PERMISSION_DENIED",H[H.UNAUTHENTICATED=16]="UNAUTHENTICATED",H[H.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",H[H.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",H[H.ABORTED=10]="ABORTED",H[H.OUT_OF_RANGE=11]="OUT_OF_RANGE",H[H.UNIMPLEMENTED=12]="UNIMPLEMENTED",H[H.INTERNAL=13]="INTERNAL",H[H.UNAVAILABLE=14]="UNAVAILABLE",H[H.DATA_LOSS=15]="DATA_LOSS";var nl=null;var Zm=new Yt([4294967295,4294967295],0);function rl(r){let e=Al().encode(r),n=new ks;return n.update(e),new Uint8Array(n.digest())}function il(r){let e=new DataView(r.buffer),n=e.getUint32(0,!0),i=e.getUint32(4,!0),s=e.getUint32(8,!0),a=e.getUint32(12,!0);return[new Yt([n,i],0),new Yt([s,a],0)]}var wo=class r{constructor(e,n,i){if(this.bitmap=e,this.padding=n,this.hashCount=i,n<0||n>=8)throw new Ce(`Invalid padding: ${n}`);if(i<0)throw new Ce(`Invalid hash count: ${i}`);if(e.length>0&&this.hashCount===0)throw new Ce(`Invalid hash count: ${i}`);if(e.length===0&&n!==0)throw new Ce(`Invalid padding when bitmap length is 0: ${n}`);this.fe=8*e.length-n,this.ge=Yt.fromNumber(this.fe)}pe(e,n,i){let s=e.add(n.multiply(Yt.fromNumber(i)));return s.compare(Zm)===1&&(s=new Yt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;let n=rl(e),[i,s]=il(n);for(let a=0;a<this.hashCount;a++){let c=this.pe(i,s,a);if(!this.ye(c))return!1}return!0}static create(e,n,i){let s=e%8==0?0:8-e%8,a=new Uint8Array(Math.ceil(e/8)),c=new r(a,s,n);return i.forEach(l=>c.insert(l)),c}insert(e){if(this.fe===0)return;let n=rl(e),[i,s]=il(n);for(let a=0;a<this.hashCount;a++){let c=this.pe(i,s,a);this.we(c)}}we(e){let n=Math.floor(e/8),i=e%8;this.bitmap[n]|=1<<i}},Ce=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};var ri=class r{constructor(e,n,i,s,a){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=i,this.documentUpdates=s,this.resolvedLimboDocuments=a}static createSynthesizedRemoteEventForCurrentChange(e,n,i){let s=new Map;return s.set(e,rr.createSynthesizedTargetChangeForCurrentChange(e,n,i)),new r(j.min(),s,new it($),ie(),K())}},rr=class r{constructor(e,n,i,s,a){this.resumeToken=e,this.current=n,this.addedDocuments=i,this.modifiedDocuments=s,this.removedDocuments=a}static createSynthesizedTargetChangeForCurrentChange(e,n,i){return new r(i,n,K(),K(),K())}};var Xe=class{constructor(e,n,i,s){this.Se=e,this.removedTargetIds=n,this.key=i,this.be=s}},ii=class{constructor(e,n){this.targetId=e,this.De=n}},si=class{constructor(e,n,i=wt.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=i,this.cause=s}},oi=class{constructor(){this.ve=0,this.Ce=sl(),this.Fe=wt.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=K(),n=K(),i=K();return this.Ce.forEach((s,a)=>{switch(a){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:i=i.add(s);break;default:M(38017,{changeType:a})}}),new rr(this.Fe,this.Me,e,n,i)}ke(){this.xe=!1,this.Ce=sl()}qe(e,n){this.xe=!0,this.Ce=this.Ce.insert(e,n)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,J(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}},vo=class{constructor(e){this.We=e,this.Ge=new Map,this.ze=ie(),this.je=jr(),this.Je=jr(),this.He=new it($)}Ye(e){for(let n of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(n,e.be):this.Xe(n,e.key,e.be);for(let n of e.removedTargetIds)this.Xe(n,e.key,e.be)}et(e){this.forEachTarget(e,n=>{let i=this.tt(n);switch(e.state){case 0:this.nt(n)&&i.Be(e.resumeToken);break;case 1:i.Ue(),i.Oe||i.ke(),i.Be(e.resumeToken);break;case 2:i.Ue(),i.Oe||this.removeTarget(n);break;case 3:this.nt(n)&&(i.Ke(),i.Be(e.resumeToken));break;case 4:this.nt(n)&&(this.rt(n),i.Be(e.resumeToken));break;default:M(56790,{state:e.state})}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Ge.forEach((i,s)=>{this.nt(s)&&n(s)})}it(e){let n=e.targetId,i=e.De.count,s=this.st(n);if(s){let a=s.target;if(lo(a))if(i===0){let c=new B(a.path);this.Xe(n,c,Pt.newNoDocument(c,j.min()))}else J(i===1,20013,{expectedCount:i});else{let c=this.ot(n);if(c!==i){let l=this._t(e),d=l?this.ut(l,e,c):1;if(d!==0){this.rt(n);let f=d===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(n,f)}nl?.ct(function(g,w,I,C,x){var k,V,z,U,G,et;let At={localCacheCount:g,existenceFilterCount:w.count,databaseId:I.database,projectId:I.projectId},Z=w.unchangedNames;return Z&&(At.bloomFilter={applied:x===0,hashCount:(k=Z?.hashCount)!==null&&k!==void 0?k:0,bitmapLength:(U=(z=(V=Z?.bits)===null||V===void 0?void 0:V.bitmap)===null||z===void 0?void 0:z.length)!==null&&U!==void 0?U:0,padding:(et=(G=Z?.bits)===null||G===void 0?void 0:G.padding)!==null&&et!==void 0?et:0,mightContain:b=>{var p;return(p=C?.mightContain(b))!==null&&p!==void 0&&p}}),At}(c,e.De,this.We.lt(),l,d))}}}}_t(e){let n=e.De.unchangedNames;if(!n||!n.bits)return null;let{bits:{bitmap:i="",padding:s=0},hashCount:a=0}=n,c,l;try{c=ne(i).toUint8Array()}catch(d){if(d instanceof Yr)return pe("Decoding the base64 bloom filter in existence filter failed ("+d.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw d}try{l=new wo(c,s,a)}catch(d){return pe(d instanceof Ce?"BloomFilter error: ":"Applying bloom filter failed: ",d),null}return l.fe===0?null:l}ut(e,n,i){return n.De.count===i-this.ht(e,n.targetId)?0:2}ht(e,n){let i=this.We.getRemoteKeysForTarget(n),s=0;return i.forEach(a=>{let c=this.We.lt(),l=`projects/${c.projectId}/databases/${c.database}/documents/${a.path.canonicalString()}`;e.mightContain(l)||(this.Xe(n,a,null),s++)}),s}Pt(e){let n=new Map;this.Ge.forEach((a,c)=>{let l=this.st(c);if(l){if(a.current&&lo(l.target)){let d=new B(l.target.path);this.Tt(d).has(c)||this.It(c,d)||this.Xe(c,d,Pt.newNoDocument(d,e))}a.Ne&&(n.set(c,a.Le()),a.ke())}});let i=K();this.Je.forEach((a,c)=>{let l=!0;c.forEachWhile(d=>{let f=this.st(d);return!f||f.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(i=i.add(a))}),this.ze.forEach((a,c)=>c.setReadTime(e));let s=new ri(e,n,this.He,this.ze,i);return this.ze=ie(),this.je=jr(),this.Je=jr(),this.He=new it($),s}Ze(e,n){if(!this.nt(e))return;let i=this.It(e,n.key)?2:0;this.tt(e).qe(n.key,i),this.ze=this.ze.insert(n.key,n),this.je=this.je.insert(n.key,this.Tt(n.key).add(e)),this.Je=this.Je.insert(n.key,this.dt(n.key).add(e))}Xe(e,n,i){if(!this.nt(e))return;let s=this.tt(e);this.It(e,n)?s.qe(n,1):s.Qe(n),this.Je=this.Je.insert(n,this.dt(n).delete(e)),this.Je=this.Je.insert(n,this.dt(n).add(e)),i&&(this.ze=this.ze.insert(n,i))}removeTarget(e){this.Ge.delete(e)}ot(e){let n=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let n=this.Ge.get(e);return n||(n=new oi,this.Ge.set(e,n)),n}dt(e){let n=this.Je.get(e);return n||(n=new ht($),this.Je=this.Je.insert(e,n)),n}Tt(e){let n=this.je.get(e);return n||(n=new ht($),this.je=this.je.insert(e,n)),n}nt(e){let n=this.st(e)!==null;return n||O("WatchChangeAggregator","Detected inactive target",e),n}st(e){let n=this.Ge.get(e);return n&&n.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new oi),this.We.getRemoteKeysForTarget(e).forEach(n=>{this.Xe(e,n,null)})}It(e,n){return this.We.getRemoteKeysForTarget(e).has(n)}};function jr(){return new it(B.comparator)}function sl(){return new it(B.comparator)}var tp={asc:"ASCENDING",desc:"DESCENDING"},ep={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},np={and:"AND",or:"OR"},Io=class{constructor(e,n){this.databaseId=e,this.useProto3Json=n}};function Eo(r,e){return r.useProto3Json||Pi(e)?e:{value:e}}function ai(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function mh(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function rp(r,e){return ai(r,e.toTimestamp())}function Mt(r){return J(!!r,49232),j.fromTimestamp(function(n){let i=ee(n);return new X(i.seconds,i.nanos)}(r))}function Oa(r,e){return To(r,e).canonicalString()}function To(r,e){let n=function(s){return new st(["projects",s.projectId,"databases",s.database])}(r).child("documents");return e===void 0?n:n.child(e)}function ph(r){let e=st.fromString(r);return J(vh(e),10190,{key:e.toString()}),e}function bo(r,e){return Oa(r.databaseId,e.path)}function Bs(r,e){let n=ph(e);if(n.get(1)!==r.databaseId.projectId)throw new F(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+r.databaseId.projectId);if(n.get(3)!==r.databaseId.database)throw new F(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+r.databaseId.database);return new B(yh(n))}function gh(r,e){return Oa(r.databaseId,e)}function ip(r){let e=ph(r);return e.length===4?st.emptyPath():yh(e)}function Ao(r){return new st(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function yh(r){return J(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function ol(r,e,n){return{name:bo(r,e),fields:n.value.mapValue.fields}}function sp(r,e){let n;if("targetChange"in e){e.targetChange;let i=function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:M(39313,{state:f})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],a=function(f,g){return f.useProto3Json?(J(g===void 0||typeof g=="string",58123),wt.fromBase64String(g||"")):(J(g===void 0||g instanceof Buffer||g instanceof Uint8Array,16193),wt.fromUint8Array(g||new Uint8Array))}(r,e.targetChange.resumeToken),c=e.targetChange.cause,l=c&&function(f){let g=f.code===void 0?P.UNKNOWN:fh(f.code);return new F(g,f.message||"")}(c);n=new si(i,s,a,l||null)}else if("documentChange"in e){e.documentChange;let i=e.documentChange;i.document,i.document.name,i.document.updateTime;let s=Bs(r,i.document.name),a=Mt(i.document.updateTime),c=i.document.createTime?Mt(i.document.createTime):j.min(),l=new Tt({mapValue:{fields:i.document.fields}}),d=Pt.newFoundDocument(s,a,c,l),f=i.targetIds||[],g=i.removedTargetIds||[];n=new Xe(f,g,d.key,d)}else if("documentDelete"in e){e.documentDelete;let i=e.documentDelete;i.document;let s=Bs(r,i.document),a=i.readTime?Mt(i.readTime):j.min(),c=Pt.newNoDocument(s,a),l=i.removedTargetIds||[];n=new Xe([],l,c.key,c)}else if("documentRemove"in e){e.documentRemove;let i=e.documentRemove;i.document;let s=Bs(r,i.document),a=i.removedTargetIds||[];n=new Xe([],a,s,null)}else{if(!("filter"in e))return M(11601,{At:e});{e.filter;let i=e.filter;i.targetId;let{count:s=0,unchangedNames:a}=i,c=new _o(s,a),l=i.targetId;n=new ii(l,c)}}return n}function op(r,e){let n;if(e instanceof Oe)n={update:ol(r,e.key,e.value)};else if(e instanceof ni)n={delete:bo(r,e.key)};else if(e instanceof Ut)n={update:ol(r,e.key,e.data),updateMask:pp(e.fieldMask)};else{if(!(e instanceof mo))return M(16599,{Rt:e.type});n={verify:bo(r,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(i=>function(a,c){let l=c.transform;if(l instanceof ln)return{fieldPath:c.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof ke)return{fieldPath:c.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Ne)return{fieldPath:c.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof hn)return{fieldPath:c.field.canonicalString(),increment:l.Ee};throw M(20930,{transform:c.transform})}(0,i))),e.precondition.isNone||(n.currentDocument=function(s,a){return a.updateTime!==void 0?{updateTime:rp(s,a.updateTime)}:a.exists!==void 0?{exists:a.exists}:M(27497)}(r,e.precondition)),n}function ap(r,e){return r&&r.length>0?(J(e!==void 0,14353),r.map(n=>function(s,a){let c=s.updateTime?Mt(s.updateTime):Mt(a);return c.isEqual(j.min())&&(c=Mt(a)),new fo(c,s.transformResults||[])}(n,e))):[]}function cp(r,e){return{documents:[gh(r,e.path)]}}function up(r,e){let n={structuredQuery:{}},i=e.path,s;e.collectionGroup!==null?(s=i,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=i.popLast(),n.structuredQuery.from=[{collectionId:i.lastSegment()}]),n.parent=gh(r,s);let a=function(f){if(f.length!==0)return wh(zt.create(f,"and"))}(e.filters);a&&(n.structuredQuery.where=a);let c=function(f){if(f.length!==0)return f.map(g=>function(I){return{field:He(I.field),direction:dp(I.dir)}}(g))}(e.orderBy);c&&(n.structuredQuery.orderBy=c);let l=Eo(r,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(f){return{before:f.inclusive,values:f.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(f){return{before:!f.inclusive,values:f.position}}(e.endAt)),{Vt:n,parent:s}}function lp(r){let e=ip(r.parent),n=r.structuredQuery,i=n.from?n.from.length:0,s=null;if(i>0){J(i===1,65062);let g=n.from[0];g.allDescendants?s=g.collectionId:e=e.child(g.collectionId)}let a=[];n.where&&(a=function(w){let I=_h(w);return I instanceof zt&&Xl(I)?I.getFilters():[I]}(n.where));let c=[];n.orderBy&&(c=function(w){return w.map(I=>function(x){return new an(Qe(x.field),function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(x.direction))}(I))}(n.orderBy));let l=null;n.limit&&(l=function(w){let I;return I=typeof w=="object"?w.value:w,Pi(I)?null:I}(n.limit));let d=null;n.startAt&&(d=function(w){let I=!!w.before,C=w.values||[];return new on(C,I)}(n.startAt));let f=null;return n.endAt&&(f=function(w){let I=!w.before,C=w.values||[];return new on(C,I)}(n.endAt)),Lm(e,s,c,a,l,"F",d,f)}function hp(r,e){let n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:s})}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function _h(r){return r.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":let i=Qe(n.unaryFilter.field);return ut.create(i,"==",{doubleValue:NaN});case"IS_NULL":let s=Qe(n.unaryFilter.field);return ut.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let a=Qe(n.unaryFilter.field);return ut.create(a,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let c=Qe(n.unaryFilter.field);return ut.create(c,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}}(r):r.fieldFilter!==void 0?function(n){return ut.create(Qe(n.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}}(n.fieldFilter.op),n.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(n){return zt.create(n.compositeFilter.filters.map(i=>_h(i)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return M(1026)}}(n.compositeFilter.op))}(r):M(30097,{filter:r})}function dp(r){return tp[r]}function fp(r){return ep[r]}function mp(r){return np[r]}function He(r){return{fieldPath:r.canonicalString()}}function Qe(r){return bt.fromServerFormat(r.fieldPath)}function wh(r){return r instanceof ut?function(n){if(n.op==="=="){if(Wu(n.value))return{unaryFilter:{field:He(n.field),op:"IS_NAN"}};if(Ku(n.value))return{unaryFilter:{field:He(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(Wu(n.value))return{unaryFilter:{field:He(n.field),op:"IS_NOT_NAN"}};if(Ku(n.value))return{unaryFilter:{field:He(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:He(n.field),op:fp(n.op),value:n.value}}}(r):r instanceof zt?function(n){let i=n.getFilters().map(s=>wh(s));return i.length===1?i[0]:{compositeFilter:{op:mp(n.op),filters:i}}}(r):M(54877,{filter:r})}function pp(r){let e=[];return r.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function vh(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}var ir=class r{constructor(e,n,i,s,a=j.min(),c=j.min(),l=wt.EMPTY_BYTE_STRING,d=null){this.target=e,this.targetId=n,this.purpose=i,this.sequenceNumber=s,this.snapshotVersion=a,this.lastLimboFreeSnapshotVersion=c,this.resumeToken=l,this.expectedCount=d}withSequenceNumber(e){return new r(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new r(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new r(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new r(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}};var So=class{constructor(e){this.gt=e}};function gp(r){let e=lp({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?ho(e,e.limit,"L"):e}var ci=class{constructor(){}bt(e,n){this.Dt(e,n),n.vt()}Dt(e,n){if("nullValue"in e)this.Ct(n,5);else if("booleanValue"in e)this.Ct(n,10),n.Ft(e.booleanValue?1:0);else if("integerValue"in e)this.Ct(n,15),n.Ft(nt(e.integerValue));else if("doubleValue"in e){let i=nt(e.doubleValue);isNaN(i)?this.Ct(n,13):(this.Ct(n,15),tr(i)?n.Ft(0):n.Ft(i))}else if("timestampValue"in e){let i=e.timestampValue;this.Ct(n,20),typeof i=="string"&&(i=ee(i)),n.Mt(`${i.seconds||""}`),n.Ft(i.nanos||0)}else if("stringValue"in e)this.xt(e.stringValue,n),this.Ot(n);else if("bytesValue"in e)this.Ct(n,30),n.Nt(ne(e.bytesValue)),this.Ot(n);else if("referenceValue"in e)this.Bt(e.referenceValue,n);else if("geoPointValue"in e){let i=e.geoPointValue;this.Ct(n,45),n.Ft(i.latitude||0),n.Ft(i.longitude||0)}else"mapValue"in e?Hl(e)?this.Ct(n,Number.MAX_SAFE_INTEGER):Wl(e)?this.Lt(e.mapValue,n):(this.kt(e.mapValue,n),this.Ot(n)):"arrayValue"in e?(this.qt(e.arrayValue,n),this.Ot(n)):M(19022,{Qt:e})}xt(e,n){this.Ct(n,25),this.$t(e,n)}$t(e,n){n.Mt(e)}kt(e,n){let i=e.fields||{};this.Ct(n,55);for(let s of Object.keys(i))this.xt(s,n),this.Dt(i[s],n)}Lt(e,n){var i,s;let a=e.fields||{};this.Ct(n,53);let c=nn,l=((s=(i=a[c].arrayValue)===null||i===void 0?void 0:i.values)===null||s===void 0?void 0:s.length)||0;this.Ct(n,15),n.Ft(nt(l)),this.xt(c,n),this.Dt(a[c],n)}qt(e,n){let i=e.values||[];this.Ct(n,50);for(let s of i)this.Dt(s,n)}Bt(e,n){this.Ct(n,37),B.fromName(e).path.forEach(i=>{this.Ct(n,60),this.$t(i,n)})}Ct(e,n){e.Ft(n)}Ot(e){e.Ft(2)}};ci.Ut=new ci;var Ro=class{constructor(){this.Dn=new Co}addToCollectionParentIndex(e,n){return this.Dn.add(n),D.resolve()}getCollectionParents(e,n){return D.resolve(this.Dn.getEntries(n))}addFieldIndex(e,n){return D.resolve()}deleteFieldIndex(e,n){return D.resolve()}deleteAllFieldIndexes(e){return D.resolve()}createTargetIndexes(e,n){return D.resolve()}getDocumentsMatchingTarget(e,n){return D.resolve(null)}getIndexType(e,n){return D.resolve(0)}getFieldIndexes(e,n){return D.resolve([])}getNextCollectionGroupToUpdate(e){return D.resolve(null)}getMinOffset(e,n){return D.resolve(Ve.min())}getMinOffsetFromCollectionGroup(e,n){return D.resolve(Ve.min())}updateCollectionGroup(e,n,i){return D.resolve()}updateIndexEntries(e,n){return D.resolve()}},Co=class{constructor(){this.index={}}add(e){let n=e.lastSegment(),i=e.popLast(),s=this.index[n]||new ht(st.comparator),a=!s.has(i);return this.index[n]=s.add(i),a}has(e){let n=e.lastSegment(),i=e.popLast(),s=this.index[n];return s&&s.has(i)}getEntries(e){return(this.index[e]||new ht(st.comparator)).toArray()}};var my=new Uint8Array(0);var al={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Ih=41943040,St=class r{static withCacheSize(e){return new r(e,r.DEFAULT_COLLECTION_PERCENTILE,r.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,i){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=i}};St.DEFAULT_COLLECTION_PERCENTILE=10,St.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,St.DEFAULT=new St(Ih,St.DEFAULT_COLLECTION_PERCENTILE,St.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),St.DISABLED=new St(-1,0,0);var sr=class r{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new r(0)}static ur(){return new r(-1)}};var cl="LruGarbageCollector",yp=1048576;function ul([r,e],[n,i]){let s=$(r,n);return s===0?$(e,i):s}var Po=class{constructor(e){this.Tr=e,this.buffer=new ht(ul),this.Ir=0}dr(){return++this.Ir}Er(e){let n=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(n);else{let i=this.buffer.last();ul(n,i)<0&&(this.buffer=this.buffer.delete(i).add(n))}}get maxValue(){return this.buffer.last()[0]}},Do=class{constructor(e,n,i){this.garbageCollector=e,this.asyncQueue=n,this.localStore=i,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){O(cl,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){_n(n)?O(cl,"Ignoring IndexedDB error during garbage collection: ",n):await yn(n)}await this.Rr(3e5)})}},xo=class{constructor(e,n){this.Vr=e,this.params=n}calculateTargetCount(e,n){return this.Vr.mr(e).next(i=>Math.floor(n/100*i))}nthSequenceNumber(e,n){if(n===0)return D.resolve(en.ue);let i=new Po(n);return this.Vr.forEachTarget(e,s=>i.Er(s.sequenceNumber)).next(()=>this.Vr.gr(e,s=>i.Er(s))).next(()=>i.maxValue)}removeTargets(e,n,i){return this.Vr.removeTargets(e,n,i)}removeOrphanedDocuments(e,n){return this.Vr.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(O("LruGarbageCollector","Garbage collection skipped; disabled"),D.resolve(al)):this.getCacheSize(e).next(i=>i<this.params.cacheSizeCollectionThreshold?(O("LruGarbageCollector",`Garbage collection skipped; Cache size ${i} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),al):this.pr(e,n))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,n){let i,s,a,c,l,d,f,g=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(w=>(w>this.params.maximumSequenceNumbersToCollect?(O("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${w}`),s=this.params.maximumSequenceNumbersToCollect):s=w,c=Date.now(),this.nthSequenceNumber(e,s))).next(w=>(i=w,l=Date.now(),this.removeTargets(e,i,n))).next(w=>(a=w,d=Date.now(),this.removeOrphanedDocuments(e,i))).next(w=>(f=Date.now(),Ke()<=W.DEBUG&&O("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${c-g}ms
	Determined least recently used ${s} in `+(l-c)+`ms
	Removed ${a} targets in `+(d-l)+`ms
	Removed ${w} documents in `+(f-d)+`ms
Total Duration: ${f-g}ms`),D.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:a,documentsRemoved:w})))}};function _p(r,e){return new xo(r,e)}var Vo=class{constructor(){this.changes=new re(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,Pt.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();let i=this.changes.get(n);return i!==void 0?D.resolve(i):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};var ko=class{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}};var No=class{constructor(e,n,i,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=i,this.indexManager=s}getDocument(e,n){let i=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(i=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(i!==null&&Xn(i.mutation,s,Rt.empty(),X.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(i=>this.getLocalViewOfDocuments(e,i,K()).next(()=>i))}getLocalViewOfDocuments(e,n,i=K()){let s=Re();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,i).next(a=>{let c=Wn();return a.forEach((l,d)=>{c=c.insert(l,d.overlayedDocument)}),c}))}getOverlayedDocuments(e,n){let i=Re();return this.populateOverlays(e,i,n).next(()=>this.computeViews(e,n,i,K()))}populateOverlays(e,n,i){let s=[];return i.forEach(a=>{n.has(a)||s.push(a)}),this.documentOverlayCache.getOverlays(e,s).next(a=>{a.forEach((c,l)=>{n.set(c,l)})})}computeViews(e,n,i,s){let a=ie(),c=Jn(),l=function(){return Jn()}();return n.forEach((d,f)=>{let g=i.get(f.key);s.has(f.key)&&(g===void 0||g.mutation instanceof Ut)?a=a.insert(f.key,f):g!==void 0?(c.set(f.key,g.mutation.getFieldMask()),Xn(g.mutation,f,g.mutation.getFieldMask(),X.now())):c.set(f.key,Rt.empty())}),this.recalculateAndSaveOverlays(e,a).next(d=>(d.forEach((f,g)=>c.set(f,g)),n.forEach((f,g)=>{var w;return l.set(f,new ko(g,(w=c.get(f))!==null&&w!==void 0?w:null))}),l))}recalculateAndSaveOverlays(e,n){let i=Jn(),s=new it((c,l)=>c-l),a=K();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(c=>{for(let l of c)l.keys().forEach(d=>{let f=n.get(d);if(f===null)return;let g=i.get(d)||Rt.empty();g=l.applyToLocalView(f,g),i.set(d,g);let w=(s.get(l.batchId)||K()).add(d);s=s.insert(l.batchId,w)})}).next(()=>{let c=[],l=s.getReverseIterator();for(;l.hasNext();){let d=l.getNext(),f=d.key,g=d.value,w=sh();g.forEach(I=>{if(!a.has(I)){let C=hh(n.get(I),i.get(I));C!==null&&w.set(I,C),a=a.add(I)}}),c.push(this.documentOverlayCache.saveOverlays(e,f,w))}return D.waitFor(c)}).next(()=>i)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(i=>this.recalculateAndSaveOverlays(e,i))}getDocumentsMatchingQuery(e,n,i,s){return function(c){return B.isDocumentKey(c.path)&&c.collectionGroup===null&&c.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):Fm(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,i,s):this.getDocumentsMatchingCollectionQuery(e,n,i,s)}getNextDocuments(e,n,i,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,i,s).next(a=>{let c=s-a.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,i.largestBatchId,s-a.size):D.resolve(Re()),l=Zn,d=a;return c.next(f=>D.forEach(f,(g,w)=>(l<w.largestBatchId&&(l=w.largestBatchId),a.get(g)?D.resolve():this.remoteDocumentCache.getEntry(e,g).next(I=>{d=d.insert(g,I)}))).next(()=>this.populateOverlays(e,f,a)).next(()=>this.computeViews(e,d,f,K())).next(g=>({batchId:l,changes:ih(g)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new B(n)).next(i=>{let s=Wn();return i.isFoundDocument()&&(s=s.insert(i.key,i)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,i,s){let a=n.collectionGroup,c=Wn();return this.indexManager.getCollectionParents(e,a).next(l=>D.forEach(l,d=>{let f=function(w,I){return new cn(I,null,w.explicitOrderBy.slice(),w.filters.slice(),w.limit,w.limitType,w.startAt,w.endAt)}(n,d.child(a));return this.getDocumentsMatchingCollectionQuery(e,f,i,s).next(g=>{g.forEach((w,I)=>{c=c.insert(w,I)})})}).next(()=>c))}getDocumentsMatchingCollectionQuery(e,n,i,s){let a;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,i.largestBatchId).next(c=>(a=c,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,i,a,s))).next(c=>{a.forEach((d,f)=>{let g=f.getKey();c.get(g)===null&&(c=c.insert(g,Pt.newInvalidDocument(g)))});let l=Wn();return c.forEach((d,f)=>{let g=a.get(d);g!==void 0&&Xn(g.mutation,f,Rt.empty(),X.now()),ki(n,f)&&(l=l.insert(d,f))}),l})}};var Oo=class{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,n){return D.resolve(this.Br.get(n))}saveBundleMetadata(e,n){return this.Br.set(n.id,function(s){return{id:s.id,version:s.version,createTime:Mt(s.createTime)}}(n)),D.resolve()}getNamedQuery(e,n){return D.resolve(this.Lr.get(n))}saveNamedQuery(e,n){return this.Lr.set(n.name,function(s){return{name:s.name,query:gp(s.bundledQuery),readTime:Mt(s.readTime)}}(n)),D.resolve()}};var Lo=class{constructor(){this.overlays=new it(B.comparator),this.kr=new Map}getOverlay(e,n){return D.resolve(this.overlays.get(n))}getOverlays(e,n){let i=Re();return D.forEach(n,s=>this.getOverlay(e,s).next(a=>{a!==null&&i.set(s,a)})).next(()=>i)}saveOverlays(e,n,i){return i.forEach((s,a)=>{this.wt(e,n,a)}),D.resolve()}removeOverlaysForBatchId(e,n,i){let s=this.kr.get(i);return s!==void 0&&(s.forEach(a=>this.overlays=this.overlays.remove(a)),this.kr.delete(i)),D.resolve()}getOverlaysForCollection(e,n,i){let s=Re(),a=n.length+1,c=new B(n.child("")),l=this.overlays.getIteratorFrom(c);for(;l.hasNext();){let d=l.getNext().value,f=d.getKey();if(!n.isPrefixOf(f.path))break;f.path.length===a&&d.largestBatchId>i&&s.set(d.getKey(),d)}return D.resolve(s)}getOverlaysForCollectionGroup(e,n,i,s){let a=new it((f,g)=>f-g),c=this.overlays.getIterator();for(;c.hasNext();){let f=c.getNext().value;if(f.getKey().getCollectionGroup()===n&&f.largestBatchId>i){let g=a.get(f.largestBatchId);g===null&&(g=Re(),a=a.insert(f.largestBatchId,g)),g.set(f.getKey(),f)}}let l=Re(),d=a.getIterator();for(;d.hasNext()&&(d.getNext().value.forEach((f,g)=>l.set(f,g)),!(l.size()>=s)););return D.resolve(l)}wt(e,n,i){let s=this.overlays.get(i.key);if(s!==null){let c=this.kr.get(s.largestBatchId).delete(i.key);this.kr.set(s.largestBatchId,c)}this.overlays=this.overlays.insert(i.key,new yo(n,i));let a=this.kr.get(n);a===void 0&&(a=K(),this.kr.set(n,a)),this.kr.set(n,a.add(i.key))}};var Fo=class{constructor(){this.sessionToken=wt.EMPTY_BYTE_STRING}getSessionToken(e){return D.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,D.resolve()}};var or=class{constructor(){this.qr=new ht(at.Qr),this.$r=new ht(at.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,n){let i=new at(e,n);this.qr=this.qr.add(i),this.$r=this.$r.add(i)}Kr(e,n){e.forEach(i=>this.addReference(i,n))}removeReference(e,n){this.Wr(new at(e,n))}Gr(e,n){e.forEach(i=>this.removeReference(i,n))}zr(e){let n=new B(new st([])),i=new at(n,e),s=new at(n,e+1),a=[];return this.$r.forEachInRange([i,s],c=>{this.Wr(c),a.push(c.key)}),a}jr(){this.qr.forEach(e=>this.Wr(e))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){let n=new B(new st([])),i=new at(n,e),s=new at(n,e+1),a=K();return this.$r.forEachInRange([i,s],c=>{a=a.add(c.key)}),a}containsKey(e){let n=new at(e,0),i=this.qr.firstAfterOrEqual(n);return i!==null&&e.isEqual(i.key)}},at=class{constructor(e,n){this.key=e,this.Hr=n}static Qr(e,n){return B.comparator(e.key,n.key)||$(e.Hr,n.Hr)}static Ur(e,n){return $(e.Hr,n.Hr)||B.comparator(e.key,n.key)}};var Mo=class{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.er=1,this.Yr=new ht(at.Qr)}checkEmpty(e){return D.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,i,s){let a=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let c=new po(a,n,i,s);this.mutationQueue.push(c);for(let l of s)this.Yr=this.Yr.add(new at(l.key,a)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return D.resolve(c)}lookupMutationBatch(e,n){return D.resolve(this.Zr(n))}getNextMutationBatchAfterBatchId(e,n){let i=n+1,s=this.Xr(i),a=s<0?0:s;return D.resolve(this.mutationQueue.length>a?this.mutationQueue[a]:null)}getHighestUnacknowledgedBatchId(){return D.resolve(this.mutationQueue.length===0?Ra:this.er-1)}getAllMutationBatches(e){return D.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){let i=new at(n,0),s=new at(n,Number.POSITIVE_INFINITY),a=[];return this.Yr.forEachInRange([i,s],c=>{let l=this.Zr(c.Hr);a.push(l)}),D.resolve(a)}getAllMutationBatchesAffectingDocumentKeys(e,n){let i=new ht($);return n.forEach(s=>{let a=new at(s,0),c=new at(s,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([a,c],l=>{i=i.add(l.Hr)})}),D.resolve(this.ei(i))}getAllMutationBatchesAffectingQuery(e,n){let i=n.path,s=i.length+1,a=i;B.isDocumentKey(a)||(a=a.child(""));let c=new at(new B(a),0),l=new ht($);return this.Yr.forEachWhile(d=>{let f=d.key.path;return!!i.isPrefixOf(f)&&(f.length===s&&(l=l.add(d.Hr)),!0)},c),D.resolve(this.ei(l))}ei(e){let n=[];return e.forEach(i=>{let s=this.Zr(i);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){J(this.ti(n.batchId,"removed")===0,55003),this.mutationQueue.shift();let i=this.Yr;return D.forEach(n.mutations,s=>{let a=new at(s.key,n.batchId);return i=i.delete(a),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Yr=i})}rr(e){}containsKey(e,n){let i=new at(n,0),s=this.Yr.firstAfterOrEqual(i);return D.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,D.resolve()}ti(e,n){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){let n=this.Xr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}};var Bo=class{constructor(e){this.ni=e,this.docs=function(){return new it(B.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){let i=n.key,s=this.docs.get(i),a=s?s.size:0,c=this.ni(n);return this.docs=this.docs.insert(i,{document:n.mutableCopy(),size:c}),this.size+=c-a,this.indexManager.addToCollectionParentIndex(e,i.path.popLast())}removeEntry(e){let n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){let i=this.docs.get(n);return D.resolve(i?i.document.mutableCopy():Pt.newInvalidDocument(n))}getEntries(e,n){let i=ie();return n.forEach(s=>{let a=this.docs.get(s);i=i.insert(s,a?a.document.mutableCopy():Pt.newInvalidDocument(s))}),D.resolve(i)}getDocumentsMatchingQuery(e,n,i,s){let a=ie(),c=n.path,l=new B(c.child("__id-9223372036854775808__")),d=this.docs.getIteratorFrom(l);for(;d.hasNext();){let{key:f,value:{document:g}}=d.getNext();if(!c.isPrefixOf(f.path))break;f.path.length>c.length+1||ym(gm(g),i)<=0||(s.has(g.key)||ki(n,g))&&(a=a.insert(g.key,g.mutableCopy()))}return D.resolve(a)}getAllFromCollectionGroup(e,n,i,s){M(9500)}ri(e,n){return D.forEach(this.docs,i=>n(i))}newChangeBuffer(e){return new zo(this)}getSize(e){return D.resolve(this.size)}},zo=class extends Vo{constructor(e){super(),this.Or=e}applyChanges(e){let n=[];return this.changes.forEach((i,s)=>{s.isValidDocument()?n.push(this.Or.addEntry(e,s)):this.Or.removeEntry(i)}),D.waitFor(n)}getFromCache(e,n){return this.Or.getEntry(e,n)}getAllFromCache(e,n){return this.Or.getEntries(e,n)}};var Uo=class{constructor(e){this.persistence=e,this.ii=new re(n=>Va(n),ka),this.lastRemoteSnapshotVersion=j.min(),this.highestTargetId=0,this.si=0,this.oi=new or,this.targetCount=0,this._i=sr.ar()}forEachTarget(e,n){return this.ii.forEach((i,s)=>n(s)),D.resolve()}getLastRemoteSnapshotVersion(e){return D.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return D.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),D.resolve(this.highestTargetId)}setTargetsMetadata(e,n,i){return i&&(this.lastRemoteSnapshotVersion=i),n>this.si&&(this.si=n),D.resolve()}hr(e){this.ii.set(e.target,e);let n=e.targetId;n>this.highestTargetId&&(this._i=new sr(n),this.highestTargetId=n),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,n){return this.hr(n),this.targetCount+=1,D.resolve()}updateTargetData(e,n){return this.hr(n),D.resolve()}removeTargetData(e,n){return this.ii.delete(n.target),this.oi.zr(n.targetId),this.targetCount-=1,D.resolve()}removeTargets(e,n,i){let s=0,a=[];return this.ii.forEach((c,l)=>{l.sequenceNumber<=n&&i.get(l.targetId)===null&&(this.ii.delete(c),a.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),D.waitFor(a).next(()=>s)}getTargetCount(e){return D.resolve(this.targetCount)}getTargetData(e,n){let i=this.ii.get(n)||null;return D.resolve(i)}addMatchingKeys(e,n,i){return this.oi.Kr(n,i),D.resolve()}removeMatchingKeys(e,n,i){this.oi.Gr(n,i);let s=this.persistence.referenceDelegate,a=[];return s&&n.forEach(c=>{a.push(s.markPotentiallyOrphaned(e,c))}),D.waitFor(a)}removeMatchingKeysForTargetId(e,n){return this.oi.zr(n),D.resolve()}getMatchingKeysForTargetId(e,n){let i=this.oi.Jr(n);return D.resolve(i)}containsKey(e,n){return D.resolve(this.oi.containsKey(n))}};var ui=class{constructor(e,n){this.ai={},this.overlays={},this.ui=new en(0),this.ci=!1,this.ci=!0,this.li=new Fo,this.referenceDelegate=e(this),this.hi=new Uo(this),this.indexManager=new Ro,this.remoteDocumentCache=function(s){return new Bo(s)}(i=>this.referenceDelegate.Pi(i)),this.serializer=new So(n),this.Ti=new Oo(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new Lo,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let i=this.ai[e.toKey()];return i||(i=new Mo(n,this.referenceDelegate),this.ai[e.toKey()]=i),i}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,n,i){O("MemoryPersistence","Starting transaction:",e);let s=new qo(this.ui.next());return this.referenceDelegate.Ii(),i(s).next(a=>this.referenceDelegate.di(s).next(()=>a)).toPromise().then(a=>(s.raiseOnCommittedEvent(),a))}Ei(e,n){return D.or(Object.values(this.ai).map(i=>()=>i.containsKey(e,n)))}},qo=class extends Xs{constructor(e){super(),this.currentSequenceNumber=e}},jo=class r{constructor(e){this.persistence=e,this.Ai=new or,this.Ri=null}static Vi(e){return new r(e)}get mi(){if(this.Ri)return this.Ri;throw M(60996)}addReference(e,n,i){return this.Ai.addReference(i,n),this.mi.delete(i.toString()),D.resolve()}removeReference(e,n,i){return this.Ai.removeReference(i,n),this.mi.add(i.toString()),D.resolve()}markPotentiallyOrphaned(e,n){return this.mi.add(n.toString()),D.resolve()}removeTarget(e,n){this.Ai.zr(n.targetId).forEach(s=>this.mi.add(s.toString()));let i=this.persistence.getTargetCache();return i.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(a=>this.mi.add(a.toString()))}).next(()=>i.removeTargetData(e,n))}Ii(){this.Ri=new Set}di(e){let n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return D.forEach(this.mi,i=>{let s=B.fromPath(i);return this.fi(e,s).next(a=>{a||n.removeEntry(s,j.min())})}).next(()=>(this.Ri=null,n.apply(e)))}updateLimboDocument(e,n){return this.fi(e,n).next(i=>{i?this.mi.delete(n.toString()):this.mi.add(n.toString())})}Pi(e){return 0}fi(e,n){return D.or([()=>D.resolve(this.Ai.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ei(e,n)])}},li=class r{constructor(e,n){this.persistence=e,this.gi=new re(i=>Im(i.path),(i,s)=>i.isEqual(s)),this.garbageCollector=_p(this,n)}static Vi(e,n){return new r(e,n)}Ii(){}di(e){return D.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}mr(e){let n=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next(i=>n.next(s=>i+s))}yr(e){let n=0;return this.gr(e,i=>{n++}).next(()=>n)}gr(e,n){return D.forEach(this.gi,(i,s)=>this.Sr(e,i,s).next(a=>a?D.resolve():n(s)))}removeTargets(e,n,i){return this.persistence.getTargetCache().removeTargets(e,n,i)}removeOrphanedDocuments(e,n){let i=0,s=this.persistence.getRemoteDocumentCache(),a=s.newChangeBuffer();return s.ri(e,c=>this.Sr(e,c,n).next(l=>{l||(i++,a.removeEntry(c,j.min()))})).next(()=>a.apply(e)).next(()=>i)}markPotentiallyOrphaned(e,n){return this.gi.set(n,e.currentSequenceNumber),D.resolve()}removeTarget(e,n){let i=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,i)}addReference(e,n,i){return this.gi.set(i,e.currentSequenceNumber),D.resolve()}removeReference(e,n,i){return this.gi.set(i,e.currentSequenceNumber),D.resolve()}updateLimboDocument(e,n){return this.gi.set(n,e.currentSequenceNumber),D.resolve()}Pi(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=Gr(e.data.value)),n}Sr(e,n,i){return D.or([()=>this.persistence.Ei(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{let s=this.gi.get(n);return D.resolve(s!==void 0&&s>i)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}};var $o=class r{constructor(e,n,i,s){this.targetId=e,this.fromCache=n,this.Is=i,this.ds=s}static Es(e,n){let i=K(),s=K();for(let a of n.docChanges)switch(a.type){case 0:i=i.add(a.doc.key);break;case 1:s=s.add(a.doc.key)}return new r(e,n.fromCache,i,s)}};var Go=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}};var Ko=class{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return fu()?8:wm(du())>0?6:4}()}initialize(e,n){this.gs=e,this.indexManager=n,this.As=!0}getDocumentsMatchingQuery(e,n,i,s){let a={result:null};return this.ps(e,n).next(c=>{a.result=c}).next(()=>{if(!a.result)return this.ys(e,n,s,i).next(c=>{a.result=c})}).next(()=>{if(a.result)return;let c=new Go;return this.ws(e,n,c).next(l=>{if(a.result=l,this.Rs)return this.Ss(e,n,c,l.size)})}).next(()=>a.result)}Ss(e,n,i,s){return i.documentReadCount<this.Vs?(Ke()<=W.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",We(n),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),D.resolve()):(Ke()<=W.DEBUG&&O("QueryEngine","Query:",We(n),"scans",i.documentReadCount,"local documents and returns",s,"documents as results."),i.documentReadCount>this.fs*s?(Ke()<=W.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",We(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ft(n))):D.resolve())}ps(e,n){if(Xu(n))return D.resolve(null);let i=Ft(n);return this.indexManager.getIndexType(e,i).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=ho(n,null,"F"),i=Ft(n)),this.indexManager.getDocumentsMatchingTarget(e,i).next(a=>{let c=K(...a);return this.gs.getDocuments(e,c).next(l=>this.indexManager.getMinOffset(e,i).next(d=>{let f=this.bs(n,l);return this.Ds(n,f,c,d.readTime)?this.ps(e,ho(n,null,"F")):this.vs(e,f,n,d)}))})))}ys(e,n,i,s){return Xu(n)||s.isEqual(j.min())?D.resolve(null):this.gs.getDocuments(e,i).next(a=>{let c=this.bs(n,a);return this.Ds(n,c,i,s)?D.resolve(null):(Ke()<=W.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),We(n)),this.vs(e,c,n,pm(s,Zn)).next(l=>l))})}bs(e,n){let i=new ht(nh(e));return n.forEach((s,a)=>{ki(e,a)&&(i=i.add(a))}),i}Ds(e,n,i,s){if(e.limit===null)return!1;if(i.size!==n.size)return!0;let a=e.limitType==="F"?n.last():n.first();return!!a&&(a.hasPendingWrites||a.version.compareTo(s)>0)}ws(e,n,i){return Ke()<=W.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",We(n)),this.gs.getDocumentsMatchingQuery(e,n,Ve.min(),i)}vs(e,n,i,s){return this.gs.getDocumentsMatchingQuery(e,i,s).next(a=>(n.forEach(c=>{a=a.insert(c.key,c)}),a))}};var La="LocalStore",wp=3e8,Wo=class{constructor(e,n,i,s){this.persistence=e,this.Cs=n,this.serializer=s,this.Fs=new it($),this.Ms=new re(a=>Va(a),ka),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(i)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new No(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.Fs))}};function vp(r,e,n,i){return new Wo(r,e,n,i)}async function Eh(r,e){let n=q(r);return await n.persistence.runTransaction("Handle user change","readonly",i=>{let s;return n.mutationQueue.getAllMutationBatches(i).next(a=>(s=a,n.Ns(e),n.mutationQueue.getAllMutationBatches(i))).next(a=>{let c=[],l=[],d=K();for(let f of s){c.push(f.batchId);for(let g of f.mutations)d=d.add(g.key)}for(let f of a){l.push(f.batchId);for(let g of f.mutations)d=d.add(g.key)}return n.localDocuments.getDocuments(i,d).next(f=>({Bs:f,removedBatchIds:c,addedBatchIds:l}))})})}function Ip(r,e){let n=q(r);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",i=>{let s=e.batch.keys(),a=n.Os.newChangeBuffer({trackRemovals:!0});return function(l,d,f,g){let w=f.batch,I=w.keys(),C=D.resolve();return I.forEach(x=>{C=C.next(()=>g.getEntry(d,x)).next(k=>{let V=f.docVersions.get(x);J(V!==null,48541),k.version.compareTo(V)<0&&(w.applyToRemoteDocument(k,f),k.isValidDocument()&&(k.setReadTime(f.commitVersion),g.addEntry(k)))})}),C.next(()=>l.mutationQueue.removeMutationBatch(d,w))}(n,i,e,a).next(()=>a.apply(i)).next(()=>n.mutationQueue.performConsistencyCheck(i)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(i,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(i,function(l){let d=K();for(let f=0;f<l.mutationResults.length;++f)l.mutationResults[f].transformResults.length>0&&(d=d.add(l.batch.mutations[f].key));return d}(e))).next(()=>n.localDocuments.getDocuments(i,s))})}function Th(r){let e=q(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.hi.getLastRemoteSnapshotVersion(n))}function Ep(r,e){let n=q(r),i=e.snapshotVersion,s=n.Fs;return n.persistence.runTransaction("Apply remote event","readwrite-primary",a=>{let c=n.Os.newChangeBuffer({trackRemovals:!0});s=n.Fs;let l=[];e.targetChanges.forEach((g,w)=>{let I=s.get(w);if(!I)return;l.push(n.hi.removeMatchingKeys(a,g.removedDocuments,w).next(()=>n.hi.addMatchingKeys(a,g.addedDocuments,w)));let C=I.withSequenceNumber(a.currentSequenceNumber);e.targetMismatches.get(w)!==null?C=C.withResumeToken(wt.EMPTY_BYTE_STRING,j.min()).withLastLimboFreeSnapshotVersion(j.min()):g.resumeToken.approximateByteSize()>0&&(C=C.withResumeToken(g.resumeToken,i)),s=s.insert(w,C),function(k,V,z){return k.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=wp?!0:z.addedDocuments.size+z.modifiedDocuments.size+z.removedDocuments.size>0}(I,C,g)&&l.push(n.hi.updateTargetData(a,C))});let d=ie(),f=K();if(e.documentUpdates.forEach(g=>{e.resolvedLimboDocuments.has(g)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(a,g))}),l.push(Tp(a,c,e.documentUpdates).next(g=>{d=g.Ls,f=g.ks})),!i.isEqual(j.min())){let g=n.hi.getLastRemoteSnapshotVersion(a).next(w=>n.hi.setTargetsMetadata(a,a.currentSequenceNumber,i));l.push(g)}return D.waitFor(l).next(()=>c.apply(a)).next(()=>n.localDocuments.getLocalViewOfDocuments(a,d,f)).next(()=>d)}).then(a=>(n.Fs=s,a))}function Tp(r,e,n){let i=K(),s=K();return n.forEach(a=>i=i.add(a)),e.getEntries(r,i).next(a=>{let c=ie();return n.forEach((l,d)=>{let f=a.get(l);d.isFoundDocument()!==f.isFoundDocument()&&(s=s.add(l)),d.isNoDocument()&&d.version.isEqual(j.min())?(e.removeEntry(l,d.readTime),c=c.insert(l,d)):!f.isValidDocument()||d.version.compareTo(f.version)>0||d.version.compareTo(f.version)===0&&f.hasPendingWrites?(e.addEntry(d),c=c.insert(l,d)):O(La,"Ignoring outdated watch update for ",l,". Current version:",f.version," Watch version:",d.version)}),{Ls:c,ks:s}})}function bp(r,e){let n=q(r);return n.persistence.runTransaction("Get next mutation batch","readonly",i=>(e===void 0&&(e=Ra),n.mutationQueue.getNextMutationBatchAfterBatchId(i,e)))}function Ap(r,e){let n=q(r);return n.persistence.runTransaction("Allocate target","readwrite",i=>{let s;return n.hi.getTargetData(i,e).next(a=>a?(s=a,D.resolve(s)):n.hi.allocateTargetId(i).next(c=>(s=new ir(e,c,"TargetPurposeListen",i.currentSequenceNumber),n.hi.addTargetData(i,s).next(()=>s))))}).then(i=>{let s=n.Fs.get(i.targetId);return(s===null||i.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.Fs=n.Fs.insert(i.targetId,i),n.Ms.set(e,i.targetId)),i})}async function Ho(r,e,n){let i=q(r),s=i.Fs.get(e),a=n?"readwrite":"readwrite-primary";try{n||await i.persistence.runTransaction("Release target",a,c=>i.persistence.referenceDelegate.removeTarget(c,s))}catch(c){if(!_n(c))throw c;O(La,`Failed to update sequence numbers for target ${e}: ${c}`)}i.Fs=i.Fs.remove(e),i.Ms.delete(s.target)}function ll(r,e,n){let i=q(r),s=j.min(),a=K();return i.persistence.runTransaction("Execute query","readwrite",c=>function(d,f,g){let w=q(d),I=w.Ms.get(g);return I!==void 0?D.resolve(w.Fs.get(I)):w.hi.getTargetData(f,g)}(i,c,Ft(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,i.hi.getMatchingKeysForTargetId(c,l.targetId).next(d=>{a=d})}).next(()=>i.Cs.getDocumentsMatchingQuery(c,e,n?s:j.min(),n?a:K())).next(l=>(Sp(i,Bm(e),l),{documents:l,qs:a})))}function Sp(r,e,n){let i=r.xs.get(e)||j.min();n.forEach((s,a)=>{a.readTime.compareTo(i)>0&&(i=a.readTime)}),r.xs.set(e,i)}var hi=class{constructor(){this.activeTargetIds=Gm()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}};var Qo=class{constructor(){this.Fo=new hi,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,i){}addLocalQueryTarget(e,n=!0){return n&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,n,i){this.Mo[e]=n}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new hi,Promise.resolve()}handleUserChange(e,n,i){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};var Jo=class{xo(e){}shutdown(){}};var hl="ConnectivityMonitor",di=class{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){O(hl,"Network connectivity changed: AVAILABLE");for(let e of this.ko)e(0)}Lo(){O(hl,"Network connectivity changed: UNAVAILABLE");for(let e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var $r=null;function Xo(){return $r===null?$r=function(){return 268435456+Math.round(2147483648*Math.random())}():$r++,"0x"+$r.toString(16)}var zs="RestConnection",Rp={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"},Yo=class{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let n=e.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.$o=n+"://"+e.host,this.Uo=`projects/${i}/databases/${s}`,this.Ko=this.databaseId.database===Zr?`project_id=${i}`:`project_id=${i}&database_id=${s}`}Wo(e,n,i,s,a){let c=Xo(),l=this.Go(e,n.toUriEncodedString());O(zs,`Sending RPC '${e}' ${c}:`,l,i);let d={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(d,s,a);let{host:f}=new URL(l),g=Lr(f);return this.jo(e,l,d,i,g).then(w=>(O(zs,`Received RPC '${e}' ${c}: `,w),w),w=>{throw pe(zs,`RPC '${e}' ${c} failed with error: `,w,"url: ",l,"request:",i),w})}Jo(e,n,i,s,a,c){return this.Wo(e,n,i,s,a)}zo(e,n,i){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+gn}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((s,a)=>e[a]=s),i&&i.headers.forEach((s,a)=>e[a]=s)}Go(e,n){let i=Rp[e];return`${this.$o}/v1/${n}:${i}`}terminate(){}};var Zo=class{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}};var _t="WebChannelConnection",ta=class extends Yo{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,n,i,s,a){let c=Xo();return new Promise((l,d)=>{let f=new Ns;f.setWithCredentials(!0),f.listenOnce(Os.COMPLETE,()=>{try{switch(f.getLastErrorCode()){case Kn.NO_ERROR:let w=f.getResponseJson();O(_t,`XHR for RPC '${e}' ${c} received:`,JSON.stringify(w)),l(w);break;case Kn.TIMEOUT:O(_t,`RPC '${e}' ${c} timed out`),d(new F(P.DEADLINE_EXCEEDED,"Request time out"));break;case Kn.HTTP_ERROR:let I=f.getStatus();if(O(_t,`RPC '${e}' ${c} failed with status:`,I,"response text:",f.getResponseText()),I>0){let C=f.getResponseJson();Array.isArray(C)&&(C=C[0]);let x=C?.error;if(x&&x.status&&x.message){let k=function(z){let U=z.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(U)>=0?U:P.UNKNOWN}(x.status);d(new F(k,x.message))}else d(new F(P.UNKNOWN,"Server responded with status "+f.getStatus()))}else d(new F(P.UNAVAILABLE,"Connection failed."));break;default:M(9055,{c_:e,streamId:c,l_:f.getLastErrorCode(),h_:f.getLastError()})}}finally{O(_t,`RPC '${e}' ${c} completed.`)}});let g=JSON.stringify(s);O(_t,`RPC '${e}' ${c} sending request:`,s),f.send(n,"POST",g,i,15)})}P_(e,n,i){let s=Xo(),a=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],c=Ms(),l=Fs(),d={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(d.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(d.useFetchStreams=!0),this.zo(d.initMessageHeaders,n,i),d.encodeInitMessageHeaders=!0;let g=a.join("");O(_t,`Creating RPC '${e}' stream ${s}: ${g}`,d);let w=c.createWebChannel(g,d);this.T_(w);let I=!1,C=!1,x=new Zo({Ho:V=>{C?O(_t,`Not sending because RPC '${e}' stream ${s} is closed:`,V):(I||(O(_t,`Opening RPC '${e}' stream ${s} transport.`),w.open(),I=!0),O(_t,`RPC '${e}' stream ${s} sending:`,V),w.send(V))},Yo:()=>w.close()}),k=(V,z,U)=>{V.listen(z,G=>{try{U(G)}catch(et){setTimeout(()=>{throw et},0)}})};return k(w,Ge.EventType.OPEN,()=>{C||(O(_t,`RPC '${e}' stream ${s} transport opened.`),x.s_())}),k(w,Ge.EventType.CLOSE,()=>{C||(C=!0,O(_t,`RPC '${e}' stream ${s} transport closed`),x.__(),this.I_(w))}),k(w,Ge.EventType.ERROR,V=>{C||(C=!0,pe(_t,`RPC '${e}' stream ${s} transport errored. Name:`,V.name,"Message:",V.message),x.__(new F(P.UNAVAILABLE,"The operation could not be completed")))}),k(w,Ge.EventType.MESSAGE,V=>{var z;if(!C){let U=V.data[0];J(!!U,16349);let G=U,et=G?.error||((z=G[0])===null||z===void 0?void 0:z.error);if(et){O(_t,`RPC '${e}' stream ${s} received error:`,et);let At=et.status,Z=function(_){let E=ot[_];if(E!==void 0)return fh(E)}(At),b=et.message;Z===void 0&&(Z=P.INTERNAL,b="Unknown error status: "+At+" with message "+et.message),C=!0,x.__(new F(Z,b)),w.close()}else O(_t,`RPC '${e}' stream ${s} received:`,U),x.a_(U)}}),k(l,Ls.STAT_EVENT,V=>{V.stat===Ur.PROXY?O(_t,`RPC '${e}' stream ${s} detected buffering proxy`):V.stat===Ur.NOPROXY&&O(_t,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{x.o_()},0),x}terminate(){this.u_.forEach(e=>e.close()),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter(n=>n===e)}};function Us(){return typeof document<"u"?document:null}function Ni(r){return new Io(r,!0)}var fi=class{constructor(e,n,i=1e3,s=1.5,a=6e4){this.Fi=e,this.timerId=n,this.d_=i,this.E_=s,this.A_=a,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();let n=Math.floor(this.R_+this.p_()),i=Math.max(0,Date.now()-this.m_),s=Math.max(0,n-i);s>0&&O("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.R_} ms, delay with jitter: ${n} ms, last attempt: ${i} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,s,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}};var dl="PersistentStream",mi=class{constructor(e,n,i,s,a,c,l,d){this.Fi=e,this.w_=i,this.S_=s,this.connection=a,this.authCredentialsProvider=c,this.appCheckCredentialsProvider=l,this.listener=d,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new fi(e,n)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,n){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():n&&n.code===P.RESOURCE_EXHAUSTED?(te(n.toString()),te("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):n&&n.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(n)}U_(){}auth(){this.state=1;let e=this.K_(this.b_),n=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([i,s])=>{this.b_===n&&this.W_(i,s)},i=>{e(()=>{let s=new F(P.UNKNOWN,"Fetching auth token failed: "+i.message);return this.G_(s)})})}W_(e,n){let i=this.K_(this.b_);this.stream=this.z_(e,n),this.stream.Zo(()=>{i(()=>this.listener.Zo())}),this.stream.e_(()=>{i(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(s=>{i(()=>this.G_(s))}),this.stream.onMessage(s=>{i(()=>++this.C_==1?this.j_(s):this.onNext(s))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return O(dl,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return n=>{this.Fi.enqueueAndForget(()=>this.b_===e?n():(O(dl,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}},ea=class extends mi{constructor(e,n,i,s,a,c){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,i,s,c),this.serializer=a}z_(e,n){return this.connection.P_("Listen",e,n)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();let n=sp(this.serializer,e),i=function(a){if(!("targetChange"in a))return j.min();let c=a.targetChange;return c.targetIds&&c.targetIds.length?j.min():c.readTime?Mt(c.readTime):j.min()}(e);return this.listener.J_(n,i)}H_(e){let n={};n.database=Ao(this.serializer),n.addTarget=function(a,c){let l,d=c.target;if(l=lo(d)?{documents:cp(a,d)}:{query:up(a,d).Vt},l.targetId=c.targetId,c.resumeToken.approximateByteSize()>0){l.resumeToken=mh(a,c.resumeToken);let f=Eo(a,c.expectedCount);f!==null&&(l.expectedCount=f)}else if(c.snapshotVersion.compareTo(j.min())>0){l.readTime=ai(a,c.snapshotVersion.toTimestamp());let f=Eo(a,c.expectedCount);f!==null&&(l.expectedCount=f)}return l}(this.serializer,e);let i=hp(this.serializer,e);i&&(n.labels=i),this.k_(n)}Y_(e){let n={};n.database=Ao(this.serializer),n.removeTarget=e,this.k_(n)}},na=class extends mi{constructor(e,n,i,s,a,c){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,i,s,c),this.serializer=a}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,n){return this.connection.P_("Write",e,n)}j_(e){return J(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,J(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){J(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();let n=ap(e.writeResults,e.commitTime),i=Mt(e.commitTime);return this.listener.ta(i,n)}na(){let e={};e.database=Ao(this.serializer),this.k_(e)}X_(e){let n={streamToken:this.lastStreamToken,writes:e.map(i=>op(this.serializer,i))};this.k_(n)}};var ra=class{},ia=class extends ra{constructor(e,n,i,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=i,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new F(P.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,n,i,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Wo(e,To(n,i),s,a,c)).catch(a=>{throw a.name==="FirebaseError"?(a.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new F(P.UNKNOWN,a.toString())})}Jo(e,n,i,s,a){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([c,l])=>this.connection.Jo(e,To(n,i),s,c,l,a)).catch(c=>{throw c.name==="FirebaseError"?(c.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),c):new F(P.UNKNOWN,c.toString())})}terminate(){this.ra=!0,this.connection.terminate()}},sa=class{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){let n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(te(n),this._a=!1):O("OnlineStateTracker",n)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}};var Le="RemoteStore",oa=class{constructor(e,n,i,s,a){this.localStore=e,this.datastore=n,this.asyncQueue=i,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=a,this.Ea.xo(c=>{i.enqueueAndForget(async()=>{Fe(this)&&(O(Le,"Restarting streams for network reachability change."),await async function(d){let f=q(d);f.Ia.add(4),await fr(f),f.Aa.set("Unknown"),f.Ia.delete(4),await Oi(f)}(this))})}),this.Aa=new sa(i,s)}};async function Oi(r){if(Fe(r))for(let e of r.da)await e(!0)}async function fr(r){for(let e of r.da)await e(!1)}function bh(r,e){let n=q(r);n.Ta.has(e.targetId)||(n.Ta.set(e.targetId,e),za(n)?Ba(n):wn(n).x_()&&Ma(n,e))}function Fa(r,e){let n=q(r),i=wn(n);n.Ta.delete(e),i.x_()&&Ah(n,e),n.Ta.size===0&&(i.x_()?i.B_():Fe(n)&&n.Aa.set("Unknown"))}function Ma(r,e){if(r.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(j.min())>0){let n=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}wn(r).H_(e)}function Ah(r,e){r.Ra.$e(e),wn(r).Y_(e)}function Ba(r){r.Ra=new vo({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>r.Ta.get(e)||null,lt:()=>r.datastore.serializer.databaseId}),wn(r).start(),r.Aa.aa()}function za(r){return Fe(r)&&!wn(r).M_()&&r.Ta.size>0}function Fe(r){return q(r).Ia.size===0}function Sh(r){r.Ra=void 0}async function Cp(r){r.Aa.set("Online")}async function Pp(r){r.Ta.forEach((e,n)=>{Ma(r,e)})}async function Dp(r,e){Sh(r),za(r)?(r.Aa.la(e),Ba(r)):r.Aa.set("Unknown")}async function xp(r,e,n){if(r.Aa.set("Online"),e instanceof si&&e.state===2&&e.cause)try{await async function(s,a){let c=a.cause;for(let l of a.targetIds)s.Ta.has(l)&&(await s.remoteSyncer.rejectListen(l,c),s.Ta.delete(l),s.Ra.removeTarget(l))}(r,e)}catch(i){O(Le,"Failed to remove targets %s: %s ",e.targetIds.join(","),i),await pi(r,i)}else if(e instanceof Xe?r.Ra.Ye(e):e instanceof ii?r.Ra.it(e):r.Ra.et(e),!n.isEqual(j.min()))try{let i=await Th(r.localStore);n.compareTo(i)>=0&&await function(a,c){let l=a.Ra.Pt(c);return l.targetChanges.forEach((d,f)=>{if(d.resumeToken.approximateByteSize()>0){let g=a.Ta.get(f);g&&a.Ta.set(f,g.withResumeToken(d.resumeToken,c))}}),l.targetMismatches.forEach((d,f)=>{let g=a.Ta.get(d);if(!g)return;a.Ta.set(d,g.withResumeToken(wt.EMPTY_BYTE_STRING,g.snapshotVersion)),Ah(a,d);let w=new ir(g.target,d,f,g.sequenceNumber);Ma(a,w)}),a.remoteSyncer.applyRemoteEvent(l)}(r,n)}catch(i){O(Le,"Failed to raise snapshot:",i),await pi(r,i)}}async function pi(r,e,n){if(!_n(e))throw e;r.Ia.add(1),await fr(r),r.Aa.set("Offline"),n||(n=()=>Th(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{O(Le,"Retrying IndexedDB access"),await n(),r.Ia.delete(1),await Oi(r)})}function Rh(r,e){return e().catch(n=>pi(r,n,e))}async function Li(r){let e=q(r),n=ye(e),i=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:Ra;for(;Vp(e);)try{let s=await bp(e.localStore,i);if(s===null){e.Pa.length===0&&n.B_();break}i=s.batchId,kp(e,s)}catch(s){await pi(e,s)}Ch(e)&&Ph(e)}function Vp(r){return Fe(r)&&r.Pa.length<10}function kp(r,e){r.Pa.push(e);let n=ye(r);n.x_()&&n.Z_&&n.X_(e.mutations)}function Ch(r){return Fe(r)&&!ye(r).M_()&&r.Pa.length>0}function Ph(r){ye(r).start()}async function Np(r){ye(r).na()}async function Op(r){let e=ye(r);for(let n of r.Pa)e.X_(n.mutations)}async function Lp(r,e,n){let i=r.Pa.shift(),s=go.from(i,e,n);await Rh(r,()=>r.remoteSyncer.applySuccessfulWrite(s)),await Li(r)}async function Fp(r,e){e&&ye(r).Z_&&await async function(i,s){if(function(c){return Ym(c)&&c!==P.ABORTED}(s.code)){let a=i.Pa.shift();ye(i).N_(),await Rh(i,()=>i.remoteSyncer.rejectFailedWrite(a.batchId,s)),await Li(i)}}(r,e),Ch(r)&&Ph(r)}async function fl(r,e){let n=q(r);n.asyncQueue.verifyOperationInProgress(),O(Le,"RemoteStore received new credentials");let i=Fe(n);n.Ia.add(3),await fr(n),i&&n.Aa.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Ia.delete(3),await Oi(n)}async function Mp(r,e){let n=q(r);e?(n.Ia.delete(2),await Oi(n)):e||(n.Ia.add(2),await fr(n),n.Aa.set("Unknown"))}function wn(r){return r.Va||(r.Va=function(n,i,s){let a=q(n);return a.ia(),new ea(i,a.connection,a.authCredentials,a.appCheckCredentials,a.serializer,s)}(r.datastore,r.asyncQueue,{Zo:Cp.bind(null,r),e_:Pp.bind(null,r),n_:Dp.bind(null,r),J_:xp.bind(null,r)}),r.da.push(async e=>{e?(r.Va.N_(),za(r)?Ba(r):r.Aa.set("Unknown")):(await r.Va.stop(),Sh(r))})),r.Va}function ye(r){return r.ma||(r.ma=function(n,i,s){let a=q(n);return a.ia(),new na(i,a.connection,a.authCredentials,a.appCheckCredentials,a.serializer,s)}(r.datastore,r.asyncQueue,{Zo:()=>Promise.resolve(),e_:Np.bind(null,r),n_:Fp.bind(null,r),ea:Op.bind(null,r),ta:Lp.bind(null,r)}),r.da.push(async e=>{e?(r.ma.N_(),await Li(r)):(await r.ma.stop(),r.Pa.length>0&&(O(Le,`Stopping write stream with ${r.Pa.length} pending writes`),r.Pa=[]))})),r.ma}var aa=class r{constructor(e,n,i,s,a){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=i,this.op=s,this.removalCallback=a,this.deferred=new Nt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(c=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,i,s,a){let c=Date.now()+i,l=new r(e,n,c,s,a);return l.start(i),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new F(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function Ua(r,e){if(te("AsyncQueue",`${e}: ${r}`),_n(r))return new F(P.UNAVAILABLE,`${e}: ${r}`);throw r}var gi=class r{static emptySet(e){return new r(e.comparator)}constructor(e){this.comparator=e?(n,i)=>e(n,i)||B.comparator(n.key,i.key):(n,i)=>B.comparator(n.key,i.key),this.keyedMap=Wn(),this.sortedSet=new it(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,i)=>(e(n),!1))}add(e){let n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){let n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof r)||this.size!==e.size)return!1;let n=this.sortedSet.getIterator(),i=e.sortedSet.getIterator();for(;n.hasNext();){let s=n.getNext().key,a=i.getNext().key;if(!s.isEqual(a))return!1}return!0}toString(){let e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){let i=new r;return i.comparator=this.comparator,i.keyedMap=e,i.sortedSet=n,i}};var yi=class{constructor(){this.fa=new it(B.comparator)}track(e){let n=e.doc.key,i=this.fa.get(n);i?e.type!==0&&i.type===3?this.fa=this.fa.insert(n,e):e.type===3&&i.type!==1?this.fa=this.fa.insert(n,{type:i.type,doc:e.doc}):e.type===2&&i.type===2?this.fa=this.fa.insert(n,{type:2,doc:e.doc}):e.type===2&&i.type===0?this.fa=this.fa.insert(n,{type:0,doc:e.doc}):e.type===1&&i.type===0?this.fa=this.fa.remove(n):e.type===1&&i.type===2?this.fa=this.fa.insert(n,{type:1,doc:i.doc}):e.type===0&&i.type===1?this.fa=this.fa.insert(n,{type:2,doc:e.doc}):M(63341,{At:e,ga:i}):this.fa=this.fa.insert(n,e)}pa(){let e=[];return this.fa.inorderTraversal((n,i)=>{e.push(i)}),e}},fn=class r{constructor(e,n,i,s,a,c,l,d,f){this.query=e,this.docs=n,this.oldDocs=i,this.docChanges=s,this.mutatedKeys=a,this.fromCache=c,this.syncStateChanged=l,this.excludesMetadataChanges=d,this.hasCachedResults=f}static fromInitialDocuments(e,n,i,s,a){let c=[];return n.forEach(l=>{c.push({type:0,doc:l})}),new r(e,n,gi.emptySet(n),c,i,s,!0,!1,a)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Vi(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let n=this.docChanges,i=e.docChanges;if(n.length!==i.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==i[s].type||!n[s].doc.isEqual(i[s].doc))return!1;return!0}};var ca=class{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(e=>e.ba())}},ua=class{constructor(){this.queries=ml(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(n,i){let s=q(n),a=s.queries;s.queries=ml(),a.forEach((c,l)=>{for(let d of l.wa)d.onError(i)})})(this,new F(P.ABORTED,"Firestore shutting down"))}};function ml(){return new re(r=>eh(r),Vi)}async function Dh(r,e){let n=q(r),i=3,s=e.query,a=n.queries.get(s);a?!a.Sa()&&e.ba()&&(i=2):(a=new ca,i=e.ba()?0:1);try{switch(i){case 0:a.ya=await n.onListen(s,!0);break;case 1:a.ya=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(c){let l=Ua(c,`Initialization of query '${We(e.query)}' failed`);return void e.onError(l)}n.queries.set(s,a),a.wa.push(e),e.va(n.onlineState),a.ya&&e.Ca(a.ya)&&qa(n)}async function xh(r,e){let n=q(r),i=e.query,s=3,a=n.queries.get(i);if(a){let c=a.wa.indexOf(e);c>=0&&(a.wa.splice(c,1),a.wa.length===0?s=e.ba()?0:1:!a.Sa()&&e.ba()&&(s=2))}switch(s){case 0:return n.queries.delete(i),n.onUnlisten(i,!0);case 1:return n.queries.delete(i),n.onUnlisten(i,!1);case 2:return n.onLastRemoteStoreUnlisten(i);default:return}}function Bp(r,e){let n=q(r),i=!1;for(let s of e){let a=s.query,c=n.queries.get(a);if(c){for(let l of c.wa)l.Ca(s)&&(i=!0);c.ya=s}}i&&qa(n)}function zp(r,e,n){let i=q(r),s=i.queries.get(e);if(s)for(let a of s.wa)a.onError(n);i.queries.delete(e)}function qa(r){r.Da.forEach(e=>{e.next()})}var la,pl;(pl=la||(la={})).Fa="default",pl.Cache="cache";var _i=class{constructor(e,n,i){this.query=e,this.Ma=n,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=i||{}}Ca(e){if(!this.options.includeMetadataChanges){let i=[];for(let s of e.docChanges)s.type!==3&&i.push(s);e=new fn(e.query,e.docs,e.oldDocs,i,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),n=!0):this.Ba(e,this.onlineState)&&(this.La(e),n=!0),this.Oa=e,n}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let n=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),n=!0),n}Ba(e,n){if(!e.fromCache||!this.ba())return!0;let i=n!=="Offline";return(!this.options.ka||!i)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Na(e){if(e.docChanges.length>0)return!0;let n=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}La(e){e=fn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==la.Cache}};var wi=class{constructor(e){this.key=e}},vi=class{constructor(e){this.key=e}},ha=class{constructor(e,n){this.query=e,this.Ha=n,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=K(),this.mutatedKeys=K(),this.Xa=nh(e),this.eu=new gi(this.Xa)}get tu(){return this.Ha}nu(e,n){let i=n?n.ru:new yi,s=n?n.eu:this.eu,a=n?n.mutatedKeys:this.mutatedKeys,c=s,l=!1,d=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,f=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((g,w)=>{let I=s.get(g),C=ki(this.query,w)?w:null,x=!!I&&this.mutatedKeys.has(I.key),k=!!C&&(C.hasLocalMutations||this.mutatedKeys.has(C.key)&&C.hasCommittedMutations),V=!1;I&&C?I.data.isEqual(C.data)?x!==k&&(i.track({type:3,doc:C}),V=!0):this.iu(I,C)||(i.track({type:2,doc:C}),V=!0,(d&&this.Xa(C,d)>0||f&&this.Xa(C,f)<0)&&(l=!0)):!I&&C?(i.track({type:0,doc:C}),V=!0):I&&!C&&(i.track({type:1,doc:I}),V=!0,(d||f)&&(l=!0)),V&&(C?(c=c.add(C),a=k?a.add(g):a.delete(g)):(c=c.delete(g),a=a.delete(g)))}),this.query.limit!==null)for(;c.size>this.query.limit;){let g=this.query.limitType==="F"?c.last():c.first();c=c.delete(g.key),a=a.delete(g.key),i.track({type:1,doc:g})}return{eu:c,ru:i,Ds:l,mutatedKeys:a}}iu(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,i,s){let a=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;let c=e.ru.pa();c.sort((g,w)=>function(C,x){let k=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{At:V})}};return k(C)-k(x)}(g.type,w.type)||this.Xa(g.doc,w.doc)),this.su(i),s=s!=null&&s;let l=n&&!s?this.ou():[],d=this.Za.size===0&&this.current&&!s?1:0,f=d!==this.Ya;return this.Ya=d,c.length!==0||f?{snapshot:new fn(this.query,e.eu,a,c,e.mutatedKeys,d===0,f,!1,!!i&&i.resumeToken.approximateByteSize()>0),_u:l}:{_u:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new yi,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach(n=>this.Ha=this.Ha.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ha=this.Ha.delete(n)),this.current=e.current)}ou(){if(!this.current)return[];let e=this.Za;this.Za=K(),this.eu.forEach(i=>{this.au(i.key)&&(this.Za=this.Za.add(i.key))});let n=[];return e.forEach(i=>{this.Za.has(i)||n.push(new vi(i))}),this.Za.forEach(i=>{e.has(i)||n.push(new wi(i))}),n}uu(e){this.Ha=e.qs,this.Za=K();let n=this.nu(e.documents);return this.applyChanges(n,!0)}cu(){return fn.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}},ja="SyncEngine",da=class{constructor(e,n,i){this.query=e,this.targetId=n,this.view=i}},fa=class{constructor(e){this.key=e,this.lu=!1}},ma=class{constructor(e,n,i,s,a,c){this.localStore=e,this.remoteStore=n,this.eventManager=i,this.sharedClientState=s,this.currentUser=a,this.maxConcurrentLimboResolutions=c,this.hu={},this.Pu=new re(l=>eh(l),Vi),this.Tu=new Map,this.Iu=new Set,this.du=new it(B.comparator),this.Eu=new Map,this.Au=new or,this.Ru={},this.Vu=new Map,this.mu=sr.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}};async function Up(r,e,n=!0){let i=Fh(r),s,a=i.Pu.get(e);return a?(i.sharedClientState.addLocalQueryTarget(a.targetId),s=a.view.cu()):s=await Vh(i,e,n,!0),s}async function qp(r,e){let n=Fh(r);await Vh(n,e,!0,!1)}async function Vh(r,e,n,i){let s=await Ap(r.localStore,Ft(e)),a=s.targetId,c=r.sharedClientState.addLocalQueryTarget(a,n),l;return i&&(l=await jp(r,e,a,c==="current",s.resumeToken)),r.isPrimaryClient&&n&&bh(r.remoteStore,s),l}async function jp(r,e,n,i,s){r.gu=(w,I,C)=>async function(k,V,z,U){let G=V.view.nu(z);G.Ds&&(G=await ll(k.localStore,V.query,!1).then(({documents:b})=>V.view.nu(b,G)));let et=U&&U.targetChanges.get(V.targetId),At=U&&U.targetMismatches.get(V.targetId)!=null,Z=V.view.applyChanges(G,k.isPrimaryClient,et,At);return yl(k,V.targetId,Z._u),Z.snapshot}(r,w,I,C);let a=await ll(r.localStore,e,!0),c=new ha(e,a.qs),l=c.nu(a.documents),d=rr.createSynthesizedTargetChangeForCurrentChange(n,i&&r.onlineState!=="Offline",s),f=c.applyChanges(l,r.isPrimaryClient,d);yl(r,n,f._u);let g=new da(e,n,c);return r.Pu.set(e,g),r.Tu.has(n)?r.Tu.get(n).push(e):r.Tu.set(n,[e]),f.snapshot}async function $p(r,e,n){let i=q(r),s=i.Pu.get(e),a=i.Tu.get(s.targetId);if(a.length>1)return i.Tu.set(s.targetId,a.filter(c=>!Vi(c,e))),void i.Pu.delete(e);i.isPrimaryClient?(i.sharedClientState.removeLocalQueryTarget(s.targetId),i.sharedClientState.isActiveQueryTarget(s.targetId)||await Ho(i.localStore,s.targetId,!1).then(()=>{i.sharedClientState.clearQueryState(s.targetId),n&&Fa(i.remoteStore,s.targetId),pa(i,s.targetId)}).catch(yn)):(pa(i,s.targetId),await Ho(i.localStore,s.targetId,!0))}async function Gp(r,e){let n=q(r),i=n.Pu.get(e),s=n.Tu.get(i.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(i.targetId),Fa(n.remoteStore,i.targetId))}async function Kp(r,e,n){let i=Zp(r);try{let s=await function(c,l){let d=q(c),f=X.now(),g=l.reduce((C,x)=>C.add(x.key),K()),w,I;return d.persistence.runTransaction("Locally write mutations","readwrite",C=>{let x=ie(),k=K();return d.Os.getEntries(C,g).next(V=>{x=V,x.forEach((z,U)=>{U.isValidDocument()||(k=k.add(z))})}).next(()=>d.localDocuments.getOverlayedDocuments(C,x)).next(V=>{w=V;let z=[];for(let U of l){let G=Xm(U,w.get(U.key).overlayedDocument);G!=null&&z.push(new Ut(U.key,G,Ql(G.value.mapValue),he.exists(!0)))}return d.mutationQueue.addMutationBatch(C,f,z,l)}).next(V=>{I=V;let z=V.applyToLocalDocumentSet(w,k);return d.documentOverlayCache.saveOverlays(C,V.batchId,z)})}).then(()=>({batchId:I.batchId,changes:ih(w)}))}(i.localStore,e);i.sharedClientState.addPendingMutation(s.batchId),function(c,l,d){let f=c.Ru[c.currentUser.toKey()];f||(f=new it($)),f=f.insert(l,d),c.Ru[c.currentUser.toKey()]=f}(i,s.batchId,n),await mr(i,s.changes),await Li(i.remoteStore)}catch(s){let a=Ua(s,"Failed to persist write");n.reject(a)}}async function kh(r,e){let n=q(r);try{let i=await Ep(n.localStore,e);e.targetChanges.forEach((s,a)=>{let c=n.Eu.get(a);c&&(J(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?c.lu=!0:s.modifiedDocuments.size>0?J(c.lu,14607):s.removedDocuments.size>0&&(J(c.lu,42227),c.lu=!1))}),await mr(n,i,e)}catch(i){await yn(i)}}function gl(r,e,n){let i=q(r);if(i.isPrimaryClient&&n===0||!i.isPrimaryClient&&n===1){let s=[];i.Pu.forEach((a,c)=>{let l=c.view.va(e);l.snapshot&&s.push(l.snapshot)}),function(c,l){let d=q(c);d.onlineState=l;let f=!1;d.queries.forEach((g,w)=>{for(let I of w.wa)I.va(l)&&(f=!0)}),f&&qa(d)}(i.eventManager,e),s.length&&i.hu.J_(s),i.onlineState=e,i.isPrimaryClient&&i.sharedClientState.setOnlineState(e)}}async function Wp(r,e,n){let i=q(r);i.sharedClientState.updateQueryState(e,"rejected",n);let s=i.Eu.get(e),a=s&&s.key;if(a){let c=new it(B.comparator);c=c.insert(a,Pt.newNoDocument(a,j.min()));let l=K().add(a),d=new ri(j.min(),new Map,new it($),c,l);await kh(i,d),i.du=i.du.remove(a),i.Eu.delete(e),$a(i)}else await Ho(i.localStore,e,!1).then(()=>pa(i,e,n)).catch(yn)}async function Hp(r,e){let n=q(r),i=e.batch.batchId;try{let s=await Ip(n.localStore,e);Oh(n,i,null),Nh(n,i),n.sharedClientState.updateMutationState(i,"acknowledged"),await mr(n,s)}catch(s){await yn(s)}}async function Qp(r,e,n){let i=q(r);try{let s=await function(c,l){let d=q(c);return d.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let g;return d.mutationQueue.lookupMutationBatch(f,l).next(w=>(J(w!==null,37113),g=w.keys(),d.mutationQueue.removeMutationBatch(f,w))).next(()=>d.mutationQueue.performConsistencyCheck(f)).next(()=>d.documentOverlayCache.removeOverlaysForBatchId(f,g,l)).next(()=>d.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,g)).next(()=>d.localDocuments.getDocuments(f,g))})}(i.localStore,e);Oh(i,e,n),Nh(i,e),i.sharedClientState.updateMutationState(e,"rejected",n),await mr(i,s)}catch(s){await yn(s)}}function Nh(r,e){(r.Vu.get(e)||[]).forEach(n=>{n.resolve()}),r.Vu.delete(e)}function Oh(r,e,n){let i=q(r),s=i.Ru[i.currentUser.toKey()];if(s){let a=s.get(e);a&&(n?a.reject(n):a.resolve(),s=s.remove(e)),i.Ru[i.currentUser.toKey()]=s}}function pa(r,e,n=null){r.sharedClientState.removeLocalQueryTarget(e);for(let i of r.Tu.get(e))r.Pu.delete(i),n&&r.hu.pu(i,n);r.Tu.delete(e),r.isPrimaryClient&&r.Au.zr(e).forEach(i=>{r.Au.containsKey(i)||Lh(r,i)})}function Lh(r,e){r.Iu.delete(e.path.canonicalString());let n=r.du.get(e);n!==null&&(Fa(r.remoteStore,n),r.du=r.du.remove(e),r.Eu.delete(n),$a(r))}function yl(r,e,n){for(let i of n)i instanceof wi?(r.Au.addReference(i.key,e),Jp(r,i)):i instanceof vi?(O(ja,"Document no longer in limbo: "+i.key),r.Au.removeReference(i.key,e),r.Au.containsKey(i.key)||Lh(r,i.key)):M(19791,{yu:i})}function Jp(r,e){let n=e.key,i=n.path.canonicalString();r.du.get(n)||r.Iu.has(i)||(O(ja,"New document in limbo: "+n),r.Iu.add(i),$a(r))}function $a(r){for(;r.Iu.size>0&&r.du.size<r.maxConcurrentLimboResolutions;){let e=r.Iu.values().next().value;r.Iu.delete(e);let n=new B(st.fromString(e)),i=r.mu.next();r.Eu.set(i,new fa(n)),r.du=r.du.insert(n,i),bh(r.remoteStore,new ir(Ft(xi(n.path)),i,"TargetPurposeLimboResolution",en.ue))}}async function mr(r,e,n){let i=q(r),s=[],a=[],c=[];i.Pu.isEmpty()||(i.Pu.forEach((l,d)=>{c.push(i.gu(d,e,n).then(f=>{var g;if((f||n)&&i.isPrimaryClient){let w=f?!f.fromCache:(g=n?.targetChanges.get(d.targetId))===null||g===void 0?void 0:g.current;i.sharedClientState.updateQueryState(d.targetId,w?"current":"not-current")}if(f){s.push(f);let w=$o.Es(d.targetId,f);a.push(w)}}))}),await Promise.all(c),i.hu.J_(s),await async function(d,f){let g=q(d);try{await g.persistence.runTransaction("notifyLocalViewChanges","readwrite",w=>D.forEach(f,I=>D.forEach(I.Is,C=>g.persistence.referenceDelegate.addReference(w,I.targetId,C)).next(()=>D.forEach(I.ds,C=>g.persistence.referenceDelegate.removeReference(w,I.targetId,C)))))}catch(w){if(!_n(w))throw w;O(La,"Failed to update sequence numbers: "+w)}for(let w of f){let I=w.targetId;if(!w.fromCache){let C=g.Fs.get(I),x=C.snapshotVersion,k=C.withLastLimboFreeSnapshotVersion(x);g.Fs=g.Fs.insert(I,k)}}}(i.localStore,a))}async function Xp(r,e){let n=q(r);if(!n.currentUser.isEqual(e)){O(ja,"User change. New user:",e.toKey());let i=await Eh(n.localStore,e);n.currentUser=e,function(a,c){a.Vu.forEach(l=>{l.forEach(d=>{d.reject(new F(P.CANCELLED,c))})}),a.Vu.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,i.removedBatchIds,i.addedBatchIds),await mr(n,i.Bs)}}function Yp(r,e){let n=q(r),i=n.Eu.get(e);if(i&&i.lu)return K().add(i.key);{let s=K(),a=n.Tu.get(e);if(!a)return s;for(let c of a){let l=n.Pu.get(c);s=s.unionWith(l.view.tu)}return s}}function Fh(r){let e=q(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=kh.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Yp.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Wp.bind(null,e),e.hu.J_=Bp.bind(null,e.eventManager),e.hu.pu=zp.bind(null,e.eventManager),e}function Zp(r){let e=q(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Hp.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Qp.bind(null,e),e}var mn=class{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ni(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,n){return null}Fu(e,n){return null}vu(e){return vp(this.persistence,new Ko,e.initialUser,this.serializer)}Du(e){return new ui(jo.Vi,this.serializer)}bu(e){return new Qo}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};mn.provider={build:()=>new mn};var ga=class extends mn{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,n){J(this.persistence.referenceDelegate instanceof li,46915);let i=this.persistence.referenceDelegate.garbageCollector;return new Do(i,e.asyncQueue,n)}Du(e){let n=this.cacheSizeBytes!==void 0?St.withCacheSize(this.cacheSizeBytes):St.DEFAULT;return new ui(i=>li.Vi(i,n),this.serializer)}};var ar=class{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=i=>gl(this.syncEngine,i,1),this.remoteStore.remoteSyncer.handleCredentialChange=Xp.bind(null,this.syncEngine),await Mp(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new ua}()}createDatastore(e){let n=Ni(e.databaseInfo.databaseId),i=function(a){return new ta(a)}(e.databaseInfo);return function(a,c,l,d){return new ia(a,c,l,d)}(e.authCredentials,e.appCheckCredentials,i,n)}createRemoteStore(e){return function(i,s,a,c,l){return new oa(i,s,a,c,l)}(this.localStore,this.datastore,e.asyncQueue,n=>gl(this.syncEngine,n,0),function(){return di.C()?new di:new Jo}())}createSyncEngine(e,n){return function(s,a,c,l,d,f,g){let w=new ma(s,a,c,l,d,f);return g&&(w.fu=!0),w}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(s){let a=q(s);O(Le,"RemoteStore shutting down."),a.Ia.add(5),await fr(a),a.Ea.shutdown(),a.Aa.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}};ar.provider={build:()=>new ar};var Ii=class{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):te("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,n){setTimeout(()=>{this.muted||e(n)},0)}};var _e="FirestoreClient",ya=class{constructor(e,n,i,s,a){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=i,this.databaseInfo=s,this.user=lt.UNAUTHENTICATED,this.clientId=Yn.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=a,this.authCredentials.start(i,async c=>{O(_e,"Received user=",c.uid),await this.authCredentialListener(c),this.user=c}),this.appCheckCredentials.start(i,c=>(O(_e,"Received new app check token=",c),this.appCheckCredentialListener(c,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();let e=new Nt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){let i=Ua(n,"Failed to shutdown persistence");e.reject(i)}}),e.promise}};async function qs(r,e){r.asyncQueue.verifyOperationInProgress(),O(_e,"Initializing OfflineComponentProvider");let n=r.configuration;await e.initialize(n);let i=n.initialUser;r.setCredentialChangeListener(async s=>{i.isEqual(s)||(await Eh(e.localStore,s),i=s)}),e.persistence.setDatabaseDeletedListener(()=>{pe("Terminating Firestore due to IndexedDb database deletion"),r.terminate().then(()=>{O("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(s=>{pe("Terminating Firestore due to IndexedDb database deletion failed",s)})}),r._offlineComponents=e}async function _l(r,e){r.asyncQueue.verifyOperationInProgress();let n=await tg(r);O(_e,"Initializing OnlineComponentProvider"),await e.initialize(n,r.configuration),r.setCredentialChangeListener(i=>fl(e.remoteStore,i)),r.setAppCheckTokenChangeListener((i,s)=>fl(e.remoteStore,s)),r._onlineComponents=e}async function tg(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){O(_e,"Using user provided OfflineComponentProvider");try{await qs(r,r._uninitializedComponentsProvider._offline)}catch(e){let n=e;if(!function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(n))throw n;pe("Error using user provided cache. Falling back to memory cache: "+n),await qs(r,new mn)}}else O(_e,"Using default OfflineComponentProvider"),await qs(r,new ga(void 0));return r._offlineComponents}async function Mh(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(O(_e,"Using user provided OnlineComponentProvider"),await _l(r,r._uninitializedComponentsProvider._online)):(O(_e,"Using default OnlineComponentProvider"),await _l(r,new ar))),r._onlineComponents}function eg(r){return Mh(r).then(e=>e.syncEngine)}async function _a(r){let e=await Mh(r),n=e.eventManager;return n.onListen=Up.bind(null,e.syncEngine),n.onUnlisten=$p.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=qp.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=Gp.bind(null,e.syncEngine),n}function ng(r,e,n={}){let i=new Nt;return r.asyncQueue.enqueueAndForget(async()=>function(a,c,l,d,f){let g=new Ii({next:I=>{g.Ou(),c.enqueueAndForget(()=>xh(a,w));let C=I.docs.has(l);!C&&I.fromCache?f.reject(new F(P.UNAVAILABLE,"Failed to get document because the client is offline.")):C&&I.fromCache&&d&&d.source==="server"?f.reject(new F(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):f.resolve(I)},error:I=>f.reject(I)}),w=new _i(xi(l.path),g,{includeMetadataChanges:!0,ka:!0});return Dh(a,w)}(await _a(r),r.asyncQueue,e,n,i)),i.promise}function Bh(r){let e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}var wl=new Map;var zh="firestore.googleapis.com",vl=!0,Ei=class{constructor(e){var n,i;if(e.host===void 0){if(e.ssl!==void 0)throw new F(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=zh,this.ssl=vl}else this.host=e.host,this.ssl=(n=e.ssl)!==null&&n!==void 0?n:vl;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Ih;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<yp)throw new F(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}mm("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Bh((i=e.experimentalLongPollingOptions)!==null&&i!==void 0?i:{}),function(a){if(a.timeoutSeconds!==void 0){if(isNaN(a.timeoutSeconds))throw new F(P.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (must not be NaN)`);if(a.timeoutSeconds<5)throw new F(P.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (minimum allowed value is 5)`);if(a.timeoutSeconds>30)throw new F(P.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(i,s){return i.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},cr=class{constructor(e,n,i,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=i,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ei({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new F(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new F(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ei(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(i){if(!i)return new js;switch(i.type){case"firstParty":return new Ws(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new F(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){let i=wl.get(n);i&&(O("ComponentProvider","Removing Datastore"),wl.delete(n),i.terminate())}(this),Promise.resolve()}};function Ga(r,e,n,i={}){var s;r=Ot(r,cr);let a=Lr(e),c=r._getSettings(),l=Object.assign(Object.assign({},c),{emulatorOptions:r._getEmulatorOptions()}),d=`${e}:${n}`;a&&(uu(`https://${d}`),hu("Firestore",!0)),c.host!==zh&&c.host!==d&&pe("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");let f=Object.assign(Object.assign({},c),{host:d,ssl:a,emulatorOptions:i});if(!je(f,l)&&(r._setSettings(f),i.mockUserToken)){let g,w;if(typeof i.mockUserToken=="string")g=i.mockUserToken,w=lt.MOCK_USER;else{g=lu(i.mockUserToken,(s=r._app)===null||s===void 0?void 0:s.options.projectId);let I=i.mockUserToken.sub||i.mockUserToken.user_id;if(!I)throw new F(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");w=new lt(I)}r._authCredentials=new $s(new Hr(g,w))}}var Ti=class r{constructor(e,n,i){this.converter=n,this._query=i,this.type="query",this.firestore=e}withConverter(e){return new r(this.firestore,e,this._query)}},ft=class r{constructor(e,n,i){this.converter=n,this._key=i,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ur(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new r(this.firestore,e,this._key)}toJSON(){return{type:r._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,i){if(dr(n,r._jsonSchema))return new r(e,i||null,new B(st.fromString(n.referencePath)))}};ft._jsonSchemaVersion="firestore/documentReference/1.0",ft._jsonSchema={type:ct("string",ft._jsonSchemaVersion),referencePath:ct("string")};var ur=class r extends Ti{constructor(e,n,i){super(e,n,xi(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new ft(this.firestore,null,new B(e))}withConverter(e){return new r(this.firestore,e,this._path)}};function qt(r,e,...n){if(r=Qt(r),arguments.length===1&&(e=Yn.newId()),fm("doc","path",e),r instanceof cr){let i=st.fromString(e,...n);return Bu(i),new ft(r,null,new B(i))}{if(!(r instanceof ft||r instanceof ur))throw new F(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let i=r._path.child(st.fromString(e,...n));return Bu(i),new ft(r.firestore,r instanceof ur?r.converter:null,new B(i))}}var Il="AsyncQueue",bi=class{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new fi(this,"async_queue_retry"),this.oc=()=>{let i=Us();i&&O(Il,"Visibility state changed to "+i.visibilityState),this.F_.y_()},this._c=e;let n=Us();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;let n=Us();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});let n=new Nt;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!_n(e))throw e;O(Il,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){let n=this._c.then(()=>(this.nc=!0,e().catch(i=>{throw this.tc=i,this.nc=!1,te("INTERNAL UNHANDLED ERROR: ",El(i)),i}).then(i=>(this.nc=!1,i))));return this._c=n,n}enqueueAfterDelay(e,n,i){this.ac(),this.sc.indexOf(e)>-1&&(n=0);let s=aa.createAndSchedule(this,e,n,i,a=>this.lc(a));return this.ec.push(s),s}ac(){this.tc&&M(47125,{hc:El(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(let n of this.ec)if(n.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((n,i)=>n.targetTimeMs-i.targetTimeMs);for(let n of this.ec)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){let n=this.ec.indexOf(e);this.ec.splice(n,1)}};function El(r){let e=r.message||"";return r.stack&&(e=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),e}function Tl(r){return function(n,i){if(typeof n!="object"||n===null)return!1;let s=n;for(let a of i)if(a in s&&typeof s[a]=="function")return!0;return!1}(r,["next","error","complete"])}var we=class extends cr{constructor(e,n,i,s){super(e,n,i,s),this.type="firestore",this._queue=new bi,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new bi(e),this._firestoreClient=void 0,await e}}};function Uh(r,e){let n=typeof r=="object"?r:Du(),i=typeof r=="string"?r:e||Zr,s=Ru(n,"firestore").getImmediate({identifier:i});if(!s._initialized){let a=cu("firestore");a&&Ga(s,...a)}return s}function Ka(r){if(r._terminated)throw new F(P.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||rg(r),r._firestoreClient}function rg(r){var e,n,i;let s=r._freezeSettings(),a=function(l,d,f,g){return new Ys(l,d,f,g.host,g.ssl,g.experimentalForceLongPolling,g.experimentalAutoDetectLongPolling,Bh(g.experimentalLongPollingOptions),g.useFetchStreams,g.isUsingEmulator)}(r._databaseId,((e=r._app)===null||e===void 0?void 0:e.options.appId)||"",r._persistenceKey,s);r._componentsProvider||!((n=s.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((i=s.localCache)===null||i===void 0)&&i._onlineComponentProvider)&&(r._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),r._firestoreClient=new ya(r._authCredentials,r._appCheckCredentials,r._queue,a,r._componentsProvider&&function(l){let d=l?._online.build();return{_offline:l?._offline.build(d),_online:d}}(r._componentsProvider))}var de=class r{constructor(e){this._byteString=e}static fromBase64String(e){try{return new r(wt.fromBase64String(e))}catch(n){throw new F(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new r(wt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:r._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(dr(e,r._jsonSchema))return r.fromBase64String(e.bytes)}};de._jsonSchemaVersion="firestore/bytes/1.0",de._jsonSchema={type:ct("string",de._jsonSchemaVersion),bytes:ct("string")};var pn=class{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new F(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new bt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};var lr=class{constructor(e){this._methodName=e}};var fe=class r{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new F(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new F(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return $(this._lat,e._lat)||$(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:r._jsonSchemaVersion}}static fromJSON(e){if(dr(e,r._jsonSchema))return new r(e.latitude,e.longitude)}};fe._jsonSchemaVersion="firestore/geoPoint/1.0",fe._jsonSchema={type:ct("string",fe._jsonSchemaVersion),latitude:ct("number"),longitude:ct("number")};var me=class r{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(i,s){if(i.length!==s.length)return!1;for(let a=0;a<i.length;++a)if(i[a]!==s[a])return!1;return!0}(this._values,e._values)}toJSON(){return{type:r._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(dr(e,r._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(n=>typeof n=="number"))return new r(e.vectorValues);throw new F(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}};me._jsonSchemaVersion="firestore/vectorValue/1.0",me._jsonSchema={type:ct("string",me._jsonSchemaVersion),vectorValues:ct("object")};var ig=/^__.*__$/,wa=class{constructor(e,n,i){this.data=e,this.fieldMask=n,this.fieldTransforms=i}toMutation(e,n){return this.fieldMask!==null?new Ut(e,this.data,this.fieldMask,n,this.fieldTransforms):new Oe(e,this.data,n,this.fieldTransforms)}},Ai=class{constructor(e,n,i){this.data=e,this.fieldMask=n,this.fieldTransforms=i}toMutation(e,n){return new Ut(e,this.data,this.fieldMask,n,this.fieldTransforms)}};function qh(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{Ec:r})}}var va=class r{constructor(e,n,i,s,a,c){this.settings=e,this.databaseId=n,this.serializer=i,this.ignoreUndefinedProperties=s,a===void 0&&this.Ac(),this.fieldTransforms=a||[],this.fieldMask=c||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new r(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var n;let i=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Rc({path:i,mc:!1});return s.fc(e),s}gc(e){var n;let i=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Rc({path:i,mc:!1});return s.Ac(),s}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return Si(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(qh(this.Ec)&&ig.test(e))throw this.wc('Document fields cannot begin and end with "__"')}},Ia=class{constructor(e,n,i){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=i||Ni(e)}Dc(e,n,i,s=!1){return new va({Ec:e,methodName:n,bc:i,path:bt.emptyPath(),mc:!1,Sc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function jh(r){let e=r._freezeSettings(),n=Ni(r._databaseId);return new Ia(r._databaseId,!!e.ignoreUndefinedProperties,n)}function sg(r,e,n,i,s,a={}){let c=r.Dc(a.merge||a.mergeFields?2:0,e,n,s);Wa("Data must be an object, but it was:",c,i);let l=$h(i,c),d,f;if(a.merge)d=new Rt(c.fieldMask),f=c.fieldTransforms;else if(a.mergeFields){let g=[];for(let w of a.mergeFields){let I=Ea(e,w,n);if(!c.contains(I))throw new F(P.INVALID_ARGUMENT,`Field '${I}' is specified in your field mask but missing from your input data.`);Kh(g,I)||g.push(I)}d=new Rt(g),f=c.fieldTransforms.filter(w=>d.covers(w.field))}else d=null,f=c.fieldTransforms;return new wa(new Tt(l),d,f)}var hr=class r extends lr{_toFieldTransform(e){if(e.Ec!==2)throw e.Ec===1?e.wc(`${this._methodName}() can only appear at the top level of your update data`):e.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof r}};function og(r,e,n,i){let s=r.Dc(1,e,n);Wa("Data must be an object, but it was:",s,i);let a=[],c=Tt.empty();ve(i,(d,f)=>{let g=Ha(e,d,n);f=Qt(f);let w=s.gc(g);if(f instanceof hr)a.push(g);else{let I=Fi(f,w);I!=null&&(a.push(g),c.set(g,I))}});let l=new Rt(a);return new Ai(c,l,s.fieldTransforms)}function ag(r,e,n,i,s,a){let c=r.Dc(1,e,n),l=[Ea(e,i,n)],d=[s];if(a.length%2!=0)throw new F(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let I=0;I<a.length;I+=2)l.push(Ea(e,a[I])),d.push(a[I+1]);let f=[],g=Tt.empty();for(let I=l.length-1;I>=0;--I)if(!Kh(f,l[I])){let C=l[I],x=d[I];x=Qt(x);let k=c.gc(C);if(x instanceof hr)f.push(C);else{let V=Fi(x,k);V!=null&&(f.push(C),g.set(C,V))}}let w=new Rt(f);return new Ai(g,w,c.fieldTransforms)}function Fi(r,e){if(Gh(r=Qt(r)))return Wa("Unsupported field value:",e,r),$h(r,e);if(r instanceof lr)return function(i,s){if(!qh(s.Ec))throw s.wc(`${i._methodName}() can only be used with update() and set()`);if(!s.path)throw s.wc(`${i._methodName}() is not currently supported inside arrays`);let a=i._toFieldTransform(s);a&&s.fieldTransforms.push(a)}(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return function(i,s){let a=[],c=0;for(let l of i){let d=Fi(l,s.yc(c));d==null&&(d={nullValue:"NULL_VALUE"}),a.push(d),c++}return{arrayValue:{values:a}}}(r,e)}return function(i,s){if((i=Qt(i))===null)return{nullValue:"NULL_VALUE"};if(typeof i=="number")return Km(s.serializer,i);if(typeof i=="boolean")return{booleanValue:i};if(typeof i=="string")return{stringValue:i};if(i instanceof Date){let a=X.fromDate(i);return{timestampValue:ai(s.serializer,a)}}if(i instanceof X){let a=new X(i.seconds,1e3*Math.floor(i.nanoseconds/1e3));return{timestampValue:ai(s.serializer,a)}}if(i instanceof fe)return{geoPointValue:{latitude:i.latitude,longitude:i.longitude}};if(i instanceof de)return{bytesValue:mh(s.serializer,i._byteString)};if(i instanceof ft){let a=s.databaseId,c=i.firestore._databaseId;if(!c.isEqual(a))throw s.wc(`Document reference is for database ${c.projectId}/${c.database} but should be for database ${a.projectId}/${a.database}`);return{referenceValue:Oa(i.firestore._databaseId||s.databaseId,i._key.path)}}if(i instanceof me)return function(c,l){return{mapValue:{fields:{[Pa]:{stringValue:Da},[nn]:{arrayValue:{values:c.toArray().map(f=>{if(typeof f!="number")throw l.wc("VectorValues must only contain numeric values.");return Na(l.serializer,f)})}}}}}}(i,s);throw s.wc(`Unsupported field value: ${Sa(i)}`)}(r,e)}function $h(r,e){let n={};return Ul(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):ve(r,(i,s)=>{let a=Fi(s,e.Vc(i));a!=null&&(n[i]=a)}),{mapValue:{fields:n}}}function Gh(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof X||r instanceof fe||r instanceof de||r instanceof ft||r instanceof lr||r instanceof me)}function Wa(r,e,n){if(!Gh(n)||!Sl(n)){let i=Sa(n);throw i==="an object"?e.wc(r+" a custom object"):e.wc(r+" "+i)}}function Ea(r,e,n){if((e=Qt(e))instanceof pn)return e._internalPath;if(typeof e=="string")return Ha(r,e);throw Si("Field path arguments must be of type string or ",r,!1,void 0,n)}var cg=new RegExp("[~\\*/\\[\\]]");function Ha(r,e,n){if(e.search(cg)>=0)throw Si(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,n);try{return new pn(...e.split("."))._internalPath}catch{throw Si(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,n)}}function Si(r,e,n,i,s){let a=i&&!i.isEmpty(),c=s!==void 0,l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let d="";return(a||c)&&(d+=" (found",a&&(d+=` in field ${i}`),c&&(d+=` in document ${s}`),d+=")"),new F(P.INVALID_ARGUMENT,l+r+d)}function Kh(r,e){return r.some(n=>n.isEqual(e))}var Ri=class{constructor(e,n,i,s,a){this._firestore=e,this._userDataWriter=n,this._key=i,this._document=s,this._converter=a}get id(){return this._key.path.lastSegment()}get ref(){return new ft(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new Ta(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let n=this._document.data.field(Wh("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}},Ta=class extends Ri{data(){return super.data()}};function Wh(r,e){return typeof e=="string"?Ha(r,e):e instanceof pn?e._internalPath:e._delegate._internalPath}function ug(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new F(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}var ba=class{convertValue(e,n="none"){switch(ge(e)){case 0:return null;case 1:return e.booleanValue;case 2:return nt(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(ne(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw M(62114,{value:e})}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){let i={};return ve(e,(s,a)=>{i[s]=this.convertValue(a,n)}),i}convertVectorValue(e){var n,i,s;let a=(s=(i=(n=e.fields)===null||n===void 0?void 0:n[nn].arrayValue)===null||i===void 0?void 0:i.values)===null||s===void 0?void 0:s.map(c=>nt(c.doubleValue));return new me(a)}convertGeoPoint(e){return new fe(nt(e.latitude),nt(e.longitude))}convertArray(e,n){return(e.values||[]).map(i=>this.convertValue(i,n))}convertServerTimestamp(e,n){switch(n){case"previous":let i=Di(e);return i==null?null:this.convertValue(i,n);case"estimate":return this.convertTimestamp(er(e));default:return null}}convertTimestamp(e){let n=ee(e);return new X(n.seconds,n.nanos)}convertDocumentKey(e,n){let i=st.fromString(e);J(vh(i),9688,{name:e});let s=new ti(i.get(1),i.get(3)),a=new B(i.popFirst(5));return s.isEqual(n)||te(`Document ${a} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),a}};function lg(r,e,n){let i;return i=r?n&&(n.merge||n.mergeFields)?r.toFirestore(e,n):r.toFirestore(e):e,i}var Pe=class{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},De=class r extends Ri{constructor(e,n,i,s,a,c){super(e,n,i,s,c),this._firestore=e,this._firestoreImpl=e,this.metadata=a}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let n=new Ye(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){let i=this._document.data.field(Wh("DocumentSnapshot.get",e));if(i!==null)return this._userDataWriter.convertValue(i,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new F(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e=this._document,n={};return n.type=r._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}};De._jsonSchemaVersion="firestore/documentSnapshot/1.0",De._jsonSchema={type:ct("string",De._jsonSchemaVersion),bundleSource:ct("string","DocumentSnapshot"),bundleName:ct("string"),bundle:ct("string")};var Ye=class extends De{data(e={}){return super.data(e)}},Ze=class r{constructor(e,n,i,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new Pe(s.hasPendingWrites,s.fromCache),this.query=i}get docs(){let e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(i=>{e.call(n,new Ye(this._firestore,this._userDataWriter,i.key,i,new Pe(this._snapshot.mutatedKeys.has(i.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new F(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,a){if(s._snapshot.oldDocs.isEmpty()){let c=0;return s._snapshot.docChanges.map(l=>{let d=new Ye(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Pe(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:d,oldIndex:-1,newIndex:c++}})}{let c=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>a||l.type!==3).map(l=>{let d=new Ye(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Pe(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter),f=-1,g=-1;return l.type!==0&&(f=c.indexOf(l.doc.key),c=c.delete(l.doc.key)),l.type!==1&&(c=c.add(l.doc),g=c.indexOf(l.doc.key)),{type:hg(l.type),doc:d,oldIndex:f,newIndex:g}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new F(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e={};e.type=r._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Yn.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;let n=[],i=[],s=[];return this.docs.forEach(a=>{a._document!==null&&(n.push(a._document),i.push(this._userDataWriter.convertObjectMap(a._document.data.value.mapValue.fields,"previous")),s.push(a.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}};function hg(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:r})}}function Hh(r){r=Ot(r,ft);let e=Ot(r.firestore,we);return ng(Ka(e),r._key).then(n=>Yh(e,r,n))}Ze._jsonSchemaVersion="firestore/querySnapshot/1.0",Ze._jsonSchema={type:ct("string",Ze._jsonSchemaVersion),bundleSource:ct("string","QuerySnapshot"),bundleName:ct("string"),bundle:ct("string")};var Ci=class extends ba{constructor(e){super(),this.firestore=e}convertBytes(e){return new de(e)}convertReference(e){let n=this.convertDocumentKey(e,this.firestore._databaseId);return new ft(this.firestore,null,n)}};function Qh(r,e,n){r=Ot(r,ft);let i=Ot(r.firestore,we),s=lg(r.converter,e,n);return Xh(i,[sg(jh(i),"setDoc",r._key,s,r.converter!==null,n).toMutation(r._key,he.none())])}function Ie(r,e,n,...i){r=Ot(r,ft);let s=Ot(r.firestore,we),a=jh(s),c;return c=typeof(e=Qt(e))=="string"||e instanceof pn?ag(a,"updateDoc",r._key,e,n,i):og(a,"updateDoc",r._key,e),Xh(s,[c.toMutation(r._key,he.exists(!0))])}function Jh(r,...e){var n,i,s;r=Qt(r);let a={includeMetadataChanges:!1,source:"default"},c=0;typeof e[c]!="object"||Tl(e[c])||(a=e[c++]);let l={includeMetadataChanges:a.includeMetadataChanges,source:a.source};if(Tl(e[c])){let w=e[c];e[c]=(n=w.next)===null||n===void 0?void 0:n.bind(w),e[c+1]=(i=w.error)===null||i===void 0?void 0:i.bind(w),e[c+2]=(s=w.complete)===null||s===void 0?void 0:s.bind(w)}let d,f,g;if(r instanceof ft)f=Ot(r.firestore,we),g=xi(r._key.path),d={next:w=>{e[c]&&e[c](Yh(f,r,w))},error:e[c+1],complete:e[c+2]};else{let w=Ot(r,Ti);f=Ot(w.firestore,we),g=w._query;let I=new Ci(f);d={next:C=>{e[c]&&e[c](new Ze(f,I,w,C))},error:e[c+1],complete:e[c+2]},ug(r._query)}return function(I,C,x,k){let V=new Ii(k),z=new _i(C,V,x);return I.asyncQueue.enqueueAndForget(async()=>Dh(await _a(I),z)),()=>{V.Ou(),I.asyncQueue.enqueueAndForget(async()=>xh(await _a(I),z))}}(Ka(f),g,l,d)}function Xh(r,e){return function(i,s){let a=new Nt;return i.asyncQueue.enqueueAndForget(async()=>Kp(await eg(i),s,a)),a.promise}(Ka(r),e)}function Yh(r,e,n){let i=n.docs.get(e._key),s=new Ci(r);return new De(r,s,e._key,i,new Pe(n.hasPendingWrites,n.fromCache),e.converter)}function Zh(){return new hr("deleteField")}(function(e,n=!0){(function(s){gn=s})(Pu),$n(new Jt("firestore",(i,{instanceIdentifier:s,options:a})=>{let c=i.getProvider("app").getImmediate(),l=new we(new Gs(i.getProvider("auth-internal")),new Hs(c,i.getProvider("app-check-internal")),function(f,g){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new F(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ti(f.options.projectId,g)}(c,s),c);return a=Object.assign({useFetchStreams:n},a),l._setSettings(a),l},"PUBLIC").setMultipleInstances(!0)),le(Ou,Lu,e),le(Ou,Lu,"esm2017")})();function td(r,e,n,i){if(!r)return{valid:!1,error:"empty"};if(r.length<4)return{valid:!1,error:"tooShort"};let s=e.letters[0].toLowerCase();if(!r.includes(s))return{valid:!1,error:"missingCenter"};let a=new Set(e.letters.map(d=>d.toLowerCase()));for(let d of r)if(!a.has(d))return{valid:!1,error:"badLetter"};if(!e.words.includes(r))return i&&i.has&&i.has(r)?{valid:!1,error:"notInWordList"}:{valid:!1,error:"notValidWord"};if(n.includes(r))return{valid:!1,error:"alreadyFound"};let c=new Set(r).size===7;return{valid:!0,score:r.length===4?1:r.length+(c?7:0),isPangram:c}}var Me=[{key:"beginner",pct:0},{key:"goodStart",pct:.02},{key:"movingUp",pct:.05},{key:"good",pct:.08},{key:"solid",pct:.15},{key:"niceLvl",pct:.25},{key:"great",pct:.4},{key:"amazing",pct:.5},{key:"genius",pct:.7},{key:"queenBee",pct:1}],Qa={en:{name:"English",flag:"\u{1F1FA}\u{1F1F8}",dailyName:"NYT Daily"},it:{name:"Italiano",flag:"\u{1F1EE}\u{1F1F9}",dailyName:"Apegramma"}};var dg={apiKey:"AIzaSyDummyKeyForFreeTier",projectId:"spelling-bee-relay-1025"},fg=Vs(dg),$t=Uh(fg),od=localStorage.getItem("sb_use_emulator")==="true";od&&(console.log("Using Firestore Emulator at 127.0.0.1:8080"),Ga($t,"127.0.0.1",8080));globalThis.switchMultiplayerEnv=()=>{let r=!od;localStorage.setItem("sb_use_emulator",r),location.reload()};var v={playerId:localStorage.getItem("sb_playerId")||crypto.randomUUID(),currentInput:"",foundWords:[],wordFinders:{},score:0,puzzle:null,puzzleId:null,language:localStorage.getItem("sb_language")||"en",attributionMode:0,multiplayer:{roomCode:null,nickname:localStorage.getItem("sb_nickname")||"",teammates:[],step:"nickname"},dbRefs:{}};localStorage.setItem("sb_playerId",v.playerId);window.state=v;var Ja=null,pr=null;function qi(){return v.language==="it"?typeof PUZZLES_IT<"u"?PUZZLES_IT:{}:PUZZLES}function mg(){return v.language==="it"?typeof VALID_WORDS_IT<"u"?VALID_WORDS_IT:new Set:VALID_WORDS}var L={input:document.getElementById("input-text"),cursor:document.querySelector(".cursor"),score:document.getElementById("score"),messageArea:document.getElementById("message-area"),levelText:document.getElementById("current-level"),wordsList:document.getElementById("words-list"),foundCount:document.getElementById("found-count"),toggleWordsBtn:document.getElementById("toggle-words-btn"),toggleAttributionBtn:document.getElementById("toggle-attribution-btn"),deleteBtn:document.getElementById("delete-btn"),enterBtn:document.getElementById("enter-btn"),restartBtn:document.getElementById("restart-btn"),shuffleBtn:document.getElementById("shuffle-btn"),dotsContainer:document.querySelector(".dots-container"),cells:{center:document.getElementById("cell-center"),outer:[document.getElementById("cell-1"),document.getElementById("cell-2"),document.getElementById("cell-3"),document.getElementById("cell-4"),document.getElementById("cell-5"),document.getElementById("cell-6")]},multi:{btn:document.getElementById("multiplayer-btn"),screen:document.getElementById("multiplayer-screen"),closeBtn:document.getElementById("close-multi-btn"),stepNickname:document.getElementById("multi-setup"),stepMenu:document.getElementById("multi-menu"),stepJoin:document.getElementById("multi-join"),stepActive:document.getElementById("multi-active"),nicknameInput:document.getElementById("nickname-input"),saveNicknameBtn:document.getElementById("save-nickname-btn"),createRoomBtn:document.getElementById("create-room-btn"),roomCodeInput:document.getElementById("room-code-input"),confirmJoinBtn:document.getElementById("join-confirm-btn"),backBtn:document.getElementById("join-back-btn"),leaveBtn:document.getElementById("leave-room-btn"),activeRoomCode:document.getElementById("active-room-code"),playerList:document.getElementById("player-list"),displayNickname:document.getElementById("display-nickname"),editNicknameMenu:document.getElementById("edit-nickname-menu"),editNicknameRoom:document.getElementById("edit-nickname-room"),banner:document.getElementById("multiplayer-banner"),bannerRoomCode:document.getElementById("banner-room-code"),shareRoomBtnMenu:document.getElementById("share-room-btn-menu"),shareRoomBtnActive:document.getElementById("share-room-btn-active"),shareBannerBtn:document.getElementById("share-banner-btn")}};document.addEventListener("DOMContentLoaded",pg);async function pg(){if(gg(),!v.puzzle)await ud();else{let n=qi();!v.puzzle&&n[v.puzzleId]&&(v.puzzle=n[v.puzzleId])}let e=new URLSearchParams(window.location.search).get("room");e?Bi(e,!1).catch(n=>{console.warn("Failed to join room from URL:",n),window.history.replaceState({},document.title,window.location.pathname)}):v.multiplayer.roomCode&&Bi(v.multiplayer.roomCode,!1).catch(()=>{v.multiplayer.roomCode=null,xt()}),yr(),jt(),Vt(),Ui(),In(),yg()}function gg(){let r=localStorage.getItem("sb_mobile_state");if(r){let e=JSON.parse(r);v={...v,...e}}}function xt(){localStorage.setItem("sb_mobile_state",JSON.stringify(v))}function Mi(r){if(typeof r=="string"&&r.startsWith("nyt-")){v.puzzleId!==r&&cd(!1);return}if(typeof r=="string"&&r.startsWith("apegramma-")){v.puzzleId!==r&&ld(!1);return}let n=qi()[r];if(n){let i=v.puzzleId!==r;v.puzzleId=r,v.puzzle=n,i&&(v.foundWords=[],v.score=0,v.currentInput=""),xt(),yr(),jt(),Vt()}}function ad(){let r=qi(),e=Object.keys(r);if(e.length===0)return;if(e.length===1){Mi(e[0]);return}let n,i=0,s=v.puzzleId;do n=e[Math.floor(Math.random()*e.length)],i++;while(n===s&&i<10);Mi(n),v.multiplayer.roomCode?zi(v.puzzleId):Dt(t("newRandomPuzzle"),1e3)}function yr(){if(!v.puzzle)return;L.cells.center.textContent=v.puzzle.letters[0].toUpperCase();let r=v.puzzle.letters.slice(1);L.cells.outer.forEach((e,n)=>{e.textContent=r[n].toUpperCase(),e.dataset.letter=r[n]})}function yg(){L.cells.center.onclick=()=>Xa(v.puzzle.letters[0]),L.cells.outer.forEach(n=>{n.onclick=()=>Xa(n.dataset.letter)}),L.deleteBtn.onclick=ed,L.enterBtn.onclick=nd,L.shuffleBtn.onclick=Rg,L.restartBtn.onclick=()=>{v.multiplayer.roomCode&&!confirm(t("confirmChangeGame"))||ad()},L.nytDailyBtn=document.getElementById("nyt-daily-btn"),L.nytDailyBtn.onclick=()=>{v.multiplayer.roomCode&&!confirm(t("confirmChangeGame"))||ud()};let r=document.getElementById("lang-btn"),e=document.getElementById("lang-menu");r&&e&&(r.onclick=n=>{n.stopPropagation(),e.classList.toggle("hidden")},e.querySelectorAll("button[data-lang]").forEach(n=>{n.onclick=()=>{let i=n.dataset.lang;e.classList.add("hidden"),i!==v.language&&wg(i),window.state=v}}),document.addEventListener("click",()=>{e.classList.add("hidden")})),L.levelContainer=document.querySelector(".level-container"),L.levelContainer.onclick=vg,L.levelContainer.style.cursor="pointer",L.multi.btn.onclick=vn,L.multi.closeBtn.onclick=()=>L.multi.screen.style.display="none",L.multi.saveNicknameBtn.onclick=id,L.multi.saveNicknameBtn.onclick=id,L.multi.createRoomBtn.onclick=hd,document.getElementById("join-room-btn").onclick=()=>{v.multiplayer.step="join",vn()},L.multi.confirmJoinBtn.onclick=Eg,L.multi.backBtn.onclick=()=>{v.multiplayer.step="menu",vn()},L.multi.leaveBtn.onclick=Ag,L.multi.shareRoomBtnMenu.onclick=Ya,L.multi.shareRoomBtnActive.onclick=Ya,L.multi.shareBannerBtn.onclick=Ya,L.toggleWordsBtn.onclick=()=>{let n=L.wordsList.classList.toggle("hidden");L.toggleWordsBtn.innerText=n?t("show"):t("hide")},L.toggleAttributionBtn.onclick=()=>{v.attributionMode=(v.attributionMode+1)%3,xt(),Vt()},L.multi.editNicknameMenu.onclick=n=>{n.preventDefault(),sd()},L.multi.editNicknameRoom.onclick=n=>{n.preventDefault(),sd()},document.addEventListener("keydown",n=>{if(n.target.tagName==="INPUT"||n.target.tagName==="TEXTAREA"||n.target.isContentEditable)return;let i=n.key.toLowerCase();i==="backspace"?(ed(),n.preventDefault()):i==="enter"?(nd(),n.preventDefault()):v.puzzle&&v.puzzle.letters.map(s=>s.toLowerCase()).includes(i)&&(Xa(i),n.preventDefault())})}function Xa(r){v.currentInput.length<20&&(v.currentInput+=r.toLowerCase(),L.input.innerText=v.currentInput)}function ed(){v.currentInput=v.currentInput.slice(0,-1),L.input.innerText=v.currentInput}function nd(){let r=v.currentInput;if(!r)return;let e=_g(r);e.valid?(v.foundWords.push(r),v.score+=e.score,v.foundWords.sort(),v.wordFinders[r]=v.playerId,xt(),jt(),Vt(),Dt(e.isPangram?t("pangram"):t("nice"),1500),Sg(r)):Dt(e.error,1e3),setTimeout(()=>{v.currentInput="",L.input.innerText=""},500)}function _g(r){let e=td(r,v.puzzle,v.foundWords,mg());return e.valid?e:{valid:!1,error:t(e.error)}}function Dt(r,e){L.messageArea.innerText=r,L.messageArea.classList.add("visible"),setTimeout(()=>L.messageArea.classList.remove("visible"),e)}function jt(){if(L.score.innerText=v.score,!v.puzzle)return;let r=v.puzzle.maxScore,e=0;Me.forEach((i,s)=>{v.score>=Math.floor(r*i.pct)&&(e=s)}),L.levelText.innerText=t(Me[e].key),L.dotsContainer.innerHTML="";let n=document.createElement("div");n.className="progress-line-fill",n.style.width=`${e/(Me.length-1)*100}%`,L.dotsContainer.appendChild(n),Me.forEach((i,s)=>{let a=document.createElement("div");a.className=`dot ${s<=e?"active":""} ${s===e?"current":""}`,a.style.left=`${s/(Me.length-1)*100}%`,L.dotsContainer.appendChild(a)})}function Vt(){L.foundCount.innerText=`${v.foundWords.length} ${v.foundWords.length!==1?t("words"):t("word")}`,L.wordsList.innerHTML="";let r=v.attributionMode,e=v.multiplayer.rawPlayers||{},n=["#f7da21","#4ecdc4","#ff6b6b","#a8e6cf","#dfe6e9","#fd79a8","#74b9ff"],i={},s=0;if(v.foundWords.forEach(a=>{let c=v.wordFinders[a];c&&!i[c]&&(i[c]=n[s++%n.length])}),r===0)v.foundWords.forEach(a=>{let c=document.createElement("span");c.innerText=a,c.className="found-word",L.wordsList.appendChild(c)});else if(r===1)v.foundWords.forEach(a=>{let c=v.wordFinders[a],l=i[c]||"#ccc",d=document.createElement("span");d.innerText=a,d.style.color=l,d.className="found-word",L.wordsList.appendChild(d)});else{let a={};v.foundWords.forEach(c=>{let l=v.wordFinders[c];a[l]||(a[l]=[]),a[l].push(c)}),Object.keys(a).sort((c,l)=>{if(c===v.playerId)return-1;if(l===v.playerId)return 1;let d=gr(c,e),f=gr(l,e);return d.localeCompare(f)}).forEach(c=>{let l=gr(c,e),d=i[c]||"#ccc",f=document.createElement("div");f.className="word-section",f.innerHTML=`<div class="word-section-header" style="color: ${d}">${l} (${a[c].length})</div><div class="word-section-words"></div>`,a[c].forEach(g=>{let w=document.createElement("span");w.innerText=g,w.style.color=d,w.className="found-word",f.querySelector(".word-section-words").appendChild(w)}),L.wordsList.appendChild(f)})}}function gr(r,e){if(!r)return t("unknown");let n=e[r];if(!n)return r.length>20?t("ghost"):r;let i=n.nickname||t("anonymous"),s=Object.entries(e).filter(([c,l])=>(l.nickname||"Anonymous")===i).sort(([c],[l])=>c.localeCompare(l));if(s.length<=1)return i;let a=s.findIndex(([c])=>c===r);return`${i} (#${a+1})`}async function cd(r=!0){try{let e="https://corsproxy.io/?",n=encodeURIComponent("https://nytbee.com/"),s=await(await fetch(e+n)).text(),a=new DOMParser().parseFromString(s,"text/html"),c=Array.from(a.querySelectorAll('a[id^="link-definition-"]')).map(x=>x.id.split("-").pop().toLowerCase());if(!c.length)throw new Error(t("noWordsFound"));let l=new Set(c[0].split(""));c.forEach(x=>{let k=new Set(x.split(""));l=new Set([...l].filter(V=>k.has(V)))});let d=Array.from(l)[0]?.toUpperCase();if(!d)throw new Error(t("centerLetterError"));let g=Array.from(a.querySelectorAll("script")).map(x=>x.textContent).join(" ").match(/\[\s*"[A-Z]"(?:\s*,\s*"[A-Z]"){6}\s*\]/gi)||[],w=null;for(let x of g){let k=x.match(/[A-Z]/gi).map(V=>V.toUpperCase());if(k.includes(d)){let V=k.filter(z=>z!==d);w=[d,...V];break}}if(!w)throw new Error(t("matchesLetterError"));let I="nyt-"+new Date().toISOString().split("T")[0],C=v.puzzleId!==I;v.puzzleId=I,v.puzzle={letters:w,words:c,maxScore:c.reduce((x,k)=>x+(k.length===4?1:k.length+(new Set(k).size===7?7:0)),0)},C&&(v.foundWords=[],v.score=0),xt(),yr(),jt(),Vt(),r&&v.multiplayer.roomCode&&zi(v.puzzleId)}catch(e){console.error("NYT Load Error:",e),Dt(t("nytLoadFailed"),2e3)}}async function ud(r=!0){v.language==="it"?await ld(r):await cd(r)}async function ld(r=!0){Dt(t("fetchingApegramma"),2e3);try{let e="https://corsproxy.io/?",n=encodeURIComponent("https://www.laregione.ch/giochi/apegramma"),i=await fetch(e+n);if(!i.ok)throw new Error("Fetch failed");let a=(await i.text()).match(/<div[^>]*id="jsonDati"[^>]*>(.*?)<\/div>/);if(!a)throw new Error("Data not found");let c=JSON.parse(a[1]);if(!c.data||!c.data.letters)throw new Error("Invalid data structure");let l=c.data,d=l.central.toLowerCase(),g=l.letters.toLowerCase().split(" ").map(z=>z.trim()).filter(z=>z).filter(z=>z!==d).sort(),w=[d,...g],I=Object.keys(l.validWords),C=0;I.forEach(z=>{let U=z.length===4?1:z.length;new Set(z).size===7&&(U+=7),C+=U});let k="apegramma-"+new Date().toISOString().split("T")[0],V=v.puzzleId!==k;v.puzzleId=k,v.puzzle={id:k,letters:w,words:I,maxScore:C,author:"Apegramma Daily"},V&&(v.foundWords=[],v.score=0,v.currentInput=""),xt(),yr(),jt(),Vt(),Ui(),In(),Dt(t("apegrammLoaded"),2e3),r&&v.multiplayer.roomCode&&zi(v.puzzleId)}catch(e){console.warn("Scraping failed, trying local fallback",e);try{let n=new Date,i=qi(),s=Object.keys(i).length;if(s===0)throw new Error("No Italian puzzles loaded");let a=(n.getFullYear()*366+n.getMonth()*31+n.getDate())%s,c=i[a],d="apegramma-"+new Date().toISOString().split("T")[0];v.puzzleId=d,v.puzzle={...c,id:d,author:"Apegramma Daily (Offline)"},v.foundWords=[],v.score=0,v.currentInput="",xt(),yr(),jt(),Vt(),Ui(),In(),Dt(t("apegrammLoaded"),2e3),r&&v.multiplayer.roomCode&&zi(v.puzzleId)}catch(n){console.error(n),Dt(t("errorLoadingApegramma"),3e3)}}}function wg(r){Qa[r]&&(v.multiplayer.roomCode&&v.multiplayer.step==="active"&&!confirm(t("confirmChangeGame"))||(v.language=r,localStorage.setItem("sb_language",r),v.foundWords=[],v.score=0,v.currentInput="",ad(),In()))}function In(){let r=Qa[v.language];if(!r)return;let e=document.getElementById("lang-flag");e&&(e.textContent=r.flag);let n=document.getElementById("nyt-daily-btn");n&&(n.title=r.dailyName);let i=(C,x)=>{let k=document.getElementById(C);k&&(k.innerText=t(x))},s=(C,x)=>{let k=document.getElementById(C);k&&(k.placeholder=t(x))},a=(C,x)=>{let k=document.getElementById(C);k&&(k.title=t(x))};a("multiplayer-btn","multiplayer"),a("lang-btn","language"),a("restart-btn","newRandomPuzzleTitle"),i("score-label","scoreLabel"),i("delete-btn","delete"),i("enter-btn","enter");let c=L.wordsList.classList.contains("hidden");L.toggleWordsBtn.textContent=c?t("show"):t("hide"),i("save-nickname-btn","continue"),i("create-room-btn","createRoom"),i("join-room-btn","joinRoomManually"),i("join-confirm-btn","join"),i("join-back-btn","back"),i("leave-room-btn","leaveRoom"),i("share-room-link-text-menu","shareRoomLink");let l=document.querySelector("#multi-setup p");l&&(l.innerText=t("chooseNickname"));let d=document.querySelector("#multi-join p");d&&(d.innerText=t("enterRoomCode"));let f=document.querySelector(".multi-header h3");f&&(f.innerText=t("multiplayer"));let g=document.querySelector(".modal-header h2");g&&(g.innerText=t("rankings")),i("logged-in-label","loggedInAs"),i("players-label","players"),i("room-code-label","roomCode"),i("banner-room-label","room"),i("edit-label-menu","edit"),i("edit-label-room","edit"),s("nickname-input","anonymous"),s("room-code-input","roomCode");let w=document.getElementById("share-banner-btn");w&&(w.title=t("shareRoomLink"));let I=document.getElementById("share-room-btn-active");I&&(I.title=t("shareRoomLink")),typeof jt=="function"&&jt()}function vg(){let r=document.getElementById("rankings-modal"),e=document.getElementById("rankings-list");e.innerHTML="";let n=document.createElement("div");n.className="ranking-row ranking-header",n.innerHTML=`
        <span class="rank-name">${t("rank")}</span>
        <span class="rank-score">${t("minimumScore")}</span>
    `,e.appendChild(n);let i=v.puzzle.maxScore;[...Me].reverse().forEach(s=>{let a=document.createElement("div");a.className=`ranking-row ${v.score>=Math.floor(i*s.pct)?"reached":""}`,a.innerHTML=`<span class="rank-name">${t(s.key)}</span><span class="rank-score">${Math.floor(i*s.pct)}</span>`,e.appendChild(a)}),r.style.display="block",window.onclick=s=>{s.target==r&&(r.style.display="none")},document.getElementById("close-rankings-btn").onclick=()=>{r.style.display="none"}}function Ig(){let r=["Happy","Lucky","Sunny","Cool","Bright","Swift","Calm"],e=["Bee","Hive","Honey","Comb","Wing","Pollen","Nectar"],n=Math.floor(Math.random()*99)+1,i=r[Math.floor(Math.random()*r.length)],s=e[Math.floor(Math.random()*e.length)];return`${i}-${s}-${n}`}async function Bi(r,e=!0){let n=r.toLowerCase().trim(),i=qt($t,"rooms",n),s=await Hh(i);if(!s.exists())throw new Error("Room not found");let a=X.fromMillis(Date.now()+168*60*60*1e3);await Ie(i,{[`players.${v.playerId}`]:{nickname:v.multiplayer.nickname,online:!0,lastActive:X.now()},expiresAt:a});let c=s.data();v.multiplayer.roomCode=n,v.multiplayer.displayCode=c.code||n,v.multiplayer.step="active",c.language&&c.language!==v.language&&(v.language=c.language,localStorage.setItem("sb_language",c.language),In()),c.puzzleId&&c.puzzleId!==v.puzzleId&&await Mi(c.puzzleId),c.foundWords&&(v.foundWords=Object.keys(c.foundWords),v.wordFinders={...c.foundWords},v.score=v.foundWords.reduce((l,d)=>{let f=dd(d);return l+(f.valid?f.score:0)},0),v.foundWords.sort(),Vt(),jt()),xt(),bg(n),Ui(),e&&vn(),window.location.search.includes("room=")&&window.history.replaceState({},document.title,window.location.pathname)}async function hd(){let r=Ig(),e=r.toLowerCase(),n=v.puzzle,i=X.fromMillis(Date.now()+168*60*60*1e3);await Qh(qt($t,"rooms",e),{code:r,puzzleId:v.puzzleId,language:v.language,createdAt:X.now(),expiresAt:i,players:{[v.playerId]:{nickname:v.multiplayer.nickname,online:!0,lastActive:X.now()}},foundWords:{}}),await Bi(r)}async function Ya(){if(!v.multiplayer.roomCode)try{await hd()}catch(i){console.error("Failed to create room for sharing:",i);return}let r=v.multiplayer.displayCode||v.multiplayer.roomCode.toUpperCase(),e=`${window.location.origin}${window.location.pathname}?room=${r}`,n=v.language==="it"?"Entra nella mia stanza di Spelling Bee!":"Join my Spelling Bee room!";navigator.share?navigator.share({title:"Spelling Bee Multiplayer",text:n,url:e}).catch(()=>rd(e)):rd(e)}function rd(r){navigator.clipboard.writeText(r).then(()=>{let e=v.language==="it"?"Link copiato negli appunti!":"Link copied to clipboard!";Dt(e,2e3)})}function Eg(){let r=L.multi.roomCodeInput.value.trim().toLowerCase();r&&Bi(r).catch(e=>Dt(t("roomNotFound"),2e3))}async function Tg(){if(!v.multiplayer.roomCode)return;let r=qt($t,"rooms",v.multiplayer.roomCode);try{await Ie(r,{[`players.${v.playerId}.online`]:!0,[`players.${v.playerId}.lastActive`]:X.now()})}catch(e){console.warn("Heartbeat failed:",e)}}function bg(r){Ja&&Ja(),pr&&clearInterval(pr),pr=setInterval(Tg,3e4),Ja=Jh(qt($t,"rooms",r),e=>{let n=e.data();if(n){if(v.multiplayer.rawPlayers=n.players||{},n.players){let i=Date.now();v.multiplayer.teammates=Object.entries(n.players).map(([s,a])=>{let c=a.lastActive?.toMillis?a.lastActive.toMillis():0,l=a.online&&i-c<9e4;return{playerId:s,nickname:a.nickname,online:l}}),Za()}else v.multiplayer.teammates=[],Za();if(n.foundWords){let i=!1;Object.keys(n.foundWords).forEach(s=>{let a=n.foundWords[s];if(v.wordFinders[s]=a,!v.foundWords.includes(s)&&(v.foundWords.push(s),i=!0,a!==v.playerId)){let c=gr(a,n.players||{});Dt(`${c} ${t("foundWord")} ${s}`,2e3)}}),(i||v.foundWords.length>0)&&(v.score=v.foundWords.reduce((s,a)=>{let c=dd(a);return s+(c.valid?c.score:0)},0),v.foundWords.sort(),xt(),Vt(),jt())}n.language&&n.language!==v.language&&(v.language=n.language,localStorage.setItem("sb_language",n.language),In()),n.puzzleId&&n.puzzleId!==v.puzzleId&&Mi(n.puzzleId)}})}function dd(r){if(!v.puzzle||!v.puzzle.words.includes(r))return{valid:!1};let e=new Set(r).size===7;return{valid:!0,score:r.length===4?1:r.length+(e?7:0)}}function Za(){L.multi.playerList.innerHTML="";let r=v.multiplayer.rawPlayers||{};v.multiplayer.teammates.forEach(e=>{let n=document.createElement("div");n.className=`player-item ${e.playerId===v.playerId?"self":""}`;let i=gr(e.playerId,r);n.innerHTML=`
            <div class="player-status ${e.online?"online":"offline"}"></div>
            <span>${i} ${e.playerId===v.playerId?`(${t("you")})`:""}</span>
        `,L.multi.playerList.appendChild(n)})}function vn(){L.multi.screen.style.display="flex",[L.multi.stepNickname,L.multi.stepMenu,L.multi.stepJoin,L.multi.stepActive].forEach(e=>e.classList.add("hidden")),v.multiplayer.step==="nickname"&&v.multiplayer.nickname&&(v.multiplayer.step="menu");let r=v.multiplayer.step;r==="nickname"?L.multi.stepNickname.classList.remove("hidden"):r==="menu"?(L.multi.stepMenu.classList.remove("hidden"),L.multi.displayNickname.innerText=v.multiplayer.nickname):r==="join"?L.multi.stepJoin.classList.remove("hidden"):r==="active"&&(L.multi.stepActive.classList.remove("hidden"),L.multi.activeRoomCode.innerText=v.multiplayer.displayCode||v.multiplayer.roomCode,Za())}function id(){let r=L.multi.nicknameInput.value.trim();if(r){if(v.multiplayer.nickname=r,localStorage.setItem("sb_nickname",r),v.multiplayer.roomCode){let e=qt($t,"rooms",v.multiplayer.roomCode);Ie(e,{[`players.${v.playerId}.nickname`]:r}).catch(n=>console.warn("Nickname update failed:",n))}v.multiplayer.step="menu",vn(),Vt()}}async function Ag(){if(confirm(t("leaveRoomConfirm"))){if(pr&&clearInterval(pr),v.multiplayer.roomCode){let r=qt($t,"rooms",v.multiplayer.roomCode);try{await Ie(r,{[`players.${v.playerId}`]:Zh()})}catch(e){console.warn("Error removing player on leave:",e)}}v.multiplayer.roomCode=null,v.multiplayer.step="menu",xt(),location.reload()}}function sd(){let r=prompt("New nickname:",v.multiplayer.nickname);if(r&&r.trim()){let e=r.trim();if(v.multiplayer.nickname=e,xt(),v.multiplayer.roomCode){let n=qt($t,"rooms",v.multiplayer.roomCode);Ie(n,{[`players.${v.playerId}.nickname`]:e}).catch(i=>console.warn("Nickname update failed:",i))}vn(),Vt()}}function Sg(r){if(v.multiplayer.roomCode){let e=X.fromMillis(Date.now()+6048e5);Ie(qt($t,"rooms",v.multiplayer.roomCode),{[`foundWords.${r}`]:v.playerId,expiresAt:e})}}async function zi(r){if(v.multiplayer.roomCode)try{let e=qt($t,"rooms",v.multiplayer.roomCode.toLowerCase()),n=X.fromMillis(Date.now()+168*60*60*1e3);await Ie(e,{puzzleId:r,language:v.language,foundWords:{},expiresAt:n})}catch(e){console.warn("Sync failed",e)}}function Ui(){v.multiplayer.roomCode?(L.multi.banner.classList.remove("hidden"),L.multi.bannerRoomCode.innerText=v.multiplayer.displayCode||v.multiplayer.roomCode):L.multi.banner.classList.add("hidden")}function Rg(){if(!v.puzzle)return;let r=v.puzzle.letters.slice(1);for(let e=r.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[r[e],r[n]]=[r[n],r[e]]}L.cells.outer.forEach((e,n)=>{e.textContent=r[n].toUpperCase(),e.dataset.letter=r[n]})}})();
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
