var kongUtilDom;(()=>{var e={667:e=>{(t=>{function r(e,s){if("object"!=typeof s&&(s=t.document),"string"==typeof e)return s.createTextNode(e);if(e instanceof Array)return e.map((e=>r(e,s)));if(e.cloneNode)return e.cloneNode(!0);let a=e.tag;if(!a){if(a=Object.keys(e)[0],!a)throw TypeError("object does not match JsonElement structure.");e=e[a]}const i=s.createElement(a);"string"==typeof e&&(e={text:e});for(let t in e){const a=e[t];if(t=t.toLowerCase(),t.startsWith("on"))i.addEventListener(t.substring(2),o(a,t));else switch(t){case".":case"class":case"classname":{const e="string"==typeof a?a.split(" "):a;i.classList.add(...e.filter((e=>e)));break}case"css":case"style":if("string"==typeof a)i.style.cssText=a;else for(let e in a)i.style[n(e)]=a[e];break;case"#":i.id=a;break;case"!":case"text":case"child":i.append(r(a,s));break;case"$":case"childs":case"childnodes":case"children":i.append(...a.map((e=>r(e,s))));break;case"data":case"dataset":for(let e in a)i.dataset[n(e)]=a[e];break;case"listener":case"listeners":for(let e in a)i.addEventListener(e,o(a[e],`on${e}`));break;case"tag":break;default:console.assert("string"==typeof a,new TypeError("attribute value must be a string")),i.setAttribute(t,a)}}return i}const n=e=>e.replace(/-([a-z])/g,(e=>e[1].toUpperCase())),o=(e,t="anonymous")=>e instanceof Function?e:Function(`return function ${t}(event) { ${e} }`)();e.exports?e.exports=r:(t.JSML=t.JSML||{},t.JSML.createElement=r)})(globalThis)},571:(e,t,r)=>{"use strict";r.d(t,{D:()=>o,Z:()=>s});const n={},o=function(...e){e[0]instanceof Array&&(e=e[0]);for(let t in this)"use"!==t&&(e.length&&!e.includes(t)||(globalThis[t]=this[t]))}.bind(n);Object.assign(n,{use:o});const s=n}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var s=t[n]={exports:{}};return e[n](s,s.exports,r),s.exports}r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};(()=>{"use strict";r.r(n),r.d(n,{$:()=>o,$$:()=>s,clearElement:()=>f,createElement:()=>l,default:()=>d,extendElementPrototype:()=>u,getNodes:()=>i,parseHTML:()=>a,use:()=>e.D});var e=r(571),t=r(667);const o=(e,t=document)=>{if("string"==typeof e)return t.querySelector(e);if(e instanceof Array)return e.map((e=>o(e,t)));for(let r in e)result[r]=o(e[r],t);return{}},s=(e,t=document)=>{if("string"==typeof e)return[...t.querySelectorAll(e)];if(e instanceof Array)return e.map((e=>s(e,t)));for(let r in e)result[r]=s(e[r],t);return{}},a=(()=>{let e;return(t,r="body > *")=>{if("undefined"==typeof DOMParser)throw ReferenceError("DOMParser is not defined");e||(e=new DOMParser);const n=e.parseFromString(t,"text/html");return"string"==typeof r||r instanceof Array?o(r,n):n}})();function i(e=(()=>!0),t=(()=>!1),r=document){if("function"!=typeof e&&"function"!=typeof t)return e instanceof Array&&(e=e.join(",")),t instanceof Array&&(t=t.join(",")),s(e,r).filter((e=>!s(t,r).includes(e)));e=c(e,r),t=c(t,r);const n={acceptNode:r=>t(r)?NodeFilter.FILTER_REJECT:e(r)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP},o=document.createTreeWalker(r,NodeFilter.SHOW_ALL,n);let a,i=[];for(;a=o.nextNode();)i.push(a);return i}function c(e,t){if("function"==typeof e)return e;if("string"==typeof e){const r=s(e,t);return e=>r.includes(e)}if(e instanceof Array)return e=e.map((e=>e.toUpperCase())),t=>e.includes(t.tagName);throw new TypeError("selector shall be a function, a CSS selector string, or an array of strings representing HTML tags.")}const l=t;function f(e=this){let t;for(;t=e.lastChild;)e.removeChild(t)}const u=()=>Object.assign(Element.prototype,{clear:f});Object.assign(e.Z,{$:o,$$:s,parseHTML:a,getNodes:i,createElement:l,clearElement:f,extendElementPrototype:u});const d=e.Z})(),kongUtilDom=n})();