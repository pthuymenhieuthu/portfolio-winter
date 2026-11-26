// Dữ liệu cho Trang tổng quan và Việc của tôi, dựng từ state của Main (ca, lịch, phí, khách hàng). Số liệu là mẫu của prototype.
(function (root) {
  const DAY = 864e5;
  // Nguồn ứng viên là danh mục tuỳ chọn (module 02 B2.2, module 05 ô Nguồn): hồ sơ chưa chọn nguồn gom vào "Khác"
  const OTHER_SOURCE = 'Khác';
  const OTHER_SOURCE_INFO = {
    title: 'Nguồn “Khác”',
    note: 'Hồ sơ chưa chọn nguồn. Ô Nguồn khi nhập hồ sơ là tuỳ chọn, nên các hồ sơ để trống được gom vào đây.',
    head: 'Các nguồn trong danh mục',
    list: ['Trang tuyển dụng online', 'Mạng xã hội', 'Website bệnh viện, phòng khám', 'Công ty săn đầu người', 'Trung tâm dịch vụ việc làm', 'Trường đại học y dược, cao đẳng điều dưỡng', 'Ngày hội việc làm', 'Hiệp hội chuyên môn', 'Đào tạo người thực tập, nội trú', 'Nhân viên từ các cơ sở khác', 'Chuyên gia trong ngành giới thiệu', 'Tự đăng ký trên cổng'],
  };
  const STAGES = ['Đã gửi', 'Phỏng vấn', 'Đạt phỏng vấn', 'Đã offer', 'Chờ thử việc', 'Thử việc', 'Bảo hành', 'Kết thúc bảo hành', 'Kết thúc giữa chừng']; // đúng 9 cột của Kanban ca tuyển (CasesList.L)
  const IC = {
    alert: 'M12 9v4m0 4h.01M10.3 3.6 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z',
    clock: 'M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z',
    phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.1 8.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 15.86v1.06Z',
    cal: 'M8 2v3m8-3v3M3.5 9h17M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
    file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6M8 13h8m-8 4h6',
    shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm-3-10 2 2 4-4',
    offer: 'M4 7h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Zm5 0V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2',
  };
  // Mỗi loại việc: nhãn loại, tên hành động (tiêu đề dòng việc phải là việc cần làm, không phải tên ứng viên), icon
  const KIND = {
    wait: ['Chờ KH phản hồi', 'Theo dõi khách phản hồi hồ sơ', 'clock'], iv: ['Phỏng vấn', 'Chuẩn bị buổi phỏng vấn', 'cal'], offer: ['Offer sắp hết hạn', 'Nhắc ứng viên trả lời offer', 'offer'],
    start: ['Ngày đi làm', 'Xác nhận ngày đi làm', 'file'], prob: ['Hết thử việc', 'Chốt kết quả thử việc', 'shield'], war: ['Mốc bảo hành', 'Kiểm tra mốc bảo hành', 'shield'],
    call: ['Liên hệ lại ứng viên', 'Gọi lại ứng viên', 'phone'], sign: ['Chờ ký hợp đồng', 'Theo dõi khách ký hợp đồng', 'file'], cchn: ['CCHN sắp hết hạn', 'Nhắc gia hạn chứng chỉ hành nghề', 'alert'],
  };
  const CASE_KIND = { 3: 'offer', 4: 'start', 5: 'prob', 6: 'war' };
  const day = (text, today) => { const m = /(\d{2})\/(\d{2})(?:\/(\d{4}))?/.exec(text || ''); return m ? Math.round((new Date(m[3] ? +m[3] : today.getFullYear(), +m[2] - 1, +m[1]) - today) / DAY) : null; };
  const compact = (n) => (n >= 1e9 ? (n / 1e9).toFixed(1).replace('.', ',').replace(',0', '') + ' tỷ' : n >= 1e6 ? (n / 1e6).toFixed(1).replace('.', ',').replace(',0', '') + ' triệu' : n.toLocaleString('vi-VN') + ' đ');
  const money = (n) => n.toLocaleString('vi-VN') + ' đ';

  function work(c) {
    const [d, m, y] = c.simDay.split('/').map(Number), today = new Date(y, m - 1, d), out = [], reqOf = (code) => c.requests.find((r) => r.code === code) || {};
    const add = (kind, o) => { const [label, action, icon] = KIND[kind], days = o.days;
      out.push({ id: kind + '-' + o.key, kind, kindLabel: label, action, iconPath: IC[icon], subject: o.subject, meta: o.meta, owner: o.owner || 'Lan Phạm', days,
        bucket: o.late || days < 0 ? 'late' : days === 0 ? 'today' : 'soon', dueLabel: o.dueLabel || (days < 0 ? 'quá ' + -days + ' ngày' : days === 0 ? 'hôm nay' : 'còn ' + days + ' ngày'), go: o.go }); };
    c.caseRows.forEach((k) => {
      const rq = reqOf(k.req), base = { key: k.id, subject: k.name, owner: rq.owner, go: c.nav({ page: 'case', kcase: k.id }) }, pos = (k.pos || rq.title || '') + ' · ' + k.id;
      if (k.stage === 0 && k.late) add('wait', { ...base, meta: pos + ' · gửi ' + k.sent, days: -Math.max(1, Math.round((today - new Date(+k.sent.slice(6), +k.sent.slice(3, 5) - 1, +k.sent.slice(0, 2))) / DAY)), late: true, dueLabel: 'chờ ' + Math.max(1, Math.round((today - new Date(+k.sent.slice(6), +k.sent.slice(3, 5) - 1, +k.sent.slice(0, 2))) / DAY)) + ' ngày' });
      else if (CASE_KIND[k.stage]) { const n = day(k.due, today); if (n !== null) add(CASE_KIND[k.stage], { ...base, meta: pos + ' · ' + k.due, days: n }); }
    });
    c.ivs.filter((v) => v.status === 'SCHEDULED' || v.status === 'RESCHEDULED').forEach((v) => { const k = c.caseRows.find((x) => x.id === v.caseId) || {}, n = day(v.at, today);
      if (n !== null) add('iv', { key: v.id, subject: k.name || v.caseId, owner: reqOf(k.req).owner, meta: 'Vòng ' + v.round + ' · ' + v.at + ' · ' + (v.mode || ''), days: n, go: c.nav({ page: 'case', kcase: v.caseId }) }); });
    c.callbacks.forEach((u) => add('call', { key: u.id, subject: u.name, meta: u.spec + ' · ' + u.place, days: 0, go: c.nav({ page: 'cand', cand: u.id }) }));
    c.requests.filter((r) => c.contracts[r.code] && !c.contracts[r.code].signed && !['CLOSED', 'CANCELLED', 'DRAFT'].includes(r.status))
      .forEach((r) => add('sign', { key: r.code, subject: r.client, owner: r.owner, meta: r.title + ' · ' + r.code, days: 0, go: c.nav({ page: 'detail', code: r.code, tab: 'tien-trinh' }) }));
    c.cands.filter((u) => u.cchn === 'Sắp hết hạn').forEach((u) => add('cchn', { key: u.id, subject: u.name, meta: u.spec + ' · ' + u.place, days: 60, dueLabel: 'còn tối đa 60 ngày', go: c.nav({ page: 'cand', cand: u.id }) }));
    return out.map((t) => ({ ...t, mine: t.owner === c.actorId }));
  }

  // Cơ cấu phí để vẽ biểu đồ tròn + chú thích: đã thu, còn trong hạn, quá hạn trên tổng phí đã phát sinh
  // Màu chuyển dọc (đậm ở trên, nhạt ở dưới) cho các cung biểu đồ tròn, cùng kiểu cột ở Sổ phí; gradient định nghĩa trong từng svg
  const FILL = { '--chart-1': 'url(#fgA)', '--chart-2': 'url(#fgB)', '--danger': 'url(#fgC)' };
  function feeRing(L) {
    const insts = L.flatMap((r) => r.insts || []), sum = (k) => L.reduce((s, r) => s + r[k], 0), charged = sum('chargedN'), paid = sum('paidN'), left = sum('leftN');
    const over = insts.filter((i) => i.status === 'overdue'), overN = over.reduce((a, i) => a + i.leftN, 0);
    const soon = insts.filter((i) => i.leftN > 0 && i.days !== null && i.days >= 0 && i.days <= 7).reduce((a, i) => a + i.leftN, 0), pct = (n) => (charged ? Math.round(n / charged * 100) : 0);
    const parts = [['Đã thu', paid, '--chart-1'], ['Còn trong hạn', left - overN, '--chart-2'], ['Quá hạn', overN, '--danger']]; let off = 25;
    const segs = parts.filter((x) => x[1] > 0 && charged).map(([, v, c]) => { const p = v / charged * 100, g = { color: 'var(' + c + ')', fill: FILL[c], dash: p + ' ' + (100 - p), off }; off -= p; return g; });
    const hints = [pct(paid) + '% tổng phí · ' + L.length + ' ca có phí', pct(left - overN) + '% tổng phí · 7 ngày tới: ' + compact(soon), over.length + ' đợt quá hạn · ' + pct(overN) + '% tổng phí'], tot = compact(charged).split(' ');
    return { segs, totalNum: tot[0], totalUnit: tot.slice(1).join(' '), rows: parts.map(([label, v, c], k) => ({ label, value: compact(v), hint: hints[k], style: '--tone:var(' + c + ')', cls: c === '--danger' && v > 0 ? 'bad' : '' })) };
  }

  function donut(parts) {
    const total = parts.reduce((a, p) => a + p.v, 0); let off = 25;
    const segs = total ? parts.filter((p) => p.v > 0).map((p) => { const pct = p.v / total * 100, s = { dash: pct + ' ' + (100 - pct), off, color: p.color, fill: FILL[p.color.slice(4, -1)] || p.color }; off -= pct; return s; }) : [{ dash: '100 0', off: 25, color: 'var(--line)', fill: 'var(--line)' }];
    return { segs, legend: parts.map((p) => ({ label: p.label, value: compact(p.v), color: p.color })) };
  }

  // Màu nhấn thẻ số: mọi thẻ cùng xanh dương thương hiệu (theo thẻ số của code gốc, không phân màu theo vị trí)
  const statTone = () => '--brand';
  const PERIODS = [[3, '3 tháng'], [6, '6 tháng'], [12, '12 tháng'], [0, 'Tất cả']];
  // Khoảng N tháng quanh hôm nay, bắt đầu từ tháng (hôm nay − N/2): 6 tháng = T-3..T+2, vì sổ phí có cả đợt sắp tới nên không chốt ở tháng hiện tại. N=0 là từ tháng hạn sớm nhất đến muộn nhất.
  // Chỉ tính đợt có hạn trong khoảng (đợt chưa có hạn và ca chưa chia đợt chỉ vào "Tất cả"), nên tổng khớp với tổng các cột ở Sổ phí.
  function periodLedger(L, N, today) {
    const pd = (t) => { const m = /^(\d{2})\/(\d{2})\/(\d{4})/.exec(t || ''); return m ? new Date(+m[3], +m[2] - 1, +m[1]) : null; }, mk = (d) => d.getFullYear() * 12 + d.getMonth();
    const dk = L.flatMap((r) => r.insts || []).filter((i) => pd(i.due)).map((i) => mk(pd(i.due))), tk = mk(pd(today) || new Date());
    const lo = N ? tk - Math.floor(N / 2) : Math.min(...dk), hi = N ? lo + N - 1 : Math.max(...dk), sumK = (a, k) => a.reduce((t, i) => t + i[k], 0);
    const inP = (i) => { const d = pd(i.due); return !!d && mk(d) >= lo && mk(d) <= hi; };
    const ledger = N ? L.map((r) => ({ ...r, insts: (r.insts || []).filter(inP) })).filter((r) => r.insts.length).map((r) => ({ ...r, chargedN: sumK(r.insts, 'expectedN'), paidN: sumK(r.insts, 'paidN'), leftN: sumK(r.insts, 'leftN') })) : L;
    return { ledger, lo, hi, hasDue: dk.length > 0 };
  }
  // Thẻ phí nhỏ (vòng tròn + chú thích) của quản trị
  function feeCard(L) {
    const sum = (f) => L.reduce((a, l) => a + f(l), 0), left = sum((l) => l.leftN), paid = sum((l) => l.paidN), over = sum((l) => (l.insts || []).filter((i) => i.status === 'overdue').reduce((a, i) => a + i.leftN, 0));
    return { value: compact(left), full: money(left), ...donut([{ label: 'Đã thu', v: paid, color: 'var(--chart-1)' }, { label: 'Còn trong hạn', v: left - over, color: 'var(--chart-2)' }, { label: 'Quá hạn', v: over, color: 'var(--danger)' }]) };
  }

  // Mọi việc quá hạn dùng cùng một biểu tượng đồng hồ, bất kể loại việc
  const CLOCK = 'M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z';
  function build(c) {
    const items = work(c), mine = items.filter((t) => t.mine), pool = c.isAdmin ? items : mine, urgent = pool.filter((t) => t.bucket !== 'soon').sort((a, b) => (a.bucket === 'late' ? 0 : 1) - (b.bucket === 'late' ? 0 : 1));
    const late = mine.filter((t) => t.bucket === 'late').length, todayN = mine.filter((t) => t.bucket === 'today').length;
    const open = c.caseRows.filter((k) => k.stage < 7), ledger = c.ledger, sum = (f) => ledger.reduce((a, l) => a + f(l), 0);
    const fee = feeCard(ledger);
    const funnel = STAGES.map((label, i) => ({ label, n: c.caseRows.filter((k) => k.stage === i).length, last: i === 7, bad: i === 8 }));
    const clients = c.clients.map((k) => { const ls = ledger.filter((l) => l.client === k.name), rs = c.requests.filter((r) => r.client === k.name);
      return { name: k.name, code: k.code, open: rs.filter((r) => !['CLOSED', 'CANCELLED', 'DRAFT'].includes(r.status)).length, cases: c.caseRows.filter((x) => rs.some((r) => r.code === x.req)).length,
        feeN: ls.reduce((a, l) => a + l.totalN, 0), fee: money(ls.reduce((a, l) => a + l.totalN, 0)), paid: money(ls.reduce((a, l) => a + l.paidN, 0)), go: c.nav({ page: 'client', ccode: k.code }) }; })
      .sort((a, b) => b.feeN - a.feeN || b.cases - a.cases).slice(0, 5);
    const sent = c.caseRows.length, atLeast = (n) => c.caseRows.filter((k) => k.stage >= n && k.stage <= 7).length;
    const recruit = [['Hồ sơ được chọn', c.picked], ['Đã gửi khách', sent], ['Phỏng vấn', atLeast(1)], ['Offer', atLeast(3)], ['Nhận việc', atLeast(4)], ['Qua bảo hành', atLeast(7)]]
      .map(([label, n], i, a) => ({ label, n, pct: Math.round(n / (Math.max(...a.map((x) => x[1])) || 1) * 100), note: i ? (a[i - 1][1] ? Math.round(n / a[i - 1][1] * 100) + '% bước trước' : '') : '' }));
    const group = (list, key) => Object.entries(list.reduce((m, x) => { const k = key(x); m[k] = (m[k] || 0) + 1; return m; }, {})).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const bars = (pairs) => pairs.map(([label, n]) => ({ label, n, pct: Math.round(n / (pairs[0][1] || 1) * 100) }));
    const reasons = bars(group(c.caseRows.filter((k) => k.stage === 8), (k) => k.stopLabel || k.due || 'Chưa ghi lý do')), sources = bars(group(c.cands, (u) => u.src || OTHER_SOURCE)).map((b) => (b.label === OTHER_SOURCE ? { ...b, info: OTHER_SOURCE_INFO } : b));
    const unassigned = c.requests.filter((r) => r.owner === 'Chưa phân công').length;
    const feeStat = { label: 'Phí còn phải thu', value: fee.value, hint: 'theo sổ phí · ' + fee.full, go: c.nav({ page: 'fin' }) };
    const stats = c.isAdmin
      ? [{ label: 'Yêu cầu đang mở', value: c.openReqs.length, hint: unassigned + ' chưa phân công', go: c.nav({ page: 'list' }) }, { label: 'Số ca đang mở', value: open.length, hint: c.caseRows.filter((k) => k.late).length + ' ca cần chú ý', go: c.nav({ page: 'cases' }) }, feeStat]
      : [{ label: 'Việc đến hạn', value: late + todayN, hint: late + ' quá hạn · ' + todayN + ' hôm nay', go: c.nav({ page: 'mywork' }) }, { label: 'Yêu cầu đang xử lý', value: c.openReqs.length, hint: 'Chung · trong phạm vi được xem', go: c.nav({ page: 'list' }) },
        { label: 'Số ca đang mở', value: open.length, hint: c.caseRows.filter((k) => k.late).length + ' ca cần chú ý', go: c.nav({ page: 'cases' }) }, feeStat];
    const ivs = c.ivs.filter((v) => v.status === 'SCHEDULED' || v.status === 'RESCHEDULED').map((v) => { const k = c.caseRows.find((x) => x.id === v.caseId) || {}, bits = String(v.at || '').split(' ');
      const rq = c.requests.find((r) => r.code === k.req); return { day: (bits[0] || '—').slice(0, 5), time: bits[1] || '—', title: k.name || v.caseId, req: k.req ? k.req + (rq ? ' · ' + rq.title : '') : 'Chưa gắn yêu cầu', meta: 'Vòng ' + v.round + ' · ' + (v.mode || 'Chưa rõ hình thức'), go: c.nav({ page: 'case', kcase: v.caseId }) }; });
    return { user: c.user, today: c.simDay, isAdmin: c.isAdmin, late, todayN, stats, fee, feeRing: feeRing(ledger), ledger, funnel, clients, recruit, reasons, sources, interviews: ivs,
      tasks: urgent.slice(0, 4).map((t) => ({ title: t.action, meta: t.subject + ' · ' + t.meta.split(' · ').slice(0, 2).join(' · '), scope: c.isAdmin ? t.owner : 'Của tôi', statusLabel: t.bucket === 'late' ? 'Quá hạn' : 'Việc hôm nay', tone: t.bucket === 'late' ? 'bad' : 'info', iconPath: t.bucket === 'late' ? CLOCK : t.iconPath, go: t.go })),
      newToday: c.requests.filter((r) => r.created === c.simDay).map((r) => ({ code: r.code, title: r.title, meta: r.client + ' · ' + (r.owner || 'Chưa phân công'), go: c.nav({ page: 'detail', code: r.code, tab: 'tien-trinh' }) })),
      pending: c.requests.filter((r) => r.status === 'SUBMITTED' || r.owner === 'Chưa phân công').map((r) => ({ code: r.code, title: r.title, meta: r.client + ' · ' + (r.owner || 'Chưa phân công'), go: c.nav({ page: 'detail', code: r.code, tab: 'tien-trinh' }) })),
      milestones: c.caseRows.filter((k) => k.stage === 5 || k.stage === 6).map((k) => ({ title: k.name + ' · ' + k.id, meta: k.stage === 5 ? 'Đang thử việc' : 'Đang bảo hành', time: k.due || 'Sắp tới', go: c.nav({ page: 'case', kcase: k.id }) })), work: items };
  }
  // Thông báo mẫu cho drawer chuông (loại và nhãn theo code gốc: Nhắc KH phản hồi hồ sơ, Mốc bảo hành, Hợp đồng...)
  function notices(nav) {
    return [
      { id: 'N1', type: 'Hồ sơ', title: 'Khách phản hồi hồ sơ HS-103', body: 'Lê Thu Trang · YC-012 đã có phản hồi từ khách hàng.', at: '15/10/2026 08:40', go: nav({ page: 'case', kcase: 'C-103' }) },
      { id: 'N2', type: 'Hạn', title: 'Offer C-104 hết hạn trả lời sau 3 ngày', body: 'Phạm Minh Đức · hạn offer 18/10.', at: '14/10/2026 16:05', go: nav({ page: 'case', kcase: 'C-104' }) },
      { id: 'N3', type: 'Hợp đồng', title: 'HĐ-2026-014 được ghi nhận đã ký', body: 'Bệnh viện Đa khoa Phương Nam · YC-012.', at: '14/10/2026 09:12', go: nav({ page: 'detail', code: 'YC-012', tab: 'tien-trinh' }) },
      { id: 'N4', type: 'Hệ thống', title: 'Khách mới gửi yêu cầu YC-009 qua cổng', body: 'Dược sĩ lâm sàng · chưa phân công.', at: '13/10/2026 17:30', go: nav({ page: 'detail', code: 'YC-009', tab: 'tien-trinh' }) },
    ];
  }

  // Lịch theo giờ trong ngày. Docs chỉ ghi giờ bắt đầu; BE lưu thêm thời lượng và tự điền 45 phút khi nhân viên bỏ trống
  // (InterviewCommandsTest: durationMinutes = 45), nên bản mẫu cũng lấy 45 phút. Dải giờ mặc định 7h–19h, nới ra nếu có buổi nằm ngoài.
  // MIN_BLOCK_PX đủ chỗ cho ba dòng chữ (tên, yêu cầu, giờ) để không bị cắt chân chữ
  const MIN_BLOCK_PX = 58, DEFAULT_MIN = 45, HOUR_PX = 72, BASE_FROM = 7, BASE_TO = 19;
  const hhmm = (m) => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
  function timeline(rows) {
    const evs = rows.map((r) => { const t = /^(\d{1,2}):(\d{2})$/.exec(r.time || ''); return t ? { r, from: +t[1] * 60 + +t[2] } : null; }).filter(Boolean).map((e) => ({ ...e, to: e.from + DEFAULT_MIN })).sort((a, b) => a.from - b.from);
    const from = Math.min(BASE_FROM, ...evs.map((e) => Math.floor(e.from / 60))), to = Math.min(24, Math.max(BASE_TO, ...evs.map((e) => Math.ceil(e.to / 60))));
    // Cụm = các buổi chồng giờ nhau liên tiếp; mỗi cụm tự chia cột ngang riêng để buổi lẻ vẫn rộng đủ chiều ngang
    let lanes = [], cluster = [], clusterEnd = 0;
    const close = () => { cluster.forEach((e) => { e.cols = Math.max(lanes.length, 1); }); lanes = []; cluster = []; };
    evs.forEach((e) => { if (cluster.length && e.from >= clusterEnd) close(); let i = lanes.findIndex((end) => end <= e.from); if (i < 0) i = lanes.length; lanes[i] = e.to; e.lane = i; clusterEnd = Math.max(clusterEnd, e.to); cluster.push(e); });
    close();
    return {
      height: (to - from) * HOUR_PX,
      hours: Array.from({ length: to - from + 1 }, (_, i) => ({ label: String(from + i).padStart(2, '0') + ':00', style: 'top:' + i * HOUR_PX + 'px' })),
      events: evs.map((e, k) => ({ ...e.r, cls: 'dh-tl-ev t' + (k % 5), range: hhmm(e.from) + ' – ' + hhmm(e.to), style: 'top:' + ((e.from / 60 - from) * HOUR_PX).toFixed(1) + 'px;height:' + Math.max(DEFAULT_MIN / 60 * HOUR_PX - 4, MIN_BLOCK_PX) + 'px;left:' + (e.lane / e.cols * 100) + '%;width:calc(' + 100 / e.cols + '% - 4px)' })),
    };
  }
  root.MedDash = { statTone, PERIODS, periodLedger, feeCard, build, notices, compact, feeRing, STAGES, timeline };
})(window);
