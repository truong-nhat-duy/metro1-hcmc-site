"use strict";
/* "Check any place": nearest station, walking time, bus link and everyday amenities for a point in Vietnam.
   Runs in the browser. A position (from the location service, a menu choice or a map click) is never sent anywhere.
   Walking: pre-computed OpenStreetMap network (120 m grid, up to 3 km from each station), else straight line x detour.
   Bus: ride time = distance along the stops / assumed speed; wait = half the OSM "interval" tag. No GTFS timetable is used. */
(function(){
var Lf=window.L,N=window.NET;if(!Lf||!N||!document.getElementById("mapConn"))return;
var L="en";try{var s0=localStorage.getItem("lang");if(s0==="vi"||s0==="en")L=s0;else if((navigator.language||"").slice(0,2)==="vi")L="vi"}catch(e){}
var T={en:{
nav_conn:"Check a place",h:"Check any place: how it connects to the metro",
p:"Pick a place in Vietnam and see the nearest metro station, the walk to it, a bus that links to it, and the everyday amenities within a short walk. Use the menus to move to any province, so you can compare neighbouring areas.",
warn:"Illustration, not a timetable. Walking: shortest path on the OpenStreetMap walking network, snapped to a 120 m grid (about ±100 m) and limited to 3 km from a station; beyond that, straight line × a detour factor. Bus: ride time = distance along the route’s stops ÷ an assumed speed; waiting = half the OSM “interval” tag where it exists (completeness not verified). No GTFS exists, so transfers, congestion and real departure times are not modelled. Metro headways are not in OSM and are not included. Amenities come from OpenStreetMap and are incomplete, especially outside big cities. Your position stays in your browser.",
s1:"Pick a place",s1h:"Or click anywhere on the map.",s2:"Walking time to check",s3:"Read the result",s3h:"Results appear beside the map.",
locate:"Use my location",clear:"Clear",goprov:"Go to a province…",gostn:"Go to a metro station…",min:" min",
adv:"Map layers and advanced settings",lay:"Map layers",g_metro:"Metro and rail",g_road:"Roads",g_bnd:"Boundaries",g_bus:"Bus",g_am:"Amenities (zoom in to see)",g_poi:"Key facilities",set:"Settings",
l_stn:"Metro stations",l_rail:"Railways and metro lines",l_road:"Ring roads and expressways",l_prov:"34 provinces (from 1 Jul 2025)",l_gadm:"63 provinces (GADM, before merger)",l_bus:"Bus routes",l_poi:"Airports, universities, hospitals, malls",a0:"Schools",a1:"Health care",a2:"Parks",a3:"Shops and markets",a4:"Bus stops",
speed:"Walking speed (km/h)",detour:"Detour factor",bspd:"Bus speed (km/h)",busr:"Bus stop within",latlng:"Latitude, longitude (e.g. 10.8412, 106.8098)",go:"Go",
loading:"Loading…",err:"Could not load this layer. Serve the folder over http(s).",zoomin:"Zoom in to see amenities.",
geo_off:"Your browser has no location service.",geo_deny:"Location was not shared. Click the map or use a menu instead.",geo_wait:"Waiting for your browser…",
pick:"Choose a place with the buttons or click the map.",
r_out:"outside the 34 provinces drawn",r_old:"before merger (GADM)",
k_metro:"Nearest metro station",k_bus:"Bus link to a station",k_am:"Everyday needs within a short walk",
walk_net:"on the walking network",walk_est:"estimated (straight line × detour)",
no_stn:"No metro station in the project’s tables within 100 km.",near_far:"No station within 3 km. The nearest is",away:"away",ring_in:"Distance ring of Line 1:",ring_n:["≤500 m (ring 1)","500–800 m (ring 2)","800–1,200 m (ring 3)","1,200–2,000 m (ring 4)",">2,000 m (outside rings)"],
min_walk:"min walk",m_:"m",
bus_none:"No OpenStreetMap bus route links a stop within the chosen distance to a stop within 400 m of a station. OSM bus data are incomplete: this is not proof that no service exists.",
bus_tot:"min door to station",bus_parts:"walk {a} + wait {w} + ride {r} + walk {b}",bus_nowait:"headway unknown, wait not included",
am:["Schools","Health care","Parks","Shops and markets","Bus stops"],am_in:"within about {m} m (straight line)",am_score:"needs have at least one within reach",am_note:"Counts are OSM features; coverage varies.",
det_st:"All nearby stations",det_bus:"Bus routes to a station",det_hub:"Key facilities within 5 km",
c_stn:"Station",c_line:"Line",c_st:"Status",c_d:"Straight line (m)",c_w:"Walk (m)",c_t:"Walk (min)",c_src:"Basis",c_ring:"Ring",c_nm:"Name",c_ty:"Type",
c_rt:"Route",c_walk1:"Walk to stop (m)",c_stops:"Stops",c_ride:"Ride (min)",c_hw:"Headway (min)",c_wait:"Wait (min)",c_to:"Alight near",c_walk2:"Walk to station (m)",c_tot:"Door to station (min)",
net:"network",est:"estimate",nohw:"n/a",tot_note:"Total = walk + wait + ride + walk. Where the headway is missing, a 10-minute wait is assumed only for ranking.",
op:"Operating",uc:"Under construction",pl:"Planned / unassigned",
hub:{air:"Airport",rail:"Railway station",metro:"Metro station",busst:"Bus terminal",uni:"University",hosp:"Hospital",attr:"Attraction",mall:"Mall"},
src:"Sources: OpenStreetMap contributors (ODbL; extract of 10 Oct 2026), GADM 4.1 (non-commercial use), the project’s station table. Walking grid, bus headways and amenities are derived from OpenStreetMap."},
vi:{
nav_conn:"Kiểm tra một nơi",h:"Kiểm tra một nơi bất kỳ: nối với metro ra sao",
p:"Chọn một nơi ở Việt Nam để xem ga metro gần nhất, quãng đi bộ tới ga, tuyến buýt nối với ga và các tiện ích hằng ngày trong tầm đi bộ. Dùng các danh sách để chuyển sang bất kỳ tỉnh nào, so sánh các khu vực lân cận.",
warn:"Chỉ để minh họa, không phải lịch chạy. Đi bộ: đường ngắn nhất trên mạng đi bộ OpenStreetMap, gán vào lưới 120 m (sai số khoảng ±100 m) và giới hạn 3 km quanh ga; xa hơn thì dùng đường chim bay × hệ số đường vòng. Buýt: thời gian đi xe = chiều dài dọc các trạm của tuyến ÷ tốc độ giả định; thời gian chờ = một nửa thẻ “interval” của OSM nếu có (chưa kiểm tra độ đầy đủ). Không có GTFS nên chưa mô hình hóa chuyển tuyến, kẹt xe và giờ xuất bến thực. Giãn cách metro không có trong OSM nên không tính. Tiện ích lấy từ OpenStreetMap, chưa đầy đủ, nhất là ngoài các thành phố lớn. Vị trí của bạn chỉ nằm trong trình duyệt.",
s1:"Chọn một nơi",s1h:"Hoặc bấm vào bất kỳ điểm nào trên bản đồ.",s2:"Thời gian đi bộ cần kiểm tra",s3:"Đọc kết quả",s3h:"Kết quả hiện bên cạnh bản đồ.",
locate:"Dùng vị trí của tôi",clear:"Xóa",goprov:"Đến một tỉnh/thành…",gostn:"Đến một ga metro…",min:" phút",
adv:"Lớp bản đồ và thiết lập nâng cao",lay:"Lớp bản đồ",g_metro:"Metro và đường sắt",g_road:"Đường bộ",g_bnd:"Ranh giới",g_bus:"Buýt",g_am:"Tiện ích (phóng to để xem)",g_poi:"Công trình chính",set:"Thiết lập",
l_stn:"Ga metro",l_rail:"Đường sắt và tuyến metro",l_road:"Vành đai và cao tốc",l_prov:"34 tỉnh/thành (từ 1/7/2025)",l_gadm:"63 tỉnh (GADM, trước sáp nhập)",l_bus:"Tuyến buýt",l_poi:"Sân bay, đại học, bệnh viện, trung tâm thương mại",a0:"Trường học",a1:"Y tế",a2:"Công viên",a3:"Cửa hàng và chợ",a4:"Trạm buýt",
speed:"Tốc độ đi bộ (km/h)",detour:"Hệ số đường vòng",bspd:"Tốc độ buýt (km/h)",busr:"Trạm buýt trong vòng",latlng:"Vĩ độ, kinh độ (ví dụ 10.8412, 106.8098)",go:"Đến",
loading:"Đang tải…",err:"Không tải được lớp này. Hãy chạy thư mục qua http(s).",zoomin:"Hãy phóng to để xem tiện ích.",
geo_off:"Trình duyệt không có dịch vụ định vị.",geo_deny:"Bạn chưa chia sẻ vị trí. Hãy bấm vào bản đồ hoặc dùng danh sách.",geo_wait:"Đang chờ trình duyệt…",
pick:"Chọn một nơi bằng các nút hoặc bấm vào bản đồ.",
r_out:"ngoài 34 tỉnh đã vẽ",r_old:"trước sáp nhập (GADM)",
k_metro:"Ga metro gần nhất",k_bus:"Buýt nối với ga",k_am:"Nhu cầu hằng ngày trong tầm đi bộ",
walk_net:"trên mạng đường đi bộ",walk_est:"ước tính (đường chim bay × hệ số đường vòng)",
no_stn:"Không có ga metro nào trong bảng dự án trong vòng 100 km.",near_far:"Không có ga nào trong 3 km. Ga gần nhất là",away:"cách",ring_in:"Vành khoảng cách của Tuyến 1:",ring_n:["≤500 m (vành 1)","500–800 m (vành 2)","800–1.200 m (vành 3)","1.200–2.000 m (vành 4)",">2.000 m (ngoài các vành)"],
min_walk:"phút đi bộ",m_:"m",
bus_none:"Không có tuyến buýt OpenStreetMap nào nối trạm trong khoảng cách đã chọn với trạm trong 400 m quanh một ga. Dữ liệu buýt OSM chưa đầy đủ: điều này không chứng minh là không có dịch vụ.",
bus_tot:"phút từ cửa đến ga",bus_parts:"đi bộ {a} + chờ {w} + đi xe {r} + đi bộ {b}",bus_nowait:"chưa có giãn cách, chưa tính thời gian chờ",
am:["Trường học","Y tế","Công viên","Cửa hàng và chợ","Trạm buýt"],am_in:"trong khoảng {m} m (đường chim bay)",am_score:"nhu cầu có ít nhất một nơi trong tầm",am_note:"Số liệu là đối tượng OSM; độ phủ khác nhau theo nơi.",
det_st:"Các ga gần đó",det_bus:"Tuyến buýt tới ga",det_hub:"Công trình chính trong 5 km",
c_stn:"Ga",c_line:"Tuyến",c_st:"Tình trạng",c_d:"Chim bay (m)",c_w:"Đi bộ (m)",c_t:"Đi bộ (phút)",c_src:"Cơ sở",c_ring:"Vành",c_nm:"Tên",c_ty:"Loại",
c_rt:"Tuyến",c_walk1:"Đi bộ tới trạm (m)",c_stops:"Số trạm",c_ride:"Đi xe (phút)",c_hw:"Giãn cách (phút)",c_wait:"Chờ (phút)",c_to:"Xuống gần",c_walk2:"Đi bộ tới ga (m)",c_tot:"Từ cửa đến ga (phút)",
net:"mạng đường",est:"ước tính",nohw:"chưa có",tot_note:"Tổng = đi bộ + chờ + đi xe + đi bộ. Nếu thiếu giãn cách, chỉ giả định chờ 10 phút để xếp hạng.",
op:"Đang khai thác",uc:"Đang xây dựng",pl:"Quy hoạch / chưa gán tuyến",
hub:{air:"Sân bay",rail:"Ga đường sắt",metro:"Ga metro",busst:"Bến xe",uni:"Đại học",hosp:"Bệnh viện",attr:"Điểm tham quan",mall:"Trung tâm thương mại"},
src:"Nguồn: OpenStreetMap contributors (ODbL; bản trích 10/10/2026), GADM 4.1 (chỉ dùng phi thương mại), bảng ga của dự án. Lưới đi bộ, giãn cách buýt và tiện ích suy ra từ OpenStreetMap."}};
var $=function(id){return document.getElementById(id)};
function nf(x,k){var s=(+x).toFixed(k==null?0:k);return L==="vi"?s.replace(".",","):s}
function fi(x){return Math.round(x).toLocaleString(L==="vi"?"vi-VN":"en-US")}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function hav(a,b,c,d){var R=6371008.8,p=Math.PI/180,x=Math.sin((c-a)*p/2),y=Math.sin((d-b)*p/2),h=x*x+Math.cos(a*p)*Math.cos(c*p)*y*y;return 2*R*Math.asin(Math.sqrt(h))}
var map=Lf.map("mapConn",{preferCanvas:true}).setView([16.2,106.2],6);
Lf.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap contributors"}).addTo(map);
var cv=Lf.canvas({padding:.3});
var LAY={},DAT={},PEND={};
var FILES={prov:"data/prov34.json",gadm:"data/gadm1.json",road:"data/roads.json",rail:"data/rail.json",bus:"data/bus_routes.json",poi:"data/poi_vn.json",wg:"data/walkgrid.json",ai:"data/amen_index.json"};
function load(k){if(DAT[k])return Promise.resolve(DAT[k]);if(PEND[k])return PEND[k];
 PEND[k]=fetch(FILES[k]).then(function(r){if(!r.ok)throw new Error(r.status);return r.json()}).then(function(j){DAT[k]=j;return j});return PEND[k]}
/* amenity tiles: 0.5 degree cells, rows [lat,lng,category,sub,name?] */
var TILE={};
function tileKeys(a,b,c,d){var ix=DAT.ai&&DAT.ai.tiles||{},o=[];for(var i=Math.floor(a*2);i<=Math.floor(c*2);i++)for(var j=Math.floor(b*2);j<=Math.floor(d*2);j++){var k=i+"_"+j;if(ix[k])o.push(k)}return o}
function loadTiles(keys){return Promise.all(keys.map(function(k){if(TILE[k])return Promise.resolve(TILE[k]);return fetch("data/amen/"+k+".json").then(function(r){return r.ok?r.json():[]}).catch(function(){return[]}).then(function(j){TILE[k]=j;return j})}))}
function gj(g,st){return Lf.geoJSON({type:"Feature",geometry:g,properties:{}},{style:st,renderer:cv})}
var STY={prov:{color:"#0f3a63",weight:1.4,fill:true,fillOpacity:.03,opacity:.9},gadm:{color:"#b45309",weight:1,dashArray:"4 4",fill:false,opacity:.8},
 rd:{ring:{color:"#7c3aed",weight:3},motorway:{color:"#dc2626",weight:2.6},trunk:{color:"#d97706",weight:1.4}},
 rl:{subway:{color:"#0079b8",weight:3},light_rail:{color:"#0079b8",weight:3},train:{color:"#475569",weight:2,dashArray:"6 4"}}};
function build(k){var g=Lf.featureGroup(),d=DAT[k];
 if(k==="prov"||k==="gadm")d.forEach(function(p){gj(p.g,STY[k]).bindTooltip(esc(p.n),{sticky:true}).addTo(g)});
 if(k==="road")d.forEach(function(r){gj(r.g,STY.rd[r.c]).bindTooltip(esc(r.r),{sticky:true}).addTo(g)});
 if(k==="rail")d.forEach(function(r){gj(r.g,STY.rl[r.k]||STY.rl.train).bindTooltip(esc(r.n||r.ref||r.k),{sticky:true}).addTo(g)});
 if(k==="bus")d.forEach(function(r){if(r.g)gj(r.g,{color:"#16a34a",weight:1.2,opacity:.55}).bindTooltip(esc((r.ref?r.ref+" · ":"")+(r.n||"")),{sticky:true}).addTo(g)});
 if(k==="poi"){var col={air:"#0ea5e9",rail:"#475569",metro:"#0079b8",busst:"#16a34a",uni:"#7c3aed",hosp:"#e11d48",attr:"#d97706",mall:"#db2777"};
  d.forEach(function(p){Lf.circleMarker([p[1],p[0]],{radius:3,color:col[p[2]]||"#334155",weight:1,fillOpacity:.7,renderer:cv}).bindTooltip(esc(p[3]||"")+" · "+(T[L].hub[p[2]]||p[2])).addTo(g)})}
 return g}
/* stations: Ho Chi Minh City table plus Hanoi table */
var ALL=N.hcmStations.map(function(s,i){return{s:s,c:"hcm",i:i}}).filter(function(x){return x.s.line!=="NA"||!N.hcmStations.some(function(q){return q!==x.s&&q.line!=="NA"&&hav(q.lat,q.lng,x.s.lat,x.s.lng)<150})}).filter(function(x,k,arr){return!arr.slice(0,k).some(function(y){return y.s.n===x.s.n&&y.s.line===x.s.line&&hav(y.s.lat,y.s.lng,x.s.lat,x.s.lng)<150})}).concat((N.hnStations||[]).map(function(s,i){return{s:s,c:"hn",i:i}}));
var STNG=Lf.featureGroup(),SC={op:"#0079b8",uc:"#dc2626",pl:"#7c8795"};
ALL.forEach(function(x){var s=x.s;Lf.circleMarker([s.lat,s.lng],{radius:s.st==="op"?5:3.5,color:"#fff",weight:1,fillColor:SC[s.st]||"#0079b8",fillOpacity:1,renderer:cv}).bindTooltip(esc(s.n)+" ("+s.line+")").addTo(STNG)});
/* amenity layers by category, filled from the tiles in view */
var AMC=["#7c3aed","#e11d48","#16a34a","#d97706","#475569"],AMG=[0,1,2,3,4].map(function(){return Lf.featureGroup()}),AMON=[false,false,false,false,false];
function refreshAm(){var z=map.getZoom(),st=$("connLoad");AMG.forEach(function(g){g.clearLayers()});
 if(!AMON.some(Boolean)){st.textContent="";return}if(z<12){st.textContent=T[L].zoomin;return}
 st.textContent=T[L].loading;var b=map.getBounds();
 load("ai").then(function(){return loadTiles(tileKeys(b.getSouth(),b.getWest(),b.getNorth(),b.getEast()))}).then(function(ts){var n=0;
  ts.forEach(function(rows){rows.forEach(function(r){if(!AMON[r[2]]||n>9000)return;if(r[0]<b.getSouth()||r[0]>b.getNorth()||r[1]<b.getWest()||r[1]>b.getEast())return;n++;
   var m=Lf.circleMarker([r[0],r[1]],{radius:3,color:AMC[r[2]],weight:1,fillOpacity:.75,renderer:cv});if(r[4])m.bindTooltip(esc(r[4]));m.addTo(AMG[r[2]])})});
  st.textContent=n>=9000?"9,000+":""}).catch(function(){st.textContent=T[L].err})}
map.on("moveend",function(){if(AMON.some(Boolean))refreshAm()});
var CHK={prov:"cProv",gadm:"cGadm",road:"cRoad",rail:"cRail",bus:"cBus",poi:"cPoi"};
function toggle(k){var on=$(CHK[k]).checked,st=$("connLoad");
 if(!on){if(LAY[k])map.removeLayer(LAY[k]);return}
 st.textContent=T[L].loading;
 load(k).then(function(){if(!LAY[k])LAY[k]=build(k);if($(CHK[k]).checked)LAY[k].addTo(map);st.textContent=""}).catch(function(){st.textContent=T[L].err;$(CHK[k]).checked=false})}
Object.keys(CHK).forEach(function(k){$(CHK[k]).addEventListener("change",function(){toggle(k)})});
$("cStn").addEventListener("change",function(){if($("cStn").checked)STNG.addTo(map);else map.removeLayer(STNG)});
["cA0","cA1","cA2","cA3","cA4"].forEach(function(id,i){$(id).addEventListener("change",function(){AMON[i]=$(id).checked;refreshAm()})});
AMG.forEach(function(g){g.addTo(map)});
STNG.addTo(map);

/* ---- analysis ---- */
var PIN=null,RG=Lf.featureGroup().addTo(map),HL=null,MIN=10,SEQ=0;
function ringIdx(d){return d<=500?0:d<=800?1:d<=1200?2:d<=2000?3:4}
function inRing(pt,ring){var x=pt[0],y=pt[1],c=false;for(var i=0,j=ring.length-1;i<ring.length;j=i++){var xi=ring[i][0],yi=ring[i][1],xj=ring[j][0],yj=ring[j][1];if(((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi))c=!c}return c}
function inGeom(pt,g){var P=g.type==="Polygon"?[g.coordinates]:g.coordinates;for(var k=0;k<P.length;k++){if(inRing(pt,P[k][0])){var hole=false;for(var h=1;h<P[k].length;h++)if(inRing(pt,P[k][h]))hole=true;if(!hole)return true}}return false}
function which(list,lat,lng){for(var i=0;i<list.length;i++)if(inGeom([lng,lat],list[i].g))return list[i].n;return null}
function tbl(head,rows){return"<div class='tw'><table><thead><tr>"+head.map(function(h){return"<th>"+h+"</th>"}).join("")+"</tr></thead><tbody>"+rows.map(function(r){return"<tr>"+r.map(function(c){return"<td>"+c+"</td>"}).join("")+"</tr>"}).join("")+"</tbody></table></div>"}
function prm(){return{v:Math.max(2,+$("cSpd").value||4.8),f:Math.max(1,+$("cDet").value||1.3),br:+$("cBr").value||400,b:Math.max(5,+$("cBs").value||15)}}
function walkMin(d,p){return d/(p.v*1000/60)}
function wmet(wg,c,idx,lat,lng){var g=wg&&wg[c];if(!g)return null;var i=Math.floor((lat-g.o[0])/g.d[0]),j=Math.floor((lng-g.o[1])/g.d[1]);
 if(!g.m){g.m={};g.r.forEach(function(r){g.m[r[0]*100000+r[1]]=r})}
 var r=g.m[i*100000+j];if(!r)return null;for(var k=2;k<r.length;k+=2)if(r[k]===idx)return r[k+1]*10;return null}
function card(cls,k,body){return"<div class='rc "+cls+"'><small>"+T[L][k]+"</small>"+body+"</div>"}
function analyse(lat,lng){PIN=[lat,lng];var my=++SEQ,t=T[L],p=prm();
 RG.clearLayers();Lf.marker([lat,lng]).addTo(RG);
 var WG=DAT.wg||null;
 var st=ALL.map(function(x){var d=hav(lat,lng,x.s.lat,x.s.lng),w=wmet(WG,x.c,x.i,lat,lng);return{s:x.s,c:x.c,d:d,net:w!=null,wm:w!=null?w:d*p.f}}).sort(function(a,b){return a.d-b.d});
 var near=st.slice(0,6),ops=st.filter(function(x){return(x.s.st==="op"||x.c==="hn")&&x.d<100000}),n1=ops[0];
 var l1=st.filter(function(x){return x.c==="hcm"&&x.s.line==="L1"&&x.s.st==="op"&&x.d<100000})[0];
 var pr=DAT.prov?which(DAT.prov,lat,lng):null,gd=DAT.gadm?which(DAT.gadm,lat,lng):null;
 var h="<p class='where'><b>"+nf(lat,5)+", "+nf(lng,5)+"</b>"+(DAT.prov?" · "+esc(pr||t.r_out):"")+(DAT.gadm&&gd&&gd!==pr?" · <span class='sub'>"+t.r_old+": "+esc(gd)+"</span>":"")+"</p>";
 var c1;
 if(n1&&n1.d<=3000){var mm=walkMin(n1.wm,p);
  c1="<div class='big'>"+esc(n1.s.n)+" <span class='pill'>"+esc(n1.s.line)+"</span></div><div><b>"+nf(mm,0)+"</b> "+t.min_walk+" · "+fi(n1.wm)+" "+t.m_+" · <span class='sub'>"+(n1.net?t.walk_net:t.walk_est)+"</span></div>"+(l1&&l1===n1?"<div class='sub'>"+t.ring_in+" <span class='pill'>"+t.ring_n[ringIdx(n1.d)]+"</span></div>":"");
  RG.addLayer(Lf.polyline([[lat,lng],[n1.s.lat,n1.s.lng]],{color:"#0b5ea8",weight:2,dashArray:"2 6"}))}
 else if(n1)c1="<div>"+t.near_far+" <b>"+esc(n1.s.n)+"</b> ("+fi(n1.d/1000)+" km "+t.away+")</div>";
 else c1="<div class='sub'>"+t.no_stn+"</div>";
 if(l1&&l1.d<6000)[500,800,1200,2000].forEach(function(r,i){Lf.circle([l1.s.lat,l1.s.lng],{radius:r,color:"#0b5ea8",weight:1,fill:false,dashArray:"4 4",opacity:.7-.1*i}).addTo(RG)});
 var rc=MIN*p.v*1000/60/p.f;
 Lf.circle([lat,lng],{radius:rc,color:"#16a34a",weight:1.5,fillOpacity:.05,dashArray:"3 5"}).addTo(RG);
 $("connOut").innerHTML=h+"<div class='cards3'>"+card("m","k_metro",c1)+"<div id='cBusCard'></div><div id='cAmCard'></div></div><details class='det'><summary>"+t.det_st+"</summary>"+tbl([t.c_stn,t.c_line,t.c_st,t.c_d,t.c_w,t.c_t,t.c_src,t.c_ring],near.map(function(x){return[esc(x.s.n),esc(x.s.line),t[x.s.st]||"–",fi(x.d),fi(x.wm),nf(walkMin(x.wm,p),0),x.net?t.net:t.est,t.ring_n[ringIdx(x.d)].split(" (")[0]]}))+"</details>";
 $("cBusCard").innerHTML=card("b","k_bus","<div class='sub'>"+t.loading+"</div>");$("cAmCard").innerHTML=card("a","k_am","<div class='sub'>"+t.loading+"</div>");
 $("connBus").innerHTML="";
 load("bus").catch(function(){return null}).then(function(routes){if(my!==SEQ)return;var bc="",cand=[];
  var tgt=ops.filter(function(x){return x.d<30000});
  if(routes&&tgt.length){
   routes.forEach(function(rt){var s=rt.s;if(!s||!s.length)return;var bi=-1,bd=1e9;
    for(var i=0;i<s.length;i++){var d=hav(lat,lng,s[i][1],s[i][0]);if(d<bd){bd=d;bi=i}}
    if(bd>p.br)return;var best=null;
    tgt.forEach(function(x){for(var j=bi+1;j<s.length;j++){var d2=hav(s[j][1],s[j][0],x.s.lat,x.s.lng);if(d2<=400){var rd=0;for(var m=bi;m<j;m++)rd+=hav(s[m][1],s[m][0],s[m+1][1],s[m+1][0]);
      var w1=walkMin(bd*p.f,p),w2=walkMin(d2*p.f,p),rm=rd/(p.b*1000/60),wt=rt.iv?(rt.iv[0]+rt.iv[1])/4:null,tot=w1+w2+rm+(wt||0),sc=tot+(wt==null?10:0);
      if(!best||sc<best.sc)best={sc:sc,j:j,st:x.s.n,d2:d2,w1:w1,w2:w2,rm:rm,wt:wt,tot:tot};break}}});
    if(best)cand.push({rt:rt,bd:bd,n:best.j-bi,st:best.st,d2:best.d2,sc:best.sc,bi:bi,j:best.j,rm:best.rm,wt:best.wt,tot:best.tot,w1:best.w1,w2:best.w2})});
   cand.sort(function(a,b){return a.sc-b.sc})}
  if(cand.length){var c=cand[0];bc="<div class='big'>"+esc(c.rt.ref||"–")+" → "+esc(c.st)+"</div><div><b>"+nf(c.tot,0)+"</b> "+t.bus_tot+"</div><div class='sub'>"+t.bus_parts.replace("{a}",nf(c.w1,0)).replace("{w}",c.wt==null?"?":nf(c.wt,0)).replace("{r}",nf(c.rm,0)).replace("{b}",nf(c.w2,0))+(c.wt==null?" · "+t.bus_nowait:"")+"</div>"}
  else bc="<div class='sub'>"+(routes?t.bus_none:t.err)+"</div>";
  $("cBusCard").innerHTML=card("b","k_bus",bc);
  if(cand.length){$("connBus").innerHTML="<details class='det'><summary>"+t.det_bus+" ("+cand.length+")</summary>"+tbl([t.c_rt,t.c_walk1,t.c_stops,t.c_ride,t.c_hw,t.c_wait,t.c_to,t.c_walk2,t.c_tot],cand.slice(0,8).map(function(c,i){var hw=c.rt.iv?(c.rt.iv[0]===c.rt.iv[1]?c.rt.iv[0]:c.rt.iv[0]+"–"+c.rt.iv[1]):t.nohw;return["<a href='#' class='cb' data-i='"+i+"' title='"+esc(c.rt.oh||"")+"'>"+esc((c.rt.ref||"–")+(c.rt.fr||c.rt.to?" · "+(c.rt.fr||"")+" → "+(c.rt.to||""):(c.rt.n?" · "+c.rt.n:"")))+"</a>",fi(c.bd),c.n,nf(c.rm,0),hw,c.wt==null?"–":nf(c.wt,0),esc(c.st),fi(c.d2),"<b>"+nf(c.tot,0)+"</b>"]}))+"<p class='sub'>"+t.tot_note+"</p></details>";
   $("connBus").querySelectorAll(".cb").forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();var c=cand[+a.getAttribute("data-i")];if(HL)map.removeLayer(HL);HL=Lf.featureGroup();if(c.rt.g)gj(c.rt.g,{color:"#16a34a",weight:4,opacity:.95}).addTo(HL);
     Lf.circleMarker([c.rt.s[c.bi][1],c.rt.s[c.bi][0]],{radius:7,color:"#16a34a",fillColor:"#fff",fillOpacity:1,weight:3}).addTo(HL);Lf.circleMarker([c.rt.s[c.j][1],c.rt.s[c.j][0]],{radius:7,color:"#dc2626",fillColor:"#fff",fillOpacity:1,weight:3}).addTo(HL);HL.addTo(map);map.fitBounds(HL.getBounds().pad(.2))})})}});
 var dl=rc/111000,dg=rc/(111000*Math.cos(lat*Math.PI/180));
 load("ai").then(function(){return loadTiles(tileKeys(lat-dl,lng-dg,lat+dl,lng+dg))}).then(function(ts){if(my!==SEQ)return;var cn=[0,0,0,0,0];
  ts.forEach(function(rows){rows.forEach(function(r){if(hav(lat,lng,r[0],r[1])<=rc)cn[r[2]]++})});
  var sc=cn.filter(function(x){return x>0}).length;
  $("cAmCard").innerHTML=card("a","k_am","<div class='big'>"+sc+" / 5 <span class='sub'>"+t.am_score+"</span></div><div class='chips2'>"+t.am.map(function(n,i){return"<span class='chip2 "+(cn[i]?"on":"")+"' style='--c:"+AMC[i]+"'>"+n+" <b>"+cn[i]+"</b></span>"}).join("")+"</div><div class='sub'>"+MIN+t.min+" · "+t.am_in.replace("{m}",fi(rc))+". "+t.am_note+"</div>")}).catch(function(){$("cAmCard").innerHTML=card("a","k_am","<div class='sub'>"+t.err+"</div>")});
 load("poi").then(function(po){if(my!==SEQ)return;var hs=po.map(function(q){return{q:q,d:hav(lat,lng,q[1],q[0])}}).filter(function(x){return x.d<=5000}).sort(function(a,b){return a.d-b.d}).slice(0,10);
  $("connHub").innerHTML=hs.length?"<details class='det'><summary>"+t.det_hub+"</summary>"+tbl([t.c_nm,t.c_ty,t.c_d],hs.map(function(x){return[esc(x.q[3]||"–"),t.hub[x.q[2]]||x.q[2],fi(x.d)]}))+"</details>":""}).catch(function(){$("connHub").innerHTML=""});
 map.setView([lat,lng],Math.max(map.getZoom(),14))}
