"use strict";
(function(){
var $=function(i){return document.getElementById(i)},root=$("vzRoot");if(!root)return;
var L=document.documentElement.lang==="vi"?"vi":"en";
var S={scale:"station",ring:null,phase:"all",t:25,m:2,leak:30,beta:0.274};
var T={en:{
h:"The theory in pictures",p:"Four figures connect the framework chapter to the estimates: where the rings come from, how a station can raise land value, when that value is capitalised, and how a ring coefficient reads. All four are illustrations of the theory; only the bars in figure 1 are estimates.",
a_h:"1 · Concentric rings",a_p:"The monocentric city sets rents by distance to the centre; a station adds a second, local access point. The model measures that local effect with rings around each station.",
a_t1:"City scale",a_t2:"Station scale",
cbd:"CBD (Bến Thành)",suoi:"Suối Tiên",rentdown:"Rent and price fall with distance to the CBD",km:"km",
rk:["≤ 500 m","500–800 m","800–1,200 m","1,200–2,000 m"],ref:"> 2,000 m (reference)",
rdef:["D₁ = 1 if distance ≤ 500 m","D₂ = 1 if 500 < distance ≤ 800 m","D₃ = 1 if 800 < distance ≤ 1,200 m","D₄ = 1 if 1,200 < distance ≤ 2,000 m"],
walk:"Straight-line walk at 5 km/h",min:"min",
a_hint:"Hover or tap a ring to read its definition.",
a_bars:"Estimated ring coefficients, Ho Chi Minh City (ln points, 95% CI)",a_theory:"If gradient only",
a_note:"Theory predicts a decline with distance. The estimates do not fall steadily, and the specification with the distance to the centre (E2) removes most of the ≤ 500 m gap. Asking prices, one cross-section after opening; not causal.",
b_h:"2 · How a station is capitalised into land value",b_p:"Residual rent logic: a household pays what is left after non-land and travel costs, so rent is (income − travel cost)^m. A station lowers travel cost near it, and rent rises by a convex amount. In an open city, in-migration claims part of the gain.",
b_t:"Travel cost saved at the station",b_m:"Convexity of rent (m)",b_l:"Leakage (open city)",
b_out:"Price gap vs. no station",b_x:"Distance to the station (km)",b_y:"Price index (no station = 100)",
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
d_ex:"Example: E0, ≤ 500 m ring: 0.274 gives 31.5%; E2: 0.121 gives 12.9%; E6a: 0.067 gives 6.9% (not significant).",
d_n:"Log points are not percentages: the two agree only for small values. A coefficient is a descriptive gap in asking prices, not the price effect of Metro."
},vi:{
h:"Lý thuyết bằng hình",p:"Bốn hình nối chương khung lý thuyết với các ước lượng: vành khoảng cách đến từ đâu, một ga có thể nâng giá đất ra sao, khi nào giá trị được vốn hóa, và cách đọc một hệ số vành. Cả bốn là hình minh họa lý thuyết; chỉ các cột ở hình 1 là ước lượng.",
a_h:"1 · Vành đồng tâm",a_p:"Mô hình đơn tâm đặt tiền tô theo khoảng cách đến trung tâm; một ga thêm điểm tiếp cận cục bộ thứ hai. Mô hình đo hiệu ứng cục bộ đó bằng các vành quanh từng ga.",
a_t1:"Quy mô thành phố",a_t2:"Quy mô ga",
cbd:"Trung tâm (Bến Thành)",suoi:"Suối Tiên",rentdown:"Tiền tô và giá giảm theo khoảng cách đến trung tâm",km:"km",
rk:["≤ 500 m","500–800 m","800–1.200 m","1.200–2.000 m"],ref:"> 2.000 m (tham chiếu)",
rdef:["D₁ = 1 nếu khoảng cách ≤ 500 m","D₂ = 1 nếu 500 < khoảng cách ≤ 800 m","D₃ = 1 nếu 800 < khoảng cách ≤ 1.200 m","D₄ = 1 nếu 1.200 < khoảng cách ≤ 2.000 m"],
walk:"Đi bộ đường thẳng 5 km/h",min:"phút",
a_hint:"Rê chuột hoặc chạm vào một vành để đọc định nghĩa.",
a_bars:"Hệ số vành ước lượng, TP.HCM (điểm ln, KTC 95%)",a_theory:"Nếu chỉ có gradient",
a_note:"Lý thuyết dự báo giảm dần theo khoảng cách. Các ước lượng không giảm đều, và đặc tả có khoảng cách đến trung tâm (E2) loại bỏ phần lớn chênh lệch ở vành ≤ 500 m. Giá rao, một lát cắt sau mở tuyến; không phải nhân quả.",
b_h:"2 · Ga được vốn hóa vào giá đất như thế nào",b_p:"Logic tiền tô phần dư: hộ trả phần còn lại sau chi phí phi đất và chi phí đi lại, nên tiền tô là (thu nhập − chi phí đi lại)^m. Ga giảm chi phí đi lại gần ga, và tiền tô tăng theo dạng lồi. Ở thành phố mở, dòng người chuyển đến lấy đi một phần lợi ích.",
b_t:"Chi phí đi lại tiết kiệm nhờ ga",b_m:"Độ lồi của tiền tô (m)",b_l:"Rò rỉ (thành phố mở)",
b_out:"Chênh lệch giá so với không có ga",b_x:"Khoảng cách đến ga (km)",b_y:"Chỉ số giá (không có ga = 100)",
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
d_ex:"Ví dụ: E0, vành ≤ 500 m: 0,274 ứng với 31,5%; E2: 0,121 ứng với 12,9%; E6a: 0,067 ứng với 6,9% (không có ý nghĩa).",
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
function capCalc(){var cb=.3,pts=[],d,prem=function(d){var s=S.t/100*cb/(1+Math.exp((d-.8)/.18));var u=Math.max(0,1-cb+s*(1-S.leak/100)),b=Math.pow(1-cb,S.m);return Math.pow(u,S.m)/b-1};return{prem:prem}}
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
  panel("vzB",t.b_h,t.b_p,"<div class='ctl'><label>"+t.b_t+" <input id='vzT' type='range' min='0' max='40' step='1' value='"+S.t+"'> <b>"+S.t+"%</b></label><label>"+t.b_m+" <input id='vzM' type='range' min='1' max='3' step='0.1' value='"+S.m+"'> <b>"+nf(S.m,1)+"</b></label><label>"+t.b_l+" <input id='vzL' type='range' min='0' max='80' step='5' value='"+S.leak+"'> <b>"+S.leak+"%</b></label></div><div id='vzCap'>"+capSVG()+"</div>",t.b_n)+
  panel("vzC",t.c_h,t.c_p,"<div class='vztabs' role='tablist'>"+["all","ant","op"].map(function(k){return "<button type='button' role='tab' aria-selected='"+(S.phase===k)+"' data-ph='"+k+"'>"+t.c_ph[k]+"</button>"}).join("")+"</div><div id='vzTime'>"+timeSVG()+"</div><p class='vzdef' aria-live='polite'>"+t["c_"+S.phase]+"</p>")+
  panel("vzD",t.d_h,t.d_p,"<div id='vzEq'>"+eqHTML()+"</div>"+calcHTML(),t.d_ex+" "+t.d_n)+
  "</div>";
 wire()}
function wire(){
 root.querySelectorAll("[data-sc]").forEach(function(b){b.addEventListener("click",function(){S.scale=b.getAttribute("data-sc");S.ring=null;render()})});
 root.querySelectorAll("[data-ph]").forEach(function(b){b.addEventListener("click",function(){S.phase=b.getAttribute("data-ph");render()})});
 root.querySelectorAll("[data-r]").forEach(function(c){var go=function(){S.ring=+c.getAttribute("data-r");$("vzRing").innerHTML=ringSVG();$("vzDef").innerHTML=T[L].rdef&&defTxt();wire2()};c.addEventListener("mouseenter",go);c.addEventListener("focus",go);c.addEventListener("click",go)});
 var m=[["vzT","t"],["vzM","m"],["vzL","leak"]];m.forEach(function(q){var e=$(q[0]);if(e)e.addEventListener("input",function(){S[q[1]]=+e.value;e.parentNode.querySelector("b").textContent=q[1]==="m"?nf(S.m,1):S[q[1]]+"%";$("vzCap").innerHTML=capSVG()})});
 root.querySelectorAll("[data-q]").forEach(function(b){var go=function(){S.term=+b.getAttribute("data-q");$("vzEq").innerHTML=eqHTML();wire3()};b.addEventListener("mouseenter",go);b.addEventListener("focus",go);b.addEventListener("click",go)});
 var be=$("vzBeta");if(be)be.addEventListener("input",function(){S.beta=+be.value;$("vzBv").textContent=nf(S.beta,3);$("vzPv").textContent=nf((Math.exp(S.beta)-1)*100,1)+"%"})}
function defTxt(){var t=T[L];return "<b>"+t.rk[S.ring]+"</b> · "+t.rdef[S.ring]+" · "+t.walk+": ≈ "+Math.round(RR[S.ring]/83.3)+" "+t.min}
function wire2(){root.querySelectorAll("[data-r]").forEach(function(c){var go=function(){S.ring=+c.getAttribute("data-r");$("vzRing").innerHTML=ringSVG();$("vzDef").innerHTML=defTxt();wire2()};c.addEventListener("mouseenter",go);c.addEventListener("focus",go);c.addEventListener("click",go)})}
function wire3(){root.querySelectorAll("[data-q]").forEach(function(b){var go=function(){S.term=+b.getAttribute("data-q");$("vzEq").innerHTML=eqHTML();wire3()};b.addEventListener("mouseenter",go);b.addEventListener("focus",go);b.addEventListener("click",go)})}
function txt(){var t=T[L];document.querySelectorAll("[data-v]").forEach(function(n){var k=n.getAttribute("data-v");if(t[k]!=null)n.textContent=t[k]})}
function all(){L=document.documentElement.lang==="vi"?"vi":"en";txt();render()}
var lb=$("lang");if(lb)lb.addEventListener("click",function(){setTimeout(all,60)});all();
})();
