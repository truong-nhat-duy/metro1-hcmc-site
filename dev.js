"use strict";
(function(){
var $=function(i){return document.getElementById(i)},D=window.DEV,N=window.NET,Lf=window.L;if(!D||!$("devRoot"))return;
var L=document.documentElement.lang==="vi"?"vi":"en",S={beta:0.121,g:"all"},CH=null,MAP=null,LAY=null;
var T={en:{
h:"Developers and projects: exposure to the lines",
p:"Which developments sit near a metro line today, and which near lines that are still being built or planned? The figures below show exposure: how many apartment listings of each developer lie within 800 m of an operating, under-construction or planned station. Exposure is not a benefit, and nothing here shows that a developer gained from Metro.",
warn:"Data: Chợ Tốt apartment listings from the 19 October 2026 tracking run (2,240 listings, not the frozen run). All lie inside the current Ho Chi Minh City outline but in the former city area; none come from the Bình Dương or Bà Rịa–Vũng Tàu parts of the enlarged city. Developers are assigned from project names: 596 listings were checked against web excerpts, 197 inferred from the brand in the name, 16 from memory, 935 projects are unverified and 496 listings have no project name. Planned stations include 38 whose line is not verified and the 14 points of the planned east extension of Line 1.",
c1:"Where each developer’s listings lie relative to the lines",c1x:"Share of the developer’s listings",
st:{op:"≤ 800 m of an operating station (Line 1)",uc:"≤ 800 m of a station under construction (Line 2)",pl:"≤ 800 m of a planned station",far:"Farther than 800 m from any station"},
cols:["Developer group","Listings","Projects","Median price (mn VND/m²)","Operating","Under constr.","Planned","Verified share","Price vs ward mean","Uplift if gap = β (mn/m²)"],
beta:"Scenario gap β (ln points)",betaN:"Scenario arithmetic only: median price × (exp(β) − 1). It is not an estimate. The default 0.121 is the ≤ 500 m coefficient of specification E2 for all housing types, which is itself descriptive.",
unv:"(unverified projects)",nn:"(no project name)",oth:"Other verified developers",
res:"Indicative: listing-weighted mean of each project’s price residual against its ward mean (no distance term); it reflects brand and segment, not Metro.",
mh:"Projects on the map",mp:"One bubble per project with at least 3 listings (202). Bubble colour shows the closest stage within 800 m; size shows listings. Click for details.",
all:"All developers",gl:"Developer group",
pop:["Listings","Median price","Closest operating station","Closest station under construction","Closest planned station","Price vs ward mean","Verification"],
vr:{web:"web excerpt",ten:"brand in name",tri_thuc:"from memory",chua_xac_minh:"unverified"},
th:"Projects with the most listings near a station",tc:["Project","Developer group","Listings ≤ 800 m / total","Closest station (stage, m)","Median price","Price vs ward mean"],
stg:{op:"operating",uc:"under construction",pl:"planned"},
rh:"What the exposure shows, and what it does not",
lim:"Limits",
limL:["Exposure counts listings, not units sold or land owned, so it says nothing about profit.","Developers with the highest exposure also sell the highest-priced central units, so brand, segment and location are tangled with the line.","No listings before 22 December 2024: no developer’s price change can be measured.","Planned stations are partly unverified and the Line 1 extension is schematic.","The data cover the former city area only; a view of the enlarged city needs listings from Bình Dương and Bà Rịa–Vũng Tàu."],
src:"Source: apt_project_developer_20261019.csv and apt_project_table_20261019.csv (tracking run), stations from the project’s network table."
},vi:{
h:"Chủ đầu tư và dự án: mức tiếp xúc với các tuyến",
p:"Dự án nào đang nằm gần tuyến metro hiện nay, dự án nào gần các tuyến đang xây hoặc quy hoạch? Các số liệu dưới đây cho thấy mức tiếp xúc: bao nhiêu tin căn hộ của mỗi chủ đầu tư nằm trong 800 m quanh ga đang vận hành, đang xây hoặc quy hoạch. Tiếp xúc không phải là hưởng lợi, và không có số liệu nào ở đây cho thấy chủ đầu tư nào được lợi từ Metro.",
warn:"Dữ liệu: tin căn hộ Chợ Tốt của lần chạy theo dõi 19/10/2026 (2.240 tin, không phải lần chạy đóng băng). Tất cả nằm trong ranh giới TP.HCM hiện hành nhưng thuộc địa bàn thành phố cũ; không có tin từ phần Bình Dương hoặc Bà Rịa–Vũng Tàu của thành phố mở rộng. Chủ đầu tư được gán theo tên dự án: 596 tin đã đối chiếu với trích đoạn web, 197 tin suy từ thương hiệu trong tên, 16 tin theo trí nhớ, 935 tin thuộc dự án chưa xác minh và 496 tin không có tên dự án. Ga quy hoạch gồm 38 ga chưa xác minh tuyến và 14 điểm của đoạn kéo dài phía đông tuyến 1.",
c1:"Tin của từng chủ đầu tư nằm ở đâu so với các tuyến",c1x:"Tỷ lệ tin của chủ đầu tư",
st:{op:"≤ 800 m ga đang vận hành (tuyến 1)",uc:"≤ 800 m ga đang xây (tuyến 2)",pl:"≤ 800 m ga quy hoạch",far:"Xa hơn 800 m mọi ga"},
cols:["Nhóm chủ đầu tư","Tin","Dự án","Giá trung vị (tr/m²)","Vận hành","Đang xây","Quy hoạch","Tỷ lệ đã xác minh","Giá so với trung bình phường","Chênh nếu khoảng cách = β (tr/m²)"],
beta:"Chênh lệch kịch bản β (điểm ln)",betaN:"Chỉ là tính toán kịch bản: giá trung vị × (exp(β) − 1). Không phải ước lượng. Giá trị mặc định 0,121 là hệ số vành ≤ 500 m của đặc tả E2 cho mọi loại nhà, vốn cũng chỉ mang tính mô tả.",
unv:"(dự án chưa xác minh)",nn:"(không có tên dự án)",oth:"Chủ đầu tư khác đã xác minh",
res:"Chỉ báo: trung bình theo tin của phần dư giá từng dự án so với trung bình phường (không có biến khoảng cách); phản ánh thương hiệu và phân khúc, không phải Metro.",
mh:"Dự án trên bản đồ",mp:"Mỗi dự án có ít nhất 3 tin là một chấm (202 dự án). Màu chấm là giai đoạn gần nhất trong 800 m; kích thước là số tin. Bấm để xem chi tiết.",
all:"Tất cả chủ đầu tư",gl:"Nhóm chủ đầu tư",
pop:["Tin","Giá trung vị","Ga vận hành gần nhất","Ga đang xây gần nhất","Ga quy hoạch gần nhất","Giá so với trung bình phường","Mức kiểm chứng"],
vr:{web:"trích đoạn web",ten:"thương hiệu trong tên",tri_thuc:"theo trí nhớ",chua_xac_minh:"chưa xác minh"},
th:"Dự án có nhiều tin nhất gần ga",tc:["Dự án","Nhóm chủ đầu tư","Tin ≤ 800 m / tổng","Ga gần nhất (giai đoạn, m)","Giá trung vị","Giá so với trung bình phường"],
stg:{op:"vận hành",uc:"đang xây",pl:"quy hoạch"},
rh:"Mức tiếp xúc cho thấy gì và không cho thấy gì",
lim:"Giới hạn",
limL:["Tiếp xúc đếm tin đăng, không phải căn đã bán hay đất sở hữu, nên không nói gì về lợi nhuận.","Chủ đầu tư tiếp xúc nhiều nhất cũng bán căn trung tâm giá cao nhất, nên thương hiệu, phân khúc và vị trí lẫn với tuyến.","Không có tin trước 22/12/2024: không đo được thay đổi giá của chủ đầu tư nào.","Ga quy hoạch một phần chưa xác minh và đoạn kéo dài tuyến 1 chỉ là sơ họa.","Dữ liệu chỉ phủ địa bàn thành phố cũ; muốn nhìn thành phố mở rộng cần tin từ Bình Dương và Bà Rịa–Vũng Tàu."],
src:"Nguồn: apt_project_developer_20261019.csv và apt_project_table_20261019.csv (lần chạy theo dõi), ga lấy từ bảng mạng lưới của dự án."}};
var nf=function(x,k){var s=(+x).toFixed(k==null?1:k);return L==="vi"?s.replace(".",","):s},fi=function(x){return Math.round(x).toLocaleString(L==="vi"?"vi-VN":"en-US")};
var COL={op:"#0079b8",uc:"#dc2626",pl:"#7c8795",far:"#cbd5e1"};
function gname(g){var t=T[L];return g==="(dự án chưa xác minh)"?t.unv:g==="(không có tên dự án)"?t.nn:g==="Khác (đã xác minh)"?t.oth:g}
function groups(){return D.groups.slice().sort(function(a,b){var ka=a.g.charAt(0)==="("||a.g==="Khác (đã xác minh)",kb=b.g.charAt(0)==="("||b.g==="Khác (đã xác minh)";if(ka!==kb)return ka?1:-1;return (b.op+b.uc+b.pl)/b.n-(a.op+a.uc+a.pl)/a.n})}
function chart(){var t=T[L],G=groups(),cv=$("cDev");if(!cv||!window.Chart)return;if(CH)CH.destroy();
 CH=new Chart(cv.getContext("2d"),{type:"bar",data:{labels:G.map(function(g){return gname(g.g)+" ("+g.n+")"}),datasets:["op","uc","pl","far"].map(function(k){return{label:t.st[k],data:G.map(function(g){return 100*g[k]/g.n}),backgroundColor:COL[k],borderWidth:0}})},
  options:{indexAxis:"y",responsive:true,maintainAspectRatio:false,scales:{x:{stacked:true,max:100,title:{display:true,text:t.c1x+" (%)"}},y:{stacked:true,ticks:{autoSkip:false}}},plugins:{legend:{position:"bottom"},tooltip:{callbacks:{label:function(c){var g=G[c.dataIndex],k=["op","uc","pl","far"][c.datasetIndex];return c.dataset.label+": "+g[k]+" / "+g.n+" ("+nf(c.raw,1)+"%)"}}}}}})}
function table(){var t=T[L],G=groups(),tb=$("tDev");if(!tb)return;
 tb.innerHTML="<thead><tr>"+t.cols.map(function(c){return "<th>"+c+"</th>"}).join("")+"</tr></thead><tbody>"+G.map(function(g){var up=g.op>0?nf(g.pp*(Math.exp(S.beta)-1),1):"—";
  return "<tr><th scope='row'>"+gname(g.g)+"</th><td>"+g.n+"</td><td>"+g.proj+"</td><td>"+nf(g.pp,1)+"</td><td>"+g.op+"</td><td>"+g.uc+"</td><td>"+g.pl+"</td><td>"+Math.round(g.ver*100)+"%</td><td>"+(g.res==null?"—":(g.res>0?"+":"")+nf(g.res,1)+"%")+"</td><td>"+up+"</td></tr>"}).join("")+"</tbody>"}
function top(){var t=T[L],P=D.projects.slice().sort(function(a,b){return b.w8-a.w8||b.k-a.k}).slice(0,12),tb=$("tDevTop");if(!tb)return;
 tb.innerHTML="<thead><tr>"+t.tc.map(function(c){return "<th>"+c+"</th>"}).join("")+"</tr></thead><tbody>"+P.map(function(p){var k=p.dop<=800?"op":p.duc<=800?"uc":"pl",d=k==="op"?p.dop:k==="uc"?p.duc:p.dpl;
  return "<tr><th scope='row'>"+p.n+"</th><td>"+gname(p.g)+"</td><td>"+p.w8+" / "+p.k+"</td><td>"+t.stg[k]+", "+fi(d)+" m</td><td>"+nf(p.pp,1)+"</td><td>"+(p.res==null?"—":(p.res>0?"+":"")+nf(p.res,1)+"%")+"</td></tr>"}).join("")+"</tbody>"}
function selOpts(){var s=$("devSel");if(!s)return;var t=T[L],cur=S.g;s.innerHTML="<option value='all'>"+t.all+"</option>"+groups().filter(function(g){return g.g.charAt(0)!=="("}).map(function(g){return "<option value='"+g.g+"'>"+gname(g.g)+"</option>"}).join("");s.value=cur}
function pin(p){var k=p.dop<=800?"op":p.duc<=800?"uc":(p.dpl<=800?"pl":"far"),t=T[L];
 return Lf.circleMarker([p.lat,p.lng],{radius:4+Math.sqrt(p.k)*1.6,color:"#fff",weight:1.5,fillColor:COL[k],fillOpacity:.85}).bindPopup("<b>"+p.n+"</b><br>"+gname(p.g)+" · "+t.vr[p.v]+"<br>"+t.pop[0]+": "+p.k+" · "+t.pop[1]+": "+nf(p.pp,1)+" mn/m²<br>"+t.pop[2]+": "+fi(p.dop)+" m<br>"+t.pop[3]+": "+fi(p.duc)+" m<br>"+t.pop[4]+": "+fi(p.dpl)+" m"+(p.res==null?"":"<br>"+t.pop[5]+": "+(p.res>0?"+":"")+nf(p.res,1)+"%"))}
function pins(){if(!MAP)return;if(LAY)LAY.remove();LAY=Lf.featureGroup();D.projects.filter(function(p){return S.g==="all"||p.g===S.g}).forEach(function(p){pin(p).addTo(LAY)});LAY.addTo(MAP)}
function initMap(){if(MAP||!$("devMap")||!window.Geo)return;MAP=Lf.map("devMap").setView([10.8,106.74],11);var G=Geo.init(MAP,"hcm",{cat:true,nolegend:true});
 if(N&&N.hcmStations)N.hcmStations.forEach(function(s){Geo.stMarker(s.lat,s.lng,{st:s.st,color:s.st==="op"?"#0079b8":s.st==="uc"?"#dc2626":"#7c8795",sm:true}).addTo(MAP)});
 pins();legend()}
function legend(){var t=T[L],el=$("devLg");if(!el)return;el.innerHTML=["op","uc","pl","far"].map(function(k){return "<span><i style='background:"+COL[k]+"'></i>"+t.st[k]+"</span>"}).join("")}
function text(){var t=T[L];document.querySelectorAll("[data-d]").forEach(function(n){var k=n.getAttribute("data-d");if(t[k]!=null)n.textContent=t[k]});
 var ul=$("devLim");if(ul)ul.innerHTML=t.limL.map(function(x){return "<li>"+x+"</li>"}).join("");
 var b=$("devBetaL");if(b)b.firstChild.textContent=t.beta+" "}
function facts(){var t=T[L],g=function(n){return D.groups.filter(function(x){return x.g===n})[0]},o=[];var m=g("Masterise"),v=g("Vingroup"),nv=g("Novaland"),h=g("Hà Đô");
 var s=L==="vi"?
  ["Masterise: "+m.op+" trong "+m.n+" tin nằm trong 800 m quanh ga tuyến 1. Vingroup: "+v.op+" trong "+v.n+".","Tiếp xúc tương lai: "+nv.uc+" trong "+nv.n+" tin của Novaland và "+h.uc+" trong "+h.n+" tin của Hà Đô nằm gần ga tuyến 2 đang xây.","Gamuda/TTC, Nam Long, Tecco/STC, Đức Khải, An Gia và Nhà nước/DNNN: không có tin nào trong 800 m quanh bất kỳ ga nào (kể cả ga quy hoạch).","Giá cao hơn trung bình phường (Masterise +"+nf(m.res,0)+"%, Hà Đô +"+nf(h.res,0)+"%) phản ánh phân khúc và vị trí trung tâm, không thể quy cho Metro. Hệ số khoảng cách của Masterise phẳng hơn các nhóm khác (−0,109 so với −0,14 đến −0,16), nhưng nhóm này vừa gần ga vừa ở phân khúc cao cấp."]:
  ["Masterise: "+m.op+" of "+m.n+" listings lie within 800 m of a Line 1 station. Vingroup: "+v.op+" of "+v.n+".","Future exposure: "+nv.uc+" of Novaland’s "+nv.n+" listings and "+h.uc+" of Hà Đô’s "+h.n+" lie near stations of Line 2, which is under construction.","Gamuda/TTC, Nam Long, Tecco/STC, Đức Khải, An Gia and State/SOE: no listing within 800 m of any station, planned stations included.","Prices above the ward mean (Masterise +"+nf(m.res,0)+"%, Hà Đô +"+nf(h.res,0)+"%) reflect segment and central location, not Metro. Masterise’s distance slope is flatter than the other groups (−0.109 against −0.14 to −0.16), but the group is both near stations and high-end."];
 var ul=$("devFacts");if(ul)ul.innerHTML=s.map(function(x){return "<li>"+x+"</li>"}).join("")}
function all(){L=document.documentElement.lang==="vi"?"vi":"en";text();chart();table();top();selOpts();facts();legend();if(MAP)pins()}
document.addEventListener("DOMContentLoaded",function(){});
var be=$("devBeta");if(be)be.addEventListener("input",function(){S.beta=+be.value;$("devBv").textContent=nf(S.beta,3);table()});
var sel=$("devSel");if(sel)sel.addEventListener("change",function(){S.g=sel.value;pins()});
var lb=$("lang");if(lb)lb.addEventListener("click",function(){setTimeout(function(){all();$("devBv").textContent=nf(S.beta,3)},80)});
all();$("devBv").textContent=nf(S.beta,3);
var sec=$("dev-s");if("IntersectionObserver" in window&&sec){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){io.disconnect();initMap();setTimeout(function(){if(MAP)MAP.invalidateSize()},200)}},{rootMargin:"400px"});io.observe(sec)}else initMap();
})();
