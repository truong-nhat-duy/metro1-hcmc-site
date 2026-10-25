"use strict";
window.Geo=(function(){
var Lf=window.L,G=window.GEO||{},L="en",REG=[];
var TX={en:{b1:"Light map",b2:"Street map",b3:"Satellite",b4:"Dark map",dist:"District boundaries",ward:"Ward boundaries",lines:"Metro alignments",
 lg:"Legend",lgm:"Metro",op:"Operating",uc:"Under construction",pl:"Planned (partial, OpenStreetMap)",stn:"Station",
 lgh:"Housing type",n:"House",d:"Land",c:"Apartment",lgp:"Asking price (mn VND/m²)",lgb:"Boundaries",bd:"District",bw:"Ward",lga:"Amenities (OSM)",lgr:"Distance rings",
 note:"Boundaries: pre-2025 districts and wards (GADM 4.1). Alignments: OpenStreetMap. Symbols: circle = house, diamond = land, triangle = apartment.",
 am:["Schools and universities","Hospitals and clinics","Parks","Shopping (mall, supermarket, market)","Bus stops"],amen:"Amenities",mlu:"Land-use mix (500 m cells)",bands:"Distance rings",
 mv:["Land-use mix, area-based (entropy 0–1)","Land-use mix, POI-based (entropy 0–1)","Built-up share (WorldCover 2021)","Green share (WorldCover 2021)","Amenities within 500 m (count)"],
 rn:{r1:"≤500 m",r2:"500–800 m",r3:"800–1,200 m",r4:"1,200–2,000 m",ref:">2,000 m"},
 pk_price:"Asking price",pk_unit:"mn VND/m²",pk_type:"Type",pk_dist:"Distance to nearest station",pk_stn:"Nearest station",pk_ring:"Distance ring",pk_e0:"Ring premium (hedonic E0)",pk_area:"Location",pk_vs:"Versus median of same ring",pk_near:"Listings within 500 m",pk_pct:"Price percentile in city sample",pk_note:"Asking price, not transaction price.",pk_none:"no estimate",pk_med:"median",
 tb_type:"Type",t_all:"All",tb_pmax:"Price up to",tb_view:"In view",tb_n:"listings",tb_med:"median",tb_reset:"Reset view",tb_tog:"Show",tb_list:"Listings",tb_band:"Distance rings",tb_amen:"Amenities",tb_mlu:"Land-use mix"},
 vi:{b1:"Bản đồ sáng",b2:"Bản đồ đường phố",b3:"Ảnh vệ tinh",b4:"Bản đồ tối",dist:"Ranh giới quận/huyện",ward:"Ranh giới phường/xã",lines:"Tuyến metro",
 lg:"Chú giải",lgm:"Metro",op:"Đang vận hành",uc:"Đang xây dựng",pl:"Quy hoạch (một phần, OpenStreetMap)",stn:"Ga",
 lgh:"Loại hình",n:"Nhà riêng",d:"Đất",c:"Căn hộ",lgp:"Giá rao (triệu đồng/m²)",lgb:"Ranh giới",bd:"Quận/huyện",bw:"Phường/xã",lga:"Tiện ích (OSM)",lgr:"Vành khoảng cách",
 note:"Ranh giới: quận, phường trước 2025 (GADM 4.1). Tuyến: OpenStreetMap. Ký hiệu: tròn = nhà, thoi = đất, tam giác = căn hộ.",
 am:["Trường học và đại học","Bệnh viện và phòng khám","Công viên","Mua sắm (TTTM, siêu thị, chợ)","Trạm xe buýt"],amen:"Tiện ích",mlu:"Sử dụng đất hỗn hợp (ô 500 m)",bands:"Vành khoảng cách",
 mv:["Hỗn hợp sử dụng đất, theo diện tích (entropy 0–1)","Hỗn hợp sử dụng đất, theo POI (entropy 0–1)","Tỷ lệ xây dựng (WorldCover 2021)","Tỷ lệ cây xanh (WorldCover 2021)","Số tiện ích trong 500 m"],
 rn:{r1:"≤500 m",r2:"500–800 m",r3:"800–1.200 m",r4:"1.200–2.000 m",ref:">2.000 m"},
 pk_price:"Giá rao",pk_unit:"triệu đồng/m²",pk_type:"Loại hình",pk_dist:"Khoảng cách tới ga gần nhất",pk_stn:"Ga gần nhất",pk_ring:"Vành khoảng cách",pk_e0:"Chênh lệch theo vành (hedonic E0)",pk_area:"Vị trí",pk_vs:"So với trung vị cùng vành",pk_near:"Tin trong bán kính 500 m",pk_pct:"Phân vị giá trong mẫu thành phố",pk_note:"Giá rao, không phải giá giao dịch.",pk_none:"không có ước lượng",pk_med:"trung vị",
 tb_type:"Loại hình",t_all:"Tất cả",tb_pmax:"Giá tối đa",tb_view:"Trong khung nhìn",tb_n:"tin",tb_med:"trung vị",tb_reset:"Đặt lại khung nhìn",tb_tog:"Hiển thị",tb_list:"Tin đăng",tb_band:"Vành khoảng cách",tb_amen:"Tiện ích",tb_mlu:"Sử dụng đất hỗn hợp"}};
TX.en.dist="District boundaries (before 1 Jul 2025)";TX.en.ward="Ward boundaries (before 1 Jul 2025)";TX.en.cur="Current provincial boundary (from 1 Jul 2025)";TX.en.curW="Current wards and communes (HCMC, 2025)";TX.en.cat="800 m catchment of every station";TX.en.cor="Named metro corridors (approximate)";TX.en.lgcur="Current boundary";TX.en.lgcat="800 m catchment";
TX.vi.dist="Ranh giới quận/huyện (trước 1/7/2025)";TX.vi.ward="Ranh giới phường/xã (trước 1/7/2025)";TX.vi.cur="Ranh giới tỉnh/thành hiện hành (từ 1/7/2025)";TX.vi.curW="Phường, xã hiện hành (TP.HCM, 2025)";TX.vi.cat="Vùng 800 m quanh mọi ga";TX.vi.cor="Hành lang metro có tên (xấp xỉ)";TX.vi.lgcur="Ranh giới hiện hành";TX.vi.lgcat="Vùng 800 m";
var LC={hcm:{op:"#0079b8",uc:"#dc2626",pl:"#7c8795"},hn:{op:"#c2410c",uc:"#c2410c",pl:"#7c8795"}};
var AC=["#7c3aed","#e11d48","#16a34a","#d97706","#475569"],AE=["🎓","✚","🌳","🛍","🚌"];
var RING_R=[500,800,1200,2000],RING_C={r1:"#0b5ea8",r2:"#2e86c1",r3:"#6fb4e0",r4:"#b5d8f0"};
function nf(x,k){var s=(+x).toFixed(k==null?1:k);return L==="vi"?s.replace(".",","):s}
function fi(x){return Math.round(x).toLocaleString(L==="vi"?"vi-VN":"en-US")}
function ramp(p){var t=(Math.log(Math.min(Math.max(p,20),400))-Math.log(20))/(Math.log(400)-Math.log(20)),a=[59,130,246],b=[250,204,21],c=[239,68,68],u=t<.5?[a,b,t*2]:[b,c,(t-.5)*2];
 return "rgb("+[0,1,2].map(function(i){return Math.round(u[0][i]+(u[1][i]-u[0][i])*u[2])}).join(",")+")"}
var VIR=[[68,1,84],[59,82,139],[33,145,140],[94,201,98],[253,231,37]];
function vir(t){t=Math.min(Math.max(t,0),1)*4;var i=Math.min(3,Math.floor(t)),f=t-i,a=VIR[i],b=VIR[i+1];return "rgb("+[0,1,2].map(function(k){return Math.round(a[k]+(b[k]-a[k])*f)}).join(",")+")"}
function hav(a,b,c,d){var R=6371000,r=Math.PI/180,x=(c-a)*r,y=(d-b)*r,h=Math.sin(x/2)*Math.sin(x/2)+Math.cos(a*r)*Math.cos(c*r)*Math.sin(y/2)*Math.sin(y/2);return 2*R*Math.asin(Math.sqrt(h))}
function med(a){if(!a.length)return NaN;a=a.slice().sort(function(x,y){return x-y});var m=a.length>>1;return a.length%2?a[m]:(a[m-1]+a[m])/2}
function pane(m,n,z){var p=m.getPane(n)||m.createPane(n);p.style.zIndex=z;p.style.pointerEvents="none";return p}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
// ---------- data access
function stationsOf(city){if(city==="hcm")return(window.DATA&&window.DATA.stations||[]).map(function(s){return{lat:s.lat,lng:s.lng,n:L==="vi"?s.vi:s.en}});
 return(window.NET&&window.NET.hnStations||[]).map(function(s){return{lat:s.lat,lng:s.lng,n:s.n+(s.line?" ("+(s.line==="2A"?"2A":"3")+")":"")}})}
function pointsOf(city){return city==="hcm"?(window.DATA&&window.DATA.points||[]):(window.NET&&window.NET.hnPts||[])}
var SORTED={};function pct(city,v){var k=city,a=SORTED[k];if(!a){a=SORTED[k]=pointsOf(city).map(function(p){return p[2]}).sort(function(x,y){return x-y})}
 var lo=0,hi=a.length;while(lo<hi){var m=(lo+hi)>>1;if(a[m]<v)lo=m+1;else hi=m}return 100*lo/a.length}
function inRing(g,lat,lng){var x=lng,y=lat,ins=false;for(var i=0,j=g.length-1;i<g.length;j=i++){var xi=g[i][0],yi=g[i][1],xj=g[j][0],yj=g[j][1];if(((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi))ins=!ins}return ins}
function inGeom(g,lat,lng){var polys=g.type==="Polygon"?[g.coordinates]:g.type==="MultiPolygon"?g.coordinates:[];
 for(var i=0;i<polys.length;i++){var p=polys[i];if(inRing(p[0],lat,lng)){var hole=false;for(var k=1;k<p.length;k++)if(inRing(p[k],lat,lng)){hole=true;break}if(!hole)return true}}return false}
function locate(city,lat,lng){var r={},d=(G[city]||{});["dist","ward"].forEach(function(k){var a=d[k]||[];for(var i=0;i<a.length;i++){if(a[i].g&&inGeom(a[i].g,lat,lng)){r[k]=a[i].n;break}}});return r}
function ringOf(d){return d<=500?"r1":d<=800?"r2":d<=1200?"r3":d<=2000?"r4":"ref"}
var RMED={};function ringMed(city,r){var k=city+r;if(RMED[k]==null){RMED[k]=med(pointsOf(city).filter(function(p){return p[5]===r}).map(function(p){return p[2]}))}return RMED[k]}
function popupHTML(city,p){var t=TX[L],ss=stationsOf(city),best=null,bd=1e12;ss.forEach(function(s){var d=hav(p[0],p[1],s.lat,s.lng);if(d<bd){bd=d;best=s}});
 var r=p[5]||ringOf(bd),nm={n:t.n,d:t.d,c:t.c}[p[3]],ar=locate(city,p[0],p[1]),pts=pointsOf(city),near=[];
 for(var i=0;i<pts.length;i++){if(Math.abs(pts[i][0]-p[0])<.0046&&Math.abs(pts[i][1]-p[1])<.0050&&hav(p[0],p[1],pts[i][0],pts[i][1])<=500)near.push(pts[i][2])}
 var c=window.DATA&&window.DATA.coefs&&window.DATA.coefs[city]&&window.DATA.coefs[city].E0,cf=c&&c.rings.filter(function(x){return x.t===r})[0];
 var rm=ringMed(city,r),vs=isFinite(rm)&&rm>0?100*(p[2]/rm-1):null;
 var h="<div class='pk'><div class='pk-h'><span class='pk-s pk-"+p[3]+"'></span><div><small>"+nm+"</small><b>"+nf(p[2],1)+" <i>"+t.pk_unit+"</i></b></div></div><table>";
 h+="<tr><th>"+t.pk_stn+"</th><td>"+esc(best?best.n:"–")+"</td></tr>";
 h+="<tr><th>"+t.pk_dist+"</th><td>"+fi(p[4])+" m</td></tr>";
 h+="<tr><th>"+t.pk_ring+"</th><td><span class='pk-dot' style='background:"+(RING_C[r]||"#94a3b8")+"'></span>"+t.rn[r]+"</td></tr>";
 if(cf)h+="<tr><th>"+t.pk_e0+"</th><td>"+(cf.est>=0?"+":"")+nf(cf.est,3)+" <small>["+nf(cf.lo,3)+", "+nf(cf.hi,3)+"]</small></td></tr>";
 if(vs!=null)h+="<tr><th>"+t.pk_vs+"</th><td>"+(vs>=0?"+":"")+nf(vs,0)+"% <small>("+t.pk_med+" "+nf(rm,1)+")</small></td></tr>";
 h+="<tr><th>"+t.pk_pct+"</th><td>"+nf(pct(city,p[2]),0)+"%</td></tr>";
 h+="<tr><th>"+t.pk_near+"</th><td>"+fi(near.length)+(near.length>2?" <small>("+t.pk_med+" "+nf(med(near),1)+")</small>":"")+"</td></tr>";
 if(ar.dist||ar.ward)h+="<tr><th>"+t.pk_area+"</th><td>"+esc([ar.ward,ar.dist].filter(Boolean).join(", "))+"</td></tr>";
 return h+"</table><p>"+t.pk_note+"</p></div>"}
// ---------- housing-type canvas layer
var TypeLayer=Lf.Layer.extend({
 initialize:function(pts,opt){this._p=pts;this._o=opt||{};this._v=[];this._sel=null},
 onAdd:function(map){this._map=map;var c=this._c=Lf.DomUtil.create("canvas","leaflet-zoom-hide");c.style.cssText="position:absolute;pointer-events:none";pane(map,"pts",390).appendChild(c);
  map.on("moveend zoomend resize viewreset",this.redraw,this);map.on("mousemove",this._hover,this);map.on("click",this._click,this);this.redraw()},
 onRemove:function(map){map.off("moveend zoomend resize viewreset",this.redraw,this);map.off("mousemove",this._hover,this);map.off("click",this._click,this);Lf.DomUtil.remove(this._c);if(this._tt)map.closeTooltip(this._tt);this._v=[]},
 redraw:function(){var m=this._map;if(!m||!this._c)return;var s=m.getSize(),c=this._c,dpr=window.devicePixelRatio||1;c.width=s.x*dpr;c.height=s.y*dpr;c.style.width=s.x+"px";c.style.height=s.y+"px";
  Lf.DomUtil.setPosition(c,m.containerPointToLayerPoint([0,0]));var x=c.getContext("2d");x.scale(dpr,dpr);var z=m.getZoom(),r=z>=16?8:z>=15?7:z>=13?5.5:4,f=this._o.filter||function(){return true},b=m.getBounds().pad(.05);this._v=[];
  var order={n:0,d:1,c:2},inb=this._p.filter(function(p){return b.contains([p[0],p[1]])}),list=inb.filter(f).sort(function(a,b){return order[a[3]]-order[b[3]]});
  var lab=z>=16&&list.length<=260;
  for(var i=0;i<list.length;i++){var p=list[i],q=m.latLngToContainerPoint([p[0],p[1]]);this._v.push([q.x,q.y,p]);x.beginPath();
   if(p[3]==="n"){x.arc(q.x,q.y,r*.85,0,6.2832)}else if(p[3]==="d"){x.moveTo(q.x,q.y-r*1.15);x.lineTo(q.x+r*1.15,q.y);x.lineTo(q.x,q.y+r*1.15);x.lineTo(q.x-r*1.15,q.y);x.closePath()}
   else{x.moveTo(q.x,q.y-r*1.2);x.lineTo(q.x+r*1.1,q.y+r*.9);x.lineTo(q.x-r*1.1,q.y+r*.9);x.closePath()}
   x.fillStyle=ramp(p[2]);x.globalAlpha=.9;x.fill();x.globalAlpha=1;x.lineWidth=p===this._sel?2.4:.9;x.strokeStyle=p===this._sel?"#0f172a":"rgba(255,255,255,.92)";x.stroke()}
  if(lab){x.font="600 11px Inter,system-ui,sans-serif";x.textAlign="center";x.textBaseline="middle";for(var j=0;j<this._v.length;j++){var v=this._v[j],tx=String(Math.round(v[2][2])),w=x.measureText(tx).width+10;
    x.fillStyle="rgba(15,23,42,.88)";x.beginPath();if(x.roundRect)x.roundRect(v[0]-w/2,v[1]-r-17,w,15,7);else x.rect(v[0]-w/2,v[1]-r-17,w,15);x.fill();x.fillStyle="#fff";x.fillText(tx,v[0],v[1]-r-9.5)}}
  if(this._o.onView){var self=this;clearTimeout(this._to);this._to=setTimeout(function(){self._o.onView(inb.filter(f))},60)}},
 _near:function(cp,maxd){var best=null,bd=maxd||100;for(var i=0;i<this._v.length;i++){var v=this._v[i],dx=v[0]-cp.x,dy=v[1]-cp.y,d=dx*dx+dy*dy;if(d<bd){bd=d;best=v}}return best},
 hit:function(cp){return !!this._near(cp,196)},
 _hover:function(e){var best=this._near(e.containerPoint,100),m=this._map;if(!best){if(this._tt){m.closeTooltip(this._tt);this._tt=null}m._container.style.cursor="";return}
  m._container.style.cursor="pointer";var p=best[2],t=TX[L],nm={n:t.n,d:t.d,c:t.c}[p[3]];
  var html="<b>"+nm+"</b> · "+nf(p[2],1)+" "+t.pk_unit.replace("triệu đồng","tr").replace("mn VND","mn")+"<br>"+fi(p[4])+" m";
  if(!this._tt)this._tt=Lf.tooltip({direction:"top",offset:[0,-8],className:"ptt"});this._tt.setLatLng([p[0],p[1]]).setContent(html);m.openTooltip(this._tt)},
 _click:function(e){var best=this._near(e.containerPoint,196);if(!best)return;var p=best[2],m=this._map;this._sel=p;this.redraw();
  var city=this._o.city||"hcm";Lf.popup({maxWidth:300,className:"pkp",autoPanPadding:[20,20]}).setLatLng([p[0],p[1]]).setContent(popupHTML(city,p)).openOn(m);
  var self=this;m.once("popupclose",function(){self._sel=null;self.redraw()})}
});
// ---------- amenity canvas layer
var AmenLayer=Lf.Layer.extend({
 initialize:function(){this._cats={0:true,1:true,2:true,3:true,4:false};this._v=[]},
 setCats:function(o){this._cats=o;this.redraw()},
 onAdd:function(map){this._map=map;var c=this._c=Lf.DomUtil.create("canvas","leaflet-zoom-hide");c.style.cssText="position:absolute;pointer-events:none";pane(map,"amn",395).appendChild(c);
  map.on("moveend zoomend resize viewreset",this.redraw,this);map.on("mousemove",this._hover,this);this.redraw()},
 onRemove:function(map){map.off("moveend zoomend resize viewreset",this.redraw,this);map.off("mousemove",this._hover,this);Lf.DomUtil.remove(this._c);if(this._tt)map.closeTooltip(this._tt);this._v=[]},
 redraw:function(){var m=this._map,A=window.AMEN;if(!m||!this._c||!A)return;var s=m.getSize(),c=this._c,dpr=window.devicePixelRatio||1;c.width=s.x*dpr;c.height=s.y*dpr;c.style.width=s.x+"px";c.style.height=s.y+"px";
  Lf.DomUtil.setPosition(c,m.containerPointToLayerPoint([0,0]));var x=c.getContext("2d");x.scale(dpr,dpr);var z=m.getZoom(),r=z>=16?9:z>=15?7:z>=13?4.5:3.2,b=m.getBounds().pad(.05);this._v=[];
  x.font=(r*1.15)+"px 'Apple Color Emoji','Segoe UI Emoji',sans-serif";x.textAlign="center";x.textBaseline="middle";
  for(var i=0;i<A.pts.length;i++){var p=A.pts[i];if(!this._cats[p[2]]||!b.contains([p[0],p[1]]))continue;var q=m.latLngToContainerPoint([p[0],p[1]]);this._v.push([q.x,q.y,p]);
   x.beginPath();x.arc(q.x,q.y,r,0,6.2832);x.fillStyle=AC[p[2]];x.globalAlpha=.92;x.fill();x.globalAlpha=1;x.lineWidth=1.2;x.strokeStyle="#fff";x.stroke();if(z>=15){x.fillStyle="#fff";x.fillText(AE[p[2]],q.x,q.y+.5)}}},
 _hover:function(e){var best=null,bd=100;for(var i=0;i<this._v.length;i++){var v=this._v[i],dx=v[0]-e.containerPoint.x,dy=v[1]-e.containerPoint.y,d=dx*dx+dy*dy;if(d<bd){bd=d;best=v}}
  var m=this._map;if(!best){if(this._tt){m.closeTooltip(this._tt);this._tt=null}return}var p=best[2],t=TX[L],A=window.AMEN,sub=A.sub[p[2]][p[3]||0];
  var html="<b>"+esc(p[4]||t.am[p[2]])+"</b><br><small>"+t.am[p[2]].split(" (")[0]+" · "+sub+"</small>";
  if(!this._tt)this._tt=Lf.tooltip({direction:"top",offset:[0,-8],className:"ptt"});this._tt.setLatLng([p[0],p[1]]).setContent(html);m.openTooltip(this._tt)}
});
// ---------- land-use-mix cells
var MV=[{i:2,max:1},{i:3,max:1},{i:4,max:1},{i:5,max:1},{i:6,max:150,sq:true}];
function mluGroup(){var A=window.AMEN,g=Lf.layerGroup(),rend=Lf.canvas({padding:.3}),rects=[];if(!A)return{layer:g,set:function(){},repaint:function(){},cur:function(){return 0}};
 A.mlu.forEach(function(c){var dl=250/111320,dn=250/(111320*Math.cos(c[0]*Math.PI/180)),r=Lf.rectangle([[c[0]-dl,c[1]-dn],[c[0]+dl,c[1]+dn]],{renderer:rend,weight:0,fillOpacity:.7,color:"#000"});r._c=c;rects.push(r);g.addLayer(r)});
 var cur=0;function val(c,k){var v=c[MV[k].i];if(v==null)return null;var q=v/MV[k].max;q=MV[k].sq?Math.sqrt(Math.min(q,1)):Math.min(q,1);return q}
 function paint(){rects.forEach(function(r){var q=val(r._c,cur);if(q==null)r.setStyle({fillOpacity:0});else r.setStyle({fillColor:vir(q),fillOpacity:.72});
  var t=TX[L],c=r._c;r.unbindTooltip();if(q!=null)r.bindTooltip("<b>"+t.mv[cur]+"</b><br>"+(cur===4?fi(c[6]):nf(c[MV[cur].i],2))+"<br><small>"+fi(c[7])+" m "+(L==="vi"?"tới ga gần nhất":"to nearest station")+"</small>",{sticky:true,className:"ptt"})})}
 paint();return{layer:g,set:function(k){cur=k;paint()},repaint:paint,cur:function(){return cur}}}
// ---------- bands
function bpane(map,k,op){var n="bnd"+k,p=pane(map,n,{r4:380,r3:381,r2:382,r1:383}[k]);p.style.opacity=op;return n}
function bands(stations,cfg){cfg=cfg||{};var g=Lf.layerGroup(),keys=["r4","r3","r2","r1"],rad={r1:500,r2:800,r3:1200,r4:2000},zi={r4:380,r3:381,r2:382,r1:383},cols=cfg.colors||RING_C;
 keys.forEach(function(k){stations.forEach(function(s){var c=Lf.circle([s.lat,s.lng],{pane:(cfg.map?bpane(cfg.map,k,cfg.opacity||.22):"overlayPane"),radius:rad[k],stroke:false,fillColor:(typeof cols==="function"?cols(k):cols[k]),fillOpacity:1,interactive:!!cfg.onClick});
  if(cfg.onClick)c.on("click",function(e){cfg.onClick(k,e)});g.addLayer(c)})});return g}
function labelIcon(name,cls){return Lf.divIcon({className:"lbl "+cls,html:"<span>"+esc(name)+"</span>",iconSize:[0,0]})}
function boundary(set,kind,color,w,fillop){var fg=Lf.featureGroup();set.forEach(function(f){Lf.geoJSON({type:"Feature",geometry:f.g},{style:{color:color,weight:w,opacity:.85,fillColor:color,fillOpacity:fillop,dashArray:kind==="w"?"3 3":null},interactive:false}).addTo(fg);
  Lf.marker(f.c,{icon:labelIcon(f.n,kind),interactive:false,keyboard:false}).addTo(fg)});return fg}
function alignments(city){var fg=Lf.featureGroup(),C=LC[city],d=(G[city]&&G[city].lines)||[];
 ["pl","uc","op"].forEach(function(s){d.filter(function(x){return x.st===s}).forEach(function(x){
  if(s==="op")Lf.polyline(x.ls,{color:"#fff",weight:8,opacity:.95,interactive:false}).addTo(fg);
  Lf.polyline(x.ls,{color:C[s],weight:s==="op"?5:s==="uc"?4:2.5,opacity:s==="pl"?.8:1,dashArray:s==="op"?null:s==="uc"?"9 6":"2 6",lineCap:"round",interactive:false}).addTo(fg)})});return fg}
// ---------- init: basemaps, boundaries, alignments, layer control, legend below the map
function init(map,city,opt){opt=opt||{};var o={map:map,city:city},ctl=null,lgEl=null,extra=opt.extra||{};
 var osm="© OpenStreetMap contributors",bs={};
 var esri="Tiles © Esri, HERE, Garmin, © OpenStreetMap contributors";
 bs.b1=Lf.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",{maxZoom:19,maxNativeZoom:16,attribution:esri});
 bs.b2=Lf.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:osm});
 bs.b3=Lf.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:19,attribution:"Imagery © Esri, Maxar, Earthstar Geographics"});
 bs.b4=Lf.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",{maxZoom:19,maxNativeZoom:16,attribution:esri});
 (opt.dark?bs.b4:bs.b1).addTo(map);
 pane(map,"bnd",380);
 var dist=boundary(G[city].dist,"d","#334155",1.6,.02).addTo(map),ward=boundary(G[city].ward,"w","#64748b",.8,0),lines=alignments(city).addTo(map);
 var ZL=function(){var z=map.getZoom(),c=map.getContainer().classList;c.toggle("zl-d",z>=10&&z<=14);c.toggle("zl-w",z>=14);c.toggle("zl-s",z>=13)};map.on("zoomend",ZL);ZL();
 o.dist=dist;o.ward=ward;o.lines=lines;
 var B=window.BND&&BND[city];
 if(B){o.cur=Lf.featureGroup();Lf.geoJSON({type:"Feature",geometry:B.o},{style:{color:"#0d9488",weight:3,opacity:.95,fillColor:"#14b8a6",fillOpacity:.035,dashArray:"11 6"},interactive:false}).addTo(o.cur);o.cur.addTo(map);
  if(B.w)o.curW=boundary(B.w,"w","#0f766e",1,.03)}
 (function(){var NT=window.NET,list=city==="hcm"?(NT&&NT.hcmStations||(window.DATA&&window.DATA.stations||[]).map(function(x){return{lat:x.lat,lng:x.lng,st:"op"}})):(NT&&NT.hnStations||[]).map(function(x){return{lat:x.lat,lng:x.lng,st:"op"}});
  var cc={op:city==="hcm"?"#0079b8":"#c2410c",uc:"#dc2626",pl:"#7c8795"};o.cat=Lf.featureGroup();
  list.forEach(function(x){var st=x.st||"op";Lf.circle([x.lat,x.lng],{radius:800,color:cc[st],weight:1.2,opacity:.9,fillColor:cc[st],fillOpacity:st==="pl"?.04:.09,dashArray:st==="op"?null:st==="uc"?"6 4":"2 4",interactive:false}).addTo(o.cat)});
  if(opt.cat)o.cat.addTo(map)})();
 if(opt.cor&&window.NET&&NET.hcmLines){var pal=["#0079b8","#dc2626","#7c3aed","#ea580c","#0d9488","#be185d","#4d7c0f","#b45309","#1d4ed8","#9333ea","#0e7490","#a16207","#be123c","#15803d","#6d28d9","#c2410c"];o.cor=Lf.featureGroup();
  NET.hcmLines.forEach(function(l,k){var p=(NET.plan||[]).filter(function(q){return q.name===l.name})[0],c=pal[k%pal.length];
   var pl=Lf.polyline(l.pts,{color:c,weight:4,opacity:.85,dashArray:l.name==="Tuyến metro số 1"?null:"9 6",lineCap:"round"}).addTo(o.cor);
   pl.bindTooltip(l.name,{sticky:true,className:"stl"});pl.bindPopup("<b>"+esc(l.name)+"</b>"+(p?"<br>"+esc(p.route)+"<br>"+p.km+" km · "+p.ns+" "+(L==="vi"?"ga":"stations")+"<br>"+esc(p.status):""));
   pl.on("mouseover",function(){pl.setStyle({weight:7,opacity:1})});pl.on("mouseout",function(){pl.setStyle({weight:4,opacity:.85})})});
  if(opt.cor==="on")o.cor.addTo(map)}
 if(opt.bands){o.bands=bands(stationsOf(city),{map:map});}
 if(opt.amen){o.amen=new AmenLayer()}
 if(opt.mlu){o.mlu=mluGroup()}
 function controls(){if(ctl)map.removeControl(ctl);var t=TX[L],b={},ov={};["b1","b2","b3","b4"].forEach(function(k){b[t[k]]=bs[k]});ov[t.dist]=dist;ov[t.ward]=ward;ov[t.lines]=lines;if(o.cur)ov[t.cur]=o.cur;if(o.curW)ov[t.curW]=o.curW;if(o.cat)ov[t.cat]=o.cat;if(o.cor)ov[t.cor]=o.cor;
  if(o.bands)ov[t.bands]=o.bands;if(o.mlu)ov[t.mlu]=o.mlu.layer;if(o.amen)ov[t.amen]=o.amen;
  ctl=Lf.control.layers(b,ov,{collapsed:true,position:"topright"}).addTo(map);legend()}
 function legend(){if(opt.nolegend)return;var t=TX[L],C=LC[city],el=lgEl;if(!el){el=lgEl=document.createElement("div");el.className="mlg";map.getContainer().insertAdjacentElement("afterend",el)}
  var line=function(c,dash,w){return "<svg width='34' height='10'><line x1='1' y1='5' x2='33' y2='5' stroke='"+c+"' stroke-width='"+w+"' "+(dash?"stroke-dasharray='"+dash+"'":"")+" stroke-linecap='round'/></svg>"};
  var h="<div class='lgc'><b>"+t.lgm+"</b><span>"+line(C.op,"",5)+t.op+"</span><span>"+line(C.uc,"6 4",4)+t.uc+"</span><span>"+line(C.pl,"2 4",2.5)+t.pl+"</span><span><svg width='34' height='14'><circle cx='17' cy='7' r='5' fill='#fff' stroke='"+C.op+"' stroke-width='2.5'/></svg>"+t.stn+"</span></div>";
  if(opt.types){h+="<div class='lgc'><b>"+t.lgh+"</b><span><svg width='34' height='14'><circle cx='17' cy='7' r='5' fill='#94a3b8' stroke='#fff'/></svg>"+t.n+"</span><span><svg width='34' height='14'><path d='M17 1L23 7L17 13L11 7Z' fill='#94a3b8' stroke='#fff'/></svg>"+t.d+"</span><span><svg width='34' height='14'><path d='M17 1L23.5 12.5L10.5 12.5Z' fill='#94a3b8' stroke='#fff'/></svg>"+t.c+"</span></div>";
   h+="<div class='lgc'><b>"+t.lgp+"</b><span class='ramp'><i></i></span><span class='rl'><em>20</em><em>100</em><em>400+</em></span></div>"}
  if(opt.bands){h+="<div class='lgc'><b>"+t.lgr+"</b>"+["r1","r2","r3","r4"].map(function(k){return "<span><svg width='18' height='14'><rect x='1' y='1' width='16' height='12' rx='3' fill='"+RING_C[k]+"' fill-opacity='.55' stroke='"+RING_C[k]+"'/></svg>"+t.rn[k]+"</span>"}).join("")+"</div>"}
  if(opt.amen){h+="<div class='lgc'><b>"+t.lga+"</b>"+t.am.map(function(a,i){return "<label><input type='checkbox' data-am='"+i+"'"+(o.amen&&o.amen._cats[i]?" checked":"")+"><svg width='14' height='14'><circle cx='7' cy='7' r='6' fill='"+AC[i]+"' stroke='#fff'/></svg>"+a+"</label>"}).join("")+"</div>"}
  if(opt.mlu){h+="<div class='lgc'><b>"+t.mlu+"</b><select data-mv>"+t.mv.map(function(a,i){return "<option value='"+i+"'"+(o.mlu&&o.mlu.cur()===i?" selected":"")+">"+a+"</option>"}).join("")+"</select><span class='ramp v'><i></i></span><span class='rl'><em>0</em><em>"+(o.mlu&&o.mlu.cur()===4?"150+":"1")+"</em></span></div>"}
  h+="<div class='lgc'><b>"+t.lgb+"</b><span><svg width='34' height='10'><line x1='1' y1='5' x2='33' y2='5' stroke='#334155' stroke-width='1.8'/></svg>"+t.bd+"</span><span><svg width='34' height='10'><line x1='1' y1='5' x2='33' y2='5' stroke='#64748b' stroke-width='1' stroke-dasharray='3 3'/></svg>"+t.bw+"</span><span><svg width='34' height='10'><line x1='1' y1='5' x2='33' y2='5' stroke='#0d9488' stroke-width='3' stroke-dasharray='8 4'/></svg>"+t.lgcur+"</span>"+(o.cat?"<span><svg width='34' height='14'><circle cx='17' cy='7' r='6' fill='"+C.op+"' fill-opacity='.12' stroke='"+C.op+"'/></svg>"+t.lgcat+"</span>":"")+"</div><small>"+t.note+"</small>";
  el.innerHTML=h;
  el.querySelectorAll("[data-am]").forEach(function(i){i.addEventListener("change",function(){var on={};el.querySelectorAll("[data-am]").forEach(function(q){on[q.getAttribute("data-am")]=q.checked});o.amen.setCats(on);if(on[0]||on[1]||on[2]||on[3]||on[4]){if(!map.hasLayer(o.amen))map.addLayer(o.amen)}})});
  var sel=el.querySelector("[data-mv]");if(sel)sel.addEventListener("change",function(){o.mlu.set(+sel.value);if(!map.hasLayer(o.mlu.layer))map.addLayer(o.mlu.layer);legend()})}
 o.setLang=function(l){L=l;controls();if(o.mlu)o.mlu.repaint();if(o.toolbarRefresh)o.toolbarRefresh()};controls();
 o.station=function(s,cfg){cfg=cfg||{};var c=cfg.color||LC[city].op,m=Lf.circleMarker([s.lat,s.lng],{radius:cfg.ix?8:6,color:c,weight:3,fillColor:"#fff",fillOpacity:1});
  if(cfg.label){m.bindTooltip(cfg.label,{permanent:true,direction:"right",offset:[8,0],className:"stl"})}return m};
 REG.push(o);return o}
