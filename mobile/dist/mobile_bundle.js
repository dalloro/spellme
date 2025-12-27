(()=>{var Gc=()=>{};var Hc=function(n){let t=[],e=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?t[e++]=i:i<2048?(t[e++]=i>>6|192,t[e++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=i>>18|240,t[e++]=i>>12&63|128,t[e++]=i>>6&63|128,t[e++]=i&63|128):(t[e++]=i>>12|224,t[e++]=i>>6&63|128,t[e++]=i&63|128)}return t},Pd=function(n){let t=[],e=0,r=0;for(;e<n.length;){let i=n[e++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){let o=n[e++];t[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){let o=n[e++],a=n[e++],l=n[e++],h=((i&7)<<18|(o&63)<<12|(a&63)<<6|l&63)-65536;t[r++]=String.fromCharCode(55296+(h>>10)),t[r++]=String.fromCharCode(56320+(h&1023))}else{let o=n[e++],a=n[e++];t[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|a&63)}}return t.join("")},Qc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){let o=n[i],a=i+1<n.length,l=a?n[i+1]:0,h=i+2<n.length,f=h?n[i+2]:0,p=o>>2,_=(o&3)<<4|l>>4,v=(l&15)<<2|f>>6,R=f&63;h||(R=64,a||(v=64)),r.push(e[p],e[_],e[v],e[R])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(Hc(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Pd(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();let e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){let o=e[n.charAt(i++)],l=i<n.length?e[n.charAt(i)]:0;++i;let f=i<n.length?e[n.charAt(i)]:64;++i;let _=i<n.length?e[n.charAt(i)]:64;if(++i,o==null||l==null||f==null||_==null)throw new ns;let v=o<<2|l>>4;if(r.push(v),f!==64){let R=l<<4&240|f>>2;if(r.push(R),_!==64){let D=f<<6&192|_;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},ns=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Dd=function(n){let t=Hc(n);return Qc.encodeByteArray(t,!0)},Ln=function(n){return Dd(n).replace(/\./g,"")},Jc=function(n){try{return Qc.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};function Xc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var xd=()=>Xc().__FIREBASE_DEFAULTS__,Vd=()=>{if(typeof process>"u"||typeof process.env>"u")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Nd=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let t=n&&Jc(n[1]);return t&&JSON.parse(t)},rs=()=>{try{return Gc()||xd()||Vd()||Nd()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},kd=n=>{var t,e;return(e=(t=rs())===null||t===void 0?void 0:t.emulatorHosts)===null||e===void 0?void 0:e[n]},Yc=n=>{let t=kd(n);if(!t)return;let e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);let r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},is=()=>{var n;return(n=rs())===null||n===void 0?void 0:n.config};var Dr=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}};function xr(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Zc(n){return(await fetch(n,{credentials:"include"})).ok}function tu(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let e={alg:"none",type:"JWT"},r=t||"demo-project",i=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Ln(JSON.stringify(e)),Ln(JSON.stringify(a)),""].join(".")}var Mn={};function Od(){let n={prod:[],emulator:[]};for(let t of Object.keys(Mn))Mn[t]?n.emulator.push(t):n.prod.push(t);return n}function Fd(n){let t=document.getElementById(n),e=!1;return t||(t=document.createElement("div"),t.setAttribute("id",n),e=!0),{created:e,element:t}}var Kc=!1;function eu(n,t){if(typeof window>"u"||typeof document>"u"||!xr(window.location.host)||Mn[n]===t||Mn[n]||Kc)return;Mn[n]=t;function e(v){return`__firebase__banner__${v}`}let r="__firebase__banner",o=Od().prod.length>0;function a(){let v=document.getElementById(r);v&&v.remove()}function l(v){v.style.display="flex",v.style.background="#7faaf0",v.style.position="fixed",v.style.bottom="5px",v.style.left="5px",v.style.padding=".5em",v.style.borderRadius="5px",v.style.alignItems="center"}function h(v,R){v.setAttribute("width","24"),v.setAttribute("id",R),v.setAttribute("height","24"),v.setAttribute("viewBox","0 0 24 24"),v.setAttribute("fill","none"),v.style.marginLeft="-6px"}function f(){let v=document.createElement("span");return v.style.cursor="pointer",v.style.marginLeft="16px",v.style.fontSize="24px",v.innerHTML=" &times;",v.onclick=()=>{Kc=!0,a()},v}function p(v,R){v.setAttribute("id",R),v.innerText="Learn more",v.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",v.setAttribute("target","__blank"),v.style.paddingLeft="5px",v.style.textDecoration="underline"}function _(){let v=Fd(r),R=e("text"),D=document.getElementById(R)||document.createElement("span"),k=e("learnmore"),V=document.getElementById(k)||document.createElement("a"),j=e("preprendIcon"),q=document.getElementById(j)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(v.created){let $=v.element;l($),p(V,k);let Z=f();h(q,j),$.append(q,D,V,Z),document.body.appendChild($)}o?(D.innerText="Preview backend disconnected.",q.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
</defs>`,D.innerText="Preview backend running in this workspace."),D.setAttribute("id",R)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",_):_()}function nu(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Md(){var n;let t=(n=rs())===null||n===void 0?void 0:n.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function ru(){return!Md()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function ss(){try{return typeof indexedDB=="object"}catch{return!1}}function iu(){return new Promise((n,t)=>{try{let e=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{e=!1},i.onerror=()=>{var o;t(((o=i.error)===null||o===void 0?void 0:o.message)||"")}}catch(e){t(e)}})}var Ld="FirebaseError",Bt=class n extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=Ld,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Bn.prototype.create)}},Bn=class{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){let r=e[0]||{},i=`${this.service}/${t}`,o=this.errors[t],a=o?Bd(o,r):"Error",l=`${this.serviceName}: ${a} (${i}).`;return new Bt(i,l,r)}};function Bd(n,t){return n.replace(Ud,(e,r)=>{let i=t[r];return i!=null?String(i):`<${r}?>`})}var Ud=/\{\$([^}]+)}/g;function Le(n,t){if(n===t)return!0;let e=Object.keys(n),r=Object.keys(t);for(let i of e){if(!r.includes(i))return!1;let o=n[i],a=t[i];if(Wc(o)&&Wc(a)){if(!Le(o,a))return!1}else if(o!==a)return!1}for(let i of r)if(!e.includes(i))return!1;return!0}function Wc(n){return n!==null&&typeof n=="object"}var fg=4*60*60*1e3;function Ut(n){return n&&n._delegate?n._delegate:n}var qt=class{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}};var Ee="[DEFAULT]";var os=class{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){let e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){let r=new Dr;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:e});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;let r=this.normalizeInstanceIdentifier(t?.identifier),i=(e=t?.optional)!==null&&e!==void 0?e:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(i)return null;throw o}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(zd(t))try{this.getOrInitializeService({instanceIdentifier:Ee})}catch{}for(let[e,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(e);try{let o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch{}}}}clearInstance(t=Ee){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){let t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Ee){return this.instances.has(t)}getOptions(t=Ee){return this.instancesOptions.get(t)||{}}initialize(t={}){let{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:e});for(let[o,a]of this.instancesDeferred.entries()){let l=this.normalizeInstanceIdentifier(o);r===l&&a.resolve(i)}return i}onInit(t,e){var r;let i=this.normalizeInstanceIdentifier(e),o=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;o.add(t),this.onInitCallbacks.set(i,o);let a=this.instances.get(i);return a&&t(a,i),()=>{o.delete(t)}}invokeOnInitCallbacks(t,e){let r=this.onInitCallbacks.get(e);if(r)for(let i of r)try{i(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:qd(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=Ee){return this.component?this.component.multipleInstances?t:Ee:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function qd(n){return n===Ee?void 0:n}function zd(n){return n.instantiationMode==="EAGER"}var Vr=class{constructor(t){this.name=t,this.providers=new Map}addComponent(t){let e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);let e=new os(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}};var jd=[],K;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(K||(K={}));var $d={debug:K.DEBUG,verbose:K.VERBOSE,info:K.INFO,warn:K.WARN,error:K.ERROR,silent:K.SILENT},Gd=K.INFO,Kd={[K.DEBUG]:"log",[K.VERBOSE]:"log",[K.INFO]:"info",[K.WARN]:"warn",[K.ERROR]:"error"},Wd=(n,t,...e)=>{if(t<n.logLevel)return;let r=new Date().toISOString(),i=Kd[t];if(i)console[i](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)},Be=class{constructor(t){this.name=t,this._logLevel=Gd,this._logHandler=Wd,this._userLogHandler=null,jd.push(this)}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in K))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?$d[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,K.DEBUG,...t),this._logHandler(this,K.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,K.VERBOSE,...t),this._logHandler(this,K.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,K.INFO,...t),this._logHandler(this,K.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,K.WARN,...t),this._logHandler(this,K.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,K.ERROR,...t),this._logHandler(this,K.ERROR,...t)}};var Hd=(n,t)=>t.some(e=>n instanceof e),su,ou;function Qd(){return su||(su=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Jd(){return ou||(ou=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var au=new WeakMap,cs=new WeakMap,cu=new WeakMap,as=new WeakMap,ls=new WeakMap;function Xd(n){let t=new Promise((e,r)=>{let i=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{e(Pt(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",o),n.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&au.set(e,n)}).catch(()=>{}),ls.set(t,n),t}function Yd(n){if(cs.has(n))return;let t=new Promise((e,r)=>{let i=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{e(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});cs.set(n,t)}var us={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return cs.get(n);if(t==="objectStoreNames")return n.objectStoreNames||cu.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return Pt(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function uu(n){us=n(us)}function Zd(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){let r=n.call(Nr(this),t,...e);return cu.set(r,t.sort?t.sort():[t]),Pt(r)}:Jd().includes(n)?function(...t){return n.apply(Nr(this),t),Pt(au.get(this))}:function(...t){return Pt(n.apply(Nr(this),t))}}function tf(n){return typeof n=="function"?Zd(n):(n instanceof IDBTransaction&&Yd(n),Hd(n,Qd())?new Proxy(n,us):n)}function Pt(n){if(n instanceof IDBRequest)return Xd(n);if(as.has(n))return as.get(n);let t=tf(n);return t!==n&&(as.set(n,t),ls.set(t,n)),t}var Nr=n=>ls.get(n);function hu(n,t,{blocked:e,upgrade:r,blocking:i,terminated:o}={}){let a=indexedDB.open(n,t),l=Pt(a);return r&&a.addEventListener("upgradeneeded",h=>{r(Pt(a.result),h.oldVersion,h.newVersion,Pt(a.transaction),h)}),e&&a.addEventListener("blocked",h=>e(h.oldVersion,h.newVersion,h)),l.then(h=>{o&&h.addEventListener("close",()=>o()),i&&h.addEventListener("versionchange",f=>i(f.oldVersion,f.newVersion,f))}).catch(()=>{}),l}var ef=["get","getKey","getAll","getAllKeys","count"],nf=["put","add","delete","clear"],hs=new Map;function lu(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(hs.get(t))return hs.get(t);let e=t.replace(/FromIndex$/,""),r=t!==e,i=nf.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(i||ef.includes(e)))return;let o=async function(a,...l){let h=this.transaction(a,i?"readwrite":"readonly"),f=h.store;return r&&(f=f.index(l.shift())),(await Promise.all([f[e](...l),i&&h.done]))[0]};return hs.set(t,o),o}uu(n=>({...n,get:(t,e,r)=>lu(t,e)||n.get(t,e,r),has:(t,e)=>!!lu(t,e)||n.has(t,e)}));var fs=class{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(rf(e)){let r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}};function rf(n){let t=n.getComponent();return t?.type==="VERSION"}var ms="@firebase/app",du="0.13.2";var zt=new Be("@firebase/app"),sf="@firebase/app-compat",of="@firebase/analytics-compat",af="@firebase/analytics",cf="@firebase/app-check-compat",uf="@firebase/app-check",lf="@firebase/auth",hf="@firebase/auth-compat",df="@firebase/database",ff="@firebase/data-connect",mf="@firebase/database-compat",pf="@firebase/functions",gf="@firebase/functions-compat",yf="@firebase/installations",_f="@firebase/installations-compat",wf="@firebase/messaging",vf="@firebase/messaging-compat",Ef="@firebase/performance",If="@firebase/performance-compat",Tf="@firebase/remote-config",bf="@firebase/remote-config-compat",Af="@firebase/storage",Sf="@firebase/storage-compat",Rf="@firebase/firestore",Cf="@firebase/ai",Pf="@firebase/firestore-compat",Df="firebase",xf="11.10.0";var ps="[DEFAULT]",Vf={[ms]:"fire-core",[sf]:"fire-core-compat",[af]:"fire-analytics",[of]:"fire-analytics-compat",[uf]:"fire-app-check",[cf]:"fire-app-check-compat",[lf]:"fire-auth",[hf]:"fire-auth-compat",[df]:"fire-rtdb",[ff]:"fire-data-connect",[mf]:"fire-rtdb-compat",[pf]:"fire-fn",[gf]:"fire-fn-compat",[yf]:"fire-iid",[_f]:"fire-iid-compat",[wf]:"fire-fcm",[vf]:"fire-fcm-compat",[Ef]:"fire-perf",[If]:"fire-perf-compat",[Tf]:"fire-rc",[bf]:"fire-rc-compat",[Af]:"fire-gcs",[Sf]:"fire-gcs-compat",[Rf]:"fire-fst",[Pf]:"fire-fst-compat",[Cf]:"fire-vertex","fire-js":"fire-js",[Df]:"fire-js-all"};var kr=new Map,Nf=new Map,gs=new Map;function fu(n,t){try{n.container.addComponent(t)}catch(e){zt.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function Un(n){let t=n.name;if(gs.has(t))return zt.debug(`There were multiple attempts to register component ${t}.`),!1;gs.set(t,n);for(let e of kr.values())fu(e,n);for(let e of Nf.values())fu(e,n);return!0}function yu(n,t){let e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function _u(n){return n==null?!1:n.settings!==void 0}var kf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ne=new Bn("app","Firebase",kf);var ys=class{constructor(t,e,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new qt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw ne.create("app-deleted",{appName:this._name})}};var wu=xf;function vs(n,t={}){let e=n;typeof t!="object"&&(t={name:t});let r=Object.assign({name:ps,automaticDataCollectionEnabled:!0},t),i=r.name;if(typeof i!="string"||!i)throw ne.create("bad-app-name",{appName:String(i)});if(e||(e=is()),!e)throw ne.create("no-options");let o=kr.get(i);if(o){if(Le(e,o.options)&&Le(r,o.config))return o;throw ne.create("duplicate-app",{appName:i})}let a=new Vr(i);for(let h of gs.values())a.addComponent(h);let l=new ys(e,r,a);return kr.set(i,l),l}function vu(n=ps){let t=kr.get(n);if(!t&&n===ps&&is())return vs();if(!t)throw ne.create("no-app",{appName:n});return t}function re(n,t,e){var r;let i=(r=Vf[n])!==null&&r!==void 0?r:n;e&&(i+=`-${e}`);let o=i.match(/\s|\//),a=t.match(/\s|\//);if(o||a){let l=[`Unable to register library "${i}" with version "${t}":`];o&&l.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&a&&l.push("and"),a&&l.push(`version name "${t}" contains illegal characters (whitespace or "/")`),zt.warn(l.join(" "));return}Un(new qt(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}var Of="firebase-heartbeat-database",Ff=1,qn="firebase-heartbeat-store",ds=null;function Eu(){return ds||(ds=hu(Of,Ff,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(qn)}catch(e){console.warn(e)}}}}).catch(n=>{throw ne.create("idb-open",{originalErrorMessage:n.message})})),ds}async function Mf(n){try{let e=(await Eu()).transaction(qn),r=await e.objectStore(qn).get(Iu(n));return await e.done,r}catch(t){if(t instanceof Bt)zt.warn(t.message);else{let e=ne.create("idb-get",{originalErrorMessage:t?.message});zt.warn(e.message)}}}async function mu(n,t){try{let r=(await Eu()).transaction(qn,"readwrite");await r.objectStore(qn).put(t,Iu(n)),await r.done}catch(e){if(e instanceof Bt)zt.warn(e.message);else{let r=ne.create("idb-set",{originalErrorMessage:e?.message});zt.warn(r.message)}}}function Iu(n){return`${n.name}!${n.options.appId}`}var Lf=1024,Bf=30,_s=class{constructor(t){this.container=t,this._heartbeatsCache=null;let e=this.container.getProvider("app").getImmediate();this._storage=new ws(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{let i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=pu();if(((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats.length>Bf){let a=qf(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){zt.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let e=pu(),{heartbeatsToSend:r,unsentEntries:i}=Uf(this._heartbeatsCache.heartbeats),o=Ln(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return zt.warn(e),""}}};function pu(){return new Date().toISOString().substring(0,10)}function Uf(n,t=Lf){let e=[],r=n.slice();for(let i of n){let o=e.find(a=>a.agent===i.agent);if(o){if(o.dates.push(i.date),gu(e)>t){o.dates.pop();break}}else if(e.push({agent:i.agent,dates:[i.date]}),gu(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}var ws=class{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ss()?iu().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let e=await Mf(this.app);return e?.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){let i=await this.read();return mu(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:i.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var e;if(await this._canUseIndexedDBPromise){let i=await this.read();return mu(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...t.heartbeats]})}else return}};function gu(n){return Ln(JSON.stringify({version:2,heartbeats:n})).length}function qf(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}function zf(n){Un(new qt("platform-logger",t=>new fs(t),"PRIVATE")),Un(new qt("heartbeat",t=>new _s(t),"PRIVATE")),re(ms,du,n),re(ms,du,"esm2017"),re("fire-js","")}zf("");var jf="firebase",$f="11.10.0";re(jf,$f,"app");var Tu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},bu={};var jt,Es;(function(){var n;function t(I,m){function y(){}y.prototype=m.prototype,I.D=m.prototype,I.prototype=new y,I.prototype.constructor=I,I.C=function(w,E,b){for(var g=Array(arguments.length-2),Ft=2;Ft<arguments.length;Ft++)g[Ft-2]=arguments[Ft];return m.prototype[E].apply(w,g)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(r,e),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(I,m,y){y||(y=0);var w=Array(16);if(typeof m=="string")for(var E=0;16>E;++E)w[E]=m.charCodeAt(y++)|m.charCodeAt(y++)<<8|m.charCodeAt(y++)<<16|m.charCodeAt(y++)<<24;else for(E=0;16>E;++E)w[E]=m[y++]|m[y++]<<8|m[y++]<<16|m[y++]<<24;m=I.g[0],y=I.g[1],E=I.g[2];var b=I.g[3],g=m+(b^y&(E^b))+w[0]+3614090360&4294967295;m=y+(g<<7&4294967295|g>>>25),g=b+(E^m&(y^E))+w[1]+3905402710&4294967295,b=m+(g<<12&4294967295|g>>>20),g=E+(y^b&(m^y))+w[2]+606105819&4294967295,E=b+(g<<17&4294967295|g>>>15),g=y+(m^E&(b^m))+w[3]+3250441966&4294967295,y=E+(g<<22&4294967295|g>>>10),g=m+(b^y&(E^b))+w[4]+4118548399&4294967295,m=y+(g<<7&4294967295|g>>>25),g=b+(E^m&(y^E))+w[5]+1200080426&4294967295,b=m+(g<<12&4294967295|g>>>20),g=E+(y^b&(m^y))+w[6]+2821735955&4294967295,E=b+(g<<17&4294967295|g>>>15),g=y+(m^E&(b^m))+w[7]+4249261313&4294967295,y=E+(g<<22&4294967295|g>>>10),g=m+(b^y&(E^b))+w[8]+1770035416&4294967295,m=y+(g<<7&4294967295|g>>>25),g=b+(E^m&(y^E))+w[9]+2336552879&4294967295,b=m+(g<<12&4294967295|g>>>20),g=E+(y^b&(m^y))+w[10]+4294925233&4294967295,E=b+(g<<17&4294967295|g>>>15),g=y+(m^E&(b^m))+w[11]+2304563134&4294967295,y=E+(g<<22&4294967295|g>>>10),g=m+(b^y&(E^b))+w[12]+1804603682&4294967295,m=y+(g<<7&4294967295|g>>>25),g=b+(E^m&(y^E))+w[13]+4254626195&4294967295,b=m+(g<<12&4294967295|g>>>20),g=E+(y^b&(m^y))+w[14]+2792965006&4294967295,E=b+(g<<17&4294967295|g>>>15),g=y+(m^E&(b^m))+w[15]+1236535329&4294967295,y=E+(g<<22&4294967295|g>>>10),g=m+(E^b&(y^E))+w[1]+4129170786&4294967295,m=y+(g<<5&4294967295|g>>>27),g=b+(y^E&(m^y))+w[6]+3225465664&4294967295,b=m+(g<<9&4294967295|g>>>23),g=E+(m^y&(b^m))+w[11]+643717713&4294967295,E=b+(g<<14&4294967295|g>>>18),g=y+(b^m&(E^b))+w[0]+3921069994&4294967295,y=E+(g<<20&4294967295|g>>>12),g=m+(E^b&(y^E))+w[5]+3593408605&4294967295,m=y+(g<<5&4294967295|g>>>27),g=b+(y^E&(m^y))+w[10]+38016083&4294967295,b=m+(g<<9&4294967295|g>>>23),g=E+(m^y&(b^m))+w[15]+3634488961&4294967295,E=b+(g<<14&4294967295|g>>>18),g=y+(b^m&(E^b))+w[4]+3889429448&4294967295,y=E+(g<<20&4294967295|g>>>12),g=m+(E^b&(y^E))+w[9]+568446438&4294967295,m=y+(g<<5&4294967295|g>>>27),g=b+(y^E&(m^y))+w[14]+3275163606&4294967295,b=m+(g<<9&4294967295|g>>>23),g=E+(m^y&(b^m))+w[3]+4107603335&4294967295,E=b+(g<<14&4294967295|g>>>18),g=y+(b^m&(E^b))+w[8]+1163531501&4294967295,y=E+(g<<20&4294967295|g>>>12),g=m+(E^b&(y^E))+w[13]+2850285829&4294967295,m=y+(g<<5&4294967295|g>>>27),g=b+(y^E&(m^y))+w[2]+4243563512&4294967295,b=m+(g<<9&4294967295|g>>>23),g=E+(m^y&(b^m))+w[7]+1735328473&4294967295,E=b+(g<<14&4294967295|g>>>18),g=y+(b^m&(E^b))+w[12]+2368359562&4294967295,y=E+(g<<20&4294967295|g>>>12),g=m+(y^E^b)+w[5]+4294588738&4294967295,m=y+(g<<4&4294967295|g>>>28),g=b+(m^y^E)+w[8]+2272392833&4294967295,b=m+(g<<11&4294967295|g>>>21),g=E+(b^m^y)+w[11]+1839030562&4294967295,E=b+(g<<16&4294967295|g>>>16),g=y+(E^b^m)+w[14]+4259657740&4294967295,y=E+(g<<23&4294967295|g>>>9),g=m+(y^E^b)+w[1]+2763975236&4294967295,m=y+(g<<4&4294967295|g>>>28),g=b+(m^y^E)+w[4]+1272893353&4294967295,b=m+(g<<11&4294967295|g>>>21),g=E+(b^m^y)+w[7]+4139469664&4294967295,E=b+(g<<16&4294967295|g>>>16),g=y+(E^b^m)+w[10]+3200236656&4294967295,y=E+(g<<23&4294967295|g>>>9),g=m+(y^E^b)+w[13]+681279174&4294967295,m=y+(g<<4&4294967295|g>>>28),g=b+(m^y^E)+w[0]+3936430074&4294967295,b=m+(g<<11&4294967295|g>>>21),g=E+(b^m^y)+w[3]+3572445317&4294967295,E=b+(g<<16&4294967295|g>>>16),g=y+(E^b^m)+w[6]+76029189&4294967295,y=E+(g<<23&4294967295|g>>>9),g=m+(y^E^b)+w[9]+3654602809&4294967295,m=y+(g<<4&4294967295|g>>>28),g=b+(m^y^E)+w[12]+3873151461&4294967295,b=m+(g<<11&4294967295|g>>>21),g=E+(b^m^y)+w[15]+530742520&4294967295,E=b+(g<<16&4294967295|g>>>16),g=y+(E^b^m)+w[2]+3299628645&4294967295,y=E+(g<<23&4294967295|g>>>9),g=m+(E^(y|~b))+w[0]+4096336452&4294967295,m=y+(g<<6&4294967295|g>>>26),g=b+(y^(m|~E))+w[7]+1126891415&4294967295,b=m+(g<<10&4294967295|g>>>22),g=E+(m^(b|~y))+w[14]+2878612391&4294967295,E=b+(g<<15&4294967295|g>>>17),g=y+(b^(E|~m))+w[5]+4237533241&4294967295,y=E+(g<<21&4294967295|g>>>11),g=m+(E^(y|~b))+w[12]+1700485571&4294967295,m=y+(g<<6&4294967295|g>>>26),g=b+(y^(m|~E))+w[3]+2399980690&4294967295,b=m+(g<<10&4294967295|g>>>22),g=E+(m^(b|~y))+w[10]+4293915773&4294967295,E=b+(g<<15&4294967295|g>>>17),g=y+(b^(E|~m))+w[1]+2240044497&4294967295,y=E+(g<<21&4294967295|g>>>11),g=m+(E^(y|~b))+w[8]+1873313359&4294967295,m=y+(g<<6&4294967295|g>>>26),g=b+(y^(m|~E))+w[15]+4264355552&4294967295,b=m+(g<<10&4294967295|g>>>22),g=E+(m^(b|~y))+w[6]+2734768916&4294967295,E=b+(g<<15&4294967295|g>>>17),g=y+(b^(E|~m))+w[13]+1309151649&4294967295,y=E+(g<<21&4294967295|g>>>11),g=m+(E^(y|~b))+w[4]+4149444226&4294967295,m=y+(g<<6&4294967295|g>>>26),g=b+(y^(m|~E))+w[11]+3174756917&4294967295,b=m+(g<<10&4294967295|g>>>22),g=E+(m^(b|~y))+w[2]+718787259&4294967295,E=b+(g<<15&4294967295|g>>>17),g=y+(b^(E|~m))+w[9]+3951481745&4294967295,I.g[0]=I.g[0]+m&4294967295,I.g[1]=I.g[1]+(E+(g<<21&4294967295|g>>>11))&4294967295,I.g[2]=I.g[2]+E&4294967295,I.g[3]=I.g[3]+b&4294967295}r.prototype.u=function(I,m){m===void 0&&(m=I.length);for(var y=m-this.blockSize,w=this.B,E=this.h,b=0;b<m;){if(E==0)for(;b<=y;)i(this,I,b),b+=this.blockSize;if(typeof I=="string"){for(;b<m;)if(w[E++]=I.charCodeAt(b++),E==this.blockSize){i(this,w),E=0;break}}else for(;b<m;)if(w[E++]=I[b++],E==this.blockSize){i(this,w),E=0;break}}this.h=E,this.o+=m},r.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var m=1;m<I.length-8;++m)I[m]=0;var y=8*this.o;for(m=I.length-8;m<I.length;++m)I[m]=y&255,y/=256;for(this.u(I),I=Array(16),m=y=0;4>m;++m)for(var w=0;32>w;w+=8)I[y++]=this.g[m]>>>w&255;return I};function o(I,m){var y=l;return Object.prototype.hasOwnProperty.call(y,I)?y[I]:y[I]=m(I)}function a(I,m){this.h=m;for(var y=[],w=!0,E=I.length-1;0<=E;E--){var b=I[E]|0;w&&b==m||(y[E]=b,w=!1)}this.g=y}var l={};function h(I){return-128<=I&&128>I?o(I,function(m){return new a([m|0],0>m?-1:0)}):new a([I|0],0>I?-1:0)}function f(I){if(isNaN(I)||!isFinite(I))return _;if(0>I)return V(f(-I));for(var m=[],y=1,w=0;I>=y;w++)m[w]=I/y|0,y*=4294967296;return new a(m,0)}function p(I,m){if(I.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(I.charAt(0)=="-")return V(p(I.substring(1),m));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=f(Math.pow(m,8)),w=_,E=0;E<I.length;E+=8){var b=Math.min(8,I.length-E),g=parseInt(I.substring(E,E+b),m);8>b?(b=f(Math.pow(m,b)),w=w.j(b).add(f(g))):(w=w.j(y),w=w.add(f(g)))}return w}var _=h(0),v=h(1),R=h(16777216);n=a.prototype,n.m=function(){if(k(this))return-V(this).m();for(var I=0,m=1,y=0;y<this.g.length;y++){var w=this.i(y);I+=(0<=w?w:4294967296+w)*m,m*=4294967296}return I},n.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(D(this))return"0";if(k(this))return"-"+V(this).toString(I);for(var m=f(Math.pow(I,6)),y=this,w="";;){var E=Z(y,m).g;y=j(y,E.j(m));var b=((0<y.g.length?y.g[0]:y.h)>>>0).toString(I);if(y=E,D(y))return b+w;for(;6>b.length;)b="0"+b;w=b+w}},n.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function D(I){if(I.h!=0)return!1;for(var m=0;m<I.g.length;m++)if(I.g[m]!=0)return!1;return!0}function k(I){return I.h==-1}n.l=function(I){return I=j(this,I),k(I)?-1:D(I)?0:1};function V(I){for(var m=I.g.length,y=[],w=0;w<m;w++)y[w]=~I.g[w];return new a(y,~I.h).add(v)}n.abs=function(){return k(this)?V(this):this},n.add=function(I){for(var m=Math.max(this.g.length,I.g.length),y=[],w=0,E=0;E<=m;E++){var b=w+(this.i(E)&65535)+(I.i(E)&65535),g=(b>>>16)+(this.i(E)>>>16)+(I.i(E)>>>16);w=g>>>16,b&=65535,g&=65535,y[E]=g<<16|b}return new a(y,y[y.length-1]&-2147483648?-1:0)};function j(I,m){return I.add(V(m))}n.j=function(I){if(D(this)||D(I))return _;if(k(this))return k(I)?V(this).j(V(I)):V(V(this).j(I));if(k(I))return V(this.j(V(I)));if(0>this.l(R)&&0>I.l(R))return f(this.m()*I.m());for(var m=this.g.length+I.g.length,y=[],w=0;w<2*m;w++)y[w]=0;for(w=0;w<this.g.length;w++)for(var E=0;E<I.g.length;E++){var b=this.i(w)>>>16,g=this.i(w)&65535,Ft=I.i(E)>>>16,_n=I.i(E)&65535;y[2*w+2*E]+=g*_n,q(y,2*w+2*E),y[2*w+2*E+1]+=b*_n,q(y,2*w+2*E+1),y[2*w+2*E+1]+=g*Ft,q(y,2*w+2*E+1),y[2*w+2*E+2]+=b*Ft,q(y,2*w+2*E+2)}for(w=0;w<m;w++)y[w]=y[2*w+1]<<16|y[2*w];for(w=m;w<2*m;w++)y[w]=0;return new a(y,0)};function q(I,m){for(;(I[m]&65535)!=I[m];)I[m+1]+=I[m]>>>16,I[m]&=65535,m++}function $(I,m){this.g=I,this.h=m}function Z(I,m){if(D(m))throw Error("division by zero");if(D(I))return new $(_,_);if(k(I))return m=Z(V(I),m),new $(V(m.g),V(m.h));if(k(m))return m=Z(I,V(m)),new $(V(m.g),m.h);if(30<I.g.length){if(k(I)||k(m))throw Error("slowDivide_ only works with positive integers.");for(var y=v,w=m;0>=w.l(I);)y=bt(y),w=bt(w);var E=X(y,1),b=X(w,1);for(w=X(w,2),y=X(y,2);!D(w);){var g=b.add(w);0>=g.l(I)&&(E=E.add(y),b=g),w=X(w,1),y=X(y,1)}return m=j(I,E.j(m)),new $(E,m)}for(E=_;0<=I.l(m);){for(y=Math.max(1,Math.floor(I.m()/m.m())),w=Math.ceil(Math.log(y)/Math.LN2),w=48>=w?1:Math.pow(2,w-48),b=f(y),g=b.j(m);k(g)||0<g.l(I);)y-=w,b=f(y),g=b.j(m);D(b)&&(b=v),E=E.add(b),I=j(I,g)}return new $(E,I)}n.A=function(I){return Z(this,I).h},n.and=function(I){for(var m=Math.max(this.g.length,I.g.length),y=[],w=0;w<m;w++)y[w]=this.i(w)&I.i(w);return new a(y,this.h&I.h)},n.or=function(I){for(var m=Math.max(this.g.length,I.g.length),y=[],w=0;w<m;w++)y[w]=this.i(w)|I.i(w);return new a(y,this.h|I.h)},n.xor=function(I){for(var m=Math.max(this.g.length,I.g.length),y=[],w=0;w<m;w++)y[w]=this.i(w)^I.i(w);return new a(y,this.h^I.h)};function bt(I){for(var m=I.g.length+1,y=[],w=0;w<m;w++)y[w]=I.i(w)<<1|I.i(w-1)>>>31;return new a(y,I.h)}function X(I,m){var y=m>>5;m%=32;for(var w=I.g.length-y,E=[],b=0;b<w;b++)E[b]=0<m?I.i(b+y)>>>m|I.i(b+y+1)<<32-m:I.i(b+y);return new a(E,I.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Es=bu.Md5=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=p,jt=bu.Integer=a}).apply(typeof Tu<"u"?Tu:typeof self<"u"?self:typeof window<"u"?window:{});var Or=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},$t={};var Is,Gf,Ue,Ts,zn,Fr,bs,As,Ss;(function(){var n,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(s,c,u){return s==Array.prototype||s==Object.prototype||(s[c]=u.value),s};function e(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof Or=="object"&&Or];for(var c=0;c<s.length;++c){var u=s[c];if(u&&u.Math==Math)return u}throw Error("Cannot find global object")}var r=e(this);function i(s,c){if(c)t:{var u=r;s=s.split(".");for(var d=0;d<s.length-1;d++){var T=s[d];if(!(T in u))break t;u=u[T]}s=s[s.length-1],d=u[s],c=c(d),c!=d&&c!=null&&t(u,s,{configurable:!0,writable:!0,value:c})}}function o(s,c){s instanceof String&&(s+="");var u=0,d=!1,T={next:function(){if(!d&&u<s.length){var A=u++;return{value:c(A,s[A]),done:!1}}return d=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}i("Array.prototype.values",function(s){return s||function(){return o(this,function(c,u){return u})}});var a=a||{},l=this||self;function h(s){var c=typeof s;return c=c!="object"?c:s?Array.isArray(s)?"array":c:"null",c=="array"||c=="object"&&typeof s.length=="number"}function f(s){var c=typeof s;return c=="object"&&s!=null||c=="function"}function p(s,c,u){return s.call.apply(s.bind,arguments)}function _(s,c,u){if(!s)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,d),s.apply(c,T)}}return function(){return s.apply(c,arguments)}}function v(s,c,u){return v=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:_,v.apply(null,arguments)}function R(s,c){var u=Array.prototype.slice.call(arguments,1);return function(){var d=u.slice();return d.push.apply(d,arguments),s.apply(this,d)}}function D(s,c){function u(){}u.prototype=c.prototype,s.aa=c.prototype,s.prototype=new u,s.prototype.constructor=s,s.Qb=function(d,T,A){for(var x=Array(arguments.length-2),J=2;J<arguments.length;J++)x[J-2]=arguments[J];return c.prototype[T].apply(d,x)}}function k(s){let c=s.length;if(0<c){let u=Array(c);for(let d=0;d<c;d++)u[d]=s[d];return u}return[]}function V(s,c){for(let u=1;u<arguments.length;u++){let d=arguments[u];if(h(d)){let T=s.length||0,A=d.length||0;s.length=T+A;for(let x=0;x<A;x++)s[T+x]=d[x]}else s.push(d)}}class j{constructor(c,u){this.i=c,this.j=u,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function q(s){return/^[\s\xa0]*$/.test(s)}function $(){var s=l.navigator;return s&&(s=s.userAgent)?s:""}function Z(s){return Z[" "](s),s}Z[" "]=function(){};var bt=$().indexOf("Gecko")!=-1&&!($().toLowerCase().indexOf("webkit")!=-1&&$().indexOf("Edge")==-1)&&!($().indexOf("Trident")!=-1||$().indexOf("MSIE")!=-1)&&$().indexOf("Edge")==-1;function X(s,c,u){for(let d in s)c.call(u,s[d],d,s)}function I(s,c){for(let u in s)c.call(void 0,s[u],u,s)}function m(s){let c={};for(let u in s)c[u]=s[u];return c}let y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function w(s,c){let u,d;for(let T=1;T<arguments.length;T++){d=arguments[T];for(u in d)s[u]=d[u];for(let A=0;A<y.length;A++)u=y[A],Object.prototype.hasOwnProperty.call(d,u)&&(s[u]=d[u])}}function E(s){var c=1;s=s.split(":");let u=[];for(;0<c&&s.length;)u.push(s.shift()),c--;return s.length&&u.push(s.join(":")),u}function b(s){l.setTimeout(()=>{throw s},0)}function g(){var s=xi;let c=null;return s.g&&(c=s.g,s.g=s.g.next,s.g||(s.h=null),c.next=null),c}class Ft{constructor(){this.h=this.g=null}add(c,u){let d=_n.get();d.set(c,u),this.h?this.h.next=d:this.g=d,this.h=d}}var _n=new j(()=>new Qh,s=>s.reset());class Qh{constructor(){this.next=this.g=this.h=null}set(c,u){this.h=c,this.g=u,this.next=null}reset(){this.next=this.g=this.h=null}}let wn,vn=!1,xi=new Ft,$a=()=>{let s=l.Promise.resolve(void 0);wn=()=>{s.then(Jh)}};var Jh=()=>{for(var s;s=g();){try{s.h.call(s.g)}catch(u){b(u)}var c=_n;c.j(s),100>c.h&&(c.h++,s.next=c.g,c.g=s)}vn=!1};function Yt(){this.s=this.s,this.C=this.C}Yt.prototype.s=!1,Yt.prototype.ma=function(){this.s||(this.s=!0,this.N())},Yt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function dt(s,c){this.type=s,this.g=this.target=c,this.defaultPrevented=!1}dt.prototype.h=function(){this.defaultPrevented=!0};var Xh=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var s=!1,c=Object.defineProperty({},"passive",{get:function(){s=!0}});try{let u=()=>{};l.addEventListener("test",u,c),l.removeEventListener("test",u,c)}catch{}return s}();function En(s,c){if(dt.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s){var u=this.type=s.type,d=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;if(this.target=s.target||s.srcElement,this.g=c,c=s.relatedTarget){if(bt){t:{try{Z(c.nodeName);var T=!0;break t}catch{}T=!1}T||(c=null)}}else u=="mouseover"?c=s.fromElement:u=="mouseout"&&(c=s.toElement);this.relatedTarget=c,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=typeof s.pointerType=="string"?s.pointerType:Yh[s.pointerType]||"",this.state=s.state,this.i=s,s.defaultPrevented&&En.aa.h.call(this)}}D(En,dt);var Yh={2:"touch",3:"pen",4:"mouse"};En.prototype.h=function(){En.aa.h.call(this);var s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var In="closure_listenable_"+(1e6*Math.random()|0),Zh=0;function td(s,c,u,d,T){this.listener=s,this.proxy=null,this.src=c,this.type=u,this.capture=!!d,this.ha=T,this.key=++Zh,this.da=this.fa=!1}function fr(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function mr(s){this.src=s,this.g={},this.h=0}mr.prototype.add=function(s,c,u,d,T){var A=s.toString();s=this.g[A],s||(s=this.g[A]=[],this.h++);var x=Ni(s,c,d,T);return-1<x?(c=s[x],u||(c.fa=!1)):(c=new td(c,this.src,A,!!d,T),c.fa=u,s.push(c)),c};function Vi(s,c){var u=c.type;if(u in s.g){var d=s.g[u],T=Array.prototype.indexOf.call(d,c,void 0),A;(A=0<=T)&&Array.prototype.splice.call(d,T,1),A&&(fr(c),s.g[u].length==0&&(delete s.g[u],s.h--))}}function Ni(s,c,u,d){for(var T=0;T<s.length;++T){var A=s[T];if(!A.da&&A.listener==c&&A.capture==!!u&&A.ha==d)return T}return-1}var ki="closure_lm_"+(1e6*Math.random()|0),Oi={};function Ga(s,c,u,d,T){if(d&&d.once)return Wa(s,c,u,d,T);if(Array.isArray(c)){for(var A=0;A<c.length;A++)Ga(s,c[A],u,d,T);return null}return u=Bi(u),s&&s[In]?s.K(c,u,f(d)?!!d.capture:!!d,T):Ka(s,c,u,!1,d,T)}function Ka(s,c,u,d,T,A){if(!c)throw Error("Invalid event type");var x=f(T)?!!T.capture:!!T,J=Mi(s);if(J||(s[ki]=J=new mr(s)),u=J.add(c,u,d,x,A),u.proxy)return u;if(d=ed(),u.proxy=d,d.src=s,d.listener=u,s.addEventListener)Xh||(T=x),T===void 0&&(T=!1),s.addEventListener(c.toString(),d,T);else if(s.attachEvent)s.attachEvent(Qa(c.toString()),d);else if(s.addListener&&s.removeListener)s.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return u}function ed(){function s(u){return c.call(s.src,s.listener,u)}let c=nd;return s}function Wa(s,c,u,d,T){if(Array.isArray(c)){for(var A=0;A<c.length;A++)Wa(s,c[A],u,d,T);return null}return u=Bi(u),s&&s[In]?s.L(c,u,f(d)?!!d.capture:!!d,T):Ka(s,c,u,!0,d,T)}function Ha(s,c,u,d,T){if(Array.isArray(c))for(var A=0;A<c.length;A++)Ha(s,c[A],u,d,T);else d=f(d)?!!d.capture:!!d,u=Bi(u),s&&s[In]?(s=s.i,c=String(c).toString(),c in s.g&&(A=s.g[c],u=Ni(A,u,d,T),-1<u&&(fr(A[u]),Array.prototype.splice.call(A,u,1),A.length==0&&(delete s.g[c],s.h--)))):s&&(s=Mi(s))&&(c=s.g[c.toString()],s=-1,c&&(s=Ni(c,u,d,T)),(u=-1<s?c[s]:null)&&Fi(u))}function Fi(s){if(typeof s!="number"&&s&&!s.da){var c=s.src;if(c&&c[In])Vi(c.i,s);else{var u=s.type,d=s.proxy;c.removeEventListener?c.removeEventListener(u,d,s.capture):c.detachEvent?c.detachEvent(Qa(u),d):c.addListener&&c.removeListener&&c.removeListener(d),(u=Mi(c))?(Vi(u,s),u.h==0&&(u.src=null,c[ki]=null)):fr(s)}}}function Qa(s){return s in Oi?Oi[s]:Oi[s]="on"+s}function nd(s,c){if(s.da)s=!0;else{c=new En(c,this);var u=s.listener,d=s.ha||s.src;s.fa&&Fi(s),s=u.call(d,c)}return s}function Mi(s){return s=s[ki],s instanceof mr?s:null}var Li="__closure_events_fn_"+(1e9*Math.random()>>>0);function Bi(s){return typeof s=="function"?s:(s[Li]||(s[Li]=function(c){return s.handleEvent(c)}),s[Li])}function ft(){Yt.call(this),this.i=new mr(this),this.M=this,this.F=null}D(ft,Yt),ft.prototype[In]=!0,ft.prototype.removeEventListener=function(s,c,u,d){Ha(this,s,c,u,d)};function wt(s,c){var u,d=s.F;if(d)for(u=[];d;d=d.F)u.push(d);if(s=s.M,d=c.type||c,typeof c=="string")c=new dt(c,s);else if(c instanceof dt)c.target=c.target||s;else{var T=c;c=new dt(d,s),w(c,T)}if(T=!0,u)for(var A=u.length-1;0<=A;A--){var x=c.g=u[A];T=pr(x,d,!0,c)&&T}if(x=c.g=s,T=pr(x,d,!0,c)&&T,T=pr(x,d,!1,c)&&T,u)for(A=0;A<u.length;A++)x=c.g=u[A],T=pr(x,d,!1,c)&&T}ft.prototype.N=function(){if(ft.aa.N.call(this),this.i){var s=this.i,c;for(c in s.g){for(var u=s.g[c],d=0;d<u.length;d++)fr(u[d]);delete s.g[c],s.h--}}this.F=null},ft.prototype.K=function(s,c,u,d){return this.i.add(String(s),c,!1,u,d)},ft.prototype.L=function(s,c,u,d){return this.i.add(String(s),c,!0,u,d)};function pr(s,c,u,d){if(c=s.i.g[String(c)],!c)return!0;c=c.concat();for(var T=!0,A=0;A<c.length;++A){var x=c[A];if(x&&!x.da&&x.capture==u){var J=x.listener,ht=x.ha||x.src;x.fa&&Vi(s.i,x),T=J.call(ht,d)!==!1&&T}}return T&&!d.defaultPrevented}function Ja(s,c,u){if(typeof s=="function")u&&(s=v(s,u));else if(s&&typeof s.handleEvent=="function")s=v(s.handleEvent,s);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(s,c||0)}function Xa(s){s.g=Ja(()=>{s.g=null,s.i&&(s.i=!1,Xa(s))},s.l);let c=s.h;s.h=null,s.m.apply(null,c)}class rd extends Yt{constructor(c,u){super(),this.m=c,this.l=u,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Xa(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Tn(s){Yt.call(this),this.h=s,this.g={}}D(Tn,Yt);var Ya=[];function Za(s){X(s.g,function(c,u){this.g.hasOwnProperty(u)&&Fi(c)},s),s.g={}}Tn.prototype.N=function(){Tn.aa.N.call(this),Za(this)},Tn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ui=l.JSON.stringify,id=l.JSON.parse,sd=class{stringify(s){return l.JSON.stringify(s,void 0)}parse(s){return l.JSON.parse(s,void 0)}};function qi(){}qi.prototype.h=null;function tc(s){return s.h||(s.h=s.i())}function ec(){}var bn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function zi(){dt.call(this,"d")}D(zi,dt);function ji(){dt.call(this,"c")}D(ji,dt);var ye={},nc=null;function gr(){return nc=nc||new ft}ye.La="serverreachability";function rc(s){dt.call(this,ye.La,s)}D(rc,dt);function An(s){let c=gr();wt(c,new rc(c))}ye.STAT_EVENT="statevent";function ic(s,c){dt.call(this,ye.STAT_EVENT,s),this.stat=c}D(ic,dt);function vt(s){let c=gr();wt(c,new ic(c,s))}ye.Ma="timingevent";function sc(s,c){dt.call(this,ye.Ma,s),this.size=c}D(sc,dt);function Sn(s,c){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){s()},c)}function Rn(){this.g=!0}Rn.prototype.xa=function(){this.g=!1};function od(s,c,u,d,T,A){s.info(function(){if(s.g)if(A)for(var x="",J=A.split("&"),ht=0;ht<J.length;ht++){var H=J[ht].split("=");if(1<H.length){var mt=H[0];H=H[1];var pt=mt.split("_");x=2<=pt.length&&pt[1]=="type"?x+(mt+"="+H+"&"):x+(mt+"=redacted&")}}else x=null;else x=A;return"XMLHTTP REQ ("+d+") [attempt "+T+"]: "+c+`
`+u+`
`+x})}function ad(s,c,u,d,T,A,x){s.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+T+"]: "+c+`
`+u+`
`+A+" "+x})}function ke(s,c,u,d){s.info(function(){return"XMLHTTP TEXT ("+c+"): "+ud(s,u)+(d?" "+d:"")})}function cd(s,c){s.info(function(){return"TIMEOUT: "+c})}Rn.prototype.info=function(){};function ud(s,c){if(!s.g)return c;if(!c)return null;try{var u=JSON.parse(c);if(u){for(s=0;s<u.length;s++)if(Array.isArray(u[s])){var d=u[s];if(!(2>d.length)){var T=d[1];if(Array.isArray(T)&&!(1>T.length)){var A=T[0];if(A!="noop"&&A!="stop"&&A!="close")for(var x=1;x<T.length;x++)T[x]=""}}}}return Ui(u)}catch{return c}}var yr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},oc={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},$i;function _r(){}D(_r,qi),_r.prototype.g=function(){return new XMLHttpRequest},_r.prototype.i=function(){return{}},$i=new _r;function Zt(s,c,u,d){this.j=s,this.i=c,this.l=u,this.R=d||1,this.U=new Tn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new ac}function ac(){this.i=null,this.g="",this.h=!1}var cc={},Gi={};function Ki(s,c,u){s.L=1,s.v=Ir(Mt(c)),s.m=u,s.P=!0,uc(s,null)}function uc(s,c){s.F=Date.now(),wr(s),s.A=Mt(s.v);var u=s.A,d=s.R;Array.isArray(d)||(d=[String(d)]),Tc(u.i,"t",d),s.C=0,u=s.j.J,s.h=new ac,s.g=qc(s.j,u?c:null,!s.m),0<s.O&&(s.M=new rd(v(s.Y,s,s.g),s.O)),c=s.U,u=s.g,d=s.ca;var T="readystatechange";Array.isArray(T)||(T&&(Ya[0]=T.toString()),T=Ya);for(var A=0;A<T.length;A++){var x=Ga(u,T[A],d||c.handleEvent,!1,c.h||c);if(!x)break;c.g[x.key]=x}c=s.H?m(s.H):{},s.m?(s.u||(s.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.A,s.u,s.m,c)):(s.u="GET",s.g.ea(s.A,s.u,null,c)),An(),od(s.i,s.u,s.A,s.l,s.R,s.m)}Zt.prototype.ca=function(s){s=s.target;let c=this.M;c&&Lt(s)==3?c.j():this.Y(s)},Zt.prototype.Y=function(s){try{if(s==this.g)t:{let pt=Lt(this.g);var c=this.g.Ba();let Me=this.g.Z();if(!(3>pt)&&(pt!=3||this.g&&(this.h.h||this.g.oa()||Dc(this.g)))){this.J||pt!=4||c==7||(c==8||0>=Me?An(3):An(2)),Wi(this);var u=this.g.Z();this.X=u;e:if(lc(this)){var d=Dc(this.g);s="";var T=d.length,A=Lt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){_e(this),Cn(this);var x="";break e}this.h.i=new l.TextDecoder}for(c=0;c<T;c++)this.h.h=!0,s+=this.h.i.decode(d[c],{stream:!(A&&c==T-1)});d.length=0,this.h.g+=s,this.C=0,x=this.h.g}else x=this.g.oa();if(this.o=u==200,ad(this.i,this.u,this.A,this.l,this.R,pt,u),this.o){if(this.T&&!this.K){e:{if(this.g){var J,ht=this.g;if((J=ht.g?ht.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!q(J)){var H=J;break e}}H=null}if(u=H)ke(this.i,this.l,u,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Hi(this,u);else{this.o=!1,this.s=3,vt(12),_e(this),Cn(this);break t}}if(this.P){u=!0;let Rt;for(;!this.J&&this.C<x.length;)if(Rt=ld(this,x),Rt==Gi){pt==4&&(this.s=4,vt(14),u=!1),ke(this.i,this.l,null,"[Incomplete Response]");break}else if(Rt==cc){this.s=4,vt(15),ke(this.i,this.l,x,"[Invalid Chunk]"),u=!1;break}else ke(this.i,this.l,Rt,null),Hi(this,Rt);if(lc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),pt!=4||x.length!=0||this.h.h||(this.s=1,vt(16),u=!1),this.o=this.o&&u,!u)ke(this.i,this.l,x,"[Invalid Chunked Response]"),_e(this),Cn(this);else if(0<x.length&&!this.W){this.W=!0;var mt=this.j;mt.g==this&&mt.ba&&!mt.M&&(mt.j.info("Great, no buffering proxy detected. Bytes received: "+x.length),ts(mt),mt.M=!0,vt(11))}}else ke(this.i,this.l,x,null),Hi(this,x);pt==4&&_e(this),this.o&&!this.J&&(pt==4?Mc(this.j,this):(this.o=!1,wr(this)))}else Rd(this.g),u==400&&0<x.indexOf("Unknown SID")?(this.s=3,vt(12)):(this.s=0,vt(13)),_e(this),Cn(this)}}}catch{}finally{}};function lc(s){return s.g?s.u=="GET"&&s.L!=2&&s.j.Ca:!1}function ld(s,c){var u=s.C,d=c.indexOf(`
`,u);return d==-1?Gi:(u=Number(c.substring(u,d)),isNaN(u)?cc:(d+=1,d+u>c.length?Gi:(c=c.slice(d,d+u),s.C=d+u,c)))}Zt.prototype.cancel=function(){this.J=!0,_e(this)};function wr(s){s.S=Date.now()+s.I,hc(s,s.I)}function hc(s,c){if(s.B!=null)throw Error("WatchDog timer not null");s.B=Sn(v(s.ba,s),c)}function Wi(s){s.B&&(l.clearTimeout(s.B),s.B=null)}Zt.prototype.ba=function(){this.B=null;let s=Date.now();0<=s-this.S?(cd(this.i,this.A),this.L!=2&&(An(),vt(17)),_e(this),this.s=2,Cn(this)):hc(this,this.S-s)};function Cn(s){s.j.G==0||s.J||Mc(s.j,s)}function _e(s){Wi(s);var c=s.M;c&&typeof c.ma=="function"&&c.ma(),s.M=null,Za(s.U),s.g&&(c=s.g,s.g=null,c.abort(),c.ma())}function Hi(s,c){try{var u=s.j;if(u.G!=0&&(u.g==s||Qi(u.h,s))){if(!s.K&&Qi(u.h,s)&&u.G==3){try{var d=u.Da.g.parse(c)}catch{d=null}if(Array.isArray(d)&&d.length==3){var T=d;if(T[0]==0){t:if(!u.u){if(u.g)if(u.g.F+3e3<s.F)Rr(u),Ar(u);else break t;Zi(u),vt(18)}}else u.za=T[1],0<u.za-u.T&&37500>T[2]&&u.F&&u.v==0&&!u.C&&(u.C=Sn(v(u.Za,u),6e3));if(1>=mc(u.h)&&u.ca){try{u.ca()}catch{}u.ca=void 0}}else ve(u,11)}else if((s.K||u.g==s)&&Rr(u),!q(c))for(T=u.Da.g.parse(c),c=0;c<T.length;c++){let H=T[c];if(u.T=H[0],H=H[1],u.G==2)if(H[0]=="c"){u.K=H[1],u.ia=H[2];let mt=H[3];mt!=null&&(u.la=mt,u.j.info("VER="+u.la));let pt=H[4];pt!=null&&(u.Aa=pt,u.j.info("SVER="+u.Aa));let Me=H[5];Me!=null&&typeof Me=="number"&&0<Me&&(d=1.5*Me,u.L=d,u.j.info("backChannelRequestTimeoutMs_="+d)),d=u;let Rt=s.g;if(Rt){let Pr=Rt.g?Rt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Pr){var A=d.h;A.g||Pr.indexOf("spdy")==-1&&Pr.indexOf("quic")==-1&&Pr.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(Ji(A,A.h),A.h=null))}if(d.D){let es=Rt.g?Rt.g.getResponseHeader("X-HTTP-Session-Id"):null;es&&(d.ya=es,Y(d.I,d.D,es))}}u.G=3,u.l&&u.l.ua(),u.ba&&(u.R=Date.now()-s.F,u.j.info("Handshake RTT: "+u.R+"ms")),d=u;var x=s;if(d.qa=Uc(d,d.J?d.ia:null,d.W),x.K){pc(d.h,x);var J=x,ht=d.L;ht&&(J.I=ht),J.B&&(Wi(J),wr(J)),d.g=x}else Oc(d);0<u.i.length&&Sr(u)}else H[0]!="stop"&&H[0]!="close"||ve(u,7);else u.G==3&&(H[0]=="stop"||H[0]=="close"?H[0]=="stop"?ve(u,7):Yi(u):H[0]!="noop"&&u.l&&u.l.ta(H),u.v=0)}}An(4)}catch{}}var hd=class{constructor(s,c){this.g=s,this.map=c}};function dc(s){this.l=s||10,l.PerformanceNavigationTiming?(s=l.performance.getEntriesByType("navigation"),s=0<s.length&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function fc(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function mc(s){return s.h?1:s.g?s.g.size:0}function Qi(s,c){return s.h?s.h==c:s.g?s.g.has(c):!1}function Ji(s,c){s.g?s.g.add(c):s.h=c}function pc(s,c){s.h&&s.h==c?s.h=null:s.g&&s.g.has(c)&&s.g.delete(c)}dc.prototype.cancel=function(){if(this.i=gc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let s of this.g.values())s.cancel();this.g.clear()}};function gc(s){if(s.h!=null)return s.i.concat(s.h.D);if(s.g!=null&&s.g.size!==0){let c=s.i;for(let u of s.g.values())c=c.concat(u.D);return c}return k(s.i)}function dd(s){if(s.V&&typeof s.V=="function")return s.V();if(typeof Map<"u"&&s instanceof Map||typeof Set<"u"&&s instanceof Set)return Array.from(s.values());if(typeof s=="string")return s.split("");if(h(s)){for(var c=[],u=s.length,d=0;d<u;d++)c.push(s[d]);return c}c=[],u=0;for(d in s)c[u++]=s[d];return c}function fd(s){if(s.na&&typeof s.na=="function")return s.na();if(!s.V||typeof s.V!="function"){if(typeof Map<"u"&&s instanceof Map)return Array.from(s.keys());if(!(typeof Set<"u"&&s instanceof Set)){if(h(s)||typeof s=="string"){var c=[];s=s.length;for(var u=0;u<s;u++)c.push(u);return c}c=[],u=0;for(let d in s)c[u++]=d;return c}}}function yc(s,c){if(s.forEach&&typeof s.forEach=="function")s.forEach(c,void 0);else if(h(s)||typeof s=="string")Array.prototype.forEach.call(s,c,void 0);else for(var u=fd(s),d=dd(s),T=d.length,A=0;A<T;A++)c.call(void 0,d[A],u&&u[A],s)}var _c=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function md(s,c){if(s){s=s.split("&");for(var u=0;u<s.length;u++){var d=s[u].indexOf("="),T=null;if(0<=d){var A=s[u].substring(0,d);T=s[u].substring(d+1)}else A=s[u];c(A,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function we(s){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,s instanceof we){this.h=s.h,vr(this,s.j),this.o=s.o,this.g=s.g,Er(this,s.s),this.l=s.l;var c=s.i,u=new xn;u.i=c.i,c.g&&(u.g=new Map(c.g),u.h=c.h),wc(this,u),this.m=s.m}else s&&(c=String(s).match(_c))?(this.h=!1,vr(this,c[1]||"",!0),this.o=Pn(c[2]||""),this.g=Pn(c[3]||"",!0),Er(this,c[4]),this.l=Pn(c[5]||"",!0),wc(this,c[6]||"",!0),this.m=Pn(c[7]||"")):(this.h=!1,this.i=new xn(null,this.h))}we.prototype.toString=function(){var s=[],c=this.j;c&&s.push(Dn(c,vc,!0),":");var u=this.g;return(u||c=="file")&&(s.push("//"),(c=this.o)&&s.push(Dn(c,vc,!0),"@"),s.push(encodeURIComponent(String(u)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u=this.s,u!=null&&s.push(":",String(u))),(u=this.l)&&(this.g&&u.charAt(0)!="/"&&s.push("/"),s.push(Dn(u,u.charAt(0)=="/"?yd:gd,!0))),(u=this.i.toString())&&s.push("?",u),(u=this.m)&&s.push("#",Dn(u,wd)),s.join("")};function Mt(s){return new we(s)}function vr(s,c,u){s.j=u?Pn(c,!0):c,s.j&&(s.j=s.j.replace(/:$/,""))}function Er(s,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);s.s=c}else s.s=null}function wc(s,c,u){c instanceof xn?(s.i=c,vd(s.i,s.h)):(u||(c=Dn(c,_d)),s.i=new xn(c,s.h))}function Y(s,c,u){s.i.set(c,u)}function Ir(s){return Y(s,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),s}function Pn(s,c){return s?c?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function Dn(s,c,u){return typeof s=="string"?(s=encodeURI(s).replace(c,pd),u&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function pd(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var vc=/[#\/\?@]/g,gd=/[#\?:]/g,yd=/[#\?]/g,_d=/[#\?@]/g,wd=/#/g;function xn(s,c){this.h=this.g=null,this.i=s||null,this.j=!!c}function te(s){s.g||(s.g=new Map,s.h=0,s.i&&md(s.i,function(c,u){s.add(decodeURIComponent(c.replace(/\+/g," ")),u)}))}n=xn.prototype,n.add=function(s,c){te(this),this.i=null,s=Oe(this,s);var u=this.g.get(s);return u||this.g.set(s,u=[]),u.push(c),this.h+=1,this};function Ec(s,c){te(s),c=Oe(s,c),s.g.has(c)&&(s.i=null,s.h-=s.g.get(c).length,s.g.delete(c))}function Ic(s,c){return te(s),c=Oe(s,c),s.g.has(c)}n.forEach=function(s,c){te(this),this.g.forEach(function(u,d){u.forEach(function(T){s.call(c,T,d,this)},this)},this)},n.na=function(){te(this);let s=Array.from(this.g.values()),c=Array.from(this.g.keys()),u=[];for(let d=0;d<c.length;d++){let T=s[d];for(let A=0;A<T.length;A++)u.push(c[d])}return u},n.V=function(s){te(this);let c=[];if(typeof s=="string")Ic(this,s)&&(c=c.concat(this.g.get(Oe(this,s))));else{s=Array.from(this.g.values());for(let u=0;u<s.length;u++)c=c.concat(s[u])}return c},n.set=function(s,c){return te(this),this.i=null,s=Oe(this,s),Ic(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[c]),this.h+=1,this},n.get=function(s,c){return s?(s=this.V(s),0<s.length?String(s[0]):c):c};function Tc(s,c,u){Ec(s,c),0<u.length&&(s.i=null,s.g.set(Oe(s,c),k(u)),s.h+=u.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";let s=[],c=Array.from(this.g.keys());for(var u=0;u<c.length;u++){var d=c[u];let A=encodeURIComponent(String(d)),x=this.V(d);for(d=0;d<x.length;d++){var T=A;x[d]!==""&&(T+="="+encodeURIComponent(String(x[d]))),s.push(T)}}return this.i=s.join("&")};function Oe(s,c){return c=String(c),s.j&&(c=c.toLowerCase()),c}function vd(s,c){c&&!s.j&&(te(s),s.i=null,s.g.forEach(function(u,d){var T=d.toLowerCase();d!=T&&(Ec(this,d),Tc(this,T,u))},s)),s.j=c}function Ed(s,c){let u=new Rn;if(l.Image){let d=new Image;d.onload=R(ee,u,"TestLoadImage: loaded",!0,c,d),d.onerror=R(ee,u,"TestLoadImage: error",!1,c,d),d.onabort=R(ee,u,"TestLoadImage: abort",!1,c,d),d.ontimeout=R(ee,u,"TestLoadImage: timeout",!1,c,d),l.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=s}else c(!1)}function Id(s,c){let u=new Rn,d=new AbortController,T=setTimeout(()=>{d.abort(),ee(u,"TestPingServer: timeout",!1,c)},1e4);fetch(s,{signal:d.signal}).then(A=>{clearTimeout(T),A.ok?ee(u,"TestPingServer: ok",!0,c):ee(u,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(T),ee(u,"TestPingServer: error",!1,c)})}function ee(s,c,u,d,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),d(u)}catch{}}function Td(){this.g=new sd}function bd(s,c,u){let d=u||"";try{yc(s,function(T,A){let x=T;f(T)&&(x=Ui(T)),c.push(d+A+"="+encodeURIComponent(x))})}catch(T){throw c.push(d+"type="+encodeURIComponent("_badmap")),T}}function Vn(s){this.l=s.Ub||null,this.j=s.eb||!1}D(Vn,qi),Vn.prototype.g=function(){return new Tr(this.l,this.j)},Vn.prototype.i=function(s){return function(){return s}}({});function Tr(s,c){ft.call(this),this.D=s,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}D(Tr,ft),n=Tr.prototype,n.open=function(s,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=s,this.A=c,this.readyState=1,kn(this)},n.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;let c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};s&&(c.body=s),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Nn(this)),this.readyState=0},n.Sa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,kn(this)),this.g&&(this.readyState=3,kn(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;bc(this)}else s.text().then(this.Ra.bind(this),this.ga.bind(this))};function bc(s){s.j.read().then(s.Pa.bind(s)).catch(s.ga.bind(s))}n.Pa=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var c=s.value?s.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!s.done}))&&(this.response=this.responseText+=c)}s.done?Nn(this):kn(this),this.readyState==3&&bc(this)}},n.Ra=function(s){this.g&&(this.response=this.responseText=s,Nn(this))},n.Qa=function(s){this.g&&(this.response=s,Nn(this))},n.ga=function(){this.g&&Nn(this)};function Nn(s){s.readyState=4,s.l=null,s.j=null,s.v=null,kn(s)}n.setRequestHeader=function(s,c){this.u.append(s,c)},n.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";let s=[],c=this.h.entries();for(var u=c.next();!u.done;)u=u.value,s.push(u[0]+": "+u[1]),u=c.next();return s.join(`\r
`)};function kn(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(Tr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function Ac(s){let c="";return X(s,function(u,d){c+=d,c+=":",c+=u,c+=`\r
`}),c}function Xi(s,c,u){t:{for(d in u){var d=!1;break t}d=!0}d||(u=Ac(u),typeof s=="string"?u!=null&&encodeURIComponent(String(u)):Y(s,c,u))}function nt(s){ft.call(this),this.headers=new Map,this.o=s||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}D(nt,ft);var Ad=/^https?$/i,Sd=["POST","PUT"];n=nt.prototype,n.Ha=function(s){this.J=s},n.ea=function(s,c,u,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);c=c?c.toUpperCase():"GET",this.D=s,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():$i.g(),this.v=this.o?tc(this.o):tc($i),this.g.onreadystatechange=v(this.Ea,this);try{this.B=!0,this.g.open(c,String(s),!0),this.B=!1}catch(A){Sc(this,A);return}if(s=u||"",u=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var T in d)u.set(T,d[T]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(let A of d.keys())u.set(A,d.get(A));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(u.keys()).find(A=>A.toLowerCase()=="content-type"),T=l.FormData&&s instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Sd,c,void 0))||d||T||u.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[A,x]of u)this.g.setRequestHeader(A,x);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Pc(this),this.u=!0,this.g.send(s),this.u=!1}catch(A){Sc(this,A)}};function Sc(s,c){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=c,s.m=5,Rc(s),br(s)}function Rc(s){s.A||(s.A=!0,wt(s,"complete"),wt(s,"error"))}n.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=s||7,wt(this,"complete"),wt(this,"abort"),br(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),br(this,!0)),nt.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Cc(this):this.bb())},n.bb=function(){Cc(this)};function Cc(s){if(s.h&&typeof a<"u"&&(!s.v[1]||Lt(s)!=4||s.Z()!=2)){if(s.u&&Lt(s)==4)Ja(s.Ea,0,s);else if(wt(s,"readystatechange"),Lt(s)==4){s.h=!1;try{let x=s.Z();t:switch(x){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break t;default:c=!1}var u;if(!(u=c)){var d;if(d=x===0){var T=String(s.D).match(_c)[1]||null;!T&&l.self&&l.self.location&&(T=l.self.location.protocol.slice(0,-1)),d=!Ad.test(T?T.toLowerCase():"")}u=d}if(u)wt(s,"complete"),wt(s,"success");else{s.m=6;try{var A=2<Lt(s)?s.g.statusText:""}catch{A=""}s.l=A+" ["+s.Z()+"]",Rc(s)}}finally{br(s)}}}}function br(s,c){if(s.g){Pc(s);let u=s.g,d=s.v[0]?()=>{}:null;s.g=null,s.v=null,c||wt(s,"ready");try{u.onreadystatechange=d}catch{}}}function Pc(s){s.I&&(l.clearTimeout(s.I),s.I=null)}n.isActive=function(){return!!this.g};function Lt(s){return s.g?s.g.readyState:0}n.Z=function(){try{return 2<Lt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(s){if(this.g){var c=this.g.responseText;return s&&c.indexOf(s)==0&&(c=c.substring(s.length)),id(c)}};function Dc(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.H){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function Rd(s){let c={};s=(s.g&&2<=Lt(s)&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<s.length;d++){if(q(s[d]))continue;var u=E(s[d]);let T=u[0];if(u=u[1],typeof u!="string")continue;u=u.trim();let A=c[T]||[];c[T]=A,A.push(u)}I(c,function(d){return d.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function On(s,c,u){return u&&u.internalChannelParams&&u.internalChannelParams[s]||c}function xc(s){this.Aa=0,this.i=[],this.j=new Rn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=On("failFast",!1,s),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=On("baseRetryDelayMs",5e3,s),this.cb=On("retryDelaySeedMs",1e4,s),this.Wa=On("forwardChannelMaxRetries",2,s),this.wa=On("forwardChannelRequestTimeoutMs",2e4,s),this.pa=s&&s.xmlHttpFactory||void 0,this.Xa=s&&s.Tb||void 0,this.Ca=s&&s.useFetchStreams||!1,this.L=void 0,this.J=s&&s.supportsCrossDomainXhr||!1,this.K="",this.h=new dc(s&&s.concurrentRequestLimit),this.Da=new Td,this.P=s&&s.fastHandshake||!1,this.O=s&&s.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=s&&s.Rb||!1,s&&s.xa&&this.j.xa(),s&&s.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&s&&s.detectBufferingProxy||!1,this.ja=void 0,s&&s.longPollingTimeout&&0<s.longPollingTimeout&&(this.ja=s.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=xc.prototype,n.la=8,n.G=1,n.connect=function(s,c,u,d){vt(0),this.W=s,this.H=c||{},u&&d!==void 0&&(this.H.OSID=u,this.H.OAID=d),this.F=this.X,this.I=Uc(this,null,this.W),Sr(this)};function Yi(s){if(Vc(s),s.G==3){var c=s.U++,u=Mt(s.I);if(Y(u,"SID",s.K),Y(u,"RID",c),Y(u,"TYPE","terminate"),Fn(s,u),c=new Zt(s,s.j,c),c.L=2,c.v=Ir(Mt(u)),u=!1,l.navigator&&l.navigator.sendBeacon)try{u=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!u&&l.Image&&(new Image().src=c.v,u=!0),u||(c.g=qc(c.j,null),c.g.ea(c.v)),c.F=Date.now(),wr(c)}Bc(s)}function Ar(s){s.g&&(ts(s),s.g.cancel(),s.g=null)}function Vc(s){Ar(s),s.u&&(l.clearTimeout(s.u),s.u=null),Rr(s),s.h.cancel(),s.s&&(typeof s.s=="number"&&l.clearTimeout(s.s),s.s=null)}function Sr(s){if(!fc(s.h)&&!s.s){s.s=!0;var c=s.Ga;wn||$a(),vn||(wn(),vn=!0),xi.add(c,s),s.B=0}}function Cd(s,c){return mc(s.h)>=s.h.j-(s.s?1:0)?!1:s.s?(s.i=c.D.concat(s.i),!0):s.G==1||s.G==2||s.B>=(s.Va?0:s.Wa)?!1:(s.s=Sn(v(s.Ga,s,c),Lc(s,s.B)),s.B++,!0)}n.Ga=function(s){if(this.s)if(this.s=null,this.G==1){if(!s){this.U=Math.floor(1e5*Math.random()),s=this.U++;let T=new Zt(this,this.j,s),A=this.o;if(this.S&&(A?(A=m(A),w(A,this.S)):A=this.S),this.m!==null||this.O||(T.H=A,A=null),this.P)t:{for(var c=0,u=0;u<this.i.length;u++){e:{var d=this.i[u];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break e}d=void 0}if(d===void 0)break;if(c+=d,4096<c){c=u;break t}if(c===4096||u===this.i.length-1){c=u+1;break t}}c=1e3}else c=1e3;c=kc(this,T,c),u=Mt(this.I),Y(u,"RID",s),Y(u,"CVER",22),this.D&&Y(u,"X-HTTP-Session-Id",this.D),Fn(this,u),A&&(this.O?c="headers="+encodeURIComponent(String(Ac(A)))+"&"+c:this.m&&Xi(u,this.m,A)),Ji(this.h,T),this.Ua&&Y(u,"TYPE","init"),this.P?(Y(u,"$req",c),Y(u,"SID","null"),T.T=!0,Ki(T,u,null)):Ki(T,u,c),this.G=2}}else this.G==3&&(s?Nc(this,s):this.i.length==0||fc(this.h)||Nc(this))};function Nc(s,c){var u;c?u=c.l:u=s.U++;let d=Mt(s.I);Y(d,"SID",s.K),Y(d,"RID",u),Y(d,"AID",s.T),Fn(s,d),s.m&&s.o&&Xi(d,s.m,s.o),u=new Zt(s,s.j,u,s.B+1),s.m===null&&(u.H=s.o),c&&(s.i=c.D.concat(s.i)),c=kc(s,u,1e3),u.I=Math.round(.5*s.wa)+Math.round(.5*s.wa*Math.random()),Ji(s.h,u),Ki(u,d,c)}function Fn(s,c){s.H&&X(s.H,function(u,d){Y(c,d,u)}),s.l&&yc({},function(u,d){Y(c,d,u)})}function kc(s,c,u){u=Math.min(s.i.length,u);var d=s.l?v(s.l.Na,s.l,s):null;t:{var T=s.i;let A=-1;for(;;){let x=["count="+u];A==-1?0<u?(A=T[0].g,x.push("ofs="+A)):A=0:x.push("ofs="+A);let J=!0;for(let ht=0;ht<u;ht++){let H=T[ht].g,mt=T[ht].map;if(H-=A,0>H)A=Math.max(0,T[ht].g-100),J=!1;else try{bd(mt,x,"req"+H+"_")}catch{d&&d(mt)}}if(J){d=x.join("&");break t}}}return s=s.i.splice(0,u),c.D=s,d}function Oc(s){if(!s.g&&!s.u){s.Y=1;var c=s.Fa;wn||$a(),vn||(wn(),vn=!0),xi.add(c,s),s.v=0}}function Zi(s){return s.g||s.u||3<=s.v?!1:(s.Y++,s.u=Sn(v(s.Fa,s),Lc(s,s.v)),s.v++,!0)}n.Fa=function(){if(this.u=null,Fc(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var s=2*this.R;this.j.info("BP detection timer enabled: "+s),this.A=Sn(v(this.ab,this),s)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,vt(10),Ar(this),Fc(this))};function ts(s){s.A!=null&&(l.clearTimeout(s.A),s.A=null)}function Fc(s){s.g=new Zt(s,s.j,"rpc",s.Y),s.m===null&&(s.g.H=s.o),s.g.O=0;var c=Mt(s.qa);Y(c,"RID","rpc"),Y(c,"SID",s.K),Y(c,"AID",s.T),Y(c,"CI",s.F?"0":"1"),!s.F&&s.ja&&Y(c,"TO",s.ja),Y(c,"TYPE","xmlhttp"),Fn(s,c),s.m&&s.o&&Xi(c,s.m,s.o),s.L&&(s.g.I=s.L);var u=s.g;s=s.ia,u.L=1,u.v=Ir(Mt(c)),u.m=null,u.P=!0,uc(u,s)}n.Za=function(){this.C!=null&&(this.C=null,Ar(this),Zi(this),vt(19))};function Rr(s){s.C!=null&&(l.clearTimeout(s.C),s.C=null)}function Mc(s,c){var u=null;if(s.g==c){Rr(s),ts(s),s.g=null;var d=2}else if(Qi(s.h,c))u=c.D,pc(s.h,c),d=1;else return;if(s.G!=0){if(c.o)if(d==1){u=c.m?c.m.length:0,c=Date.now()-c.F;var T=s.B;d=gr(),wt(d,new sc(d,u)),Sr(s)}else Oc(s);else if(T=c.s,T==3||T==0&&0<c.X||!(d==1&&Cd(s,c)||d==2&&Zi(s)))switch(u&&0<u.length&&(c=s.h,c.i=c.i.concat(u)),T){case 1:ve(s,5);break;case 4:ve(s,10);break;case 3:ve(s,6);break;default:ve(s,2)}}}function Lc(s,c){let u=s.Ta+Math.floor(Math.random()*s.cb);return s.isActive()||(u*=2),u*c}function ve(s,c){if(s.j.info("Error code "+c),c==2){var u=v(s.fb,s),d=s.Xa;let T=!d;d=new we(d||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||vr(d,"https"),Ir(d),T?Ed(d.toString(),u):Id(d.toString(),u)}else vt(2);s.G=0,s.l&&s.l.sa(c),Bc(s),Vc(s)}n.fb=function(s){s?(this.j.info("Successfully pinged google.com"),vt(2)):(this.j.info("Failed to ping google.com"),vt(1))};function Bc(s){if(s.G=0,s.ka=[],s.l){let c=gc(s.h);(c.length!=0||s.i.length!=0)&&(V(s.ka,c),V(s.ka,s.i),s.h.i.length=0,k(s.i),s.i.length=0),s.l.ra()}}function Uc(s,c,u){var d=u instanceof we?Mt(u):new we(u);if(d.g!="")c&&(d.g=c+"."+d.g),Er(d,d.s);else{var T=l.location;d=T.protocol,c=c?c+"."+T.hostname:T.hostname,T=+T.port;var A=new we(null);d&&vr(A,d),c&&(A.g=c),T&&Er(A,T),u&&(A.l=u),d=A}return u=s.D,c=s.ya,u&&c&&Y(d,u,c),Y(d,"VER",s.la),Fn(s,d),d}function qc(s,c,u){if(c&&!s.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=s.Ca&&!s.pa?new nt(new Vn({eb:u})):new nt(s.pa),c.Ha(s.J),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function zc(){}n=zc.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Cr(){}Cr.prototype.g=function(s,c){return new Et(s,c)};function Et(s,c){ft.call(this),this.g=new xc(c),this.l=s,this.h=c&&c.messageUrlParams||null,s=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(s?s["X-WebChannel-Content-Type"]=c.messageContentType:s={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(s?s["X-WebChannel-Client-Profile"]=c.va:s={"X-WebChannel-Client-Profile":c.va}),this.g.S=s,(s=c&&c.Sb)&&!q(s)&&(this.g.m=s),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!q(c)&&(this.g.D=c,s=this.h,s!==null&&c in s&&(s=this.h,c in s&&delete s[c])),this.j=new Fe(this)}D(Et,ft),Et.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Et.prototype.close=function(){Yi(this.g)},Et.prototype.o=function(s){var c=this.g;if(typeof s=="string"){var u={};u.__data__=s,s=u}else this.u&&(u={},u.__data__=Ui(s),s=u);c.i.push(new hd(c.Ya++,s)),c.G==3&&Sr(c)},Et.prototype.N=function(){this.g.l=null,delete this.j,Yi(this.g),delete this.g,Et.aa.N.call(this)};function jc(s){zi.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var c=s.__sm__;if(c){t:{for(let u in c){s=u;break t}s=void 0}(this.i=s)&&(s=this.i,c=c!==null&&s in c?c[s]:void 0),this.data=c}else this.data=s}D(jc,zi);function $c(){ji.call(this),this.status=1}D($c,ji);function Fe(s){this.g=s}D(Fe,zc),Fe.prototype.ua=function(){wt(this.g,"a")},Fe.prototype.ta=function(s){wt(this.g,new jc(s))},Fe.prototype.sa=function(s){wt(this.g,new $c)},Fe.prototype.ra=function(){wt(this.g,"b")},Cr.prototype.createWebChannel=Cr.prototype.g,Et.prototype.send=Et.prototype.o,Et.prototype.open=Et.prototype.m,Et.prototype.close=Et.prototype.close,Ss=$t.createWebChannelTransport=function(){return new Cr},As=$t.getStatEventTarget=function(){return gr()},bs=$t.Event=ye,Fr=$t.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},yr.NO_ERROR=0,yr.TIMEOUT=8,yr.HTTP_ERROR=6,zn=$t.ErrorCode=yr,oc.COMPLETE="complete",Ts=$t.EventType=oc,ec.EventType=bn,bn.OPEN="a",bn.CLOSE="b",bn.ERROR="c",bn.MESSAGE="d",ft.prototype.listen=ft.prototype.K,Ue=$t.WebChannel=ec,Gf=$t.FetchXmlHttpFactory=Vn,nt.prototype.listenOnce=nt.prototype.L,nt.prototype.getLastError=nt.prototype.Ka,nt.prototype.getLastErrorCode=nt.prototype.Ba,nt.prototype.getStatus=nt.prototype.Z,nt.prototype.getResponseJson=nt.prototype.Oa,nt.prototype.getResponseText=nt.prototype.oa,nt.prototype.send=nt.prototype.ea,nt.prototype.setWithCredentials=nt.prototype.Ha,Is=$t.XhrIo=nt}).apply(typeof Or<"u"?Or:typeof self<"u"?self:typeof window<"u"?window:{});var Au="@firebase/firestore",Su="4.8.0";var ut=class{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}};ut.UNAUTHENTICATED=new ut(null),ut.GOOGLE_CREDENTIALS=new ut("google-credentials-uid"),ut.FIRST_PARTY=new ut("first-party-uid"),ut.MOCK_USER=new ut("mock-user");var hn="11.10.0";var Se=new Be("@firebase/firestore");function qe(){return Se.logLevel}function N(n,...t){if(Se.logLevel<=K.DEBUG){let e=t.map(ma);Se.debug(`Firestore (${hn}): ${n}`,...e)}}function Kt(n,...t){if(Se.logLevel<=K.ERROR){let e=t.map(ma);Se.error(`Firestore (${hn}): ${n}`,...e)}}function ue(n,...t){if(Se.logLevel<=K.WARN){let e=t.map(ma);Se.warn(`Firestore (${hn}): ${n}`,...e)}}function ma(n){if(typeof n=="string")return n;try{return function(e){return JSON.stringify(e)}(n)}catch{return n}}function M(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,pl(n,r,e)}function pl(n,t,e){let r=`FIRESTORE (${hn}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw Kt(r),new Error(r)}function Q(n,t,e,r){let i="Unexpected state";typeof e=="string"?i=e:r=e,n||pl(t,i,r)}function B(n,t){return n}var C={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},F=class extends Bt{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var Gt=class{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}};var jr=class{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}},xs=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(ut.UNAUTHENTICATED))}shutdown(){}},Vs=class{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}},Ns=class{constructor(t){this.t=t,this.currentUser=ut.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){Q(this.o===void 0,42304);let r=this.i,i=h=>this.i!==r?(r=this.i,e(h)):Promise.resolve(),o=new Gt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Gt,t.enqueueRetryable(()=>i(this.currentUser))};let a=()=>{let h=o;t.enqueueRetryable(async()=>{await h.promise,await i(this.currentUser)})},l=h=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(h=>l(h)),setTimeout(()=>{if(!this.auth){let h=this.t.getImmediate({optional:!0});h?l(h):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Gt)}},0),a()}getToken(){let t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(r=>this.i!==t?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Q(typeof r.accessToken=="string",31837,{l:r}),new jr(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){let t=this.auth&&this.auth.getUid();return Q(t===null||typeof t=="string",2055,{h:t}),new ut(t)}},ks=class{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=ut.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);let t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}},Os=class{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new ks(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(ut.FIRST_PARTY))}shutdown(){}invalidateToken(){}},$r=class{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},Fs=class{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,_u(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){Q(this.o===void 0,3512);let r=o=>{o.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);let a=o.token!==this.m;return this.m=o.token,N("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>r(o))};let i=o=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(o=>i(o)),setTimeout(()=>{if(!this.appCheck){let o=this.V.getImmediate({optional:!0});o?i(o):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new $r(this.p));let t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(Q(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new $r(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}};function Kf(n){let t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}function gl(){return new TextEncoder}var Hn=class{static newId(){let t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516),r="";for(;r.length<20;){let i=Kf(40);for(let o=0;o<i.length;++o)r.length<20&&i[o]<e&&(r+=t.charAt(i[o]%62))}return r}};function z(n,t){return n<t?-1:n>t?1:0}function Ms(n,t){let e=0;for(;e<n.length&&e<t.length;){let r=n.codePointAt(e),i=t.codePointAt(e);if(r!==i){if(r<128&&i<128)return z(r,i);{let o=gl(),a=Wf(o.encode(Ru(n,e)),o.encode(Ru(t,e)));return a!==0?a:z(r,i)}}e+=r>65535?2:1}return z(n.length,t.length)}function Ru(n,t){return n.codePointAt(t)>65535?n.substring(t,t+2):n.substring(t,t+1)}function Wf(n,t){for(let e=0;e<n.length&&e<t.length;++e)if(n[e]!==t[e])return z(n[e],t[e]);return z(n.length,t.length)}function Qe(n,t,e){return n.length===t.length&&n.every((r,i)=>e(r,t[i]))}var Cu="__name__",Gr=class n{constructor(t,e,r){e===void 0?e=0:e>t.length&&M(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&M(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return n.comparator(this,t)===0}child(t){let e=this.segments.slice(this.offset,this.limit());return t instanceof n?t.forEach(r=>{e.push(r)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){let r=Math.min(t.length,e.length);for(let i=0;i<r;i++){let o=n.compareSegments(t.get(i),e.get(i));if(o!==0)return o}return z(t.length,e.length)}static compareSegments(t,e){let r=n.isNumericId(t),i=n.isNumericId(e);return r&&!i?-1:!r&&i?1:r&&i?n.extractNumericId(t).compare(n.extractNumericId(e)):Ms(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return jt.fromString(t.substring(4,t.length-2))}},it=class n extends Gr{construct(t,e,r){return new n(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){let e=[];for(let r of t){if(r.indexOf("//")>=0)throw new F(C.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter(i=>i.length>0))}return new n(e)}static emptyPath(){return new n([])}},Hf=/^[_a-zA-Z][_a-zA-Z0-9]*$/,Tt=class n extends Gr{construct(t,e,r){return new n(t,e,r)}static isValidIdentifier(t){return Hf.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),n.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Cu}static keyField(){return new n([Cu])}static fromServerFormat(t){let e=[],r="",i=0,o=()=>{if(r.length===0)throw new F(C.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""},a=!1;for(;i<t.length;){let l=t[i];if(l==="\\"){if(i+1===t.length)throw new F(C.INVALID_ARGUMENT,"Path has trailing escape character: "+t);let h=t[i+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new F(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=h,i+=2}else l==="`"?(a=!a,i++):l!=="."||a?(r+=l,i++):(o(),i++)}if(o(),a)throw new F(C.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new n(e)}static emptyPath(){return new n([])}};var L=class n{constructor(t){this.path=t}static fromPath(t){return new n(it.fromString(t))}static fromName(t){return new n(it.fromString(t).popFirst(5))}static empty(){return new n(it.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&it.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return it.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new n(new it(t.slice()))}};function Qf(n,t,e){if(!e)throw new F(C.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function Jf(n,t,e,r){if(t===!0&&r===!0)throw new F(C.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function Pu(n){if(!L.isDocumentKey(n))throw new F(C.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function yl(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function pa(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let t=function(r){return r.constructor?r.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":M(12329,{type:typeof n})}function ie(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new F(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let e=pa(n);throw new F(C.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}function at(n,t){let e={typeString:n};return t&&(e.value=t),e}function ar(n,t){if(!yl(n))throw new F(C.INVALID_ARGUMENT,"JSON must be an object");let e;for(let r in t)if(t[r]){let i=t[r].typeString,o="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}let a=n[r];if(i&&typeof a!==i){e=`JSON field '${r}' must be a ${i}.`;break}if(o!==void 0&&a!==o.value){e=`Expected '${r}' field to equal '${o.value}'`;break}}if(e)throw new F(C.INVALID_ARGUMENT,e);return!0}var Du=-62135596800,xu=1e6,et=class n{static now(){return n.fromMillis(Date.now())}static fromDate(t){return n.fromMillis(t.getTime())}static fromMillis(t){let e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*xu);return new n(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new F(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new F(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Du)throw new F(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new F(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/xu}_compareTo(t){return this.seconds===t.seconds?z(this.nanoseconds,t.nanoseconds):z(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:n._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(ar(t,n._jsonSchema))return new n(t.seconds,t.nanoseconds)}valueOf(){let t=this.seconds-Du;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};et._jsonSchemaVersion="firestore/timestamp/1.0",et._jsonSchema={type:at("string",et._jsonSchemaVersion),seconds:at("number"),nanoseconds:at("number")};var U=class n{static fromTimestamp(t){return new n(t)}static min(){return new n(new et(0,0))}static max(){return new n(new et(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var Qn=-1,Ls=class{constructor(t,e,r,i){this.indexId=t,this.collectionGroup=e,this.fields=r,this.indexState=i}};Ls.UNKNOWN_ID=-1;function Xf(n,t){let e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=U.fromTimestamp(r===1e9?new et(e+1,0):new et(e,r));return new Re(i,L.empty(),t)}function Yf(n){return new Re(n.readTime,n.key,Qn)}var Re=class n{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new n(U.min(),L.empty(),Qn)}static max(){return new n(U.max(),L.empty(),Qn)}};function Zf(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=L.comparator(n.documentKey,t.documentKey),e!==0?e:z(n.largestBatchId,t.largestBatchId))}var tm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",Bs=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}};async function dn(n){if(n.code!==C.FAILED_PRECONDITION||n.message!==tm)throw n;N("LocalStore","Unexpectedly lost primary lease")}var P=class n{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new n((r,i)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,i)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,i)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{let e=t();return e instanceof n?e:n.resolve(e)}catch(e){return n.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):n.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):n.reject(e)}static resolve(t){return new n((e,r)=>{e(t)})}static reject(t){return new n((e,r)=>{r(t)})}static waitFor(t){return new n((e,r)=>{let i=0,o=0,a=!1;t.forEach(l=>{++i,l.next(()=>{++o,a&&o===i&&e()},h=>r(h))}),a=!0,o===i&&e()})}static or(t){let e=n.resolve(!1);for(let r of t)e=e.next(i=>i?n.resolve(i):r());return e}static forEach(t,e){let r=[];return t.forEach((i,o)=>{r.push(e.call(this,i,o))}),this.waitFor(r)}static mapArray(t,e){return new n((r,i)=>{let o=t.length,a=new Array(o),l=0;for(let h=0;h<o;h++){let f=h;e(t[f]).next(p=>{a[f]=p,++l,l===o&&r(a)},p=>i(p))}})}static doWhile(t,e){return new n((r,i)=>{let o=()=>{t()===!0?e().next(()=>{o()},i):r()};o()})}};function em(n){let t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function fn(n){return n.name==="IndexedDbTransactionError"}var Je=class{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this._e(r),this.ae=r=>e.writeSequenceNumber(r))}_e(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){let t=++this.previousValue;return this.ae&&this.ae(t),t}};Je.ue=-1;var ga=-1;function Ti(n){return n==null}function Jn(n){return n===0&&1/n==-1/0}function nm(n){return typeof n=="number"&&Number.isInteger(n)&&!Jn(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}var _l="";function rm(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=Vu(t)),t=im(n.get(e),t);return Vu(t)}function im(n,t){let e=t,r=n.length;for(let i=0;i<r;i++){let o=n.charAt(i);switch(o){case"\0":e+="";break;case _l:e+="";break;default:e+=o}}return e}function Vu(n){return n+_l+""}var sm="remoteDocuments",wl="owner";var vl="mutationQueues";var El="mutations";var Il="documentMutations",om="remoteDocumentsV14";var Tl="remoteDocumentGlobal";var bl="targets";var Al="targetDocuments";var Sl="targetGlobal",Rl="collectionParents";var Cl="clientMetadata";var Pl="bundles";var Dl="namedQueries";var am="indexConfiguration";var cm="indexState";var um="indexEntries";var xl="documentOverlays";var lm="globals";var hm=[vl,El,Il,sm,bl,wl,Sl,Al,Cl,Tl,Rl,Pl,Dl],Wg=[...hm,xl],dm=[vl,El,Il,om,bl,wl,Sl,Al,Cl,Tl,Rl,Pl,Dl,xl],fm=dm,mm=[...fm,am,cm,um];var Hg=[...mm,lm];function Nu(n){let t=0;for(let e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function fe(n,t){for(let e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function Vl(n){for(let t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}var rt=class n{constructor(t,e){this.comparator=t,this.root=e||Dt.EMPTY}insert(t,e){return new n(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Dt.BLACK,null,null))}remove(t){return new n(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Dt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){let r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){let i=this.comparator(t,r.key);if(i===0)return e+r.left.size;i<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,r)=>(t(e,r),!1))}toString(){let t=[];return this.inorderTraversal((e,r)=>(t.push(`${e}:${r}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Ge(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Ge(this.root,t,this.comparator,!1)}getReverseIterator(){return new Ge(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Ge(this.root,t,this.comparator,!0)}},Ge=class{constructor(t,e,r,i){this.isReverse=i,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&i&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop(),e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}},Dt=class n{constructor(t,e,r,i,o){this.key=t,this.value=e,this.color=r??n.RED,this.left=i??n.EMPTY,this.right=o??n.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,i,o){return new n(t??this.key,e??this.value,r??this.color,i??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let i=this,o=r(t,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(t,e,r),null):o===0?i.copy(null,e,null,null,null):i.copy(null,null,null,null,i.right.insert(t,e,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,i=this;if(e(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,e),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),e(t,i.key)===0){if(i.right.isEmpty())return n.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,e))}return i.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){let t=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){let t=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){let t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){let t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});let t=this.left.check();if(t!==this.right.check())throw M(27949);return t+(this.isRed()?0:1)}};Dt.EMPTY=null,Dt.RED=!0,Dt.BLACK=!1;Dt.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(t,e,r,i,o){return this}insert(t,e,r){return new Dt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var lt=class n{constructor(t){this.comparator=t,this.data=new rt(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,r)=>(t(e),!1))}forEachInRange(t,e){let r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){let i=r.getNext();if(this.comparator(i.key,t[1])>=0)return;e(i.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){let e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Kr(this.data.getIterator())}getIteratorFrom(t){return new Kr(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(r=>{e=e.add(r)}),e}isEqual(t){if(!(t instanceof n)||this.size!==t.size)return!1;let e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){let i=e.getNext().key,o=r.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){let t=[];return this.forEach(e=>{t.push(e)}),t}toString(){let t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){let e=new n(this.comparator);return e.data=t,e}},Kr=class{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var St=class n{constructor(t){this.fields=t,t.sort(Tt.comparator)}static empty(){return new n([])}unionWith(t){let e=new lt(Tt.comparator);for(let r of this.fields)e=e.add(r);for(let r of t)e=e.add(r);return new n(e.toArray())}covers(t){for(let e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Qe(this.fields,t.fields,(e,r)=>e.isEqual(r))}};var Wr=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var _t=class n{constructor(t){this.binaryString=t}static fromBase64String(t){let e=function(i){try{return atob(i)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Wr("Invalid base64 string: "+o):o}}(t);return new n(e)}static fromUint8Array(t){let e=function(i){let o="";for(let a=0;a<i.length;++a)o+=String.fromCharCode(i[a]);return o}(t);return new n(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){let r=new Uint8Array(e.length);for(let i=0;i<e.length;i++)r[i]=e.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return z(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}};_t.EMPTY_BYTE_STRING=new _t("");var pm=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Wt(n){if(Q(!!n,39018),typeof n=="string"){let t=0,e=pm.exec(n);if(Q(!!e,46558,{timestamp:n}),e[1]){let i=e[1];i=(i+"000000000").substr(0,9),t=Number(i)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:tt(n.seconds),nanos:tt(n.nanos)}}function tt(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Ht(n){return typeof n=="string"?_t.fromBase64String(n):_t.fromUint8Array(n)}var Nl="server_timestamp",kl="__type__",Ol="__previous_value__",Fl="__local_write_time__";function ya(n){var t,e;return((e=(((t=n?.mapValue)===null||t===void 0?void 0:t.fields)||{})[kl])===null||e===void 0?void 0:e.stringValue)===Nl}function bi(n){let t=n.mapValue.fields[Ol];return ya(t)?bi(t):t}function Xn(n){let t=Wt(n.mapValue.fields[Fl].timestampValue);return new et(t.seconds,t.nanos)}var Us=class{constructor(t,e,r,i,o,a,l,h,f,p){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=i,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=h,this.useFetchStreams=f,this.isUsingEmulator=p}},Hr="(default)",Qr=class n{constructor(t,e){this.projectId=t,this.database=e||Hr}static empty(){return new n("","")}get isDefaultDatabase(){return this.database===Hr}isEqual(t){return t instanceof n&&t.projectId===this.projectId&&t.database===this.database}};var _a="__type__",Ml="__max__",Mr={mapValue:{fields:{__type__:{stringValue:Ml}}}},wa="__vector__",Xe="value";function le(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ya(n)?4:Bl(n)?9007199254740991:Ll(n)?10:11:M(28295,{value:n})}function Nt(n,t){if(n===t)return!0;let e=le(n);if(e!==le(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return Xn(n).isEqual(Xn(t));case 3:return function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;let a=Wt(i.timestampValue),l=Wt(o.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(i,o){return Ht(i.bytesValue).isEqual(Ht(o.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(i,o){return tt(i.geoPointValue.latitude)===tt(o.geoPointValue.latitude)&&tt(i.geoPointValue.longitude)===tt(o.geoPointValue.longitude)}(n,t);case 2:return function(i,o){if("integerValue"in i&&"integerValue"in o)return tt(i.integerValue)===tt(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){let a=tt(i.doubleValue),l=tt(o.doubleValue);return a===l?Jn(a)===Jn(l):isNaN(a)&&isNaN(l)}return!1}(n,t);case 9:return Qe(n.arrayValue.values||[],t.arrayValue.values||[],Nt);case 10:case 11:return function(i,o){let a=i.mapValue.fields||{},l=o.mapValue.fields||{};if(Nu(a)!==Nu(l))return!1;for(let h in a)if(a.hasOwnProperty(h)&&(l[h]===void 0||!Nt(a[h],l[h])))return!1;return!0}(n,t);default:return M(52216,{left:n})}}function Yn(n,t){return(n.values||[]).find(e=>Nt(e,t))!==void 0}function Ye(n,t){if(n===t)return 0;let e=le(n),r=le(t);if(e!==r)return z(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return z(n.booleanValue,t.booleanValue);case 2:return function(o,a){let l=tt(o.integerValue||o.doubleValue),h=tt(a.integerValue||a.doubleValue);return l<h?-1:l>h?1:l===h?0:isNaN(l)?isNaN(h)?0:-1:1}(n,t);case 3:return ku(n.timestampValue,t.timestampValue);case 4:return ku(Xn(n),Xn(t));case 5:return Ms(n.stringValue,t.stringValue);case 6:return function(o,a){let l=Ht(o),h=Ht(a);return l.compareTo(h)}(n.bytesValue,t.bytesValue);case 7:return function(o,a){let l=o.split("/"),h=a.split("/");for(let f=0;f<l.length&&f<h.length;f++){let p=z(l[f],h[f]);if(p!==0)return p}return z(l.length,h.length)}(n.referenceValue,t.referenceValue);case 8:return function(o,a){let l=z(tt(o.latitude),tt(a.latitude));return l!==0?l:z(tt(o.longitude),tt(a.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return Ou(n.arrayValue,t.arrayValue);case 10:return function(o,a){var l,h,f,p;let _=o.fields||{},v=a.fields||{},R=(l=_[Xe])===null||l===void 0?void 0:l.arrayValue,D=(h=v[Xe])===null||h===void 0?void 0:h.arrayValue,k=z(((f=R?.values)===null||f===void 0?void 0:f.length)||0,((p=D?.values)===null||p===void 0?void 0:p.length)||0);return k!==0?k:Ou(R,D)}(n.mapValue,t.mapValue);case 11:return function(o,a){if(o===Mr.mapValue&&a===Mr.mapValue)return 0;if(o===Mr.mapValue)return 1;if(a===Mr.mapValue)return-1;let l=o.fields||{},h=Object.keys(l),f=a.fields||{},p=Object.keys(f);h.sort(),p.sort();for(let _=0;_<h.length&&_<p.length;++_){let v=Ms(h[_],p[_]);if(v!==0)return v;let R=Ye(l[h[_]],f[p[_]]);if(R!==0)return R}return z(h.length,p.length)}(n.mapValue,t.mapValue);default:throw M(23264,{le:e})}}function ku(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return z(n,t);let e=Wt(n),r=Wt(t),i=z(e.seconds,r.seconds);return i!==0?i:z(e.nanos,r.nanos)}function Ou(n,t){let e=n.values||[],r=t.values||[];for(let i=0;i<e.length&&i<r.length;++i){let o=Ye(e[i],r[i]);if(o)return o}return z(e.length,r.length)}function Ze(n){return qs(n)}function qs(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){let r=Wt(e);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return Ht(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return L.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let r="[",i=!0;for(let o of e.values||[])i?i=!1:r+=",",r+=qs(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(e){let r=Object.keys(e.fields||{}).sort(),i="{",o=!0;for(let a of r)o?o=!1:i+=",",i+=`${a}:${qs(e.fields[a])}`;return i+"}"}(n.mapValue):M(61005,{value:n})}function Ur(n){switch(le(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:let t=bi(n);return t?16+Ur(t):16;case 5:return 2*n.stringValue.length;case 6:return Ht(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,o)=>i+Ur(o),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return fe(r.fields,(o,a)=>{i+=o.length+Ur(a)}),i}(n.mapValue);default:throw M(13486,{value:n})}}function zs(n){return!!n&&"integerValue"in n}function va(n){return!!n&&"arrayValue"in n}function Fu(n){return!!n&&"nullValue"in n}function Mu(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function qr(n){return!!n&&"mapValue"in n}function Ll(n){var t,e;return((e=(((t=n?.mapValue)===null||t===void 0?void 0:t.fields)||{})[_a])===null||e===void 0?void 0:e.stringValue)===wa}function $n(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){let t={mapValue:{fields:{}}};return fe(n.mapValue.fields,(e,r)=>t.mapValue.fields[e]=$n(r)),t}if(n.arrayValue){let t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=$n(n.arrayValue.values[e]);return t}return Object.assign({},n)}function Bl(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Ml}var Jg={mapValue:{fields:{[_a]:{stringValue:wa},[Xe]:{arrayValue:{}}}}};var It=class n{constructor(t){this.value=t}static empty(){return new n({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!qr(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=$n(e)}setAll(t){let e=Tt.emptyPath(),r={},i=[];t.forEach((a,l)=>{if(!e.isImmediateParentOf(l)){let h=this.getFieldsMap(e);this.applyChanges(h,r,i),r={},i=[],e=l.popLast()}a?r[l.lastSegment()]=$n(a):i.push(l.lastSegment())});let o=this.getFieldsMap(e);this.applyChanges(o,r,i)}delete(t){let e=this.field(t.popLast());qr(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Nt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let i=e.mapValue.fields[t.get(r)];qr(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=i),e=i}return e.mapValue.fields}applyChanges(t,e,r){fe(e,(i,o)=>t[i]=o);for(let i of r)delete t[i]}clone(){return new n($n(this.value))}};function Ul(n){let t=[];return fe(n.fields,(e,r)=>{let i=new Tt([e]);if(qr(r)){let o=Ul(r.mapValue).fields;if(o.length===0)t.push(i);else for(let a of o)t.push(i.child(a))}else t.push(i)}),new St(t)}var Ct=class n{constructor(t,e,r,i,o,a,l){this.key=t,this.documentType=e,this.version=r,this.readTime=i,this.createTime=o,this.data=a,this.documentState=l}static newInvalidDocument(t){return new n(t,0,U.min(),U.min(),U.min(),It.empty(),0)}static newFoundDocument(t,e,r,i){return new n(t,1,e,U.min(),r,i,0)}static newNoDocument(t,e){return new n(t,2,e,U.min(),U.min(),It.empty(),0)}static newUnknownDocument(t,e){return new n(t,3,e,U.min(),U.min(),It.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(U.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=It.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=It.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=U.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof n&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var tn=class{constructor(t,e){this.position=t,this.inclusive=e}};function Lu(n,t,e){let r=0;for(let i=0;i<n.position.length;i++){let o=t[i],a=n.position[i];if(o.field.isKeyField()?r=L.comparator(L.fromName(a.referenceValue),e.key):r=Ye(a,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function Bu(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Nt(n.position[e],t.position[e]))return!1;return!0}var en=class{constructor(t,e="asc"){this.field=t,this.dir=e}};function gm(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}var Jr=class{},ct=class n extends Jr{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new $s(t,e,r):e==="array-contains"?new Ws(t,r):e==="in"?new Hs(t,r):e==="not-in"?new Qs(t,r):e==="array-contains-any"?new Js(t,r):new n(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new Gs(t,r):new Ks(t,r)}matches(t){let e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Ye(e,this.value)):e!==null&&le(this.value)===le(e)&&this.matchesComparison(Ye(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},kt=class n extends Jr{constructor(t,e){super(),this.filters=t,this.op=e,this.he=null}static create(t,e){return new n(t,e)}matches(t){return ql(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}};function ql(n){return n.op==="and"}function zl(n){return ym(n)&&ql(n)}function ym(n){for(let t of n.filters)if(t instanceof kt)return!1;return!0}function js(n){if(n instanceof ct)return n.field.canonicalString()+n.op.toString()+Ze(n.value);if(zl(n))return n.filters.map(t=>js(t)).join(",");{let t=n.filters.map(e=>js(e)).join(",");return`${n.op}(${t})`}}function jl(n,t){return n instanceof ct?function(r,i){return i instanceof ct&&r.op===i.op&&r.field.isEqual(i.field)&&Nt(r.value,i.value)}(n,t):n instanceof kt?function(r,i){return i instanceof kt&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((o,a,l)=>o&&jl(a,i.filters[l]),!0):!1}(n,t):void M(19439)}function $l(n){return n instanceof ct?function(e){return`${e.field.canonicalString()} ${e.op} ${Ze(e.value)}`}(n):n instanceof kt?function(e){return e.op.toString()+" {"+e.getFilters().map($l).join(" ,")+"}"}(n):"Filter"}var $s=class extends ct{constructor(t,e,r){super(t,e,r),this.key=L.fromName(r.referenceValue)}matches(t){let e=L.comparator(t.key,this.key);return this.matchesComparison(e)}},Gs=class extends ct{constructor(t,e){super(t,"in",e),this.keys=Gl("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}},Ks=class extends ct{constructor(t,e){super(t,"not-in",e),this.keys=Gl("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}};function Gl(n,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(r=>L.fromName(r.referenceValue))}var Ws=class extends ct{constructor(t,e){super(t,"array-contains",e)}matches(t){let e=t.data.field(this.field);return va(e)&&Yn(e.arrayValue,this.value)}},Hs=class extends ct{constructor(t,e){super(t,"in",e)}matches(t){let e=t.data.field(this.field);return e!==null&&Yn(this.value.arrayValue,e)}},Qs=class extends ct{constructor(t,e){super(t,"not-in",e)}matches(t){if(Yn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Yn(this.value.arrayValue,e)}},Js=class extends ct{constructor(t,e){super(t,"array-contains-any",e)}matches(t){let e=t.data.field(this.field);return!(!va(e)||!e.arrayValue.values)&&e.arrayValue.values.some(r=>Yn(this.value.arrayValue,r))}};var Xs=class{constructor(t,e=null,r=[],i=[],o=null,a=null,l=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=i,this.limit=o,this.startAt=a,this.endAt=l,this.Pe=null}};function Uu(n,t=null,e=[],r=[],i=null,o=null,a=null){return new Xs(n,t,e,r,i,o,a)}function Ea(n){let t=B(n);if(t.Pe===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(r=>js(r)).join(","),e+="|ob:",e+=t.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),Ti(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(r=>Ze(r)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(r=>Ze(r)).join(",")),t.Pe=e}return t.Pe}function Ia(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!gm(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!jl(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!Bu(n.startAt,t.startAt)&&Bu(n.endAt,t.endAt)}function Ys(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}var nn=class{constructor(t,e=null,r=[],i=[],o=null,a="F",l=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=i,this.limit=o,this.limitType=a,this.startAt=l,this.endAt=h,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}};function _m(n,t,e,r,i,o,a,l){return new nn(n,t,e,r,i,o,a,l)}function Ta(n){return new nn(n)}function qu(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function wm(n){return n.collectionGroup!==null}function Gn(n){let t=B(n);if(t.Te===null){t.Te=[];let e=new Set;for(let o of t.explicitOrderBy)t.Te.push(o),e.add(o.field.canonicalString());let r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new lt(Tt.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(f=>{f.isInequality()&&(l=l.add(f.field))})}),l})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.Te.push(new en(o,r))}),e.has(Tt.keyField().canonicalString())||t.Te.push(new en(Tt.keyField(),r))}return t.Te}function xt(n){let t=B(n);return t.Ie||(t.Ie=vm(t,Gn(n))),t.Ie}function vm(n,t){if(n.limitType==="F")return Uu(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(i=>{let o=i.dir==="desc"?"asc":"desc";return new en(i.field,o)});let e=n.endAt?new tn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new tn(n.startAt.position,n.startAt.inclusive):null;return Uu(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function Zs(n,t,e){return new nn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function Ai(n,t){return Ia(xt(n),xt(t))&&n.limitType===t.limitType}function Kl(n){return`${Ea(xt(n))}|lt:${n.limitType}`}function ze(n){return`Query(target=${function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map(i=>$l(i)).join(", ")}]`),Ti(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map(i=>Ze(i)).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map(i=>Ze(i)).join(",")),`Target(${r})`}(xt(n))}; limitType=${n.limitType})`}function Si(n,t){return t.isFoundDocument()&&function(r,i){let o=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):L.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,t)&&function(r,i){for(let o of Gn(r))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0}(n,t)&&function(r,i){for(let o of r.filters)if(!o.matches(i))return!1;return!0}(n,t)&&function(r,i){return!(r.startAt&&!function(a,l,h){let f=Lu(a,l,h);return a.inclusive?f<=0:f<0}(r.startAt,Gn(r),i)||r.endAt&&!function(a,l,h){let f=Lu(a,l,h);return a.inclusive?f>=0:f>0}(r.endAt,Gn(r),i))}(n,t)}function Em(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Wl(n){return(t,e)=>{let r=!1;for(let i of Gn(n)){let o=Im(i,t,e);if(o!==0)return o;r=r||i.field.isKeyField()}return 0}}function Im(n,t,e){let r=n.field.isKeyField()?L.comparator(t.key,e.key):function(o,a,l){let h=a.data.field(o),f=l.data.field(o);return h!==null&&f!==null?Ye(h,f):M(42886)}(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return M(19790,{direction:n.dir})}}var Qt=class{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){let e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(let[i,o]of r)if(this.equalsFn(i,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){let r=this.mapKeyFn(t),i=this.inner[r];if(i===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],t))return void(i[o]=[t,e]);i.push([t,e]),this.innerSize++}delete(t){let e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],t))return r.length===1?delete this.inner[e]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(t){fe(this.inner,(e,r)=>{for(let[i,o]of r)t(i,o)})}isEmpty(){return Vl(this.inner)}size(){return this.innerSize}};var Tm=new rt(L.comparator);function Jt(){return Tm}var Hl=new rt(L.comparator);function jn(...n){let t=Hl;for(let e of n)t=t.insert(e.key,e);return t}function Ql(n){let t=Hl;return n.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function Ie(){return Kn()}function Jl(){return Kn()}function Kn(){return new Qt(n=>n.toString(),(n,t)=>n.isEqual(t))}var bm=new rt(L.comparator),Am=new lt(L.comparator);function G(...n){let t=Am;for(let e of n)t=t.add(e);return t}var Sm=new lt(z);function Rm(){return Sm}function ba(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Jn(t)?"-0":t}}function Xl(n){return{integerValue:""+n}}function Cm(n,t){return nm(t)?Xl(t):ba(n,t)}var rn=class{constructor(){this._=void 0}};function Pm(n,t,e){return n instanceof sn?function(i,o){let a={fields:{[kl]:{stringValue:Nl},[Fl]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&ya(o)&&(o=bi(o)),o&&(a.fields[Ol]=o),{mapValue:a}}(e,t):n instanceof Ce?Zl(n,t):n instanceof Pe?th(n,t):function(i,o){let a=Yl(i,o),l=zu(a)+zu(i.Ee);return zs(a)&&zs(i.Ee)?Xl(l):ba(i.serializer,l)}(n,t)}function Dm(n,t,e){return n instanceof Ce?Zl(n,t):n instanceof Pe?th(n,t):e}function Yl(n,t){return n instanceof on?function(r){return zs(r)||function(o){return!!o&&"doubleValue"in o}(r)}(t)?t:{integerValue:0}:null}var sn=class extends rn{},Ce=class extends rn{constructor(t){super(),this.elements=t}};function Zl(n,t){let e=eh(t);for(let r of n.elements)e.some(i=>Nt(i,r))||e.push(r);return{arrayValue:{values:e}}}var Pe=class extends rn{constructor(t){super(),this.elements=t}};function th(n,t){let e=eh(t);for(let r of n.elements)e=e.filter(i=>!Nt(i,r));return{arrayValue:{values:e}}}var on=class extends rn{constructor(t,e){super(),this.serializer=t,this.Ee=e}};function zu(n){return tt(n.integerValue||n.doubleValue)}function eh(n){return va(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function xm(n,t){return n.field.isEqual(t.field)&&function(r,i){return r instanceof Ce&&i instanceof Ce||r instanceof Pe&&i instanceof Pe?Qe(r.elements,i.elements,Nt):r instanceof on&&i instanceof on?Nt(r.Ee,i.Ee):r instanceof sn&&i instanceof sn}(n.transform,t.transform)}var to=class{constructor(t,e){this.version=t,this.transformResults=e}},se=class n{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new n}static exists(t){return new n(void 0,t)}static updateTime(t){return new n(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}};function zr(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}var an=class{};function nh(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new Xr(n.key,se.none()):new De(n.key,n.data,se.none());{let e=n.data,r=It.empty(),i=new lt(Tt.comparator);for(let o of t.fields)if(!i.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?r.delete(o):r.set(o,a),i=i.add(o)}return new Ot(n.key,r,new St(i.toArray()),se.none())}}function Vm(n,t,e){n instanceof De?function(i,o,a){let l=i.value.clone(),h=$u(i.fieldTransforms,o,a.transformResults);l.setAll(h),o.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,t,e):n instanceof Ot?function(i,o,a){if(!zr(i.precondition,o))return void o.convertToUnknownDocument(a.version);let l=$u(i.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(rh(i)),h.setAll(l),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(n,t,e):function(i,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function Wn(n,t,e,r){return n instanceof De?function(o,a,l,h){if(!zr(o.precondition,a))return l;let f=o.value.clone(),p=Gu(o.fieldTransforms,h,a);return f.setAll(p),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),null}(n,t,e,r):n instanceof Ot?function(o,a,l,h){if(!zr(o.precondition,a))return l;let f=Gu(o.fieldTransforms,h,a),p=a.data;return p.setAll(rh(o)),p.setAll(f),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),l===null?null:l.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(_=>_.field))}(n,t,e,r):function(o,a,l){return zr(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,t,e)}function Nm(n,t){let e=null;for(let r of n.fieldTransforms){let i=t.data.field(r.field),o=Yl(r.transform,i||null);o!=null&&(e===null&&(e=It.empty()),e.set(r.field,o))}return e||null}function ju(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Qe(r,i,(o,a)=>xm(o,a))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}var De=class extends an{constructor(t,e,r,i=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}},Ot=class extends an{constructor(t,e,r,i,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=i,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}};function rh(n){let t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){let r=n.data.field(e);t.set(e,r)}}),t}function $u(n,t,e){let r=new Map;Q(n.length===e.length,32656,{Ae:e.length,Re:n.length});for(let i=0;i<e.length;i++){let o=n[i],a=o.transform,l=t.data.field(o.field);r.set(o.field,Dm(a,l,e[i]))}return r}function Gu(n,t,e){let r=new Map;for(let i of n){let o=i.transform,a=e.data.field(i.field);r.set(i.field,Pm(o,a,t))}return r}var Xr=class extends an{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},eo=class extends an{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var no=class{constructor(t,e,r,i){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(t,e){let r=e.mutationResults;for(let i=0;i<this.mutations.length;i++){let o=this.mutations[i];o.key.isEqual(t.key)&&Vm(o,t,r[i])}}applyToLocalView(t,e){for(let r of this.baseMutations)r.key.isEqual(t.key)&&(e=Wn(r,t,e,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(t.key)&&(e=Wn(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){let r=Jl();return this.mutations.forEach(i=>{let o=t.get(i.key),a=o.overlayedDocument,l=this.applyToLocalView(a,o.mutatedFields);l=e.has(i.key)?null:l;let h=nh(a,l);h!==null&&r.set(i.key,h),a.isValidDocument()||a.convertToNoDocument(U.min())}),r}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),G())}isEqual(t){return this.batchId===t.batchId&&Qe(this.mutations,t.mutations,(e,r)=>ju(e,r))&&Qe(this.baseMutations,t.baseMutations,(e,r)=>ju(e,r))}},ro=class n{constructor(t,e,r,i){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=i}static from(t,e,r){Q(t.mutations.length===r.length,58842,{Ve:t.mutations.length,me:r.length});let i=function(){return bm}(),o=t.mutations;for(let a=0;a<o.length;a++)i=i.insert(o[a].key,r[a].version);return new n(t,e,r,i)}};var io=class{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var so=class{constructor(t,e){this.count=t,this.unchangedNames=e}};var st,W;function km(n){switch(n){case C.OK:return M(64938);case C.CANCELLED:case C.UNKNOWN:case C.DEADLINE_EXCEEDED:case C.RESOURCE_EXHAUSTED:case C.INTERNAL:case C.UNAVAILABLE:case C.UNAUTHENTICATED:return!1;case C.INVALID_ARGUMENT:case C.NOT_FOUND:case C.ALREADY_EXISTS:case C.PERMISSION_DENIED:case C.FAILED_PRECONDITION:case C.ABORTED:case C.OUT_OF_RANGE:case C.UNIMPLEMENTED:case C.DATA_LOSS:return!0;default:return M(15467,{code:n})}}function ih(n){if(n===void 0)return Kt("GRPC error has no .code"),C.UNKNOWN;switch(n){case st.OK:return C.OK;case st.CANCELLED:return C.CANCELLED;case st.UNKNOWN:return C.UNKNOWN;case st.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case st.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case st.INTERNAL:return C.INTERNAL;case st.UNAVAILABLE:return C.UNAVAILABLE;case st.UNAUTHENTICATED:return C.UNAUTHENTICATED;case st.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case st.NOT_FOUND:return C.NOT_FOUND;case st.ALREADY_EXISTS:return C.ALREADY_EXISTS;case st.PERMISSION_DENIED:return C.PERMISSION_DENIED;case st.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case st.ABORTED:return C.ABORTED;case st.OUT_OF_RANGE:return C.OUT_OF_RANGE;case st.UNIMPLEMENTED:return C.UNIMPLEMENTED;case st.DATA_LOSS:return C.DATA_LOSS;default:return M(39323,{code:n})}}(W=st||(st={}))[W.OK=0]="OK",W[W.CANCELLED=1]="CANCELLED",W[W.UNKNOWN=2]="UNKNOWN",W[W.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",W[W.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",W[W.NOT_FOUND=5]="NOT_FOUND",W[W.ALREADY_EXISTS=6]="ALREADY_EXISTS",W[W.PERMISSION_DENIED=7]="PERMISSION_DENIED",W[W.UNAUTHENTICATED=16]="UNAUTHENTICATED",W[W.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",W[W.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",W[W.ABORTED=10]="ABORTED",W[W.OUT_OF_RANGE=11]="OUT_OF_RANGE",W[W.UNIMPLEMENTED=12]="UNIMPLEMENTED",W[W.INTERNAL=13]="INTERNAL",W[W.UNAVAILABLE=14]="UNAVAILABLE",W[W.DATA_LOSS=15]="DATA_LOSS";var Ku=null;var Om=new jt([4294967295,4294967295],0);function Wu(n){let t=gl().encode(n),e=new Es;return e.update(t),new Uint8Array(e.digest())}function Hu(n){let t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),i=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new jt([e,r],0),new jt([i,o],0)]}var oo=class n{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new Te(`Invalid padding: ${e}`);if(r<0)throw new Te(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new Te(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new Te(`Invalid padding when bitmap length is 0: ${e}`);this.fe=8*t.length-e,this.ge=jt.fromNumber(this.fe)}pe(t,e,r){let i=t.add(e.multiply(jt.fromNumber(r)));return i.compare(Om)===1&&(i=new jt([i.getBits(0),i.getBits(1)],0)),i.modulo(this.ge).toNumber()}ye(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.fe===0)return!1;let e=Wu(t),[r,i]=Hu(e);for(let o=0;o<this.hashCount;o++){let a=this.pe(r,i,o);if(!this.ye(a))return!1}return!0}static create(t,e,r){let i=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new n(o,i,e);return r.forEach(l=>a.insert(l)),a}insert(t){if(this.fe===0)return;let e=Wu(t),[r,i]=Hu(e);for(let o=0;o<this.hashCount;o++){let a=this.pe(r,i,o);this.we(a)}}we(t){let e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}},Te=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};var Yr=class n{constructor(t,e,r,i,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){let i=new Map;return i.set(t,Zn.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new n(U.min(),i,new rt(z),Jt(),G())}},Zn=class n{constructor(t,e,r,i,o){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new n(r,e,G(),G(),G())}};var Ke=class{constructor(t,e,r,i){this.Se=t,this.removedTargetIds=e,this.key=r,this.be=i}},Zr=class{constructor(t,e){this.targetId=t,this.De=e}},ti=class{constructor(t,e,r=_t.EMPTY_BYTE_STRING,i=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=i}},ei=class{constructor(){this.ve=0,this.Ce=Qu(),this.Fe=_t.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(t){t.approximateByteSize()>0&&(this.xe=!0,this.Fe=t)}Le(){let t=G(),e=G(),r=G();return this.Ce.forEach((i,o)=>{switch(o){case 0:t=t.add(i);break;case 2:e=e.add(i);break;case 1:r=r.add(i);break;default:M(38017,{changeType:o})}}),new Zn(this.Fe,this.Me,t,e,r)}ke(){this.xe=!1,this.Ce=Qu()}qe(t,e){this.xe=!0,this.Ce=this.Ce.insert(t,e)}Qe(t){this.xe=!0,this.Ce=this.Ce.remove(t)}$e(){this.ve+=1}Ue(){this.ve-=1,Q(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}},ao=class{constructor(t){this.We=t,this.Ge=new Map,this.ze=Jt(),this.je=Lr(),this.Je=Lr(),this.He=new rt(z)}Ye(t){for(let e of t.Se)t.be&&t.be.isFoundDocument()?this.Ze(e,t.be):this.Xe(e,t.key,t.be);for(let e of t.removedTargetIds)this.Xe(e,t.key,t.be)}et(t){this.forEachTarget(t,e=>{let r=this.tt(e);switch(t.state){case 0:this.nt(e)&&r.Be(t.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(t.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(e);break;case 3:this.nt(e)&&(r.Ke(),r.Be(t.resumeToken));break;case 4:this.nt(e)&&(this.rt(e),r.Be(t.resumeToken));break;default:M(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.Ge.forEach((r,i)=>{this.nt(i)&&e(i)})}it(t){let e=t.targetId,r=t.De.count,i=this.st(e);if(i){let o=i.target;if(Ys(o))if(r===0){let a=new L(o.path);this.Xe(e,a,Ct.newNoDocument(a,U.min()))}else Q(r===1,20013,{expectedCount:r});else{let a=this.ot(e);if(a!==r){let l=this._t(t),h=l?this.ut(l,t,a):1;if(h!==0){this.rt(e);let f=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(e,f)}Ku?.ct(function(p,_,v,R,D){var k,V,j,q,$,Z;let bt={localCacheCount:p,existenceFilterCount:_.count,databaseId:v.database,projectId:v.projectId},X=_.unchangedNames;return X&&(bt.bloomFilter={applied:D===0,hashCount:(k=X?.hashCount)!==null&&k!==void 0?k:0,bitmapLength:(q=(j=(V=X?.bits)===null||V===void 0?void 0:V.bitmap)===null||j===void 0?void 0:j.length)!==null&&q!==void 0?q:0,padding:(Z=($=X?.bits)===null||$===void 0?void 0:$.padding)!==null&&Z!==void 0?Z:0,mightContain:I=>{var m;return(m=R?.mightContain(I))!==null&&m!==void 0&&m}}),bt}(a,t.De,this.We.lt(),l,h))}}}}_t(t){let e=t.De.unchangedNames;if(!e||!e.bits)return null;let{bits:{bitmap:r="",padding:i=0},hashCount:o=0}=e,a,l;try{a=Ht(r).toUint8Array()}catch(h){if(h instanceof Wr)return ue("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{l=new oo(a,i,o)}catch(h){return ue(h instanceof Te?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return l.fe===0?null:l}ut(t,e,r){return e.De.count===r-this.ht(t,e.targetId)?0:2}ht(t,e){let r=this.We.getRemoteKeysForTarget(e),i=0;return r.forEach(o=>{let a=this.We.lt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(l)||(this.Xe(e,o,null),i++)}),i}Pt(t){let e=new Map;this.Ge.forEach((o,a)=>{let l=this.st(a);if(l){if(o.current&&Ys(l.target)){let h=new L(l.target.path);this.Tt(h).has(a)||this.It(a,h)||this.Xe(a,h,Ct.newNoDocument(h,t))}o.Ne&&(e.set(a,o.Le()),o.ke())}});let r=G();this.Je.forEach((o,a)=>{let l=!0;a.forEachWhile(h=>{let f=this.st(h);return!f||f.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(o))}),this.ze.forEach((o,a)=>a.setReadTime(t));let i=new Yr(t,e,this.He,this.ze,r);return this.ze=Jt(),this.je=Lr(),this.Je=Lr(),this.He=new rt(z),i}Ze(t,e){if(!this.nt(t))return;let r=this.It(t,e.key)?2:0;this.tt(t).qe(e.key,r),this.ze=this.ze.insert(e.key,e),this.je=this.je.insert(e.key,this.Tt(e.key).add(t)),this.Je=this.Je.insert(e.key,this.dt(e.key).add(t))}Xe(t,e,r){if(!this.nt(t))return;let i=this.tt(t);this.It(t,e)?i.qe(e,1):i.Qe(e),this.Je=this.Je.insert(e,this.dt(e).delete(t)),this.Je=this.Je.insert(e,this.dt(e).add(t)),r&&(this.ze=this.ze.insert(e,r))}removeTarget(t){this.Ge.delete(t)}ot(t){let e=this.tt(t).Le();return this.We.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}$e(t){this.tt(t).$e()}tt(t){let e=this.Ge.get(t);return e||(e=new ei,this.Ge.set(t,e)),e}dt(t){let e=this.Je.get(t);return e||(e=new lt(z),this.Je=this.Je.insert(t,e)),e}Tt(t){let e=this.je.get(t);return e||(e=new lt(z),this.je=this.je.insert(t,e)),e}nt(t){let e=this.st(t)!==null;return e||N("WatchChangeAggregator","Detected inactive target",t),e}st(t){let e=this.Ge.get(t);return e&&e.Oe?null:this.We.Et(t)}rt(t){this.Ge.set(t,new ei),this.We.getRemoteKeysForTarget(t).forEach(e=>{this.Xe(t,e,null)})}It(t,e){return this.We.getRemoteKeysForTarget(t).has(e)}};function Lr(){return new rt(L.comparator)}function Qu(){return new rt(L.comparator)}var Fm={asc:"ASCENDING",desc:"DESCENDING"},Mm={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Lm={and:"AND",or:"OR"},co=class{constructor(t,e){this.databaseId=t,this.useProto3Json=e}};function uo(n,t){return n.useProto3Json||Ti(t)?t:{value:t}}function ni(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function sh(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function Bm(n,t){return ni(n,t.toTimestamp())}function Vt(n){return Q(!!n,49232),U.fromTimestamp(function(e){let r=Wt(e);return new et(r.seconds,r.nanos)}(n))}function Aa(n,t){return lo(n,t).canonicalString()}function lo(n,t){let e=function(i){return new it(["projects",i.projectId,"databases",i.database])}(n).child("documents");return t===void 0?e:e.child(t)}function oh(n){let t=it.fromString(n);return Q(hh(t),10190,{key:t.toString()}),t}function ho(n,t){return Aa(n.databaseId,t.path)}function Rs(n,t){let e=oh(t);if(e.get(1)!==n.databaseId.projectId)throw new F(C.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new F(C.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new L(ch(e))}function ah(n,t){return Aa(n.databaseId,t)}function Um(n){let t=oh(n);return t.length===4?it.emptyPath():ch(t)}function fo(n){return new it(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function ch(n){return Q(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Ju(n,t,e){return{name:ho(n,t),fields:e.value.mapValue.fields}}function qm(n,t){let e;if("targetChange"in t){t.targetChange;let r=function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:M(39313,{state:f})}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],o=function(f,p){return f.useProto3Json?(Q(p===void 0||typeof p=="string",58123),_t.fromBase64String(p||"")):(Q(p===void 0||p instanceof Buffer||p instanceof Uint8Array,16193),_t.fromUint8Array(p||new Uint8Array))}(n,t.targetChange.resumeToken),a=t.targetChange.cause,l=a&&function(f){let p=f.code===void 0?C.UNKNOWN:ih(f.code);return new F(p,f.message||"")}(a);e=new ti(r,i,o,l||null)}else if("documentChange"in t){t.documentChange;let r=t.documentChange;r.document,r.document.name,r.document.updateTime;let i=Rs(n,r.document.name),o=Vt(r.document.updateTime),a=r.document.createTime?Vt(r.document.createTime):U.min(),l=new It({mapValue:{fields:r.document.fields}}),h=Ct.newFoundDocument(i,o,a,l),f=r.targetIds||[],p=r.removedTargetIds||[];e=new Ke(f,p,h.key,h)}else if("documentDelete"in t){t.documentDelete;let r=t.documentDelete;r.document;let i=Rs(n,r.document),o=r.readTime?Vt(r.readTime):U.min(),a=Ct.newNoDocument(i,o),l=r.removedTargetIds||[];e=new Ke([],l,a.key,a)}else if("documentRemove"in t){t.documentRemove;let r=t.documentRemove;r.document;let i=Rs(n,r.document),o=r.removedTargetIds||[];e=new Ke([],o,i,null)}else{if(!("filter"in t))return M(11601,{At:t});{t.filter;let r=t.filter;r.targetId;let{count:i=0,unchangedNames:o}=r,a=new so(i,o),l=r.targetId;e=new Zr(l,a)}}return e}function zm(n,t){let e;if(t instanceof De)e={update:Ju(n,t.key,t.value)};else if(t instanceof Xr)e={delete:ho(n,t.key)};else if(t instanceof Ot)e={update:Ju(n,t.key,t.data),updateMask:Xm(t.fieldMask)};else{if(!(t instanceof eo))return M(16599,{Rt:t.type});e={verify:ho(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(r=>function(o,a){let l=a.transform;if(l instanceof sn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Ce)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Pe)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof on)return{fieldPath:a.field.canonicalString(),increment:l.Ee};throw M(20930,{transform:a.transform})}(0,r))),t.precondition.isNone||(e.currentDocument=function(i,o){return o.updateTime!==void 0?{updateTime:Bm(i,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:M(27497)}(n,t.precondition)),e}function jm(n,t){return n&&n.length>0?(Q(t!==void 0,14353),n.map(e=>function(i,o){let a=i.updateTime?Vt(i.updateTime):Vt(o);return a.isEqual(U.min())&&(a=Vt(o)),new to(a,i.transformResults||[])}(e,t))):[]}function $m(n,t){return{documents:[ah(n,t.path)]}}function Gm(n,t){let e={structuredQuery:{}},r=t.path,i;t.collectionGroup!==null?(i=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=ah(n,i);let o=function(f){if(f.length!==0)return lh(kt.create(f,"and"))}(t.filters);o&&(e.structuredQuery.where=o);let a=function(f){if(f.length!==0)return f.map(p=>function(v){return{field:je(v.field),direction:Hm(v.dir)}}(p))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);let l=uo(n,t.limit);return l!==null&&(e.structuredQuery.limit=l),t.startAt&&(e.structuredQuery.startAt=function(f){return{before:f.inclusive,values:f.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(f){return{before:!f.inclusive,values:f.position}}(t.endAt)),{Vt:e,parent:i}}function Km(n){let t=Um(n.parent),e=n.structuredQuery,r=e.from?e.from.length:0,i=null;if(r>0){Q(r===1,65062);let p=e.from[0];p.allDescendants?i=p.collectionId:t=t.child(p.collectionId)}let o=[];e.where&&(o=function(_){let v=uh(_);return v instanceof kt&&zl(v)?v.getFilters():[v]}(e.where));let a=[];e.orderBy&&(a=function(_){return _.map(v=>function(D){return new en($e(D.field),function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(D.direction))}(v))}(e.orderBy));let l=null;e.limit&&(l=function(_){let v;return v=typeof _=="object"?_.value:_,Ti(v)?null:v}(e.limit));let h=null;e.startAt&&(h=function(_){let v=!!_.before,R=_.values||[];return new tn(R,v)}(e.startAt));let f=null;return e.endAt&&(f=function(_){let v=!_.before,R=_.values||[];return new tn(R,v)}(e.endAt)),_m(t,i,a,o,l,"F",h,f)}function Wm(n,t){let e=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:i})}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function uh(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":let r=$e(e.unaryFilter.field);return ct.create(r,"==",{doubleValue:NaN});case"IS_NULL":let i=$e(e.unaryFilter.field);return ct.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let o=$e(e.unaryFilter.field);return ct.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let a=$e(e.unaryFilter.field);return ct.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}}(n):n.fieldFilter!==void 0?function(e){return ct.create($e(e.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return kt.create(e.compositeFilter.filters.map(r=>uh(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return M(1026)}}(e.compositeFilter.op))}(n):M(30097,{filter:n})}function Hm(n){return Fm[n]}function Qm(n){return Mm[n]}function Jm(n){return Lm[n]}function je(n){return{fieldPath:n.canonicalString()}}function $e(n){return Tt.fromServerFormat(n.fieldPath)}function lh(n){return n instanceof ct?function(e){if(e.op==="=="){if(Mu(e.value))return{unaryFilter:{field:je(e.field),op:"IS_NAN"}};if(Fu(e.value))return{unaryFilter:{field:je(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Mu(e.value))return{unaryFilter:{field:je(e.field),op:"IS_NOT_NAN"}};if(Fu(e.value))return{unaryFilter:{field:je(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:je(e.field),op:Qm(e.op),value:e.value}}}(n):n instanceof kt?function(e){let r=e.getFilters().map(i=>lh(i));return r.length===1?r[0]:{compositeFilter:{op:Jm(e.op),filters:r}}}(n):M(54877,{filter:n})}function Xm(n){let t=[];return n.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function hh(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}var tr=class n{constructor(t,e,r,i,o=U.min(),a=U.min(),l=_t.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=h}withSequenceNumber(t){return new n(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}};var mo=class{constructor(t){this.gt=t}};function Ym(n){let t=Km({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Zs(t,t.limit,"L"):t}var ri=class{constructor(){}bt(t,e){this.Dt(t,e),e.vt()}Dt(t,e){if("nullValue"in t)this.Ct(e,5);else if("booleanValue"in t)this.Ct(e,10),e.Ft(t.booleanValue?1:0);else if("integerValue"in t)this.Ct(e,15),e.Ft(tt(t.integerValue));else if("doubleValue"in t){let r=tt(t.doubleValue);isNaN(r)?this.Ct(e,13):(this.Ct(e,15),Jn(r)?e.Ft(0):e.Ft(r))}else if("timestampValue"in t){let r=t.timestampValue;this.Ct(e,20),typeof r=="string"&&(r=Wt(r)),e.Mt(`${r.seconds||""}`),e.Ft(r.nanos||0)}else if("stringValue"in t)this.xt(t.stringValue,e),this.Ot(e);else if("bytesValue"in t)this.Ct(e,30),e.Nt(Ht(t.bytesValue)),this.Ot(e);else if("referenceValue"in t)this.Bt(t.referenceValue,e);else if("geoPointValue"in t){let r=t.geoPointValue;this.Ct(e,45),e.Ft(r.latitude||0),e.Ft(r.longitude||0)}else"mapValue"in t?Bl(t)?this.Ct(e,Number.MAX_SAFE_INTEGER):Ll(t)?this.Lt(t.mapValue,e):(this.kt(t.mapValue,e),this.Ot(e)):"arrayValue"in t?(this.qt(t.arrayValue,e),this.Ot(e)):M(19022,{Qt:t})}xt(t,e){this.Ct(e,25),this.$t(t,e)}$t(t,e){e.Mt(t)}kt(t,e){let r=t.fields||{};this.Ct(e,55);for(let i of Object.keys(r))this.xt(i,e),this.Dt(r[i],e)}Lt(t,e){var r,i;let o=t.fields||{};this.Ct(e,53);let a=Xe,l=((i=(r=o[a].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.length)||0;this.Ct(e,15),e.Ft(tt(l)),this.xt(a,e),this.Dt(o[a],e)}qt(t,e){let r=t.values||[];this.Ct(e,50);for(let i of r)this.Dt(i,e)}Bt(t,e){this.Ct(e,37),L.fromName(t).path.forEach(r=>{this.Ct(e,60),this.$t(r,e)})}Ct(t,e){t.Ft(e)}Ot(t){t.Ft(2)}};ri.Ut=new ri;var po=class{constructor(){this.Dn=new go}addToCollectionParentIndex(t,e){return this.Dn.add(e),P.resolve()}getCollectionParents(t,e){return P.resolve(this.Dn.getEntries(e))}addFieldIndex(t,e){return P.resolve()}deleteFieldIndex(t,e){return P.resolve()}deleteAllFieldIndexes(t){return P.resolve()}createTargetIndexes(t,e){return P.resolve()}getDocumentsMatchingTarget(t,e){return P.resolve(null)}getIndexType(t,e){return P.resolve(0)}getFieldIndexes(t,e){return P.resolve([])}getNextCollectionGroupToUpdate(t){return P.resolve(null)}getMinOffset(t,e){return P.resolve(Re.min())}getMinOffsetFromCollectionGroup(t,e){return P.resolve(Re.min())}updateCollectionGroup(t,e,r){return P.resolve()}updateIndexEntries(t,e){return P.resolve()}},go=class{constructor(){this.index={}}add(t){let e=t.lastSegment(),r=t.popLast(),i=this.index[e]||new lt(it.comparator),o=!i.has(r);return this.index[e]=i.add(r),o}has(t){let e=t.lastSegment(),r=t.popLast(),i=this.index[e];return i&&i.has(r)}getEntries(t){return(this.index[t]||new lt(it.comparator)).toArray()}};var Xg=new Uint8Array(0);var Xu={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},dh=41943040,At=class n{static withCacheSize(t){return new n(t,n.DEFAULT_COLLECTION_PERCENTILE,n.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}};At.DEFAULT_COLLECTION_PERCENTILE=10,At.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,At.DEFAULT=new At(dh,At.DEFAULT_COLLECTION_PERCENTILE,At.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),At.DISABLED=new At(-1,0,0);var er=class n{constructor(t){this._r=t}next(){return this._r+=2,this._r}static ar(){return new n(0)}static ur(){return new n(-1)}};var Yu="LruGarbageCollector",Zm=1048576;function Zu([n,t],[e,r]){let i=z(n,e);return i===0?z(t,r):i}var yo=class{constructor(t){this.Tr=t,this.buffer=new lt(Zu),this.Ir=0}dr(){return++this.Ir}Er(t){let e=[t,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(e);else{let r=this.buffer.last();Zu(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}},_o=class{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(t){N(Yu,`Garbage collection scheduled in ${t}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){fn(e)?N(Yu,"Ignoring IndexedDB error during garbage collection: ",e):await dn(e)}await this.Rr(3e5)})}},wo=class{constructor(t,e){this.Vr=t,this.params=e}calculateTargetCount(t,e){return this.Vr.mr(t).next(r=>Math.floor(e/100*r))}nthSequenceNumber(t,e){if(e===0)return P.resolve(Je.ue);let r=new yo(e);return this.Vr.forEachTarget(t,i=>r.Er(i.sequenceNumber)).next(()=>this.Vr.gr(t,i=>r.Er(i))).next(()=>r.maxValue)}removeTargets(t,e,r){return this.Vr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.Vr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(N("LruGarbageCollector","Garbage collection skipped; disabled"),P.resolve(Xu)):this.getCacheSize(t).next(r=>r<this.params.cacheSizeCollectionThreshold?(N("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Xu):this.pr(t,e))}getCacheSize(t){return this.Vr.getCacheSize(t)}pr(t,e){let r,i,o,a,l,h,f,p=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(_=>(_>this.params.maximumSequenceNumbersToCollect?(N("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${_}`),i=this.params.maximumSequenceNumbersToCollect):i=_,a=Date.now(),this.nthSequenceNumber(t,i))).next(_=>(r=_,l=Date.now(),this.removeTargets(t,r,e))).next(_=>(o=_,h=Date.now(),this.removeOrphanedDocuments(t,r))).next(_=>(f=Date.now(),qe()<=K.DEBUG&&N("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-p}ms
	Determined least recently used ${i} in `+(l-a)+`ms
	Removed ${o} targets in `+(h-l)+`ms
	Removed ${_} documents in `+(f-h)+`ms
Total Duration: ${f-p}ms`),P.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:o,documentsRemoved:_})))}};function tp(n,t){return new wo(n,t)}var vo=class{constructor(){this.changes=new Qt(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Ct.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();let r=this.changes.get(e);return r!==void 0?P.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}};var Eo=class{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}};var Io=class{constructor(t,e,r,i){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=i}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next(i=>(r=i,this.remoteDocumentCache.getEntry(t,e))).next(i=>(r!==null&&Wn(r.mutation,i,St.empty(),et.now()),i))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.getLocalViewOfDocuments(t,r,G()).next(()=>r))}getLocalViewOfDocuments(t,e,r=G()){let i=Ie();return this.populateOverlays(t,i,e).next(()=>this.computeViews(t,e,i,r).next(o=>{let a=jn();return o.forEach((l,h)=>{a=a.insert(l,h.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){let r=Ie();return this.populateOverlays(t,r,e).next(()=>this.computeViews(t,e,r,G()))}populateOverlays(t,e,r){let i=[];return r.forEach(o=>{e.has(o)||i.push(o)}),this.documentOverlayCache.getOverlays(t,i).next(o=>{o.forEach((a,l)=>{e.set(a,l)})})}computeViews(t,e,r,i){let o=Jt(),a=Kn(),l=function(){return Kn()}();return e.forEach((h,f)=>{let p=r.get(f.key);i.has(f.key)&&(p===void 0||p.mutation instanceof Ot)?o=o.insert(f.key,f):p!==void 0?(a.set(f.key,p.mutation.getFieldMask()),Wn(p.mutation,f,p.mutation.getFieldMask(),et.now())):a.set(f.key,St.empty())}),this.recalculateAndSaveOverlays(t,o).next(h=>(h.forEach((f,p)=>a.set(f,p)),e.forEach((f,p)=>{var _;return l.set(f,new Eo(p,(_=a.get(f))!==null&&_!==void 0?_:null))}),l))}recalculateAndSaveOverlays(t,e){let r=Kn(),i=new rt((a,l)=>a-l),o=G();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(let l of a)l.keys().forEach(h=>{let f=e.get(h);if(f===null)return;let p=r.get(h)||St.empty();p=l.applyToLocalView(f,p),r.set(h,p);let _=(i.get(l.batchId)||G()).add(h);i=i.insert(l.batchId,_)})}).next(()=>{let a=[],l=i.getReverseIterator();for(;l.hasNext();){let h=l.getNext(),f=h.key,p=h.value,_=Jl();p.forEach(v=>{if(!o.has(v)){let R=nh(e.get(v),r.get(v));R!==null&&_.set(v,R),o=o.add(v)}}),a.push(this.documentOverlayCache.saveOverlays(t,f,_))}return P.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.recalculateAndSaveOverlays(t,r))}getDocumentsMatchingQuery(t,e,r,i){return function(a){return L.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):wm(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,i):this.getDocumentsMatchingCollectionQuery(t,e,r,i)}getNextDocuments(t,e,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,i).next(o=>{let a=i-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,i-o.size):P.resolve(Ie()),l=Qn,h=o;return a.next(f=>P.forEach(f,(p,_)=>(l<_.largestBatchId&&(l=_.largestBatchId),o.get(p)?P.resolve():this.remoteDocumentCache.getEntry(t,p).next(v=>{h=h.insert(p,v)}))).next(()=>this.populateOverlays(t,f,o)).next(()=>this.computeViews(t,h,f,G())).next(p=>({batchId:l,changes:Ql(p)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new L(e)).next(r=>{let i=jn();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(t,e,r,i){let o=e.collectionGroup,a=jn();return this.indexManager.getCollectionParents(t,o).next(l=>P.forEach(l,h=>{let f=function(_,v){return new nn(v,null,_.explicitOrderBy.slice(),_.filters.slice(),_.limit,_.limitType,_.startAt,_.endAt)}(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,f,r,i).next(p=>{p.forEach((_,v)=>{a=a.insert(_,v)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,r,i){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,i))).next(a=>{o.forEach((h,f)=>{let p=f.getKey();a.get(p)===null&&(a=a.insert(p,Ct.newInvalidDocument(p)))});let l=jn();return a.forEach((h,f)=>{let p=o.get(h);p!==void 0&&Wn(p.mutation,f,St.empty(),et.now()),Si(e,f)&&(l=l.insert(h,f))}),l})}};var To=class{constructor(t){this.serializer=t,this.Br=new Map,this.Lr=new Map}getBundleMetadata(t,e){return P.resolve(this.Br.get(e))}saveBundleMetadata(t,e){return this.Br.set(e.id,function(i){return{id:i.id,version:i.version,createTime:Vt(i.createTime)}}(e)),P.resolve()}getNamedQuery(t,e){return P.resolve(this.Lr.get(e))}saveNamedQuery(t,e){return this.Lr.set(e.name,function(i){return{name:i.name,query:Ym(i.bundledQuery),readTime:Vt(i.readTime)}}(e)),P.resolve()}};var bo=class{constructor(){this.overlays=new rt(L.comparator),this.kr=new Map}getOverlay(t,e){return P.resolve(this.overlays.get(e))}getOverlays(t,e){let r=Ie();return P.forEach(e,i=>this.getOverlay(t,i).next(o=>{o!==null&&r.set(i,o)})).next(()=>r)}saveOverlays(t,e,r){return r.forEach((i,o)=>{this.wt(t,e,o)}),P.resolve()}removeOverlaysForBatchId(t,e,r){let i=this.kr.get(r);return i!==void 0&&(i.forEach(o=>this.overlays=this.overlays.remove(o)),this.kr.delete(r)),P.resolve()}getOverlaysForCollection(t,e,r){let i=Ie(),o=e.length+1,a=new L(e.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){let h=l.getNext().value,f=h.getKey();if(!e.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>r&&i.set(h.getKey(),h)}return P.resolve(i)}getOverlaysForCollectionGroup(t,e,r,i){let o=new rt((f,p)=>f-p),a=this.overlays.getIterator();for(;a.hasNext();){let f=a.getNext().value;if(f.getKey().getCollectionGroup()===e&&f.largestBatchId>r){let p=o.get(f.largestBatchId);p===null&&(p=Ie(),o=o.insert(f.largestBatchId,p)),p.set(f.getKey(),f)}}let l=Ie(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((f,p)=>l.set(f,p)),!(l.size()>=i)););return P.resolve(l)}wt(t,e,r){let i=this.overlays.get(r.key);if(i!==null){let a=this.kr.get(i.largestBatchId).delete(r.key);this.kr.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new io(e,r));let o=this.kr.get(e);o===void 0&&(o=G(),this.kr.set(e,o)),this.kr.set(e,o.add(r.key))}};var Ao=class{constructor(){this.sessionToken=_t.EMPTY_BYTE_STRING}getSessionToken(t){return P.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,P.resolve()}};var nr=class{constructor(){this.qr=new lt(ot.Qr),this.$r=new lt(ot.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(t,e){let r=new ot(t,e);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(t,e){t.forEach(r=>this.addReference(r,e))}removeReference(t,e){this.Wr(new ot(t,e))}Gr(t,e){t.forEach(r=>this.removeReference(r,e))}zr(t){let e=new L(new it([])),r=new ot(e,t),i=new ot(e,t+1),o=[];return this.$r.forEachInRange([r,i],a=>{this.Wr(a),o.push(a.key)}),o}jr(){this.qr.forEach(t=>this.Wr(t))}Wr(t){this.qr=this.qr.delete(t),this.$r=this.$r.delete(t)}Jr(t){let e=new L(new it([])),r=new ot(e,t),i=new ot(e,t+1),o=G();return this.$r.forEachInRange([r,i],a=>{o=o.add(a.key)}),o}containsKey(t){let e=new ot(t,0),r=this.qr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}},ot=class{constructor(t,e){this.key=t,this.Hr=e}static Qr(t,e){return L.comparator(t.key,e.key)||z(t.Hr,e.Hr)}static Ur(t,e){return z(t.Hr,e.Hr)||L.comparator(t.key,e.key)}};var So=class{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.er=1,this.Yr=new lt(ot.Qr)}checkEmpty(t){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,i){let o=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let a=new no(o,e,r,i);this.mutationQueue.push(a);for(let l of i)this.Yr=this.Yr.add(new ot(l.key,o)),this.indexManager.addToCollectionParentIndex(t,l.key.path.popLast());return P.resolve(a)}lookupMutationBatch(t,e){return P.resolve(this.Zr(e))}getNextMutationBatchAfterBatchId(t,e){let r=e+1,i=this.Xr(r),o=i<0?0:i;return P.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?ga:this.er-1)}getAllMutationBatches(t){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){let r=new ot(e,0),i=new ot(e,Number.POSITIVE_INFINITY),o=[];return this.Yr.forEachInRange([r,i],a=>{let l=this.Zr(a.Hr);o.push(l)}),P.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new lt(z);return e.forEach(i=>{let o=new ot(i,0),a=new ot(i,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([o,a],l=>{r=r.add(l.Hr)})}),P.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(t,e){let r=e.path,i=r.length+1,o=r;L.isDocumentKey(o)||(o=o.child(""));let a=new ot(new L(o),0),l=new lt(z);return this.Yr.forEachWhile(h=>{let f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===i&&(l=l.add(h.Hr)),!0)},a),P.resolve(this.ei(l))}ei(t){let e=[];return t.forEach(r=>{let i=this.Zr(r);i!==null&&e.push(i)}),e}removeMutationBatch(t,e){Q(this.ti(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return P.forEach(e.mutations,i=>{let o=new ot(i.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,i.key)}).next(()=>{this.Yr=r})}rr(t){}containsKey(t,e){let r=new ot(e,0),i=this.Yr.firstAfterOrEqual(r);return P.resolve(e.isEqual(i&&i.key))}performConsistencyCheck(t){return this.mutationQueue.length,P.resolve()}ti(t,e){return this.Xr(t)}Xr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Zr(t){let e=this.Xr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}};var Ro=class{constructor(t){this.ni=t,this.docs=function(){return new rt(L.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){let r=e.key,i=this.docs.get(r),o=i?i.size:0,a=this.ni(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){let e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){let r=this.docs.get(e);return P.resolve(r?r.document.mutableCopy():Ct.newInvalidDocument(e))}getEntries(t,e){let r=Jt();return e.forEach(i=>{let o=this.docs.get(i);r=r.insert(i,o?o.document.mutableCopy():Ct.newInvalidDocument(i))}),P.resolve(r)}getDocumentsMatchingQuery(t,e,r,i){let o=Jt(),a=e.path,l=new L(a.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(l);for(;h.hasNext();){let{key:f,value:{document:p}}=h.getNext();if(!a.isPrefixOf(f.path))break;f.path.length>a.length+1||Zf(Yf(p),r)<=0||(i.has(p.key)||Si(e,p))&&(o=o.insert(p.key,p.mutableCopy()))}return P.resolve(o)}getAllFromCollectionGroup(t,e,r,i){M(9500)}ri(t,e){return P.forEach(this.docs,r=>e(r))}newChangeBuffer(t){return new Co(this)}getSize(t){return P.resolve(this.size)}},Co=class extends vo{constructor(t){super(),this.Or=t}applyChanges(t){let e=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?e.push(this.Or.addEntry(t,i)):this.Or.removeEntry(r)}),P.waitFor(e)}getFromCache(t,e){return this.Or.getEntry(t,e)}getAllFromCache(t,e){return this.Or.getEntries(t,e)}};var Po=class{constructor(t){this.persistence=t,this.ii=new Qt(e=>Ea(e),Ia),this.lastRemoteSnapshotVersion=U.min(),this.highestTargetId=0,this.si=0,this.oi=new nr,this.targetCount=0,this._i=er.ar()}forEachTarget(t,e){return this.ii.forEach((r,i)=>e(i)),P.resolve()}getLastRemoteSnapshotVersion(t){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return P.resolve(this.si)}allocateTargetId(t){return this.highestTargetId=this._i.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.si&&(this.si=e),P.resolve()}hr(t){this.ii.set(t.target,t);let e=t.targetId;e>this.highestTargetId&&(this._i=new er(e),this.highestTargetId=e),t.sequenceNumber>this.si&&(this.si=t.sequenceNumber)}addTargetData(t,e){return this.hr(e),this.targetCount+=1,P.resolve()}updateTargetData(t,e){return this.hr(e),P.resolve()}removeTargetData(t,e){return this.ii.delete(e.target),this.oi.zr(e.targetId),this.targetCount-=1,P.resolve()}removeTargets(t,e,r){let i=0,o=[];return this.ii.forEach((a,l)=>{l.sequenceNumber<=e&&r.get(l.targetId)===null&&(this.ii.delete(a),o.push(this.removeMatchingKeysForTargetId(t,l.targetId)),i++)}),P.waitFor(o).next(()=>i)}getTargetCount(t){return P.resolve(this.targetCount)}getTargetData(t,e){let r=this.ii.get(e)||null;return P.resolve(r)}addMatchingKeys(t,e,r){return this.oi.Kr(e,r),P.resolve()}removeMatchingKeys(t,e,r){this.oi.Gr(e,r);let i=this.persistence.referenceDelegate,o=[];return i&&e.forEach(a=>{o.push(i.markPotentiallyOrphaned(t,a))}),P.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.oi.zr(e),P.resolve()}getMatchingKeysForTargetId(t,e){let r=this.oi.Jr(e);return P.resolve(r)}containsKey(t,e){return P.resolve(this.oi.containsKey(e))}};var ii=class{constructor(t,e){this.ai={},this.overlays={},this.ui=new Je(0),this.ci=!1,this.ci=!0,this.li=new Ao,this.referenceDelegate=t(this),this.hi=new Po(this),this.indexManager=new po,this.remoteDocumentCache=function(i){return new Ro(i)}(r=>this.referenceDelegate.Pi(r)),this.serializer=new mo(e),this.Ti=new To(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new bo,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.ai[t.toKey()];return r||(r=new So(e,this.referenceDelegate),this.ai[t.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(t,e,r){N("MemoryPersistence","Starting transaction:",t);let i=new Do(this.ui.next());return this.referenceDelegate.Ii(),r(i).next(o=>this.referenceDelegate.di(i).next(()=>o)).toPromise().then(o=>(i.raiseOnCommittedEvent(),o))}Ei(t,e){return P.or(Object.values(this.ai).map(r=>()=>r.containsKey(t,e)))}},Do=class extends Bs{constructor(t){super(),this.currentSequenceNumber=t}},xo=class n{constructor(t){this.persistence=t,this.Ai=new nr,this.Ri=null}static Vi(t){return new n(t)}get mi(){if(this.Ri)return this.Ri;throw M(60996)}addReference(t,e,r){return this.Ai.addReference(r,e),this.mi.delete(r.toString()),P.resolve()}removeReference(t,e,r){return this.Ai.removeReference(r,e),this.mi.add(r.toString()),P.resolve()}markPotentiallyOrphaned(t,e){return this.mi.add(e.toString()),P.resolve()}removeTarget(t,e){this.Ai.zr(e.targetId).forEach(i=>this.mi.add(i.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next(i=>{i.forEach(o=>this.mi.add(o.toString()))}).next(()=>r.removeTargetData(t,e))}Ii(){this.Ri=new Set}di(t){let e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.mi,r=>{let i=L.fromPath(r);return this.fi(t,i).next(o=>{o||e.removeEntry(i,U.min())})}).next(()=>(this.Ri=null,e.apply(t)))}updateLimboDocument(t,e){return this.fi(t,e).next(r=>{r?this.mi.delete(e.toString()):this.mi.add(e.toString())})}Pi(t){return 0}fi(t,e){return P.or([()=>P.resolve(this.Ai.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ei(t,e)])}},si=class n{constructor(t,e){this.persistence=t,this.gi=new Qt(r=>rm(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=tp(this,e)}static Vi(t,e){return new n(t,e)}Ii(){}di(t){return P.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}mr(t){let e=this.yr(t);return this.persistence.getTargetCache().getTargetCount(t).next(r=>e.next(i=>r+i))}yr(t){let e=0;return this.gr(t,r=>{e++}).next(()=>e)}gr(t,e){return P.forEach(this.gi,(r,i)=>this.Sr(t,r,i).next(o=>o?P.resolve():e(i)))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0,i=this.persistence.getRemoteDocumentCache(),o=i.newChangeBuffer();return i.ri(t,a=>this.Sr(t,a,e).next(l=>{l||(r++,o.removeEntry(a,U.min()))})).next(()=>o.apply(t)).next(()=>r)}markPotentiallyOrphaned(t,e){return this.gi.set(e,t.currentSequenceNumber),P.resolve()}removeTarget(t,e){let r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.gi.set(r,t.currentSequenceNumber),P.resolve()}removeReference(t,e,r){return this.gi.set(r,t.currentSequenceNumber),P.resolve()}updateLimboDocument(t,e){return this.gi.set(e,t.currentSequenceNumber),P.resolve()}Pi(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Ur(t.data.value)),e}Sr(t,e,r){return P.or([()=>this.persistence.Ei(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{let i=this.gi.get(e);return P.resolve(i!==void 0&&i>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}};var Vo=class n{constructor(t,e,r,i){this.targetId=t,this.fromCache=e,this.Is=r,this.ds=i}static Es(t,e){let r=G(),i=G();for(let o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new n(t,e.fromCache,r,i)}};var No=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}};var ko=class{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return ru()?8:em(nu())>0?6:4}()}initialize(t,e){this.gs=t,this.indexManager=e,this.As=!0}getDocumentsMatchingQuery(t,e,r,i){let o={result:null};return this.ps(t,e).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.ys(t,e,i,r).next(a=>{o.result=a})}).next(()=>{if(o.result)return;let a=new No;return this.ws(t,e,a).next(l=>{if(o.result=l,this.Rs)return this.Ss(t,e,a,l.size)})}).next(()=>o.result)}Ss(t,e,r,i){return r.documentReadCount<this.Vs?(qe()<=K.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",ze(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),P.resolve()):(qe()<=K.DEBUG&&N("QueryEngine","Query:",ze(e),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.fs*i?(qe()<=K.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",ze(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,xt(e))):P.resolve())}ps(t,e){if(qu(e))return P.resolve(null);let r=xt(e);return this.indexManager.getIndexType(t,r).next(i=>i===0?null:(e.limit!==null&&i===1&&(e=Zs(e,null,"F"),r=xt(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next(o=>{let a=G(...o);return this.gs.getDocuments(t,a).next(l=>this.indexManager.getMinOffset(t,r).next(h=>{let f=this.bs(e,l);return this.Ds(e,f,a,h.readTime)?this.ps(t,Zs(e,null,"F")):this.vs(t,f,e,h)}))})))}ys(t,e,r,i){return qu(e)||i.isEqual(U.min())?P.resolve(null):this.gs.getDocuments(t,r).next(o=>{let a=this.bs(e,o);return this.Ds(e,a,r,i)?P.resolve(null):(qe()<=K.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),ze(e)),this.vs(t,a,e,Xf(i,Qn)).next(l=>l))})}bs(t,e){let r=new lt(Wl(t));return e.forEach((i,o)=>{Si(t,o)&&(r=r.add(o))}),r}Ds(t,e,r,i){if(t.limit===null)return!1;if(r.size!==e.size)return!0;let o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(i)>0)}ws(t,e,r){return qe()<=K.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",ze(e)),this.gs.getDocumentsMatchingQuery(t,e,Re.min(),r)}vs(t,e,r,i){return this.gs.getDocumentsMatchingQuery(t,r,i).next(o=>(e.forEach(a=>{o=o.insert(a.key,a)}),o))}};var Sa="LocalStore",ep=3e8,Oo=class{constructor(t,e,r,i){this.persistence=t,this.Cs=e,this.serializer=i,this.Fs=new rt(z),this.Ms=new Qt(o=>Ea(o),Ia),this.xs=new Map,this.Os=t.getRemoteDocumentCache(),this.hi=t.getTargetCache(),this.Ti=t.getBundleCache(),this.Ns(r)}Ns(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Io(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.Fs))}};function np(n,t,e,r){return new Oo(n,t,e,r)}async function fh(n,t){let e=B(n);return await e.persistence.runTransaction("Handle user change","readonly",r=>{let i;return e.mutationQueue.getAllMutationBatches(r).next(o=>(i=o,e.Ns(t),e.mutationQueue.getAllMutationBatches(r))).next(o=>{let a=[],l=[],h=G();for(let f of i){a.push(f.batchId);for(let p of f.mutations)h=h.add(p.key)}for(let f of o){l.push(f.batchId);for(let p of f.mutations)h=h.add(p.key)}return e.localDocuments.getDocuments(r,h).next(f=>({Bs:f,removedBatchIds:a,addedBatchIds:l}))})})}function rp(n,t){let e=B(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{let i=t.batch.keys(),o=e.Os.newChangeBuffer({trackRemovals:!0});return function(l,h,f,p){let _=f.batch,v=_.keys(),R=P.resolve();return v.forEach(D=>{R=R.next(()=>p.getEntry(h,D)).next(k=>{let V=f.docVersions.get(D);Q(V!==null,48541),k.version.compareTo(V)<0&&(_.applyToRemoteDocument(k,f),k.isValidDocument()&&(k.setReadTime(f.commitVersion),p.addEntry(k)))})}),R.next(()=>l.mutationQueue.removeMutationBatch(h,_))}(e,r,t,o).next(()=>o.apply(r)).next(()=>e.mutationQueue.performConsistencyCheck(r)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(r,i,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let h=G();for(let f=0;f<l.mutationResults.length;++f)l.mutationResults[f].transformResults.length>0&&(h=h.add(l.batch.mutations[f].key));return h}(t))).next(()=>e.localDocuments.getDocuments(r,i))})}function mh(n){let t=B(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.hi.getLastRemoteSnapshotVersion(e))}function ip(n,t){let e=B(n),r=t.snapshotVersion,i=e.Fs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{let a=e.Os.newChangeBuffer({trackRemovals:!0});i=e.Fs;let l=[];t.targetChanges.forEach((p,_)=>{let v=i.get(_);if(!v)return;l.push(e.hi.removeMatchingKeys(o,p.removedDocuments,_).next(()=>e.hi.addMatchingKeys(o,p.addedDocuments,_)));let R=v.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(_)!==null?R=R.withResumeToken(_t.EMPTY_BYTE_STRING,U.min()).withLastLimboFreeSnapshotVersion(U.min()):p.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(p.resumeToken,r)),i=i.insert(_,R),function(k,V,j){return k.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=ep?!0:j.addedDocuments.size+j.modifiedDocuments.size+j.removedDocuments.size>0}(v,R,p)&&l.push(e.hi.updateTargetData(o,R))});let h=Jt(),f=G();if(t.documentUpdates.forEach(p=>{t.resolvedLimboDocuments.has(p)&&l.push(e.persistence.referenceDelegate.updateLimboDocument(o,p))}),l.push(sp(o,a,t.documentUpdates).next(p=>{h=p.Ls,f=p.ks})),!r.isEqual(U.min())){let p=e.hi.getLastRemoteSnapshotVersion(o).next(_=>e.hi.setTargetsMetadata(o,o.currentSequenceNumber,r));l.push(p)}return P.waitFor(l).next(()=>a.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,h,f)).next(()=>h)}).then(o=>(e.Fs=i,o))}function sp(n,t,e){let r=G(),i=G();return e.forEach(o=>r=r.add(o)),t.getEntries(n,r).next(o=>{let a=Jt();return e.forEach((l,h)=>{let f=o.get(l);h.isFoundDocument()!==f.isFoundDocument()&&(i=i.add(l)),h.isNoDocument()&&h.version.isEqual(U.min())?(t.removeEntry(l,h.readTime),a=a.insert(l,h)):!f.isValidDocument()||h.version.compareTo(f.version)>0||h.version.compareTo(f.version)===0&&f.hasPendingWrites?(t.addEntry(h),a=a.insert(l,h)):N(Sa,"Ignoring outdated watch update for ",l,". Current version:",f.version," Watch version:",h.version)}),{Ls:a,ks:i}})}function op(n,t){let e=B(n);return e.persistence.runTransaction("Get next mutation batch","readonly",r=>(t===void 0&&(t=ga),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t)))}function ap(n,t){let e=B(n);return e.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return e.hi.getTargetData(r,t).next(o=>o?(i=o,P.resolve(i)):e.hi.allocateTargetId(r).next(a=>(i=new tr(t,a,"TargetPurposeListen",r.currentSequenceNumber),e.hi.addTargetData(r,i).next(()=>i))))}).then(r=>{let i=e.Fs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(e.Fs=e.Fs.insert(r.targetId,r),e.Ms.set(t,r.targetId)),r})}async function Fo(n,t,e){let r=B(n),i=r.Fs.get(t),o=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",o,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!fn(a))throw a;N(Sa,`Failed to update sequence numbers for target ${t}: ${a}`)}r.Fs=r.Fs.remove(t),r.Ms.delete(i.target)}function tl(n,t,e){let r=B(n),i=U.min(),o=G();return r.persistence.runTransaction("Execute query","readwrite",a=>function(h,f,p){let _=B(h),v=_.Ms.get(p);return v!==void 0?P.resolve(_.Fs.get(v)):_.hi.getTargetData(f,p)}(r,a,xt(t)).next(l=>{if(l)return i=l.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(a,l.targetId).next(h=>{o=h})}).next(()=>r.Cs.getDocumentsMatchingQuery(a,t,e?i:U.min(),e?o:G())).next(l=>(cp(r,Em(t),l),{documents:l,qs:o})))}function cp(n,t,e){let r=n.xs.get(t)||U.min();e.forEach((i,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n.xs.set(t,r)}var oi=class{constructor(){this.activeTargetIds=Rm()}Gs(t){this.activeTargetIds=this.activeTargetIds.add(t)}zs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ws(){let t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}};var Mo=class{constructor(){this.Fo=new oi,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.Fo.Gs(t),this.Mo[t]||"not-current"}updateQueryState(t,e,r){this.Mo[t]=e}removeLocalQueryTarget(t){this.Fo.zs(t)}isLocalQueryTarget(t){return this.Fo.activeTargetIds.has(t)}clearQueryState(t){delete this.Mo[t]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(t){return this.Fo.activeTargetIds.has(t)}start(){return this.Fo=new oi,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}};var Lo=class{xo(t){}shutdown(){}};var el="ConnectivityMonitor",ai=class{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(t){this.ko.push(t)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){N(el,"Network connectivity changed: AVAILABLE");for(let t of this.ko)t(0)}Lo(){N(el,"Network connectivity changed: UNAVAILABLE");for(let t of this.ko)t(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var Br=null;function Bo(){return Br===null?Br=function(){return 268435456+Math.round(2147483648*Math.random())}():Br++,"0x"+Br.toString(16)}var Cs="RestConnection",up={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"},Uo=class{get Qo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;let e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.$o=e+"://"+t.host,this.Uo=`projects/${r}/databases/${i}`,this.Ko=this.databaseId.database===Hr?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(t,e,r,i,o){let a=Bo(),l=this.Go(t,e.toUriEncodedString());N(Cs,`Sending RPC '${t}' ${a}:`,l,r);let h={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(h,i,o);let{host:f}=new URL(l),p=xr(f);return this.jo(t,l,h,r,p).then(_=>(N(Cs,`Received RPC '${t}' ${a}: `,_),_),_=>{throw ue(Cs,`RPC '${t}' ${a} failed with error: `,_,"url: ",l,"request:",r),_})}Jo(t,e,r,i,o,a){return this.Wo(t,e,r,i,o)}zo(t,e,r){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+hn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((i,o)=>t[o]=i),r&&r.headers.forEach((i,o)=>t[o]=i)}Go(t,e){let r=up[t];return`${this.$o}/v1/${e}:${r}`}terminate(){}};var qo=class{constructor(t){this.Ho=t.Ho,this.Yo=t.Yo}Zo(t){this.Xo=t}e_(t){this.t_=t}n_(t){this.r_=t}onMessage(t){this.i_=t}close(){this.Yo()}send(t){this.Ho(t)}s_(){this.Xo()}o_(){this.t_()}__(t){this.r_(t)}a_(t){this.i_(t)}};var gt="WebChannelConnection",zo=class extends Uo{constructor(t){super(t),this.u_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}jo(t,e,r,i,o){let a=Bo();return new Promise((l,h)=>{let f=new Is;f.setWithCredentials(!0),f.listenOnce(Ts.COMPLETE,()=>{try{switch(f.getLastErrorCode()){case zn.NO_ERROR:let _=f.getResponseJson();N(gt,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(_)),l(_);break;case zn.TIMEOUT:N(gt,`RPC '${t}' ${a} timed out`),h(new F(C.DEADLINE_EXCEEDED,"Request time out"));break;case zn.HTTP_ERROR:let v=f.getStatus();if(N(gt,`RPC '${t}' ${a} failed with status:`,v,"response text:",f.getResponseText()),v>0){let R=f.getResponseJson();Array.isArray(R)&&(R=R[0]);let D=R?.error;if(D&&D.status&&D.message){let k=function(j){let q=j.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf(q)>=0?q:C.UNKNOWN}(D.status);h(new F(k,D.message))}else h(new F(C.UNKNOWN,"Server responded with status "+f.getStatus()))}else h(new F(C.UNAVAILABLE,"Connection failed."));break;default:M(9055,{c_:t,streamId:a,l_:f.getLastErrorCode(),h_:f.getLastError()})}}finally{N(gt,`RPC '${t}' ${a} completed.`)}});let p=JSON.stringify(i);N(gt,`RPC '${t}' ${a} sending request:`,i),f.send(e,"POST",p,r,15)})}P_(t,e,r){let i=Bo(),o=[this.$o,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=Ss(),l=As(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.useFetchStreams=!0),this.zo(h.initMessageHeaders,e,r),h.encodeInitMessageHeaders=!0;let p=o.join("");N(gt,`Creating RPC '${t}' stream ${i}: ${p}`,h);let _=a.createWebChannel(p,h);this.T_(_);let v=!1,R=!1,D=new qo({Ho:V=>{R?N(gt,`Not sending because RPC '${t}' stream ${i} is closed:`,V):(v||(N(gt,`Opening RPC '${t}' stream ${i} transport.`),_.open(),v=!0),N(gt,`RPC '${t}' stream ${i} sending:`,V),_.send(V))},Yo:()=>_.close()}),k=(V,j,q)=>{V.listen(j,$=>{try{q($)}catch(Z){setTimeout(()=>{throw Z},0)}})};return k(_,Ue.EventType.OPEN,()=>{R||(N(gt,`RPC '${t}' stream ${i} transport opened.`),D.s_())}),k(_,Ue.EventType.CLOSE,()=>{R||(R=!0,N(gt,`RPC '${t}' stream ${i} transport closed`),D.__(),this.I_(_))}),k(_,Ue.EventType.ERROR,V=>{R||(R=!0,ue(gt,`RPC '${t}' stream ${i} transport errored. Name:`,V.name,"Message:",V.message),D.__(new F(C.UNAVAILABLE,"The operation could not be completed")))}),k(_,Ue.EventType.MESSAGE,V=>{var j;if(!R){let q=V.data[0];Q(!!q,16349);let $=q,Z=$?.error||((j=$[0])===null||j===void 0?void 0:j.error);if(Z){N(gt,`RPC '${t}' stream ${i} received error:`,Z);let bt=Z.status,X=function(y){let w=st[y];if(w!==void 0)return ih(w)}(bt),I=Z.message;X===void 0&&(X=C.INTERNAL,I="Unknown error status: "+bt+" with message "+Z.message),R=!0,D.__(new F(X,I)),_.close()}else N(gt,`RPC '${t}' stream ${i} received:`,q),D.a_(q)}}),k(l,bs.STAT_EVENT,V=>{V.stat===Fr.PROXY?N(gt,`RPC '${t}' stream ${i} detected buffering proxy`):V.stat===Fr.NOPROXY&&N(gt,`RPC '${t}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{D.o_()},0),D}terminate(){this.u_.forEach(t=>t.close()),this.u_=[]}T_(t){this.u_.push(t)}I_(t){this.u_=this.u_.filter(e=>e===t)}};function Ps(){return typeof document<"u"?document:null}function Ri(n){return new co(n,!0)}var ci=class{constructor(t,e,r=1e3,i=1.5,o=6e4){this.Fi=t,this.timerId=e,this.d_=r,this.E_=i,this.A_=o,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(t){this.cancel();let e=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),i=Math.max(0,e-r);i>0&&N("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.R_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,i,()=>(this.m_=Date.now(),t())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}};var nl="PersistentStream",ui=class{constructor(t,e,r,i,o,a,l,h){this.Fi=t,this.w_=r,this.S_=i,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=h,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new ci(t,e)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(t){this.q_(),this.stream.send(t)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,t!==4?this.F_.reset():e&&e.code===C.RESOURCE_EXHAUSTED?(Kt(e.toString()),Kt("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):e&&e.code===C.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.n_(e)}U_(){}auth(){this.state=1;let t=this.K_(this.b_),e=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.b_===e&&this.W_(r,i)},r=>{t(()=>{let i=new F(C.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(i)})})}W_(t,e){let r=this.K_(this.b_);this.stream=this.z_(t,e),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.e_(()=>{r(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(i=>{r(()=>this.G_(i))}),this.stream.onMessage(i=>{r(()=>++this.C_==1?this.j_(i):this.onNext(i))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(t){return N(nl,`close with error: ${t}`),this.stream=null,this.close(4,t)}K_(t){return e=>{this.Fi.enqueueAndForget(()=>this.b_===t?e():(N(nl,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}},jo=class extends ui{constructor(t,e,r,i,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,i,a),this.serializer=o}z_(t,e){return this.connection.P_("Listen",t,e)}j_(t){return this.onNext(t)}onNext(t){this.F_.reset();let e=qm(this.serializer,t),r=function(o){if(!("targetChange"in o))return U.min();let a=o.targetChange;return a.targetIds&&a.targetIds.length?U.min():a.readTime?Vt(a.readTime):U.min()}(t);return this.listener.J_(e,r)}H_(t){let e={};e.database=fo(this.serializer),e.addTarget=function(o,a){let l,h=a.target;if(l=Ys(h)?{documents:$m(o,h)}:{query:Gm(o,h).Vt},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=sh(o,a.resumeToken);let f=uo(o,a.expectedCount);f!==null&&(l.expectedCount=f)}else if(a.snapshotVersion.compareTo(U.min())>0){l.readTime=ni(o,a.snapshotVersion.toTimestamp());let f=uo(o,a.expectedCount);f!==null&&(l.expectedCount=f)}return l}(this.serializer,t);let r=Wm(this.serializer,t);r&&(e.labels=r),this.k_(e)}Y_(t){let e={};e.database=fo(this.serializer),e.removeTarget=t,this.k_(e)}},$o=class extends ui{constructor(t,e,r,i,o,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,i,a),this.serializer=o}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(t,e){return this.connection.P_("Write",t,e)}j_(t){return Q(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,Q(!t.writeResults||t.writeResults.length===0,55816),this.listener.ea()}onNext(t){Q(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.F_.reset();let e=jm(t.writeResults,t.commitTime),r=Vt(t.commitTime);return this.listener.ta(r,e)}na(){let t={};t.database=fo(this.serializer),this.k_(t)}X_(t){let e={streamToken:this.lastStreamToken,writes:t.map(r=>zm(this.serializer,r))};this.k_(e)}};var Go=class{},Ko=class extends Go{constructor(t,e,r,i){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=i,this.ra=!1}ia(){if(this.ra)throw new F(C.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(t,e,r,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Wo(t,lo(e,r),i,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new F(C.UNKNOWN,o.toString())})}Jo(t,e,r,i,o){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Jo(t,lo(e,r),i,a,l,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new F(C.UNKNOWN,a.toString())})}terminate(){this.ra=!0,this.connection.terminate()}},Wo=class{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(t){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ua("Offline")))}set(t){this.ha(),this.sa=0,t==="Online"&&(this._a=!1),this.ua(t)}ua(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}ca(t){let e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(Kt(e),this._a=!1):N("OnlineStateTracker",e)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}};var xe="RemoteStore",Ho=class{constructor(t,e,r,i,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=o,this.Ea.xo(a=>{r.enqueueAndForget(async()=>{Ne(this)&&(N(xe,"Restarting streams for network reachability change."),await async function(h){let f=B(h);f.Ia.add(4),await cr(f),f.Aa.set("Unknown"),f.Ia.delete(4),await Ci(f)}(this))})}),this.Aa=new Wo(r,i)}};async function Ci(n){if(Ne(n))for(let t of n.da)await t(!0)}async function cr(n){for(let t of n.da)await t(!1)}function ph(n,t){let e=B(n);e.Ta.has(t.targetId)||(e.Ta.set(t.targetId,t),Da(e)?Pa(e):mn(e).x_()&&Ca(e,t))}function Ra(n,t){let e=B(n),r=mn(e);e.Ta.delete(t),r.x_()&&gh(e,t),e.Ta.size===0&&(r.x_()?r.B_():Ne(e)&&e.Aa.set("Unknown"))}function Ca(n,t){if(n.Ra.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(U.min())>0){let e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}mn(n).H_(t)}function gh(n,t){n.Ra.$e(t),mn(n).Y_(t)}function Pa(n){n.Ra=new ao({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),Et:t=>n.Ta.get(t)||null,lt:()=>n.datastore.serializer.databaseId}),mn(n).start(),n.Aa.aa()}function Da(n){return Ne(n)&&!mn(n).M_()&&n.Ta.size>0}function Ne(n){return B(n).Ia.size===0}function yh(n){n.Ra=void 0}async function lp(n){n.Aa.set("Online")}async function hp(n){n.Ta.forEach((t,e)=>{Ca(n,t)})}async function dp(n,t){yh(n),Da(n)?(n.Aa.la(t),Pa(n)):n.Aa.set("Unknown")}async function fp(n,t,e){if(n.Aa.set("Online"),t instanceof ti&&t.state===2&&t.cause)try{await async function(i,o){let a=o.cause;for(let l of o.targetIds)i.Ta.has(l)&&(await i.remoteSyncer.rejectListen(l,a),i.Ta.delete(l),i.Ra.removeTarget(l))}(n,t)}catch(r){N(xe,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await li(n,r)}else if(t instanceof Ke?n.Ra.Ye(t):t instanceof Zr?n.Ra.it(t):n.Ra.et(t),!e.isEqual(U.min()))try{let r=await mh(n.localStore);e.compareTo(r)>=0&&await function(o,a){let l=o.Ra.Pt(a);return l.targetChanges.forEach((h,f)=>{if(h.resumeToken.approximateByteSize()>0){let p=o.Ta.get(f);p&&o.Ta.set(f,p.withResumeToken(h.resumeToken,a))}}),l.targetMismatches.forEach((h,f)=>{let p=o.Ta.get(h);if(!p)return;o.Ta.set(h,p.withResumeToken(_t.EMPTY_BYTE_STRING,p.snapshotVersion)),gh(o,h);let _=new tr(p.target,h,f,p.sequenceNumber);Ca(o,_)}),o.remoteSyncer.applyRemoteEvent(l)}(n,e)}catch(r){N(xe,"Failed to raise snapshot:",r),await li(n,r)}}async function li(n,t,e){if(!fn(t))throw t;n.Ia.add(1),await cr(n),n.Aa.set("Offline"),e||(e=()=>mh(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{N(xe,"Retrying IndexedDB access"),await e(),n.Ia.delete(1),await Ci(n)})}function _h(n,t){return t().catch(e=>li(n,e,t))}async function Pi(n){let t=B(n),e=he(t),r=t.Pa.length>0?t.Pa[t.Pa.length-1].batchId:ga;for(;mp(t);)try{let i=await op(t.localStore,r);if(i===null){t.Pa.length===0&&e.B_();break}r=i.batchId,pp(t,i)}catch(i){await li(t,i)}wh(t)&&vh(t)}function mp(n){return Ne(n)&&n.Pa.length<10}function pp(n,t){n.Pa.push(t);let e=he(n);e.x_()&&e.Z_&&e.X_(t.mutations)}function wh(n){return Ne(n)&&!he(n).M_()&&n.Pa.length>0}function vh(n){he(n).start()}async function gp(n){he(n).na()}async function yp(n){let t=he(n);for(let e of n.Pa)t.X_(e.mutations)}async function _p(n,t,e){let r=n.Pa.shift(),i=ro.from(r,t,e);await _h(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await Pi(n)}async function wp(n,t){t&&he(n).Z_&&await async function(r,i){if(function(a){return km(a)&&a!==C.ABORTED}(i.code)){let o=r.Pa.shift();he(r).N_(),await _h(r,()=>r.remoteSyncer.rejectFailedWrite(o.batchId,i)),await Pi(r)}}(n,t),wh(n)&&vh(n)}async function rl(n,t){let e=B(n);e.asyncQueue.verifyOperationInProgress(),N(xe,"RemoteStore received new credentials");let r=Ne(e);e.Ia.add(3),await cr(e),r&&e.Aa.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ia.delete(3),await Ci(e)}async function vp(n,t){let e=B(n);t?(e.Ia.delete(2),await Ci(e)):t||(e.Ia.add(2),await cr(e),e.Aa.set("Unknown"))}function mn(n){return n.Va||(n.Va=function(e,r,i){let o=B(e);return o.ia(),new jo(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(n.datastore,n.asyncQueue,{Zo:lp.bind(null,n),e_:hp.bind(null,n),n_:dp.bind(null,n),J_:fp.bind(null,n)}),n.da.push(async t=>{t?(n.Va.N_(),Da(n)?Pa(n):n.Aa.set("Unknown")):(await n.Va.stop(),yh(n))})),n.Va}function he(n){return n.ma||(n.ma=function(e,r,i){let o=B(e);return o.ia(),new $o(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),e_:gp.bind(null,n),n_:wp.bind(null,n),ea:yp.bind(null,n),ta:_p.bind(null,n)}),n.da.push(async t=>{t?(n.ma.N_(),await Pi(n)):(await n.ma.stop(),n.Pa.length>0&&(N(xe,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))})),n.ma}var Qo=class n{constructor(t,e,r,i,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=i,this.removalCallback=o,this.deferred=new Gt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,i,o){let a=Date.now()+r,l=new n(t,e,a,i,o);return l.start(r),l}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new F(C.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function xa(n,t){if(Kt("AsyncQueue",`${t}: ${n}`),fn(n))return new F(C.UNAVAILABLE,`${t}: ${n}`);throw n}var hi=class n{static emptySet(t){return new n(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||L.comparator(e.key,r.key):(e,r)=>L.comparator(e.key,r.key),this.keyedMap=jn(),this.sortedSet=new rt(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){let e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,r)=>(t(e),!1))}add(t){let e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){let e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof n)||this.size!==t.size)return!1;let e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){let i=e.getNext().key,o=r.getNext().key;if(!i.isEqual(o))return!1}return!0}toString(){let t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){let r=new n;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}};var di=class{constructor(){this.fa=new rt(L.comparator)}track(t){let e=t.doc.key,r=this.fa.get(e);r?t.type!==0&&r.type===3?this.fa=this.fa.insert(e,t):t.type===3&&r.type!==1?this.fa=this.fa.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.fa=this.fa.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.fa=this.fa.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.fa=this.fa.remove(e):t.type===1&&r.type===2?this.fa=this.fa.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.fa=this.fa.insert(e,{type:2,doc:t.doc}):M(63341,{At:t,ga:r}):this.fa=this.fa.insert(e,t)}pa(){let t=[];return this.fa.inorderTraversal((e,r)=>{t.push(r)}),t}},cn=class n{constructor(t,e,r,i,o,a,l,h,f){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=h,this.hasCachedResults=f}static fromInitialDocuments(t,e,r,i,o){let a=[];return e.forEach(l=>{a.push({type:0,doc:l})}),new n(t,e,hi.emptySet(e),a,r,i,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Ai(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;let e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let i=0;i<e.length;i++)if(e[i].type!==r[i].type||!e[i].doc.isEqual(r[i].doc))return!1;return!0}};var Jo=class{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(t=>t.ba())}},Xo=class{constructor(){this.queries=il(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(e,r){let i=B(e),o=i.queries;i.queries=il(),o.forEach((a,l)=>{for(let h of l.wa)h.onError(r)})})(this,new F(C.ABORTED,"Firestore shutting down"))}};function il(){return new Qt(n=>Kl(n),Ai)}async function Ep(n,t){let e=B(n),r=3,i=t.query,o=e.queries.get(i);o?!o.Sa()&&t.ba()&&(r=2):(o=new Jo,r=t.ba()?0:1);try{switch(r){case 0:o.ya=await e.onListen(i,!0);break;case 1:o.ya=await e.onListen(i,!1);break;case 2:await e.onFirstRemoteStoreListen(i)}}catch(a){let l=xa(a,`Initialization of query '${ze(t.query)}' failed`);return void t.onError(l)}e.queries.set(i,o),o.wa.push(t),t.va(e.onlineState),o.ya&&t.Ca(o.ya)&&Va(e)}async function Ip(n,t){let e=B(n),r=t.query,i=3,o=e.queries.get(r);if(o){let a=o.wa.indexOf(t);a>=0&&(o.wa.splice(a,1),o.wa.length===0?i=t.ba()?0:1:!o.Sa()&&t.ba()&&(i=2))}switch(i){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function Tp(n,t){let e=B(n),r=!1;for(let i of t){let o=i.query,a=e.queries.get(o);if(a){for(let l of a.wa)l.Ca(i)&&(r=!0);a.ya=i}}r&&Va(e)}function bp(n,t,e){let r=B(n),i=r.queries.get(t);if(i)for(let o of i.wa)o.onError(e);r.queries.delete(t)}function Va(n){n.Da.forEach(t=>{t.next()})}var Yo,sl;(sl=Yo||(Yo={})).Fa="default",sl.Cache="cache";var Zo=class{constructor(t,e,r){this.query=t,this.Ma=e,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(t){if(!this.options.includeMetadataChanges){let r=[];for(let i of t.docChanges)i.type!==3&&r.push(i);t=new cn(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.xa?this.Na(t)&&(this.Ma.next(t),e=!0):this.Ba(t,this.onlineState)&&(this.La(t),e=!0),this.Oa=t,e}onError(t){this.Ma.error(t)}va(t){this.onlineState=t;let e=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,t)&&(this.La(this.Oa),e=!0),e}Ba(t,e){if(!t.fromCache||!this.ba())return!0;let r=e!=="Offline";return(!this.options.ka||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Na(t){if(t.docChanges.length>0)return!0;let e=this.Oa&&this.Oa.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}La(t){t=cn.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.xa=!0,this.Ma.next(t)}ba(){return this.options.source!==Yo.Cache}};var fi=class{constructor(t){this.key=t}},mi=class{constructor(t){this.key=t}},ta=class{constructor(t,e){this.query=t,this.Ha=e,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=G(),this.mutatedKeys=G(),this.Xa=Wl(t),this.eu=new hi(this.Xa)}get tu(){return this.Ha}nu(t,e){let r=e?e.ru:new di,i=e?e.eu:this.eu,o=e?e.mutatedKeys:this.mutatedKeys,a=i,l=!1,h=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,f=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(t.inorderTraversal((p,_)=>{let v=i.get(p),R=Si(this.query,_)?_:null,D=!!v&&this.mutatedKeys.has(v.key),k=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations),V=!1;v&&R?v.data.isEqual(R.data)?D!==k&&(r.track({type:3,doc:R}),V=!0):this.iu(v,R)||(r.track({type:2,doc:R}),V=!0,(h&&this.Xa(R,h)>0||f&&this.Xa(R,f)<0)&&(l=!0)):!v&&R?(r.track({type:0,doc:R}),V=!0):v&&!R&&(r.track({type:1,doc:v}),V=!0,(h||f)&&(l=!0)),V&&(R?(a=a.add(R),o=k?o.add(p):o.delete(p)):(a=a.delete(p),o=o.delete(p)))}),this.query.limit!==null)for(;a.size>this.query.limit;){let p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),o=o.delete(p.key),r.track({type:1,doc:p})}return{eu:a,ru:r,Ds:l,mutatedKeys:o}}iu(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,i){let o=this.eu;this.eu=t.eu,this.mutatedKeys=t.mutatedKeys;let a=t.ru.pa();a.sort((p,_)=>function(R,D){let k=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{At:V})}};return k(R)-k(D)}(p.type,_.type)||this.Xa(p.doc,_.doc)),this.su(r),i=i!=null&&i;let l=e&&!i?this.ou():[],h=this.Za.size===0&&this.current&&!i?1:0,f=h!==this.Ya;return this.Ya=h,a.length!==0||f?{snapshot:new cn(this.query,t.eu,o,a,t.mutatedKeys,h===0,f,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:l}:{_u:l}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new di,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(t){return!this.Ha.has(t)&&!!this.eu.has(t)&&!this.eu.get(t).hasLocalMutations}su(t){t&&(t.addedDocuments.forEach(e=>this.Ha=this.Ha.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Ha=this.Ha.delete(e)),this.current=t.current)}ou(){if(!this.current)return[];let t=this.Za;this.Za=G(),this.eu.forEach(r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))});let e=[];return t.forEach(r=>{this.Za.has(r)||e.push(new mi(r))}),this.Za.forEach(r=>{t.has(r)||e.push(new fi(r))}),e}uu(t){this.Ha=t.qs,this.Za=G();let e=this.nu(t.documents);return this.applyChanges(e,!0)}cu(){return cn.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}},Na="SyncEngine",ea=class{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}},na=class{constructor(t){this.key=t,this.lu=!1}},ra=class{constructor(t,e,r,i,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=i,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.hu={},this.Pu=new Qt(l=>Kl(l),Ai),this.Tu=new Map,this.Iu=new Set,this.du=new rt(L.comparator),this.Eu=new Map,this.Au=new nr,this.Ru={},this.Vu=new Map,this.mu=er.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}};async function Ap(n,t,e=!0){let r=Sh(n),i,o=r.Pu.get(t);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),i=o.view.cu()):i=await Eh(r,t,e,!0),i}async function Sp(n,t){let e=Sh(n);await Eh(e,t,!0,!1)}async function Eh(n,t,e,r){let i=await ap(n.localStore,xt(t)),o=i.targetId,a=n.sharedClientState.addLocalQueryTarget(o,e),l;return r&&(l=await Rp(n,t,o,a==="current",i.resumeToken)),n.isPrimaryClient&&e&&ph(n.remoteStore,i),l}async function Rp(n,t,e,r,i){n.gu=(_,v,R)=>async function(k,V,j,q){let $=V.view.nu(j);$.Ds&&($=await tl(k.localStore,V.query,!1).then(({documents:I})=>V.view.nu(I,$)));let Z=q&&q.targetChanges.get(V.targetId),bt=q&&q.targetMismatches.get(V.targetId)!=null,X=V.view.applyChanges($,k.isPrimaryClient,Z,bt);return al(k,V.targetId,X._u),X.snapshot}(n,_,v,R);let o=await tl(n.localStore,t,!0),a=new ta(t,o.qs),l=a.nu(o.documents),h=Zn.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",i),f=a.applyChanges(l,n.isPrimaryClient,h);al(n,e,f._u);let p=new ea(t,e,a);return n.Pu.set(t,p),n.Tu.has(e)?n.Tu.get(e).push(t):n.Tu.set(e,[t]),f.snapshot}async function Cp(n,t,e){let r=B(n),i=r.Pu.get(t),o=r.Tu.get(i.targetId);if(o.length>1)return r.Tu.set(i.targetId,o.filter(a=>!Ai(a,t))),void r.Pu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Fo(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),e&&Ra(r.remoteStore,i.targetId),ia(r,i.targetId)}).catch(dn)):(ia(r,i.targetId),await Fo(r.localStore,i.targetId,!0))}async function Pp(n,t){let e=B(n),r=e.Pu.get(t),i=e.Tu.get(r.targetId);e.isPrimaryClient&&i.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),Ra(e.remoteStore,r.targetId))}async function Dp(n,t,e){let r=Mp(n);try{let i=await function(a,l){let h=B(a),f=et.now(),p=l.reduce((R,D)=>R.add(D.key),G()),_,v;return h.persistence.runTransaction("Locally write mutations","readwrite",R=>{let D=Jt(),k=G();return h.Os.getEntries(R,p).next(V=>{D=V,D.forEach((j,q)=>{q.isValidDocument()||(k=k.add(j))})}).next(()=>h.localDocuments.getOverlayedDocuments(R,D)).next(V=>{_=V;let j=[];for(let q of l){let $=Nm(q,_.get(q.key).overlayedDocument);$!=null&&j.push(new Ot(q.key,$,Ul($.value.mapValue),se.exists(!0)))}return h.mutationQueue.addMutationBatch(R,f,j,l)}).next(V=>{v=V;let j=V.applyToLocalDocumentSet(_,k);return h.documentOverlayCache.saveOverlays(R,V.batchId,j)})}).then(()=>({batchId:v.batchId,changes:Ql(_)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(i.batchId),function(a,l,h){let f=a.Ru[a.currentUser.toKey()];f||(f=new rt(z)),f=f.insert(l,h),a.Ru[a.currentUser.toKey()]=f}(r,i.batchId,e),await ur(r,i.changes),await Pi(r.remoteStore)}catch(i){let o=xa(i,"Failed to persist write");e.reject(o)}}async function Ih(n,t){let e=B(n);try{let r=await ip(e.localStore,t);t.targetChanges.forEach((i,o)=>{let a=e.Eu.get(o);a&&(Q(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?a.lu=!0:i.modifiedDocuments.size>0?Q(a.lu,14607):i.removedDocuments.size>0&&(Q(a.lu,42227),a.lu=!1))}),await ur(e,r,t)}catch(r){await dn(r)}}function ol(n,t,e){let r=B(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){let i=[];r.Pu.forEach((o,a)=>{let l=a.view.va(t);l.snapshot&&i.push(l.snapshot)}),function(a,l){let h=B(a);h.onlineState=l;let f=!1;h.queries.forEach((p,_)=>{for(let v of _.wa)v.va(l)&&(f=!0)}),f&&Va(h)}(r.eventManager,t),i.length&&r.hu.J_(i),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function xp(n,t,e){let r=B(n);r.sharedClientState.updateQueryState(t,"rejected",e);let i=r.Eu.get(t),o=i&&i.key;if(o){let a=new rt(L.comparator);a=a.insert(o,Ct.newNoDocument(o,U.min()));let l=G().add(o),h=new Yr(U.min(),new Map,new rt(z),a,l);await Ih(r,h),r.du=r.du.remove(o),r.Eu.delete(t),ka(r)}else await Fo(r.localStore,t,!1).then(()=>ia(r,t,e)).catch(dn)}async function Vp(n,t){let e=B(n),r=t.batch.batchId;try{let i=await rp(e.localStore,t);bh(e,r,null),Th(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await ur(e,i)}catch(i){await dn(i)}}async function Np(n,t,e){let r=B(n);try{let i=await function(a,l){let h=B(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let p;return h.mutationQueue.lookupMutationBatch(f,l).next(_=>(Q(_!==null,37113),p=_.keys(),h.mutationQueue.removeMutationBatch(f,_))).next(()=>h.mutationQueue.performConsistencyCheck(f)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(f,p,l)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,p)).next(()=>h.localDocuments.getDocuments(f,p))})}(r.localStore,t);bh(r,t,e),Th(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await ur(r,i)}catch(i){await dn(i)}}function Th(n,t){(n.Vu.get(t)||[]).forEach(e=>{e.resolve()}),n.Vu.delete(t)}function bh(n,t,e){let r=B(n),i=r.Ru[r.currentUser.toKey()];if(i){let o=i.get(t);o&&(e?o.reject(e):o.resolve(),i=i.remove(t)),r.Ru[r.currentUser.toKey()]=i}}function ia(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(let r of n.Tu.get(t))n.Pu.delete(r),e&&n.hu.pu(r,e);n.Tu.delete(t),n.isPrimaryClient&&n.Au.zr(t).forEach(r=>{n.Au.containsKey(r)||Ah(n,r)})}function Ah(n,t){n.Iu.delete(t.path.canonicalString());let e=n.du.get(t);e!==null&&(Ra(n.remoteStore,e),n.du=n.du.remove(t),n.Eu.delete(e),ka(n))}function al(n,t,e){for(let r of e)r instanceof fi?(n.Au.addReference(r.key,t),kp(n,r)):r instanceof mi?(N(Na,"Document no longer in limbo: "+r.key),n.Au.removeReference(r.key,t),n.Au.containsKey(r.key)||Ah(n,r.key)):M(19791,{yu:r})}function kp(n,t){let e=t.key,r=e.path.canonicalString();n.du.get(e)||n.Iu.has(r)||(N(Na,"New document in limbo: "+e),n.Iu.add(r),ka(n))}function ka(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){let t=n.Iu.values().next().value;n.Iu.delete(t);let e=new L(it.fromString(t)),r=n.mu.next();n.Eu.set(r,new na(e)),n.du=n.du.insert(e,r),ph(n.remoteStore,new tr(xt(Ta(e.path)),r,"TargetPurposeLimboResolution",Je.ue))}}async function ur(n,t,e){let r=B(n),i=[],o=[],a=[];r.Pu.isEmpty()||(r.Pu.forEach((l,h)=>{a.push(r.gu(h,t,e).then(f=>{var p;if((f||e)&&r.isPrimaryClient){let _=f?!f.fromCache:(p=e?.targetChanges.get(h.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(h.targetId,_?"current":"not-current")}if(f){i.push(f);let _=Vo.Es(h.targetId,f);o.push(_)}}))}),await Promise.all(a),r.hu.J_(i),await async function(h,f){let p=B(h);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",_=>P.forEach(f,v=>P.forEach(v.Is,R=>p.persistence.referenceDelegate.addReference(_,v.targetId,R)).next(()=>P.forEach(v.ds,R=>p.persistence.referenceDelegate.removeReference(_,v.targetId,R)))))}catch(_){if(!fn(_))throw _;N(Sa,"Failed to update sequence numbers: "+_)}for(let _ of f){let v=_.targetId;if(!_.fromCache){let R=p.Fs.get(v),D=R.snapshotVersion,k=R.withLastLimboFreeSnapshotVersion(D);p.Fs=p.Fs.insert(v,k)}}}(r.localStore,o))}async function Op(n,t){let e=B(n);if(!e.currentUser.isEqual(t)){N(Na,"User change. New user:",t.toKey());let r=await fh(e.localStore,t);e.currentUser=t,function(o,a){o.Vu.forEach(l=>{l.forEach(h=>{h.reject(new F(C.CANCELLED,a))})}),o.Vu.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await ur(e,r.Bs)}}function Fp(n,t){let e=B(n),r=e.Eu.get(t);if(r&&r.lu)return G().add(r.key);{let i=G(),o=e.Tu.get(t);if(!o)return i;for(let a of o){let l=e.Pu.get(a);i=i.unionWith(l.view.tu)}return i}}function Sh(n){let t=B(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=Ih.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Fp.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=xp.bind(null,t),t.hu.J_=Tp.bind(null,t.eventManager),t.hu.pu=bp.bind(null,t.eventManager),t}function Mp(n){let t=B(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Vp.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Np.bind(null,t),t}var un=class{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Ri(t.databaseInfo.databaseId),this.sharedClientState=this.bu(t),this.persistence=this.Du(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Cu(t,this.localStore),this.indexBackfillerScheduler=this.Fu(t,this.localStore)}Cu(t,e){return null}Fu(t,e){return null}vu(t){return np(this.persistence,new ko,t.initialUser,this.serializer)}Du(t){return new ii(xo.Vi,this.serializer)}bu(t){return new Mo}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};un.provider={build:()=>new un};var sa=class extends un{constructor(t){super(),this.cacheSizeBytes=t}Cu(t,e){Q(this.persistence.referenceDelegate instanceof si,46915);let r=this.persistence.referenceDelegate.garbageCollector;return new _o(r,t.asyncQueue,e)}Du(t){let e=this.cacheSizeBytes!==void 0?At.withCacheSize(this.cacheSizeBytes):At.DEFAULT;return new ii(r=>si.Vi(r,e),this.serializer)}};var rr=class{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>ol(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Op.bind(null,this.syncEngine),await vp(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new Xo}()}createDatastore(t){let e=Ri(t.databaseInfo.databaseId),r=function(o){return new zo(o)}(t.databaseInfo);return function(o,a,l,h){return new Ko(o,a,l,h)}(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return function(r,i,o,a,l){return new Ho(r,i,o,a,l)}(this.localStore,this.datastore,t.asyncQueue,e=>ol(this.syncEngine,e,0),function(){return ai.C()?new ai:new Lo}())}createSyncEngine(t,e){return function(i,o,a,l,h,f,p){let _=new ra(i,o,a,l,h,f);return p&&(_.fu=!0),_}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(i){let o=B(i);N(xe,"RemoteStore shutting down."),o.Ia.add(5),await cr(o),o.Ea.shutdown(),o.Aa.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}};rr.provider={build:()=>new rr};var oa=class{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.xu(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.xu(this.observer.error,t):Kt("Uncaught Error in snapshot listener:",t.toString()))}Ou(){this.muted=!0}xu(t,e){setTimeout(()=>{this.muted||t(e)},0)}};var de="FirestoreClient",aa=class{constructor(t,e,r,i,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this.databaseInfo=i,this.user=ut.UNAUTHENTICATED,this.clientId=Hn.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async a=>{N(de,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(N(de,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();let t=new Gt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){let r=xa(e,"Failed to shutdown persistence");t.reject(r)}}),t.promise}};async function Ds(n,t){n.asyncQueue.verifyOperationInProgress(),N(de,"Initializing OfflineComponentProvider");let e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await fh(t.localStore,i),r=i)}),t.persistence.setDatabaseDeletedListener(()=>{ue("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then(()=>{N("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(i=>{ue("Terminating Firestore due to IndexedDb database deletion failed",i)})}),n._offlineComponents=t}async function cl(n,t){n.asyncQueue.verifyOperationInProgress();let e=await Lp(n);N(de,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener(r=>rl(t.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>rl(t.remoteStore,i)),n._onlineComponents=t}async function Lp(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){N(de,"Using user provided OfflineComponentProvider");try{await Ds(n,n._uninitializedComponentsProvider._offline)}catch(t){let e=t;if(!function(i){return i.name==="FirebaseError"?i.code===C.FAILED_PRECONDITION||i.code===C.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(e))throw e;ue("Error using user provided cache. Falling back to memory cache: "+e),await Ds(n,new un)}}else N(de,"Using default OfflineComponentProvider"),await Ds(n,new sa(void 0));return n._offlineComponents}async function Rh(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(N(de,"Using user provided OnlineComponentProvider"),await cl(n,n._uninitializedComponentsProvider._online)):(N(de,"Using default OnlineComponentProvider"),await cl(n,new rr))),n._onlineComponents}function Bp(n){return Rh(n).then(t=>t.syncEngine)}async function ul(n){let t=await Rh(n),e=t.eventManager;return e.onListen=Ap.bind(null,t.syncEngine),e.onUnlisten=Cp.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=Sp.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=Pp.bind(null,t.syncEngine),e}function Ch(n){let t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}var ll=new Map;var Ph="firestore.googleapis.com",hl=!0,pi=class{constructor(t){var e,r;if(t.host===void 0){if(t.ssl!==void 0)throw new F(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Ph,this.ssl=hl}else this.host=t.host,this.ssl=(e=t.ssl)!==null&&e!==void 0?e:hl;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=dh;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Zm)throw new F(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Jf("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ch((r=t.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new F(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new F(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new F(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}},ir=class{constructor(t,e,r,i){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new pi({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new F(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new F(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new pi(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new xs;switch(r.type){case"firstParty":return new Os(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new F(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){let r=ll.get(e);r&&(N("ComponentProvider","Removing Datastore"),ll.delete(e),r.terminate())}(this),Promise.resolve()}};function Oa(n,t,e,r={}){var i;n=ie(n,ir);let o=xr(t),a=n._getSettings(),l=Object.assign(Object.assign({},a),{emulatorOptions:n._getEmulatorOptions()}),h=`${t}:${e}`;o&&(Zc(`https://${h}`),eu("Firestore",!0)),a.host!==Ph&&a.host!==h&&ue("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");let f=Object.assign(Object.assign({},a),{host:h,ssl:o,emulatorOptions:r});if(!Le(f,l)&&(n._setSettings(f),r.mockUserToken)){let p,_;if(typeof r.mockUserToken=="string")p=r.mockUserToken,_=ut.MOCK_USER;else{p=tu(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);let v=r.mockUserToken.sub||r.mockUserToken.user_id;if(!v)throw new F(C.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");_=new ut(v)}n._authCredentials=new Vs(new jr(p,_))}}var gi=class n{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new n(this.firestore,t,this._query)}},yt=class n{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new sr(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new n(this.firestore,t,this._key)}toJSON(){return{type:n._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(ar(e,n._jsonSchema))return new n(t,r||null,new L(it.fromString(e.referencePath)))}};yt._jsonSchemaVersion="firestore/documentReference/1.0",yt._jsonSchema={type:at("string",yt._jsonSchemaVersion),referencePath:at("string")};var sr=class n extends gi{constructor(t,e,r){super(t,e,Ta(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let t=this._path.popLast();return t.isEmpty()?null:new yt(this.firestore,null,new L(t))}withConverter(t){return new n(this.firestore,t,this._path)}};function me(n,t,...e){if(n=Ut(n),arguments.length===1&&(t=Hn.newId()),Qf("doc","path",t),n instanceof ir){let r=it.fromString(t,...e);return Pu(r),new yt(n,null,new L(r))}{if(!(n instanceof yt||n instanceof sr))throw new F(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(it.fromString(t,...e));return Pu(r),new yt(n.firestore,n instanceof sr?n.converter:null,new L(r))}}var dl="AsyncQueue",yi=class{constructor(t=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new ci(this,"async_queue_retry"),this.oc=()=>{let r=Ps();r&&N(dl,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=t;let e=Ps();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.ac(),this.uc(t)}enterRestrictedMode(t){if(!this.Xu){this.Xu=!0,this.rc=t||!1;let e=Ps();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.oc)}}enqueue(t){if(this.ac(),this.Xu)return new Promise(()=>{});let e=new Gt;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Zu.push(t),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(t){if(!fn(t))throw t;N(dl,"Operation failed with retryable error: "+t)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(t){let e=this._c.then(()=>(this.nc=!0,t().catch(r=>{throw this.tc=r,this.nc=!1,Kt("INTERNAL UNHANDLED ERROR: ",fl(r)),r}).then(r=>(this.nc=!1,r))));return this._c=e,e}enqueueAfterDelay(t,e,r){this.ac(),this.sc.indexOf(t)>-1&&(e=0);let i=Qo.createAndSchedule(this,t,e,r,o=>this.lc(o));return this.ec.push(i),i}ac(){this.tc&&M(47125,{hc:fl(this.tc)})}verifyOperationInProgress(){}async Pc(){let t;do t=this._c,await t;while(t!==this._c)}Tc(t){for(let e of this.ec)if(e.timerId===t)return!0;return!1}Ic(t){return this.Pc().then(()=>{this.ec.sort((e,r)=>e.targetTimeMs-r.targetTimeMs);for(let e of this.ec)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Pc()})}dc(t){this.sc.push(t)}lc(t){let e=this.ec.indexOf(t);this.ec.splice(e,1)}};function fl(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}function ml(n){return function(e,r){if(typeof e!="object"||e===null)return!1;let i=e;for(let o of r)if(o in i&&typeof i[o]=="function")return!0;return!1}(n,["next","error","complete"])}var Ve=class extends ir{constructor(t,e,r,i){super(t,e,r,i),this.type="firestore",this._queue=new yi,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let t=this._firestoreClient.terminate();this._queue=new yi(t),this._firestoreClient=void 0,await t}}};function Dh(n,t){let e=typeof n=="object"?n:vu(),r=typeof n=="string"?n:t||Hr,i=yu(e,"firestore").getImmediate({identifier:r});if(!i._initialized){let o=Yc("firestore");o&&Oa(i,...o)}return i}function xh(n){if(n._terminated)throw new F(C.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Up(n),n._firestoreClient}function Up(n){var t,e,r;let i=n._freezeSettings(),o=function(l,h,f,p){return new Us(l,h,f,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,Ch(p.experimentalLongPollingOptions),p.useFetchStreams,p.isUsingEmulator)}(n._databaseId,((t=n._app)===null||t===void 0?void 0:t.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((e=i.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new aa(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(l){let h=l?._online.build();return{_offline:l?._offline.build(h),_online:h}}(n._componentsProvider))}var oe=class n{constructor(t){this._byteString=t}static fromBase64String(t){try{return new n(_t.fromBase64String(t))}catch(e){throw new F(C.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new n(_t.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:n._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(ar(t,n._jsonSchema))return n.fromBase64String(t.bytes)}};oe._jsonSchemaVersion="firestore/bytes/1.0",oe._jsonSchema={type:at("string",oe._jsonSchemaVersion),bytes:at("string")};var ln=class{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new F(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Tt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}};var or=class{constructor(t){this._methodName=t}};var ae=class n{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new F(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new F(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return z(this._lat,t._lat)||z(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:n._jsonSchemaVersion}}static fromJSON(t){if(ar(t,n._jsonSchema))return new n(t.latitude,t.longitude)}};ae._jsonSchemaVersion="firestore/geoPoint/1.0",ae._jsonSchema={type:at("string",ae._jsonSchemaVersion),latitude:at("number"),longitude:at("number")};var ce=class n{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(r,i){if(r.length!==i.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==i[o])return!1;return!0}(this._values,t._values)}toJSON(){return{type:n._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(ar(t,n._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every(e=>typeof e=="number"))return new n(t.vectorValues);throw new F(C.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}};ce._jsonSchemaVersion="firestore/vectorValue/1.0",ce._jsonSchema={type:at("string",ce._jsonSchemaVersion),vectorValues:at("object")};var qp=/^__.*__$/,ca=class{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new Ot(t,this.data,this.fieldMask,e,this.fieldTransforms):new De(t,this.data,e,this.fieldTransforms)}},_i=class{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return new Ot(t,this.data,this.fieldMask,e,this.fieldTransforms)}};function Vh(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{Ec:n})}}var ua=class n{constructor(t,e,r,i,o,a){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=i,o===void 0&&this.Ac(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(t){return new n(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(t){var e;let r=(e=this.path)===null||e===void 0?void 0:e.child(t),i=this.Rc({path:r,mc:!1});return i.fc(t),i}gc(t){var e;let r=(e=this.path)===null||e===void 0?void 0:e.child(t),i=this.Rc({path:r,mc:!1});return i.Ac(),i}yc(t){return this.Rc({path:void 0,mc:!0})}wc(t){return vi(t,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}Ac(){if(this.path)for(let t=0;t<this.path.length;t++)this.fc(this.path.get(t))}fc(t){if(t.length===0)throw this.wc("Document fields must not be empty");if(Vh(this.Ec)&&qp.test(t))throw this.wc('Document fields cannot begin and end with "__"')}},la=class{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||Ri(t)}Dc(t,e,r,i=!1){return new ua({Ec:t,methodName:e,bc:r,path:Tt.emptyPath(),mc:!1,Sc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function Nh(n){let t=n._freezeSettings(),e=Ri(n._databaseId);return new la(n._databaseId,!!t.ignoreUndefinedProperties,e)}function zp(n,t,e,r,i,o={}){let a=n.Dc(o.merge||o.mergeFields?2:0,t,e,i);Fa("Data must be an object, but it was:",a,r);let l=kh(r,a),h,f;if(o.merge)h=new St(a.fieldMask),f=a.fieldTransforms;else if(o.mergeFields){let p=[];for(let _ of o.mergeFields){let v=ha(t,_,e);if(!a.contains(v))throw new F(C.INVALID_ARGUMENT,`Field '${v}' is specified in your field mask but missing from your input data.`);Fh(p,v)||p.push(v)}h=new St(p),f=a.fieldTransforms.filter(_=>h.covers(_.field))}else h=null,f=a.fieldTransforms;return new ca(new It(l),h,f)}var wi=class n extends or{_toFieldTransform(t){if(t.Ec!==2)throw t.Ec===1?t.wc(`${this._methodName}() can only appear at the top level of your update data`):t.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof n}};function jp(n,t,e,r){let i=n.Dc(1,t,e);Fa("Data must be an object, but it was:",i,r);let o=[],a=It.empty();fe(r,(h,f)=>{let p=Ma(t,h,e);f=Ut(f);let _=i.gc(p);if(f instanceof wi)o.push(p);else{let v=Di(f,_);v!=null&&(o.push(p),a.set(p,v))}});let l=new St(o);return new _i(a,l,i.fieldTransforms)}function $p(n,t,e,r,i,o){let a=n.Dc(1,t,e),l=[ha(t,r,e)],h=[i];if(o.length%2!=0)throw new F(C.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let v=0;v<o.length;v+=2)l.push(ha(t,o[v])),h.push(o[v+1]);let f=[],p=It.empty();for(let v=l.length-1;v>=0;--v)if(!Fh(f,l[v])){let R=l[v],D=h[v];D=Ut(D);let k=a.gc(R);if(D instanceof wi)f.push(R);else{let V=Di(D,k);V!=null&&(f.push(R),p.set(R,V))}}let _=new St(f);return new _i(p,_,a.fieldTransforms)}function Di(n,t){if(Oh(n=Ut(n)))return Fa("Unsupported field value:",t,n),kh(n,t);if(n instanceof or)return function(r,i){if(!Vh(i.Ec))throw i.wc(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.wc(`${r._methodName}() is not currently supported inside arrays`);let o=r._toFieldTransform(i);o&&i.fieldTransforms.push(o)}(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.mc&&t.Ec!==4)throw t.wc("Nested arrays are not supported");return function(r,i){let o=[],a=0;for(let l of r){let h=Di(l,i.yc(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}}(n,t)}return function(r,i){if((r=Ut(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Cm(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){let o=et.fromDate(r);return{timestampValue:ni(i.serializer,o)}}if(r instanceof et){let o=new et(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:ni(i.serializer,o)}}if(r instanceof ae)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof oe)return{bytesValue:sh(i.serializer,r._byteString)};if(r instanceof yt){let o=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw i.wc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:Aa(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof ce)return function(a,l){return{mapValue:{fields:{[_a]:{stringValue:wa},[Xe]:{arrayValue:{values:a.toArray().map(f=>{if(typeof f!="number")throw l.wc("VectorValues must only contain numeric values.");return ba(l.serializer,f)})}}}}}}(r,i);throw i.wc(`Unsupported field value: ${pa(r)}`)}(n,t)}function kh(n,t){let e={};return Vl(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):fe(n,(r,i)=>{let o=Di(i,t.Vc(r));o!=null&&(e[r]=o)}),{mapValue:{fields:e}}}function Oh(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof et||n instanceof ae||n instanceof oe||n instanceof yt||n instanceof or||n instanceof ce)}function Fa(n,t,e){if(!Oh(e)||!yl(e)){let r=pa(e);throw r==="an object"?t.wc(n+" a custom object"):t.wc(n+" "+r)}}function ha(n,t,e){if((t=Ut(t))instanceof ln)return t._internalPath;if(typeof t=="string")return Ma(n,t);throw vi("Field path arguments must be of type string or ",n,!1,void 0,e)}var Gp=new RegExp("[~\\*/\\[\\]]");function Ma(n,t,e){if(t.search(Gp)>=0)throw vi(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new ln(...t.split("."))._internalPath}catch{throw vi(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function vi(n,t,e,r,i){let o=r&&!r.isEmpty(),a=i!==void 0,l=`Function ${t}() called with invalid data`;e&&(l+=" (via `toFirestore()`)"),l+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${r}`),a&&(h+=` in document ${i}`),h+=")"),new F(C.INVALID_ARGUMENT,l+n+h)}function Fh(n,t){return n.some(e=>e.isEqual(t))}var Ei=class{constructor(t,e,r,i,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=i,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new yt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let t=new da(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){let e=this._document.data.field(Mh("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}},da=class extends Ei{data(){return super.data()}};function Mh(n,t){return typeof t=="string"?Ma(n,t):t instanceof ln?t._internalPath:t._delegate._internalPath}function Kp(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new F(C.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}var fa=class{convertValue(t,e="none"){switch(le(t)){case 0:return null;case 1:return t.booleanValue;case 2:return tt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Ht(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw M(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){let r={};return fe(t,(i,o)=>{r[i]=this.convertValue(o,e)}),r}convertVectorValue(t){var e,r,i;let o=(i=(r=(e=t.fields)===null||e===void 0?void 0:e[Xe].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(a=>tt(a.doubleValue));return new ce(o)}convertGeoPoint(t){return new ae(tt(t.latitude),tt(t.longitude))}convertArray(t,e){return(t.values||[]).map(r=>this.convertValue(r,e))}convertServerTimestamp(t,e){switch(e){case"previous":let r=bi(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(Xn(t));default:return null}}convertTimestamp(t){let e=Wt(t);return new et(e.seconds,e.nanos)}convertDocumentKey(t,e){let r=it.fromString(t);Q(hh(r),9688,{name:t});let i=new Qr(r.get(1),r.get(3)),o=new L(r.popFirst(5));return i.isEqual(e)||Kt(`Document ${o} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}};function Wp(n,t,e){let r;return r=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,r}var be=class{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}},Ae=class n extends Ei{constructor(t,e,r,i,o,a){super(t,e,r,i,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){let e=new We(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){let r=this._document.data.field(Mh("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new F(C.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let t=this._document,e={};return e.type=n._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}};Ae._jsonSchemaVersion="firestore/documentSnapshot/1.0",Ae._jsonSchema={type:at("string",Ae._jsonSchemaVersion),bundleSource:at("string","DocumentSnapshot"),bundleName:at("string"),bundle:at("string")};var We=class extends Ae{data(t={}){return super.data(t)}},He=class n{constructor(t,e,r,i){this._firestore=t,this._userDataWriter=e,this._snapshot=i,this.metadata=new be(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){let t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(r=>{t.call(e,new We(this._firestore,this._userDataWriter,r.key,r,new be(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){let e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new F(C.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(i,o){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(l=>{let h=new We(i._firestore,i._userDataWriter,l.doc.key,l.doc,new be(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);return l.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(l=>o||l.type!==3).map(l=>{let h=new We(i._firestore,i._userDataWriter,l.doc.key,l.doc,new be(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter),f=-1,p=-1;return l.type!==0&&(f=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),p=a.indexOf(l.doc.key)),{type:Hp(l.type),doc:h,oldIndex:f,newIndex:p}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new F(C.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let t={};t.type=n._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=Hn.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;let e=[],r=[],i=[];return this.docs.forEach(o=>{o._document!==null&&(e.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),i.push(o.ref.path))}),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}};function Hp(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:n})}}He._jsonSchemaVersion="firestore/querySnapshot/1.0",He._jsonSchema={type:at("string",He._jsonSchemaVersion),bundleSource:at("string","QuerySnapshot"),bundleName:at("string"),bundle:at("string")};var Ii=class extends fa{constructor(t){super(),this.firestore=t}convertBytes(t){return new oe(t)}convertReference(t){let e=this.convertDocumentKey(t,this.firestore._databaseId);return new yt(this.firestore,null,e)}};function Lh(n,t,e){n=ie(n,yt);let r=ie(n.firestore,Ve),i=Wp(n.converter,t,e);return Uh(r,[zp(Nh(r),"setDoc",n._key,i,n.converter!==null,e).toMutation(n._key,se.none())])}function pn(n,t,e,...r){n=ie(n,yt);let i=ie(n.firestore,Ve),o=Nh(i),a;return a=typeof(t=Ut(t))=="string"||t instanceof ln?$p(o,"updateDoc",n._key,t,e,r):jp(o,"updateDoc",n._key,t),Uh(i,[a.toMutation(n._key,se.exists(!0))])}function Bh(n,...t){var e,r,i;n=Ut(n);let o={includeMetadataChanges:!1,source:"default"},a=0;typeof t[a]!="object"||ml(t[a])||(o=t[a++]);let l={includeMetadataChanges:o.includeMetadataChanges,source:o.source};if(ml(t[a])){let _=t[a];t[a]=(e=_.next)===null||e===void 0?void 0:e.bind(_),t[a+1]=(r=_.error)===null||r===void 0?void 0:r.bind(_),t[a+2]=(i=_.complete)===null||i===void 0?void 0:i.bind(_)}let h,f,p;if(n instanceof yt)f=ie(n.firestore,Ve),p=Ta(n._key.path),h={next:_=>{t[a]&&t[a](Qp(f,n,_))},error:t[a+1],complete:t[a+2]};else{let _=ie(n,gi);f=ie(_.firestore,Ve),p=_._query;let v=new Ii(f);h={next:R=>{t[a]&&t[a](new He(f,v,_,R))},error:t[a+1],complete:t[a+2]},Kp(n._query)}return function(v,R,D,k){let V=new oa(k),j=new Zo(R,V,D);return v.asyncQueue.enqueueAndForget(async()=>Ep(await ul(v),j)),()=>{V.Ou(),v.asyncQueue.enqueueAndForget(async()=>Ip(await ul(v),j))}}(xh(f),p,l,h)}function Uh(n,t){return function(r,i){let o=new Gt;return r.asyncQueue.enqueueAndForget(async()=>Dp(await Bp(r),i,o)),o.promise}(xh(n),t)}function Qp(n,t,e){let r=e.docs.get(t._key),i=new Ii(n);return new Ae(n,i,t._key,r,new be(e.hasPendingWrites,e.fromCache),t.converter)}(function(t,e=!0){(function(i){hn=i})(wu),Un(new qt("firestore",(r,{instanceIdentifier:i,options:o})=>{let a=r.getProvider("app").getImmediate(),l=new Ve(new Ns(r.getProvider("auth-internal")),new Fs(a,r.getProvider("app-check-internal")),function(f,p){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new F(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Qr(f.options.projectId,p)}(a,i),a);return o=Object.assign({useFetchStreams:e},o),l._setSettings(o),l},"PUBLIC").setMultipleInstances(!0)),re(Au,Su,t),re(Au,Su,"esm2017")})();var Jp={apiKey:"AIzaSyDummyKeyForFreeTier",projectId:"spelling-bee-relay-1025"},Xp=vs(Jp),pe=Dh(Xp),Gh=localStorage.getItem("sb_use_emulator")==="true";Gh&&(console.log("Using Firestore Emulator at 127.0.0.1:8080"),Oa(pe,"127.0.0.1",8080));globalThis.switchMultiplayerEnv=()=>{let n=!Gh;localStorage.setItem("sb_use_emulator",n),location.reload()};var gn=[{name:"Beginner",pct:0},{name:"Good Start",pct:.02},{name:"Moving Up",pct:.05},{name:"Good",pct:.08},{name:"Solid",pct:.15},{name:"Nice",pct:.25},{name:"Great",pct:.4},{name:"Amazing",pct:.5},{name:"Genius",pct:.7},{name:"Queen Bee",pct:1}],S={playerId:localStorage.getItem("sb_playerId")||crypto.randomUUID(),currentInput:"",foundWords:[],wordFinders:{},score:0,puzzle:null,puzzleId:null,attributionMode:0,multiplayer:{roomCode:null,nickname:localStorage.getItem("sb_nickname")||"",teammates:[],step:"nickname"}};localStorage.setItem("sb_playerId",S.playerId);var O={input:document.getElementById("input-text"),cursor:document.querySelector(".cursor"),score:document.getElementById("score"),messageArea:document.getElementById("message-area"),levelText:document.getElementById("current-level"),wordsList:document.getElementById("words-list"),foundCount:document.getElementById("found-count"),toggleWordsBtn:document.getElementById("toggle-words-btn"),toggleAttributionBtn:document.getElementById("toggle-attribution-btn"),deleteBtn:document.getElementById("delete-btn"),enterBtn:document.getElementById("enter-btn"),restartBtn:document.getElementById("restart-btn"),shuffleBtn:document.getElementById("shuffle-btn"),dotsContainer:document.querySelector(".dots-container"),cells:{center:document.getElementById("cell-center"),outer:[document.getElementById("cell-1"),document.getElementById("cell-2"),document.getElementById("cell-3"),document.getElementById("cell-4"),document.getElementById("cell-5"),document.getElementById("cell-6")]},multi:{btn:document.getElementById("multiplayer-btn"),screen:document.getElementById("multiplayer-screen"),closeBtn:document.getElementById("close-multi-btn"),stepNickname:document.getElementById("multi-setup"),stepMenu:document.getElementById("multi-menu"),stepJoin:document.getElementById("multi-join"),stepActive:document.getElementById("multi-active"),nicknameInput:document.getElementById("nickname-input"),saveNicknameBtn:document.getElementById("save-nickname-btn"),createRoomBtn:document.getElementById("create-room-btn"),roomCodeInput:document.getElementById("room-code-input"),confirmJoinBtn:document.getElementById("join-confirm-btn"),backBtn:document.getElementById("join-back-btn"),leaveBtn:document.getElementById("leave-room-btn"),activeRoomCode:document.getElementById("active-room-code"),playerList:document.getElementById("player-list"),displayNickname:document.getElementById("display-nickname"),editNicknameMenu:document.getElementById("edit-nickname-menu"),editNicknameRoom:document.getElementById("edit-nickname-room"),banner:document.getElementById("multiplayer-banner"),bannerRoomCode:document.getElementById("banner-room-code")}};document.addEventListener("DOMContentLoaded",Yp);async function Yp(){Zp(),S.puzzle?Ua(S.puzzleId):await za(),S.multiplayer.roomCode&&ja(S.multiplayer.roomCode,!1).catch(()=>{S.multiplayer.roomCode=null,Xt()}),qa(),dr(),ge(),Hh(),tg()}function Zp(){let n=localStorage.getItem("sb_mobile_state");if(n){let t=JSON.parse(n);S={...S,...t}}}function Xt(){localStorage.setItem("sb_mobile_state",JSON.stringify(S))}function Ua(n){if(typeof n=="string"&&n.startsWith("nyt-")){S.puzzleId!==n&&za(!1);return}let t=PUZZLES[n];t&&(S.puzzleId=n,S.puzzle=t,S.foundWords=[],S.score=0,S.currentInput="",Xt(),qa(),dr(),ge())}function qa(){if(!S.puzzle)return;O.cells.center.textContent=S.puzzle.letters[0].toUpperCase();let n=S.puzzle.letters.slice(1);O.cells.outer.forEach((t,e)=>{t.textContent=n[e].toUpperCase(),t.dataset.letter=n[e]})}function tg(){O.cells.center.onclick=()=>La(S.puzzle.letters[0]),O.cells.outer.forEach(n=>{n.onclick=()=>La(n.dataset.letter)}),O.deleteBtn.onclick=qh,O.enterBtn.onclick=zh,O.shuffleBtn.onclick=lg,O.restartBtn.onclick=()=>{if(S.multiplayer.roomCode&&!confirm("This will change the game for EVERYONE in the room. Continue?"))return;let n=Math.floor(Math.random()*Object.keys(PUZZLES).length);Ua(n),S.multiplayer.roomCode&&Wh(S.puzzleId)},O.nytDailyBtn=document.getElementById("nyt-daily-btn"),O.nytDailyBtn.onclick=()=>{S.multiplayer.roomCode&&!confirm("This will change the game for EVERYONE in the room to the NYT Daily. Continue?")||za()},O.levelContainer=document.querySelector(".level-container"),O.levelContainer.onclick=ng,O.levelContainer.style.cursor="pointer",O.multi.btn.onclick=yn,O.multi.closeBtn.onclick=()=>O.multi.screen.style.display="none",O.multi.saveNicknameBtn.onclick=jh,O.multi.saveNicknameBtn.onclick=jh,O.multi.createRoomBtn.onclick=ig,document.getElementById("join-room-btn").onclick=()=>{S.multiplayer.step="join",yn()},O.multi.confirmJoinBtn.onclick=sg,O.multi.backBtn.onclick=()=>{S.multiplayer.step="menu",yn()},O.multi.leaveBtn.onclick=cg,O.toggleWordsBtn.onclick=()=>{let n=O.wordsList.classList.toggle("hidden");O.toggleWordsBtn.innerText=n?"Show":"Hide"},O.toggleAttributionBtn.onclick=()=>{S.attributionMode=(S.attributionMode+1)%3,Xt(),ge()},O.multi.editNicknameMenu.onclick=n=>{n.preventDefault(),$h()},O.multi.editNicknameRoom.onclick=n=>{n.preventDefault(),$h()},document.addEventListener("keydown",n=>{if(n.target.tagName==="INPUT"||n.target.tagName==="TEXTAREA"||n.target.isContentEditable)return;let t=n.key.toLowerCase();t==="backspace"?(qh(),n.preventDefault()):t==="enter"?(zh(),n.preventDefault()):S.puzzle&&S.puzzle.letters.map(e=>e.toLowerCase()).includes(t)&&(La(t),n.preventDefault())})}function La(n){S.currentInput.length<20&&(S.currentInput+=n.toLowerCase(),O.input.innerText=S.currentInput)}function qh(){S.currentInput=S.currentInput.slice(0,-1),O.input.innerText=S.currentInput}function zh(){let n=S.currentInput;if(!n)return;let t=eg(n);t.valid?(S.foundWords.push(n),S.score+=t.score,S.foundWords.sort(),S.wordFinders[n]=S.playerId,Xt(),dr(),ge(),hr(t.isPangram?"Pangram!":"Nice!",1500),ug(n)):hr(t.error,1e3),setTimeout(()=>{S.currentInput="",O.input.innerText=""},500)}function eg(n){if(n.length<4)return{valid:!1,error:"Too short"};let t=S.puzzle.letters[0].toLowerCase();if(!n.includes(t))return{valid:!1,error:"Missing center"};let e=new Set(S.puzzle.letters.map(i=>i.toLowerCase()));for(let i of n)if(!e.has(i))return{valid:!1,error:"Bad letter"};if(!S.puzzle.words.includes(n))return{valid:!1,error:"Not a word"};if(S.foundWords.includes(n))return{valid:!1,error:"Already found"};let r=new Set(n).size===7;return{valid:!0,score:n.length===4?1:n.length+(r?7:0),isPangram:r}}function hr(n,t){O.messageArea.innerText=n,O.messageArea.classList.add("visible"),setTimeout(()=>O.messageArea.classList.remove("visible"),t)}function dr(){if(O.score.innerText=S.score,!S.puzzle)return;let n=S.puzzle.maxScore,t=0;gn.forEach((r,i)=>{S.score>=Math.floor(n*r.pct)&&(t=i)}),O.levelText.innerText=gn[t].name,O.dotsContainer.innerHTML="";let e=document.createElement("div");e.className="progress-line-fill",e.style.width=`${t/(gn.length-1)*100}%`,O.dotsContainer.appendChild(e),gn.forEach((r,i)=>{let o=document.createElement("div");o.className=`dot ${i<=t?"active":""} ${i===t?"current":""}`,o.style.left=`${i/(gn.length-1)*100}%`,O.dotsContainer.appendChild(o)})}function ge(){O.foundCount.innerText=`${S.foundWords.length} words`,O.wordsList.innerHTML="";let n=S.attributionMode,t=S.multiplayer.rawPlayers||{},e=["#f7da21","#4ecdc4","#ff6b6b","#a8e6cf","#dfe6e9","#fd79a8","#74b9ff"],r={},i=0;if(S.foundWords.forEach(o=>{let a=S.wordFinders[o];a&&!r[a]&&(r[a]=e[i++%e.length])}),n===0)S.foundWords.forEach(o=>{let a=document.createElement("span");a.innerText=o,a.className="found-word",O.wordsList.appendChild(a)});else if(n===1)S.foundWords.forEach(o=>{let a=S.wordFinders[o],l=r[a]||"#ccc",h=document.createElement("span");h.innerText=o,h.style.color=l,h.className="found-word",O.wordsList.appendChild(h)});else{let o={};S.foundWords.forEach(a=>{let l=S.wordFinders[a];o[l]||(o[l]=[]),o[l].push(a)}),Object.keys(o).sort((a,l)=>{if(a===S.playerId)return-1;if(l===S.playerId)return 1;let h=lr(a,t),f=lr(l,t);return h.localeCompare(f)}).forEach(a=>{let l=lr(a,t),h=r[a]||"#ccc",f=document.createElement("div");f.className="word-section",f.innerHTML=`<div class="word-section-header" style="color: ${h}">${l} (${o[a].length})</div><div class="word-section-words"></div>`,o[a].forEach(p=>{let _=document.createElement("span");_.innerText=p,_.style.color=h,_.className="found-word",f.querySelector(".word-section-words").appendChild(_)}),O.wordsList.appendChild(f)})}}function lr(n,t){if(!n)return"Unknown";let e=t[n];if(!e)return n.length>20?"Ghost":n;let r=e.nickname||"Anonymous",i=Object.entries(t).filter(([a,l])=>(l.nickname||"Anonymous")===r).sort(([a],[l])=>a.localeCompare(l));if(i.length<=1)return r;let o=i.findIndex(([a])=>a===n);return`${r} (#${o+1})`}async function za(n=!0){try{let t="https://corsproxy.io/?",e=encodeURIComponent("https://nytbee.com/"),i=await(await fetch(t+e)).text(),o=new DOMParser().parseFromString(i,"text/html"),a=Array.from(o.querySelectorAll('a[id^="link-definition-"]')).map(v=>v.id.split("-").pop().toLowerCase());if(!a.length)throw new Error("No words found");let l=new Set(a[0].split(""));a.forEach(v=>{let R=new Set(v.split(""));l=new Set([...l].filter(D=>R.has(D)))});let h=Array.from(l)[0]?.toUpperCase();if(!h)throw new Error("Center letter detection failed");let p=Array.from(o.querySelectorAll("script")).map(v=>v.textContent).join(" ").match(/\[\s*"[A-Z]"(?:\s*,\s*"[A-Z]"){6}\s*\]/gi)||[],_=null;for(let v of p){let R=v.match(/[A-Z]/gi).map(D=>D.toUpperCase());if(R.includes(h)){let D=R.filter(k=>k!==h);_=[h,...D];break}}if(!_)throw new Error("Could not match letters to word list");S.puzzleId="nyt-"+new Date().toISOString().split("T")[0],S.puzzle={letters:_,words:a,maxScore:a.reduce((v,R)=>v+(R.length===4?1:R.length+(new Set(R).size===7?7:0)),0)},S.foundWords=[],S.score=0,Xt(),qa(),dr(),ge(),n&&S.multiplayer.roomCode&&Wh(S.puzzleId)}catch(t){console.error("NYT Load Error:",t),hr("NYT Load Failed",2e3)}}function ng(){let n=document.getElementById("rankings-modal"),t=document.getElementById("rankings-list");t.innerHTML="";let e=S.puzzle.maxScore;[...gn].reverse().forEach(r=>{let i=document.createElement("div");i.className=`ranking-row ${S.score>=Math.floor(e*r.pct)?"reached":""}`,i.innerHTML=`<span>${r.name}</span><span>${Math.floor(e*r.pct)}</span>`,t.appendChild(i)}),n.style.display="block",window.onclick=r=>{r.target==n&&(n.style.display="none")},document.getElementById("close-rankings-btn").onclick=()=>{n.style.display="none"}}function rg(){let n=["Happy","Lucky","Sunny","Cool","Bright","Swift","Calm"],t=["Bee","Hive","Honey","Comb","Wing","Pollen","Nectar"],e=Math.floor(Math.random()*99)+1,r=n[Math.floor(Math.random()*n.length)],i=t[Math.floor(Math.random()*t.length)];return`${r}-${i}-${e}`}async function ja(n,t=!0){let e=n.toLowerCase().trim(),r=me(pe,"rooms",e);await pn(r,{[`players.${S.playerId}`]:{nickname:S.multiplayer.nickname,online:!0,lastActive:et.now()}}),S.multiplayer.roomCode=e,S.multiplayer.step="active",Xt(),og(e),Hh(),t&&yn()}async function ig(){let n=rg().toLowerCase(),t=S.puzzle;await Lh(me(pe,"rooms",n),{puzzleId:S.puzzleId,createdAt:et.now(),players:{[S.playerId]:{nickname:S.multiplayer.nickname,online:!0,lastActive:et.now()}},foundWords:{}}),ja(n)}function sg(){let n=O.multi.roomCodeInput.value.trim().toLowerCase();n&&ja(n).catch(t=>hr("Room not found",2e3))}var Ba=null;function og(n){Ba&&Ba(),Ba=Bh(me(pe,"rooms",n),t=>{let e=t.data();if(e){if(S.multiplayer.rawPlayers=e.players||{},e.players){let r=Date.now();S.multiplayer.teammates=Object.entries(e.players).map(([i,o])=>{let a=o.lastActive?.toMillis?o.lastActive.toMillis():0,l=o.online&&r-a<9e4;return{playerId:i,nickname:o.nickname,online:l}}),Kh()}if(e.foundWords){let r=!1;Object.keys(e.foundWords).forEach(i=>{let o=e.foundWords[i];if(S.wordFinders[i]=o,!S.foundWords.includes(i)&&(S.foundWords.push(i),r=!0,o!==S.playerId)){let a=lr(o,e.players||{});hr(`${a} found ${i}`,2e3)}}),(r||S.foundWords.length>0)&&(S.score=S.foundWords.reduce((i,o)=>{let a=ag(o);return i+(a.valid?a.score:0)},0),S.foundWords.sort(),Xt(),ge(),dr())}e.puzzleId&&e.puzzleId!==S.puzzleId&&Ua(e.puzzleId)}})}function ag(n){if(!S.puzzle||!S.puzzle.words.includes(n))return{valid:!1};let t=new Set(n).size===7;return{valid:!0,score:n.length===4?1:n.length+(t?7:0)}}function Kh(){O.multi.playerList.innerHTML="";let n=S.multiplayer.rawPlayers||{};S.multiplayer.teammates.forEach(t=>{let e=document.createElement("div");e.className=`player-item ${t.playerId===S.playerId?"self":""}`;let r=lr(t.playerId,n);e.innerHTML=`
            <div class="player-status ${t.online?"online":"offline"}"></div>
            <span>${r} ${t.playerId===S.playerId?"(You)":""}</span>
        `,O.multi.playerList.appendChild(e)})}function yn(){O.multi.screen.style.display="flex",[O.multi.stepNickname,O.multi.stepMenu,O.multi.stepJoin,O.multi.stepActive].forEach(t=>t.classList.add("hidden")),S.multiplayer.step==="nickname"&&S.multiplayer.nickname&&(S.multiplayer.step="menu");let n=S.multiplayer.step;n==="nickname"?O.multi.stepNickname.classList.remove("hidden"):n==="menu"?(O.multi.stepMenu.classList.remove("hidden"),O.multi.displayNickname.innerText=S.multiplayer.nickname):n==="join"?O.multi.stepJoin.classList.remove("hidden"):n==="active"&&(O.multi.stepActive.classList.remove("hidden"),O.multi.activeRoomCode.innerText=S.multiplayer.roomCode,Kh())}function jh(){let n=O.multi.nicknameInput.value.trim();if(n){if(S.multiplayer.nickname=n,localStorage.setItem("sb_nickname",n),S.multiplayer.roomCode){let t=me(pe,"rooms",S.multiplayer.roomCode);pn(t,{[`players.${S.playerId}.nickname`]:n}).catch(e=>console.warn("Nickname update failed:",e))}S.multiplayer.step="menu",yn(),ge()}}function cg(){confirm("Leave?")&&(S.multiplayer.roomCode=null,S.multiplayer.step="menu",Xt(),location.reload())}function $h(){let n=prompt("New nickname:",S.multiplayer.nickname);if(n&&n.trim()){let t=n.trim();if(S.multiplayer.nickname=t,Xt(),S.multiplayer.roomCode){let e=me(pe,"rooms",S.multiplayer.roomCode);pn(e,{[`players.${S.playerId}.nickname`]:t}).catch(r=>console.warn("Nickname update failed:",r))}yn(),ge()}}function ug(n){S.multiplayer.roomCode&&pn(me(pe,"rooms",S.multiplayer.roomCode),{[`foundWords.${n}`]:S.playerId})}function Wh(n){S.multiplayer.roomCode&&pn(me(pe,"rooms",S.multiplayer.roomCode),{puzzleId:n,foundWords:{}})}function Hh(){S.multiplayer.roomCode?(O.multi.banner.classList.remove("hidden"),O.multi.bannerRoomCode.innerText=S.multiplayer.roomCode):O.multi.banner.classList.add("hidden")}function lg(){if(!S.puzzle)return;let n=S.puzzle.letters.slice(1);for(let t=n.length-1;t>0;t--){let e=Math.floor(Math.random()*(t+1));[n[t],n[e]]=[n[e],n[t]]}O.cells.outer.forEach((t,e)=>{t.textContent=n[e].toUpperCase(),t.dataset.letter=n[e]})}})();
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
