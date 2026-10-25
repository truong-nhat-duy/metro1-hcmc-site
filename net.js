(function(){
var N=window.NET,Lf=window.L;if(!N||!Lf)return;
var T={en:{nav_find:"Findings",nav_pd:"Price vs distance",nav_data:"Data",tag:"Fulbright MPP thesis · Urban economics",
k1l:"asking-price listings in the analysis sample (Ho Chi Minh City and Hanoi)",k2l:"stations on Metro Line 1, open since 22 Dec 2024",k3l:"baseline premium within 500 m of a station, Ho Chi Minh City (log points, E0)",k4l:"best out-of-sample R², gradient boosting, Ho Chi Minh City",
cta1:"Explore the map",cta2:"Read the findings",warn_b:"Descriptive evidence only.",
find_h:"Findings at a glance",find_p:"Six hypotheses from the research proposal and what the data say. Evidence is correlational: asking prices after the line opened, no pre-opening period.",
pd_h:"Price and distance to the nearest station",pd_p:"Median asking price per m² by distance band and the distribution of prices, from the listing sample used on the map (all distances up to 6 km).",pd_city:"City:",pd_h1:"Median ask by distance band (mn VND/m²)",pd_h2:"Distribution of asking prices (mn VND/m²)",pd_note:"Bands with fewer than 10 listings are left blank. Prices rise toward the centre, so distance to the station also captures location inside the city; the regression sections separate the two only partly.",
data_h:"Data, method and downloads",data_p:"Asking prices from GuLand (40,834 sale listings: 32,520 in Ho Chi Minh City and 8,314 in Hanoi), a further 3,398 Chợ Tốt apartment listings, VIIRS VNP46A3 night lights (92 months), WorldPop and OpenStreetMap. Hedonic models regress log asking price per m² on distance rings with 2 km cell fixed effects and standard errors clustered on 5 km cells; random forest and gradient boosting use the same variables.",
dl_h:"Aggregated tables for Power BI, Excel or R",dl_p:"Model results and a rounded-coordinate listing sample, with no seller information. The full cleaned data and code stay in a private repository and are available on request.",
f_coef:"Ring coefficients, all specifications",f_ml:"Fit of linear, forest and boosting models",f_shap:"SHAP shares by variable",f_ntl1:"Night-light event study",f_ntl2:"Night-light radiance by ring and year",f_st:"The 14 Metro Line 1 stations",f_ls:"Listing sample behind the map (rounded to ~10 m)",
share_h:"Share this site",share_p:"Scan to open the website on a phone. The same code is used on the defence slides.",
theme_note:"",
nav_net:"Network",nav_hn:"Hanoi",nav_shap:"SHAP",nav_stn:"By station",
net_h:"Whole network: Ho Chi Minh City metro lines",
net_p:"Seventy stations from the project's reference table. Only Line 1 (14 stations, opened 22 Dec 2024) is operating; Line 2 stations are under construction or planned, and the remaining 38 points are planned stations whose line assignment is not verified. Dashed lines connect named stations in order and are schematic, not surveyed alignments.",
net_warn:"No price effect is estimated for any line other than Line 1: the others are not open and the listing data are asking prices after 22 Dec 2024.",
op:"Operating",uc:"Under construction",pl:"Planned / unassigned",L1:"Line 1",L2:"Line 2",NA:"Unassigned",
stn_col:"Station",line_col:"Line",st_col:"Status",cbd_col:"Distance to centre (km)",poi_col:"POIs within 1 km",nl_col:"Listings within 1 km",pp_col:"Median ask within 1 km (mn VND/m²)",
plan_h:"Planned lines in the reference table",plan_l:"Line",plan_r:"Route",plan_k:"Length (km)",plan_n:"Stations",plan_s:"Status",
hn_h:"Comparison with Hanoi Metro",
hn_p:"Hanoi listings are matched to Line 2A (Cát Linh–Hà Đông) and Line 3 (Nhổn–Ga Hà Nội). The station coordinates come from OpenStreetMap and are not yet checked against the official station centre-lines; treat distances as approximate.",
cmp_h:"Sample and estimates side by side",c_met:"Metric",c_hcm:"Ho Chi Minh City",c_hn:"Hanoi",
m_n:"Listings in the analysis sample",m_med:"Median ask (mn VND/m²)",m_iqr:"Interquartile range (mn VND/m²)",m_dmed:"Median distance to nearest station (m)",m_800:"Listings within 800 m",m_2000:"Listings within 2,000 m",m_mix:"Houses / land / apartments",
m_r1:"Ring 1 (≤500 m) coefficient, E0",m_r2:"Ring 2 (500–800 m) coefficient, E0",m_r2s:"Linear model R² (A)",m_rf:"Random forest R² (A)",m_gbm:"Boosting R² (A)",
ns:"not significant",sig:"significant at 5%",
hn_cap:"Hanoi: Line 2A and Line 3 stations (orange / purple) and a sample of listings coloured by ring",
hn_note:"In Hanoi the ring-1 coefficient in the baseline specification is close to zero and not significant, while in Ho Chi Minh City it is positive and significant in the baseline. Different data, station sets and stages of opening mean this is a description of two samples, not a test of why they differ.",
coefcmp:"Baseline (E0) ring coefficients, both cities",
shap_h:"SHAP in detail",
shap_p:"Random forest and gradient boosting fit the same variables as the hedonic model. SHAP shares show how the fitted forest uses each variable; they do not measure causal effects, and the m_* rows are missing-value indicators.",
shap_city:"City",shap_top:"Number of variables",shap_group:"Distance variables carry",
ml_tab:"Out-of-sample style fit (all models)",c_city:"City",c_var:"Variant",c_mod:"Model",c_r2:"R²",c_rmse:"RMSE",c_mae:"MAE",
pst:{"Quy hoạch":"Planned","Khai thác một phần":"Partly operating"},mdl:{"Hồi quy tuyến tính":"Linear regression","Rừng ngẫu nhiên":"Random forest","Tăng cường gradient":"Gradient boosting"},
stn_h:"Station-level discontinuity at 1,200 m (exploratory)",
stn_p:"A spatial regression discontinuity for each of the 14 stations. Most stations have too few listings on either side of the cutoff to estimate anything, so the three estimable stations are a diagnostic, not a ranking of station effects.",
s_stn:"Station",s_spec:"Estimable specs at 1,200 m",s_est:"Mean estimate (Δ ln price)",s_pct:"Approx. %",s_n:"Max listings in a spec",s_sig:"Significant at 5%",yes:"yes",no:"no",ne:"not estimable",
src:"Sources: the project's reference tables and model results (private repository; aggregated tables are in the downloads below). Asking prices, not transaction prices."
},vi:{nav_find:"Kết quả chính",nav_pd:"Giá và khoảng cách",nav_data:"Dữ liệu",tag:"Luận văn MPP Fulbright · Kinh tế đô thị",
k1l:"tin rao trong mẫu phân tích (TP.HCM và Hà Nội)",k2l:"ga Metro số 1, khai thác từ 22/12/2024",k3l:"mức chênh cơ sở trong 500 m quanh ga, TP.HCM (điểm log, E0)",k4l:"R² ngoài mẫu cao nhất, tăng cường gradient, TP.HCM",
cta1:"Khám phá bản đồ",cta2:"Xem kết quả chính",warn_b:"Chỉ là bằng chứng mô tả.",
find_h:"Kết quả chính",find_p:"Sáu giả thuyết trong đề cương và điều dữ liệu cho thấy. Bằng chứng mang tính tương quan: giá rao sau khi tuyến mở, không có kỳ trước mở tuyến.",
pd_h:"Giá và khoảng cách tới ga gần nhất",pd_p:"Giá rao trung vị trên m² theo dải khoảng cách và phân phối giá, từ mẫu tin dùng trên bản đồ (mọi khoảng cách tới 6 km).",pd_city:"Thành phố:",pd_h1:"Giá rao trung vị theo dải khoảng cách (tr đồng/m²)",pd_h2:"Phân phối giá rao (tr đồng/m²)",pd_note:"Dải có dưới 10 tin để trống. Giá tăng dần về trung tâm nên khoảng cách tới ga cũng phản ánh vị trí trong thành phố; các phần hồi quy chỉ tách hai yếu tố này một phần.",
data_h:"Dữ liệu, phương pháp và tải về",data_p:"Giá rao từ GuLand (40.834 tin bán: 32.520 ở TP.HCM và 8.314 ở Hà Nội), thêm 3.398 tin căn hộ Chợ Tốt, ánh sáng đêm VIIRS VNP46A3 (92 tháng), WorldPop và OpenStreetMap. Mô hình hedonic hồi quy log giá rao/m² theo vành khoảng cách với hiệu ứng cố định ô 2 km và sai số chuẩn gom cụm theo ô 5 km; rừng ngẫu nhiên và tăng cường gradient dùng cùng các biến.",
dl_h:"Bảng tổng hợp cho Power BI, Excel hoặc R",dl_p:"Kết quả mô hình và mẫu tin với tọa độ đã làm tròn, không có thông tin người bán. Dữ liệu sạch đầy đủ và mã nguồn nằm trong kho riêng tư, có thể cung cấp khi được yêu cầu.",
f_coef:"Hệ số vành, mọi đặc tả",f_ml:"Độ khớp mô hình tuyến tính, rừng, boosting",f_shap:"Tỷ trọng SHAP theo biến",f_ntl1:"Event-study ánh sáng đêm",f_ntl2:"Độ chói ánh sáng đêm theo vành và năm",f_st:"14 ga Metro số 1",f_ls:"Mẫu tin dùng cho bản đồ (làm tròn ~10 m)",
share_h:"Chia sẻ trang web",share_p:"Quét để mở website trên điện thoại. Cùng mã này được dùng trên slide bảo vệ.",
theme_note:"",
nav_net:"Toàn mạng",nav_hn:"Hà Nội",nav_shap:"SHAP",nav_stn:"Theo ga",
net_h:"Toàn mạng: các tuyến metro TP.HCM",
net_p:"Bảy mươi ga trong bảng tham chiếu của đề tài. Chỉ Tuyến 1 (14 ga, khai thác 22/12/2024) đang vận hành; các ga Tuyến 2 đang xây dựng hoặc quy hoạch, 38 điểm còn lại là ga quy hoạch chưa xác minh tuyến. Đường nét đứt chỉ nối các ga theo thứ tự, mang tính sơ đồ, không phải tim tuyến đo đạc.",
net_warn:"Không ước lượng hiệu ứng giá cho tuyến nào ngoài Tuyến 1: các tuyến khác chưa mở và dữ liệu là giá rao sau 22/12/2024.",
op:"Đang vận hành",uc:"Đang xây dựng",pl:"Quy hoạch / chưa gán tuyến",L1:"Tuyến 1",L2:"Tuyến 2",NA:"Chưa gán tuyến",
stn_col:"Ga",line_col:"Tuyến",st_col:"Trạng thái",cbd_col:"Cách trung tâm (km)",poi_col:"Số POI trong 1 km",nl_col:"Tin rao trong 1 km",pp_col:"Giá rao trung vị trong 1 km (tr đồng/m²)",
plan_h:"Các tuyến quy hoạch trong bảng tham chiếu",plan_l:"Tuyến",plan_r:"Hành trình",plan_k:"Dài (km)",plan_n:"Số ga",plan_s:"Trạng thái",
hn_h:"So sánh với Metro Hà Nội",
hn_p:"Tin rao Hà Nội được gán với Tuyến 2A (Cát Linh–Hà Đông) và Tuyến 3 (Nhổn–Ga Hà Nội). Tọa độ ga lấy từ OpenStreetMap, chưa đối chiếu tim ga chính thức; khoảng cách chỉ mang tính xấp xỉ.",
cmp_h:"Mẫu và ước lượng cạnh nhau",c_met:"Chỉ tiêu",c_hcm:"TP.HCM",c_hn:"Hà Nội",
m_n:"Số tin trong mẫu phân tích",m_med:"Giá rao trung vị (tr đồng/m²)",m_iqr:"Khoảng tứ phân vị (tr đồng/m²)",m_dmed:"Khoảng cách trung vị tới ga gần nhất (m)",m_800:"Tin trong 800 m",m_2000:"Tin trong 2.000 m",m_mix:"Nhà riêng / đất / căn hộ",
m_r1:"Hệ số vành 1 (≤500 m), E0",m_r2:"Hệ số vành 2 (500–800 m), E0",m_r2s:"R² hồi quy tuyến tính (A)",m_rf:"R² rừng ngẫu nhiên (A)",m_gbm:"R² tăng cường gradient (A)",
ns:"không có ý nghĩa",sig:"có ý nghĩa 5%",
hn_cap:"Hà Nội: ga Tuyến 2A và Tuyến 3 (cam / tím) và mẫu tin rao tô theo vành",
hn_note:"Ở Hà Nội hệ số vành 1 trong đặc tả cơ sở gần bằng 0 và không có ý nghĩa, còn ở TP.HCM hệ số này dương và có ý nghĩa trong đặc tả cơ sở. Dữ liệu, tập ga và giai đoạn mở tuyến khác nhau, nên đây là mô tả hai mẫu chứ không kiểm định nguyên nhân khác biệt.",
coefcmp:"Hệ số các vành đặc tả cơ sở (E0), hai thành phố",
shap_h:"SHAP chi tiết",
shap_p:"Rừng ngẫu nhiên và tăng cường gradient dùng cùng các biến với mô hình hedonic. Tỷ trọng SHAP cho biết rừng đã khớp sử dụng từng biến ra sao; không đo hiệu ứng nhân quả, và các dòng m_* là biến chỉ báo giá trị thiếu.",
shap_city:"Thành phố",shap_top:"Số biến hiển thị",shap_group:"Nhóm biến khoảng cách chiếm",
ml_tab:"Độ khớp của tất cả mô hình",c_city:"Thành phố",c_var:"Biến thể",c_mod:"Mô hình",c_r2:"R²",c_rmse:"RMSE",c_mae:"MAE",
pst:{"Quy hoạch":"Quy hoạch","Khai thác một phần":"Khai thác một phần"},mdl:{"Hồi quy tuyến tính":"Hồi quy tuyến tính","Rừng ngẫu nhiên":"Rừng ngẫu nhiên","Tăng cường gradient":"Tăng cường gradient"},
stn_h:"Gián đoạn theo từng ga tại 1.200 m (thăm dò)",
stn_p:"RDD không gian cho từng ga trong 14 ga. Phần lớn ga có quá ít tin ở hai phía ngưỡng nên không ước lượng được, vì vậy ba ga ước lượng được chỉ là chẩn đoán, không phải xếp hạng hiệu ứng ga.",
s_stn:"Ga",s_spec:"Số đặc tả ước lượng được ở 1.200 m",s_est:"Ước lượng trung bình (Δ ln giá)",s_pct:"Xấp xỉ %",s_n:"Số tin lớn nhất trong một đặc tả",s_sig:"Có ý nghĩa 5%",yes:"có",no:"không",ne:"không ước lượng được",
src:"Nguồn: bảng tham chiếu và kết quả mô hình của đề tài (kho riêng tư; bảng tổng hợp có ở mục tải về bên dưới). Giá rao, không phải giá giao dịch."
}};
var FEAT={ln_dist_cbd:["ln(distance to centre)","ln(khoảng cách tới trung tâm)"],ln_dist:["ln(distance to station)","ln(khoảng cách tới ga)"]};
var $=function(i){return document.getElementById(i)},L=document.documentElement.lang==="vi"?"vi":"en";
try{var s=localStorage.getItem("lang");if(s==="vi"||s==="en")L=s}catch(e){}
var nf=function(x,k){if(x==null||isNaN(x))return"–";var s=(+x).toFixed(k==null?3:k);return L==="vi"?s.replace(".",","):s},fi=function(x){return x==null?"–":Math.round(x).toLocaleString(L==="vi"?"vi-VN":"en-US")};
var css=function(v){return getComputedStyle(document.documentElement).getPropertyValue(v).trim()};
var COL={L1:"#0b5ea8",L2:"#dc2626",NA:"#8b95a3",a2:"#ea580c",a3:"#7c3aed"},RC={r1:"#b91c1c",r2:"#f59e0b",r3:"#65a30d",r4:"#0891b2",ref:"#94a3b8"};
var tile=function(m){Lf.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap contributors"}).addTo(m)};
var m1=Lf.map("map2").setView([10.8,106.7],11),G1=Geo.init(m1,"hcm",{}),LCOL={L1:"#0079b8",L2:"#dc2626",NA:"#7c8795"};
N.hcmStations.forEach(function(s){var c=LCOL[s.line],k=Lf.circleMarker([s.lat,s.lng],{radius:s.st==="op"?6:5,color:c,weight:3,fillColor:"#fff",fillOpacity:s.st==="pl"?.5:1});
 if(s.line!=="NA")k.bindTooltip(s.n,{permanent:true,direction:"right",offset:[7,0],className:"stl"});k.bindPopup("<b>"+s.n+"</b><br>"+s.line+" · "+s.st+(s.pp!=null?"<br>~"+nf(s.pp,1)+" mn/m² (1 km)":"")).addTo(m1)});
var m2=Lf.map("map3").setView([21.0,105.8],11),G2=Geo.init(m2,"hn",{types:true});
var hnL=new Geo.TypeLayer(N.hnPts,{}).addTo(m2);
N.hnStations.forEach(function(s){Lf.circleMarker([s.lat,s.lng],{radius:6,color:"#c2410c",weight:3,fillColor:"#fff",fillOpacity:1}).bindTooltip(s.n,{permanent:true,direction:"right",offset:[7,0],className:"stl"}).bindPopup("<b>"+s.n+"</b><br>"+(s.line==="2A"?"Line 2A":"Line 3")+" (OSM, unverified)").addTo(m2)});
var ch={};function mk(id,cfg){if(ch[id])ch[id].destroy();ch[id]=new Chart($(id).getContext("2d"),cfg)}
var D=window.DATA||{};
function tbl(id,head,rows){$(id).innerHTML="<thead><tr>"+head.map(function(h){return"<th>"+h+"</th>"}).join("")+"</tr></thead><tbody>"+rows.map(function(r){return"<tr>"+r.map(function(c){return"<td>"+c+"</td>"}).join("")+"</tr>"}).join("")+"</tbody>"}
function render(){var t=T[L],i;G1.setLang(L);G2.setLang(L);Geo.setLang(L);
 document.querySelectorAll("[data-n]").forEach(function(n){var k=n.getAttribute("data-n");if(t[k]!=null)n.textContent=t[k]});
 var l1=N.hcmStations.filter(function(s){return s.line==="L1"});
 tbl("tNet",[t.stn_col,t.line_col,t.st_col,t.cbd_col,t.poi_col,t.nl_col,t.pp_col],N.hcmStations.filter(function(s){return s.line!=="NA"}).map(function(s){return[s.n,t[s.line],t[s.st],nf(s.cbd,1),fi(s.poi),fi(s.nl),nf(s.pp,1)]}));
 tbl("tPlan",[t.plan_l,t.plan_r,t.plan_k,t.plan_n,t.plan_s],N.plan.map(function(p){return[p.name,p.route,nf(p.km,1),p.ns,(t.pst[p.status]||p.status)]}));
 var c=N.cmp,h=c.hcm,n=c.hn,ml=function(ci,m){var r=N.mlAll.filter(function(x){return x.city===ci&&x.variant==="A"&&x.model===m})[0];return r?nf(r.r2,3):"–"};
 var cf=function(ci,r){var o=D.coefs&&D.coefs[ci]&&D.coefs[ci].E0;if(!o)return"–";var x=o.rings.filter(function(q){return q.t===r})[0];return x?nf(x.est,3)+" ["+nf(x.lo,3)+", "+nf(x.hi,3)+"] "+(x.p<.05?t.sig:t.ns):"–"};
 tbl("tCmp",[t.c_met,t.c_hcm,t.c_hn],[[t.m_n,fi(h.n),fi(n.n)],[t.m_med,nf(h.med,1),nf(n.med,1)],[t.m_iqr,nf(h.p25,1)+"–"+nf(h.p75,1),nf(n.p25,1)+"–"+nf(n.p75,1)],[t.m_dmed,fi(h.dmed),fi(n.dmed)],[t.m_800,fi(h.within800),fi(n.within800)],[t.m_2000,fi(h.within2000),fi(n.within2000)],
  [t.m_mix,fi(h.house)+" / "+fi(h.land)+" / "+fi(h.apt),fi(n.house)+" / "+fi(n.land)+" / "+fi(n.apt)],[t.m_r1,cf("hcm","r1"),cf("hn","r1")],[t.m_r2,cf("hcm","r2"),cf("hn","r2")],
  [t.m_r2s,ml("TP.HCM","Hồi quy tuyến tính"),ml("Hà Nội","Hồi quy tuyến tính")],[t.m_rf,ml("TP.HCM","Rừng ngẫu nhiên"),ml("Hà Nội","Rừng ngẫu nhiên")],[t.m_gbm,ml("TP.HCM","Tăng cường gradient"),ml("Hà Nội","Tăng cường gradient")]]);
 var rl=["r1","r2","r3","r4"],rn={en:["≤500 m","500–800 m","800–1,200 m","1,200–2,000 m"],vi:["≤500 m","500–800 m","800–1.200 m","1.200–2.000 m"]}[L];
 if(D.coefs){mk("cCmp",{type:"bar",data:{labels:rn,datasets:["hcm","hn"].map(function(ci,k){var o=D.coefs[ci]&&D.coefs[ci].E0;return{label:ci==="hcm"?t.c_hcm:t.c_hn,backgroundColor:k?css("--acc2"):css("--acc"),data:rl.map(function(r){var x=o&&o.rings.filter(function(q){return q.t===r})[0];return x?x.est:null})}})},options:{maintainAspectRatio:false,scales:{y:{title:{display:true,text:"Δ ln(price/m²)"},grid:{color:css("--line")}}}}})}
 var city=$("shapCity").value,top=+$("shapTop").value,d=N.shap.filter(function(x){return x.city===city&&x.v==="A"}).sort(function(a,b){return b.sh-a.sh});
 var tot=d.filter(function(x){return x.f==="ln_dist_cbd"||x.f==="ln_dist"}).reduce(function(a,b){return a+b.sh},0);$("shapGrp").textContent=nf(100*tot,1)+"%";
 d=d.slice(0,top);var lab=function(x){var f=FEAT[x.f];return f?f[L==="vi"?1:0]:(x.f.indexOf("m_")===0?x.f:x.lab)};
 mk("cShap2",{type:"bar",data:{labels:d.map(lab),datasets:[{data:d.map(function(x){return 100*x.sh}),backgroundColor:d.map(function(x){return x.f==="ln_dist"||x.f==="ln_dist_cbd"?css("--acc2"):css("--acc")})}]},options:{indexAxis:"y",maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:function(q){return nf(q.raw,1)+"% · mean|SHAP| "+nf(d[q.dataIndex].ms,3)}}}},scales:{x:{title:{display:true,text:"% of total mean |SHAP|"},grid:{color:css("--line")}}}}});
 tbl("tMl",[t.c_city,t.c_var,t.c_mod,"n",t.c_r2,t.c_rmse,t.c_mae],N.mlAll.map(function(r){return[r.city==="TP.HCM"?t.c_hcm:t.c_hn,r.variant,t.mdl[r.model],fi(r.n),nf(r.r2,3),nf(r.rmse,3),nf(r.mae,3)]}));
 tbl("tStn",[t.s_stn,t.s_spec,t.s_est,t.s_pct,t.s_n,t.s_sig],N.srdd.map(function(s){var e=s.spec>0;return[s.id+" "+(L==="vi"?s.vi:s.en),e?s.spec:"0",e?nf(s.est,3):t.ne,e?nf(s.pct,1)+"%":"–",fi(s.nmax),e?(s.sig?t.yes:t.no):"–"]}));
}

