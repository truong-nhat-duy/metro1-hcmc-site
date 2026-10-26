"use strict";
(function(){
var root=document.getElementById("pyRoot"),P=window.PYR;if(!root||!P)return;
var L="en",S={mode:"pyr",lin:false,az:40,el:52},CH=null,PICK=[];
var T={en:{
h:"Population density as a 3-D pyramid around the city centre",
p:"The monocentric model predicts density falling with distance from the centre. Here the 1 km WorldPop cells (2024) are binned into 2 km rings around Bến Thành and 16 compass sectors; column height is mean density. Drag to rotate.",
m1:"Ring pyramid",m2:"Sector columns",s1:"Height: square root",s2:"Height: linear",az:"Rotate",el:"Tilt",
tip:"{a}–{b} km, {d}: {v} people/km² ({n} cells)",none:"No cells",
sec:["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"],
ring:"Ring {a}–{b} km: {v} people/km² (median {m}, {n} cells)",
cap:"Heights capped at the 98th percentile of sector means so a few cells do not flatten the rest. Centre = Bến Thành; rings every 2 km out to 40 km, so the new city area is covered only in part.",
ch:"Mean and median density by distance",chx:"Distance from Bến Thành (km)",chy:"People per km²",
mean:"Mean",med:"Median",th:"Monocentric curve (illustrative)",
f1:"Fitted gradient (cells with people, ≤ 25 km): ln(density) falls {s}% per km (slope {b}, R² {r}).",
f2:"Peak ring: {a}–{b} km ({v} people/km²). The inner 2 km ring is lower ({w}), so density does not peak at the very centre.",
f3:"Sectors differ a lot at the same distance, so the surface is not a clean cone. The pattern is descriptive.",
lim:"WorldPop is modelled from satellite and census inputs, not a census count. Cells are 1 km; the illustrative curve is normalised to the peak ring and is not an estimate. Asking-price results do not use this figure."},
vi:{
h:"Mật độ dân số dạng tháp 3D quanh trung tâm thành phố",
p:"Mô hình đơn tâm dự báo mật độ giảm dần khi xa trung tâm. Ở đây các ô WorldPop 1 km (2024) được gộp thành vành 2 km quanh Bến Thành và 16 hướng la bàn; chiều cao cột là mật độ trung bình. Kéo chuột để xoay.",
m1:"Tháp theo vành",m2:"Cột theo hướng",s1:"Chiều cao: căn bậc hai",s2:"Chiều cao: tuyến tính",az:"Xoay",el:"Nghiêng",
tip:"{a}–{b} km, {d}: {v} người/km² ({n} ô)",none:"Không có ô",
sec:["B","BBĐ","ĐB","ĐĐB","Đ","ĐĐN","ĐN","NĐN","N","NTN","TN","TTN","T","TTB","TB","BTB"],
ring:"Vành {a}–{b} km: {v} người/km² (trung vị {m}, {n} ô)",
cap:"Chiều cao bị chặn ở bách phân vị 98 của các cột để vài ô cực lớn không làm các cột còn lại bị lùn đi. Tâm = Bến Thành; vành 2 km đến 40 km nên chỉ phủ một phần địa bàn thành phố mới.",
ch:"Mật độ trung bình và trung vị theo khoảng cách",chx:"Khoảng cách đến Bến Thành (km)",chy:"Người/km²",
mean:"Trung bình",med:"Trung vị",th:"Đường đơn tâm (minh họa)",
f1:"Độ dốc ước lượng (ô có dân, ≤ 25 km): ln(mật độ) giảm {s}% mỗi km (hệ số {b}, R² {r}).",
f2:"Vành cao nhất: {a}–{b} km ({v} người/km²). Vành trong 2 km thấp hơn ({w}), nên mật độ không đạt đỉnh đúng ở tâm.",
f3:"Cùng khoảng cách, các hướng khác nhau nhiều, nên bề mặt không phải hình nón gọn. Kết quả chỉ mô tả.",
lim:"WorldPop là dữ liệu mô hình hóa từ ảnh vệ tinh và dữ liệu điều tra, không phải số đếm tổng điều tra. Ô 1 km; đường minh họa chuẩn hóa theo vành cao nhất, không phải ước lượng. Kết quả giá rao không dùng hình này."}};
function fmt(n){return Math.round(n).toLocaleString(L==="vi"?"vi-VN":"en-US")}
function f(s,o){return s.replace(/\{(\w+)\}/g,function(_,k){return o[k]})}
var NR=P.nr,NS=P.ns,RW=P.rw;
var D=P.dens.map(function(r){return r[0]}),N=P.n.map(function(r){return r[0]});
var PROF=P.prof;
var allv=[];D.forEach(function(r){r.forEach(function(v){if(v!=null)allv.push(v)})});allv.sort(function(a,b){return a-b});
var CAP=allv[Math.floor(.98*(allv.length-1))],RMAX=Math.max.apply(null,PROF.map(function(p){return p[0]}));
function val(i,j){if(S.mode==="pyr")return N[i].some(function(n){return n>0})?PROF[i][0]:null;return D[i][j]}
function cnt(i,j){return S.mode==="pyr"?PROF[i][2]:N[i][j]}
function cap(){return S.mode==="pyr"?RMAX:CAP}
function hgt(v){var x=Math.min(v,cap())/cap();return 9*(S.lin?x:Math.sqrt(x))}
function col(v){var x=Math.min(v,cap())/cap();x=Math.sqrt(x);var a=[250,225,150],b=[200,50,40],c=[70,10,70];
 var m=x<.5?[a,b,x*2]:[b,c,(x-.5)*2],u=m[2];return [0,1,2].map(function(k){return Math.round(m[0][k]+(m[1][k]-m[0][k])*u)})}
function shade(c,k){return "rgb("+c.map(function(v){return Math.max(0,Math.min(255,Math.round(v*k)))}).join(",")+")"}
function build(){
 root.innerHTML='<div class="vzc"><p id="pyP"></p>'+
 '<div class="ctl"><span class="chips" id="pyM"><button data-m="pyr"></button><button data-m="sec"></button></span><span class="chips" id="pyS"><button data-s="sq"></button><button data-s="lin"></button></span>'+
 '<label><span id="pyAz"></span><input type="range" id="pyAzR" min="0" max="360" value="'+S.az+'"></label><label><span id="pyEl"></span><input type="range" id="pyElR" min="20" max="80" value="'+S.el+'"></label></div>'+
 '<div class="canvaswrap pyc"><canvas id="pyCv" role="img"></canvas><div class="pytip" id="pyTip" hidden></div></div><p class="sub" id="pyCap"></p>'+
 '<h4 id="pyCH"></h4><div class="canvaswrap" style="height:280px"><canvas id="pyChart"></canvas></div><ul class="pyf" id="pyF"></ul><p class="sub" id="pyLim"></p></div>';
 root.querySelectorAll("#pyM button").forEach(function(b){b.addEventListener("click",function(){S.mode=b.getAttribute("data-m");mark();draw()})});
 root.querySelectorAll("#pyS button").forEach(function(b){b.addEventListener("click",function(){S.lin=b.getAttribute("data-s")==="lin";mark();draw()})});
 document.getElementById("pyAzR").addEventListener("input",function(e){S.az=+e.target.value;draw()});
 document.getElementById("pyElR").addEventListener("input",function(e){S.el=+e.target.value;draw()});
 var cv=document.getElementById("pyCv"),drag=null;
 cv.addEventListener("pointerdown",function(e){drag={x:e.clientX,az:S.az};cv.setPointerCapture(e.pointerId)});
 cv.addEventListener("pointerup",function(){drag=null});
 cv.addEventListener("pointermove",function(e){if(drag){S.az=((drag.az+(e.clientX-drag.x)*.5)%360+360)%360;document.getElementById("pyAzR").value=S.az;draw();return}tip(e)});
 cv.addEventListener("pointerleave",function(){document.getElementById("pyTip").hidden=true});
 window.addEventListener("resize",draw);
}
function mark(){root.querySelectorAll("#pyM button").forEach(function(b){b.setAttribute("aria-pressed",b.getAttribute("data-m")===S.mode)});
 root.querySelectorAll("#pyS button").forEach(function(b){b.setAttribute("aria-pressed",(b.getAttribute("data-s")==="lin")===S.lin)})}
function draw(){
 var cv=document.getElementById("pyCv");if(!cv)return;var w=cv.parentNode.clientWidth||600,h=Math.round(Math.min(560,Math.max(320,w*.62)));
 var dpr=window.devicePixelRatio||1;cv.width=w*dpr;cv.height=h*dpr;cv.style.width=w+"px";cv.style.height=h+"px";
 var g=cv.getContext("2d");g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,w,h);
 var cs=getComputedStyle(document.documentElement),ink=cs.getPropertyValue("--ink").trim()||"#14202e",mute=cs.getPropertyValue("--mute").trim()||"#5a6675",line=cs.getPropertyValue("--line").trim()||"#dcdfe3";
 var az=S.az*Math.PI/180,el=S.el*Math.PI/180,Rm=NR*RW,k=Math.min(w/(2.25*Rm),h/(2.6*Rm*Math.sin(el)+14*Math.cos(el)))*1.0;
 var cx=w/2,cy=h*.56;
 function pr(x,y,z){var xr=x*Math.cos(az)-y*Math.sin(az),yr=x*Math.sin(az)+y*Math.cos(az);return [cx+xr*k,cy+(yr*Math.sin(el)-z*Math.cos(el)*1.0*Rm/9*0.5)*k,yr]}
 // ground rings
 g.strokeStyle=line;g.fillStyle=mute;g.lineWidth=1;g.font="11px Inter,system-ui,sans-serif";
 [10,20,30,40].forEach(function(r){g.beginPath();for(var a=0;a<=64;a++){var t=a/64*2*Math.PI,p=pr(r*Math.sin(t),-r*Math.cos(t),0);a?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])}g.stroke();var q=pr(0,r,0);g.fillText(r+" km",q[0]+4,q[1]+12)});
 var items=[];PICK=[];
 for(var i=0;i<NR;i++)for(var j=0;j<NS;j++){var v=val(i,j);if(v==null||!(cnt(i,j)>0))continue;
  var r0=i*RW,r1=(i+1)*RW,b0=(j-.5)*2*Math.PI/NS,b1=(j+.5)*2*Math.PI/NS,hz=hgt(v),m=(b0+b1)/2;
  var depth=pr(((r0+r1)/2)*Math.sin(m),-((r0+r1)/2)*Math.cos(m),0)[2];items.push({i:i,j:j,v:v,r0:r0,r1:r1,b0:b0,b1:b1,h:hz,d:depth,c:col(v)})}
 items.sort(function(a,b){return a.d-b.d});
 function arc(r,b0,b1,z,n){var o=[];for(var s=0;s<=n;s++){var b=b0+(b1-b0)*s/n;o.push(pr(r*Math.sin(b),-r*Math.cos(b),z))}return o}
 items.forEach(function(c){var n=3,faces=[];
  var tI=arc(c.r0,c.b0,c.b1,c.h,n),tO=arc(c.r1,c.b0,c.b1,c.h,n),bI=arc(c.r0,c.b0,c.b1,0,n),bO=arc(c.r1,c.b0,c.b1,0,n);
  faces.push({p:tO.concat(bO.slice().reverse()),k:.92,dd:pr(c.r1*Math.sin((c.b0+c.b1)/2),-c.r1*Math.cos((c.b0+c.b1)/2),0)[2]});
  faces.push({p:tI.concat(bI.slice().reverse()),k:.7,dd:pr(c.r0*Math.sin((c.b0+c.b1)/2),-c.r0*Math.cos((c.b0+c.b1)/2),0)[2]});
  faces.push({p:[tI[0],tO[0],bO[0],bI[0]],k:.78,dd:pr((c.r0+c.r1)/2*Math.sin(c.b0),-(c.r0+c.r1)/2*Math.cos(c.b0),0)[2]});
  faces.push({p:[tI[n],tO[n],bO[n],bI[n]],k:.62,dd:pr((c.r0+c.r1)/2*Math.sin(c.b1),-(c.r0+c.r1)/2*Math.cos(c.b1),0)[2]});
  faces.sort(function(a,b){return a.dd-b.dd});
  faces.forEach(function(f){g.beginPath();f.p.forEach(function(p,x){x?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])});g.closePath();g.fillStyle=shade(c.c,f.k);g.fill();g.strokeStyle="rgba(0,0,0,.18)";g.lineWidth=.5;g.stroke()});
  g.beginPath();tI.concat(tO.slice().reverse()).forEach(function(p,x){x?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])});g.closePath();g.fillStyle=shade(c.c,1.08);g.fill();g.strokeStyle="rgba(0,0,0,.22)";g.stroke();
  var mm=(c.b0+c.b1)/2,rm=(c.r0+c.r1)/2,tp=pr(rm*Math.sin(mm),-rm*Math.cos(mm),c.h);PICK.push({x:tp[0],y:tp[1],c:c})});
 // centre marker + north
 var o=pr(0,0,0);g.fillStyle=ink;g.beginPath();g.arc(o[0],o[1],3,0,7);g.fill();g.font="600 11px Inter,system-ui,sans-serif";g.fillText("Bến Thành",o[0]+6,o[1]-6);
 var nn=pr(0,-Rm*1.06,0);g.fillText(L==="vi"?"B":"N",nn[0]-4,nn[1]);
 cv.setAttribute("aria-label",T[L].h+". "+T[L].cap);
}
function tip(e){var cv=document.getElementById("pyCv"),r=cv.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,best=null,bd=1e9;
 PICK.forEach(function(p){var d=Math.hypot(p.x-x,p.y-y);if(d<bd){bd=d;best=p}});var tp=document.getElementById("pyTip");
 if(!best||bd>26){tp.hidden=true;return}var c=best.c,t=T[L];
 tp.textContent=S.mode==="pyr"?f(t.ring,{a:c.r0,b:c.r1,v:fmt(c.v),m:fmt(PROF[c.i][1]),n:fmt(PROF[c.i][2])}):f(t.tip,{a:c.r0,b:c.r1,d:t.sec[c.j],v:fmt(c.v),n:N[c.i][c.j]});
 tp.style.left=Math.min(r.width-210,Math.max(0,x+10))+"px";tp.style.top=Math.max(0,y-34)+"px";tp.hidden=false}
