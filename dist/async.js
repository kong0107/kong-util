(()=>{"use strict";const t=(t,...e)=>t.addEventListener(...e);function e(t,e,i=new Error("timeout")){let o;if(t instanceof Promise)o=e=>t.then(e);else{if(!(t instanceof Function)){if("string"==typeof t)return n(...arguments);const{type:o,target:r,...s}=t;return n(o,r,s,e,i)}o=e=>t(e)}return new Promise(((t,n)=>{o(t),e>0&&setTimeout(n,e,i)}))}function n(e,n,i,o,r=new Error("timeout")){let s;return typeof i!==object&&(i={capture:!!i}),i=Object.assign({},i,{once:!0}),o>0&&!(i.signal instanceof AbortSignal)&&(s=new AbortController,i.signal=s.signal),new Promise(((u,c)=>{t(n,e,u,i),o>0&&setTimeout((()=>{c(r),s&&s.abort(r)}),o)}))}const i={promisify:function(t,e=!1){return(...n)=>new Promise(((i,o)=>t(...n,((t,...n)=>{if(t)return o(t);i(e?n:n[0])}))))},listen:t,wait:function(t){return new Promise((e=>setTimeout(e,t)))},waitFor:e,waitForEvent:n,addTimeLimit:function(t,n,i){return function(...o){return e(t(...o),n,i)}}};"object"==typeof window&&window===globalThis&&Object.assign(window,i)})();