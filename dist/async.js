var kongUtilAsync;(()=>{"use strict";var e={65:(e,t,n)=>{n.d(t,{D:()=>o,Z:()=>i});const r={},o=function(...e){e[0]instanceof Array&&(e=e[0]);for(let t in this)"use"!==t&&(e.length&&!e.includes(t)||(globalThis[t]=this[t]))}.bind(r);Object.assign(r,{use:o});const i=r},707:(e,t,n)=>{n.d(t,{waitForEvent:()=>i});var r=n(65);function o(e,...t){e.addEventListener(...t)}function i(e,t,n){let r;switch(typeof n){case"undefined":r=0,n={};break;case"number":r=n,n={};break;case"string":r=parseInt(n),n={};break;case"boolean":r=0,n={capture:n};break;case"object":r=n.timeout;break;default:throw TypeError()}return n.once=!0,new Promise(((i,a)=>{const s=e=>{n.preventDefault&&e.preventDefault(),n.stopPropagation&&e.stopPropagation(),n.stopImmediatePropagation&&e.stopImmediatePropagation(),i()};o(e,t,s,n),r>0&&setTimeout((()=>{!function(e,...t){e.removeEventListener(...t)}(e,s,n);const t=new Event("abort");e.dispatchEvent(t),a(t)}),r)}))}Object.assign(r.Z,{listen:o,waitForEvent:i,extendEventTargetPrototype:()=>Object.assign(EventTarget.prototype,{listen:EventTarget.prototype.addEventListener,unlisten:EventTarget.prototype.removeEventListener,waitFor:function(...e){return i(this,...e)}})})}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{n.r(r),n.d(r,{addTimeLimit:()=>s,default:()=>u,promisify:()=>o,use:()=>e.D,wait:()=>i,waitFor:()=>a});var e=n(65),t=n(707);function o(e,t=!1){return(...n)=>new Promise(((r,o)=>e(...n,((e,...n)=>{if(e)return o(e);r(t?n:n[0])}))))}function i(e,t){return new Promise((n=>setTimeout(n,e,t)))}function a(e,n){let r;if(e instanceof Promise)r=t=>e.then(t);else{if(!(e instanceof Function)){if(e instanceof EventTarget)return(0,t.waitForEvent)(...arguments);const{target:r,type:o,...i}=e;return i.timeout=n,(0,t.waitForEvent)(r,o,i)}r=t=>e(t)}if(r)return new Promise(((e,t)=>{setTimeout(r,0,e),n>0&&setTimeout(t,n,new Event("abort"))}))}function s(e,t){return function(...n){return a(e(...n),t)}}Object.assign(e.Z,{promisify:o,wait:i,waitFor:a,addTimeLimit:s});const u=e.Z})(),kongUtilAsync=r})();