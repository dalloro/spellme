(()=>{var Wc=()=>{};var Xc=function(n){let t=[],e=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?t[e++]=i:i<2048?(t[e++]=i>>6|192,t[e++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=i>>18|240,t[e++]=i>>12&63|128,t[e++]=i>>6&63|128,t[e++]=i&63|128):(t[e++]=i>>12|224,t[e++]=i>>6&63|128,t[e++]=i&63|128)}return t},Ld=function(n){let t=[],e=0,r=0;for(;e<n.length;){let i=n[e++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){let o=n[e++];t[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){let o=n[e++],a=n[e++],u=n[e++],h=((i&7)<<18|(o&63)<<12|(a&63)<<6|u&63)-65536;t[r++]=String.fromCharCode(55296+(h>>10)),t[r++]=String.fromCharCode(56320+(h&1023))}else{let o=n[e++],a=n[e++];t[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|a&63)}}return t.join("")},Jc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){let o=n[i],a=i+1<n.length,u=a?n[i+1]:0,h=i+2<n.length,f=h?n[i+2]:0,p=o>>2,_=(o&3)<<4|u>>4,v=(u&15)<<2|f>>6,R=f&63;h||(R=64,a||(v=64)),r.push(e[p],e[_],e[v],e[R])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(Xc(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Ld(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();let e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){let o=e[n.charAt(i++)],u=i<n.length?e[n.charAt(i)]:0;++i;let f=i<n.length?e[n.charAt(i)]:64;++i;let _=i<n.length?e[n.charAt(i)]:64;if(++i,o==null||u==null||f==null||_==null)throw new as;let v=o<<2|u>>4;if(r.push(v),f!==64){let R=u<<4&240|f>>2;if(r.push(R),_!==64){let D=f<<6&192|_;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},as=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Md=function(n){let t=Xc(n);return Jc.encodeByteArray(t,!0)},Bn=function(n){return Md(n).replace(/\./g,"")},Yc=function(n){try{return Jc.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};function Zc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var Fd=()=>Zc().__FIREBASE_DEFAULTS__,Bd=()=>{if(typeof process>"u"||typeof process.env>"u")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Ud=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let t=n&&Yc(n[1]);return t&&JSON.parse(t)},cs=()=>{try{return Wc()||Fd()||Bd()||Ud()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},qd=n=>{var t,e;return(e=(t=cs())===null||t===void 0?void 0:t.emulatorHosts)===null||e===void 0?void 0:e[n]},tu=n=>{let t=qd(n);if(!t)return;let e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);let r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},us=()=>{var n;return(n=cs())===null||n===void 0?void 0:n.config};var Vr=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}};function Nr(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function eu(n){return(await fetch(n,{credentials:"include"})).ok}function nu(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let e={alg:"none",type:"JWT"},r=t||"demo-project",i=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Bn(JSON.stringify(e)),Bn(JSON.stringify(a)),""].join(".")}var Fn={};function zd(){let n={prod:[],emulator:[]};for(let t of Object.keys(Fn))Fn[t]?n.emulator.push(t):n.prod.push(t);return n}function jd(n){let t=document.getElementById(n),e=!1;return t||(t=document.createElement("div"),t.setAttribute("id",n),e=!0),{created:e,element:t}}var Hc=!1;function ru(n,t){if(typeof window>"u"||typeof document>"u"||!Nr(window.location.host)||Fn[n]===t||Fn[n]||Hc)return;Fn[n]=t;function e(v){return`__firebase__banner__${v}`}let r="__firebase__banner",o=zd().prod.length>0;function a(){let v=document.getElementById(r);v&&v.remove()}function u(v){v.style.display="flex",v.style.background="#7faaf0",v.style.position="fixed",v.style.bottom="5px",v.style.left="5px",v.style.padding=".5em",v.style.borderRadius="5px",v.style.alignItems="center"}function h(v,R){v.setAttribute("width","24"),v.setAttribute("id",R),v.setAttribute("height","24"),v.setAttribute("viewBox","0 0 24 24"),v.setAttribute("fill","none"),v.style.marginLeft="-6px"}function f(){let v=document.createElement("span");return v.style.cursor="pointer",v.style.marginLeft="16px",v.style.fontSize="24px",v.innerHTML=" &times;",v.onclick=()=>{Hc=!0,a()},v}function p(v,R){v.setAttribute("id",R),v.innerText="Learn more",v.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",v.setAttribute("target","__blank"),v.style.paddingLeft="5px",v.style.textDecoration="underline"}function _(){let v=jd(r),R=e("text"),D=document.getElementById(R)||document.createElement("span"),k=e("learnmore"),x=document.getElementById(k)||document.createElement("a"),z=e("preprendIcon"),q=document.getElementById(z)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(v.created){let $=v.element;u($),p(x,k);let tt=f();h(q,z),$.append(q,D,x,tt),document.body.appendChild($)}o?(D.innerText="Preview backend disconnected.",q.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
</defs>`,D.innerText="Preview backend running in this workspace."),D.setAttribute("id",R)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",_):_()}function iu(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function $d(){var n;let t=(n=cs())===null||n===void 0?void 0:n.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function su(){return!$d()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function ls(){try{return typeof indexedDB=="object"}catch{return!1}}function ou(){return new Promise((n,t)=>{try{let e=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{e=!1},i.onerror=()=>{var o;t(((o=i.error)===null||o===void 0?void 0:o.message)||"")}}catch(e){t(e)}})}var Gd="FirebaseError",$t=class n extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=Gd,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Un.prototype.create)}},Un=class{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){let r=e[0]||{},i=`${this.service}/${t}`,o=this.errors[t],a=o?Kd(o,r):"Error",u=`${this.serviceName}: ${a} (${i}).`;return new $t(i,u,r)}};function Kd(n,t){return n.replace(Wd,(e,r)=>{let i=t[r];return i!=null?String(i):`<${r}?>`})}var Wd=/\{\$([^}]+)}/g;function qe(n,t){if(n===t)return!0;let e=Object.keys(n),r=Object.keys(t);for(let i of e){if(!r.includes(i))return!1;let o=n[i],a=t[i];if(Qc(o)&&Qc(a)){if(!qe(o,a))return!1}else if(o!==a)return!1}for(let i of r)if(!e.includes(i))return!1;return!0}function Qc(n){return n!==null&&typeof n=="object"}var Sg=4*60*60*1e3;function Gt(n){return n&&n._delegate?n._delegate:n}var Kt=class{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}};var Ae="[DEFAULT]";var hs=class{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){let e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){let r=new Vr;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:e});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;let r=this.normalizeInstanceIdentifier(t?.identifier),i=(e=t?.optional)!==null&&e!==void 0?e:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(i)return null;throw o}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Qd(t))try{this.getOrInitializeService({instanceIdentifier:Ae})}catch{}for(let[e,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(e);try{let o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch{}}}}clearInstance(t=Ae){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){let t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Ae){return this.instances.has(t)}getOptions(t=Ae){return this.instancesOptions.get(t)||{}}initialize(t={}){let{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:e});for(let[o,a]of this.instancesDeferred.entries()){let u=this.normalizeInstanceIdentifier(o);r===u&&a.resolve(i)}return i}onInit(t,e){var r;let i=this.normalizeInstanceIdentifier(e),o=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;o.add(t),this.onInitCallbacks.set(i,o);let a=this.instances.get(i);return a&&t(a,i),()=>{o.delete(t)}}invokeOnInitCallbacks(t,e){let r=this.onInitCallbacks.get(e);if(r)for(let i of r)try{i(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Hd(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=Ae){return this.component?this.component.multipleInstances?t:Ae:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function Hd(n){return n===Ae?void 0:n}function Qd(n){return n.instantiationMode==="EAGER"}var kr=class{constructor(t){this.name=t,this.providers=new Map}addComponent(t){let e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);let e=new hs(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}};var Xd=[],K;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(K||(K={}));var Jd={debug:K.DEBUG,verbose:K.VERBOSE,info:K.INFO,warn:K.WARN,error:K.ERROR,silent:K.SILENT},Yd=K.INFO,Zd={[K.DEBUG]:"log",[K.VERBOSE]:"log",[K.INFO]:"info",[K.WARN]:"warn",[K.ERROR]:"error"},tf=(n,t,...e)=>{if(t<n.logLevel)return;let r=new Date().toISOString(),i=Zd[t];if(i)console[i](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)},ze=class{constructor(t){this.name=t,this._logLevel=Yd,this._logHandler=tf,this._userLogHandler=null,Xd.push(this)}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in K))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Jd[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,K.DEBUG,...t),this._logHandler(this,K.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,K.VERBOSE,...t),this._logHandler(this,K.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,K.INFO,...t),this._logHandler(this,K.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,K.WARN,...t),this._logHandler(this,K.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,K.ERROR,...t),this._logHandler(this,K.ERROR,...t)}};var ef=(n,t)=>t.some(e=>n instanceof e),au,cu;function nf(){return au||(au=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function rf(){return cu||(cu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var uu=new WeakMap,fs=new WeakMap,lu=new WeakMap,ds=new WeakMap,ps=new WeakMap;function sf(n){let t=new Promise((e,r)=>{let i=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{e(Dt(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",o),n.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&uu.set(e,n)}).catch(()=>{}),ps.set(t,n),t}function of(n){if(fs.has(n))return;let t=new Promise((e,r)=>{let i=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{e(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});fs.set(n,t)}var ms={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return fs.get(n);if(t==="objectStoreNames")return n.objectStoreNames||lu.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return Dt(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function hu(n){ms=n(ms)}function af(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){let r=n.call(Or(this),t,...e);return lu.set(r,t.sort?t.sort():[t]),Dt(r)}:rf().includes(n)?function(...t){return n.apply(Or(this),t),Dt(uu.get(this))}:function(...t){return Dt(n.apply(Or(this),t))}}function cf(n){return typeof n=="function"?af(n):(n instanceof IDBTransaction&&of(n),ef(n,nf())?new Proxy(n,ms):n)}function Dt(n){if(n instanceof IDBRequest)return sf(n);if(ds.has(n))return ds.get(n);let t=cf(n);return t!==n&&(ds.set(n,t),ps.set(t,n)),t}var Or=n=>ps.get(n);function fu(n,t,{blocked:e,upgrade:r,blocking:i,terminated:o}={}){let a=indexedDB.open(n,t),u=Dt(a);return r&&a.addEventListener("upgradeneeded",h=>{r(Dt(a.result),h.oldVersion,h.newVersion,Dt(a.transaction),h)}),e&&a.addEventListener("blocked",h=>e(h.oldVersion,h.newVersion,h)),u.then(h=>{o&&h.addEventListener("close",()=>o()),i&&h.addEventListener("versionchange",f=>i(f.oldVersion,f.newVersion,f))}).catch(()=>{}),u}var uf=["get","getKey","getAll","getAllKeys","count"],lf=["put","add","delete","clear"],gs=new Map;function du(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(gs.get(t))return gs.get(t);let e=t.replace(/FromIndex$/,""),r=t!==e,i=lf.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(i||uf.includes(e)))return;let o=async function(a,...u){let h=this.transaction(a,i?"readwrite":"readonly"),f=h.store;return r&&(f=f.index(u.shift())),(await Promise.all([f[e](...u),i&&h.done]))[0]};return gs.set(t,o),o}hu(n=>({...n,get:(t,e,r)=>du(t,e)||n.get(t,e,r),has:(t,e)=>!!du(t,e)||n.has(t,e)}));var _s=class{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(hf(e)){let r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}};function hf(n){let t=n.getComponent();return t?.type==="VERSION"}var ws="@firebase/app",mu="0.13.2";var Wt=new ze("@firebase/app"),df="@firebase/app-compat",ff="@firebase/analytics-compat",mf="@firebase/analytics",pf="@firebase/app-check-compat",gf="@firebase/app-check",yf="@firebase/auth",_f="@firebase/auth-compat",wf="@firebase/database",vf="@firebase/data-connect",Ef="@firebase/database-compat",If="@firebase/functions",Tf="@firebase/functions-compat",bf="@firebase/installations",Af="@firebase/installations-compat",Sf="@firebase/messaging",Rf="@firebase/messaging-compat",Cf="@firebase/performance",Pf="@firebase/performance-compat",Df="@firebase/remote-config",xf="@firebase/remote-config-compat",Vf="@firebase/storage",Nf="@firebase/storage-compat",kf="@firebase/firestore",Of="@firebase/ai",Lf="@firebase/firestore-compat",Mf="firebase",Ff="11.10.0";var vs="[DEFAULT]",Bf={[ws]:"fire-core",[df]:"fire-core-compat",[mf]:"fire-analytics",[ff]:"fire-analytics-compat",[gf]:"fire-app-check",[pf]:"fire-app-check-compat",[yf]:"fire-auth",[_f]:"fire-auth-compat",[wf]:"fire-rtdb",[vf]:"fire-data-connect",[Ef]:"fire-rtdb-compat",[If]:"fire-fn",[Tf]:"fire-fn-compat",[bf]:"fire-iid",[Af]:"fire-iid-compat",[Sf]:"fire-fcm",[Rf]:"fire-fcm-compat",[Cf]:"fire-perf",[Pf]:"fire-perf-compat",[Df]:"fire-rc",[xf]:"fire-rc-compat",[Vf]:"fire-gcs",[Nf]:"fire-gcs-compat",[kf]:"fire-fst",[Lf]:"fire-fst-compat",[Of]:"fire-vertex","fire-js":"fire-js",[Mf]:"fire-js-all"};var Lr=new Map,Uf=new Map,Es=new Map;function pu(n,t){try{n.container.addComponent(t)}catch(e){Wt.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function qn(n){let t=n.name;if(Es.has(t))return Wt.debug(`There were multiple attempts to register component ${t}.`),!1;Es.set(t,n);for(let e of Lr.values())pu(e,n);for(let e of Uf.values())pu(e,n);return!0}function wu(n,t){let e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function vu(n){return n==null?!1:n.settings!==void 0}var qf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},oe=new Un("app","Firebase",qf);var Is=class{constructor(t,e,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Kt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw oe.create("app-deleted",{appName:this._name})}};var Eu=Ff;function As(n,t={}){let e=n;typeof t!="object"&&(t={name:t});let r=Object.assign({name:vs,automaticDataCollectionEnabled:!0},t),i=r.name;if(typeof i!="string"||!i)throw oe.create("bad-app-name",{appName:String(i)});if(e||(e=us()),!e)throw oe.create("no-options");let o=Lr.get(i);if(o){if(qe(e,o.options)&&qe(r,o.config))return o;throw oe.create("duplicate-app",{appName:i})}let a=new kr(i);for(let h of Es.values())a.addComponent(h);let u=new Is(e,r,a);return Lr.set(i,u),u}function Iu(n=vs){let t=Lr.get(n);if(!t&&n===vs&&us())return As();if(!t)throw oe.create("no-app",{appName:n});return t}function ae(n,t,e){var r;let i=(r=Bf[n])!==null&&r!==void 0?r:n;e&&(i+=`-${e}`);let o=i.match(/\s|\//),a=t.match(/\s|\//);if(o||a){let u=[`Unable to register library "${i}" with version "${t}":`];o&&u.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&a&&u.push("and"),a&&u.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Wt.warn(u.join(" "));return}qn(new Kt(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}var zf="firebase-heartbeat-database",jf=1,zn="firebase-heartbeat-store",ys=null;function Tu(){return ys||(ys=fu(zf,jf,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(zn)}catch(e){console.warn(e)}}}}).catch(n=>{throw oe.create("idb-open",{originalErrorMessage:n.message})})),ys}async function $f(n){try{let e=(await Tu()).transaction(zn),r=await e.objectStore(zn).get(bu(n));return await e.done,r}catch(t){if(t instanceof $t)Wt.warn(t.message);else{let e=oe.create("idb-get",{originalErrorMessage:t?.message});Wt.warn(e.message)}}}async function gu(n,t){try{let r=(await Tu()).transaction(zn,"readwrite");await r.objectStore(zn).put(t,bu(n)),await r.done}catch(e){if(e instanceof $t)Wt.warn(e.message);else{let r=oe.create("idb-set",{originalErrorMessage:e?.message});Wt.warn(r.message)}}}function bu(n){return`${n.name}!${n.options.appId}`}var Gf=1024,Kf=30,Ts=class{constructor(t){this.container=t,this._heartbeatsCache=null;let e=this.container.getProvider("app").getImmediate();this._storage=new bs(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{let i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=yu();if(((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats.length>Kf){let a=Hf(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Wt.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let e=yu(),{heartbeatsToSend:r,unsentEntries:i}=Wf(this._heartbeatsCache.heartbeats),o=Bn(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return Wt.warn(e),""}}};function yu(){return new Date().toISOString().substring(0,10)}function Wf(n,t=Gf){let e=[],r=n.slice();for(let i of n){let o=e.find(a=>a.agent===i.agent);if(o){if(o.dates.push(i.date),_u(e)>t){o.dates.pop();break}}else if(e.push({agent:i.agent,dates:[i.date]}),_u(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}var bs=class{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ls()?ou().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let e=await $f(this.app);return e?.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){let i=await this.read();return gu(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:i.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var e;if(await this._canUseIndexedDBPromise){let i=await this.read();return gu(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...t.heartbeats]})}else return}};function _u(n){return Bn(JSON.stringify({version:2,heartbeats:n})).length}function Hf(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}function Qf(n){qn(new Kt("platform-logger",t=>new _s(t),"PRIVATE")),qn(new Kt("heartbeat",t=>new Ts(t),"PRIVATE")),ae(ws,mu,n),ae(ws,mu,"esm2017"),ae("fire-js","")}Qf("");var Xf="firebase",Jf="11.10.0";ae(Xf,Jf,"app");var Au=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Su={};var Ht,Ss;(function(){var n;function t(I,m){function y(){}y.prototype=m.prototype,I.D=m.prototype,I.prototype=new y,I.prototype.constructor=I,I.C=function(w,E,b){for(var g=Array(arguments.length-2),qt=2;qt<arguments.length;qt++)g[qt-2]=arguments[qt];return m.prototype[E].apply(w,g)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(r,e),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(I,m,y){y||(y=0);var w=Array(16);if(typeof m=="string")for(var E=0;16>E;++E)w[E]=m.charCodeAt(y++)|m.charCodeAt(y++)<<8|m.charCodeAt(y++)<<16|m.charCodeAt(y++)<<24;else for(E=0;16>E;++E)w[E]=m[y++]|m[y++]<<8|m[y++]<<16|m[y++]<<24;m=I.g[0],y=I.g[1],E=I.g[2];var b=I.g[3],g=m+(b^y&(E^b))+w[0]+3614090360&4294967295;m=y+(g<<7&4294967295|g>>>25),g=b+(E^m&(y^E))+w[1]+3905402710&4294967295,b=m+(g<<12&4294967295|g>>>20),g=E+(y^b&(m^y))+w[2]+606105819&4294967295,E=b+(g<<17&4294967295|g>>>15),g=y+(m^E&(b^m))+w[3]+3250441966&4294967295,y=E+(g<<22&4294967295|g>>>10),g=m+(b^y&(E^b))+w[4]+4118548399&4294967295,m=y+(g<<7&4294967295|g>>>25),g=b+(E^m&(y^E))+w[5]+1200080426&4294967295,b=m+(g<<12&4294967295|g>>>20),g=E+(y^b&(m^y))+w[6]+2821735955&4294967295,E=b+(g<<17&4294967295|g>>>15),g=y+(m^E&(b^m))+w[7]+4249261313&4294967295,y=E+(g<<22&4294967295|g>>>10),g=m+(b^y&(E^b))+w[8]+1770035416&4294967295,m=y+(g<<7&4294967295|g>>>25),g=b+(E^m&(y^E))+w[9]+2336552879&4294967295,b=m+(g<<12&4294967295|g>>>20),g=E+(y^b&(m^y))+w[10]+4294925233&4294967295,E=b+(g<<17&4294967295|g>>>15),g=y+(m^E&(b^m))+w[11]+2304563134&4294967295,y=E+(g<<22&4294967295|g>>>10),g=m+(b^y&(E^b))+w[12]+1804603682&4294967295,m=y+(g<<7&4294967295|g>>>25),g=b+(E^m&(y^E))+w[13]+4254626195&4294967295,b=m+(g<<12&4294967295|g>>>20),g=E+(y^b&(m^y))+w[14]+2792965006&4294967295,E=b+(g<<17&4294967295|g>>>15),g=y+(m^E&(b^m))+w[15]+1236535329&4294967295,y=E+(g<<22&4294967295|g>>>10),g=m+(E^b&(y^E))+w[1]+4129170786&4294967295,m=y+(g<<5&4294967295|g>>>27),g=b+(y^E&(m^y))+w[6]+3225465664&4294967295,b=m+(g<<9&4294967295|g>>>23),g=E+(m^y&(b^m))+w[11]+643717713&4294967295,E=b+(g<<14&4294967295|g>>>18),g=y+(b^m&(E^b))+w[0]+3921069994&4294967295,y=E+(g<<20&4294967295|g>>>12),g=m+(E^b&(y^E))+w[5]+3593408605&4294967295,m=y+(g<<5&4294967295|g>>>27),g=b+(y^E&(m^y))+w[10]+38016083&4294967295,b=m+(g<<9&4294967295|g>>>23),g=E+(m^y&(b^m))+w[15]+3634488961&4294967295,E=b+(g<<14&4294967295|g>>>18),g=y+(b^m&(E^b))+w[4]+3889429448&4294967295,y=E+(g<<20&4294967295|g>>>12),g=m+(E^b&(y^E))+w[9]+568446438&4294967295,m=y+(g<<5&4294967295|g>>>27),g=b+(y^E&(m^y))+w[14]+3275163606&4294967295,b=m+(g<<9&4294967295|g>>>23),g=E+(m^y&(b^m))+w[3]+4107603335&4294967295,E=b+(g<<14&4294967295|g>>>18),g=y+(b^m&(E^b))+w[8]+1163531501&4294967295,y=E+(g<<20&4294967295|g>>>12),g=m+(E^b&(y^E))+w[13]+2850285829&4294967295,m=y+(g<<5&4294967295|g>>>27),g=b+(y^E&(m^y))+w[2]+4243563512&4294967295,b=m+(g<<9&4294967295|g>>>23),g=E+(m^y&(b^m))+w[7]+1735328473&4294967295,E=b+(g<<14&4294967295|g>>>18),g=y+(b^m&(E^b))+w[12]+2368359562&4294967295,y=E+(g<<20&4294967295|g>>>12),g=m+(y^E^b)+w[5]+4294588738&4294967295,m=y+(g<<4&4294967295|g>>>28),g=b+(m^y^E)+w[8]+2272392833&4294967295,b=m+(g<<11&4294967295|g>>>21),g=E+(b^m^y)+w[11]+1839030562&4294967295,E=b+(g<<16&4294967295|g>>>16),g=y+(E^b^m)+w[14]+4259657740&4294967295,y=E+(g<<23&4294967295|g>>>9),g=m+(y^E^b)+w[1]+2763975236&4294967295,m=y+(g<<4&4294967295|g>>>28),g=b+(m^y^E)+w[4]+1272893353&4294967295,b=m+(g<<11&4294967295|g>>>21),g=E+(b^m^y)+w[7]+4139469664&4294967295,E=b+(g<<16&4294967295|g>>>16),g=y+(E^b^m)+w[10]+3200236656&4294967295,y=E+(g<<23&4294967295|g>>>9),g=m+(y^E^b)+w[13]+681279174&4294967295,m=y+(g<<4&4294967295|g>>>28),g=b+(m^y^E)+w[0]+3936430074&4294967295,b=m+(g<<11&4294967295|g>>>21),g=E+(b^m^y)+w[3]+3572445317&4294967295,E=b+(g<<16&4294967295|g>>>16),g=y+(E^b^m)+w[6]+76029189&4294967295,y=E+(g<<23&4294967295|g>>>9),g=m+(y^E^b)+w[9]+3654602809&4294967295,m=y+(g<<4&4294967295|g>>>28),g=b+(m^y^E)+w[12]+3873151461&4294967295,b=m+(g<<11&4294967295|g>>>21),g=E+(b^m^y)+w[15]+530742520&4294967295,E=b+(g<<16&4294967295|g>>>16),g=y+(E^b^m)+w[2]+3299628645&4294967295,y=E+(g<<23&4294967295|g>>>9),g=m+(E^(y|~b))+w[0]+4096336452&4294967295,m=y+(g<<6&4294967295|g>>>26),g=b+(y^(m|~E))+w[7]+1126891415&4294967295,b=m+(g<<10&4294967295|g>>>22),g=E+(m^(b|~y))+w[14]+2878612391&4294967295,E=b+(g<<15&4294967295|g>>>17),g=y+(b^(E|~m))+w[5]+4237533241&4294967295,y=E+(g<<21&4294967295|g>>>11),g=m+(E^(y|~b))+w[12]+1700485571&4294967295,m=y+(g<<6&4294967295|g>>>26),g=b+(y^(m|~E))+w[3]+2399980690&4294967295,b=m+(g<<10&4294967295|g>>>22),g=E+(m^(b|~y))+w[10]+4293915773&4294967295,E=b+(g<<15&4294967295|g>>>17),g=y+(b^(E|~m))+w[1]+2240044497&4294967295,y=E+(g<<21&4294967295|g>>>11),g=m+(E^(y|~b))+w[8]+1873313359&4294967295,m=y+(g<<6&4294967295|g>>>26),g=b+(y^(m|~E))+w[15]+4264355552&4294967295,b=m+(g<<10&4294967295|g>>>22),g=E+(m^(b|~y))+w[6]+2734768916&4294967295,E=b+(g<<15&4294967295|g>>>17),g=y+(b^(E|~m))+w[13]+1309151649&4294967295,y=E+(g<<21&4294967295|g>>>11),g=m+(E^(y|~b))+w[4]+4149444226&4294967295,m=y+(g<<6&4294967295|g>>>26),g=b+(y^(m|~E))+w[11]+3174756917&4294967295,b=m+(g<<10&4294967295|g>>>22),g=E+(m^(b|~y))+w[2]+718787259&4294967295,E=b+(g<<15&4294967295|g>>>17),g=y+(b^(E|~m))+w[9]+3951481745&4294967295,I.g[0]=I.g[0]+m&4294967295,I.g[1]=I.g[1]+(E+(g<<21&4294967295|g>>>11))&4294967295,I.g[2]=I.g[2]+E&4294967295,I.g[3]=I.g[3]+b&4294967295}r.prototype.u=function(I,m){m===void 0&&(m=I.length);for(var y=m-this.blockSize,w=this.B,E=this.h,b=0;b<m;){if(E==0)for(;b<=y;)i(this,I,b),b+=this.blockSize;if(typeof I=="string"){for(;b<m;)if(w[E++]=I.charCodeAt(b++),E==this.blockSize){i(this,w),E=0;break}}else for(;b<m;)if(w[E++]=I[b++],E==this.blockSize){i(this,w),E=0;break}}this.h=E,this.o+=m},r.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var m=1;m<I.length-8;++m)I[m]=0;var y=8*this.o;for(m=I.length-8;m<I.length;++m)I[m]=y&255,y/=256;for(this.u(I),I=Array(16),m=y=0;4>m;++m)for(var w=0;32>w;w+=8)I[y++]=this.g[m]>>>w&255;return I};function o(I,m){var y=u;return Object.prototype.hasOwnProperty.call(y,I)?y[I]:y[I]=m(I)}function a(I,m){this.h=m;for(var y=[],w=!0,E=I.length-1;0<=E;E--){var b=I[E]|0;w&&b==m||(y[E]=b,w=!1)}this.g=y}var u={};function h(I){return-128<=I&&128>I?o(I,function(m){return new a([m|0],0>m?-1:0)}):new a([I|0],0>I?-1:0)}function f(I){if(isNaN(I)||!isFinite(I))return _;if(0>I)return x(f(-I));for(var m=[],y=1,w=0;I>=y;w++)m[w]=I/y|0,y*=4294967296;return new a(m,0)}function p(I,m){if(I.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(I.charAt(0)=="-")return x(p(I.substring(1),m));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=f(Math.pow(m,8)),w=_,E=0;E<I.length;E+=8){var b=Math.min(8,I.length-E),g=parseInt(I.substring(E,E+b),m);8>b?(b=f(Math.pow(m,b)),w=w.j(b).add(f(g))):(w=w.j(y),w=w.add(f(g)))}return w}var _=h(0),v=h(1),R=h(16777216);n=a.prototype,n.m=function(){if(k(this))return-x(this).m();for(var I=0,m=1,y=0;y<this.g.length;y++){var w=this.i(y);I+=(0<=w?w:4294967296+w)*m,m*=4294967296}return I},n.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(D(this))return"0";if(k(this))return"-"+x(this).toString(I);for(var m=f(Math.pow(I,6)),y=this,w="";;){var E=tt(y,m).g;y=z(y,E.j(m));var b=((0<y.g.length?y.g[0]:y.h)>>>0).toString(I);if(y=E,D(y))return b+w;for(;6>b.length;)b="0"+b;w=b+w}},n.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function D(I){if(I.h!=0)return!1;for(var m=0;m<I.g.length;m++)if(I.g[m]!=0)return!1;return!0}function k(I){return I.h==-1}n.l=function(I){return I=z(this,I),k(I)?-1:D(I)?0:1};function x(I){for(var m=I.g.length,y=[],w=0;w<m;w++)y[w]=~I.g[w];return new a(y,~I.h).add(v)}n.abs=function(){return k(this)?x(this):this},n.add=function(I){for(var m=Math.max(this.g.length,I.g.length),y=[],w=0,E=0;E<=m;E++){var b=w+(this.i(E)&65535)+(I.i(E)&65535),g=(b>>>16)+(this.i(E)>>>16)+(I.i(E)>>>16);w=g>>>16,b&=65535,g&=65535,y[E]=g<<16|b}return new a(y,y[y.length-1]&-2147483648?-1:0)};function z(I,m){return I.add(x(m))}n.j=function(I){if(D(this)||D(I))return _;if(k(this))return k(I)?x(this).j(x(I)):x(x(this).j(I));if(k(I))return x(this.j(x(I)));if(0>this.l(R)&&0>I.l(R))return f(this.m()*I.m());for(var m=this.g.length+I.g.length,y=[],w=0;w<2*m;w++)y[w]=0;for(w=0;w<this.g.length;w++)for(var E=0;E<I.g.length;E++){var b=this.i(w)>>>16,g=this.i(w)&65535,qt=I.i(E)>>>16,wn=I.i(E)&65535;y[2*w+2*E]+=g*wn,q(y,2*w+2*E),y[2*w+2*E+1]+=b*wn,q(y,2*w+2*E+1),y[2*w+2*E+1]+=g*qt,q(y,2*w+2*E+1),y[2*w+2*E+2]+=b*qt,q(y,2*w+2*E+2)}for(w=0;w<m;w++)y[w]=y[2*w+1]<<16|y[2*w];for(w=m;w<2*m;w++)y[w]=0;return new a(y,0)};function q(I,m){for(;(I[m]&65535)!=I[m];)I[m+1]+=I[m]>>>16,I[m]&=65535,m++}function $(I,m){this.g=I,this.h=m}function tt(I,m){if(D(m))throw Error("division by zero");if(D(I))return new $(_,_);if(k(I))return m=tt(x(I),m),new $(x(m.g),x(m.h));if(k(m))return m=tt(I,x(m)),new $(x(m.g),m.h);if(30<I.g.length){if(k(I)||k(m))throw Error("slowDivide_ only works with positive integers.");for(var y=v,w=m;0>=w.l(I);)y=At(y),w=At(w);var E=J(y,1),b=J(w,1);for(w=J(w,2),y=J(y,2);!D(w);){var g=b.add(w);0>=g.l(I)&&(E=E.add(y),b=g),w=J(w,1),y=J(y,1)}return m=z(I,E.j(m)),new $(E,m)}for(E=_;0<=I.l(m);){for(y=Math.max(1,Math.floor(I.m()/m.m())),w=Math.ceil(Math.log(y)/Math.LN2),w=48>=w?1:Math.pow(2,w-48),b=f(y),g=b.j(m);k(g)||0<g.l(I);)y-=w,b=f(y),g=b.j(m);D(b)&&(b=v),E=E.add(b),I=z(I,g)}return new $(E,I)}n.A=function(I){return tt(this,I).h},n.and=function(I){for(var m=Math.max(this.g.length,I.g.length),y=[],w=0;w<m;w++)y[w]=this.i(w)&I.i(w);return new a(y,this.h&I.h)},n.or=function(I){for(var m=Math.max(this.g.length,I.g.length),y=[],w=0;w<m;w++)y[w]=this.i(w)|I.i(w);return new a(y,this.h|I.h)},n.xor=function(I){for(var m=Math.max(this.g.length,I.g.length),y=[],w=0;w<m;w++)y[w]=this.i(w)^I.i(w);return new a(y,this.h^I.h)};function At(I){for(var m=I.g.length+1,y=[],w=0;w<m;w++)y[w]=I.i(w)<<1|I.i(w-1)>>>31;return new a(y,I.h)}function J(I,m){var y=m>>5;m%=32;for(var w=I.g.length-y,E=[],b=0;b<w;b++)E[b]=0<m?I.i(b+y)>>>m|I.i(b+y+1)<<32-m:I.i(b+y);return new a(E,I.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Ss=Su.Md5=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=p,Ht=Su.Integer=a}).apply(typeof Au<"u"?Au:typeof self<"u"?self:typeof window<"u"?window:{});var Mr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Qt={};var Rs,Yf,je,Cs,jn,Fr,Ps,Ds,xs;(function(){var n,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(s,c,l){return s==Array.prototype||s==Object.prototype||(s[c]=l.value),s};function e(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof Mr=="object"&&Mr];for(var c=0;c<s.length;++c){var l=s[c];if(l&&l.Math==Math)return l}throw Error("Cannot find global object")}var r=e(this);function i(s,c){if(c)t:{var l=r;s=s.split(".");for(var d=0;d<s.length-1;d++){var T=s[d];if(!(T in l))break t;l=l[T]}s=s[s.length-1],d=l[s],c=c(d),c!=d&&c!=null&&t(l,s,{configurable:!0,writable:!0,value:c})}}function o(s,c){s instanceof String&&(s+="");var l=0,d=!1,T={next:function(){if(!d&&l<s.length){var A=l++;return{value:c(A,s[A]),done:!1}}return d=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}i("Array.prototype.values",function(s){return s||function(){return o(this,function(c,l){return l})}});var a=a||{},u=this||self;function h(s){var c=typeof s;return c=c!="object"?c:s?Array.isArray(s)?"array":c:"null",c=="array"||c=="object"&&typeof s.length=="number"}function f(s){var c=typeof s;return c=="object"&&s!=null||c=="function"}function p(s,c,l){return s.call.apply(s.bind,arguments)}function _(s,c,l){if(!s)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,d),s.apply(c,T)}}return function(){return s.apply(c,arguments)}}function v(s,c,l){return v=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:_,v.apply(null,arguments)}function R(s,c){var l=Array.prototype.slice.call(arguments,1);return function(){var d=l.slice();return d.push.apply(d,arguments),s.apply(this,d)}}function D(s,c){function l(){}l.prototype=c.prototype,s.aa=c.prototype,s.prototype=new l,s.prototype.constructor=s,s.Qb=function(d,T,A){for(var V=Array(arguments.length-2),X=2;X<arguments.length;X++)V[X-2]=arguments[X];return c.prototype[T].apply(d,V)}}function k(s){let c=s.length;if(0<c){let l=Array(c);for(let d=0;d<c;d++)l[d]=s[d];return l}return[]}function x(s,c){for(let l=1;l<arguments.length;l++){let d=arguments[l];if(h(d)){let T=s.length||0,A=d.length||0;s.length=T+A;for(let V=0;V<A;V++)s[T+V]=d[V]}else s.push(d)}}class z{constructor(c,l){this.i=c,this.j=l,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function q(s){return/^[\s\xa0]*$/.test(s)}function $(){var s=u.navigator;return s&&(s=s.userAgent)?s:""}function tt(s){return tt[" "](s),s}tt[" "]=function(){};var At=$().indexOf("Gecko")!=-1&&!($().toLowerCase().indexOf("webkit")!=-1&&$().indexOf("Edge")==-1)&&!($().indexOf("Trident")!=-1||$().indexOf("MSIE")!=-1)&&$().indexOf("Edge")==-1;function J(s,c,l){for(let d in s)c.call(l,s[d],d,s)}function I(s,c){for(let l in s)c.call(void 0,s[l],l,s)}function m(s){let c={};for(let l in s)c[l]=s[l];return c}let y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function w(s,c){let l,d;for(let T=1;T<arguments.length;T++){d=arguments[T];for(l in d)s[l]=d[l];for(let A=0;A<y.length;A++)l=y[A],Object.prototype.hasOwnProperty.call(d,l)&&(s[l]=d[l])}}function E(s){var c=1;s=s.split(":");let l=[];for(;0<c&&s.length;)l.push(s.shift()),c--;return s.length&&l.push(s.join(":")),l}function b(s){u.setTimeout(()=>{throw s},0)}function g(){var s=Li;let c=null;return s.g&&(c=s.g,s.g=s.g.next,s.g||(s.h=null),c.next=null),c}class qt{constructor(){this.h=this.g=null}add(c,l){let d=wn.get();d.set(c,l),this.h?this.h.next=d:this.g=d,this.h=d}}var wn=new z(()=>new nd,s=>s.reset());class nd{constructor(){this.next=this.g=this.h=null}set(c,l){this.h=c,this.g=l,this.next=null}reset(){this.next=this.g=this.h=null}}let vn,En=!1,Li=new qt,Ka=()=>{let s=u.Promise.resolve(void 0);vn=()=>{s.then(rd)}};var rd=()=>{for(var s;s=g();){try{s.h.call(s.g)}catch(l){b(l)}var c=wn;c.j(s),100>c.h&&(c.h++,s.next=c.g,c.g=s)}En=!1};function ne(){this.s=this.s,this.C=this.C}ne.prototype.s=!1,ne.prototype.ma=function(){this.s||(this.s=!0,this.N())},ne.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ft(s,c){this.type=s,this.g=this.target=c,this.defaultPrevented=!1}ft.prototype.h=function(){this.defaultPrevented=!0};var id=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var s=!1,c=Object.defineProperty({},"passive",{get:function(){s=!0}});try{let l=()=>{};u.addEventListener("test",l,c),u.removeEventListener("test",l,c)}catch{}return s}();function In(s,c){if(ft.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s){var l=this.type=s.type,d=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;if(this.target=s.target||s.srcElement,this.g=c,c=s.relatedTarget){if(At){t:{try{tt(c.nodeName);var T=!0;break t}catch{}T=!1}T||(c=null)}}else l=="mouseover"?c=s.fromElement:l=="mouseout"&&(c=s.toElement);this.relatedTarget=c,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=typeof s.pointerType=="string"?s.pointerType:sd[s.pointerType]||"",this.state=s.state,this.i=s,s.defaultPrevented&&In.aa.h.call(this)}}D(In,ft);var sd={2:"touch",3:"pen",4:"mouse"};In.prototype.h=function(){In.aa.h.call(this);var s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var Tn="closure_listenable_"+(1e6*Math.random()|0),od=0;function ad(s,c,l,d,T){this.listener=s,this.proxy=null,this.src=c,this.type=l,this.capture=!!d,this.ha=T,this.key=++od,this.da=this.fa=!1}function pr(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function gr(s){this.src=s,this.g={},this.h=0}gr.prototype.add=function(s,c,l,d,T){var A=s.toString();s=this.g[A],s||(s=this.g[A]=[],this.h++);var V=Fi(s,c,d,T);return-1<V?(c=s[V],l||(c.fa=!1)):(c=new ad(c,this.src,A,!!d,T),c.fa=l,s.push(c)),c};function Mi(s,c){var l=c.type;if(l in s.g){var d=s.g[l],T=Array.prototype.indexOf.call(d,c,void 0),A;(A=0<=T)&&Array.prototype.splice.call(d,T,1),A&&(pr(c),s.g[l].length==0&&(delete s.g[l],s.h--))}}function Fi(s,c,l,d){for(var T=0;T<s.length;++T){var A=s[T];if(!A.da&&A.listener==c&&A.capture==!!l&&A.ha==d)return T}return-1}var Bi="closure_lm_"+(1e6*Math.random()|0),Ui={};function Wa(s,c,l,d,T){if(d&&d.once)return Qa(s,c,l,d,T);if(Array.isArray(c)){for(var A=0;A<c.length;A++)Wa(s,c[A],l,d,T);return null}return l=$i(l),s&&s[Tn]?s.K(c,l,f(d)?!!d.capture:!!d,T):Ha(s,c,l,!1,d,T)}function Ha(s,c,l,d,T,A){if(!c)throw Error("Invalid event type");var V=f(T)?!!T.capture:!!T,X=zi(s);if(X||(s[Bi]=X=new gr(s)),l=X.add(c,l,d,V,A),l.proxy)return l;if(d=cd(),l.proxy=d,d.src=s,d.listener=l,s.addEventListener)id||(T=V),T===void 0&&(T=!1),s.addEventListener(c.toString(),d,T);else if(s.attachEvent)s.attachEvent(Ja(c.toString()),d);else if(s.addListener&&s.removeListener)s.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return l}function cd(){function s(l){return c.call(s.src,s.listener,l)}let c=ud;return s}function Qa(s,c,l,d,T){if(Array.isArray(c)){for(var A=0;A<c.length;A++)Qa(s,c[A],l,d,T);return null}return l=$i(l),s&&s[Tn]?s.L(c,l,f(d)?!!d.capture:!!d,T):Ha(s,c,l,!0,d,T)}function Xa(s,c,l,d,T){if(Array.isArray(c))for(var A=0;A<c.length;A++)Xa(s,c[A],l,d,T);else d=f(d)?!!d.capture:!!d,l=$i(l),s&&s[Tn]?(s=s.i,c=String(c).toString(),c in s.g&&(A=s.g[c],l=Fi(A,l,d,T),-1<l&&(pr(A[l]),Array.prototype.splice.call(A,l,1),A.length==0&&(delete s.g[c],s.h--)))):s&&(s=zi(s))&&(c=s.g[c.toString()],s=-1,c&&(s=Fi(c,l,d,T)),(l=-1<s?c[s]:null)&&qi(l))}function qi(s){if(typeof s!="number"&&s&&!s.da){var c=s.src;if(c&&c[Tn])Mi(c.i,s);else{var l=s.type,d=s.proxy;c.removeEventListener?c.removeEventListener(l,d,s.capture):c.detachEvent?c.detachEvent(Ja(l),d):c.addListener&&c.removeListener&&c.removeListener(d),(l=zi(c))?(Mi(l,s),l.h==0&&(l.src=null,c[Bi]=null)):pr(s)}}}function Ja(s){return s in Ui?Ui[s]:Ui[s]="on"+s}function ud(s,c){if(s.da)s=!0;else{c=new In(c,this);var l=s.listener,d=s.ha||s.src;s.fa&&qi(s),s=l.call(d,c)}return s}function zi(s){return s=s[Bi],s instanceof gr?s:null}var ji="__closure_events_fn_"+(1e9*Math.random()>>>0);function $i(s){return typeof s=="function"?s:(s[ji]||(s[ji]=function(c){return s.handleEvent(c)}),s[ji])}function mt(){ne.call(this),this.i=new gr(this),this.M=this,this.F=null}D(mt,ne),mt.prototype[Tn]=!0,mt.prototype.removeEventListener=function(s,c,l,d){Xa(this,s,c,l,d)};function wt(s,c){var l,d=s.F;if(d)for(l=[];d;d=d.F)l.push(d);if(s=s.M,d=c.type||c,typeof c=="string")c=new ft(c,s);else if(c instanceof ft)c.target=c.target||s;else{var T=c;c=new ft(d,s),w(c,T)}if(T=!0,l)for(var A=l.length-1;0<=A;A--){var V=c.g=l[A];T=yr(V,d,!0,c)&&T}if(V=c.g=s,T=yr(V,d,!0,c)&&T,T=yr(V,d,!1,c)&&T,l)for(A=0;A<l.length;A++)V=c.g=l[A],T=yr(V,d,!1,c)&&T}mt.prototype.N=function(){if(mt.aa.N.call(this),this.i){var s=this.i,c;for(c in s.g){for(var l=s.g[c],d=0;d<l.length;d++)pr(l[d]);delete s.g[c],s.h--}}this.F=null},mt.prototype.K=function(s,c,l,d){return this.i.add(String(s),c,!1,l,d)},mt.prototype.L=function(s,c,l,d){return this.i.add(String(s),c,!0,l,d)};function yr(s,c,l,d){if(c=s.i.g[String(c)],!c)return!0;c=c.concat();for(var T=!0,A=0;A<c.length;++A){var V=c[A];if(V&&!V.da&&V.capture==l){var X=V.listener,ht=V.ha||V.src;V.fa&&Mi(s.i,V),T=X.call(ht,d)!==!1&&T}}return T&&!d.defaultPrevented}function Ya(s,c,l){if(typeof s=="function")l&&(s=v(s,l));else if(s&&typeof s.handleEvent=="function")s=v(s.handleEvent,s);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:u.setTimeout(s,c||0)}function Za(s){s.g=Ya(()=>{s.g=null,s.i&&(s.i=!1,Za(s))},s.l);let c=s.h;s.h=null,s.m.apply(null,c)}class ld extends ne{constructor(c,l){super(),this.m=c,this.l=l,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Za(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function bn(s){ne.call(this),this.h=s,this.g={}}D(bn,ne);var tc=[];function ec(s){J(s.g,function(c,l){this.g.hasOwnProperty(l)&&qi(c)},s),s.g={}}bn.prototype.N=function(){bn.aa.N.call(this),ec(this)},bn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Gi=u.JSON.stringify,hd=u.JSON.parse,dd=class{stringify(s){return u.JSON.stringify(s,void 0)}parse(s){return u.JSON.parse(s,void 0)}};function Ki(){}Ki.prototype.h=null;function nc(s){return s.h||(s.h=s.i())}function rc(){}var An={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Wi(){ft.call(this,"d")}D(Wi,ft);function Hi(){ft.call(this,"c")}D(Hi,ft);var Ee={},ic=null;function _r(){return ic=ic||new mt}Ee.La="serverreachability";function sc(s){ft.call(this,Ee.La,s)}D(sc,ft);function Sn(s){let c=_r();wt(c,new sc(c))}Ee.STAT_EVENT="statevent";function oc(s,c){ft.call(this,Ee.STAT_EVENT,s),this.stat=c}D(oc,ft);function vt(s){let c=_r();wt(c,new oc(c,s))}Ee.Ma="timingevent";function ac(s,c){ft.call(this,Ee.Ma,s),this.size=c}D(ac,ft);function Rn(s,c){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){s()},c)}function Cn(){this.g=!0}Cn.prototype.xa=function(){this.g=!1};function fd(s,c,l,d,T,A){s.info(function(){if(s.g)if(A)for(var V="",X=A.split("&"),ht=0;ht<X.length;ht++){var H=X[ht].split("=");if(1<H.length){var pt=H[0];H=H[1];var gt=pt.split("_");V=2<=gt.length&&gt[1]=="type"?V+(pt+"="+H+"&"):V+(pt+"=redacted&")}}else V=null;else V=A;return"XMLHTTP REQ ("+d+") [attempt "+T+"]: "+c+`
`+l+`
`+V})}function md(s,c,l,d,T,A,V){s.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+T+"]: "+c+`
`+l+`
`+A+" "+V})}function Me(s,c,l,d){s.info(function(){return"XMLHTTP TEXT ("+c+"): "+gd(s,l)+(d?" "+d:"")})}function pd(s,c){s.info(function(){return"TIMEOUT: "+c})}Cn.prototype.info=function(){};function gd(s,c){if(!s.g)return c;if(!c)return null;try{var l=JSON.parse(c);if(l){for(s=0;s<l.length;s++)if(Array.isArray(l[s])){var d=l[s];if(!(2>d.length)){var T=d[1];if(Array.isArray(T)&&!(1>T.length)){var A=T[0];if(A!="noop"&&A!="stop"&&A!="close")for(var V=1;V<T.length;V++)T[V]=""}}}}return Gi(l)}catch{return c}}var wr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},cc={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Qi;function vr(){}D(vr,Ki),vr.prototype.g=function(){return new XMLHttpRequest},vr.prototype.i=function(){return{}},Qi=new vr;function re(s,c,l,d){this.j=s,this.i=c,this.l=l,this.R=d||1,this.U=new bn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new uc}function uc(){this.i=null,this.g="",this.h=!1}var lc={},Xi={};function Ji(s,c,l){s.L=1,s.v=br(zt(c)),s.m=l,s.P=!0,hc(s,null)}function hc(s,c){s.F=Date.now(),Er(s),s.A=zt(s.v);var l=s.A,d=s.R;Array.isArray(d)||(d=[String(d)]),Ac(l.i,"t",d),s.C=0,l=s.j.J,s.h=new uc,s.g=jc(s.j,l?c:null,!s.m),0<s.O&&(s.M=new ld(v(s.Y,s,s.g),s.O)),c=s.U,l=s.g,d=s.ca;var T="readystatechange";Array.isArray(T)||(T&&(tc[0]=T.toString()),T=tc);for(var A=0;A<T.length;A++){var V=Wa(l,T[A],d||c.handleEvent,!1,c.h||c);if(!V)break;c.g[V.key]=V}c=s.H?m(s.H):{},s.m?(s.u||(s.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.A,s.u,s.m,c)):(s.u="GET",s.g.ea(s.A,s.u,null,c)),Sn(),fd(s.i,s.u,s.A,s.l,s.R,s.m)}re.prototype.ca=function(s){s=s.target;let c=this.M;c&&jt(s)==3?c.j():this.Y(s)},re.prototype.Y=function(s){try{if(s==this.g)t:{let gt=jt(this.g);var c=this.g.Ba();let Ue=this.g.Z();if(!(3>gt)&&(gt!=3||this.g&&(this.h.h||this.g.oa()||Vc(this.g)))){this.J||gt!=4||c==7||(c==8||0>=Ue?Sn(3):Sn(2)),Yi(this);var l=this.g.Z();this.X=l;e:if(dc(this)){var d=Vc(this.g);s="";var T=d.length,A=jt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Ie(this),Pn(this);var V="";break e}this.h.i=new u.TextDecoder}for(c=0;c<T;c++)this.h.h=!0,s+=this.h.i.decode(d[c],{stream:!(A&&c==T-1)});d.length=0,this.h.g+=s,this.C=0,V=this.h.g}else V=this.g.oa();if(this.o=l==200,md(this.i,this.u,this.A,this.l,this.R,gt,l),this.o){if(this.T&&!this.K){e:{if(this.g){var X,ht=this.g;if((X=ht.g?ht.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!q(X)){var H=X;break e}}H=null}if(l=H)Me(this.i,this.l,l,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Zi(this,l);else{this.o=!1,this.s=3,vt(12),Ie(this),Pn(this);break t}}if(this.P){l=!0;let Ct;for(;!this.J&&this.C<V.length;)if(Ct=yd(this,V),Ct==Xi){gt==4&&(this.s=4,vt(14),l=!1),Me(this.i,this.l,null,"[Incomplete Response]");break}else if(Ct==lc){this.s=4,vt(15),Me(this.i,this.l,V,"[Invalid Chunk]"),l=!1;break}else Me(this.i,this.l,Ct,null),Zi(this,Ct);if(dc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),gt!=4||V.length!=0||this.h.h||(this.s=1,vt(16),l=!1),this.o=this.o&&l,!l)Me(this.i,this.l,V,"[Invalid Chunked Response]"),Ie(this),Pn(this);else if(0<V.length&&!this.W){this.W=!0;var pt=this.j;pt.g==this&&pt.ba&&!pt.M&&(pt.j.info("Great, no buffering proxy detected. Bytes received: "+V.length),ss(pt),pt.M=!0,vt(11))}}else Me(this.i,this.l,V,null),Zi(this,V);gt==4&&Ie(this),this.o&&!this.J&&(gt==4?Bc(this.j,this):(this.o=!1,Er(this)))}else kd(this.g),l==400&&0<V.indexOf("Unknown SID")?(this.s=3,vt(12)):(this.s=0,vt(13)),Ie(this),Pn(this)}}}catch{}finally{}};function dc(s){return s.g?s.u=="GET"&&s.L!=2&&s.j.Ca:!1}function yd(s,c){var l=s.C,d=c.indexOf(`
`,l);return d==-1?Xi:(l=Number(c.substring(l,d)),isNaN(l)?lc:(d+=1,d+l>c.length?Xi:(c=c.slice(d,d+l),s.C=d+l,c)))}re.prototype.cancel=function(){this.J=!0,Ie(this)};function Er(s){s.S=Date.now()+s.I,fc(s,s.I)}function fc(s,c){if(s.B!=null)throw Error("WatchDog timer not null");s.B=Rn(v(s.ba,s),c)}function Yi(s){s.B&&(u.clearTimeout(s.B),s.B=null)}re.prototype.ba=function(){this.B=null;let s=Date.now();0<=s-this.S?(pd(this.i,this.A),this.L!=2&&(Sn(),vt(17)),Ie(this),this.s=2,Pn(this)):fc(this,this.S-s)};function Pn(s){s.j.G==0||s.J||Bc(s.j,s)}function Ie(s){Yi(s);var c=s.M;c&&typeof c.ma=="function"&&c.ma(),s.M=null,ec(s.U),s.g&&(c=s.g,s.g=null,c.abort(),c.ma())}function Zi(s,c){try{var l=s.j;if(l.G!=0&&(l.g==s||ts(l.h,s))){if(!s.K&&ts(l.h,s)&&l.G==3){try{var d=l.Da.g.parse(c)}catch{d=null}if(Array.isArray(d)&&d.length==3){var T=d;if(T[0]==0){t:if(!l.u){if(l.g)if(l.g.F+3e3<s.F)Pr(l),Rr(l);else break t;is(l),vt(18)}}else l.za=T[1],0<l.za-l.T&&37500>T[2]&&l.F&&l.v==0&&!l.C&&(l.C=Rn(v(l.Za,l),6e3));if(1>=gc(l.h)&&l.ca){try{l.ca()}catch{}l.ca=void 0}}else be(l,11)}else if((s.K||l.g==s)&&Pr(l),!q(c))for(T=l.Da.g.parse(c),c=0;c<T.length;c++){let H=T[c];if(l.T=H[0],H=H[1],l.G==2)if(H[0]=="c"){l.K=H[1],l.ia=H[2];let pt=H[3];pt!=null&&(l.la=pt,l.j.info("VER="+l.la));let gt=H[4];gt!=null&&(l.Aa=gt,l.j.info("SVER="+l.Aa));let Ue=H[5];Ue!=null&&typeof Ue=="number"&&0<Ue&&(d=1.5*Ue,l.L=d,l.j.info("backChannelRequestTimeoutMs_="+d)),d=l;let Ct=s.g;if(Ct){let xr=Ct.g?Ct.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(xr){var A=d.h;A.g||xr.indexOf("spdy")==-1&&xr.indexOf("quic")==-1&&xr.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(es(A,A.h),A.h=null))}if(d.D){let os=Ct.g?Ct.g.getResponseHeader("X-HTTP-Session-Id"):null;os&&(d.ya=os,Y(d.I,d.D,os))}}l.G=3,l.l&&l.l.ua(),l.ba&&(l.R=Date.now()-s.F,l.j.info("Handshake RTT: "+l.R+"ms")),d=l;var V=s;if(d.qa=zc(d,d.J?d.ia:null,d.W),V.K){yc(d.h,V);var X=V,ht=d.L;ht&&(X.I=ht),X.B&&(Yi(X),Er(X)),d.g=V}else Mc(d);0<l.i.length&&Cr(l)}else H[0]!="stop"&&H[0]!="close"||be(l,7);else l.G==3&&(H[0]=="stop"||H[0]=="close"?H[0]=="stop"?be(l,7):rs(l):H[0]!="noop"&&l.l&&l.l.ta(H),l.v=0)}}Sn(4)}catch{}}var _d=class{constructor(s,c){this.g=s,this.map=c}};function mc(s){this.l=s||10,u.PerformanceNavigationTiming?(s=u.performance.getEntriesByType("navigation"),s=0<s.length&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function pc(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function gc(s){return s.h?1:s.g?s.g.size:0}function ts(s,c){return s.h?s.h==c:s.g?s.g.has(c):!1}function es(s,c){s.g?s.g.add(c):s.h=c}function yc(s,c){s.h&&s.h==c?s.h=null:s.g&&s.g.has(c)&&s.g.delete(c)}mc.prototype.cancel=function(){if(this.i=_c(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let s of this.g.values())s.cancel();this.g.clear()}};function _c(s){if(s.h!=null)return s.i.concat(s.h.D);if(s.g!=null&&s.g.size!==0){let c=s.i;for(let l of s.g.values())c=c.concat(l.D);return c}return k(s.i)}function wd(s){if(s.V&&typeof s.V=="function")return s.V();if(typeof Map<"u"&&s instanceof Map||typeof Set<"u"&&s instanceof Set)return Array.from(s.values());if(typeof s=="string")return s.split("");if(h(s)){for(var c=[],l=s.length,d=0;d<l;d++)c.push(s[d]);return c}c=[],l=0;for(d in s)c[l++]=s[d];return c}function vd(s){if(s.na&&typeof s.na=="function")return s.na();if(!s.V||typeof s.V!="function"){if(typeof Map<"u"&&s instanceof Map)return Array.from(s.keys());if(!(typeof Set<"u"&&s instanceof Set)){if(h(s)||typeof s=="string"){var c=[];s=s.length;for(var l=0;l<s;l++)c.push(l);return c}c=[],l=0;for(let d in s)c[l++]=d;return c}}}function wc(s,c){if(s.forEach&&typeof s.forEach=="function")s.forEach(c,void 0);else if(h(s)||typeof s=="string")Array.prototype.forEach.call(s,c,void 0);else for(var l=vd(s),d=wd(s),T=d.length,A=0;A<T;A++)c.call(void 0,d[A],l&&l[A],s)}var vc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Ed(s,c){if(s){s=s.split("&");for(var l=0;l<s.length;l++){var d=s[l].indexOf("="),T=null;if(0<=d){var A=s[l].substring(0,d);T=s[l].substring(d+1)}else A=s[l];c(A,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function Te(s){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,s instanceof Te){this.h=s.h,Ir(this,s.j),this.o=s.o,this.g=s.g,Tr(this,s.s),this.l=s.l;var c=s.i,l=new Vn;l.i=c.i,c.g&&(l.g=new Map(c.g),l.h=c.h),Ec(this,l),this.m=s.m}else s&&(c=String(s).match(vc))?(this.h=!1,Ir(this,c[1]||"",!0),this.o=Dn(c[2]||""),this.g=Dn(c[3]||"",!0),Tr(this,c[4]),this.l=Dn(c[5]||"",!0),Ec(this,c[6]||"",!0),this.m=Dn(c[7]||"")):(this.h=!1,this.i=new Vn(null,this.h))}Te.prototype.toString=function(){var s=[],c=this.j;c&&s.push(xn(c,Ic,!0),":");var l=this.g;return(l||c=="file")&&(s.push("//"),(c=this.o)&&s.push(xn(c,Ic,!0),"@"),s.push(encodeURIComponent(String(l)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l=this.s,l!=null&&s.push(":",String(l))),(l=this.l)&&(this.g&&l.charAt(0)!="/"&&s.push("/"),s.push(xn(l,l.charAt(0)=="/"?bd:Td,!0))),(l=this.i.toString())&&s.push("?",l),(l=this.m)&&s.push("#",xn(l,Sd)),s.join("")};function zt(s){return new Te(s)}function Ir(s,c,l){s.j=l?Dn(c,!0):c,s.j&&(s.j=s.j.replace(/:$/,""))}function Tr(s,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);s.s=c}else s.s=null}function Ec(s,c,l){c instanceof Vn?(s.i=c,Rd(s.i,s.h)):(l||(c=xn(c,Ad)),s.i=new Vn(c,s.h))}function Y(s,c,l){s.i.set(c,l)}function br(s){return Y(s,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),s}function Dn(s,c){return s?c?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function xn(s,c,l){return typeof s=="string"?(s=encodeURI(s).replace(c,Id),l&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function Id(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var Ic=/[#\/\?@]/g,Td=/[#\?:]/g,bd=/[#\?]/g,Ad=/[#\?@]/g,Sd=/#/g;function Vn(s,c){this.h=this.g=null,this.i=s||null,this.j=!!c}function ie(s){s.g||(s.g=new Map,s.h=0,s.i&&Ed(s.i,function(c,l){s.add(decodeURIComponent(c.replace(/\+/g," ")),l)}))}n=Vn.prototype,n.add=function(s,c){ie(this),this.i=null,s=Fe(this,s);var l=this.g.get(s);return l||this.g.set(s,l=[]),l.push(c),this.h+=1,this};function Tc(s,c){ie(s),c=Fe(s,c),s.g.has(c)&&(s.i=null,s.h-=s.g.get(c).length,s.g.delete(c))}function bc(s,c){return ie(s),c=Fe(s,c),s.g.has(c)}n.forEach=function(s,c){ie(this),this.g.forEach(function(l,d){l.forEach(function(T){s.call(c,T,d,this)},this)},this)},n.na=function(){ie(this);let s=Array.from(this.g.values()),c=Array.from(this.g.keys()),l=[];for(let d=0;d<c.length;d++){let T=s[d];for(let A=0;A<T.length;A++)l.push(c[d])}return l},n.V=function(s){ie(this);let c=[];if(typeof s=="string")bc(this,s)&&(c=c.concat(this.g.get(Fe(this,s))));else{s=Array.from(this.g.values());for(let l=0;l<s.length;l++)c=c.concat(s[l])}return c},n.set=function(s,c){return ie(this),this.i=null,s=Fe(this,s),bc(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[c]),this.h+=1,this},n.get=function(s,c){return s?(s=this.V(s),0<s.length?String(s[0]):c):c};function Ac(s,c,l){Tc(s,c),0<l.length&&(s.i=null,s.g.set(Fe(s,c),k(l)),s.h+=l.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";let s=[],c=Array.from(this.g.keys());for(var l=0;l<c.length;l++){var d=c[l];let A=encodeURIComponent(String(d)),V=this.V(d);for(d=0;d<V.length;d++){var T=A;V[d]!==""&&(T+="="+encodeURIComponent(String(V[d]))),s.push(T)}}return this.i=s.join("&")};function Fe(s,c){return c=String(c),s.j&&(c=c.toLowerCase()),c}function Rd(s,c){c&&!s.j&&(ie(s),s.i=null,s.g.forEach(function(l,d){var T=d.toLowerCase();d!=T&&(Tc(this,d),Ac(this,T,l))},s)),s.j=c}function Cd(s,c){let l=new Cn;if(u.Image){let d=new Image;d.onload=R(se,l,"TestLoadImage: loaded",!0,c,d),d.onerror=R(se,l,"TestLoadImage: error",!1,c,d),d.onabort=R(se,l,"TestLoadImage: abort",!1,c,d),d.ontimeout=R(se,l,"TestLoadImage: timeout",!1,c,d),u.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=s}else c(!1)}function Pd(s,c){let l=new Cn,d=new AbortController,T=setTimeout(()=>{d.abort(),se(l,"TestPingServer: timeout",!1,c)},1e4);fetch(s,{signal:d.signal}).then(A=>{clearTimeout(T),A.ok?se(l,"TestPingServer: ok",!0,c):se(l,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(T),se(l,"TestPingServer: error",!1,c)})}function se(s,c,l,d,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),d(l)}catch{}}function Dd(){this.g=new dd}function xd(s,c,l){let d=l||"";try{wc(s,function(T,A){let V=T;f(T)&&(V=Gi(T)),c.push(d+A+"="+encodeURIComponent(V))})}catch(T){throw c.push(d+"type="+encodeURIComponent("_badmap")),T}}function Nn(s){this.l=s.Ub||null,this.j=s.eb||!1}D(Nn,Ki),Nn.prototype.g=function(){return new Ar(this.l,this.j)},Nn.prototype.i=function(s){return function(){return s}}({});function Ar(s,c){mt.call(this),this.D=s,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}D(Ar,mt),n=Ar.prototype,n.open=function(s,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=s,this.A=c,this.readyState=1,On(this)},n.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;let c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};s&&(c.body=s),(this.D||u).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,kn(this)),this.readyState=0},n.Sa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,On(this)),this.g&&(this.readyState=3,On(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Sc(this)}else s.text().then(this.Ra.bind(this),this.ga.bind(this))};function Sc(s){s.j.read().then(s.Pa.bind(s)).catch(s.ga.bind(s))}n.Pa=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var c=s.value?s.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!s.done}))&&(this.response=this.responseText+=c)}s.done?kn(this):On(this),this.readyState==3&&Sc(this)}},n.Ra=function(s){this.g&&(this.response=this.responseText=s,kn(this))},n.Qa=function(s){this.g&&(this.response=s,kn(this))},n.ga=function(){this.g&&kn(this)};function kn(s){s.readyState=4,s.l=null,s.j=null,s.v=null,On(s)}n.setRequestHeader=function(s,c){this.u.append(s,c)},n.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";let s=[],c=this.h.entries();for(var l=c.next();!l.done;)l=l.value,s.push(l[0]+": "+l[1]),l=c.next();return s.join(`\r
`)};function On(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(Ar.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function Rc(s){let c="";return J(s,function(l,d){c+=d,c+=":",c+=l,c+=`\r
`}),c}function ns(s,c,l){t:{for(d in l){var d=!1;break t}d=!0}d||(l=Rc(l),typeof s=="string"?l!=null&&encodeURIComponent(String(l)):Y(s,c,l))}function nt(s){mt.call(this),this.headers=new Map,this.o=s||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}D(nt,mt);var Vd=/^https?$/i,Nd=["POST","PUT"];n=nt.prototype,n.Ha=function(s){this.J=s},n.ea=function(s,c,l,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);c=c?c.toUpperCase():"GET",this.D=s,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Qi.g(),this.v=this.o?nc(this.o):nc(Qi),this.g.onreadystatechange=v(this.Ea,this);try{this.B=!0,this.g.open(c,String(s),!0),this.B=!1}catch(A){Cc(this,A);return}if(s=l||"",l=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var T in d)l.set(T,d[T]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(let A of d.keys())l.set(A,d.get(A));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(l.keys()).find(A=>A.toLowerCase()=="content-type"),T=u.FormData&&s instanceof u.FormData,!(0<=Array.prototype.indexOf.call(Nd,c,void 0))||d||T||l.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[A,V]of l)this.g.setRequestHeader(A,V);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{xc(this),this.u=!0,this.g.send(s),this.u=!1}catch(A){Cc(this,A)}};function Cc(s,c){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=c,s.m=5,Pc(s),Sr(s)}function Pc(s){s.A||(s.A=!0,wt(s,"complete"),wt(s,"error"))}n.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=s||7,wt(this,"complete"),wt(this,"abort"),Sr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Sr(this,!0)),nt.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Dc(this):this.bb())},n.bb=function(){Dc(this)};function Dc(s){if(s.h&&typeof a<"u"&&(!s.v[1]||jt(s)!=4||s.Z()!=2)){if(s.u&&jt(s)==4)Ya(s.Ea,0,s);else if(wt(s,"readystatechange"),jt(s)==4){s.h=!1;try{let V=s.Z();t:switch(V){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break t;default:c=!1}var l;if(!(l=c)){var d;if(d=V===0){var T=String(s.D).match(vc)[1]||null;!T&&u.self&&u.self.location&&(T=u.self.location.protocol.slice(0,-1)),d=!Vd.test(T?T.toLowerCase():"")}l=d}if(l)wt(s,"complete"),wt(s,"success");else{s.m=6;try{var A=2<jt(s)?s.g.statusText:""}catch{A=""}s.l=A+" ["+s.Z()+"]",Pc(s)}}finally{Sr(s)}}}}function Sr(s,c){if(s.g){xc(s);let l=s.g,d=s.v[0]?()=>{}:null;s.g=null,s.v=null,c||wt(s,"ready");try{l.onreadystatechange=d}catch{}}}function xc(s){s.I&&(u.clearTimeout(s.I),s.I=null)}n.isActive=function(){return!!this.g};function jt(s){return s.g?s.g.readyState:0}n.Z=function(){try{return 2<jt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(s){if(this.g){var c=this.g.responseText;return s&&c.indexOf(s)==0&&(c=c.substring(s.length)),hd(c)}};function Vc(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.H){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function kd(s){let c={};s=(s.g&&2<=jt(s)&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<s.length;d++){if(q(s[d]))continue;var l=E(s[d]);let T=l[0];if(l=l[1],typeof l!="string")continue;l=l.trim();let A=c[T]||[];c[T]=A,A.push(l)}I(c,function(d){return d.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ln(s,c,l){return l&&l.internalChannelParams&&l.internalChannelParams[s]||c}function Nc(s){this.Aa=0,this.i=[],this.j=new Cn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ln("failFast",!1,s),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ln("baseRetryDelayMs",5e3,s),this.cb=Ln("retryDelaySeedMs",1e4,s),this.Wa=Ln("forwardChannelMaxRetries",2,s),this.wa=Ln("forwardChannelRequestTimeoutMs",2e4,s),this.pa=s&&s.xmlHttpFactory||void 0,this.Xa=s&&s.Tb||void 0,this.Ca=s&&s.useFetchStreams||!1,this.L=void 0,this.J=s&&s.supportsCrossDomainXhr||!1,this.K="",this.h=new mc(s&&s.concurrentRequestLimit),this.Da=new Dd,this.P=s&&s.fastHandshake||!1,this.O=s&&s.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=s&&s.Rb||!1,s&&s.xa&&this.j.xa(),s&&s.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&s&&s.detectBufferingProxy||!1,this.ja=void 0,s&&s.longPollingTimeout&&0<s.longPollingTimeout&&(this.ja=s.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Nc.prototype,n.la=8,n.G=1,n.connect=function(s,c,l,d){vt(0),this.W=s,this.H=c||{},l&&d!==void 0&&(this.H.OSID=l,this.H.OAID=d),this.F=this.X,this.I=zc(this,null,this.W),Cr(this)};function rs(s){if(kc(s),s.G==3){var c=s.U++,l=zt(s.I);if(Y(l,"SID",s.K),Y(l,"RID",c),Y(l,"TYPE","terminate"),Mn(s,l),c=new re(s,s.j,c),c.L=2,c.v=br(zt(l)),l=!1,u.navigator&&u.navigator.sendBeacon)try{l=u.navigator.sendBeacon(c.v.toString(),"")}catch{}!l&&u.Image&&(new Image().src=c.v,l=!0),l||(c.g=jc(c.j,null),c.g.ea(c.v)),c.F=Date.now(),Er(c)}qc(s)}function Rr(s){s.g&&(ss(s),s.g.cancel(),s.g=null)}function kc(s){Rr(s),s.u&&(u.clearTimeout(s.u),s.u=null),Pr(s),s.h.cancel(),s.s&&(typeof s.s=="number"&&u.clearTimeout(s.s),s.s=null)}function Cr(s){if(!pc(s.h)&&!s.s){s.s=!0;var c=s.Ga;vn||Ka(),En||(vn(),En=!0),Li.add(c,s),s.B=0}}function Od(s,c){return gc(s.h)>=s.h.j-(s.s?1:0)?!1:s.s?(s.i=c.D.concat(s.i),!0):s.G==1||s.G==2||s.B>=(s.Va?0:s.Wa)?!1:(s.s=Rn(v(s.Ga,s,c),Uc(s,s.B)),s.B++,!0)}n.Ga=function(s){if(this.s)if(this.s=null,this.G==1){if(!s){this.U=Math.floor(1e5*Math.random()),s=this.U++;let T=new re(this,this.j,s),A=this.o;if(this.S&&(A?(A=m(A),w(A,this.S)):A=this.S),this.m!==null||this.O||(T.H=A,A=null),this.P)t:{for(var c=0,l=0;l<this.i.length;l++){e:{var d=this.i[l];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break e}d=void 0}if(d===void 0)break;if(c+=d,4096<c){c=l;break t}if(c===4096||l===this.i.length-1){c=l+1;break t}}c=1e3}else c=1e3;c=Lc(this,T,c),l=zt(this.I),Y(l,"RID",s),Y(l,"CVER",22),this.D&&Y(l,"X-HTTP-Session-Id",this.D),Mn(this,l),A&&(this.O?c="headers="+encodeURIComponent(String(Rc(A)))+"&"+c:this.m&&ns(l,this.m,A)),es(this.h,T),this.Ua&&Y(l,"TYPE","init"),this.P?(Y(l,"$req",c),Y(l,"SID","null"),T.T=!0,Ji(T,l,null)):Ji(T,l,c),this.G=2}}else this.G==3&&(s?Oc(this,s):this.i.length==0||pc(this.h)||Oc(this))};function Oc(s,c){var l;c?l=c.l:l=s.U++;let d=zt(s.I);Y(d,"SID",s.K),Y(d,"RID",l),Y(d,"AID",s.T),Mn(s,d),s.m&&s.o&&ns(d,s.m,s.o),l=new re(s,s.j,l,s.B+1),s.m===null&&(l.H=s.o),c&&(s.i=c.D.concat(s.i)),c=Lc(s,l,1e3),l.I=Math.round(.5*s.wa)+Math.round(.5*s.wa*Math.random()),es(s.h,l),Ji(l,d,c)}function Mn(s,c){s.H&&J(s.H,function(l,d){Y(c,d,l)}),s.l&&wc({},function(l,d){Y(c,d,l)})}function Lc(s,c,l){l=Math.min(s.i.length,l);var d=s.l?v(s.l.Na,s.l,s):null;t:{var T=s.i;let A=-1;for(;;){let V=["count="+l];A==-1?0<l?(A=T[0].g,V.push("ofs="+A)):A=0:V.push("ofs="+A);let X=!0;for(let ht=0;ht<l;ht++){let H=T[ht].g,pt=T[ht].map;if(H-=A,0>H)A=Math.max(0,T[ht].g-100),X=!1;else try{xd(pt,V,"req"+H+"_")}catch{d&&d(pt)}}if(X){d=V.join("&");break t}}}return s=s.i.splice(0,l),c.D=s,d}function Mc(s){if(!s.g&&!s.u){s.Y=1;var c=s.Fa;vn||Ka(),En||(vn(),En=!0),Li.add(c,s),s.v=0}}function is(s){return s.g||s.u||3<=s.v?!1:(s.Y++,s.u=Rn(v(s.Fa,s),Uc(s,s.v)),s.v++,!0)}n.Fa=function(){if(this.u=null,Fc(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var s=2*this.R;this.j.info("BP detection timer enabled: "+s),this.A=Rn(v(this.ab,this),s)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,vt(10),Rr(this),Fc(this))};function ss(s){s.A!=null&&(u.clearTimeout(s.A),s.A=null)}function Fc(s){s.g=new re(s,s.j,"rpc",s.Y),s.m===null&&(s.g.H=s.o),s.g.O=0;var c=zt(s.qa);Y(c,"RID","rpc"),Y(c,"SID",s.K),Y(c,"AID",s.T),Y(c,"CI",s.F?"0":"1"),!s.F&&s.ja&&Y(c,"TO",s.ja),Y(c,"TYPE","xmlhttp"),Mn(s,c),s.m&&s.o&&ns(c,s.m,s.o),s.L&&(s.g.I=s.L);var l=s.g;s=s.ia,l.L=1,l.v=br(zt(c)),l.m=null,l.P=!0,hc(l,s)}n.Za=function(){this.C!=null&&(this.C=null,Rr(this),is(this),vt(19))};function Pr(s){s.C!=null&&(u.clearTimeout(s.C),s.C=null)}function Bc(s,c){var l=null;if(s.g==c){Pr(s),ss(s),s.g=null;var d=2}else if(ts(s.h,c))l=c.D,yc(s.h,c),d=1;else return;if(s.G!=0){if(c.o)if(d==1){l=c.m?c.m.length:0,c=Date.now()-c.F;var T=s.B;d=_r(),wt(d,new ac(d,l)),Cr(s)}else Mc(s);else if(T=c.s,T==3||T==0&&0<c.X||!(d==1&&Od(s,c)||d==2&&is(s)))switch(l&&0<l.length&&(c=s.h,c.i=c.i.concat(l)),T){case 1:be(s,5);break;case 4:be(s,10);break;case 3:be(s,6);break;default:be(s,2)}}}function Uc(s,c){let l=s.Ta+Math.floor(Math.random()*s.cb);return s.isActive()||(l*=2),l*c}function be(s,c){if(s.j.info("Error code "+c),c==2){var l=v(s.fb,s),d=s.Xa;let T=!d;d=new Te(d||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||Ir(d,"https"),br(d),T?Cd(d.toString(),l):Pd(d.toString(),l)}else vt(2);s.G=0,s.l&&s.l.sa(c),qc(s),kc(s)}n.fb=function(s){s?(this.j.info("Successfully pinged google.com"),vt(2)):(this.j.info("Failed to ping google.com"),vt(1))};function qc(s){if(s.G=0,s.ka=[],s.l){let c=_c(s.h);(c.length!=0||s.i.length!=0)&&(x(s.ka,c),x(s.ka,s.i),s.h.i.length=0,k(s.i),s.i.length=0),s.l.ra()}}function zc(s,c,l){var d=l instanceof Te?zt(l):new Te(l);if(d.g!="")c&&(d.g=c+"."+d.g),Tr(d,d.s);else{var T=u.location;d=T.protocol,c=c?c+"."+T.hostname:T.hostname,T=+T.port;var A=new Te(null);d&&Ir(A,d),c&&(A.g=c),T&&Tr(A,T),l&&(A.l=l),d=A}return l=s.D,c=s.ya,l&&c&&Y(d,l,c),Y(d,"VER",s.la),Mn(s,d),d}function jc(s,c,l){if(c&&!s.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=s.Ca&&!s.pa?new nt(new Nn({eb:l})):new nt(s.pa),c.Ha(s.J),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function $c(){}n=$c.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Dr(){}Dr.prototype.g=function(s,c){return new Et(s,c)};function Et(s,c){mt.call(this),this.g=new Nc(c),this.l=s,this.h=c&&c.messageUrlParams||null,s=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(s?s["X-WebChannel-Content-Type"]=c.messageContentType:s={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(s?s["X-WebChannel-Client-Profile"]=c.va:s={"X-WebChannel-Client-Profile":c.va}),this.g.S=s,(s=c&&c.Sb)&&!q(s)&&(this.g.m=s),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!q(c)&&(this.g.D=c,s=this.h,s!==null&&c in s&&(s=this.h,c in s&&delete s[c])),this.j=new Be(this)}D(Et,mt),Et.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Et.prototype.close=function(){rs(this.g)},Et.prototype.o=function(s){var c=this.g;if(typeof s=="string"){var l={};l.__data__=s,s=l}else this.u&&(l={},l.__data__=Gi(s),s=l);c.i.push(new _d(c.Ya++,s)),c.G==3&&Cr(c)},Et.prototype.N=function(){this.g.l=null,delete this.j,rs(this.g),delete this.g,Et.aa.N.call(this)};function Gc(s){Wi.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var c=s.__sm__;if(c){t:{for(let l in c){s=l;break t}s=void 0}(this.i=s)&&(s=this.i,c=c!==null&&s in c?c[s]:void 0),this.data=c}else this.data=s}D(Gc,Wi);function Kc(){Hi.call(this),this.status=1}D(Kc,Hi);function Be(s){this.g=s}D(Be,$c),Be.prototype.ua=function(){wt(this.g,"a")},Be.prototype.ta=function(s){wt(this.g,new Gc(s))},Be.prototype.sa=function(s){wt(this.g,new Kc)},Be.prototype.ra=function(){wt(this.g,"b")},Dr.prototype.createWebChannel=Dr.prototype.g,Et.prototype.send=Et.prototype.o,Et.prototype.open=Et.prototype.m,Et.prototype.close=Et.prototype.close,xs=Qt.createWebChannelTransport=function(){return new Dr},Ds=Qt.getStatEventTarget=function(){return _r()},Ps=Qt.Event=Ee,Fr=Qt.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},wr.NO_ERROR=0,wr.TIMEOUT=8,wr.HTTP_ERROR=6,jn=Qt.ErrorCode=wr,cc.COMPLETE="complete",Cs=Qt.EventType=cc,rc.EventType=An,An.OPEN="a",An.CLOSE="b",An.ERROR="c",An.MESSAGE="d",mt.prototype.listen=mt.prototype.K,je=Qt.WebChannel=rc,Yf=Qt.FetchXmlHttpFactory=Nn,nt.prototype.listenOnce=nt.prototype.L,nt.prototype.getLastError=nt.prototype.Ka,nt.prototype.getLastErrorCode=nt.prototype.Ba,nt.prototype.getStatus=nt.prototype.Z,nt.prototype.getResponseJson=nt.prototype.Oa,nt.prototype.getResponseText=nt.prototype.oa,nt.prototype.send=nt.prototype.ea,nt.prototype.setWithCredentials=nt.prototype.Ha,Rs=Qt.XhrIo=nt}).apply(typeof Mr<"u"?Mr:typeof self<"u"?self:typeof window<"u"?window:{});var Ru="@firebase/firestore",Cu="4.8.0";var ut=class{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}};ut.UNAUTHENTICATED=new ut(null),ut.GOOGLE_CREDENTIALS=new ut("google-credentials-uid"),ut.FIRST_PARTY=new ut("first-party-uid"),ut.MOCK_USER=new ut("mock-user");var mn="11.10.0";var De=new ze("@firebase/firestore");function $e(){return De.logLevel}function O(n,...t){if(De.logLevel<=K.DEBUG){let e=t.map(_a);De.debug(`Firestore (${mn}): ${n}`,...e)}}function Xt(n,...t){if(De.logLevel<=K.ERROR){let e=t.map(_a);De.error(`Firestore (${mn}): ${n}`,...e)}}function de(n,...t){if(De.logLevel<=K.WARN){let e=t.map(_a);De.warn(`Firestore (${mn}): ${n}`,...e)}}function _a(n){if(typeof n=="string")return n;try{return function(e){return JSON.stringify(e)}(n)}catch{return n}}function M(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,gl(n,r,e)}function gl(n,t,e){let r=`FIRESTORE (${mn}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw Xt(r),new Error(r)}function Q(n,t,e,r){let i="Unexpected state";typeof e=="string"?i=e:r=e,n||gl(t,i,r)}function B(n,t){return n}var C={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},L=class extends $t{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var xt=class{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}};var Gr=class{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}},Ls=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(ut.UNAUTHENTICATED))}shutdown(){}},Ms=class{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}},Fs=class{constructor(t){this.t=t,this.currentUser=ut.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){Q(this.o===void 0,42304);let r=this.i,i=h=>this.i!==r?(r=this.i,e(h)):Promise.resolve(),o=new xt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new xt,t.enqueueRetryable(()=>i(this.currentUser))};let a=()=>{let h=o;t.enqueueRetryable(async()=>{await h.promise,await i(this.currentUser)})},u=h=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(h=>u(h)),setTimeout(()=>{if(!this.auth){let h=this.t.getImmediate({optional:!0});h?u(h):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new xt)}},0),a()}getToken(){let t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(r=>this.i!==t?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Q(typeof r.accessToken=="string",31837,{l:r}),new Gr(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){let t=this.auth&&this.auth.getUid();return Q(t===null||typeof t=="string",2055,{h:t}),new ut(t)}},Bs=class{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=ut.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);let t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}},Us=class{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new Bs(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(ut.FIRST_PARTY))}shutdown(){}invalidateToken(){}},Kr=class{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},qs=class{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,vu(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){Q(this.o===void 0,3512);let r=o=>{o.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);let a=o.token!==this.m;return this.m=o.token,O("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>r(o))};let i=o=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(o=>i(o)),setTimeout(()=>{if(!this.appCheck){let o=this.V.getImmediate({optional:!0});o?i(o):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Kr(this.p));let t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(Q(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new Kr(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}};function Zf(n){let t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}function yl(){return new TextEncoder}var Qn=class{static newId(){let t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516),r="";for(;r.length<20;){let i=Zf(40);for(let o=0;o<i.length;++o)r.length<20&&i[o]<e&&(r+=t.charAt(i[o]%62))}return r}};function j(n,t){return n<t?-1:n>t?1:0}function zs(n,t){let e=0;for(;e<n.length&&e<t.length;){let r=n.codePointAt(e),i=t.codePointAt(e);if(r!==i){if(r<128&&i<128)return j(r,i);{let o=yl(),a=tm(o.encode(Pu(n,e)),o.encode(Pu(t,e)));return a!==0?a:j(r,i)}}e+=r>65535?2:1}return j(n.length,t.length)}function Pu(n,t){return n.codePointAt(t)>65535?n.substring(t,t+2):n.substring(t,t+1)}function tm(n,t){for(let e=0;e<n.length&&e<t.length;++e)if(n[e]!==t[e])return j(n[e],t[e]);return j(n.length,t.length)}function Ye(n,t,e){return n.length===t.length&&n.every((r,i)=>e(r,t[i]))}var Du="__name__",Wr=class n{constructor(t,e,r){e===void 0?e=0:e>t.length&&M(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&M(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return n.comparator(this,t)===0}child(t){let e=this.segments.slice(this.offset,this.limit());return t instanceof n?t.forEach(r=>{e.push(r)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){let r=Math.min(t.length,e.length);for(let i=0;i<r;i++){let o=n.compareSegments(t.get(i),e.get(i));if(o!==0)return o}return j(t.length,e.length)}static compareSegments(t,e){let r=n.isNumericId(t),i=n.isNumericId(e);return r&&!i?-1:!r&&i?1:r&&i?n.extractNumericId(t).compare(n.extractNumericId(e)):zs(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Ht.fromString(t.substring(4,t.length-2))}},it=class n extends Wr{construct(t,e,r){return new n(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){let e=[];for(let r of t){if(r.indexOf("//")>=0)throw new L(C.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter(i=>i.length>0))}return new n(e)}static emptyPath(){return new n([])}},em=/^[_a-zA-Z][_a-zA-Z0-9]*$/,Tt=class n extends Wr{construct(t,e,r){return new n(t,e,r)}static isValidIdentifier(t){return em.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),n.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Du}static keyField(){return new n([Du])}static fromServerFormat(t){let e=[],r="",i=0,o=()=>{if(r.length===0)throw new L(C.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""},a=!1;for(;i<t.length;){let u=t[i];if(u==="\\"){if(i+1===t.length)throw new L(C.INVALID_ARGUMENT,"Path has trailing escape character: "+t);let h=t[i+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new L(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=h,i+=2}else u==="`"?(a=!a,i++):u!=="."||a?(r+=u,i++):(o(),i++)}if(o(),a)throw new L(C.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new n(e)}static emptyPath(){return new n([])}};var F=class n{constructor(t){this.path=t}static fromPath(t){return new n(it.fromString(t))}static fromName(t){return new n(it.fromString(t).popFirst(5))}static empty(){return new n(it.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&it.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return it.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new n(new it(t.slice()))}};function nm(n,t,e){if(!e)throw new L(C.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function rm(n,t,e,r){if(t===!0&&r===!0)throw new L(C.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function xu(n){if(!F.isDocumentKey(n))throw new L(C.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function _l(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function wa(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let t=function(r){return r.constructor?r.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":M(12329,{type:typeof n})}function Vt(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new L(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let e=wa(n);throw new L(C.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}function at(n,t){let e={typeString:n};return t&&(e.value=t),e}function ur(n,t){if(!_l(n))throw new L(C.INVALID_ARGUMENT,"JSON must be an object");let e;for(let r in t)if(t[r]){let i=t[r].typeString,o="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}let a=n[r];if(i&&typeof a!==i){e=`JSON field '${r}' must be a ${i}.`;break}if(o!==void 0&&a!==o.value){e=`Expected '${r}' field to equal '${o.value}'`;break}}if(e)throw new L(C.INVALID_ARGUMENT,e);return!0}var Vu=-62135596800,Nu=1e6,Z=class n{static now(){return n.fromMillis(Date.now())}static fromDate(t){return n.fromMillis(t.getTime())}static fromMillis(t){let e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*Nu);return new n(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new L(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new L(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Vu)throw new L(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new L(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Nu}_compareTo(t){return this.seconds===t.seconds?j(this.nanoseconds,t.nanoseconds):j(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:n._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(ur(t,n._jsonSchema))return new n(t.seconds,t.nanoseconds)}valueOf(){let t=this.seconds-Vu;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};Z._jsonSchemaVersion="firestore/timestamp/1.0",Z._jsonSchema={type:at("string",Z._jsonSchemaVersion),seconds:at("number"),nanoseconds:at("number")};var U=class n{static fromTimestamp(t){return new n(t)}static min(){return new n(new Z(0,0))}static max(){return new n(new Z(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var Xn=-1,js=class{constructor(t,e,r,i){this.indexId=t,this.collectionGroup=e,this.fields=r,this.indexState=i}};js.UNKNOWN_ID=-1;function im(n,t){let e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=U.fromTimestamp(r===1e9?new Z(e+1,0):new Z(e,r));return new xe(i,F.empty(),t)}function sm(n){return new xe(n.readTime,n.key,Xn)}var xe=class n{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new n(U.min(),F.empty(),Xn)}static max(){return new n(U.max(),F.empty(),Xn)}};function om(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=F.comparator(n.documentKey,t.documentKey),e!==0?e:j(n.largestBatchId,t.largestBatchId))}var am="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",$s=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}};async function pn(n){if(n.code!==C.FAILED_PRECONDITION||n.message!==am)throw n;O("LocalStore","Unexpectedly lost primary lease")}var P=class n{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new n((r,i)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,i)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,i)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{let e=t();return e instanceof n?e:n.resolve(e)}catch(e){return n.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):n.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):n.reject(e)}static resolve(t){return new n((e,r)=>{e(t)})}static reject(t){return new n((e,r)=>{r(t)})}static waitFor(t){return new n((e,r)=>{let i=0,o=0,a=!1;t.forEach(u=>{++i,u.next(()=>{++o,a&&o===i&&e()},h=>r(h))}),a=!0,o===i&&e()})}static or(t){let e=n.resolve(!1);for(let r of t)e=e.next(i=>i?n.resolve(i):r());return e}static forEach(t,e){let r=[];return t.forEach((i,o)=>{r.push(e.call(this,i,o))}),this.waitFor(r)}static mapArray(t,e){return new n((r,i)=>{let o=t.length,a=new Array(o),u=0;for(let h=0;h<o;h++){let f=h;e(t[f]).next(p=>{a[f]=p,++u,u===o&&r(a)},p=>i(p))}})}static doWhile(t,e){return new n((r,i)=>{let o=()=>{t()===!0?e().next(()=>{o()},i):r()};o()})}};function cm(n){let t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function gn(n){return n.name==="IndexedDbTransactionError"}var Ze=class{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this._e(r),this.ae=r=>e.writeSequenceNumber(r))}_e(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){let t=++this.previousValue;return this.ae&&this.ae(t),t}};Ze.ue=-1;var va=-1;function Si(n){return n==null}function Jn(n){return n===0&&1/n==-1/0}function um(n){return typeof n=="number"&&Number.isInteger(n)&&!Jn(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}var wl="";function lm(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=ku(t)),t=hm(n.get(e),t);return ku(t)}function hm(n,t){let e=t,r=n.length;for(let i=0;i<r;i++){let o=n.charAt(i);switch(o){case"\0":e+="";break;case wl:e+="";break;default:e+=o}}return e}function ku(n){return n+wl+""}var dm="remoteDocuments",vl="owner";var El="mutationQueues";var Il="mutations";var Tl="documentMutations",fm="remoteDocumentsV14";var bl="remoteDocumentGlobal";var Al="targets";var Sl="targetDocuments";var Rl="targetGlobal",Cl="collectionParents";var Pl="clientMetadata";var Dl="bundles";var xl="namedQueries";var mm="indexConfiguration";var pm="indexState";var gm="indexEntries";var Vl="documentOverlays";var ym="globals";var _m=[El,Il,Tl,dm,Al,vl,Rl,Sl,Pl,bl,Cl,Dl,xl],oy=[..._m,Vl],wm=[El,Il,Tl,fm,Al,vl,Rl,Sl,Pl,bl,Cl,Dl,xl,Vl],vm=wm,Em=[...vm,mm,pm,gm];var ay=[...Em,ym];function Ou(n){let t=0;for(let e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function ye(n,t){for(let e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function Nl(n){for(let t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}var rt=class n{constructor(t,e){this.comparator=t,this.root=e||Nt.EMPTY}insert(t,e){return new n(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Nt.BLACK,null,null))}remove(t){return new n(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Nt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){let r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){let i=this.comparator(t,r.key);if(i===0)return e+r.left.size;i<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,r)=>(t(e,r),!1))}toString(){let t=[];return this.inorderTraversal((e,r)=>(t.push(`${e}:${r}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new He(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new He(this.root,t,this.comparator,!1)}getReverseIterator(){return new He(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new He(this.root,t,this.comparator,!0)}},He=class{constructor(t,e,r,i){this.isReverse=i,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&i&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop(),e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}},Nt=class n{constructor(t,e,r,i,o){this.key=t,this.value=e,this.color=r??n.RED,this.left=i??n.EMPTY,this.right=o??n.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,i,o){return new n(t??this.key,e??this.value,r??this.color,i??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let i=this,o=r(t,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(t,e,r),null):o===0?i.copy(null,e,null,null,null):i.copy(null,null,null,null,i.right.insert(t,e,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,i=this;if(e(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,e),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),e(t,i.key)===0){if(i.right.isEmpty())return n.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,e))}return i.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){let t=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){let t=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){let t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){let t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});let t=this.left.check();if(t!==this.right.check())throw M(27949);return t+(this.isRed()?0:1)}};Nt.EMPTY=null,Nt.RED=!0,Nt.BLACK=!1;Nt.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(t,e,r,i,o){return this}insert(t,e,r){return new Nt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var lt=class n{constructor(t){this.comparator=t,this.data=new rt(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,r)=>(t(e),!1))}forEachInRange(t,e){let r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){let i=r.getNext();if(this.comparator(i.key,t[1])>=0)return;e(i.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){let e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Hr(this.data.getIterator())}getIteratorFrom(t){return new Hr(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(r=>{e=e.add(r)}),e}isEqual(t){if(!(t instanceof n)||this.size!==t.size)return!1;let e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){let i=e.getNext().key,o=r.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){let t=[];return this.forEach(e=>{t.push(e)}),t}toString(){let t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){let e=new n(this.comparator);return e.data=t,e}},Hr=class{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var Rt=class n{constructor(t){this.fields=t,t.sort(Tt.comparator)}static empty(){return new n([])}unionWith(t){let e=new lt(Tt.comparator);for(let r of this.fields)e=e.add(r);for(let r of t)e=e.add(r);return new n(e.toArray())}covers(t){for(let e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Ye(this.fields,t.fields,(e,r)=>e.isEqual(r))}};var Qr=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var _t=class n{constructor(t){this.binaryString=t}static fromBase64String(t){let e=function(i){try{return atob(i)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Qr("Invalid base64 string: "+o):o}}(t);return new n(e)}static fromUint8Array(t){let e=function(i){let o="";for(let a=0;a<i.length;++a)o+=String.fromCharCode(i[a]);return o}(t);return new n(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){let r=new Uint8Array(e.length);for(let i=0;i<e.length;i++)r[i]=e.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return j(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}};_t.EMPTY_BYTE_STRING=new _t("");var Im=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Jt(n){if(Q(!!n,39018),typeof n=="string"){let t=0,e=Im.exec(n);if(Q(!!e,46558,{timestamp:n}),e[1]){let i=e[1];i=(i+"000000000").substr(0,9),t=Number(i)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:et(n.seconds),nanos:et(n.nanos)}}function et(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Yt(n){return typeof n=="string"?_t.fromBase64String(n):_t.fromUint8Array(n)}var kl="server_timestamp",Ol="__type__",Ll="__previous_value__",Ml="__local_write_time__";function Ea(n){var t,e;return((e=(((t=n?.mapValue)===null||t===void 0?void 0:t.fields)||{})[Ol])===null||e===void 0?void 0:e.stringValue)===kl}function Ri(n){let t=n.mapValue.fields[Ll];return Ea(t)?Ri(t):t}function Yn(n){let t=Jt(n.mapValue.fields[Ml].timestampValue);return new Z(t.seconds,t.nanos)}var Gs=class{constructor(t,e,r,i,o,a,u,h,f,p){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=i,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=h,this.useFetchStreams=f,this.isUsingEmulator=p}},Xr="(default)",Jr=class n{constructor(t,e){this.projectId=t,this.database=e||Xr}static empty(){return new n("","")}get isDefaultDatabase(){return this.database===Xr}isEqual(t){return t instanceof n&&t.projectId===this.projectId&&t.database===this.database}};var Ia="__type__",Fl="__max__",Br={mapValue:{fields:{__type__:{stringValue:Fl}}}},Ta="__vector__",tn="value";function fe(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ea(n)?4:Ul(n)?9007199254740991:Bl(n)?10:11:M(28295,{value:n})}function Lt(n,t){if(n===t)return!0;let e=fe(n);if(e!==fe(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return Yn(n).isEqual(Yn(t));case 3:return function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;let a=Jt(i.timestampValue),u=Jt(o.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(i,o){return Yt(i.bytesValue).isEqual(Yt(o.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(i,o){return et(i.geoPointValue.latitude)===et(o.geoPointValue.latitude)&&et(i.geoPointValue.longitude)===et(o.geoPointValue.longitude)}(n,t);case 2:return function(i,o){if("integerValue"in i&&"integerValue"in o)return et(i.integerValue)===et(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){let a=et(i.doubleValue),u=et(o.doubleValue);return a===u?Jn(a)===Jn(u):isNaN(a)&&isNaN(u)}return!1}(n,t);case 9:return Ye(n.arrayValue.values||[],t.arrayValue.values||[],Lt);case 10:case 11:return function(i,o){let a=i.mapValue.fields||{},u=o.mapValue.fields||{};if(Ou(a)!==Ou(u))return!1;for(let h in a)if(a.hasOwnProperty(h)&&(u[h]===void 0||!Lt(a[h],u[h])))return!1;return!0}(n,t);default:return M(52216,{left:n})}}function Zn(n,t){return(n.values||[]).find(e=>Lt(e,t))!==void 0}function en(n,t){if(n===t)return 0;let e=fe(n),r=fe(t);if(e!==r)return j(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return j(n.booleanValue,t.booleanValue);case 2:return function(o,a){let u=et(o.integerValue||o.doubleValue),h=et(a.integerValue||a.doubleValue);return u<h?-1:u>h?1:u===h?0:isNaN(u)?isNaN(h)?0:-1:1}(n,t);case 3:return Lu(n.timestampValue,t.timestampValue);case 4:return Lu(Yn(n),Yn(t));case 5:return zs(n.stringValue,t.stringValue);case 6:return function(o,a){let u=Yt(o),h=Yt(a);return u.compareTo(h)}(n.bytesValue,t.bytesValue);case 7:return function(o,a){let u=o.split("/"),h=a.split("/");for(let f=0;f<u.length&&f<h.length;f++){let p=j(u[f],h[f]);if(p!==0)return p}return j(u.length,h.length)}(n.referenceValue,t.referenceValue);case 8:return function(o,a){let u=j(et(o.latitude),et(a.latitude));return u!==0?u:j(et(o.longitude),et(a.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return Mu(n.arrayValue,t.arrayValue);case 10:return function(o,a){var u,h,f,p;let _=o.fields||{},v=a.fields||{},R=(u=_[tn])===null||u===void 0?void 0:u.arrayValue,D=(h=v[tn])===null||h===void 0?void 0:h.arrayValue,k=j(((f=R?.values)===null||f===void 0?void 0:f.length)||0,((p=D?.values)===null||p===void 0?void 0:p.length)||0);return k!==0?k:Mu(R,D)}(n.mapValue,t.mapValue);case 11:return function(o,a){if(o===Br.mapValue&&a===Br.mapValue)return 0;if(o===Br.mapValue)return 1;if(a===Br.mapValue)return-1;let u=o.fields||{},h=Object.keys(u),f=a.fields||{},p=Object.keys(f);h.sort(),p.sort();for(let _=0;_<h.length&&_<p.length;++_){let v=zs(h[_],p[_]);if(v!==0)return v;let R=en(u[h[_]],f[p[_]]);if(R!==0)return R}return j(h.length,p.length)}(n.mapValue,t.mapValue);default:throw M(23264,{le:e})}}function Lu(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return j(n,t);let e=Jt(n),r=Jt(t),i=j(e.seconds,r.seconds);return i!==0?i:j(e.nanos,r.nanos)}function Mu(n,t){let e=n.values||[],r=t.values||[];for(let i=0;i<e.length&&i<r.length;++i){let o=en(e[i],r[i]);if(o)return o}return j(e.length,r.length)}function nn(n){return Ks(n)}function Ks(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){let r=Jt(e);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return Yt(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return F.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let r="[",i=!0;for(let o of e.values||[])i?i=!1:r+=",",r+=Ks(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(e){let r=Object.keys(e.fields||{}).sort(),i="{",o=!0;for(let a of r)o?o=!1:i+=",",i+=`${a}:${Ks(e.fields[a])}`;return i+"}"}(n.mapValue):M(61005,{value:n})}function zr(n){switch(fe(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:let t=Ri(n);return t?16+zr(t):16;case 5:return 2*n.stringValue.length;case 6:return Yt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,o)=>i+zr(o),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return ye(r.fields,(o,a)=>{i+=o.length+zr(a)}),i}(n.mapValue);default:throw M(13486,{value:n})}}function Ws(n){return!!n&&"integerValue"in n}function ba(n){return!!n&&"arrayValue"in n}function Fu(n){return!!n&&"nullValue"in n}function Bu(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function jr(n){return!!n&&"mapValue"in n}function Bl(n){var t,e;return((e=(((t=n?.mapValue)===null||t===void 0?void 0:t.fields)||{})[Ia])===null||e===void 0?void 0:e.stringValue)===Ta}function Gn(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){let t={mapValue:{fields:{}}};return ye(n.mapValue.fields,(e,r)=>t.mapValue.fields[e]=Gn(r)),t}if(n.arrayValue){let t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=Gn(n.arrayValue.values[e]);return t}return Object.assign({},n)}function Ul(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Fl}var uy={mapValue:{fields:{[Ia]:{stringValue:Ta},[tn]:{arrayValue:{}}}}};var It=class n{constructor(t){this.value=t}static empty(){return new n({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!jr(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Gn(e)}setAll(t){let e=Tt.emptyPath(),r={},i=[];t.forEach((a,u)=>{if(!e.isImmediateParentOf(u)){let h=this.getFieldsMap(e);this.applyChanges(h,r,i),r={},i=[],e=u.popLast()}a?r[u.lastSegment()]=Gn(a):i.push(u.lastSegment())});let o=this.getFieldsMap(e);this.applyChanges(o,r,i)}delete(t){let e=this.field(t.popLast());jr(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Lt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let i=e.mapValue.fields[t.get(r)];jr(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=i),e=i}return e.mapValue.fields}applyChanges(t,e,r){ye(e,(i,o)=>t[i]=o);for(let i of r)delete t[i]}clone(){return new n(Gn(this.value))}};function ql(n){let t=[];return ye(n.fields,(e,r)=>{let i=new Tt([e]);if(jr(r)){let o=ql(r.mapValue).fields;if(o.length===0)t.push(i);else for(let a of o)t.push(i.child(a))}else t.push(i)}),new Rt(t)}var Pt=class n{constructor(t,e,r,i,o,a,u){this.key=t,this.documentType=e,this.version=r,this.readTime=i,this.createTime=o,this.data=a,this.documentState=u}static newInvalidDocument(t){return new n(t,0,U.min(),U.min(),U.min(),It.empty(),0)}static newFoundDocument(t,e,r,i){return new n(t,1,e,U.min(),r,i,0)}static newNoDocument(t,e){return new n(t,2,e,U.min(),U.min(),It.empty(),0)}static newUnknownDocument(t,e){return new n(t,3,e,U.min(),U.min(),It.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(U.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=It.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=It.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=U.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof n&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var rn=class{constructor(t,e){this.position=t,this.inclusive=e}};function Uu(n,t,e){let r=0;for(let i=0;i<n.position.length;i++){let o=t[i],a=n.position[i];if(o.field.isKeyField()?r=F.comparator(F.fromName(a.referenceValue),e.key):r=en(a,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function qu(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Lt(n.position[e],t.position[e]))return!1;return!0}var sn=class{constructor(t,e="asc"){this.field=t,this.dir=e}};function Tm(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}var Yr=class{},ct=class n extends Yr{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new Qs(t,e,r):e==="array-contains"?new Ys(t,r):e==="in"?new Zs(t,r):e==="not-in"?new to(t,r):e==="array-contains-any"?new eo(t,r):new n(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new Xs(t,r):new Js(t,r)}matches(t){let e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(en(e,this.value)):e!==null&&fe(this.value)===fe(e)&&this.matchesComparison(en(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},Mt=class n extends Yr{constructor(t,e){super(),this.filters=t,this.op=e,this.he=null}static create(t,e){return new n(t,e)}matches(t){return zl(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}};function zl(n){return n.op==="and"}function jl(n){return bm(n)&&zl(n)}function bm(n){for(let t of n.filters)if(t instanceof Mt)return!1;return!0}function Hs(n){if(n instanceof ct)return n.field.canonicalString()+n.op.toString()+nn(n.value);if(jl(n))return n.filters.map(t=>Hs(t)).join(",");{let t=n.filters.map(e=>Hs(e)).join(",");return`${n.op}(${t})`}}function $l(n,t){return n instanceof ct?function(r,i){return i instanceof ct&&r.op===i.op&&r.field.isEqual(i.field)&&Lt(r.value,i.value)}(n,t):n instanceof Mt?function(r,i){return i instanceof Mt&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((o,a,u)=>o&&$l(a,i.filters[u]),!0):!1}(n,t):void M(19439)}function Gl(n){return n instanceof ct?function(e){return`${e.field.canonicalString()} ${e.op} ${nn(e.value)}`}(n):n instanceof Mt?function(e){return e.op.toString()+" {"+e.getFilters().map(Gl).join(" ,")+"}"}(n):"Filter"}var Qs=class extends ct{constructor(t,e,r){super(t,e,r),this.key=F.fromName(r.referenceValue)}matches(t){let e=F.comparator(t.key,this.key);return this.matchesComparison(e)}},Xs=class extends ct{constructor(t,e){super(t,"in",e),this.keys=Kl("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}},Js=class extends ct{constructor(t,e){super(t,"not-in",e),this.keys=Kl("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}};function Kl(n,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(r=>F.fromName(r.referenceValue))}var Ys=class extends ct{constructor(t,e){super(t,"array-contains",e)}matches(t){let e=t.data.field(this.field);return ba(e)&&Zn(e.arrayValue,this.value)}},Zs=class extends ct{constructor(t,e){super(t,"in",e)}matches(t){let e=t.data.field(this.field);return e!==null&&Zn(this.value.arrayValue,e)}},to=class extends ct{constructor(t,e){super(t,"not-in",e)}matches(t){if(Zn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Zn(this.value.arrayValue,e)}},eo=class extends ct{constructor(t,e){super(t,"array-contains-any",e)}matches(t){let e=t.data.field(this.field);return!(!ba(e)||!e.arrayValue.values)&&e.arrayValue.values.some(r=>Zn(this.value.arrayValue,r))}};var no=class{constructor(t,e=null,r=[],i=[],o=null,a=null,u=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=i,this.limit=o,this.startAt=a,this.endAt=u,this.Pe=null}};function zu(n,t=null,e=[],r=[],i=null,o=null,a=null){return new no(n,t,e,r,i,o,a)}function Aa(n){let t=B(n);if(t.Pe===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(r=>Hs(r)).join(","),e+="|ob:",e+=t.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),Si(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(r=>nn(r)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(r=>nn(r)).join(",")),t.Pe=e}return t.Pe}function Sa(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!Tm(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!$l(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!qu(n.startAt,t.startAt)&&qu(n.endAt,t.endAt)}function ro(n){return F.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}var on=class{constructor(t,e=null,r=[],i=[],o=null,a="F",u=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=i,this.limit=o,this.limitType=a,this.startAt=u,this.endAt=h,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}};function Am(n,t,e,r,i,o,a,u){return new on(n,t,e,r,i,o,a,u)}function Ci(n){return new on(n)}function ju(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Sm(n){return n.collectionGroup!==null}function Kn(n){let t=B(n);if(t.Te===null){t.Te=[];let e=new Set;for(let o of t.explicitOrderBy)t.Te.push(o),e.add(o.field.canonicalString());let r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new lt(Tt.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(f=>{f.isInequality()&&(u=u.add(f.field))})}),u})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.Te.push(new sn(o,r))}),e.has(Tt.keyField().canonicalString())||t.Te.push(new sn(Tt.keyField(),r))}return t.Te}function kt(n){let t=B(n);return t.Ie||(t.Ie=Rm(t,Kn(n))),t.Ie}function Rm(n,t){if(n.limitType==="F")return zu(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(i=>{let o=i.dir==="desc"?"asc":"desc";return new sn(i.field,o)});let e=n.endAt?new rn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new rn(n.startAt.position,n.startAt.inclusive):null;return zu(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function io(n,t,e){return new on(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function Pi(n,t){return Sa(kt(n),kt(t))&&n.limitType===t.limitType}function Wl(n){return`${Aa(kt(n))}|lt:${n.limitType}`}function Ge(n){return`Query(target=${function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map(i=>Gl(i)).join(", ")}]`),Si(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map(i=>nn(i)).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map(i=>nn(i)).join(",")),`Target(${r})`}(kt(n))}; limitType=${n.limitType})`}function Di(n,t){return t.isFoundDocument()&&function(r,i){let o=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):F.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,t)&&function(r,i){for(let o of Kn(r))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0}(n,t)&&function(r,i){for(let o of r.filters)if(!o.matches(i))return!1;return!0}(n,t)&&function(r,i){return!(r.startAt&&!function(a,u,h){let f=Uu(a,u,h);return a.inclusive?f<=0:f<0}(r.startAt,Kn(r),i)||r.endAt&&!function(a,u,h){let f=Uu(a,u,h);return a.inclusive?f>=0:f>0}(r.endAt,Kn(r),i))}(n,t)}function Cm(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Hl(n){return(t,e)=>{let r=!1;for(let i of Kn(n)){let o=Pm(i,t,e);if(o!==0)return o;r=r||i.field.isKeyField()}return 0}}function Pm(n,t,e){let r=n.field.isKeyField()?F.comparator(t.key,e.key):function(o,a,u){let h=a.data.field(o),f=u.data.field(o);return h!==null&&f!==null?en(h,f):M(42886)}(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return M(19790,{direction:n.dir})}}var Zt=class{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){let e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(let[i,o]of r)if(this.equalsFn(i,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){let r=this.mapKeyFn(t),i=this.inner[r];if(i===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],t))return void(i[o]=[t,e]);i.push([t,e]),this.innerSize++}delete(t){let e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],t))return r.length===1?delete this.inner[e]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(t){ye(this.inner,(e,r)=>{for(let[i,o]of r)t(i,o)})}isEmpty(){return Nl(this.inner)}size(){return this.innerSize}};var Dm=new rt(F.comparator);function te(){return Dm}var Ql=new rt(F.comparator);function $n(...n){let t=Ql;for(let e of n)t=t.insert(e.key,e);return t}function Xl(n){let t=Ql;return n.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function Se(){return Wn()}function Jl(){return Wn()}function Wn(){return new Zt(n=>n.toString(),(n,t)=>n.isEqual(t))}var xm=new rt(F.comparator),Vm=new lt(F.comparator);function G(...n){let t=Vm;for(let e of n)t=t.add(e);return t}var Nm=new lt(j);function km(){return Nm}function Ra(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Jn(t)?"-0":t}}function Yl(n){return{integerValue:""+n}}function Om(n,t){return um(t)?Yl(t):Ra(n,t)}var an=class{constructor(){this._=void 0}};function Lm(n,t,e){return n instanceof cn?function(i,o){let a={fields:{[Ol]:{stringValue:kl},[Ml]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&Ea(o)&&(o=Ri(o)),o&&(a.fields[Ll]=o),{mapValue:a}}(e,t):n instanceof Ve?th(n,t):n instanceof Ne?eh(n,t):function(i,o){let a=Zl(i,o),u=$u(a)+$u(i.Ee);return Ws(a)&&Ws(i.Ee)?Yl(u):Ra(i.serializer,u)}(n,t)}function Mm(n,t,e){return n instanceof Ve?th(n,t):n instanceof Ne?eh(n,t):e}function Zl(n,t){return n instanceof un?function(r){return Ws(r)||function(o){return!!o&&"doubleValue"in o}(r)}(t)?t:{integerValue:0}:null}var cn=class extends an{},Ve=class extends an{constructor(t){super(),this.elements=t}};function th(n,t){let e=nh(t);for(let r of n.elements)e.some(i=>Lt(i,r))||e.push(r);return{arrayValue:{values:e}}}var Ne=class extends an{constructor(t){super(),this.elements=t}};function eh(n,t){let e=nh(t);for(let r of n.elements)e=e.filter(i=>!Lt(i,r));return{arrayValue:{values:e}}}var un=class extends an{constructor(t,e){super(),this.serializer=t,this.Ee=e}};function $u(n){return et(n.integerValue||n.doubleValue)}function nh(n){return ba(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Fm(n,t){return n.field.isEqual(t.field)&&function(r,i){return r instanceof Ve&&i instanceof Ve||r instanceof Ne&&i instanceof Ne?Ye(r.elements,i.elements,Lt):r instanceof un&&i instanceof un?Lt(r.Ee,i.Ee):r instanceof cn&&i instanceof cn}(n.transform,t.transform)}var so=class{constructor(t,e){this.version=t,this.transformResults=e}},ce=class n{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new n}static exists(t){return new n(void 0,t)}static updateTime(t){return new n(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}};function $r(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}var ln=class{};function rh(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new Zr(n.key,ce.none()):new ke(n.key,n.data,ce.none());{let e=n.data,r=It.empty(),i=new lt(Tt.comparator);for(let o of t.fields)if(!i.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?r.delete(o):r.set(o,a),i=i.add(o)}return new Ft(n.key,r,new Rt(i.toArray()),ce.none())}}function Bm(n,t,e){n instanceof ke?function(i,o,a){let u=i.value.clone(),h=Ku(i.fieldTransforms,o,a.transformResults);u.setAll(h),o.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,t,e):n instanceof Ft?function(i,o,a){if(!$r(i.precondition,o))return void o.convertToUnknownDocument(a.version);let u=Ku(i.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(ih(i)),h.setAll(u),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(n,t,e):function(i,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function Hn(n,t,e,r){return n instanceof ke?function(o,a,u,h){if(!$r(o.precondition,a))return u;let f=o.value.clone(),p=Wu(o.fieldTransforms,h,a);return f.setAll(p),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),null}(n,t,e,r):n instanceof Ft?function(o,a,u,h){if(!$r(o.precondition,a))return u;let f=Wu(o.fieldTransforms,h,a),p=a.data;return p.setAll(ih(o)),p.setAll(f),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),u===null?null:u.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(_=>_.field))}(n,t,e,r):function(o,a,u){return $r(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u}(n,t,e)}function Um(n,t){let e=null;for(let r of n.fieldTransforms){let i=t.data.field(r.field),o=Zl(r.transform,i||null);o!=null&&(e===null&&(e=It.empty()),e.set(r.field,o))}return e||null}function Gu(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Ye(r,i,(o,a)=>Fm(o,a))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}var ke=class extends ln{constructor(t,e,r,i=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}},Ft=class extends ln{constructor(t,e,r,i,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=i,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}};function ih(n){let t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){let r=n.data.field(e);t.set(e,r)}}),t}function Ku(n,t,e){let r=new Map;Q(n.length===e.length,32656,{Ae:e.length,Re:n.length});for(let i=0;i<e.length;i++){let o=n[i],a=o.transform,u=t.data.field(o.field);r.set(o.field,Mm(a,u,e[i]))}return r}function Wu(n,t,e){let r=new Map;for(let i of n){let o=i.transform,a=e.data.field(i.field);r.set(i.field,Lm(o,a,t))}return r}var Zr=class extends ln{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},oo=class extends ln{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var ao=class{constructor(t,e,r,i){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(t,e){let r=e.mutationResults;for(let i=0;i<this.mutations.length;i++){let o=this.mutations[i];o.key.isEqual(t.key)&&Bm(o,t,r[i])}}applyToLocalView(t,e){for(let r of this.baseMutations)r.key.isEqual(t.key)&&(e=Hn(r,t,e,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(t.key)&&(e=Hn(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){let r=Jl();return this.mutations.forEach(i=>{let o=t.get(i.key),a=o.overlayedDocument,u=this.applyToLocalView(a,o.mutatedFields);u=e.has(i.key)?null:u;let h=rh(a,u);h!==null&&r.set(i.key,h),a.isValidDocument()||a.convertToNoDocument(U.min())}),r}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),G())}isEqual(t){return this.batchId===t.batchId&&Ye(this.mutations,t.mutations,(e,r)=>Gu(e,r))&&Ye(this.baseMutations,t.baseMutations,(e,r)=>Gu(e,r))}},co=class n{constructor(t,e,r,i){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=i}static from(t,e,r){Q(t.mutations.length===r.length,58842,{Ve:t.mutations.length,me:r.length});let i=function(){return xm}(),o=t.mutations;for(let a=0;a<o.length;a++)i=i.insert(o[a].key,r[a].version);return new n(t,e,r,i)}};var uo=class{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var lo=class{constructor(t,e){this.count=t,this.unchangedNames=e}};var st,W;function qm(n){switch(n){case C.OK:return M(64938);case C.CANCELLED:case C.UNKNOWN:case C.DEADLINE_EXCEEDED:case C.RESOURCE_EXHAUSTED:case C.INTERNAL:case C.UNAVAILABLE:case C.UNAUTHENTICATED:return!1;case C.INVALID_ARGUMENT:case C.NOT_FOUND:case C.ALREADY_EXISTS:case C.PERMISSION_DENIED:case C.FAILED_PRECONDITION:case C.ABORTED:case C.OUT_OF_RANGE:case C.UNIMPLEMENTED:case C.DATA_LOSS:return!0;default:return M(15467,{code:n})}}function sh(n){if(n===void 0)return Xt("GRPC error has no .code"),C.UNKNOWN;switch(n){case st.OK:return C.OK;case st.CANCELLED:return C.CANCELLED;case st.UNKNOWN:return C.UNKNOWN;case st.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case st.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case st.INTERNAL:return C.INTERNAL;case st.UNAVAILABLE:return C.UNAVAILABLE;case st.UNAUTHENTICATED:return C.UNAUTHENTICATED;case st.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case st.NOT_FOUND:return C.NOT_FOUND;case st.ALREADY_EXISTS:return C.ALREADY_EXISTS;case st.PERMISSION_DENIED:return C.PERMISSION_DENIED;case st.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case st.ABORTED:return C.ABORTED;case st.OUT_OF_RANGE:return C.OUT_OF_RANGE;case st.UNIMPLEMENTED:return C.UNIMPLEMENTED;case st.DATA_LOSS:return C.DATA_LOSS;default:return M(39323,{code:n})}}(W=st||(st={}))[W.OK=0]="OK",W[W.CANCELLED=1]="CANCELLED",W[W.UNKNOWN=2]="UNKNOWN",W[W.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",W[W.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",W[W.NOT_FOUND=5]="NOT_FOUND",W[W.ALREADY_EXISTS=6]="ALREADY_EXISTS",W[W.PERMISSION_DENIED=7]="PERMISSION_DENIED",W[W.UNAUTHENTICATED=16]="UNAUTHENTICATED",W[W.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",W[W.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",W[W.ABORTED=10]="ABORTED",W[W.OUT_OF_RANGE=11]="OUT_OF_RANGE",W[W.UNIMPLEMENTED=12]="UNIMPLEMENTED",W[W.INTERNAL=13]="INTERNAL",W[W.UNAVAILABLE=14]="UNAVAILABLE",W[W.DATA_LOSS=15]="DATA_LOSS";var Hu=null;var zm=new Ht([4294967295,4294967295],0);function Qu(n){let t=yl().encode(n),e=new Ss;return e.update(t),new Uint8Array(e.digest())}function Xu(n){let t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),i=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new Ht([e,r],0),new Ht([i,o],0)]}var ho=class n{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new Re(`Invalid padding: ${e}`);if(r<0)throw new Re(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new Re(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new Re(`Invalid padding when bitmap length is 0: ${e}`);this.fe=8*t.length-e,this.ge=Ht.fromNumber(this.fe)}pe(t,e,r){let i=t.add(e.multiply(Ht.fromNumber(r)));return i.compare(zm)===1&&(i=new Ht([i.getBits(0),i.getBits(1)],0)),i.modulo(this.ge).toNumber()}ye(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.fe===0)return!1;let e=Qu(t),[r,i]=Xu(e);for(let o=0;o<this.hashCount;o++){let a=this.pe(r,i,o);if(!this.ye(a))return!1}return!0}static create(t,e,r){let i=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new n(o,i,e);return r.forEach(u=>a.insert(u)),a}insert(t){if(this.fe===0)return;let e=Qu(t),[r,i]=Xu(e);for(let o=0;o<this.hashCount;o++){let a=this.pe(r,i,o);this.we(a)}}we(t){let e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}},Re=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};var ti=class n{constructor(t,e,r,i,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){let i=new Map;return i.set(t,tr.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new n(U.min(),i,new rt(j),te(),G())}},tr=class n{constructor(t,e,r,i,o){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new n(r,e,G(),G(),G())}};var Qe=class{constructor(t,e,r,i){this.Se=t,this.removedTargetIds=e,this.key=r,this.be=i}},ei=class{constructor(t,e){this.targetId=t,this.De=e}},ni=class{constructor(t,e,r=_t.EMPTY_BYTE_STRING,i=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=i}},ri=class{constructor(){this.ve=0,this.Ce=Ju(),this.Fe=_t.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(t){t.approximateByteSize()>0&&(this.xe=!0,this.Fe=t)}Le(){let t=G(),e=G(),r=G();return this.Ce.forEach((i,o)=>{switch(o){case 0:t=t.add(i);break;case 2:e=e.add(i);break;case 1:r=r.add(i);break;default:M(38017,{changeType:o})}}),new tr(this.Fe,this.Me,t,e,r)}ke(){this.xe=!1,this.Ce=Ju()}qe(t,e){this.xe=!0,this.Ce=this.Ce.insert(t,e)}Qe(t){this.xe=!0,this.Ce=this.Ce.remove(t)}$e(){this.ve+=1}Ue(){this.ve-=1,Q(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}},fo=class{constructor(t){this.We=t,this.Ge=new Map,this.ze=te(),this.je=Ur(),this.Je=Ur(),this.He=new rt(j)}Ye(t){for(let e of t.Se)t.be&&t.be.isFoundDocument()?this.Ze(e,t.be):this.Xe(e,t.key,t.be);for(let e of t.removedTargetIds)this.Xe(e,t.key,t.be)}et(t){this.forEachTarget(t,e=>{let r=this.tt(e);switch(t.state){case 0:this.nt(e)&&r.Be(t.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(t.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(e);break;case 3:this.nt(e)&&(r.Ke(),r.Be(t.resumeToken));break;case 4:this.nt(e)&&(this.rt(e),r.Be(t.resumeToken));break;default:M(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.Ge.forEach((r,i)=>{this.nt(i)&&e(i)})}it(t){let e=t.targetId,r=t.De.count,i=this.st(e);if(i){let o=i.target;if(ro(o))if(r===0){let a=new F(o.path);this.Xe(e,a,Pt.newNoDocument(a,U.min()))}else Q(r===1,20013,{expectedCount:r});else{let a=this.ot(e);if(a!==r){let u=this._t(t),h=u?this.ut(u,t,a):1;if(h!==0){this.rt(e);let f=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(e,f)}Hu?.ct(function(p,_,v,R,D){var k,x,z,q,$,tt;let At={localCacheCount:p,existenceFilterCount:_.count,databaseId:v.database,projectId:v.projectId},J=_.unchangedNames;return J&&(At.bloomFilter={applied:D===0,hashCount:(k=J?.hashCount)!==null&&k!==void 0?k:0,bitmapLength:(q=(z=(x=J?.bits)===null||x===void 0?void 0:x.bitmap)===null||z===void 0?void 0:z.length)!==null&&q!==void 0?q:0,padding:(tt=($=J?.bits)===null||$===void 0?void 0:$.padding)!==null&&tt!==void 0?tt:0,mightContain:I=>{var m;return(m=R?.mightContain(I))!==null&&m!==void 0&&m}}),At}(a,t.De,this.We.lt(),u,h))}}}}_t(t){let e=t.De.unchangedNames;if(!e||!e.bits)return null;let{bits:{bitmap:r="",padding:i=0},hashCount:o=0}=e,a,u;try{a=Yt(r).toUint8Array()}catch(h){if(h instanceof Qr)return de("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{u=new ho(a,i,o)}catch(h){return de(h instanceof Re?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return u.fe===0?null:u}ut(t,e,r){return e.De.count===r-this.ht(t,e.targetId)?0:2}ht(t,e){let r=this.We.getRemoteKeysForTarget(e),i=0;return r.forEach(o=>{let a=this.We.lt(),u=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(u)||(this.Xe(e,o,null),i++)}),i}Pt(t){let e=new Map;this.Ge.forEach((o,a)=>{let u=this.st(a);if(u){if(o.current&&ro(u.target)){let h=new F(u.target.path);this.Tt(h).has(a)||this.It(a,h)||this.Xe(a,h,Pt.newNoDocument(h,t))}o.Ne&&(e.set(a,o.Le()),o.ke())}});let r=G();this.Je.forEach((o,a)=>{let u=!0;a.forEachWhile(h=>{let f=this.st(h);return!f||f.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)}),u&&(r=r.add(o))}),this.ze.forEach((o,a)=>a.setReadTime(t));let i=new ti(t,e,this.He,this.ze,r);return this.ze=te(),this.je=Ur(),this.Je=Ur(),this.He=new rt(j),i}Ze(t,e){if(!this.nt(t))return;let r=this.It(t,e.key)?2:0;this.tt(t).qe(e.key,r),this.ze=this.ze.insert(e.key,e),this.je=this.je.insert(e.key,this.Tt(e.key).add(t)),this.Je=this.Je.insert(e.key,this.dt(e.key).add(t))}Xe(t,e,r){if(!this.nt(t))return;let i=this.tt(t);this.It(t,e)?i.qe(e,1):i.Qe(e),this.Je=this.Je.insert(e,this.dt(e).delete(t)),this.Je=this.Je.insert(e,this.dt(e).add(t)),r&&(this.ze=this.ze.insert(e,r))}removeTarget(t){this.Ge.delete(t)}ot(t){let e=this.tt(t).Le();return this.We.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}$e(t){this.tt(t).$e()}tt(t){let e=this.Ge.get(t);return e||(e=new ri,this.Ge.set(t,e)),e}dt(t){let e=this.Je.get(t);return e||(e=new lt(j),this.Je=this.Je.insert(t,e)),e}Tt(t){let e=this.je.get(t);return e||(e=new lt(j),this.je=this.je.insert(t,e)),e}nt(t){let e=this.st(t)!==null;return e||O("WatchChangeAggregator","Detected inactive target",t),e}st(t){let e=this.Ge.get(t);return e&&e.Oe?null:this.We.Et(t)}rt(t){this.Ge.set(t,new ri),this.We.getRemoteKeysForTarget(t).forEach(e=>{this.Xe(t,e,null)})}It(t,e){return this.We.getRemoteKeysForTarget(t).has(e)}};function Ur(){return new rt(F.comparator)}function Ju(){return new rt(F.comparator)}var jm={asc:"ASCENDING",desc:"DESCENDING"},$m={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Gm={and:"AND",or:"OR"},mo=class{constructor(t,e){this.databaseId=t,this.useProto3Json=e}};function po(n,t){return n.useProto3Json||Si(t)?t:{value:t}}function ii(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function oh(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function Km(n,t){return ii(n,t.toTimestamp())}function Ot(n){return Q(!!n,49232),U.fromTimestamp(function(e){let r=Jt(e);return new Z(r.seconds,r.nanos)}(n))}function Ca(n,t){return go(n,t).canonicalString()}function go(n,t){let e=function(i){return new it(["projects",i.projectId,"databases",i.database])}(n).child("documents");return t===void 0?e:e.child(t)}function ah(n){let t=it.fromString(n);return Q(dh(t),10190,{key:t.toString()}),t}function yo(n,t){return Ca(n.databaseId,t.path)}function Vs(n,t){let e=ah(t);if(e.get(1)!==n.databaseId.projectId)throw new L(C.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new L(C.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new F(uh(e))}function ch(n,t){return Ca(n.databaseId,t)}function Wm(n){let t=ah(n);return t.length===4?it.emptyPath():uh(t)}function _o(n){return new it(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function uh(n){return Q(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Yu(n,t,e){return{name:yo(n,t),fields:e.value.mapValue.fields}}function Hm(n,t){let e;if("targetChange"in t){t.targetChange;let r=function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:M(39313,{state:f})}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],o=function(f,p){return f.useProto3Json?(Q(p===void 0||typeof p=="string",58123),_t.fromBase64String(p||"")):(Q(p===void 0||p instanceof Buffer||p instanceof Uint8Array,16193),_t.fromUint8Array(p||new Uint8Array))}(n,t.targetChange.resumeToken),a=t.targetChange.cause,u=a&&function(f){let p=f.code===void 0?C.UNKNOWN:sh(f.code);return new L(p,f.message||"")}(a);e=new ni(r,i,o,u||null)}else if("documentChange"in t){t.documentChange;let r=t.documentChange;r.document,r.document.name,r.document.updateTime;let i=Vs(n,r.document.name),o=Ot(r.document.updateTime),a=r.document.createTime?Ot(r.document.createTime):U.min(),u=new It({mapValue:{fields:r.document.fields}}),h=Pt.newFoundDocument(i,o,a,u),f=r.targetIds||[],p=r.removedTargetIds||[];e=new Qe(f,p,h.key,h)}else if("documentDelete"in t){t.documentDelete;let r=t.documentDelete;r.document;let i=Vs(n,r.document),o=r.readTime?Ot(r.readTime):U.min(),a=Pt.newNoDocument(i,o),u=r.removedTargetIds||[];e=new Qe([],u,a.key,a)}else if("documentRemove"in t){t.documentRemove;let r=t.documentRemove;r.document;let i=Vs(n,r.document),o=r.removedTargetIds||[];e=new Qe([],o,i,null)}else{if(!("filter"in t))return M(11601,{At:t});{t.filter;let r=t.filter;r.targetId;let{count:i=0,unchangedNames:o}=r,a=new lo(i,o),u=r.targetId;e=new ei(u,a)}}return e}function Qm(n,t){let e;if(t instanceof ke)e={update:Yu(n,t.key,t.value)};else if(t instanceof Zr)e={delete:yo(n,t.key)};else if(t instanceof Ft)e={update:Yu(n,t.key,t.data),updateMask:ip(t.fieldMask)};else{if(!(t instanceof oo))return M(16599,{Rt:t.type});e={verify:yo(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(r=>function(o,a){let u=a.transform;if(u instanceof cn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof Ve)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof Ne)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof un)return{fieldPath:a.field.canonicalString(),increment:u.Ee};throw M(20930,{transform:a.transform})}(0,r))),t.precondition.isNone||(e.currentDocument=function(i,o){return o.updateTime!==void 0?{updateTime:Km(i,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:M(27497)}(n,t.precondition)),e}function Xm(n,t){return n&&n.length>0?(Q(t!==void 0,14353),n.map(e=>function(i,o){let a=i.updateTime?Ot(i.updateTime):Ot(o);return a.isEqual(U.min())&&(a=Ot(o)),new so(a,i.transformResults||[])}(e,t))):[]}function Jm(n,t){return{documents:[ch(n,t.path)]}}function Ym(n,t){let e={structuredQuery:{}},r=t.path,i;t.collectionGroup!==null?(i=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=ch(n,i);let o=function(f){if(f.length!==0)return hh(Mt.create(f,"and"))}(t.filters);o&&(e.structuredQuery.where=o);let a=function(f){if(f.length!==0)return f.map(p=>function(v){return{field:Ke(v.field),direction:ep(v.dir)}}(p))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);let u=po(n,t.limit);return u!==null&&(e.structuredQuery.limit=u),t.startAt&&(e.structuredQuery.startAt=function(f){return{before:f.inclusive,values:f.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(f){return{before:!f.inclusive,values:f.position}}(t.endAt)),{Vt:e,parent:i}}function Zm(n){let t=Wm(n.parent),e=n.structuredQuery,r=e.from?e.from.length:0,i=null;if(r>0){Q(r===1,65062);let p=e.from[0];p.allDescendants?i=p.collectionId:t=t.child(p.collectionId)}let o=[];e.where&&(o=function(_){let v=lh(_);return v instanceof Mt&&jl(v)?v.getFilters():[v]}(e.where));let a=[];e.orderBy&&(a=function(_){return _.map(v=>function(D){return new sn(We(D.field),function(x){switch(x){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(D.direction))}(v))}(e.orderBy));let u=null;e.limit&&(u=function(_){let v;return v=typeof _=="object"?_.value:_,Si(v)?null:v}(e.limit));let h=null;e.startAt&&(h=function(_){let v=!!_.before,R=_.values||[];return new rn(R,v)}(e.startAt));let f=null;return e.endAt&&(f=function(_){let v=!_.before,R=_.values||[];return new rn(R,v)}(e.endAt)),Am(t,i,a,o,u,"F",h,f)}function tp(n,t){let e=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:i})}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function lh(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":let r=We(e.unaryFilter.field);return ct.create(r,"==",{doubleValue:NaN});case"IS_NULL":let i=We(e.unaryFilter.field);return ct.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let o=We(e.unaryFilter.field);return ct.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let a=We(e.unaryFilter.field);return ct.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}}(n):n.fieldFilter!==void 0?function(e){return ct.create(We(e.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return Mt.create(e.compositeFilter.filters.map(r=>lh(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return M(1026)}}(e.compositeFilter.op))}(n):M(30097,{filter:n})}function ep(n){return jm[n]}function np(n){return $m[n]}function rp(n){return Gm[n]}function Ke(n){return{fieldPath:n.canonicalString()}}function We(n){return Tt.fromServerFormat(n.fieldPath)}function hh(n){return n instanceof ct?function(e){if(e.op==="=="){if(Bu(e.value))return{unaryFilter:{field:Ke(e.field),op:"IS_NAN"}};if(Fu(e.value))return{unaryFilter:{field:Ke(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Bu(e.value))return{unaryFilter:{field:Ke(e.field),op:"IS_NOT_NAN"}};if(Fu(e.value))return{unaryFilter:{field:Ke(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ke(e.field),op:np(e.op),value:e.value}}}(n):n instanceof Mt?function(e){let r=e.getFilters().map(i=>hh(i));return r.length===1?r[0]:{compositeFilter:{op:rp(e.op),filters:r}}}(n):M(54877,{filter:n})}function ip(n){let t=[];return n.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function dh(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}var er=class n{constructor(t,e,r,i,o=U.min(),a=U.min(),u=_t.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=h}withSequenceNumber(t){return new n(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}};var wo=class{constructor(t){this.gt=t}};function sp(n){let t=Zm({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?io(t,t.limit,"L"):t}var si=class{constructor(){}bt(t,e){this.Dt(t,e),e.vt()}Dt(t,e){if("nullValue"in t)this.Ct(e,5);else if("booleanValue"in t)this.Ct(e,10),e.Ft(t.booleanValue?1:0);else if("integerValue"in t)this.Ct(e,15),e.Ft(et(t.integerValue));else if("doubleValue"in t){let r=et(t.doubleValue);isNaN(r)?this.Ct(e,13):(this.Ct(e,15),Jn(r)?e.Ft(0):e.Ft(r))}else if("timestampValue"in t){let r=t.timestampValue;this.Ct(e,20),typeof r=="string"&&(r=Jt(r)),e.Mt(`${r.seconds||""}`),e.Ft(r.nanos||0)}else if("stringValue"in t)this.xt(t.stringValue,e),this.Ot(e);else if("bytesValue"in t)this.Ct(e,30),e.Nt(Yt(t.bytesValue)),this.Ot(e);else if("referenceValue"in t)this.Bt(t.referenceValue,e);else if("geoPointValue"in t){let r=t.geoPointValue;this.Ct(e,45),e.Ft(r.latitude||0),e.Ft(r.longitude||0)}else"mapValue"in t?Ul(t)?this.Ct(e,Number.MAX_SAFE_INTEGER):Bl(t)?this.Lt(t.mapValue,e):(this.kt(t.mapValue,e),this.Ot(e)):"arrayValue"in t?(this.qt(t.arrayValue,e),this.Ot(e)):M(19022,{Qt:t})}xt(t,e){this.Ct(e,25),this.$t(t,e)}$t(t,e){e.Mt(t)}kt(t,e){let r=t.fields||{};this.Ct(e,55);for(let i of Object.keys(r))this.xt(i,e),this.Dt(r[i],e)}Lt(t,e){var r,i;let o=t.fields||{};this.Ct(e,53);let a=tn,u=((i=(r=o[a].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.length)||0;this.Ct(e,15),e.Ft(et(u)),this.xt(a,e),this.Dt(o[a],e)}qt(t,e){let r=t.values||[];this.Ct(e,50);for(let i of r)this.Dt(i,e)}Bt(t,e){this.Ct(e,37),F.fromName(t).path.forEach(r=>{this.Ct(e,60),this.$t(r,e)})}Ct(t,e){t.Ft(e)}Ot(t){t.Ft(2)}};si.Ut=new si;var vo=class{constructor(){this.Dn=new Eo}addToCollectionParentIndex(t,e){return this.Dn.add(e),P.resolve()}getCollectionParents(t,e){return P.resolve(this.Dn.getEntries(e))}addFieldIndex(t,e){return P.resolve()}deleteFieldIndex(t,e){return P.resolve()}deleteAllFieldIndexes(t){return P.resolve()}createTargetIndexes(t,e){return P.resolve()}getDocumentsMatchingTarget(t,e){return P.resolve(null)}getIndexType(t,e){return P.resolve(0)}getFieldIndexes(t,e){return P.resolve([])}getNextCollectionGroupToUpdate(t){return P.resolve(null)}getMinOffset(t,e){return P.resolve(xe.min())}getMinOffsetFromCollectionGroup(t,e){return P.resolve(xe.min())}updateCollectionGroup(t,e,r){return P.resolve()}updateIndexEntries(t,e){return P.resolve()}},Eo=class{constructor(){this.index={}}add(t){let e=t.lastSegment(),r=t.popLast(),i=this.index[e]||new lt(it.comparator),o=!i.has(r);return this.index[e]=i.add(r),o}has(t){let e=t.lastSegment(),r=t.popLast(),i=this.index[e];return i&&i.has(r)}getEntries(t){return(this.index[t]||new lt(it.comparator)).toArray()}};var ly=new Uint8Array(0);var Zu={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},fh=41943040,St=class n{static withCacheSize(t){return new n(t,n.DEFAULT_COLLECTION_PERCENTILE,n.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}};St.DEFAULT_COLLECTION_PERCENTILE=10,St.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,St.DEFAULT=new St(fh,St.DEFAULT_COLLECTION_PERCENTILE,St.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),St.DISABLED=new St(-1,0,0);var nr=class n{constructor(t){this._r=t}next(){return this._r+=2,this._r}static ar(){return new n(0)}static ur(){return new n(-1)}};var tl="LruGarbageCollector",op=1048576;function el([n,t],[e,r]){let i=j(n,e);return i===0?j(t,r):i}var Io=class{constructor(t){this.Tr=t,this.buffer=new lt(el),this.Ir=0}dr(){return++this.Ir}Er(t){let e=[t,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(e);else{let r=this.buffer.last();el(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}},To=class{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(t){O(tl,`Garbage collection scheduled in ${t}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){gn(e)?O(tl,"Ignoring IndexedDB error during garbage collection: ",e):await pn(e)}await this.Rr(3e5)})}},bo=class{constructor(t,e){this.Vr=t,this.params=e}calculateTargetCount(t,e){return this.Vr.mr(t).next(r=>Math.floor(e/100*r))}nthSequenceNumber(t,e){if(e===0)return P.resolve(Ze.ue);let r=new Io(e);return this.Vr.forEachTarget(t,i=>r.Er(i.sequenceNumber)).next(()=>this.Vr.gr(t,i=>r.Er(i))).next(()=>r.maxValue)}removeTargets(t,e,r){return this.Vr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.Vr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(O("LruGarbageCollector","Garbage collection skipped; disabled"),P.resolve(Zu)):this.getCacheSize(t).next(r=>r<this.params.cacheSizeCollectionThreshold?(O("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Zu):this.pr(t,e))}getCacheSize(t){return this.Vr.getCacheSize(t)}pr(t,e){let r,i,o,a,u,h,f,p=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(_=>(_>this.params.maximumSequenceNumbersToCollect?(O("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${_}`),i=this.params.maximumSequenceNumbersToCollect):i=_,a=Date.now(),this.nthSequenceNumber(t,i))).next(_=>(r=_,u=Date.now(),this.removeTargets(t,r,e))).next(_=>(o=_,h=Date.now(),this.removeOrphanedDocuments(t,r))).next(_=>(f=Date.now(),$e()<=K.DEBUG&&O("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-p}ms
	Determined least recently used ${i} in `+(u-a)+`ms
	Removed ${o} targets in `+(h-u)+`ms
	Removed ${_} documents in `+(f-h)+`ms
Total Duration: ${f-p}ms`),P.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:o,documentsRemoved:_})))}};function ap(n,t){return new bo(n,t)}var Ao=class{constructor(){this.changes=new Zt(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Pt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();let r=this.changes.get(e);return r!==void 0?P.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}};var So=class{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}};var Ro=class{constructor(t,e,r,i){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=i}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next(i=>(r=i,this.remoteDocumentCache.getEntry(t,e))).next(i=>(r!==null&&Hn(r.mutation,i,Rt.empty(),Z.now()),i))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.getLocalViewOfDocuments(t,r,G()).next(()=>r))}getLocalViewOfDocuments(t,e,r=G()){let i=Se();return this.populateOverlays(t,i,e).next(()=>this.computeViews(t,e,i,r).next(o=>{let a=$n();return o.forEach((u,h)=>{a=a.insert(u,h.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){let r=Se();return this.populateOverlays(t,r,e).next(()=>this.computeViews(t,e,r,G()))}populateOverlays(t,e,r){let i=[];return r.forEach(o=>{e.has(o)||i.push(o)}),this.documentOverlayCache.getOverlays(t,i).next(o=>{o.forEach((a,u)=>{e.set(a,u)})})}computeViews(t,e,r,i){let o=te(),a=Wn(),u=function(){return Wn()}();return e.forEach((h,f)=>{let p=r.get(f.key);i.has(f.key)&&(p===void 0||p.mutation instanceof Ft)?o=o.insert(f.key,f):p!==void 0?(a.set(f.key,p.mutation.getFieldMask()),Hn(p.mutation,f,p.mutation.getFieldMask(),Z.now())):a.set(f.key,Rt.empty())}),this.recalculateAndSaveOverlays(t,o).next(h=>(h.forEach((f,p)=>a.set(f,p)),e.forEach((f,p)=>{var _;return u.set(f,new So(p,(_=a.get(f))!==null&&_!==void 0?_:null))}),u))}recalculateAndSaveOverlays(t,e){let r=Wn(),i=new rt((a,u)=>a-u),o=G();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(let u of a)u.keys().forEach(h=>{let f=e.get(h);if(f===null)return;let p=r.get(h)||Rt.empty();p=u.applyToLocalView(f,p),r.set(h,p);let _=(i.get(u.batchId)||G()).add(h);i=i.insert(u.batchId,_)})}).next(()=>{let a=[],u=i.getReverseIterator();for(;u.hasNext();){let h=u.getNext(),f=h.key,p=h.value,_=Jl();p.forEach(v=>{if(!o.has(v)){let R=rh(e.get(v),r.get(v));R!==null&&_.set(v,R),o=o.add(v)}}),a.push(this.documentOverlayCache.saveOverlays(t,f,_))}return P.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.recalculateAndSaveOverlays(t,r))}getDocumentsMatchingQuery(t,e,r,i){return function(a){return F.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Sm(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,i):this.getDocumentsMatchingCollectionQuery(t,e,r,i)}getNextDocuments(t,e,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,i).next(o=>{let a=i-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,i-o.size):P.resolve(Se()),u=Xn,h=o;return a.next(f=>P.forEach(f,(p,_)=>(u<_.largestBatchId&&(u=_.largestBatchId),o.get(p)?P.resolve():this.remoteDocumentCache.getEntry(t,p).next(v=>{h=h.insert(p,v)}))).next(()=>this.populateOverlays(t,f,o)).next(()=>this.computeViews(t,h,f,G())).next(p=>({batchId:u,changes:Xl(p)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new F(e)).next(r=>{let i=$n();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(t,e,r,i){let o=e.collectionGroup,a=$n();return this.indexManager.getCollectionParents(t,o).next(u=>P.forEach(u,h=>{let f=function(_,v){return new on(v,null,_.explicitOrderBy.slice(),_.filters.slice(),_.limit,_.limitType,_.startAt,_.endAt)}(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,f,r,i).next(p=>{p.forEach((_,v)=>{a=a.insert(_,v)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,r,i){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,i))).next(a=>{o.forEach((h,f)=>{let p=f.getKey();a.get(p)===null&&(a=a.insert(p,Pt.newInvalidDocument(p)))});let u=$n();return a.forEach((h,f)=>{let p=o.get(h);p!==void 0&&Hn(p.mutation,f,Rt.empty(),Z.now()),Di(e,f)&&(u=u.insert(h,f))}),u})}};var Co=class{constructor(t){this.serializer=t,this.Br=new Map,this.Lr=new Map}getBundleMetadata(t,e){return P.resolve(this.Br.get(e))}saveBundleMetadata(t,e){return this.Br.set(e.id,function(i){return{id:i.id,version:i.version,createTime:Ot(i.createTime)}}(e)),P.resolve()}getNamedQuery(t,e){return P.resolve(this.Lr.get(e))}saveNamedQuery(t,e){return this.Lr.set(e.name,function(i){return{name:i.name,query:sp(i.bundledQuery),readTime:Ot(i.readTime)}}(e)),P.resolve()}};var Po=class{constructor(){this.overlays=new rt(F.comparator),this.kr=new Map}getOverlay(t,e){return P.resolve(this.overlays.get(e))}getOverlays(t,e){let r=Se();return P.forEach(e,i=>this.getOverlay(t,i).next(o=>{o!==null&&r.set(i,o)})).next(()=>r)}saveOverlays(t,e,r){return r.forEach((i,o)=>{this.wt(t,e,o)}),P.resolve()}removeOverlaysForBatchId(t,e,r){let i=this.kr.get(r);return i!==void 0&&(i.forEach(o=>this.overlays=this.overlays.remove(o)),this.kr.delete(r)),P.resolve()}getOverlaysForCollection(t,e,r){let i=Se(),o=e.length+1,a=new F(e.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){let h=u.getNext().value,f=h.getKey();if(!e.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>r&&i.set(h.getKey(),h)}return P.resolve(i)}getOverlaysForCollectionGroup(t,e,r,i){let o=new rt((f,p)=>f-p),a=this.overlays.getIterator();for(;a.hasNext();){let f=a.getNext().value;if(f.getKey().getCollectionGroup()===e&&f.largestBatchId>r){let p=o.get(f.largestBatchId);p===null&&(p=Se(),o=o.insert(f.largestBatchId,p)),p.set(f.getKey(),f)}}let u=Se(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((f,p)=>u.set(f,p)),!(u.size()>=i)););return P.resolve(u)}wt(t,e,r){let i=this.overlays.get(r.key);if(i!==null){let a=this.kr.get(i.largestBatchId).delete(r.key);this.kr.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new uo(e,r));let o=this.kr.get(e);o===void 0&&(o=G(),this.kr.set(e,o)),this.kr.set(e,o.add(r.key))}};var Do=class{constructor(){this.sessionToken=_t.EMPTY_BYTE_STRING}getSessionToken(t){return P.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,P.resolve()}};var rr=class{constructor(){this.qr=new lt(ot.Qr),this.$r=new lt(ot.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(t,e){let r=new ot(t,e);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(t,e){t.forEach(r=>this.addReference(r,e))}removeReference(t,e){this.Wr(new ot(t,e))}Gr(t,e){t.forEach(r=>this.removeReference(r,e))}zr(t){let e=new F(new it([])),r=new ot(e,t),i=new ot(e,t+1),o=[];return this.$r.forEachInRange([r,i],a=>{this.Wr(a),o.push(a.key)}),o}jr(){this.qr.forEach(t=>this.Wr(t))}Wr(t){this.qr=this.qr.delete(t),this.$r=this.$r.delete(t)}Jr(t){let e=new F(new it([])),r=new ot(e,t),i=new ot(e,t+1),o=G();return this.$r.forEachInRange([r,i],a=>{o=o.add(a.key)}),o}containsKey(t){let e=new ot(t,0),r=this.qr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}},ot=class{constructor(t,e){this.key=t,this.Hr=e}static Qr(t,e){return F.comparator(t.key,e.key)||j(t.Hr,e.Hr)}static Ur(t,e){return j(t.Hr,e.Hr)||F.comparator(t.key,e.key)}};var xo=class{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.er=1,this.Yr=new lt(ot.Qr)}checkEmpty(t){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,i){let o=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let a=new ao(o,e,r,i);this.mutationQueue.push(a);for(let u of i)this.Yr=this.Yr.add(new ot(u.key,o)),this.indexManager.addToCollectionParentIndex(t,u.key.path.popLast());return P.resolve(a)}lookupMutationBatch(t,e){return P.resolve(this.Zr(e))}getNextMutationBatchAfterBatchId(t,e){let r=e+1,i=this.Xr(r),o=i<0?0:i;return P.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?va:this.er-1)}getAllMutationBatches(t){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){let r=new ot(e,0),i=new ot(e,Number.POSITIVE_INFINITY),o=[];return this.Yr.forEachInRange([r,i],a=>{let u=this.Zr(a.Hr);o.push(u)}),P.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new lt(j);return e.forEach(i=>{let o=new ot(i,0),a=new ot(i,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([o,a],u=>{r=r.add(u.Hr)})}),P.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(t,e){let r=e.path,i=r.length+1,o=r;F.isDocumentKey(o)||(o=o.child(""));let a=new ot(new F(o),0),u=new lt(j);return this.Yr.forEachWhile(h=>{let f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===i&&(u=u.add(h.Hr)),!0)},a),P.resolve(this.ei(u))}ei(t){let e=[];return t.forEach(r=>{let i=this.Zr(r);i!==null&&e.push(i)}),e}removeMutationBatch(t,e){Q(this.ti(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return P.forEach(e.mutations,i=>{let o=new ot(i.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,i.key)}).next(()=>{this.Yr=r})}rr(t){}containsKey(t,e){let r=new ot(e,0),i=this.Yr.firstAfterOrEqual(r);return P.resolve(e.isEqual(i&&i.key))}performConsistencyCheck(t){return this.mutationQueue.length,P.resolve()}ti(t,e){return this.Xr(t)}Xr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Zr(t){let e=this.Xr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}};var Vo=class{constructor(t){this.ni=t,this.docs=function(){return new rt(F.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){let r=e.key,i=this.docs.get(r),o=i?i.size:0,a=this.ni(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){let e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){let r=this.docs.get(e);return P.resolve(r?r.document.mutableCopy():Pt.newInvalidDocument(e))}getEntries(t,e){let r=te();return e.forEach(i=>{let o=this.docs.get(i);r=r.insert(i,o?o.document.mutableCopy():Pt.newInvalidDocument(i))}),P.resolve(r)}getDocumentsMatchingQuery(t,e,r,i){let o=te(),a=e.path,u=new F(a.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(u);for(;h.hasNext();){let{key:f,value:{document:p}}=h.getNext();if(!a.isPrefixOf(f.path))break;f.path.length>a.length+1||om(sm(p),r)<=0||(i.has(p.key)||Di(e,p))&&(o=o.insert(p.key,p.mutableCopy()))}return P.resolve(o)}getAllFromCollectionGroup(t,e,r,i){M(9500)}ri(t,e){return P.forEach(this.docs,r=>e(r))}newChangeBuffer(t){return new No(this)}getSize(t){return P.resolve(this.size)}},No=class extends Ao{constructor(t){super(),this.Or=t}applyChanges(t){let e=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?e.push(this.Or.addEntry(t,i)):this.Or.removeEntry(r)}),P.waitFor(e)}getFromCache(t,e){return this.Or.getEntry(t,e)}getAllFromCache(t,e){return this.Or.getEntries(t,e)}};var ko=class{constructor(t){this.persistence=t,this.ii=new Zt(e=>Aa(e),Sa),this.lastRemoteSnapshotVersion=U.min(),this.highestTargetId=0,this.si=0,this.oi=new rr,this.targetCount=0,this._i=nr.ar()}forEachTarget(t,e){return this.ii.forEach((r,i)=>e(i)),P.resolve()}getLastRemoteSnapshotVersion(t){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return P.resolve(this.si)}allocateTargetId(t){return this.highestTargetId=this._i.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.si&&(this.si=e),P.resolve()}hr(t){this.ii.set(t.target,t);let e=t.targetId;e>this.highestTargetId&&(this._i=new nr(e),this.highestTargetId=e),t.sequenceNumber>this.si&&(this.si=t.sequenceNumber)}addTargetData(t,e){return this.hr(e),this.targetCount+=1,P.resolve()}updateTargetData(t,e){return this.hr(e),P.resolve()}removeTargetData(t,e){return this.ii.delete(e.target),this.oi.zr(e.targetId),this.targetCount-=1,P.resolve()}removeTargets(t,e,r){let i=0,o=[];return this.ii.forEach((a,u)=>{u.sequenceNumber<=e&&r.get(u.targetId)===null&&(this.ii.delete(a),o.push(this.removeMatchingKeysForTargetId(t,u.targetId)),i++)}),P.waitFor(o).next(()=>i)}getTargetCount(t){return P.resolve(this.targetCount)}getTargetData(t,e){let r=this.ii.get(e)||null;return P.resolve(r)}addMatchingKeys(t,e,r){return this.oi.Kr(e,r),P.resolve()}removeMatchingKeys(t,e,r){this.oi.Gr(e,r);let i=this.persistence.referenceDelegate,o=[];return i&&e.forEach(a=>{o.push(i.markPotentiallyOrphaned(t,a))}),P.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.oi.zr(e),P.resolve()}getMatchingKeysForTargetId(t,e){let r=this.oi.Jr(e);return P.resolve(r)}containsKey(t,e){return P.resolve(this.oi.containsKey(e))}};var oi=class{constructor(t,e){this.ai={},this.overlays={},this.ui=new Ze(0),this.ci=!1,this.ci=!0,this.li=new Do,this.referenceDelegate=t(this),this.hi=new ko(this),this.indexManager=new vo,this.remoteDocumentCache=function(i){return new Vo(i)}(r=>this.referenceDelegate.Pi(r)),this.serializer=new wo(e),this.Ti=new Co(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Po,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.ai[t.toKey()];return r||(r=new xo(e,this.referenceDelegate),this.ai[t.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(t,e,r){O("MemoryPersistence","Starting transaction:",t);let i=new Oo(this.ui.next());return this.referenceDelegate.Ii(),r(i).next(o=>this.referenceDelegate.di(i).next(()=>o)).toPromise().then(o=>(i.raiseOnCommittedEvent(),o))}Ei(t,e){return P.or(Object.values(this.ai).map(r=>()=>r.containsKey(t,e)))}},Oo=class extends $s{constructor(t){super(),this.currentSequenceNumber=t}},Lo=class n{constructor(t){this.persistence=t,this.Ai=new rr,this.Ri=null}static Vi(t){return new n(t)}get mi(){if(this.Ri)return this.Ri;throw M(60996)}addReference(t,e,r){return this.Ai.addReference(r,e),this.mi.delete(r.toString()),P.resolve()}removeReference(t,e,r){return this.Ai.removeReference(r,e),this.mi.add(r.toString()),P.resolve()}markPotentiallyOrphaned(t,e){return this.mi.add(e.toString()),P.resolve()}removeTarget(t,e){this.Ai.zr(e.targetId).forEach(i=>this.mi.add(i.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next(i=>{i.forEach(o=>this.mi.add(o.toString()))}).next(()=>r.removeTargetData(t,e))}Ii(){this.Ri=new Set}di(t){let e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.mi,r=>{let i=F.fromPath(r);return this.fi(t,i).next(o=>{o||e.removeEntry(i,U.min())})}).next(()=>(this.Ri=null,e.apply(t)))}updateLimboDocument(t,e){return this.fi(t,e).next(r=>{r?this.mi.delete(e.toString()):this.mi.add(e.toString())})}Pi(t){return 0}fi(t,e){return P.or([()=>P.resolve(this.Ai.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ei(t,e)])}},ai=class n{constructor(t,e){this.persistence=t,this.gi=new Zt(r=>lm(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=ap(this,e)}static Vi(t,e){return new n(t,e)}Ii(){}di(t){return P.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}mr(t){let e=this.yr(t);return this.persistence.getTargetCache().getTargetCount(t).next(r=>e.next(i=>r+i))}yr(t){let e=0;return this.gr(t,r=>{e++}).next(()=>e)}gr(t,e){return P.forEach(this.gi,(r,i)=>this.Sr(t,r,i).next(o=>o?P.resolve():e(i)))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0,i=this.persistence.getRemoteDocumentCache(),o=i.newChangeBuffer();return i.ri(t,a=>this.Sr(t,a,e).next(u=>{u||(r++,o.removeEntry(a,U.min()))})).next(()=>o.apply(t)).next(()=>r)}markPotentiallyOrphaned(t,e){return this.gi.set(e,t.currentSequenceNumber),P.resolve()}removeTarget(t,e){let r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.gi.set(r,t.currentSequenceNumber),P.resolve()}removeReference(t,e,r){return this.gi.set(r,t.currentSequenceNumber),P.resolve()}updateLimboDocument(t,e){return this.gi.set(e,t.currentSequenceNumber),P.resolve()}Pi(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=zr(t.data.value)),e}Sr(t,e,r){return P.or([()=>this.persistence.Ei(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{let i=this.gi.get(e);return P.resolve(i!==void 0&&i>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}};var Mo=class n{constructor(t,e,r,i){this.targetId=t,this.fromCache=e,this.Is=r,this.ds=i}static Es(t,e){let r=G(),i=G();for(let o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new n(t,e.fromCache,r,i)}};var Fo=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}};var Bo=class{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return su()?8:cm(iu())>0?6:4}()}initialize(t,e){this.gs=t,this.indexManager=e,this.As=!0}getDocumentsMatchingQuery(t,e,r,i){let o={result:null};return this.ps(t,e).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.ys(t,e,i,r).next(a=>{o.result=a})}).next(()=>{if(o.result)return;let a=new Fo;return this.ws(t,e,a).next(u=>{if(o.result=u,this.Rs)return this.Ss(t,e,a,u.size)})}).next(()=>o.result)}Ss(t,e,r,i){return r.documentReadCount<this.Vs?($e()<=K.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",Ge(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),P.resolve()):($e()<=K.DEBUG&&O("QueryEngine","Query:",Ge(e),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.fs*i?($e()<=K.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",Ge(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,kt(e))):P.resolve())}ps(t,e){if(ju(e))return P.resolve(null);let r=kt(e);return this.indexManager.getIndexType(t,r).next(i=>i===0?null:(e.limit!==null&&i===1&&(e=io(e,null,"F"),r=kt(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next(o=>{let a=G(...o);return this.gs.getDocuments(t,a).next(u=>this.indexManager.getMinOffset(t,r).next(h=>{let f=this.bs(e,u);return this.Ds(e,f,a,h.readTime)?this.ps(t,io(e,null,"F")):this.vs(t,f,e,h)}))})))}ys(t,e,r,i){return ju(e)||i.isEqual(U.min())?P.resolve(null):this.gs.getDocuments(t,r).next(o=>{let a=this.bs(e,o);return this.Ds(e,a,r,i)?P.resolve(null):($e()<=K.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Ge(e)),this.vs(t,a,e,im(i,Xn)).next(u=>u))})}bs(t,e){let r=new lt(Hl(t));return e.forEach((i,o)=>{Di(t,o)&&(r=r.add(o))}),r}Ds(t,e,r,i){if(t.limit===null)return!1;if(r.size!==e.size)return!0;let o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(i)>0)}ws(t,e,r){return $e()<=K.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",Ge(e)),this.gs.getDocumentsMatchingQuery(t,e,xe.min(),r)}vs(t,e,r,i){return this.gs.getDocumentsMatchingQuery(t,r,i).next(o=>(e.forEach(a=>{o=o.insert(a.key,a)}),o))}};var Pa="LocalStore",cp=3e8,Uo=class{constructor(t,e,r,i){this.persistence=t,this.Cs=e,this.serializer=i,this.Fs=new rt(j),this.Ms=new Zt(o=>Aa(o),Sa),this.xs=new Map,this.Os=t.getRemoteDocumentCache(),this.hi=t.getTargetCache(),this.Ti=t.getBundleCache(),this.Ns(r)}Ns(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Ro(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.Fs))}};function up(n,t,e,r){return new Uo(n,t,e,r)}async function mh(n,t){let e=B(n);return await e.persistence.runTransaction("Handle user change","readonly",r=>{let i;return e.mutationQueue.getAllMutationBatches(r).next(o=>(i=o,e.Ns(t),e.mutationQueue.getAllMutationBatches(r))).next(o=>{let a=[],u=[],h=G();for(let f of i){a.push(f.batchId);for(let p of f.mutations)h=h.add(p.key)}for(let f of o){u.push(f.batchId);for(let p of f.mutations)h=h.add(p.key)}return e.localDocuments.getDocuments(r,h).next(f=>({Bs:f,removedBatchIds:a,addedBatchIds:u}))})})}function lp(n,t){let e=B(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{let i=t.batch.keys(),o=e.Os.newChangeBuffer({trackRemovals:!0});return function(u,h,f,p){let _=f.batch,v=_.keys(),R=P.resolve();return v.forEach(D=>{R=R.next(()=>p.getEntry(h,D)).next(k=>{let x=f.docVersions.get(D);Q(x!==null,48541),k.version.compareTo(x)<0&&(_.applyToRemoteDocument(k,f),k.isValidDocument()&&(k.setReadTime(f.commitVersion),p.addEntry(k)))})}),R.next(()=>u.mutationQueue.removeMutationBatch(h,_))}(e,r,t,o).next(()=>o.apply(r)).next(()=>e.mutationQueue.performConsistencyCheck(r)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(r,i,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(u){let h=G();for(let f=0;f<u.mutationResults.length;++f)u.mutationResults[f].transformResults.length>0&&(h=h.add(u.batch.mutations[f].key));return h}(t))).next(()=>e.localDocuments.getDocuments(r,i))})}function ph(n){let t=B(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.hi.getLastRemoteSnapshotVersion(e))}function hp(n,t){let e=B(n),r=t.snapshotVersion,i=e.Fs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{let a=e.Os.newChangeBuffer({trackRemovals:!0});i=e.Fs;let u=[];t.targetChanges.forEach((p,_)=>{let v=i.get(_);if(!v)return;u.push(e.hi.removeMatchingKeys(o,p.removedDocuments,_).next(()=>e.hi.addMatchingKeys(o,p.addedDocuments,_)));let R=v.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(_)!==null?R=R.withResumeToken(_t.EMPTY_BYTE_STRING,U.min()).withLastLimboFreeSnapshotVersion(U.min()):p.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(p.resumeToken,r)),i=i.insert(_,R),function(k,x,z){return k.resumeToken.approximateByteSize()===0||x.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=cp?!0:z.addedDocuments.size+z.modifiedDocuments.size+z.removedDocuments.size>0}(v,R,p)&&u.push(e.hi.updateTargetData(o,R))});let h=te(),f=G();if(t.documentUpdates.forEach(p=>{t.resolvedLimboDocuments.has(p)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(o,p))}),u.push(dp(o,a,t.documentUpdates).next(p=>{h=p.Ls,f=p.ks})),!r.isEqual(U.min())){let p=e.hi.getLastRemoteSnapshotVersion(o).next(_=>e.hi.setTargetsMetadata(o,o.currentSequenceNumber,r));u.push(p)}return P.waitFor(u).next(()=>a.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,h,f)).next(()=>h)}).then(o=>(e.Fs=i,o))}function dp(n,t,e){let r=G(),i=G();return e.forEach(o=>r=r.add(o)),t.getEntries(n,r).next(o=>{let a=te();return e.forEach((u,h)=>{let f=o.get(u);h.isFoundDocument()!==f.isFoundDocument()&&(i=i.add(u)),h.isNoDocument()&&h.version.isEqual(U.min())?(t.removeEntry(u,h.readTime),a=a.insert(u,h)):!f.isValidDocument()||h.version.compareTo(f.version)>0||h.version.compareTo(f.version)===0&&f.hasPendingWrites?(t.addEntry(h),a=a.insert(u,h)):O(Pa,"Ignoring outdated watch update for ",u,". Current version:",f.version," Watch version:",h.version)}),{Ls:a,ks:i}})}function fp(n,t){let e=B(n);return e.persistence.runTransaction("Get next mutation batch","readonly",r=>(t===void 0&&(t=va),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t)))}function mp(n,t){let e=B(n);return e.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return e.hi.getTargetData(r,t).next(o=>o?(i=o,P.resolve(i)):e.hi.allocateTargetId(r).next(a=>(i=new er(t,a,"TargetPurposeListen",r.currentSequenceNumber),e.hi.addTargetData(r,i).next(()=>i))))}).then(r=>{let i=e.Fs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(e.Fs=e.Fs.insert(r.targetId,r),e.Ms.set(t,r.targetId)),r})}async function qo(n,t,e){let r=B(n),i=r.Fs.get(t),o=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",o,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!gn(a))throw a;O(Pa,`Failed to update sequence numbers for target ${t}: ${a}`)}r.Fs=r.Fs.remove(t),r.Ms.delete(i.target)}function nl(n,t,e){let r=B(n),i=U.min(),o=G();return r.persistence.runTransaction("Execute query","readwrite",a=>function(h,f,p){let _=B(h),v=_.Ms.get(p);return v!==void 0?P.resolve(_.Fs.get(v)):_.hi.getTargetData(f,p)}(r,a,kt(t)).next(u=>{if(u)return i=u.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(a,u.targetId).next(h=>{o=h})}).next(()=>r.Cs.getDocumentsMatchingQuery(a,t,e?i:U.min(),e?o:G())).next(u=>(pp(r,Cm(t),u),{documents:u,qs:o})))}function pp(n,t,e){let r=n.xs.get(t)||U.min();e.forEach((i,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n.xs.set(t,r)}var ci=class{constructor(){this.activeTargetIds=km()}Gs(t){this.activeTargetIds=this.activeTargetIds.add(t)}zs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ws(){let t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}};var zo=class{constructor(){this.Fo=new ci,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.Fo.Gs(t),this.Mo[t]||"not-current"}updateQueryState(t,e,r){this.Mo[t]=e}removeLocalQueryTarget(t){this.Fo.zs(t)}isLocalQueryTarget(t){return this.Fo.activeTargetIds.has(t)}clearQueryState(t){delete this.Mo[t]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(t){return this.Fo.activeTargetIds.has(t)}start(){return this.Fo=new ci,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}};var jo=class{xo(t){}shutdown(){}};var rl="ConnectivityMonitor",ui=class{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(t){this.ko.push(t)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){O(rl,"Network connectivity changed: AVAILABLE");for(let t of this.ko)t(0)}Lo(){O(rl,"Network connectivity changed: UNAVAILABLE");for(let t of this.ko)t(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var qr=null;function $o(){return qr===null?qr=function(){return 268435456+Math.round(2147483648*Math.random())}():qr++,"0x"+qr.toString(16)}var Ns="RestConnection",gp={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"},Go=class{get Qo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;let e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.$o=e+"://"+t.host,this.Uo=`projects/${r}/databases/${i}`,this.Ko=this.databaseId.database===Xr?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(t,e,r,i,o){let a=$o(),u=this.Go(t,e.toUriEncodedString());O(Ns,`Sending RPC '${t}' ${a}:`,u,r);let h={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(h,i,o);let{host:f}=new URL(u),p=Nr(f);return this.jo(t,u,h,r,p).then(_=>(O(Ns,`Received RPC '${t}' ${a}: `,_),_),_=>{throw de(Ns,`RPC '${t}' ${a} failed with error: `,_,"url: ",u,"request:",r),_})}Jo(t,e,r,i,o,a){return this.Wo(t,e,r,i,o)}zo(t,e,r){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+mn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((i,o)=>t[o]=i),r&&r.headers.forEach((i,o)=>t[o]=i)}Go(t,e){let r=gp[t];return`${this.$o}/v1/${e}:${r}`}terminate(){}};var Ko=class{constructor(t){this.Ho=t.Ho,this.Yo=t.Yo}Zo(t){this.Xo=t}e_(t){this.t_=t}n_(t){this.r_=t}onMessage(t){this.i_=t}close(){this.Yo()}send(t){this.Ho(t)}s_(){this.Xo()}o_(){this.t_()}__(t){this.r_(t)}a_(t){this.i_(t)}};var yt="WebChannelConnection",Wo=class extends Go{constructor(t){super(t),this.u_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}jo(t,e,r,i,o){let a=$o();return new Promise((u,h)=>{let f=new Rs;f.setWithCredentials(!0),f.listenOnce(Cs.COMPLETE,()=>{try{switch(f.getLastErrorCode()){case jn.NO_ERROR:let _=f.getResponseJson();O(yt,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(_)),u(_);break;case jn.TIMEOUT:O(yt,`RPC '${t}' ${a} timed out`),h(new L(C.DEADLINE_EXCEEDED,"Request time out"));break;case jn.HTTP_ERROR:let v=f.getStatus();if(O(yt,`RPC '${t}' ${a} failed with status:`,v,"response text:",f.getResponseText()),v>0){let R=f.getResponseJson();Array.isArray(R)&&(R=R[0]);let D=R?.error;if(D&&D.status&&D.message){let k=function(z){let q=z.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf(q)>=0?q:C.UNKNOWN}(D.status);h(new L(k,D.message))}else h(new L(C.UNKNOWN,"Server responded with status "+f.getStatus()))}else h(new L(C.UNAVAILABLE,"Connection failed."));break;default:M(9055,{c_:t,streamId:a,l_:f.getLastErrorCode(),h_:f.getLastError()})}}finally{O(yt,`RPC '${t}' ${a} completed.`)}});let p=JSON.stringify(i);O(yt,`RPC '${t}' ${a} sending request:`,i),f.send(e,"POST",p,r,15)})}P_(t,e,r){let i=$o(),o=[this.$o,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=xs(),u=Ds(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.useFetchStreams=!0),this.zo(h.initMessageHeaders,e,r),h.encodeInitMessageHeaders=!0;let p=o.join("");O(yt,`Creating RPC '${t}' stream ${i}: ${p}`,h);let _=a.createWebChannel(p,h);this.T_(_);let v=!1,R=!1,D=new Ko({Ho:x=>{R?O(yt,`Not sending because RPC '${t}' stream ${i} is closed:`,x):(v||(O(yt,`Opening RPC '${t}' stream ${i} transport.`),_.open(),v=!0),O(yt,`RPC '${t}' stream ${i} sending:`,x),_.send(x))},Yo:()=>_.close()}),k=(x,z,q)=>{x.listen(z,$=>{try{q($)}catch(tt){setTimeout(()=>{throw tt},0)}})};return k(_,je.EventType.OPEN,()=>{R||(O(yt,`RPC '${t}' stream ${i} transport opened.`),D.s_())}),k(_,je.EventType.CLOSE,()=>{R||(R=!0,O(yt,`RPC '${t}' stream ${i} transport closed`),D.__(),this.I_(_))}),k(_,je.EventType.ERROR,x=>{R||(R=!0,de(yt,`RPC '${t}' stream ${i} transport errored. Name:`,x.name,"Message:",x.message),D.__(new L(C.UNAVAILABLE,"The operation could not be completed")))}),k(_,je.EventType.MESSAGE,x=>{var z;if(!R){let q=x.data[0];Q(!!q,16349);let $=q,tt=$?.error||((z=$[0])===null||z===void 0?void 0:z.error);if(tt){O(yt,`RPC '${t}' stream ${i} received error:`,tt);let At=tt.status,J=function(y){let w=st[y];if(w!==void 0)return sh(w)}(At),I=tt.message;J===void 0&&(J=C.INTERNAL,I="Unknown error status: "+At+" with message "+tt.message),R=!0,D.__(new L(J,I)),_.close()}else O(yt,`RPC '${t}' stream ${i} received:`,q),D.a_(q)}}),k(u,Ps.STAT_EVENT,x=>{x.stat===Fr.PROXY?O(yt,`RPC '${t}' stream ${i} detected buffering proxy`):x.stat===Fr.NOPROXY&&O(yt,`RPC '${t}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{D.o_()},0),D}terminate(){this.u_.forEach(t=>t.close()),this.u_=[]}T_(t){this.u_.push(t)}I_(t){this.u_=this.u_.filter(e=>e===t)}};function ks(){return typeof document<"u"?document:null}function xi(n){return new mo(n,!0)}var li=class{constructor(t,e,r=1e3,i=1.5,o=6e4){this.Fi=t,this.timerId=e,this.d_=r,this.E_=i,this.A_=o,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(t){this.cancel();let e=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),i=Math.max(0,e-r);i>0&&O("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.R_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,i,()=>(this.m_=Date.now(),t())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}};var il="PersistentStream",hi=class{constructor(t,e,r,i,o,a,u,h){this.Fi=t,this.w_=r,this.S_=i,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=h,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new li(t,e)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(t){this.q_(),this.stream.send(t)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,t!==4?this.F_.reset():e&&e.code===C.RESOURCE_EXHAUSTED?(Xt(e.toString()),Xt("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):e&&e.code===C.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.n_(e)}U_(){}auth(){this.state=1;let t=this.K_(this.b_),e=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.b_===e&&this.W_(r,i)},r=>{t(()=>{let i=new L(C.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(i)})})}W_(t,e){let r=this.K_(this.b_);this.stream=this.z_(t,e),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.e_(()=>{r(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(i=>{r(()=>this.G_(i))}),this.stream.onMessage(i=>{r(()=>++this.C_==1?this.j_(i):this.onNext(i))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(t){return O(il,`close with error: ${t}`),this.stream=null,this.close(4,t)}K_(t){return e=>{this.Fi.enqueueAndForget(()=>this.b_===t?e():(O(il,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}},Ho=class extends hi{constructor(t,e,r,i,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,i,a),this.serializer=o}z_(t,e){return this.connection.P_("Listen",t,e)}j_(t){return this.onNext(t)}onNext(t){this.F_.reset();let e=Hm(this.serializer,t),r=function(o){if(!("targetChange"in o))return U.min();let a=o.targetChange;return a.targetIds&&a.targetIds.length?U.min():a.readTime?Ot(a.readTime):U.min()}(t);return this.listener.J_(e,r)}H_(t){let e={};e.database=_o(this.serializer),e.addTarget=function(o,a){let u,h=a.target;if(u=ro(h)?{documents:Jm(o,h)}:{query:Ym(o,h).Vt},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=oh(o,a.resumeToken);let f=po(o,a.expectedCount);f!==null&&(u.expectedCount=f)}else if(a.snapshotVersion.compareTo(U.min())>0){u.readTime=ii(o,a.snapshotVersion.toTimestamp());let f=po(o,a.expectedCount);f!==null&&(u.expectedCount=f)}return u}(this.serializer,t);let r=tp(this.serializer,t);r&&(e.labels=r),this.k_(e)}Y_(t){let e={};e.database=_o(this.serializer),e.removeTarget=t,this.k_(e)}},Qo=class extends hi{constructor(t,e,r,i,o,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,i,a),this.serializer=o}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(t,e){return this.connection.P_("Write",t,e)}j_(t){return Q(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,Q(!t.writeResults||t.writeResults.length===0,55816),this.listener.ea()}onNext(t){Q(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.F_.reset();let e=Xm(t.writeResults,t.commitTime),r=Ot(t.commitTime);return this.listener.ta(r,e)}na(){let t={};t.database=_o(this.serializer),this.k_(t)}X_(t){let e={streamToken:this.lastStreamToken,writes:t.map(r=>Qm(this.serializer,r))};this.k_(e)}};var Xo=class{},Jo=class extends Xo{constructor(t,e,r,i){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=i,this.ra=!1}ia(){if(this.ra)throw new L(C.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(t,e,r,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Wo(t,go(e,r),i,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new L(C.UNKNOWN,o.toString())})}Jo(t,e,r,i,o){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,u])=>this.connection.Jo(t,go(e,r),i,a,u,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new L(C.UNKNOWN,a.toString())})}terminate(){this.ra=!0,this.connection.terminate()}},Yo=class{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(t){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ua("Offline")))}set(t){this.ha(),this.sa=0,t==="Online"&&(this._a=!1),this.ua(t)}ua(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}ca(t){let e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(Xt(e),this._a=!1):O("OnlineStateTracker",e)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}};var Oe="RemoteStore",Zo=class{constructor(t,e,r,i,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=o,this.Ea.xo(a=>{r.enqueueAndForget(async()=>{Le(this)&&(O(Oe,"Restarting streams for network reachability change."),await async function(h){let f=B(h);f.Ia.add(4),await lr(f),f.Aa.set("Unknown"),f.Ia.delete(4),await Vi(f)}(this))})}),this.Aa=new Yo(r,i)}};async function Vi(n){if(Le(n))for(let t of n.da)await t(!0)}async function lr(n){for(let t of n.da)await t(!1)}function gh(n,t){let e=B(n);e.Ta.has(t.targetId)||(e.Ta.set(t.targetId,t),Na(e)?Va(e):yn(e).x_()&&xa(e,t))}function Da(n,t){let e=B(n),r=yn(e);e.Ta.delete(t),r.x_()&&yh(e,t),e.Ta.size===0&&(r.x_()?r.B_():Le(e)&&e.Aa.set("Unknown"))}function xa(n,t){if(n.Ra.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(U.min())>0){let e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}yn(n).H_(t)}function yh(n,t){n.Ra.$e(t),yn(n).Y_(t)}function Va(n){n.Ra=new fo({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),Et:t=>n.Ta.get(t)||null,lt:()=>n.datastore.serializer.databaseId}),yn(n).start(),n.Aa.aa()}function Na(n){return Le(n)&&!yn(n).M_()&&n.Ta.size>0}function Le(n){return B(n).Ia.size===0}function _h(n){n.Ra=void 0}async function yp(n){n.Aa.set("Online")}async function _p(n){n.Ta.forEach((t,e)=>{xa(n,t)})}async function wp(n,t){_h(n),Na(n)?(n.Aa.la(t),Va(n)):n.Aa.set("Unknown")}async function vp(n,t,e){if(n.Aa.set("Online"),t instanceof ni&&t.state===2&&t.cause)try{await async function(i,o){let a=o.cause;for(let u of o.targetIds)i.Ta.has(u)&&(await i.remoteSyncer.rejectListen(u,a),i.Ta.delete(u),i.Ra.removeTarget(u))}(n,t)}catch(r){O(Oe,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await di(n,r)}else if(t instanceof Qe?n.Ra.Ye(t):t instanceof ei?n.Ra.it(t):n.Ra.et(t),!e.isEqual(U.min()))try{let r=await ph(n.localStore);e.compareTo(r)>=0&&await function(o,a){let u=o.Ra.Pt(a);return u.targetChanges.forEach((h,f)=>{if(h.resumeToken.approximateByteSize()>0){let p=o.Ta.get(f);p&&o.Ta.set(f,p.withResumeToken(h.resumeToken,a))}}),u.targetMismatches.forEach((h,f)=>{let p=o.Ta.get(h);if(!p)return;o.Ta.set(h,p.withResumeToken(_t.EMPTY_BYTE_STRING,p.snapshotVersion)),yh(o,h);let _=new er(p.target,h,f,p.sequenceNumber);xa(o,_)}),o.remoteSyncer.applyRemoteEvent(u)}(n,e)}catch(r){O(Oe,"Failed to raise snapshot:",r),await di(n,r)}}async function di(n,t,e){if(!gn(t))throw t;n.Ia.add(1),await lr(n),n.Aa.set("Offline"),e||(e=()=>ph(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{O(Oe,"Retrying IndexedDB access"),await e(),n.Ia.delete(1),await Vi(n)})}function wh(n,t){return t().catch(e=>di(n,e,t))}async function Ni(n){let t=B(n),e=me(t),r=t.Pa.length>0?t.Pa[t.Pa.length-1].batchId:va;for(;Ep(t);)try{let i=await fp(t.localStore,r);if(i===null){t.Pa.length===0&&e.B_();break}r=i.batchId,Ip(t,i)}catch(i){await di(t,i)}vh(t)&&Eh(t)}function Ep(n){return Le(n)&&n.Pa.length<10}function Ip(n,t){n.Pa.push(t);let e=me(n);e.x_()&&e.Z_&&e.X_(t.mutations)}function vh(n){return Le(n)&&!me(n).M_()&&n.Pa.length>0}function Eh(n){me(n).start()}async function Tp(n){me(n).na()}async function bp(n){let t=me(n);for(let e of n.Pa)t.X_(e.mutations)}async function Ap(n,t,e){let r=n.Pa.shift(),i=co.from(r,t,e);await wh(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await Ni(n)}async function Sp(n,t){t&&me(n).Z_&&await async function(r,i){if(function(a){return qm(a)&&a!==C.ABORTED}(i.code)){let o=r.Pa.shift();me(r).N_(),await wh(r,()=>r.remoteSyncer.rejectFailedWrite(o.batchId,i)),await Ni(r)}}(n,t),vh(n)&&Eh(n)}async function sl(n,t){let e=B(n);e.asyncQueue.verifyOperationInProgress(),O(Oe,"RemoteStore received new credentials");let r=Le(e);e.Ia.add(3),await lr(e),r&&e.Aa.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ia.delete(3),await Vi(e)}async function Rp(n,t){let e=B(n);t?(e.Ia.delete(2),await Vi(e)):t||(e.Ia.add(2),await lr(e),e.Aa.set("Unknown"))}function yn(n){return n.Va||(n.Va=function(e,r,i){let o=B(e);return o.ia(),new Ho(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(n.datastore,n.asyncQueue,{Zo:yp.bind(null,n),e_:_p.bind(null,n),n_:wp.bind(null,n),J_:vp.bind(null,n)}),n.da.push(async t=>{t?(n.Va.N_(),Na(n)?Va(n):n.Aa.set("Unknown")):(await n.Va.stop(),_h(n))})),n.Va}function me(n){return n.ma||(n.ma=function(e,r,i){let o=B(e);return o.ia(),new Qo(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),e_:Tp.bind(null,n),n_:Sp.bind(null,n),ea:bp.bind(null,n),ta:Ap.bind(null,n)}),n.da.push(async t=>{t?(n.ma.N_(),await Ni(n)):(await n.ma.stop(),n.Pa.length>0&&(O(Oe,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))})),n.ma}var ta=class n{constructor(t,e,r,i,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=i,this.removalCallback=o,this.deferred=new xt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,i,o){let a=Date.now()+r,u=new n(t,e,a,i,o);return u.start(r),u}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new L(C.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function ka(n,t){if(Xt("AsyncQueue",`${t}: ${n}`),gn(n))return new L(C.UNAVAILABLE,`${t}: ${n}`);throw n}var fi=class n{static emptySet(t){return new n(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||F.comparator(e.key,r.key):(e,r)=>F.comparator(e.key,r.key),this.keyedMap=$n(),this.sortedSet=new rt(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){let e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,r)=>(t(e),!1))}add(t){let e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){let e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof n)||this.size!==t.size)return!1;let e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){let i=e.getNext().key,o=r.getNext().key;if(!i.isEqual(o))return!1}return!0}toString(){let t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){let r=new n;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}};var mi=class{constructor(){this.fa=new rt(F.comparator)}track(t){let e=t.doc.key,r=this.fa.get(e);r?t.type!==0&&r.type===3?this.fa=this.fa.insert(e,t):t.type===3&&r.type!==1?this.fa=this.fa.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.fa=this.fa.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.fa=this.fa.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.fa=this.fa.remove(e):t.type===1&&r.type===2?this.fa=this.fa.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.fa=this.fa.insert(e,{type:2,doc:t.doc}):M(63341,{At:t,ga:r}):this.fa=this.fa.insert(e,t)}pa(){let t=[];return this.fa.inorderTraversal((e,r)=>{t.push(r)}),t}},hn=class n{constructor(t,e,r,i,o,a,u,h,f){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=h,this.hasCachedResults=f}static fromInitialDocuments(t,e,r,i,o){let a=[];return e.forEach(u=>{a.push({type:0,doc:u})}),new n(t,e,fi.emptySet(e),a,r,i,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Pi(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;let e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let i=0;i<e.length;i++)if(e[i].type!==r[i].type||!e[i].doc.isEqual(r[i].doc))return!1;return!0}};var ea=class{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(t=>t.ba())}},na=class{constructor(){this.queries=ol(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(e,r){let i=B(e),o=i.queries;i.queries=ol(),o.forEach((a,u)=>{for(let h of u.wa)h.onError(r)})})(this,new L(C.ABORTED,"Firestore shutting down"))}};function ol(){return new Zt(n=>Wl(n),Pi)}async function Ih(n,t){let e=B(n),r=3,i=t.query,o=e.queries.get(i);o?!o.Sa()&&t.ba()&&(r=2):(o=new ea,r=t.ba()?0:1);try{switch(r){case 0:o.ya=await e.onListen(i,!0);break;case 1:o.ya=await e.onListen(i,!1);break;case 2:await e.onFirstRemoteStoreListen(i)}}catch(a){let u=ka(a,`Initialization of query '${Ge(t.query)}' failed`);return void t.onError(u)}e.queries.set(i,o),o.wa.push(t),t.va(e.onlineState),o.ya&&t.Ca(o.ya)&&Oa(e)}async function Th(n,t){let e=B(n),r=t.query,i=3,o=e.queries.get(r);if(o){let a=o.wa.indexOf(t);a>=0&&(o.wa.splice(a,1),o.wa.length===0?i=t.ba()?0:1:!o.Sa()&&t.ba()&&(i=2))}switch(i){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function Cp(n,t){let e=B(n),r=!1;for(let i of t){let o=i.query,a=e.queries.get(o);if(a){for(let u of a.wa)u.Ca(i)&&(r=!0);a.ya=i}}r&&Oa(e)}function Pp(n,t,e){let r=B(n),i=r.queries.get(t);if(i)for(let o of i.wa)o.onError(e);r.queries.delete(t)}function Oa(n){n.Da.forEach(t=>{t.next()})}var ra,al;(al=ra||(ra={})).Fa="default",al.Cache="cache";var pi=class{constructor(t,e,r){this.query=t,this.Ma=e,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(t){if(!this.options.includeMetadataChanges){let r=[];for(let i of t.docChanges)i.type!==3&&r.push(i);t=new hn(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.xa?this.Na(t)&&(this.Ma.next(t),e=!0):this.Ba(t,this.onlineState)&&(this.La(t),e=!0),this.Oa=t,e}onError(t){this.Ma.error(t)}va(t){this.onlineState=t;let e=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,t)&&(this.La(this.Oa),e=!0),e}Ba(t,e){if(!t.fromCache||!this.ba())return!0;let r=e!=="Offline";return(!this.options.ka||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Na(t){if(t.docChanges.length>0)return!0;let e=this.Oa&&this.Oa.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}La(t){t=hn.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.xa=!0,this.Ma.next(t)}ba(){return this.options.source!==ra.Cache}};var gi=class{constructor(t){this.key=t}},yi=class{constructor(t){this.key=t}},ia=class{constructor(t,e){this.query=t,this.Ha=e,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=G(),this.mutatedKeys=G(),this.Xa=Hl(t),this.eu=new fi(this.Xa)}get tu(){return this.Ha}nu(t,e){let r=e?e.ru:new mi,i=e?e.eu:this.eu,o=e?e.mutatedKeys:this.mutatedKeys,a=i,u=!1,h=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,f=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(t.inorderTraversal((p,_)=>{let v=i.get(p),R=Di(this.query,_)?_:null,D=!!v&&this.mutatedKeys.has(v.key),k=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations),x=!1;v&&R?v.data.isEqual(R.data)?D!==k&&(r.track({type:3,doc:R}),x=!0):this.iu(v,R)||(r.track({type:2,doc:R}),x=!0,(h&&this.Xa(R,h)>0||f&&this.Xa(R,f)<0)&&(u=!0)):!v&&R?(r.track({type:0,doc:R}),x=!0):v&&!R&&(r.track({type:1,doc:v}),x=!0,(h||f)&&(u=!0)),x&&(R?(a=a.add(R),o=k?o.add(p):o.delete(p)):(a=a.delete(p),o=o.delete(p)))}),this.query.limit!==null)for(;a.size>this.query.limit;){let p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),o=o.delete(p.key),r.track({type:1,doc:p})}return{eu:a,ru:r,Ds:u,mutatedKeys:o}}iu(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,i){let o=this.eu;this.eu=t.eu,this.mutatedKeys=t.mutatedKeys;let a=t.ru.pa();a.sort((p,_)=>function(R,D){let k=x=>{switch(x){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{At:x})}};return k(R)-k(D)}(p.type,_.type)||this.Xa(p.doc,_.doc)),this.su(r),i=i!=null&&i;let u=e&&!i?this.ou():[],h=this.Za.size===0&&this.current&&!i?1:0,f=h!==this.Ya;return this.Ya=h,a.length!==0||f?{snapshot:new hn(this.query,t.eu,o,a,t.mutatedKeys,h===0,f,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:u}:{_u:u}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new mi,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(t){return!this.Ha.has(t)&&!!this.eu.has(t)&&!this.eu.get(t).hasLocalMutations}su(t){t&&(t.addedDocuments.forEach(e=>this.Ha=this.Ha.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Ha=this.Ha.delete(e)),this.current=t.current)}ou(){if(!this.current)return[];let t=this.Za;this.Za=G(),this.eu.forEach(r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))});let e=[];return t.forEach(r=>{this.Za.has(r)||e.push(new yi(r))}),this.Za.forEach(r=>{t.has(r)||e.push(new gi(r))}),e}uu(t){this.Ha=t.qs,this.Za=G();let e=this.nu(t.documents);return this.applyChanges(e,!0)}cu(){return hn.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}},La="SyncEngine",sa=class{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}},oa=class{constructor(t){this.key=t,this.lu=!1}},aa=class{constructor(t,e,r,i,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=i,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.hu={},this.Pu=new Zt(u=>Wl(u),Pi),this.Tu=new Map,this.Iu=new Set,this.du=new rt(F.comparator),this.Eu=new Map,this.Au=new rr,this.Ru={},this.Vu=new Map,this.mu=nr.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}};async function Dp(n,t,e=!0){let r=Ph(n),i,o=r.Pu.get(t);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),i=o.view.cu()):i=await bh(r,t,e,!0),i}async function xp(n,t){let e=Ph(n);await bh(e,t,!0,!1)}async function bh(n,t,e,r){let i=await mp(n.localStore,kt(t)),o=i.targetId,a=n.sharedClientState.addLocalQueryTarget(o,e),u;return r&&(u=await Vp(n,t,o,a==="current",i.resumeToken)),n.isPrimaryClient&&e&&gh(n.remoteStore,i),u}async function Vp(n,t,e,r,i){n.gu=(_,v,R)=>async function(k,x,z,q){let $=x.view.nu(z);$.Ds&&($=await nl(k.localStore,x.query,!1).then(({documents:I})=>x.view.nu(I,$)));let tt=q&&q.targetChanges.get(x.targetId),At=q&&q.targetMismatches.get(x.targetId)!=null,J=x.view.applyChanges($,k.isPrimaryClient,tt,At);return ul(k,x.targetId,J._u),J.snapshot}(n,_,v,R);let o=await nl(n.localStore,t,!0),a=new ia(t,o.qs),u=a.nu(o.documents),h=tr.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",i),f=a.applyChanges(u,n.isPrimaryClient,h);ul(n,e,f._u);let p=new sa(t,e,a);return n.Pu.set(t,p),n.Tu.has(e)?n.Tu.get(e).push(t):n.Tu.set(e,[t]),f.snapshot}async function Np(n,t,e){let r=B(n),i=r.Pu.get(t),o=r.Tu.get(i.targetId);if(o.length>1)return r.Tu.set(i.targetId,o.filter(a=>!Pi(a,t))),void r.Pu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await qo(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),e&&Da(r.remoteStore,i.targetId),ca(r,i.targetId)}).catch(pn)):(ca(r,i.targetId),await qo(r.localStore,i.targetId,!0))}async function kp(n,t){let e=B(n),r=e.Pu.get(t),i=e.Tu.get(r.targetId);e.isPrimaryClient&&i.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),Da(e.remoteStore,r.targetId))}async function Op(n,t,e){let r=zp(n);try{let i=await function(a,u){let h=B(a),f=Z.now(),p=u.reduce((R,D)=>R.add(D.key),G()),_,v;return h.persistence.runTransaction("Locally write mutations","readwrite",R=>{let D=te(),k=G();return h.Os.getEntries(R,p).next(x=>{D=x,D.forEach((z,q)=>{q.isValidDocument()||(k=k.add(z))})}).next(()=>h.localDocuments.getOverlayedDocuments(R,D)).next(x=>{_=x;let z=[];for(let q of u){let $=Um(q,_.get(q.key).overlayedDocument);$!=null&&z.push(new Ft(q.key,$,ql($.value.mapValue),ce.exists(!0)))}return h.mutationQueue.addMutationBatch(R,f,z,u)}).next(x=>{v=x;let z=x.applyToLocalDocumentSet(_,k);return h.documentOverlayCache.saveOverlays(R,x.batchId,z)})}).then(()=>({batchId:v.batchId,changes:Xl(_)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(i.batchId),function(a,u,h){let f=a.Ru[a.currentUser.toKey()];f||(f=new rt(j)),f=f.insert(u,h),a.Ru[a.currentUser.toKey()]=f}(r,i.batchId,e),await hr(r,i.changes),await Ni(r.remoteStore)}catch(i){let o=ka(i,"Failed to persist write");e.reject(o)}}async function Ah(n,t){let e=B(n);try{let r=await hp(e.localStore,t);t.targetChanges.forEach((i,o)=>{let a=e.Eu.get(o);a&&(Q(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?a.lu=!0:i.modifiedDocuments.size>0?Q(a.lu,14607):i.removedDocuments.size>0&&(Q(a.lu,42227),a.lu=!1))}),await hr(e,r,t)}catch(r){await pn(r)}}function cl(n,t,e){let r=B(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){let i=[];r.Pu.forEach((o,a)=>{let u=a.view.va(t);u.snapshot&&i.push(u.snapshot)}),function(a,u){let h=B(a);h.onlineState=u;let f=!1;h.queries.forEach((p,_)=>{for(let v of _.wa)v.va(u)&&(f=!0)}),f&&Oa(h)}(r.eventManager,t),i.length&&r.hu.J_(i),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Lp(n,t,e){let r=B(n);r.sharedClientState.updateQueryState(t,"rejected",e);let i=r.Eu.get(t),o=i&&i.key;if(o){let a=new rt(F.comparator);a=a.insert(o,Pt.newNoDocument(o,U.min()));let u=G().add(o),h=new ti(U.min(),new Map,new rt(j),a,u);await Ah(r,h),r.du=r.du.remove(o),r.Eu.delete(t),Ma(r)}else await qo(r.localStore,t,!1).then(()=>ca(r,t,e)).catch(pn)}async function Mp(n,t){let e=B(n),r=t.batch.batchId;try{let i=await lp(e.localStore,t);Rh(e,r,null),Sh(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await hr(e,i)}catch(i){await pn(i)}}async function Fp(n,t,e){let r=B(n);try{let i=await function(a,u){let h=B(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let p;return h.mutationQueue.lookupMutationBatch(f,u).next(_=>(Q(_!==null,37113),p=_.keys(),h.mutationQueue.removeMutationBatch(f,_))).next(()=>h.mutationQueue.performConsistencyCheck(f)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(f,p,u)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,p)).next(()=>h.localDocuments.getDocuments(f,p))})}(r.localStore,t);Rh(r,t,e),Sh(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await hr(r,i)}catch(i){await pn(i)}}function Sh(n,t){(n.Vu.get(t)||[]).forEach(e=>{e.resolve()}),n.Vu.delete(t)}function Rh(n,t,e){let r=B(n),i=r.Ru[r.currentUser.toKey()];if(i){let o=i.get(t);o&&(e?o.reject(e):o.resolve(),i=i.remove(t)),r.Ru[r.currentUser.toKey()]=i}}function ca(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(let r of n.Tu.get(t))n.Pu.delete(r),e&&n.hu.pu(r,e);n.Tu.delete(t),n.isPrimaryClient&&n.Au.zr(t).forEach(r=>{n.Au.containsKey(r)||Ch(n,r)})}function Ch(n,t){n.Iu.delete(t.path.canonicalString());let e=n.du.get(t);e!==null&&(Da(n.remoteStore,e),n.du=n.du.remove(t),n.Eu.delete(e),Ma(n))}function ul(n,t,e){for(let r of e)r instanceof gi?(n.Au.addReference(r.key,t),Bp(n,r)):r instanceof yi?(O(La,"Document no longer in limbo: "+r.key),n.Au.removeReference(r.key,t),n.Au.containsKey(r.key)||Ch(n,r.key)):M(19791,{yu:r})}function Bp(n,t){let e=t.key,r=e.path.canonicalString();n.du.get(e)||n.Iu.has(r)||(O(La,"New document in limbo: "+e),n.Iu.add(r),Ma(n))}function Ma(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){let t=n.Iu.values().next().value;n.Iu.delete(t);let e=new F(it.fromString(t)),r=n.mu.next();n.Eu.set(r,new oa(e)),n.du=n.du.insert(e,r),gh(n.remoteStore,new er(kt(Ci(e.path)),r,"TargetPurposeLimboResolution",Ze.ue))}}async function hr(n,t,e){let r=B(n),i=[],o=[],a=[];r.Pu.isEmpty()||(r.Pu.forEach((u,h)=>{a.push(r.gu(h,t,e).then(f=>{var p;if((f||e)&&r.isPrimaryClient){let _=f?!f.fromCache:(p=e?.targetChanges.get(h.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(h.targetId,_?"current":"not-current")}if(f){i.push(f);let _=Mo.Es(h.targetId,f);o.push(_)}}))}),await Promise.all(a),r.hu.J_(i),await async function(h,f){let p=B(h);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",_=>P.forEach(f,v=>P.forEach(v.Is,R=>p.persistence.referenceDelegate.addReference(_,v.targetId,R)).next(()=>P.forEach(v.ds,R=>p.persistence.referenceDelegate.removeReference(_,v.targetId,R)))))}catch(_){if(!gn(_))throw _;O(Pa,"Failed to update sequence numbers: "+_)}for(let _ of f){let v=_.targetId;if(!_.fromCache){let R=p.Fs.get(v),D=R.snapshotVersion,k=R.withLastLimboFreeSnapshotVersion(D);p.Fs=p.Fs.insert(v,k)}}}(r.localStore,o))}async function Up(n,t){let e=B(n);if(!e.currentUser.isEqual(t)){O(La,"User change. New user:",t.toKey());let r=await mh(e.localStore,t);e.currentUser=t,function(o,a){o.Vu.forEach(u=>{u.forEach(h=>{h.reject(new L(C.CANCELLED,a))})}),o.Vu.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await hr(e,r.Bs)}}function qp(n,t){let e=B(n),r=e.Eu.get(t);if(r&&r.lu)return G().add(r.key);{let i=G(),o=e.Tu.get(t);if(!o)return i;for(let a of o){let u=e.Pu.get(a);i=i.unionWith(u.view.tu)}return i}}function Ph(n){let t=B(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=Ah.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=qp.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Lp.bind(null,t),t.hu.J_=Cp.bind(null,t.eventManager),t.hu.pu=Pp.bind(null,t.eventManager),t}function zp(n){let t=B(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Mp.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Fp.bind(null,t),t}var dn=class{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=xi(t.databaseInfo.databaseId),this.sharedClientState=this.bu(t),this.persistence=this.Du(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Cu(t,this.localStore),this.indexBackfillerScheduler=this.Fu(t,this.localStore)}Cu(t,e){return null}Fu(t,e){return null}vu(t){return up(this.persistence,new Bo,t.initialUser,this.serializer)}Du(t){return new oi(Lo.Vi,this.serializer)}bu(t){return new zo}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};dn.provider={build:()=>new dn};var ua=class extends dn{constructor(t){super(),this.cacheSizeBytes=t}Cu(t,e){Q(this.persistence.referenceDelegate instanceof ai,46915);let r=this.persistence.referenceDelegate.garbageCollector;return new To(r,t.asyncQueue,e)}Du(t){let e=this.cacheSizeBytes!==void 0?St.withCacheSize(this.cacheSizeBytes):St.DEFAULT;return new oi(r=>ai.Vi(r,e),this.serializer)}};var ir=class{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>cl(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Up.bind(null,this.syncEngine),await Rp(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new na}()}createDatastore(t){let e=xi(t.databaseInfo.databaseId),r=function(o){return new Wo(o)}(t.databaseInfo);return function(o,a,u,h){return new Jo(o,a,u,h)}(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return function(r,i,o,a,u){return new Zo(r,i,o,a,u)}(this.localStore,this.datastore,t.asyncQueue,e=>cl(this.syncEngine,e,0),function(){return ui.C()?new ui:new jo}())}createSyncEngine(t,e){return function(i,o,a,u,h,f,p){let _=new aa(i,o,a,u,h,f);return p&&(_.fu=!0),_}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(i){let o=B(i);O(Oe,"RemoteStore shutting down."),o.Ia.add(5),await lr(o),o.Ea.shutdown(),o.Aa.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}};ir.provider={build:()=>new ir};var _i=class{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.xu(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.xu(this.observer.error,t):Xt("Uncaught Error in snapshot listener:",t.toString()))}Ou(){this.muted=!0}xu(t,e){setTimeout(()=>{this.muted||t(e)},0)}};var pe="FirestoreClient",la=class{constructor(t,e,r,i,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this.databaseInfo=i,this.user=ut.UNAUTHENTICATED,this.clientId=Qn.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async a=>{O(pe,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(O(pe,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();let t=new xt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){let r=ka(e,"Failed to shutdown persistence");t.reject(r)}}),t.promise}};async function Os(n,t){n.asyncQueue.verifyOperationInProgress(),O(pe,"Initializing OfflineComponentProvider");let e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await mh(t.localStore,i),r=i)}),t.persistence.setDatabaseDeletedListener(()=>{de("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then(()=>{O("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(i=>{de("Terminating Firestore due to IndexedDb database deletion failed",i)})}),n._offlineComponents=t}async function ll(n,t){n.asyncQueue.verifyOperationInProgress();let e=await jp(n);O(pe,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener(r=>sl(t.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>sl(t.remoteStore,i)),n._onlineComponents=t}async function jp(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){O(pe,"Using user provided OfflineComponentProvider");try{await Os(n,n._uninitializedComponentsProvider._offline)}catch(t){let e=t;if(!function(i){return i.name==="FirebaseError"?i.code===C.FAILED_PRECONDITION||i.code===C.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(e))throw e;de("Error using user provided cache. Falling back to memory cache: "+e),await Os(n,new dn)}}else O(pe,"Using default OfflineComponentProvider"),await Os(n,new ua(void 0));return n._offlineComponents}async function Dh(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(O(pe,"Using user provided OnlineComponentProvider"),await ll(n,n._uninitializedComponentsProvider._online)):(O(pe,"Using default OnlineComponentProvider"),await ll(n,new ir))),n._onlineComponents}function $p(n){return Dh(n).then(t=>t.syncEngine)}async function ha(n){let t=await Dh(n),e=t.eventManager;return e.onListen=Dp.bind(null,t.syncEngine),e.onUnlisten=Np.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=xp.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=kp.bind(null,t.syncEngine),e}function Gp(n,t,e={}){let r=new xt;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,u,h,f){let p=new _i({next:v=>{p.Ou(),a.enqueueAndForget(()=>Th(o,_));let R=v.docs.has(u);!R&&v.fromCache?f.reject(new L(C.UNAVAILABLE,"Failed to get document because the client is offline.")):R&&v.fromCache&&h&&h.source==="server"?f.reject(new L(C.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):f.resolve(v)},error:v=>f.reject(v)}),_=new pi(Ci(u.path),p,{includeMetadataChanges:!0,ka:!0});return Ih(o,_)}(await ha(n),n.asyncQueue,t,e,r)),r.promise}function xh(n){let t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}var hl=new Map;var Vh="firestore.googleapis.com",dl=!0,wi=class{constructor(t){var e,r;if(t.host===void 0){if(t.ssl!==void 0)throw new L(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Vh,this.ssl=dl}else this.host=t.host,this.ssl=(e=t.ssl)!==null&&e!==void 0?e:dl;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=fh;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<op)throw new L(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}rm("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=xh((r=t.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new L(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new L(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new L(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}},sr=class{constructor(t,e,r,i){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new wi({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new L(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new L(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new wi(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Ls;switch(r.type){case"firstParty":return new Us(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new L(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){let r=hl.get(e);r&&(O("ComponentProvider","Removing Datastore"),hl.delete(e),r.terminate())}(this),Promise.resolve()}};function Fa(n,t,e,r={}){var i;n=Vt(n,sr);let o=Nr(t),a=n._getSettings(),u=Object.assign(Object.assign({},a),{emulatorOptions:n._getEmulatorOptions()}),h=`${t}:${e}`;o&&(eu(`https://${h}`),ru("Firestore",!0)),a.host!==Vh&&a.host!==h&&de("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");let f=Object.assign(Object.assign({},a),{host:h,ssl:o,emulatorOptions:r});if(!qe(f,u)&&(n._setSettings(f),r.mockUserToken)){let p,_;if(typeof r.mockUserToken=="string")p=r.mockUserToken,_=ut.MOCK_USER;else{p=nu(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);let v=r.mockUserToken.sub||r.mockUserToken.user_id;if(!v)throw new L(C.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");_=new ut(v)}n._authCredentials=new Ms(new Gr(p,_))}}var vi=class n{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new n(this.firestore,t,this._query)}},dt=class n{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new or(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new n(this.firestore,t,this._key)}toJSON(){return{type:n._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(ur(e,n._jsonSchema))return new n(t,r||null,new F(it.fromString(e.referencePath)))}};dt._jsonSchemaVersion="firestore/documentReference/1.0",dt._jsonSchema={type:at("string",dt._jsonSchemaVersion),referencePath:at("string")};var or=class n extends vi{constructor(t,e,r){super(t,e,Ci(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let t=this._path.popLast();return t.isEmpty()?null:new dt(this.firestore,null,new F(t))}withConverter(t){return new n(this.firestore,t,this._path)}};function Bt(n,t,...e){if(n=Gt(n),arguments.length===1&&(t=Qn.newId()),nm("doc","path",t),n instanceof sr){let r=it.fromString(t,...e);return xu(r),new dt(n,null,new F(r))}{if(!(n instanceof dt||n instanceof or))throw new L(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(it.fromString(t,...e));return xu(r),new dt(n.firestore,n instanceof or?n.converter:null,new F(r))}}var fl="AsyncQueue",Ei=class{constructor(t=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new li(this,"async_queue_retry"),this.oc=()=>{let r=ks();r&&O(fl,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=t;let e=ks();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.ac(),this.uc(t)}enterRestrictedMode(t){if(!this.Xu){this.Xu=!0,this.rc=t||!1;let e=ks();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.oc)}}enqueue(t){if(this.ac(),this.Xu)return new Promise(()=>{});let e=new xt;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Zu.push(t),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(t){if(!gn(t))throw t;O(fl,"Operation failed with retryable error: "+t)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(t){let e=this._c.then(()=>(this.nc=!0,t().catch(r=>{throw this.tc=r,this.nc=!1,Xt("INTERNAL UNHANDLED ERROR: ",ml(r)),r}).then(r=>(this.nc=!1,r))));return this._c=e,e}enqueueAfterDelay(t,e,r){this.ac(),this.sc.indexOf(t)>-1&&(e=0);let i=ta.createAndSchedule(this,t,e,r,o=>this.lc(o));return this.ec.push(i),i}ac(){this.tc&&M(47125,{hc:ml(this.tc)})}verifyOperationInProgress(){}async Pc(){let t;do t=this._c,await t;while(t!==this._c)}Tc(t){for(let e of this.ec)if(e.timerId===t)return!0;return!1}Ic(t){return this.Pc().then(()=>{this.ec.sort((e,r)=>e.targetTimeMs-r.targetTimeMs);for(let e of this.ec)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Pc()})}dc(t){this.sc.push(t)}lc(t){let e=this.ec.indexOf(t);this.ec.splice(e,1)}};function ml(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}function pl(n){return function(e,r){if(typeof e!="object"||e===null)return!1;let i=e;for(let o of r)if(o in i&&typeof i[o]=="function")return!0;return!1}(n,["next","error","complete"])}var ge=class extends sr{constructor(t,e,r,i){super(t,e,r,i),this.type="firestore",this._queue=new Ei,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let t=this._firestoreClient.terminate();this._queue=new Ei(t),this._firestoreClient=void 0,await t}}};function Nh(n,t){let e=typeof n=="object"?n:Iu(),r=typeof n=="string"?n:t||Xr,i=wu(e,"firestore").getImmediate({identifier:r});if(!i._initialized){let o=tu("firestore");o&&Fa(i,...o)}return i}function Ba(n){if(n._terminated)throw new L(C.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Kp(n),n._firestoreClient}function Kp(n){var t,e,r;let i=n._freezeSettings(),o=function(u,h,f,p){return new Gs(u,h,f,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,xh(p.experimentalLongPollingOptions),p.useFetchStreams,p.isUsingEmulator)}(n._databaseId,((t=n._app)===null||t===void 0?void 0:t.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((e=i.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new la(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(u){let h=u?._online.build();return{_offline:u?._offline.build(h),_online:h}}(n._componentsProvider))}var ue=class n{constructor(t){this._byteString=t}static fromBase64String(t){try{return new n(_t.fromBase64String(t))}catch(e){throw new L(C.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new n(_t.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:n._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(ur(t,n._jsonSchema))return n.fromBase64String(t.bytes)}};ue._jsonSchemaVersion="firestore/bytes/1.0",ue._jsonSchema={type:at("string",ue._jsonSchemaVersion),bytes:at("string")};var fn=class{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new L(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Tt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}};var ar=class{constructor(t){this._methodName=t}};var le=class n{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new L(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new L(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return j(this._lat,t._lat)||j(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:n._jsonSchemaVersion}}static fromJSON(t){if(ur(t,n._jsonSchema))return new n(t.latitude,t.longitude)}};le._jsonSchemaVersion="firestore/geoPoint/1.0",le._jsonSchema={type:at("string",le._jsonSchemaVersion),latitude:at("number"),longitude:at("number")};var he=class n{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(r,i){if(r.length!==i.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==i[o])return!1;return!0}(this._values,t._values)}toJSON(){return{type:n._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(ur(t,n._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every(e=>typeof e=="number"))return new n(t.vectorValues);throw new L(C.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}};he._jsonSchemaVersion="firestore/vectorValue/1.0",he._jsonSchema={type:at("string",he._jsonSchemaVersion),vectorValues:at("object")};var Wp=/^__.*__$/,da=class{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new Ft(t,this.data,this.fieldMask,e,this.fieldTransforms):new ke(t,this.data,e,this.fieldTransforms)}},Ii=class{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return new Ft(t,this.data,this.fieldMask,e,this.fieldTransforms)}};function kh(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{Ec:n})}}var fa=class n{constructor(t,e,r,i,o,a){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=i,o===void 0&&this.Ac(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(t){return new n(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(t){var e;let r=(e=this.path)===null||e===void 0?void 0:e.child(t),i=this.Rc({path:r,mc:!1});return i.fc(t),i}gc(t){var e;let r=(e=this.path)===null||e===void 0?void 0:e.child(t),i=this.Rc({path:r,mc:!1});return i.Ac(),i}yc(t){return this.Rc({path:void 0,mc:!0})}wc(t){return Ti(t,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}Ac(){if(this.path)for(let t=0;t<this.path.length;t++)this.fc(this.path.get(t))}fc(t){if(t.length===0)throw this.wc("Document fields must not be empty");if(kh(this.Ec)&&Wp.test(t))throw this.wc('Document fields cannot begin and end with "__"')}},ma=class{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||xi(t)}Dc(t,e,r,i=!1){return new fa({Ec:t,methodName:e,bc:r,path:Tt.emptyPath(),mc:!1,Sc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function Oh(n){let t=n._freezeSettings(),e=xi(n._databaseId);return new ma(n._databaseId,!!t.ignoreUndefinedProperties,e)}function Hp(n,t,e,r,i,o={}){let a=n.Dc(o.merge||o.mergeFields?2:0,t,e,i);Ua("Data must be an object, but it was:",a,r);let u=Lh(r,a),h,f;if(o.merge)h=new Rt(a.fieldMask),f=a.fieldTransforms;else if(o.mergeFields){let p=[];for(let _ of o.mergeFields){let v=pa(t,_,e);if(!a.contains(v))throw new L(C.INVALID_ARGUMENT,`Field '${v}' is specified in your field mask but missing from your input data.`);Fh(p,v)||p.push(v)}h=new Rt(p),f=a.fieldTransforms.filter(_=>h.covers(_.field))}else h=null,f=a.fieldTransforms;return new da(new It(u),h,f)}var cr=class n extends ar{_toFieldTransform(t){if(t.Ec!==2)throw t.Ec===1?t.wc(`${this._methodName}() can only appear at the top level of your update data`):t.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof n}};function Qp(n,t,e,r){let i=n.Dc(1,t,e);Ua("Data must be an object, but it was:",i,r);let o=[],a=It.empty();ye(r,(h,f)=>{let p=qa(t,h,e);f=Gt(f);let _=i.gc(p);if(f instanceof cr)o.push(p);else{let v=ki(f,_);v!=null&&(o.push(p),a.set(p,v))}});let u=new Rt(o);return new Ii(a,u,i.fieldTransforms)}function Xp(n,t,e,r,i,o){let a=n.Dc(1,t,e),u=[pa(t,r,e)],h=[i];if(o.length%2!=0)throw new L(C.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let v=0;v<o.length;v+=2)u.push(pa(t,o[v])),h.push(o[v+1]);let f=[],p=It.empty();for(let v=u.length-1;v>=0;--v)if(!Fh(f,u[v])){let R=u[v],D=h[v];D=Gt(D);let k=a.gc(R);if(D instanceof cr)f.push(R);else{let x=ki(D,k);x!=null&&(f.push(R),p.set(R,x))}}let _=new Rt(f);return new Ii(p,_,a.fieldTransforms)}function ki(n,t){if(Mh(n=Gt(n)))return Ua("Unsupported field value:",t,n),Lh(n,t);if(n instanceof ar)return function(r,i){if(!kh(i.Ec))throw i.wc(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.wc(`${r._methodName}() is not currently supported inside arrays`);let o=r._toFieldTransform(i);o&&i.fieldTransforms.push(o)}(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.mc&&t.Ec!==4)throw t.wc("Nested arrays are not supported");return function(r,i){let o=[],a=0;for(let u of r){let h=ki(u,i.yc(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}}(n,t)}return function(r,i){if((r=Gt(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Om(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){let o=Z.fromDate(r);return{timestampValue:ii(i.serializer,o)}}if(r instanceof Z){let o=new Z(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:ii(i.serializer,o)}}if(r instanceof le)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof ue)return{bytesValue:oh(i.serializer,r._byteString)};if(r instanceof dt){let o=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw i.wc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:Ca(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof he)return function(a,u){return{mapValue:{fields:{[Ia]:{stringValue:Ta},[tn]:{arrayValue:{values:a.toArray().map(f=>{if(typeof f!="number")throw u.wc("VectorValues must only contain numeric values.");return Ra(u.serializer,f)})}}}}}}(r,i);throw i.wc(`Unsupported field value: ${wa(r)}`)}(n,t)}function Lh(n,t){let e={};return Nl(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):ye(n,(r,i)=>{let o=ki(i,t.Vc(r));o!=null&&(e[r]=o)}),{mapValue:{fields:e}}}function Mh(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Z||n instanceof le||n instanceof ue||n instanceof dt||n instanceof ar||n instanceof he)}function Ua(n,t,e){if(!Mh(e)||!_l(e)){let r=wa(e);throw r==="an object"?t.wc(n+" a custom object"):t.wc(n+" "+r)}}function pa(n,t,e){if((t=Gt(t))instanceof fn)return t._internalPath;if(typeof t=="string")return qa(n,t);throw Ti("Field path arguments must be of type string or ",n,!1,void 0,e)}var Jp=new RegExp("[~\\*/\\[\\]]");function qa(n,t,e){if(t.search(Jp)>=0)throw Ti(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new fn(...t.split("."))._internalPath}catch{throw Ti(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function Ti(n,t,e,r,i){let o=r&&!r.isEmpty(),a=i!==void 0,u=`Function ${t}() called with invalid data`;e&&(u+=" (via `toFirestore()`)"),u+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${r}`),a&&(h+=` in document ${i}`),h+=")"),new L(C.INVALID_ARGUMENT,u+n+h)}function Fh(n,t){return n.some(e=>e.isEqual(t))}var bi=class{constructor(t,e,r,i,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=i,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new dt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let t=new ga(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){let e=this._document.data.field(Bh("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}},ga=class extends bi{data(){return super.data()}};function Bh(n,t){return typeof t=="string"?qa(n,t):t instanceof fn?t._internalPath:t._delegate._internalPath}function Yp(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new L(C.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}var ya=class{convertValue(t,e="none"){switch(fe(t)){case 0:return null;case 1:return t.booleanValue;case 2:return et(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Yt(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw M(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){let r={};return ye(t,(i,o)=>{r[i]=this.convertValue(o,e)}),r}convertVectorValue(t){var e,r,i;let o=(i=(r=(e=t.fields)===null||e===void 0?void 0:e[tn].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(a=>et(a.doubleValue));return new he(o)}convertGeoPoint(t){return new le(et(t.latitude),et(t.longitude))}convertArray(t,e){return(t.values||[]).map(r=>this.convertValue(r,e))}convertServerTimestamp(t,e){switch(e){case"previous":let r=Ri(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(Yn(t));default:return null}}convertTimestamp(t){let e=Jt(t);return new Z(e.seconds,e.nanos)}convertDocumentKey(t,e){let r=it.fromString(t);Q(dh(r),9688,{name:t});let i=new Jr(r.get(1),r.get(3)),o=new F(r.popFirst(5));return i.isEqual(e)||Xt(`Document ${o} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}};function Zp(n,t,e){let r;return r=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,r}var Ce=class{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}},Pe=class n extends bi{constructor(t,e,r,i,o,a){super(t,e,r,i,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){let e=new Xe(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){let r=this._document.data.field(Bh("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new L(C.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let t=this._document,e={};return e.type=n._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}};Pe._jsonSchemaVersion="firestore/documentSnapshot/1.0",Pe._jsonSchema={type:at("string",Pe._jsonSchemaVersion),bundleSource:at("string","DocumentSnapshot"),bundleName:at("string"),bundle:at("string")};var Xe=class extends Pe{data(t={}){return super.data(t)}},Je=class n{constructor(t,e,r,i){this._firestore=t,this._userDataWriter=e,this._snapshot=i,this.metadata=new Ce(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){let t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(r=>{t.call(e,new Xe(this._firestore,this._userDataWriter,r.key,r,new Ce(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){let e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new L(C.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(i,o){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(u=>{let h=new Xe(i._firestore,i._userDataWriter,u.doc.key,u.doc,new Ce(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);return u.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(u=>o||u.type!==3).map(u=>{let h=new Xe(i._firestore,i._userDataWriter,u.doc.key,u.doc,new Ce(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter),f=-1,p=-1;return u.type!==0&&(f=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),p=a.indexOf(u.doc.key)),{type:tg(u.type),doc:h,oldIndex:f,newIndex:p}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new L(C.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let t={};t.type=n._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=Qn.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;let e=[],r=[],i=[];return this.docs.forEach(o=>{o._document!==null&&(e.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),i.push(o.ref.path))}),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}};function tg(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:n})}}function Uh(n){n=Vt(n,dt);let t=Vt(n.firestore,ge);return Gp(Ba(t),n._key).then(e=>$h(t,n,e))}Je._jsonSchemaVersion="firestore/querySnapshot/1.0",Je._jsonSchema={type:at("string",Je._jsonSchemaVersion),bundleSource:at("string","QuerySnapshot"),bundleName:at("string"),bundle:at("string")};var Ai=class extends ya{constructor(t){super(),this.firestore=t}convertBytes(t){return new ue(t)}convertReference(t){let e=this.convertDocumentKey(t,this.firestore._databaseId);return new dt(this.firestore,null,e)}};function qh(n,t,e){n=Vt(n,dt);let r=Vt(n.firestore,ge),i=Zp(n.converter,t,e);return jh(r,[Hp(Oh(r),"setDoc",n._key,i,n.converter!==null,e).toMutation(n._key,ce.none())])}function _e(n,t,e,...r){n=Vt(n,dt);let i=Vt(n.firestore,ge),o=Oh(i),a;return a=typeof(t=Gt(t))=="string"||t instanceof fn?Xp(o,"updateDoc",n._key,t,e,r):Qp(o,"updateDoc",n._key,t),jh(i,[a.toMutation(n._key,ce.exists(!0))])}function zh(n,...t){var e,r,i;n=Gt(n);let o={includeMetadataChanges:!1,source:"default"},a=0;typeof t[a]!="object"||pl(t[a])||(o=t[a++]);let u={includeMetadataChanges:o.includeMetadataChanges,source:o.source};if(pl(t[a])){let _=t[a];t[a]=(e=_.next)===null||e===void 0?void 0:e.bind(_),t[a+1]=(r=_.error)===null||r===void 0?void 0:r.bind(_),t[a+2]=(i=_.complete)===null||i===void 0?void 0:i.bind(_)}let h,f,p;if(n instanceof dt)f=Vt(n.firestore,ge),p=Ci(n._key.path),h={next:_=>{t[a]&&t[a]($h(f,n,_))},error:t[a+1],complete:t[a+2]};else{let _=Vt(n,vi);f=Vt(_.firestore,ge),p=_._query;let v=new Ai(f);h={next:R=>{t[a]&&t[a](new Je(f,v,_,R))},error:t[a+1],complete:t[a+2]},Yp(n._query)}return function(v,R,D,k){let x=new _i(k),z=new pi(R,x,D);return v.asyncQueue.enqueueAndForget(async()=>Ih(await ha(v),z)),()=>{x.Ou(),v.asyncQueue.enqueueAndForget(async()=>Th(await ha(v),z))}}(Ba(f),p,u,h)}function jh(n,t){return function(r,i){let o=new xt;return r.asyncQueue.enqueueAndForget(async()=>Op(await $p(r),i,o)),o.promise}(Ba(n),t)}function $h(n,t,e){let r=e.docs.get(t._key),i=new Ai(n);return new Pe(n,i,t._key,r,new Ce(e.hasPendingWrites,e.fromCache),t.converter)}function Gh(){return new cr("deleteField")}(function(t,e=!0){(function(i){mn=i})(Eu),qn(new Kt("firestore",(r,{instanceIdentifier:i,options:o})=>{let a=r.getProvider("app").getImmediate(),u=new ge(new Fs(r.getProvider("auth-internal")),new qs(a,r.getProvider("app-check-internal")),function(f,p){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new L(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Jr(f.options.projectId,p)}(a,i),a);return o=Object.assign({useFetchStreams:e},o),u._setSettings(o),u},"PUBLIC").setMultipleInstances(!0)),ae(Ru,Cu,t),ae(Ru,Cu,"esm2017")})();var eg={apiKey:"AIzaSyDummyKeyForFreeTier",projectId:"spelling-bee-relay-1025"},ng=As(eg),Ut=Nh(ng),Kh=localStorage.getItem("sb_use_emulator")==="true";Kh?(console.log("%c>>> MULTIPLAYER: CONNECTED TO LOCAL EMULATOR (127.0.0.1:8080) <<<","color: #f7da21; font-weight: bold; background: #000; padding: 2px 5px;"),Fa(Ut,"127.0.0.1",8080)):console.log("%c>>> MULTIPLAYER: CONNECTED TO REMOTE FIREBASE <<<","color: #4ecdc4; font-weight: bold; background: #000; padding: 2px 5px;");globalThis.switchMultiplayerEnv=()=>{let n=!Kh;localStorage.setItem("sb_use_emulator",n),console.log(`Switching to ${n?"LOCAL":"REMOTE"} environment. Reloading...`),location.reload()};console.log("Registered global helper: switchMultiplayerEnv()");var bt=[{name:"Beginner",pct:0},{name:"Good Start",pct:.02},{name:"Moving Up",pct:.05},{name:"Good",pct:.08},{name:"Solid",pct:.15},{name:"Nice",pct:.25},{name:"Great",pct:.4},{name:"Amazing",pct:.5},{name:"Genius",pct:.7},{name:"Queen Bee",pct:1}],S={playerId:localStorage.getItem("sb_playerId")||crypto.randomUUID(),currentInput:"",foundWords:[],wordFinders:{},score:0,puzzle:null,puzzleId:null,attributionMode:0,multiplayer:{roomCode:null,nickname:localStorage.getItem("sb_nickname")||"",teammates:[],step:"nickname"},dbRefs:{}};localStorage.setItem("sb_playerId",S.playerId);var N={input:document.getElementById("word-input")||document.getElementById("input-text"),cursor:document.querySelector(".cursor"),score:document.getElementById("score-value")||document.getElementById("score"),messageArea:document.getElementById("message-toast")||document.getElementById("message-area"),hive:document.getElementById("hive-container"),levelText:document.getElementById("rank-label")||document.getElementById("current-level"),bar:document.getElementById("progress-fill"),wordsList:document.getElementById("words-list"),foundCount:document.getElementById("found-count"),toggleWordsBtn:document.getElementById("toggle-words-btn"),toggleAttributionBtn:document.getElementById("toggle-attribution-btn"),deleteBtn:document.querySelector(".action-btn.delete")||document.getElementById("delete-btn"),enterBtn:document.querySelector(".action-btn.enter")||document.getElementById("enter-btn"),restartBtn:document.getElementById("restart-btn"),shuffleBtn:document.getElementById("shuffle-btn"),dotsContainer:document.querySelector(".dots-container"),cells:{center:document.getElementById("cell-center"),outer:[document.getElementById("cell-1"),document.getElementById("cell-2"),document.getElementById("cell-3"),document.getElementById("cell-4"),document.getElementById("cell-5"),document.getElementById("cell-6")]},multi:{btn:document.getElementById("multiplayer-btn"),screen:document.getElementById("multiplayer-screen"),closeBtn:document.getElementById("close-multi-btn"),stepNickname:document.getElementById("multi-setup")||document.getElementById("multi-nickname"),stepMenu:document.getElementById("multi-menu"),stepJoin:document.getElementById("multi-join"),stepActive:document.getElementById("multi-active"),nicknameInput:document.getElementById("nickname-input"),saveNicknameBtn:document.getElementById("save-nickname-btn"),createRoomBtn:document.getElementById("create-room-btn"),roomCodeInput:document.getElementById("room-code-input"),confirmJoinBtn:document.getElementById("confirm-join-btn")||document.getElementById("join-confirm-btn"),backBtn:document.getElementById("back-to-menu-btn")||document.getElementById("join-back-btn"),leaveBtn:document.getElementById("leave-room-btn"),activeRoomCode:document.getElementById("active-room-code"),playerList:document.getElementById("player-list"),displayNickname:document.getElementById("display-nickname"),editNicknameMenu:document.getElementById("edit-nickname-menu"),editNicknameRoom:document.getElementById("edit-nickname-room"),banner:document.getElementById("multiplayer-banner"),bannerRoomCode:document.getElementById("banner-room-code"),btns:{open:document.getElementById("multiplayer-btn"),close:document.getElementById("close-multi-btn"),saveNickname:document.getElementById("save-nickname-btn"),createRoom:document.getElementById("create-room-btn"),joinRoom:document.getElementById("join-room-btn"),confirmJoin:document.getElementById("confirm-join-btn")||document.getElementById("join-confirm-btn"),backToMenu:document.getElementById("back-to-menu-btn")||document.getElementById("join-back-btn"),leaveRoom:document.getElementById("leave-room-btn")}}};document.addEventListener("DOMContentLoaded",rg);async function rg(){await sg(),S.playerId||(S.playerId=crypto.randomUUID(),ee());try{S.puzzle?za(S.puzzleId):await Ga()}catch(n){console.error("Init Error:",n)}S.multiplayer.roomCode&&Jh(S.multiplayer.roomCode,!1).catch(n=>{console.warn("Auto-join failed:",n),S.multiplayer.roomCode=null,ee()}),ja(),mr(),_n(),Oi(),Ig(),document.addEventListener("keydown",Tg)}function ig(){let n=Math.floor(Math.random()*Object.keys(PUZZLES).length);za(n),ve("New Random Puzzle!",1e3),S.multiplayer.roomCode&&td(S.puzzleId)}function za(n){let t,e;if(typeof n=="number")e=n,t=PUZZLES[e];else if(typeof n=="string"&&n.startsWith("nyt-")){S.puzzleId!==n&&Ga(!1);return}else e=parseInt(n),t=PUZZLES[e];t&&(S.puzzleId=e,S.puzzle=t,S.foundWords=[],S.score=0,S.currentInput="",ee(),ja(),mr(),_n())}function ee(){chrome.storage.local.set({sb_state:S})}async function sg(){return new Promise(n=>{chrome.storage.local.get(["sb_state"],t=>{t.sb_state&&(S={...S,...t.sb_state},t.sb_state.multiplayer&&(S.multiplayer={...S.multiplayer,...t.sb_state.multiplayer})),n()})})}function ja(){let n=S.puzzle;n&&(N.cells.center.textContent=n.letters[0].toUpperCase(),N.cells.center.dataset.letter=n.letters[0],og())}function og(){let t=S.puzzle.letters.slice(1);N.cells.outer.forEach((e,r)=>{e.textContent=t[r].toUpperCase(),e.dataset.letter=t[r]})}function Wh(){let n=S.puzzle;if(!n)return;let t=n.letters.slice(1);for(let e=t.length-1;e>0;e--){let r=Math.floor(Math.random()*(e+1));[t[e],t[r]]=[t[r],t[e]]}N.cells.outer.forEach((e,r)=>{e.textContent=t[r].toUpperCase(),e.dataset.letter=t[r],e.style.transition="none",e.style.transform="scale(0.8)",setTimeout(()=>{e.style.transition="transform 0.2s",e.style.transform="scale(1)"},50)})}function $a(){N.input.innerText=S.currentInput,N.cursor.style.display="block"}function Hh(n){S.currentInput.length<20&&(S.currentInput+=n.toLowerCase(),$a())}function Qh(){S.currentInput=S.currentInput.slice(0,-1),$a()}function Xh(){let n=S.currentInput.toLowerCase();if(n.length===0)return;let t=_g(n);t.valid?(wg(n,t.score,t.isPangram),ve(t.isPangram?"Pangram! +"+t.score:"Nice! +"+t.score,1500),ug(n)):(vg(),ve(t.error,1e3)),setTimeout(()=>{S.currentInput="",$a()},500)}async function Ga(n=!0){ve("Fetching NYT Daily...",2e3);try{let t=await fetch("https://nytbee.com/");if(!t.ok)throw new Error("Failed to fetch");let e=await t.text(),i=new DOMParser().parseFromString(e,"text/html"),o=Array.from(i.querySelectorAll('a[id^="link-definition-"]')).map(D=>D.id.replace("link-definition-","").toLowerCase()).filter(D=>D.length>=4);if(o.length===0)throw new Error("No words found on page");let a=new Set(o[0].split(""));o.forEach(D=>{let k=new Set(D.split(""));a=new Set([...a].filter(x=>k.has(x)))});let u=Array.from(a)[0]?.toUpperCase();if(!u)throw new Error("Center letter detection failed");let f=Array.from(i.querySelectorAll("script")).map(D=>D.textContent).join(" ").match(/\[\s*"[A-Z]"(?:\s*,\s*"[A-Z]"){6}\s*\]/gi)||[],p=null;for(let D of f){let k=D.match(/[A-Z]/gi).map(x=>x.toUpperCase());if(k.includes(u)){let x=k.filter(z=>z!==u);p=[u,...x];break}}if(!p)throw new Error("Could not match letters to word list");let v="nyt-"+new Date().toISOString().split("T")[0],R=o.reduce((D,k)=>{let x=k.length===4?1:k.length;return new Set(k).size===7&&(x+=7),D+x},0);S.puzzleId=v,S.puzzle={id:v,letters:p,words:o,maxScore:R,author:"NYT Daily"},S.foundWords=[],S.score=0,S.currentInput="",ee(),ja(),mr(),_n(),Oi(),ve("NYT Daily Loaded!",2e3),n&&S.multiplayer.roomCode&&(console.log("Broadcasting NYT puzzle sync..."),td(S.puzzleId))}catch(t){console.error(t),ve("Error loading NYT Daily: "+t.message,3e3)}}function ag(){let n=["Happy","Lucky","Sunny","Cool","Bright","Swift","Calm"],t=["Bee","Hive","Honey","Comb","Wing","Pollen","Nectar"],e=Math.floor(Math.random()*99)+1,r=n[Math.floor(Math.random()*n.length)],i=t[Math.floor(Math.random()*t.length)];return`${r}-${i}-${e}`}async function Jh(n,t=!0){let e=Bt(Ut,"rooms",n);if(!(await Uh(e)).exists())throw new Error("Room not found");let i=`players.${S.playerId}`;await _e(e,{[i]:{nickname:S.multiplayer.nickname,online:!0,lastActive:Z.now()}}),Yh(n),Zh(n),S.multiplayer.roomCode=n,S.multiplayer.step="active",ee(),t?we():Oi()}async function cg(){let n=ag(),t=Bt(Ut,"rooms",n),e={createdAt:Z.now(),puzzleId:S.puzzleId,foundWords:{},players:{[S.playerId]:{nickname:S.multiplayer.nickname,online:!0,lastActive:Z.now()}}};return await qh(t,e),Yh(n),Zh(n),S.multiplayer.roomCode=n,S.multiplayer.step="active",ee(),we(),n}var dr=null;function Yh(n){dr&&dr();let t=Bt(Ut,"rooms",n);dr=zh(t,e=>{let r=e.data();if(r){if(r.players){let i=Date.now(),o=Object.entries(r.players).map(([a,u])=>{let h=u.lastActive?.toMillis?u.lastActive.toMillis():0,f=u.online&&i-h<9e4;return{playerId:a,nickname:u.nickname,online:f}});S.multiplayer.teammates=o.filter(a=>a.playerId!==S.playerId),ed(),Oi()}if(r.foundWords){let i=Object.keys(r.foundWords),o=!1;i.forEach(a=>{if(S.wordFinders[a]=r.foundWords[a],!S.foundWords.includes(a)){let u=r.foundWords[a];u!==S.multiplayer.nickname&&ve(`${u} found ${a}!`,2e3),S.foundWords.push(a);let h=hg(a);S.score+=h,o=!0}}),o&&(S.foundWords.sort(),ee(),_n(),mr())}r.puzzleId&&r.puzzleId!==S.puzzleId&&(console.log("Remote puzzle change detected:",r.puzzleId),za(r.puzzleId))}})}var fr=null;function Zh(n){fr&&clearInterval(fr);let t=async()=>{try{let e=Bt(Ut,"rooms",n),r=`players.${S.playerId}.lastActive`;await _e(e,{[r]:Z.now()})}catch(e){console.warn("Heartbeat failed:",e)}};t(),fr=setInterval(t,3e4)}async function ug(n){if(!S.multiplayer.roomCode)return;let t=Bt(Ut,"rooms",S.multiplayer.roomCode),e=`foundWords.${n}`;await _e(t,{[e]:S.multiplayer.nickname})}async function td(n){if(!S.multiplayer.roomCode)return;let t=Bt(Ut,"rooms",S.multiplayer.roomCode);await _e(t,{puzzleId:n,foundWords:{}})}async function lg(){if(S.multiplayer.roomCode){let n=Bt(Ut,"rooms",S.multiplayer.roomCode),t=`players.${S.playerId}`;try{await _e(n,{[t]:Gh()})}catch(e){console.warn("Leave room error:",e)}}fr&&clearInterval(fr),dr&&dr(),S.multiplayer.roomCode=null,S.multiplayer.step="menu",ee(),location.reload()}function hg(n){if(n.length===4)return 1;let t=n.length;return new Set(n).size===7&&(t+=7),t}function Oi(){S.multiplayer.roomCode?(N.multi.banner.style.display="flex",N.multi.bannerRoomCode.innerText=S.multiplayer.roomCode):N.multi.banner.style.display="none"}function ed(){let n=N.multi.playerList;n.innerHTML="";let t=document.createElement("div");t.className="player-item self",t.innerHTML=`<span class="status-dot online"></span> ${S.multiplayer.nickname} (You)`,n.appendChild(t),S.multiplayer.teammates.forEach(e=>{let r=document.createElement("div");r.className="player-item";let i=e.online?"online":"offline";r.innerHTML=`<span class="status-dot ${i}"></span> ${e.nickname}`,n.appendChild(r)})}function we(){N.multi.screen.style.display="flex",N.multi.stepNickname.classList.add("hidden"),N.multi.stepMenu.classList.add("hidden"),N.multi.stepJoin.classList.add("hidden"),N.multi.stepActive.classList.add("hidden");let n=S.multiplayer.step;if(n==="nickname"&&S.multiplayer.nickname){S.multiplayer.step="menu",we();return}S.multiplayer.nickname&&N.multi.displayNickname&&(N.multi.displayNickname.innerText=S.multiplayer.nickname),n==="nickname"?N.multi.stepNickname.classList.remove("hidden"):n==="menu"?N.multi.stepMenu.classList.remove("hidden"):n==="join"?N.multi.stepJoin.classList.remove("hidden"):n==="active"&&(N.multi.stepActive.classList.remove("hidden"),N.multi.activeRoomCode.innerText=S.multiplayer.roomCode,ed())}function dg(){N.multi.screen.style.display="none"}function fg(){let n=N.multi.nicknameInput.value.trim();if(n){if(S.multiplayer.nickname=n,localStorage.setItem("sb_nickname",n),S.multiplayer.roomCode){let t=Bt(Ut,"rooms",S.multiplayer.roomCode),e=`players.${S.playerId}.nickname`;_e(t,{[e]:n}).catch(r=>console.warn("Nickname update failed:",r))}S.multiplayer.step="menu",we()}}async function mg(){N.multi.createRoomBtn.disabled=!0;try{await cg()}catch(n){console.error(n),alert("Error: "+n.message),N.multi.createRoomBtn.disabled=!1}}function pg(){S.multiplayer.step="join",we()}async function gg(){let n=N.multi.roomCodeInput.value.trim();if(n){N.multi.confirmJoinBtn.disabled=!0;try{await Jh(n)}catch(t){alert(t.message),N.multi.confirmJoinBtn.disabled=!1}}}function yg(){confirm("Leave this room?")&&lg()}function _g(n){if(n.length<4)return{valid:!1,error:"Too short"};let t=S.puzzle.letters[0].toLowerCase();if(!n.includes(t))return{valid:!1,error:"Missing center letter"};let e=new Set(S.puzzle.letters.map(o=>o.toLowerCase()));for(let o of n)if(!e.has(o))return{valid:!1,error:"Bad letter"};if(!S.puzzle.words.includes(n))return VALID_WORDS.has(n)?{valid:!1,error:"Not in word list"}:{valid:!1,error:"Not a valid word"};if(S.foundWords.includes(n))return{valid:!1,error:"Already found"};let r=n.length===4?1:n.length,i=new Set(n).size===7;return i&&(r+=7),{valid:!0,score:r,isPangram:i}}function wg(n,t,e){S.foundWords.push(n),S.score+=t,S.foundWords.sort(),S.wordFinders[n]=S.multiplayer.nickname||"You",ee(),mr(),_n()}function mr(){if(!S.puzzle)return;N.score.innerText=S.score,N.foundCount.innerText=`${S.foundWords.length} word${S.foundWords.length!==1?"s":""}`;let n=S.puzzle.maxScore,t=0;for(let o=0;o<bt.length;o++){let a=Math.floor(n*bt[o].pct);S.score>=a&&(t=o)}N.levelText.innerText=bt[t].name,N.dotsContainer.innerHTML="";let e=document.createElement("div");e.className="progress-line-fill";let r=t/(bt.length-1)*100,i=0;if(t<bt.length-1){let o=Math.floor(n*bt[t].pct),u=Math.floor(n*bt[t+1].pct)-o;u>0&&(i=(S.score-o)/u*(100/(bt.length-1)))}e.style.width=`${r+i}%`,N.dotsContainer.appendChild(e),bt.forEach((o,a)=>{let u=document.createElement("div");u.className="dot",u.style.left=`${a/(bt.length-1)*100}%`,a<=t&&u.classList.add("active"),a===t&&u.classList.add("current"),u.title=`${o.name} (${Math.floor(n*o.pct)})`,N.dotsContainer.appendChild(u)})}function _n(){N.wordsList.innerHTML="";let n=S.attributionMode;if(n===0)S.foundWords.forEach(t=>{let e=document.createElement("span");e.className="found-word",e.innerText=t,N.wordsList.appendChild(e)});else if(n===1){let t={},e=0,r=["#f7da21","#4ecdc4","#ff6b6b","#a8e6cf","#dfe6e9","#fd79a8","#74b9ff"];S.foundWords.forEach(i=>{let o=S.wordFinders[i]||S.multiplayer.nickname||"You";t[o]||(t[o]=r[e%r.length],e++);let a=document.createElement("span");a.className="found-word",a.style.color=t[o],a.innerText=i,N.wordsList.appendChild(a)})}else if(n===2){let t={};S.foundWords.forEach(i=>{let o=S.wordFinders[i]||S.multiplayer.nickname||"You";t[o]||(t[o]=[]),t[o].push(i)});let e=S.multiplayer.nickname||"You";Object.keys(t).sort((i,o)=>i===e?-1:o===e?1:i.localeCompare(o)).forEach(i=>{let o=document.createElement("div");o.className="word-section";let a=document.createElement("div");a.className="word-section-header",a.innerText=i===e?`You (${t[i].length})`:`${i} (${t[i].length})`,o.appendChild(a);let u=document.createElement("div");u.className="word-section-words",t[i].forEach(h=>{let f=document.createElement("span");f.className="found-word",f.innerText=h,u.appendChild(f)}),o.appendChild(u),N.wordsList.appendChild(o)})}}function ve(n,t){N.messageArea.innerText=n,N.messageArea.classList.add("visible"),setTimeout(()=>{N.messageArea.classList.remove("visible")},t)}function vg(){N.input.parentElement.style.animation="shake 0.3s",setTimeout(()=>N.input.parentElement.style.animation="",300)}function Eg(){let n=document.getElementById("ranking-modal"),t=document.getElementById("ranking-list"),e=S.puzzle.maxScore,r=0;for(let o=0;o<bt.length;o++)S.score>=Math.floor(e*bt[o].pct)&&(r=o);t.innerHTML="",bt.forEach((o,a)=>{let u=document.createElement("div");u.className="ranking-item",a===r&&u.classList.add("current");let h=Math.floor(e*o.pct);u.innerHTML=`
      <span class="rank-name">${o.name}</span>
      <span class="rank-score">${h}</span>
    `,t.appendChild(u)});let i=document.createElement("div");i.className="ranking-item ranking-header",i.innerHTML=`
    <span class="rank-name">Rank</span>
    <span class="rank-score">Minimum Score</span>
  `,t.appendChild(i),n.style.display="block"}function Ig(){N.deleteBtn.addEventListener("click",Qh),N.enterBtn.addEventListener("click",Xh),N.shuffleBtn.addEventListener("click",Wh);let n=document.getElementById("restart-btn");n&&n.addEventListener("click",ig);let t=document.getElementById("nyt-daily-btn");t&&t.addEventListener("click",Ga),document.querySelector(".level-container").addEventListener("click",Eg),document.getElementById("close-modal-btn").addEventListener("click",()=>{document.getElementById("ranking-modal").style.display="none"}),window.addEventListener("click",r=>{let i=document.getElementById("ranking-modal");r.target===i&&(i.style.display="none")}),N.multi.btns.open.addEventListener("click",we),N.multi.btns.close.addEventListener("click",dg),N.multi.btns.saveNickname.addEventListener("click",fg),N.multi.btns.createRoom.addEventListener("click",mg),N.multi.btns.joinRoom.addEventListener("click",pg),N.multi.btns.confirmJoin.addEventListener("click",gg),N.multi.btns.backToMenu.addEventListener("click",()=>{S.multiplayer.step="menu",we()}),N.multi.btns.leaveRoom.addEventListener("click",yg);let e=r=>{r.preventDefault();let i=S.multiplayer.nickname,o=prompt("Enter new nickname:",i);if(o&&o.trim()!==""){let a=o.trim();if(S.multiplayer.nickname=a,localStorage.setItem("sb_nickname",a),S.multiplayer.roomCode){let u=Bt(Ut,"rooms",S.multiplayer.roomCode),h=`players.${S.playerId}.nickname`;_e(u,{[h]:a}).catch(f=>console.warn("Nickname update failed:",f))}N.multi.displayNickname&&(N.multi.displayNickname.innerText=a),we()}};if(N.multi.editNicknameMenu&&N.multi.editNicknameMenu.addEventListener("click",e),N.multi.editNicknameRoom&&N.multi.editNicknameRoom.addEventListener("click",e),N.toggleAttributionBtn){let r=["\u{1F464}","\u{1F3A8}","\u{1F4CB}"];N.toggleAttributionBtn.addEventListener("click",()=>{S.attributionMode=(S.attributionMode+1)%3,N.toggleAttributionBtn.innerText=r[S.attributionMode],_n()})}N.multi.activeRoomCode.addEventListener("click",()=>{let r=N.multi.activeRoomCode.textContent;r&&navigator.clipboard.writeText(r).then(()=>{ve("Room code copied!",2e3)})}),N.toggleWordsBtn.addEventListener("click",()=>{N.wordsList.style.display==="none"?(N.wordsList.style.display="flex",N.toggleWordsBtn.innerText="Hide"):(N.wordsList.style.display="none",N.toggleWordsBtn.innerText="Show")}),[N.cells.center,...N.cells.outer].forEach(r=>{r.addEventListener("click",i=>{let o=i.target.closest(".cell");o&&Hh(o.dataset.letter)})}),document.addEventListener("click",r=>{let i=r.target.closest("button");i&&i.blur()})}function Tg(n){n.target.tagName==="INPUT"||n.target.tagName==="TEXTAREA"||n.metaKey||n.ctrlKey||n.altKey||N.multi.screen&&N.multi.screen.offsetParent!==null||(n.key==="Backspace"?Qh():n.key==="Enter"?Xh():n.key===" "?(n.preventDefault(),Wh()):/^[a-zA-Z]$/.test(n.key)&&Hh(n.key))}if(!document.getElementById("shake-style")){let n=document.createElement("style");n.id="shake-style",n.innerHTML=`
  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  }
  `,document.head.appendChild(n)}})();
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
//# sourceMappingURL=popup_bundle.js.map
