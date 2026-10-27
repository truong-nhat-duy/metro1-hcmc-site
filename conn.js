"use strict";
/* Connectivity explorer: nearest stations, distance ring, bus routes that reach a station, nearby amenities.
   Runs entirely in the browser. A position (from the browser's location service or a map click) is never sent anywhere.
   Walking distance comes from a pre-computed OpenStreetMap walking network (120 m grid, up to 3 km from a station); outside it, a crow-fly distance times a detour factor. Bus waiting time is half of the OSM 'interval' tag; there is no GTFS timetable. */
(function(){
var Lf=window.L,N=window.NET;if(!Lf||!N||!document.getElementById("mapConn"))return;
var L="en";try{var s0=localStorage.getItem("lang");if(s0==="vi"||s0==="en")L=s0;else if((navigator.language||"").slice(0,2)==="vi")L="vi"}catch(e){}
var T={en:{
nav_conn:"Connectivity",h:"Connectivity explorer: how a place links to the metro",
p:"Share your location or click any point on the map. The page finds the nearest metro stations, the distance ring (the same rings as the price maps), an estimated walk, the bus routes that stop near a station, and amenities within 800 m. It also draws the 34 provinces after the 1 July 2025 merger, the older 63 GADM provinces, ring roads and expressways, railways and metro alignments from OpenStreetMap.",
warn:"Illustration only; times are estimates, not timetables. Walking: shortest path on the OpenStreetMap walking network, snapped to a 120 m grid (about ±100 m error) and limited to 3 km; beyond that, straight line × detour factor. Bus: ride time = distance along the route’s stops ÷ an assumed commercial speed; waiting = half the OSM “interval” tag (published for most routes; completeness not verified); no GTFS exists, so transfers, congestion and real departure times are not modelled. Metro headway is not in OSM and is not included. The position stays in your browser.",
locate:"Use my location",clear:"Clear",go:"Go",latlng:"Latitude, longitude (e.g. 10.8412, 106.8098)",speed:"Walking speed (km/h)",detour:"Detour factor",busr:"Bus stop within",bspd:"Bus speed (km/h)",
l_prov:"34 provinces (from 1 Jul 2025)",l_gadm:"63 provinces (GADM 4.1, before merger)",l_road:"Ring roads and expressways (OSM)",l_rail:"Railways and metro alignments (OSM)",l_bus:"Bus routes (HCMC region)",l_stops:"Bus stops",l_poi:"Key facilities, Vietnam (OSM)",l_stn:"Metro stations (project table)",l_amen:"Amenities (OSM, HCMC)",
pick:"Click the map or share your location to begin.",loading:"Loading layer…",err:"Could not load this layer. Serve the folder over http(s).",
geo_off:"Your browser has no location service.",geo_deny:"Location was not shared. You can click the map instead.",geo_wait:"Waiting for your browser…",
r_pos:"Position",r_prov:"Province (after merger)",r_old:"Province (GADM, before merger)",r_out:"Outside the 34 provinces drawn",
r_stn:"Nearest metro stations",c_stn:"Station",c_line:"Line",c_st:"Status",c_d:"Straight line (m)",c_w:"Est. walk (m)",c_t:"Walk (min)",c_ring:"Ring",c_nm:"Name",c_ty:"Type",
r_ring:"Distance ring to the nearest operating station (Line 1)",ring_n:["≤500 m (ring 1)","500–800 m (ring 2)","800–1,200 m (ring 3)","1,200–2,000 m (ring 4)",">2,000 m (outside rings)"],
op:"Operating",uc:"Under construction",pl:"Planned / unassigned",
r_bus:"Bus routes from a stop near you to a stop near a Line 1 station",c_rt:"Route",c_walk1:"Walk to stop (m)",c_stops:"Stops",c_to:"Alight near",c_walk2:"Walk to station (m)",c_ride:"Ride (min)",c_wait:"Wait (min)",c_tot:"Door to station (min)",c_hw:"Headway",c_wk:"Walk (min)",c_src:"Basis",net:"network",est:"estimate",nohw:"n/a",tot_note:"Total = walk + wait + ride + walk. Where the headway is missing, a 10-minute wait is assumed for ranking and shown as n/a; the total then excludes it.",
nobus:"No OSM bus route found that links a stop within the chosen radius to a stop within 400 m of an operating station. Coverage of OSM bus data is incomplete; absence here is not evidence that no service exists.",
nostops:"No bus stop within the chosen radius in the OSM extract.",nearstops:"Bus stops within radius",
r_am:"Amenities within 800 m (OSM, HCMC sample)",r_hub:"Key facilities within 5 km (OSM)",
am:["Schools and universities","Hospitals and clinics","Parks","Shopping","Bus stops"],
hub:{air:"Airport",rail:"Railway station",metro:"Metro station",busst:"Bus terminal",uni:"University",hosp:"Hospital",attr:"Attraction",mall:"Mall"},
none:"none",n_amen_na:"Amenity layer covers the Ho Chi Minh City project area only.",
src:"Sources: OpenStreetMap contributors (ODbL; extract of 10 Oct 2026), GADM 4.1 (non-commercial use), the project's station table. Walking grid and bus headway tags are derived from OpenStreetMap (ODbL). Bus-to-metro method follows Nguyễn An Ninh (2025), Fulbright School of Public Policy and Management; this page does not reuse that thesis' code or data.",
thes_h:"Bus–metro integration: what the Fulbright thesis does and what this page does",
thes_p:"Nguyễn An Ninh (2025), “Integration Matters: Evidence from Public Transport Accessibility to Ho Chi Minh City’s Metro Line 1”, builds a time-expanded network from bus timetables, an OpenStreetMap walking graph and motorcycle travel times to compute door-to-station travel times for an H3 grid (resolution 9) covering the former city area. As summarised in the author’s Vietnamese write-up (not yet checked line by line against the PDF): about 74% of grid cells need more than 60 minutes to reach a suitable Line 1 station by public transport; Bến Thành is the best entry point for roughly 72–81% of cells depending on the hour; and public transport takes about three times as long as a motorcycle on average.",
thes_t:["Notebook step","What it does","On this page"],
thes_r:[["01 Extract stops","Unique bus stops from the route file","OSM bus stops and route stops, region around HCMC"],["02 H3 grid","Hexagon grid (res. 9) over the study area","Not used: the point you pick plays the role of a grid cell"],["03–04 Walk graph, filter stops","OSM walking network; keep stops inside the city","OSM walking network, shortest path from each station on a 120 m grid; crow-fly × detour outside it"],["05–06 Node and link tables","Event nodes for every trip, then bus, wait, transfer and walk links","Not reproduced: no GTFS. Wait = half the OSM headway tag"],["07 In-network times","Shortest bus ride from each departure to each station","Ride distance along an OSM route ÷ assumed speed (adjustable)"],["08 First mile","Walk from grid cell to stops (800 m) and stations (1,600 m)","Walk to stop and to station, with the radius you choose"],["09 Accessibility","Fastest gateway and destination times by departure time","Not reproduced"],["10–11 Routing, analysis","Motorcycle times (Valhalla) and results","Not reproduced"],["12 OSM streets","Vietnam street extract for a web map","Ring roads and expressways layer"]],
thes_note:"The page now covers every station in the project table (Ho Chi Minh City lines 1, 2 and unassigned planned stations, and Hanoi). Times are estimates; a true time-expanded network needs GTFS or the thesis author’s timetable file.",
no_data:"Layer file not found."},
vi:{
nav_conn:"Kết nối",h:"Công cụ kết nối: một vị trí nối với metro như thế nào",
p:"Chia sẻ vị trí hiện tại hoặc bấm vào một điểm bất kỳ trên bản đồ. Trang tìm các ga metro gần nhất, vành khoảng cách (cùng các vành với bản đồ giá), ước tính đi bộ, các tuyến buýt có điểm dừng gần ga và tiện ích trong 800 m. Trang cũng vẽ 34 tỉnh sau sáp nhập 1/7/2025, 63 tỉnh cũ theo GADM, vành đai và cao tốc, đường sắt và tuyến metro từ OpenStreetMap.",
warn:"Chỉ để minh họa; thời gian là ước tính, không phải lịch chạy. Đi bộ: đường ngắn nhất trên mạng đi bộ OpenStreetMap, gán vào lưới 120 m (sai số khoảng ±100 m) và giới hạn 3 km; xa hơn thì dùng đường chim bay × hệ số đường vòng. Buýt: thời gian đi xe = chiều dài dọc các trạm của tuyến ÷ tốc độ thương mại giả định; thời gian chờ = một nửa thẻ “interval” của OSM (có ở đa số tuyến; chưa kiểm tra độ đầy đủ); không có GTFS nên chưa mô hình hóa chuyển tuyến, kẹt xe và giờ xuất bến thực. Giãn cách metro không có trong OSM nên không tính. Vị trí của bạn chỉ nằm trong trình duyệt.",
locate:"Dùng vị trí của tôi",clear:"Xóa",go:"Đến",latlng:"Vĩ độ, kinh độ (ví dụ 10.8412, 106.8098)",speed:"Tốc độ đi bộ (km/h)",detour:"Hệ số đường vòng",busr:"Trạm buýt trong vòng",bspd:"Tốc độ buýt (km/h)",
l_prov:"34 tỉnh/thành (từ 1/7/2025)",l_gadm:"63 tỉnh (GADM 4.1, trước sáp nhập)",l_road:"Vành đai và cao tốc (OSM)",l_rail:"Đường sắt và tuyến metro (OSM)",l_bus:"Tuyến buýt (vùng TP.HCM)",l_stops:"Trạm buýt",l_poi:"Công trình chính, Việt Nam (OSM)",l_stn:"Ga metro (bảng dự án)",l_amen:"Tiện ích (OSM, TP.HCM)",
pick:"Bấm vào bản đồ hoặc chia sẻ vị trí để bắt đầu.",loading:"Đang tải lớp…",err:"Không tải được lớp này. Hãy chạy thư mục qua http(s).",
geo_off:"Trình duyệt không có dịch vụ định vị.",geo_deny:"Bạn chưa chia sẻ vị trí. Có thể bấm vào bản đồ thay thế.",geo_wait:"Đang chờ trình duyệt…",
r_pos:"Vị trí",r_prov:"Tỉnh/thành (sau sáp nhập)",r_old:"Tỉnh (GADM, trước sáp nhập)",r_out:"Ngoài 34 tỉnh đã vẽ",
r_stn:"Các ga metro gần nhất",c_stn:"Ga",c_line:"Tuyến",c_st:"Tình trạng",c_d:"Đường chim bay (m)",c_w:"Đi bộ ước tính (m)",c_t:"Đi bộ (phút)",c_ring:"Vành",c_nm:"Tên",c_ty:"Loại",
r_ring:"Vành khoảng cách tới ga đang khai thác gần nhất (Tuyến 1)",ring_n:["≤500 m (vành 1)","500–800 m (vành 2)","800–1.200 m (vành 3)","1.200–2.000 m (vành 4)",">2.000 m (ngoài các vành)"],
op:"Đang khai thác",uc:"Đang xây dựng",pl:"Quy hoạch / chưa gán tuyến",
r_bus:"Tuyến buýt từ trạm gần bạn tới trạm gần ga Tuyến 1",c_rt:"Tuyến",c_walk1:"Đi bộ tới trạm (m)",c_stops:"Số trạm",c_to:"Xuống gần",c_walk2:"Đi bộ tới ga (m)",c_ride:"Đi xe (phút)",c_wait:"Chờ (phút)",c_tot:"Từ cửa đến ga (phút)",c_hw:"Giãn cách",c_wk:"Đi bộ (phút)",c_src:"Cơ sở",net:"mạng đường",est:"ước tính",nohw:"chưa có",tot_note:"Tổng = đi bộ + chờ + đi xe + đi bộ. Nếu thiếu giãn cách, xếp hạng tạm giả định chờ 10 phút, hiển thị là chưa có và tổng không tính phần chờ.",
nobus:"Không tìm thấy tuyến buýt OSM nối trạm trong bán kính đã chọn với trạm trong 400 m quanh một ga đang khai thác. Dữ liệu buýt OSM chưa đầy đủ; không thấy ở đây không có nghĩa là không có dịch vụ.",
nostops:"Không có trạm buýt nào trong bán kính đã chọn trong dữ liệu OSM.",nearstops:"Trạm buýt trong bán kính",
r_am:"Tiện ích trong 800 m (OSM, mẫu TP.HCM)",r_hub:"Công trình chính trong 5 km (OSM)",
am:["Trường học và đại học","Bệnh viện và phòng khám","Công viên","Mua sắm","Trạm buýt"],
hub:{air:"Sân bay",rail:"Ga đường sắt",metro:"Ga metro",busst:"Bến xe",uni:"Đại học",hosp:"Bệnh viện",attr:"Điểm tham quan",mall:"Trung tâm thương mại"},
none:"không có",n_amen_na:"Lớp tiện ích chỉ phủ khu vực dự án ở TP.HCM.",
src:"Nguồn: OpenStreetMap contributors (ODbL; bản trích 10/10/2026), GADM 4.1 (chỉ dùng phi thương mại), bảng ga của dự án. Lưới đi bộ và giãn cách buýt suy ra từ OpenStreetMap (ODbL). Phương pháp buýt–metro theo Nguyễn An Ninh (2025), Trường Chính sách công và Quản lý Fulbright; trang này không dùng lại mã hay dữ liệu của luận văn đó.",
thes_h:"Tích hợp buýt–metro: luận văn Fulbright làm gì và trang này làm gì",
thes_p:"Nguyễn An Ninh (2025), “Integration Matters: Evidence from Public Transport Accessibility to Ho Chi Minh City’s Metro Line 1”, xây mạng lưới mở rộng theo thời gian từ lịch xe buýt, mạng đi bộ OpenStreetMap và thời gian đi xe máy để tính thời gian từ cửa nhà đến ga cho lưới H3 (cấp 9) phủ địa bàn TP.HCM cũ. Theo bản dịch diễn giải tiếng Việt của tác giả (chưa đối chiếu từng dòng với bản PDF): khoảng 74% ô lưới cần hơn 60 phút để tới ga Tuyến 1 phù hợp bằng giao thông công cộng; Bến Thành là điểm vào tối ưu của khoảng 72–81% ô lưới tùy khung giờ; và đi giao thông công cộng trung bình lâu gấp khoảng ba lần xe máy.",
thes_t:["Bước trong notebook","Việc làm","Trên trang này"],
thes_r:[["01 Trích trạm","Lấy các trạm buýt duy nhất từ tệp tuyến","Trạm buýt và trạm của tuyến theo OSM, vùng quanh TP.HCM"],["02 Lưới H3","Lưới lục giác (cấp 9) phủ vùng nghiên cứu","Không dùng: điểm bạn chọn thay cho một ô lưới"],["03–04 Mạng đi bộ, lọc trạm","Mạng đi bộ OSM; giữ trạm trong thành phố","Mạng đi bộ OSM, đường ngắn nhất từ mỗi ga trên lưới 120 m; ngoài lưới dùng chim bay × hệ số đường vòng"],["05–06 Bảng nút và liên kết","Nút sự kiện cho từng chuyến, rồi liên kết xe, chờ, chuyển tuyến, đi bộ","Chưa tái hiện: không có GTFS. Chờ = một nửa giãn cách theo OSM"],["07 Thời gian trong mạng","Chuyến buýt ngắn nhất từ mỗi lượt khởi hành đến mỗi ga","Chiều dài dọc tuyến OSM ÷ tốc độ giả định (chỉnh được)"],["08 Chặng đầu","Đi bộ từ ô lưới đến trạm (800 m) và ga (1.600 m)","Đi bộ tới trạm và tới ga, theo bán kính bạn chọn"],["09 Khả năng tiếp cận","Thời gian vào mạng và tới ga đích theo giờ khởi hành","Chưa tái hiện"],["10–11 Định tuyến, phân tích","Thời gian xe máy (Valhalla) và kết quả","Chưa tái hiện"],["12 Đường phố OSM","Trích đường phố Việt Nam cho bản đồ web","Lớp vành đai và cao tốc"]],
thes_note:"Trang nay phủ mọi ga trong bảng dự án (TP.HCM tuyến 1, 2 và các ga quy hoạch chưa gán tuyến, cùng Hà Nội). Thời gian là ước tính; mạng mở rộng theo thời gian thực sự cần GTFS hoặc tệp lịch của tác giả luận văn.",
no_data:"Không thấy tệp lớp."}};
var $=function(id){return document.getElementById(id)};
function nf(x,k){var s=(+x).toFixed(k==null?0:k);return L==="vi"?s.replace(".",","):s}
function fi(x){return Math.round(x).toLocaleString(L==="vi"?"vi-VN":"en-US")}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function hav(a,b,c,d){var R=6371008.8,p=Math.PI/180,x=Math.sin((c-a)*p/2),y=Math.sin((d-b)*p/2),h=x*x+Math.cos(a*p)*Math.cos(c*p)*y*y;return 2*R*Math.asin(Math.sqrt(h))}
var map=Lf.map("mapConn",{preferCanvas:true}).setView([10.85,106.75],10);
Lf.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap contributors"}).addTo(map);
var cv=Lf.canvas({padding:.3});
var LAY={},DAT={},PEND={};
var FILES={prov:"data/prov34.json",gadm:"data/gadm1.json",road:"data/roads.json",rail:"data/rail.json",bus:"data/bus_routes.json",stops:"data/bus_stops.json",poi:"data/poi_vn.json",wg:"data/walkgrid.json"};
function load(k){if(DAT[k])return Promise.resolve(DAT[k]);if(PEND[k])return PEND[k];
 PEND[k]=fetch(FILES[k]).then(function(r){if(!r.ok)throw new Error(r.status);return r.json()}).then(function(j){DAT[k]=j;return j});return PEND[k]}
function gj(g,st){return Lf.geoJSON({type:"Feature",geometry:g,properties:{}},{style:st,renderer:cv})}
var STY={prov:{color:"#0f3a63",weight:1.4,fill:true,fillOpacity:.03,opacity:.9},gadm:{color:"#b45309",weight:1,dashArray:"4 4",fill:false,opacity:.8},
 rd:{ring:{color:"#7c3aed",weight:3},motorway:{color:"#dc2626",weight:2.6},trunk:{color:"#d97706",weight:1.4}},
 rl:{subway:{color:"#0079b8",weight:3},train:{color:"#475569",weight:2,dashArray:"6 4"}}};
function build(k){var g=Lf.featureGroup(),d=DAT[k];
 if(k==="prov"||k==="gadm")d.forEach(function(p){gj(p.g,STY[k]).bindTooltip(p.n,{sticky:true}).addTo(g)});
 if(k==="road")d.forEach(function(r){gj(r.g,STY.rd[r.c]).bindTooltip((r.c==="ring"?"":"")+esc(r.r),{sticky:true}).addTo(g)});
 if(k==="rail")d.forEach(function(r){gj(r.g,STY.rl[r.k]).bindTooltip(esc(r.n||r.ref||r.k),{sticky:true}).addTo(g)});
 if(k==="bus")d.forEach(function(r){if(r.g)gj(r.g,{color:"#16a34a",weight:1.2,opacity:.55}).bindTooltip(esc((r.ref?r.ref+" · ":"")+(r.n||"")),{sticky:true}).addTo(g)});
 if(k==="stops")d.forEach(function(s){Lf.circleMarker([s[1],s[0]],{radius:2,color:"#16a34a",weight:1,fillOpacity:.8,renderer:cv}).bindTooltip(esc(s[2]||"bus stop")).addTo(g)});
 if(k==="poi"){var col={air:"#0ea5e9",rail:"#475569",metro:"#0079b8",busst:"#16a34a",uni:"#7c3aed",hosp:"#e11d48",attr:"#d97706",mall:"#db2777"};
  d.forEach(function(p){Lf.circleMarker([p[1],p[0]],{radius:3,color:col[p[2]]||"#334155",weight:1,fillOpacity:.7,renderer:cv}).bindTooltip(esc(p[3]||"")+" · "+(T[L].hub[p[2]]||p[2])).addTo(g)})}
 return g}
var ALL=N.hcmStations.map(function(s,i){return{s:s,c:"hcm",i:i}}).filter(function(x){return x.s.line!=="NA"||!N.hcmStations.some(function(q){return q!==x.s&&q.line!=="NA"&&hav(q.lat,q.lng,x.s.lat,x.s.lng)<150})}).filter(function(x,k,arr){return!arr.slice(0,k).some(function(y){return y.s.n===x.s.n&&y.s.line===x.s.line&&hav(y.s.lat,y.s.lng,x.s.lat,x.s.lng)<150})}).concat((N.hnStations||[]).map(function(s,i){return{s:s,c:"hn",i:i}}));
var STNG=Lf.featureGroup(),SC={op:"#0079b8",uc:"#dc2626",pl:"#7c8795"};
N.hcmStations.forEach(function(s){Lf.circleMarker([s.lat,s.lng],{radius:s.st==="op"?5:3.5,color:"#fff",weight:1,fillColor:SC[s.st]||"#7c8795",fillOpacity:1,renderer:cv}).bindTooltip(esc(s.n)+" ("+s.line+")").addTo(STNG)});
var AMG=Lf.featureGroup(),AM=window.AMEN,AMC=["#7c3aed","#e11d48","#16a34a","#d97706","#475569"];
if(AM)AM.pts.forEach(function(p){Lf.circleMarker([p[0],p[1]],{radius:2,color:AMC[p[2]],weight:1,fillOpacity:.7,renderer:cv}).addTo(AMG)});
var CHK={prov:"cProv",gadm:"cGadm",road:"cRoad",rail:"cRail",bus:"cBus",stops:"cStops",poi:"cPoi"};
function toggle(k){var on=$(CHK[k]).checked,st=$("connLoad");
 if(!on){if(LAY[k])map.removeLayer(LAY[k]);return}
 st.textContent=T[L].loading;
 load(k).then(function(){if(!LAY[k])LAY[k]=build(k);if($(CHK[k]).checked)LAY[k].addTo(map);st.textContent=""}).catch(function(){st.textContent=T[L].err;$(CHK[k]).checked=false})}
Object.keys(CHK).forEach(function(k){$(CHK[k]).addEventListener("change",function(){toggle(k)})});
$("cStn").addEventListener("change",function(){if($("cStn").checked)STNG.addTo(map);else map.removeLayer(STNG)});
$("cAmen").addEventListener("change",function(){if($("cAmen").checked)AMG.addTo(map);else map.removeLayer(AMG)});
STNG.addTo(map);

/* ---- analysis ---- */
var PIN=null,RG=Lf.featureGroup().addTo(map),HL=null;
function ringIdx(d){return d<=500?0:d<=800?1:d<=1200?2:d<=2000?3:4}
function inRing(pt,ring){var x=pt[0],y=pt[1],c=false;for(var i=0,j=ring.length-1;i<ring.length;j=i++){var xi=ring[i][0],yi=ring[i][1],xj=ring[j][0],yj=ring[j][1];if(((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi))c=!c}return c}
function inGeom(pt,g){var P=g.type==="Polygon"?[g.coordinates]:g.coordinates;for(var k=0;k<P.length;k++){if(inRing(pt,P[k][0])){var hole=false;for(var h=1;h<P[k].length;h++)if(inRing(pt,P[k][h]))hole=true;if(!hole)return true}}return false}
function which(list,lat,lng){for(var i=0;i<list.length;i++)if(inGeom([lng,lat],list[i].g))return list[i].n;return null}
function tbl(head,rows){return"<div class='tw'><table><thead><tr>"+head.map(function(h){return"<th>"+h+"</th>"}).join("")+"</tr></thead><tbody>"+rows.map(function(r){return"<tr>"+r.map(function(c){return"<td>"+c+"</td>"}).join("")+"</tr>"}).join("")+"</tbody></table></div>"}
function prm(){return{v:Math.max(2,+$("cSpd").value||4.8),f:Math.max(1,+$("cDet").value||1.3),br:+$("cBr").value||400,b:Math.max(5,+$("cBs").value||15)}}
function walkMin(d,p){return d/(p.v*1000/60)}
function wmet(wg,c,idx,lat,lng){/* network walk metres from the point to station idx of city c, or null */
 var g=wg&&wg[c];if(!g)return null;var i=Math.floor((lat-g.o[0])/g.d[0]),j=Math.floor((lng-g.o[1])/g.d[1]);
 if(!g.m){g.m={};g.r.forEach(function(r){g.m[r[0]*100000+r[1]]=r})}
 var r=g.m[i*100000+j];if(!r)return null;for(var k=2;k<r.length;k+=2)if(r[k]===idx)return r[k+1]*10;return null}
function analyse(lat,lng){PIN=[lat,lng];var t=T[L],p=prm(),o=[];
 RG.clearLayers();Lf.marker([lat,lng]).addTo(RG);
 var WG=DAT.wg||null;
 var st=ALL.map(function(x){var d=hav(lat,lng,x.s.lat,x.s.lng),w=wmet(WG,x.c,x.i,lat,lng);return{s:x.s,d:d,w:w,net:w!=null,wm:w!=null?w:d*p.f}}).sort(function(a,b){return a.d-b.d});
 var near=st.slice(0,6),op=st.filter(function(x){return x.s.st==="op"&&x.d<100000}),nop=op[0];
 var pr=DAT.prov?which(DAT.prov,lat,lng):null,gd=DAT.gadm?which(DAT.gadm,lat,lng):null;
 o.push("<p><b>"+t.r_pos+":</b> "+nf(lat,5)+", "+nf(lng,5)+(DAT.prov?" · <b>"+t.r_prov+":</b> "+esc(pr||t.r_out):"")+(DAT.gadm?" · <b>"+t.r_old+":</b> "+esc(gd||t.r_out):"")+"</p>");
 o.push("<h3>"+t.r_stn+"</h3>"+tbl([t.c_stn,t.c_line,t.c_st,t.c_d,t.c_w,t.c_t,t.c_src,t.c_ring],near.map(function(x){return[esc(x.s.n),x.s.line,t[x.s.st]||"–",fi(x.d),fi(x.wm),nf(walkMin(x.wm,p),0),x.net?t.net:t.est,t.ring_n[ringIdx(x.d)].split(" (")[0]]})));
 if(nop&&nop.d>100000)nop=null;
 if(nop){var ri=ringIdx(nop.d);o.push("<p><b>"+t.r_ring+":</b> "+esc(nop.s.n)+" · "+fi(nop.d)+" m · <span class='pill'>"+t.ring_n[ri]+"</span></p>");
  [500,800,1200,2000].forEach(function(r,i){Lf.circle([nop.s.lat,nop.s.lng],{radius:r,color:"#0b5ea8",weight:1,fill:false,dashArray:"4 4",opacity:.7-.1*i}).addTo(RG)});
  Lf.polyline([[lat,lng],[nop.s.lat,nop.s.lng]],{color:"#0b5ea8",weight:2,dashArray:"2 6"}).addTo(RG)}
 var bx=$("connBus");bx.innerHTML="";
 Promise.all([load("bus").catch(function(){return null}),load("stops").catch(function(){return null})]).then(function(r){
  var routes=r[0],sp=r[1],h="";
  if(routes){var cand=[],stopsNear=0;
   routes.forEach(function(rt){var s=rt.s;if(!s.length)return;var bi=-1,bd=1e9;
    for(var i=0;i<s.length;i++){var d=hav(lat,lng,s[i][1],s[i][0]);if(d<bd){bd=d;bi=i}}
    if(bd>p.br)return;
    var best=null;
    op.forEach(function(x){for(var j=bi+1;j<s.length;j++){var d2=hav(s[j][1],s[j][0],x.s.lat,x.s.lng);if(d2<=400){var rd=0;for(var m=bi;m<j;m++)rd+=hav(s[m][1],s[m][0],s[m+1][1],s[m+1][0]);
      var w1=walkMin(bd*p.f,p),w2=walkMin(d2*p.f,p),rm=rd/(p.b*1000/60),wt=rt.iv?(rt.iv[0]+rt.iv[1])/4:null,tot=w1+w2+rm+(wt||0),sc=tot+(wt==null?10:0);
      if(!best||sc<best.sc)best={sc:sc,j:j,st:x.s.n,d2:d2,w1:w1,w2:w2,rm:rm,wt:wt,tot:tot};break}}});
    if(best)cand.push({rt:rt,bd:bd,n:best.j-bi,st:best.st,d2:best.d2,sc:best.sc,bi:bi,j:best.j,rm:best.rm,wt:best.wt,tot:best.tot})});
   cand.sort(function(a,b){return a.sc-b.sc});
   if(sp){stopsNear=sp.filter(function(s){return hav(lat,lng,s[1],s[0])<=p.br}).length}
   h+="<h3>"+t.r_bus+"</h3>";
   if(cand.length){h+=tbl([t.c_rt,t.c_walk1,t.c_stops,t.c_ride,t.c_hw,t.c_wait,t.c_to,t.c_walk2,t.c_tot],cand.slice(0,8).map(function(c,i){var hw=c.rt.iv?(c.rt.iv[0]===c.rt.iv[1]?c.rt.iv[0]:c.rt.iv[0]+"–"+c.rt.iv[1]):t.nohw;return["<a href='#' class='cb' data-i='"+i+"' title='"+esc(c.rt.oh||"")+"'>"+esc((c.rt.ref||"–")+(c.rt.fr||c.rt.to?" · "+(c.rt.fr||"")+" → "+(c.rt.to||""):(c.rt.n?" · "+c.rt.n:"")))+"</a>",fi(c.bd),c.n,nf(c.rm,0),hw,c.wt==null?"–":nf(c.wt,0),esc(c.st),fi(c.d2),"<b>"+nf(c.tot,0)+"</b>"]}));
    h+="<p class='sub'>"+t.tot_note+"</p>";
    h+="<p class='sub'>"+t.nearstops+": "+stopsNear+"</p>"}
   else h+="<p class='sub'>"+(stopsNear?t.nobus:t.nostops)+"</p>";
   bx.innerHTML=h;
   bx.querySelectorAll(".cb").forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();var c=cand[+a.getAttribute("data-i")];if(HL)map.removeLayer(HL);HL=Lf.featureGroup();if(c.rt.g)gj(c.rt.g,{color:"#16a34a",weight:4,opacity:.95}).addTo(HL);
     Lf.circleMarker([c.rt.s[c.bi][1],c.rt.s[c.bi][0]],{radius:7,color:"#16a34a",fillColor:"#fff",fillOpacity:1,weight:3}).addTo(HL);Lf.circleMarker([c.rt.s[c.j][1],c.rt.s[c.j][0]],{radius:7,color:"#dc2626",fillColor:"#fff",fillOpacity:1,weight:3}).addTo(HL);HL.addTo(map);map.fitBounds(HL.getBounds().pad(.2))})})}
  else bx.innerHTML="<p class='sub'>"+t.err+"</p>"});
 var am=[0,0,0,0,0];if(AM)AM.pts.forEach(function(q){if(hav(lat,lng,q[0],q[1])<=800)am[q[2]]++});
 var ah="<h3>"+t.r_am+"</h3>"+(AM?"<p>"+t.am.map(function(n,i){return"<span class='pill'>"+n+": <b>"+am[i]+"</b></span>"}).join(" ")+"</p><p class='sub'>"+t.n_amen_na+"</p>":"");
 o.push(ah);
 load("poi").then(function(po){var hs=po.map(function(q){return{q:q,d:hav(lat,lng,q[1],q[0])}}).filter(function(x){return x.d<=5000}).sort(function(a,b){return a.d-b.d}).slice(0,10);
  $("connHub").innerHTML="<h3>"+t.r_hub+"</h3>"+(hs.length?tbl([t.c_nm,t.c_ty,t.c_d],hs.map(function(x){return[esc(x.q[3]||"–"),t.hub[x.q[2]]||x.q[2],fi(x.d)]})):"<p class='sub'>"+t.none+"</p>")}).catch(function(){$("connHub").innerHTML=""});
 $("connOut").innerHTML=o.join("");
 map.setView([lat,lng],Math.max(map.getZoom(),13))}
