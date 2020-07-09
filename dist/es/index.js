import{c as e,u as t,i as n}from"./index-3f0b3a13.js";var r,o="object"==typeof Reflect?Reflect:null,i=o&&"function"==typeof o.apply?o.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};r=o&&"function"==typeof o.ownKeys?o.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var s=Number.isNaN||function(e){return e!=e};function u(){u.init.call(this)}var a=u;u.EventEmitter=u,u.prototype._events=void 0,u.prototype._eventsCount=0,u.prototype._maxListeners=void 0;var f=10;function l(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function c(e){return void 0===e._maxListeners?u.defaultMaxListeners:e._maxListeners}function d(e,t,n,r){var o,i,s,u;if(l(n),void 0===(i=e._events)?(i=e._events=Object.create(null),e._eventsCount=0):(void 0!==i.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),i=e._events),s=i[t]),void 0===s)s=i[t]=n,++e._eventsCount;else if("function"==typeof s?s=i[t]=r?[n,s]:[s,n]:r?s.unshift(n):s.push(n),(o=c(e))>0&&s.length>o&&!s.warned){s.warned=!0;var a=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");a.name="MaxListenersExceededWarning",a.emitter=e,a.type=t,a.count=s.length,u=a,console&&console.warn&&console.warn(u)}return e}function h(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function v(e,t,n){var r={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},o=h.bind(r);return o.listener=n,r.wrapFn=o,o}function p(e,t,n){var r=e._events;if(void 0===r)return[];var o=r[t];return void 0===o?[]:"function"==typeof o?n?[o.listener||o]:[o]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(o):g(o,o.length)}function y(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function g(e,t){for(var n=new Array(t),r=0;r<t;++r)n[r]=e[r];return n}Object.defineProperty(u,"defaultMaxListeners",{enumerable:!0,get:function(){return f},set:function(e){if("number"!=typeof e||e<0||s(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");f=e}}),u.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},u.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||s(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},u.prototype.getMaxListeners=function(){return c(this)},u.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var r="error"===e,o=this._events;if(void 0!==o)r=r&&void 0===o.error;else if(!r)return!1;if(r){var s;if(t.length>0&&(s=t[0]),s instanceof Error)throw s;var u=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw u.context=s,u}var a=o[e];if(void 0===a)return!1;if("function"==typeof a)i(a,this,t);else{var f=a.length,l=g(a,f);for(n=0;n<f;++n)i(l[n],this,t)}return!0},u.prototype.addListener=function(e,t){return d(this,e,t,!1)},u.prototype.on=u.prototype.addListener,u.prototype.prependListener=function(e,t){return d(this,e,t,!0)},u.prototype.once=function(e,t){return l(t),this.on(e,v(this,e,t)),this},u.prototype.prependOnceListener=function(e,t){return l(t),this.prependListener(e,v(this,e,t)),this},u.prototype.removeListener=function(e,t){var n,r,o,i,s;if(l(t),void 0===(r=this._events))return this;if(void 0===(n=r[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete r[e],r.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(o=-1,i=n.length-1;i>=0;i--)if(n[i]===t||n[i].listener===t){s=n[i].listener,o=i;break}if(o<0)return this;0===o?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,o),1===n.length&&(r[e]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",e,s||t)}return this},u.prototype.off=u.prototype.removeListener,u.prototype.removeAllListeners=function(e){var t,n,r;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var o,i=Object.keys(n);for(r=0;r<i.length;++r)"removeListener"!==(o=i[r])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(r=t.length-1;r>=0;r--)this.removeListener(e,t[r]);return this},u.prototype.listeners=function(e){return p(this,e,!0)},u.prototype.rawListeners=function(e){return p(this,e,!1)},u.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):y.call(e,t)},u.prototype.listenerCount=y,u.prototype.eventNames=function(){return this._eventsCount>0?r(this._events):[]};var m=e((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){if(!n)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return n(r)};const n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),r=new Uint8Array(16)})),b=e((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;const n=[];for(let e=0;e<256;++e)n.push((e+256).toString(16).substr(1));var r=function(e,t){const r=t||0;return(n[e[r+0]]+n[e[r+1]]+n[e[r+2]]+n[e[r+3]]+"-"+n[e[r+4]]+n[e[r+5]]+"-"+n[e[r+6]]+n[e[r+7]]+"-"+n[e[r+8]]+n[e[r+9]]+"-"+n[e[r+10]]+n[e[r+11]]+n[e[r+12]]+n[e[r+13]]+n[e[r+14]]+n[e[r+15]]).toLowerCase()};t.default=r})),w=e((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(m),r=o(b);function o(e){return e&&e.__esModule?e:{default:e}}let i,s,u=0,a=0;var f=function(e,t,o){let f=t&&o||0;const l=t||new Array(16);let c=(e=e||{}).node||i,d=void 0!==e.clockseq?e.clockseq:s;if(null==c||null==d){const t=e.random||(e.rng||n.default)();null==c&&(c=i=[1|t[0],t[1],t[2],t[3],t[4],t[5]]),null==d&&(d=s=16383&(t[6]<<8|t[7]))}let h=void 0!==e.msecs?e.msecs:Date.now(),v=void 0!==e.nsecs?e.nsecs:a+1;const p=h-u+(v-a)/1e4;if(p<0&&void 0===e.clockseq&&(d=d+1&16383),(p<0||h>u)&&void 0===e.nsecs&&(v=0),v>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");u=h,a=v,s=d,h+=122192928e5;const y=(1e4*(268435455&h)+v)%4294967296;l[f++]=y>>>24&255,l[f++]=y>>>16&255,l[f++]=y>>>8&255,l[f++]=255&y;const g=h/4294967296*1e4&268435455;l[f++]=g>>>8&255,l[f++]=255&g,l[f++]=g>>>24&15|16,l[f++]=g>>>16&255,l[f++]=d>>>8|128,l[f++]=255&d;for(let e=0;e<6;++e)l[f+e]=c[e];return t||(0,r.default)(l)};t.default=f})),_=e((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){function s(e,o,i,s){if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e));const t=[];for(let n=0;n<e.length;++n)t.push(e.charCodeAt(n));return t}(e)),"string"==typeof o&&(o=function(e){const t=[];return e.replace(/[a-fA-F0-9]{2}/g,(function(e){t.push(parseInt(e,16))})),t}(o)),!Array.isArray(e))throw TypeError("value must be an array of bytes");if(!Array.isArray(o)||16!==o.length)throw TypeError("namespace must be uuid string or an Array of 16 byte values");const u=n(o.concat(e));if(u[6]=15&u[6]|t,u[8]=63&u[8]|128,i){s=s||0;for(let e=0;e<16;++e)i[s+e]=u[e];return i}return(0,r.default)(u)}try{s.name=e}catch(e){}return s.DNS=o,s.URL=i,s},t.URL=t.DNS=void 0;var n,r=(n=b)&&n.__esModule?n:{default:n};const o="6ba7b810-9dad-11d1-80b4-00c04fd430c8";t.DNS=o;const i="6ba7b811-9dad-11d1-80b4-00c04fd430c8";t.URL=i})),L=e((function(e,t){function n(e){return 14+(e+64>>>9<<4)+1}function r(e,t){const n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}function o(e,t,n,o,i,s){return r((u=r(r(t,e),r(o,s)))<<(a=i)|u>>>32-a,n);var u,a}function i(e,t,n,r,i,s,u){return o(t&n|~t&r,e,t,i,s,u)}function s(e,t,n,r,i,s,u){return o(t&r|n&~r,e,t,i,s,u)}function u(e,t,n,r,i,s,u){return o(t^n^r,e,t,i,s,u)}function a(e,t,n,r,i,s,u){return o(n^(t|~r),e,t,i,s,u)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var f=function(e){if("string"==typeof e){const t=unescape(encodeURIComponent(e));e=new Uint8Array(t.length);for(let n=0;n<t.length;++n)e[n]=t.charCodeAt(n)}return function(e){const t=[],n=32*e.length;for(let r=0;r<n;r+=8){const n=e[r>>5]>>>r%32&255,o=parseInt("0123456789abcdef".charAt(n>>>4&15)+"0123456789abcdef".charAt(15&n),16);t.push(o)}return t}(function(e,t){e[t>>5]|=128<<t%32,e[n(t)-1]=t;let o=1732584193,f=-271733879,l=-1732584194,c=271733878;for(let t=0;t<e.length;t+=16){const n=o,d=f,h=l,v=c;o=i(o,f,l,c,e[t],7,-680876936),c=i(c,o,f,l,e[t+1],12,-389564586),l=i(l,c,o,f,e[t+2],17,606105819),f=i(f,l,c,o,e[t+3],22,-1044525330),o=i(o,f,l,c,e[t+4],7,-176418897),c=i(c,o,f,l,e[t+5],12,1200080426),l=i(l,c,o,f,e[t+6],17,-1473231341),f=i(f,l,c,o,e[t+7],22,-45705983),o=i(o,f,l,c,e[t+8],7,1770035416),c=i(c,o,f,l,e[t+9],12,-1958414417),l=i(l,c,o,f,e[t+10],17,-42063),f=i(f,l,c,o,e[t+11],22,-1990404162),o=i(o,f,l,c,e[t+12],7,1804603682),c=i(c,o,f,l,e[t+13],12,-40341101),l=i(l,c,o,f,e[t+14],17,-1502002290),f=i(f,l,c,o,e[t+15],22,1236535329),o=s(o,f,l,c,e[t+1],5,-165796510),c=s(c,o,f,l,e[t+6],9,-1069501632),l=s(l,c,o,f,e[t+11],14,643717713),f=s(f,l,c,o,e[t],20,-373897302),o=s(o,f,l,c,e[t+5],5,-701558691),c=s(c,o,f,l,e[t+10],9,38016083),l=s(l,c,o,f,e[t+15],14,-660478335),f=s(f,l,c,o,e[t+4],20,-405537848),o=s(o,f,l,c,e[t+9],5,568446438),c=s(c,o,f,l,e[t+14],9,-1019803690),l=s(l,c,o,f,e[t+3],14,-187363961),f=s(f,l,c,o,e[t+8],20,1163531501),o=s(o,f,l,c,e[t+13],5,-1444681467),c=s(c,o,f,l,e[t+2],9,-51403784),l=s(l,c,o,f,e[t+7],14,1735328473),f=s(f,l,c,o,e[t+12],20,-1926607734),o=u(o,f,l,c,e[t+5],4,-378558),c=u(c,o,f,l,e[t+8],11,-2022574463),l=u(l,c,o,f,e[t+11],16,1839030562),f=u(f,l,c,o,e[t+14],23,-35309556),o=u(o,f,l,c,e[t+1],4,-1530992060),c=u(c,o,f,l,e[t+4],11,1272893353),l=u(l,c,o,f,e[t+7],16,-155497632),f=u(f,l,c,o,e[t+10],23,-1094730640),o=u(o,f,l,c,e[t+13],4,681279174),c=u(c,o,f,l,e[t],11,-358537222),l=u(l,c,o,f,e[t+3],16,-722521979),f=u(f,l,c,o,e[t+6],23,76029189),o=u(o,f,l,c,e[t+9],4,-640364487),c=u(c,o,f,l,e[t+12],11,-421815835),l=u(l,c,o,f,e[t+15],16,530742520),f=u(f,l,c,o,e[t+2],23,-995338651),o=a(o,f,l,c,e[t],6,-198630844),c=a(c,o,f,l,e[t+7],10,1126891415),l=a(l,c,o,f,e[t+14],15,-1416354905),f=a(f,l,c,o,e[t+5],21,-57434055),o=a(o,f,l,c,e[t+12],6,1700485571),c=a(c,o,f,l,e[t+3],10,-1894986606),l=a(l,c,o,f,e[t+10],15,-1051523),f=a(f,l,c,o,e[t+1],21,-2054922799),o=a(o,f,l,c,e[t+8],6,1873313359),c=a(c,o,f,l,e[t+15],10,-30611744),l=a(l,c,o,f,e[t+6],15,-1560198380),f=a(f,l,c,o,e[t+13],21,1309151649),o=a(o,f,l,c,e[t+4],6,-145523070),c=a(c,o,f,l,e[t+11],10,-1120210379),l=a(l,c,o,f,e[t+2],15,718787259),f=a(f,l,c,o,e[t+9],21,-343485551),o=r(o,n),f=r(f,d),l=r(l,h),c=r(c,v)}return[o,f,l,c]}(function(e){if(0===e.length)return[];const t=8*e.length,r=new Uint32Array(n(t));for(let n=0;n<t;n+=8)r[n>>5]|=(255&e[n/8])<<n%32;return r}(e),8*e.length))};t.default=f})),j=e((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(_),r=o(L);function o(e){return e&&e.__esModule?e:{default:e}}var i=(0,n.default)("v3",48,r.default);t.default=i})),M=e((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(m),r=o(b);function o(e){return e&&e.__esModule?e:{default:e}}var i=function(e,t,o){const i=(e=e||{}).random||(e.rng||n.default)();if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,t){o=o||0;for(let e=0;e<16;++e)t[o+e]=i[e];return t}return(0,r.default)(i)};t.default=i})),O=e((function(e,t){function n(e,t,n,r){switch(e){case 0:return t&n^~t&r;case 1:return t^n^r;case 2:return t&n^t&r^n&r;case 3:return t^n^r}}function r(e,t){return e<<t|e>>>32-t}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(e){const t=[1518500249,1859775393,2400959708,3395469782],o=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof e){const t=unescape(encodeURIComponent(e));e=[];for(let n=0;n<t.length;++n)e.push(t.charCodeAt(n))}e.push(128);const i=e.length/4+2,s=Math.ceil(i/16),u=new Array(s);for(let t=0;t<s;++t){const n=new Uint32Array(16);for(let r=0;r<16;++r)n[r]=e[64*t+4*r]<<24|e[64*t+4*r+1]<<16|e[64*t+4*r+2]<<8|e[64*t+4*r+3];u[t]=n}u[s-1][14]=8*(e.length-1)/Math.pow(2,32),u[s-1][14]=Math.floor(u[s-1][14]),u[s-1][15]=8*(e.length-1)&4294967295;for(let e=0;e<s;++e){const i=new Uint32Array(80);for(let t=0;t<16;++t)i[t]=u[e][t];for(let e=16;e<80;++e)i[e]=r(i[e-3]^i[e-8]^i[e-14]^i[e-16],1);let s=o[0],a=o[1],f=o[2],l=o[3],c=o[4];for(let e=0;e<80;++e){const o=Math.floor(e/20),u=r(s,5)+n(o,a,f,l)+c+t[o]+i[e]>>>0;c=l,l=f,f=r(a,30)>>>0,a=s,s=u}o[0]=o[0]+s>>>0,o[1]=o[1]+a>>>0,o[2]=o[2]+f>>>0,o[3]=o[3]+l>>>0,o[4]=o[4]+c>>>0}return[o[0]>>24&255,o[0]>>16&255,o[0]>>8&255,255&o[0],o[1]>>24&255,o[1]>>16&255,o[1]>>8&255,255&o[1],o[2]>>24&255,o[2]>>16&255,o[2]>>8&255,255&o[2],o[3]>>24&255,o[3]>>16&255,o[3]>>8&255,255&o[3],o[4]>>24&255,o[4]>>16&255,o[4]>>8&255,255&o[4]]};t.default=o})),C=e((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(_),r=o(O);function o(e){return e&&e.__esModule?e:{default:e}}var i=(0,n.default)("v5",80,r.default);t.default=i})),P=t(e((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"v1",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(t,"v3",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(t,"v4",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"v5",{enumerable:!0,get:function(){return i.default}});var n=s(w),r=s(j),o=s(M),i=s(C);function s(e){return e&&e.__esModule?e:{default:e}}})));class A extends a.EventEmitter{constructor(e){super(),this.config={definition:"fdmprinter",overrides:[],verbose:!1,...e},this.loaded=!1,this.oldProgress=0}async load(){this.worker=await n.spawn(new n.Worker("./worker.js")),await this.worker.initialize(this.config.verbose),this.log("Initialized worker!"),await this.worker.addDefinitions(),this.log("Added definitions!"),this.loaded=!0}slice(e){return new Promise(async(t,r)=>{this.loaded||await this.load();const o=n.Transfer(e);this.worker.addFile("Model.stl",o),this.log("Added model!");const i=P.v4();this.worker.observeCallback(i).subscribe(e=>{e=Math.trunc(100*e),this.oldProgress!=e&&(this.log(`Progress: ${e}%`),this.emit("progress",e)),this.oldProgress=e}),this.log("Registered callbacks!");const s=["slice","-j",`definitions/${this.config.definition}.def.json`,"-l","Model.stl","-o","Model.gcode","--progress",i];this.config.verbose&&s.push("-v"),null!=this.config.overrides&&this.config.overrides.forEach(e=>{null==e.scope?s.push("-s",`${e.key}=${e.value}`):s.push("-s",e.scope,`${e.key}=${e.value}`)}),this.log("Starting CuraEngine with arguments: "+s.join(", ")),await this.worker.main(s);t(await this.worker.getFile("Model.gcode"))})}async destroy(){await this.worker.removeFile("Model.stl"),this.log("Removed model!"),await this.worker.removeDefinitions(),this.log("Removed definitions!"),await n.Thread.terminate(this.worker)}log(e){this.config.verbose&&console.log(e)}}export default A;