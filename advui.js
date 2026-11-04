"use strict";
/* Collapsible advanced-options panel shared by the maps. mount(id,{title,groups,state,onChange}). */
(function(){
var reg={};
function lg(){return document.documentElement.lang==="vi"?"vi":"en"}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function tx(o){return o&&typeof o==="object"?o[lg()]:o}
function field(f,st){var l=lg(),h="<label class='advf'>";
 if(f.t==="chk")return h+"<input type='checkbox' data-k='"+f.k+"'"+(st[f.k]?" checked":"")+"> <span>"+esc(tx(f.l))+"</span></label>";
 h+="<span>"+esc(tx(f.l))+"</span> ";
 if(f.t==="num")h+="<input type='number' data-k='"+f.k+"' data-n='1' min='0' step='"+(f.step||1)+"' placeholder='"+esc(tx(f.ph)||"")+"' value='"+(st[f.k]==null?"":st[f.k])+"'>";
 else if(f.t==="sel"){var o=typeof f.o==="function"?f.o():f.o;h+="<select data-k='"+f.k+"'>"+o.map(function(x){return"<option value='"+esc(x[0])+"'"+(String(st[f.k])===String(x[0])?" selected":"")+">"+esc(tx(x[1]))+"</option>"}).join("")+"</select>"}
 else if(f.t==="rng")h+="<input type='range' data-k='"+f.k+"' min='"+f.min+"' max='"+f.max+"' step='"+f.step+"' value='"+st[f.k]+"'> <b data-o='"+f.k+"'>"+st[f.k]+"</b>";
 return h+"</label>"}
function render(id){var r=reg[id];if(!r)return;var c=r.cfg,el=r.el,op=el.open;
 el.innerHTML="<summary>"+esc(tx(c.title))+"</summary><div class='advg'>"+c.groups.map(function(g){return"<fieldset><legend>"+esc(tx(g.t))+"</legend>"+g.f.map(function(f){return field(f,c.state)}).join("")+"</fieldset>"}).join("")+"</div><p class='advr'><button type='button' data-reset='1'>"+(lg()==="vi"?"Đặt lại":"Reset")+"</button></p>";
 el.open=op}
function mount(id,cfg){var el=document.getElementById(id);if(!el)return;reg[id]={el:el,cfg:cfg,def:JSON.parse(JSON.stringify(cfg.state))};render(id);
 function h(e){var t=e.target,k=t.getAttribute&&t.getAttribute("data-k");if(!k)return;var rg=t.type==="range";if(rg?e.type!=="input":e.type!=="change")return;
  var v=t.type==="checkbox"?t.checked:t.value;if(t.getAttribute("data-n")==="1")v=v===""?null:+v;if(rg){v=+v;var o=el.querySelector("[data-o='"+k+"']");if(o)o.textContent=v}
  cfg.state[k]=v;cfg.onChange(k,v)}
 el.addEventListener("input",h);el.addEventListener("change",h);
 el.addEventListener("click",function(e){if(e.target.getAttribute&&e.target.getAttribute("data-reset")){var d=reg[id].def;Object.keys(d).forEach(function(k){cfg.state[k]=d[k]});render(id);cfg.onChange("*",null)}})}
var lb=document.getElementById("lang");if(lb)lb.addEventListener("click",function(){setTimeout(function(){Object.keys(reg).forEach(render)},60)});
window.AdvUI={mount:mount,render:render};
})();