function ensureAdm(){return Promise.all([load("prov").catch(function(){}),load("gadm").catch(function(){}),load("wg").catch(function(){})])}
function setPoint(lat,lng){ensureAdm().then(function(){analyse(lat,lng)})}
map.on("click",function(e){setPoint(e.latlng.lat,e.latlng.lng)});
$("cLoc").addEventListener("click",function(){var t=T[L];if(!navigator.geolocation){$("connOut").innerHTML="<p class='warn'>"+t.geo_off+"</p>";return}
 $("connOut").innerHTML="<p class='sub'>"+t.geo_wait+"</p>";
 navigator.geolocation.getCurrentPosition(function(p){setPoint(p.coords.latitude,p.coords.longitude)},function(){$("connOut").innerHTML="<p class='warn'>"+t.geo_deny+"</p>"},{enableHighAccuracy:true,timeout:15000,maximumAge:60000})});
$("cGo").addEventListener("click",function(){var m=($("cLL").value||"").replace(/,/g," ").trim().split(/\s+/).map(Number);if(m.length>=2&&isFinite(m[0])&&isFinite(m[1])&&Math.abs(m[0])<=90&&Math.abs(m[1])<=180)setPoint(m[0],m[1])});
$("cClr").addEventListener("click",function(){PIN=null;SEQ++;RG.clearLayers();if(HL){map.removeLayer(HL);HL=null}$("connOut").innerHTML="<p class='sub'>"+T[L].pick+"</p>";$("connBus").innerHTML="";$("connHub").innerHTML=""});
["cSpd","cDet","cBr","cBs"].forEach(function(id){$(id).addEventListener("change",function(){if(PIN)analyse(PIN[0],PIN[1])})});
document.querySelectorAll("#cMin button").forEach(function(b){b.addEventListener("click",function(){MIN=+b.getAttribute("data-m");document.querySelectorAll("#cMin button").forEach(function(x){x.classList.toggle("on",x===b)});if(PIN)analyse(PIN[0],PIN[1])})});
/* go-to menus */
function bigPoly(g){var P=g.type==="Polygon"?[g.coordinates]:g.coordinates,best=null,ba=-1;P.forEach(function(q){var r=q[0],a=1e9,b=1e9,c=-1e9,d=-1e9;r.forEach(function(x){a=Math.min(a,x[1]);b=Math.min(b,x[0]);c=Math.max(c,x[1]);d=Math.max(d,x[0])});var ar=(c-a)*(d-b);if(ar>ba){ba=ar;best=[[a,b],[c,d]]}});return best}
function fillMenus(){var t=T[L],ps=$("cProvSel"),ss=$("cStnSel"),pv=ps.value,sv=ss.value;
 ps.innerHTML="<option value=''>"+t.goprov+"</option>"+(DAT.prov||[]).map(function(p,i){return"<option value='"+i+"'>"+esc(p.n)+"</option>"}).join("");ps.value=pv;
 ss.innerHTML="<option value=''>"+t.gostn+"</option>"+ALL.map(function(x,i){return"<option value='"+i+"'>"+esc(x.s.n)+" ("+esc(x.s.line==="NA"?"–":x.s.line)+")</option>"}).join("");ss.value=sv}
$("cProvSel").addEventListener("change",function(){var v=$("cProvSel").value;if(v==="")return;var b=bigPoly(DAT.prov[+v].g);if(b)map.fitBounds(b)});
$("cStnSel").addEventListener("change",function(){var v=$("cStnSel").value;if(v==="")return;var s=ALL[+v].s;setPoint(s.lat,s.lng)});
load("prov").then(fillMenus).catch(function(){});

/* ---- text ---- */
function render(){var t=T[L];
 document.querySelectorAll("[data-c]").forEach(function(n){var k=n.getAttribute("data-c");if(t[k]!=null)n.textContent=t[k]});
 $("cLL").placeholder=t.latlng;fillMenus();
 document.querySelectorAll("#cMin button").forEach(function(b){b.textContent=b.getAttribute("data-m")+t.min});
 if(PIN)analyse(PIN[0],PIN[1]);else $("connOut").innerHTML="<p class='sub'>"+t.pick+"</p>"}
var lb=$("lang");if(lb)lb.addEventListener("click",function(){setTimeout(function(){L=document.documentElement.lang==="vi"?"vi":"en";render()},60)});
render();
})();
