"use strict";
/* Full-screen button for every Leaflet map. Uses the Fullscreen API when available, else a CSS overlay (iOS). */
(function(){
var vi=function(){return document.documentElement.lang==="vi"};
var ICON='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
var ICON2='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/></svg>';
function lab(on){return on?(vi()?"Thoát toàn màn hình (Esc)":"Exit full screen (Esc)"):(vi()?"Xem toàn màn hình":"Full screen")}
function target(c){return c.closest(".mapcard")||c}
function nudge(){[60,300,700].forEach(function(ms){setTimeout(function(){window.dispatchEvent(new Event("resize"))},ms)})}
function paint(){document.querySelectorAll(".fsbtn").forEach(function(b){var on=target(b.parentNode).classList.contains("fsx");b.innerHTML=on?ICON2:ICON;b.title=lab(on);b.setAttribute("aria-label",lab(on))})}
function enter(t){t.classList.add("fsx");document.documentElement.classList.add("fs-open");t.__api=false;
 if(t.requestFullscreen){try{var r=t.requestFullscreen();if(r&&r.then)r.then(function(){t.__api=true}).catch(function(){})}catch(e){}}
 paint();nudge()}
function leave(t){t.classList.remove("fsx");document.documentElement.classList.remove("fs-open");
 if(document.fullscreenElement&&document.exitFullscreen){try{document.exitFullscreen()}catch(e){}}
 paint();nudge()}
function add(c){if(c.getAttribute("data-fs"))return;c.setAttribute("data-fs","1");
 var b=document.createElement("button");b.type="button";b.className="fsbtn";b.innerHTML=ICON;
 b.setAttribute("aria-label",lab(false));b.title=lab(false);
 ["click","dblclick","mousedown","touchstart","pointerdown"].forEach(function(ev){b.addEventListener(ev,function(e){e.stopPropagation()},{passive:true})});
 b.addEventListener("click",function(){var t=target(c);t.classList.contains("fsx")?leave(t):enter(t)});
 c.appendChild(b)}
function scan(){document.querySelectorAll(".leaflet-container:not([data-fs])").forEach(add)}
var q=false;function sched(){if(q)return;q=true;requestAnimationFrame(function(){q=false;scan()})}
new MutationObserver(sched).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:["class"]});
document.addEventListener("fullscreenchange",function(){if(!document.fullscreenElement){var t=document.querySelector(".fsx");if(t)leave(t)}});
document.addEventListener("keydown",function(e){if(e.key==="Escape"){var t=document.querySelector(".fsx");if(t)leave(t)}});
var lb=document.getElementById("lang");if(lb)lb.addEventListener("click",function(){setTimeout(paint,80)});
scan();
})();
