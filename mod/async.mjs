var t={292:(t,e,n)=>{n.d(e,{Z:()=>i,D:()=>o});const r={version:"0.7.6"},o=function(...t){t[0]instanceof Array&&(t=t[0]);for(let e in this)"use"!==e&&(t.length&&!t.includes(e)||(globalThis[e]=this[e]))}.bind(r);Object.assign(r,{use:o});const i=r},707:(t,e,n)=>{n.d(e,{mA:()=>s});var r=n(292);function o(t,...e){"string"==typeof t&&(t=document.querySelector(t)),t.addEventListener(...e)}function i(t,...e){"string"==typeof t&&(t=document.querySelector(t)),t.removeEventListener(...e)}function s(t,e,n){let r;switch(typeof n){case"undefined":r=0,n={};break;case"number":r=n,n={};break;case"string":r=parseInt(n),n={};break;case"boolean":r=0,n={capture:n};break;case"object":r=n.timeout;break;default:throw TypeError("unknown `option` format")}return n.once=!0,new Promise(((s,a)=>{const c=t=>{n.preventDefault&&t.preventDefault(),n.stopPropagation&&t.stopPropagation(),n.stopImmediatePropagation&&t.stopImmediatePropagation(),s()};o(t,e,c,n),r>0&&setTimeout((()=>{i(t,c,n);const e=new Event("abort");t.dispatchEvent(e),a(e)}),r)}))}Object.assign(r.Z,{listen:o,unlisten:i,listens:function(t,e,n,r){"string"==typeof t&&(t=document.querySelectorAll(t)),"string"==typeof e&&(e=e.split(",").map((t=>t.trim()))),"function"==typeof n&&(n=[n]),t.forEach((t=>{e.forEach((e=>{n.forEach((n=>{t.addEventListener(e,n,r)}))}))}))},unlistens:function(t,e,n,r){"string"==typeof t&&(t=document.querySelectorAll(t)),"string"==typeof e&&(e=e.split(",").map((t=>t.trim()))),"function"==typeof n&&(n=[n]),t.forEach((t=>{e.forEach((e=>{n.forEach((n=>{t.removeEventListener(e,n,r)}))}))}))},waitForEvent:s,extendEventTargetPrototype:()=>Object.assign(EventTarget.prototype,{listen:EventTarget.prototype.addEventListener,unlisten:EventTarget.prototype.removeEventListener,waitFor:function(...t){return s(this,...t)}})})}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={exports:{}};return t[r](i,i.exports,n),i.exports}n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var r={};(()=>{n.d(r,{D$:()=>t.D,Dc:()=>i,Fr:()=>o,X_:()=>s,ZP:()=>c,mg:()=>a});var t=n(292),e=n(707);function o(t,e=!1){return(...n)=>new Promise(((r,o)=>t(...n,((t,...n)=>{if(t)return o(t);r(e?n:n[0])}))))}function i(t,e){return new Promise((n=>setTimeout(n,t,e)))}function s(t,n){let r;if(t instanceof Promise)r=e=>t.then(e);else{if(!(t instanceof Function)){if(t instanceof EventTarget)return(0,e.mA)(...arguments);const{target:r,type:o,...i}=t;return i.timeout=n,(0,e.mA)(r,o,i)}r=e=>t(e)}if(r)return new Promise(((t,e)=>{setTimeout(r,0,t),n>0&&setTimeout(e,n,new Event("abort"))}))}function a(t,e){return function(...n){return s(t(...n),e)}}Object.assign(t.Z,{promisify:o,wait:i,waitFor:s,addTimeLimit:a});const c=t.Z})();var o=r.mg,i=r.ZP,s=r.Fr,a=r.D$,c=r.Dc,u=r.X_;export{o as addTimeLimit,i as default,s as promisify,a as use,c as wait,u as waitFor};