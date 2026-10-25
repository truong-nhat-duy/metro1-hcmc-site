"use strict";
window.Geo=(function(){
var Lf=window.L,G=window.GEO||{},L="en";
var TX={en:{b1:"Light map",b2:"Street map",b3:"Satellite",dist:"District boundaries",ward:"Ward boundaries",lines:"Metro alignments",
 lg:"Legend",lgm:"Metro",op:"Operating",uc:"Under construction",pl:"Planned (partial, from OpenStreetMap)",stn:"Station",ix:"Interchange",
 lgh:"Housing type",n:"House",d:"Land",c:"Apartment",lgp:"Asking price (mn VND/m²)",lgb:"Boundaries",bd:"District",bw:"Ward",
 note:"Boundaries: pre-2025 districts and wards (GADM 4.1). Alignments: OpenStreetMap.",l1:"Line 1",l2:"Line 2",hl2a:"Line 2A",hl3:"Line 3"},
 vi:{b1:"Bản đồ sáng",b2:"Bản đồ đường phố",b3:"Ảnh vệ tinh",dist:"Ranh giới quận/huyện",ward:"Ranh giới phường/xã",lines:"Tuyến metro",
 lg:"Chú giải",lgm:"Metro",op:"Đang vận hành",uc:"Đang xây dựng",pl:"Quy hoạch (một phần, từ OpenStreetMap)",stn:"Ga",ix:"Ga chuyển tuyến",
 lgh:"Loại hình",n:"Nhà riêng",d:"Đất",c:"Căn hộ",lgp:"Giá rao (triệu đồng/m²)",lgb:"Ranh giới",bd:"Quận/huyện",bw:"Phường/xã",
 note:"Ranh giới: quận, phường trước 2025 (GADM 4.1). Tuyến: OpenStreetMap.",l1:"Tuyến 1",l2:"Tuyến 2",hl2a:"Tuyến 2A",hl3:"Tuyến 3"}};
var LC={hcm:{op:"#0079b8",uc:"#dc2626",pl:"#7c8795"},hn:{op:"#c2410c",uc:"#c2410c",pl:"#7c8795"}};
function ramp(p){var t=(Math.log(Math.min(Math.max(p,20),400))-Math.log(20))/(Math.log(400)-Math.log(20)),a=[59,130,246],b=[250,204,21],c=[239,68,68],u=t<.5?[a,b,t*2]:[b,c,(t-.5)*2];
 return "rgb("+[0,1,2].map(function(i){return Math.round(u[0][i]+(u[1][i]-u[0][i])*u[2])}).join(",")+")"}
// ---- canvas layer with one symbol per housing type
var TypeLayer=Lf.Layer.extend({
 initialize:function(pts,opt){this._p=pts;this._o=opt||{};this._v=[]},
 onAdd:function(map){this._map=map;var c=this._c=Lf.DomUtil.create("canvas","leaflet-zoom-hide");c.style.cssText="position:absolute;pointer-events:none";map.getPane("overlayPane").appendChild(c);
  map.on("moveend zoomend resize viewreset",this.redraw,this);map.on("mousemove",this._hover,this);this.redraw()},
 onRemove:function(map){map.off("moveend zoomend resize viewreset",this.redraw,this);map.off("mousemove",this._hover,this);Lf.DomUtil.remove(this._c);if(this._tt)map.closeTooltip(this._tt)},
 redraw:function(){var m=this._map;if(!m||!this._c)return;var s=m.getSize(),c=this._c,dpr=window.devicePixelRatio||1;c.width=s.x*dpr;c.height=s.y*dpr;c.style.width=s.x+"px";c.style.height=s.y+"px";
  Lf.DomUtil.setPosition(c,m.containerPointToLayerPoint([0,0]));var x=c.getContext("2d");x.scale(dpr,dpr);var z=m.getZoom(),r=z>=15?7:z>=13?5.5:4,f=this._o.filter||function(){return true},b=m.getBounds().pad(.05);this._v=[];
  var order={n:0,d:1,c:2};var list=this._p.filter(function(p){return f(p)&&b.contains([p[0],p[1]])}).sort(function(a,b){return order[a[3]]-order[b[3]]});
  for(var i=0;i<list.length;i++){var p=list[i],q=m.latLngToContainerPoint([p[0],p[1]]);this._v.push([q.x,q.y,p]);x.beginPath();
   if(p[3]==="n"){x.arc(q.x,q.y,r*.85,0,6.2832)}else if(p[3]==="d"){x.moveTo(q.x,q.y-r*1.15);x.lineTo(q.x+r*1.15,q.y);x.lineTo(q.x,q.y+r*1.15);x.lineTo(q.x-r*1.15,q.y);x.closePath()}
   else{x.moveTo(q.x,q.y-r*1.2);x.lineTo(q.x+r*1.1,q.y+r*.9);x.lineTo(q.x-r*1.1,q.y+r*.9);x.closePath()}
   x.fillStyle=ramp(p[2]);x.globalAlpha=.88;x.fill();x.globalAlpha=1;x.lineWidth=.9;x.strokeStyle="rgba(255,255,255,.9)";x.stroke()}},
 _hover:function(e){var best=null,bd=100;for(var i=0;i<this._v.length;i++){var v=this._v[i],dx=v[0]-e.containerPoint.x,dy=v[1]-e.containerPoint.y,d=dx*dx+dy*dy;if(d<bd){bd=d;best=v}}
  var m=this._map;if(!best){if(this._tt){m.closeTooltip(this._tt);this._tt=null}this._map._container.style.cursor="";return}
  m._container.style.cursor="pointer";var p=best[2],t=TX[L],nm={n:t.n,d:t.d,c:t.c}[p[3]];
  var html="<b>"+nm+"</b> · "+p[2].toFixed(1)+" "+(L==="vi"?"tr/m²":"mn/m²")+"<br>"+Math.round(p[4]).toLocaleString(L==="vi"?"vi-VN":"en-US")+" m";
  if(!this._tt)this._tt=Lf.tooltip({direction:"top",offset:[0,-6],className:"ptt"});this._tt.setLatLng([p[0],p[1]]).setContent(html);m.openTooltip(this._tt)}
});
function labelIcon(name,cls){return Lf.divIcon({className:"lbl "+cls,html:"<span>"+name+"</span>",iconSize:[0,0]})}
function boundary(set,kind,color,w,fillop){var fg=Lf.featureGroup();set.forEach(function(f){Lf.geoJSON({type:"Feature",geometry:f.g},{style:{color:color,weight:w,opacity:.85,fillColor:color,fillOpacity:fillop,dashArray:kind==="w"?"3 3":null},interactive:false}).addTo(fg);
  Lf.marker(f.c,{icon:labelIcon(f.n,kind),interactive:false,keyboard:false}).addTo(fg)});return fg}
function alignments(city){var fg=Lf.featureGroup(),C=LC[city],d=(G[city]&&G[city].lines)||[];
 ["pl","uc","op"].forEach(function(s){d.filter(function(x){return x.st===s}).forEach(function(x){
  if(s==="op")Lf.polyline(x.ls,{color:"#fff",weight:8,opacity:.95,interactive:false}).addTo(fg);
  Lf.polyline(x.ls,{color:C[s],weight:s==="op"?5:s==="uc"?4:2.5,opacity:s==="pl"?.8:1,dashArray:s==="op"?null:s==="uc"?"9 6":"2 6",lineCap:"round",interactive:false}).addTo(fg)})});return fg}
function init(map,city,opt){opt=opt||{};var o={},ctl=null,lgc=null;
 var base={},osm="© OpenStreetMap contributors";
 var l1=Lf.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",{maxZoom:19,subdomains:"abcd",attribution:osm+" © CARTO"});
 var l2=Lf.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:osm});
 var l3=Lf.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:19,attribution:"Imagery © Esri, Maxar, Earthstar Geographics"});
 l1.addTo(map);
 var dist=boundary(G[city].dist,"d","#334155",1.6,.02).addTo(map),ward=boundary(G[city].ward,"w","#64748b",.8,0),lines=alignments(city).addTo(map);
 var ZL=function(){var z=map.getZoom(),c=map.getContainer().classList;c.toggle("zl-d",z>=10&&z<=14);c.toggle("zl-w",z>=14);c.toggle("zl-s",z>=13)};map.on("zoomend",ZL);ZL();
 o.dist=dist;o.ward=ward;o.lines=lines;
 function controls(){if(ctl)map.removeControl(ctl);if(lgc)map.removeControl(lgc);var t=TX[L],b={},ov={};b[t.b1]=l1;b[t.b2]=l2;b[t.b3]=l3;ov[t.dist]=dist;ov[t.ward]=ward;ov[t.lines]=lines;
  ctl=Lf.control.layers(b,ov,{collapsed:true,position:"topright"}).addTo(map);
  lgc=Lf.control({position:"bottomleft"});lgc.onAdd=function(){var d=Lf.DomUtil.create("details","maplg");d.open=window.innerWidth>700;Lf.DomEvent.disableClickPropagation(d);
   var C=LC[city],h="<summary>"+t.lg+"</summary><div class='lgb'>";
   var line=function(c,dash,w){return "<svg width='34' height='10'><line x1='1' y1='5' x2='33' y2='5' stroke='"+c+"' stroke-width='"+w+"' "+(dash?"stroke-dasharray='"+dash+"'":"")+" stroke-linecap='round'/></svg>"};
   h+="<b>"+t.lgm+"</b><div>"+line(C.op,"",5)+t.op+"</div><div>"+line(C.uc,"6 4",4)+t.uc+"</div><div>"+line(C.pl,"2 4",2.5)+t.pl+"</div><div><svg width='34' height='14'><circle cx='17' cy='7' r='5' fill='#fff' stroke='"+C.op+"' stroke-width='2.5'/></svg>"+t.stn+"</div>";
   if(opt.types){h+="<b>"+t.lgh+"</b><div><svg width='34' height='14'><circle cx='17' cy='7' r='5' fill='#94a3b8' stroke='#fff'/></svg>"+t.n+"</div><div><svg width='34' height='14'><path d='M17 1L23 7L17 13L11 7Z' fill='#94a3b8' stroke='#fff'/></svg>"+t.d+"</div><div><svg width='34' height='14'><path d='M17 1L23.5 12.5L10.5 12.5Z' fill='#94a3b8' stroke='#fff'/></svg>"+t.c+"</div>";
    h+="<b>"+t.lgp+"</b><div class='ramp'><i></i></div><div class='rl'><span>20</span><span>100</span><span>400+</span></div>"}
   h+="<b>"+t.lgb+"</b><div><svg width='34' height='10'><line x1='1' y1='5' x2='33' y2='5' stroke='#334155' stroke-width='1.8'/></svg>"+t.bd+"</div><div><svg width='34' height='10'><line x1='1' y1='5' x2='33' y2='5' stroke='#64748b' stroke-width='1' stroke-dasharray='3 3'/></svg>"+t.bw+"</div><small>"+t.note+"</small></div>";
   d.innerHTML=h;return d};lgc.addTo(map)}
 o.setLang=function(l){L=l;controls()};controls();
 o.station=function(s,cfg){cfg=cfg||{};var c=cfg.color||LC[city].op,m=Lf.circleMarker([s.lat,s.lng],{radius:cfg.ix?8:6,color:c,weight:3,fillColor:"#fff",fillOpacity:1});
  if(cfg.label){m.bindTooltip(cfg.label,{permanent:true,direction:"right",offset:[8,0],className:"stl"})}return m};
 return o}
return {init:init,TypeLayer:TypeLayer,ramp:ramp,setLang:function(l){L=l},TX:TX}
})();
