"use strict";
/* Two interactive GIS maps (Hanoi, Ho Chi Minh City) for growth poles, planned TOD and the schematic master-plan layer. */
(function(){
var Lf=window.L;if(!Lf||!window.Geo||!window.PLAN)return;
var done={};
function make(id,city,center,zoom){var el=document.getElementById(id);if(!el||done[id])return;done[id]=1;
 var map=Lf.map(el,{minZoom:7}).setView(center,zoom);Geo.init(map,city,{nolegend:true});
 PLAN.attach(map,{pos:"topright",city:city,on:true,tod:true});
 setTimeout(function(){map.invalidateSize()},300);return map}
function go(){make("mapPlanHn","hn",[21.03,105.80],10);make("mapPlanHcm","hcm",[10.80,106.72],10)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else go();
})();
