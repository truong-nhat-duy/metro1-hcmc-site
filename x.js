"use strict";
(function(){
var Lf=window.L,D=window.DATA,N=window.NET,A=window.AMEN,$=function(i){return document.getElementById(i)},L=document.documentElement.lang==="vi"?"vi":"en";
try{var s=localStorage.getItem("lang");if(s==="vi"||s==="en")L=s}catch(e){}
var T={en:{
 part_p1:"Overview",part_p2:"Explore the listings",part_p3:"Estimate and explain",part_p4:"Context: light and land use",part_p5:"Evidence and data",nav_ring:"Ring maps",nav_ntl:"Night lights",nav_ctx:"Land use and amenities",
 pmax:"Price up to:",inview:"In view (n · median):",
 ring_h:"Distance-ring maps",ring_p:"The rings are the exposure used in every hedonic model: listings within 500 m, 500–800 m, 800–1,200 m and 1,200–2,000 m of the nearest station, against listings more than 2,000 m away. Each ring is shaded by its estimated premium, so the map shows what the coefficient chart measures.",
 ring_city:"City:",ring_spec:"Specification:",ring_pts:"Show listings by ring",ring_bands:"Shade rings by estimate",
 ring_tbl:"Ring summary",rt_ring:"Ring",rt_n:"Listings",rt_med:"Median (mn VND/m²)",rt_est:"Premium β (95% CI)",rt_p:"p",
 ring_note:"Premiums are descriptive associations with asking prices after opening, relative to the reference zone (more than 2,000 m). They are not causal effects.",
 ring_click:"Click a ring or a listing for details.",ring_leg:"Premium β (Δ ln price)",ring_ref:"Reference zone: more than 2,000 m",
 ntlm_h:"Night-light maps by year",ntlm_p:"Annual mean of monthly VIIRS Black Marble radiance (VNP46A3) for Ho Chi Minh City, 2019–2026, on one colour scale. Move the slider or press play to see how the city lights up; switch to the change layer to compare 2026 with 2019.",
 ntlm_ln:"Metro lines: solid blue = operating; red dashed = under construction; grey dotted = planned.",ntlm_year:"Year:",ntlm_play:"Play",ntlm_pause:"Pause",ntlm_lyr:"Layer:",ntlm_l1:"Radiance",ntlm_l2:"Change 2019 → 2026",ntlm_op:"Opacity:",ntlm_st:"Line 1 and stations",ntlm_rg:"800 m rings",
 ntlm_mean:"Study-area mean radiance",ntlm_months:"months in composite",ntlm_ringidx:"Ring index (2023 = 100)",ntlm_part:"2026 covers January–August only.",
 ntlm_note:"Colour scale is shared across years (square-root stretch, top of scale ≈ 145 nW·cm⁻²·sr⁻¹); 2026 has eight months. These maps are descriptive. The pre-opening gap between near and far pixels is not flat, so differences here are not evidence of a station effect.",
 ntlm_dark:"Low",ntlm_hi:"High",ntlm_neg:"Dimmer",ntlm_pos:"Brighter",
 ctx_h:"Land-use mix and amenities",ctx_p:"Candidate context variables for Ho Chi Minh City on 500 m cells: land-use mix (entropy of OpenStreetMap land-use areas, and of amenity types), WorldCover built-up and green shares, and amenity points from OpenStreetMap. Use the layer panel and the legend below the map to switch variables and amenity types.",
 ctx_c1:"Amenities within 800 m of each Line 1 station",ctx_c2:"Land-use mix by distance to the nearest station",
 ctx_cov:"Land-use polygons cover only about a third of the area, so the area-based mix is defined for 520 of 1,212 cells. Both mix measures are candidate controls, not outcomes of the metro.",
 ctx_dist:"Distance to nearest station",ctx_mix:"Mean mix (0–1)",ctx_n:"cells",
 mlu_a:"Area-based mix",mlu_p:"POI-based mix"},
vi:{
 part_p1:"Tổng quan",part_p2:"Khám phá tin đăng",part_p3:"Ước lượng và giải thích",part_p4:"Bối cảnh: ánh sáng và sử dụng đất",part_p5:"Bằng chứng và dữ liệu",nav_ring:"Bản đồ vành",nav_ntl:"Ánh sáng đêm",nav_ctx:"Sử dụng đất, tiện ích",
 pmax:"Giá tối đa:",inview:"Trong khung nhìn (n · trung vị):",
 ring_h:"Bản đồ vành khoảng cách",ring_p:"Các vành là biến phơi nhiễm trong mọi mô hình hedonic: tin trong 500 m, 500–800 m, 800–1.200 m và 1.200–2.000 m quanh ga gần nhất, so với tin cách ga hơn 2.000 m. Mỗi vành được tô theo mức chênh ước lượng, nên bản đồ cho thấy đúng điều biểu đồ hệ số đo.",
 ring_city:"Thành phố:",ring_spec:"Đặc tả:",ring_pts:"Hiện tin theo vành",ring_bands:"Tô vành theo ước lượng",
 ring_tbl:"Tóm tắt theo vành",rt_ring:"Vành",rt_n:"Số tin",rt_med:"Trung vị (triệu đồng/m²)",rt_est:"Mức chênh β (KTC 95%)",rt_p:"p",
 ring_note:"Mức chênh là tương quan mô tả với giá rao sau mở tuyến, so với vùng đối chiếu (hơn 2.000 m). Không phải hiệu ứng nhân quả.",
 ring_click:"Bấm vào vành hoặc một tin để xem chi tiết.",ring_leg:"Mức chênh β (Δ ln giá)",ring_ref:"Vùng đối chiếu: hơn 2.000 m",
 ntlm_h:"Bản đồ ánh sáng đêm theo năm",ntlm_p:"Trung bình năm của bức xạ VIIRS Black Marble hằng tháng (VNP46A3) cho TP.HCM, 2019–2026, trên cùng một thang màu. Kéo thanh trượt hoặc bấm phát để xem thành phố sáng lên thế nào; chuyển sang lớp thay đổi để so 2026 với 2019.",
 ntlm_ln:"Tuyến metro: xanh liền = đang vận hành; đỏ nét đứt = đang xây; xám chấm = quy hoạch.",ntlm_year:"Năm:",ntlm_play:"Phát",ntlm_pause:"Dừng",ntlm_lyr:"Lớp:",ntlm_l1:"Bức xạ",ntlm_l2:"Thay đổi 2019 → 2026",ntlm_op:"Độ mờ:",ntlm_st:"Tuyến 1 và các ga",ntlm_rg:"Vành 800 m",
 ntlm_mean:"Bức xạ trung bình toàn vùng",ntlm_months:"tháng trong ảnh tổng hợp",ntlm_ringidx:"Chỉ số theo vành (2023 = 100)",ntlm_part:"Năm 2026 chỉ có tháng 1–8.",
 ntlm_note:"Thang màu dùng chung cho mọi năm (kéo giãn căn bậc hai, đỉnh thang ≈ 145 nW·cm⁻²·sr⁻¹); năm 2026 có tám tháng. Các bản đồ chỉ mang tính mô tả. Chênh lệch giữa điểm ảnh gần và xa ga trước khi mở tuyến không phẳng, nên khác biệt ở đây không phải bằng chứng về hiệu ứng ga.",
 ntlm_dark:"Thấp",ntlm_hi:"Cao",ntlm_neg:"Tối hơn",ntlm_pos:"Sáng hơn",
 ctx_h:"Sử dụng đất hỗn hợp và tiện ích",ctx_p:"Các biến bối cảnh ứng viên cho TP.HCM trên ô 500 m: mức hỗn hợp sử dụng đất (entropy theo diện tích đất OSM và theo loại tiện ích), tỷ lệ xây dựng và cây xanh WorldCover, và điểm tiện ích OpenStreetMap. Dùng bảng lớp và chú giải dưới bản đồ để đổi biến và loại tiện ích.",
 ctx_c1:"Tiện ích trong 800 m quanh từng ga Tuyến 1",ctx_c2:"Mức hỗn hợp theo khoảng cách tới ga gần nhất",
 ctx_cov:"Đa giác sử dụng đất chỉ phủ khoảng một phần ba diện tích, nên mức hỗn hợp theo diện tích chỉ xác định cho 520 trên 1.212 ô. Cả hai thước đo là biến kiểm soát ứng viên, không phải kết quả của metro.",
 ctx_dist:"Khoảng cách tới ga gần nhất",ctx_mix:"Mức hỗn hợp trung bình (0–1)",ctx_n:"ô",
 mlu_a:"Hỗn hợp theo diện tích",mlu_p:"Hỗn hợp theo POI"}};
var nf=function(x,k){if(x==null||isNaN(x))return"–";var s=(+x).toFixed(k==null?3:k);return L==="vi"?s.replace(".",","):s},fi=function(x){return Math.round(x).toLocaleString(L==="vi"?"vi-VN":"en-US")};
var css=function(v){return getComputedStyle(document.documentElement).getPropertyValue(v).trim()};
var med=Geo.med,hav=Geo.hav,ch={};function mk(id,cfg){if(ch[id])ch[id].destroy();ch[id]=new Chart($(id).getContext("2d"),cfg)}
function txt(){var t=T[L];document.querySelectorAll("[data-x]").forEach(function(n){var k=n.getAttribute("data-x");if(t[k]!=null)n.textContent=t[k]})}
// ---------- ring map
var RS=null;
function divColor(v){var m=.5,t=Math.max(-1,Math.min(1,v/m)),a=t<0?[37,99,235]:[220,38,38],w=[250,250,250],k=Math.abs(t);return "rgb("+[0,1,2].map(function(i){return Math.round(w[i]+(a[i]-w[i])*k)}).join(",")+")"}
function ringMap(city,keep){var mapEl=$("mapRing");if(!mapEl||RS)return;city=city||"hcm";
 var map=Lf.map(mapEl).setView(city==="hcm"?[10.8,106.72]:[21.0,105.82],12),G=Geo.init(map,city,{types:true}),st=keep||{city:city,spec:"E0",bands:true,pts:true};
 RS={map:map,G:G,st:st,band:Lf.layerGroup().addTo(map),stn:Lf.layerGroup().addTo(map)};
 RS.layer=new Geo.TypeLayer([],{city:"hcm",filter:function(){return true}});
 var cs=$("rCity"),sp=$("rSpec");
 cs.addEventListener("change",function(){var keep=st;var old=RS;old.map.remove();var ix=Geo.reg.indexOf(old.G);if(ix>=0)Geo.reg.splice(ix,1);var lg=$("mapRing").nextElementSibling;if(lg&&lg.classList.contains("mlg"))lg.remove();RS=null;ringMap(keep.city=cs.value,keep)});sp.addEventListener("change",function(){st.spec=sp.value;ringDraw(false)});
 $("rPts").addEventListener("change",function(){st.pts=this.checked;ringDraw(false)});$("rBands").addEventListener("change",function(){st.bands=this.checked;ringDraw(false)});
 $("rCity").value=st.city;ringDraw(true)}
function ringDraw(recenter){if(!RS)return;var t=T[L],st=RS.st,city=st.city,map=RS.map,coefs=D.coefs[city],sp=$("rSpec");
 if(recenter||!sp.options.length){var cur=sp.value;sp.innerHTML="";["E0","E1","E2","E3","E4","E5","E6a","E6b"].forEach(function(k){if(coefs[k]){var o=document.createElement("option");o.value=k;o.textContent=k;sp.appendChild(o)}});sp.value=coefs[cur]?cur:"E0";st.spec=sp.value}
 var stns=Geo.stationsOf(city),cf=coefs[st.spec].rings,byR={};cf.forEach(function(r){byR[r.t]=r});
 RS.band.clearLayers();RS.stn.clearLayers();
 if(recenter){map.setView(city==="hcm"?[10.8,106.72]:[21.0,105.82],city==="hcm"?12:12)}
 if(st.bands){["r4","r3","r2","r1"].forEach(function(k){var rad={r1:500,r2:800,r3:1200,r4:2000}[k],r=byR[k],pn=Geo.bpane(map,k,.55);stns.forEach(function(s){
   var c=Lf.circle([s.lat,s.lng],{pane:pn,radius:rad,stroke:false,fillColor:r?divColor(r.est):"#cbd5e1",fillOpacity:1});
   c.on("click",function(e){if(RS.layer._map&&RS.layer.hit(e.containerPoint))return;Lf.popup({className:"pkp"}).setLatLng(e.latlng).setContent(ringPopup(k,byR[k],city)).openOn(map)});
   c.addTo(RS.band)})})}
 stns.forEach(function(s){Geo.stMarker(s.lat,s.lng,{color:city==="hcm"?"#0079b8":"#c2410c",sm:true}).bindTooltip(s.n,{className:"stl",direction:"right",offset:[0,0],permanent:true}).addTo(RS.stn)});
 if(RS.layer._map)map.removeLayer(RS.layer);
 RS.layer=new Geo.TypeLayer(Geo.pointsOf(city),{city:city,filter:function(p){return true}});if(st.pts)RS.layer.addTo(map);
 ringTable();ringLegend()}
function ringPopup(k,r,city){var tx=Geo.tx(),pts=Geo.pointsOf(city).filter(function(p){return p[5]===k}),v=pts.map(function(p){return p[2]});
 return "<div class='pk'><div class='pk-h'><span class='pk-dot' style='background:"+(r?divColor(r.est):"#cbd5e1")+";width:14px;height:14px'></span><div><small>"+tx.lgr+"</small><b>"+tx.rn[k]+"</b></div></div><table>"+
  "<tr><th>β</th><td>"+(r?(r.est>=0?"+":"")+nf(r.est,3)+" <small>["+nf(r.lo,3)+", "+nf(r.hi,3)+"]</small>":"–")+"</td></tr><tr><th>p</th><td>"+(r?nf(r.p,3):"–")+"</td></tr>"+
  "<tr><th>"+T[L].rt_n+"</th><td>"+fi(v.length)+"</td></tr><tr><th>"+T[L].rt_med+"</th><td>"+nf(med(v),1)+"</td></tr></table></div>"}
function ringTable(){var t=T[L],tx=Geo.tx(),st=RS.st,city=st.city,pts=Geo.pointsOf(city),cf=D.coefs[city][st.spec].rings,rows=["r1","r2","r3","r4","ref"].map(function(k){
  var v=pts.filter(function(p){return p[5]===k}).map(function(p){return p[2]}),r=cf.filter(function(x){return x.t===k})[0];
  return "<tr><td><span class='pk-dot' style='background:"+(r?divColor(r.est):"#cbd5e1")+"'></span>"+tx.rn[k]+"</td><td>"+fi(v.length)+"</td><td>"+nf(med(v),1)+"</td><td>"+(r?(r.est>=0?"+":"")+nf(r.est,3)+" ["+nf(r.lo,3)+", "+nf(r.hi,3)+"]":(k==="ref"?"0 ("+t.ring_ref.split(": ")[0]+")":"–"))+"</td><td>"+(r?nf(r.p,3):"–")+"</td></tr>"}).join("");
 $("tRing").innerHTML="<thead><tr><th>"+t.rt_ring+"</th><th>"+t.rt_n+"</th><th>"+t.rt_med+"</th><th>"+t.rt_est+"</th><th>"+t.rt_p+"</th></tr></thead><tbody>"+rows+"</tbody>"}
function ringLegend(){var t=T[L],el=$("ringLg");if(!el)return;var g=[];for(var i=0;i<=10;i++)g.push(divColor(-.5+i*.1));
 el.innerHTML="<b>"+t.ring_leg+"</b><span class='ramp'><i style='background:linear-gradient(90deg,"+g.join(",")+")'></i></span><span class='rl'><em>−0.5</em><em>0</em><em>+0.5</em></span><small>"+t.ring_ref+"</small>"}
// ---------- night-light map
var NS=null;
function ntlMap(){var el=$("mapNtl");if(!el||NS)return;
 fetch("assets/ntl/meta.json").then(function(r){return r.json()}).then(function(M){
  var map=Lf.map(el,{minZoom:8}).setView([10.82,106.72],11),G=Geo.init(map,"hcm",{dark:true,nolegend:true});
  map.removeLayer(G.dist);map.removeLayer(G.lines);
  var yrs=Object.keys(M.years).map(Number).sort(),bounds=[[M.bounds[0],M.bounds[1]],[M.bounds[2],M.bounds[3]]],op=.85,cur=yrs[yrs.length-1],mode="year",img=null,tm=null,st=Lf.layerGroup(),rg=Lf.layerGroup();
  NS={map:map,M:M};
  var pane=map.createPane("ntl");pane.style.zIndex=250;pane.style.pointerEvents="none";
  function set(){if(img)map.removeLayer(img);var u=mode==="year"?"assets/ntl/ntl_"+cur+".webp":"assets/ntl/ntl_change.webp";img=Lf.imageOverlay(u,bounds,{opacity:op,pane:"ntl",interactive:false}).addTo(map);info()}
  function info(){var t=T[L],y=M.years[cur],el=$("ntlInfo"),idx=D.ntlYear.filter(function(x){return x.year===cur});
   var bars=["r1","r2","r3","r4","ref"].map(function(k){var q=idx.filter(function(x){return x.ring===k})[0],v=q?q.idx:null,tx=Geo.tx();return "<div class='nb'><span>"+(k==="ref"?"2,000–5,000 m":tx.rn[k])+"</span><i style='width:"+Math.max(2,Math.min(100,(v||0)/1.4))+"%'></i><b>"+(v==null?"–":nf(v,1))+"</b></div>"}).join("");
   el.innerHTML="<div class='big'>"+(mode==="year"?cur:"2019 → 2026")+"</div><div><small>"+t.ntlm_mean+"</small><b>"+(mode==="year"?nf(y.mean,2):nf(M.years[yrs[yrs.length-1]].mean-M.years[yrs[0]].mean,2))+"</b> <small>nW·cm⁻²·sr⁻¹</small></div>"+
    (mode==="year"?"<div><small>"+y.months+" "+t.ntlm_months+(cur===2026?" · "+t.ntlm_part:"")+"</small></div><h4>"+t.ntlm_ringidx+"</h4>"+bars:"")}
  function legend(){var t=T[L],lg=$("ntlLg");lg.innerHTML=mode==="year"?"<b>"+t.ntlm_l1+"</b><span class='ramp'><i class='inf'></i></span><span class='rl'><em>"+t.ntlm_dark+"</em><em>"+t.ntlm_hi+"</em></span>":"<b>"+t.ntlm_l2+"</b><span class='ramp'><i class='rdbu'></i></span><span class='rl'><em>"+t.ntlm_neg+"</em><em>0</em><em>"+t.ntlm_pos+"</em></span>"}
  var sl=$("ntlYr");sl.min=yrs[0];sl.max=yrs[yrs.length-1];sl.value=cur;$("ntlYv").textContent=cur;
  sl.addEventListener("input",function(){cur=+sl.value;$("ntlYv").textContent=cur;mode="year";$("ntlMode").value="year";set();legend()});
  $("ntlMode").addEventListener("change",function(){mode=this.value;sl.disabled=mode!=="year";set();legend()});
  $("ntlOp").addEventListener("input",function(){op=+this.value/100;if(img)img.setOpacity(op)});
  $("ntlPlay").addEventListener("click",function(){var b=this,t=T[L];if(tm){clearInterval(tm);tm=null;b.textContent=t.ntlm_play;return}mode="year";$("ntlMode").value="year";sl.disabled=false;b.textContent=t.ntlm_pause;
   if(cur>=yrs[yrs.length-1])cur=yrs[0]-1;tm=setInterval(function(){cur++;if(cur>yrs[yrs.length-1]){clearInterval(tm);tm=null;b.textContent=T[L].ntlm_play;cur=yrs[yrs.length-1];return}sl.value=cur;$("ntlYv").textContent=cur;set();legend()},900)});
  function overlays(){st.clearLayers();rg.clearLayers();D.stations.forEach(function(s){Geo.stMarker(s.lat,s.lng,{color:"#38bdf8",sm:true}).bindTooltip(L==="vi"?s.vi:s.en,{className:"stl",direction:"right",offset:[0,0]}).addTo(st);
    Lf.circle([s.lat,s.lng],{radius:800,color:"#fde68a",weight:1,fill:false,opacity:.8,interactive:false}).addTo(rg)});
   (GEO.hcm.lines||[]).forEach(function(x){var o=x.st==="op";Lf.polyline(x.ls,{color:o?"#38bdf8":x.st==="uc"?"#fb7185":"#cbd5e1",weight:o?3.5:x.st==="uc"?2.5:2,opacity:o?.95:.85,dashArray:o?null:x.st==="uc"?"7 5":"2 5",interactive:false}).addTo(st)})}
  overlays();$("ntlSt").addEventListener("change",function(){this.checked?st.addTo(map):map.removeLayer(st)});$("ntlRg").addEventListener("change",function(){this.checked?rg.addTo(map):map.removeLayer(rg)});
  st.addTo(map);rg.addTo(map);NS.set=set;NS.legend=legend;NS.info=info;NS.overlays=overlays;set();legend()})}
// ---------- context: MLU and amenities
var CS=null;
function ctxMap(){var el=$("mapCtx");if(!el||CS||!A)return;
 var map=Lf.map(el).setView([10.8,106.72],12),G=Geo.init(map,"hcm",{amen:true,mlu:true,bands:true});G.mlu.layer.addTo(map);G.bands.addTo(map);G.amen.addTo(map);
 D.stations.forEach(function(s){G.station(s,{label:L==="vi"?s.vi:s.en}).addTo(map)});CS={map:map,G:G};ctxCharts()}
function ctxCharts(){if(!A)return;var t=T[L],tx=Geo.tx(),cats=tx.am.map(function(a){return a.split(" (")[0]});
 var data=A.pts,names=D.stations.map(function(s){return L==="vi"?s.vi:s.en}),cnt=[0,1,2,3,4].map(function(c){return D.stations.map(function(s){var n=0;for(var i=0;i<data.length;i++){var p=data[i];if(p[2]===c&&Math.abs(p[0]-s.lat)<.0075&&Math.abs(p[1]-s.lng)<.0078&&hav(p[0],p[1],s.lat,s.lng)<=800)n++}return n})});
 mk("cAm",{type:"bar",data:{labels:names,datasets:cnt.map(function(v,i){return{label:cats[i],data:v,backgroundColor:Geo.AC[i]}})},options:{maintainAspectRatio:false,indexAxis:"y",scales:{x:{stacked:true,grid:{color:css("--line")}},y:{stacked:true,grid:{display:false}}},plugins:{legend:{position:"bottom"}}}});
 var ed=[0,800,1200,2000,4000,6001],lab=ed.slice(0,-1).map(function(e,i){return fi(e)+"–"+(i===4?"6,000":fi(ed[i+1]))+" m"}),cells=A.mlu;
 var m1=[],m2=[],nn=[];for(var i=0;i<ed.length-1;i++){var c=cells.filter(function(q){return q[7]>=ed[i]&&q[7]<ed[i+1]}),a=c.filter(function(q){return q[2]!=null}).map(function(q){return q[2]}),b=c.filter(function(q){return q[3]!=null}).map(function(q){return q[3]});
  m1.push(a.length>=5?a.reduce(function(x,y){return x+y},0)/a.length:null);m2.push(b.length>=5?b.reduce(function(x,y){return x+y},0)/b.length:null);nn.push(c.length)}
 mk("cMlu",{type:"bar",data:{labels:lab,datasets:[{label:t.mlu_a,data:m1,backgroundColor:css("--acc")},{label:t.mlu_p,data:m2,backgroundColor:css("--acc2")}]},options:{maintainAspectRatio:false,scales:{y:{min:0,max:1,title:{display:true,text:t.ctx_mix},grid:{color:css("--line")}},x:{grid:{display:false}}},plugins:{legend:{position:"bottom"},tooltip:{callbacks:{afterLabel:function(q){return fi(nn[q.dataIndex])+" "+t.ctx_n}}}}}})}
// ---------- page behaviour: scrollspy, progress, reveal, counters
function behaviour(){var links=[].slice.call(document.querySelectorAll(".links a")),secs=links.map(function(a){return document.querySelector(a.getAttribute("href"))}),bar=$("prog");
 function spy(){var y=window.scrollY,h=document.documentElement.scrollHeight-innerHeight;if(bar)bar.style.transform="scaleX("+(h>0?y/h:0)+")";var cur=-1;secs.forEach(function(s,i){if(s&&s.getBoundingClientRect().top<innerHeight*.35)cur=i});links.forEach(function(a,i){a.classList.toggle("on",i===cur)})}
 addEventListener("scroll",spy,{passive:true});spy();
 if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.06});document.querySelectorAll("section.sec,.chap a,.fc").forEach(function(n){n.classList.add("rv");io.observe(n)})}
}
function render(){txt();ringDraw(false);if(NS&&NS.legend){NS.legend();NS.info();$("ntlPlay").textContent=T[L].ntlm_play}if(CS)ctxCharts()}
var lb=$("lang");if(lb)lb.addEventListener("click",function(){setTimeout(function(){L=document.documentElement.lang==="vi"?"vi":"en";render()},30)});
txt();behaviour();
var lazy=function(id,fn){var el=$(id);if(!el)return;if(!("IntersectionObserver" in window)){fn();return}var o=new IntersectionObserver(function(es){if(es[0].isIntersecting){o.disconnect();fn()}},{rootMargin:"300px"});o.observe(el)};
lazy("mapRing",function(){ringMap()});lazy("mapNtl",ntlMap);lazy("mapCtx",ctxMap);
window.XM={ring:function(){return RS},ntl:function(){return NS},ctx:function(){return CS}};
})();
