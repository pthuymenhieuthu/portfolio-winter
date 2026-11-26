// Danh mục dùng chung cho form khách hàng và màn nhập danh sách (M2: Nhóm khách hàng 6 mục có Khác; Nguồn chọn tay 2 mục, 'Tự đăng ký trên cổng' là mục hệ thống nên không cho chọn)
(function () {
  const GROUPS = ['Bệnh viện', 'Phòng khám đa khoa, chuyên khoa', 'Viện dưỡng lão', 'Phòng y tế công ty', 'Công ty dược', 'Khác'];
  const SOURCES = ['Đối tác giới thiệu', 'Khác'];
  const PROV = { 'Hồ Chí Minh': ['Phường Sài Gòn', 'Phường Tân Định', 'Phường Bến Thành', 'Phường Cầu Ông Lãnh', 'Phường Diên Hồng'], 'Hà Nội': ['Phường Hoàn Kiếm', 'Phường Cửa Nam', 'Phường Ba Đình', 'Phường Hai Bà Trưng', 'Phường Cầu Giấy'], 'Đà Nẵng': ['Phường Hải Châu', 'Phường Thanh Khê', 'Phường Hòa Cường', 'Phường Sơn Trà'], 'Cần Thơ': ['Phường Ninh Kiều', 'Phường Cái Khế', 'Phường Bình Thủy'], 'Hải Phòng': ['Phường Hồng Bàng', 'Phường Ngô Quyền', 'Phường Lê Chân'] };
  // Chi nhánh có sẵn của khách hàng mẫu (theo tên khách hàng); Main gán id và trạng thái khi dùng
  const BRANCHES = { 'Bệnh viện Đa khoa Phương Nam': [{ name: 'Chi nhánh Quận 7', address: '105 Tôn Dật Tiên', province: 'Hồ Chí Minh', ward: 'Phường Tân Định' }, { name: 'Chi nhánh Thủ Đức', address: '20 Võ Văn Ngân', province: 'Hồ Chí Minh', ward: 'Phường Bến Thành' }], 'Bệnh viện An Khang': [{ name: 'Chi nhánh Quận 7', address: '105 Tôn Dật Tiên', province: 'Hồ Chí Minh', ward: 'Phường Tân Định' }] };
  // Chữ hiện ở mục Khác để người dùng biết nên chọn khi nào (giá trị lưu vẫn là 'Khác'); ví dụ do prototype đặt, chưa có trong docs
  const OTHER_LABEL = { group: 'Khác (ví dụ: trung tâm y khoa, phòng xét nghiệm, nhà thuốc)', source: 'Khác (ví dụ: sự kiện, mạng xã hội, khách tự tìm đến)' };
  const optLabel = (kind, v) => (v === 'Khác' ? OTHER_LABEL[kind] : v);
  const PHONE = /^\+?\d{10,15}$/, MAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/; // điện thoại từ 10 chữ số; để trống thì thôi, đã nhập thì phải đủ
  // Ô điện thoại chỉ nhận chữ số: ký tự khác bị bỏ ngay lúc gõ và hiện nhắc ngắn (rejected = có ký tự bị bỏ); tối đa 15 chữ số theo PHONE
  const PHONE_WARN = 'Chỉ nhập số, không nhập chữ hoặc ký tự khác.';
  const phoneInput = (raw) => { const s = String(raw || ''); return { value: s.replace(/\D/g, '').slice(0, 15), rejected: /\D/.test(s) }; };
  const digits = (v) => String(v || '').replace(/[\s.()-]/g, '');
  // 34 tỉnh/thành của danh mục (medhunt-masterdata-defaults.yml, PROVINCE): bộ lọc luôn đủ danh sách dù khách hàng hiện có chỉ ở vài nơi
const PROVINCES = ["Hà Nội", "Cao Bằng", "Tuyên Quang", "Điện Biên", "Lai Châu", "Sơn La", "Lào Cai", "Thái Nguyên", "Lạng Sơn", "Quảng Ninh", "Bắc Ninh", "Phú Thọ", "Hải Phòng", "Hưng Yên", "Ninh Bình", "Thanh Hóa", "Nghệ An", "Hà Tĩnh", "Quảng Trị", "Huế", "Đà Nẵng", "Quảng Ngãi", "Gia Lai", "Khánh Hòa", "Đắk Lắk", "Lâm Đồng", "Đồng Nai", "Hồ Chí Minh", "Tây Ninh", "Đồng Tháp", "Vĩnh Long", "An Giang", "Cần Thơ", "Cà Mau"];
(typeof window !== 'undefined' ? window : globalThis).MedClient = { PROVINCES, GROUPS, SOURCES, optLabel, phoneInput, PHONE_WARN, BRANCHES, PROV, PHONE, MAIL, digits };
})();
