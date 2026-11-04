/* Research design, equations, variable table and data sources (bilingual). Renders into #methx. */
(function(){
"use strict";
var Lg=function(){return document.documentElement.lang==="vi"?"vi":"en"};
var B=function(en,vi){return{en:en,vi:vi}};
var A=function(t,u){return u?'<a href="'+u+'" target="_blank" rel="noopener">'+t+'</a>':t};
var doi=function(d){return"https://doi.org/"+d};
/* citations: only entries present in the thesis bibliography; DOI links only where the bibliography holds a DOI */
var C={
 rosen:A("Rosen (1974)",doi("10.1086/260169")),
 lewis:"Lewis (2007)",nguyen:"Nguyen (2020)",gao:"Gao & Feng (2023)",
 deb:"Debrezion, Pels & Rietveld (2007)",
 diao:A("Diao, Leonard & Sing (2017)",doi("10.1016/j.regsciurbeco.2017.08.006")),
 ang:"Anggara (2026)",gm:"Gibbons & Machin (2005)",
 alo:"Alonso (1964)",muth:"Muth (1969)",mills:"Mills (1972)",
 tl:A("Nguyễn Lâm Quỳnh Trâm & Nguyễn Xuân Long (2025)",doi("10.54772/jomc.06.2025.1131")),
 pl:A("Phạm Chánh Toàn & Nguyễn Xuân Long (2025)",doi("10.54772/jomc.06.2025.1109")),
 ec:A("Ewing & Cervero (2010)",doi("10.1080/01944361003766766")),
 clark:A("Clark (1951)",doi("10.2307/2981088")),
 tatem:A("Tatem (2017)",doi("10.1038/sdata.2017.4")),
 elv:A("Elvidge et al. (2017)",doi("10.1080/01431161.2017.1342050")),
 rom:A("Román et al. (2018)",doi("10.1016/j.rse.2018.03.017")),
 bdm:"Bertrand, Duflo & Mullainathan (2004)",
 lsp:"LeSage & Pace (2009)",elh:"Elhorst (2014)",ans:"Anselin (1988)",
 kt:"Keele & Titiunik (2015)",gnt:"Grembi, Nannicini & Troiano (2016)",cct:"Calonico, Cattaneo & Titiunik (2014)",
 br:"Breiman (2001)",lun:"Lundberg & Lee (2017)",
 unv:{en:"unverified",vi:"CHƯA XÁC MINH"}
};
var I=function(s){return"<i>"+s+"</i>"};
var sb=function(s){return"<sub>"+s+"</sub>"};
var sp=function(s){return"<sup>"+s+"</sup>"};

var TXT={
 dh:B("Research design","Thiết kế nghiên cứu"),
 dp:B("Five questions, each with the design that can answer it and what that design can and cannot identify. The data are asking prices, so every gap below is a conditional difference, not a causal effect.","Năm câu hỏi, mỗi câu kèm thiết kế trả lời được nó và điều thiết kế đó nhận dạng được hay không. Dữ liệu là giá rao nên mọi chênh lệch dưới đây là chênh lệch có điều kiện, không phải tác động nhân quả."),
 mh:B("Model: quantitative equations","Mô hình: các phương trình định lượng"),
 mp:B("Notation follows the thesis proposal. Subscripts: i listing, g 2-km grid cell, w ward, s platform, t period, p night-light pixel. Equations are shown in plain notation.","Ký hiệu theo đề cương. Chỉ số: i tin rao, g ô lưới 2 km, w phường, s nền tảng, t kỳ, p pixel ánh sáng đêm. Phương trình viết ở dạng ký hiệu thường."),
 vh:B("Variables used in the models","Bảng các biến dùng trong mô hình"),
 vp:B("Expected signs follow the monocentric bid-rent model. The last column gives the grounds or earlier studies that used the variable. Only works already in the thesis bibliography are named; links go to the DOI where the bibliography holds one.","Dấu kỳ vọng theo mô hình tiền tô đơn tâm. Cột cuối nêu căn cứ hoặc nghiên cứu trước đã dùng biến. Chỉ nêu các công trình đã có trong thư mục tham khảo của đề tài; liên kết dẫn tới DOI khi thư mục có DOI."),
 th:[B("Variable","Biến"),B("Meaning and construction","Ý nghĩa và cách đo"),B("Sign","Dấu"),B("Models","Mô hình"),B("Grounds and earlier studies","Căn cứ và nghiên cứu trước")],
 sh:B("Data sources","Nguồn dữ liệu"),
 sp:B("Links go to each provider’s home page. Listing platforms are read only through public pages or interfaces; no seller name, phone number or account is stored.","Liên kết dẫn tới trang chủ của từng nhà cung cấp. Các sàn tin rao chỉ được đọc qua trang hoặc giao diện công khai; không lưu tên, số điện thoại hay tài khoản người đăng."),
 sth:[B("Source","Nguồn"),B("Used for","Dùng cho"),B("Coverage and caveat","Phạm vi và lưu ý"),B("Link","Liên kết")],
 note:B("Not yet checked against a primary source: the origin of the built-up and green-share layers, the network-wide station coordinates for planned lines, and the Hanoi station coordinates (OpenStreetMap).","Chưa đối chiếu nguồn gốc: lớp đất xây dựng và cây xanh, tọa độ ga các tuyến quy hoạch trên toàn mạng, và tọa độ ga Hà Nội (OpenStreetMap).")
};

var DESIGN=[
 {t:B("1. Is there a price gap near Line 1?","1. Có chênh lệch giá gần Tuyến 1 không?"),k:B("H1, H2 · cross-section","H1, H2 · lát cắt ngang"),
  p:B("Hedonic regression of log asking price per m² on distance rings, with 2-km grid-cell fixed effects so that near and far listings are compared inside the same cell. Identifies a conditional gap after opening, not what the Metro caused.","Hồi quy hedonic của log giá rao/m² trên các vành khoảng cách, với hiệu ứng cố định ô lưới 2 km để so tin gần và xa ga trong cùng một ô. Nhận dạng chênh lệch có điều kiện sau mở tuyến, không phải điều Metro gây ra.")},
 {t:B("2. Does it survive space and functional form?","2. Có bền khi tính đến không gian và dạng hàm?"),k:B("Robustness","Độ vững"),
  p:B("SAR, SEM and SDM with k-nearest-neighbour weights (k = 4, 8, 12); random forest and gradient boosting with SHAP, validated by 5-fold cross-validation split by 2-km cell. Descriptive: they show whether the gradient holds, not why.","SAR, SEM và SDM với ma trận láng giềng gần nhất (k = 4, 8, 12); rừng ngẫu nhiên và tăng cường gradient kèm SHAP, kiểm định chéo 5 lần chia theo ô 2 km. Mang tính mô tả: cho biết gradient có bền không, không cho biết vì sao.")},
 {t:B("3. When did the gap form?","3. Chênh lệch hình thành khi nào?"),k:B("H3 · before and after","H3 · trước và sau"),
  p:B("Ward-level difference-in-differences using 2019–2024 Wayback listings (2,150 matched) against 2025–2026 listings; main sample 6,280 listings in 245 wards, 33 of them near a station. A night-light difference-in-differences on pixel-months (92 months) adds an activity measure that exists before opening.","Khác biệt trong khác biệt cấp phường dùng tin Wayback 2019–2024 (2.150 tin khớp) so với tin 2025–2026; mẫu chính 6.280 tin trong 245 phường, 33 phường gần ga. Khác biệt trong khác biệt ánh sáng đêm trên pixel–tháng (92 tháng) bổ sung thước đo hoạt động có sẵn trước khi mở tuyến.")},
 {t:B("4. Where is it concentrated?","4. Chênh lệch tập trung ở đâu?"),k:B("H4, H5, H6 · heterogeneity","H4, H5, H6 · dị biệt"),
  p:B("Estimates by housing type, by station, with a land-use-mix interaction, and across the network by line and station class (lines at other stages stand in for time). Designed after the main results and not corrected for multiple comparisons.","Ước lượng theo loại hình, theo ga, với tương tác sử dụng đất hỗn hợp, và trên toàn mạng theo tuyến và lớp ga (các tuyến ở giai đoạn khác nhau thay cho thời gian). Được thiết kế sau khi có kết quả chính và không hiệu chỉnh so sánh bội.")},
 {t:B("5. Is there a jump at a boundary?","5. Có bước nhảy tại một ranh giới không?"),k:B("Diagnostic","Chẩn đoán"),
  p:B("Distance regression discontinuity at 500 m and 800 m, used only as a continuity check. A difference-in-discontinuities at the 1,000 m legal TOD boundary is specified but cannot be estimated yet: within 700–1,300 m only 1 listing is certainly dated before 28 Aug 2025, against 1,339 after.","Gián đoạn theo khoảng cách tại 500 m và 800 m, chỉ dùng để kiểm tra tính liên tục. Khác biệt trong gián đoạn tại ranh TOD pháp lý 1.000 m đã được đặc tả nhưng chưa ước lượng được: trong dải 700–1.300 m chỉ có 1 tin chắc chắn đăng trước 28/8/2025, so với 1.339 tin sau.")}
];

var EQ=[
 {t:B("Ring hedonic model","Mô hình hedonic theo vành"),k:B("H1, H2","H1, H2"),
  e:["ln "+I("P")+sb("ig")+" = α + Σ"+sb("k=1")+sp("4")+" β"+sb("k")+" · <b>1</b>["+I("d")+sb("i")+" ∈ "+I("R")+sb("k")+"] + <b>X</b>"+sb("i")+"′γ + μ"+sb("g")+" + ε"+sb("ig"),
     "ln "+I("P")+sb("ig")+" = α + β ln "+I("d")+sb("i")+" + <b>X</b>"+sb("i")+"′γ + μ"+sb("g")+" + ε"+sb("ig")],
  r:B("Rings R₁…R₄ = (0, 500], (500, 800], (800, 1,200], (1,200, 2,000] m; the reference is listings beyond 2,000 m in the same 2-km cell. β_k is a log-price gap, about e^β − 1 in percent. H1 is β_k > 0; H2 is a Wald test of β₁ = β₂. The second line is the continuous variant on the 5-km sample. Standard errors are clustered on 5-km cells.","Vành R₁…R₄ = (0, 500], (500, 800], (800, 1.200], (1.200, 2.000] m; nhóm gốc là tin cách ga trên 2.000 m trong cùng ô 2 km. β_k là chênh lệch log giá, tương ứng khoảng e^β − 1 phần trăm. H1 là β_k > 0; H2 là kiểm định Wald β₁ = β₂. Dòng thứ hai là đặc tả liên tục trên mẫu trong 5 km. Sai số chuẩn gom cụm theo ô 5 km.")},
 {t:B("Spatial models and impacts","Mô hình không gian và tác động"),k:B("Robustness","Độ vững"),
  e:["<b>y</b> = ρ<b>Wy</b> + α<b>ι</b> + <b>X</b>β + <b>WX</b>θ + <b>u</b>,  <b>u</b> = λ<b>Wu</b> + ε",
     "∂<b>y</b>/∂"+I("x")+sb("k")+" = (<b>I</b> − ρ<b>W</b>)"+sp("−1")+" (β"+sb("k")+"<b>I</b> + θ"+sb("k")+"<b>W</b>)"],
  r:B("SAR sets θ = 0 and λ = 0, SEM sets ρ = 0 and θ = 0, SDM sets λ = 0. Coefficients are read through direct, indirect and total impacts. Results depend on W (k-nearest neighbours, k = 4, 8, 12) and describe spatial structure; they do not replace an identification design.","SAR đặt θ = 0 và λ = 0, SEM đặt ρ = 0 và θ = 0, SDM đặt λ = 0. Hệ số được đọc qua tác động trực tiếp, gián tiếp và tổng. Kết quả phụ thuộc W (láng giềng gần nhất, k = 4, 8, 12) và mô tả cấu trúc không gian; không thay cho thiết kế nhận dạng.")},
 {t:B("Ward difference-in-differences","Khác biệt trong khác biệt cấp phường"),k:B("H3","H3"),
  e:["ln "+I("P")+sb("iwst")+" = α"+sb("w")+" + γ"+sb("s,y(t)")+" + μ"+sb("k(i)")+" + β ("+I("Near")+sb("w")+" × "+I("Post")+sb("t")+") + δ ln "+I("A")+sb("i")+" + ε"+sb("iwst")],
  r:B("Ward fixed effects α_w, platform × year γ, housing-type μ. Near_w = 1 when the ward centre is within 1,500 m of a Line 1 station (33 wards); the threshold was fixed before estimation. β is the extra gap once the line operates, relative to when it was only expected. Clustered by ward, with a permutation test (999 draws, seed 20261102).","Hiệu ứng cố định phường α_w, nền tảng × năm γ, loại hình μ. Near_w = 1 khi tâm phường cách ga Tuyến 1 không quá 1.500 m (33 phường); ngưỡng được chọn trước khi ước lượng. β là phần chênh lệch tăng thêm khi tuyến vận hành so với khi tuyến mới là kỳ vọng. Gom cụm theo phường, kèm suy diễn hoán vị (999 lần, hạt giống 20261102).")},
 {t:B("Night-light difference-in-differences","Khác biệt trong khác biệt ánh sáng đêm"),k:B("Activity, not price","Hoạt động, không phải giá"),
  e:["ln(1 + "+I("L")+sb("pt")+") = α"+sb("p")+" + λ"+sb("t")+" + Σ"+sb("k=1")+sp("4")+" δ"+sb("k")+" · <b>1</b>["+I("p")+" ∈ "+I("R")+sb("k")+"] · "+I("Post")+sb("t")+" + ε"+sb("pt")],
  r:B("L_pt is the VIIRS radiance of pixel p in month t, with pixel and month fixed effects. Post = 1 from January 2025 (2024 is dropped); controls are pixels 2–5 km from a station. Clustered on 2-km cells, with an annual event study.","L_pt là độ chói VIIRS của pixel p tháng t, với hiệu ứng cố định pixel và tháng. Post = 1 từ 01/2025 (năm 2024 bị loại); nhóm đối chiếu là pixel cách ga 2–5 km. Gom cụm theo ô 2 km, kèm event study theo năm.")},
 {t:B("Discontinuity diagnostics","Chẩn đoán gián đoạn"),k:B("Continuity; not estimable at 1,000 m","Tính liên tục; chưa ước lượng được tại 1.000 m"),
  e:["ln "+I("P")+sb("i")+" = "+I("f")+"("+I("r")+sb("i")+") + τ"+sb("c")+" · <b>1</b>["+I("r")+sb("i")+" ≤ 0] + ε"+sb("i")+",  "+I("r")+sb("i")+" = "+I("d")+sb("i")+" − "+I("c")+",  "+I("c")+" ∈ {500, 800} m",
     "ln "+I("P")+sb("it")+" = "+I("f")+sb("0")+"("+I("r")+sb("i")+") + <b>1</b>["+I("r")+sb("i")+" ≤ 0] τ"+sb("0")+" + "+I("Post")+sb("t")+" [ "+I("f")+sb("1")+"("+I("r")+sb("i")+") + <b>1</b>["+I("r")+sb("i")+" ≤ 0] τ"+sb("1")+" ] + <b>X</b>"+sb("i")+"′γ + ε"+sb("it")+",  "+I("r")+sb("i")+" = "+I("d")+sb("i")+" − 1,000 m"],
  r:B("First line: local-linear continuity check at 500 m and 800 m, a diagnostic only. Second line: difference-in-discontinuities at the 1,000 m legal TOD boundary, Post = 1 from 28 Aug 2025; τ₁ is the change in the jump and measures the value of legal TOD status, not of the Metro. Triangular kernel, MSE-optimal bandwidth, bias-corrected robust intervals, clustered on 500-m cells.","Dòng đầu: kiểm tra liên tục cục bộ bậc một tại 500 m và 800 m, chỉ là chẩn đoán. Dòng sau: khác biệt trong gián đoạn tại ranh TOD pháp lý 1.000 m, Post = 1 từ 28/8/2025; τ₁ là thay đổi của bước nhảy và đo giá trị của tư cách pháp lý TOD, không đo tác động của Metro. Kernel tam giác, băng thông MSE tối ưu, khoảng tin cậy vững hiệu chỉnh độ chệch, gom cụm theo ô 500 m.")}
];

var VAR=[
 [B("ln P"+"ᵢ","ln Pᵢ"),B("Log asking price per m² (VND). Asking price, not transaction price.","Log giá rao trên m² (đồng). Là giá rao, không phải giá giao dịch."),"–",B("All","Mọi mô hình"),
  B(C.rosen+" (hedonic price); "+C.lewis+" (appraised prices differ from market prices); "+C.nguyen+" and "+C.gao+" (online listings).",C.rosen+" (giá hedonic); "+C.lewis+" (giá thẩm định lệch giá thị trường); "+C.nguyen+" và "+C.gao+" (tin đăng trực tuyến).")],
 [B("Rings R₁…R₄","Vành R₁…R₄"),B("Indicators for distance to the nearest station: (0, 500], (500, 800], (800, 1,200], (1,200, 2,000] m; reference > 2,000 m. Straight-line distance, UTM 48N.","Chỉ báo khoảng cách tới ga gần nhất: (0, 500], (500, 800], (800, 1.200], (1.200, 2.000] m; gốc > 2.000 m. Đường thẳng, hệ UTM 48N."),"+",B("Ring hedonic, extensions","Hedonic vành, mở rộng"),
  B(C.deb+" (quarter-mile); "+C.diao+" (600 m network distance); "+C.ang+" (a threshold cannot be assumed in advance, so radii here are conventions).",C.deb+" (¼ dặm); "+C.diao+" (600 m theo mạng đường); "+C.ang+" (không thể giả định trước ngưỡng, nên các bán kính ở đây chỉ là quy ước).")],
 [B("d800ᵢ, ln dᵢ","d800ᵢ, ln dᵢ"),B("Indicator for ≤ 800 m, and log distance to the nearest station.","Chỉ báo ≤ 800 m và log khoảng cách tới ga gần nhất."),"+ / –",B("Spatial, machine learning","Không gian, học máy"),
  B(C.alo+", "+C.muth+", "+C.mills+" (monocentric bid-rent: access is capitalised into rent); "+C.gm+" (price gradient per km from a station).",C.alo+", "+C.muth+", "+C.mills+" (tiền tô đơn tâm: tiếp cận được vốn hóa vào tiền tô); "+C.gm+" (gradient giá theo km tới ga).")],
 [B("ln Areaᵢ, type","ln Areaᵢ, loại hình"),B("Log floor or plot area; house (reference), land, apartment.","Log diện tích; nhà riêng (gốc), đất, căn hộ."),"–",B("All","Mọi mô hình"),
  B(C.rosen+". Negative for unit price because of size discounts; may be non-linear.",C.rosen+". Âm với đơn giá do chiết khấu quy mô; có thể phi tuyến.")],
 [B("Frontage, alley access","Mặt tiền phố, hẻm xe hơi"),B("0/1 dummies for street frontage and car-accessible alley.","Biến giả 0/1: mặt tiền phố, hẻm xe hơi."),"+ / –",B("All","Mọi mô hình"),
  B(C.rosen+"; "+C.tl+" (hedonic study along Line 1).",C.rosen+"; "+C.tl+" (hedonic dọc Tuyến 1).")],
 [B("Floors, road width, frontage (m), bedrooms, age, legal status","Số tầng, lộ giới, mặt tiền (m), phòng ngủ, tuổi, pháp lý"),B("Housing attributes; missing values set to 0 with a missing-value indicator, so no listing is dropped.","Thuộc tính nhà ở; giá trị thiếu đặt bằng 0 kèm chỉ báo thiếu để không loại tin."),"+ / –",B("Extended, machine learning","Mở rộng, học máy"),
  B(C.rosen+" (structural attributes as characteristics of the bundle).",C.rosen+" (thuộc tính công trình là đặc tính của gói hàng hóa).")],
 [B("ln DistCBD","ln DistCBD"),B("Log distance to the centre: Bến Thành (Ho Chi Minh City), Hồ Gươm (Hanoi). Correlation with distance to station is 0.90 in Ho Chi Minh City.","Log khoảng cách tới trung tâm: Bến Thành (TP.HCM), Hồ Gươm (Hà Nội). Tương quan với khoảng cách tới ga là 0,90 ở TP.HCM."),"–",B("Extended, machine learning","Mở rộng, học máy"),
  B(C.alo+" (rent falls with distance from the centre). It is the reason near-far comparisons are made inside one 2-km cell.",C.alo+" (tiền tô giảm theo khoảng cách tới trung tâm). Đây là lý do so sánh gần–xa được làm trong cùng một ô 2 km.")],
 [B("MLU, built-up, green share","MLU, đất xây dựng, cây xanh"),B("Land-use entropy from points of interest and OpenStreetMap, built-up and green share of the 500-m cell. Ho Chi Minh City only; MLU covers 10,348 listings (406 within 800 m). Source of the built-up and green layers: "+C.unv.en+".","Entropy sử dụng đất từ điểm quan tâm và OpenStreetMap, tỷ lệ đất xây dựng và cây xanh của ô 500 m. Chỉ TP.HCM; MLU phủ 10.348 tin (406 tin trong 800 m). Nguồn lớp đất xây dựng và cây xanh: "+C.unv.vi+"."),"+",B("Extended, interaction (H5)","Mở rộng, tương tác (H5)"),
  B(C.gao+" (mixed land use creates positive surplus, spatially uneven); "+C.pl+" (mixed use and service access in the Line 1 buffer); "+C.ec+" (land-use diversity).",C.gao+" (sử dụng hỗn hợp tạo thặng dư dương, không đều theo không gian); "+C.pl+" (sử dụng hỗn hợp và tiếp cận dịch vụ trong vùng đệm Tuyến 1); "+C.ec+" (đa dạng sử dụng đất).")],
 [B("ln PopDens, ln(1 + POI)","ln PopDens, ln(1 + POI)"),B("Log population density of the 1-km cell (WorldPop, modelled); amenities within 500 m (OpenStreetMap, Overture). Ho Chi Minh City only.","Log mật độ dân số ô 1 km (WorldPop, ước lượng mô hình); tiện ích trong 500 m (OpenStreetMap, Overture). Chỉ TP.HCM."),"+",B("Extended","Mở rộng"),
  B(C.clark+" (density gradient); "+C.tatem+" (WorldPop data); "+C.pl+" (service access). WorldPop is modelled and almost constant over time, so it is not independent of other location variables.",C.clark+" (gradient mật độ); "+C.tatem+" (dữ liệu WorldPop); "+C.pl+" (tiếp cận dịch vụ). WorldPop là ước lượng mô hình và gần như không đổi theo thời gian nên không độc lập với các biến vị trí khác.")],
 [B("ln(1 + NTL)","ln(1 + NTL)"),B("Mean VIIRS night-light radiance 2019–2023 at a pixel of about 460 m (Ho Chi Minh City).","Độ chói ánh sáng đêm VIIRS trung bình 2019–2023 tại pixel khoảng 460 m (TP.HCM)."),"+",B("Extended, night-light DiD","Mở rộng, DiD ánh sáng đêm"),
  B(C.elv+" and "+C.rom+" (the data product). Using it as a proxy for economic activity is this study’s assumption; earlier applied studies: "+C.unv.en+".",C.elv+" và "+C.rom+" (sản phẩm dữ liệu). Dùng làm thước hoạt động kinh tế là giả định của nghiên cứu này; nghiên cứu ứng dụng trước đó: "+C.unv.vi+".")],
 [B("Cell fixed effects μ_g","Hiệu ứng cố định ô μ_g"),B("2-km grid-cell fixed effects (1 km as a check); standard errors clustered on 5-km cells.","Hiệu ứng cố định ô lưới 2 km (1 km để kiểm tra); sai số chuẩn gom cụm theo ô 5 km."),"–",B("All","Mọi mô hình"),
  B(C.bdm+" (clustering when errors are correlated within groups).",C.bdm+" (gom cụm khi sai số tương quan trong nhóm).")],
 [B("Station class A/B/C/P","Lớp ga A/B/C/P"),B("Indicator that a station of that status (operating, under construction, approved, planned) lies within 800 m.","Chỉ báo có ga thuộc lớp đó (vận hành, đang xây, đã duyệt, quy hoạch) trong 800 m."),"+",B("Network extension","Mở rộng toàn mạng"),
  B("This study’s design; no earlier study cited.","Thiết kế riêng của nghiên cứu này; chưa dẫn nghiên cứu trước.")],
 [B("Postₜ, Nearᵥ × Postₜ","Postₜ, Nearᵥ × Postₜ"),B("Period indicator and the difference-in-differences interaction at ward level. For night lights, Post = 1 from January 2025.","Biến kỳ và tương tác khác biệt trong khác biệt cấp phường. Với ánh sáng đêm, Post = 1 từ 01/2025."),"+",B("Ward DiD, night-light DiD","DiD phường, DiD ánh sáng đêm"),
  B(C.gm+" (before–after design); "+C.diao+" (anticipation about a year before opening).",C.gm+" (thiết kế trước–sau); "+C.diao+" (hiệu ứng kỳ vọng khoảng một năm trước khi mở).")],
 [B("W, ρ, θ","W, ρ, θ"),B("Spatial weight matrix (k nearest neighbours), spatial lag and spatial Durbin terms.","Ma trận trọng số không gian (láng giềng gần nhất), độ trễ không gian và các số hạng Durbin."),"–",B("SAR, SEM, SDM","SAR, SEM, SDM"),
  B(C.ans+"; "+C.lsp+" (direct and indirect impacts); "+C.elh+" (model selection).",C.ans+"; "+C.lsp+" (tác động trực tiếp và gián tiếp); "+C.elh+" (chọn mô hình).")],
 [B("rᵢ = dᵢ − c","rᵢ = dᵢ − c"),B("Running variable for discontinuity checks: distance to the nearest station minus the cut-off c (500, 800 or 1,000 m).","Biến chạy cho kiểm tra gián đoạn: khoảng cách tới ga gần nhất trừ ngưỡng c (500, 800 hoặc 1.000 m)."),"–",B("RD, DiRDD","RD, DiRDD"),
  B(C.kt+" (geographic discontinuity); "+C.gnt+" (difference-in-discontinuities); "+C.cct+" (bias-corrected intervals).",C.kt+" (gián đoạn địa lý); "+C.gnt+" (khác biệt trong gián đoạn); "+C.cct+" (khoảng tin cậy hiệu chỉnh độ chệch).")],
 [B("RF, GBM, SHAP","RF, GBM, SHAP"),B("Random forest and gradient boosting on the same variables; SHAP values of ln d grouped by ring give a ring coefficient for a non-linear model.","Rừng ngẫu nhiên và tăng cường gradient trên cùng tập biến; giá trị SHAP của ln d gộp theo vành cho một hệ số vành của mô hình phi tuyến."),"–",B("Machine learning","Học máy"),
  B(C.br+" (random forest); "+C.lun+" (SHAP). SHAP describes the fitted prediction function, not a causal effect.",C.br+" (rừng ngẫu nhiên); "+C.lun+" (SHAP). SHAP mô tả hàm dự báo đã khớp, không phải tác động nhân quả.")]
];

var SRC=[
 [B("GuLand","GuLand"),B("Main sample: asking prices for sale (Ho Chi Minh City, Hanoi); project and developer records.","Mẫu chính: giá rao bán (TP.HCM, Hà Nội); hồ sơ dự án và chủ đầu tư."),B("Public listing pages. Rental pages block automated access (HTTP 403) and are not used. Developer names are not checked against legal records.","Trang tin công khai. Trang cho thuê chặn truy cập tự động (HTTP 403) nên không dùng. Tên chủ đầu tư chưa đối chiếu hồ sơ pháp lý."),"https://guland.vn/"],
 [B("Chợ Tốt","Chợ Tốt"),B("Robustness (sale, Ho Chi Minh City); rents in both cities; post-opening period of the ward DiD.","Kiểm tra độ vững (bán, TP.HCM); giá thuê hai thành phố; kỳ sau của DiD phường."),B("Public interface, slow requests, stops at HTTP 403 or 429. Not pooled into the main sample because many listings share coordinates.","Giao diện công khai, nhịp chậm, dừng khi gặp HTTP 403 hoặc 429. Không gộp vào mẫu chính vì nhiều tin dùng chung tọa độ."),"https://www.chotot.com/"],
 [B("Mogi","Mogi"),B("Pre- and post-opening pages for the ward DiD.","Trang trước và sau mở tuyến cho DiD phường."),B("Read from archived pages (2019–2024) and 2025–2026 captures.","Đọc từ trang lưu (2019–2024) và bản chụp 2025–2026."),"https://mogi.vn/"],
 [B("Batdongsan.com.vn","Batdongsan.com.vn"),B("Pre-opening pages for the ward DiD only.","Chỉ dùng trang trước mở tuyến cho DiD phường."),B("Blocked to live collection (Cloudflare); only archived copies are read.","Bị chặn khi thu trực tiếp (Cloudflare); chỉ đọc bản đã lưu."),"https://batdongsan.com.vn/"],
 [B("Wayback Machine (Internet Archive)","Wayback Machine (Internet Archive)"),B("Archived listing pages 2019–2024: 2,150 listings matched to old wards form the pre-opening period.","Trang tin rao đã lưu 2019–2024: 2.150 tin khớp phường cũ tạo thành kỳ trước mở tuyến."),B("Date is the date the page was archived, not the posting date. Most listings have no coordinates, so the unit is the ward.","Ngày là ngày trang được lưu, không phải ngày đăng. Phần lớn tin không có tọa độ nên đơn vị là phường."),"https://web.archive.org/"],
 [B("Metro station coordinates","Tọa độ ga metro"),B("Distance to the nearest station: 14 Line 1 stations; 293-station network in four status classes.","Khoảng cách tới ga gần nhất: 14 ga Tuyến 1; mạng 293 ga theo bốn lớp tình trạng."),B("Line 1 coordinates checked. Under-construction and planned stations are approximate digitisations (median offset about 120 m). Hanoi Lines 2A and 3 come from OpenStreetMap, unverified.","Tọa độ Tuyến 1 đã đối chiếu. Ga đang xây và quy hoạch là bản số hóa xấp xỉ (lệch trung vị khoảng 120 m). Tuyến 2A và 3 Hà Nội lấy từ OpenStreetMap, chưa xác minh."),""],
 [B("NASA Black Marble, VIIRS VNP46A3","NASA Black Marble, VIIRS VNP46A3"),B("Night-light difference-in-differences and the NTL variable.","DiD ánh sáng đêm và biến NTL."),B("Monthly composites, 92 months from January 2019 to August 2026, about 460 m; twelve months with more than 5% of cells missing are excluded.","Tổng hợp tháng, 92 tháng từ 01/2019 đến 08/2026, khoảng 460 m; mười hai tháng thiếu quá 5% ô bị loại."),"https://blackmarble.gsfc.nasa.gov/"],
 [B("WorldPop","WorldPop"),B("Population density (1-km cell) and the population maps.","Mật độ dân số (ô 1 km) và các bản đồ dân số."),B("Constrained 100-m counts, release R2025A. A modelled estimate, not a census; nearly constant over time.","Số liệu 100 m có ràng buộc, bản R2025A. Là ước lượng mô hình, không phải điều tra; gần như không đổi theo thời gian."),"https://www.worldpop.org/"],
 [B("OpenStreetMap","OpenStreetMap"),B("Amenities, Hanoi stations, geocoding (Nominatim).","Tiện ích, ga Hà Nội, định vị địa chỉ (Nominatim)."),B("Volunteer-edited map data; completeness varies by area.","Dữ liệu bản đồ do cộng đồng biên tập; độ đầy đủ khác nhau theo khu vực."),"https://www.openstreetmap.org/"],
 [B("Overture Maps","Overture Maps"),B("Points of interest for amenity counts and the land-use-mix index.","Điểm quan tâm cho số tiện ích và chỉ số sử dụng đất hỗn hợp."),B("Place records from several providers; coverage and category quality differ by area.","Bản ghi địa điểm từ nhiều nhà cung cấp; độ phủ và chất lượng danh mục khác nhau theo khu vực."),"https://overturemaps.org/"],
 [B("GADM 4.1","GADM 4.1"),B("Administrative boundaries for wards, districts and maps.","Ranh giới hành chính cho phường, quận và bản đồ."),B("Boundaries are older than the 2025 ward mergers; listings are matched to old wards.","Ranh giới có trước đợt sáp nhập phường 2025; tin được khớp với phường cũ."),"https://gadm.org/"]
];

function esc(s){return s}
function render(){
 var el=document.getElementById("methx");if(!el)return;var L=Lg(),h="";
 h+="<h3>"+TXT.dh[L]+"</h3><p>"+TXT.dp[L]+"</p><div class=\"rqs\">"+DESIGN.map(function(d){return"<div class=\"rq\"><small>"+d.k[L]+"</small><b>"+d.t[L]+"</b><p>"+d.p[L]+"</p></div>"}).join("")+"</div>";
 h+="<h3>"+TXT.mh[L]+"</h3><p>"+TXT.mp[L]+"</p><div class=\"eqs\">"+EQ.map(function(q){return"<div class=\"eqc\"><div class=\"eqh\"><b>"+q.t[L]+"</b><small>"+q.k[L]+"</small></div>"+q.e.map(function(x){return"<div class=\"eq\" role=\"math\">"+x+"</div>"}).join("")+"<p>"+q.r[L]+"</p></div>"}).join("")+"</div>";
 h+="<h3>"+TXT.vh[L]+"</h3><p>"+TXT.vp[L]+"</p><div class=\"tw vt\"><table><thead><tr>"+TXT.th.map(function(x){return"<th>"+x[L]+"</th>"}).join("")+"</tr></thead><tbody>"+VAR.map(function(r){return"<tr><td><b>"+r[0][L]+"</b></td><td>"+r[1][L]+"</td><td class=\"sg\">"+r[2]+"</td><td>"+r[3][L]+"</td><td>"+r[4][L]+"</td></tr>"}).join("")+"</tbody></table></div>";
 h+="<h3>"+TXT.sh[L]+"</h3><p>"+TXT.sp[L]+"</p><div class=\"tw vt\"><table><thead><tr>"+TXT.sth.map(function(x){return"<th>"+x[L]+"</th>"}).join("")+"</tr></thead><tbody>"+SRC.map(function(r){return"<tr><td><b>"+r[0][L]+"</b></td><td>"+r[1][L]+"</td><td>"+r[2][L]+"</td><td>"+(r[3]?"<a href=\""+r[3]+"\" target=\"_blank\" rel=\"noopener\">"+r[3].replace(/^https?:\/\/(www\.)?/,"").replace(/\/$/,"")+"</a>":"–")+"</td></tr>"}).join("")+"</tbody></table></div>";
 h+="<p class=\"sub\">"+TXT.note[L]+"</p>";
 el.innerHTML=h;
}
render();
var lb=document.getElementById("lang");if(lb)lb.addEventListener("click",function(){setTimeout(render,60)});
})();
