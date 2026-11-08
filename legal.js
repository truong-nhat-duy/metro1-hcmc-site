/* Legal & planning documents (bilingual). Renders into #legalx. Verification status as of 08/11/2026. */
(function(){
"use strict";
var L=function(){return document.documentElement.lang==="vi"?"vi":"en"};
var V={a:{en:"Verified 08/11/2026 (number, date, title)",vi:"Đối chiếu 08/11/2026 (số hiệu, ngày, trích yếu)"},
 p:{en:"From the proposal; not re-checked",vi:"Từ đề cương; chưa đối chiếu lại"},
 u:{en:"UNVERIFIED (press / aggregator only)",vi:"CHƯA XÁC MINH (chỉ qua báo / trang tổng hợp)"}};
var G=[
{t:{en:"A. National laws and plans",vi:"A. Luật và quy hoạch cấp quốc gia"},r:[
 ["Land Law 31/2024/QH15; Law 43/2024; Decree 102/2024","Luật Đất đai 31/2024/QH15; Luật 43/2024; NĐ 102/2024","Art. 13(11) value-increment regulation; land price table from 01/01/2026","Điều 13 khoản 11 điều tiết giá trị tăng thêm; bảng giá đất từ 01/01/2026","p"],
 ["Law on Urban and Rural Planning 47/2024/QH15 (26/11/2024; in force 01/7/2025)","Luật Quy hoạch đô thị và nông thôn 47/2024/QH15 (26/11/2024; hiệu lực 01/7/2025)","Framework for general and zoning plans; TOD provisions not read","Khung quy hoạch chung, phân khu; điều khoản TOD chưa đọc","a"],
 ["Capital Law 39/2024/QH15 (28/6/2024; in force 01/01/2025)","Luật Thủ đô 39/2024/QH15 (28/6/2024; hiệu lực 01/01/2025)","Special mechanisms for Hanoi","Cơ chế đặc thù cho Hà Nội","a"],
 ["Railway Law 95/2025/QH15; Decree 123/2025","Luật Đường sắt 95/2025/QH15; NĐ 123/2025","TOD planning; local retention of TOD land revenue","Quy hoạch TOD; địa phương giữ lại nguồn thu quỹ đất TOD","p"],
 ["Urban Development Law","Luật Phát triển đô thị","Listed as a draft in the thesis; a document of that name now appears on the government portal. Status to update","Đề cương ghi là dự thảo; cổng Chính phủ đã liệt kê văn bản cùng tên. Cần cập nhật tình trạng","u"],
 ["Decision 1769/QĐ-TTg (19/10/2021)","QĐ 1769/QĐ-TTg (19/10/2021)","National railway network plan 2021–2030, vision 2050","Quy hoạch mạng lưới đường sắt 2021–2030, tầm nhìn 2050","a"]]},
{t:{en:"B. Ho Chi Minh City",vi:"B. TP. Hồ Chí Minh"},r:[
 ["Resolution 98/2023/QH15; Resolution 188/2025/QH15 (19/02/2025)","NQ 98/2023/QH15; NQ 188/2025/QH15 (19/02/2025)","Special mechanisms; urban rail and TOD (Arts. 6, 9)","Cơ chế đặc thù; đường sắt đô thị và TOD (Điều 6, 9)","p"],
 ["Decision 568/QĐ-TTg (08/4/2013)","QĐ 568/QĐ-TTg (08/4/2013)","Adjusted transport plan to 2020, vision beyond","Điều chỉnh quy hoạch GTVT đến 2020, tầm nhìn sau 2020","a"],
 ["Decision 1711/QĐ-TTg (31/12/2024)","QĐ 1711/QĐ-TTg (31/12/2024)","City master plan 2021–2030, vision 2050; ~11.0 m (2030) and ~14.5 m (2050) residents","Quy hoạch TP.HCM 2021–2030, tầm nhìn 2050; ~11,0 triệu (2030), ~14,5 triệu (2050)","a"],
 ["Decision 1125/QĐ-TTg (11/6/2025)","QĐ 1125/QĐ-TTg (11/6/2025)","General plan adjusted to 2040, vision 2060","Điều chỉnh quy hoạch chung đến 2040, tầm nhìn 2060","a"],
 ["HCMC People's Council Res. 38/2025 → 21/2026 → 56/2026","NQ HĐND 38/2025 → 21/2026 → 56/2026","TOD zone ≤1,000 m; FAR up to 1.5×","Ranh TOD ≤1.000 m; hệ số sử dụng đất tối đa 1,5 lần","p"],
 ["Decisions 3651 and 3845/QĐ-UBND (2026)","QĐ 3651 và 3845/QĐ-UBND (2026)","Metro 2 TOD zones; Metro 1 boundary still under consultation","Ranh TOD Metro 2; ranh Metro 1 đang lấy ý kiến","p"],
 ["Master plan 2025–2050 (council vote 30/10/2026); Decisions 1463, 2754, 3114/QĐ-UBND","Quy hoạch tổng thể 2025–2050 (HĐND thông qua 30/10/2026); QĐ 1463, 2754, 3114/QĐ-UBND","Final approval has no number yet","Quyết định phê duyệt cuối chưa có số hiệu","u"]]},
{t:{en:"C. Hanoi",vi:"C. Hà Nội"},r:[
 ["Decision 1569/QĐ-TTg (12/12/2024)","QĐ 1569/QĐ-TTg (12/12/2024)","Capital plan 2021–2030, vision 2050","Quy hoạch Thủ đô 2021–2030, tầm nhìn 2050","a"],
 ["Decision 1668/QĐ-TTg (27/12/2024)","QĐ 1668/QĐ-TTg (27/12/2024)","Capital general plan adjusted to 2045, vision 2065","Điều chỉnh quy hoạch chung Thủ đô đến 2045, tầm nhìn 2065","a"],
 ["Hanoi People's Council Res. 71/2025/NQ-HĐND (27/11/2025)","NQ 71/2025/NQ-HĐND (27/11/2025)","TOD planning; ~1,000 m; FAR up to 1.5×","Quy hoạch TOD; ~1.000 m; hệ số sử dụng đất tối đa 1,5 lần","p"],
 ["Decision 2512/QĐ-UBND (13/05/2026)","QĐ 2512/QĐ-UBND (13/05/2026)","100-year master plan (press report): 126 commune units; rail/TOD content not read","Quy hoạch tầm nhìn 100 năm (theo báo): 126 đơn vị cấp xã; nội dung đường sắt/TOD chưa đọc","u"]]}];
var H={en:["Document","Relevance","Status"],vi:["Văn bản","Nội dung liên quan","Mức đối chiếu"]};
var T={en:["Legal and planning documents","Rows marked UNVERIFIED rest on press or aggregator pages and must not be cited as primary sources. Verification covered number, date and title only; TOD clauses of the planning decisions were not read."],
 vi:["Danh mục văn bản pháp lý và quy hoạch","Dòng CHƯA XÁC MINH dựa trên báo hoặc trang tổng hợp, không dùng làm nguồn gốc. Việc đối chiếu chỉ gồm số hiệu, ngày và trích yếu; điều khoản TOD trong các quyết định quy hoạch chưa được đọc."]};
function render(){
 var el=document.getElementById("legalx");if(!el)return;var l=L(),h="<h3>"+T[l][0]+"</h3><p class=\"note\">"+T[l][1]+"</p><div style=\"overflow-x:auto\"><table class=\"legal\"><thead><tr>"+H[l].map(function(x){return"<th>"+x+"</th>"}).join("")+"</tr></thead><tbody>";
 G.forEach(function(g){h+="<tr><th colspan=\"3\" style=\"text-align:left\">"+g.t[l]+"</th></tr>";
  g.r.forEach(function(r){var i=l==="vi"?1:0;h+="<tr><td>"+r[i]+"</td><td>"+r[i+2]+"</td><td>"+V[r[4]][l]+"</td></tr>"})});
 el.innerHTML=h+"</tbody></table></div>"}
document.addEventListener("DOMContentLoaded",render);if(document.readyState!=="loading")render();
document.addEventListener("click",function(e){if(e.target.closest&&e.target.closest("#lang"))setTimeout(render,60)});
})();