function kpis(){var c=N.cmp,r=D.coefs&&D.coefs.hcm&&D.coefs.hcm.E0.rings[0],b=N.mlAll.filter(function(x){return x.city==="TP.HCM"&&x.variant==="A"&&x.model==="Tăng cường gradient"})[0];
 $("k1").textContent=fi(c.hcm.n+c.hn.n);$("k3").textContent=r?"+"+nf(r.est,3):"–";$("k4").textContent=b?nf(b.r2,3):"–";}
var EDG=[0,250,500,800,1200,1600,2000,3000,4000,6000];
function pdata(){var city=$("pdCity").value,tp=$("pdType").value,src=city==="hcm"?D.points:N.hnPts,v=src.filter(function(p){return tp==="all"||p[3]===tp});return v}
function med(a){a=a.slice().sort(function(x,y){return x-y});var m=a.length>>1;return a.length%2?a[m]:(a[m-1]+a[m])/2}
function pdCharts(){var t=T[L],v=pdata(),meds=[],cnt=[],labs=[];
 for(var i=0;i<EDG.length-1;i++){var s=v.filter(function(p){return p[4]>EDG[i]&&p[4]<=EDG[i+1]}).map(function(p){return p[2]});cnt.push(s.length);meds.push(s.length>=10?med(s):null);labs.push(fi(EDG[i])+"–"+fi(EDG[i+1])+" m")}
 mk("cPD",{type:"bar",data:{labels:labs,datasets:[{data:meds,backgroundColor:css("--acc")+"cc",borderRadius:4}]},options:{maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:function(q){return nf(q.raw,1)+" · n = "+fi(cnt[q.dataIndex])}}}},scales:{y:{title:{display:true,text:"mn VND/m²"},grid:{color:css("--line")}},x:{grid:{display:false}}}}});
 var HB=[0,25,50,75,100,150,200,300,400,1e9],hl=[],hc=[];
 for(var j=0;j<HB.length-1;j++){hl.push(j===HB.length-2?HB[j]+"+":HB[j]+"–"+HB[j+1]);hc.push(v.filter(function(p){return p[2]>=HB[j]&&p[2]<HB[j+1]}).length)}
 mk("cHist",{type:"bar",data:{labels:hl,datasets:[{data:hc,backgroundColor:css("--acc2")+"cc",borderRadius:4}]},options:{maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{title:{display:true,text:"n"},grid:{color:css("--line")}},x:{grid:{display:false}}}}})}
$("pdCity").addEventListener("change",pdCharts);$("pdType").addEventListener("change",pdCharts);
var tb=$("theme");tb.addEventListener("click",function(){var cur=document.documentElement.getAttribute("data-theme")||(window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");try{localStorage.setItem("theme",cur==="dark"?"light":"dark")}catch(e){}location.reload()});
$("shapCity").addEventListener("change",render);$("shapTop").addEventListener("change",render);
var lb=$("lang");if(lb)lb.addEventListener("click",function(){setTimeout(function(){L=document.documentElement.lang==="vi"?"vi":"en";render();kpis();pdCharts()},0)});
render();kpis();pdCharts();
})();
