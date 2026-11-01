"use strict";
/* Real-estate project map (Guland public project directory): Ho Chi Minh City, Binh Duong, Ba Ria-Vung Tau, Hanoi. Canvas markers, lazy loaded. */
(function(){
var Lf=window.L,N=window.NET,D=window.DATA,$=function(i){return document.getElementById(i)};
if(!Lf||!$("mapProj"))return;
var L=document.documentElement.lang==="vi"?"vi":"en";try{var s0=localStorage.getItem("lang");if(s0==="vi"||s0==="en")L=s0}catch(e){}
var T={en:{h:"Real-estate project map: enlarged Ho Chi Minh City, Binh Duong, Vung Tau and Hanoi",
p:"Each dot is one project listed in the public Guland project directory, coloured by sale status. Filter by area and status, or search by project name. Click a dot for the developer, project type, scale and handover date shown in the directory.",
city:"Area:",c_hcm:"Ho Chi Minh City (before merger)",c_ext:"Enlarged HCMC (with Binh Duong, Vung Tau)",c_bd:"Binh Duong",c_brvt:"Ba Ria - Vung Tau",c_hn:"Hanoi",
status:"Status:",s_all:"All",s_a:"On sale",s_u:"Upcoming",s_l:"Permit stage",s_s:"Resale (secondary)",find:"Find:",ph:"project name",stn:"Metro stations",
n:"projects",top:"Developers with most projects",asof:"Directory as of",pdev:"Developer",phand:"Handover",ptype:"Type",pscale:"Scale",none:"No project matches.",
note:"Source: Guland public project directory (names, coordinates, status, type, developer, handover). This is a list of projects on a listing platform, not a complete register of projects, and status is as shown by the platform at collection time. Coordinates are platform pins and may be approximate. Counts describe the directory only and are not evidence about prices or about the effect of Metro.",
load:"Loading..."},
vi:{h:"Bản đồ dự án bất động sản: TP.HCM mở rộng, Bình Dương, Vũng Tàu và Hà Nội",
p:"Mỗi chấm là một dự án trong danh bạ dự án công khai của Guland, tô màu theo trạng thái bán. Lọc theo khu vực và trạng thái, hoặc tìm theo tên dự án. Bấm vào chấm để xem chủ đầu tư, loại hình, quy mô và thời điểm bàn giao theo danh bạ.",
city:"Khu vực:",c_hcm:"TP.HCM (trước sáp nhập)",c_ext:"TP.HCM mở rộng (gồm Bình Dương, Vũng Tàu)",c_bd:"Bình Dương",c_brvt:"Bà Rịa - Vũng Tàu",c_hn:"Hà Nội",
status:"Trạng thái:",s_all:"Tất cả",s_a:"Đang mở bán",s_u:"Sắp mở bán",s_l:"Xin cấp phép",s_s:"Hàng thứ cấp",find:"Tìm:",ph:"tên dự án",stn:"Ga metro",
n:"dự án",top:"Chủ đầu tư có nhiều dự án nhất",asof:"Danh bạ cập nhật đến",pdev:"Chủ đầu tư",phand:"Bàn giao",ptype:"Loại hình",pscale:"Quy mô",none:"Không có dự án phù hợp.",
note:"Nguồn: danh bạ dự án công khai của Guland (tên, tọa độ, trạng thái, loại hình, chủ đầu tư, bàn giao). Đây là danh sách dự án trên một sàn rao vặt, không phải sổ đăng ký đầy đủ các dự án, và trạng thái là trạng thái sàn hiển thị lúc thu thập. Tọa độ là ghim của sàn nên có thể gần đúng. Số liệu chỉ mô tả danh bạ, không phải bằng chứng về giá hay về tác động của Metro.",
load:"Đang tải…"}};
var VIEW={hcm:[[10.80,106.72],10],ext:[[10.85,106.95],9],bd:[[11.10,106.70],10],brvt:[[10.50,107.25],10],hn:[[21.02,105.84],10]};
var PCOL={a:"#16a34a",u:"#f59e0b",l:"#8b5cf6",s:"#64748b"};
var DATAP=null,map,PR,layer,stn,G,cur="ext",st="all",qq="",shown=[];
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function norm(s){s=String(s||"").toLowerCase();try{s=s.normalize("NFD").replace(/[̀-ͯ]/g,"")}catch(e){}return s.replace(/đ/g,"d")}
function nfmt(n){return n.toLocaleString(L==="vi"?"vi-VN":"en-US")}
function get(){if(DATAP)return Promise.resolve(DATAP);return fetch("data/projects.json").then(function(r){return r.json()}).then(function(j){DATAP=j;return j})}
function rows(){var ks=cur==="ext"?["hcm","bd","brvt"]:[cur],out=[];ks.forEach(function(k){(DATAP.p[k]||[]).forEach(function(r){out.push(r)})});return out}
function draw(){var t=T[L];layer.clearLayers();var all=rows(),q=norm(qq).trim();
 shown=all.filter(function(r){return(st==="all"||r[3]===st)&&(!q||norm(r[2]).indexOf(q)>=0)});
 var cnt={a:0,u:0,l:0,s:0},dev={},pts=[];
 shown.forEach(function(r){cnt[r[3]]=(cnt[r[3]]||0)+1;if(r[5])dev[r[5]]=(dev[r[5]]||0)+1;pts.push([r[0],r[1]]);
  var m=Lf.circleMarker([r[0],r[1]],{renderer:PR,radius:5,color:"#0f172a",weight:1,fillColor:PCOL[r[3]],fillOpacity:.9,bubblingMouseEvents:false});
  m.bindPopup("<b>"+esc(r[2])+"</b><br><small>"+t["s_"+r[3]]+"</small>"+(r[4]?"<br><small>"+t.ptype+": "+esc(r[4])+"</small>":"")+(r[5]?"<br><small>"+t.pdev+": "+esc(r[5])+"</small>":"")+(r[7]?"<br><small>"+t.pscale+": "+esc(r[7])+"</small>":"")+(r[6]?"<br><small>"+t.phand+": "+esc(r[6])+"</small>":""));
  m.addTo(layer)});
 var top=Object.keys(dev).sort(function(a,b){return dev[b]-dev[a]}).slice(0,5);
 $("pjInfo").innerHTML="<div class='big'>"+nfmt(shown.length)+"</div><div><small>"+t.n+"</small></div>"+
  (shown.length?"<div style='margin-top:10px'>"+["a","u","l","s"].map(function(k){return"<div><span class='pjd' style='background:"+PCOL[k]+"'></span><small>"+t["s_"+k]+"</small> <b>"+nfmt(cnt[k]||0)+"</b></div>"}).join("")+"</div>":"<div style='margin-top:10px'><small>"+t.none+"</small></div>")+
  (top.length?"<div style='margin-top:10px'><small>"+t.top+"</small>"+top.map(function(k){return"<div><small>"+esc(k)+"</small> <b>"+dev[k]+"</b></div>"}).join("")+"</div>":"")+
  "<div style='margin-top:10px'><small>"+t.asof+" "+(DATAP.asof||"")+"</small></div>";
 $("pjLg").innerHTML=["a","u","l","s"].map(function(k){return"<span><i style='background:"+PCOL[k]+";border:1px solid #0f172a'></i>"+t["s_"+k]+"</span>"}).join(" ");
 if(q&&pts.length&&pts.length<=300)map.fitBounds(Lf.latLngBounds(pts).pad(.2),{maxZoom:15})}
function stnDraw(){stn.clearLayers();if(!$("pjStn").checked)return;
 var list=[];if(cur==="hcm"||cur==="ext")list=(D&&D.stations||[]).map(function(s){return{lat:s.lat,lng:s.lng,n:L==="vi"?s.vi:s.en}});if(cur==="hn")list=(N&&N.hnStations||[]);
 if(!window.Geo||!Geo.stMarker)return;list.forEach(function(s){Geo.stMarker(s.lat,s.lng,{color:"#111827",sm:true}).bindTooltip(s.n,{className:"stl",direction:"right",offset:[0,0]}).addTo(stn)})}
function go(){$("pjLoad").textContent=T[L].load;get().then(function(){$("pjLoad").textContent="";map.setView(VIEW[cur][0],VIEW[cur][1]);draw();stnDraw()}).catch(function(){$("pjLoad").textContent="Error"})}
function init(){map=Lf.map($("mapProj"),{minZoom:8,zoomAnimation:false}).setView(VIEW.ext[0],VIEW.ext[1]);
 try{G=window.Geo&&Geo.init(map,"hcm",{nolegend:true});if(G&&G.dist)map.removeLayer(G.dist);if(G&&G.lines)map.removeLayer(G.lines)}catch(e){}
 stn=Lf.layerGroup().addTo(map);PR=Lf.canvas({padding:.5});layer=Lf.layerGroup().addTo(map);
 $("pjCity").value=cur;$("pjCity").addEventListener("change",function(){cur=this.value;go()});
 $("pjSt").addEventListener("change",function(){st=this.value;draw()});
 var tm=null;$("pjQ").addEventListener("input",function(){var v=this.value;clearTimeout(tm);tm=setTimeout(function(){qq=v;draw()},250)});
 $("pjStn").addEventListener("change",stnDraw);go()}
function txt(){var t=T[L];document.querySelectorAll("[data-pj]").forEach(function(n){var k=n.getAttribute("data-pj");if(t[k]!=null)n.textContent=t[k]});
 ["hcm","ext","bd","brvt","hn"].forEach(function(k){var o=document.querySelector("#pjCity option[value='"+k+"']");if(o)o.textContent=t["c_"+k]});
 ["all","a","u","l","s"].forEach(function(k){var o=document.querySelector("#pjSt option[value='"+k+"']");if(o)o.textContent=t["s_"+k]});
 var q=$("pjQ");if(q)q.placeholder=t.ph}
var lb=$("lang");if(lb)lb.addEventListener("click",function(){setTimeout(function(){L=document.documentElement.lang==="vi"?"vi":"en";txt();if(map&&DATAP){draw();stnDraw()}},40)});
txt();
var el=$("mapProj");if("IntersectionObserver" in window){var o=new IntersectionObserver(function(es){if(es[0].isIntersecting){o.disconnect();init()}},{rootMargin:"300px"});o.observe(el)}else init();
window.XPROJ=function(){return{map:map,n:shown.length}};
})();