function chart(){var t=T[L],lab=PROF.map(function(_,i){return (i*RW+RW/2)}),pk=PROF.reduce(function(m,p,i){return p[0]>PROF[m][0]?i:m},0),A=PROF[pk][0],xp=lab[pk];
 var th=lab.map(function(x){return x<xp?null:Math.round(A*Math.exp(P.slope*(x-xp)))});
 if(CH)CH.destroy();var cs=getComputedStyle(document.documentElement),mute=cs.getPropertyValue("--mute").trim()||"#5a6675";
 CH=new Chart(document.getElementById("pyChart").getContext("2d"),{type:"line",data:{labels:lab,datasets:[
 {label:t.mean,data:PROF.map(function(p){return p[0]}),borderColor:"#1b63a8",backgroundColor:"#1b63a8",tension:.2,pointRadius:2},
 {label:t.med,data:PROF.map(function(p){return p[1]}),borderColor:"#14b8a6",backgroundColor:"#14b8a6",tension:.2,pointRadius:2},
 {label:t.th,data:th,borderColor:"#d9480f",borderDash:[5,4],pointRadius:0,spanGaps:true}]},
 options:{responsive:true,maintainAspectRatio:false,scales:{x:{title:{display:true,text:t.chx,color:mute},ticks:{color:mute}},y:{title:{display:true,text:t.chy,color:mute},ticks:{color:mute}}},plugins:{legend:{labels:{color:mute}}}}})}
