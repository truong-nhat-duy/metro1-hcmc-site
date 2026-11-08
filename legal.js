/* Legal & planning documents (bilingual). Renders into #legalx. Verification status as of 08/11/2026. */
(function(){
"use strict";
var L=function(){return document.documentElement.lang==="vi"?"vi":"en"};
var V={f:{en:"Full text read 08/11/2026",vi:"Toàn văn 08/11/2026"},
 a:{en:"Number, date, title checked 08/11/2026",vi:"Số hiệu, ngày, trích yếu 08/11/2026"},
 p:{en:"From the proposal; not re-checked",vi:"Từ đề cương; chưa đối chiếu lại"},
 c:{en:"Via a citing document",vi:"Qua văn bản trích dẫn"},
 u:{en:"UNVERIFIED (press only)",vi:"CHƯA XÁC MINH (chỉ qua báo)"}};
var G=[
{t:{en:"A. National laws and plans",vi:"A. Luật và quy hoạch cấp quốc gia"},r:[
 ["Land Law 31/2024/QH15; Law 43/2024; Decree 102/2024","Luật Đất đai 31/2024/QH15; Luật 43/2024; NĐ 102/2024","Art. 13(11) value-increment regulation; land price table from 01/01/2026","Điều 13 khoản 11 điều tiết giá trị tăng thêm; bảng giá đất từ 01/01/2026","p"],
 ["Law on Urban and Rural Planning 47/2024/QH15 (26/11/2024; in force 01/7/2025)","Luật Quy hoạch đô thị và nông thôn 47/2024/QH15 (26/11/2024; hiệu lực 01/7/2025)","Planning framework; no TOD concept in the text","Khung quy hoạch; văn bản không có khái niệm TOD","f"],
 ["Law 144/2025/QH15 (11/12/2025; in force 01/01/2026)","Luật 144/2025/QH15 (11/12/2025; hiệu lực 01/01/2026)","Amends Law 47/2024; no TOD concept","Sửa đổi Luật 47/2024; không có khái niệm TOD","f"],
 ["Decree 178/2025 (01/7/2025); Decree 34/2026 (22/01/2026)","NĐ 178/2025 (01/7/2025); NĐ 34/2026 (22/01/2026)","Implement Law 47/2024; no TOD concept","Hướng dẫn Luật 47/2024; không có khái niệm TOD","f"],
 ["Railway Law 95/2025/QH15; Decree 123/2025 (11/6/2025)","Luật Đường sắt 95/2025/QH15; NĐ 123/2025 (11/6/2025)","TOD planning; local retention of TOD land revenue (Law); technical design and special mechanisms (Decree)","Quy hoạch TOD; giữ lại nguồn thu quỹ đất TOD (Luật); thiết kế kỹ thuật, cơ chế đặc thù (Nghị định)","p"],
 ["Urban Development Law 18/2026/QH16 (passed 24/8/2026; in force 01/10/2026)","Luật Phát triển đô thị 18/2026/QH16 (thông qua 24/8/2026; hiệu lực 01/10/2026)","Applies to HCMC. Art. 13: TOD defined; city council sets TOD policy, land-use indicators, TOD planning and charges (extra floor area, land value increment, infrastructure fee). No radius in the articles read","Áp dụng cho TP.HCM. Điều 13: định nghĩa TOD; HĐND thành phố quy định chính sách, chỉ tiêu sử dụng đất, quy hoạch và các khoản thu (diện tích sàn tăng thêm, giá trị tăng thêm từ đất, phí cải thiện hạ tầng). Điều khoản đã đọc không nêu bán kính","f"],
 ["Decision 1769/QĐ-TTg (19/10/2021)","QĐ 1769/QĐ-TTg (19/10/2021)","National railway network plan 2021–2030, vision 2050","Quy hoạch mạng lưới đường sắt 2021–2030, tầm nhìn 2050","a"]]},
{t:{en:"B. Ho Chi Minh City",vi:"B. TP. Hồ Chí Minh"},r:[
 ["Resolution 98/2023/QH15; Resolution 188/2025/QH15 (19/02/2025)","NQ 98/2023/QH15; NQ 188/2025/QH15 (19/02/2025)","Special mechanisms; urban rail and TOD (Arts. 6, 9)","Cơ chế đặc thù; đường sắt đô thị và TOD (Điều 6, 9)","p"],
 ["Decision 568/QĐ-TTg (08/4/2013)","QĐ 568/QĐ-TTg (08/4/2013)","Adjusted transport plan to 2020, vision beyond","Điều chỉnh quy hoạch GTVT đến 2020, tầm nhìn sau 2020","a"],
 ["Decision 1711/QĐ-TTg (31/12/2024)","QĐ 1711/QĐ-TTg (31/12/2024)","City plan 2021–2030, vision 2050; ~11.0 m (2030), ~14.5 m (2050) residents","Quy hoạch TP.HCM 2021–2030, tầm nhìn 2050; ~11,0 triệu (2030), ~14,5 triệu (2050)","a"],
 ["Decision 1125/QĐ-TTg (11/6/2025)","QĐ 1125/QĐ-TTg (11/6/2025)","General plan to 2040, vision 2060; TOD around metro stations; 12 urban rail lines, ~582 km; no station-level boundary","Quy hoạch chung đến 2040, tầm nhìn 2060; TOD quanh ga metro; 12 tuyến đường sắt đô thị, ~582 km; chưa có ranh ga cụ thể","f"],
 ["City Council Res. 38/2025 (28/8/2025) → 21/2026 (19/6/2026) → 56/2026 (passed 22/9/2026; in force 01/10/2026)","NQ HĐND 38/2025 (28/8/2025) → 21/2026 (19/6/2026) → 56/2026 (thông qua 22/9/2026; hiệu lực 01/10/2026)","Each replaces the previous. TOD zone up to 1,000 m from the station reference centre; FAR up to 1.5×","Nghị quyết sau thay nghị quyết trước. Ranh TOD tối đa 1.000 m từ tâm quy ước nhà ga; hệ số sử dụng đất tối đa 1,5 lần","f"],
 ["Decisions 3651 and 3845/QĐ-UBND (2026)","QĐ 3651 và 3845/QĐ-UBND (2026)","Metro 2 TOD zones; Metro 1 boundary under consultation","Ranh TOD Metro 2; ranh Metro 1 đang lấy ý kiến","p"],
 ["Decision 1463/QĐ-UBND (13/03/2026)","QĐ 1463/QĐ-UBND (13/03/2026)","Assigns the agency to prepare the HCMC master plan (procedural)","Giao cơ quan lập Quy hoạch tổng thể TP.HCM (văn bản thủ tục)","f"],
 ["Decisions 2754 (13/05/2026) and 3114/QĐ-UBND (26/05/2026)","QĐ 2754 (13/05/2026) và 3114/QĐ-UBND (26/05/2026)","Approve the master-plan outline; approve the adjusted preparation plan (procedural)","Duyệt đề cương Quy hoạch tổng thể; duyệt điều chỉnh kế hoạch lập (văn bản thủ tục)","c"],
 ["Master plan 2021–2050, 100-year vision (council vote 30/10/2026, press)","Quy hoạch tổng thể 2021–2050, tầm nhìn 100 năm (HĐND thông qua 30/10/2026, theo báo)","Final approval decision has no number in the sources read","Quyết định phê duyệt cuối chưa có số hiệu trong nguồn đã đọc","u"]]},
{t:{en:"C. Hanoi",vi:"C. Hà Nội"},r:[
 ["Capital Law 39/2024/QH15 (28/6/2024)","Luật Thủ đô 39/2024/QH15 (28/6/2024)","Expired 01/7/2026, replaced by Law 02/2026","Hết hiệu lực 01/7/2026, thay bởi Luật 02/2026","a"],
 ["Capital Law 02/2026/QH16 (passed 23/4/2026; in force 01/7/2026)","Luật Thủ đô 02/2026/QH16 (thông qua 23/4/2026; hiệu lực 01/7/2026)","TOD zone defined by subdivision or detailed plan; city council sets TOD policy (compact city), indicators and charges; projects under Res. 188/2025 continue","Khu vực TOD theo quy hoạch phân khu hoặc chi tiết; HĐND quy định chính sách TOD (đô thị nén), chỉ tiêu, các khoản thu; dự án theo NQ 188/2025 tiếp tục","f"],
 ["Decision 1569/QĐ-TTg (12/12/2024)","QĐ 1569/QĐ-TTg (12/12/2024)","Capital plan 2021–2030, vision 2050","Quy hoạch Thủ đô 2021–2030, tầm nhìn 2050","a"],
 ["Decision 1668/QĐ-TTg (27/12/2024)","QĐ 1668/QĐ-TTg (27/12/2024)","General plan to 2045, vision 2065; TOD ring around inner city at urban rail stations; no station-level boundary","Quy hoạch chung đến 2045, tầm nhìn 2065; vành đai TOD quanh nội đô tại ga đường sắt đô thị; chưa có ranh ga cụ thể","f"],
 ["Hanoi Council Res. 71/2025/NQ-HĐND (27/11/2025)","NQ 71/2025/NQ-HĐND (27/11/2025)","TOD planning; ~1,000 m from station entrances; FAR up to 1.5×; issued under the 2024 Capital Law","Quy hoạch TOD; ~1.000 m từ lối vào ga; hệ số sử dụng đất tối đa 1,5 lần; ban hành theo Luật Thủ đô 2024","f"],
 ["Decision 2512/QĐ-UBND (13/05/2026)","QĐ 2512/QĐ-UBND (13/05/2026)","100-year master plan; TOD redevelopment around urban rail stations (Ngọc Hồi, Hà Nội, Gia Lâm, Yên Thường)","Quy hoạch tổng thể tầm nhìn 100 năm; tái thiết TOD quanh ga (Ngọc Hồi, Hà Nội, Gia Lâm, Yên Thường)","f"]]}];
var H={en:["Document","Relevance","Status"],vi:["Văn bản","Nội dung liên quan","Mức đối chiếu"]};
var T={en:["Legal and planning documents","Status as of 08/11/2026. “Full text read” means the document was read in full on LuatVietnam; the council vote on 30/10/2026 remains press-only."],
 vi:["Danh mục văn bản pháp lý và quy hoạch","Tình trạng đến 08/11/2026. “Toàn văn” là văn bản đã đọc đầy đủ trên LuatVietnam; việc HĐND thông qua ngày 30/10/2026 vẫn chỉ có qua báo."]};
function render(){
 var el=document.getElementById("legalx");if(!el)return;var l=L(),h="<h3>"+T[l][0]+"</h3><p class=\"note\">"+T[l][1]+"</p><div style=\"overflow-x:auto\"><table class=\"legal\"><thead><tr>"+H[l].map(function(x){return"<th>"+x+"</th>"}).join("")+"</tr></thead><tbody>";
 G.forEach(function(g){h+="<tr><th colspan=\"3\" style=\"text-align:left\">"+g.t[l]+"</th></tr>";
  g.r.forEach(function(r){var i=l==="vi"?1:0;h+="<tr><td>"+r[i]+"</td><td>"+r[i+2]+"</td><td>"+V[r[4]][l]+"</td></tr>"})});
 el.innerHTML=h+"</tbody></table></div>"}
document.addEventListener("DOMContentLoaded",render);if(document.readyState!=="loading")render();
document.addEventListener("click",function(e){if(e.target.closest&&e.target.closest("#lang"))setTimeout(render,60)});
})();