function ensureAdm(){return Promise.all([load("prov").catch(function(){}),load("gadm").catch(function(){}),load("wg").catch(function(){})])}
function setPoint(lat,lng){ensureAdm().then(function(){analyse(lat,lng)})}
map.on("click",function(e){setPoint(e.latlng.lat,e.latlng.lng)});
$("cLoc").addEventListener("click",function(){var t=T[L];if(!navigator.geolocation){$("connOut").innerHTML="<p class='warn'>"+t.geo_off+"</p>";return}
 $("connOut").innerHTML="<p class='sub'>"+t.geo_wait+"</p>";
 navigator.geolocation.getCurrentPosition(function(p){setPoint(p.coords.latitude,p.coords.longitude)},function(){$("connOut").innerHTML="<p class='warn'>"+t.geo_deny+"</p>"},{enableHighAccuracy:true,timeout:15000,maximumAge:60000})});
$("cGo").addEventListener("click",function(){var m=($("cLL").value||"").replace(/,/g," ").trim().split(/\s+/).map(Number);if(m.length>=2&&isFinite(m[0])&&isFinite(m[1])&&Math.abs(m[0])<=90&&Math.abs(m[1])<=180)setPoint(m[0],m[1])});
$("cClr").addEventListener("click",function(){PIN=null;RG.clearLayers();if(HL){map.removeLayer(HL);HL=null}$("connOut").innerHTML="<p class='sub'>"+T[L].pick+"</p>";$("connBus").innerHTML="";$("connHub").innerHTML=""});
["cSpd","cDet","cBr","cBs"].forEach(function(id){$(id).addEventListener("change",function(){if(PIN)analyse(PIN[0],PIN[1])})});

/* ---- text ---- */
function render(){var t=T[L];
 document.querySelectorAll("[data-c]").forEach(function(n){var k=n.getAttribute("data-c");if(t[k]!=null)n.textContent=t[k]});
 $("cLL").placeholder=t.latlng;
 $("thesT").innerHTML="<thead><tr>"+t.thes_t.map(function(h){return"<th>"+h+"</th>"}).join("")+"</tr></thead><tbody>"+t.thes_r.map(function(r){return"<tr>"+r.map(function(c){return"<td>"+esc(c)+"</td>"}).join("")+"</tr>"}).join("")+"</tbody>";
 if(PIN)analyse(PIN[0],PIN[1]);else $("connOut").innerHTML="<p class='sub'>"+t.pick+"</p>"}
var lb=$("lang");if(lb)lb.addEventListener("click",function(){setTimeout(function(){L=document.documentElement.lang==="vi"?"vi":"en";render()},60)});
render();
})();