function text(){var t=T[L],pk=PROF.reduce(function(m,p,i){return p[0]>PROF[m][0]?i:m},0);
 var q=function(i,s){document.getElementById(i).textContent=s};
 q("pyH2",t.h);var nv=document.getElementById("navPyr");if(nv)nv.textContent=L==="vi"?"Tháp dân số 3D":"Population 3-D";q("pyP",t.p);q("pyCap",t.cap);q("pyCH",t.ch);q("pyLim",t.lim);q("pyAz",t.az);q("pyEl",t.el);
 var bm=root.querySelectorAll("#pyM button");bm[0].textContent=t.m1;bm[1].textContent=t.m2;
 var bs=root.querySelectorAll("#pyS button");bs[0].textContent=t.s1;bs[1].textContent=t.s2;
 var s=(100*(1-Math.exp(P.slope))).toFixed(1);
 document.getElementById("pyF").innerHTML="";
 [f(t.f1,{s:s,b:P.slope.toFixed(3),r:P.r2.toFixed(2)}),f(t.f2,{a:pk*RW,b:(pk+1)*RW,v:fmt(PROF[pk][0]),w:fmt(PROF[0][0])}),t.f3].forEach(function(x){var li=document.createElement("li");li.textContent=x;document.getElementById("pyF").appendChild(li)});
}
function all(){L=document.documentElement.lang==="vi"?"vi":"en";text();mark();draw();chart()}
build();var lb=document.getElementById("lang");if(lb)lb.addEventListener("click",function(){setTimeout(all,60)});all();
if(window.matchMedia){var mq=window.matchMedia("(prefers-color-scheme:dark)");if(mq.addEventListener)mq.addEventListener("change",function(){draw();chart()})}
})();
