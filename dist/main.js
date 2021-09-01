(()=>{"use strict";var e={772:(e,t,n)=>{n.d(t,{Z:()=>i});var r=n(645),o=n.n(r)()((function(e){return e[1]}));o.push([e.id,"#root {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n}\r\n",""]);const i=o},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=e(t);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,r){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(r)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0)}for(var l=0;l<e.length;l++){var c=[].concat(e[l]);r&&o[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),t.push(c))}},t}},379:e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var i={},a=[],l=0;l<e.length;l++){var c=e[l],s=r.base?c[0]+r.base:c[0],u=i[s]||0,h="".concat(s," ").concat(u);i[s]=u+1;var f=n(h),p={css:c[1],media:c[2],sourceMap:c[3]};-1!==f?(t[f].references++,t[f].updater(p)):t.push({identifier:h,updater:o(p,r),references:1}),a.push(h)}return a}function o(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n.update(e=t)}else n.remove()}}e.exports=function(e,o){var i=r(e=e||[],o=o||{});return function(e){e=e||[];for(var a=0;a<i.length;a++){var l=n(i[a]);t[l].references--}for(var c=r(e,o),s=0;s<i.length;s++){var u=n(i[s]);0===t[u].references&&(t[u].updater(),t.splice(u,1))}i=c}}},569:e=>{var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t),t}},565:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r=n.css,o=n.media,i=n.sourceMap;o?e.setAttribute("media",o):e.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),t.styleTagTransform(r,e)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={id:r,exports:{}};return e[r](i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{const e=e=>{const t=e.name,n=e.length;let r="horizontal";const o=new Array(n).fill(t);return{name:t,length:n,lifes:o,direction:r,getDirection:()=>r,changeDirection:()=>{"horizontal"===r?r="vertical":"vertical"===r&&(r="horizontal")},hit:e=>{o[e]="hit"},isSunk:()=>o.every((e=>"hit"===e))}},t=(document.getElementById("gameboards-container"),document.getElementById("player-gameboard"),document.getElementById("comp-gameboard"),document.getElementById("scoreboard"),()=>{let e=Array(10).fill(null).map((()=>Array(10).fill(null)));const t=(t,n,r)=>{if("horizontal"===r.getDirection()){t>10-r.length&&(t=10-r.length),n>9&&(n=9);for(let o=0;o<r.length;o++)if(null!=e[t+o][n])return!1}else if("vertical"===r.getDirection()){n>10-r.length&&(n=10-r.length),t>9&&(t=9);for(let o=0;o<r.length;o++)if(null!=e[t][n+o])return!1}return!0},n=()=>{for(var t=0;t<e.length;t++)for(var n=0;n<e.length;n++)if("object"==typeof e[t][n]&&null!==e[t][n]&&!1===e[t][n].ship.isSunk())return!1;return!0};return{grid:e,getGrid:()=>e,placeShip:(n,r,o,i)=>{if("vertical"===i&&o.changeDirection(),t(n,r,o)){if("horizontal"===o.getDirection()){n>10-o.length&&(n=10-o.length),r>9&&(r=9);for(let t=0;t<o.length;t++)e[n+t][r]={ship:o,i:t}}else if("vertical"===o.getDirection()){r>10-o.length&&(r=10-o.length),n>9&&(n=9);for(let t=0;t<o.length;t++)e[n][r+t]={ship:o,i:t}}}else console.log(`cant place - ${o.name} -  on ${n},${r},${o.getDirection()}`)},isPlaceEmpty:t,recieveAttack:(t,r)=>{null===e[t][r]?e[t][r]="o":"object"==typeof e[t][r]&&null!==e[t][r]&&(e[t][r].ship.hit(e[t][r].i),e[t][r]="x",n()?console.log("all ships are sunk"):console.log("still floating"))},allShipsSunk:n}}),r=[{name:"four",length:4},{name:"three1",length:3},{name:"three2",length:3},{name:"two1",length:2},{name:"two2",length:2},{name:"two3",length:2},{name:"one1",length:1},{name:"one2",length:1},{name:"one3",length:1},{name:"one4",length:1}],o=(e,t)=>(e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e),i=(t="human")=>{let n=a(r),i=[];function a(t){let n=[];for(let r=0;r<t.length;r++)n.push(e(t[r]));return n}const l=e=>{let t=o(0,9),n=o(0,9),r=[t,n];JSON.stringify(i).includes(JSON.stringify(r))?l(e):(e.recieveAttack(t,n),i.push(r))};return{getShips:()=>n,getType:()=>t,attack:(e,t,n)=>{n.recieveAttack(e,t)},autoAttack:l,createShipsArray:a}};var a=n(379),l=n.n(a),c=n(795),s=n.n(c),u=n(569),h=n.n(u),f=n(565),p=n.n(f),d=n(216),g=n.n(d),m=n(589),v=n.n(m),y=n(772),b={};b.styleTagTransform=v(),b.setAttributes=p(),b.insert=h().bind(null,"head"),b.domAPI=s(),b.insertStyleElement=g(),l()(y.Z,b),y.Z&&y.Z.locals&&y.Z.locals;const S={name:"four",length:4},x=(i("human"),i("comp")),A=t(),M=t(),k=e(S);e(S),M.placeShip(0,0,k,"horizontal"),A.placeShip(0,0,k,"horizontal"),A.placeShip(3,3,k,"horizontal");for(let e=0;e<99;e++)x.autoAttack(A);console.log(A.getGrid())})()})();