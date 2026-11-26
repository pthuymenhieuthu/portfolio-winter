// Luật kiểm vị trí của yêu cầu tuyển dụng, theo BE (RequirementRules): mỗi vị trí bắt buộc đối tượng, chuyên khoa, cấp, số lượng.
(function () {
  const MAX_POS = 10, MAX_QTY = 100, MAX_EXP = 50, MAX_SAL = 500000000; // trần theo BE; MAX_POS tính cả vị trí đã ngừng tuyển
  const norm = (s) => String(s || '').trim().toLowerCase();
  const label = (p, i) => (p.title && p.title.trim()) || 'Vị trí ' + (i + 1);
  function validate(pos) {
    const e = {}, miss = [], many = pos.length > 1, put = (i, k, msg, tag) => { e['p' + i + '.' + k] = msg; if (tag) miss.push((many ? label(pos[i], i) + ': ' : '') + tag); };
    pos.forEach((p, i) => {
      if (!p.group) put(i, 'group', 'Chọn đối tượng ứng viên.', 'Đối tượng');
      if (!p.spec) put(i, 'spec', 'Chọn chuyên khoa.', 'Chuyên khoa');
      if (!p.level) put(i, 'level', 'Chọn cấp vị trí.', 'Cấp vị trí');
      const q = parseInt(p.qty, 10);
      if (!(q >= 1 && q <= MAX_QTY)) put(i, 'qty', 'Số lượng phải từ 1 đến ' + MAX_QTY + '.', 'Số lượng');
      if (p.smin && p.smax && +p.smin > +p.smax) put(i, 'smax', 'Mức lương "từ" không được lớn hơn mức lương "đến".');
      else if (+p.smax > MAX_SAL || +p.smin > MAX_SAL) put(i, 'smax', 'Mức lương tối đa ' + MAX_SAL.toLocaleString('vi-VN') + ' VND.');
      if (p.due && !/^\d{2}\/\d{2}\/\d{4}$/.test(p.due)) put(i, 'due', 'Nhập ngày dạng dd/mm/yyyy.');
      if (p.exp !== '' && !(Number.isInteger(+p.exp) && +p.exp >= 0 && +p.exp <= MAX_EXP)) put(i, 'exp', 'Kinh nghiệm phải là số nguyên từ 0 đến ' + MAX_EXP + '.');
    });
    // ERR-REQ-46: trùng tên, hoặc trùng cả đối tượng, chuyên khoa, cấp, khoa/phòng
    const key = (p) => [p.group, p.spec, p.level, norm(p.dept)].join('|');
    pos.forEach((p, i) => {
      const dup = pos.slice(0, i).some((o) => (norm(p.title) && norm(o.title) === norm(p.title)) || (p.group && p.spec && p.level && key(o) === key(p)));
      if (dup) put(i, 'dup', 'Vị trí này trùng với một vị trí khác trong yêu cầu (ERR-REQ-46).', 'Trùng vị trí');
    });
    return { e, miss };
  }
  const api = { MAX_POS, MAX_QTY, validate, label, tooMany: (n) => n >= MAX_POS, tooManyMsg: 'Một yêu cầu tối đa ' + MAX_POS + ' vị trí (ERR-REQ-45).' };
  (typeof window !== 'undefined' ? window : globalThis).MedPos = api;
})();
