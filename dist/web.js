var kongUtil;(()=>{"use strict";var e={571:(e,t,r)=>{r.d(t,{default:()=>o});const n={};Object.assign(n,{use:function(...e){e[0]instanceof Array&&(e=e[0]);for(let t in n)"use"!==t&&(e.length&&!e.includes(t)||(globalThis[t]=n[t]))}});const o=n},3:(e,t,r)=>{r.d(t,{parseHTML:()=>a});var n=r(571);function o(e,t=document){if("string"==typeof e)return t.querySelector(e);if(e instanceof Array)return e.map((e=>t.querySelector(e)));throw new TypeError("requiring a string or an array of strings")}const a=(()=>{let e;return(t,r="body > *")=>{if("undefined"==typeof DOMParser)throw ReferenceError("DOMParser is not defined");e||(e=new DOMParser);const n=e.parseFromString(t,"text/html");return"string"==typeof r||r instanceof Array?o(r,n):n}})();Object.assign(n.default,{$:o,$$:(e,t=document)=>[...t.querySelectorAll(e)],parseHTML:a})}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,r),a.exports}r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};(()=>{r.r(n),r.d(n,{default:()=>f,fetchDOM:()=>c,fetchJSON:()=>a,fetchStrict:()=>o,fetchText:()=>s});var e=r(571),t=r(3);const o=(...e)=>fetch(...e).then((e=>{if(e.ok)return e;throw new ReferenceError(e.statusText)})),a=(...e)=>o(...e).then((e=>e.json())),s=(...e)=>o(...e).then((e=>e.text())),c=(...e)=>s(...e).then((e=>(0,t.parseHTML)(e,0)));Object.assign(e.default,{fetchStrict:o,fetchJSON:a,fetchText:s,fetchDOM:c});const f=e.default})(),kongUtil=n})();