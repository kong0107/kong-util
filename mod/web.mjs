var e={991:e=>{const t=function(){const e=["0０零○〇洞","1１一壹ㄧ弌么","2２二貳贰弍兩两","3３三參叁弎参叄","4４四肆䦉刀","5５五伍","6６六陸陆","7７七柒拐","8８八捌杯","9９九玖勾"],t=["十拾什呀","百佰","千仟"],n=["萬万","億亿","兆","京經经","垓","秭杼","穰壤","溝沟","澗涧","正","載","極"],r=new RegExp("^["+e.join("")+"]+$"),s=new RegExp("(^|[^"+e.slice(1).join("")+"])["+t[0]+"]","g");return o=>{o=o.toString().replace(/\s+/g,"").replace(s,"$1一十");let i,c=0,a=0,f=0,l=1;if("負负".includes(o.charAt(0))&&(l=-1),"正負负".includes(o.charAt(0))&&(o=o.substring(1)),r.test(o)){for(let t of o)c=10*c+e.findIndex((e=>e.includes(t)));return c}for(let r of o)if(i=e.findIndex((e=>e.includes(r))),-1===i)if(i=t.findIndex((e=>e.includes(r))),-1===i){if(i=n.findIndex((e=>e.includes(r))),-1===i)return NaN;a+=f,i<=2?c+=a*10**(4*(i+1)):c=BigInt(c)+BigInt(a)*10n**(4n*(BigInt(i)+1n)),a=f=0}else a+=f*10**(i+1),f=0;else f=10*f+i;return"bigint"!=typeof c?(c+=a+f,-1===l&&(c*=-1)):(c+=BigInt(a+f),-1===l&&(c*=-1n)),c}}();e.exports=t},65:(e,t,n)=>{n.d(t,{D:()=>s,Z:()=>o});const r={},s=function(...e){e[0]instanceof Array&&(e=e[0]);for(let t in this)"use"!==t&&(e.length&&!e.includes(t)||(globalThis[t]=this[t]))}.bind(r);Object.assign(r,{use:s});const o=r},324:(e,t,n)=>{n.d(t,{rg:()=>a});var r=n(65),s=n(432);function o(e,t=document){if(t?.querySelector||(t=document),"string"==typeof e)return t.querySelector(e);if(e instanceof Array)return e.map((e=>o(e,t)));const n={};for(let r in e)n[r]=o(e[r],t);return n}function i(e,t=document){if(t?.querySelectorAll||(t=document),"string"==typeof e)return[...t.querySelectorAll(e)];if(e instanceof Array)return e.map((e=>i(e,t)));const n={};for(let r in e)n[r]=i(e[r],t);return n}let c;function a(e,t="body > *"){if("undefined"==typeof DOMParser)throw ReferenceError("DOMParser is not defined");c||(c=new DOMParser);const n=c.parseFromString(e,"text/html");return"string"==typeof t?o(t,n):n}function f(e,t){if("function"==typeof e)return e;if("string"==typeof e){const n=i(e,t);return e=>n.includes(e)}if(e instanceof Array)return e=e.map((e=>e.toUpperCase())),t=>e.includes(t.tagName);throw new TypeError("selector shall be a function, a CSS selector string, or an array of strings representing HTML tags.")}function l(e=this){let t;for(;t=e.lastChild;)e.removeChild(t)}function u(e,t=this){const{clientX:n,clientY:r}=e;return[...t.getClientRects()].some((e=>n>=e.left&&n<=e.right&&r>=e.top&&r<=e.bottom))}Object.assign(r.Z,{$:o,$$:i,parseHTML:a,getNodes:function(e=(()=>!0),t=(()=>!1),n=document){if("function"!=typeof e&&"function"!=typeof t)return e instanceof Array&&(e=e.join(",")),t instanceof Array&&(t=t.join(",")),i(e,n).filter((e=>!i(t,n).includes(e)));e=f(e,n),t=f(t,n);const r={acceptNode:n=>t(n)?NodeFilter.FILTER_REJECT:e(n)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP},s=document.createTreeWalker(n,NodeFilter.SHOW_ALL,r);let o,c=[];for(;o=s.nextNode();)c.push(o);return c},createElementFromJsonML:function e(t){if("string"==typeof t)return document.createTextNode(t);if(t instanceof Node)return t.cloneNode(!0);let[n,r,...o]=t;("string"==typeof t[1]||t[1]instanceof Array)&&(r={},[n,...o]=t);const i=document.createElement(n);for(let e in r){const t=r[e];if(e=e.toLowerCase(),e.startsWith("on"))listen(i,e.substring(2),t);else switch(e){case"class":case"classname":i.className=t;break;case"css":case"style":if("string"==typeof t)i.style.cssText=t;else for(let e in t)i.style[(0,s._A)(e)]=t[e];break;case"data":case"dataset":for(let e in t)i.dataset[(0,s._A)(e)]=t[e];break;default:i.setAttribute(e,r[e])}}return i.append(...o.map(e)),i},clearElement:l,isEventInElement:u,extendElementPrototype:()=>Object.assign(Element.prototype,{clear:l,hasEventIn:u})})},432:(e,t,n)=>{n.d(t,{_A:()=>o,bW:()=>c});var r=n(65),s=n(991);function o(e){return e.replace(/-([a-z]\w+)/g,(e=>e[1].toUpperCase()+e.slice(2)))}function i(e){return/[\x0a\x0d\x22\x2c]/.test(e)?`"${e=e.replaceAll('"','""')}"`:e}function c(e,t=!0){let n=0,r=0,s=[];const o=[];e+="\n";for(let t=0;t<e.length;++t){const i=e.charAt(t);if('"'===i&&++n,!(n%2)&&["\n","\r",","].includes(i)){let n=e.substring(r,t);n.startsWith('"')&&(n=n.slice(1,-1)),n=n.replaceAll('""','"'),r=t+1,","===i?s.push(n):s.length&&(s.push(n),o.push(s),s=[])}}if(!t)return o;const i=o.shift();return o.map((e=>i.reduce(((t,n,r)=>Object.assign(t,{[n]:e[r]})),{})))}Object.assign(r.Z,{camelize:o,parseChineseNumber:function(e){const t=e.split(/[點点奌]/g);if(t.length>2)throw new TypeError("Not a numeric string",e);let n=t[0].length?s(t[0]):0;if(2===t.length){if("bigint"==typeof n){let e=Number(n);if(n!==BigInt(e))throw new RangeError("exceeds supported range");n=e}let e=0;for(let n=0;n<t[1].length;++n)e+=s(t[1].charAt(n))*10**(-n-1);n>=0?n+=e:n-=e}return n},compareVersionNumbers:function(e,t){[e,t]=[e,t].map((e=>e.split(".")));for(let n in e){if(void 0===t[n])return 1;const r=parseInt(e[n],10),s=parseInt(t[n],10);if(r>s)return 1;if(r<s)return-1}return e.length<t.length?-1:0},toCSV:function(e,t,n="\r\n"){return e.reduce(((e,r)=>e+t.map((e=>i(r[e]))).join(",")+n),t.map(i).join(",")+n)},parseCSV:c})}},t={};function n(r){var s=t[r];if(void 0!==s)return s.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var r={};(()=>{n.d(r,{$p:()=>f,D$:()=>e.D,E1:()=>o,KT:()=>a,ZP:()=>l,ZV:()=>i,s8:()=>c});var e=n(65),t=n(324),s=n(432);async function o(...e){const t=await fetch(...e);if(t.ok)return t;throw new ReferenceError(t.statusText)}function i(...e){return o(...e).then((e=>e.json()))}function c(...e){return o(...e).then((e=>e.text()))}function a(...e){return c(...e).then((e=>(0,t.rg)(e,0)))}function f(...e){return c(...e).then((e=>(0,s.bW)(e)))}Object.assign(e.Z,{fetchStrict:o,fetchJSON:i,fetchText:c,fetchDOM:a,fetchCSV:f});const l=e.Z})();var s=r.ZP,o=r.$p,i=r.KT,c=r.ZV,a=r.E1,f=r.s8,l=r.D$;export{s as default,o as fetchCSV,i as fetchDOM,c as fetchJSON,a as fetchStrict,f as fetchText,l as use};