// ---------- toolbar: type + price cap + in-view statistics (used by maps with listings)
function toolbar(o,layerFactory,cfg){cfg=cfg||{};var st={type:"all",pmax:400},host=o.map.getContainer(),bar=document.createElement("div");bar.className="ctl tbar";host.insertAdjacentElement("beforebegin",bar);
 var layer=layerFactory({filter:function(p){return(st.type==="all"||p[3]===st.type)&&p[2]<=st.pmax&&(!cfg.maxd||p[4]<=cfg.maxd())},city:o.city,onView:function(l){var v=l.map(function(p){return p[2]});view.n=v.length;view.m=v.length?med(v):NaN;paint()}});
 var view={n:0,m:NaN};
 function paint(){var t=TX[L],e=bar.querySelector(".tv");if(e)e.innerHTML="<b>"+fi(view.n)+"</b> "+t.tb_n+(view.n?" · "+t.tb_med+" <b>"+nf(view.m,1)+"</b>":"")}
 function build(){var t=TX[L];bar.innerHTML="<label>"+t.tb_type+" <select data-k='type'><option value='all'>"+t.t_all+"</option><option value='n'>"+t.n+"</option><option value='d'>"+t.d+"</option><option value='c'>"+t.c+"</option></select></label>"+
  "<label>"+t.tb_pmax+" <input type='range' min='30' max='400' step='10' data-k='pmax'> <b data-pv></b></label>"+(cfg.extra||"")+"<span class='tv'></span>";
  bar.querySelector("[data-k=type]").value=st.type;var r=bar.querySelector("[data-k=pmax]");r.value=st.pmax;bar.querySelector("[data-pv]").textContent=st.pmax>=400?"400+":st.pmax;
  bar.querySelector("[data-k=type]").addEventListener("input",function(e){st.type=e.target.value;layer.redraw()});
  r.addEventListener("input",function(e){st.pmax=+e.target.value;bar.querySelector("[data-pv]").textContent=st.pmax>=400?"400+":st.pmax;layer.redraw()});
  if(cfg.bind)cfg.bind(bar,layer);paint()}
 o.toolbarRefresh=build;build();layer.addTo(o.map);o.layer=layer;o.state=st;return layer}
return {init:init,TypeLayer:TypeLayer,toolbar:toolbar,bands:bands,bpane:bpane,popupHTML:popupHTML,locate:locate,ramp:ramp,vir:vir,hav:hav,med:med,stationsOf:stationsOf,pointsOf:pointsOf,RING_C:RING_C,AC:AC,
 setLang:function(l){L=l;REG.forEach(function(o){o.setLang(l)})},TX:TX,reg:REG,tx:function(){return TX[L]}}
})();
