var De=Object.defineProperty;var Fe=(t,e,n)=>e in t?De(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var v=(t,e,n)=>(Fe(t,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();var O=(t=>(t.black="black",t.red="red",t))(O||{});const b=["black","black-king","red","red-king","empty"],ie=[[-1],[-1,1],[1],[-1,1]],Pe=ie.map(t=>t.map(e=>e*2)),k=[O.black,O.red],f=b.length-1,ke=O.red;class g{constructor(e,n,r=f){v(this,"indices");v(this,"value");this.indices={row:e,column:n},this.value=r}static updateFactory(e,n,...r){const o=[];return o.push(new g(e.finalRow,e.finalColumn,n)),r.forEach(({indices:s})=>o.push(new g(s.row,s.column))),o}}function ce(t){for(let e=0;e<8;e++)for(let n=0;n<8;n++)t(e,n)}const L=b.map((t,e)=>e!==f?b[e].split("-")[0]:void 0);function xe(t){return["b","B","r","R","-"].reduce((e,n,r)=>e.replaceAll(n,String(r)),t)}function ae(t){return t===k[0]?k[1]:k[0]}const N={turn:O.black,grid:`
-r-r-r-r
r-r-r-r-
-r-r-r-r
--------
--------
b-b-b-b-
-b-b-b-b
b-b-b-b-
`.trim().split(`
`).filter(Boolean).join(`
`)},Re=t=>{const e=xe(t).trim().split(`
`).map(r=>r.trim());return Array.from({length:8},()=>Array.from({length:8})).map((r,o)=>r.map((s,i)=>Number(e[o].charAt(i))))};function Ge(t,{finalRow:e,finalColumn:n,startRow:r,startColumn:o}){const i=W(t,{startRow:r,startColumn:o}).find(({finalCell:a})=>a.row===e&&a.column===n);if(i==null)return[];const{updates:c}=i;return(e===7||e===0)&&c.length>0&&c.push(new g(e,n,b.indexOf(`${L[t.grid[r][o]]}-king`))),c}function W({grid:t,turn:e},{startRow:n,startColumn:r}){const o=t[n][r];return o===f||L[o]!==e?[]:Ue(t,L[t[n][r]])?I(t,n,r):de(t,n,r)}function Ue(t,e){return R(t,e).some(({row:n,column:r})=>I(t,n,r).length>0)}function I(t,e,n){const r=[2,-2],o=[],s=t[e][n];if(s===f)return o;for(const i of Pe[s])for(const c of r){const a=e+i,u=n+c;if(le(a)||ue(u))continue;const E=t[a][u],d=e+(Math.abs(i)-1)*Math.sign(i),$=n+(Math.abs(c)-1)*Math.sign(c),z=t[d][$];E===f&&L[z]===ae(L[s])&&o.push({finalCell:{row:a,column:u},updates:g.updateFactory({finalRow:a,finalColumn:u},s,new g(d,$),new g(e,n))})}return o}function R(t,e){const n=[];return ce((r,o)=>{L[t[r][o]]===e&&n.push({row:r,column:o})}),n}function Ne(t,e){return!R(t,e).some(({row:n,column:r})=>I(t,n,r).length>0||de(t,n,r).length>0)}const Ie=t=>t.map(e=>e.map(n=>n));function le(...t){return t.some(e=>e>=8||e<0)}function ue(...t){return t.some(e=>e>=8||e<0)}function de(t,e,n){const r=[1,-1],o=[],s=t[e][n];if(s===f)return o;for(const i of ie[s])for(const c of r){const a=e+i,u=n+c;if(le(a)||ue(u))continue;t[a][u]===f&&o.push({finalCell:{row:a,column:u},updates:g.updateFactory({finalRow:a,finalColumn:u},s,new g(e,n))})}return o}class C{constructor(e,n,{flaggedCell:r}={}){v(this,"grid");v(this,"turn");v(this,"flaggedCell");v(this,"piecesThatCanMove");this.grid=e,this.turn=n,this.flaggedCell=r,this.piecesThatCanMove=this.getPiecesThatCanMove()}updatedGrid(e){const n=C.computeGrid(this.grid,e);return new C(n,this.turn)}updateFlaggedCell(e){return new C(this.grid,this.turn,{flaggedCell:e})}updateCurrentTurn(){const e=this.grid;return new C(e,ae(this.turn))}getAllLegalMovesForColor(){return R(this.grid,this.turn).map(e=>[e,W(this,{startRow:e.row,startColumn:e.column})])}getPiecesThatCanMove(){return(this.flaggedCell!=null?[this.flaggedCell]:R(this.grid,this.turn)).filter(({row:e,column:n})=>this.getLegalTargets(e,n).length)}getLegalTargets(e,n){return W(this,{startRow:e,startColumn:n}).map(({finalCell:r})=>r)}static computeGrid(e,n){const r=Ie(e);return n.forEach(({indices:{row:o,column:s},value:i})=>{r[o][s]=i}),r}serialize(){const e=["b","B","r","R","-"];return{grid:this.grid.map(n=>n.map(r=>e[r]).join("")).join(`
`),turn:this.turn}}static deserialize(e){return new C(e.grid,e.turn,{flaggedCell:e.flaggedCell})}}const K="state",_="grid",Q="turn",{pathname:ge,href:Be}=window.location,ze=()=>{try{const t=localStorage.getItem(K);if(!t)throw new Error("State Not Found");return JSON.parse(t)}catch{}},Ye=()=>{const t=new URLSearchParams(window.location.search),e=t.get(_),n=t.get(Q);return e?{grid:e,turn:n}:void 0},fe=()=>(window.location.search?Ye():ze())||N,Xe=({grid:t,turn:e}=N)=>{const n=new URLSearchParams;n.set(_,t),n.set(Q,e),history.pushState(null,"",`${ge}?${n.toString()}`),localStorage.setItem(K,JSON.stringify({grid:t,turn:e}))},je=()=>{history.pushState(null,"",ge),localStorage.removeItem(K)};function We(){const t=new URLSearchParams,{grid:e,turn:n}=fe();return t.set(_,e),t.set(Q,n),`${Be.split("?")[0]}?${t.toString()}`}const He={fetch:fe,persist:Xe,reset:je,compileSharingUrl:We},{fetch:Ve,persist:qe,reset:Je,compileSharingUrl:Ke}=He,y={get serialized(){return Ve()},set serialized({grid:t,turn:e}){qe({grid:t,turn:e})},reset:Je,get share(){return Ke()}};let T=[y.serialized],w=0;const S={resetStack:()=>{T=[N],w=0},add:t=>{T[++w]=t,T.splice(w+1)},dec:()=>T[--w],inc:()=>T[++w],get isEmpty(){return w===0},get isEnd(){return w===T.length-1}},h=t=>{const e=document.getElementById(t);if(e==null)throw new Error(`${t} element does not exist`);return e},D=h("table"),_e=h("turnDiv"),P=h("trailingDiv"),X=h("containerBoard"),Qe=h("reset"),Ze=h("share"),H=h("undo"),V=h("redo"),et=h("ai"),B=t=>(e,n)=>{e.addEventListener(t,n)},A=B("click"),tt=B("mousedown"),nt=B("mouseover"),rt=B("touchstart"),ot="legal-target",he="can-move",Z=b.map((t,e)=>`piece-${b[e]}`),st=Z[f],it=Object.fromEntries(k.map(t=>[t,`piece-${t}`])),pe=(t,e)=>D.rows[t].cells[e],oe=t=>{const e=new Set(t.map(({row:n,column:r})=>`${n},${r}`));return(n,r)=>e.has(`${n},${r}`)};let G=!1;const me=t=>{ce((e,n)=>{t(e,n,pe(e,n))})},ct=(t,e,n,r)=>{_e.className=it[e],H.disabled=S.isEmpty,V.disabled=S.isEnd;const o=oe(n),s=oe(r);me((i,c,a)=>{const u=t[i][c];let d=`${Z[u]} `;o(i,c)&&(d+=`${ot} `),!G&&s(i,c)&&(d+=he),a.className!==d&&(a.className=d)})},at=t=>{tt(D,n=>{e(n,{moveEvent:"mousemove",endEvent:"mouseup",coordsExtractor:r=>r})}),rt(D,n=>{e(n,{moveEvent:"touchmove",endEvent:"touchend",coordsExtractor:r=>r.changedTouches[0]})});function e(n,{moveEvent:r,endEvent:o,coordsExtractor:s}){const{clientX:i,clientY:c}=s(n),{row:a,column:u}=se({clientX:i,clientY:c}),E=new Set(Array.from(pe(a,u).classList)),d=E.has.bind(E);if(!d(he)||d(st))return;G=!0,X.addEventListener(r,re),X.addEventListener(o,Oe,{once:!0});const $=Z.find(d);typeof $=="string"&&(P.className=$);const{width:z,height:Te}=P.getBoundingClientRect();t.updateUI(a,u);const te=(p,m)=>{P.style.transform=`translateX(${p}px) translateY(${m}px)`},{x:Le,y:Se}=Ce({clientX:i,clientY:c}),$e=Le%z,Ae=Se%Te,ne=({clientX:p,clientY:m})=>{te(p-$e,m-Ae)};ne({clientX:i,clientY:c});function re(p){const{clientX:m,clientY:Y}=s(p);ne({clientX:m,clientY:Y})}function Oe(p){X.removeEventListener(r,re),P.style.backgroundImage="",te(-1e3,-1e3),G=!1;const{row:m,column:Y}=se(s(p));t.handleMove(m,Y,a,u)}}};let{left:ve,top:we,width:q,height:J}=D.getBoundingClientRect();window.onresize=()=>({left:ve,top:we,width:q,height:J}=D.getBoundingClientRect());function Ce({clientX:t,clientY:e}){const n=ve+window.pageXOffset,r=we+window.pageYOffset,o=t-n,s=e-r;return{x:o,y:s}}function se({clientX:t,clientY:e}){const{x:n,y:r}=Ce({clientX:t,clientY:e});return n>q||r>J?{row:-1,column:-1}:{row:Math.floor(r/J*8),column:Math.floor(n/q*8)}}const M={updateDOM({grid:t,turn:e,legalTargets:n,piecesThatCanMove:r}){ct(t,e,n,r)},registerShare:t=>{A(Ze,t)},registerUndo:(t,e)=>{A(H,t),A(V,e),window.addEventListener("keydown",({key:n})=>{n==="ArrowLeft"&&!H.disabled&&t(),n==="ArrowRight"&&!V.disabled&&e()})},registerReset:t=>{A(Qe,t)},registerHover(t){me((e,n,r)=>{nt(r,()=>{G||t(e,n)})})},registerDrag(t){at(t)},registerAi(t){A(et,t)}};function be(t,e=2e3){const n=document.createElement("div");n.classList.add("toast"),n.innerText=t,document.body.appendChild(n),setTimeout(()=>{document.body.removeChild(n)},e)}function lt(){return new Worker(""+new URL("worker-cff9495c.js",import.meta.url).href)}const ye=window.navigator.hardwareConcurrency+2,ut=Array.from({length:ye}).map(()=>new lt);let j=0;const dt=()=>{const t=ut[j];return j=(j+1)%ye,t},gt=t=>new Promise(e=>{const n=dt(),r=String(t.grid);n.addEventListener("message",o),n.postMessage(t);function o({data:{score:s,stringGrid:i}}){r===i&&(e(s),n.removeEventListener("message",o))}}),ft={score:0,move:{finalColumn:0,finalRow:0,startColumn:0,startRow:0}};async function ht(t){return(await Promise.all(t.getAllLegalMovesForColor().flatMap(([{row:n,column:r},o])=>o.map(({updates:s,finalCell:{row:i,column:c}})=>gt(t.updatedGrid(s).updateCurrentTurn()).then(a=>({move:{startRow:n,startColumn:r,finalRow:i,finalColumn:c},score:a})))))).reduce((n,r)=>r.score>=n.score?r:n,ft).move}const Me=(t,e)=>{t.turn===ke&&setTimeout(()=>{const n=performance.now();ht(t).then(({finalRow:r,finalColumn:o,startRow:s,startColumn:i})=>{const c=performance.now()-n;console.log(`Time elapsed: ${c}ms`);const a=Math.max(200-c,0);setTimeout(()=>{e(r,o,s,i)},a)}).catch(console.error)},50)};let x=!0;function ee(t,e,n,r){if(l.grid[t][e]!==f||t===-1&&e===-1){F(l);return}const s=Ge(l,{finalRow:t,finalColumn:e,startRow:n,startColumn:r});if(s.length>0){const c=l.updatedGrid(s),a=s.length===3&&b[s[s.length-1].value].split("-")[1]!=="king"||s.length===4,u=I(c.grid,t,e).length!==0;l=a&&u?c.updateFlaggedCell({row:t,column:e}):c.updateFlaggedCell().updateCurrentTurn(),Ne(l.grid,l.turn)&&(be(`${l.turn} lost! :(`,5e3),Ee())}F(l);const i=l.serialize();y.serialized=i,S.add(i),x&&Me(l,ee)}function U({grid:t,turn:e}){const n=Re(t);return F(new C(n,e))}let l=U(y.serialized);function Ee(){S.resetStack(),y.reset(),l=U(N)}function F(t,e=[]){return M.updateDOM({grid:t.grid,turn:t.turn,legalTargets:e,piecesThatCanMove:t.piecesThatCanMove}),t}M.registerDrag({handleMove:ee,updateUI:(t,e)=>{F(l.updatedGrid([new g(t,e,f)]),l.getLegalTargets(t,e))}});M.registerShare(()=>{navigator.clipboard.writeText(y.share).then(()=>{be("URL with game-state copied to clipboard! 🎆🎆🎆")}).catch(console.error)});M.registerReset(Ee);M.registerHover((t,e)=>F(l,l.getLegalTargets(t,e)));M.registerUndo(()=>{l=U(S.dec()),y.serialized=l.serialize()},()=>{l=U(S.inc()),y.serialized=l.serialize()});M.registerAi(()=>{x=!x,x&&Me(l,ee)});
//# sourceMappingURL=index-d8409aea.js.map
