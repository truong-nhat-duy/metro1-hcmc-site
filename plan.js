"use strict";
/* Long-horizon master-plan view for Hanoi and Ho Chi Minh City. SCHEMATIC: places are approximate, axes are straight lines between named places,
   ring roads are concentric circles of INDICATIVE radius (not routes). Content from the two approved master plans (see SRC). */
(function(){
var Lf=window.L;if(!Lf)return;
var SRC={
 hn:{u:"https://lsvn.vn/thu-tuong-phe-duyet-quy-hoach-thu-do-ha-noi-tam-nhin-den-2050-a151303.html",t:"Decision 1569/QĐ-TTg, 12/12/2024 (Hà Nội 2021–2030, vision 2050), press summary"},
 hcm:{u:"https://vneconomy.vn/duyet-dieu-chinh-quy-hoach-chung-tp-hcm-den-nam-2040-tam-nhin-den-2060.htm",t:"Decision 1125/QĐ-TTg, 11/6/2025 (TP.HCM to 2040, vision 2060), press summary"},
 rr:{u:"https://wiki.batdongsan.com.vn/wiki/duong-vanh-dai-la-gi-110684",t:"Ring-road lengths and status (April 2024), press summary"}};
var CITY={hn:{c:[21.0285,105.8542],col:"#be123c"},hcm:{c:[10.7769,106.7009],col:"#0f766e"}};
/* zones / centres: [city, lat, lng, name_vi, name_en, role_vi, role_en] */
var Z=[
["hn",21.03,105.85,"Vùng đô thị trung tâm","Central urban region","Một trong 5 vùng đô thị của quy hoạch","One of the 5 urban regions of the plan"],
["hn",21.02,105.66,"Vùng thành phố phía Tây","Western city region","Vị trí xấp xỉ; là một trong 5 vùng đô thị","Approximate position; one of the 5 urban regions"],
["hn",21.26,105.86,"Vùng thành phố phía Bắc","Northern city region","Vị trí xấp xỉ; là một trong 5 vùng đô thị","Approximate position; one of the 5 urban regions"],
["hn",20.80,105.90,"Vùng đô thị phía Nam","Southern urban region","Vị trí xấp xỉ; là một trong 5 vùng đô thị","Approximate position; one of the 5 urban regions"],
["hn",21.14,105.48,"Vùng đô thị Sơn Tây – Ba Vì","Sơn Tây – Ba Vì urban region","Vị trí xấp xỉ; vùng gắn với thành cổ Sơn Tây","Approximate position; region tied to the Sơn Tây citadel"],
["hcm",10.78,106.70,"Phân vùng đô thị trung tâm","Central sub-region","Ranh giới là Vành đai 2","Bounded by Ring Road 2"],
["hcm",10.85,106.77,"Phân vùng đô thị Thủ Đức (phía Đông)","Thủ Đức sub-region (east)","Phân vùng phía Đông","Eastern sub-region"],
["hcm",10.68,106.57,"Phân vùng đô thị Bình Chánh (phía Tây)","Bình Chánh sub-region (west)","Phân vùng phía Tây","Western sub-region"],
["hcm",10.93,106.54,"Phân vùng đô thị Củ Chi – Hóc Môn (phía Bắc)","Củ Chi – Hóc Môn sub-region (north)","Phân vùng phía Bắc","Northern sub-region"],
["hcm",10.70,106.73,"Phân vùng đô thị quận 7 – Nhà Bè (phía Nam)","District 7 – Nhà Bè sub-region (south)","Phân vùng phía Nam","Southern sub-region"],
["hcm",10.41,106.96,"Phân vùng đô thị Cần Giờ (phía Đông Nam)","Cần Giờ sub-region (southeast)","Phân vùng phía Đông Nam; cảng trung chuyển quốc tế Cần Giờ đã có chủ trương đầu tư","South-east sub-region; Cần Giờ international transshipment port has an investment policy approval"]];
/* growth axes / corridors: [city, name_vi, name_en, [[lat,lng],...], note_vi, note_en] */
var A=[
["hn","Trục sông Hồng","Red River axis",[[21.20,105.80],[21.06,105.86],[20.90,105.90],[20.72,105.93]],"Trục xanh, trục cảnh quan trung tâm; một trong 5 trục động lực","Green and landscape axis; one of 5 growth axes"],
["hn","Trục Hồ Tây – Cổ Loa","West Lake – Cổ Loa axis",[[21.058,105.823],[21.114,105.874]],"Một trong 5 trục động lực","One of 5 growth axes"],
["hn","Trục Nhật Tân – Nội Bài","Nhật Tân – Nội Bài axis",[[21.083,105.818],[21.221,105.807]],"Một trong 5 trục động lực","One of 5 growth axes"],
["hn","Trục Hồ Tây – Ba Vì","West Lake – Ba Vì axis",[[21.058,105.823],[21.04,105.65],[21.20,105.42]],"Một trong 5 trục động lực; đường nối theo sơ đồ","One of 5 growth axes; connection drawn schematically"],
["hn","Trục phía Nam","Southern axis",[[21.03,105.85],[20.80,105.90]],"Một trong 5 trục động lực; hướng theo sơ đồ","One of 5 growth axes; direction schematic"],
["hcm","Hành lang dọc sông Sài Gòn","Sài Gòn River corridor",[[10.97,106.50],[10.84,106.73],[10.64,106.77]],"Một trong 2 hành lang phát triển mới","One of the 2 new development corridors"],
["hcm","Hướng Đông","East direction",[[10.78,106.70],[10.86,106.95]],"Một trong 4 hướng phát triển; đường vẽ theo sơ đồ","One of 4 development directions; drawn schematically"],
["hcm","Hướng Nam ra biển","South to the sea",[[10.78,106.70],[10.41,106.96]],"Một trong 4 hướng phát triển; gắn hành lang kinh tế ven biển","One of 4 development directions; tied to the coastal economic corridor"],
["hcm","Hướng Tây – Bắc","West – North direction",[[10.78,106.70],[10.97,106.49]],"Một trong 4 hướng phát triển; đường vẽ theo sơ đồ","One of 4 development directions; drawn schematically"],
["hcm","Hướng Tây, Tây – Nam","West, South-west direction",[[10.78,106.70],[10.55,106.50]],"Một trong 4 hướng phát triển; đường vẽ theo sơ đồ","One of 4 development directions; drawn schematically"]];
/* ring roads: [city, name, radius_km (indicative), length text vi, en] */
var R=[
["hn","VĐ1 / Ring 1",2,"7,2 km","7.2 km"],["hn","VĐ2 / Ring 2",5,"43,6 km","43.6 km"],["hn","VĐ2,5 / Ring 2.5",7,"19,41 km","19.41 km"],["hn","VĐ3 / Ring 3",10,"68 km","68 km"],["hn","VĐ3,5 / Ring 3.5",14,"45,64 km","45.64 km"],["hn","VĐ4 / Ring 4",22,"112,8 km (Hà Nội 58,2 km)","112.8 km (Hanoi 58.2 km)"],["hn","VĐ5 / Ring 5",38,"khoảng 331 km","about 331 km"],
["hcm","VĐ1 / Ring 1",5,"26,4 km","26.4 km"],["hcm","VĐ2 / Ring 2",10,"34 km (bài báo có chỗ ghi 50 km)","34 km (the article also gives 50 km)"],["hcm","VĐ3 / Ring 3",19,"73,34 km (TP.HCM 47,51 km)","73.34 km (HCMC 47.51 km)"],["hcm","VĐ4 / Ring 4",32,"trên 200 km (TP.HCM 17,3 km)","over 200 km (HCMC 17.3 km)"]];
/* connecting hubs: [city, lat, lng, name, vi, en] */
var H=[
["hn",21.221,105.807,"Nội Bài","Cửa ngõ trục Nhật Tân – Nội Bài; “đô thị sân bay” là mô hình nêu trong quy hoạch","Gateway of the Nhật Tân – Nội Bài axis; “airport city” is a model named in the plan"],
["hcm",10.40,107.00,"Cảng trung chuyển quốc tế Cần Giờ","Có chủ trương đầu tư; vị trí xấp xỉ","Investment policy approved; position approximate"]];
var T={en:{sum:"Long-horizon master plan (schematic)",show:"Show planning view",city:"City",both:"Hanoi and HCMC",hn:"Hanoi",hcm:"HCMC",
 z:"Urban regions and centres",a:"Growth axes and corridors",r:"Ring roads (indicative radius)",h:"Connecting hubs",rl:"Also show railways and metro lines",ro:"Also show existing ring roads and expressways",lab:"Show names",
 go:"Zoom to",hor:"Horizons in the sources: Hanoi 2021–2030, vision to 2050; HCMC to 2040, vision to 2060. “100 years” is not an official horizon.",
 cav:"Schematic only. Positions are approximate, axes are straight lines between named places, and ring-road circles have invented radii that only show order. They are not official boundaries or routes, and they do not measure anything in this study.",
 lh:"Legend",len:"Length",src:"Sources",st:"Metro stations by status",rg:"TOD rings 500 / 800 / 1,000 m (research convention)",tp:"Planned TOD sites and Metro 2 areas (schematic)",po:"5 growth poles (schematic)",s1:"operating",s2:"under construction",s3:"planned",line:"Line"},
vi:{sum:"Quy hoạch dài hạn (sơ đồ)",show:"Hiện lớp quy hoạch",city:"Thành phố",both:"Hà Nội và TP.HCM",hn:"Hà Nội",hcm:"TP.HCM",
 z:"Vùng đô thị và trung tâm",a:"Trục động lực và hành lang",r:"Đường vành đai (bán kính minh họa)",h:"Đầu mối kết nối",rl:"Hiện thêm đường sắt và tuyến metro",ro:"Hiện thêm vành đai và cao tốc hiện có",lab:"Hiện tên",
 go:"Phóng tới",hor:"Mốc trong các nguồn: Hà Nội 2021–2030, tầm nhìn đến 2050; TP.HCM đến 2040, tầm nhìn đến 2060. “100 năm” không phải mốc chính thức.",
 cav:"Chỉ là sơ đồ. Vị trí xấp xỉ, trục là đường thẳng nối các địa danh, vòng tròn vành đai có bán kính tự đặt chỉ để thể hiện thứ tự. Không phải ranh giới hay tuyến chính thức và không đo lường gì trong nghiên cứu này.",
 lh:"Chú giải",len:"Chiều dài",src:"Nguồn",st:"Ga metro theo trạng thái",rg:"Vành TOD 500 / 800 / 1.000 m (quy ước nghiên cứu)",tp:"Khu TOD quy hoạch và vùng Metro 2 (sơ đồ)",po:"5 cực tăng trưởng (sơ đồ)",s1:"đang chạy",s2:"đang xây",s3:"quy hoạch",line:"Tuyến"}};
function lang(){var l="en";try{var s=localStorage.getItem("lang");if(s==="vi"||s==="en")l=s;else if((navigator.language||"").slice(0,2)==="vi")l="vi"}catch(e){}
 if(document.documentElement.lang==="vi")l="vi";return l}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function attach(map,opts){opts=opts||{};
 var S={on:!!opts.on,city:opts.city||"both",z:true,a:true,r:true,h:true,lab:true,rl:false,ro:false,st:true,rg:false,tp:true,po:true},TD=null,PH=null,SEQ=0,grp=Lf.layerGroup(),ctl=Lf.control({position:opts.pos||"topright"}),el,L=lang();
 ctl.onAdd=function(){el=Lf.DomUtil.create("div","aqp leaflet-bar");Lf.DomEvent.disableClickPropagation(el);Lf.DomEvent.disableScrollPropagation(el);ui();return el};
 function ok(c){return S.city==="both"||S.city===c}
 function srcs(c){return "<hr><small>"+T[L].cav+"<br>"+T[L].src+": <a href='"+SRC[c].u+"' target='_blank' rel='noopener'>"+esc(SRC[c].t)+"</a></small>"}
 function tip(m,txt){if(S.lab)m.bindTooltip(esc(txt),{permanent:true,direction:"right",className:"aqlab",opacity:1});return m}
 function need(){if(!opts.tod)return;if(!TD)TD=fetch("data/tod_layers.json").then(function(r){return r.json()}).catch(function(){return null});if(!PH)PH=fetch("data/plan_hcm.json").then(function(r){return r.json()}).catch(function(){return null});
  Promise.all([TD,PH]).then(function(){draw()})}
 function extra(){var t=T[L],my=++SEQ;if(!opts.tod||!TD||!PH)return;
  Promise.all([TD,PH]).then(function(v){var d=v[0],ph=v[1];if(!d||!S.on||my!==SEQ)return;var cs=[];if(ok("hcm"))cs.push("hcm");if(ok("hn"))cs.push("hn");
   cs.forEach(function(c){var C=d[c];
    if(S.rg){var R=c==="hcm"?[C.rings_ops,C.rings_con]:[C.rings],RC={"500":"#b45309","800":"#d97706","1000":"#f59e0b"};R.forEach(function(rs,ri){["1000","800","500"].forEach(function(k){if(rs&&rs[k])Lf.geoJSON({type:"Feature",geometry:rs[k]},{interactive:false,style:{color:RC[k],weight:1,fillColor:RC[k],fillOpacity:ri?.05:.1,dashArray:ri?"4 4":null}}).addTo(grp)})})}
    if(S.st)C.stations.forEach(function(s){var col=s.s==="operating"?"#0079b8":s.s==="under_construction"?"#ea580c":"#7c8795";var m=Lf.circleMarker([s.p[1],s.p[0]],{radius:s.s==="operating"?6:5,color:"#fff",weight:1.2,fillColor:col,fillOpacity:.95});
     m.bindTooltip(esc(s.n)+" · "+t.line+" "+esc(s.l==="chua_gan"?"–":s.l)+" · "+t[s.s==="operating"?"s1":s.s==="under_construction"?"s2":"s3"]);m.addTo(grp)})});
   if(ph&&ok("hcm")){var cav=L==="vi"?ph.meta.caveat_vi:ph.meta.caveat_en;
    if(S.tp){ph.metro2.forEach(function(a){Lf.geoJSON(a.geom,{style:{color:"#7e22ce",weight:1.5,fillOpacity:.15}}).bindPopup("<b>Metro 2 TOD: "+esc(a.name)+"</b><br>"+a.ha+" ha<hr><small>"+esc(cav)+"</small>",{maxWidth:280}).addTo(grp)});
     ph.nq98.forEach(function(a){if(a.geom)Lf.geoJSON(a.geom,{style:{color:"#0f766e",weight:1.5,fillOpacity:.15}}).bindPopup("<b>#"+a.id+" "+esc(a.name)+"</b><br>"+a.ha+" ha · "+esc(a.line)+"<hr><small>"+esc(cav)+"</small>",{maxWidth:280}).addTo(grp)})}
    if(S.po)ph.poles.forEach(function(q){Lf.circleMarker([q.lat,q.lon],{radius:10,color:"#be123c",weight:2.5,fillColor:"#be123c",fillOpacity:.25}).bindPopup("<b>"+esc(q.name)+"</b><br>"+esc(q.role)+"<hr><small>"+esc(cav)+"</small>",{maxWidth:280}).addTo(grp)})}})}
 function draw(){grp.clearLayers();if(!S.on)return;var t=T[L];extra();
  if(S.z)Z.forEach(function(z){if(!ok(z[0]))return;var m=Lf.circleMarker([z[1],z[2]],{radius:8,color:"#fff",weight:1.5,fillColor:CITY[z[0]].col,fillOpacity:.9});
   m.bindPopup("<b>"+esc(L==="vi"?z[3]:z[4])+"</b><br>"+esc(L==="vi"?z[5]:z[6])+srcs(z[0]),{maxWidth:300});tip(m,L==="vi"?z[3]:z[4]);m.addTo(grp)});
  if(S.a)A.forEach(function(a){if(!ok(a[0]))return;var p=Lf.polyline(a[3],{color:CITY[a[0]].col,weight:3,opacity:.8,dashArray:"2 7",lineCap:"round"});
   p.bindPopup("<b>"+esc(L==="vi"?a[1]:a[2])+"</b><br>"+esc(L==="vi"?a[4]:a[5])+srcs(a[0]),{maxWidth:300});p.addTo(grp)});
  if(S.r)R.forEach(function(r){if(!ok(r[0]))return;var c=CITY[r[0]].c;var k=Lf.circle(c,{radius:r[2]*1000,color:CITY[r[0]].col,weight:1.4,opacity:.75,fill:false,dashArray:"6 5"});
   k.bindPopup("<b>"+esc(r[1])+"</b> ("+(r[0]==="hn"?t.hn:t.hcm)+")<br>"+t.len+": "+esc(L==="vi"?r[3]:r[4])+srcs("rr"),{maxWidth:300});k.addTo(grp)});
  if(S.h)H.forEach(function(h){if(!ok(h[0]))return;var m=Lf.marker([h[1],h[2]],{icon:Lf.divIcon({className:"plhub",html:"<span style='background:"+CITY[h[0]].col+"'></span>",iconSize:[14,14]})});
   m.bindPopup("<b>"+esc(h[3])+"</b><br>"+esc(L==="vi"?h[4]:h[5])+srcs(h[0]),{maxWidth:300});tip(m,h[3]);m.addTo(grp)})}
 function ui(){var t=T[L],open=window.innerWidth>700?"":"";
  function cb(k,x){return"<label><input type='checkbox' data-k='"+k+"'"+(S[k]?" checked":"")+"> "+x+"</label>"}
  var ex=(document.getElementById("cRail")?cb("rl",t.rl)+cb("ro",t.ro):"");
  el.innerHTML="<details"+open+"><summary>"+t.sum+"</summary><div class='aqb'>"+cb("on",t.show)+
  (opts.city?"":"<label>"+t.city+" <select class='plc'><option value='both'"+(S.city==="both"?" selected":"")+">"+t.both+"</option><option value='hn'"+(S.city==="hn"?" selected":"")+">"+t.hn+"</option><option value='hcm'"+(S.city==="hcm"?" selected":"")+">"+t.hcm+"</option></select></label>")+
  cb("z",t.z)+cb("a",t.a)+cb("r",t.r)+cb("h",t.h)+(opts.tod?cb("st",t.st)+cb("rg",t.rg)+(S.city!=="hn"?cb("tp",t.tp)+cb("po",t.po):""):"")+ex+cb("lab",t.lab)+
  (opts.city?"":"<div class='aqbt'>"+t.go+": <button type='button' data-z='hn'>"+t.hn+"</button><button type='button' data-z='hcm'>"+t.hcm+"</button></div>")+
  "<div class='aqleg'><span><i style='background:"+CITY.hn.col+"'></i>"+t.hn+"</span><span><i style='background:"+CITY.hcm.col+"'></i>"+t.hcm+"</span></div>"+
  "<small>"+t.hor+" "+t.cav+"</small></div></details>";wire()}
 function other(id,on){var c=document.getElementById(id);if(c&&c.checked!==on){c.checked=on;c.dispatchEvent(new Event("change",{bubbles:true}))}}
 function wire(){el.querySelectorAll("input[data-k]").forEach(function(i){i.addEventListener("change",function(){var k=i.getAttribute("data-k");S[k]=i.checked;
   if(k==="on"){if(S.on){grp.addTo(map);need()}else map.removeLayer(grp)}if(k==="rl")other("cRail",S.rl);if(k==="ro")other("cRoad",S.ro);draw()})});
  var pc=el.querySelector(".plc");if(pc)pc.addEventListener("change",function(){S.city=this.value;draw();if(S.on){if(S.city==="hn")map.setView(CITY.hn.c,9);else if(S.city==="hcm")map.setView(CITY.hcm.c,9);else map.setView([16,106.5],5)}});
  el.querySelectorAll("[data-z]").forEach(function(b){b.addEventListener("click",function(){var z=b.getAttribute("data-z");map.setView(CITY[z].c,9);if(!S.on){S.on=true;el.querySelector("input[data-k=on]").checked=true;grp.addTo(map);draw()}})})}
 ctl.addTo(map);if(S.on){grp.addTo(map);need();draw()}
 var lb=document.getElementById("lang");if(lb)lb.addEventListener("click",function(){setTimeout(function(){L=lang();if(el){var o=el.querySelector("details").open;ui();el.querySelector("details").open=o;draw()}},80)});
 return{layer:grp,state:S}}
window.PLAN={attach:attach};
})();
