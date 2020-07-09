"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var EventEmitter=require("events"),EventEmitter__default=_interopDefault(EventEmitter),messages=require("./messages-f833e4b4.js"),os=require("os"),os__default=_interopDefault(os),path=require("path"),tty=_interopDefault(require("tty")),util=_interopDefault(require("util")),crypto=_interopDefault(require("crypto"));let bundleURL;function getBundleURLCached(){return bundleURL||(bundleURL=getBundleURL()),bundleURL}function getBundleURL(){try{throw new Error}catch(e){const t=(""+e.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);if(t)return getBaseURL(t[0])}return"/"}function getBaseURL(e){return(""+e).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/,"$1")+"/"}const defaultPoolSize="undefined"!=typeof navigator&&navigator.hardwareConcurrency?navigator.hardwareConcurrency:4,isAbsoluteURL=e=>/^(file|https?:)?\/\//i.test(e);function createSourceBlobURL(e){const t=new Blob([e],{type:"application/javascript"});return URL.createObjectURL(t)}function selectWorkerImplementation(){if("undefined"==typeof Worker)return class{constructor(){throw Error("No web worker implementation available. You might have tried to spawn a worker within a worker in a browser that doesn't support workers in workers.")}};class e extends Worker{constructor(e,t){"string"==typeof e&&t&&t._baseURL?e=new URL(e,t._baseURL):"string"==typeof e&&!isAbsoluteURL(e)&&getBundleURLCached().match(/^file:\/\//i)&&(e=new URL(e,getBundleURLCached().replace(/\/[^\/]+$/,"/")),e=createSourceBlobURL(`importScripts(${JSON.stringify(e)});`)),"string"==typeof e&&isAbsoluteURL(e)&&(e=createSourceBlobURL(`importScripts(${JSON.stringify(e)});`)),super(e,t)}}class t extends e{constructor(e,t){super(window.URL.createObjectURL(e),t)}static fromText(e,r){const s=new window.Blob([e],{type:"text/javascript"});return new t(s,r)}}return{blob:t,default:e}}let implementation;function getWorkerImplementation(){return implementation||(implementation=selectWorkerImplementation()),implementation}function isWorkerRuntime(){const e="undefined"!=typeof self&&"undefined"!=typeof Window&&self instanceof Window;return!("undefined"==typeof self||!self.postMessage||e)}var BrowserImplementation=Object.freeze({__proto__:null,defaultPoolSize:defaultPoolSize,getWorkerImplementation:getWorkerImplementation,isWorkerRuntime:isWorkerRuntime});const callsites=()=>{const e=Error.prepareStackTrace;Error.prepareStackTrace=(e,t)=>t;const t=(new Error).stack.slice(1);return Error.prepareStackTrace=e,t};var callsites_1=callsites,_default=callsites;let tsNodeAvailable;callsites_1.default=_default;const defaultPoolSize$1=os.cpus().length;function detectTsNode(){if("function"==typeof __non_webpack_require__)return!1;if(tsNodeAvailable)return tsNodeAvailable;try{require.resolve("ts-node"),tsNodeAvailable=!0}catch(e){if(!e||"MODULE_NOT_FOUND"!==e.code)throw e;tsNodeAvailable=!1}return tsNodeAvailable}function createTsNodeModule(e){return`\n    require("ts-node/register/transpile-only");\n    require(${JSON.stringify(e)});\n  `}function rebaseScriptPath(e,t){const r=callsites_1().find(e=>{const r=e.getFileName();return Boolean(r&&!r.match(t)&&!r.match(/[\/\\]master[\/\\]implementation/)&&!r.match(/^internal\/process/))}),s=r?r.getFileName():null,n=s?s.replace(/^file:\//,""):null;return n?path.join(path.dirname(n),e):e}function resolveScriptPath(scriptPath,baseURL){const makeRelative=filePath=>path.isAbsolute(filePath)?filePath:path.join(baseURL||eval("__dirname"),filePath),workerFilePath="function"==typeof __non_webpack_require__?__non_webpack_require__.resolve(makeRelative(scriptPath)):require.resolve(makeRelative(rebaseScriptPath(scriptPath,/[\/\\]worker_threads[\/\\]/)));return workerFilePath}function initWorkerThreadsWorker(){const NativeWorker="function"==typeof __non_webpack_require__?__non_webpack_require__("worker_threads").Worker:eval("require")("worker_threads").Worker;let allWorkers=[];class Worker extends NativeWorker{constructor(e,t){const r=t&&t.fromSource?null:resolveScriptPath(e,(t||{})._baseURL);if(r)r.match(/\.tsx?$/i)&&detectTsNode()?super(createTsNodeModule(r),Object.assign(Object.assign({},t),{eval:!0})):r.match(/\.asar[\/\\]/)?super(r.replace(/\.asar([\/\\])/,".asar.unpacked$1"),t):super(r,t);else{super(e,Object.assign(Object.assign({},t),{eval:!0}))}this.mappedEventListeners=new WeakMap,allWorkers.push(this)}addEventListener(e,t){const r=e=>{t({data:e})};this.mappedEventListeners.set(t,r),this.on(e,r)}removeEventListener(e,t){const r=this.mappedEventListeners.get(t)||t;this.off(e,r)}}const terminateWorkersAndMaster=()=>{Promise.all(allWorkers.map(e=>e.terminate())).then(()=>process.exit(0),()=>process.exit(1)),allWorkers=[]};process.on("SIGINT",()=>terminateWorkersAndMaster()),process.on("SIGTERM",()=>terminateWorkersAndMaster());class BlobWorker extends Worker{constructor(e,t){super(Buffer.from(e).toString("utf-8"),Object.assign(Object.assign({},t),{fromSource:!0}))}static fromText(e,t){return new Worker(e,Object.assign(Object.assign({},t),{fromSource:!0}))}}return{blob:BlobWorker,default:Worker}}function initTinyWorker(){const e=require("tiny-worker");let t=[];class r extends e{constructor(e,r){const s=r&&r.fromSource?null:"win32"===process.platform?"file:///"+resolveScriptPath(e).replace(/\\/g,"/"):resolveScriptPath(e);if(s)s.match(/\.tsx?$/i)&&detectTsNode()?super(new Function(createTsNodeModule(resolveScriptPath(e))),[],{esm:!0}):s.match(/\.asar[\/\\]/)?super(s.replace(/\.asar([\/\\])/,".asar.unpacked$1"),[],{esm:!0}):super(s,[],{esm:!0});else{super(new Function(e),[],{esm:!0})}t.push(this),this.emitter=new EventEmitter__default,this.onerror=e=>this.emitter.emit("error",e),this.onmessage=e=>this.emitter.emit("message",e)}addEventListener(e,t){this.emitter.addListener(e,t)}removeEventListener(e,t){this.emitter.removeListener(e,t)}terminate(){return t=t.filter(e=>e!==this),super.terminate()}}const s=()=>{Promise.all(t.map(e=>e.terminate())).then(()=>process.exit(0),()=>process.exit(1)),t=[]};process.on("SIGINT",()=>s()),process.on("SIGTERM",()=>s());return{blob:class extends r{constructor(e,t){super(Buffer.from(e).toString("utf-8"),Object.assign(Object.assign({},t),{fromSource:!0}))}static fromText(e,t){return new r(e,Object.assign(Object.assign({},t),{fromSource:!0}))}},default:r}}let implementation$1,isTinyWorker;function selectWorkerImplementation$1(){try{return isTinyWorker=!1,initWorkerThreadsWorker()}catch(e){return console.debug("Node worker_threads not available. Trying to fall back to tiny-worker polyfill..."),isTinyWorker=!0,initTinyWorker()}}function getWorkerImplementation$1(){return implementation$1||(implementation$1=selectWorkerImplementation$1()),implementation$1}function isWorkerRuntime$1(){if(isTinyWorker)return!("undefined"==typeof self||!self.postMessage);{const isMainThread="function"==typeof __non_webpack_require__?__non_webpack_require__("worker_threads").isMainThread:eval("require")("worker_threads").isMainThread;return!isMainThread}}var NodeImplementation=Object.freeze({__proto__:null,defaultPoolSize:defaultPoolSize$1,getWorkerImplementation:getWorkerImplementation$1,isWorkerRuntime:isWorkerRuntime$1});const runningInNode="undefined"!=typeof process&&"browser"!==process.arch&&"pid"in process,implementation$2=runningInNode?NodeImplementation:BrowserImplementation,defaultPoolSize$2=implementation$2.defaultPoolSize,getWorkerImplementation$2=implementation$2.getWorkerImplementation,isWorkerRuntime$2=implementation$2.isWorkerRuntime;function createCommonjsModule(e,t,r){return e(r={path:t,exports:{},require:function(e,t){return commonjsRequire(e,null==t?r.path:t)}},r.exports),r.exports}function commonjsRequire(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}var s=1e3,m=60*s,h=60*m,d=24*h,w=7*d,y=365.25*d,ms=function(e,t){t=t||{};var r=typeof e;if("string"===r&&e.length>0)return parse(e);if("number"===r&&isFinite(e))return t.long?fmtLong(e):fmtShort(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function parse(e){if(!((e=String(e)).length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]);switch((t[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return r*y;case"weeks":case"week":case"w":return r*w;case"days":case"day":case"d":return r*d;case"hours":case"hour":case"hrs":case"hr":case"h":return r*h;case"minutes":case"minute":case"mins":case"min":case"m":return r*m;case"seconds":case"second":case"secs":case"sec":case"s":return r*s;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function fmtShort(e){var t=Math.abs(e);return t>=d?Math.round(e/d)+"d":t>=h?Math.round(e/h)+"h":t>=m?Math.round(e/m)+"m":t>=s?Math.round(e/s)+"s":e+"ms"}function fmtLong(e){var t=Math.abs(e);return t>=d?plural(e,t,d,"day"):t>=h?plural(e,t,h,"hour"):t>=m?plural(e,t,m,"minute"):t>=s?plural(e,t,s,"second"):e+" ms"}function plural(e,t,r,s){var n=t>=1.5*r;return Math.round(e/r)+" "+s+(n?"s":"")}function setup(e){function t(e){let t=0;for(let r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r),t|=0;return r.colors[Math.abs(t)%r.colors.length]}function r(e){let o;function i(...e){if(!i.enabled)return;const t=i,s=Number(new Date),n=s-(o||s);t.diff=n,t.prev=o,t.curr=s,o=s,e[0]=r.coerce(e[0]),"string"!=typeof e[0]&&e.unshift("%O");let a=0;e[0]=e[0].replace(/%([a-zA-Z%])/g,(s,n)=>{if("%%"===s)return s;a++;const o=r.formatters[n];if("function"==typeof o){const r=e[a];s=o.call(t,r),e.splice(a,1),a--}return s}),r.formatArgs.call(t,e);(t.log||r.log).apply(t,e)}return i.namespace=e,i.enabled=r.enabled(e),i.useColors=r.useColors(),i.color=t(e),i.destroy=s,i.extend=n,"function"==typeof r.init&&r.init(i),r.instances.push(i),i}function s(){const e=r.instances.indexOf(this);return-1!==e&&(r.instances.splice(e,1),!0)}function n(e,t){const s=r(this.namespace+(void 0===t?":":t)+e);return s.log=this.log,s}function o(e){return e.toString().substring(2,e.toString().length-2).replace(/\.\*\?$/,"*")}return r.debug=r,r.default=r,r.coerce=function(e){if(e instanceof Error)return e.stack||e.message;return e},r.disable=function(){const e=[...r.names.map(o),...r.skips.map(o).map(e=>"-"+e)].join(",");return r.enable(""),e},r.enable=function(e){let t;r.save(e),r.names=[],r.skips=[];const s=("string"==typeof e?e:"").split(/[\s,]+/),n=s.length;for(t=0;t<n;t++)s[t]&&("-"===(e=s[t].replace(/\*/g,".*?"))[0]?r.skips.push(new RegExp("^"+e.substr(1)+"$")):r.names.push(new RegExp("^"+e+"$")));for(t=0;t<r.instances.length;t++){const e=r.instances[t];e.enabled=r.enabled(e.namespace)}},r.enabled=function(e){if("*"===e[e.length-1])return!0;let t,s;for(t=0,s=r.skips.length;t<s;t++)if(r.skips[t].test(e))return!1;for(t=0,s=r.names.length;t<s;t++)if(r.names[t].test(e))return!0;return!1},r.humanize=ms,Object.keys(e).forEach(t=>{r[t]=e[t]}),r.instances=[],r.names=[],r.skips=[],r.formatters={},r.selectColor=t,r.enable(r.load()),r}var common=setup,browser=createCommonjsModule((function(e,t){t.log=function(...e){return"object"==typeof console&&console.log&&console.log(...e)},t.formatArgs=function(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+e.exports.humanize(this.diff),!this.useColors)return;const r="color: "+this.color;t.splice(1,0,r,"color: inherit");let s=0,n=0;t[0].replace(/%[a-zA-Z%]/g,e=>{"%%"!==e&&(s++,"%c"===e&&(n=s))}),t.splice(n,0,r)},t.save=function(e){try{e?t.storage.setItem("debug",e):t.storage.removeItem("debug")}catch(e){}},t.load=function(){let e;try{e=t.storage.getItem("debug")}catch(e){}!e&&"undefined"!=typeof process&&"env"in process&&(e=process.env.DEBUG);return e},t.useColors=function(){if("undefined"!=typeof window&&window.process&&("renderer"===window.process.type||window.process.__nwjs))return!0;if("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;return"undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},t.storage=function(){try{return localStorage}catch(e){}}(),t.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],e.exports=common(t);const{formatters:r}=e.exports;r.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}})),hasFlag=(e,t)=>{t=t||process.argv;const r=e.startsWith("-")?"":1===e.length?"-":"--",s=t.indexOf(r+e),n=t.indexOf("--");return-1!==s&&(-1===n||s<n)};const env=process.env;let forceColor;function translateLevel(e){return 0!==e&&{level:e,hasBasic:!0,has256:e>=2,has16m:e>=3}}function supportsColor(e){if(!1===forceColor)return 0;if(hasFlag("color=16m")||hasFlag("color=full")||hasFlag("color=truecolor"))return 3;if(hasFlag("color=256"))return 2;if(e&&!e.isTTY&&!0!==forceColor)return 0;const t=forceColor?1:0;if("win32"===process.platform){const e=os__default.release().split(".");return Number(process.versions.node.split(".")[0])>=8&&Number(e[0])>=10&&Number(e[2])>=10586?Number(e[2])>=14931?3:2:1}if("CI"in env)return["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI"].some(e=>e in env)||"codeship"===env.CI_NAME?1:t;if("TEAMCITY_VERSION"in env)return/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION)?1:0;if("truecolor"===env.COLORTERM)return 3;if("TERM_PROGRAM"in env){const e=parseInt((env.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(env.TERM_PROGRAM){case"iTerm.app":return e>=3?3:2;case"Apple_Terminal":return 2}}return/-256(color)?$/i.test(env.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)||"COLORTERM"in env?1:(env.TERM,t)}function getSupportLevel(e){return translateLevel(supportsColor(e))}hasFlag("no-color")||hasFlag("no-colors")||hasFlag("color=false")?forceColor=!1:(hasFlag("color")||hasFlag("colors")||hasFlag("color=true")||hasFlag("color=always"))&&(forceColor=!0),"FORCE_COLOR"in env&&(forceColor=0===env.FORCE_COLOR.length||0!==parseInt(env.FORCE_COLOR,10));var supportsColor_1={supportsColor:getSupportLevel,stdout:getSupportLevel(process.stdout),stderr:getSupportLevel(process.stderr)},node=createCommonjsModule((function(e,t){t.init=function(e){e.inspectOpts={};const r=Object.keys(t.inspectOpts);for(let s=0;s<r.length;s++)e.inspectOpts[r[s]]=t.inspectOpts[r[s]]},t.log=function(...e){return process.stderr.write(util.format(...e)+"\n")},t.formatArgs=function(r){const{namespace:s,useColors:n}=this;if(n){const t=this.color,n="[3"+(t<8?t:"8;5;"+t),o=`  ${n};1m${s} [0m`;r[0]=o+r[0].split("\n").join("\n"+o),r.push(n+"m+"+e.exports.humanize(this.diff)+"[0m")}else r[0]=function(){if(t.inspectOpts.hideDate)return"";return(new Date).toISOString()+" "}()+s+" "+r[0]},t.save=function(e){e?process.env.DEBUG=e:delete process.env.DEBUG},t.load=function(){return process.env.DEBUG},t.useColors=function(){return"colors"in t.inspectOpts?Boolean(t.inspectOpts.colors):tty.isatty(process.stderr.fd)},t.colors=[6,2,3,4,5,1];try{const e=supportsColor_1;e&&(e.stderr||e).level>=2&&(t.colors=[20,21,26,27,32,33,38,39,40,41,42,43,44,45,56,57,62,63,68,69,74,75,76,77,78,79,80,81,92,93,98,99,112,113,128,129,134,135,148,149,160,161,162,163,164,165,166,167,168,169,170,171,172,173,178,179,184,185,196,197,198,199,200,201,202,203,204,205,206,207,208,209,214,215,220,221])}catch(e){}t.inspectOpts=Object.keys(process.env).filter(e=>/^debug_/i.test(e)).reduce((e,t)=>{const r=t.substring(6).toLowerCase().replace(/_([a-z])/g,(e,t)=>t.toUpperCase());let s=process.env[t];return s=!!/^(yes|on|true|enabled)$/i.test(s)||!/^(no|off|false|disabled)$/i.test(s)&&("null"===s?null:Number(s)),e[r]=s,e},{}),e.exports=common(t);const{formatters:r}=e.exports;r.o=function(e){return this.inspectOpts.colors=this.useColors,util.inspect(e,this.inspectOpts).replace(/\s*\n\s*/g," ")},r.O=function(e){return this.inspectOpts.colors=this.useColors,util.inspect(e,this.inspectOpts)}})),src=createCommonjsModule((function(e){"undefined"==typeof process||"renderer"===process.type||!0===process.browser||process.__nwjs?e.exports=browser:e.exports=node}));function unsubscribe(e){"function"==typeof e?e():e&&"function"==typeof e.unsubscribe&&e.unsubscribe()}class MulticastSubject extends messages.Observable{constructor(){super(e=>(this._observers.add(e),()=>this._observers.delete(e))),this._observers=new Set}next(e){for(const t of this._observers)t.next(e)}error(e){for(const t of this._observers)t.error(e)}complete(){for(const e of this._observers)e.complete()}}function multicast(e){const t=new MulticastSubject;let r,s=0;return new messages.Observable(n=>{r||(r=e.subscribe(t));const o=t.subscribe(n);return s++,()=>{s--,o.unsubscribe(),0===s&&(unsubscribe(r),r=void 0)}})}function fail(e){throw Error(e)}const Thread={errors:e=>e[messages.$errors]||fail("Error observable not found. Make sure to pass a thread instance as returned by the spawn() promise."),events:e=>e[messages.$events]||fail("Events observable not found. Make sure to pass a thread instance as returned by the spawn() promise."),terminate:e=>e[messages.$terminate]()},doNothing=()=>{};function createPromiseWithResolver(){let e,t=!1,r=doNothing;return[new Promise(s=>{t?s(e):r=s}),s=>{t=!0,e=s,r()}]}var WorkerEventType;!function(e){e.internalError="internalError",e.message="message",e.termination="termination"}(WorkerEventType||(WorkerEventType={}));const doNothing$1=()=>{},returnInput=e=>e,runDeferred=e=>Promise.resolve().then(e);function fail$1(e){throw e}function isThenable(e){return e&&"function"==typeof e.then}class ObservablePromise extends messages.Observable{constructor(e){super(t=>{const r=this,s=Object.assign(Object.assign({},t),{complete(){t.complete(),r.onCompletion()},error(e){t.error(e),r.onError(e)},next(e){t.next(e),r.onNext(e)}});try{return this.initHasRun=!0,e(s)}catch(e){s.error(e)}}),this.initHasRun=!1,this.fulfillmentCallbacks=[],this.rejectionCallbacks=[],this.firstValueSet=!1,this.state="pending"}onNext(e){this.firstValueSet||(this.firstValue=e,this.firstValueSet=!0)}onError(e){this.state="rejected",this.rejection=e;for(const t of this.rejectionCallbacks)runDeferred(()=>t(e))}onCompletion(){this.state="fulfilled";for(const e of this.fulfillmentCallbacks)runDeferred(()=>e(this.firstValue))}then(e,t){const r=e||returnInput,s=t||fail$1;let n=!1;return new Promise((e,t)=>{const o=r=>{if(!n){n=!0;try{e(s(r))}catch(e){t(e)}}};return this.initHasRun||this.subscribe({error:o}),"fulfilled"===this.state?e(r(this.firstValue)):"rejected"===this.state?(n=!0,e(s(this.rejection))):(this.fulfillmentCallbacks.push(t=>{try{e(r(t))}catch(e){o(e)}}),void this.rejectionCallbacks.push(o))})}catch(e){return this.then(void 0,e)}finally(e){const t=e||doNothing$1;return this.then(e=>(t(),e),()=>t())}static from(e){return isThenable(e)?new ObservablePromise(t=>{e.then(e=>{t.next(e),t.complete()},e=>{t.error(e)})}):super.from(e)}}const debugMessages=src("threads:master:messages");let nextJobUID=1;const dedupe=e=>Array.from(new Set(e)),isJobErrorMessage=e=>e&&e.type===messages.WorkerMessageType.error,isJobResultMessage=e=>e&&e.type===messages.WorkerMessageType.result,isJobStartMessage=e=>e&&e.type===messages.WorkerMessageType.running;function createObservableForJob(e,t){return new messages.Observable(r=>{let s;const n=o=>{if(debugMessages("Message from worker:",o.data),o.data&&o.data.uid===t)if(isJobStartMessage(o.data))s=o.data.resultType;else if(isJobResultMessage(o.data))"promise"===s?(void 0!==o.data.payload&&r.next(messages.deserialize(o.data.payload)),r.complete(),e.removeEventListener("message",n)):(o.data.payload&&r.next(messages.deserialize(o.data.payload)),o.data.complete&&(r.complete(),e.removeEventListener("message",n)));else if(isJobErrorMessage(o.data)){const t=messages.deserialize(o.data.error);r.error(t),e.removeEventListener("message",n)}};return e.addEventListener("message",n),()=>{if("observable"===s||!s){const r={type:messages.MasterMessageType.cancel,uid:t};e.postMessage(r)}e.removeEventListener("message",n)}})}function prepareArguments(e){if(0===e.length)return{args:[],transferables:[]};const t=[],r=[];for(const s of e)messages.isTransferDescriptor(s)?(t.push(messages.serialize(s.send)),r.push(...s.transferables)):t.push(messages.serialize(s));return{args:t,transferables:0===r.length?r:dedupe(r)}}function createProxyFunction(e,t){return(...r)=>{const s=nextJobUID++,{args:n,transferables:o}=prepareArguments(r),i={type:messages.MasterMessageType.run,uid:s,method:t,args:n};debugMessages("Sending command to run function to worker:",i);try{e.postMessage(i,o)}catch(e){return ObservablePromise.from(Promise.reject(e))}return ObservablePromise.from(multicast(createObservableForJob(e,s)))}}function createProxyModule(e,t){const r={};for(const s of t)r[s]=createProxyFunction(e,s);return r}var __awaiter=function(e,t,r,s){return new(r||(r=Promise))((function(n,o){function i(e){try{c(s.next(e))}catch(e){o(e)}}function a(e){try{c(s.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}c((s=s.apply(e,t||[])).next())}))};const debugMessages$1=src("threads:master:messages"),debugSpawn=src("threads:master:spawn"),debugThreadUtils=src("threads:master:thread-utils"),isInitMessage=e=>e&&"init"===e.type,isUncaughtErrorMessage=e=>e&&"uncaughtError"===e.type,initMessageTimeout="undefined"!=typeof process&&process.env.THREADS_WORKER_INIT_TIMEOUT?Number.parseInt(process.env.THREADS_WORKER_INIT_TIMEOUT,10):1e4;function withTimeout(e,t,r){return __awaiter(this,void 0,void 0,(function*(){let s;const n=new Promise((e,n)=>{s=setTimeout(()=>n(Error(r)),t)}),o=yield Promise.race([e,n]);return clearTimeout(s),o}))}function receiveInitMessage(e){return new Promise((t,r)=>{const s=n=>{debugMessages$1("Message from worker before finishing initialization:",n.data),isInitMessage(n.data)?(e.removeEventListener("message",s),t(n.data)):isUncaughtErrorMessage(n.data)&&(e.removeEventListener("message",s),r(messages.deserialize(n.data.error)))};e.addEventListener("message",s)})}function createEventObservable(e,t){return new messages.Observable(r=>{const s=e=>{const t={type:WorkerEventType.message,data:e.data};r.next(t)},n=e=>{debugThreadUtils("Unhandled promise rejection event in thread:",e);const t={type:WorkerEventType.internalError,error:Error(e.reason)};r.next(t)};e.addEventListener("message",s),e.addEventListener("unhandledrejection",n),t.then(()=>{const t={type:WorkerEventType.termination};e.removeEventListener("message",s),e.removeEventListener("unhandledrejection",n),r.next(t),r.complete()})})}function createTerminator(e){const[t,r]=createPromiseWithResolver();return{terminate:()=>__awaiter(this,void 0,void 0,(function*(){debugThreadUtils("Terminating worker"),yield e.terminate(),r()})),termination:t}}function setPrivateThreadProps(e,t,r,s){const n=r.filter(e=>e.type===WorkerEventType.internalError).map(e=>e.error);return Object.assign(e,{[messages.$errors]:n,[messages.$events]:r,[messages.$terminate]:s,[messages.$worker]:t})}function spawn(e,t){return __awaiter(this,void 0,void 0,(function*(){debugSpawn("Initializing new thread");const r=(yield withTimeout(receiveInitMessage(e),t&&t.timeout?t.timeout:initMessageTimeout,`Timeout: Did not receive an init message from worker after ${initMessageTimeout}ms. Make sure the worker calls expose().`)).exposed,{termination:s,terminate:n}=createTerminator(e),o=createEventObservable(e,s);if("function"===r.type){return setPrivateThreadProps(createProxyFunction(e),e,o,n)}if("module"===r.type){return setPrivateThreadProps(createProxyModule(e,r.methods),e,o,n)}{const e=r.type;throw Error("Worker init message states unexpected type of expose(): "+e)}}))}const BlobWorker=getWorkerImplementation$2().blob,Worker$1=getWorkerImplementation$2().default,rnds8=new Uint8Array(16);function rng(){return crypto.randomFillSync(rnds8)}const byteToHex=[];for(let e=0;e<256;++e)byteToHex.push((e+256).toString(16).substr(1));function bytesToUuid(e,t){const r=t||0;return(byteToHex[e[r+0]]+byteToHex[e[r+1]]+byteToHex[e[r+2]]+byteToHex[e[r+3]]+"-"+byteToHex[e[r+4]]+byteToHex[e[r+5]]+"-"+byteToHex[e[r+6]]+byteToHex[e[r+7]]+"-"+byteToHex[e[r+8]]+byteToHex[e[r+9]]+"-"+byteToHex[e[r+10]]+byteToHex[e[r+11]]+byteToHex[e[r+12]]+byteToHex[e[r+13]]+byteToHex[e[r+14]]+byteToHex[e[r+15]]).toLowerCase()}function v4(e,t,r){const s=(e=e||{}).random||(e.rng||rng)();if(s[6]=15&s[6]|64,s[8]=63&s[8]|128,t){r=r||0;for(let e=0;e<16;++e)t[r+e]=s[e];return t}return bytesToUuid(s)}const defaultDefinition="fdmprinter";class CuraWASM extends EventEmitter.EventEmitter{constructor(e){super(),this.config={definition:defaultDefinition,overrides:[],verbose:!1,...e},this.loaded=!1,this.oldProgress=0}async load(){this.worker=await spawn(new Worker$1("./worker.js")),await this.worker.initialize(this.config.verbose),this.log("Initialized worker!"),await this.worker.addDefinitions(),this.log("Added definitions!"),this.loaded=!0}slice(e){return new Promise(async(t,r)=>{this.loaded||await this.load();const s=messages.Transfer(e);this.worker.addFile("Model.stl",s),this.log("Added model!");const n=v4();this.worker.observeCallback(n).subscribe(e=>{e=Math.trunc(100*e),this.oldProgress!=e&&(this.log(`Progress: ${e}%`),this.emit("progress",e)),this.oldProgress=e}),this.log("Registered callbacks!");const o=["slice","-j",`definitions/${this.config.definition}.def.json`,"-l","Model.stl","-o","Model.gcode","--progress",n];this.config.verbose&&o.push("-v"),null!=this.config.overrides&&this.config.overrides.forEach(e=>{null==e.scope?o.push("-s",`${e.key}=${e.value}`):o.push("-s",e.scope,`${e.key}=${e.value}`)}),this.log("Starting CuraEngine with arguments: "+o.join(", ")),await this.worker.main(o);t(await this.worker.getFile("Model.gcode"))})}async destroy(){await this.worker.removeFile("Model.stl"),this.log("Removed model!"),await this.worker.removeDefinitions(),this.log("Removed definitions!"),await Thread.terminate(this.worker)}log(e){this.config.verbose&&console.log(e)}}module.exports=CuraWASM;