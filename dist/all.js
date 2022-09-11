var kongUtil;(()=>{"use strict";var e={688:(e,t,n)=>{n.d(t,{default:()=>m,everyAsync:()=>o,extendArrayPrototype:()=>g,filterAsync:()=>i,findAsync:()=>a,findIndexAsync:()=>s,findLastAsync:()=>c,findLastIndexAsync:()=>f,forEachAsync:()=>d,mapAsync:()=>u,reduceAsync:()=>l,reduceRightAsync:()=>y,someAsync:()=>p});var r=n(571);async function o(e,t=this){return(await u(e,t)).every((e=>e))}async function i(e,t=this){const n=[];for(let r=0;r<t.length;++r)await e(t[r],r,t)&&n.push(t[r]);return n}async function a(e,t=this,n){for(let r=0;r<t.length;++r)if(await e(t[r],r,t))return n?r:t[r];return n?-1:void 0}const s=(e,t)=>a(e,t,!0);async function c(e,t=this,n){for(let r=t.length-1;r>=0;--r)if(await e(t[r],r,t))return n?r:t[r];return n?-1:void 0}const f=(e,t)=>c(e,t,!0);async function d(e,t=this){for(let n=0;n<t.length;++n)await e(t[n],n,t)}async function u(e,t=this){const n=[];for(let r=0;r<t.length;++r)n.push(await e(t[r],r,t));return n}async function l(e,t,n=this){let r=t,o=0;if(void 0===t){if(!n.length)throw new TypeError("Reduce of empty array with no initial value");r=n[0],o=1}for(let t=o;t<n.length;++t)r=await e(r,n[t],t,n);return r}async function y(e,t,n=this){let r=t,o=n.length-1;if(void 0===t){if(!n.length)throw new TypeError("Reduce of empty array with no initial value");r=n[o],--o}for(let t=o;t>=0;--t)r=await e(r,n[t],t,n);return r}const p=(e,t)=>s(e,t).then((e=>-1!==e)),h={everyAsync:o,filterAsync:i,findAsync:a,findIndexAsync:s,findLastAsync:c,findLastIndexAsync:f,forEachAsync:d,mapAsync:u,reduceAsync:l,reduceRightAsync:y,someAsync:p},g=()=>Object.assign(Array.prototype,h);Object.assign(r.default,h,{extendArrayPrototype:g});const m=r.default},383:(e,t,n)=>{n.d(t,{addTimeLimit:()=>c,default:()=>f,promisify:()=>i,wait:()=>a,waitFor:()=>s});var r=n(571),o=n(119);function i(e,t=!1){return(...n)=>new Promise(((r,o)=>e(...n,((e,...n)=>{if(e)return o(e);r(t?n:n[0])}))))}function a(e,t){return new Promise((n=>setTimeout(n,e,t)))}function s(e,t,n=new Error("timeout")){let r;if(e instanceof Promise)r=t=>e.then(t);else{if(!(e instanceof Function)){if(e instanceof EventTarget)return(0,o.waitForEvent)(...arguments);const{target:r,type:i,...a}=e;return(0,o.waitForEvent)(r,i,a,t,n)}r=t=>e(t)}if(r)return new Promise(((e,o)=>{r(e),t>0&&setTimeout(o,t,n)}))}function c(e,t,n){return function(...r){return s(e(...r),t,n)}}Object.assign(r.default,{promisify:i,wait:a,waitFor:s,addTimeLimit:c});const f=r.default},571:(e,t,n)=>{n.d(t,{default:()=>i,use:()=>o});const r={};function o(...e){e[0]instanceof Array&&(e=e[0]);for(let t in r)"use"!==t&&(e.length&&!e.includes(t)||(globalThis[t]=r[t]))}Object.assign(r,{use:o});const i=r},672:(e,t,n)=>{n.d(t,{alerter:()=>o,default:()=>a,logger:()=>i});var r=n(571);const o=function(e){return()=>(alert(e),e)},i=function(){return(...e)=>(console.debug(...arguments,...e),e.length<2?e[0]:e)};Object.assign(r.default,{alerter:o,logger:i});const a=r.default},3:(e,t,n)=>{n.d(t,{$:()=>o,$$:()=>i,default:()=>s,parseHTML:()=>a});var r=n(571);function o(e,t=document){if("string"==typeof e)return t.querySelector(e);if(e instanceof Array)return e.map((e=>t.querySelector(e)));throw new TypeError("requiring a string or an array of strings")}const i=(e,t=document)=>[...t.querySelectorAll(e)],a=(()=>{let e;return(t,n="body > *")=>{if("undefined"==typeof DOMParser)throw ReferenceError("DOMParser is not defined");e||(e=new DOMParser);const r=e.parseFromString(t,"text/html");return"string"==typeof n||n instanceof Array?o(n,r):r}})();Object.assign(r.default,{$:o,$$:i,parseHTML:a});const s=r.default},938:(e,t,n)=>{n.d(t,{clearElement:()=>o,default:()=>a,extendElementPrototype:()=>i});var r=n(571);function o(e=this){let t;for(;t=e.lastChild;)e.removeChild(node)}const i=()=>Object.assign(Element.prototype,{clear:o});Object.assign(r.default,{clearElement:o,extendElementPrototype:i});const a=r.default},119:(e,t,n)=>{n.d(t,{default:()=>c,extendEventTargetPrototype:()=>s,listen:()=>o,unlisten:()=>i,waitForEvent:()=>a});var r=n(571);const o=(e,...t)=>e.addEventListener(...t),i=(e,...t)=>e.removeEventListener(...t);function a(e,t,...n){let r,a,s;return n.length&&isNaN(n[0])?(r="object"==typeof n[0]?Object.assign({},n[0]):{capture:!!n[0]},n.splice(0,1)):r={capture:!1},r.once=!0,a=n[0]||0,s=n[1]||new Error("timeout"),new Promise(((n,c)=>{const f=e=>{r.preventDefault&&e.preventDefault(),r.stopPropagation&&e.stopPropagation(),r.stopImmediatePropagation&&e.stopImmediatePropagation(),n()};o(e,t,f,r),a>0&&setTimeout((()=>{i(e,f,r),c(s)}),a)}))}const s=()=>Object.assign(EventTarget.prototype,{listen:EventTarget.prototype.addEventListener,unlisten:EventTarget.prototype.removeEventListener,waitFor:function(...e){return a(this,...e)}});Object.assign(r.default,{listen:o,waitForEvent:a,extendEventTargetPrototype:s});const c=r.default},459:(e,t,n)=>{n.d(t,{default:()=>f,fetchDOM:()=>c,fetchJSON:()=>a,fetchStrict:()=>i,fetchText:()=>s});var r=n(571),o=n(3);const i=(...e)=>fetch(...e).then((e=>{if(e.ok)return e;throw new ReferenceError(e.statusText)})),a=(...e)=>i(...e).then((e=>e.json())),s=(...e)=>i(...e).then((e=>e.text())),c=(...e)=>s(...e).then((e=>(0,o.parseHTML)(e,0)));Object.assign(r.default,{fetchStrict:i,fetchJSON:a,fetchText:s,fetchDOM:c});const f=r.default}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{n.r(r),n.d(r,{$:()=>a.$,$$:()=>a.$$,addTimeLimit:()=>o.addTimeLimit,alerter:()=>i.alerter,clearElement:()=>s.clearElement,default:()=>u,everyAsync:()=>t.everyAsync,extendArrayPrototype:()=>t.extendArrayPrototype,extendElementPrototype:()=>s.extendElementPrototype,extendEventTargetPrototype:()=>c.extendEventTargetPrototype,extendPrototype:()=>d,fetchDOM:()=>f.fetchDOM,fetchJSON:()=>f.fetchJSON,fetchStrict:()=>f.fetchStrict,fetchText:()=>f.fetchText,filterAsync:()=>t.filterAsync,findAsync:()=>t.findAsync,findIndexAsync:()=>t.findIndexAsync,findLastAsync:()=>t.findLastAsync,findLastIndexAsync:()=>t.findLastIndexAsync,forEachAsync:()=>t.forEachAsync,listen:()=>c.listen,logger:()=>i.logger,mapAsync:()=>t.mapAsync,parseHTML:()=>a.parseHTML,promisify:()=>o.promisify,reduceAsync:()=>t.reduceAsync,reduceRightAsync:()=>t.reduceRightAsync,someAsync:()=>t.someAsync,unlisten:()=>c.unlisten,use:()=>e.use,wait:()=>o.wait,waitFor:()=>o.waitFor,waitForEvent:()=>c.waitForEvent});var e=n(571),t=n(688),o=n(383),i=n(672),a=n(3),s=n(938),c=n(119),f=n(459);const d=()=>{t.default.extendArrayPrototype(),s.default.extendElementPrototype(),c.default.extendEventTargetPrototype()};Object.assign(e.default,t.default,o.default,a.default,i.default,s.default,c.default,f.default,{extendPrototype:d});const u=e.default})(),kongUtil=r})();