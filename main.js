(()=>{"use strict";const e=(()=>{let e=Array(10).fill(null).map((()=>Array(10).fill(null)));const t=(e,t,l,n)=>{if("horizontal"===l.getDirection()){e>10-l.length&&(e=10-l.length),t>9&&(t=9);for(let i=0;i<l.length;i++)if(null!=n[e+i][t])return!1}else if("vertical"===l.getDirection()){t>10-l.length&&(t=10-l.length),e>9&&(e=9);for(let i=0;i<l.length;i++)if(null!=n[e][t+i])return!1}return!0};return{grid:e,getGrid:()=>e,placeShip:(e,l,n,i,r)=>{let o=(e=>{const t=e.name,l=e.length;let n="horizontal";const i=new Array(l).fill(t);return{name:t,length:l,lifes:i,direction:n,getDirection:()=>n,changeDirection:()=>{"horizontal"===n?n="vertical":"vertical"===n&&(n="horizontal")},hit:e=>{i[e]="hit"},isSunk:()=>i.every((e=>"hit"===e))}})(n),h=r;if("vertical"===i&&o.changeDirection(),t(e,l,o,h)){if("horizontal"===o.getDirection()){e>10-o.length&&(e=10-o.length),l>9&&(l=9);for(let t=0;t<o.length;t++)r[e+t][l]=o.lifes[t]}else if("vertical"===o.getDirection()){l>10-o.length&&(l=10-o.length),e>9&&(e=9);for(let t=0;t<o.length;t++)r[e][l+t]=o.lifes[t]}}else console.log(`cant place - ${o.name} -  on ${e},${l},${o.getDirection()}`)},isPlaceEmpty:t}})(),t=e.getGrid();e.placeShip(5,5,{name:"four",length:4},"horizontal",t),e.placeShip(9,9,{name:"four1",length:4},"vertical",t),e.placeShip(0,0,{name:"three",length:3},"horizontal",t),e.placeShip(0,0,{name:"three1",length:3},"vertical",t),console.log(e.getGrid())})();