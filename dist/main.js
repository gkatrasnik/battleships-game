(()=>{"use strict";const e=(()=>{let e=Array(10).fill(null).map((()=>Array(10).fill(null)));const t=(e,t,l,i)=>{if("horizontal"===l.getDirection()){e>10-l.length&&(e=10-l.length),t>9&&(t=9);for(let n=0;n<l.length;n++)if(null!=i[e+n][t])return!1}else if("vertical"===l.getDirection()){t>10-l.length&&(t=10-l.length),e>9&&(e=9);for(let n=0;n<l.length;n++)if(null!=i[e][t+n])return!1}return!0};return{grid:e,getGrid:()=>e,placeShip:(e,l,i,n,r)=>{let o=(e=>{const t=e.name,l=e.length;let i="horizontal";const n=new Array(l).fill(t);return{name:t,length:l,lifes:n,direction:i,getDirection:()=>i,changeDirection:()=>{"horizontal"===i?i="vertical":"vertical"===i&&(i="horizontal")},hit:e=>{n[e]="hit"},isSunk:()=>n.every((e=>"hit"===e))}})(i),h=r;if("vertical"===n&&o.changeDirection(),t(e,l,o,h)){if("horizontal"===o.getDirection()){e>10-o.length&&(e=10-o.length),l>9&&(l=9);for(let t=0;t<o.length;t++)r[e+t][l]={ship:o,i:t}}else if("vertical"===o.getDirection()){l>10-o.length&&(l=10-o.length),e>9&&(e=9);for(let t=0;t<o.length;t++)r[e][l+t]={ship:o,i:t}}}else console.log(`cant place - ${o.name} -  on ${e},${l},${o.getDirection()}`)},isPlaceEmpty:t,recieveAttack:(e,t,l)=>{l[e][t]="x"}}})(),t=e.getGrid();e.placeShip(5,5,{name:"four",length:4},"horizontal",t),e.placeShip(9,9,{name:"four1",length:4},"vertical",t),e.placeShip(0,0,{name:"three",length:3},"horizontal",t),e.placeShip(0,0,{name:"three1",length:3},"vertical",t),e.recieveAttack(0,0,t),console.log(e.getGrid())})();