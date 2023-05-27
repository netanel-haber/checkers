var N=Object.defineProperty;var V=(c,a,g)=>a in c?N(c,a,{enumerable:!0,configurable:!0,writable:!0,value:g}):c[a]=g;var C=(c,a,g)=>(V(c,typeof a!="symbol"?a+"":a,g),g);(function(){"use strict";var c=(n=>(n.black="black",n.red="red",n))(c||{});const a=["black","black-king","red","red-king","empty"],g=[[-1],[-1,1],[1],[-1,1]],G=g.map(n=>n.map(e=>e*2)),m=[c.black,c.red],h=a.length-1;c.red;class d{constructor(e,t,o=h){C(this,"indices");C(this,"value");this.indices={row:e,column:t},this.value=o}static updateFactory(e,t,...o){const s=[];return s.push(new d(e.finalRow,e.finalColumn,t)),o.forEach(({indices:r})=>s.push(new d(r.row,r.column))),s}}function M(n){for(let e=0;e<8;e++)for(let t=0;t<8;t++)n(e,t)}const b=a.map((n,e)=>e!==h?a[e].split("-")[0]:void 0);function w(n){return n===m[0]?m[1]:m[0]}c.black,`
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
`);function y({grid:n,turn:e},{startRow:t,startColumn:o}){const s=n[t][o];return s===h||b[s]!==e?[]:x(n,b[n[t][o]])?E(n,t,o):O(n,t,o)}function x(n,e){return v(n,e).some(({row:t,column:o})=>E(n,t,o).length>0)}function E(n,e,t){const o=[2,-2],s=[],r=n[e][t];if(r===h)return s;for(const i of G[r])for(const l of o){const u=e+i,f=t+l;if(F(u)||L(f))continue;const T=n[u][f],k=e+(Math.abs(i)-1)*Math.sign(i),D=t+(Math.abs(l)-1)*Math.sign(l),H=n[k][D];T===h&&b[H]===w(b[r])&&s.push({finalCell:{row:u,column:f},updates:d.updateFactory({finalRow:u,finalColumn:f},r,new d(k,D),new d(e,t))})}return s}function v(n,e){const t=[];return M((o,s)=>{b[n[o][s]]===e&&t.push({row:o,column:s})}),t}const A=n=>n.map(e=>e.map(t=>t));function F(...n){return n.some(e=>e>=8||e<0)}function L(...n){return n.some(e=>e>=8||e<0)}function O(n,e,t){const o=[1,-1],s=[],r=n[e][t];if(r===h)return s;for(const i of g[r])for(const l of o){const u=e+i,f=t+l;if(F(u)||L(f))continue;n[u][f]===h&&s.push({finalCell:{row:u,column:f},updates:d.updateFactory({finalRow:u,finalColumn:f},r,new d(e,t))})}return s}class p{constructor({grid:e,turn:t,flaggedCell:o,lastMove:s}){C(this,"grid");C(this,"turn");C(this,"flaggedCell");C(this,"lastMove");this.grid=e,this.turn=t,this.flaggedCell=o,this.lastMove=s}updatedGrid(e){return new p({...this,grid:p.computeGrid(this.grid,e)})}updateFlaggedCell(e){return new p({...this,flaggedCell:e})}updateLastMove(e){return new p({...this,lastMove:e})}updateCurrentTurn(){return new p({...this,grid:this.grid,turn:w(this.turn)})}getAllLegalMovesForColor(){return v(this.grid,this.turn).map(e=>[e,y(this,{startRow:e.row,startColumn:e.column})])}get piecesThatCanMove(){return(this.flaggedCell!=null?[this.flaggedCell]:v(this.grid,this.turn)).filter(({row:e,column:t})=>this.getLegalTargets(e,t).length)}getLegalTargets(e,t){return y(this,{startRow:e,startColumn:t}).map(({finalCell:o})=>o)}static computeGrid(e,t){const o=A(e);return t.forEach(({indices:{row:s,column:r},value:i})=>{o[s][r]=i}),o}serialize(){const e=["b","B","r","R","-"];return{grid:this.grid.map(t=>t.map(o=>e[o]).join("")).join(`
`),turn:this.turn}}static deserialize(e){return new p(e)}}const j=[1,1.2,1,1.2,0],z=({grid:n,turn:e})=>{let t=0;return M((o,s)=>{const r=n[o][s],i=b[r];if(!i)return;const l=j[r];t+=i===e?l:-l}),t},P=5;function B(n,e=P){let t=0;const o=[{state:n,depth:e}];let s;for(;s=o.pop();){const{state:r,depth:i}=s;if(!i){const l=z(r);l>=t&&(t=l);continue}for(const[,l]of r.getAllLegalMovesForColor())for(const{updates:u}of l)o.push({state:r.updatedGrid(u).updateCurrentTurn(),depth:i-1})}return t}self.addEventListener("message",n=>{const e=p.deserialize(n.data),t=String(e.grid),s={score:B(e),stringGrid:t};postMessage(s)})})();
//# sourceMappingURL=worker-fc577e3b.js.map
