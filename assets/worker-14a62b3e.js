var N=Object.defineProperty;var V=(c,u,g)=>u in c?N(c,u,{enumerable:!0,configurable:!0,writable:!0,value:g}):c[u]=g;var C=(c,u,g)=>(V(c,typeof u!="symbol"?u+"":u,g),g);(function(){"use strict";var c=(n=>(n.black="black",n.red="red",n))(c||{});const u=["black","black-king","red","red-king","empty"],g=[[-1],[-1,1],[1],[-1,1]],x=g.map(n=>n.map(e=>e*2)),m=[c.black,c.red],h=u.length-1;c.red;class p{constructor(e,t,o=h){C(this,"indices");C(this,"value");this.indices={row:e,column:t},this.value=o}static updateFactory(e,t,...o){const s=[];return s.push(new p(e.finalRow,e.finalColumn,t)),o.forEach(({indices:r})=>s.push(new p(r.row,r.column))),s}}function M(n){for(let e=0;e<8;e++)for(let t=0;t<8;t++)n(e,t)}const b=u.map((n,e)=>e!==h?u[e].split("-")[0]:void 0);function w(n){return n===m[0]?m[1]:m[0]}c.black,`
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
`);function y({grid:n,turn:e},{startRow:t,startColumn:o}){const s=n[t][o];return s===h||b[s]!==e?[]:A(n,b[n[t][o]])?F(n,t,o):O(n,t,o)}function A(n,e){return v(n,e).some(({row:t,column:o})=>F(n,t,o).length>0)}function F(n,e,t){const o=[2,-2],s=[],r=n[e][t];if(r===h)return s;for(const i of x[r])for(const l of o){const a=e+i,f=t+l;if(L(a)||E(f))continue;const T=n[a][f],k=e+(Math.abs(i)-1)*Math.sign(i),G=t+(Math.abs(l)-1)*Math.sign(l),P=n[k][G];T===h&&b[P]===w(b[r])&&s.push({finalCell:{row:a,column:f},updates:p.updateFactory({finalRow:a,finalColumn:f},r,new p(k,G),new p(e,t))})}return s}function v(n,e){const t=[];return M((o,s)=>{b[n[o][s]]===e&&t.push({row:o,column:s})}),t}const D=n=>n.map(e=>e.map(t=>t));function L(...n){return n.some(e=>e>=8||e<0)}function E(...n){return n.some(e=>e>=8||e<0)}function O(n,e,t){const o=[1,-1],s=[],r=n[e][t];if(r===h)return s;for(const i of g[r])for(const l of o){const a=e+i,f=t+l;if(L(a)||E(f))continue;n[a][f]===h&&s.push({finalCell:{row:a,column:f},updates:p.updateFactory({finalRow:a,finalColumn:f},r,new p(e,t))})}return s}class d{constructor({grid:e,turn:t,flaggedCell:o,lastMove:s}){C(this,"grid");C(this,"turn");C(this,"flaggedCell");C(this,"lastMove");this.grid=e,this.turn=t,this.flaggedCell=o,this.lastMove=s}updatedGrid(e){return new d({...this,grid:d.computeGrid(this.grid,e)})}updateFlaggedCell(e){return new d({...this,flaggedCell:e})}updateLastMove(e){return new d({...this,lastMove:e})}updateCurrentTurn(){return new d({...this,grid:this.grid,turn:w(this.turn)})}getAllLegalMovesForColor(){return v(this.grid,this.turn).map(e=>[e,y(this,{startRow:e.row,startColumn:e.column})])}get piecesThatCanMove(){return(this.flaggedCell!=null?[this.flaggedCell]:v(this.grid,this.turn)).filter(({row:e,column:t})=>this.getLegalTargets(e,t).length)}getLegalTargets(e,t){return y(this,{startRow:e,startColumn:t}).map(({finalCell:o})=>o)}static computeGrid(e,t){const o=D(e);return t.forEach(({indices:{row:s,column:r},value:i})=>{o[s][r]=i}),o}serialize(){const e=["b","B","r","R","-"];return{grid:this.grid.map(t=>t.map(o=>e[o]).join("")).join(`
`),turn:this.turn}}static deserialize(e){return new d(e)}}const j=[1,1,1,1,0],z=({grid:n,turn:e})=>{let t=0;return M((o,s)=>{const r=n[o][s],i=b[r];if(!i)return;const l=j[r];t+=i===e?l:-l}),t};function B(n,e){let t=0;const o=[{state:n,depth:e}];let s;for(;s=o.pop();){const{state:r,depth:i}=s;if(!i){const l=z(r);l>=t&&(t=l);continue}for(const[,l]of r.getAllLegalMovesForColor())for(const{updates:a}of l)o.push({state:r.updatedGrid(a).updateCurrentTurn(),depth:i-1})}return t}self.addEventListener("message",({data:n})=>{const e=d.deserialize(n.state),t=String(e.grid),s={score:B(e,n.depth),stringGrid:t};postMessage(s)})})();
//# sourceMappingURL=worker-14a62b3e.js.map