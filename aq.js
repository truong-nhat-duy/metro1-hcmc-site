"use strict";
/* Air-quality layer for the Leaflet maps. Modelled values (CAMS ENSEMBLE via Open-Meteo, global grid about 0.4 degrees, roughly 45 km);
   NOT station measurements. Loaded in the browser; no position of the visitor is sent. Attribution: CAMS ENSEMBLE data provider, Open-Meteo.com. */
(function(){
var Lf=window.L;if(!Lf)return;
var API="https://air-quality-api.open-meteo.com/v1/air-quality";
var AQC=[[50,"#2e9e5b"],[100,"#e0a800"],[150,"#e8710a"],[200,"#d92d20"],[300,"#8f3f97"],[1e9,"#7e0023"]];
var WC=[[1,"#2e9e5b"],[2,"#9ccc3f"],[4,"#e0a800"],[7,"#e8710a"],[1e9,"#d92d20"]];
var CITY=[{n:{en:"Hanoi (centre)",vi:"Hà Nội (trung tâm)"},lat:21.0285,lng:105.8542,k:"hn"},{n:{en:"Ho Chi Minh City (centre)",vi:"TP.HCM (trung tâm)"},lat:10.7769,lng:106.7009,k:"hcm"}];
var T={en:{
dm:"Display",d1:"Heat map",d2:"Heat map + points",d3:"Points only",ho:"Heat-map opacity",hn:"Heat map = distance-weighted interpolation between the modelled points; it fades beyond about 45–120 km from a point, so it is not a measurement.",sum:"Air quality (modelled)",show:"Show air-quality layer",met:"Value",m1:"PM2.5 (µg/m³)",m2:"US AQI",col:"Colour scale",c1:"US AQI categories",c2:"Multiple of WHO annual guideline (5 µg/m³)",c3:"Multiple of WHO 24-hour guideline (15 µg/m³)",
tm:"Time",now:"now",sz:"Marker size",s1:"Small",s2:"Medium",s3:"Large",lab:"Show numbers on the map",go:"Zoom to",vn:"Vietnam",rf:"Reload",cmp:"Hanoi and Ho Chi Minh City",
load:"Loading…",err:"Could not load the air-quality data from this network. The rest of the map still works; try Reload.",note:"Modelled values on a coarse grid (about 45 km), so city centres are smoothed. They are not station readings and can differ from IQAir or AQICN.",
src:"Data: CAMS ENSEMBLE data provider, via Open-Meteo.com.",who:"× WHO",pm:"PM2.5",aqi:"US AQI",leg:"Colour legend",
cat:["Good","Moderate","Unhealthy for sensitive groups","Unhealthy","Very unhealthy","Hazardous"]},
vi:{
dm:"Hiển thị",d1:"Bản đồ nhiệt",d2:"Bản đồ nhiệt + điểm",d3:"Chỉ điểm",ho:"Độ đậm bản đồ nhiệt",hn:"Bản đồ nhiệt là nội suy theo nghịch đảo khoảng cách giữa các điểm mô hình; mờ dần khi cách điểm khoảng 45–120 km, không phải số đo.",
sum:"Chất lượng không khí (mô hình)",show:"Hiện lớp chất lượng không khí",met:"Giá trị",m1:"PM2.5 (µg/m³)",m2:"AQI (Mỹ)",col:"Thang màu",c1:"Mức AQI (Mỹ)",c2:"Số lần so với ngưỡng năm của WHO (5 µg/m³)",c3:"Số lần so với ngưỡng 24 giờ của WHO (15 µg/m³)",
tm:"Thời điểm",now:"hiện tại",sz:"Cỡ điểm",s1:"Nhỏ",s2:"Vừa",s3:"Lớn",lab:"Hiện số trên bản đồ",go:"Phóng tới",vn:"Việt Nam",rf:"Tải lại",cmp:"Hà Nội và TP.HCM",
load:"Đang tải…",err:"Không tải được dữ liệu chất lượng không khí trên mạng này. Phần còn lại của bản đồ vẫn dùng được; thử Tải lại.",note:"Giá trị mô hình trên lưới thô (khoảng 45 km), nên tâm thành phố bị làm trơn. Đây không phải số đo tại trạm và có thể khác IQAir hay AQICN.",
src:"Dữ liệu: CAMS ENSEMBLE data provider, qua Open-Meteo.com.",who:"× WHO",pm:"PM2.5",aqi:"AQI (Mỹ)",leg:"Chú giải màu",
cat:["Tốt","Trung bình","Không tốt cho nhóm nhạy cảm","Xấu","Rất xấu","Nguy hại"]}};
var DATA=null,PEND=null;
function lang(){var l="en";try{var s=localStorage.getItem("lang");if(s==="vi"||s==="en")l=s;else if((navigator.language||"").slice(0,2)==="vi")l="vi"}catch(e){}
 if(document.documentElement.lang==="vi")l="vi";return l}
function f1(x,L){var s=String(Math.round(x*10)/10);return L==="vi"?s.replace(".",","):s}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function pick(v,tab){for(var i=0;i<tab.length;i++)if(v<=tab[i][0])return tab[i][1];return tab[tab.length-1][1]}
function aqiIdx(v){for(var i=0;i<AQC.length;i++)if(v<=AQC[i][0])return i;return AQC.length-1}
function bbox(g){var P=g.type==="Polygon"?[g.coordinates]:g.coordinates,best=null,ba=-1;P.forEach(function(q){var r=q[0],a=1e9,b=1e9,c=-1e9,d=-1e9;r.forEach(function(x){a=Math.min(a,x[1]);b=Math.min(b,x[0]);c=Math.max(c,x[1]);d=Math.max(d,x[0])});var ar=(c-a)*(d-b);if(ar>ba){ba=ar;best=[(a+c)/2,(b+d)/2]}});return best}
function sites(){return fetch("data/prov34.json").then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(p){
 var o=[];p.forEach(function(x){if(/Hà Nội|Hồ Chí Minh/.test(x.n))return;var c=bbox(x.g);if(c){var nm=x.n.replace(/^(Tỉnh|Thành phố)\s+/,"");o.push({n:{en:nm,vi:nm},lat:c[0],lng:c[1]})}});return CITY.concat(o)}).catch(function(){return CITY.slice()})}
function load(force){if(DATA&&!force)return Promise.resolve(DATA);if(PEND&&!force)return PEND;
 PEND=sites().then(function(S){var url=API+"?latitude="+S.map(function(s){return s.lat.toFixed(3)}).join(",")+"&longitude="+S.map(function(s){return s.lng.toFixed(3)}).join(",")+"&hourly=pm2_5,us_aqi&past_days=1&forecast_days=3&timeformat=unixtime&timezone=GMT";
  return fetch(url).then(function(r){if(!r.ok)throw new Error(r.status);return r.json()}).then(function(j){var a=Array.isArray(j)?j:[j];if(a.length!==S.length||!a[0].hourly)throw new Error("shape");
   var times=a[0].hourly.time,now=Math.floor(Date.now()/1000),ni=0;for(var i=0;i<times.length;i++)if(times[i]<=now)ni=i;
   DATA={S:S,times:times,ni:ni,pm:a.map(function(x){return x.hourly.pm2_5}),aqi:a.map(function(x){return x.hourly.us_aqi})};return DATA})});
 PEND.catch(function(){PEND=null});return PEND}
function fmtT(unix,L){try{return new Intl.DateTimeFormat(L==="vi"?"vi-VN":"en-GB",{timeZone:"Asia/Ho_Chi_Minh",day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit",hour12:false}).format(new Date(unix*1000))}catch(e){return ""}}
function attach(map,opts){opts=opts||{};
 var S={on:false,met:"pm",col:"aqi",off:0,sz:12,lab:false,mode:"heat",op:.6},grp=Lf.layerGroup(),heat=null,ctl=Lf.control({position:opts.pos||"topright"}),el,L=lang();
 ctl.onAdd=function(){el=Lf.DomUtil.create("div","aqp leaflet-bar");Lf.DomEvent.disableClickPropagation(el);Lf.DomEvent.disableScrollPropagation(el);ui();return el};
 function val(i){if(!DATA)return null;var k=DATA.ni+S.off,v=(S.met==="pm"?DATA.pm:DATA.aqi)[i][k];return v==null?null:v}
 function colour(i){var k=DATA.ni+S.off,pm=DATA.pm[i][k],a=DATA.aqi[i][k];if(S.col==="aqi")return a==null?"#888":pick(a,AQC);if(pm==null)return"#888";return pick(pm/(S.col==="w24"?15:5),WC)}
 function fv(i){var k=DATA.ni+S.off,pm=DATA.pm[i][k],a=DATA.aqi[i][k];if(S.col==="aqi")return a;return pm==null?null:pm/(S.col==="w24"?15:5)}
 function fcol(v){var c=S.col==="aqi"?pick(v,AQC):pick(v,WC);return[parseInt(c.substr(1,2),16),parseInt(c.substr(3,2),16),parseInt(c.substr(5,2),16)]}
 function heatLayer(){var G=Lf.GridLayer.extend({createTile:function(co){var t=document.createElement("canvas"),sz=this.getTileSize();t.width=sz.x;t.height=sz.y;var cx=t.getContext("2d");if(!DATA)return t;
   var P=DATA.S.map(function(s,i){return{lat:s.lat,lng:s.lng,v:fv(i)}}).filter(function(q){return q.v!=null});if(!P.length)return t;
   var z=co.z,st=8,nw=co.multiplyBy(sz.x);
   for(var y=0;y<sz.y;y+=st)for(var x=0;x<sz.x;x+=st){var ll=map.unproject(Lf.point(nw.x+x+st/2,nw.y+y+st/2),z),sw=0,sv=0,dm=1e9;
    for(var j=0;j<P.length;j++){var dx=(ll.lng-P[j].lng)*Math.cos(ll.lat*Math.PI/180)*111,dy=(ll.lat-P[j].lat)*111,d2=dx*dx+dy*dy+25;if(d2<dm)dm=d2;var w=1/(d2*d2);sw+=w;sv+=w*P[j].v}
    var dist=Math.sqrt(dm),al=dist<45?1:Math.max(0,1-(dist-45)/75);if(al<=0)continue;var c=fcol(sv/sw);cx.fillStyle="rgba("+c[0]+","+c[1]+","+c[2]+","+(al*S.op).toFixed(2)+")";cx.fillRect(x,y,st,st)}
   return t}});return new G({opacity:1,pane:"overlayPane",zIndex:250})}
 function draw(){grp.clearLayers();if(heat){map.removeLayer(heat);heat=null}if(!DATA)return;var t=T[L];
  if(S.on&&S.mode!=="pts"){heat=heatLayer();heat.addTo(map)}

  DATA.S.forEach(function(s,i){var k=DATA.ni+S.off,pm=DATA.pm[i][k],a=DATA.aqi[i][k],v=val(i);if(v==null)return;
   var txt=(S.met==="pm"?f1(v,L):Math.round(v));
   var m=Lf.circleMarker([s.lat,s.lng],{radius:S.sz,color:"#fff",weight:1.2,fillColor:colour(i),fillOpacity:S.mode==="heat"?0:.85,opacity:S.mode==="heat"?0:1});
   m.bindTooltip(esc(s.n[L])+"<br>"+t.pm+": <b>"+(pm==null?"–":f1(pm,L))+"</b> µg/m³ · "+t.aqi+": <b>"+(a==null?"–":Math.round(a))+"</b>"+(pm==null?"":" · <b>"+f1(pm/5,L)+"</b> "+t.who+" (5)"),{sticky:true});
   if(S.lab)m.bindTooltip(String(txt),{permanent:true,direction:"center",className:"aqlab",opacity:1});
   m.addTo(grp)});
  cmp()}
 function cmp(){var c=el&&el.querySelector(".aqc");if(!c||!DATA)return;var t=T[L],h="";
  [0,1].forEach(function(i){var k=DATA.ni+S.off,pm=DATA.pm[i][k],a=DATA.aqi[i][k];h+="<div><b>"+esc(DATA.S[i].n[L])+"</b>: "+(pm==null?"–":f1(pm,L))+" µg/m³ · "+(a==null?"–":Math.round(a))+" AQI"+(pm==null?"":" · "+f1(pm/5,L)+t.who)+"</div>"});
  c.innerHTML="<small>"+t.cmp+"</small>"+h}
 function legend(){var t=T[L];if(S.col==="aqi")return AQC.slice(0,6).map(function(c,i){return"<span><i style='background:"+c[1]+"'></i>"+t.cat[i]+"</span>"}).join("");
  var lb=["≤1","1–2","2–4","4–7",">7"];return WC.map(function(c,i){return"<span><i style='background:"+c[1]+"'></i>"+lb[i]+t.who+"</span>"}).join("")}
 function tlabel(){var t=T[L];if(!DATA)return"";var k=DATA.ni+S.off;return S.off===0?t.now+" · "+fmtT(DATA.times[k],L):(S.off>0?"+":"")+S.off+" h · "+fmtT(DATA.times[k],L)}
 function ui(){var t=T[L],open=window.innerWidth>700?" open":"";
  el.innerHTML="<details"+open+"><summary>"+t.sum+"</summary><div class='aqb'>"+
  "<label><input type='checkbox' class='aqon'"+(S.on?" checked":"")+"> "+t.show+"</label>"+
  "<label>"+t.dm+" <select class='aqd'><option value='heat'"+(S.mode==="heat"?" selected":"")+">"+t.d1+"</option><option value='both'"+(S.mode==="both"?" selected":"")+">"+t.d2+"</option><option value='pts'"+(S.mode==="pts"?" selected":"")+">"+t.d3+"</option></select></label>"+
  "<label>"+t.ho+" <input type='range' class='aqo' min='20' max='90' step='5' value='"+Math.round(S.op*100)+"'></label>"+
  "<label>"+t.met+" <select class='aqm'><option value='pm'"+(S.met==="pm"?" selected":"")+">"+t.m1+"</option><option value='aqi'"+(S.met==="aqi"?" selected":"")+">"+t.m2+"</option></select></label>"+
  "<label>"+t.col+" <select class='aqcol'><option value='aqi'"+(S.col==="aqi"?" selected":"")+">"+t.c1+"</option><option value='w5'"+(S.col==="w5"?" selected":"")+">"+t.c2+"</option><option value='w24'"+(S.col==="w24"?" selected":"")+">"+t.c3+"</option></select></label>"+
  "<label>"+t.tm+": <b class='aqtl'>"+tlabel()+"</b><input type='range' class='aqt' min='-24' max='72' step='1' value='"+S.off+"'></label>"+
  "<label>"+t.sz+" <select class='aqs'><option value='8'"+(S.sz===8?" selected":"")+">"+t.s1+"</option><option value='12'"+(S.sz===12?" selected":"")+">"+t.s2+"</option><option value='17'"+(S.sz===17?" selected":"")+">"+t.s3+"</option></select></label>"+
  "<label><input type='checkbox' class='aql'"+(S.lab?" checked":"")+"> "+t.lab+"</label>"+
  "<div class='aqbt'>"+t.go+": <button type='button' data-z='vn'>"+t.vn+"</button><button type='button' data-z='hn'>Hà Nội</button><button type='button' data-z='hcm'>TP.HCM</button> <button type='button' class='aqrf'>"+t.rf+"</button></div>"+
  "<div class='aqc'></div><div class='aqleg' aria-label='"+t.leg+"'>"+legend()+"</div><div class='aqmsg' role='status'></div><small>"+t.hn+" "+t.note+" "+t.src+"</small></div></details>";
  wire();cmp()}
 function msg(k){var m=el&&el.querySelector(".aqmsg");if(m)m.textContent=k?T[L][k]:""}
 function go(){msg("load");load().then(function(){msg(null);var q=el.querySelector(".aqt");el.querySelector(".aqtl").textContent=tlabel();draw()}).catch(function(){msg("err")})}
 function wire(){var q=function(s){return el.querySelector(s)};
  q(".aqon").addEventListener("change",function(){S.on=this.checked;if(S.on){grp.addTo(map);go()}else{map.removeLayer(grp);if(heat){map.removeLayer(heat);heat=null}}});
  q(".aqd").addEventListener("change",function(){S.mode=this.value;draw()});
  q(".aqo").addEventListener("input",function(){S.op=this.value/100;draw()});
  q(".aqm").addEventListener("change",function(){S.met=this.value;draw()});
  q(".aqcol").addEventListener("change",function(){S.col=this.value;el.querySelector(".aqleg").innerHTML=legend();draw()});
  q(".aqt").addEventListener("input",function(){S.off=+this.value;q(".aqtl").textContent=tlabel();draw()});
  q(".aqs").addEventListener("change",function(){S.sz=+this.value;draw()});
  q(".aql").addEventListener("change",function(){S.lab=this.checked;draw()});
  q(".aqrf").addEventListener("click",function(){if(!S.on){S.on=true;q(".aqon").checked=true;grp.addTo(map)}msg("load");load(true).then(function(){msg(null);q(".aqtl").textContent=tlabel();draw()}).catch(function(){msg("err")})});
  el.querySelectorAll("[data-z]").forEach(function(b){b.addEventListener("click",function(){var z=b.getAttribute("data-z");if(z==="vn")map.fitBounds([[8.3,102.0],[23.5,109.6]]);else if(z==="hn")map.setView([21.0285,105.8542],10);else map.setView([10.7769,106.7009],10);
   if(!S.on){S.on=true;q(".aqon").checked=true;grp.addTo(map);go()}})})}
 ctl.addTo(map);
 var lb=document.getElementById("lang");if(lb)lb.addEventListener("click",function(){setTimeout(function(){L=lang();if(el){var o=el.querySelector("details").open;ui();el.querySelector("details").open=o;if(DATA)draw()}},80)});
 return{layer:grp,state:S}}
window.AQ={attach:attach};
})();
