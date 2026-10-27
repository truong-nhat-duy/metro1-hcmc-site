"use strict";
(function(){
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var vi=function(){return document.documentElement.lang==="vi"};
// skip link
var sk=document.createElement("a");sk.className="skip";sk.href="#find-s";sk.textContent=vi()?"Bỏ qua điều hướng":"Skip to content";document.body.insertBefore(sk,document.body.firstChild);
// back to top
var bt=document.createElement("button");bt.className="totop";bt.type="button";bt.setAttribute("aria-label",vi()?"Lên đầu trang":"Back to top");bt.innerHTML="↑";
bt.addEventListener("click",function(){window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth"})});document.body.appendChild(bt);
// scrollspy on nav
var links=$$("nav .links a[href^='#']"),map={};links.forEach(function(a){map[a.getAttribute("href").slice(1)]=a});
var secs=Object.keys(map).map(function(id){return document.getElementById(id)}).filter(Boolean);
function spy(){var y=window.scrollY+120,cur=null;secs.forEach(function(s){if(s.getBoundingClientRect().top+window.scrollY<=y)cur=s});
 links.forEach(function(a){var on=cur&&map[cur.id]===a;a.classList.toggle("cur",!!on);if(on)a.setAttribute("aria-current","true");else a.removeAttribute("aria-current")});
 var a=$("nav .links a.cur");if(a){var w=a.parentNode;if(a.offsetLeft<w.scrollLeft+20||a.offsetLeft+a.offsetWidth>w.scrollLeft+w.clientWidth-20)w.scrollTo({left:a.offsetLeft-w.clientWidth/2+a.offsetWidth/2,behavior:"smooth"})}
 bt.classList.toggle("on",window.scrollY>900)}
var tk=false;window.addEventListener("scroll",function(){if(!tk){tk=true;requestAnimationFrame(function(){tk=false;spy()})}},{passive:true});spy();
// accessible names for charts and maps
function labels(){$$("canvas").forEach(function(c){if(c.getAttribute("role"))return;var h=c.closest("div,section");var t="";var n=c.parentNode;
  for(var i=0;i<6&&n&&!t;i++){var p=n.previousElementSibling;while(p&&!t){if(/^H[2-4]$/.test(p.tagName))t=p.textContent;p=p.previousElementSibling}n=n.parentNode}
  c.setAttribute("role","img");c.setAttribute("aria-label",(t||"Chart").trim())});
 $$(".leaflet-container").forEach(function(m){if(m.getAttribute("role"))return;var s=m.closest("section"),h=s&&$("h2",s);m.setAttribute("role","region");m.setAttribute("aria-label",(vi()?"Bản đồ tương tác: ":"Interactive map: ")+(h?h.textContent:""))})}
setTimeout(labels,1500);setTimeout(labels,5000);
var lb=document.getElementById("lang");if(lb)lb.addEventListener("click",function(){setTimeout(function(){sk.textContent=vi()?"Bỏ qua điều hướng":"Skip to content";bt.setAttribute("aria-label",vi()?"Lên đầu trang":"Back to top");$$("[role=region].leaflet-container").forEach(function(m){m.removeAttribute("role")});$$("canvas").forEach(function(c){c.removeAttribute("role")});labels()},400)});
})();
