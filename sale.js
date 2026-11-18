"use strict";
/* Asking-price points for sale (Guland map markers): Ho Chi Minh City, Binh Duong, Ba Ria-Vung Tau, Hanoi. Canvas layer, lazy loaded. */
(function(){
var Lf=window.L,N=window.NET,D=window.DATA,$=function(i){return document.getElementById(i)};
if(!Lf||!$("mapSale"))return;
var L=document.documentElement.lang==="vi"?"vi":"en";try{var s0=localStorage.getItem("lang");if(s0==="vi"||s0==="en")L=s0}catch(e){}
var T={en:{h:"Asking prices for sale and rent: the enlarged Ho Chi Minh City, Binh Duong, Vung Tau and Hanoi",mode:"Listing type:",m_sale:"For sale",m_rent:"For rent",proj:"Real-estate projects",ps_a:"On sale",ps_u:"Upcoming",ps_l:"Permit stage",ps_s:"Resale / handed over",pdev:"Developer",phand:"Handover",nproj:"Projects shown",projnote:"",
p:"Each dot is one listing collected in October 2026, coloured by asking price per m² (sale: million VND per m²; rent: thousand VND per m² per month). Switch between sale and rent, choose an area, filter by property type, zoom in and click a dot. The default view covers the enlarged Ho Chi Minh City after the 2025 merger: the old city, Binh Duong and Ba Ria–Vung Tau.",
city:"Area:",c_hcm:"Ho Chi Minh City (old boundary)",c_ext:"Enlarged HCMC (HCM + Binh Duong + Vung Tau)",c_bd:"Binh Duong",c_brvt:"Ba Ria–Vung Tau",c_hn:"Hanoi",
type:"Type:",t_all:"All",t_n:"Houses",t_d:"Land",t_c:"Apartments",t_o:"Other",t_v:"Office / commercial",t_k:"Warehouse / factory",t_t:"Boarding house / room",t_h:"Hotel",stn:"Metro stations",
n:"Listings shown",med:"Median",iqr:"Middle half",asof:"Collected up to",unit:"million VND/m²",unitR:"thousand VND/m²/month",legR:"Rent per m² per month (thousand VND), classes by quantile of the area",rent_tot:"Rent",rent_m:"million VND/month",
legt:"Price per m² (million VND), classes by quantile of the area",
pop_t:"Type",pop_s:"Source",pop_p:"Asking price",pop_u:"million VND/m²",
note:"Asking prices, not transaction prices. Sources: Guland, Chợ Tốt (Oct 2026).",
noteR:"Asking rents, not rents paid. Sources: Guland, Chợ Tốt (Oct 2026).",
load:"Loading…"},
vi:{h:"Giá rao bán và giá thuê: TP.HCM mở rộng, Bình Dương, Vũng Tàu và Hà Nội",mode:"Loại tin:",m_sale:"Rao bán",m_rent:"Cho thuê",proj:"Dự án bất động sản",ps_a:"Đang mở bán",ps_u:"Sắp mở bán",ps_l:"Xin cấp phép",ps_s:"Hàng thứ cấp / đã bàn giao",pdev:"Chủ đầu tư",phand:"Bàn giao",nproj:"Số dự án hiển thị",projnote:"",
p:"Mỗi chấm là một tin thu thập trong tháng 10/2026, tô màu theo giá rao trên m² (bán: triệu đồng/m²; thuê: nghìn đồng/m²/tháng). Chuyển giữa bán và thuê, chọn khu vực, lọc loại bất động sản, phóng to và bấm vào chấm. Mặc định hiển thị TP.HCM mở rộng sau sáp nhập 2025: TP.HCM cũ, Bình Dương và Bà Rịa–Vũng Tàu.",
city:"Khu vực:",c_hcm:"TP.HCM (ranh giới cũ)",c_ext:"TP.HCM mở rộng (HCM + Bình Dương + Vũng Tàu)",c_bd:"Bình Dương",c_brvt:"Bà Rịa–Vũng Tàu",c_hn:"Hà Nội",
type:"Loại:",t_all:"Tất cả",t_n:"Nhà",t_d:"Đất",t_c:"Căn hộ",t_o:"Khác",t_v:"Văn phòng / mặt bằng",t_k:"Kho, nhà xưởng",t_t:"Nhà trọ / phòng trọ",t_h:"Khách sạn",stn:"Ga metro",
n:"Số tin hiển thị",med:"Trung vị",iqr:"Nửa giữa",asof:"Thu thập đến",unit:"triệu đồng/m²",unitR:"nghìn đồng/m²/tháng",legR:"Giá thuê trên m² mỗi tháng (nghìn đồng), chia lớp theo phân vị của khu vực",rent_tot:"Giá thuê",rent_m:"triệu đồng/tháng",
legt:"Giá trên m² (triệu đồng), chia lớp theo phân vị của khu vực",
pop_t:"Loại",pop_s:"Nguồn",pop_p:"Giá rao",pop_u:"triệu đồng/m²",
note:"Là giá rao, không phải giá giao dịch. Nguồn: Guland, Chợ Tốt (10/2026).",
noteR:"Là giá thuê rao, không phải giá thực trả. Nguồn: Guland, Chợ Tốt (10/2026).",
load:"Đang tải…"}};
var TY={n:{en:"House",vi:"Nhà"},d:{en:"Land",vi:"Đất"},c:{en:"Apartment",vi:"Căn hộ"},v:{en:"Office / commercial space",vi:"Văn phòng / mặt bằng"},k:{en:"Warehouse / factory",vi:"Kho, nhà xưởng"},t:{en:"Boarding house / room",vi:"Nhà trọ / phòng trọ"},h:{en:"Hotel",vi:"Khách sạn"},o:{en:"Other",vi:"Khác"}};
var VIEW={hcm:[[10.80,106.72],10],ext:[[10.85,106.95],9],bd:[[11.10,106.70],10],brvt:[[10.50,107.25],10],hn:[[21.02,105.84],10]};
var COL=["#2c7bb6","#00a6ca","#66c2a5","#fee08b","#f46d43","#a50026"];
var AF={pmin:null,pmax:null,dmax:null,src:"all",col:"price",sz:1,al:.8},ALL=[];
var TI={n:0,d:1,c:2,v:3,k:4,t:5,h:6,o:7},TCL=["#2c7bb6","#f59e0b","#16a34a","#8b5cf6","#64748b","#ec4899","#14b8a6","#9ca3af"],TKS=["n","d","c","v","k","t","h","o"];
function sl(){return cur==="hn"?(N&&N.hnStations||[]):(D&&D.stations||[])}
function advF(a){var s=AF,S=s.dmax!=null?sl():null;
 return a.filter(function(p){if(s.pmin!=null&&p[2]<s.pmin)return false;if(s.pmax!=null&&p[2]>s.pmax)return false;
  if(s.src!=="all"&&md==="sale"){var c=p[4]==="c";if(s.src==="ct"?!c:c)return false}
  if(S){if(p._d==null){var b=1e12;for(var i=0;i<S.length;i++){var d=Geo.hav(p[0],p[1],S[i].lat,S[i].lng);if(d<b)b=d}p._d=b}if(p._d>s.dmax)return false}
  return true})}
function refresh(){pts=advF(ty==="all"?ALL:ALL.filter(function(p){return p[3]===ty}));if(layer)layer.draw();stats();legend()}
var nf=function(x,k){if(x==null||isNaN(x))return"–";var s=(+x).toFixed(k==null?1:k);return L==="vi"?s.replace(".",","):s};
var PROJ=null,PL=null,PCOL={a:"#16a34a",u:"#f59e0b",l:"#8b5cf6",s:"#64748b"},CACHE={},md="sale",cur="ext",ty="all",map,layer,stn,G,pts=[],brk=[];
function q(a,p){var i=(a.length-1)*p,lo=Math.floor(i),hi=Math.ceil(i);return a[lo]+(a[hi]-a[lo])*(i-lo)}
function get(k){var key=md+k;if(CACHE[key])return Promise.resolve(CACHE[key]);return fetch("data/"+md+"_"+k+".json").then(function(r){return r.json()}).then(function(j){CACHE[key]=j;return j})}
function load(c){var ks=c==="ext"?["hcm","bd","brvt"]:[c];return Promise.all(ks.map(get)).then(function(a){return{p:[].concat.apply([],a.map(function(x){return x.p})),asof:a.map(function(x){return x.asof}).sort().pop()}})}
function cls(v){var i=0;while(i<brk.length&&v>brk[i])i++;return i}
var CL=Lf.Layer.extend({onAdd:function(m){this._m=m;var c=this._c=Lf.DomUtil.create("canvas","leaflet-zoom-hide");c.style.pointerEvents="none";m.getPanes().overlayPane.appendChild(c);m.on("moveend zoomend resize",this.draw,this);this.draw()},
 onRemove:function(m){m.off("moveend zoomend resize",this.draw,this);Lf.DomUtil.remove(this._c)},
 draw:function(){var m=this._m,c=this._c,s=m.getSize(),dpr=window.devicePixelRatio||1;c.width=s.x*dpr;c.height=s.y*dpr;c.style.width=s.x+"px";c.style.height=s.y+"px";
  Lf.DomUtil.setPosition(c,m.containerPointToLayerPoint([0,0]));var x=c.getContext("2d");x.setTransform(dpr,0,0,dpr,0,0);x.clearRect(0,0,s.x,s.y);
  var z=m.getZoom(),r=(z>=14?4.5:z>=12?3.4:z>=10?2.5:1.9)*AF.sz,b=m.getBounds().pad(.05),by=[[],[],[],[],[],[],[],[]],ct=AF.col==="type";
  for(var i=0;i<pts.length;i++){var p=pts[i];if(p[0]<b.getSouth()||p[0]>b.getNorth()||p[1]<b.getWest()||p[1]>b.getEast())continue;by[ct?(TI[p[3]]||0):cls(p[2])].push(p)}
  x.globalAlpha=AF.al;for(var k=0;k<8;k++){x.fillStyle=ct?TCL[k]:COL[k];x.beginPath();by[k].forEach(function(p){var q=m.latLngToContainerPoint([p[0],p[1]]);x.moveTo(q.x+r,q.y);x.arc(q.x,q.y,r,0,6.2832)});x.fill()}}});
function stats(){var t=T[L],v=pts.map(function(p){return p[2]}).sort(function(a,b){return a-b}),n=v.length;
 $("saleInfo").innerHTML="<div class='big'>"+n.toLocaleString(L==="vi"?"vi-VN":"en-US")+"</div><div><small>"+t.n+"</small></div>"+(n?"<div style='margin-top:10px'><small>"+t.med+"</small><b>"+nf(q(v,.5))+"</b> <small>"+(md==="rent"?t.unitR:t.unit)+"</small></div><div><small>"+t.iqr+"</small><b>"+nf(q(v,.25))+" – "+nf(q(v,.75))+"</b></div>":"")+"<div style='margin-top:10px'><small>"+t.asof+" "+(CUR_ASOF||"")+"</small></div>"}
var CUR_ASOF="";
function legend(){var t=T[L];if(AF.col==="type"){var pr={};pts.forEach(function(p){pr[p[3]]=1});$("saleLg").innerHTML="<b>"+(L==="vi"?"Loại tài sản":"Property type")+"</b><br>"+TKS.filter(function(k){return pr[k]}).map(function(k){return"<span><i style='background:"+TCL[TI[k]]+"'></i>"+TY[k][L]+"</span>"}).join("");return}var h="<b>"+(md==="rent"?t.legR:t.legt)+"</b><br>";var e=[0].concat(brk);for(var i=0;i<6;i++){h+="<span><i style='background:"+COL[i]+"'></i>"+(i===0?"≤ "+nf(brk[0]):i===5?"> "+nf(brk[4]):nf(brk[i-1])+" – "+nf(brk[i]))+"</span>"}$("saleLg").innerHTML=h}
function apply(){var t=T[L];$("saleLoad").textContent=t.load;$("saleNote").setAttribute("data-s",md==="rent"?"noteR":"note");txt();
 load(cur).then(function(d){CUR_ASOF=d.asof;var all=d.p,v=all.map(function(p){return p[2]}).sort(function(a,b){return a-b});
  brk=[.1,.3,.5,.7,.9].map(function(p){return +q(v,p).toFixed(1)});
  ALL=all;pts=advF(ty==="all"?all:all.filter(function(p){return p[3]===ty}));
  $("saleLoad").textContent="";if(!layer){layer=new CL();layer.addTo(map)}else layer.draw();stats();legend();stnDraw();projDraw()})}
function projGet(){if(PROJ)return Promise.resolve(PROJ);return fetch("data/projects.json").then(function(r){return r.json()}).then(function(j){PROJ=j;return j})}
function projDraw(){PL.clearLayers();if(!$("saleProj").checked){projStat(0);return}
 projGet().then(function(j){var ks=cur==="ext"?["hcm","bd","brvt"]:[cur],n=0,t=T[L];
  ks.forEach(function(k){(j.p[k]||[]).forEach(function(r){n++;
   var m=Lf.circleMarker([r[0],r[1]],{renderer:PR,radius:5.5,color:"#0f172a",weight:1.2,fillColor:PCOL[r[3]],fillOpacity:.95,bubblingMouseEvents:false});
   m.bindPopup("<b>"+esc(r[2])+"</b><br><small>"+t["ps_"+r[3]]+(r[4]?" · "+esc(r[4]):"")+"</small>"+(r[5]?"<br><small>"+t.pdev+": "+esc(r[5])+"</small>":"")+(r[6]?"<br><small>"+t.phand+": "+esc(r[6])+"</small>":""));
   m.addTo(PL)})});projStat(n)})}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function projStat(n){PN=n;var t=T[L],el=$("saleProjLg");if(!el)return;el.innerHTML=n?"<b>"+t.nproj+": "+n.toLocaleString(L==="vi"?"vi-VN":"en-US")+"</b> "+["a","u","l","s"].map(function(k){return"<span><i style='background:"+PCOL[k]+";border:1px solid #0f172a'></i>"+t["ps_"+k]+"</span>"}).join(" "):""}
var PN=0,PR=null;
function stnDraw(){stn.clearLayers();if(!$("saleStn").checked)return;
 var list=[];if(cur==="hcm"||cur==="ext")list=(D&&D.stations||[]).map(function(s){return{lat:s.lat,lng:s.lng,n:L==="vi"?s.vi:s.en}});if(cur==="hn")list=(N&&N.hnStations||[]);
 list.forEach(function(s){Geo.stMarker(s.lat,s.lng,{color:"#111827",sm:true}).bindTooltip(s.n,{className:"stl",direction:"right",offset:[0,0]}).addTo(stn)})}
function go(){var v=VIEW[cur];map.setView(v[0],v[1]);apply()}
function init(){map=Lf.map($("mapSale"),{minZoom:8,zoomAnimation:false}).setView(VIEW.ext[0],VIEW.ext[1]);
 G=Geo.init(map,"hcm",{nolegend:true});try{if(G&&G.dist)map.removeLayer(G.dist);if(G&&G.lines)map.removeLayer(G.lines)}catch(e){}
 stn=Lf.layerGroup().addTo(map);PR=Lf.canvas({padding:.5});PL=Lf.layerGroup().addTo(map);$("saleProj").addEventListener("change",projDraw);
 $("saleMode").addEventListener("change",function(){md=this.value;apply()});$("saleCity").value=cur;$("saleCity").addEventListener("change",function(){cur=this.value;go()});$("saleType").addEventListener("change",function(){ty=this.value;apply()});$("saleStn").addEventListener("change",stnDraw);
 map.on("click",function(e){if(!pts.length)return;var best=null,bd=1e9,c=map.latLngToContainerPoint(e.latlng);
  for(var i=0;i<pts.length;i++){var p=pts[i];if(Math.abs(p[0]-e.latlng.lat)>.01||Math.abs(p[1]-e.latlng.lng)>.01)continue;var q=map.latLngToContainerPoint([p[0],p[1]]),d=Math.hypot(q.x-c.x,q.y-c.y);if(d<bd){bd=d;best=p}}
  if(best&&bd<=14){var t=T[L];Lf.popup().setLatLng([best[0],best[1]]).setContent(md==="rent"?"<b>"+nf(best[2])+"</b> "+t.unitR+"<br><small>"+t.rent_tot+": "+nf(best[4],1)+" "+t.rent_m+" · "+t.pop_t+": "+TY[best[3]][L]+"</small>":"<b>"+nf(best[2])+"</b> "+t.pop_u+"<br><small>"+t.pop_t+": "+TY[best[3]][L]+" · "+t.pop_s+": "+(best[4]==="c"?"Chợ Tốt":"Guland")+"</small>").openOn(map)}});
 AdvUI.mount("saleAdv",{title:{en:"Advanced options",vi:"Tùy chọn nâng cao"},state:AF,onChange:refresh,groups:[
  {t:{en:"Price (million VND/m² for sale; per month for rent)",vi:"Giá (triệu đồng/m² khi bán; theo tháng khi thuê)"},f:[{k:"pmin",t:"num",l:{en:"From",vi:"Từ"},step:1},{k:"pmax",t:"num",l:{en:"To",vi:"Đến"},step:1}]},
  {t:{en:"Location and source",vi:"Vị trí và nguồn"},f:[{k:"dmax",t:"num",l:{en:"Max distance to nearest station (m)",vi:"Cách ga gần nhất tối đa (m)"},step:100,ph:{en:"no limit",vi:"không giới hạn"}},{k:"src",t:"sel",l:{en:"Source (sale only)",vi:"Nguồn (chỉ tin bán)"},o:[["all",{en:"All",vi:"Tất cả"}],["gl",{en:"Guland",vi:"Guland"}],["ct",{en:"Chợ Tốt",vi:"Chợ Tốt"}]]}]},
  {t:{en:"Display",vi:"Hiển thị"},f:[{k:"col",t:"sel",l:{en:"Colour by",vi:"Tô màu theo"},o:[["price",{en:"Price class",vi:"Nhóm giá"}],["type",{en:"Property type",vi:"Loại tài sản"}]]},{k:"sz",t:"rng",l:{en:"Point size",vi:"Cỡ điểm"},min:.5,max:2.5,step:.1},{k:"al",t:"rng",l:{en:"Opacity",vi:"Độ đậm"},min:.3,max:1,step:.05}]}]});
 apply()}
function txt(){var t=T[L];document.querySelectorAll("[data-s]").forEach(function(n){var k=n.getAttribute("data-s");if(t[k]!=null)n.textContent=t[k]});
 ["c_hcm","c_ext","c_bd","c_brvt","c_hn"].forEach(function(k){var o=document.querySelector("#saleCity option[value='"+k.slice(2)+"']");if(o)o.textContent=t[k]});
 ["sale","rent"].forEach(function(k){var o=document.querySelector("#saleMode option[value='"+k+"']");if(o)o.textContent=t["m_"+k]});
 ["all","n","d","c","v","k","t","h","o"].forEach(function(k){var o=document.querySelector("#saleType option[value='"+k+"']");if(o)o.textContent=t["t_"+k]})}
var lb=$("lang");if(lb)lb.addEventListener("click",function(){setTimeout(function(){L=document.documentElement.lang==="vi"?"vi":"en";txt();if(map){stats();legend();stnDraw();projStat(PN)}},40)});
txt();
var el=$("mapSale");if("IntersectionObserver" in window){var o=new IntersectionObserver(function(es){if(es[0].isIntersecting){o.disconnect();init()}},{rootMargin:"300px"});o.observe(el)}else init();
window.XSALE=function(){return{map:map,n:pts.length}};
})();
