"use strict";
/* Asking-price points for sale (Guland map markers): Ho Chi Minh City, Binh Duong, Ba Ria-Vung Tau, Hanoi. Canvas layer, lazy loaded. */
(function(){
var Lf=window.L,N=window.NET,D=window.DATA,$=function(i){return document.getElementById(i)};
if(!Lf||!$("mapSale"))return;
var L=document.documentElement.lang==="vi"?"vi":"en";try{var s0=localStorage.getItem("lang");if(s0==="vi"||s0==="en")L=s0}catch(e){}
var T={en:{h:"Asking prices for sale and rent: the enlarged Ho Chi Minh City, Binh Duong, Vung Tau and Hanoi",mode:"Listing type:",m_sale:"For sale",m_rent:"For rent",
p:"Each dot is one listing collected in October 2026, coloured by asking price per m² (sale: million VND per m²; rent: thousand VND per m² per month). Switch between sale and rent, choose an area, filter by property type, zoom in and click a dot. The default view covers the enlarged Ho Chi Minh City after the 2025 merger: the old city, Binh Duong and Ba Ria–Vung Tau.",
city:"Area:",c_hcm:"Ho Chi Minh City (old boundary)",c_ext:"Enlarged HCMC (HCM + Binh Duong + Vung Tau)",c_bd:"Binh Duong",c_brvt:"Ba Ria–Vung Tau",c_hn:"Hanoi",
type:"Type:",t_all:"All",t_n:"Houses",t_d:"Land",t_c:"Apartments",t_o:"Other",stn:"Metro stations",
n:"Listings shown",med:"Median",iqr:"Middle half",asof:"Collected up to",unit:"million VND/m²",unitR:"thousand VND/m²/month",legR:"Rent per m² per month (thousand VND), classes by quantile of the area",rent_tot:"Rent",rent_m:"million VND/month",
legt:"Price per m² (million VND), classes by quantile of the area",
pop_t:"Type",pop_p:"Asking price",pop_u:"million VND/m²",
note:"Asking prices, not transaction prices. Source: Guland map markers, collected 25–27 Oct 2026 (the thesis estimation sample is frozen at 25 Oct; later collection is holdout and is not used for estimation). Cleaning: unit ‘nghìn/m²’ converted to million, kept 0.3–1,000 million VND/m², duplicate coordinates removed. Positions are marker coordinates and may be approximate; no titles, descriptions or seller data are shown. Coverage is incomplete and uneven; the dots are not a random sample, so use them to see where prices are, not to infer an average. Guland’s terms of use have not been checked.",
noteR:"Asking rents, not rents actually paid. Sources: Chợ Tốt (25 Oct 2026; Ho Chi Minh City and Hanoi, apartments and houses) and Guland rental list (27 Oct 2026; includes Binh Duong and Ba Ria–Vung Tau). Rent per m² = monthly rent ÷ floor area, kept 10–3,000 thousand VND/m²/month and 8–3,000 m². Binh Duong and Vung Tau rent points are few because many Guland records had unusable coordinates; read those two areas with caution. Positions can be approximate; no titles, descriptions or poster data are shown. Dots are not a random sample, and rent mixes housing with shops, warehouses and land, so use filters. Data after 25 Oct is holdout, not used for estimation. Guland’s terms of use have not been checked.",
load:"Loading…"},
vi:{h:"Giá rao bán và giá thuê: TP.HCM mở rộng, Bình Dương, Vũng Tàu và Hà Nội",mode:"Loại tin:",m_sale:"Rao bán",m_rent:"Cho thuê",
p:"Mỗi chấm là một tin thu thập trong tháng 10/2026, tô màu theo giá rao trên m² (bán: triệu đồng/m²; thuê: nghìn đồng/m²/tháng). Chuyển giữa bán và thuê, chọn khu vực, lọc loại bất động sản, phóng to và bấm vào chấm. Mặc định hiển thị TP.HCM mở rộng sau sáp nhập 2025: TP.HCM cũ, Bình Dương và Bà Rịa–Vũng Tàu.",
city:"Khu vực:",c_hcm:"TP.HCM (ranh giới cũ)",c_ext:"TP.HCM mở rộng (HCM + Bình Dương + Vũng Tàu)",c_bd:"Bình Dương",c_brvt:"Bà Rịa–Vũng Tàu",c_hn:"Hà Nội",
type:"Loại:",t_all:"Tất cả",t_n:"Nhà",t_d:"Đất",t_c:"Căn hộ",t_o:"Khác",stn:"Ga metro",
n:"Số tin hiển thị",med:"Trung vị",iqr:"Nửa giữa",asof:"Thu thập đến",unit:"triệu đồng/m²",unitR:"nghìn đồng/m²/tháng",legR:"Giá thuê trên m² mỗi tháng (nghìn đồng), chia lớp theo phân vị của khu vực",rent_tot:"Giá thuê",rent_m:"triệu đồng/tháng",
legt:"Giá trên m² (triệu đồng), chia lớp theo phân vị của khu vực",
pop_t:"Loại",pop_p:"Giá rao",pop_u:"triệu đồng/m²",
note:"Là giá rao, không phải giá giao dịch. Nguồn: điểm bản đồ Guland, thu thập 25–27/10/2026 (mẫu ước lượng của luận văn đóng băng ngày 25/10; dữ liệu thu sau đó là holdout và không dùng để ước lượng). Làm sạch: đơn vị ‘nghìn/m²’ đổi sang triệu, giữ 0,3–1.000 triệu đồng/m², bỏ tọa độ trùng. Vị trí là tọa độ điểm đánh dấu, có thể gần đúng; không hiển thị tiêu đề, mô tả hay dữ liệu người bán. Độ phủ chưa đầy đủ và không đều; các chấm không phải mẫu ngẫu nhiên, nên chỉ dùng để xem giá nằm ở đâu, không để suy ra mức trung bình. Chưa kiểm tra điều khoản sử dụng của Guland.",
noteR:"Là giá thuê rao, không phải giá thuê thực trả. Nguồn: Chợ Tốt (25/10/2026; TP.HCM và Hà Nội, căn hộ và nhà) và danh sách thuê Guland (27/10/2026; có Bình Dương và Bà Rịa–Vũng Tàu). Giá thuê/m² = giá thuê tháng ÷ diện tích, giữ 10–3.000 nghìn đồng/m²/tháng và 8–3.000 m². Điểm thuê ở Bình Dương và Vũng Tàu còn ít do nhiều bản ghi Guland có tọa độ không dùng được; cần thận trọng khi đọc hai khu vực này. Vị trí có thể gần đúng; không hiển thị tiêu đề, mô tả hay dữ liệu người đăng. Các chấm không phải mẫu ngẫu nhiên và giá thuê gồm cả nhà ở, cửa hàng, kho, đất nên hãy dùng bộ lọc. Dữ liệu sau 25/10 là holdout, không dùng để ước lượng. Chưa kiểm tra điều khoản sử dụng của Guland.",
load:"Đang tải…"}};
var TY={n:{en:"House",vi:"Nhà"},d:{en:"Land",vi:"Đất"},c:{en:"Apartment",vi:"Căn hộ"},o:{en:"Other",vi:"Khác"}};
var VIEW={hcm:[[10.80,106.72],10],ext:[[10.85,106.95],9],bd:[[11.10,106.70],10],brvt:[[10.50,107.25],10],hn:[[21.02,105.84],10]};
var COL=["#2c7bb6","#00a6ca","#66c2a5","#fee08b","#f46d43","#a50026"];
var nf=function(x,k){if(x==null||isNaN(x))return"–";var s=(+x).toFixed(k==null?1:k);return L==="vi"?s.replace(".",","):s};
var CACHE={},md="sale",cur="ext",ty="all",map,layer,stn,G,pts=[],brk=[];
function q(a,p){var i=(a.length-1)*p,lo=Math.floor(i),hi=Math.ceil(i);return a[lo]+(a[hi]-a[lo])*(i-lo)}
function get(k){var key=md+k;if(CACHE[key])return Promise.resolve(CACHE[key]);return fetch("data/"+md+"_"+k+".json").then(function(r){return r.json()}).then(function(j){CACHE[key]=j;return j})}
function load(c){var ks=c==="ext"?["hcm","bd","brvt"]:[c];return Promise.all(ks.map(get)).then(function(a){return{p:[].concat.apply([],a.map(function(x){return x.p})),asof:a.map(function(x){return x.asof}).sort().pop()}})}
function cls(v){var i=0;while(i<brk.length&&v>brk[i])i++;return i}
var CL=Lf.Layer.extend({onAdd:function(m){this._m=m;var c=this._c=Lf.DomUtil.create("canvas","leaflet-zoom-hide");c.style.pointerEvents="none";m.getPanes().overlayPane.appendChild(c);m.on("moveend zoomend resize",this.draw,this);this.draw()},
 onRemove:function(m){m.off("moveend zoomend resize",this.draw,this);Lf.DomUtil.remove(this._c)},
 draw:function(){var m=this._m,c=this._c,s=m.getSize(),dpr=window.devicePixelRatio||1;c.width=s.x*dpr;c.height=s.y*dpr;c.style.width=s.x+"px";c.style.height=s.y+"px";
  Lf.DomUtil.setPosition(c,m.containerPointToLayerPoint([0,0]));var x=c.getContext("2d");x.setTransform(dpr,0,0,dpr,0,0);x.clearRect(0,0,s.x,s.y);
  var z=m.getZoom(),r=z>=14?4.5:z>=12?3.4:z>=10?2.5:1.9,b=m.getBounds().pad(.05),by=[[],[],[],[],[],[]];
  for(var i=0;i<pts.length;i++){var p=pts[i];if(p[0]<b.getSouth()||p[0]>b.getNorth()||p[1]<b.getWest()||p[1]>b.getEast())continue;by[cls(p[2])].push(p)}
  x.globalAlpha=.78;for(var k=0;k<6;k++){x.fillStyle=COL[k];x.beginPath();by[k].forEach(function(p){var q=m.latLngToContainerPoint([p[0],p[1]]);x.moveTo(q.x+r,q.y);x.arc(q.x,q.y,r,0,6.2832)});x.fill()}}});
function stats(){var t=T[L],v=pts.map(function(p){return p[2]}).sort(function(a,b){return a-b}),n=v.length;
 $("saleInfo").innerHTML="<div class='big'>"+n.toLocaleString(L==="vi"?"vi-VN":"en-US")+"</div><div><small>"+t.n+"</small></div>"+(n?"<div style='margin-top:10px'><small>"+t.med+"</small><b>"+nf(q(v,.5))+"</b> <small>"+(md==="rent"?t.unitR:t.unit)+"</small></div><div><small>"+t.iqr+"</small><b>"+nf(q(v,.25))+" – "+nf(q(v,.75))+"</b></div>":"")+"<div style='margin-top:10px'><small>"+t.asof+" "+(CUR_ASOF||"")+"</small></div>"}
var CUR_ASOF="";
function legend(){var t=T[L],h="<b>"+(md==="rent"?t.legR:t.legt)+"</b><br>";var e=[0].concat(brk);for(var i=0;i<6;i++){h+="<span><i style='background:"+COL[i]+"'></i>"+(i===0?"≤ "+nf(brk[0]):i===5?"> "+nf(brk[4]):nf(brk[i-1])+" – "+nf(brk[i]))+"</span>"}$("saleLg").innerHTML=h}
function apply(){var t=T[L];$("saleLoad").textContent=t.load;$("saleNote").setAttribute("data-s",md==="rent"?"noteR":"note");txt();
 load(cur).then(function(d){CUR_ASOF=d.asof;var all=d.p,v=all.map(function(p){return p[2]}).sort(function(a,b){return a-b});
  brk=[.1,.3,.5,.7,.9].map(function(p){return +q(v,p).toFixed(1)});
  pts=ty==="all"?all:all.filter(function(p){return p[3]===ty});
  $("saleLoad").textContent="";if(!layer){layer=new CL();layer.addTo(map)}else layer.draw();stats();legend();stnDraw()})}
function stnDraw(){stn.clearLayers();if(!$("saleStn").checked)return;
 var list=[];if(cur==="hcm"||cur==="ext")list=(D&&D.stations||[]).map(function(s){return{lat:s.lat,lng:s.lng,n:L==="vi"?s.vi:s.en}});if(cur==="hn")list=(N&&N.hnStations||[]);
 list.forEach(function(s){Geo.stMarker(s.lat,s.lng,{color:"#111827",sm:true}).bindTooltip(s.n,{className:"stl",direction:"right",offset:[0,0]}).addTo(stn)})}
function go(){var v=VIEW[cur];map.setView(v[0],v[1]);apply()}
function init(){map=Lf.map($("mapSale"),{minZoom:8,zoomAnimation:false}).setView(VIEW.ext[0],VIEW.ext[1]);
 G=Geo.init(map,"hcm",{nolegend:true});try{if(G&&G.dist)map.removeLayer(G.dist);if(G&&G.lines)map.removeLayer(G.lines)}catch(e){}
 stn=Lf.layerGroup().addTo(map);
 $("saleMode").addEventListener("change",function(){md=this.value;apply()});$("saleCity").value=cur;$("saleCity").addEventListener("change",function(){cur=this.value;go()});$("saleType").addEventListener("change",function(){ty=this.value;apply()});$("saleStn").addEventListener("change",stnDraw);
 map.on("click",function(e){if(!pts.length)return;var best=null,bd=1e9,c=map.latLngToContainerPoint(e.latlng);
  for(var i=0;i<pts.length;i++){var p=pts[i];if(Math.abs(p[0]-e.latlng.lat)>.01||Math.abs(p[1]-e.latlng.lng)>.01)continue;var q=map.latLngToContainerPoint([p[0],p[1]]),d=Math.hypot(q.x-c.x,q.y-c.y);if(d<bd){bd=d;best=p}}
  if(best&&bd<=14){var t=T[L];Lf.popup().setLatLng([best[0],best[1]]).setContent(md==="rent"?"<b>"+nf(best[2])+"</b> "+t.unitR+"<br><small>"+t.rent_tot+": "+nf(best[4],1)+" "+t.rent_m+" · "+t.pop_t+": "+TY[best[3]][L]+"</small>":"<b>"+nf(best[2])+"</b> "+t.pop_u+"<br><small>"+t.pop_t+": "+TY[best[3]][L]+"</small>").openOn(map)}});
 apply()}
function txt(){var t=T[L];document.querySelectorAll("[data-s]").forEach(function(n){var k=n.getAttribute("data-s");if(t[k]!=null)n.textContent=t[k]});
 ["c_hcm","c_ext","c_bd","c_brvt","c_hn"].forEach(function(k){var o=document.querySelector("#saleCity option[value='"+k.slice(2)+"']");if(o)o.textContent=t[k]});
 ["sale","rent"].forEach(function(k){var o=document.querySelector("#saleMode option[value='"+k+"']");if(o)o.textContent=t["m_"+k]});
 ["all","n","d","c","o"].forEach(function(k){var o=document.querySelector("#saleType option[value='"+k+"']");if(o)o.textContent=t["t_"+k]})}
var lb=$("lang");if(lb)lb.addEventListener("click",function(){setTimeout(function(){L=document.documentElement.lang==="vi"?"vi":"en";txt();if(map){stats();legend();stnDraw()}},40)});
txt();
var el=$("mapSale");if("IntersectionObserver" in window){var o=new IntersectionObserver(function(es){if(es[0].isIntersecting){o.disconnect();init()}},{rootMargin:"300px"});o.observe(el)}else init();
window.XSALE=function(){return{map:map,n:pts.length}};
})();
