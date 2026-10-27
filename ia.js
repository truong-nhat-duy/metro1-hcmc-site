"use strict";
/* Chapter navigation, chapter introductions and the data-access note. Text only. */
(function(){
var L="en";try{var s=localStorage.getItem("lang");if(s==="vi"||s==="en")L=s;else if((navigator.language||"").slice(0,2)==="vi")L="vi"}catch(e){}
var T={en:{
n0:"Findings",n1:"1 Problem",n2:"2 Method",n3:"3 Explore",n4:"4 Estimates",n5:"5 Context",n6:"6 Policy",n7:"7 Data",
c1:"1 · The problem and the theory",i1:"Why a rail line should raise nearby asking prices, what this study asks, and what earlier studies found.",
c2:"2 · Data and method",i2:"Where the listings come from, how distance rings are built, and what the models can and cannot say.",
c3:"3 · Explore the map",i3:"Start here. See the listings and rings, the whole network, and check how any place in Vietnam connects to a station.",
c4:"4 · Estimates and explanations",i4:"The ring premiums, what drives price, how Ho Chi Minh City compares with Hanoi, and where the evidence is thin.",
c5:"5 · Urban context",i5:"Night lights, population, land use and amenities around the lines.",
c6:"6 · Developers and policy",i6:"Which developers and sites are most exposed, and what the evidence supports for land value capture.",
c7:"7 · Data access and README",i7:"What this site shows, what it does not publish, and how to ask for more.",
acc_h:"Data access",acc_p:"This site publishes results, not the underlying data. The cleaned listing file, the code and the intermediate tables are not available for download.",
acc1:"Shown here",acc1p:"Model estimates, charts and maps. Listing locations on the maps are rounded and carry no seller information.",
acc2:"Available on request",acc2p:"Aggregated tables and replication material for academic or policy use, after agreeing the purpose.",
acc3:"How to ask",acc3p:"Open an issue on the project’s GitHub page (do not post personal data), or contact the author or the Fulbright School of Public Policy and Management.",
acc_btn:"Ask about the data"
},vi:{
n0:"Kết quả chính",n1:"1 Vấn đề",n2:"2 Phương pháp",n3:"3 Khám phá",n4:"4 Ước lượng",n5:"5 Bối cảnh",n6:"6 Chính sách",n7:"7 Dữ liệu",
c1:"1 · Vấn đề và lý thuyết",i1:"Vì sao một tuyến đường sắt đô thị làm tăng giá rao quanh ga, nghiên cứu hỏi gì, và các nghiên cứu trước đã thấy gì.",
c2:"2 · Dữ liệu và phương pháp",i2:"Tin đăng đến từ đâu, vành khoảng cách được dựng ra sao, và mô hình nói được, chưa nói được điều gì.",
c3:"3 · Khám phá bản đồ",i3:"Bắt đầu từ đây. Xem tin đăng và các vành, toàn mạng lưới, và kiểm tra một nơi bất kỳ ở Việt Nam nối với ga ra sao.",
c4:"4 · Ước lượng và giải thích",i4:"Phần chênh giá theo vành, yếu tố quyết định giá, so sánh TP.HCM với Hà Nội, và nơi bằng chứng còn mỏng.",
c5:"5 · Bối cảnh đô thị",i5:"Ánh sáng đêm, dân số, sử dụng đất và tiện ích quanh các tuyến.",
c6:"6 · Chủ đầu tư và chính sách",i6:"Chủ đầu tư và dự án nào chịu tác động mạnh nhất, và bằng chứng ủng hộ điều gì cho thu hồi giá trị đất.",
c7:"7 · Truy cập dữ liệu và README",i7:"Trang này cho xem gì, không công bố gì, và cách xin thêm thông tin.",
acc_h:"Truy cập dữ liệu",acc_p:"Trang này công bố kết quả, không công bố dữ liệu gốc. Tệp tin đăng đã làm sạch, mã nguồn và các bảng trung gian không có sẵn để tải về.",
acc1:"Xem được ở đây",acc1p:"Kết quả ước lượng, biểu đồ và bản đồ. Vị trí tin đăng trên bản đồ đã làm tròn và không có thông tin người bán.",
acc2:"Cung cấp khi có yêu cầu",acc2p:"Bảng tổng hợp và tài liệu tái lập cho mục đích học thuật hoặc chính sách, sau khi thống nhất mục đích sử dụng.",
acc3:"Cách yêu cầu",acc3p:"Mở một issue trên trang GitHub của dự án (không đăng thông tin cá nhân), hoặc liên hệ tác giả hay Trường Chính sách công và Quản lý Fulbright.",
acc_btn:"Hỏi về dữ liệu"}};
function render(){var t=T[L];document.querySelectorAll("[data-ia]").forEach(function(n){var k=n.getAttribute("data-ia");if(t[k]!=null)n.textContent=t[k]})}
var lb=document.getElementById("lang");if(lb)lb.addEventListener("click",function(){setTimeout(function(){L=document.documentElement.lang==="vi"?"vi":"en";render()},60)});
render();
})();
