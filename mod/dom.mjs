var e={991:e=>{const t=function(){const e=["0０零○〇洞","1１一壹ㄧ弌么","2２二貳贰弍兩两","3３三參叁弎参叄","4４四肆䦉刀","5５五伍","6６六陸陆","7７七柒拐","8８八捌杯","9９九玖勾"],t=["十拾什呀","百佰","千仟"],n=["萬万","億亿","兆","京經经","垓","秭杼","穰壤","溝沟","澗涧","正","載","極"],r=new RegExp("^["+e.join("")+"]+$"),s=new RegExp("(^|[^"+e.slice(1).join("")+"])["+t[0]+"]","g");return o=>{o=o.toString().replace(/\s+/g,"").replace(s,"$1一十");let i,c=0,a=0,l=0,f=1;if("負负".includes(o.charAt(0))&&(f=-1),"正負负".includes(o.charAt(0))&&(o=o.substring(1)),r.test(o)){for(let t of o)c=10*c+e.findIndex((e=>e.includes(t)));return c}for(let r of o)if(i=e.findIndex((e=>e.includes(r))),-1===i)if(i=t.findIndex((e=>e.includes(r))),-1===i){if(i=n.findIndex((e=>e.includes(r))),-1===i)return NaN;a+=l,i<=2?c+=a*10**(4*(i+1)):c=BigInt(c)+BigInt(a)*10n**(4n*(BigInt(i)+1n)),a=l=0}else a+=l*10**(i+1),l=0;else l=10*l+i;return"bigint"!=typeof c?(c+=a+l,-1===f&&(c*=-1)):(c+=BigInt(a+l),-1===f&&(c*=-1n)),c}}();e.exports=t},65:(e,t,n)=>{n.d(t,{D:()=>s,Z:()=>o});const r={},s=function(...e){e[0]instanceof Array&&(e=e[0]);for(let t in this)"use"!==t&&(e.length&&!e.includes(t)||(globalThis[t]=this[t]))}.bind(r);Object.assign(r,{use:s});const o=r},432:(e,t,n)=>{n.d(t,{_A:()=>o});var r=n(65),s=n(991);function o(e){return e.replace(/-([a-z]\w+)/g,(e=>e[1].toUpperCase()+e.slice(2)))}function i(e){return/[\x0a\x0d\x22\x2c]/.test(e)?`"${e=e.replaceAll('"','""')}"`:e}Object.assign(r.Z,{camelize:o,parseChineseNumber:function(e){const t=e.split(/[點点奌]/g);if(t.length>2)throw new TypeError("Not a numeric string",e);let n=t[0].length?s(t[0]):0;if(2===t.length){if("bigint"==typeof n){let e=Number(n);if(n!==BigInt(e))throw new RangeError("exceeds supported range");n=e}let e=0;for(let n=0;n<t[1].length;++n)e+=s(t[1].charAt(n))*10**(-n-1);n>=0?n+=e:n-=e}return n},compareVersionNumbers:function(e,t){[e,t]=[e,t].map((e=>e.split(".")));for(let n in e){if(void 0===t[n])return 1;const r=parseInt(e[n],10),s=parseInt(t[n],10);if(r>s)return 1;if(r<s)return-1}return e.length<t.length?-1:0},toCSV:function(e,t,n="\r\n"){return e.reduce(((e,r)=>e+t.map((e=>i(r[e]))).join(",")+n),t.map(i).join(",")+n)},parseCSV:function(e,t=!0){let n=0,r=0,s=[];const o=[];e+="\n";for(let t=0;t<e.length;++t){const i=e.charAt(t);if('"'===i&&++n,!(n%2)&&["\n","\r",","].includes(i)){let n=e.substring(r,t);n.startsWith('"')&&(n=n.slice(1,-1)),n=n.replaceAll('""','"'),r=t+1,","===i?s.push(n):s.length&&(s.push(n),o.push(s),s=[])}}if(!t)return o;const i=o.shift();return o.map((e=>i.reduce(((t,n,r)=>Object.assign(t,{[n]:e[r]})),{})))}})}},t={};function n(r){var s=t[r];if(void 0!==s)return s.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var r={};(()=>{n.d(r,{$:()=>s,$$:()=>o,D$:()=>e.D,EI:()=>f,He:()=>d,W1:()=>p,ZP:()=>g,oP:()=>u,rg:()=>c,v$:()=>a});var e=n(65),t=n(432);function s(e,t=document){if(t?.querySelector||(t=document),"string"==typeof e)return t.querySelector(e);if(e instanceof Array)return e.map((e=>s(e,t)));const n={};for(let r in e)n[r]=s(e[r],t);return n}function o(e,t=document){if(t?.querySelectorAll||(t=document),"string"==typeof e)return[...t.querySelectorAll(e)];if(e instanceof Array)return e.map((e=>o(e,t)));const n={};for(let r in e)n[r]=o(e[r],t);return n}let i;function c(e,t="body > *"){if("undefined"==typeof DOMParser)throw ReferenceError("DOMParser is not defined");i||(i=new DOMParser);const n=i.parseFromString(e,"text/html");return"string"==typeof t?s(t,n):n}function a(e=(()=>!0),t=(()=>!1),n=document){if("function"!=typeof e&&"function"!=typeof t)return e instanceof Array&&(e=e.join(",")),t instanceof Array&&(t=t.join(",")),o(e,n).filter((e=>!o(t,n).includes(e)));e=l(e,n),t=l(t,n);const r={acceptNode:n=>t(n)?NodeFilter.FILTER_REJECT:e(n)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP},s=document.createTreeWalker(n,NodeFilter.SHOW_ALL,r);let i,c=[];for(;i=s.nextNode();)c.push(i);return c}function l(e,t){if("function"==typeof e)return e;if("string"==typeof e){const n=o(e,t);return e=>n.includes(e)}if(e instanceof Array)return e=e.map((e=>e.toUpperCase())),t=>e.includes(t.tagName);throw new TypeError("selector shall be a function, a CSS selector string, or an array of strings representing HTML tags.")}function f(e,n){if("object"!=typeof e)return document.createTextNode(e);if(e instanceof Node)return e.cloneNode(!0);let[r,s,...o]=e;("object"!=typeof e[1]||e[1]instanceof Array)&&(s={},[r,...o]=e),"svg"===r&&(n="http://www.w3.org/2000/svg");const i=s.namespace??n,c=i?document.createElementNS(i,r):document.createElement(r);for(let e in s){const n=s[e];if(e.startsWith("on"))listen(c,e.substring(2).toLowerCase(),n);else switch(e){case"class":case"className":{const e="string"==typeof n?n.trim().split(/\s+/):n;c.classList.add(...e);break}case"css":case"style":if("string"==typeof n)c.style.cssText=n;else for(let e in n)c.style[(0,t._A)(e)]=n[e];break;case"data":case"dataset":for(let e in n)c.dataset[(0,t._A)(e)]=n[e];break;case"namespace":break;default:c.setAttribute(e,n)}}return c.append(...o.map((e=>f(e,i)))),c}function u(e=this){let t;for(;t=e.lastChild;)e.removeChild(t)}function p(e,t=this){const{clientX:n,clientY:r}=e;return[...t.getClientRects()].some((e=>n>=e.left&&n<=e.right&&r>=e.top&&r<=e.bottom))}const d=()=>Object.assign(Element.prototype,{clear:u,hasEventIn:p});Object.assign(e.Z,{$:s,$$:o,parseHTML:c,getNodes:a,createElementFromJsonML:f,clearElement:u,isEventInElement:p,extendElementPrototype:d});const g=e.Z})();var s=r.$,o=r.$$,i=r.oP,c=r.EI,a=r.ZP,l=r.He,f=r.v$,u=r.W1,p=r.rg,d=r.D$;export{s as $,o as $$,i as clearElement,c as createElementFromJsonML,a as default,l as extendElementPrototype,f as getNodes,u as isEventInElement,p as parseHTML,d as use};