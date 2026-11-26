// Mô tả bộ lọc cho thành phần FilterBar (nút Lọc + bảng chọn + chip), theo code gốc: sửa nháp trong bảng, bấm Áp dụng mới lọc.
// field: nhiều giá trị (state[key] là mảng) hoặc single = chỉ một giá trị; dateField: khoảng ngày (state[key] = { from, to } dạng dd/mm/yyyy).
(function (root) {
  const dmy = (s) => { const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s || ''); if (!m) return null; const d = new Date(+m[3], +m[2] - 1, +m[1]); return d.getFullYear() === +m[3] && d.getMonth() === +m[2] - 1 && d.getDate() === +m[1] ? d.getTime() : null; };
  const iso = (s) => { const t = dmy(s); if (t == null) return ''; const d = new Date(t); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const fromIso = (v) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || ''); return m ? m[3] + '/' + m[2] + '/' + m[1] : ''; };
  root.MedFilter = {
    field: (key, label, opts, sel, o = {}) => ({ key, label, opts, sel: sel || [], single: !!o.single, extra: o.extra || {} }),
    dateField: (key, label, sel, o = {}) => ({ key, label, date: true, sel: sel || { from: '', to: '' }, extra: o.extra || {}, presets: o.presets || [], fromLabel: o.fromLabel || label + ' từ', toLabel: o.toLabel || 'Đến ngày' }),
    parseDmy: dmy,
    // Gõ số thì tự chèn dấu / để ra dd/mm/yyyy
    maskDmy(raw) { const d = String(raw).replace(/\D/g, '').slice(0, 8); return d.length > 4 ? d.slice(0, 2) + '/' + d.slice(2, 4) + '/' + d.slice(4) : d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d; },
    // Khoảng ngày để lọc: from/to theo mili giây (to tính hết ngày); bad khi ngày sai hoặc ngược thứ tự
    span(v) { const f = dmy(v && v.from), t = dmy(v && v.to); return { from: f, to: t == null ? null : t + 864e5 - 1, bad: !!(v && ((v.from || '').length === 10 && f == null || (v.to || '').length === 10 && t == null || f != null && t != null && f > t)) }; },
    // Hai ô ngày: gõ tay hoặc chọn bằng lịch của trình duyệt (input date ẩn đặt trên icon)
    dateFields(v, set) {
      const MF = root.MedFilter, sp = MF.span(v);
      const side = (key) => ({ v: v[key], iso: iso(v[key]), onInput: (e) => set({ [key]: MF.maskDmy(e.target.value) }), pick: (e) => set({ [key]: fromIso(e.target.value) }) });
      const err = sp.bad ? ((v.from.length === 10 && sp.from == null) || (v.to.length === 10 && dmy(v.to) == null) ? 'Ngày không hợp lệ, nhập dạng dd/mm/yyyy.' : 'Ngày bắt đầu phải trước hoặc bằng ngày kết thúc.') : '';
      return { from: side('from'), to: side('to'), hasErr: !!err, dateErr: err };
    },
    has: (sel, v) => !sel.length || sel.includes(v),
    any: (sel, vals) => !sel.length || vals.some((v) => sel.includes(v)),
  };
})(window);

// Phân trang dùng chung cho mọi bảng: 10 dòng một trang (BA Zev), chân bảng ghi "1–10 / 13 <đơn vị>" kèm dãy số trang.
(function (root) {
  const SIZE = 10;
  root.MedPage = {
    SIZE,
    // Trang hiện tại được kẹp lại để khi lọc ra ít dòng hơn thì không đứng ở trang không còn dòng nào
    view(all, page, unit) {
      const pages = Math.max(Math.ceil(all.length / SIZE), 1), p = Math.min(Math.max(page || 0, 0), pages - 1), rows = all.slice(p * SIZE, p * SIZE + SIZE);
      return { rows, page: p, pages, noPrev: p === 0, noNext: p >= pages - 1, footer: all.length ? (p * SIZE + 1) + '–' + (p * SIZE + rows.length) + ' / ' + all.length + ' ' + unit : '0 ' + unit };
    },
    // Dãy nút số trang: mũi tên, các số (quá 7 trang thì rút gọn bằng dấu ba chấm quanh trang hiện tại), mũi tên. host là component, key là khoá state chứa số trang
    pager(host, v, key = 'page') {
      const n = v.pages, p = v.page, go = (i) => () => host.setState({ [key]: i });
      const btn = (label, i, off, aria, cur) => ({ label, cls: 'pg' + (cur ? ' cur' : ''), off, aria, cur: cur ? 'page' : 'false', go: go(i) });
      const gap = () => ({ label: '…', cls: 'pg gap', off: true, aria: '', cur: 'false', go: () => {} });
      const items = [btn('‹', p - 1, p === 0, 'Trang trước', false)], num = (i) => items.push(btn(String(i + 1), i, false, 'Trang ' + (i + 1), i === p));
      if (n <= 7) { for (let i = 0; i < n; i++) num(i); }
      else { num(0); if (p > 2) items.push(gap()); for (let i = Math.max(1, p - 1); i <= Math.min(n - 2, p + 1); i++) num(i); if (p < n - 3) items.push(gap()); num(n - 1); }
      items.push(btn('›', p + 1, p >= n - 1, 'Trang sau', false));
      return items;
    },
  };
})(window);
