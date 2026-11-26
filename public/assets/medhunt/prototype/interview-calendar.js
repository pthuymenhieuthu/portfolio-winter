// Dựng mô hình hiển thị lịch phỏng vấn theo Ngày / Tuần / Tháng / Quý cho InterviewsPage (chỉ tính toán, không có state).
(function (root) {
  const DAY = 864e5, HH_NARROW = 72, HH_WIDE = 124, BASE_FROM = 7, BASE_TO = 19, TONES = 5, MAX_CHIPS = 3;
  // Docs chỉ ghi giờ bắt đầu; backend tự điền 45 phút khi nhân viên để trống thời lượng
  const DEFAULT_MIN = 45;
  const DOW = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'], MODES = ['day', 'week', 'month', 'quarter'];
  const pad = (n) => String(n).padStart(2, '0'), hhmm = (m) => pad(Math.floor(m / 60)) + ':' + pad(m % 60);
  const key = (d) => d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  const fmt = (d) => pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear();
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const monOf = (d) => addDays(d, -((d.getDay() + 6) % 7));
  const startMin = (e) => { const [h, m] = (e.time || '09:00').split(':').map(Number); return h * 60 + (m || 0); };
  const durOf = (e) => Math.max(15, parseInt(e.dur, 10) || DEFAULT_MIN);
  const tone = (e) => [...String(e.caseId)].reduce((a, c) => a + c.charCodeAt(0), 0) % TONES;
  const isOpen = (e) => e.status === 'SCHEDULED' || e.status === 'RESCHEDULED';

  // Buổi còn mở mà ngày đã qua nghĩa là diễn ra rồi nhưng chưa ai nhập kết quả: báo "Quá ngày, chờ kết quả" để người xếp lịch nhắc nhập
  function decorate(e, today) {
    const from = startMin(e), range = hhmm(from) + ' – ' + hhmm(from + durOf(e)), late = isOpen(e) && key(e.day) < key(today), done = e.status === 'DONE' && !!e.result;
    const stat = late ? 'Quá ngày, chờ kết quả' : done ? 'Hoàn thành · ' + e.rLabel : e.sLabel, mark = done ? (e.result === 'PASS' ? '✓' : '✕') : '';
    const sChip = late ? 'chip warn' : done ? e.rChip : e.sChip;
    const tip = [e.name, e.req + ' · ' + e.reqTitle, 'Vòng ' + e.round + ' · ' + e.mode, range + (e.dur ? '' : ' (giả định ' + DEFAULT_MIN + ' phút)'), 'Tham dự: ' + e.who, 'Trạng thái: ' + stat].join('\n');
    return { ...e, from, range, stat, sChip, mark, tip, cls: 't' + tone(e) + (late ? ' late' : isOpen(e) ? '' : e.status === 'DONE' ? ' done ' + (e.result === 'FAIL' ? 'fail' : 'pass') : ' off') };
  }
  // Cụm = các buổi chồng giờ liên tiếp; mỗi cụm tự chia làn ngang để buổi lẻ vẫn rộng đủ chiều ngang
  function lanes(evs) {
    let ends = [], cluster = [], clusterEnd = 0;
    const close = () => { cluster.forEach((e) => { e.cols = Math.max(ends.length, 1); }); ends = []; cluster = []; };
    evs.forEach((e) => { const to = e.from + durOf(e); if (cluster.length && e.from >= clusterEnd) close(); let i = ends.findIndex((x) => x <= e.from); if (i < 0) i = ends.length; ends[i] = to; e.lane = i; clusterEnd = Math.max(clusterEnd, to); cluster.push(e); });
    close();
  }
  function grid(days, evsByDay, today, wide) {
    const HH = wide ? HH_WIDE : HH_NARROW; // kiểu Ngày giãn lưới giờ để khối đủ chỗ cho mọi dòng
    const all = days.reduce((a, d) => a.concat(evsByDay(d)), []);
    const h0 = Math.min(BASE_FROM, ...all.map((e) => Math.floor(e.from / 60))), h1 = Math.max(BASE_TO, ...all.map((e) => Math.ceil((e.from + durOf(e)) / 60)));
    const top = (m) => ((m - h0 * 60) / 60) * HH;
    const cols = days.map((d) => {
      const evs = evsByDay(d).slice().sort((a, b) => a.from - b.from); lanes(evs);
      const isToday = key(d) === key(today), wk = d.getDay() === 0 || d.getDay() === 6;
      return { dw: DOW[(d.getDay() + 6) % 7], dn: d.getDate(), hcls: 'ch' + (isToday ? ' today' : ''), ccls: 'ccol' + (wk ? ' we' : ''), cstyle: 'height:' + (h1 - h0) * HH + 'px', now: isToday, nowStyle: 'top:' + top(9 * 60) + 'px',
        evs: evs.map((e) => ({ ...e, cls: 'cev ' + e.cls + (wide ? ' wide' : ''), style: 'top:' + (top(e.from) + 1) + 'px;height:' + ((durOf(e) / 60) * HH - 2) + 'px;left:calc(' + (e.lane / e.cols) * 100 + '% + 2px);width:calc(' + 100 / e.cols + '% - 4px)' })) };
    });
    const hours = []; for (let h = h0 + 1; h < h1; h++) hours.push({ label: pad(h) + ':00', style: 'top:' + (h - h0) * HH + 'px' });
    return { cols, hours, bodyVars: '--hh:' + HH + 'px;--n:' + days.length, gutStyle: 'height:' + (h1 - h0) * HH + 'px' };
  }
  // Lưới tháng: các tuần đầy đủ T2..CN bao quanh tháng; ô ngoài tháng làm mờ
  function monthCells(first, byKey, today, go, withChips) {
    const base = withChips ? 'mcell' : 'qc';
    const start = monOf(first), last = new Date(first.getFullYear(), first.getMonth() + 1, 0), n = Math.ceil(((last - start) / DAY + 1) / 7) * 7;
    return Array.from({ length: n }, (_, i) => {
      const d = addDays(start, i), evs = byKey[key(d)] || [], inM = d.getMonth() === first.getMonth(), more = evs.length - MAX_CHIPS;
      return { dn: d.getDate(), count: evs.length, hasCount: evs.length > 0, blank: !inM, cls: base + (inM ? '' : ' out') + (key(d) === key(today) ? ' today' : '') + (evs.length ? ' has' : ''), go: () => go(d), tip: fmt(d) + ': ' + evs.length + ' buổi phỏng vấn',
        chips: withChips && inM ? evs.slice(0, MAX_CHIPS).map((e) => ({ text: e.time + ' ' + e.name, cls: 'mchip ' + e.cls, tip: e.tip, open: e.open })) : [], more: more > 0 ? '+' + more + ' buổi' : '', hasMore: more > 0 };
    });
  }
  function build(o) {
    const { mode, anchor, today, go } = o, evs = o.ivs.map((e) => decorate(e, today)), byKey = {};
    evs.forEach((e) => { (byKey[key(e.day)] = byKey[key(e.day)] || []).push(e); });
    const at = (d) => byKey[key(d)] || [];
    if (mode === 'day') return { ...grid([anchor], at, today, true), title: fmt(anchor) };
    if (mode === 'week') {
      const mon = monOf(anchor), sun = addDays(mon, 6), same = mon.getMonth() === sun.getMonth();
      return { ...grid(Array.from({ length: 7 }, (_, i) => addDays(mon, i)), at, today, false), title: 'Tuần ' + mon.getDate() + (same ? '' : '/' + (mon.getMonth() + 1)) + '–' + sun.getDate() + '/' + (sun.getMonth() + 1) + '/' + sun.getFullYear() };
    }
    if (mode === 'month') return { cells: monthCells(new Date(anchor.getFullYear(), anchor.getMonth(), 1), byKey, today, go, true), title: 'Tháng ' + (anchor.getMonth() + 1) + '/' + anchor.getFullYear() };
    const q = Math.floor(anchor.getMonth() / 3);
    const months = [0, 1, 2].map((i) => {
      const first = new Date(anchor.getFullYear(), q * 3 + i, 1), inM = evs.filter((e) => e.day.getFullYear() === first.getFullYear() && e.day.getMonth() === first.getMonth());
      const cnt = (f) => inM.filter(f).length;
      return { label: 'Tháng ' + (first.getMonth() + 1), cells: monthCells(first, byKey, today, go, false), total: inM.length + ' buổi',
        sub: cnt(isOpen) + ' đã hẹn · ' + cnt((e) => e.result === 'PASS') + ' đạt · ' + cnt((e) => e.result === 'FAIL') + ' không đạt', go: () => go(first, 'month') };
    });
    return { months, title: 'Quý ' + (q + 1) + '/' + anchor.getFullYear() };
  }
  // Bước nhảy khi bấm ‹ ›: 1 ngày / 1 tuần / 1 tháng / 1 quý
  function shift(anchor, mode, dir) {
    if (mode === 'day') return addDays(anchor, dir);
    if (mode === 'week') return addDays(anchor, 7 * dir);
    return new Date(anchor.getFullYear(), anchor.getMonth() + dir * (mode === 'month' ? 1 : 3), 1);
  }
  root.MedCal = { build, shift, MODES, DOW };
})(window);
