"use strict";
(function(){
var Lf=window.L,N=window.NET,$=function(i){return document.getElementById(i)},L=document.documentElement.lang==="vi"?"vi":"en";
try{var s=localStorage.getItem("lang");if(s==="vi"||s==="en")L=s}catch(e){}
var RING=[{"year":2019,"ring":"r1","rad":39.009,"idx":104.35,"n":86},{"year":2019,"ring":"r2","rad":38.514,"idx":104.71,"n":93},{"year":2019,"ring":"r3","rad":35.427,"idx":99.76,"n":106},{"year":2019,"ring":"r4","rad":32.194,"idx":100.35,"n":226},{"year":2019,"ring":"ref","rad":20.959,"idx":100.05,"n":947},{"year":2020,"ring":"r1","rad":40.752,"idx":109.02,"n":86},{"year":2020,"ring":"r2","rad":40.721,"idx":110.71,"n":93},{"year":2020,"ring":"r3","rad":37.618,"idx":105.92,"n":106},{"year":2020,"ring":"r4","rad":34.129,"idx":106.38,"n":226},{"year":2020,"ring":"ref","rad":21.487,"idx":102.57,"n":947},{"year":2021,"ring":"r1","rad":36.329,"idx":97.18,"n":86},{"year":2021,"ring":"r2","rad":36.966,"idx":100.5,"n":93},{"year":2021,"ring":"r3","rad":35.684,"idx":100.48,"n":106},{"year":2021,"ring":"r4","rad":32.859,"idx":102.42,"n":226},{"year":2021,"ring":"ref","rad":21.091,"idx":100.68,"n":947},{"year":2022,"ring":"r1","rad":40.806,"idx":109.16,"n":86},{"year":2022,"ring":"r2","rad":40.002,"idx":108.75,"n":93},{"year":2022,"ring":"r3","rad":40.154,"idx":113.07,"n":106},{"year":2022,"ring":"r4","rad":36.267,"idx":113.04,"n":226},{"year":2022,"ring":"ref","rad":23.126,"idx":110.4,"n":947},{"year":2023,"ring":"r1","rad":37.382,"idx":100.0,"n":86},{"year":2023,"ring":"r2","rad":36.782,"idx":100.0,"n":93},{"year":2023,"ring":"r3","rad":35.514,"idx":100.0,"n":106},{"year":2023,"ring":"r4","rad":32.083,"idx":100.0,"n":226},{"year":2023,"ring":"ref","rad":20.948,"idx":100.0,"n":947},{"year":2024,"ring":"r1","rad":39.336,"idx":105.23,"n":86},{"year":2024,"ring":"r2","rad":38.431,"idx":104.48,"n":93},{"year":2024,"ring":"r3","rad":39.95,"idx":112.49,"n":106},{"year":2024,"ring":"r4","rad":33.272,"idx":103.71,"n":226},{"year":2024,"ring":"ref","rad":22.843,"idx":109.05,"n":947},{"year":2025,"ring":"r1","rad":45.508,"idx":121.74,"n":86},{"year":2025,"ring":"r2","rad":45.116,"idx":122.66,"n":93},{"year":2025,"ring":"r3","rad":44.876,"idx":126.36,"n":106},{"year":2025,"ring":"r4","rad":38.341,"idx":119.51,"n":226},{"year":2025,"ring":"ref","rad":25.569,"idx":122.06,"n":947},{"year":2026,"ring":"r1","rad":43.011,"idx":115.06,"n":86},{"year":2026,"ring":"r2","rad":42.803,"idx":116.37,"n":93},{"year":2026,"ring":"r3","rad":41.737,"idx":117.52,"n":106},{"year":2026,"ring":"r4","rad":37.946,"idx":118.27,"n":226},{"year":2026,"ring":"ref","rad":25.396,"idx":121.23,"n":947}];
var T={en:{h:"Hanoi night-light maps by year",p:"Annual mean of monthly VIIRS Black Marble radiance (VNP46A3) for the Hanoi metropolitan area, 2019–2026, on one colour scale. Move the slider or press play; switch to the change layer to compare 2026 with 2019.",
 year:"Year:",play:"Play",pause:"Pause",lyr:"Layer:",l1:"Radiance",l2:"Change 2019 → 2026",op:"Opacity:",st:"Operating stations (Line 2A, Line 3)",rg:"800 m rings",
 mean:"Study-area mean radiance",months:"months in composite",ringidx:"Ring index (2023 = 100)",part:"2026 covers January–August only.",
 note:"Colour scale is shared across years (square-root stretch, top of scale ≈ 53 nW·cm⁻²·sr⁻¹); 2026 has eight months. Descriptive only: ring indices use 22 operating stations taken from OpenStreetMap (not yet verified against official lists), and near rings did not brighten faster than the 2,000–5,000 m reference. No evidence of a station effect, and no causal reading.",
 dark:"Low",hi:"High",neg:"Dimmer",pos:"Brighter"},
vi:{h:"Bản đồ ánh sáng đêm Hà Nội theo năm",p:"Trung bình năm của bức xạ VIIRS Black Marble hằng tháng (VNP46A3) cho khu vực Hà Nội, 2019–2026, trên cùng một thang màu. Kéo thanh trượt hoặc bấm phát; chuyển sang lớp thay đổi để so 2026 với 2019.",
 year:"Năm:",play:"Phát",pause:"Dừng",lyr:"Lớp:",l1:"Bức xạ",l2:"Thay đổi 2019 → 2026",op:"Độ mờ:",st:"Ga đang vận hành (Tuyến 2A, Tuyến 3)",rg:"Vành 800 m",
 mean:"Bức xạ trung bình toàn vùng",months:"tháng trong ảnh tổng hợp",ringidx:"Chỉ số theo vành (2023 = 100)",part:"Năm 2026 chỉ có tháng 1–8.",
 note:"Thang màu dùng chung cho mọi năm (kéo giãn căn bậc hai, đỉnh thang ≈ 53 nW·cm⁻²·sr⁻¹); năm 2026 có tám tháng. Chỉ mang tính mô tả: chỉ số vành dùng 22 ga đang vận hành lấy từ OpenStreetMap (chưa đối chiếu danh sách chính thức), và các vành gần không sáng lên nhanh hơn vành đối chứng 2.000–5.000 m. Không có bằng chứng về hiệu ứng ga, không diễn giải nhân quả.",
 dark:"Thấp",hi:"Cao",neg:"Tối hơn",pos:"Sáng hơn"}};
var nf=function(x,k){if(x==null||isNaN(x))return"–";var s=(+x).toFixed(k==null?3:k);return L==="vi"?s.replace(".",","):s};
function txt(){var t=T[L];document.querySelectorAll("[data-h]").forEach(function(n){var k=n.getAttribute("data-h");if(t[k]!=null)n.textContent=t[k]})}
var NH=null;
function init(){var el=$("mapNtlHn");if(!el||NH||!Lf||!window.Geo)return;
 fetch("assets/ntl_hn/meta.json").then(function(r){return r.json()}).then(function(M){
  var map=Lf.map(el,{minZoom:8}).setView([21.0,105.82],11),G=Geo.init(map,"hn",{dark:true,nolegend:true});
  try{if(G&&G.dist)map.removeLayer(G.dist);if(G&&G.lines)map.removeLayer(G.lines)}catch(e){}
  var yrs=Object.keys(M.years).map(Number).sort(),bounds=[[M.bounds[0],M.bounds[1]],[M.bounds[2],M.bounds[3]]],op=.85,cur=yrs[yrs.length-1],mode="year",img=null,tm=null,st=Lf.layerGroup(),rg=Lf.layerGroup();
  NH={map:map,M:M};
  var pane=map.createPane("ntlhn");pane.style.zIndex=250;pane.style.pointerEvents="none";
  function set(){if(img)map.removeLayer(img);var u=mode==="year"?"assets/ntl_hn/ntl_"+cur+".webp":"assets/ntl_hn/ntl_change.webp";img=Lf.imageOverlay(u,bounds,{opacity:op,pane:"ntlhn",interactive:false}).addTo(map);info()}
  function info(){var t=T[L],y=M.years[cur],box=$("ntlInfoHn"),idx=RING.filter(function(x){return x.year===cur}),tx=Geo.tx();
   var bars=["r1","r2","r3","r4","ref"].map(function(k){var q=idx.filter(function(x){return x.ring===k})[0],v=q?q.idx:null;return "<div class='nb'><span>"+(k==="ref"?"2,000–5,000 m":tx.rn[k])+"</span><i style='width:"+Math.max(2,Math.min(100,(v||0)/1.4))+"%'></i><b>"+(v==null?"–":nf(v,1))+"</b></div>"}).join("");
   box.innerHTML="<div class='big'>"+(mode==="year"?cur:"2019 → 2026")+"</div><div><small>"+t.mean+"</small><b>"+(mode==="year"?nf(y.mean,2):nf(M.years[yrs[yrs.length-1]].mean-M.years[yrs[0]].mean,2))+"</b> <small>nW·cm⁻²·sr⁻¹</small></div>"+
    (mode==="year"?"<div><small>"+y.months+" "+t.months+(cur===2026?" · "+t.part:"")+"</small></div><h4>"+t.ringidx+"</h4>"+bars:"")}
  function legend(){var t=T[L],lg=$("ntlLgHn");lg.innerHTML=mode==="year"?"<b>"+t.l1+"</b><span class='ramp'><i class='inf'></i></span><span class='rl'><em>"+t.dark+"</em><em>"+t.hi+"</em></span>":"<b>"+t.l2+"</b><span class='ramp'><i class='rdbu'></i></span><span class='rl'><em>"+t.neg+"</em><em>0</em><em>"+t.pos+"</em></span>"}
  var sl=$("ntlYrHn");sl.min=yrs[0];sl.max=yrs[yrs.length-1];sl.value=cur;$("ntlYvHn").textContent=cur;
  sl.addEventListener("input",function(){cur=+sl.value;$("ntlYvHn").textContent=cur;mode="year";$("ntlModeHn").value="year";set();legend()});
  $("ntlModeHn").addEventListener("change",function(){mode=this.value;sl.disabled=mode!=="year";set();legend()});
  $("ntlOpHn").addEventListener("input",function(){op=+this.value/100;if(img)img.setOpacity(op)});
  $("ntlPlayHn").addEventListener("click",function(){var b=this;if(tm){clearInterval(tm);tm=null;b.textContent=T[L].play;return}mode="year";$("ntlModeHn").value="year";sl.disabled=false;b.textContent=T[L].pause;
   if(cur>=yrs[yrs.length-1])cur=yrs[0]-1;tm=setInterval(function(){cur++;if(cur>yrs[yrs.length-1]){clearInterval(tm);tm=null;b.textContent=T[L].play;cur=yrs[yrs.length-1];return}sl.value=cur;$("ntlYvHn").textContent=cur;set();legend()},900)});
  (N.hnStations||[]).forEach(function(s){Geo.stMarker(s.lat,s.lng,{color:"#38bdf8",sm:true}).bindTooltip(s.n+(s.line?" ("+s.line+")":""),{className:"stl",direction:"right",offset:[0,0]}).addTo(st);
   Lf.circle([s.lat,s.lng],{radius:800,color:"#fde68a",weight:1,fill:false,opacity:.8,interactive:false}).addTo(rg)});
  $("ntlStHn").addEventListener("change",function(){this.checked?st.addTo(map):map.removeLayer(st)});$("ntlRgHn").addEventListener("change",function(){this.checked?rg.addTo(map):map.removeLayer(rg)});
  st.addTo(map);rg.addTo(map);NH.legend=legend;NH.info=info;set();legend()})}
function render(){txt();if(NH){NH.legend();NH.info();$("ntlPlayHn").textContent=T[L].play}}
var lb=$("lang");if(lb)lb.addEventListener("click",function(){setTimeout(function(){L=document.documentElement.lang==="vi"?"vi":"en";render()},30)});
txt();
var el=$("mapNtlHn");if(el){if("IntersectionObserver" in window){var o=new IntersectionObserver(function(es){if(es[0].isIntersecting){o.disconnect();init()}},{rootMargin:"300px"});o.observe(el)}else init()}
window.XMHN=function(){return NH};
})();
