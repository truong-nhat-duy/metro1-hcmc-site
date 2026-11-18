"use strict";
(function(){
var $=function(i){return document.getElementById(i)},root=$("vzRoot");if(!root)return;
var L=document.documentElement.lang==="vi"?"vi":"en";
var S={scale:"station",ring:null,phase:"all",t:25,m:2,leak:30,k:30,beta:0.162};
var T={en:{
h:"Theoretical model and predictions",p:"Four figures connect the framework chapter to the estimates: where the rings come from, how a station can raise land value, when that value is capitalised, and how a ring coefficient reads. All four are illustrations of the theory; only the bars in figure 1 are estimates.",
a_h:"1 · Concentric rings",a_p:"The monocentric city sets rents by distance to the centre; a station adds a second, local access point. The model measures that local effect with rings around each station.",
a_t1:"City scale",a_t2:"Station scale",
cbd:"CBD (Bến Thành)",suoi:"Suối Tiên",rentdown:"Rent and price fall with distance to the CBD",km:"km",
rk:["≤ 500 m","500–800 m","800–1,200 m","1,200–2,000 m"],ref:"> 2,000 m (reference)",
rdef:["D₁ = 1 if distance ≤ 500 m","D₂ = 1 if 500 < distance ≤ 800 m","D₃ = 1 if 800 < distance ≤ 1,200 m","D₄ = 1 if 1,200 < distance ≤ 2,000 m"],
walk:"Straight-line walk at 5 km/h",min:"min",
a_hint:"Hover or tap a ring to read its definition.",
a_bars:"Estimated ring coefficients, Ho Chi Minh City (ln points, 95% CI)",a_theory:"If gradient only",
a_note:"Theory predicts a decline with distance. The estimates do not fall steadily, and the specification with the distance to the centre (E2) removes most of the ≤ 500 m gap. Asking prices, one cross-section after opening; not causal.",
b_h:"2 · How a station is capitalised into land value",b_p:"Residual rent logic, a closed form with a sensitivity check, and the property-market frame that places it. Move the sliders; every figure updates.",
b_t:"Travel cost saved at the station",b_m:"Convexity of rent (m)",b_l:"Leakage (open city)",
b_out:"Price gap vs. no station",b_x:"Distance to the station (km)",b_y:"Price index (no station = 100)",
th_lead:"A station does not raise land value by itself. It lowers what a household pays to travel, and households can bid that saving into rent. Four steps carry the saving into price.",
th_st:[["Residual rent","Households bid what is left after non-land costs and travel: R ∝ (y − c)^m."],["The station cuts travel cost","Near the station c falls, and because rent is convex in what is left, the gain is more than proportional."],["Open-city leakage","In-migration claims a share λ of the gain, so bidders keep only (1 − λ)."],["Asset market","Rent is capitalised into price, P = R ÷ i, and new building dilutes the gain where zoning allows."]],
th_fh:"Closed form (O’Sullivan, 2012)",th_f1:"Rent",th_f2:"Price gap at a point",th_f3:"With your sliders",th_ex:"exact",th_ap:"linear approximation",
th_ctl:"Change the assumptions",th_k:"Travel cost share of income (κ)",th_dl:"Income saved by the station (Δ = κ × share saved)",
th_g1:"Why the gain is convex",th_g1p:"Rent index as travel cost c rises (income y = 100%). The curve bends: with m = 1 a saving counts one for one, with m > 1 each extra unit saved counts more. The dashed lines mark travel cost before the station and after it, net of leakage.",th_g1x:"Travel cost as share of income (c ÷ y)",th_g1y:"Rent index (current travel cost = 100)",th_before:"before",th_after:"with station",
th_g2h:"Sensitivity to the travel cost saved",th_g2p:"Price gap at the station against the share of income saved, for three values of m, at your κ and λ. The dot is your current setting; the slope of the line is m(1 − λ) ÷ (1 − κ).",th_g2x:"Income saved by the station, Δ (% of income)",th_g2y:"Price gap at the station (%)",
th_g3h:"The property-market frame (DiPasquale & Wheaton)",th_g3p:"Four linked markets. Read the loop in order. A station shifts demand for space near it (1), so rent rises first. The asset market turns rent into price (2). Higher price than replacement cost triggers building (3), and new stock (4) pulls rent back down. Where zoning blocks building, the loop stops after step 2 and the gain stays in price.",
th_q:["1 Space market: rent","2 Asset market: price","3 Construction","4 Stock adjustment"],th_ax:{R:"Rent R",S:"Stock S",P:"Price P",C:"Construction C"},th_d0:"Demand before",th_d1:"Demand with station",th_pi:"P = R ÷ i",th_fc:"C = f(P)",th_ds:"ΔS = δS (steady state)",th_ret:"stock dilutes|rent",th_ill:"Schematic with made-up curves; it shows the direction of each step, not magnitudes.",
th_gh:"Symbols",th_g:[["y","household income"],["c","travel cost; κ = c ÷ y is its share of income (default 30%)"],["m","convexity of rent in income net of travel cost (default 2)"],["Δ","share of income the station saves (default 7.5%, i.e. κ × 25%)"],["λ","leakage in an open city (default 30%)"],["i","capitalisation rate; P = R ÷ i"],["δ","depreciation of the stock"]],
th_use:"What this gives the thesis",th_u:["It predicts a gradient that falls smoothly with distance, not a jump at 500 or 800 m (H2).","It predicts a smaller gain where leakage is large or building is easy, so differences across stations and zoning (H4, H5) are expected.","The numbers here are arithmetic on assumed parameters. They are not estimates and are not calibrated to Ho Chi Minh City."],
b_n:"Illustration with made-up parameters, not calibrated to Ho Chi Minh City. The gap falls smoothly with distance; it has no jump at 500 or 800 m. That is why the thesis reads gradients, and uses the radius discontinuity only as a diagnostic.",
c_h:"3 · When value is capitalised",c_p:"Price is the present value of future location benefits, so it can move before the first passenger rides. Two phases matter: expectation (approval, groundbreaking) and operation.",
c_ph:{all:"Both",ant:"Expectation",op:"Operation"},
c_ant:"Expectation effect: the market prices the announced line from approval and groundbreaking onward.",
c_op:"Operation effect: travel-time savings become real once the line carries passengers (22 December 2024).",
c_all:"The price path is schematic. Separating the two phases needs prices before and after the key dates (DiD or event study).",
c_ev:["Approval and planning","Construction","Trial run","Opens 22 Dec 2024","Data frozen 25 Oct 2026"],
c_win:"Our data window",c_gap:"Not observed: no listings before opening, so H3 and DiD cannot be estimated",
c_l2:"Line 2 groundbreaking, 15 Jan 2026",c_y:"Expected price level",
d_h:"4 · How to read a ring coefficient",d_p:"Hover a term of the equation. The calculator turns a coefficient in log points into a percentage difference.",
d_terms:[["ln Pᵢ","Log of the asking price per m² of listing i."],["Σ βₖ·Ringᵢₖ","Indicators for the rings around the nearest station. βₖ is the log-point gap against listings more than 2 km away."],["γ′Xᵢ","Property controls: area, type, alley access, frontage, and in later specifications floors, rooms, road width, age, legal status, distance to the centre, land-use mix, night lights."],["δ₍g₎","Fixed effect of the 2 km grid cell: compares listings that share a neighbourhood."],["εᵢ","Error term; standard errors are clustered on 5 km cells."]],
d_calc:"Coefficient β (ln points)",d_res:"Asking price higher by",d_f:"= exp(β) − 1",
d_ex:"Example, ≤ 500 m ring: no location fixed effects 0.413 gives 51.1%; main model (2-km cells) 0.162 gives 17.6%; trimming price tails 0.069 gives 7.1% (not significant).",
d_n:"Log points are not percentages: the two agree only for small values. A coefficient is a descriptive gap in asking prices, not the price effect of Metro."
},vi:{
h:"Mô hình lý thuyết và các dự báo",p:"Bốn hình nối chương khung lý thuyết với các ước lượng: vành khoảng cách đến từ đâu, một ga có thể nâng giá đất ra sao, khi nào giá trị được vốn hóa, và cách đọc một hệ số vành. Cả bốn là hình minh họa lý thuyết; chỉ các cột ở hình 1 là ước lượng.",
a_h:"1 · Vành đồng tâm",a_p:"Mô hình đơn tâm đặt tiền tô theo khoảng cách đến trung tâm; một ga thêm điểm tiếp cận cục bộ thứ hai. Mô hình đo hiệu ứng cục bộ đó bằng các vành quanh từng ga.",
a_t1:"Quy mô thành phố",a_t2:"Quy mô ga",
cbd:"Trung tâm (Bến Thành)",suoi:"Suối Tiên",rentdown:"Tiền tô và giá giảm theo khoảng cách đến trung tâm",km:"km",
rk:["≤ 500 m","500–800 m","800–1.200 m","1.200–2.000 m"],ref:"> 2.000 m (tham chiếu)",
rdef:["D₁ = 1 nếu khoảng cách ≤ 500 m","D₂ = 1 nếu 500 < khoảng cách ≤ 800 m","D₃ = 1 nếu 800 < khoảng cách ≤ 1.200 m","D₄ = 1 nếu 1.200 < khoảng cách ≤ 2.000 m"],
walk:"Đi bộ đường thẳng 5 km/h",min:"phút",
a_hint:"Rê chuột hoặc chạm vào một vành để đọc định nghĩa.",
a_bars:"Hệ số vành ước lượng, TP.HCM (điểm ln, KTC 95%)",a_theory:"Nếu chỉ có gradient",
a_note:"Lý thuyết dự báo giảm dần theo khoảng cách. Các ước lượng không giảm đều, và đặc tả có khoảng cách đến trung tâm (E2) loại bỏ phần lớn chênh lệch ở vành ≤ 500 m. Giá rao, một lát cắt sau mở tuyến; không phải nhân quả.",
b_h:"2 · Ga được vốn hóa vào giá đất như thế nào",b_p:"Logic tiền tô phần dư, dạng khép kín kèm độ nhạy, và khung thị trường bất động sản đặt chúng vào chỗ của mình. Kéo thanh trượt, mọi con số cập nhật theo.",
b_t:"Chi phí đi lại tiết kiệm nhờ ga",b_m:"Độ lồi của tiền tô (m)",b_l:"Rò rỉ (thành phố mở)",
b_out:"Chênh lệch giá so với không có ga",b_x:"Khoảng cách đến ga (km)",b_y:"Chỉ số giá (không có ga = 100)",
th_lead:"Ga không tự làm đất đắt lên. Ga làm giảm khoản hộ gia đình phải trả để đi lại, và hộ có thể trả phần tiết kiệm đó vào tiền tô. Bốn bước đưa phần tiết kiệm vào giá.",
th_st:[["Tiền tô phần dư","Hộ trả phần còn lại sau chi phí phi đất và chi phí đi lại: R ∝ (y − c)^m."],["Ga giảm chi phí đi lại","Gần ga c giảm, và vì tiền tô lồi theo phần còn lại nên phần lợi tăng nhanh hơn tỷ lệ."],["Rò rỉ ở thành phố mở","Dòng người chuyển đến lấy đi một phần λ của lợi ích, nên người trả giá chỉ giữ (1 − λ)."],["Thị trường tài sản","Tiền thuê được vốn hóa thành giá, P = R ÷ i, và xây mới làm loãng lợi ích ở nơi quy hoạch cho phép."]],
th_fh:"Dạng khép kín (O’Sullivan, 2012)",th_f1:"Tiền tô",th_f2:"Chênh lệch giá tại một điểm",th_f3:"Với thanh trượt của bạn",th_ex:"chính xác",th_ap:"xấp xỉ tuyến tính",
th_ctl:"Thay đổi giả định",th_k:"Tỷ trọng chi phí đi lại trong thu nhập (κ)",th_dl:"Thu nhập ga tiết kiệm được (Δ = κ × phần tiết kiệm)",
th_g1:"Vì sao phần lợi có dạng lồi",th_g1p:"Chỉ số tiền tô khi chi phí đi lại c tăng (thu nhập y = 100%). Đường cong uốn: với m = 1 mỗi đơn vị tiết kiệm được tính một-một, với m > 1 mỗi đơn vị tiết kiệm thêm được tính nhiều hơn. Hai đường đứt nét là chi phí đi lại trước và sau khi có ga, đã trừ rò rỉ.",th_g1x:"Chi phí đi lại theo tỷ trọng thu nhập (c ÷ y)",th_g1y:"Chỉ số tiền tô (chi phí đi lại hiện tại = 100)",th_before:"trước",th_after:"có ga",
th_g2h:"Độ nhạy với chi phí đi lại tiết kiệm được",th_g2p:"Chênh lệch giá tại ga theo phần thu nhập tiết kiệm, với ba giá trị m, ở κ và λ của bạn. Chấm là thiết lập hiện tại; độ dốc của đường là m(1 − λ) ÷ (1 − κ).",th_g2x:"Thu nhập ga tiết kiệm được, Δ (% thu nhập)",th_g2y:"Chênh lệch giá tại ga (%)",
th_g3h:"Khung thị trường bất động sản (DiPasquale & Wheaton)",th_g3p:"Bốn thị trường liên kết. Đọc vòng lặp theo thứ tự. Ga làm dịch cầu không gian gần ga (1), nên tiền thuê tăng trước. Thị trường tài sản đổi tiền thuê thành giá (2). Giá cao hơn chi phí thay thế thì kích hoạt xây mới (3), và quỹ nhà mới (4) kéo tiền thuê xuống. Nơi quy hoạch chặn xây dựng, vòng dừng sau bước 2 và lợi ích nằm lại trong giá.",
th_q:["1 Thị trường không gian: tiền thuê","2 Thị trường tài sản: giá","3 Xây dựng","4 Điều chỉnh quỹ nhà"],th_ax:{R:"Tiền thuê R",S:"Quỹ nhà S",P:"Giá P",C:"Xây mới C"},th_d0:"Cầu trước khi có ga",th_d1:"Cầu khi có ga",th_pi:"P = R ÷ i",th_fc:"C = f(P)",th_ds:"ΔS = δS (trạng thái dừng)",th_ret:"quỹ nhà làm|loãng tiền thuê",th_ill:"Sơ đồ với đường cong giả định; chỉ cho thấy chiều của từng bước, không cho độ lớn.",
th_gh:"Ký hiệu",th_g:[["y","thu nhập hộ"],["c","chi phí đi lại; κ = c ÷ y là tỷ trọng trong thu nhập (mặc định 30%)"],["m","độ lồi của tiền tô theo thu nhập trừ chi phí đi lại (mặc định 2)"],["Δ","phần thu nhập ga tiết kiệm (mặc định 7,5%, tức κ × 25%)"],["λ","mức rò rỉ ở thành phố mở (mặc định 30%)"],["i","tỷ suất vốn hóa; P = R ÷ i"],["δ","khấu hao của quỹ nhà"]],
th_use:"Điều này cho luận văn",th_u:["Dự báo một gradient giảm trơn theo khoảng cách, không có bước nhảy ở 500 hay 800 m (H2).","Dự báo phần lợi nhỏ hơn khi rò rỉ lớn hoặc xây dựng dễ, nên khác biệt giữa các ga và theo quy hoạch (H4, H5) là điều được kỳ vọng.","Các con số ở đây là phép tính trên tham số giả định. Chúng không phải ước lượng và chưa hiệu chỉnh cho TP.HCM."],
b_n:"Minh họa với tham số giả định, chưa hiệu chỉnh cho TP.HCM. Chênh lệch giảm trơn theo khoảng cách, không có bước nhảy ở 500 hay 800 m. Vì thế luận văn đọc gradient, và chỉ dùng gián đoạn theo bán kính làm chẩn đoán.",
c_h:"3 · Khi nào giá trị được vốn hóa",c_p:"Giá là giá trị hiện tại của lợi ích vị trí trong tương lai, nên có thể dịch chuyển trước khi hành khách đầu tiên lên tàu. Có hai pha: kỳ vọng (phê duyệt, khởi công) và vận hành.",
c_ph:{all:"Cả hai",ant:"Kỳ vọng",op:"Vận hành"},
c_ant:"Hiệu ứng kỳ vọng: thị trường định giá tuyến đã công bố từ khi phê duyệt và khởi công.",
c_op:"Hiệu ứng vận hành: tiết kiệm thời gian đi lại thành hiện thực khi tuyến chở khách (22/12/2024).",
c_all:"Đường giá chỉ mang tính sơ họa. Tách hai pha cần giá trước và sau các mốc then chốt (DiD hoặc event study).",
c_ev:["Phê duyệt, quy hoạch","Thi công","Chạy thử","Khai thác 22/12/2024","Đóng băng 25/10/2026"],
c_win:"Cửa sổ dữ liệu của đề tài",c_gap:"Không quan sát được: không có tin trước khi mở tuyến, nên chưa ước lượng được H3 và DiD",
c_l2:"Khởi công tuyến 2, 15/1/2026",c_y:"Mức giá kỳ vọng",
d_h:"4 · Cách đọc một hệ số vành",d_p:"Rê chuột vào từng số hạng của phương trình. Máy tính đổi hệ số theo điểm ln sang chênh lệch phần trăm.",
d_terms:[["ln Pᵢ","Logarit giá rao trên m² của tin i."],["Σ βₖ·Ringᵢₖ","Biến chỉ báo các vành quanh ga gần nhất. βₖ là chênh lệch điểm ln so với tin cách ga trên 2 km."],["γ′Xᵢ","Biến kiểm soát nhà: diện tích, loại hình, hẻm, mặt tiền; ở các đặc tả sau có thêm tầng, phòng, lộ giới, tuổi, pháp lý, khoảng cách đến trung tâm, hỗn hợp sử dụng đất, ánh sáng đêm."],["δ₍g₎","Hiệu ứng cố định ô lưới 2 km: so sánh các tin cùng khu."],["εᵢ","Sai số; sai số chuẩn gom cụm theo ô 5 km."]],
d_calc:"Hệ số β (điểm ln)",d_res:"Giá rao cao hơn",d_f:"= exp(β) − 1",
d_ex:"Ví dụ, vành ≤ 500 m: không có hiệu ứng cố định vị trí 0,413 ứng với 51,1%; mô hình chính (ô 2 km) 0,162 ứng với 17,6%; cắt đuôi giá 0,069 ứng với 7,1% (không có ý nghĩa).",
d_n:"Điểm ln không phải phần trăm: chỉ gần bằng nhau khi giá trị nhỏ. Hệ số là chênh lệch mô tả trong giá rao, không phải tác động giá của Metro."}};
var nf=function(x,k){var s=(+x).toFixed(k==null?1:k);return L==="vi"?s.replace(".",","):s};
var RC=["#0b5ea8","#2e86c1","#6fb4e0","#b5d8f0"],RR=[500,800,1200,2000];
var E0=[[.274,.108,.440],[.176,-.080,.433],[.264,.069,.459],[.135,.006,.264]],E2=[[.121,-.006,.249],[.052,-.037,.141],[.152,.061,.244],[.065,-.007,.136]];
var STN=[[10.77095,106.69788],[10.7753,106.70207],[10.78179,106.70834],[10.79606,106.71549],[10.79859,106.72324],[10.80047,106.73365],[10.80213,106.74225],[10.80854,106.75528],[10.82144,106.75819],[10.83265,106.76389],[10.84641,106.77165],[10.85899,106.78884],[10.86632,106.80119],[10.87955,106.81409]];
function ringSVG(){var t=T[L],h="";
 if(S.scale==="city"){var cx=120,cy=330,k=19.5,p=function(s){return[cx+(s[1]-106.69788)*108*k,cy-(s[0]-10.77095)*111*k]};
  h+="<svg viewBox='0 0 520 380' class='vzs' role='img' aria-label='"+t.a_t1+"'>";
  [5,10,15].forEach(function(r){h+="<circle cx='"+cx+"' cy='"+cy+"' r='"+r*k+"' fill='none' stroke='var(--line)' stroke-width='1.5' stroke-dasharray='5 5'/><text x='"+(cx+r*k*.71+4)+"' y='"+(cy-r*k*.71-4)+"' class='vzt m'>"+r+" "+t.km+"</text>"});
  var pts=STN.map(p);h+="<polyline points='"+pts.map(function(q){return q[0].toFixed(1)+","+q[1].toFixed(1)}).join(" ")+"' fill='none' stroke='#fff' stroke-width='7'/><polyline points='"+pts.map(function(q){return q[0].toFixed(1)+","+q[1].toFixed(1)}).join(" ")+"' fill='none' stroke='#0079b8' stroke-width='4' stroke-linecap='round'/>";
  pts.forEach(function(q,i){var big=i===0||i===13;h+="<rect x='"+(q[0]-(big?9:6))+"' y='"+(q[1]-(big?9:6))+"' width='"+(big?18:12)+"' height='"+(big?18:12)+"' rx='4' fill='#0079b8' stroke='#fff' stroke-width='2'/>"+(big?"<text x='"+q[0]+"' y='"+(q[1]+4)+"' text-anchor='middle' class='vzt w'>M</text>":"")});
  h+="<text x='"+(pts[0][0]-8)+"' y='"+(pts[0][1]+30)+"' class='vzt b'>"+t.cbd+"</text><text x='"+(pts[13][0]-70)+"' y='"+(pts[13][1]-16)+"' class='vzt b'>"+t.suoi+"</text>";
  h+="<text x='20' y='28' class='vzt b' fill='var(--acc2)'>"+t.rentdown+"</text></svg>"}
 else{var cx2=210,cy2=190,sc=.09,act=S.ring;h+="<svg viewBox='0 0 420 380' class='vzs' role='img' aria-label='"+t.a_t2+"'>";
  for(var i=3;i>=0;i--){var r=RR[i]*sc*1.0;h+="<circle data-r='"+i+"' cx='"+cx2+"' cy='"+cy2+"' r='"+r+"' fill='"+RC[i]+"' fill-opacity='"+(act===null||act===i?.55:.18)+"' stroke='"+RC[i]+"' stroke-width='"+(act===i?3:1.5)+"' tabindex='0' class='vzr' aria-label='"+t.rk[i]+"'/>"}
  [0,1,2,3].forEach(function(i){var r=RR[i]*sc,a=(-35-i*18)*Math.PI/180;h+="<text x='"+(cx2+Math.cos(a)*r*1.0+0)+"' y='"+(cy2+Math.sin(a)*r)+"' class='vzt rl'>"+RR[i].toLocaleString(L==="vi"?"vi-VN":"en-US")+" m</text>"});
  h+="<rect x='"+(cx2-13)+"' y='"+(cy2-13)+"' width='26' height='26' rx='7' fill='#0079b8' stroke='#fff' stroke-width='2.5'/><text x='"+cx2+"' y='"+(cy2+5)+"' text-anchor='middle' class='vzt w' style='font-size:15px'>M</text></svg>"}
 return h}
function barsSVG(){var t=T[L],W=300,H=210,x0=34,y0=20,ph=150,mn=-.1,mx=.5,Y=function(v){return y0+ph*(1-(v-mn)/(mx-mn))};
 var h="<svg viewBox='0 0 "+W+" "+H+"' class='vzs' role='img' aria-label='"+t.a_bars+"'>";
 [0,.2,.4].forEach(function(v){h+="<line x1='"+x0+"' x2='"+(W-8)+"' y1='"+Y(v)+"' y2='"+Y(v)+"' stroke='var(--line)' "+(v===0?"":"stroke-dasharray='3 4'")+"/><text x='"+(x0-5)+"' y='"+(Y(v)+4)+"' text-anchor='end' class='vzt m'>"+nf(v,1)+"</text>"});
 h+="<polyline points='"+[0,1,2,3].map(function(i){return (x0+22+i*62)+","+Y(E0[0][0]*(1-i*.25))}).join(" ")+"' fill='none' stroke='var(--mute)' stroke-width='1.6' stroke-dasharray='5 4'/>";
 [[E0,"var(--acc)",-10],[E2,"var(--acc2)",10]].forEach(function(s){s[0].forEach(function(v,i){var x=x0+22+i*62+s[2];h+="<line x1='"+x+"' x2='"+x+"' y1='"+Y(v[1])+"' y2='"+Y(v[2])+"' stroke='"+s[1]+"' stroke-width='2'/><circle cx='"+x+"' cy='"+Y(v[0])+"' r='5' fill='"+s[1]+"' stroke='var(--card)' stroke-width='1.5'/>"})});
 for(var i=0;i<4;i++)h+="<text x='"+(x0+22+i*62)+"' y='"+(y0+ph+18)+"' text-anchor='middle' class='vzt m'>"+t.rk[i]+"</text>";
 h+="<circle cx='"+(x0+6)+"' cy='"+(H-8)+"' r='4' fill='var(--acc)'/><text x='"+(x0+14)+"' y='"+(H-4)+"' class='vzt m'>E0</text><circle cx='"+(x0+46)+"' cy='"+(H-8)+"' r='4' fill='var(--acc2)'/><text x='"+(x0+54)+"' y='"+(H-4)+"' class='vzt m'>E2</text><line x1='"+(x0+90)+"' x2='"+(x0+110)+"' y1='"+(H-8)+"' y2='"+(H-8)+"' stroke='var(--mute)' stroke-dasharray='5 4'/><text x='"+(x0+114)+"' y='"+(H-4)+"' class='vzt m'>"+t.a_theory+"</text></svg>";return h}
function capCalc(){var cb=S.k/100,pts=[],d,prem=function(d){var s=S.t/100*cb/(1+Math.exp((d-.8)/.18));var u=Math.max(0,1-cb+s*(1-S.leak/100)),b=Math.pow(1-cb,S.m);return Math.pow(u,S.m)/b-1};return{prem:prem}}
function capSVG(){var t=T[L],W=520,H=300,x0=46,y0=16,pw=W-x0-14,ph=H-y0-52,c=capCalc(),mxv=Math.max(.2,c.prem(0)*1.1),X=function(d){return x0+pw*d/2},Y=function(v){return y0+ph*(1-v/mxv)};
 var h="<svg viewBox='0 0 "+W+" "+H+"' class='vzs' role='img' aria-label='"+t.b_h+"'>",pts=[];
 for(var d=0;d<=2.001;d+=.025)pts.push(X(d).toFixed(1)+","+Y(c.prem(d)).toFixed(1));
 [0,.25,.5,.75,1].forEach(function(f){var v=mxv*f;h+="<line x1='"+x0+"' x2='"+(W-14)+"' y1='"+Y(v)+"' y2='"+Y(v)+"' stroke='var(--line)' stroke-dasharray='3 4'/><text x='"+(x0-6)+"' y='"+(Y(v)+4)+"' text-anchor='end' class='vzt m'>"+nf(100+100*v,0)+"</text>"});
 [0,.5,1,1.5,2].forEach(function(d){h+="<text x='"+X(d)+"' y='"+(y0+ph+16)+"' text-anchor='middle' class='vzt m'>"+nf(d,1)+"</text>"});
 h+="<polygon points='"+X(0)+","+Y(0)+" "+pts.join(" ")+" "+X(2)+","+Y(0)+"' fill='var(--acc)' fill-opacity='.18'/><polyline points='"+pts.join(" ")+"' fill='none' stroke='var(--acc)' stroke-width='3'/>";
 [.5,.8,1.2].forEach(function(d,i){var v=c.prem(d);h+="<line x1='"+X(d)+"' x2='"+X(d)+"' y1='"+Y(0)+"' y2='"+Y(v)+"' stroke='var(--acc2)' stroke-width='1.6' stroke-dasharray='4 3'/><circle cx='"+X(d)+"' cy='"+Y(v)+"' r='5' fill='var(--acc2)'/><text x='"+(X(d)+8)+"' y='"+(Y(v)-8)+"' class='vzt b'>+"+nf(v*100,1)+"%</text>"});
 h+="<text x='"+(x0+pw/2)+"' y='"+(H-12)+"' text-anchor='middle' class='vzt m'>"+t.b_x+"</text><text transform='translate(12 "+(y0+ph/2)+") rotate(-90)' text-anchor='middle' class='vzt m'>"+t.b_y+"</text></svg>";return h}
function wrap(str,x,y,w){var words=str.split(" "),lines=[],cur="";words.forEach(function(q){if((cur+" "+q).length>w*2.2&&cur){lines.push(cur);cur=q}else cur=cur?cur+" "+q:q});lines.push(cur);return lines.map(function(l,i){return "<text x='"+x+"' y='"+(y+i*16)+"' class='vzt m'>"+l+"</text>"}).join("")}
function timeSVG(){var t=T[L],W=900,H=300,ph=S.phase,ant=ph==="all"||ph==="ant",op=ph==="all"||ph==="op";
 var xs=[70,235,390,545,790],h="<svg viewBox='0 0 "+W+" "+H+"' class='vzs' role='img' aria-label='"+t.c_h+"'>";
 h+="<rect x='"+xs[3]+"' y='24' width='"+(xs[4]+40-xs[3])+"' height='190' rx='8' fill='var(--acc)' fill-opacity='.10' stroke='var(--acc)' stroke-dasharray='5 4'/><text x='"+(xs[3]+10)+"' y='44' class='vzt b' fill='var(--acc)'>"+t.c_win+"</text>";
 h+="<rect x='40' y='24' width='"+(xs[3]-40)+"' height='190' rx='8' fill='var(--chip)' fill-opacity='.7'/>"+wrap(t.c_gap,54,44,20);
 var Y=function(v){return 200-v*130};
 var seg=function(a,b,col,on){return "<path d='"+a+"' fill='none' stroke='"+col+"' stroke-width='"+(on?5:2)+"' opacity='"+(on?1:.35)+"' stroke-linecap='round'/>"};
 h+=seg("M70 "+Y(.05)+" C150 "+Y(.08)+" 190 "+Y(.2)+" 235 "+Y(.3)+" S 340 "+Y(.42)+" 390 "+Y(.46)+" S 480 "+Y(.5)+" 545 "+Y(.53),0,"var(--acc2)",ant);
 h+=seg("M545 "+Y(.53)+" C600 "+Y(.58)+" 660 "+Y(.8)+" 720 "+Y(.9)+" S 800 "+Y(.95)+" 830 "+Y(.96),0,"var(--acc)",op);
 xs.forEach(function(x,i){h+="<line x1='"+x+"' x2='"+x+"' y1='214' y2='226' stroke='var(--ink)' stroke-width='2'/><circle cx='"+x+"' cy='"+(i===3?Y(.53):i===4?Y(.96):i===0?Y(.05):i===1?Y(.3):Y(.46))+"' r='"+(i===3?7:4)+"' fill='"+(i===3?"var(--acc2)":"var(--card)")+"' stroke='var(--ink)' stroke-width='1.5'/><text x='"+x+"' y='246' text-anchor='middle' class='vzt "+(i===3?"b":"m")+"'>"+t.c_ev[i]+"</text>"});
 h+="<text transform='translate(14 120) rotate(-90)' text-anchor='middle' class='vzt m'>"+t.c_y+"</text>";
 h+="<text x='160' y='"+Y(.62)+"' class='vzt b' fill='var(--acc2)' opacity='"+(ant?1:.4)+"'>"+t.c_ph.ant+"</text><text x='690' y='"+Y(.62)+"' class='vzt b' fill='var(--acc)' opacity='"+(op?1:.4)+"'>"+t.c_ph.op+"</text>";
 h+="<text x='"+xs[4]+"' y='270' text-anchor='middle' class='vzt m'>"+t.c_l2+"</text><line x1='"+xs[4]+"' x2='"+xs[4]+"' y1='252' y2='258' stroke='var(--mute)'/></svg>";return h}

function thGap(){var k=S.k/100,D=k*S.t/100,l=S.leak/100,m=S.m,q=D*(1-l)/(1-k);return{k:k,D:D,l:l,m:m,ex:Math.pow(1+q,m)-1,ap:m*q}}
function stepsHTML(){var t=T[L];return "<ol class='thst'>"+t.th_st.map(function(x,i){return "<li><span class='thn'>"+(i+1)+"</span><b>"+x[0]+"</b><span>"+x[1]+"</span></li>"}).join("")+"</ol>"}
function formHTML(){var t=T[L],g=thGap(),f=function(x){return nf(x,2)};
 return "<div class='thfm'><h4>"+t.th_fh+"</h4><div class='throw'><span class='thl'>"+t.th_f1+"</span><span class='thm'><i>R</i> ∝ (<i>y</i> − <i>c</i>)<sup><i>m</i></sup></span></div>"+
 "<div class='throw'><span class='thl'>"+t.th_f2+"</span><span class='thm'><i>G</i> = (1 + (1 − <i>λ</i>)<i>Δ</i> ÷ (1 − <i>κ</i>))<sup><i>m</i></sup> − 1 ≈ <i>m</i>(1 − <i>λ</i>)<i>Δ</i> ÷ (1 − <i>κ</i>)</span></div>"+
 "<div class='throw live'><span class='thl'>"+t.th_f3+"</span><span class='thm'>(1 + (1 − "+f(g.l)+") × "+nf(g.D,3)+" ÷ (1 − "+f(g.k)+"))<sup>"+nf(g.m,1)+"</sup> − 1 = <b>+"+nf(g.ex*100,1)+"%</b> <small>("+t.th_ex+")</small> · ≈ <b>+"+nf(g.ap*100,1)+"%</b> <small>("+t.th_ap+")</small></span></div></div>"}
function ctlHTML(){var t=T[L],g=thGap();return "<div class='ctl'><label>"+t.b_t+" <input id='vzT' type='range' min='0' max='40' step='1' value='"+S.t+"'> <b>"+S.t+"%</b></label><label>"+t.th_k+" <input id='vzK' type='range' min='10' max='50' step='1' value='"+S.k+"'> <b>"+S.k+"%</b></label><label>"+t.b_m+" <input id='vzM' type='range' min='1' max='3' step='0.1' value='"+S.m+"'> <b>"+nf(S.m,1)+"</b></label><label>"+t.b_l+" <input id='vzL' type='range' min='0' max='80' step='5' value='"+S.leak+"'> <b>"+S.leak+"%</b></label></div><p class='sub' id='vzDl'>"+t.th_dl+": <b>"+nf(g.D*100,1)+"%</b></p>"}
function convSVG(){var t=T[L],g=thGap(),W=520,H=306,x0=46,y0=14,pw=W-x0-16,ph=H-y0-52,cmax=.6,
 R=function(c,m){return Math.pow((1-c)/(1-g.k),m)*100},mx=R(0,3),X=function(c){return x0+pw*c/cmax},Y=function(v){return y0+ph*(1-v/mx)},
 c1=g.k,c2=Math.max(0,g.k-(1-g.l)*g.D),h="<svg viewBox='0 0 "+W+" "+H+"' class='vzs' role='img' aria-label='"+t.th_g1+"'>";
 [0,.25,.5,.75,1].forEach(function(f){var v=mx*f;h+="<line x1='"+x0+"' x2='"+(W-16)+"' y1='"+Y(v)+"' y2='"+Y(v)+"' stroke='var(--line)' stroke-dasharray='3 4'/>"+(f?"<text x='"+(x0-6)+"' y='"+(Y(v)+4)+"' text-anchor='end' class='vzt m'>"+nf(v,0)+"</text>":"")});
 [0,.1,.2,.3,.4,.5,.6].forEach(function(c){h+="<text x='"+X(c)+"' y='"+(y0+ph+16)+"' text-anchor='middle' class='vzt m'>"+nf(c*100,0)+"%</text>"});
 [1,2,3].forEach(function(m){var pts=[];for(var c=0;c<=cmax+.001;c+=.02)pts.push(X(c).toFixed(1)+","+Y(R(c,m)).toFixed(1));var on=Math.abs(S.m-m)<.05;h+="<polyline points='"+pts.join(" ")+"' fill='none' stroke='"+(m===1?"var(--mute)":m===2?"var(--acc2)":"var(--acc)")+"' stroke-width='"+(on?3.5:2)+"' opacity='"+(on?1:.55)+"'/><text x='"+(X(.012))+"' y='"+(Y(R(.012,m))-7)+"' class='vzt b'>m = "+m+"</text>"});
 var v1=R(c1,S.m),v2=R(c2,S.m);
 h+="<line x1='"+X(c1)+"' x2='"+X(c1)+"' y1='"+Y(0)+"' y2='"+Y(v1)+"' stroke='var(--ink)' stroke-dasharray='4 3'/><line x1='"+X(c2)+"' x2='"+X(c2)+"' y1='"+Y(0)+"' y2='"+Y(v2)+"' stroke='var(--acc2)' stroke-dasharray='4 3'/>"+
 "<line x1='"+x0+"' x2='"+X(c2)+"' y1='"+Y(v2)+"' y2='"+Y(v2)+"' stroke='var(--acc2)' stroke-dasharray='4 3'/><circle cx='"+X(c1)+"' cy='"+Y(v1)+"' r='5' fill='var(--card)' stroke='var(--ink)' stroke-width='2'/><circle cx='"+X(c2)+"' cy='"+Y(v2)+"' r='5.5' fill='var(--acc2)'/>"+
 "<text x='"+(X(c1)+7)+"' y='"+(y0+ph+32)+"' class='vzt m' text-anchor='start'>"+t.th_before+"</text><text x='"+(X(c2)-7)+"' y='"+(y0+ph+32)+"' class='vzt b' text-anchor='end' fill='var(--acc2)'>"+t.th_after+"</text>"+
 "<text x='"+(x0+8)+"' y='"+(Y(v2)-8)+"' class='vzt b' fill='var(--acc2)'>+"+nf(v2-100,1)+"</text>"+
 "<text x='"+(x0+pw/2)+"' y='"+(H-5)+"' text-anchor='middle' class='vzt m'>"+t.th_g1x+"</text><text transform='translate(12 "+(y0+ph/2)+") rotate(-90)' text-anchor='middle' class='vzt m'>"+t.th_g1y+"</text></svg>";return h}
function sensSVG(){var t=T[L],g=thGap(),W=520,H=288,x0=46,y0=14,pw=W-x0-16,ph=H-y0-40,Dm=.15,G=function(D,m){return(Math.pow(1+D*(1-g.l)/(1-g.k),m)-1)*100},mx=G(Dm,3),X=function(D){return x0+pw*D/Dm},Y=function(v){return y0+ph*(1-v/mx)},
 h="<svg viewBox='0 0 "+W+" "+H+"' class='vzs' role='img' aria-label='"+t.th_g2h+"'>";
 [0,.25,.5,.75,1].forEach(function(f){var v=mx*f;h+="<line x1='"+x0+"' x2='"+(W-16)+"' y1='"+Y(v)+"' y2='"+Y(v)+"' stroke='var(--line)' stroke-dasharray='3 4'/>"+(f?"<text x='"+(x0-6)+"' y='"+(Y(v)+4)+"' text-anchor='end' class='vzt m'>"+nf(v,0)+"</text>":"")});
 [0,.05,.1,.15].forEach(function(D){h+="<text x='"+X(D)+"' y='"+(y0+ph+16)+"' text-anchor='middle' class='vzt m'>"+nf(D*100,0)+"%</text>"});
 [1,2,3].forEach(function(m){var pts=[];for(var D=0;D<=Dm+.0001;D+=.005)pts.push(X(D).toFixed(1)+","+Y(G(D,m)).toFixed(1));var on=Math.abs(S.m-m)<.05;h+="<polyline points='"+pts.join(" ")+"' fill='none' stroke='"+(m===1?"var(--mute)":m===2?"var(--acc2)":"var(--acc)")+"' stroke-width='"+(on?3.5:2)+"' opacity='"+(on?1:.55)+"'/><text x='"+(X(Dm)-6)+"' y='"+(Y(G(Dm,m))+(m===3?16:-6))+"' text-anchor='end' class='vzt b'>m = "+m+"</text>"});
 var Dc=Math.min(g.D,Dm),Gc=G(Dc,S.m);
 h+="<line x1='"+X(Dc)+"' x2='"+X(Dc)+"' y1='"+Y(0)+"' y2='"+Y(Gc)+"' stroke='var(--ink)' stroke-dasharray='4 3'/><circle cx='"+X(Dc)+"' cy='"+Y(Gc)+"' r='6' fill='var(--acc2)' stroke='var(--card)' stroke-width='2'/><text x='"+(X(Dc)+9)+"' y='"+(Y(Gc)+4)+"' class='vzt b'>+"+nf(Gc,1)+"%</text>"+
 "<text x='"+(x0+pw/2)+"' y='"+(H-8)+"' text-anchor='middle' class='vzt m'>"+t.th_g2x+"</text><text transform='translate(12 "+(y0+ph/2)+") rotate(-90)' text-anchor='middle' class='vzt m'>"+t.th_g2y+"</text></svg>";return h}
function dwSVG(){var t=T[L],W=560,H=450,cx=270,cy=215,sl=.667,iS=.7,sS=.84,
 yD0=function(x){return 70+(x-285)*sl},yD1=function(x){return 40+(x-285)*sl},S0=380,R0=yD0(S0),R1=yD1(S0),P0=cx-(cy-R0)/iS,P1=cx-(cy-R1)/iS,
 C0=cy+(S0-cx)*sS,aa=(C0-cy)/(cx-P0-60),f=function(x){return cy+Math.max(0,(cx-60-x))*aa},
 C1=f(P1),S1=cx+(C1-cy)/sS,
 h="<svg viewBox='0 0 "+W+" "+H+"' class='vzs thdw' role='img' aria-label='"+t.th_g3h+"'><defs><marker id='thar' viewBox='0 0 10 10' refX='8' refY='5' markerWidth='7' markerHeight='7' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill='var(--acc2)'/></marker></defs>";
 h+="<line x1='20' x2='"+(W-20)+"' y1='"+cy+"' y2='"+cy+"' stroke='var(--ink)' stroke-width='1.4'/><line x1='"+cx+"' x2='"+cx+"' y1='18' y2='"+(H-14)+"' stroke='var(--ink)' stroke-width='1.4'/>";
 var q=[[cx+6,32],[cx-8,32],[cx-8,H-26],[cx+6,H-26]];
 h+="<text x='"+(cx+10)+"' y='30' class='vzt b'>"+t.th_q[0]+"</text><text x='"+(cx-10)+"' y='30' text-anchor='end' class='vzt b'>"+t.th_q[1]+"</text><text x='"+(cx-10)+"' y='"+(H-8)+"' text-anchor='end' class='vzt b'>"+t.th_q[2]+"</text><text x='"+(cx+10)+"' y='"+(H-8)+"' class='vzt b'>"+t.th_q[3]+"</text>";
 h+="<text x='"+(W-22)+"' y='"+(cy-6)+"' text-anchor='end' class='vzt m'>"+t.th_ax.S+" →</text><text x='22' y='"+(cy-6)+"' class='vzt m'>← "+t.th_ax.P+"</text><text x='"+(cx+6)+"' y='56' class='vzt m' transform='rotate(0)'>↑ "+t.th_ax.R+"</text><text x='"+(cx+6)+"' y='"+(H-40)+"' class='vzt m'>↓ "+t.th_ax.C+"</text>";
 /* NE demand */
 h+="<line x1='285' y1='"+yD0(285)+"' x2='490' y2='"+yD0(490)+"' stroke='var(--mute)' stroke-width='2.5'/><line x1='285' y1='"+yD1(285)+"' x2='490' y2='"+yD1(490)+"' stroke='var(--acc2)' stroke-width='2.5'/>";
 h+="<text x='492' y='"+(yD0(490)+4)+"' class='vzt m' text-anchor='end' dy='16'>"+t.th_d0+"</text><text x='492' y='"+(yD1(490)+4)+"' class='vzt b' text-anchor='end' fill='var(--acc2)' dy='-8'>"+t.th_d1+"</text>";
 /* NW */
 h+="<line x1='"+cx+"' y1='"+cy+"' x2='70' y2='"+(cy-(cx-70)*iS)+"' stroke='var(--ink)' stroke-width='2.5'/><text x='74' y='"+(cy-(cx-70)*iS-8)+"' class='vzt m'>"+t.th_pi+"</text>";
 /* SW curve */
 var pts=[],xe=cx-60;for(var x=cx-60;x>=40&&f(x)<H-34;x-=5){pts.push(x.toFixed(0)+","+f(x).toFixed(1));xe=x}h+="<polyline points='"+pts.join(" ")+"' fill='none' stroke='var(--ink)' stroke-width='2.5'/><text x='"+(xe+8)+"' y='"+(f(xe)-8)+"' class='vzt m'>"+t.th_fc+"</text>";
 /* SE ray */
 h+="<line x1='"+cx+"' y1='"+cy+"' x2='500' y2='"+(cy+(500-cx)*sS)+"' stroke='var(--ink)' stroke-width='2.5'/><text x='496' y='"+(cy+(496-cx)*sS-10)+"' class='vzt m' text-anchor='end'>"+t.th_ds+"</text>";
 /* path */
 var A=function(x1,y1,x2,y2,dash){return "<line x1='"+x1+"' y1='"+y1+"' x2='"+x2+"' y2='"+y2+"' stroke='var(--acc2)' stroke-width='2.4' "+(dash?"stroke-dasharray='5 4' ":"")+"marker-end='url(#thar)'/>"};
 h+=A(S0,R0,S0,R1+2)+A(S0,R1,P1+4,R1)+A(P1,R1,P1,C1-2)+A(P1,C1,S1-4,C1)+A(S1,C1,S1,yD1(S1)+4,true);
 var N=function(x,y,n){return "<circle cx='"+x+"' cy='"+y+"' r='10' fill='var(--acc2)'/><text x='"+x+"' y='"+(y+4)+"' text-anchor='middle' class='vzt w'>"+n+"</text>"};
 h+=N(S0+16,(R0+R1)/2,1)+N((S0+P1)/2,R1-14,2)+N(P1-16,(R1+C1)/2,3)+N((P1+S1)/2,C1-14,4);
 var rl=t.th_ret.split("|");h+=rl.map(function(w,i){return "<text x='"+(S1-8)+"' y='"+((C1+yD1(S1))/2+i*14)+"' text-anchor='end' class='vzt m' fill='var(--acc2)'>"+w+"</text>"}).join("");
 h+="<circle cx='"+S0+"' cy='"+R0+"' r='5' fill='var(--card)' stroke='var(--ink)' stroke-width='2'/>";
 h+="</svg>";return h}
function glossHTML(){var t=T[L];return "<dl class='thgl'>"+t.th_g.map(function(x){return "<div><dt>"+x[0]+"</dt><dd>"+x[1]+"</dd></div>"}).join("")+"</dl>"}
function theoryPanel(){var t=T[L];
 return "<article class='vzc vzth' id='vzB'><h3>"+t.b_h+"</h3><p>"+t.b_p+"</p><p class='thlead'>"+t.th_lead+"</p>"+stepsHTML()+
 "<div id='thForm'>"+formHTML()+"</div><h4>"+t.th_ctl+"</h4>"+ctlHTML()+
 "<div class='thgrid'><figure><h4>"+t.b_h.replace(/^2 · /,"")+" — "+t.b_y+"</h4><div id='vzCap'>"+capSVG()+"</div></figure><figure><h4>"+t.th_g1+"</h4><div id='thConv'>"+convSVG()+"</div><figcaption>"+t.th_g1p+"</figcaption></figure></div>"+
 "<div class='thgrid'><figure><h4>"+t.th_g2h+"</h4><div id='thSens'>"+sensSVG()+"</div><figcaption>"+t.th_g2p+"</figcaption></figure><figure><h4>"+t.th_gh+"</h4>"+glossHTML()+"</figure></div>"+
 "<figure class='thwide'><h4>"+t.th_g3h+"</h4><div id='thDw'>"+dwSVG()+"</div><figcaption>"+t.th_g3p+" "+t.th_ill+"</figcaption></figure>"+
 "<div class='thuse'><h4>"+t.th_use+"</h4><ul>"+t.th_u.map(function(x){return "<li>"+x+"</li>"}).join("")+"</ul></div><p class='sub'>"+t.b_n+"</p></article>"}
function thRefresh(){var e=function(i,h){var n=$(i);if(n)n.innerHTML=h};e("vzCap",capSVG());e("thConv",convSVG());e("thSens",sensSVG());e("thForm",formHTML());var g=thGap(),t=T[L],d=$("vzDl");if(d)d.innerHTML=t.th_dl+": <b>"+nf(g.D*100,1)+"%</b>"}
function eqHTML(){var t=T[L],d=t.d_terms,k=S.term==null?0:S.term;
 var parts=["ln Pᵢ","=  α +","Σ βₖ·Ringᵢₖ","+","γ′Xᵢ","+","δ₍g₎","+","εᵢ"],map={0:0,2:1,4:2,6:3,8:4};
 return "<div class='vzeq' role='group'>"+parts.map(function(p,i){return map[i]!=null?"<button type='button' class='vzq"+(k===map[i]?" on":"")+"' data-q='"+map[i]+"'>"+p+"</button>":"<span>"+p+"</span>"}).join("")+"</div><p class='vzdesc'><b>"+d[k][0]+"</b> — "+d[k][1]+"</p>"}
function calcHTML(){var t=T[L],p=Math.exp(S.beta)-1;return "<div class='vzcalc'><label>"+t.d_calc+" <input id='vzBeta' type='range' min='-0.2' max='0.8' step='0.001' value='"+S.beta+"'> <b id='vzBv'>"+nf(S.beta,3)+"</b></label><p class='vzres'>"+t.d_res+" <b id='vzPv'>"+nf(p*100,1)+"%</b> <span class='vzf'>"+t.d_f+"</span></p></div>"}
function render(){var t=T[L];
 var panel=function(id,h,p,body,note){return "<article class='vzc' id='"+id+"'><h3>"+h+"</h3><p>"+p+"</p>"+body+(note?"<p class='sub'>"+note+"</p>":"")+"</article>"};
 var rdef=S.ring!=null?"<b>"+t.rk[S.ring]+"</b> · "+t.rdef[S.ring]+" · "+t.walk+": ≈ "+Math.round(RR[S.ring]/83.3)+" "+t.min:"<b>"+t.ref+"</b> · "+t.a_hint;
 root.innerHTML=
  "<div class='vzg'>"+
  panel("vzA",t.a_h,t.a_p,"<div class='vztabs' role='tablist'><button type='button' role='tab' aria-selected='"+(S.scale==="city")+"' data-sc='city'>"+t.a_t1+"</button><button type='button' role='tab' aria-selected='"+(S.scale==="station")+"' data-sc='station'>"+t.a_t2+"</button></div><div class='vzrow'><div id='vzRing'>"+ringSVG()+"</div><div><h4>"+t.a_bars+"</h4>"+barsSVG()+"</div></div><p class='vzdef' id='vzDef' aria-live='polite'>"+(S.scale==="station"?rdef:"")+"</p>",t.a_note)+
  theoryPanel()+
  panel("vzC",t.c_h,t.c_p,"<div class='vztabs' role='tablist'>"+["all","ant","op"].map(function(k){return "<button type='button' role='tab' aria-selected='"+(S.phase===k)+"' data-ph='"+k+"'>"+t.c_ph[k]+"</button>"}).join("")+"</div><div id='vzTime'>"+timeSVG()+"</div><p class='vzdef' aria-live='polite'>"+t["c_"+S.phase]+"</p>")+
  panel("vzD",t.d_h,t.d_p,"<div id='vzEq'>"+eqHTML()+"</div>"+calcHTML(),t.d_ex+" "+t.d_n)+
  "</div>";
 wire()}
function wire(){
 root.querySelectorAll("[data-sc]").forEach(function(b){b.addEventListener("click",function(){S.scale=b.getAttribute("data-sc");S.ring=null;render()})});
 root.querySelectorAll("[data-ph]").forEach(function(b){b.addEventListener("click",function(){S.phase=b.getAttribute("data-ph");render()})});
 root.querySelectorAll("[data-r]").forEach(function(c){var go=function(){S.ring=+c.getAttribute("data-r");$("vzRing").innerHTML=ringSVG();$("vzDef").innerHTML=T[L].rdef&&defTxt();wire2()};c.addEventListener("mouseenter",go);c.addEventListener("focus",go);c.addEventListener("click",go)});
 var m=[["vzT","t"],["vzK","k"],["vzM","m"],["vzL","leak"]];m.forEach(function(q){var e=$(q[0]);if(e)e.addEventListener("input",function(){S[q[1]]=+e.value;e.parentNode.querySelector("b").textContent=q[1]==="m"?nf(S.m,1):S[q[1]]+"%";thRefresh()})});
 root.querySelectorAll("[data-q]").forEach(function(b){var go=function(){S.term=+b.getAttribute("data-q");$("vzEq").innerHTML=eqHTML();wire3()};b.addEventListener("mouseenter",go);b.addEventListener("focus",go);b.addEventListener("click",go)});
 var be=$("vzBeta");if(be)be.addEventListener("input",function(){S.beta=+be.value;$("vzBv").textContent=nf(S.beta,3);$("vzPv").textContent=nf((Math.exp(S.beta)-1)*100,1)+"%"})}
function defTxt(){var t=T[L];return "<b>"+t.rk[S.ring]+"</b> · "+t.rdef[S.ring]+" · "+t.walk+": ≈ "+Math.round(RR[S.ring]/83.3)+" "+t.min}
function wire2(){root.querySelectorAll("[data-r]").forEach(function(c){var go=function(){S.ring=+c.getAttribute("data-r");$("vzRing").innerHTML=ringSVG();$("vzDef").innerHTML=defTxt();wire2()};c.addEventListener("mouseenter",go);c.addEventListener("focus",go);c.addEventListener("click",go)})}
function wire3(){root.querySelectorAll("[data-q]").forEach(function(b){var go=function(){S.term=+b.getAttribute("data-q");$("vzEq").innerHTML=eqHTML();wire3()};b.addEventListener("mouseenter",go);b.addEventListener("focus",go);b.addEventListener("click",go)})}
function txt(){var t=T[L];document.querySelectorAll("[data-v]").forEach(function(n){var k=n.getAttribute("data-v");if(t[k]!=null)n.textContent=t[k]})}
function all(){L=document.documentElement.lang==="vi"?"vi":"en";txt();render()}
var lb=$("lang");if(lb)lb.addEventListener("click",function(){setTimeout(all,60)});all();
})();
