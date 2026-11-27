// The live English UI still receives some benefit labels in Vietnamese from
// its product catalogue. Translate display labels without changing identifiers.
const labels: Record<string, string> = {
  "Gói có mức bảo vệ tai nạn và nội trú rất cao, phù hợp nhu cầu ưu tiên bảo vệ toàn diện cho người thường xuyên di chuyển và cần hạn mức điều trị lớn tại bệnh viện tư.": "High accident and inpatient coverage limits for people who travel frequently and need higher limits at private hospitals.",
  "Gói nổi bật với hạn mức nội trú cao và có thêm quyền lợi tử vong do bệnh trong điều khoản chính, phù hợp khách hàng ưu tiên bảo vệ sức khỏe dài hạn.": "High inpatient limits, with death due to illness included in the core benefits, for customers prioritizing long-term health coverage.",
  "Gói có hạn mức nội trú và bảo vệ do bệnh rất cao, phù hợp người cần phạm vi bảo hiểm rộng và chú trọng chăm sóc sức khỏe toàn diện.": "High inpatient and illness coverage limits for people seeking broad health coverage.",
  "Trợ cấp mất giấy tờ tùy thân, hợp đồng vay vốn, thẻ ngân hàng do nguyên nhân: trộm, cướp, thiên tai": "Allowance for identity documents, loan contracts or bank cards lost due to theft, robbery or natural disasters",
  "Tử vong, thương tật do bệnh/ốm đau": "Death and disability due to illness",
  "Điều trị nội trú, Phẫu thuật do Bệnh": "Inpatient care and surgery due to illness",
  "Tử vong/thương tật do tai nạn": "Accidental death and disability",
  "Chi phí y tế do tai nạn": "Accident medical expenses",
  "QUYỀN LỢI BẢO HIỂM CHÍNH": "CORE INSURANCE BENEFITS",
  "Chi tiết bệnh hiểm nghèo": "Critical illness details",
  "Chi tiết ngoại trú": "Outpatient care details",
  "Chi tiết nha khoa": "Dental care details",
  "Chi tiết thai sản": "Maternity care details",
  "Ngoại trú tối đa": "Outpatient limit",
  "Nha khoa tối đa": "Dental care limit",
  "Thai sản tối đa": "Maternity limit",
  "Sinh thường, sinh mổ và biến chứng thai sản": "Vaginal delivery, Caesarean section and pregnancy complications",
  "Áp dụng cho nữ từ 19–50 tuổi": "For women aged 19–50",
  "Áp dụng từ gói B.3 trở lên": "Available from plan B.3 and above",
  "Tối đa 10 lần khám/năm": "Up to 10 visits per year",
  "Tối đa 15 lần khám/năm": "Up to 15 visits per year",
  "Khám nha khoa tối đa 5 lần/năm": "Up to 5 dental visits per year",
  "Khám nha khoa tối đa 5 lần": "Up to 5 dental visits",
  "Không bao gồm": "Not included",
  "Chưa bao gồm": "Not included",
  "Có thể thêm": "Optional add-on",
  "Có sẵn": "Included",
  "Điểm đánh giá": "Rating",
  "Mua ngay": "Buy now",
  "NGOẠI TRÚ": "OUTPATIENT CARE",
  "NHA KHOA": "DENTAL CARE",
  "BỆNH HIỂM NGHÈO": "CRITICAL ILLNESS",
  "THAI SẢN": "MATERNITY CARE",
  "KIM CƯƠNG": "DIAMOND",
  "Kim Cương": "Diamond",
  "BẠCH KIM": "PLATINUM",
  "Bạch Kim": "Platinum",
  "/năm": "/year",
  "/lần": "/visit",
  "Tử vong và thương tật vĩnh viễn do ốm đau, bệnh tật": "Death and permanent disability due to illness",
  "Tử vong và thương tật do tai nạn": "Accidental death and disability",
  "Điều trị nội trú": "Inpatient care",
  "Chọn tất cả": "Select all",
  "Bệnh hiểm nghèo": "Critical illness",
  "Ngoại trú": "Outpatient care",
  "Nha khoa": "Dental care",
  "Thai sản": "Maternity care",
};

export function affinaPreviewEnglish(text: string): string {
  // Public product responses can contain live checkout credentials in links.
  // End the portfolio interaction at comparison; do not expose checkout URLs.
  text = text.replace(/href=(['"])[^'"]*loginToken=[^'"]*\1/gi, 'aria-disabled="true" tabindex="-1"');
  text = text.replace(/([?&])(?:amp;)?(?:loginToken|checksum|customerId|saleId)=[^&"'<>\s\\]*/gi, "$1");
  for (const [original, english] of Object.entries(labels)) {
    text = text.replaceAll(`${original} là gì?`, `About ${english.toLowerCase()}`);
    text = text.replaceAll(original, english);
  }
  return text;
}

export function translateAffinaCatalogue(value: unknown): unknown {
  if (typeof value === "string") return affinaPreviewEnglish(value);
  if (Array.isArray(value)) return value.map(translateAffinaCatalogue);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).filter(([key]) => !/^(?:pricesDebug|loginToken|accessToken|authToken|checksum)$/i.test(key)).map(([key, entry]) => [key, translateAffinaCatalogue(entry)]));
  return value;
}
