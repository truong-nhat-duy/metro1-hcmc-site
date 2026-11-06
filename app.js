(function(){
"use strict";
var D=window.DATA, L="en";
try{var s=localStorage.getItem("lang");if(s==="vi"||s==="en")L=s;else if((navigator.language||"").slice(0,2)==="vi")L="vi";}catch(e){}
var T={
en:{title:"Metro Line 1 and asking prices in Ho Chi Minh City",subtitle:"Interactive companion to the Fulbright MPP thesis: station-distance rings, hedonic models, machine learning (SHAP) and night lights.",
warn:"Associational evidence. Final sample: asking prices posted after Line 1 opened (22 Dec 2024), plus 2019–2024 listings recovered from the Wayback Machine for a ward-level before–after comparison. Nothing here is a causal estimate of the Metro's total effect.",
nav_map:"Map",nav_coef:"Ring coefficients",nav_ml:"Machine learning",nav_ntl:"Night lights",nav_hyp:"Hypotheses",nav_about:"About",
map_h:"Metro Line 1",ext_l:"Show all collected points of enlarged Ho Chi Minh City",map_p:"Each dot is an asking price per m² (million VND). Move the slider to restrict to listings near a station, change property type, or click anywhere on the map to see its distance ring.",
max_d:"Max distance to station:",type:"Type:",t_all:"All",t_house:"House",t_land:"Land",t_apt:"Apartment",rings:"Rings (500/800/1,200/2,000 m)",listings:"Listings",cheap:"20",dear:"400+",
n_l:"Listings:",med_l:"Median:",mean_l:"Mean:",click_hint:"Click the map: nearest station, distance and ring-1 to ring-4 premium from the baseline model.",
coef_h:"Distance-ring coefficients",coef_p:"Difference in log asking price per m² relative to listings more than 2,000 m from a station, within the same 2 km grid cell. Bars show 95% confidence intervals (standard errors clustered on 5 km cells). Add controls step by step and watch the near-station premium shrink.",
city:"City:",spec:"Specification:",
ml_h:"Machine learning and SHAP",ml_p:"Random forest and gradient boosting are evaluated with 5-fold cross-validation that holds out whole 2 km cells. SHAP shows which variables the forest relies on.",ml_fit:"Out-of-sample R² (variant A: no coordinates)",ml_shap:"Share of SHAP importance (random forest)",
ml_note:"Distance to the station is partly a proxy for location inside the city, so a high SHAP share does not identify a station effect.",
ntl_h:"Night lights before and after opening",ntl_p:"VIIRS monthly night-time radiance (2019–2026) in a 5 km zone around the 14 stations. Pixels within 800 m are compared with pixels 2,000–5,000 m away.",
ntl_ev:"Event study (base year 2023)",ntl_ser:"Mean radiance by ring (2023 = 100)",ntl_note:"The pre-opening gap is not flat (2021–2022 are above 2023), so the parallel-trends assumption fails and the post-opening difference (0.015, p = 0.58 in the pixel panel) is not evidence of a station effect.",
hyp_h:"Hypotheses at a glance",h_hyp:"Hypothesis",h_ev:"Evidence",h_as:"Assessment",
about_h:"About",about_p:"Thesis by Truong Nhat Duy (MPP 2025–2027), Fulbright School of Public Policy and Management. The full cleaned data and code are in a private repository and available on request; aggregated tables are available on request. Listing coordinates here are rounded and carry no seller information.",
foot:"© 2026 Truong Nhat Duy. Map tiles © OpenStreetMap contributors. Exploratory research output, not investment or legal advice.",
perM:"m²",premium:"Premium vs >2,000 m",sample:"Sample",nearest:"Nearest station",dist:"distance",ring:"Ring",ref:"Reference (>2,000 m)",ci:"95% CI",
rn:{r1:"≤500 m",r2:"500–800 m",r3:"800–1,200 m",r4:"1,200–2,000 m"},
spec_d:{"M0": "No location fixed effects (rings + property controls + distance to CBD).", "M1": "Main: 2-km cell fixed effects; SE clustered by 5-km cell.", "M2": "M1 restricted to listings within 5 km of a station.", "R1": "M1 dropping placeholder listing codes and income properties.", "R2": "M1 with 1-km cell fixed effects.", "R3": "M1 trimming ln price at the 1st/99th percentiles.", "R4": "Independent source: Chợ Tốt listings, shared coordinates removed.", "R5": "GuLand + Chợ Tốt pooled with a source dummy.", "T1": "M1, houses only.", "T2": "M1, land plots only."},
hyp:[["H1 Capitalisation","HCMC: +0.162 (SE 0.037) at ≤500 m within 2-km cells (≈18%); replicated with Chotot (0.101), a spatial error model and SHAP; 0.069 when price tails are trimmed. Hanoi ≈ 0.02.","Supported descriptively in HCMC; not in Hanoi"],["H2 Distance decay","Flat to about 1.5 km (bins 0.135–0.210), 0.076 at 1.5–2 km; ≤500 m vs 500–800 m differ by 0.044 (p = 0.49).","Not supported"],["H3 Timing","Ward DiD with 2019–2024 Wayback listings: −0.081 (SE 0.082; permutation p = 0.30). The near–far gap was already at its post-opening level in 2019–2022; pre-trends not flat.","Not supported"],["H4 Station differences","Equal station premia rejected (χ² = 954): An Phú +0.357, Thủ Đức +0.407, Thảo Điền +0.185; Bến Thành −0.108, Bình Thái −0.181.","Supported descriptively"],["H5 Mixed use","Near-station × mixed-use index +0.020 (p = 0.67; 10,348 listings).","Not supported"],["H6 Network","Preliminary network sample: under construction 0.047, approved 0.095, operating 0.024 (n.s.).","Partly supported (anticipation)"]],
shap:{ln_dist_cbd:"ln distance to centre",ln_dist:"ln distance to station",dat:"Land",canho:"Apartment",ln_area:"ln area",ln_floors:"ln(1+floors)",t_mat_tien:"Street frontage",ln_frontage:"ln frontage",green:"Green share",built:"Built-up share",dist_cbd_km:"Distance to centre (km)",land:"Land",apartment:"Apartment",ln_area_m2:"ln area",n_bedrooms_m:"Bedrooms",n_floors_m:"Floors",road_width_m_m:"Road width",frontage_m_m:"Frontage",frontage_m_m_miss:"Frontage missing",src_chotot:"Chợ Tốt source"},
mdl:{"Hồi quy tuyến tính":"Linear","Rừng ngẫu nhiên":"Random forest","Tăng cường gradient":"Gradient boosting"},ev_y:"Gap vs 2,000–5,000 m, ln(1+radiance)",yr:"Year"},
vi:{title:"Metro số 1 và giá rao bất động sản tại TP.HCM",subtitle:"Trang tương tác đi kèm luận văn MPP Fulbright: vành khoảng cách tới ga, mô hình hedonic, học máy (SHAP) và ánh sáng đêm.",
warn:"Bằng chứng mang tính tương quan. Mẫu cuối: giá rao sau khi Tuyến 1 vận hành (22/12/2024), cùng tin 2019–2024 thu từ Wayback Machine cho so sánh trước–sau theo phường. Không có gì ở đây là ước lượng nhân quả về tác động toàn phần của Metro.",
nav_map:"Bản đồ",nav_coef:"Hệ số vành",nav_ml:"Học máy",nav_ntl:"Ánh sáng đêm",nav_hyp:"Giả thuyết",nav_about:"Giới thiệu",
map_h:"Metro số 1",ext_l:"Hiện toàn bộ điểm dữ liệu TP.HCM mở rộng",map_p:"Mỗi chấm là giá rao trên m² (triệu đồng). Kéo thanh trượt để chỉ xem tin gần ga, đổi loại hình, hoặc bấm vào bất kỳ điểm nào trên bản đồ để biết vành khoảng cách của nó.",
max_d:"Khoảng cách tối đa tới ga:",type:"Loại hình:",t_all:"Tất cả",t_house:"Nhà riêng",t_land:"Đất",t_apt:"Căn hộ",rings:"Vành (500/800/1.200/2.000 m)",listings:"Tin đăng",cheap:"20",dear:"400+",
n_l:"Số tin:",med_l:"Trung vị:",mean_l:"Trung bình:",click_hint:"Bấm vào bản đồ: ga gần nhất, khoảng cách và mức chênh lệch vành từ mô hình cơ sở.",
coef_h:"Hệ số vành khoảng cách",coef_p:"Chênh lệch log giá rao/m² so với tin cách ga trên 2.000 m, trong cùng ô lưới 2 km. Thanh là khoảng tin cậy 95% (sai số chuẩn gom cụm theo ô 5 km). Thêm biến kiểm soát từng bước để thấy mức chênh lệch gần ga thu hẹp.",
city:"Thành phố:",spec:"Đặc tả:",
ml_h:"Học máy và SHAP",ml_p:"Rừng ngẫu nhiên và tăng cường gradient được đánh giá bằng kiểm định chéo 5 nhóm, mỗi nhóm giữ nguyên các ô 2 km. SHAP cho biết rừng dựa vào biến nào.",ml_fit:"R² ngoài mẫu (biến thể A: không tọa độ)",ml_shap:"Tỷ trọng SHAP (rừng ngẫu nhiên)",
ml_note:"Khoảng cách tới ga một phần là chỉ dấu vị trí trong thành phố, nên tỷ trọng SHAP cao không đồng nghĩa với hiệu ứng của ga.",
ntl_h:"Ánh sáng đêm trước và sau mở tuyến",ntl_p:"Độ chói ban đêm VIIRS theo tháng (2019–2026) trong vùng 5 km quanh 14 ga. Pixel trong 800 m được so với pixel cách ga 2.000–5.000 m.",
ntl_ev:"Event-study (năm gốc 2023)",ntl_ser:"Độ chói trung bình theo vành (2023 = 100)",ntl_note:"Chênh lệch trước mở tuyến không phẳng (2021–2022 cao hơn 2023), nên giả định xu hướng song song không thỏa và chênh lệch sau mở tuyến (0,015; p = 0,58 trong bảng pixel) không phải bằng chứng về tác động của ga.",
hyp_h:"Tóm tắt giả thuyết",h_hyp:"Giả thuyết",h_ev:"Bằng chứng",h_as:"Đánh giá",
about_h:"Giới thiệu",about_p:"Luận văn của Trương Nhật Duy (MPP 2025–2027), Trường Chính sách công và Quản lý Fulbright. Dữ liệu sạch đầy đủ và mã nguồn nằm trong kho riêng tư, có thể cung cấp khi được yêu cầu; bảng tổng hợp có khi được yêu cầu. Tọa độ tin đăng ở đây đã làm tròn và không chứa thông tin người đăng.",
foot:"© 2026 Trương Nhật Duy. Nền bản đồ © những người đóng góp OpenStreetMap. Kết quả nghiên cứu thăm dò, không phải tư vấn đầu tư hay pháp lý.",
perM:"m²",premium:"Chênh lệch so với >2.000 m",sample:"Mẫu",nearest:"Ga gần nhất",dist:"khoảng cách",ring:"Vành",ref:"Nhóm đối chiếu (>2.000 m)",ci:"KTC 95%",
rn:{r1:"≤500 m",r2:"500–800 m",r3:"800–1.200 m",r4:"1.200–2.000 m"},
spec_d:{"M0": "Không có hiệu ứng cố định vị trí (vành + thuộc tính + khoảng cách tới trung tâm).", "M1": "Chính: hiệu ứng cố định ô 2 km; sai số chuẩn gom cụm theo ô 5 km.", "M2": "M1 giới hạn trong 5 km quanh ga.", "R1": "M1 bỏ mã tin giả và tài sản tạo thu nhập.", "R2": "M1 với hiệu ứng cố định ô 1 km.", "R3": "M1 cắt 1% đuôi hai phía của ln giá.", "R4": "Nguồn độc lập: tin Chợ Tốt, bỏ tọa độ dùng chung.", "R5": "Gộp GuLand và Chợ Tốt với biến chỉ báo nguồn.", "T1": "M1, chỉ nhà riêng.", "T2": "M1, chỉ đất."},
hyp:[["H1 Vốn hóa","TP.HCM: +0,162 (SE 0,037) ở ≤500 m trong cùng ô 2 km (≈18%); lặp lại với Chợ Tốt (0,101), mô hình sai số không gian và SHAP; 0,069 khi cắt đuôi giá. Hà Nội ≈ 0,02.","Ủng hộ theo nghĩa mô tả ở TP.HCM; không ở Hà Nội"],["H2 Suy giảm theo khoảng cách","Phẳng đến khoảng 1,5 km (các bậc 0,135–0,210), 0,076 ở 1,5–2 km; hai vành đầu chênh 0,044 (p = 0,49).","Không được ủng hộ"],["H3 Thời điểm","DiD theo phường với tin Wayback 2019–2024: −0,081 (SE 0,082; p hoán vị 0,30). Chênh lệch gần/xa ga 2019–2022 đã ở mức sau vận hành; xu hướng trước không phẳng.","Không được ủng hộ"],["H4 Khác biệt giữa ga","Bác bỏ các ga bằng nhau (χ² = 954): An Phú +0,357, Thủ Đức +0,407, Thảo Điền +0,185; Bến Thành −0,108, Bình Thái −0,181.","Ủng hộ theo nghĩa mô tả"],["H5 Sử dụng đất hỗn hợp","Tương tác gần ga × MLU +0,020 (p = 0,67; 10.348 tin).","Không được ủng hộ"],["H6 Toàn mạng","Mẫu sơ bộ toàn mạng: đang xây 0,047, đã phê duyệt 0,095, vận hành 0,024 (không có ý nghĩa).","Ủng hộ một phần (kỳ vọng)"]],
shap:{ln_dist_cbd:"ln khoảng cách tới trung tâm",ln_dist:"ln khoảng cách tới ga",dat:"Đất",canho:"Căn hộ",ln_area:"ln diện tích",ln_floors:"ln(1+số tầng)",t_mat_tien:"Mặt tiền phố",ln_frontage:"ln mặt tiền",green:"Cây xanh",built:"Đất xây dựng",dist_cbd_km:"Khoảng cách tới trung tâm (km)",land:"Đất",apartment:"Căn hộ",ln_area_m2:"ln diện tích",n_bedrooms_m:"Số phòng ngủ",n_floors_m:"Số tầng",road_width_m_m:"Lộ giới",frontage_m_m:"Mặt tiền",frontage_m_m_miss:"Thiếu mặt tiền",src_chotot:"Nguồn Chợ Tốt"},
mdl:{"Hồi quy tuyến tính":"Tuyến tính","Rừng ngẫu nhiên":"Rừng ngẫu nhiên","Tăng cường gradient":"Tăng cường gradient"},ev_y:"Chênh lệch so với 2.000–5.000 m, ln(1+độ chói)",yr:"Năm"}
};
var $=function(i){return document.getElementById(i)};
var nf=function(x,k){var s=(+x).toFixed(k==null?3:k);return L==="vi"?s.replace(".",","):s;};
var fmtInt=function(x){return Math.round(x).toLocaleString(L==="vi"?"vi-VN":"en-US");};
// ---------- map
var Lf=window.L, map=Lf.map("map").setView([10.8,106.74],12), GM=Geo.init(map,"hcm",{types:true,amen:true,mlu:true});
if(window.AQ)AQ.attach(map,{pos:"topright"});if(window.PLAN)PLAN.attach(map,{pos:"topright"});
var ringLayer=Lf.layerGroup().addTo(map), stLayer=Lf.layerGroup().addTo(map), clickLayer=Lf.layerGroup().addTo(map);
var RING_R=[500,800,1200,2000], RING_C=["#0b5ea8","#2e86c1","#85c1e9","#aed6f1"], MD=6000, TP="all";
var PM=400, ptsL=new Geo.TypeLayer(D.points,{city:"hcm",filter:function(p){return p[4]<=MD&&p[2]<=PM&&(TP==="all"||p[3]===TP)},onView:function(l){var v=l.map(function(p){return p[2]}),e=$("sv");if(e)e.textContent=v.length?fmtInt(v.length)+" · "+nf(median(v),1):"\u2013"}});
function drawStations(){stLayer.clearLayers();D.stations.forEach(function(s){var m=GM.station(s,{label:L==="vi"?s.vi:s.en,ix:s.id==="S01"}).addTo(stLayer);s.m=m;});}
function drawRings(){ringLayer.clearLayers();if(!$("rings").checked)return;D.stations.forEach(function(s){RING_R.forEach(function(r,i){Lf.circle([s.lat,s.lng],{radius:r,color:RING_C[i],weight:1,fill:true,fillColor:RING_C[i],fillOpacity:.05,opacity:.75,interactive:false}).addTo(ringLayer)})});}
function median(a){if(!a.length)return NaN;a=a.slice().sort(function(x,y){return x-y});var m=a.length>>1;return a.length%2?a[m]:(a[m-1]+a[m])/2;}
var EXTD=null,EXTB=false;
function curPts(){var e=$("extpts");return e&&e.checked&&EXTD?EXTD:D.points}
function loadExt(){if(EXTD||EXTB)return;EXTB=true;var ks=["hcm","bd","brvt"],out=[],ok=0;
 ks.forEach(function(k){fetch("data/sale_"+k+".json").then(function(r){return r.json()}).then(function(j){j.p.forEach(function(r){var t=r[3];if(t!=="n"&&t!=="d"&&t!=="c")return;var bd=1e12;D.stations.forEach(function(s){var d=hav(r[0],r[1],s.lat,s.lng);if(d<bd)bd=d});
  out.push([r[0],r[1],r[2],t,Math.round(bd),bd<=500?"r1":bd<=800?"r2":bd<=1200?"r3":bd<=2000?"r4":"r5"])});
  if(++ok===ks.length){EXTD=out;applyExt(true)}}).catch(function(){EXTB=false})})}
function applyExt(first){var on=$("extpts").checked&&EXTD,r=$("rng");ptsL._p=on?EXTD:D.points;r.max=on?40000:6000;r.step=on?500:100;if(first||!on||+r.value>+r.max)r.value=on?40000:6000;
 if(on&&first)map.setView([10.88,106.8],10);drawPts()}
function drawPts(){MD=+$("rng").value;TP=$("typ").value;PM=+$("pmx").value;var v=[];$("rngv").textContent=fmtInt(MD)+" m";$("pmxv").textContent=PM>=400?"400+":PM;
 curPts().forEach(function(p){if(p[4]<=MD&&p[2]<=PM&&(TP==="all"||p[3]===TP))v.push(p[2])});
 if($("pts").checked){if(!map.hasLayer(ptsL))map.addLayer(ptsL);ptsL.redraw()}else map.removeLayer(ptsL);
 $("sn").textContent=v.length?fmtInt(v.length):"\u2013";$("sm").textContent=v.length?nf(median(v),1):"\u2013";$("sa").textContent=v.length?nf(v.reduce(function(a,b){return a+b},0)/v.length,1):"\u2013";}
function hav(a,b,c,d){var R=6371000,r=Math.PI/180,x=(c-a)*r,y=(d-b)*r,h=Math.sin(x/2)*Math.sin(x/2)+Math.cos(a*r)*Math.cos(c*r)*Math.sin(y/2)*Math.sin(y/2);return 2*R*Math.asin(Math.sqrt(h));}
map.on("click",function(e){if(ptsL._map&&ptsL.hit(e.containerPoint))return;var best=null,bd=1e12;D.stations.forEach(function(s){var d=hav(e.latlng.lat,e.latlng.lng,s.lat,s.lng);if(d<bd){bd=d;best=s}});
 var r=bd<=500?"r1":bd<=800?"r2":bd<=1200?"r3":bd<=2000?"r4":null,t=T[L],c=D.coefs.hcm.M1.rings.filter(function(x){return x.t===r})[0];
 clickLayer.clearLayers();Lf.marker(e.latlng).addTo(clickLayer);Lf.polyline([e.latlng,[best.lat,best.lng]],{color:"#c2410c",dashArray:"4 4"}).addTo(clickLayer);
 $("clickinfo").textContent=t.nearest+": "+(L==="vi"?best.vi:best.en)+" · "+t.dist+": "+fmtInt(bd)+" m · "+(r?t.ring+" "+t.rn[r]+" · E0: "+nf(c.est,3)+" ("+t.ci+" "+nf(c.lo,3)+" … "+nf(c.hi,3)+")":t.ref);});
["rng","typ","pts","pmx"].forEach(function(i){$(i).addEventListener("input",drawPts)});$("extpts").addEventListener("change",function(){if(this.checked&&!EXTD)loadExt();else applyExt(true)});if($("extpts").checked)loadExt();$("rings").addEventListener("input",drawRings);
// ---------- charts
var ch={};function mk(id,cfg){if(ch[id])ch[id].destroy();ch[id]=new Chart($(id).getContext("2d"),cfg);}
var css=function(v){return getComputedStyle(document.documentElement).getPropertyValue(v).trim()};
function coefChart(){var c=$("city").value,sp=$("spec"),t=T[L];var avail=Object.keys(D.coefs[c]);var cur=sp.value;sp.innerHTML="";
 ["M1","M0","M2","R1","R2","R3","R4","R5","T1","T2"].forEach(function(k){if(avail.indexOf(k)<0)return;var o=document.createElement("option");o.value=k;o.textContent=k;sp.appendChild(o)});
 sp.value=avail.indexOf(cur)>=0?cur:"M1";var m=D.coefs[c][sp.value];$("specdesc").textContent=t.spec_d[sp.value];
 var labs=m.rings.map(function(r){return t.rn[r.t]});
 mk("cCoef",{data:{labels:labs,datasets:[{type:"bar",label:t.ci,data:m.rings.map(function(r){return [r.lo,r.hi]}),backgroundColor:css("--acc")+"55",borderColor:css("--acc"),borderWidth:1,barPercentage:.35},
  {type:"line",label:"β",data:m.rings.map(function(r){return r.est}),showLine:false,pointRadius:6,pointBackgroundColor:css("--acc2"),borderColor:css("--acc2")}]},
  options:{maintainAspectRatio:false,scales:{y:{title:{display:true,text:"Δ ln(price/m²)"},grid:{color:css("--line")}},x:{grid:{display:false}}},plugins:{tooltip:{callbacks:{label:function(x){var r=m.rings[x.dataIndex];return "β="+nf(r.est)+"  ["+nf(r.lo)+", "+nf(r.hi)+"]  p="+nf(r.p)}}}}}});
 $("coefnote").textContent=t.sample+": n = "+fmtInt(m.n)+(m.wr2?" · within R² = "+nf(m.wr2):"");}
function mlCharts(){var t=T[L],names=["Hồi quy tuyến tính","Rừng ngẫu nhiên","Tăng cường gradient"],cities=["TP.HCM","Hà Nội"];
 mk("cML",{type:"bar",data:{labels:names.map(function(n){return t.mdl[n]}),datasets:cities.map(function(c,i){return {label:c==="TP.HCM"?"Ho Chi Minh City":"Hà Nội",backgroundColor:i?css("--acc2"):css("--acc"),data:names.map(function(n){var r=D.ml.filter(function(x){return x.city===c&&x.variant==="A"&&x.model===n})[0];return r.r2})}})},
  options:{maintainAspectRatio:false,scales:{y:{min:0,max:1,title:{display:true,text:"R²"},grid:{color:css("--line")}}}}});
 var c=$("city2").value,d=D.shap.filter(function(x){return x.city===c});
 mk("cSHAP",{type:"bar",data:{labels:d.map(function(x){return t.shap[x.feature]||x.label}),datasets:[{data:d.map(function(x){return 100*x.share}),backgroundColor:css("--acc")}]},
  options:{indexAxis:"y",maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{title:{display:true,text:"%"},grid:{color:css("--line")}}}}});}
function ntlCharts(){var t=T[L],e=D.ntlEvent;
 mk("cEv",{data:{labels:e.map(function(x){return x.year}),datasets:[{type:"bar",label:t.ci,data:e.map(function(x){return [x.lo,x.hi]}),backgroundColor:css("--acc")+"55",borderColor:css("--acc"),borderWidth:1,barPercentage:.3},
  {type:"line",label:"β",data:e.map(function(x){return x.est}),showLine:false,pointRadius:5,pointBackgroundColor:css("--acc2")}]},options:{maintainAspectRatio:false,scales:{y:{title:{display:true,text:t.ev_y},grid:{color:css("--line")}},x:{title:{display:true,text:t.yr}}}}});
 var rings=["r1","r2","r3","r4","ref"],yrs=[2019,2020,2021,2022,2023,2024,2025,2026],pal=["#08306b","#2171b5","#6baed6","#9ecae1","#bdbdbd"];
 mk("cSer",{type:"line",data:{labels:yrs,datasets:rings.map(function(r,i){return {label:r==="ref"?"2,000–5,000 m":t.rn[r],borderColor:pal[i],backgroundColor:pal[i],pointRadius:2,tension:.2,data:yrs.map(function(y){var q=D.ntlYear.filter(function(x){return x.ring===r&&x.year===y})[0];return q?q.idx:null})}})},
  options:{maintainAspectRatio:false,scales:{y:{title:{display:true,text:"index"},grid:{color:css("--line")}}}}});}
function hyp(){var cls=["g","a","a","g","a","a"];$("hypcards").innerHTML=T[L].hyp.map(function(r,i){return "<div class=\"fc\"><span class=\"chip "+cls[i]+"\">"+r[2]+"</span><h4>"+r[0]+"</h4><p>"+r[1]+"</p></div>"}).join("");$("hyptb").innerHTML=T[L].hyp.map(function(r){return "<tr><td><b>"+r[0]+"</b></td><td>"+r[1]+"</td><td>"+r[2]+"</td></tr>"}).join("");}
function applyLang(){var t=T[L];document.documentElement.lang=L;document.querySelectorAll("[data-i]").forEach(function(n){var k=n.getAttribute("data-i");if(t[k]!=null)n.textContent=t[k]});
 document.title=t.title;GM.setLang(L);Geo.setLang(L);drawStations();$("lang").textContent=L==="en"?"VI":"EN";hyp();drawPts();coefChart();mlCharts();ntlCharts();}
$("lang").addEventListener("click",function(){L=L==="en"?"vi":"en";try{localStorage.setItem("lang",L)}catch(e){}applyLang()});
["city","spec"].forEach(function(i){$(i).addEventListener("change",coefChart)});$("city2").addEventListener("change",mlCharts);
drawRings();applyLang();
})();
