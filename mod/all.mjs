var e={71:(e,t,n)=>{n.d(t,{GA:()=>h,Kh:()=>i,Kp:()=>a,Mo:()=>f,Vl:()=>c,W9:()=>u,ZP:()=>b,bU:()=>o,e$:()=>g,iL:()=>s,qd:()=>l,wE:()=>d,wt:()=>y,yo:()=>p});var r=n(292);async function s(e,t=this){return(await l(e,t)).every((e=>e))}async function o(e,t=this){const n=[];for(let r=0;r<t.length;++r)await e(t[r],r,t)&&n.push(t[r]);return n}async function a(e,t=this,n){for(let r=0;r<t.length;++r)if(await e(t[r],r,t))return n?r:t[r];return n?-1:void 0}function i(e,t){return a(e,t,!0)}async function c(e,t=this,n){for(let r=t.length-1;r>=0;--r)if(await e(t[r],r,t))return n?r:t[r];return n?-1:void 0}function u(e,t){return c(e,t,!0)}async function f(e,t=this){return l(e,t,!0)}async function l(e,t=this,n){const r=n?void 0:[];for(let n=0;n<t.length;++n)r?.push(await e(t[n],n,t));return r}async function d(e,t,n=this){let r=t,s=0;if(void 0===t){if(!n.length)throw new TypeError("Reduce of empty array with no initial value");r=n[0],s=1}for(let t=s;t<n.length;++t)r=await e(r,n[t],t,n);return r}async function p(e,t,n=this){let r=t,s=n.length-1;if(void 0===t){if(!n.length)throw new TypeError("Reduce of empty array with no initial value");r=n[s],--s}for(let t=s;t>=0;--t)r=await e(r,n[t],t,n);return r}function y(e,t){return i(e,t).then((e=>-1!==e))}function h(e,t=this){const n={};return t.forEach(((r,s)=>n[r]=e(r,s,t))),n}const m={everyAsync:s,filterAsync:o,findAsync:a,findIndexAsync:i,findLastAsync:c,findLastIndexAsync:u,forEachAsync:f,mapAsync:l,reduceAsync:d,reduceRightAsync:p,someAsync:y,mapToObject:h},g=()=>Object.assign(Array.prototype,m);Object.assign(r.Z,m,{extendArrayPrototype:g});const b=r.Z},986:(e,t,n)=>{n.d(t,{Dc:()=>a,Fr:()=>o,X_:()=>i,ZP:()=>u,mg:()=>c});var r=n(292),s=n(707);function o(e,t=!1){return(...n)=>new Promise(((r,s)=>e(...n,((e,...n)=>{if(e)return s(e);r(t?n:n[0])}))))}function a(e,t){return new Promise((n=>setTimeout(n,e,t)))}function i(e,t){let n;if(e instanceof Promise)n=t=>e.then(t);else{if(!(e instanceof Function)){if(e instanceof EventTarget)return(0,s.mA)(...arguments);const{target:n,type:r,...o}=e;return o.timeout=t,(0,s.mA)(n,r,o)}n=t=>e(t)}if(n)return new Promise(((e,r)=>{setTimeout(n,0,e),t>0&&setTimeout(r,t,new Event("abort"))}))}function c(e,t){return function(...n){return i(e(...n),t)}}Object.assign(r.Z,{promisify:o,wait:a,waitFor:i,addTimeLimit:c});const u=r.Z},292:(e,t,n)=>{n.d(t,{Z:()=>o,D:()=>s});const r={version:"0.6.8"},s=function(...e){e[0]instanceof Array&&(e=e[0]);for(let t in this)"use"!==t&&(e.length&&!e.includes(t)||(globalThis[t]=this[t]))}.bind(r);Object.assign(r,{use:s});const o=r},101:(e,t,n)=>{n.d(t,{L$:()=>s,ZP:()=>a,kg:()=>o});var r=n(292);function s(e){return()=>(alert(e),e)}function o(){return(...e)=>(console.debug(...arguments,...e),e.length<2?e[0]:e)}Object.assign(r.Z,{alerter:s,logger:o});const a=r.Z},324:(e,t,n)=>{n.d(t,{$:()=>o,$$:()=>a,EI:()=>l,He:()=>h,UR:()=>y,W1:()=>p,ZP:()=>m,oP:()=>d,rg:()=>c,v$:()=>u});var r=n(292),s=n(432);function o(e,t=document){if(t?.querySelector||(t=document),"string"==typeof e)return t.querySelector(e);if(e instanceof Array)return e.map((e=>o(e,t)));const n={};for(let r in e)n[r]=o(e[r],t);return n}function a(e,t=document){if(t?.querySelectorAll||(t=document),"string"==typeof e)return[...t.querySelectorAll(e)];if(e instanceof Array)return e.map((e=>a(e,t)));const n={};for(let r in e)n[r]=a(e[r],t);return n}let i;function c(e,t="body > *"){if("undefined"==typeof DOMParser)throw ReferenceError("DOMParser is not defined");i||(i=new DOMParser);const n=i.parseFromString(e,"text/html");return"string"==typeof t?o(t,n):n}function u(e=(()=>!0),t=(()=>!1),n=document){if("function"!=typeof e&&"function"!=typeof t)return e instanceof Array&&(e=e.join(",")),t instanceof Array&&(t=t.join(",")),a(e,n).filter((e=>!a(t,n).includes(e)));e=f(e,n),t=f(t,n);const r={acceptNode:n=>t(n)?NodeFilter.FILTER_REJECT:e(n)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP},s=document.createTreeWalker(n,NodeFilter.SHOW_ALL,r);let o,i=[];for(;o=s.nextNode();)i.push(o);return i}function f(e,t){if("function"==typeof e)return e;if("string"==typeof e){const n=a(e,t);return e=>n.includes(e)}if(e instanceof Array)return e=e.map((e=>e.toUpperCase())),t=>e.includes(t.tagName);throw new TypeError("selector shall be a function, a CSS selector string, or an array of strings representing HTML tags.")}function l(e,t){if("string"!=typeof t&&(t=null),"object"!=typeof e)return document.createTextNode(e);if(e instanceof Node)return e.cloneNode(!0);let[n,r,...o]=e;("object"!=typeof e[1]||e[1]instanceof Array)&&(r={},[n,...o]=e),"svg"===n&&(t="http://www.w3.org/2000/svg");const a=r.namespace??t,i=a?document.createElementNS(a,n):document.createElement(n);for(let e in r){const t=r[e];if(e.startsWith("on"))listen(i,e.substring(2).toLowerCase(),t);else switch(e){case"class":case"className":{const e="string"==typeof t?t.trim().split(/\s+/):t;e[0]&&i.classList.add(...e);break}case"css":case"style":if("string"==typeof t)i.style.cssText=t;else for(let e in t)i.style[(0,s._A)(e)]=t[e];break;case"data":case"dataset":for(let e in t)i.dataset[(0,s._A)(e)]=t[e];break;case"namespace":break;default:i.setAttribute(e,t)}}return i.append(...o.map((e=>l(e,a)))),i}function d(e=this){console.warn("`clearElement()` has been deprecated. Use `Element.replaceChildren()` instead."),e.replaceChildren()}function p(e,t=this){const{clientX:n,clientY:r}=e;return[...t.getClientRects()].some((e=>n>=e.left&&n<=e.right&&r>=e.top&&r<=e.bottom))}function y(e,t){l(["a",{href:e,filename:t}]).click()}const h=()=>Object.assign(Element.prototype,{clear:d,hasEventIn:p});Object.assign(r.Z,{$:o,$$:a,parseHTML:c,getNodes:u,createElementFromJsonML:l,clearElement:d,isEventInElement:p,downloadURL:y,extendElementPrototype:h});const m=r.Z},707:(e,t,n)=>{n.d(t,{Ev:()=>o,PB:()=>i,ZP:()=>c,mA:()=>a,oL:()=>s});var r=n(292);function s(e,...t){e.addEventListener(...t)}function o(e,...t){e.removeEventListener(...t)}function a(e,t,n){let r;switch(typeof n){case"undefined":r=0,n={};break;case"number":r=n,n={};break;case"string":r=parseInt(n),n={};break;case"boolean":r=0,n={capture:n};break;case"object":r=n.timeout;break;default:throw TypeError()}return n.once=!0,new Promise(((a,i)=>{const c=e=>{n.preventDefault&&e.preventDefault(),n.stopPropagation&&e.stopPropagation(),n.stopImmediatePropagation&&e.stopImmediatePropagation(),a()};s(e,t,c,n),r>0&&setTimeout((()=>{o(e,c,n);const t=new Event("abort");e.dispatchEvent(t),i(t)}),r)}))}const i=()=>Object.assign(EventTarget.prototype,{listen:EventTarget.prototype.addEventListener,unlisten:EventTarget.prototype.removeEventListener,waitFor:function(...e){return a(this,...e)}});Object.assign(r.Z,{listen:s,waitForEvent:a,extendEventTargetPrototype:i});const c=r.Z},701:(e,t,n)=>{n.d(t,{Rh:()=>a,Xh:()=>o,ZP:()=>i,oc:()=>s});var r=n(292);function s(e,t,n=this){return Object.keys(n)[e]((e=>t(n[e],e,n)))}function o(e,t,n=this){return Object.keys(n).reduce(((t,r)=>e(t,n[r],r,n)),t)}async function a(e,t,n=this){return Object.keys(n).reduce((async(t,r)=>await e(t,n[r],r,n)),t)}Object.assign(r.Z,{emulateArray:s,objectReduce:o,objectReduceAsync:a});const i=r.Z},432:(e,t,n)=>{n.d(t,{C9:()=>i,MJ:()=>c,ZP:()=>l,_A:()=>s,bW:()=>f,uG:()=>o});var r=n(292);function s(e){return e.replace(/-([a-z]\w+)/g,(e=>e[1].toUpperCase()+e.slice(2)))}function o(e,t=!1){let n="",r=e.toString().replaceAll(/\s/g,"").replace(/[點点奌]/,".");if("負负".includes(r.charAt(0))?n="-":r.startsWith("正")&&(n="+"),n&&(r=r.substring(1)),a.forEach(((e,t)=>{r=r.replaceAll(e,t.toString())})),/^\d+(\.\d+)?$/.test(r))r=n+r;else{let e=!1,t=!1,s=[],o=[],a=[],i=null;if(r.split("").forEach((n=>{if(t)return a.unshift(n);if("0123456789".includes(n))return i=n;const r=["十拾什","百佰","千仟"].findIndex((e=>e.includes(n)))+1;if(r)return o[r]=i??"1",i=null;const c=["萬万","億亿","兆","京經经","垓","秭杼","穰壤","溝沟","澗涧","正","載","極"].findIndex((e=>e.includes(n)))+1;if(c||"."===n){o[0]=i;for(let e=0;e<o.length;++e)s[e+4*c]=o[e];i=null}return c?o=[]:"."===n?t=!0:void(e=!0)})),e)return NaN;if(t)s.unshift(...a,".");else{o[0]=i;for(let e=0;e<o.length;++e)s[e]=o[e]}for(let e=0;e<s.length;++e)s[e]||(s[e]="0");r=n+s.reverse().join("")}return t?r:Number.isSafeInteger(parseInt(r))?parseFloat(r):r}const a=["０零○〇洞","１一壹ㄧ弌么","２二貳贰弍兩两","３三參叁弎参叄","４四肆䦉刀","５五伍","６六陸陆","７七柒拐","８八捌杯","９九玖勾"].map((e=>new RegExp(`[${e}]`,"g")));function i(e,t){[e,t]=[e,t].map((e=>e.split(".")));for(let n in e){if(void 0===t[n])return 1;const r=parseInt(e[n],10),s=parseInt(t[n],10);if(r>s)return 1;if(r<s)return-1}return e.length<t.length?-1:0}function c(e,t,n="\r\n"){return e.reduce(((e,r)=>e+t.map((e=>u(r[e]))).join(",")+n),t.map(u).join(",")+n)}function u(e){return/[\x0a\x0d\x22\x2c]/.test(e)?`"${e=e.replaceAll('"','""')}"`:e}function f(e,t=!0){let n=0,r=0,s=[];const o=[];e+="\n";for(let t=0;t<e.length;++t){const a=e.charAt(t);if('"'===a&&++n,!(n%2)&&["\n","\r",","].includes(a)){let n=e.substring(r,t);n.startsWith('"')&&(n=n.slice(1,-1)),n=n.replaceAll('""','"'),r=t+1,","===a?s.push(n):s.length&&(s.push(n),o.push(s),s=[])}}if(!t)return o;const a=o.shift();return o.map((e=>a.reduce(((t,n,r)=>Object.assign(t,{[n]:e[r]})),{})))}Object.assign(r.Z,{camelize:s,parseChineseNumber:o,compareVersionNumbers:i,toCSV:c,parseCSV:f});const l=r.Z},688:(e,t,n)=>{n.d(t,{$p:()=>f,E1:()=>a,KT:()=>u,ZP:()=>l,ZV:()=>i,s8:()=>c});var r=n(292),s=n(432),o=n(324);async function a(...e){const t=await fetch(...e);if(t.ok)return t;throw new ReferenceError(t.statusText)}function i(...e){return a(...e).then((e=>e.json()))}function c(...e){return a(...e).then((e=>e.text()))}function u(...e){return c(...e).then((e=>(0,o.rg)(e,0)))}function f(...e){return c(...e).then((e=>(0,s.bW)(e)))}Object.assign(r.Z,{fetchStrict:a,fetchJSON:i,fetchText:c,fetchDOM:u,fetchCSV:f});const l=r.Z}},t={};function n(r){var s=t[r];if(void 0!==s)return s.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var r={};(()=>{n.d(r,{$:()=>a.$,$$:()=>a.$$,$p:()=>f.$p,C9:()=>u.C9,D$:()=>e.D,Dc:()=>s.Dc,E1:()=>f.E1,EI:()=>a.EI,Ev:()=>i.Ev,Fr:()=>s.Fr,GA:()=>t.GA,He:()=>a.He,KT:()=>f.KT,Kh:()=>t.Kh,Kp:()=>t.Kp,L$:()=>o.L$,MJ:()=>u.MJ,Mo:()=>t.Mo,PB:()=>i.PB,Rh:()=>c.Rh,UR:()=>a.UR,Vl:()=>t.Vl,W1:()=>a.W1,W9:()=>t.W9,X_:()=>s.X_,Xh:()=>c.Xh,ZP:()=>d,ZV:()=>f.ZV,_A:()=>u._A,bU:()=>t.bU,bW:()=>u.bW,e$:()=>t.e$,iL:()=>t.iL,kg:()=>o.kg,mA:()=>i.mA,mg:()=>s.mg,oL:()=>i.oL,oP:()=>a.oP,oc:()=>c.oc,q7:()=>l,qd:()=>t.qd,rg:()=>a.rg,s8:()=>f.s8,uG:()=>u.uG,v$:()=>a.v$,wE:()=>t.wE,wt:()=>t.wt,yo:()=>t.yo});var e=n(292),t=n(71),s=n(986),o=n(101),a=n(324),i=n(707),c=n(701),u=n(432),f=n(688);const l=()=>{t.ZP.extendArrayPrototype(),a.ZP.extendElementPrototype(),i.ZP.extendEventTargetPrototype()};Object.assign(e.Z,t.ZP,s.ZP,a.ZP,o.ZP,i.ZP,c.ZP,u.ZP,f.ZP,{extendPrototype:l});const d=e.Z})();var s=r.$,o=r.$$,a=r.mg,i=r.L$,c=r._A,u=r.oP,f=r.C9,l=r.EI,d=r.ZP,p=r.UR,y=r.oc,h=r.iL,m=r.e$,g=r.He,b=r.PB,E=r.q7,A=r.$p,v=r.KT,w=r.ZV,P=r.E1,Z=r.s8,$=r.bU,T=r.Kp,L=r.Kh,x=r.Vl,j=r.W9,O=r.Mo,R=r.v$,I=r.W1,N=r.oL,S=r.kg,C=r.qd,F=r.GA,k=r.Xh,M=r.Rh,W=r.bW,V=r.uG,D=r.rg,_=r.Fr,K=r.wE,U=r.yo,q=r.wt,J=r.MJ,X=r.Ev,G=r.D$,H=r.Dc,B=r.X_,z=r.mA;export{s as $,o as $$,a as addTimeLimit,i as alerter,c as camelize,u as clearElement,f as compareVersionNumbers,l as createElementFromJsonML,d as default,p as downloadURL,y as emulateArray,h as everyAsync,m as extendArrayPrototype,g as extendElementPrototype,b as extendEventTargetPrototype,E as extendPrototype,A as fetchCSV,v as fetchDOM,w as fetchJSON,P as fetchStrict,Z as fetchText,$ as filterAsync,T as findAsync,L as findIndexAsync,x as findLastAsync,j as findLastIndexAsync,O as forEachAsync,R as getNodes,I as isEventInElement,N as listen,S as logger,C as mapAsync,F as mapToObject,k as objectReduce,M as objectReduceAsync,W as parseCSV,V as parseChineseNumber,D as parseHTML,_ as promisify,K as reduceAsync,U as reduceRightAsync,q as someAsync,J as toCSV,X as unlisten,G as use,H as wait,B as waitFor,z as waitForEvent};