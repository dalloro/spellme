(()=>{var zu=()=>{};var Gu=function(n){let t=[],e=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?t[e++]=i:i<2048?(t[e++]=i>>6|192,t[e++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=i>>18|240,t[e++]=i>>12&63|128,t[e++]=i>>6&63|128,t[e++]=i&63|128):(t[e++]=i>>12|224,t[e++]=i>>6&63|128,t[e++]=i&63|128)}return t},Rd=function(n){let t=[],e=0,r=0;for(;e<n.length;){let i=n[e++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){let o=n[e++];t[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){let o=n[e++],a=n[e++],l=n[e++],h=((i&7)<<18|(o&63)<<12|(a&63)<<6|l&63)-65536;t[r++]=String.fromCharCode(55296+(h>>10)),t[r++]=String.fromCharCode(56320+(h&1023))}else{let o=n[e++],a=n[e++];t[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|a&63)}}return t.join("")},Ku={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){let o=n[i],a=i+1<n.length,l=a?n[i+1]:0,h=i+2<n.length,f=h?n[i+2]:0,p=o>>2,w=(o&3)<<4|l>>4,T=(l&15)<<2|f>>6,S=f&63;h||(S=64,a||(T=64)),r.push(e[p],e[w],e[T],e[S])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(Gu(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Rd(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();let e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){let o=e[n.charAt(i++)],l=i<n.length?e[n.charAt(i)]:0;++i;let f=i<n.length?e[n.charAt(i)]:64;++i;let w=i<n.length?e[n.charAt(i)]:64;if(++i,o==null||l==null||f==null||w==null)throw new es;let T=o<<2|l>>4;if(r.push(T),f!==64){let S=l<<4&240|f>>2;if(r.push(S),w!==64){let x=f<<6&192|w;r.push(x)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},es=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Cd=function(n){let t=Gu(n);return Ku.encodeByteArray(t,!0)},Fn=function(n){return Cd(n).replace(/\./g,"")},Wu=function(n){try{return Ku.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};function Qu(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var Pd=()=>Qu().__FIREBASE_DEFAULTS__,Dd=()=>{if(typeof process>"u"||typeof process.env>"u")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},xd=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let t=n&&Wu(n[1]);return t&&JSON.parse(t)},ns=()=>{try{return zu()||Pd()||Dd()||xd()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Vd=n=>{var t,e;return(e=(t=ns())===null||t===void 0?void 0:t.emulatorHosts)===null||e===void 0?void 0:e[n]},Hu=n=>{let t=Vd(n);if(!t)return;let e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);let r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},rs=()=>{var n;return(n=ns())===null||n===void 0?void 0:n.config};var Rr=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}};function Cr(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ju(n){return(await fetch(n,{credentials:"include"})).ok}function Xu(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let e={alg:"none",type:"JWT"},r=t||"demo-project",i=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Fn(JSON.stringify(e)),Fn(JSON.stringify(a)),""].join(".")}var On={};function Nd(){let n={prod:[],emulator:[]};for(let t of Object.keys(On))On[t]?n.emulator.push(t):n.prod.push(t);return n}function kd(n){let t=document.getElementById(n),e=!1;return t||(t=document.createElement("div"),t.setAttribute("id",n),e=!0),{created:e,element:t}}var ju=!1;function Yu(n,t){if(typeof window>"u"||typeof document>"u"||!Cr(window.location.host)||On[n]===t||On[n]||ju)return;On[n]=t;function e(T){return`__firebase__banner__${T}`}let r="__firebase__banner",o=Nd().prod.length>0;function a(){let T=document.getElementById(r);T&&T.remove()}function l(T){T.style.display="flex",T.style.background="#7faaf0",T.style.position="fixed",T.style.bottom="5px",T.style.left="5px",T.style.padding=".5em",T.style.borderRadius="5px",T.style.alignItems="center"}function h(T,S){T.setAttribute("width","24"),T.setAttribute("id",S),T.setAttribute("height","24"),T.setAttribute("viewBox","0 0 24 24"),T.setAttribute("fill","none"),T.style.marginLeft="-6px"}function f(){let T=document.createElement("span");return T.style.cursor="pointer",T.style.marginLeft="16px",T.style.fontSize="24px",T.innerHTML=" &times;",T.onclick=()=>{ju=!0,a()},T}function p(T,S){T.setAttribute("id",S),T.innerText="Learn more",T.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",T.setAttribute("target","__blank"),T.style.paddingLeft="5px",T.style.textDecoration="underline"}function w(){let T=kd(r),S=e("text"),x=document.getElementById(S)||document.createElement("span"),k=e("learnmore"),V=document.getElementById(k)||document.createElement("a"),j=e("preprendIcon"),q=document.getElementById(j)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(T.created){let $=T.element;l($),p(V,k);let Z=f();h(q,j),$.append(q,x,V,Z),document.body.appendChild($)}o?(x.innerText="Preview backend disconnected.",q.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(q.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,x.innerText="Preview backend running in this workspace."),x.setAttribute("id",S)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",w):w()}function Zu(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Od(){var n;let t=(n=ns())===null||n===void 0?void 0:n.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function tc(){return!Od()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function is(){try{return typeof indexedDB=="object"}catch{return!1}}function ec(){return new Promise((n,t)=>{try{let e=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{e=!1},i.onerror=()=>{var o;t(((o=i.error)===null||o===void 0?void 0:o.message)||"")}}catch(e){t(e)}})}var Fd="FirebaseError",Ut=class n extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=Fd,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Mn.prototype.create)}},Mn=class{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){let r=e[0]||{},i=`${this.service}/${t}`,o=this.errors[t],a=o?Md(o,r):"Error",l=`${this.serviceName}: ${a} (${i}).`;return new Ut(i,l,r)}};function Md(n,t){return n.replace(Ld,(e,r)=>{let i=t[r];return i!=null?String(i):`<${r}?>`})}var Ld=/\{\$([^}]+)}/g;function Fe(n,t){if(n===t)return!0;let e=Object.keys(n),r=Object.keys(t);for(let i of e){if(!r.includes(i))return!1;let o=n[i],a=t[i];if($u(o)&&$u(a)){if(!Fe(o,a))return!1}else if(o!==a)return!1}for(let i of r)if(!e.includes(i))return!1;return!0}function $u(n){return n!==null&&typeof n=="object"}var lg=4*60*60*1e3;function qt(n){return n&&n._delegate?n._delegate:n}var zt=class{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}};var _e="[DEFAULT]";var ss=class{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){let e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){let r=new Rr;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:e});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;let r=this.normalizeInstanceIdentifier(t?.identifier),i=(e=t?.optional)!==null&&e!==void 0?e:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(i)return null;throw o}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Ud(t))try{this.getOrInitializeService({instanceIdentifier:_e})}catch{}for(let[e,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(e);try{let o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch{}}}}clearInstance(t=_e){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){let t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=_e){return this.instances.has(t)}getOptions(t=_e){return this.instancesOptions.get(t)||{}}initialize(t={}){let{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:e});for(let[o,a]of this.instancesDeferred.entries()){let l=this.normalizeInstanceIdentifier(o);r===l&&a.resolve(i)}return i}onInit(t,e){var r;let i=this.normalizeInstanceIdentifier(e),o=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;o.add(t),this.onInitCallbacks.set(i,o);let a=this.instances.get(i);return a&&t(a,i),()=>{o.delete(t)}}invokeOnInitCallbacks(t,e){let r=this.onInitCallbacks.get(e);if(r)for(let i of r)try{i(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Bd(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=_e){return this.component?this.component.multipleInstances?t:_e:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function Bd(n){return n===_e?void 0:n}function Ud(n){return n.instantiationMode==="EAGER"}var Pr=class{constructor(t){this.name=t,this.providers=new Map}addComponent(t){let e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);let e=new ss(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}};var qd=[],K;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(K||(K={}));var zd={debug:K.DEBUG,verbose:K.VERBOSE,info:K.INFO,warn:K.WARN,error:K.ERROR,silent:K.SILENT},jd=K.INFO,$d={[K.DEBUG]:"log",[K.VERBOSE]:"log",[K.INFO]:"info",[K.WARN]:"warn",[K.ERROR]:"error"},Gd=(n,t,...e)=>{if(t<n.logLevel)return;let r=new Date().toISOString(),i=$d[t];if(i)console[i](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)},Me=class{constructor(t){this.name=t,this._logLevel=jd,this._logHandler=Gd,this._userLogHandler=null,qd.push(this)}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in K))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?zd[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,K.DEBUG,...t),this._logHandler(this,K.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,K.VERBOSE,...t),this._logHandler(this,K.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,K.INFO,...t),this._logHandler(this,K.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,K.WARN,...t),this._logHandler(this,K.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,K.ERROR,...t),this._logHandler(this,K.ERROR,...t)}};var Kd=(n,t)=>t.some(e=>n instanceof e),nc,rc;function Wd(){return nc||(nc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Qd(){return rc||(rc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var ic=new WeakMap,as=new WeakMap,sc=new WeakMap,os=new WeakMap,cs=new WeakMap;function Hd(n){let t=new Promise((e,r)=>{let i=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{e(Pt(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",o),n.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&ic.set(e,n)}).catch(()=>{}),cs.set(t,n),t}function Jd(n){if(as.has(n))return;let t=new Promise((e,r)=>{let i=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{e(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});as.set(n,t)}var us={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return as.get(n);if(t==="objectStoreNames")return n.objectStoreNames||sc.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return Pt(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function oc(n){us=n(us)}function Xd(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){let r=n.call(Dr(this),t,...e);return sc.set(r,t.sort?t.sort():[t]),Pt(r)}:Qd().includes(n)?function(...t){return n.apply(Dr(this),t),Pt(ic.get(this))}:function(...t){return Pt(n.apply(Dr(this),t))}}function Yd(n){return typeof n=="function"?Xd(n):(n instanceof IDBTransaction&&Jd(n),Kd(n,Wd())?new Proxy(n,us):n)}function Pt(n){if(n instanceof IDBRequest)return Hd(n);if(os.has(n))return os.get(n);let t=Yd(n);return t!==n&&(os.set(n,t),cs.set(t,n)),t}var Dr=n=>cs.get(n);function uc(n,t,{blocked:e,upgrade:r,blocking:i,terminated:o}={}){let a=indexedDB.open(n,t),l=Pt(a);return r&&a.addEventListener("upgradeneeded",h=>{r(Pt(a.result),h.oldVersion,h.newVersion,Pt(a.transaction),h)}),e&&a.addEventListener("blocked",h=>e(h.oldVersion,h.newVersion,h)),l.then(h=>{o&&h.addEventListener("close",()=>o()),i&&h.addEventListener("versionchange",f=>i(f.oldVersion,f.newVersion,f))}).catch(()=>{}),l}var Zd=["get","getKey","getAll","getAllKeys","count"],tf=["put","add","delete","clear"],ls=new Map;function ac(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(ls.get(t))return ls.get(t);let e=t.replace(/FromIndex$/,""),r=t!==e,i=tf.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Zd.includes(e)))return;let o=async function(a,...l){let h=this.transaction(a,i?"readwrite":"readonly"),f=h.store;return r&&(f=f.index(l.shift())),(await Promise.all([f[e](...l),i&&h.done]))[0]};return ls.set(t,o),o}oc(n=>({...n,get:(t,e,r)=>ac(t,e)||n.get(t,e,r),has:(t,e)=>!!ac(t,e)||n.has(t,e)}));var ds=class{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(ef(e)){let r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}};function ef(n){let t=n.getComponent();return t?.type==="VERSION"}var fs="@firebase/app",cc="0.13.2";var jt=new Me("@firebase/app"),nf="@firebase/app-compat",rf="@firebase/analytics-compat",sf="@firebase/analytics",of="@firebase/app-check-compat",af="@firebase/app-check",uf="@firebase/auth",cf="@firebase/auth-compat",lf="@firebase/database",hf="@firebase/data-connect",df="@firebase/database-compat",ff="@firebase/functions",mf="@firebase/functions-compat",pf="@firebase/installations",gf="@firebase/installations-compat",yf="@firebase/messaging",_f="@firebase/messaging-compat",wf="@firebase/performance",vf="@firebase/performance-compat",Ef="@firebase/remote-config",If="@firebase/remote-config-compat",Tf="@firebase/storage",bf="@firebase/storage-compat",Af="@firebase/firestore",Sf="@firebase/ai",Rf="@firebase/firestore-compat",Cf="firebase",Pf="11.10.0";var ms="[DEFAULT]",Df={[fs]:"fire-core",[nf]:"fire-core-compat",[sf]:"fire-analytics",[rf]:"fire-analytics-compat",[af]:"fire-app-check",[of]:"fire-app-check-compat",[uf]:"fire-auth",[cf]:"fire-auth-compat",[lf]:"fire-rtdb",[hf]:"fire-data-connect",[df]:"fire-rtdb-compat",[ff]:"fire-fn",[mf]:"fire-fn-compat",[pf]:"fire-iid",[gf]:"fire-iid-compat",[yf]:"fire-fcm",[_f]:"fire-fcm-compat",[wf]:"fire-perf",[vf]:"fire-perf-compat",[Ef]:"fire-rc",[If]:"fire-rc-compat",[Tf]:"fire-gcs",[bf]:"fire-gcs-compat",[Af]:"fire-fst",[Rf]:"fire-fst-compat",[Sf]:"fire-vertex","fire-js":"fire-js",[Cf]:"fire-js-all"};var xr=new Map,xf=new Map,ps=new Map;function lc(n,t){try{n.container.addComponent(t)}catch(e){jt.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function Ln(n){let t=n.name;if(ps.has(t))return jt.debug(`There were multiple attempts to register component ${t}.`),!1;ps.set(t,n);for(let e of xr.values())lc(e,n);for(let e of xf.values())lc(e,n);return!0}function mc(n,t){let e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function pc(n){return n==null?!1:n.settings!==void 0}var Vf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ne=new Mn("app","Firebase",Vf);var gs=class{constructor(t,e,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new zt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw ne.create("app-deleted",{appName:this._name})}};var gc=Pf;function ws(n,t={}){let e=n;typeof t!="object"&&(t={name:t});let r=Object.assign({name:ms,automaticDataCollectionEnabled:!0},t),i=r.name;if(typeof i!="string"||!i)throw ne.create("bad-app-name",{appName:String(i)});if(e||(e=rs()),!e)throw ne.create("no-options");let o=xr.get(i);if(o){if(Fe(e,o.options)&&Fe(r,o.config))return o;throw ne.create("duplicate-app",{appName:i})}let a=new Pr(i);for(let h of ps.values())a.addComponent(h);let l=new gs(e,r,a);return xr.set(i,l),l}function yc(n=ms){let t=xr.get(n);if(!t&&n===ms&&rs())return ws();if(!t)throw ne.create("no-app",{appName:n});return t}function re(n,t,e){var r;let i=(r=Df[n])!==null&&r!==void 0?r:n;e&&(i+=`-${e}`);let o=i.match(/\s|\//),a=t.match(/\s|\//);if(o||a){let l=[`Unable to register library "${i}" with version "${t}":`];o&&l.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&a&&l.push("and"),a&&l.push(`version name "${t}" contains illegal characters (whitespace or "/")`),jt.warn(l.join(" "));return}Ln(new zt(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}var Nf="firebase-heartbeat-database",kf=1,Bn="firebase-heartbeat-store",hs=null;function _c(){return hs||(hs=uc(Nf,kf,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(Bn)}catch(e){console.warn(e)}}}}).catch(n=>{throw ne.create("idb-open",{originalErrorMessage:n.message})})),hs}async function Of(n){try{let e=(await _c()).transaction(Bn),r=await e.objectStore(Bn).get(wc(n));return await e.done,r}catch(t){if(t instanceof Ut)jt.warn(t.message);else{let e=ne.create("idb-get",{originalErrorMessage:t?.message});jt.warn(e.message)}}}async function hc(n,t){try{let r=(await _c()).transaction(Bn,"readwrite");await r.objectStore(Bn).put(t,wc(n)),await r.done}catch(e){if(e instanceof Ut)jt.warn(e.message);else{let r=ne.create("idb-set",{originalErrorMessage:e?.message});jt.warn(r.message)}}}function wc(n){return`${n.name}!${n.options.appId}`}var Ff=1024,Mf=30,ys=class{constructor(t){this.container=t,this._heartbeatsCache=null;let e=this.container.getProvider("app").getImmediate();this._storage=new _s(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{let i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=dc();if(((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats.length>Mf){let a=Bf(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){jt.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let e=dc(),{heartbeatsToSend:r,unsentEntries:i}=Lf(this._heartbeatsCache.heartbeats),o=Fn(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return jt.warn(e),""}}};function dc(){return new Date().toISOString().substring(0,10)}function Lf(n,t=Ff){let e=[],r=n.slice();for(let i of n){let o=e.find(a=>a.agent===i.agent);if(o){if(o.dates.push(i.date),fc(e)>t){o.dates.pop();break}}else if(e.push({agent:i.agent,dates:[i.date]}),fc(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}var _s=class{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return is()?ec().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let e=await Of(this.app);return e?.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){let i=await this.read();return hc(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:i.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var e;if(await this._canUseIndexedDBPromise){let i=await this.read();return hc(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...t.heartbeats]})}else return}};function fc(n){return Fn(JSON.stringify({version:2,heartbeats:n})).length}function Bf(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}function Uf(n){Ln(new zt("platform-logger",t=>new ds(t),"PRIVATE")),Ln(new zt("heartbeat",t=>new ys(t),"PRIVATE")),re(fs,cc,n),re(fs,cc,"esm2017"),re("fire-js","")}Uf("");var qf="firebase",zf="11.10.0";re(qf,zf,"app");var vc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Ec={};var $t,vs;(function(){var n;function t(E,m){function y(){}y.prototype=m.prototype,E.D=m.prototype,E.prototype=new y,E.prototype.constructor=E,E.C=function(_,v,b){for(var g=Array(arguments.length-2),Mt=2;Mt<arguments.length;Mt++)g[Mt-2]=arguments[Mt];return m.prototype[v].apply(_,g)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(r,e),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,m,y){y||(y=0);var _=Array(16);if(typeof m=="string")for(var v=0;16>v;++v)_[v]=m.charCodeAt(y++)|m.charCodeAt(y++)<<8|m.charCodeAt(y++)<<16|m.charCodeAt(y++)<<24;else for(v=0;16>v;++v)_[v]=m[y++]|m[y++]<<8|m[y++]<<16|m[y++]<<24;m=E.g[0],y=E.g[1],v=E.g[2];var b=E.g[3],g=m+(b^y&(v^b))+_[0]+3614090360&4294967295;m=y+(g<<7&4294967295|g>>>25),g=b+(v^m&(y^v))+_[1]+3905402710&4294967295,b=m+(g<<12&4294967295|g>>>20),g=v+(y^b&(m^y))+_[2]+606105819&4294967295,v=b+(g<<17&4294967295|g>>>15),g=y+(m^v&(b^m))+_[3]+3250441966&4294967295,y=v+(g<<22&4294967295|g>>>10),g=m+(b^y&(v^b))+_[4]+4118548399&4294967295,m=y+(g<<7&4294967295|g>>>25),g=b+(v^m&(y^v))+_[5]+1200080426&4294967295,b=m+(g<<12&4294967295|g>>>20),g=v+(y^b&(m^y))+_[6]+2821735955&4294967295,v=b+(g<<17&4294967295|g>>>15),g=y+(m^v&(b^m))+_[7]+4249261313&4294967295,y=v+(g<<22&4294967295|g>>>10),g=m+(b^y&(v^b))+_[8]+1770035416&4294967295,m=y+(g<<7&4294967295|g>>>25),g=b+(v^m&(y^v))+_[9]+2336552879&4294967295,b=m+(g<<12&4294967295|g>>>20),g=v+(y^b&(m^y))+_[10]+4294925233&4294967295,v=b+(g<<17&4294967295|g>>>15),g=y+(m^v&(b^m))+_[11]+2304563134&4294967295,y=v+(g<<22&4294967295|g>>>10),g=m+(b^y&(v^b))+_[12]+1804603682&4294967295,m=y+(g<<7&4294967295|g>>>25),g=b+(v^m&(y^v))+_[13]+4254626195&4294967295,b=m+(g<<12&4294967295|g>>>20),g=v+(y^b&(m^y))+_[14]+2792965006&4294967295,v=b+(g<<17&4294967295|g>>>15),g=y+(m^v&(b^m))+_[15]+1236535329&4294967295,y=v+(g<<22&4294967295|g>>>10),g=m+(v^b&(y^v))+_[1]+4129170786&4294967295,m=y+(g<<5&4294967295|g>>>27),g=b+(y^v&(m^y))+_[6]+3225465664&4294967295,b=m+(g<<9&4294967295|g>>>23),g=v+(m^y&(b^m))+_[11]+643717713&4294967295,v=b+(g<<14&4294967295|g>>>18),g=y+(b^m&(v^b))+_[0]+3921069994&4294967295,y=v+(g<<20&4294967295|g>>>12),g=m+(v^b&(y^v))+_[5]+3593408605&4294967295,m=y+(g<<5&4294967295|g>>>27),g=b+(y^v&(m^y))+_[10]+38016083&4294967295,b=m+(g<<9&4294967295|g>>>23),g=v+(m^y&(b^m))+_[15]+3634488961&4294967295,v=b+(g<<14&4294967295|g>>>18),g=y+(b^m&(v^b))+_[4]+3889429448&4294967295,y=v+(g<<20&4294967295|g>>>12),g=m+(v^b&(y^v))+_[9]+568446438&4294967295,m=y+(g<<5&4294967295|g>>>27),g=b+(y^v&(m^y))+_[14]+3275163606&4294967295,b=m+(g<<9&4294967295|g>>>23),g=v+(m^y&(b^m))+_[3]+4107603335&4294967295,v=b+(g<<14&4294967295|g>>>18),g=y+(b^m&(v^b))+_[8]+1163531501&4294967295,y=v+(g<<20&4294967295|g>>>12),g=m+(v^b&(y^v))+_[13]+2850285829&4294967295,m=y+(g<<5&4294967295|g>>>27),g=b+(y^v&(m^y))+_[2]+4243563512&4294967295,b=m+(g<<9&4294967295|g>>>23),g=v+(m^y&(b^m))+_[7]+1735328473&4294967295,v=b+(g<<14&4294967295|g>>>18),g=y+(b^m&(v^b))+_[12]+2368359562&4294967295,y=v+(g<<20&4294967295|g>>>12),g=m+(y^v^b)+_[5]+4294588738&4294967295,m=y+(g<<4&4294967295|g>>>28),g=b+(m^y^v)+_[8]+2272392833&4294967295,b=m+(g<<11&4294967295|g>>>21),g=v+(b^m^y)+_[11]+1839030562&4294967295,v=b+(g<<16&4294967295|g>>>16),g=y+(v^b^m)+_[14]+4259657740&4294967295,y=v+(g<<23&4294967295|g>>>9),g=m+(y^v^b)+_[1]+2763975236&4294967295,m=y+(g<<4&4294967295|g>>>28),g=b+(m^y^v)+_[4]+1272893353&4294967295,b=m+(g<<11&4294967295|g>>>21),g=v+(b^m^y)+_[7]+4139469664&4294967295,v=b+(g<<16&4294967295|g>>>16),g=y+(v^b^m)+_[10]+3200236656&4294967295,y=v+(g<<23&4294967295|g>>>9),g=m+(y^v^b)+_[13]+681279174&4294967295,m=y+(g<<4&4294967295|g>>>28),g=b+(m^y^v)+_[0]+3936430074&4294967295,b=m+(g<<11&4294967295|g>>>21),g=v+(b^m^y)+_[3]+3572445317&4294967295,v=b+(g<<16&4294967295|g>>>16),g=y+(v^b^m)+_[6]+76029189&4294967295,y=v+(g<<23&4294967295|g>>>9),g=m+(y^v^b)+_[9]+3654602809&4294967295,m=y+(g<<4&4294967295|g>>>28),g=b+(m^y^v)+_[12]+3873151461&4294967295,b=m+(g<<11&4294967295|g>>>21),g=v+(b^m^y)+_[15]+530742520&4294967295,v=b+(g<<16&4294967295|g>>>16),g=y+(v^b^m)+_[2]+3299628645&4294967295,y=v+(g<<23&4294967295|g>>>9),g=m+(v^(y|~b))+_[0]+4096336452&4294967295,m=y+(g<<6&4294967295|g>>>26),g=b+(y^(m|~v))+_[7]+1126891415&4294967295,b=m+(g<<10&4294967295|g>>>22),g=v+(m^(b|~y))+_[14]+2878612391&4294967295,v=b+(g<<15&4294967295|g>>>17),g=y+(b^(v|~m))+_[5]+4237533241&4294967295,y=v+(g<<21&4294967295|g>>>11),g=m+(v^(y|~b))+_[12]+1700485571&4294967295,m=y+(g<<6&4294967295|g>>>26),g=b+(y^(m|~v))+_[3]+2399980690&4294967295,b=m+(g<<10&4294967295|g>>>22),g=v+(m^(b|~y))+_[10]+4293915773&4294967295,v=b+(g<<15&4294967295|g>>>17),g=y+(b^(v|~m))+_[1]+2240044497&4294967295,y=v+(g<<21&4294967295|g>>>11),g=m+(v^(y|~b))+_[8]+1873313359&4294967295,m=y+(g<<6&4294967295|g>>>26),g=b+(y^(m|~v))+_[15]+4264355552&4294967295,b=m+(g<<10&4294967295|g>>>22),g=v+(m^(b|~y))+_[6]+2734768916&4294967295,v=b+(g<<15&4294967295|g>>>17),g=y+(b^(v|~m))+_[13]+1309151649&4294967295,y=v+(g<<21&4294967295|g>>>11),g=m+(v^(y|~b))+_[4]+4149444226&4294967295,m=y+(g<<6&4294967295|g>>>26),g=b+(y^(m|~v))+_[11]+3174756917&4294967295,b=m+(g<<10&4294967295|g>>>22),g=v+(m^(b|~y))+_[2]+718787259&4294967295,v=b+(g<<15&4294967295|g>>>17),g=y+(b^(v|~m))+_[9]+3951481745&4294967295,E.g[0]=E.g[0]+m&4294967295,E.g[1]=E.g[1]+(v+(g<<21&4294967295|g>>>11))&4294967295,E.g[2]=E.g[2]+v&4294967295,E.g[3]=E.g[3]+b&4294967295}r.prototype.u=function(E,m){m===void 0&&(m=E.length);for(var y=m-this.blockSize,_=this.B,v=this.h,b=0;b<m;){if(v==0)for(;b<=y;)i(this,E,b),b+=this.blockSize;if(typeof E=="string"){for(;b<m;)if(_[v++]=E.charCodeAt(b++),v==this.blockSize){i(this,_),v=0;break}}else for(;b<m;)if(_[v++]=E[b++],v==this.blockSize){i(this,_),v=0;break}}this.h=v,this.o+=m},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var m=1;m<E.length-8;++m)E[m]=0;var y=8*this.o;for(m=E.length-8;m<E.length;++m)E[m]=y&255,y/=256;for(this.u(E),E=Array(16),m=y=0;4>m;++m)for(var _=0;32>_;_+=8)E[y++]=this.g[m]>>>_&255;return E};function o(E,m){var y=l;return Object.prototype.hasOwnProperty.call(y,E)?y[E]:y[E]=m(E)}function a(E,m){this.h=m;for(var y=[],_=!0,v=E.length-1;0<=v;v--){var b=E[v]|0;_&&b==m||(y[v]=b,_=!1)}this.g=y}var l={};function h(E){return-128<=E&&128>E?o(E,function(m){return new a([m|0],0>m?-1:0)}):new a([E|0],0>E?-1:0)}function f(E){if(isNaN(E)||!isFinite(E))return w;if(0>E)return V(f(-E));for(var m=[],y=1,_=0;E>=y;_++)m[_]=E/y|0,y*=4294967296;return new a(m,0)}function p(E,m){if(E.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(E.charAt(0)=="-")return V(p(E.substring(1),m));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=f(Math.pow(m,8)),_=w,v=0;v<E.length;v+=8){var b=Math.min(8,E.length-v),g=parseInt(E.substring(v,v+b),m);8>b?(b=f(Math.pow(m,b)),_=_.j(b).add(f(g))):(_=_.j(y),_=_.add(f(g)))}return _}var w=h(0),T=h(1),S=h(16777216);n=a.prototype,n.m=function(){if(k(this))return-V(this).m();for(var E=0,m=1,y=0;y<this.g.length;y++){var _=this.i(y);E+=(0<=_?_:4294967296+_)*m,m*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(x(this))return"0";if(k(this))return"-"+V(this).toString(E);for(var m=f(Math.pow(E,6)),y=this,_="";;){var v=Z(y,m).g;y=j(y,v.j(m));var b=((0<y.g.length?y.g[0]:y.h)>>>0).toString(E);if(y=v,x(y))return b+_;for(;6>b.length;)b="0"+b;_=b+_}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function x(E){if(E.h!=0)return!1;for(var m=0;m<E.g.length;m++)if(E.g[m]!=0)return!1;return!0}function k(E){return E.h==-1}n.l=function(E){return E=j(this,E),k(E)?-1:x(E)?0:1};function V(E){for(var m=E.g.length,y=[],_=0;_<m;_++)y[_]=~E.g[_];return new a(y,~E.h).add(T)}n.abs=function(){return k(this)?V(this):this},n.add=function(E){for(var m=Math.max(this.g.length,E.g.length),y=[],_=0,v=0;v<=m;v++){var b=_+(this.i(v)&65535)+(E.i(v)&65535),g=(b>>>16)+(this.i(v)>>>16)+(E.i(v)>>>16);_=g>>>16,b&=65535,g&=65535,y[v]=g<<16|b}return new a(y,y[y.length-1]&-2147483648?-1:0)};function j(E,m){return E.add(V(m))}n.j=function(E){if(x(this)||x(E))return w;if(k(this))return k(E)?V(this).j(V(E)):V(V(this).j(E));if(k(E))return V(this.j(V(E)));if(0>this.l(S)&&0>E.l(S))return f(this.m()*E.m());for(var m=this.g.length+E.g.length,y=[],_=0;_<2*m;_++)y[_]=0;for(_=0;_<this.g.length;_++)for(var v=0;v<E.g.length;v++){var b=this.i(_)>>>16,g=this.i(_)&65535,Mt=E.i(v)>>>16,gn=E.i(v)&65535;y[2*_+2*v]+=g*gn,q(y,2*_+2*v),y[2*_+2*v+1]+=b*gn,q(y,2*_+2*v+1),y[2*_+2*v+1]+=g*Mt,q(y,2*_+2*v+1),y[2*_+2*v+2]+=b*Mt,q(y,2*_+2*v+2)}for(_=0;_<m;_++)y[_]=y[2*_+1]<<16|y[2*_];for(_=m;_<2*m;_++)y[_]=0;return new a(y,0)};function q(E,m){for(;(E[m]&65535)!=E[m];)E[m+1]+=E[m]>>>16,E[m]&=65535,m++}function $(E,m){this.g=E,this.h=m}function Z(E,m){if(x(m))throw Error("division by zero");if(x(E))return new $(w,w);if(k(E))return m=Z(V(E),m),new $(V(m.g),V(m.h));if(k(m))return m=Z(E,V(m)),new $(V(m.g),m.h);if(30<E.g.length){if(k(E)||k(m))throw Error("slowDivide_ only works with positive integers.");for(var y=T,_=m;0>=_.l(E);)y=bt(y),_=bt(_);var v=X(y,1),b=X(_,1);for(_=X(_,2),y=X(y,2);!x(_);){var g=b.add(_);0>=g.l(E)&&(v=v.add(y),b=g),_=X(_,1),y=X(y,1)}return m=j(E,v.j(m)),new $(v,m)}for(v=w;0<=E.l(m);){for(y=Math.max(1,Math.floor(E.m()/m.m())),_=Math.ceil(Math.log(y)/Math.LN2),_=48>=_?1:Math.pow(2,_-48),b=f(y),g=b.j(m);k(g)||0<g.l(E);)y-=_,b=f(y),g=b.j(m);x(b)&&(b=T),v=v.add(b),E=j(E,g)}return new $(v,E)}n.A=function(E){return Z(this,E).h},n.and=function(E){for(var m=Math.max(this.g.length,E.g.length),y=[],_=0;_<m;_++)y[_]=this.i(_)&E.i(_);return new a(y,this.h&E.h)},n.or=function(E){for(var m=Math.max(this.g.length,E.g.length),y=[],_=0;_<m;_++)y[_]=this.i(_)|E.i(_);return new a(y,this.h|E.h)},n.xor=function(E){for(var m=Math.max(this.g.length,E.g.length),y=[],_=0;_<m;_++)y[_]=this.i(_)^E.i(_);return new a(y,this.h^E.h)};function bt(E){for(var m=E.g.length+1,y=[],_=0;_<m;_++)y[_]=E.i(_)<<1|E.i(_-1)>>>31;return new a(y,E.h)}function X(E,m){var y=m>>5;m%=32;for(var _=E.g.length-y,v=[],b=0;b<_;b++)v[b]=0<m?E.i(b+y)>>>m|E.i(b+y+1)<<32-m:E.i(b+y);return new a(v,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,vs=Ec.Md5=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=p,$t=Ec.Integer=a}).apply(typeof vc<"u"?vc:typeof self<"u"?self:typeof window<"u"?window:{});var Vr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Gt={};var Es,jf,Le,Is,Un,Nr,Ts,bs,As;(function(){var n,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(s,u,c){return s==Array.prototype||s==Object.prototype||(s[u]=c.value),s};function e(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof Vr=="object"&&Vr];for(var u=0;u<s.length;++u){var c=s[u];if(c&&c.Math==Math)return c}throw Error("Cannot find global object")}var r=e(this);function i(s,u){if(u)t:{var c=r;s=s.split(".");for(var d=0;d<s.length-1;d++){var I=s[d];if(!(I in c))break t;c=c[I]}s=s[s.length-1],d=c[s],u=u(d),u!=d&&u!=null&&t(c,s,{configurable:!0,writable:!0,value:u})}}function o(s,u){s instanceof String&&(s+="");var c=0,d=!1,I={next:function(){if(!d&&c<s.length){var A=c++;return{value:u(A,s[A]),done:!1}}return d=!0,{done:!0,value:void 0}}};return I[Symbol.iterator]=function(){return I},I}i("Array.prototype.values",function(s){return s||function(){return o(this,function(u,c){return c})}});var a=a||{},l=this||self;function h(s){var u=typeof s;return u=u!="object"?u:s?Array.isArray(s)?"array":u:"null",u=="array"||u=="object"&&typeof s.length=="number"}function f(s){var u=typeof s;return u=="object"&&s!=null||u=="function"}function p(s,u,c){return s.call.apply(s.bind,arguments)}function w(s,u,c){if(!s)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var I=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(I,d),s.apply(u,I)}}return function(){return s.apply(u,arguments)}}function T(s,u,c){return T=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:w,T.apply(null,arguments)}function S(s,u){var c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();return d.push.apply(d,arguments),s.apply(this,d)}}function x(s,u){function c(){}c.prototype=u.prototype,s.aa=u.prototype,s.prototype=new c,s.prototype.constructor=s,s.Qb=function(d,I,A){for(var D=Array(arguments.length-2),J=2;J<arguments.length;J++)D[J-2]=arguments[J];return u.prototype[I].apply(d,D)}}function k(s){let u=s.length;if(0<u){let c=Array(u);for(let d=0;d<u;d++)c[d]=s[d];return c}return[]}function V(s,u){for(let c=1;c<arguments.length;c++){let d=arguments[c];if(h(d)){let I=s.length||0,A=d.length||0;s.length=I+A;for(let D=0;D<A;D++)s[I+D]=d[D]}else s.push(d)}}class j{constructor(u,c){this.i=u,this.j=c,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function q(s){return/^[\s\xa0]*$/.test(s)}function $(){var s=l.navigator;return s&&(s=s.userAgent)?s:""}function Z(s){return Z[" "](s),s}Z[" "]=function(){};var bt=$().indexOf("Gecko")!=-1&&!($().toLowerCase().indexOf("webkit")!=-1&&$().indexOf("Edge")==-1)&&!($().indexOf("Trident")!=-1||$().indexOf("MSIE")!=-1)&&$().indexOf("Edge")==-1;function X(s,u,c){for(let d in s)u.call(c,s[d],d,s)}function E(s,u){for(let c in s)u.call(void 0,s[c],c,s)}function m(s){let u={};for(let c in s)u[c]=s[c];return u}let y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function _(s,u){let c,d;for(let I=1;I<arguments.length;I++){d=arguments[I];for(c in d)s[c]=d[c];for(let A=0;A<y.length;A++)c=y[A],Object.prototype.hasOwnProperty.call(d,c)&&(s[c]=d[c])}}function v(s){var u=1;s=s.split(":");let c=[];for(;0<u&&s.length;)c.push(s.shift()),u--;return s.length&&c.push(s.join(":")),c}function b(s){l.setTimeout(()=>{throw s},0)}function g(){var s=Di;let u=null;return s.g&&(u=s.g,s.g=s.g.next,s.g||(s.h=null),u.next=null),u}class Mt{constructor(){this.h=this.g=null}add(u,c){let d=gn.get();d.set(u,c),this.h?this.h.next=d:this.g=d,this.h=d}}var gn=new j(()=>new Wh,s=>s.reset());class Wh{constructor(){this.next=this.g=this.h=null}set(u,c){this.h=u,this.g=c,this.next=null}reset(){this.next=this.g=this.h=null}}let yn,_n=!1,Di=new Mt,qa=()=>{let s=l.Promise.resolve(void 0);yn=()=>{s.then(Qh)}};var Qh=()=>{for(var s;s=g();){try{s.h.call(s.g)}catch(c){b(c)}var u=gn;u.j(s),100>u.h&&(u.h++,s.next=u.g,u.g=s)}_n=!1};function Yt(){this.s=this.s,this.C=this.C}Yt.prototype.s=!1,Yt.prototype.ma=function(){this.s||(this.s=!0,this.N())},Yt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function dt(s,u){this.type=s,this.g=this.target=u,this.defaultPrevented=!1}dt.prototype.h=function(){this.defaultPrevented=!0};var Hh=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var s=!1,u=Object.defineProperty({},"passive",{get:function(){s=!0}});try{let c=()=>{};l.addEventListener("test",c,u),l.removeEventListener("test",c,u)}catch{}return s}();function wn(s,u){if(dt.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s){var c=this.type=s.type,d=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;if(this.target=s.target||s.srcElement,this.g=u,u=s.relatedTarget){if(bt){t:{try{Z(u.nodeName);var I=!0;break t}catch{}I=!1}I||(u=null)}}else c=="mouseover"?u=s.fromElement:c=="mouseout"&&(u=s.toElement);this.relatedTarget=u,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=typeof s.pointerType=="string"?s.pointerType:Jh[s.pointerType]||"",this.state=s.state,this.i=s,s.defaultPrevented&&wn.aa.h.call(this)}}x(wn,dt);var Jh={2:"touch",3:"pen",4:"mouse"};wn.prototype.h=function(){wn.aa.h.call(this);var s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var vn="closure_listenable_"+(1e6*Math.random()|0),Xh=0;function Yh(s,u,c,d,I){this.listener=s,this.proxy=null,this.src=u,this.type=c,this.capture=!!d,this.ha=I,this.key=++Xh,this.da=this.fa=!1}function lr(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function hr(s){this.src=s,this.g={},this.h=0}hr.prototype.add=function(s,u,c,d,I){var A=s.toString();s=this.g[A],s||(s=this.g[A]=[],this.h++);var D=Vi(s,u,d,I);return-1<D?(u=s[D],c||(u.fa=!1)):(u=new Yh(u,this.src,A,!!d,I),u.fa=c,s.push(u)),u};function xi(s,u){var c=u.type;if(c in s.g){var d=s.g[c],I=Array.prototype.indexOf.call(d,u,void 0),A;(A=0<=I)&&Array.prototype.splice.call(d,I,1),A&&(lr(u),s.g[c].length==0&&(delete s.g[c],s.h--))}}function Vi(s,u,c,d){for(var I=0;I<s.length;++I){var A=s[I];if(!A.da&&A.listener==u&&A.capture==!!c&&A.ha==d)return I}return-1}var Ni="closure_lm_"+(1e6*Math.random()|0),ki={};function za(s,u,c,d,I){if(d&&d.once)return $a(s,u,c,d,I);if(Array.isArray(u)){for(var A=0;A<u.length;A++)za(s,u[A],c,d,I);return null}return c=Li(c),s&&s[vn]?s.K(u,c,f(d)?!!d.capture:!!d,I):ja(s,u,c,!1,d,I)}function ja(s,u,c,d,I,A){if(!u)throw Error("Invalid event type");var D=f(I)?!!I.capture:!!I,J=Fi(s);if(J||(s[Ni]=J=new hr(s)),c=J.add(u,c,d,D,A),c.proxy)return c;if(d=Zh(),c.proxy=d,d.src=s,d.listener=c,s.addEventListener)Hh||(I=D),I===void 0&&(I=!1),s.addEventListener(u.toString(),d,I);else if(s.attachEvent)s.attachEvent(Ka(u.toString()),d);else if(s.addListener&&s.removeListener)s.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return c}function Zh(){function s(c){return u.call(s.src,s.listener,c)}let u=td;return s}function $a(s,u,c,d,I){if(Array.isArray(u)){for(var A=0;A<u.length;A++)$a(s,u[A],c,d,I);return null}return c=Li(c),s&&s[vn]?s.L(u,c,f(d)?!!d.capture:!!d,I):ja(s,u,c,!0,d,I)}function Ga(s,u,c,d,I){if(Array.isArray(u))for(var A=0;A<u.length;A++)Ga(s,u[A],c,d,I);else d=f(d)?!!d.capture:!!d,c=Li(c),s&&s[vn]?(s=s.i,u=String(u).toString(),u in s.g&&(A=s.g[u],c=Vi(A,c,d,I),-1<c&&(lr(A[c]),Array.prototype.splice.call(A,c,1),A.length==0&&(delete s.g[u],s.h--)))):s&&(s=Fi(s))&&(u=s.g[u.toString()],s=-1,u&&(s=Vi(u,c,d,I)),(c=-1<s?u[s]:null)&&Oi(c))}function Oi(s){if(typeof s!="number"&&s&&!s.da){var u=s.src;if(u&&u[vn])xi(u.i,s);else{var c=s.type,d=s.proxy;u.removeEventListener?u.removeEventListener(c,d,s.capture):u.detachEvent?u.detachEvent(Ka(c),d):u.addListener&&u.removeListener&&u.removeListener(d),(c=Fi(u))?(xi(c,s),c.h==0&&(c.src=null,u[Ni]=null)):lr(s)}}}function Ka(s){return s in ki?ki[s]:ki[s]="on"+s}function td(s,u){if(s.da)s=!0;else{u=new wn(u,this);var c=s.listener,d=s.ha||s.src;s.fa&&Oi(s),s=c.call(d,u)}return s}function Fi(s){return s=s[Ni],s instanceof hr?s:null}var Mi="__closure_events_fn_"+(1e9*Math.random()>>>0);function Li(s){return typeof s=="function"?s:(s[Mi]||(s[Mi]=function(u){return s.handleEvent(u)}),s[Mi])}function ft(){Yt.call(this),this.i=new hr(this),this.M=this,this.F=null}x(ft,Yt),ft.prototype[vn]=!0,ft.prototype.removeEventListener=function(s,u,c,d){Ga(this,s,u,c,d)};function wt(s,u){var c,d=s.F;if(d)for(c=[];d;d=d.F)c.push(d);if(s=s.M,d=u.type||u,typeof u=="string")u=new dt(u,s);else if(u instanceof dt)u.target=u.target||s;else{var I=u;u=new dt(d,s),_(u,I)}if(I=!0,c)for(var A=c.length-1;0<=A;A--){var D=u.g=c[A];I=dr(D,d,!0,u)&&I}if(D=u.g=s,I=dr(D,d,!0,u)&&I,I=dr(D,d,!1,u)&&I,c)for(A=0;A<c.length;A++)D=u.g=c[A],I=dr(D,d,!1,u)&&I}ft.prototype.N=function(){if(ft.aa.N.call(this),this.i){var s=this.i,u;for(u in s.g){for(var c=s.g[u],d=0;d<c.length;d++)lr(c[d]);delete s.g[u],s.h--}}this.F=null},ft.prototype.K=function(s,u,c,d){return this.i.add(String(s),u,!1,c,d)},ft.prototype.L=function(s,u,c,d){return this.i.add(String(s),u,!0,c,d)};function dr(s,u,c,d){if(u=s.i.g[String(u)],!u)return!0;u=u.concat();for(var I=!0,A=0;A<u.length;++A){var D=u[A];if(D&&!D.da&&D.capture==c){var J=D.listener,ht=D.ha||D.src;D.fa&&xi(s.i,D),I=J.call(ht,d)!==!1&&I}}return I&&!d.defaultPrevented}function Wa(s,u,c){if(typeof s=="function")c&&(s=T(s,c));else if(s&&typeof s.handleEvent=="function")s=T(s.handleEvent,s);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:l.setTimeout(s,u||0)}function Qa(s){s.g=Wa(()=>{s.g=null,s.i&&(s.i=!1,Qa(s))},s.l);let u=s.h;s.h=null,s.m.apply(null,u)}class ed extends Yt{constructor(u,c){super(),this.m=u,this.l=c,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Qa(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function En(s){Yt.call(this),this.h=s,this.g={}}x(En,Yt);var Ha=[];function Ja(s){X(s.g,function(u,c){this.g.hasOwnProperty(c)&&Oi(u)},s),s.g={}}En.prototype.N=function(){En.aa.N.call(this),Ja(this)},En.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Bi=l.JSON.stringify,nd=l.JSON.parse,rd=class{stringify(s){return l.JSON.stringify(s,void 0)}parse(s){return l.JSON.parse(s,void 0)}};function Ui(){}Ui.prototype.h=null;function Xa(s){return s.h||(s.h=s.i())}function Ya(){}var In={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function qi(){dt.call(this,"d")}x(qi,dt);function zi(){dt.call(this,"c")}x(zi,dt);var me={},Za=null;function fr(){return Za=Za||new ft}me.La="serverreachability";function tu(s){dt.call(this,me.La,s)}x(tu,dt);function Tn(s){let u=fr();wt(u,new tu(u))}me.STAT_EVENT="statevent";function eu(s,u){dt.call(this,me.STAT_EVENT,s),this.stat=u}x(eu,dt);function vt(s){let u=fr();wt(u,new eu(u,s))}me.Ma="timingevent";function nu(s,u){dt.call(this,me.Ma,s),this.size=u}x(nu,dt);function bn(s,u){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){s()},u)}function An(){this.g=!0}An.prototype.xa=function(){this.g=!1};function id(s,u,c,d,I,A){s.info(function(){if(s.g)if(A)for(var D="",J=A.split("&"),ht=0;ht<J.length;ht++){var Q=J[ht].split("=");if(1<Q.length){var mt=Q[0];Q=Q[1];var pt=mt.split("_");D=2<=pt.length&&pt[1]=="type"?D+(mt+"="+Q+"&"):D+(mt+"=redacted&")}}else D=null;else D=A;return"XMLHTTP REQ ("+d+") [attempt "+I+"]: "+u+`
`+c+`
`+D})}function sd(s,u,c,d,I,A,D){s.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+I+"]: "+u+`
`+c+`
`+A+" "+D})}function Ve(s,u,c,d){s.info(function(){return"XMLHTTP TEXT ("+u+"): "+ad(s,c)+(d?" "+d:"")})}function od(s,u){s.info(function(){return"TIMEOUT: "+u})}An.prototype.info=function(){};function ad(s,u){if(!s.g)return u;if(!u)return null;try{var c=JSON.parse(u);if(c){for(s=0;s<c.length;s++)if(Array.isArray(c[s])){var d=c[s];if(!(2>d.length)){var I=d[1];if(Array.isArray(I)&&!(1>I.length)){var A=I[0];if(A!="noop"&&A!="stop"&&A!="close")for(var D=1;D<I.length;D++)I[D]=""}}}}return Bi(c)}catch{return u}}var mr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},ru={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},ji;function pr(){}x(pr,Ui),pr.prototype.g=function(){return new XMLHttpRequest},pr.prototype.i=function(){return{}},ji=new pr;function Zt(s,u,c,d){this.j=s,this.i=u,this.l=c,this.R=d||1,this.U=new En(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new iu}function iu(){this.i=null,this.g="",this.h=!1}var su={},$i={};function Gi(s,u,c){s.L=1,s.v=wr(Lt(u)),s.m=c,s.P=!0,ou(s,null)}function ou(s,u){s.F=Date.now(),gr(s),s.A=Lt(s.v);var c=s.A,d=s.R;Array.isArray(d)||(d=[String(d)]),vu(c.i,"t",d),s.C=0,c=s.j.J,s.h=new iu,s.g=Lu(s.j,c?u:null,!s.m),0<s.O&&(s.M=new ed(T(s.Y,s,s.g),s.O)),u=s.U,c=s.g,d=s.ca;var I="readystatechange";Array.isArray(I)||(I&&(Ha[0]=I.toString()),I=Ha);for(var A=0;A<I.length;A++){var D=za(c,I[A],d||u.handleEvent,!1,u.h||u);if(!D)break;u.g[D.key]=D}u=s.H?m(s.H):{},s.m?(s.u||(s.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.A,s.u,s.m,u)):(s.u="GET",s.g.ea(s.A,s.u,null,u)),Tn(),id(s.i,s.u,s.A,s.l,s.R,s.m)}Zt.prototype.ca=function(s){s=s.target;let u=this.M;u&&Bt(s)==3?u.j():this.Y(s)},Zt.prototype.Y=function(s){try{if(s==this.g)t:{let pt=Bt(this.g);var u=this.g.Ba();let Oe=this.g.Z();if(!(3>pt)&&(pt!=3||this.g&&(this.h.h||this.g.oa()||Ru(this.g)))){this.J||pt!=4||u==7||(u==8||0>=Oe?Tn(3):Tn(2)),Ki(this);var c=this.g.Z();this.X=c;e:if(au(this)){var d=Ru(this.g);s="";var I=d.length,A=Bt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){pe(this),Sn(this);var D="";break e}this.h.i=new l.TextDecoder}for(u=0;u<I;u++)this.h.h=!0,s+=this.h.i.decode(d[u],{stream:!(A&&u==I-1)});d.length=0,this.h.g+=s,this.C=0,D=this.h.g}else D=this.g.oa();if(this.o=c==200,sd(this.i,this.u,this.A,this.l,this.R,pt,c),this.o){if(this.T&&!this.K){e:{if(this.g){var J,ht=this.g;if((J=ht.g?ht.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!q(J)){var Q=J;break e}}Q=null}if(c=Q)Ve(this.i,this.l,c,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Wi(this,c);else{this.o=!1,this.s=3,vt(12),pe(this),Sn(this);break t}}if(this.P){c=!0;let Rt;for(;!this.J&&this.C<D.length;)if(Rt=ud(this,D),Rt==$i){pt==4&&(this.s=4,vt(14),c=!1),Ve(this.i,this.l,null,"[Incomplete Response]");break}else if(Rt==su){this.s=4,vt(15),Ve(this.i,this.l,D,"[Invalid Chunk]"),c=!1;break}else Ve(this.i,this.l,Rt,null),Wi(this,Rt);if(au(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),pt!=4||D.length!=0||this.h.h||(this.s=1,vt(16),c=!1),this.o=this.o&&c,!c)Ve(this.i,this.l,D,"[Invalid Chunked Response]"),pe(this),Sn(this);else if(0<D.length&&!this.W){this.W=!0;var mt=this.j;mt.g==this&&mt.ba&&!mt.M&&(mt.j.info("Great, no buffering proxy detected. Bytes received: "+D.length),Zi(mt),mt.M=!0,vt(11))}}else Ve(this.i,this.l,D,null),Wi(this,D);pt==4&&pe(this),this.o&&!this.J&&(pt==4?ku(this.j,this):(this.o=!1,gr(this)))}else Ad(this.g),c==400&&0<D.indexOf("Unknown SID")?(this.s=3,vt(12)):(this.s=0,vt(13)),pe(this),Sn(this)}}}catch{}finally{}};function au(s){return s.g?s.u=="GET"&&s.L!=2&&s.j.Ca:!1}function ud(s,u){var c=s.C,d=u.indexOf(`
`,c);return d==-1?$i:(c=Number(u.substring(c,d)),isNaN(c)?su:(d+=1,d+c>u.length?$i:(u=u.slice(d,d+c),s.C=d+c,u)))}Zt.prototype.cancel=function(){this.J=!0,pe(this)};function gr(s){s.S=Date.now()+s.I,uu(s,s.I)}function uu(s,u){if(s.B!=null)throw Error("WatchDog timer not null");s.B=bn(T(s.ba,s),u)}function Ki(s){s.B&&(l.clearTimeout(s.B),s.B=null)}Zt.prototype.ba=function(){this.B=null;let s=Date.now();0<=s-this.S?(od(this.i,this.A),this.L!=2&&(Tn(),vt(17)),pe(this),this.s=2,Sn(this)):uu(this,this.S-s)};function Sn(s){s.j.G==0||s.J||ku(s.j,s)}function pe(s){Ki(s);var u=s.M;u&&typeof u.ma=="function"&&u.ma(),s.M=null,Ja(s.U),s.g&&(u=s.g,s.g=null,u.abort(),u.ma())}function Wi(s,u){try{var c=s.j;if(c.G!=0&&(c.g==s||Qi(c.h,s))){if(!s.K&&Qi(c.h,s)&&c.G==3){try{var d=c.Da.g.parse(u)}catch{d=null}if(Array.isArray(d)&&d.length==3){var I=d;if(I[0]==0){t:if(!c.u){if(c.g)if(c.g.F+3e3<s.F)br(c),Ir(c);else break t;Yi(c),vt(18)}}else c.za=I[1],0<c.za-c.T&&37500>I[2]&&c.F&&c.v==0&&!c.C&&(c.C=bn(T(c.Za,c),6e3));if(1>=hu(c.h)&&c.ca){try{c.ca()}catch{}c.ca=void 0}}else ye(c,11)}else if((s.K||c.g==s)&&br(c),!q(u))for(I=c.Da.g.parse(u),u=0;u<I.length;u++){let Q=I[u];if(c.T=Q[0],Q=Q[1],c.G==2)if(Q[0]=="c"){c.K=Q[1],c.ia=Q[2];let mt=Q[3];mt!=null&&(c.la=mt,c.j.info("VER="+c.la));let pt=Q[4];pt!=null&&(c.Aa=pt,c.j.info("SVER="+c.Aa));let Oe=Q[5];Oe!=null&&typeof Oe=="number"&&0<Oe&&(d=1.5*Oe,c.L=d,c.j.info("backChannelRequestTimeoutMs_="+d)),d=c;let Rt=s.g;if(Rt){let Sr=Rt.g?Rt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Sr){var A=d.h;A.g||Sr.indexOf("spdy")==-1&&Sr.indexOf("quic")==-1&&Sr.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(Hi(A,A.h),A.h=null))}if(d.D){let ts=Rt.g?Rt.g.getResponseHeader("X-HTTP-Session-Id"):null;ts&&(d.ya=ts,Y(d.I,d.D,ts))}}c.G=3,c.l&&c.l.ua(),c.ba&&(c.R=Date.now()-s.F,c.j.info("Handshake RTT: "+c.R+"ms")),d=c;var D=s;if(d.qa=Mu(d,d.J?d.ia:null,d.W),D.K){du(d.h,D);var J=D,ht=d.L;ht&&(J.I=ht),J.B&&(Ki(J),gr(J)),d.g=D}else Vu(d);0<c.i.length&&Tr(c)}else Q[0]!="stop"&&Q[0]!="close"||ye(c,7);else c.G==3&&(Q[0]=="stop"||Q[0]=="close"?Q[0]=="stop"?ye(c,7):Xi(c):Q[0]!="noop"&&c.l&&c.l.ta(Q),c.v=0)}}Tn(4)}catch{}}var cd=class{constructor(s,u){this.g=s,this.map=u}};function cu(s){this.l=s||10,l.PerformanceNavigationTiming?(s=l.performance.getEntriesByType("navigation"),s=0<s.length&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function lu(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function hu(s){return s.h?1:s.g?s.g.size:0}function Qi(s,u){return s.h?s.h==u:s.g?s.g.has(u):!1}function Hi(s,u){s.g?s.g.add(u):s.h=u}function du(s,u){s.h&&s.h==u?s.h=null:s.g&&s.g.has(u)&&s.g.delete(u)}cu.prototype.cancel=function(){if(this.i=fu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let s of this.g.values())s.cancel();this.g.clear()}};function fu(s){if(s.h!=null)return s.i.concat(s.h.D);if(s.g!=null&&s.g.size!==0){let u=s.i;for(let c of s.g.values())u=u.concat(c.D);return u}return k(s.i)}function ld(s){if(s.V&&typeof s.V=="function")return s.V();if(typeof Map<"u"&&s instanceof Map||typeof Set<"u"&&s instanceof Set)return Array.from(s.values());if(typeof s=="string")return s.split("");if(h(s)){for(var u=[],c=s.length,d=0;d<c;d++)u.push(s[d]);return u}u=[],c=0;for(d in s)u[c++]=s[d];return u}function hd(s){if(s.na&&typeof s.na=="function")return s.na();if(!s.V||typeof s.V!="function"){if(typeof Map<"u"&&s instanceof Map)return Array.from(s.keys());if(!(typeof Set<"u"&&s instanceof Set)){if(h(s)||typeof s=="string"){var u=[];s=s.length;for(var c=0;c<s;c++)u.push(c);return u}u=[],c=0;for(let d in s)u[c++]=d;return u}}}function mu(s,u){if(s.forEach&&typeof s.forEach=="function")s.forEach(u,void 0);else if(h(s)||typeof s=="string")Array.prototype.forEach.call(s,u,void 0);else for(var c=hd(s),d=ld(s),I=d.length,A=0;A<I;A++)u.call(void 0,d[A],c&&c[A],s)}var pu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function dd(s,u){if(s){s=s.split("&");for(var c=0;c<s.length;c++){var d=s[c].indexOf("="),I=null;if(0<=d){var A=s[c].substring(0,d);I=s[c].substring(d+1)}else A=s[c];u(A,I?decodeURIComponent(I.replace(/\+/g," ")):"")}}}function ge(s){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,s instanceof ge){this.h=s.h,yr(this,s.j),this.o=s.o,this.g=s.g,_r(this,s.s),this.l=s.l;var u=s.i,c=new Pn;c.i=u.i,u.g&&(c.g=new Map(u.g),c.h=u.h),gu(this,c),this.m=s.m}else s&&(u=String(s).match(pu))?(this.h=!1,yr(this,u[1]||"",!0),this.o=Rn(u[2]||""),this.g=Rn(u[3]||"",!0),_r(this,u[4]),this.l=Rn(u[5]||"",!0),gu(this,u[6]||"",!0),this.m=Rn(u[7]||"")):(this.h=!1,this.i=new Pn(null,this.h))}ge.prototype.toString=function(){var s=[],u=this.j;u&&s.push(Cn(u,yu,!0),":");var c=this.g;return(c||u=="file")&&(s.push("//"),(u=this.o)&&s.push(Cn(u,yu,!0),"@"),s.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.s,c!=null&&s.push(":",String(c))),(c=this.l)&&(this.g&&c.charAt(0)!="/"&&s.push("/"),s.push(Cn(c,c.charAt(0)=="/"?pd:md,!0))),(c=this.i.toString())&&s.push("?",c),(c=this.m)&&s.push("#",Cn(c,yd)),s.join("")};function Lt(s){return new ge(s)}function yr(s,u,c){s.j=c?Rn(u,!0):u,s.j&&(s.j=s.j.replace(/:$/,""))}function _r(s,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);s.s=u}else s.s=null}function gu(s,u,c){u instanceof Pn?(s.i=u,_d(s.i,s.h)):(c||(u=Cn(u,gd)),s.i=new Pn(u,s.h))}function Y(s,u,c){s.i.set(u,c)}function wr(s){return Y(s,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),s}function Rn(s,u){return s?u?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function Cn(s,u,c){return typeof s=="string"?(s=encodeURI(s).replace(u,fd),c&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function fd(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var yu=/[#\/\?@]/g,md=/[#\?:]/g,pd=/[#\?]/g,gd=/[#\?@]/g,yd=/#/g;function Pn(s,u){this.h=this.g=null,this.i=s||null,this.j=!!u}function te(s){s.g||(s.g=new Map,s.h=0,s.i&&dd(s.i,function(u,c){s.add(decodeURIComponent(u.replace(/\+/g," ")),c)}))}n=Pn.prototype,n.add=function(s,u){te(this),this.i=null,s=Ne(this,s);var c=this.g.get(s);return c||this.g.set(s,c=[]),c.push(u),this.h+=1,this};function _u(s,u){te(s),u=Ne(s,u),s.g.has(u)&&(s.i=null,s.h-=s.g.get(u).length,s.g.delete(u))}function wu(s,u){return te(s),u=Ne(s,u),s.g.has(u)}n.forEach=function(s,u){te(this),this.g.forEach(function(c,d){c.forEach(function(I){s.call(u,I,d,this)},this)},this)},n.na=function(){te(this);let s=Array.from(this.g.values()),u=Array.from(this.g.keys()),c=[];for(let d=0;d<u.length;d++){let I=s[d];for(let A=0;A<I.length;A++)c.push(u[d])}return c},n.V=function(s){te(this);let u=[];if(typeof s=="string")wu(this,s)&&(u=u.concat(this.g.get(Ne(this,s))));else{s=Array.from(this.g.values());for(let c=0;c<s.length;c++)u=u.concat(s[c])}return u},n.set=function(s,u){return te(this),this.i=null,s=Ne(this,s),wu(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[u]),this.h+=1,this},n.get=function(s,u){return s?(s=this.V(s),0<s.length?String(s[0]):u):u};function vu(s,u,c){_u(s,u),0<c.length&&(s.i=null,s.g.set(Ne(s,u),k(c)),s.h+=c.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";let s=[],u=Array.from(this.g.keys());for(var c=0;c<u.length;c++){var d=u[c];let A=encodeURIComponent(String(d)),D=this.V(d);for(d=0;d<D.length;d++){var I=A;D[d]!==""&&(I+="="+encodeURIComponent(String(D[d]))),s.push(I)}}return this.i=s.join("&")};function Ne(s,u){return u=String(u),s.j&&(u=u.toLowerCase()),u}function _d(s,u){u&&!s.j&&(te(s),s.i=null,s.g.forEach(function(c,d){var I=d.toLowerCase();d!=I&&(_u(this,d),vu(this,I,c))},s)),s.j=u}function wd(s,u){let c=new An;if(l.Image){let d=new Image;d.onload=S(ee,c,"TestLoadImage: loaded",!0,u,d),d.onerror=S(ee,c,"TestLoadImage: error",!1,u,d),d.onabort=S(ee,c,"TestLoadImage: abort",!1,u,d),d.ontimeout=S(ee,c,"TestLoadImage: timeout",!1,u,d),l.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=s}else u(!1)}function vd(s,u){let c=new An,d=new AbortController,I=setTimeout(()=>{d.abort(),ee(c,"TestPingServer: timeout",!1,u)},1e4);fetch(s,{signal:d.signal}).then(A=>{clearTimeout(I),A.ok?ee(c,"TestPingServer: ok",!0,u):ee(c,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(I),ee(c,"TestPingServer: error",!1,u)})}function ee(s,u,c,d,I){try{I&&(I.onload=null,I.onerror=null,I.onabort=null,I.ontimeout=null),d(c)}catch{}}function Ed(){this.g=new rd}function Id(s,u,c){let d=c||"";try{mu(s,function(I,A){let D=I;f(I)&&(D=Bi(I)),u.push(d+A+"="+encodeURIComponent(D))})}catch(I){throw u.push(d+"type="+encodeURIComponent("_badmap")),I}}function Dn(s){this.l=s.Ub||null,this.j=s.eb||!1}x(Dn,Ui),Dn.prototype.g=function(){return new vr(this.l,this.j)},Dn.prototype.i=function(s){return function(){return s}}({});function vr(s,u){ft.call(this),this.D=s,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}x(vr,ft),n=vr.prototype,n.open=function(s,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=s,this.A=u,this.readyState=1,Vn(this)},n.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;let u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};s&&(u.body=s),(this.D||l).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,xn(this)),this.readyState=0},n.Sa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,Vn(this)),this.g&&(this.readyState=3,Vn(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Eu(this)}else s.text().then(this.Ra.bind(this),this.ga.bind(this))};function Eu(s){s.j.read().then(s.Pa.bind(s)).catch(s.ga.bind(s))}n.Pa=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var u=s.value?s.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!s.done}))&&(this.response=this.responseText+=u)}s.done?xn(this):Vn(this),this.readyState==3&&Eu(this)}},n.Ra=function(s){this.g&&(this.response=this.responseText=s,xn(this))},n.Qa=function(s){this.g&&(this.response=s,xn(this))},n.ga=function(){this.g&&xn(this)};function xn(s){s.readyState=4,s.l=null,s.j=null,s.v=null,Vn(s)}n.setRequestHeader=function(s,u){this.u.append(s,u)},n.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";let s=[],u=this.h.entries();for(var c=u.next();!c.done;)c=c.value,s.push(c[0]+": "+c[1]),c=u.next();return s.join(`\r
`)};function Vn(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(vr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function Iu(s){let u="";return X(s,function(c,d){u+=d,u+=":",u+=c,u+=`\r
`}),u}function Ji(s,u,c){t:{for(d in c){var d=!1;break t}d=!0}d||(c=Iu(c),typeof s=="string"?c!=null&&encodeURIComponent(String(c)):Y(s,u,c))}function nt(s){ft.call(this),this.headers=new Map,this.o=s||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}x(nt,ft);var Td=/^https?$/i,bd=["POST","PUT"];n=nt.prototype,n.Ha=function(s){this.J=s},n.ea=function(s,u,c,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);u=u?u.toUpperCase():"GET",this.D=s,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():ji.g(),this.v=this.o?Xa(this.o):Xa(ji),this.g.onreadystatechange=T(this.Ea,this);try{this.B=!0,this.g.open(u,String(s),!0),this.B=!1}catch(A){Tu(this,A);return}if(s=c||"",c=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var I in d)c.set(I,d[I]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(let A of d.keys())c.set(A,d.get(A));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(c.keys()).find(A=>A.toLowerCase()=="content-type"),I=l.FormData&&s instanceof l.FormData,!(0<=Array.prototype.indexOf.call(bd,u,void 0))||d||I||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[A,D]of c)this.g.setRequestHeader(A,D);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Su(this),this.u=!0,this.g.send(s),this.u=!1}catch(A){Tu(this,A)}};function Tu(s,u){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=u,s.m=5,bu(s),Er(s)}function bu(s){s.A||(s.A=!0,wt(s,"complete"),wt(s,"error"))}n.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=s||7,wt(this,"complete"),wt(this,"abort"),Er(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Er(this,!0)),nt.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Au(this):this.bb())},n.bb=function(){Au(this)};function Au(s){if(s.h&&typeof a<"u"&&(!s.v[1]||Bt(s)!=4||s.Z()!=2)){if(s.u&&Bt(s)==4)Wa(s.Ea,0,s);else if(wt(s,"readystatechange"),Bt(s)==4){s.h=!1;try{let D=s.Z();t:switch(D){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break t;default:u=!1}var c;if(!(c=u)){var d;if(d=D===0){var I=String(s.D).match(pu)[1]||null;!I&&l.self&&l.self.location&&(I=l.self.location.protocol.slice(0,-1)),d=!Td.test(I?I.toLowerCase():"")}c=d}if(c)wt(s,"complete"),wt(s,"success");else{s.m=6;try{var A=2<Bt(s)?s.g.statusText:""}catch{A=""}s.l=A+" ["+s.Z()+"]",bu(s)}}finally{Er(s)}}}}function Er(s,u){if(s.g){Su(s);let c=s.g,d=s.v[0]?()=>{}:null;s.g=null,s.v=null,u||wt(s,"ready");try{c.onreadystatechange=d}catch{}}}function Su(s){s.I&&(l.clearTimeout(s.I),s.I=null)}n.isActive=function(){return!!this.g};function Bt(s){return s.g?s.g.readyState:0}n.Z=function(){try{return 2<Bt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(s){if(this.g){var u=this.g.responseText;return s&&u.indexOf(s)==0&&(u=u.substring(s.length)),nd(u)}};function Ru(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.H){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function Ad(s){let u={};s=(s.g&&2<=Bt(s)&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<s.length;d++){if(q(s[d]))continue;var c=v(s[d]);let I=c[0];if(c=c[1],typeof c!="string")continue;c=c.trim();let A=u[I]||[];u[I]=A,A.push(c)}E(u,function(d){return d.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Nn(s,u,c){return c&&c.internalChannelParams&&c.internalChannelParams[s]||u}function Cu(s){this.Aa=0,this.i=[],this.j=new An,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Nn("failFast",!1,s),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Nn("baseRetryDelayMs",5e3,s),this.cb=Nn("retryDelaySeedMs",1e4,s),this.Wa=Nn("forwardChannelMaxRetries",2,s),this.wa=Nn("forwardChannelRequestTimeoutMs",2e4,s),this.pa=s&&s.xmlHttpFactory||void 0,this.Xa=s&&s.Tb||void 0,this.Ca=s&&s.useFetchStreams||!1,this.L=void 0,this.J=s&&s.supportsCrossDomainXhr||!1,this.K="",this.h=new cu(s&&s.concurrentRequestLimit),this.Da=new Ed,this.P=s&&s.fastHandshake||!1,this.O=s&&s.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=s&&s.Rb||!1,s&&s.xa&&this.j.xa(),s&&s.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&s&&s.detectBufferingProxy||!1,this.ja=void 0,s&&s.longPollingTimeout&&0<s.longPollingTimeout&&(this.ja=s.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Cu.prototype,n.la=8,n.G=1,n.connect=function(s,u,c,d){vt(0),this.W=s,this.H=u||{},c&&d!==void 0&&(this.H.OSID=c,this.H.OAID=d),this.F=this.X,this.I=Mu(this,null,this.W),Tr(this)};function Xi(s){if(Pu(s),s.G==3){var u=s.U++,c=Lt(s.I);if(Y(c,"SID",s.K),Y(c,"RID",u),Y(c,"TYPE","terminate"),kn(s,c),u=new Zt(s,s.j,u),u.L=2,u.v=wr(Lt(c)),c=!1,l.navigator&&l.navigator.sendBeacon)try{c=l.navigator.sendBeacon(u.v.toString(),"")}catch{}!c&&l.Image&&(new Image().src=u.v,c=!0),c||(u.g=Lu(u.j,null),u.g.ea(u.v)),u.F=Date.now(),gr(u)}Fu(s)}function Ir(s){s.g&&(Zi(s),s.g.cancel(),s.g=null)}function Pu(s){Ir(s),s.u&&(l.clearTimeout(s.u),s.u=null),br(s),s.h.cancel(),s.s&&(typeof s.s=="number"&&l.clearTimeout(s.s),s.s=null)}function Tr(s){if(!lu(s.h)&&!s.s){s.s=!0;var u=s.Ga;yn||qa(),_n||(yn(),_n=!0),Di.add(u,s),s.B=0}}function Sd(s,u){return hu(s.h)>=s.h.j-(s.s?1:0)?!1:s.s?(s.i=u.D.concat(s.i),!0):s.G==1||s.G==2||s.B>=(s.Va?0:s.Wa)?!1:(s.s=bn(T(s.Ga,s,u),Ou(s,s.B)),s.B++,!0)}n.Ga=function(s){if(this.s)if(this.s=null,this.G==1){if(!s){this.U=Math.floor(1e5*Math.random()),s=this.U++;let I=new Zt(this,this.j,s),A=this.o;if(this.S&&(A?(A=m(A),_(A,this.S)):A=this.S),this.m!==null||this.O||(I.H=A,A=null),this.P)t:{for(var u=0,c=0;c<this.i.length;c++){e:{var d=this.i[c];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break e}d=void 0}if(d===void 0)break;if(u+=d,4096<u){u=c;break t}if(u===4096||c===this.i.length-1){u=c+1;break t}}u=1e3}else u=1e3;u=xu(this,I,u),c=Lt(this.I),Y(c,"RID",s),Y(c,"CVER",22),this.D&&Y(c,"X-HTTP-Session-Id",this.D),kn(this,c),A&&(this.O?u="headers="+encodeURIComponent(String(Iu(A)))+"&"+u:this.m&&Ji(c,this.m,A)),Hi(this.h,I),this.Ua&&Y(c,"TYPE","init"),this.P?(Y(c,"$req",u),Y(c,"SID","null"),I.T=!0,Gi(I,c,null)):Gi(I,c,u),this.G=2}}else this.G==3&&(s?Du(this,s):this.i.length==0||lu(this.h)||Du(this))};function Du(s,u){var c;u?c=u.l:c=s.U++;let d=Lt(s.I);Y(d,"SID",s.K),Y(d,"RID",c),Y(d,"AID",s.T),kn(s,d),s.m&&s.o&&Ji(d,s.m,s.o),c=new Zt(s,s.j,c,s.B+1),s.m===null&&(c.H=s.o),u&&(s.i=u.D.concat(s.i)),u=xu(s,c,1e3),c.I=Math.round(.5*s.wa)+Math.round(.5*s.wa*Math.random()),Hi(s.h,c),Gi(c,d,u)}function kn(s,u){s.H&&X(s.H,function(c,d){Y(u,d,c)}),s.l&&mu({},function(c,d){Y(u,d,c)})}function xu(s,u,c){c=Math.min(s.i.length,c);var d=s.l?T(s.l.Na,s.l,s):null;t:{var I=s.i;let A=-1;for(;;){let D=["count="+c];A==-1?0<c?(A=I[0].g,D.push("ofs="+A)):A=0:D.push("ofs="+A);let J=!0;for(let ht=0;ht<c;ht++){let Q=I[ht].g,mt=I[ht].map;if(Q-=A,0>Q)A=Math.max(0,I[ht].g-100),J=!1;else try{Id(mt,D,"req"+Q+"_")}catch{d&&d(mt)}}if(J){d=D.join("&");break t}}}return s=s.i.splice(0,c),u.D=s,d}function Vu(s){if(!s.g&&!s.u){s.Y=1;var u=s.Fa;yn||qa(),_n||(yn(),_n=!0),Di.add(u,s),s.v=0}}function Yi(s){return s.g||s.u||3<=s.v?!1:(s.Y++,s.u=bn(T(s.Fa,s),Ou(s,s.v)),s.v++,!0)}n.Fa=function(){if(this.u=null,Nu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var s=2*this.R;this.j.info("BP detection timer enabled: "+s),this.A=bn(T(this.ab,this),s)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,vt(10),Ir(this),Nu(this))};function Zi(s){s.A!=null&&(l.clearTimeout(s.A),s.A=null)}function Nu(s){s.g=new Zt(s,s.j,"rpc",s.Y),s.m===null&&(s.g.H=s.o),s.g.O=0;var u=Lt(s.qa);Y(u,"RID","rpc"),Y(u,"SID",s.K),Y(u,"AID",s.T),Y(u,"CI",s.F?"0":"1"),!s.F&&s.ja&&Y(u,"TO",s.ja),Y(u,"TYPE","xmlhttp"),kn(s,u),s.m&&s.o&&Ji(u,s.m,s.o),s.L&&(s.g.I=s.L);var c=s.g;s=s.ia,c.L=1,c.v=wr(Lt(u)),c.m=null,c.P=!0,ou(c,s)}n.Za=function(){this.C!=null&&(this.C=null,Ir(this),Yi(this),vt(19))};function br(s){s.C!=null&&(l.clearTimeout(s.C),s.C=null)}function ku(s,u){var c=null;if(s.g==u){br(s),Zi(s),s.g=null;var d=2}else if(Qi(s.h,u))c=u.D,du(s.h,u),d=1;else return;if(s.G!=0){if(u.o)if(d==1){c=u.m?u.m.length:0,u=Date.now()-u.F;var I=s.B;d=fr(),wt(d,new nu(d,c)),Tr(s)}else Vu(s);else if(I=u.s,I==3||I==0&&0<u.X||!(d==1&&Sd(s,u)||d==2&&Yi(s)))switch(c&&0<c.length&&(u=s.h,u.i=u.i.concat(c)),I){case 1:ye(s,5);break;case 4:ye(s,10);break;case 3:ye(s,6);break;default:ye(s,2)}}}function Ou(s,u){let c=s.Ta+Math.floor(Math.random()*s.cb);return s.isActive()||(c*=2),c*u}function ye(s,u){if(s.j.info("Error code "+u),u==2){var c=T(s.fb,s),d=s.Xa;let I=!d;d=new ge(d||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||yr(d,"https"),wr(d),I?wd(d.toString(),c):vd(d.toString(),c)}else vt(2);s.G=0,s.l&&s.l.sa(u),Fu(s),Pu(s)}n.fb=function(s){s?(this.j.info("Successfully pinged google.com"),vt(2)):(this.j.info("Failed to ping google.com"),vt(1))};function Fu(s){if(s.G=0,s.ka=[],s.l){let u=fu(s.h);(u.length!=0||s.i.length!=0)&&(V(s.ka,u),V(s.ka,s.i),s.h.i.length=0,k(s.i),s.i.length=0),s.l.ra()}}function Mu(s,u,c){var d=c instanceof ge?Lt(c):new ge(c);if(d.g!="")u&&(d.g=u+"."+d.g),_r(d,d.s);else{var I=l.location;d=I.protocol,u=u?u+"."+I.hostname:I.hostname,I=+I.port;var A=new ge(null);d&&yr(A,d),u&&(A.g=u),I&&_r(A,I),c&&(A.l=c),d=A}return c=s.D,u=s.ya,c&&u&&Y(d,c,u),Y(d,"VER",s.la),kn(s,d),d}function Lu(s,u,c){if(u&&!s.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=s.Ca&&!s.pa?new nt(new Dn({eb:c})):new nt(s.pa),u.Ha(s.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Bu(){}n=Bu.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Ar(){}Ar.prototype.g=function(s,u){return new Et(s,u)};function Et(s,u){ft.call(this),this.g=new Cu(u),this.l=s,this.h=u&&u.messageUrlParams||null,s=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(s?s["X-WebChannel-Content-Type"]=u.messageContentType:s={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(s?s["X-WebChannel-Client-Profile"]=u.va:s={"X-WebChannel-Client-Profile":u.va}),this.g.S=s,(s=u&&u.Sb)&&!q(s)&&(this.g.m=s),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!q(u)&&(this.g.D=u,s=this.h,s!==null&&u in s&&(s=this.h,u in s&&delete s[u])),this.j=new ke(this)}x(Et,ft),Et.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Et.prototype.close=function(){Xi(this.g)},Et.prototype.o=function(s){var u=this.g;if(typeof s=="string"){var c={};c.__data__=s,s=c}else this.u&&(c={},c.__data__=Bi(s),s=c);u.i.push(new cd(u.Ya++,s)),u.G==3&&Tr(u)},Et.prototype.N=function(){this.g.l=null,delete this.j,Xi(this.g),delete this.g,Et.aa.N.call(this)};function Uu(s){qi.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var u=s.__sm__;if(u){t:{for(let c in u){s=c;break t}s=void 0}(this.i=s)&&(s=this.i,u=u!==null&&s in u?u[s]:void 0),this.data=u}else this.data=s}x(Uu,qi);function qu(){zi.call(this),this.status=1}x(qu,zi);function ke(s){this.g=s}x(ke,Bu),ke.prototype.ua=function(){wt(this.g,"a")},ke.prototype.ta=function(s){wt(this.g,new Uu(s))},ke.prototype.sa=function(s){wt(this.g,new qu)},ke.prototype.ra=function(){wt(this.g,"b")},Ar.prototype.createWebChannel=Ar.prototype.g,Et.prototype.send=Et.prototype.o,Et.prototype.open=Et.prototype.m,Et.prototype.close=Et.prototype.close,As=Gt.createWebChannelTransport=function(){return new Ar},bs=Gt.getStatEventTarget=function(){return fr()},Ts=Gt.Event=me,Nr=Gt.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},mr.NO_ERROR=0,mr.TIMEOUT=8,mr.HTTP_ERROR=6,Un=Gt.ErrorCode=mr,ru.COMPLETE="complete",Is=Gt.EventType=ru,Ya.EventType=In,In.OPEN="a",In.CLOSE="b",In.ERROR="c",In.MESSAGE="d",ft.prototype.listen=ft.prototype.K,Le=Gt.WebChannel=Ya,jf=Gt.FetchXmlHttpFactory=Dn,nt.prototype.listenOnce=nt.prototype.L,nt.prototype.getLastError=nt.prototype.Ka,nt.prototype.getLastErrorCode=nt.prototype.Ba,nt.prototype.getStatus=nt.prototype.Z,nt.prototype.getResponseJson=nt.prototype.Oa,nt.prototype.getResponseText=nt.prototype.oa,nt.prototype.send=nt.prototype.ea,nt.prototype.setWithCredentials=nt.prototype.Ha,Es=Gt.XhrIo=nt}).apply(typeof Vr<"u"?Vr:typeof self<"u"?self:typeof window<"u"?window:{});var Ic="@firebase/firestore",Tc="4.8.0";var ct=class{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}};ct.UNAUTHENTICATED=new ct(null),ct.GOOGLE_CREDENTIALS=new ct("google-credentials-uid"),ct.FIRST_PARTY=new ct("first-party-uid"),ct.MOCK_USER=new ct("mock-user");var cn="11.10.0";var Te=new Me("@firebase/firestore");function Be(){return Te.logLevel}function N(n,...t){if(Te.logLevel<=K.DEBUG){let e=t.map(fa);Te.debug(`Firestore (${cn}): ${n}`,...e)}}function Wt(n,...t){if(Te.logLevel<=K.ERROR){let e=t.map(fa);Te.error(`Firestore (${cn}): ${n}`,...e)}}function ce(n,...t){if(Te.logLevel<=K.WARN){let e=t.map(fa);Te.warn(`Firestore (${cn}): ${n}`,...e)}}function fa(n){if(typeof n=="string")return n;try{return function(e){return JSON.stringify(e)}(n)}catch{return n}}function M(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,dl(n,r,e)}function dl(n,t,e){let r=`FIRESTORE (${cn}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw Wt(r),new Error(r)}function H(n,t,e,r){let i="Unexpected state";typeof e=="string"?i=e:r=e,n||dl(t,i,r)}function B(n,t){return n}var R={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},O=class extends Ut{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var Kt=class{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}};var Ur=class{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}},Ds=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(ct.UNAUTHENTICATED))}shutdown(){}},xs=class{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}},Vs=class{constructor(t){this.t=t,this.currentUser=ct.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){H(this.o===void 0,42304);let r=this.i,i=h=>this.i!==r?(r=this.i,e(h)):Promise.resolve(),o=new Kt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Kt,t.enqueueRetryable(()=>i(this.currentUser))};let a=()=>{let h=o;t.enqueueRetryable(async()=>{await h.promise,await i(this.currentUser)})},l=h=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(h=>l(h)),setTimeout(()=>{if(!this.auth){let h=this.t.getImmediate({optional:!0});h?l(h):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Kt)}},0),a()}getToken(){let t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(r=>this.i!==t?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(H(typeof r.accessToken=="string",31837,{l:r}),new Ur(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){let t=this.auth&&this.auth.getUid();return H(t===null||typeof t=="string",2055,{h:t}),new ct(t)}},Ns=class{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=ct.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);let t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}},ks=class{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new Ns(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(ct.FIRST_PARTY))}shutdown(){}invalidateToken(){}},qr=class{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},Os=class{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,pc(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){H(this.o===void 0,3512);let r=o=>{o.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);let a=o.token!==this.m;return this.m=o.token,N("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>r(o))};let i=o=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(o=>i(o)),setTimeout(()=>{if(!this.appCheck){let o=this.V.getImmediate({optional:!0});o?i(o):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new qr(this.p));let t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(H(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new qr(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}};function $f(n){let t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}function fl(){return new TextEncoder}var Kn=class{static newId(){let t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516),r="";for(;r.length<20;){let i=$f(40);for(let o=0;o<i.length;++o)r.length<20&&i[o]<e&&(r+=t.charAt(i[o]%62))}return r}};function z(n,t){return n<t?-1:n>t?1:0}function Fs(n,t){let e=0;for(;e<n.length&&e<t.length;){let r=n.codePointAt(e),i=t.codePointAt(e);if(r!==i){if(r<128&&i<128)return z(r,i);{let o=fl(),a=Gf(o.encode(bc(n,e)),o.encode(bc(t,e)));return a!==0?a:z(r,i)}}e+=r>65535?2:1}return z(n.length,t.length)}function bc(n,t){return n.codePointAt(t)>65535?n.substring(t,t+2):n.substring(t,t+1)}function Gf(n,t){for(let e=0;e<n.length&&e<t.length;++e)if(n[e]!==t[e])return z(n[e],t[e]);return z(n.length,t.length)}function We(n,t,e){return n.length===t.length&&n.every((r,i)=>e(r,t[i]))}var Ac="__name__",zr=class n{constructor(t,e,r){e===void 0?e=0:e>t.length&&M(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&M(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return n.comparator(this,t)===0}child(t){let e=this.segments.slice(this.offset,this.limit());return t instanceof n?t.forEach(r=>{e.push(r)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){let r=Math.min(t.length,e.length);for(let i=0;i<r;i++){let o=n.compareSegments(t.get(i),e.get(i));if(o!==0)return o}return z(t.length,e.length)}static compareSegments(t,e){let r=n.isNumericId(t),i=n.isNumericId(e);return r&&!i?-1:!r&&i?1:r&&i?n.extractNumericId(t).compare(n.extractNumericId(e)):Fs(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return $t.fromString(t.substring(4,t.length-2))}},it=class n extends zr{construct(t,e,r){return new n(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){let e=[];for(let r of t){if(r.indexOf("//")>=0)throw new O(R.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter(i=>i.length>0))}return new n(e)}static emptyPath(){return new n([])}},Kf=/^[_a-zA-Z][_a-zA-Z0-9]*$/,Tt=class n extends zr{construct(t,e,r){return new n(t,e,r)}static isValidIdentifier(t){return Kf.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),n.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Ac}static keyField(){return new n([Ac])}static fromServerFormat(t){let e=[],r="",i=0,o=()=>{if(r.length===0)throw new O(R.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""},a=!1;for(;i<t.length;){let l=t[i];if(l==="\\"){if(i+1===t.length)throw new O(R.INVALID_ARGUMENT,"Path has trailing escape character: "+t);let h=t[i+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new O(R.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=h,i+=2}else l==="`"?(a=!a,i++):l!=="."||a?(r+=l,i++):(o(),i++)}if(o(),a)throw new O(R.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new n(e)}static emptyPath(){return new n([])}};var L=class n{constructor(t){this.path=t}static fromPath(t){return new n(it.fromString(t))}static fromName(t){return new n(it.fromString(t).popFirst(5))}static empty(){return new n(it.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&it.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return it.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new n(new it(t.slice()))}};function Wf(n,t,e){if(!e)throw new O(R.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function Qf(n,t,e,r){if(t===!0&&r===!0)throw new O(R.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function Sc(n){if(!L.isDocumentKey(n))throw new O(R.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function ml(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function ma(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let t=function(r){return r.constructor?r.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":M(12329,{type:typeof n})}function ie(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new O(R.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let e=ma(n);throw new O(R.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}function at(n,t){let e={typeString:n};return t&&(e.value=t),e}function sr(n,t){if(!ml(n))throw new O(R.INVALID_ARGUMENT,"JSON must be an object");let e;for(let r in t)if(t[r]){let i=t[r].typeString,o="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}let a=n[r];if(i&&typeof a!==i){e=`JSON field '${r}' must be a ${i}.`;break}if(o!==void 0&&a!==o.value){e=`Expected '${r}' field to equal '${o.value}'`;break}}if(e)throw new O(R.INVALID_ARGUMENT,e);return!0}var Rc=-62135596800,Cc=1e6,et=class n{static now(){return n.fromMillis(Date.now())}static fromDate(t){return n.fromMillis(t.getTime())}static fromMillis(t){let e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*Cc);return new n(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new O(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new O(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Rc)throw new O(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new O(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Cc}_compareTo(t){return this.seconds===t.seconds?z(this.nanoseconds,t.nanoseconds):z(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:n._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(sr(t,n._jsonSchema))return new n(t.seconds,t.nanoseconds)}valueOf(){let t=this.seconds-Rc;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};et._jsonSchemaVersion="firestore/timestamp/1.0",et._jsonSchema={type:at("string",et._jsonSchemaVersion),seconds:at("number"),nanoseconds:at("number")};var U=class n{static fromTimestamp(t){return new n(t)}static min(){return new n(new et(0,0))}static max(){return new n(new et(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var Wn=-1,Ms=class{constructor(t,e,r,i){this.indexId=t,this.collectionGroup=e,this.fields=r,this.indexState=i}};Ms.UNKNOWN_ID=-1;function Hf(n,t){let e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=U.fromTimestamp(r===1e9?new et(e+1,0):new et(e,r));return new be(i,L.empty(),t)}function Jf(n){return new be(n.readTime,n.key,Wn)}var be=class n{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new n(U.min(),L.empty(),Wn)}static max(){return new n(U.max(),L.empty(),Wn)}};function Xf(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=L.comparator(n.documentKey,t.documentKey),e!==0?e:z(n.largestBatchId,t.largestBatchId))}var Yf="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",Ls=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}};async function ln(n){if(n.code!==R.FAILED_PRECONDITION||n.message!==Yf)throw n;N("LocalStore","Unexpectedly lost primary lease")}var P=class n{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new n((r,i)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,i)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,i)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{let e=t();return e instanceof n?e:n.resolve(e)}catch(e){return n.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):n.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):n.reject(e)}static resolve(t){return new n((e,r)=>{e(t)})}static reject(t){return new n((e,r)=>{r(t)})}static waitFor(t){return new n((e,r)=>{let i=0,o=0,a=!1;t.forEach(l=>{++i,l.next(()=>{++o,a&&o===i&&e()},h=>r(h))}),a=!0,o===i&&e()})}static or(t){let e=n.resolve(!1);for(let r of t)e=e.next(i=>i?n.resolve(i):r());return e}static forEach(t,e){let r=[];return t.forEach((i,o)=>{r.push(e.call(this,i,o))}),this.waitFor(r)}static mapArray(t,e){return new n((r,i)=>{let o=t.length,a=new Array(o),l=0;for(let h=0;h<o;h++){let f=h;e(t[f]).next(p=>{a[f]=p,++l,l===o&&r(a)},p=>i(p))}})}static doWhile(t,e){return new n((r,i)=>{let o=()=>{t()===!0?e().next(()=>{o()},i):r()};o()})}};function Zf(n){let t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function hn(n){return n.name==="IndexedDbTransactionError"}var Qe=class{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this._e(r),this.ae=r=>e.writeSequenceNumber(r))}_e(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){let t=++this.previousValue;return this.ae&&this.ae(t),t}};Qe.ue=-1;var pa=-1;function vi(n){return n==null}function Qn(n){return n===0&&1/n==-1/0}function tm(n){return typeof n=="number"&&Number.isInteger(n)&&!Qn(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}var pl="";function em(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=Pc(t)),t=nm(n.get(e),t);return Pc(t)}function nm(n,t){let e=t,r=n.length;for(let i=0;i<r;i++){let o=n.charAt(i);switch(o){case"\0":e+="";break;case pl:e+="";break;default:e+=o}}return e}function Pc(n){return n+pl+""}var rm="remoteDocuments",gl="owner";var yl="mutationQueues";var _l="mutations";var wl="documentMutations",im="remoteDocumentsV14";var vl="remoteDocumentGlobal";var El="targets";var Il="targetDocuments";var Tl="targetGlobal",bl="collectionParents";var Al="clientMetadata";var Sl="bundles";var Rl="namedQueries";var sm="indexConfiguration";var om="indexState";var am="indexEntries";var Cl="documentOverlays";var um="globals";var cm=[yl,_l,wl,rm,El,gl,Tl,Il,Al,vl,bl,Sl,Rl],$g=[...cm,Cl],lm=[yl,_l,wl,im,El,gl,Tl,Il,Al,vl,bl,Sl,Rl,Cl],hm=lm,dm=[...hm,sm,om,am];var Gg=[...dm,um];function Dc(n){let t=0;for(let e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function fe(n,t){for(let e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function Pl(n){for(let t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}var rt=class n{constructor(t,e){this.comparator=t,this.root=e||Dt.EMPTY}insert(t,e){return new n(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Dt.BLACK,null,null))}remove(t){return new n(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Dt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){let r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){let i=this.comparator(t,r.key);if(i===0)return e+r.left.size;i<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,r)=>(t(e,r),!1))}toString(){let t=[];return this.inorderTraversal((e,r)=>(t.push(`${e}:${r}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new je(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new je(this.root,t,this.comparator,!1)}getReverseIterator(){return new je(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new je(this.root,t,this.comparator,!0)}},je=class{constructor(t,e,r,i){this.isReverse=i,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&i&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop(),e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}},Dt=class n{constructor(t,e,r,i,o){this.key=t,this.value=e,this.color=r??n.RED,this.left=i??n.EMPTY,this.right=o??n.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,i,o){return new n(t??this.key,e??this.value,r??this.color,i??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let i=this,o=r(t,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(t,e,r),null):o===0?i.copy(null,e,null,null,null):i.copy(null,null,null,null,i.right.insert(t,e,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,i=this;if(e(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,e),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),e(t,i.key)===0){if(i.right.isEmpty())return n.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,e))}return i.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){let t=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){let t=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){let t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){let t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});let t=this.left.check();if(t!==this.right.check())throw M(27949);return t+(this.isRed()?0:1)}};Dt.EMPTY=null,Dt.RED=!0,Dt.BLACK=!1;Dt.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(t,e,r,i,o){return this}insert(t,e,r){return new Dt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var lt=class n{constructor(t){this.comparator=t,this.data=new rt(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,r)=>(t(e),!1))}forEachInRange(t,e){let r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){let i=r.getNext();if(this.comparator(i.key,t[1])>=0)return;e(i.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){let e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new jr(this.data.getIterator())}getIteratorFrom(t){return new jr(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(r=>{e=e.add(r)}),e}isEqual(t){if(!(t instanceof n)||this.size!==t.size)return!1;let e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){let i=e.getNext().key,o=r.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){let t=[];return this.forEach(e=>{t.push(e)}),t}toString(){let t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){let e=new n(this.comparator);return e.data=t,e}},jr=class{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var St=class n{constructor(t){this.fields=t,t.sort(Tt.comparator)}static empty(){return new n([])}unionWith(t){let e=new lt(Tt.comparator);for(let r of this.fields)e=e.add(r);for(let r of t)e=e.add(r);return new n(e.toArray())}covers(t){for(let e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return We(this.fields,t.fields,(e,r)=>e.isEqual(r))}};var $r=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var _t=class n{constructor(t){this.binaryString=t}static fromBase64String(t){let e=function(i){try{return atob(i)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new $r("Invalid base64 string: "+o):o}}(t);return new n(e)}static fromUint8Array(t){let e=function(i){let o="";for(let a=0;a<i.length;++a)o+=String.fromCharCode(i[a]);return o}(t);return new n(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){let r=new Uint8Array(e.length);for(let i=0;i<e.length;i++)r[i]=e.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return z(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}};_t.EMPTY_BYTE_STRING=new _t("");var fm=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Qt(n){if(H(!!n,39018),typeof n=="string"){let t=0,e=fm.exec(n);if(H(!!e,46558,{timestamp:n}),e[1]){let i=e[1];i=(i+"000000000").substr(0,9),t=Number(i)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:tt(n.seconds),nanos:tt(n.nanos)}}function tt(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Ht(n){return typeof n=="string"?_t.fromBase64String(n):_t.fromUint8Array(n)}var Dl="server_timestamp",xl="__type__",Vl="__previous_value__",Nl="__local_write_time__";function ga(n){var t,e;return((e=(((t=n?.mapValue)===null||t===void 0?void 0:t.fields)||{})[xl])===null||e===void 0?void 0:e.stringValue)===Dl}function Ei(n){let t=n.mapValue.fields[Vl];return ga(t)?Ei(t):t}function Hn(n){let t=Qt(n.mapValue.fields[Nl].timestampValue);return new et(t.seconds,t.nanos)}var Bs=class{constructor(t,e,r,i,o,a,l,h,f,p){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=i,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=h,this.useFetchStreams=f,this.isUsingEmulator=p}},Gr="(default)",Kr=class n{constructor(t,e){this.projectId=t,this.database=e||Gr}static empty(){return new n("","")}get isDefaultDatabase(){return this.database===Gr}isEqual(t){return t instanceof n&&t.projectId===this.projectId&&t.database===this.database}};var ya="__type__",kl="__max__",kr={mapValue:{fields:{__type__:{stringValue:kl}}}},_a="__vector__",He="value";function le(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ga(n)?4:Fl(n)?9007199254740991:Ol(n)?10:11:M(28295,{value:n})}function Nt(n,t){if(n===t)return!0;let e=le(n);if(e!==le(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return Hn(n).isEqual(Hn(t));case 3:return function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;let a=Qt(i.timestampValue),l=Qt(o.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(i,o){return Ht(i.bytesValue).isEqual(Ht(o.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(i,o){return tt(i.geoPointValue.latitude)===tt(o.geoPointValue.latitude)&&tt(i.geoPointValue.longitude)===tt(o.geoPointValue.longitude)}(n,t);case 2:return function(i,o){if("integerValue"in i&&"integerValue"in o)return tt(i.integerValue)===tt(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){let a=tt(i.doubleValue),l=tt(o.doubleValue);return a===l?Qn(a)===Qn(l):isNaN(a)&&isNaN(l)}return!1}(n,t);case 9:return We(n.arrayValue.values||[],t.arrayValue.values||[],Nt);case 10:case 11:return function(i,o){let a=i.mapValue.fields||{},l=o.mapValue.fields||{};if(Dc(a)!==Dc(l))return!1;for(let h in a)if(a.hasOwnProperty(h)&&(l[h]===void 0||!Nt(a[h],l[h])))return!1;return!0}(n,t);default:return M(52216,{left:n})}}function Jn(n,t){return(n.values||[]).find(e=>Nt(e,t))!==void 0}function Je(n,t){if(n===t)return 0;let e=le(n),r=le(t);if(e!==r)return z(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return z(n.booleanValue,t.booleanValue);case 2:return function(o,a){let l=tt(o.integerValue||o.doubleValue),h=tt(a.integerValue||a.doubleValue);return l<h?-1:l>h?1:l===h?0:isNaN(l)?isNaN(h)?0:-1:1}(n,t);case 3:return xc(n.timestampValue,t.timestampValue);case 4:return xc(Hn(n),Hn(t));case 5:return Fs(n.stringValue,t.stringValue);case 6:return function(o,a){let l=Ht(o),h=Ht(a);return l.compareTo(h)}(n.bytesValue,t.bytesValue);case 7:return function(o,a){let l=o.split("/"),h=a.split("/");for(let f=0;f<l.length&&f<h.length;f++){let p=z(l[f],h[f]);if(p!==0)return p}return z(l.length,h.length)}(n.referenceValue,t.referenceValue);case 8:return function(o,a){let l=z(tt(o.latitude),tt(a.latitude));return l!==0?l:z(tt(o.longitude),tt(a.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return Vc(n.arrayValue,t.arrayValue);case 10:return function(o,a){var l,h,f,p;let w=o.fields||{},T=a.fields||{},S=(l=w[He])===null||l===void 0?void 0:l.arrayValue,x=(h=T[He])===null||h===void 0?void 0:h.arrayValue,k=z(((f=S?.values)===null||f===void 0?void 0:f.length)||0,((p=x?.values)===null||p===void 0?void 0:p.length)||0);return k!==0?k:Vc(S,x)}(n.mapValue,t.mapValue);case 11:return function(o,a){if(o===kr.mapValue&&a===kr.mapValue)return 0;if(o===kr.mapValue)return 1;if(a===kr.mapValue)return-1;let l=o.fields||{},h=Object.keys(l),f=a.fields||{},p=Object.keys(f);h.sort(),p.sort();for(let w=0;w<h.length&&w<p.length;++w){let T=Fs(h[w],p[w]);if(T!==0)return T;let S=Je(l[h[w]],f[p[w]]);if(S!==0)return S}return z(h.length,p.length)}(n.mapValue,t.mapValue);default:throw M(23264,{le:e})}}function xc(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return z(n,t);let e=Qt(n),r=Qt(t),i=z(e.seconds,r.seconds);return i!==0?i:z(e.nanos,r.nanos)}function Vc(n,t){let e=n.values||[],r=t.values||[];for(let i=0;i<e.length&&i<r.length;++i){let o=Je(e[i],r[i]);if(o)return o}return z(e.length,r.length)}function Xe(n){return Us(n)}function Us(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){let r=Qt(e);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return Ht(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return L.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let r="[",i=!0;for(let o of e.values||[])i?i=!1:r+=",",r+=Us(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(e){let r=Object.keys(e.fields||{}).sort(),i="{",o=!0;for(let a of r)o?o=!1:i+=",",i+=`${a}:${Us(e.fields[a])}`;return i+"}"}(n.mapValue):M(61005,{value:n})}function Mr(n){switch(le(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:let t=Ei(n);return t?16+Mr(t):16;case 5:return 2*n.stringValue.length;case 6:return Ht(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,o)=>i+Mr(o),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return fe(r.fields,(o,a)=>{i+=o.length+Mr(a)}),i}(n.mapValue);default:throw M(13486,{value:n})}}function qs(n){return!!n&&"integerValue"in n}function wa(n){return!!n&&"arrayValue"in n}function Nc(n){return!!n&&"nullValue"in n}function kc(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Lr(n){return!!n&&"mapValue"in n}function Ol(n){var t,e;return((e=(((t=n?.mapValue)===null||t===void 0?void 0:t.fields)||{})[ya])===null||e===void 0?void 0:e.stringValue)===_a}function zn(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){let t={mapValue:{fields:{}}};return fe(n.mapValue.fields,(e,r)=>t.mapValue.fields[e]=zn(r)),t}if(n.arrayValue){let t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=zn(n.arrayValue.values[e]);return t}return Object.assign({},n)}function Fl(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===kl}var Wg={mapValue:{fields:{[ya]:{stringValue:_a},[He]:{arrayValue:{}}}}};var It=class n{constructor(t){this.value=t}static empty(){return new n({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!Lr(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=zn(e)}setAll(t){let e=Tt.emptyPath(),r={},i=[];t.forEach((a,l)=>{if(!e.isImmediateParentOf(l)){let h=this.getFieldsMap(e);this.applyChanges(h,r,i),r={},i=[],e=l.popLast()}a?r[l.lastSegment()]=zn(a):i.push(l.lastSegment())});let o=this.getFieldsMap(e);this.applyChanges(o,r,i)}delete(t){let e=this.field(t.popLast());Lr(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Nt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let i=e.mapValue.fields[t.get(r)];Lr(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=i),e=i}return e.mapValue.fields}applyChanges(t,e,r){fe(e,(i,o)=>t[i]=o);for(let i of r)delete t[i]}clone(){return new n(zn(this.value))}};function Ml(n){let t=[];return fe(n.fields,(e,r)=>{let i=new Tt([e]);if(Lr(r)){let o=Ml(r.mapValue).fields;if(o.length===0)t.push(i);else for(let a of o)t.push(i.child(a))}else t.push(i)}),new St(t)}var Ct=class n{constructor(t,e,r,i,o,a,l){this.key=t,this.documentType=e,this.version=r,this.readTime=i,this.createTime=o,this.data=a,this.documentState=l}static newInvalidDocument(t){return new n(t,0,U.min(),U.min(),U.min(),It.empty(),0)}static newFoundDocument(t,e,r,i){return new n(t,1,e,U.min(),r,i,0)}static newNoDocument(t,e){return new n(t,2,e,U.min(),U.min(),It.empty(),0)}static newUnknownDocument(t,e){return new n(t,3,e,U.min(),U.min(),It.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(U.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=It.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=It.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=U.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof n&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var Ye=class{constructor(t,e){this.position=t,this.inclusive=e}};function Oc(n,t,e){let r=0;for(let i=0;i<n.position.length;i++){let o=t[i],a=n.position[i];if(o.field.isKeyField()?r=L.comparator(L.fromName(a.referenceValue),e.key):r=Je(a,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function Fc(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Nt(n.position[e],t.position[e]))return!1;return!0}var Ze=class{constructor(t,e="asc"){this.field=t,this.dir=e}};function mm(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}var Wr=class{},ut=class n extends Wr{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new js(t,e,r):e==="array-contains"?new Ks(t,r):e==="in"?new Ws(t,r):e==="not-in"?new Qs(t,r):e==="array-contains-any"?new Hs(t,r):new n(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new $s(t,r):new Gs(t,r)}matches(t){let e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Je(e,this.value)):e!==null&&le(this.value)===le(e)&&this.matchesComparison(Je(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},kt=class n extends Wr{constructor(t,e){super(),this.filters=t,this.op=e,this.he=null}static create(t,e){return new n(t,e)}matches(t){return Ll(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}};function Ll(n){return n.op==="and"}function Bl(n){return pm(n)&&Ll(n)}function pm(n){for(let t of n.filters)if(t instanceof kt)return!1;return!0}function zs(n){if(n instanceof ut)return n.field.canonicalString()+n.op.toString()+Xe(n.value);if(Bl(n))return n.filters.map(t=>zs(t)).join(",");{let t=n.filters.map(e=>zs(e)).join(",");return`${n.op}(${t})`}}function Ul(n,t){return n instanceof ut?function(r,i){return i instanceof ut&&r.op===i.op&&r.field.isEqual(i.field)&&Nt(r.value,i.value)}(n,t):n instanceof kt?function(r,i){return i instanceof kt&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((o,a,l)=>o&&Ul(a,i.filters[l]),!0):!1}(n,t):void M(19439)}function ql(n){return n instanceof ut?function(e){return`${e.field.canonicalString()} ${e.op} ${Xe(e.value)}`}(n):n instanceof kt?function(e){return e.op.toString()+" {"+e.getFilters().map(ql).join(" ,")+"}"}(n):"Filter"}var js=class extends ut{constructor(t,e,r){super(t,e,r),this.key=L.fromName(r.referenceValue)}matches(t){let e=L.comparator(t.key,this.key);return this.matchesComparison(e)}},$s=class extends ut{constructor(t,e){super(t,"in",e),this.keys=zl("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}},Gs=class extends ut{constructor(t,e){super(t,"not-in",e),this.keys=zl("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}};function zl(n,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(r=>L.fromName(r.referenceValue))}var Ks=class extends ut{constructor(t,e){super(t,"array-contains",e)}matches(t){let e=t.data.field(this.field);return wa(e)&&Jn(e.arrayValue,this.value)}},Ws=class extends ut{constructor(t,e){super(t,"in",e)}matches(t){let e=t.data.field(this.field);return e!==null&&Jn(this.value.arrayValue,e)}},Qs=class extends ut{constructor(t,e){super(t,"not-in",e)}matches(t){if(Jn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Jn(this.value.arrayValue,e)}},Hs=class extends ut{constructor(t,e){super(t,"array-contains-any",e)}matches(t){let e=t.data.field(this.field);return!(!wa(e)||!e.arrayValue.values)&&e.arrayValue.values.some(r=>Jn(this.value.arrayValue,r))}};var Js=class{constructor(t,e=null,r=[],i=[],o=null,a=null,l=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=i,this.limit=o,this.startAt=a,this.endAt=l,this.Pe=null}};function Mc(n,t=null,e=[],r=[],i=null,o=null,a=null){return new Js(n,t,e,r,i,o,a)}function va(n){let t=B(n);if(t.Pe===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(r=>zs(r)).join(","),e+="|ob:",e+=t.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),vi(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(r=>Xe(r)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(r=>Xe(r)).join(",")),t.Pe=e}return t.Pe}function Ea(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!mm(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!Ul(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!Fc(n.startAt,t.startAt)&&Fc(n.endAt,t.endAt)}function Xs(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}var tn=class{constructor(t,e=null,r=[],i=[],o=null,a="F",l=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=i,this.limit=o,this.limitType=a,this.startAt=l,this.endAt=h,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}};function gm(n,t,e,r,i,o,a,l){return new tn(n,t,e,r,i,o,a,l)}function Ia(n){return new tn(n)}function Lc(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function ym(n){return n.collectionGroup!==null}function jn(n){let t=B(n);if(t.Te===null){t.Te=[];let e=new Set;for(let o of t.explicitOrderBy)t.Te.push(o),e.add(o.field.canonicalString());let r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new lt(Tt.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(f=>{f.isInequality()&&(l=l.add(f.field))})}),l})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.Te.push(new Ze(o,r))}),e.has(Tt.keyField().canonicalString())||t.Te.push(new Ze(Tt.keyField(),r))}return t.Te}function xt(n){let t=B(n);return t.Ie||(t.Ie=_m(t,jn(n))),t.Ie}function _m(n,t){if(n.limitType==="F")return Mc(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(i=>{let o=i.dir==="desc"?"asc":"desc";return new Ze(i.field,o)});let e=n.endAt?new Ye(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Ye(n.startAt.position,n.startAt.inclusive):null;return Mc(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function Ys(n,t,e){return new tn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function Ii(n,t){return Ea(xt(n),xt(t))&&n.limitType===t.limitType}function jl(n){return`${va(xt(n))}|lt:${n.limitType}`}function Ue(n){return`Query(target=${function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map(i=>ql(i)).join(", ")}]`),vi(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map(i=>Xe(i)).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map(i=>Xe(i)).join(",")),`Target(${r})`}(xt(n))}; limitType=${n.limitType})`}function Ti(n,t){return t.isFoundDocument()&&function(r,i){let o=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):L.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,t)&&function(r,i){for(let o of jn(r))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0}(n,t)&&function(r,i){for(let o of r.filters)if(!o.matches(i))return!1;return!0}(n,t)&&function(r,i){return!(r.startAt&&!function(a,l,h){let f=Oc(a,l,h);return a.inclusive?f<=0:f<0}(r.startAt,jn(r),i)||r.endAt&&!function(a,l,h){let f=Oc(a,l,h);return a.inclusive?f>=0:f>0}(r.endAt,jn(r),i))}(n,t)}function wm(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function $l(n){return(t,e)=>{let r=!1;for(let i of jn(n)){let o=vm(i,t,e);if(o!==0)return o;r=r||i.field.isKeyField()}return 0}}function vm(n,t,e){let r=n.field.isKeyField()?L.comparator(t.key,e.key):function(o,a,l){let h=a.data.field(o),f=l.data.field(o);return h!==null&&f!==null?Je(h,f):M(42886)}(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return M(19790,{direction:n.dir})}}var Jt=class{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){let e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(let[i,o]of r)if(this.equalsFn(i,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){let r=this.mapKeyFn(t),i=this.inner[r];if(i===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],t))return void(i[o]=[t,e]);i.push([t,e]),this.innerSize++}delete(t){let e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],t))return r.length===1?delete this.inner[e]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(t){fe(this.inner,(e,r)=>{for(let[i,o]of r)t(i,o)})}isEmpty(){return Pl(this.inner)}size(){return this.innerSize}};var Em=new rt(L.comparator);function Xt(){return Em}var Gl=new rt(L.comparator);function qn(...n){let t=Gl;for(let e of n)t=t.insert(e.key,e);return t}function Kl(n){let t=Gl;return n.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function we(){return $n()}function Wl(){return $n()}function $n(){return new Jt(n=>n.toString(),(n,t)=>n.isEqual(t))}var Im=new rt(L.comparator),Tm=new lt(L.comparator);function G(...n){let t=Tm;for(let e of n)t=t.add(e);return t}var bm=new lt(z);function Am(){return bm}function Ta(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Qn(t)?"-0":t}}function Ql(n){return{integerValue:""+n}}function Sm(n,t){return tm(t)?Ql(t):Ta(n,t)}var en=class{constructor(){this._=void 0}};function Rm(n,t,e){return n instanceof nn?function(i,o){let a={fields:{[xl]:{stringValue:Dl},[Nl]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&ga(o)&&(o=Ei(o)),o&&(a.fields[Vl]=o),{mapValue:a}}(e,t):n instanceof Ae?Jl(n,t):n instanceof Se?Xl(n,t):function(i,o){let a=Hl(i,o),l=Bc(a)+Bc(i.Ee);return qs(a)&&qs(i.Ee)?Ql(l):Ta(i.serializer,l)}(n,t)}function Cm(n,t,e){return n instanceof Ae?Jl(n,t):n instanceof Se?Xl(n,t):e}function Hl(n,t){return n instanceof rn?function(r){return qs(r)||function(o){return!!o&&"doubleValue"in o}(r)}(t)?t:{integerValue:0}:null}var nn=class extends en{},Ae=class extends en{constructor(t){super(),this.elements=t}};function Jl(n,t){let e=Yl(t);for(let r of n.elements)e.some(i=>Nt(i,r))||e.push(r);return{arrayValue:{values:e}}}var Se=class extends en{constructor(t){super(),this.elements=t}};function Xl(n,t){let e=Yl(t);for(let r of n.elements)e=e.filter(i=>!Nt(i,r));return{arrayValue:{values:e}}}var rn=class extends en{constructor(t,e){super(),this.serializer=t,this.Ee=e}};function Bc(n){return tt(n.integerValue||n.doubleValue)}function Yl(n){return wa(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Pm(n,t){return n.field.isEqual(t.field)&&function(r,i){return r instanceof Ae&&i instanceof Ae||r instanceof Se&&i instanceof Se?We(r.elements,i.elements,Nt):r instanceof rn&&i instanceof rn?Nt(r.Ee,i.Ee):r instanceof nn&&i instanceof nn}(n.transform,t.transform)}var Zs=class{constructor(t,e){this.version=t,this.transformResults=e}},se=class n{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new n}static exists(t){return new n(void 0,t)}static updateTime(t){return new n(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}};function Br(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}var sn=class{};function Zl(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new Qr(n.key,se.none()):new Re(n.key,n.data,se.none());{let e=n.data,r=It.empty(),i=new lt(Tt.comparator);for(let o of t.fields)if(!i.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?r.delete(o):r.set(o,a),i=i.add(o)}return new Ot(n.key,r,new St(i.toArray()),se.none())}}function Dm(n,t,e){n instanceof Re?function(i,o,a){let l=i.value.clone(),h=qc(i.fieldTransforms,o,a.transformResults);l.setAll(h),o.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,t,e):n instanceof Ot?function(i,o,a){if(!Br(i.precondition,o))return void o.convertToUnknownDocument(a.version);let l=qc(i.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(th(i)),h.setAll(l),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(n,t,e):function(i,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function Gn(n,t,e,r){return n instanceof Re?function(o,a,l,h){if(!Br(o.precondition,a))return l;let f=o.value.clone(),p=zc(o.fieldTransforms,h,a);return f.setAll(p),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),null}(n,t,e,r):n instanceof Ot?function(o,a,l,h){if(!Br(o.precondition,a))return l;let f=zc(o.fieldTransforms,h,a),p=a.data;return p.setAll(th(o)),p.setAll(f),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),l===null?null:l.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(w=>w.field))}(n,t,e,r):function(o,a,l){return Br(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,t,e)}function xm(n,t){let e=null;for(let r of n.fieldTransforms){let i=t.data.field(r.field),o=Hl(r.transform,i||null);o!=null&&(e===null&&(e=It.empty()),e.set(r.field,o))}return e||null}function Uc(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&We(r,i,(o,a)=>Pm(o,a))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}var Re=class extends sn{constructor(t,e,r,i=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}},Ot=class extends sn{constructor(t,e,r,i,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=i,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}};function th(n){let t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){let r=n.data.field(e);t.set(e,r)}}),t}function qc(n,t,e){let r=new Map;H(n.length===e.length,32656,{Ae:e.length,Re:n.length});for(let i=0;i<e.length;i++){let o=n[i],a=o.transform,l=t.data.field(o.field);r.set(o.field,Cm(a,l,e[i]))}return r}function zc(n,t,e){let r=new Map;for(let i of n){let o=i.transform,a=e.data.field(i.field);r.set(i.field,Rm(o,a,t))}return r}var Qr=class extends sn{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},to=class extends sn{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var eo=class{constructor(t,e,r,i){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(t,e){let r=e.mutationResults;for(let i=0;i<this.mutations.length;i++){let o=this.mutations[i];o.key.isEqual(t.key)&&Dm(o,t,r[i])}}applyToLocalView(t,e){for(let r of this.baseMutations)r.key.isEqual(t.key)&&(e=Gn(r,t,e,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(t.key)&&(e=Gn(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){let r=Wl();return this.mutations.forEach(i=>{let o=t.get(i.key),a=o.overlayedDocument,l=this.applyToLocalView(a,o.mutatedFields);l=e.has(i.key)?null:l;let h=Zl(a,l);h!==null&&r.set(i.key,h),a.isValidDocument()||a.convertToNoDocument(U.min())}),r}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),G())}isEqual(t){return this.batchId===t.batchId&&We(this.mutations,t.mutations,(e,r)=>Uc(e,r))&&We(this.baseMutations,t.baseMutations,(e,r)=>Uc(e,r))}},no=class n{constructor(t,e,r,i){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=i}static from(t,e,r){H(t.mutations.length===r.length,58842,{Ve:t.mutations.length,me:r.length});let i=function(){return Im}(),o=t.mutations;for(let a=0;a<o.length;a++)i=i.insert(o[a].key,r[a].version);return new n(t,e,r,i)}};var ro=class{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var io=class{constructor(t,e){this.count=t,this.unchangedNames=e}};var st,W;function Vm(n){switch(n){case R.OK:return M(64938);case R.CANCELLED:case R.UNKNOWN:case R.DEADLINE_EXCEEDED:case R.RESOURCE_EXHAUSTED:case R.INTERNAL:case R.UNAVAILABLE:case R.UNAUTHENTICATED:return!1;case R.INVALID_ARGUMENT:case R.NOT_FOUND:case R.ALREADY_EXISTS:case R.PERMISSION_DENIED:case R.FAILED_PRECONDITION:case R.ABORTED:case R.OUT_OF_RANGE:case R.UNIMPLEMENTED:case R.DATA_LOSS:return!0;default:return M(15467,{code:n})}}function eh(n){if(n===void 0)return Wt("GRPC error has no .code"),R.UNKNOWN;switch(n){case st.OK:return R.OK;case st.CANCELLED:return R.CANCELLED;case st.UNKNOWN:return R.UNKNOWN;case st.DEADLINE_EXCEEDED:return R.DEADLINE_EXCEEDED;case st.RESOURCE_EXHAUSTED:return R.RESOURCE_EXHAUSTED;case st.INTERNAL:return R.INTERNAL;case st.UNAVAILABLE:return R.UNAVAILABLE;case st.UNAUTHENTICATED:return R.UNAUTHENTICATED;case st.INVALID_ARGUMENT:return R.INVALID_ARGUMENT;case st.NOT_FOUND:return R.NOT_FOUND;case st.ALREADY_EXISTS:return R.ALREADY_EXISTS;case st.PERMISSION_DENIED:return R.PERMISSION_DENIED;case st.FAILED_PRECONDITION:return R.FAILED_PRECONDITION;case st.ABORTED:return R.ABORTED;case st.OUT_OF_RANGE:return R.OUT_OF_RANGE;case st.UNIMPLEMENTED:return R.UNIMPLEMENTED;case st.DATA_LOSS:return R.DATA_LOSS;default:return M(39323,{code:n})}}(W=st||(st={}))[W.OK=0]="OK",W[W.CANCELLED=1]="CANCELLED",W[W.UNKNOWN=2]="UNKNOWN",W[W.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",W[W.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",W[W.NOT_FOUND=5]="NOT_FOUND",W[W.ALREADY_EXISTS=6]="ALREADY_EXISTS",W[W.PERMISSION_DENIED=7]="PERMISSION_DENIED",W[W.UNAUTHENTICATED=16]="UNAUTHENTICATED",W[W.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",W[W.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",W[W.ABORTED=10]="ABORTED",W[W.OUT_OF_RANGE=11]="OUT_OF_RANGE",W[W.UNIMPLEMENTED=12]="UNIMPLEMENTED",W[W.INTERNAL=13]="INTERNAL",W[W.UNAVAILABLE=14]="UNAVAILABLE",W[W.DATA_LOSS=15]="DATA_LOSS";var jc=null;var Nm=new $t([4294967295,4294967295],0);function $c(n){let t=fl().encode(n),e=new vs;return e.update(t),new Uint8Array(e.digest())}function Gc(n){let t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),i=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new $t([e,r],0),new $t([i,o],0)]}var so=class n{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new ve(`Invalid padding: ${e}`);if(r<0)throw new ve(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new ve(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new ve(`Invalid padding when bitmap length is 0: ${e}`);this.fe=8*t.length-e,this.ge=$t.fromNumber(this.fe)}pe(t,e,r){let i=t.add(e.multiply($t.fromNumber(r)));return i.compare(Nm)===1&&(i=new $t([i.getBits(0),i.getBits(1)],0)),i.modulo(this.ge).toNumber()}ye(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.fe===0)return!1;let e=$c(t),[r,i]=Gc(e);for(let o=0;o<this.hashCount;o++){let a=this.pe(r,i,o);if(!this.ye(a))return!1}return!0}static create(t,e,r){let i=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new n(o,i,e);return r.forEach(l=>a.insert(l)),a}insert(t){if(this.fe===0)return;let e=$c(t),[r,i]=Gc(e);for(let o=0;o<this.hashCount;o++){let a=this.pe(r,i,o);this.we(a)}}we(t){let e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}},ve=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};var Hr=class n{constructor(t,e,r,i,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){let i=new Map;return i.set(t,Xn.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new n(U.min(),i,new rt(z),Xt(),G())}},Xn=class n{constructor(t,e,r,i,o){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new n(r,e,G(),G(),G())}};var $e=class{constructor(t,e,r,i){this.Se=t,this.removedTargetIds=e,this.key=r,this.be=i}},Jr=class{constructor(t,e){this.targetId=t,this.De=e}},Xr=class{constructor(t,e,r=_t.EMPTY_BYTE_STRING,i=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=i}},Yr=class{constructor(){this.ve=0,this.Ce=Kc(),this.Fe=_t.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(t){t.approximateByteSize()>0&&(this.xe=!0,this.Fe=t)}Le(){let t=G(),e=G(),r=G();return this.Ce.forEach((i,o)=>{switch(o){case 0:t=t.add(i);break;case 2:e=e.add(i);break;case 1:r=r.add(i);break;default:M(38017,{changeType:o})}}),new Xn(this.Fe,this.Me,t,e,r)}ke(){this.xe=!1,this.Ce=Kc()}qe(t,e){this.xe=!0,this.Ce=this.Ce.insert(t,e)}Qe(t){this.xe=!0,this.Ce=this.Ce.remove(t)}$e(){this.ve+=1}Ue(){this.ve-=1,H(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}},oo=class{constructor(t){this.We=t,this.Ge=new Map,this.ze=Xt(),this.je=Or(),this.Je=Or(),this.He=new rt(z)}Ye(t){for(let e of t.Se)t.be&&t.be.isFoundDocument()?this.Ze(e,t.be):this.Xe(e,t.key,t.be);for(let e of t.removedTargetIds)this.Xe(e,t.key,t.be)}et(t){this.forEachTarget(t,e=>{let r=this.tt(e);switch(t.state){case 0:this.nt(e)&&r.Be(t.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(t.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(e);break;case 3:this.nt(e)&&(r.Ke(),r.Be(t.resumeToken));break;case 4:this.nt(e)&&(this.rt(e),r.Be(t.resumeToken));break;default:M(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.Ge.forEach((r,i)=>{this.nt(i)&&e(i)})}it(t){let e=t.targetId,r=t.De.count,i=this.st(e);if(i){let o=i.target;if(Xs(o))if(r===0){let a=new L(o.path);this.Xe(e,a,Ct.newNoDocument(a,U.min()))}else H(r===1,20013,{expectedCount:r});else{let a=this.ot(e);if(a!==r){let l=this._t(t),h=l?this.ut(l,t,a):1;if(h!==0){this.rt(e);let f=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(e,f)}jc?.ct(function(p,w,T,S,x){var k,V,j,q,$,Z;let bt={localCacheCount:p,existenceFilterCount:w.count,databaseId:T.database,projectId:T.projectId},X=w.unchangedNames;return X&&(bt.bloomFilter={applied:x===0,hashCount:(k=X?.hashCount)!==null&&k!==void 0?k:0,bitmapLength:(q=(j=(V=X?.bits)===null||V===void 0?void 0:V.bitmap)===null||j===void 0?void 0:j.length)!==null&&q!==void 0?q:0,padding:(Z=($=X?.bits)===null||$===void 0?void 0:$.padding)!==null&&Z!==void 0?Z:0,mightContain:E=>{var m;return(m=S?.mightContain(E))!==null&&m!==void 0&&m}}),bt}(a,t.De,this.We.lt(),l,h))}}}}_t(t){let e=t.De.unchangedNames;if(!e||!e.bits)return null;let{bits:{bitmap:r="",padding:i=0},hashCount:o=0}=e,a,l;try{a=Ht(r).toUint8Array()}catch(h){if(h instanceof $r)return ce("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{l=new so(a,i,o)}catch(h){return ce(h instanceof ve?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return l.fe===0?null:l}ut(t,e,r){return e.De.count===r-this.ht(t,e.targetId)?0:2}ht(t,e){let r=this.We.getRemoteKeysForTarget(e),i=0;return r.forEach(o=>{let a=this.We.lt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(l)||(this.Xe(e,o,null),i++)}),i}Pt(t){let e=new Map;this.Ge.forEach((o,a)=>{let l=this.st(a);if(l){if(o.current&&Xs(l.target)){let h=new L(l.target.path);this.Tt(h).has(a)||this.It(a,h)||this.Xe(a,h,Ct.newNoDocument(h,t))}o.Ne&&(e.set(a,o.Le()),o.ke())}});let r=G();this.Je.forEach((o,a)=>{let l=!0;a.forEachWhile(h=>{let f=this.st(h);return!f||f.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(o))}),this.ze.forEach((o,a)=>a.setReadTime(t));let i=new Hr(t,e,this.He,this.ze,r);return this.ze=Xt(),this.je=Or(),this.Je=Or(),this.He=new rt(z),i}Ze(t,e){if(!this.nt(t))return;let r=this.It(t,e.key)?2:0;this.tt(t).qe(e.key,r),this.ze=this.ze.insert(e.key,e),this.je=this.je.insert(e.key,this.Tt(e.key).add(t)),this.Je=this.Je.insert(e.key,this.dt(e.key).add(t))}Xe(t,e,r){if(!this.nt(t))return;let i=this.tt(t);this.It(t,e)?i.qe(e,1):i.Qe(e),this.Je=this.Je.insert(e,this.dt(e).delete(t)),this.Je=this.Je.insert(e,this.dt(e).add(t)),r&&(this.ze=this.ze.insert(e,r))}removeTarget(t){this.Ge.delete(t)}ot(t){let e=this.tt(t).Le();return this.We.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}$e(t){this.tt(t).$e()}tt(t){let e=this.Ge.get(t);return e||(e=new Yr,this.Ge.set(t,e)),e}dt(t){let e=this.Je.get(t);return e||(e=new lt(z),this.Je=this.Je.insert(t,e)),e}Tt(t){let e=this.je.get(t);return e||(e=new lt(z),this.je=this.je.insert(t,e)),e}nt(t){let e=this.st(t)!==null;return e||N("WatchChangeAggregator","Detected inactive target",t),e}st(t){let e=this.Ge.get(t);return e&&e.Oe?null:this.We.Et(t)}rt(t){this.Ge.set(t,new Yr),this.We.getRemoteKeysForTarget(t).forEach(e=>{this.Xe(t,e,null)})}It(t,e){return this.We.getRemoteKeysForTarget(t).has(e)}};function Or(){return new rt(L.comparator)}function Kc(){return new rt(L.comparator)}var km={asc:"ASCENDING",desc:"DESCENDING"},Om={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Fm={and:"AND",or:"OR"},ao=class{constructor(t,e){this.databaseId=t,this.useProto3Json=e}};function uo(n,t){return n.useProto3Json||vi(t)?t:{value:t}}function Zr(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function nh(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function Mm(n,t){return Zr(n,t.toTimestamp())}function Vt(n){return H(!!n,49232),U.fromTimestamp(function(e){let r=Qt(e);return new et(r.seconds,r.nanos)}(n))}function ba(n,t){return co(n,t).canonicalString()}function co(n,t){let e=function(i){return new it(["projects",i.projectId,"databases",i.database])}(n).child("documents");return t===void 0?e:e.child(t)}function rh(n){let t=it.fromString(n);return H(uh(t),10190,{key:t.toString()}),t}function lo(n,t){return ba(n.databaseId,t.path)}function Ss(n,t){let e=rh(t);if(e.get(1)!==n.databaseId.projectId)throw new O(R.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new O(R.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new L(sh(e))}function ih(n,t){return ba(n.databaseId,t)}function Lm(n){let t=rh(n);return t.length===4?it.emptyPath():sh(t)}function ho(n){return new it(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function sh(n){return H(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Wc(n,t,e){return{name:lo(n,t),fields:e.value.mapValue.fields}}function Bm(n,t){let e;if("targetChange"in t){t.targetChange;let r=function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:M(39313,{state:f})}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],o=function(f,p){return f.useProto3Json?(H(p===void 0||typeof p=="string",58123),_t.fromBase64String(p||"")):(H(p===void 0||p instanceof Buffer||p instanceof Uint8Array,16193),_t.fromUint8Array(p||new Uint8Array))}(n,t.targetChange.resumeToken),a=t.targetChange.cause,l=a&&function(f){let p=f.code===void 0?R.UNKNOWN:eh(f.code);return new O(p,f.message||"")}(a);e=new Xr(r,i,o,l||null)}else if("documentChange"in t){t.documentChange;let r=t.documentChange;r.document,r.document.name,r.document.updateTime;let i=Ss(n,r.document.name),o=Vt(r.document.updateTime),a=r.document.createTime?Vt(r.document.createTime):U.min(),l=new It({mapValue:{fields:r.document.fields}}),h=Ct.newFoundDocument(i,o,a,l),f=r.targetIds||[],p=r.removedTargetIds||[];e=new $e(f,p,h.key,h)}else if("documentDelete"in t){t.documentDelete;let r=t.documentDelete;r.document;let i=Ss(n,r.document),o=r.readTime?Vt(r.readTime):U.min(),a=Ct.newNoDocument(i,o),l=r.removedTargetIds||[];e=new $e([],l,a.key,a)}else if("documentRemove"in t){t.documentRemove;let r=t.documentRemove;r.document;let i=Ss(n,r.document),o=r.removedTargetIds||[];e=new $e([],o,i,null)}else{if(!("filter"in t))return M(11601,{At:t});{t.filter;let r=t.filter;r.targetId;let{count:i=0,unchangedNames:o}=r,a=new io(i,o),l=r.targetId;e=new Jr(l,a)}}return e}function Um(n,t){let e;if(t instanceof Re)e={update:Wc(n,t.key,t.value)};else if(t instanceof Qr)e={delete:lo(n,t.key)};else if(t instanceof Ot)e={update:Wc(n,t.key,t.data),updateMask:Hm(t.fieldMask)};else{if(!(t instanceof to))return M(16599,{Rt:t.type});e={verify:lo(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(r=>function(o,a){let l=a.transform;if(l instanceof nn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Ae)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Se)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof rn)return{fieldPath:a.field.canonicalString(),increment:l.Ee};throw M(20930,{transform:a.transform})}(0,r))),t.precondition.isNone||(e.currentDocument=function(i,o){return o.updateTime!==void 0?{updateTime:Mm(i,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:M(27497)}(n,t.precondition)),e}function qm(n,t){return n&&n.length>0?(H(t!==void 0,14353),n.map(e=>function(i,o){let a=i.updateTime?Vt(i.updateTime):Vt(o);return a.isEqual(U.min())&&(a=Vt(o)),new Zs(a,i.transformResults||[])}(e,t))):[]}function zm(n,t){return{documents:[ih(n,t.path)]}}function jm(n,t){let e={structuredQuery:{}},r=t.path,i;t.collectionGroup!==null?(i=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=ih(n,i);let o=function(f){if(f.length!==0)return ah(kt.create(f,"and"))}(t.filters);o&&(e.structuredQuery.where=o);let a=function(f){if(f.length!==0)return f.map(p=>function(T){return{field:qe(T.field),direction:Km(T.dir)}}(p))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);let l=uo(n,t.limit);return l!==null&&(e.structuredQuery.limit=l),t.startAt&&(e.structuredQuery.startAt=function(f){return{before:f.inclusive,values:f.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(f){return{before:!f.inclusive,values:f.position}}(t.endAt)),{Vt:e,parent:i}}function $m(n){let t=Lm(n.parent),e=n.structuredQuery,r=e.from?e.from.length:0,i=null;if(r>0){H(r===1,65062);let p=e.from[0];p.allDescendants?i=p.collectionId:t=t.child(p.collectionId)}let o=[];e.where&&(o=function(w){let T=oh(w);return T instanceof kt&&Bl(T)?T.getFilters():[T]}(e.where));let a=[];e.orderBy&&(a=function(w){return w.map(T=>function(x){return new Ze(ze(x.field),function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(x.direction))}(T))}(e.orderBy));let l=null;e.limit&&(l=function(w){let T;return T=typeof w=="object"?w.value:w,vi(T)?null:T}(e.limit));let h=null;e.startAt&&(h=function(w){let T=!!w.before,S=w.values||[];return new Ye(S,T)}(e.startAt));let f=null;return e.endAt&&(f=function(w){let T=!w.before,S=w.values||[];return new Ye(S,T)}(e.endAt)),gm(t,i,a,o,l,"F",h,f)}function Gm(n,t){let e=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:i})}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function oh(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":let r=ze(e.unaryFilter.field);return ut.create(r,"==",{doubleValue:NaN});case"IS_NULL":let i=ze(e.unaryFilter.field);return ut.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let o=ze(e.unaryFilter.field);return ut.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let a=ze(e.unaryFilter.field);return ut.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}}(n):n.fieldFilter!==void 0?function(e){return ut.create(ze(e.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return kt.create(e.compositeFilter.filters.map(r=>oh(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return M(1026)}}(e.compositeFilter.op))}(n):M(30097,{filter:n})}function Km(n){return km[n]}function Wm(n){return Om[n]}function Qm(n){return Fm[n]}function qe(n){return{fieldPath:n.canonicalString()}}function ze(n){return Tt.fromServerFormat(n.fieldPath)}function ah(n){return n instanceof ut?function(e){if(e.op==="=="){if(kc(e.value))return{unaryFilter:{field:qe(e.field),op:"IS_NAN"}};if(Nc(e.value))return{unaryFilter:{field:qe(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(kc(e.value))return{unaryFilter:{field:qe(e.field),op:"IS_NOT_NAN"}};if(Nc(e.value))return{unaryFilter:{field:qe(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:qe(e.field),op:Wm(e.op),value:e.value}}}(n):n instanceof kt?function(e){let r=e.getFilters().map(i=>ah(i));return r.length===1?r[0]:{compositeFilter:{op:Qm(e.op),filters:r}}}(n):M(54877,{filter:n})}function Hm(n){let t=[];return n.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function uh(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}var Yn=class n{constructor(t,e,r,i,o=U.min(),a=U.min(),l=_t.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=h}withSequenceNumber(t){return new n(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}};var fo=class{constructor(t){this.gt=t}};function Jm(n){let t=$m({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ys(t,t.limit,"L"):t}var ti=class{constructor(){}bt(t,e){this.Dt(t,e),e.vt()}Dt(t,e){if("nullValue"in t)this.Ct(e,5);else if("booleanValue"in t)this.Ct(e,10),e.Ft(t.booleanValue?1:0);else if("integerValue"in t)this.Ct(e,15),e.Ft(tt(t.integerValue));else if("doubleValue"in t){let r=tt(t.doubleValue);isNaN(r)?this.Ct(e,13):(this.Ct(e,15),Qn(r)?e.Ft(0):e.Ft(r))}else if("timestampValue"in t){let r=t.timestampValue;this.Ct(e,20),typeof r=="string"&&(r=Qt(r)),e.Mt(`${r.seconds||""}`),e.Ft(r.nanos||0)}else if("stringValue"in t)this.xt(t.stringValue,e),this.Ot(e);else if("bytesValue"in t)this.Ct(e,30),e.Nt(Ht(t.bytesValue)),this.Ot(e);else if("referenceValue"in t)this.Bt(t.referenceValue,e);else if("geoPointValue"in t){let r=t.geoPointValue;this.Ct(e,45),e.Ft(r.latitude||0),e.Ft(r.longitude||0)}else"mapValue"in t?Fl(t)?this.Ct(e,Number.MAX_SAFE_INTEGER):Ol(t)?this.Lt(t.mapValue,e):(this.kt(t.mapValue,e),this.Ot(e)):"arrayValue"in t?(this.qt(t.arrayValue,e),this.Ot(e)):M(19022,{Qt:t})}xt(t,e){this.Ct(e,25),this.$t(t,e)}$t(t,e){e.Mt(t)}kt(t,e){let r=t.fields||{};this.Ct(e,55);for(let i of Object.keys(r))this.xt(i,e),this.Dt(r[i],e)}Lt(t,e){var r,i;let o=t.fields||{};this.Ct(e,53);let a=He,l=((i=(r=o[a].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.length)||0;this.Ct(e,15),e.Ft(tt(l)),this.xt(a,e),this.Dt(o[a],e)}qt(t,e){let r=t.values||[];this.Ct(e,50);for(let i of r)this.Dt(i,e)}Bt(t,e){this.Ct(e,37),L.fromName(t).path.forEach(r=>{this.Ct(e,60),this.$t(r,e)})}Ct(t,e){t.Ft(e)}Ot(t){t.Ft(2)}};ti.Ut=new ti;var mo=class{constructor(){this.Dn=new po}addToCollectionParentIndex(t,e){return this.Dn.add(e),P.resolve()}getCollectionParents(t,e){return P.resolve(this.Dn.getEntries(e))}addFieldIndex(t,e){return P.resolve()}deleteFieldIndex(t,e){return P.resolve()}deleteAllFieldIndexes(t){return P.resolve()}createTargetIndexes(t,e){return P.resolve()}getDocumentsMatchingTarget(t,e){return P.resolve(null)}getIndexType(t,e){return P.resolve(0)}getFieldIndexes(t,e){return P.resolve([])}getNextCollectionGroupToUpdate(t){return P.resolve(null)}getMinOffset(t,e){return P.resolve(be.min())}getMinOffsetFromCollectionGroup(t,e){return P.resolve(be.min())}updateCollectionGroup(t,e,r){return P.resolve()}updateIndexEntries(t,e){return P.resolve()}},po=class{constructor(){this.index={}}add(t){let e=t.lastSegment(),r=t.popLast(),i=this.index[e]||new lt(it.comparator),o=!i.has(r);return this.index[e]=i.add(r),o}has(t){let e=t.lastSegment(),r=t.popLast(),i=this.index[e];return i&&i.has(r)}getEntries(t){return(this.index[t]||new lt(it.comparator)).toArray()}};var Qg=new Uint8Array(0);var Qc={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},ch=41943040,At=class n{static withCacheSize(t){return new n(t,n.DEFAULT_COLLECTION_PERCENTILE,n.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}};At.DEFAULT_COLLECTION_PERCENTILE=10,At.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,At.DEFAULT=new At(ch,At.DEFAULT_COLLECTION_PERCENTILE,At.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),At.DISABLED=new At(-1,0,0);var Zn=class n{constructor(t){this._r=t}next(){return this._r+=2,this._r}static ar(){return new n(0)}static ur(){return new n(-1)}};var Hc="LruGarbageCollector",Xm=1048576;function Jc([n,t],[e,r]){let i=z(n,e);return i===0?z(t,r):i}var go=class{constructor(t){this.Tr=t,this.buffer=new lt(Jc),this.Ir=0}dr(){return++this.Ir}Er(t){let e=[t,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(e);else{let r=this.buffer.last();Jc(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}},yo=class{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(t){N(Hc,`Garbage collection scheduled in ${t}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){hn(e)?N(Hc,"Ignoring IndexedDB error during garbage collection: ",e):await ln(e)}await this.Rr(3e5)})}},_o=class{constructor(t,e){this.Vr=t,this.params=e}calculateTargetCount(t,e){return this.Vr.mr(t).next(r=>Math.floor(e/100*r))}nthSequenceNumber(t,e){if(e===0)return P.resolve(Qe.ue);let r=new go(e);return this.Vr.forEachTarget(t,i=>r.Er(i.sequenceNumber)).next(()=>this.Vr.gr(t,i=>r.Er(i))).next(()=>r.maxValue)}removeTargets(t,e,r){return this.Vr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.Vr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(N("LruGarbageCollector","Garbage collection skipped; disabled"),P.resolve(Qc)):this.getCacheSize(t).next(r=>r<this.params.cacheSizeCollectionThreshold?(N("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Qc):this.pr(t,e))}getCacheSize(t){return this.Vr.getCacheSize(t)}pr(t,e){let r,i,o,a,l,h,f,p=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(w=>(w>this.params.maximumSequenceNumbersToCollect?(N("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${w}`),i=this.params.maximumSequenceNumbersToCollect):i=w,a=Date.now(),this.nthSequenceNumber(t,i))).next(w=>(r=w,l=Date.now(),this.removeTargets(t,r,e))).next(w=>(o=w,h=Date.now(),this.removeOrphanedDocuments(t,r))).next(w=>(f=Date.now(),Be()<=K.DEBUG&&N("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-p}ms
	Determined least recently used ${i} in `+(l-a)+`ms
	Removed ${o} targets in `+(h-l)+`ms
	Removed ${w} documents in `+(f-h)+`ms
Total Duration: ${f-p}ms`),P.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:o,documentsRemoved:w})))}};function Ym(n,t){return new _o(n,t)}var wo=class{constructor(){this.changes=new Jt(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Ct.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();let r=this.changes.get(e);return r!==void 0?P.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}};var vo=class{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}};var Eo=class{constructor(t,e,r,i){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=i}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next(i=>(r=i,this.remoteDocumentCache.getEntry(t,e))).next(i=>(r!==null&&Gn(r.mutation,i,St.empty(),et.now()),i))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.getLocalViewOfDocuments(t,r,G()).next(()=>r))}getLocalViewOfDocuments(t,e,r=G()){let i=we();return this.populateOverlays(t,i,e).next(()=>this.computeViews(t,e,i,r).next(o=>{let a=qn();return o.forEach((l,h)=>{a=a.insert(l,h.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){let r=we();return this.populateOverlays(t,r,e).next(()=>this.computeViews(t,e,r,G()))}populateOverlays(t,e,r){let i=[];return r.forEach(o=>{e.has(o)||i.push(o)}),this.documentOverlayCache.getOverlays(t,i).next(o=>{o.forEach((a,l)=>{e.set(a,l)})})}computeViews(t,e,r,i){let o=Xt(),a=$n(),l=function(){return $n()}();return e.forEach((h,f)=>{let p=r.get(f.key);i.has(f.key)&&(p===void 0||p.mutation instanceof Ot)?o=o.insert(f.key,f):p!==void 0?(a.set(f.key,p.mutation.getFieldMask()),Gn(p.mutation,f,p.mutation.getFieldMask(),et.now())):a.set(f.key,St.empty())}),this.recalculateAndSaveOverlays(t,o).next(h=>(h.forEach((f,p)=>a.set(f,p)),e.forEach((f,p)=>{var w;return l.set(f,new vo(p,(w=a.get(f))!==null&&w!==void 0?w:null))}),l))}recalculateAndSaveOverlays(t,e){let r=$n(),i=new rt((a,l)=>a-l),o=G();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(let l of a)l.keys().forEach(h=>{let f=e.get(h);if(f===null)return;let p=r.get(h)||St.empty();p=l.applyToLocalView(f,p),r.set(h,p);let w=(i.get(l.batchId)||G()).add(h);i=i.insert(l.batchId,w)})}).next(()=>{let a=[],l=i.getReverseIterator();for(;l.hasNext();){let h=l.getNext(),f=h.key,p=h.value,w=Wl();p.forEach(T=>{if(!o.has(T)){let S=Zl(e.get(T),r.get(T));S!==null&&w.set(T,S),o=o.add(T)}}),a.push(this.documentOverlayCache.saveOverlays(t,f,w))}return P.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.recalculateAndSaveOverlays(t,r))}getDocumentsMatchingQuery(t,e,r,i){return function(a){return L.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):ym(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,i):this.getDocumentsMatchingCollectionQuery(t,e,r,i)}getNextDocuments(t,e,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,i).next(o=>{let a=i-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,i-o.size):P.resolve(we()),l=Wn,h=o;return a.next(f=>P.forEach(f,(p,w)=>(l<w.largestBatchId&&(l=w.largestBatchId),o.get(p)?P.resolve():this.remoteDocumentCache.getEntry(t,p).next(T=>{h=h.insert(p,T)}))).next(()=>this.populateOverlays(t,f,o)).next(()=>this.computeViews(t,h,f,G())).next(p=>({batchId:l,changes:Kl(p)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new L(e)).next(r=>{let i=qn();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(t,e,r,i){let o=e.collectionGroup,a=qn();return this.indexManager.getCollectionParents(t,o).next(l=>P.forEach(l,h=>{let f=function(w,T){return new tn(T,null,w.explicitOrderBy.slice(),w.filters.slice(),w.limit,w.limitType,w.startAt,w.endAt)}(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,f,r,i).next(p=>{p.forEach((w,T)=>{a=a.insert(w,T)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,r,i){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,i))).next(a=>{o.forEach((h,f)=>{let p=f.getKey();a.get(p)===null&&(a=a.insert(p,Ct.newInvalidDocument(p)))});let l=qn();return a.forEach((h,f)=>{let p=o.get(h);p!==void 0&&Gn(p.mutation,f,St.empty(),et.now()),Ti(e,f)&&(l=l.insert(h,f))}),l})}};var Io=class{constructor(t){this.serializer=t,this.Br=new Map,this.Lr=new Map}getBundleMetadata(t,e){return P.resolve(this.Br.get(e))}saveBundleMetadata(t,e){return this.Br.set(e.id,function(i){return{id:i.id,version:i.version,createTime:Vt(i.createTime)}}(e)),P.resolve()}getNamedQuery(t,e){return P.resolve(this.Lr.get(e))}saveNamedQuery(t,e){return this.Lr.set(e.name,function(i){return{name:i.name,query:Jm(i.bundledQuery),readTime:Vt(i.readTime)}}(e)),P.resolve()}};var To=class{constructor(){this.overlays=new rt(L.comparator),this.kr=new Map}getOverlay(t,e){return P.resolve(this.overlays.get(e))}getOverlays(t,e){let r=we();return P.forEach(e,i=>this.getOverlay(t,i).next(o=>{o!==null&&r.set(i,o)})).next(()=>r)}saveOverlays(t,e,r){return r.forEach((i,o)=>{this.wt(t,e,o)}),P.resolve()}removeOverlaysForBatchId(t,e,r){let i=this.kr.get(r);return i!==void 0&&(i.forEach(o=>this.overlays=this.overlays.remove(o)),this.kr.delete(r)),P.resolve()}getOverlaysForCollection(t,e,r){let i=we(),o=e.length+1,a=new L(e.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){let h=l.getNext().value,f=h.getKey();if(!e.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>r&&i.set(h.getKey(),h)}return P.resolve(i)}getOverlaysForCollectionGroup(t,e,r,i){let o=new rt((f,p)=>f-p),a=this.overlays.getIterator();for(;a.hasNext();){let f=a.getNext().value;if(f.getKey().getCollectionGroup()===e&&f.largestBatchId>r){let p=o.get(f.largestBatchId);p===null&&(p=we(),o=o.insert(f.largestBatchId,p)),p.set(f.getKey(),f)}}let l=we(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((f,p)=>l.set(f,p)),!(l.size()>=i)););return P.resolve(l)}wt(t,e,r){let i=this.overlays.get(r.key);if(i!==null){let a=this.kr.get(i.largestBatchId).delete(r.key);this.kr.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new ro(e,r));let o=this.kr.get(e);o===void 0&&(o=G(),this.kr.set(e,o)),this.kr.set(e,o.add(r.key))}};var bo=class{constructor(){this.sessionToken=_t.EMPTY_BYTE_STRING}getSessionToken(t){return P.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,P.resolve()}};var tr=class{constructor(){this.qr=new lt(ot.Qr),this.$r=new lt(ot.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(t,e){let r=new ot(t,e);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(t,e){t.forEach(r=>this.addReference(r,e))}removeReference(t,e){this.Wr(new ot(t,e))}Gr(t,e){t.forEach(r=>this.removeReference(r,e))}zr(t){let e=new L(new it([])),r=new ot(e,t),i=new ot(e,t+1),o=[];return this.$r.forEachInRange([r,i],a=>{this.Wr(a),o.push(a.key)}),o}jr(){this.qr.forEach(t=>this.Wr(t))}Wr(t){this.qr=this.qr.delete(t),this.$r=this.$r.delete(t)}Jr(t){let e=new L(new it([])),r=new ot(e,t),i=new ot(e,t+1),o=G();return this.$r.forEachInRange([r,i],a=>{o=o.add(a.key)}),o}containsKey(t){let e=new ot(t,0),r=this.qr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}},ot=class{constructor(t,e){this.key=t,this.Hr=e}static Qr(t,e){return L.comparator(t.key,e.key)||z(t.Hr,e.Hr)}static Ur(t,e){return z(t.Hr,e.Hr)||L.comparator(t.key,e.key)}};var Ao=class{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.er=1,this.Yr=new lt(ot.Qr)}checkEmpty(t){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,i){let o=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let a=new eo(o,e,r,i);this.mutationQueue.push(a);for(let l of i)this.Yr=this.Yr.add(new ot(l.key,o)),this.indexManager.addToCollectionParentIndex(t,l.key.path.popLast());return P.resolve(a)}lookupMutationBatch(t,e){return P.resolve(this.Zr(e))}getNextMutationBatchAfterBatchId(t,e){let r=e+1,i=this.Xr(r),o=i<0?0:i;return P.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?pa:this.er-1)}getAllMutationBatches(t){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){let r=new ot(e,0),i=new ot(e,Number.POSITIVE_INFINITY),o=[];return this.Yr.forEachInRange([r,i],a=>{let l=this.Zr(a.Hr);o.push(l)}),P.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new lt(z);return e.forEach(i=>{let o=new ot(i,0),a=new ot(i,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([o,a],l=>{r=r.add(l.Hr)})}),P.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(t,e){let r=e.path,i=r.length+1,o=r;L.isDocumentKey(o)||(o=o.child(""));let a=new ot(new L(o),0),l=new lt(z);return this.Yr.forEachWhile(h=>{let f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===i&&(l=l.add(h.Hr)),!0)},a),P.resolve(this.ei(l))}ei(t){let e=[];return t.forEach(r=>{let i=this.Zr(r);i!==null&&e.push(i)}),e}removeMutationBatch(t,e){H(this.ti(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return P.forEach(e.mutations,i=>{let o=new ot(i.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,i.key)}).next(()=>{this.Yr=r})}rr(t){}containsKey(t,e){let r=new ot(e,0),i=this.Yr.firstAfterOrEqual(r);return P.resolve(e.isEqual(i&&i.key))}performConsistencyCheck(t){return this.mutationQueue.length,P.resolve()}ti(t,e){return this.Xr(t)}Xr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Zr(t){let e=this.Xr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}};var So=class{constructor(t){this.ni=t,this.docs=function(){return new rt(L.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){let r=e.key,i=this.docs.get(r),o=i?i.size:0,a=this.ni(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){let e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){let r=this.docs.get(e);return P.resolve(r?r.document.mutableCopy():Ct.newInvalidDocument(e))}getEntries(t,e){let r=Xt();return e.forEach(i=>{let o=this.docs.get(i);r=r.insert(i,o?o.document.mutableCopy():Ct.newInvalidDocument(i))}),P.resolve(r)}getDocumentsMatchingQuery(t,e,r,i){let o=Xt(),a=e.path,l=new L(a.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(l);for(;h.hasNext();){let{key:f,value:{document:p}}=h.getNext();if(!a.isPrefixOf(f.path))break;f.path.length>a.length+1||Xf(Jf(p),r)<=0||(i.has(p.key)||Ti(e,p))&&(o=o.insert(p.key,p.mutableCopy()))}return P.resolve(o)}getAllFromCollectionGroup(t,e,r,i){M(9500)}ri(t,e){return P.forEach(this.docs,r=>e(r))}newChangeBuffer(t){return new Ro(this)}getSize(t){return P.resolve(this.size)}},Ro=class extends wo{constructor(t){super(),this.Or=t}applyChanges(t){let e=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?e.push(this.Or.addEntry(t,i)):this.Or.removeEntry(r)}),P.waitFor(e)}getFromCache(t,e){return this.Or.getEntry(t,e)}getAllFromCache(t,e){return this.Or.getEntries(t,e)}};var Co=class{constructor(t){this.persistence=t,this.ii=new Jt(e=>va(e),Ea),this.lastRemoteSnapshotVersion=U.min(),this.highestTargetId=0,this.si=0,this.oi=new tr,this.targetCount=0,this._i=Zn.ar()}forEachTarget(t,e){return this.ii.forEach((r,i)=>e(i)),P.resolve()}getLastRemoteSnapshotVersion(t){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return P.resolve(this.si)}allocateTargetId(t){return this.highestTargetId=this._i.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.si&&(this.si=e),P.resolve()}hr(t){this.ii.set(t.target,t);let e=t.targetId;e>this.highestTargetId&&(this._i=new Zn(e),this.highestTargetId=e),t.sequenceNumber>this.si&&(this.si=t.sequenceNumber)}addTargetData(t,e){return this.hr(e),this.targetCount+=1,P.resolve()}updateTargetData(t,e){return this.hr(e),P.resolve()}removeTargetData(t,e){return this.ii.delete(e.target),this.oi.zr(e.targetId),this.targetCount-=1,P.resolve()}removeTargets(t,e,r){let i=0,o=[];return this.ii.forEach((a,l)=>{l.sequenceNumber<=e&&r.get(l.targetId)===null&&(this.ii.delete(a),o.push(this.removeMatchingKeysForTargetId(t,l.targetId)),i++)}),P.waitFor(o).next(()=>i)}getTargetCount(t){return P.resolve(this.targetCount)}getTargetData(t,e){let r=this.ii.get(e)||null;return P.resolve(r)}addMatchingKeys(t,e,r){return this.oi.Kr(e,r),P.resolve()}removeMatchingKeys(t,e,r){this.oi.Gr(e,r);let i=this.persistence.referenceDelegate,o=[];return i&&e.forEach(a=>{o.push(i.markPotentiallyOrphaned(t,a))}),P.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.oi.zr(e),P.resolve()}getMatchingKeysForTargetId(t,e){let r=this.oi.Jr(e);return P.resolve(r)}containsKey(t,e){return P.resolve(this.oi.containsKey(e))}};var ei=class{constructor(t,e){this.ai={},this.overlays={},this.ui=new Qe(0),this.ci=!1,this.ci=!0,this.li=new bo,this.referenceDelegate=t(this),this.hi=new Co(this),this.indexManager=new mo,this.remoteDocumentCache=function(i){return new So(i)}(r=>this.referenceDelegate.Pi(r)),this.serializer=new fo(e),this.Ti=new Io(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new To,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.ai[t.toKey()];return r||(r=new Ao(e,this.referenceDelegate),this.ai[t.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(t,e,r){N("MemoryPersistence","Starting transaction:",t);let i=new Po(this.ui.next());return this.referenceDelegate.Ii(),r(i).next(o=>this.referenceDelegate.di(i).next(()=>o)).toPromise().then(o=>(i.raiseOnCommittedEvent(),o))}Ei(t,e){return P.or(Object.values(this.ai).map(r=>()=>r.containsKey(t,e)))}},Po=class extends Ls{constructor(t){super(),this.currentSequenceNumber=t}},Do=class n{constructor(t){this.persistence=t,this.Ai=new tr,this.Ri=null}static Vi(t){return new n(t)}get mi(){if(this.Ri)return this.Ri;throw M(60996)}addReference(t,e,r){return this.Ai.addReference(r,e),this.mi.delete(r.toString()),P.resolve()}removeReference(t,e,r){return this.Ai.removeReference(r,e),this.mi.add(r.toString()),P.resolve()}markPotentiallyOrphaned(t,e){return this.mi.add(e.toString()),P.resolve()}removeTarget(t,e){this.Ai.zr(e.targetId).forEach(i=>this.mi.add(i.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next(i=>{i.forEach(o=>this.mi.add(o.toString()))}).next(()=>r.removeTargetData(t,e))}Ii(){this.Ri=new Set}di(t){let e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.mi,r=>{let i=L.fromPath(r);return this.fi(t,i).next(o=>{o||e.removeEntry(i,U.min())})}).next(()=>(this.Ri=null,e.apply(t)))}updateLimboDocument(t,e){return this.fi(t,e).next(r=>{r?this.mi.delete(e.toString()):this.mi.add(e.toString())})}Pi(t){return 0}fi(t,e){return P.or([()=>P.resolve(this.Ai.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ei(t,e)])}},ni=class n{constructor(t,e){this.persistence=t,this.gi=new Jt(r=>em(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=Ym(this,e)}static Vi(t,e){return new n(t,e)}Ii(){}di(t){return P.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}mr(t){let e=this.yr(t);return this.persistence.getTargetCache().getTargetCount(t).next(r=>e.next(i=>r+i))}yr(t){let e=0;return this.gr(t,r=>{e++}).next(()=>e)}gr(t,e){return P.forEach(this.gi,(r,i)=>this.Sr(t,r,i).next(o=>o?P.resolve():e(i)))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0,i=this.persistence.getRemoteDocumentCache(),o=i.newChangeBuffer();return i.ri(t,a=>this.Sr(t,a,e).next(l=>{l||(r++,o.removeEntry(a,U.min()))})).next(()=>o.apply(t)).next(()=>r)}markPotentiallyOrphaned(t,e){return this.gi.set(e,t.currentSequenceNumber),P.resolve()}removeTarget(t,e){let r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.gi.set(r,t.currentSequenceNumber),P.resolve()}removeReference(t,e,r){return this.gi.set(r,t.currentSequenceNumber),P.resolve()}updateLimboDocument(t,e){return this.gi.set(e,t.currentSequenceNumber),P.resolve()}Pi(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Mr(t.data.value)),e}Sr(t,e,r){return P.or([()=>this.persistence.Ei(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{let i=this.gi.get(e);return P.resolve(i!==void 0&&i>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}};var xo=class n{constructor(t,e,r,i){this.targetId=t,this.fromCache=e,this.Is=r,this.ds=i}static Es(t,e){let r=G(),i=G();for(let o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new n(t,e.fromCache,r,i)}};var Vo=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}};var No=class{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return tc()?8:Zf(Zu())>0?6:4}()}initialize(t,e){this.gs=t,this.indexManager=e,this.As=!0}getDocumentsMatchingQuery(t,e,r,i){let o={result:null};return this.ps(t,e).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.ys(t,e,i,r).next(a=>{o.result=a})}).next(()=>{if(o.result)return;let a=new Vo;return this.ws(t,e,a).next(l=>{if(o.result=l,this.Rs)return this.Ss(t,e,a,l.size)})}).next(()=>o.result)}Ss(t,e,r,i){return r.documentReadCount<this.Vs?(Be()<=K.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",Ue(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),P.resolve()):(Be()<=K.DEBUG&&N("QueryEngine","Query:",Ue(e),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.fs*i?(Be()<=K.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",Ue(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,xt(e))):P.resolve())}ps(t,e){if(Lc(e))return P.resolve(null);let r=xt(e);return this.indexManager.getIndexType(t,r).next(i=>i===0?null:(e.limit!==null&&i===1&&(e=Ys(e,null,"F"),r=xt(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next(o=>{let a=G(...o);return this.gs.getDocuments(t,a).next(l=>this.indexManager.getMinOffset(t,r).next(h=>{let f=this.bs(e,l);return this.Ds(e,f,a,h.readTime)?this.ps(t,Ys(e,null,"F")):this.vs(t,f,e,h)}))})))}ys(t,e,r,i){return Lc(e)||i.isEqual(U.min())?P.resolve(null):this.gs.getDocuments(t,r).next(o=>{let a=this.bs(e,o);return this.Ds(e,a,r,i)?P.resolve(null):(Be()<=K.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Ue(e)),this.vs(t,a,e,Hf(i,Wn)).next(l=>l))})}bs(t,e){let r=new lt($l(t));return e.forEach((i,o)=>{Ti(t,o)&&(r=r.add(o))}),r}Ds(t,e,r,i){if(t.limit===null)return!1;if(r.size!==e.size)return!0;let o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(i)>0)}ws(t,e,r){return Be()<=K.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",Ue(e)),this.gs.getDocumentsMatchingQuery(t,e,be.min(),r)}vs(t,e,r,i){return this.gs.getDocumentsMatchingQuery(t,r,i).next(o=>(e.forEach(a=>{o=o.insert(a.key,a)}),o))}};var Aa="LocalStore",Zm=3e8,ko=class{constructor(t,e,r,i){this.persistence=t,this.Cs=e,this.serializer=i,this.Fs=new rt(z),this.Ms=new Jt(o=>va(o),Ea),this.xs=new Map,this.Os=t.getRemoteDocumentCache(),this.hi=t.getTargetCache(),this.Ti=t.getBundleCache(),this.Ns(r)}Ns(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Eo(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.Fs))}};function tp(n,t,e,r){return new ko(n,t,e,r)}async function lh(n,t){let e=B(n);return await e.persistence.runTransaction("Handle user change","readonly",r=>{let i;return e.mutationQueue.getAllMutationBatches(r).next(o=>(i=o,e.Ns(t),e.mutationQueue.getAllMutationBatches(r))).next(o=>{let a=[],l=[],h=G();for(let f of i){a.push(f.batchId);for(let p of f.mutations)h=h.add(p.key)}for(let f of o){l.push(f.batchId);for(let p of f.mutations)h=h.add(p.key)}return e.localDocuments.getDocuments(r,h).next(f=>({Bs:f,removedBatchIds:a,addedBatchIds:l}))})})}function ep(n,t){let e=B(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{let i=t.batch.keys(),o=e.Os.newChangeBuffer({trackRemovals:!0});return function(l,h,f,p){let w=f.batch,T=w.keys(),S=P.resolve();return T.forEach(x=>{S=S.next(()=>p.getEntry(h,x)).next(k=>{let V=f.docVersions.get(x);H(V!==null,48541),k.version.compareTo(V)<0&&(w.applyToRemoteDocument(k,f),k.isValidDocument()&&(k.setReadTime(f.commitVersion),p.addEntry(k)))})}),S.next(()=>l.mutationQueue.removeMutationBatch(h,w))}(e,r,t,o).next(()=>o.apply(r)).next(()=>e.mutationQueue.performConsistencyCheck(r)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(r,i,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let h=G();for(let f=0;f<l.mutationResults.length;++f)l.mutationResults[f].transformResults.length>0&&(h=h.add(l.batch.mutations[f].key));return h}(t))).next(()=>e.localDocuments.getDocuments(r,i))})}function hh(n){let t=B(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.hi.getLastRemoteSnapshotVersion(e))}function np(n,t){let e=B(n),r=t.snapshotVersion,i=e.Fs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{let a=e.Os.newChangeBuffer({trackRemovals:!0});i=e.Fs;let l=[];t.targetChanges.forEach((p,w)=>{let T=i.get(w);if(!T)return;l.push(e.hi.removeMatchingKeys(o,p.removedDocuments,w).next(()=>e.hi.addMatchingKeys(o,p.addedDocuments,w)));let S=T.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(w)!==null?S=S.withResumeToken(_t.EMPTY_BYTE_STRING,U.min()).withLastLimboFreeSnapshotVersion(U.min()):p.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(p.resumeToken,r)),i=i.insert(w,S),function(k,V,j){return k.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=Zm?!0:j.addedDocuments.size+j.modifiedDocuments.size+j.removedDocuments.size>0}(T,S,p)&&l.push(e.hi.updateTargetData(o,S))});let h=Xt(),f=G();if(t.documentUpdates.forEach(p=>{t.resolvedLimboDocuments.has(p)&&l.push(e.persistence.referenceDelegate.updateLimboDocument(o,p))}),l.push(rp(o,a,t.documentUpdates).next(p=>{h=p.Ls,f=p.ks})),!r.isEqual(U.min())){let p=e.hi.getLastRemoteSnapshotVersion(o).next(w=>e.hi.setTargetsMetadata(o,o.currentSequenceNumber,r));l.push(p)}return P.waitFor(l).next(()=>a.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,h,f)).next(()=>h)}).then(o=>(e.Fs=i,o))}function rp(n,t,e){let r=G(),i=G();return e.forEach(o=>r=r.add(o)),t.getEntries(n,r).next(o=>{let a=Xt();return e.forEach((l,h)=>{let f=o.get(l);h.isFoundDocument()!==f.isFoundDocument()&&(i=i.add(l)),h.isNoDocument()&&h.version.isEqual(U.min())?(t.removeEntry(l,h.readTime),a=a.insert(l,h)):!f.isValidDocument()||h.version.compareTo(f.version)>0||h.version.compareTo(f.version)===0&&f.hasPendingWrites?(t.addEntry(h),a=a.insert(l,h)):N(Aa,"Ignoring outdated watch update for ",l,". Current version:",f.version," Watch version:",h.version)}),{Ls:a,ks:i}})}function ip(n,t){let e=B(n);return e.persistence.runTransaction("Get next mutation batch","readonly",r=>(t===void 0&&(t=pa),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t)))}function sp(n,t){let e=B(n);return e.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return e.hi.getTargetData(r,t).next(o=>o?(i=o,P.resolve(i)):e.hi.allocateTargetId(r).next(a=>(i=new Yn(t,a,"TargetPurposeListen",r.currentSequenceNumber),e.hi.addTargetData(r,i).next(()=>i))))}).then(r=>{let i=e.Fs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(e.Fs=e.Fs.insert(r.targetId,r),e.Ms.set(t,r.targetId)),r})}async function Oo(n,t,e){let r=B(n),i=r.Fs.get(t),o=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",o,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!hn(a))throw a;N(Aa,`Failed to update sequence numbers for target ${t}: ${a}`)}r.Fs=r.Fs.remove(t),r.Ms.delete(i.target)}function Xc(n,t,e){let r=B(n),i=U.min(),o=G();return r.persistence.runTransaction("Execute query","readwrite",a=>function(h,f,p){let w=B(h),T=w.Ms.get(p);return T!==void 0?P.resolve(w.Fs.get(T)):w.hi.getTargetData(f,p)}(r,a,xt(t)).next(l=>{if(l)return i=l.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(a,l.targetId).next(h=>{o=h})}).next(()=>r.Cs.getDocumentsMatchingQuery(a,t,e?i:U.min(),e?o:G())).next(l=>(op(r,wm(t),l),{documents:l,qs:o})))}function op(n,t,e){let r=n.xs.get(t)||U.min();e.forEach((i,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n.xs.set(t,r)}var ri=class{constructor(){this.activeTargetIds=Am()}Gs(t){this.activeTargetIds=this.activeTargetIds.add(t)}zs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ws(){let t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}};var Fo=class{constructor(){this.Fo=new ri,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.Fo.Gs(t),this.Mo[t]||"not-current"}updateQueryState(t,e,r){this.Mo[t]=e}removeLocalQueryTarget(t){this.Fo.zs(t)}isLocalQueryTarget(t){return this.Fo.activeTargetIds.has(t)}clearQueryState(t){delete this.Mo[t]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(t){return this.Fo.activeTargetIds.has(t)}start(){return this.Fo=new ri,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}};var Mo=class{xo(t){}shutdown(){}};var Yc="ConnectivityMonitor",ii=class{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(t){this.ko.push(t)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){N(Yc,"Network connectivity changed: AVAILABLE");for(let t of this.ko)t(0)}Lo(){N(Yc,"Network connectivity changed: UNAVAILABLE");for(let t of this.ko)t(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var Fr=null;function Lo(){return Fr===null?Fr=function(){return 268435456+Math.round(2147483648*Math.random())}():Fr++,"0x"+Fr.toString(16)}var Rs="RestConnection",ap={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"},Bo=class{get Qo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;let e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.$o=e+"://"+t.host,this.Uo=`projects/${r}/databases/${i}`,this.Ko=this.databaseId.database===Gr?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(t,e,r,i,o){let a=Lo(),l=this.Go(t,e.toUriEncodedString());N(Rs,`Sending RPC '${t}' ${a}:`,l,r);let h={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(h,i,o);let{host:f}=new URL(l),p=Cr(f);return this.jo(t,l,h,r,p).then(w=>(N(Rs,`Received RPC '${t}' ${a}: `,w),w),w=>{throw ce(Rs,`RPC '${t}' ${a} failed with error: `,w,"url: ",l,"request:",r),w})}Jo(t,e,r,i,o,a){return this.Wo(t,e,r,i,o)}zo(t,e,r){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+cn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((i,o)=>t[o]=i),r&&r.headers.forEach((i,o)=>t[o]=i)}Go(t,e){let r=ap[t];return`${this.$o}/v1/${e}:${r}`}terminate(){}};var Uo=class{constructor(t){this.Ho=t.Ho,this.Yo=t.Yo}Zo(t){this.Xo=t}e_(t){this.t_=t}n_(t){this.r_=t}onMessage(t){this.i_=t}close(){this.Yo()}send(t){this.Ho(t)}s_(){this.Xo()}o_(){this.t_()}__(t){this.r_(t)}a_(t){this.i_(t)}};var gt="WebChannelConnection",qo=class extends Bo{constructor(t){super(t),this.u_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}jo(t,e,r,i,o){let a=Lo();return new Promise((l,h)=>{let f=new Es;f.setWithCredentials(!0),f.listenOnce(Is.COMPLETE,()=>{try{switch(f.getLastErrorCode()){case Un.NO_ERROR:let w=f.getResponseJson();N(gt,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(w)),l(w);break;case Un.TIMEOUT:N(gt,`RPC '${t}' ${a} timed out`),h(new O(R.DEADLINE_EXCEEDED,"Request time out"));break;case Un.HTTP_ERROR:let T=f.getStatus();if(N(gt,`RPC '${t}' ${a} failed with status:`,T,"response text:",f.getResponseText()),T>0){let S=f.getResponseJson();Array.isArray(S)&&(S=S[0]);let x=S?.error;if(x&&x.status&&x.message){let k=function(j){let q=j.toLowerCase().replace(/_/g,"-");return Object.values(R).indexOf(q)>=0?q:R.UNKNOWN}(x.status);h(new O(k,x.message))}else h(new O(R.UNKNOWN,"Server responded with status "+f.getStatus()))}else h(new O(R.UNAVAILABLE,"Connection failed."));break;default:M(9055,{c_:t,streamId:a,l_:f.getLastErrorCode(),h_:f.getLastError()})}}finally{N(gt,`RPC '${t}' ${a} completed.`)}});let p=JSON.stringify(i);N(gt,`RPC '${t}' ${a} sending request:`,i),f.send(e,"POST",p,r,15)})}P_(t,e,r){let i=Lo(),o=[this.$o,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=As(),l=bs(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.useFetchStreams=!0),this.zo(h.initMessageHeaders,e,r),h.encodeInitMessageHeaders=!0;let p=o.join("");N(gt,`Creating RPC '${t}' stream ${i}: ${p}`,h);let w=a.createWebChannel(p,h);this.T_(w);let T=!1,S=!1,x=new Uo({Ho:V=>{S?N(gt,`Not sending because RPC '${t}' stream ${i} is closed:`,V):(T||(N(gt,`Opening RPC '${t}' stream ${i} transport.`),w.open(),T=!0),N(gt,`RPC '${t}' stream ${i} sending:`,V),w.send(V))},Yo:()=>w.close()}),k=(V,j,q)=>{V.listen(j,$=>{try{q($)}catch(Z){setTimeout(()=>{throw Z},0)}})};return k(w,Le.EventType.OPEN,()=>{S||(N(gt,`RPC '${t}' stream ${i} transport opened.`),x.s_())}),k(w,Le.EventType.CLOSE,()=>{S||(S=!0,N(gt,`RPC '${t}' stream ${i} transport closed`),x.__(),this.I_(w))}),k(w,Le.EventType.ERROR,V=>{S||(S=!0,ce(gt,`RPC '${t}' stream ${i} transport errored. Name:`,V.name,"Message:",V.message),x.__(new O(R.UNAVAILABLE,"The operation could not be completed")))}),k(w,Le.EventType.MESSAGE,V=>{var j;if(!S){let q=V.data[0];H(!!q,16349);let $=q,Z=$?.error||((j=$[0])===null||j===void 0?void 0:j.error);if(Z){N(gt,`RPC '${t}' stream ${i} received error:`,Z);let bt=Z.status,X=function(y){let _=st[y];if(_!==void 0)return eh(_)}(bt),E=Z.message;X===void 0&&(X=R.INTERNAL,E="Unknown error status: "+bt+" with message "+Z.message),S=!0,x.__(new O(X,E)),w.close()}else N(gt,`RPC '${t}' stream ${i} received:`,q),x.a_(q)}}),k(l,Ts.STAT_EVENT,V=>{V.stat===Nr.PROXY?N(gt,`RPC '${t}' stream ${i} detected buffering proxy`):V.stat===Nr.NOPROXY&&N(gt,`RPC '${t}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{x.o_()},0),x}terminate(){this.u_.forEach(t=>t.close()),this.u_=[]}T_(t){this.u_.push(t)}I_(t){this.u_=this.u_.filter(e=>e===t)}};function Cs(){return typeof document<"u"?document:null}function bi(n){return new ao(n,!0)}var si=class{constructor(t,e,r=1e3,i=1.5,o=6e4){this.Fi=t,this.timerId=e,this.d_=r,this.E_=i,this.A_=o,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(t){this.cancel();let e=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),i=Math.max(0,e-r);i>0&&N("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.R_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,i,()=>(this.m_=Date.now(),t())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}};var Zc="PersistentStream",oi=class{constructor(t,e,r,i,o,a,l,h){this.Fi=t,this.w_=r,this.S_=i,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=h,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new si(t,e)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(t){this.q_(),this.stream.send(t)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,t!==4?this.F_.reset():e&&e.code===R.RESOURCE_EXHAUSTED?(Wt(e.toString()),Wt("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):e&&e.code===R.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.n_(e)}U_(){}auth(){this.state=1;let t=this.K_(this.b_),e=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.b_===e&&this.W_(r,i)},r=>{t(()=>{let i=new O(R.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(i)})})}W_(t,e){let r=this.K_(this.b_);this.stream=this.z_(t,e),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.e_(()=>{r(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(i=>{r(()=>this.G_(i))}),this.stream.onMessage(i=>{r(()=>++this.C_==1?this.j_(i):this.onNext(i))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(t){return N(Zc,`close with error: ${t}`),this.stream=null,this.close(4,t)}K_(t){return e=>{this.Fi.enqueueAndForget(()=>this.b_===t?e():(N(Zc,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}},zo=class extends oi{constructor(t,e,r,i,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,i,a),this.serializer=o}z_(t,e){return this.connection.P_("Listen",t,e)}j_(t){return this.onNext(t)}onNext(t){this.F_.reset();let e=Bm(this.serializer,t),r=function(o){if(!("targetChange"in o))return U.min();let a=o.targetChange;return a.targetIds&&a.targetIds.length?U.min():a.readTime?Vt(a.readTime):U.min()}(t);return this.listener.J_(e,r)}H_(t){let e={};e.database=ho(this.serializer),e.addTarget=function(o,a){let l,h=a.target;if(l=Xs(h)?{documents:zm(o,h)}:{query:jm(o,h).Vt},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=nh(o,a.resumeToken);let f=uo(o,a.expectedCount);f!==null&&(l.expectedCount=f)}else if(a.snapshotVersion.compareTo(U.min())>0){l.readTime=Zr(o,a.snapshotVersion.toTimestamp());let f=uo(o,a.expectedCount);f!==null&&(l.expectedCount=f)}return l}(this.serializer,t);let r=Gm(this.serializer,t);r&&(e.labels=r),this.k_(e)}Y_(t){let e={};e.database=ho(this.serializer),e.removeTarget=t,this.k_(e)}},jo=class extends oi{constructor(t,e,r,i,o,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,i,a),this.serializer=o}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(t,e){return this.connection.P_("Write",t,e)}j_(t){return H(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,H(!t.writeResults||t.writeResults.length===0,55816),this.listener.ea()}onNext(t){H(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.F_.reset();let e=qm(t.writeResults,t.commitTime),r=Vt(t.commitTime);return this.listener.ta(r,e)}na(){let t={};t.database=ho(this.serializer),this.k_(t)}X_(t){let e={streamToken:this.lastStreamToken,writes:t.map(r=>Um(this.serializer,r))};this.k_(e)}};var $o=class{},Go=class extends $o{constructor(t,e,r,i){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=i,this.ra=!1}ia(){if(this.ra)throw new O(R.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(t,e,r,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Wo(t,co(e,r),i,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new O(R.UNKNOWN,o.toString())})}Jo(t,e,r,i,o){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Jo(t,co(e,r),i,a,l,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new O(R.UNKNOWN,a.toString())})}terminate(){this.ra=!0,this.connection.terminate()}},Ko=class{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(t){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ua("Offline")))}set(t){this.ha(),this.sa=0,t==="Online"&&(this._a=!1),this.ua(t)}ua(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}ca(t){let e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(Wt(e),this._a=!1):N("OnlineStateTracker",e)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}};var Ce="RemoteStore",Wo=class{constructor(t,e,r,i,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=o,this.Ea.xo(a=>{r.enqueueAndForget(async()=>{De(this)&&(N(Ce,"Restarting streams for network reachability change."),await async function(h){let f=B(h);f.Ia.add(4),await or(f),f.Aa.set("Unknown"),f.Ia.delete(4),await Ai(f)}(this))})}),this.Aa=new Ko(r,i)}};async function Ai(n){if(De(n))for(let t of n.da)await t(!0)}async function or(n){for(let t of n.da)await t(!1)}function dh(n,t){let e=B(n);e.Ta.has(t.targetId)||(e.Ta.set(t.targetId,t),Pa(e)?Ca(e):dn(e).x_()&&Ra(e,t))}function Sa(n,t){let e=B(n),r=dn(e);e.Ta.delete(t),r.x_()&&fh(e,t),e.Ta.size===0&&(r.x_()?r.B_():De(e)&&e.Aa.set("Unknown"))}function Ra(n,t){if(n.Ra.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(U.min())>0){let e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}dn(n).H_(t)}function fh(n,t){n.Ra.$e(t),dn(n).Y_(t)}function Ca(n){n.Ra=new oo({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),Et:t=>n.Ta.get(t)||null,lt:()=>n.datastore.serializer.databaseId}),dn(n).start(),n.Aa.aa()}function Pa(n){return De(n)&&!dn(n).M_()&&n.Ta.size>0}function De(n){return B(n).Ia.size===0}function mh(n){n.Ra=void 0}async function up(n){n.Aa.set("Online")}async function cp(n){n.Ta.forEach((t,e)=>{Ra(n,t)})}async function lp(n,t){mh(n),Pa(n)?(n.Aa.la(t),Ca(n)):n.Aa.set("Unknown")}async function hp(n,t,e){if(n.Aa.set("Online"),t instanceof Xr&&t.state===2&&t.cause)try{await async function(i,o){let a=o.cause;for(let l of o.targetIds)i.Ta.has(l)&&(await i.remoteSyncer.rejectListen(l,a),i.Ta.delete(l),i.Ra.removeTarget(l))}(n,t)}catch(r){N(Ce,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await ai(n,r)}else if(t instanceof $e?n.Ra.Ye(t):t instanceof Jr?n.Ra.it(t):n.Ra.et(t),!e.isEqual(U.min()))try{let r=await hh(n.localStore);e.compareTo(r)>=0&&await function(o,a){let l=o.Ra.Pt(a);return l.targetChanges.forEach((h,f)=>{if(h.resumeToken.approximateByteSize()>0){let p=o.Ta.get(f);p&&o.Ta.set(f,p.withResumeToken(h.resumeToken,a))}}),l.targetMismatches.forEach((h,f)=>{let p=o.Ta.get(h);if(!p)return;o.Ta.set(h,p.withResumeToken(_t.EMPTY_BYTE_STRING,p.snapshotVersion)),fh(o,h);let w=new Yn(p.target,h,f,p.sequenceNumber);Ra(o,w)}),o.remoteSyncer.applyRemoteEvent(l)}(n,e)}catch(r){N(Ce,"Failed to raise snapshot:",r),await ai(n,r)}}async function ai(n,t,e){if(!hn(t))throw t;n.Ia.add(1),await or(n),n.Aa.set("Offline"),e||(e=()=>hh(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{N(Ce,"Retrying IndexedDB access"),await e(),n.Ia.delete(1),await Ai(n)})}function ph(n,t){return t().catch(e=>ai(n,e,t))}async function Si(n){let t=B(n),e=he(t),r=t.Pa.length>0?t.Pa[t.Pa.length-1].batchId:pa;for(;dp(t);)try{let i=await ip(t.localStore,r);if(i===null){t.Pa.length===0&&e.B_();break}r=i.batchId,fp(t,i)}catch(i){await ai(t,i)}gh(t)&&yh(t)}function dp(n){return De(n)&&n.Pa.length<10}function fp(n,t){n.Pa.push(t);let e=he(n);e.x_()&&e.Z_&&e.X_(t.mutations)}function gh(n){return De(n)&&!he(n).M_()&&n.Pa.length>0}function yh(n){he(n).start()}async function mp(n){he(n).na()}async function pp(n){let t=he(n);for(let e of n.Pa)t.X_(e.mutations)}async function gp(n,t,e){let r=n.Pa.shift(),i=no.from(r,t,e);await ph(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await Si(n)}async function yp(n,t){t&&he(n).Z_&&await async function(r,i){if(function(a){return Vm(a)&&a!==R.ABORTED}(i.code)){let o=r.Pa.shift();he(r).N_(),await ph(r,()=>r.remoteSyncer.rejectFailedWrite(o.batchId,i)),await Si(r)}}(n,t),gh(n)&&yh(n)}async function tl(n,t){let e=B(n);e.asyncQueue.verifyOperationInProgress(),N(Ce,"RemoteStore received new credentials");let r=De(e);e.Ia.add(3),await or(e),r&&e.Aa.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ia.delete(3),await Ai(e)}async function _p(n,t){let e=B(n);t?(e.Ia.delete(2),await Ai(e)):t||(e.Ia.add(2),await or(e),e.Aa.set("Unknown"))}function dn(n){return n.Va||(n.Va=function(e,r,i){let o=B(e);return o.ia(),new zo(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(n.datastore,n.asyncQueue,{Zo:up.bind(null,n),e_:cp.bind(null,n),n_:lp.bind(null,n),J_:hp.bind(null,n)}),n.da.push(async t=>{t?(n.Va.N_(),Pa(n)?Ca(n):n.Aa.set("Unknown")):(await n.Va.stop(),mh(n))})),n.Va}function he(n){return n.ma||(n.ma=function(e,r,i){let o=B(e);return o.ia(),new jo(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),e_:mp.bind(null,n),n_:yp.bind(null,n),ea:pp.bind(null,n),ta:gp.bind(null,n)}),n.da.push(async t=>{t?(n.ma.N_(),await Si(n)):(await n.ma.stop(),n.Pa.length>0&&(N(Ce,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))})),n.ma}var Qo=class n{constructor(t,e,r,i,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=i,this.removalCallback=o,this.deferred=new Kt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,i,o){let a=Date.now()+r,l=new n(t,e,a,i,o);return l.start(r),l}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new O(R.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function Da(n,t){if(Wt("AsyncQueue",`${t}: ${n}`),hn(n))return new O(R.UNAVAILABLE,`${t}: ${n}`);throw n}var ui=class n{static emptySet(t){return new n(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||L.comparator(e.key,r.key):(e,r)=>L.comparator(e.key,r.key),this.keyedMap=qn(),this.sortedSet=new rt(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){let e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,r)=>(t(e),!1))}add(t){let e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){let e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof n)||this.size!==t.size)return!1;let e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){let i=e.getNext().key,o=r.getNext().key;if(!i.isEqual(o))return!1}return!0}toString(){let t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){let r=new n;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}};var ci=class{constructor(){this.fa=new rt(L.comparator)}track(t){let e=t.doc.key,r=this.fa.get(e);r?t.type!==0&&r.type===3?this.fa=this.fa.insert(e,t):t.type===3&&r.type!==1?this.fa=this.fa.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.fa=this.fa.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.fa=this.fa.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.fa=this.fa.remove(e):t.type===1&&r.type===2?this.fa=this.fa.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.fa=this.fa.insert(e,{type:2,doc:t.doc}):M(63341,{At:t,ga:r}):this.fa=this.fa.insert(e,t)}pa(){let t=[];return this.fa.inorderTraversal((e,r)=>{t.push(r)}),t}},on=class n{constructor(t,e,r,i,o,a,l,h,f){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=h,this.hasCachedResults=f}static fromInitialDocuments(t,e,r,i,o){let a=[];return e.forEach(l=>{a.push({type:0,doc:l})}),new n(t,e,ui.emptySet(e),a,r,i,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Ii(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;let e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let i=0;i<e.length;i++)if(e[i].type!==r[i].type||!e[i].doc.isEqual(r[i].doc))return!1;return!0}};var Ho=class{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(t=>t.ba())}},Jo=class{constructor(){this.queries=el(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(e,r){let i=B(e),o=i.queries;i.queries=el(),o.forEach((a,l)=>{for(let h of l.wa)h.onError(r)})})(this,new O(R.ABORTED,"Firestore shutting down"))}};function el(){return new Jt(n=>jl(n),Ii)}async function wp(n,t){let e=B(n),r=3,i=t.query,o=e.queries.get(i);o?!o.Sa()&&t.ba()&&(r=2):(o=new Ho,r=t.ba()?0:1);try{switch(r){case 0:o.ya=await e.onListen(i,!0);break;case 1:o.ya=await e.onListen(i,!1);break;case 2:await e.onFirstRemoteStoreListen(i)}}catch(a){let l=Da(a,`Initialization of query '${Ue(t.query)}' failed`);return void t.onError(l)}e.queries.set(i,o),o.wa.push(t),t.va(e.onlineState),o.ya&&t.Ca(o.ya)&&xa(e)}async function vp(n,t){let e=B(n),r=t.query,i=3,o=e.queries.get(r);if(o){let a=o.wa.indexOf(t);a>=0&&(o.wa.splice(a,1),o.wa.length===0?i=t.ba()?0:1:!o.Sa()&&t.ba()&&(i=2))}switch(i){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function Ep(n,t){let e=B(n),r=!1;for(let i of t){let o=i.query,a=e.queries.get(o);if(a){for(let l of a.wa)l.Ca(i)&&(r=!0);a.ya=i}}r&&xa(e)}function Ip(n,t,e){let r=B(n),i=r.queries.get(t);if(i)for(let o of i.wa)o.onError(e);r.queries.delete(t)}function xa(n){n.Da.forEach(t=>{t.next()})}var Xo,nl;(nl=Xo||(Xo={})).Fa="default",nl.Cache="cache";var Yo=class{constructor(t,e,r){this.query=t,this.Ma=e,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(t){if(!this.options.includeMetadataChanges){let r=[];for(let i of t.docChanges)i.type!==3&&r.push(i);t=new on(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.xa?this.Na(t)&&(this.Ma.next(t),e=!0):this.Ba(t,this.onlineState)&&(this.La(t),e=!0),this.Oa=t,e}onError(t){this.Ma.error(t)}va(t){this.onlineState=t;let e=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,t)&&(this.La(this.Oa),e=!0),e}Ba(t,e){if(!t.fromCache||!this.ba())return!0;let r=e!=="Offline";return(!this.options.ka||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Na(t){if(t.docChanges.length>0)return!0;let e=this.Oa&&this.Oa.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}La(t){t=on.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.xa=!0,this.Ma.next(t)}ba(){return this.options.source!==Xo.Cache}};var li=class{constructor(t){this.key=t}},hi=class{constructor(t){this.key=t}},Zo=class{constructor(t,e){this.query=t,this.Ha=e,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=G(),this.mutatedKeys=G(),this.Xa=$l(t),this.eu=new ui(this.Xa)}get tu(){return this.Ha}nu(t,e){let r=e?e.ru:new ci,i=e?e.eu:this.eu,o=e?e.mutatedKeys:this.mutatedKeys,a=i,l=!1,h=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,f=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(t.inorderTraversal((p,w)=>{let T=i.get(p),S=Ti(this.query,w)?w:null,x=!!T&&this.mutatedKeys.has(T.key),k=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations),V=!1;T&&S?T.data.isEqual(S.data)?x!==k&&(r.track({type:3,doc:S}),V=!0):this.iu(T,S)||(r.track({type:2,doc:S}),V=!0,(h&&this.Xa(S,h)>0||f&&this.Xa(S,f)<0)&&(l=!0)):!T&&S?(r.track({type:0,doc:S}),V=!0):T&&!S&&(r.track({type:1,doc:T}),V=!0,(h||f)&&(l=!0)),V&&(S?(a=a.add(S),o=k?o.add(p):o.delete(p)):(a=a.delete(p),o=o.delete(p)))}),this.query.limit!==null)for(;a.size>this.query.limit;){let p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),o=o.delete(p.key),r.track({type:1,doc:p})}return{eu:a,ru:r,Ds:l,mutatedKeys:o}}iu(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,i){let o=this.eu;this.eu=t.eu,this.mutatedKeys=t.mutatedKeys;let a=t.ru.pa();a.sort((p,w)=>function(S,x){let k=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{At:V})}};return k(S)-k(x)}(p.type,w.type)||this.Xa(p.doc,w.doc)),this.su(r),i=i!=null&&i;let l=e&&!i?this.ou():[],h=this.Za.size===0&&this.current&&!i?1:0,f=h!==this.Ya;return this.Ya=h,a.length!==0||f?{snapshot:new on(this.query,t.eu,o,a,t.mutatedKeys,h===0,f,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:l}:{_u:l}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new ci,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(t){return!this.Ha.has(t)&&!!this.eu.has(t)&&!this.eu.get(t).hasLocalMutations}su(t){t&&(t.addedDocuments.forEach(e=>this.Ha=this.Ha.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Ha=this.Ha.delete(e)),this.current=t.current)}ou(){if(!this.current)return[];let t=this.Za;this.Za=G(),this.eu.forEach(r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))});let e=[];return t.forEach(r=>{this.Za.has(r)||e.push(new hi(r))}),this.Za.forEach(r=>{t.has(r)||e.push(new li(r))}),e}uu(t){this.Ha=t.qs,this.Za=G();let e=this.nu(t.documents);return this.applyChanges(e,!0)}cu(){return on.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}},Va="SyncEngine",ta=class{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}},ea=class{constructor(t){this.key=t,this.lu=!1}},na=class{constructor(t,e,r,i,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=i,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.hu={},this.Pu=new Jt(l=>jl(l),Ii),this.Tu=new Map,this.Iu=new Set,this.du=new rt(L.comparator),this.Eu=new Map,this.Au=new tr,this.Ru={},this.Vu=new Map,this.mu=Zn.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}};async function Tp(n,t,e=!0){let r=Th(n),i,o=r.Pu.get(t);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),i=o.view.cu()):i=await _h(r,t,e,!0),i}async function bp(n,t){let e=Th(n);await _h(e,t,!0,!1)}async function _h(n,t,e,r){let i=await sp(n.localStore,xt(t)),o=i.targetId,a=n.sharedClientState.addLocalQueryTarget(o,e),l;return r&&(l=await Ap(n,t,o,a==="current",i.resumeToken)),n.isPrimaryClient&&e&&dh(n.remoteStore,i),l}async function Ap(n,t,e,r,i){n.gu=(w,T,S)=>async function(k,V,j,q){let $=V.view.nu(j);$.Ds&&($=await Xc(k.localStore,V.query,!1).then(({documents:E})=>V.view.nu(E,$)));let Z=q&&q.targetChanges.get(V.targetId),bt=q&&q.targetMismatches.get(V.targetId)!=null,X=V.view.applyChanges($,k.isPrimaryClient,Z,bt);return il(k,V.targetId,X._u),X.snapshot}(n,w,T,S);let o=await Xc(n.localStore,t,!0),a=new Zo(t,o.qs),l=a.nu(o.documents),h=Xn.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",i),f=a.applyChanges(l,n.isPrimaryClient,h);il(n,e,f._u);let p=new ta(t,e,a);return n.Pu.set(t,p),n.Tu.has(e)?n.Tu.get(e).push(t):n.Tu.set(e,[t]),f.snapshot}async function Sp(n,t,e){let r=B(n),i=r.Pu.get(t),o=r.Tu.get(i.targetId);if(o.length>1)return r.Tu.set(i.targetId,o.filter(a=>!Ii(a,t))),void r.Pu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Oo(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),e&&Sa(r.remoteStore,i.targetId),ra(r,i.targetId)}).catch(ln)):(ra(r,i.targetId),await Oo(r.localStore,i.targetId,!0))}async function Rp(n,t){let e=B(n),r=e.Pu.get(t),i=e.Tu.get(r.targetId);e.isPrimaryClient&&i.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),Sa(e.remoteStore,r.targetId))}async function Cp(n,t,e){let r=Op(n);try{let i=await function(a,l){let h=B(a),f=et.now(),p=l.reduce((S,x)=>S.add(x.key),G()),w,T;return h.persistence.runTransaction("Locally write mutations","readwrite",S=>{let x=Xt(),k=G();return h.Os.getEntries(S,p).next(V=>{x=V,x.forEach((j,q)=>{q.isValidDocument()||(k=k.add(j))})}).next(()=>h.localDocuments.getOverlayedDocuments(S,x)).next(V=>{w=V;let j=[];for(let q of l){let $=xm(q,w.get(q.key).overlayedDocument);$!=null&&j.push(new Ot(q.key,$,Ml($.value.mapValue),se.exists(!0)))}return h.mutationQueue.addMutationBatch(S,f,j,l)}).next(V=>{T=V;let j=V.applyToLocalDocumentSet(w,k);return h.documentOverlayCache.saveOverlays(S,V.batchId,j)})}).then(()=>({batchId:T.batchId,changes:Kl(w)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(i.batchId),function(a,l,h){let f=a.Ru[a.currentUser.toKey()];f||(f=new rt(z)),f=f.insert(l,h),a.Ru[a.currentUser.toKey()]=f}(r,i.batchId,e),await ar(r,i.changes),await Si(r.remoteStore)}catch(i){let o=Da(i,"Failed to persist write");e.reject(o)}}async function wh(n,t){let e=B(n);try{let r=await np(e.localStore,t);t.targetChanges.forEach((i,o)=>{let a=e.Eu.get(o);a&&(H(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?a.lu=!0:i.modifiedDocuments.size>0?H(a.lu,14607):i.removedDocuments.size>0&&(H(a.lu,42227),a.lu=!1))}),await ar(e,r,t)}catch(r){await ln(r)}}function rl(n,t,e){let r=B(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){let i=[];r.Pu.forEach((o,a)=>{let l=a.view.va(t);l.snapshot&&i.push(l.snapshot)}),function(a,l){let h=B(a);h.onlineState=l;let f=!1;h.queries.forEach((p,w)=>{for(let T of w.wa)T.va(l)&&(f=!0)}),f&&xa(h)}(r.eventManager,t),i.length&&r.hu.J_(i),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Pp(n,t,e){let r=B(n);r.sharedClientState.updateQueryState(t,"rejected",e);let i=r.Eu.get(t),o=i&&i.key;if(o){let a=new rt(L.comparator);a=a.insert(o,Ct.newNoDocument(o,U.min()));let l=G().add(o),h=new Hr(U.min(),new Map,new rt(z),a,l);await wh(r,h),r.du=r.du.remove(o),r.Eu.delete(t),Na(r)}else await Oo(r.localStore,t,!1).then(()=>ra(r,t,e)).catch(ln)}async function Dp(n,t){let e=B(n),r=t.batch.batchId;try{let i=await ep(e.localStore,t);Eh(e,r,null),vh(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await ar(e,i)}catch(i){await ln(i)}}async function xp(n,t,e){let r=B(n);try{let i=await function(a,l){let h=B(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let p;return h.mutationQueue.lookupMutationBatch(f,l).next(w=>(H(w!==null,37113),p=w.keys(),h.mutationQueue.removeMutationBatch(f,w))).next(()=>h.mutationQueue.performConsistencyCheck(f)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(f,p,l)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,p)).next(()=>h.localDocuments.getDocuments(f,p))})}(r.localStore,t);Eh(r,t,e),vh(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await ar(r,i)}catch(i){await ln(i)}}function vh(n,t){(n.Vu.get(t)||[]).forEach(e=>{e.resolve()}),n.Vu.delete(t)}function Eh(n,t,e){let r=B(n),i=r.Ru[r.currentUser.toKey()];if(i){let o=i.get(t);o&&(e?o.reject(e):o.resolve(),i=i.remove(t)),r.Ru[r.currentUser.toKey()]=i}}function ra(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(let r of n.Tu.get(t))n.Pu.delete(r),e&&n.hu.pu(r,e);n.Tu.delete(t),n.isPrimaryClient&&n.Au.zr(t).forEach(r=>{n.Au.containsKey(r)||Ih(n,r)})}function Ih(n,t){n.Iu.delete(t.path.canonicalString());let e=n.du.get(t);e!==null&&(Sa(n.remoteStore,e),n.du=n.du.remove(t),n.Eu.delete(e),Na(n))}function il(n,t,e){for(let r of e)r instanceof li?(n.Au.addReference(r.key,t),Vp(n,r)):r instanceof hi?(N(Va,"Document no longer in limbo: "+r.key),n.Au.removeReference(r.key,t),n.Au.containsKey(r.key)||Ih(n,r.key)):M(19791,{yu:r})}function Vp(n,t){let e=t.key,r=e.path.canonicalString();n.du.get(e)||n.Iu.has(r)||(N(Va,"New document in limbo: "+e),n.Iu.add(r),Na(n))}function Na(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){let t=n.Iu.values().next().value;n.Iu.delete(t);let e=new L(it.fromString(t)),r=n.mu.next();n.Eu.set(r,new ea(e)),n.du=n.du.insert(e,r),dh(n.remoteStore,new Yn(xt(Ia(e.path)),r,"TargetPurposeLimboResolution",Qe.ue))}}async function ar(n,t,e){let r=B(n),i=[],o=[],a=[];r.Pu.isEmpty()||(r.Pu.forEach((l,h)=>{a.push(r.gu(h,t,e).then(f=>{var p;if((f||e)&&r.isPrimaryClient){let w=f?!f.fromCache:(p=e?.targetChanges.get(h.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(h.targetId,w?"current":"not-current")}if(f){i.push(f);let w=xo.Es(h.targetId,f);o.push(w)}}))}),await Promise.all(a),r.hu.J_(i),await async function(h,f){let p=B(h);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",w=>P.forEach(f,T=>P.forEach(T.Is,S=>p.persistence.referenceDelegate.addReference(w,T.targetId,S)).next(()=>P.forEach(T.ds,S=>p.persistence.referenceDelegate.removeReference(w,T.targetId,S)))))}catch(w){if(!hn(w))throw w;N(Aa,"Failed to update sequence numbers: "+w)}for(let w of f){let T=w.targetId;if(!w.fromCache){let S=p.Fs.get(T),x=S.snapshotVersion,k=S.withLastLimboFreeSnapshotVersion(x);p.Fs=p.Fs.insert(T,k)}}}(r.localStore,o))}async function Np(n,t){let e=B(n);if(!e.currentUser.isEqual(t)){N(Va,"User change. New user:",t.toKey());let r=await lh(e.localStore,t);e.currentUser=t,function(o,a){o.Vu.forEach(l=>{l.forEach(h=>{h.reject(new O(R.CANCELLED,a))})}),o.Vu.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await ar(e,r.Bs)}}function kp(n,t){let e=B(n),r=e.Eu.get(t);if(r&&r.lu)return G().add(r.key);{let i=G(),o=e.Tu.get(t);if(!o)return i;for(let a of o){let l=e.Pu.get(a);i=i.unionWith(l.view.tu)}return i}}function Th(n){let t=B(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=wh.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=kp.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Pp.bind(null,t),t.hu.J_=Ep.bind(null,t.eventManager),t.hu.pu=Ip.bind(null,t.eventManager),t}function Op(n){let t=B(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Dp.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=xp.bind(null,t),t}var an=class{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=bi(t.databaseInfo.databaseId),this.sharedClientState=this.bu(t),this.persistence=this.Du(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Cu(t,this.localStore),this.indexBackfillerScheduler=this.Fu(t,this.localStore)}Cu(t,e){return null}Fu(t,e){return null}vu(t){return tp(this.persistence,new No,t.initialUser,this.serializer)}Du(t){return new ei(Do.Vi,this.serializer)}bu(t){return new Fo}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};an.provider={build:()=>new an};var ia=class extends an{constructor(t){super(),this.cacheSizeBytes=t}Cu(t,e){H(this.persistence.referenceDelegate instanceof ni,46915);let r=this.persistence.referenceDelegate.garbageCollector;return new yo(r,t.asyncQueue,e)}Du(t){let e=this.cacheSizeBytes!==void 0?At.withCacheSize(this.cacheSizeBytes):At.DEFAULT;return new ei(r=>ni.Vi(r,e),this.serializer)}};var er=class{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>rl(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Np.bind(null,this.syncEngine),await _p(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new Jo}()}createDatastore(t){let e=bi(t.databaseInfo.databaseId),r=function(o){return new qo(o)}(t.databaseInfo);return function(o,a,l,h){return new Go(o,a,l,h)}(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return function(r,i,o,a,l){return new Wo(r,i,o,a,l)}(this.localStore,this.datastore,t.asyncQueue,e=>rl(this.syncEngine,e,0),function(){return ii.C()?new ii:new Mo}())}createSyncEngine(t,e){return function(i,o,a,l,h,f,p){let w=new na(i,o,a,l,h,f);return p&&(w.fu=!0),w}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(i){let o=B(i);N(Ce,"RemoteStore shutting down."),o.Ia.add(5),await or(o),o.Ea.shutdown(),o.Aa.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}};er.provider={build:()=>new er};var sa=class{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.xu(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.xu(this.observer.error,t):Wt("Uncaught Error in snapshot listener:",t.toString()))}Ou(){this.muted=!0}xu(t,e){setTimeout(()=>{this.muted||t(e)},0)}};var de="FirestoreClient",oa=class{constructor(t,e,r,i,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this.databaseInfo=i,this.user=ct.UNAUTHENTICATED,this.clientId=Kn.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async a=>{N(de,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(N(de,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();let t=new Kt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){let r=Da(e,"Failed to shutdown persistence");t.reject(r)}}),t.promise}};async function Ps(n,t){n.asyncQueue.verifyOperationInProgress(),N(de,"Initializing OfflineComponentProvider");let e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await lh(t.localStore,i),r=i)}),t.persistence.setDatabaseDeletedListener(()=>{ce("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then(()=>{N("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(i=>{ce("Terminating Firestore due to IndexedDb database deletion failed",i)})}),n._offlineComponents=t}async function sl(n,t){n.asyncQueue.verifyOperationInProgress();let e=await Fp(n);N(de,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener(r=>tl(t.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>tl(t.remoteStore,i)),n._onlineComponents=t}async function Fp(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){N(de,"Using user provided OfflineComponentProvider");try{await Ps(n,n._uninitializedComponentsProvider._offline)}catch(t){let e=t;if(!function(i){return i.name==="FirebaseError"?i.code===R.FAILED_PRECONDITION||i.code===R.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(e))throw e;ce("Error using user provided cache. Falling back to memory cache: "+e),await Ps(n,new an)}}else N(de,"Using default OfflineComponentProvider"),await Ps(n,new ia(void 0));return n._offlineComponents}async function bh(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(N(de,"Using user provided OnlineComponentProvider"),await sl(n,n._uninitializedComponentsProvider._online)):(N(de,"Using default OnlineComponentProvider"),await sl(n,new er))),n._onlineComponents}function Mp(n){return bh(n).then(t=>t.syncEngine)}async function ol(n){let t=await bh(n),e=t.eventManager;return e.onListen=Tp.bind(null,t.syncEngine),e.onUnlisten=Sp.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=bp.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=Rp.bind(null,t.syncEngine),e}function Ah(n){let t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}var al=new Map;var Sh="firestore.googleapis.com",ul=!0,di=class{constructor(t){var e,r;if(t.host===void 0){if(t.ssl!==void 0)throw new O(R.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Sh,this.ssl=ul}else this.host=t.host,this.ssl=(e=t.ssl)!==null&&e!==void 0?e:ul;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=ch;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Xm)throw new O(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Qf("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ah((r=t.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new O(R.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new O(R.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new O(R.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}},nr=class{constructor(t,e,r,i){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new di({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new O(R.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new O(R.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new di(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Ds;switch(r.type){case"firstParty":return new ks(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new O(R.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){let r=al.get(e);r&&(N("ComponentProvider","Removing Datastore"),al.delete(e),r.terminate())}(this),Promise.resolve()}};function ka(n,t,e,r={}){var i;n=ie(n,nr);let o=Cr(t),a=n._getSettings(),l=Object.assign(Object.assign({},a),{emulatorOptions:n._getEmulatorOptions()}),h=`${t}:${e}`;o&&(Ju(`https://${h}`),Yu("Firestore",!0)),a.host!==Sh&&a.host!==h&&ce("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");let f=Object.assign(Object.assign({},a),{host:h,ssl:o,emulatorOptions:r});if(!Fe(f,l)&&(n._setSettings(f),r.mockUserToken)){let p,w;if(typeof r.mockUserToken=="string")p=r.mockUserToken,w=ct.MOCK_USER;else{p=Xu(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);let T=r.mockUserToken.sub||r.mockUserToken.user_id;if(!T)throw new O(R.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");w=new ct(T)}n._authCredentials=new xs(new Ur(p,w))}}var fi=class n{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new n(this.firestore,t,this._query)}},yt=class n{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new rr(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new n(this.firestore,t,this._key)}toJSON(){return{type:n._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(sr(e,n._jsonSchema))return new n(t,r||null,new L(it.fromString(e.referencePath)))}};yt._jsonSchemaVersion="firestore/documentReference/1.0",yt._jsonSchema={type:at("string",yt._jsonSchemaVersion),referencePath:at("string")};var rr=class n extends fi{constructor(t,e,r){super(t,e,Ia(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let t=this._path.popLast();return t.isEmpty()?null:new yt(this.firestore,null,new L(t))}withConverter(t){return new n(this.firestore,t,this._path)}};function fn(n,t,...e){if(n=qt(n),arguments.length===1&&(t=Kn.newId()),Wf("doc","path",t),n instanceof nr){let r=it.fromString(t,...e);return Sc(r),new yt(n,null,new L(r))}{if(!(n instanceof yt||n instanceof rr))throw new O(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(it.fromString(t,...e));return Sc(r),new yt(n.firestore,n instanceof rr?n.converter:null,new L(r))}}var cl="AsyncQueue",mi=class{constructor(t=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new si(this,"async_queue_retry"),this.oc=()=>{let r=Cs();r&&N(cl,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=t;let e=Cs();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.ac(),this.uc(t)}enterRestrictedMode(t){if(!this.Xu){this.Xu=!0,this.rc=t||!1;let e=Cs();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.oc)}}enqueue(t){if(this.ac(),this.Xu)return new Promise(()=>{});let e=new Kt;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Zu.push(t),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(t){if(!hn(t))throw t;N(cl,"Operation failed with retryable error: "+t)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(t){let e=this._c.then(()=>(this.nc=!0,t().catch(r=>{throw this.tc=r,this.nc=!1,Wt("INTERNAL UNHANDLED ERROR: ",ll(r)),r}).then(r=>(this.nc=!1,r))));return this._c=e,e}enqueueAfterDelay(t,e,r){this.ac(),this.sc.indexOf(t)>-1&&(e=0);let i=Qo.createAndSchedule(this,t,e,r,o=>this.lc(o));return this.ec.push(i),i}ac(){this.tc&&M(47125,{hc:ll(this.tc)})}verifyOperationInProgress(){}async Pc(){let t;do t=this._c,await t;while(t!==this._c)}Tc(t){for(let e of this.ec)if(e.timerId===t)return!0;return!1}Ic(t){return this.Pc().then(()=>{this.ec.sort((e,r)=>e.targetTimeMs-r.targetTimeMs);for(let e of this.ec)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Pc()})}dc(t){this.sc.push(t)}lc(t){let e=this.ec.indexOf(t);this.ec.splice(e,1)}};function ll(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}function hl(n){return function(e,r){if(typeof e!="object"||e===null)return!1;let i=e;for(let o of r)if(o in i&&typeof i[o]=="function")return!0;return!1}(n,["next","error","complete"])}var Pe=class extends nr{constructor(t,e,r,i){super(t,e,r,i),this.type="firestore",this._queue=new mi,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let t=this._firestoreClient.terminate();this._queue=new mi(t),this._firestoreClient=void 0,await t}}};function Rh(n,t){let e=typeof n=="object"?n:yc(),r=typeof n=="string"?n:t||Gr,i=mc(e,"firestore").getImmediate({identifier:r});if(!i._initialized){let o=Hu("firestore");o&&ka(i,...o)}return i}function Ch(n){if(n._terminated)throw new O(R.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Lp(n),n._firestoreClient}function Lp(n){var t,e,r;let i=n._freezeSettings(),o=function(l,h,f,p){return new Bs(l,h,f,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,Ah(p.experimentalLongPollingOptions),p.useFetchStreams,p.isUsingEmulator)}(n._databaseId,((t=n._app)===null||t===void 0?void 0:t.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((e=i.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new oa(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(l){let h=l?._online.build();return{_offline:l?._offline.build(h),_online:h}}(n._componentsProvider))}var oe=class n{constructor(t){this._byteString=t}static fromBase64String(t){try{return new n(_t.fromBase64String(t))}catch(e){throw new O(R.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new n(_t.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:n._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(sr(t,n._jsonSchema))return n.fromBase64String(t.bytes)}};oe._jsonSchemaVersion="firestore/bytes/1.0",oe._jsonSchema={type:at("string",oe._jsonSchemaVersion),bytes:at("string")};var un=class{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new O(R.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Tt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}};var ir=class{constructor(t){this._methodName=t}};var ae=class n{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new O(R.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new O(R.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return z(this._lat,t._lat)||z(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:n._jsonSchemaVersion}}static fromJSON(t){if(sr(t,n._jsonSchema))return new n(t.latitude,t.longitude)}};ae._jsonSchemaVersion="firestore/geoPoint/1.0",ae._jsonSchema={type:at("string",ae._jsonSchemaVersion),latitude:at("number"),longitude:at("number")};var ue=class n{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(r,i){if(r.length!==i.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==i[o])return!1;return!0}(this._values,t._values)}toJSON(){return{type:n._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(sr(t,n._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every(e=>typeof e=="number"))return new n(t.vectorValues);throw new O(R.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}};ue._jsonSchemaVersion="firestore/vectorValue/1.0",ue._jsonSchema={type:at("string",ue._jsonSchemaVersion),vectorValues:at("object")};var Bp=/^__.*__$/,aa=class{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new Ot(t,this.data,this.fieldMask,e,this.fieldTransforms):new Re(t,this.data,e,this.fieldTransforms)}},pi=class{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return new Ot(t,this.data,this.fieldMask,e,this.fieldTransforms)}};function Ph(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{Ec:n})}}var ua=class n{constructor(t,e,r,i,o,a){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=i,o===void 0&&this.Ac(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(t){return new n(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(t){var e;let r=(e=this.path)===null||e===void 0?void 0:e.child(t),i=this.Rc({path:r,mc:!1});return i.fc(t),i}gc(t){var e;let r=(e=this.path)===null||e===void 0?void 0:e.child(t),i=this.Rc({path:r,mc:!1});return i.Ac(),i}yc(t){return this.Rc({path:void 0,mc:!0})}wc(t){return yi(t,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}Ac(){if(this.path)for(let t=0;t<this.path.length;t++)this.fc(this.path.get(t))}fc(t){if(t.length===0)throw this.wc("Document fields must not be empty");if(Ph(this.Ec)&&Bp.test(t))throw this.wc('Document fields cannot begin and end with "__"')}},ca=class{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||bi(t)}Dc(t,e,r,i=!1){return new ua({Ec:t,methodName:e,bc:r,path:Tt.emptyPath(),mc:!1,Sc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function Dh(n){let t=n._freezeSettings(),e=bi(n._databaseId);return new ca(n._databaseId,!!t.ignoreUndefinedProperties,e)}function Up(n,t,e,r,i,o={}){let a=n.Dc(o.merge||o.mergeFields?2:0,t,e,i);Oa("Data must be an object, but it was:",a,r);let l=xh(r,a),h,f;if(o.merge)h=new St(a.fieldMask),f=a.fieldTransforms;else if(o.mergeFields){let p=[];for(let w of o.mergeFields){let T=la(t,w,e);if(!a.contains(T))throw new O(R.INVALID_ARGUMENT,`Field '${T}' is specified in your field mask but missing from your input data.`);Nh(p,T)||p.push(T)}h=new St(p),f=a.fieldTransforms.filter(w=>h.covers(w.field))}else h=null,f=a.fieldTransforms;return new aa(new It(l),h,f)}var gi=class n extends ir{_toFieldTransform(t){if(t.Ec!==2)throw t.Ec===1?t.wc(`${this._methodName}() can only appear at the top level of your update data`):t.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof n}};function qp(n,t,e,r){let i=n.Dc(1,t,e);Oa("Data must be an object, but it was:",i,r);let o=[],a=It.empty();fe(r,(h,f)=>{let p=Fa(t,h,e);f=qt(f);let w=i.gc(p);if(f instanceof gi)o.push(p);else{let T=Ri(f,w);T!=null&&(o.push(p),a.set(p,T))}});let l=new St(o);return new pi(a,l,i.fieldTransforms)}function zp(n,t,e,r,i,o){let a=n.Dc(1,t,e),l=[la(t,r,e)],h=[i];if(o.length%2!=0)throw new O(R.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let T=0;T<o.length;T+=2)l.push(la(t,o[T])),h.push(o[T+1]);let f=[],p=It.empty();for(let T=l.length-1;T>=0;--T)if(!Nh(f,l[T])){let S=l[T],x=h[T];x=qt(x);let k=a.gc(S);if(x instanceof gi)f.push(S);else{let V=Ri(x,k);V!=null&&(f.push(S),p.set(S,V))}}let w=new St(f);return new pi(p,w,a.fieldTransforms)}function Ri(n,t){if(Vh(n=qt(n)))return Oa("Unsupported field value:",t,n),xh(n,t);if(n instanceof ir)return function(r,i){if(!Ph(i.Ec))throw i.wc(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.wc(`${r._methodName}() is not currently supported inside arrays`);let o=r._toFieldTransform(i);o&&i.fieldTransforms.push(o)}(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.mc&&t.Ec!==4)throw t.wc("Nested arrays are not supported");return function(r,i){let o=[],a=0;for(let l of r){let h=Ri(l,i.yc(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}}(n,t)}return function(r,i){if((r=qt(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Sm(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){let o=et.fromDate(r);return{timestampValue:Zr(i.serializer,o)}}if(r instanceof et){let o=new et(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Zr(i.serializer,o)}}if(r instanceof ae)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof oe)return{bytesValue:nh(i.serializer,r._byteString)};if(r instanceof yt){let o=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw i.wc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:ba(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof ue)return function(a,l){return{mapValue:{fields:{[ya]:{stringValue:_a},[He]:{arrayValue:{values:a.toArray().map(f=>{if(typeof f!="number")throw l.wc("VectorValues must only contain numeric values.");return Ta(l.serializer,f)})}}}}}}(r,i);throw i.wc(`Unsupported field value: ${ma(r)}`)}(n,t)}function xh(n,t){let e={};return Pl(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):fe(n,(r,i)=>{let o=Ri(i,t.Vc(r));o!=null&&(e[r]=o)}),{mapValue:{fields:e}}}function Vh(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof et||n instanceof ae||n instanceof oe||n instanceof yt||n instanceof ir||n instanceof ue)}function Oa(n,t,e){if(!Vh(e)||!ml(e)){let r=ma(e);throw r==="an object"?t.wc(n+" a custom object"):t.wc(n+" "+r)}}function la(n,t,e){if((t=qt(t))instanceof un)return t._internalPath;if(typeof t=="string")return Fa(n,t);throw yi("Field path arguments must be of type string or ",n,!1,void 0,e)}var jp=new RegExp("[~\\*/\\[\\]]");function Fa(n,t,e){if(t.search(jp)>=0)throw yi(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new un(...t.split("."))._internalPath}catch{throw yi(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function yi(n,t,e,r,i){let o=r&&!r.isEmpty(),a=i!==void 0,l=`Function ${t}() called with invalid data`;e&&(l+=" (via `toFirestore()`)"),l+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${r}`),a&&(h+=` in document ${i}`),h+=")"),new O(R.INVALID_ARGUMENT,l+n+h)}function Nh(n,t){return n.some(e=>e.isEqual(t))}var _i=class{constructor(t,e,r,i,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=i,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new yt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let t=new ha(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){let e=this._document.data.field(kh("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}},ha=class extends _i{data(){return super.data()}};function kh(n,t){return typeof t=="string"?Fa(n,t):t instanceof un?t._internalPath:t._delegate._internalPath}function $p(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new O(R.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}var da=class{convertValue(t,e="none"){switch(le(t)){case 0:return null;case 1:return t.booleanValue;case 2:return tt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Ht(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw M(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){let r={};return fe(t,(i,o)=>{r[i]=this.convertValue(o,e)}),r}convertVectorValue(t){var e,r,i;let o=(i=(r=(e=t.fields)===null||e===void 0?void 0:e[He].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(a=>tt(a.doubleValue));return new ue(o)}convertGeoPoint(t){return new ae(tt(t.latitude),tt(t.longitude))}convertArray(t,e){return(t.values||[]).map(r=>this.convertValue(r,e))}convertServerTimestamp(t,e){switch(e){case"previous":let r=Ei(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(Hn(t));default:return null}}convertTimestamp(t){let e=Qt(t);return new et(e.seconds,e.nanos)}convertDocumentKey(t,e){let r=it.fromString(t);H(uh(r),9688,{name:t});let i=new Kr(r.get(1),r.get(3)),o=new L(r.popFirst(5));return i.isEqual(e)||Wt(`Document ${o} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}};function Gp(n,t,e){let r;return r=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,r}var Ee=class{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}},Ie=class n extends _i{constructor(t,e,r,i,o,a){super(t,e,r,i,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){let e=new Ge(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){let r=this._document.data.field(kh("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new O(R.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let t=this._document,e={};return e.type=n._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}};Ie._jsonSchemaVersion="firestore/documentSnapshot/1.0",Ie._jsonSchema={type:at("string",Ie._jsonSchemaVersion),bundleSource:at("string","DocumentSnapshot"),bundleName:at("string"),bundle:at("string")};var Ge=class extends Ie{data(t={}){return super.data(t)}},Ke=class n{constructor(t,e,r,i){this._firestore=t,this._userDataWriter=e,this._snapshot=i,this.metadata=new Ee(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){let t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(r=>{t.call(e,new Ge(this._firestore,this._userDataWriter,r.key,r,new Ee(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){let e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new O(R.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(i,o){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(l=>{let h=new Ge(i._firestore,i._userDataWriter,l.doc.key,l.doc,new Ee(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);return l.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(l=>o||l.type!==3).map(l=>{let h=new Ge(i._firestore,i._userDataWriter,l.doc.key,l.doc,new Ee(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter),f=-1,p=-1;return l.type!==0&&(f=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),p=a.indexOf(l.doc.key)),{type:Kp(l.type),doc:h,oldIndex:f,newIndex:p}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new O(R.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let t={};t.type=n._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=Kn.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;let e=[],r=[],i=[];return this.docs.forEach(o=>{o._document!==null&&(e.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),i.push(o.ref.path))}),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}};function Kp(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:n})}}Ke._jsonSchemaVersion="firestore/querySnapshot/1.0",Ke._jsonSchema={type:at("string",Ke._jsonSchemaVersion),bundleSource:at("string","QuerySnapshot"),bundleName:at("string"),bundle:at("string")};var wi=class extends da{constructor(t){super(),this.firestore=t}convertBytes(t){return new oe(t)}convertReference(t){let e=this.convertDocumentKey(t,this.firestore._databaseId);return new yt(this.firestore,null,e)}};function Oh(n,t,e){n=ie(n,yt);let r=ie(n.firestore,Pe),i=Gp(n.converter,t,e);return Mh(r,[Up(Dh(r),"setDoc",n._key,i,n.converter!==null,e).toMutation(n._key,se.none())])}function Ci(n,t,e,...r){n=ie(n,yt);let i=ie(n.firestore,Pe),o=Dh(i),a;return a=typeof(t=qt(t))=="string"||t instanceof un?zp(o,"updateDoc",n._key,t,e,r):qp(o,"updateDoc",n._key,t),Mh(i,[a.toMutation(n._key,se.exists(!0))])}function Fh(n,...t){var e,r,i;n=qt(n);let o={includeMetadataChanges:!1,source:"default"},a=0;typeof t[a]!="object"||hl(t[a])||(o=t[a++]);let l={includeMetadataChanges:o.includeMetadataChanges,source:o.source};if(hl(t[a])){let w=t[a];t[a]=(e=w.next)===null||e===void 0?void 0:e.bind(w),t[a+1]=(r=w.error)===null||r===void 0?void 0:r.bind(w),t[a+2]=(i=w.complete)===null||i===void 0?void 0:i.bind(w)}let h,f,p;if(n instanceof yt)f=ie(n.firestore,Pe),p=Ia(n._key.path),h={next:w=>{t[a]&&t[a](Wp(f,n,w))},error:t[a+1],complete:t[a+2]};else{let w=ie(n,fi);f=ie(w.firestore,Pe),p=w._query;let T=new wi(f);h={next:S=>{t[a]&&t[a](new Ke(f,T,w,S))},error:t[a+1],complete:t[a+2]},$p(n._query)}return function(T,S,x,k){let V=new sa(k),j=new Yo(S,V,x);return T.asyncQueue.enqueueAndForget(async()=>wp(await ol(T),j)),()=>{V.Ou(),T.asyncQueue.enqueueAndForget(async()=>vp(await ol(T),j))}}(Ch(f),p,l,h)}function Mh(n,t){return function(r,i){let o=new Kt;return r.asyncQueue.enqueueAndForget(async()=>Cp(await Mp(r),i,o)),o.promise}(Ch(n),t)}function Wp(n,t,e){let r=e.docs.get(t._key),i=new wi(n);return new Ie(n,i,t._key,r,new Ee(e.hasPendingWrites,e.fromCache),t.converter)}(function(t,e=!0){(function(i){cn=i})(gc),Ln(new zt("firestore",(r,{instanceIdentifier:i,options:o})=>{let a=r.getProvider("app").getImmediate(),l=new Pe(new Vs(r.getProvider("auth-internal")),new Os(a,r.getProvider("app-check-internal")),function(f,p){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new O(R.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Kr(f.options.projectId,p)}(a,i),a);return o=Object.assign({useFetchStreams:e},o),l._setSettings(o),l},"PUBLIC").setMultipleInstances(!0)),re(Ic,Tc,t),re(Ic,Tc,"esm2017")})();var Qp={apiKey:"AIzaSyDummyKeyForFreeTier",projectId:"spelling-bee-relay-1025"},Hp=ws(Qp),mn=Rh(Hp),Uh=localStorage.getItem("sb_use_emulator")==="true";Uh&&(console.log("Using Firestore Emulator at 127.0.0.1:8080"),ka(mn,"127.0.0.1",8080));globalThis.switchMultiplayerEnv=()=>{let n=!Uh;localStorage.setItem("sb_use_emulator",n),location.reload()};var ur=[{name:"Beginner",pct:0},{name:"Good Start",pct:.02},{name:"Moving Up",pct:.05},{name:"Good",pct:.08},{name:"Solid",pct:.15},{name:"Nice",pct:.25},{name:"Great",pct:.4},{name:"Amazing",pct:.5},{name:"Genius",pct:.7},{name:"Queen Bee",pct:1}],C={playerId:localStorage.getItem("sb_playerId")||crypto.randomUUID(),currentInput:"",foundWords:[],wordFinders:{},score:0,puzzle:null,puzzleId:null,attributionMode:0,multiplayer:{roomCode:null,nickname:localStorage.getItem("sb_nickname")||"",teammates:[],step:"nickname"}};localStorage.setItem("sb_playerId",C.playerId);var F={input:document.getElementById("input-text"),cursor:document.querySelector(".cursor"),score:document.getElementById("score"),messageArea:document.getElementById("message-area"),levelText:document.getElementById("current-level"),wordsList:document.getElementById("words-list"),foundCount:document.getElementById("found-count"),toggleWordsBtn:document.getElementById("toggle-words-btn"),toggleAttributionBtn:document.getElementById("toggle-attribution-btn"),deleteBtn:document.getElementById("delete-btn"),enterBtn:document.getElementById("enter-btn"),restartBtn:document.getElementById("restart-btn"),shuffleBtn:document.getElementById("shuffle-btn"),dotsContainer:document.querySelector(".dots-container"),cells:{center:document.getElementById("cell-center"),outer:[document.getElementById("cell-1"),document.getElementById("cell-2"),document.getElementById("cell-3"),document.getElementById("cell-4"),document.getElementById("cell-5"),document.getElementById("cell-6")]},multi:{btn:document.getElementById("multiplayer-btn"),screen:document.getElementById("multiplayer-screen"),closeBtn:document.getElementById("close-multi-btn"),stepNickname:document.getElementById("multi-setup"),stepMenu:document.getElementById("multi-menu"),stepJoin:document.getElementById("multi-join"),stepActive:document.getElementById("multi-active"),nicknameInput:document.getElementById("nickname-input"),saveNicknameBtn:document.getElementById("save-nickname-btn"),createRoomBtn:document.getElementById("create-room-btn"),roomCodeInput:document.getElementById("room-code-input"),confirmJoinBtn:document.getElementById("join-confirm-btn"),backBtn:document.getElementById("join-back-btn"),leaveBtn:document.getElementById("leave-room-btn"),activeRoomCode:document.getElementById("active-room-code"),playerList:document.getElementById("player-list"),displayNickname:document.getElementById("display-nickname"),editNicknameMenu:document.getElementById("edit-nickname-menu"),editNicknameRoom:document.getElementById("edit-nickname-room"),banner:document.getElementById("multiplayer-banner"),bannerRoomCode:document.getElementById("banner-room-code")}};document.addEventListener("DOMContentLoaded",Jp);async function Jp(){Xp(),C.puzzle?La(C.puzzleId):await Ua(),C.multiplayer.roomCode&&zh(C.multiplayer.roomCode,!1).catch(()=>{C.multiplayer.roomCode=null,Ft()}),Ba(),cr(),pn(),Kh(),Yp()}function Xp(){let n=localStorage.getItem("sb_mobile_state");if(n){let t=JSON.parse(n);C={...C,...t}}}function Ft(){localStorage.setItem("sb_mobile_state",JSON.stringify(C))}function La(n){if(typeof n=="string"&&n.startsWith("nyt-")){C.puzzleId!==n&&Ua(!1);return}let t=PUZZLES[n];t&&(C.puzzleId=n,C.puzzle=t,C.foundWords=[],C.score=0,C.currentInput="",Ft(),Ba(),cr(),pn())}function Ba(){if(!C.puzzle)return;F.cells.center.textContent=C.puzzle.letters[0].toUpperCase();let n=C.puzzle.letters.slice(1);F.cells.outer.forEach((t,e)=>{t.textContent=n[e].toUpperCase(),t.dataset.letter=n[e]})}function Yp(){F.cells.center.onclick=()=>Lh(C.puzzle.letters[0]),F.cells.outer.forEach(n=>{n.onclick=()=>Lh(n.dataset.letter)}),F.deleteBtn.onclick=Zp,F.enterBtn.onclick=tg,F.shuffleBtn.onclick=ag,F.restartBtn.onclick=()=>{let n=Math.floor(Math.random()*Object.keys(PUZZLES).length);La(n),C.multiplayer.roomCode&&Gh(C.puzzleId)},F.nytDailyBtn=document.getElementById("nyt-daily-btn"),F.nytDailyBtn.onclick=()=>Ua(),F.multi.btn.onclick=xe,F.multi.closeBtn.onclick=()=>F.multi.screen.style.display="none",F.multi.saveNicknameBtn.onclick=ng,F.multi.createRoomBtn.onclick=rg,document.getElementById("join-room-btn").onclick=()=>{C.multiplayer.step="join",xe()},F.multi.confirmJoinBtn.onclick=ig,F.multi.backBtn.onclick=()=>{C.multiplayer.step="menu",xe()},F.multi.leaveBtn.onclick=sg,F.toggleWordsBtn.onclick=()=>{let n=F.wordsList.classList.toggle("hidden");F.toggleWordsBtn.innerText=n?"Show":"Hide"},F.toggleAttributionBtn.onclick=()=>{C.attributionMode=(C.attributionMode+1)%3,Ft(),pn()},F.multi.editNicknameMenu.onclick=n=>{n.preventDefault(),Bh()},F.multi.editNicknameRoom.onclick=n=>{n.preventDefault(),Bh()}}function Lh(n){C.currentInput.length<20&&(C.currentInput+=n.toLowerCase(),F.input.innerText=C.currentInput)}function Zp(){C.currentInput=C.currentInput.slice(0,-1),F.input.innerText=C.currentInput}function tg(){let n=C.currentInput;if(!n)return;let t=qh(n);t.valid?(C.foundWords.push(n),C.score+=t.score,C.foundWords.sort(),C.wordFinders[n]=C.multiplayer.nickname||"You",Ft(),cr(),pn(),Pi(t.isPangram?"Pangram!":"Nice!",1500),og(n)):Pi(t.error,1e3),setTimeout(()=>{C.currentInput="",F.input.innerText=""},500)}function qh(n){if(n.length<4)return{valid:!1,error:"Too short"};let t=C.puzzle.letters[0].toLowerCase();if(!n.includes(t))return{valid:!1,error:"Missing center"};let e=new Set(C.puzzle.letters.map(i=>i.toLowerCase()));for(let i of n)if(!e.has(i))return{valid:!1,error:"Bad letter"};if(!C.puzzle.words.includes(n))return{valid:!1,error:"Not a word"};if(C.foundWords.includes(n))return{valid:!1,error:"Already found"};let r=new Set(n).size===7;return{valid:!0,score:n.length===4?1:n.length+(r?7:0),isPangram:r}}function Pi(n,t){F.messageArea.innerText=n,F.messageArea.classList.add("visible"),setTimeout(()=>F.messageArea.classList.remove("visible"),t)}function cr(){if(F.score.innerText=C.score,!C.puzzle)return;let n=C.puzzle.maxScore,t=0;ur.forEach((r,i)=>{C.score>=Math.floor(n*r.pct)&&(t=i)}),F.levelText.innerText=ur[t].name,F.dotsContainer.innerHTML="";let e=document.createElement("div");e.className="progress-line-fill",e.style.width=`${t/(ur.length-1)*100}%`,F.dotsContainer.appendChild(e),ur.forEach((r,i)=>{let o=document.createElement("div");o.className=`dot ${i<=t?"active":""} ${i===t?"current":""}`,o.style.left=`${i/(ur.length-1)*100}%`,F.dotsContainer.appendChild(o)})}function pn(){F.foundCount.innerText=`${C.foundWords.length} words`,F.wordsList.innerHTML="";let n=C.attributionMode;if(n===0)C.foundWords.forEach(t=>{let e=document.createElement("span");e.innerText=t,e.className="found-word",F.wordsList.appendChild(e)});else if(n===1){let t=["#f7da21","#4ecdc4","#ff6b6b","#a8e6cf","#dfe6e9","#fd79a8","#74b9ff"],e={},r=0;C.foundWords.forEach(i=>{let o=C.wordFinders[i]||"You";e[o]||(e[o]=t[r++%t.length]);let a=document.createElement("span");a.innerText=i,a.style.color=e[o],a.className="found-word",F.wordsList.appendChild(a)})}else{let t={};C.foundWords.forEach(e=>{let r=C.wordFinders[e]||"You";t[r]||(t[r]=[]),t[r].push(e)}),Object.keys(t).sort().forEach(e=>{let r=document.createElement("div");r.className="word-section",r.innerHTML=`<div class="word-section-header">${e} (${t[e].length})</div><div class="word-section-words"></div>`,t[e].forEach(i=>{let o=document.createElement("span");o.innerText=i,o.className="found-word",r.querySelector(".word-section-words").appendChild(o)}),F.wordsList.appendChild(r)})}}async function Ua(n=!0){try{let e=await(await fetch("https://nytbee.com/")).text(),r=new DOMParser().parseFromString(e,"text/html"),o=Array.from(r.querySelectorAll("script")).map(h=>h.textContent).join(" ").match(/\[\s*"([A-Z])"(?:\s*,\s*"([A-Z])"){6}\s*\]/i);if(!o)throw new Error("No letters");let a=o[0].match(/[A-Z]/gi).map(h=>h.toUpperCase()),l=Array.from(r.querySelectorAll('a[id^="link-definition-"]')).map(h=>h.id.split("-").pop());C.puzzleId="nyt-"+new Date().toISOString().split("T")[0],C.puzzle={letters:a,words:l,maxScore:l.reduce((h,f)=>h+(f.length===4?1:f.length+(new Set(f).size===7?7:0)),0)},C.foundWords=[],C.score=0,Ft(),Ba(),cr(),pn(),n&&C.multiplayer.roomCode&&Gh(C.puzzleId)}catch{Pi("NYT Load Failed",2e3)}}async function zh(n,t=!0){let e=fn(mn,"rooms",n);await Ci(e,{[`players.${C.playerId}`]:{nickname:C.multiplayer.nickname,online:!0,lastActive:et.now()}}),C.multiplayer.roomCode=n,C.multiplayer.step="active",Ft(),jh(n),t?xe():Kh()}async function eg(){let n=`${["Swift","Cool","Calm"][Math.floor(Math.random()*3)]}-Bee-${Math.floor(Math.random()*99)}`,t=fn(mn,"rooms",n);await Oh(t,{createdAt:et.now(),puzzleId:C.puzzleId,foundWords:{},players:{[C.playerId]:{nickname:C.multiplayer.nickname,online:!0,lastActive:et.now()}}}),C.multiplayer.roomCode=n,C.multiplayer.step="active",Ft(),jh(n),xe()}var Ma=null;function jh(n){Ma&&Ma(),Ma=Fh(fn(mn,"rooms",n),t=>{let e=t.data();e&&(e.players&&(C.multiplayer.teammates=Object.entries(e.players).filter(([r])=>r!==C.playerId).map(([r,i])=>({nickname:i.nickname,online:i.online})),$h()),e.foundWords&&(Object.keys(e.foundWords).forEach(r=>{C.wordFinders[r]=e.foundWords[r],C.foundWords.includes(r)||(C.foundWords.push(r),C.score+=qh(r).score||0,e.foundWords[r]!==C.multiplayer.nickname&&Pi(`${e.foundWords[r]} found ${r}`,2e3))}),C.foundWords.sort(),Ft(),pn(),cr()),e.puzzleId&&e.puzzleId!==C.puzzleId&&La(e.puzzleId))})}function $h(){let n=F.multi.playerList;n.innerHTML=`<div class="player-item self">${C.multiplayer.nickname} (You)</div>`,C.multiplayer.teammates.forEach(t=>{let e=document.createElement("div");e.className="player-item",e.innerText=t.nickname,n.appendChild(e)})}function xe(){F.multi.screen.style.display="flex",[F.multi.stepNickname,F.multi.stepMenu,F.multi.stepJoin,F.multi.stepActive].forEach(t=>t.classList.add("hidden")),C.multiplayer.step==="nickname"&&C.multiplayer.nickname&&(C.multiplayer.step="menu");let n=C.multiplayer.step;n==="nickname"?F.multi.stepNickname.classList.remove("hidden"):n==="menu"?(F.multi.stepMenu.classList.remove("hidden"),F.multi.displayNickname.innerText=C.multiplayer.nickname):n==="join"?F.multi.stepJoin.classList.remove("hidden"):n==="active"&&(F.multi.stepActive.classList.remove("hidden"),F.multi.activeRoomCode.innerText=C.multiplayer.roomCode,$h())}function ng(){let n=F.multi.nicknameInput.value.trim();n&&(C.multiplayer.nickname=n,localStorage.setItem("sb_nickname",n),C.multiplayer.step="menu",xe())}async function rg(){await eg()}async function ig(){await zh(F.multi.roomCodeInput.value.trim())}function sg(){confirm("Leave?")&&(C.multiplayer.roomCode=null,C.multiplayer.step="menu",Ft(),location.reload())}function Bh(){let n=prompt("New nickname:",C.multiplayer.nickname);n&&(C.multiplayer.nickname=n,Ft(),xe())}function og(n){C.multiplayer.roomCode&&Ci(fn(mn,"rooms",C.multiplayer.roomCode),{[`foundWords.${n}`]:C.multiplayer.nickname})}function Gh(n){C.multiplayer.roomCode&&Ci(fn(mn,"rooms",C.multiplayer.roomCode),{puzzleId:n,foundWords:{}})}function Kh(){C.multiplayer.roomCode?(F.multi.banner.classList.remove("hidden"),F.multi.bannerRoomCode.innerText=C.multiplayer.roomCode):F.multi.banner.classList.add("hidden")}function ag(){if(!C.puzzle)return;let n=C.puzzle.letters.slice(1);for(let t=n.length-1;t>0;t--){let e=Math.floor(Math.random()*(t+1));[n[t],n[e]]=[n[e],n[t]]}F.cells.outer.forEach((t,e)=>{t.textContent=n[e].toUpperCase(),t.dataset.letter=n[e]})}})();
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
