(()=>{"use strict";var t={688:(t,e,n)=>{async function o(t,e=this,n){for(let o=0;o<e.length;++o)if(await t(e[o],o,e))return n?o:e[o];return n?-1:void 0}n.d(e,{ZP:()=>f});const r=(t,e)=>o(t,e,!0);async function i(t,e=this,n){for(let o=e.length-1;o>=0;--o)if(await t(e[o],o,e))return n?o:e[o];return n?-1:void 0}async function s(t,e=this){const n=[];for(let o=0;o<e.length;++o)n.push(await t(e[o],o,e));return n}const a={everyAsync:async function(t,e=this){return(await s(t,e)).every((t=>t))},filterAsync:async function(t,e=this){const n=[];for(let o=0;o<e.length;++o)await t(e[o],o,e)&&n.push(e[o]);return n},findAsync:o,findIndexAsync:r,findLastAsync:i,findLastIndexAsync:(t,e)=>i(t,e,!0),forEachAsync:async function(t,e=this){for(let n=0;n<e.length;++n)await t(e[n],n,e)},mapAsync:s,reduceAsync:async function(t,e,n=this){let o=e,r=0;if(void 0===e){if(!n.length)throw new TypeError("Reduce of empty array with no initial value");o=n[0],r=1}for(let e=r;e<n.length;++e)o=await t(o,n[e],e,n);return o},reduceRightAsync:async function(t,e,n=this){let o=e,r=n.length-1;if(void 0===e){if(!n.length)throw new TypeError("Reduce of empty array with no initial value");o=n[r],--r}for(let e=r;e>=0;--e)o=await t(o,n[e],e,n);return o},someAsync:(t,e)=>r(t,e).then((t=>-1!==t))},c=Object.assign({extendArrayPrototype:()=>Object.assign(Array.prototype,a)},a);"object"==typeof window&&window===globalThis&&Object.assign(window,c);const f=c},383:(t,e,n)=>{n.d(e,{ZP:()=>s});var o=n(119);function r(t,e,n=new Error("timeout")){let r;if(t instanceof Promise)r=e=>t.then(e);else{if(!(t instanceof Function)){if(t instanceof EventTarget)return(0,o.mA)(...arguments);const{target:r,type:i,...s}=t;return(0,o.mA)(r,i,s,e,n)}r=e=>t(e)}if(r)return new Promise(((t,o)=>{r(t),e>0&&setTimeout(o,e,n)}))}const i={promisify:function(t,e=!1){return(...n)=>new Promise(((o,r)=>t(...n,((t,...n)=>{if(t)return r(t);o(e?n:n[0])}))))},wait:function(t){return new Promise((e=>setTimeout(e,t)))},waitFor:r,addTimeLimit:function(t,e,n){return function(...o){return r(t(...o),e,n)}}};"object"==typeof window&&window===globalThis&&Object.assign(window,i);const s=i},3:(t,e,n)=>{function o(t,e=document){if("string"==typeof t)return e.querySelector(t);if(t instanceof Array)return t.map((t=>e.querySelector(t)));throw new TypeError("requiring a string or an array of strings")}n.d(e,{Z:()=>s,r:()=>r});const r=(()=>{let t;return(e,n="body > *")=>{if("undefined"==typeof DOMParser)throw ReferenceError("DOMParser is not defined");t||(t=new DOMParser);const r=t.parseFromString(e,"text/html");return"string"==typeof n||n instanceof Array?o(n,r):r}})(),i={$:o,$$:(t,e=document)=>[...e.querySelectorAll(t)],parseHTML:r};"object"==typeof window&&window===globalThis&&Object.assign(window,i);const s=i},938:(t,e,n)=>{function o(t=this){let e;for(;e=t.lastChild;)t.removeChild(node)}n.d(e,{ZP:()=>i});const r={clearElement:o,extendElementPrototype:()=>Object.assign(Element.prototype,{clear:o})};"object"==typeof window&&window===globalThis&&Object.assign(window,r);const i=r},119:(t,e,n)=>{n.d(e,{ZP:()=>s,mA:()=>r});const o=(t,...e)=>t.addEventListener(...e);function r(t,e,...n){let r,i,s;return n.length&&isNaN(n[0])?(r="object"==typeof n[0]?Object.assign({},n[0]):{capture:!!n[0]},n.splice(0,1)):r={capture:!1},r.once=!0,i=n[0]||0,s=n[1]||new Error("timeout"),new Promise(((n,a)=>{const c=t=>{r.preventDefault&&t.preventDefault(),r.stopPropagation&&t.stopPropagation(),r.stopImmediatePropagation&&t.stopImmediatePropagation(),n()};o(t,e,c,r),i>0&&setTimeout((()=>{((t,...e)=>{t.removeEventListener(...e)})(t,c,r),a(s)}),i)}))}const i={listen:o,waitForEvent:r,extendEventTargetPrototype:()=>Object.assign(EventTarget.prototype,{listen:EventTarget.prototype.addEventListener,unlisten:EventTarget.prototype.removeEventListener,waitFor:function(...t){return r(this,...t)}})};"object"==typeof window&&window===globalThis&&Object.assign(window,i);const s=i},459:(t,e,n)=>{n.d(e,{ZP:()=>a});var o=n(3);const r=(...t)=>fetch(...t).then((t=>{if(t.ok)return t;throw new ReferenceError(t.statusText)})),i=(...t)=>r(...t).then((t=>t.text())),s={fetchStrict:r,fetchJSON:(...t)=>r(...t).then((t=>t.json())),fetchText:i,fetchDOM:(...t)=>i(...t).then(o.r)};"object"==typeof window&&window===globalThis&&Object.assign(window,s);const a=s}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var i=e[o]={exports:{}};return t[o](i,i.exports,n),i.exports}n.d=(t,e)=>{for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t=n(688),e=n(383),o=n(3),r=n(938),i=n(119),s=n(459);const a={extendPrototype:()=>{t.ZP.extendArrayPrototype(),r.ZP.extendElementPrototype(),i.ZP.extendEventTargetPrototype()}};"object"==typeof window&&window===globalThis&&Object.assign(window,a),Object.assign(a,t.ZP,e.ZP,o.Z,r.ZP,i.ZP,s.ZP)})()})();