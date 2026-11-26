/* Quy tắc Phase 01 dùng chung cho trang yêu cầu và bàn đánh giá. Không dùng cho production. */
(function (root) {
  const STATUS = {
    SCREENING: 'Đang sàng lọc', REVIEW_PENDING: 'Chờ đánh giá', IN_REVIEW: 'Đang đánh giá',
    REVIEW_PASSED: 'Đạt đánh giá', REVIEW_FAILED: 'Không đạt đánh giá',
    SECOND_REVIEW_REQUESTED: 'Đề xuất đánh giá vòng 2', SECOND_REVIEW_PENDING: 'Chờ đánh giá vòng 2',
    SECOND_REVIEW_PASSED: 'Đạt đánh giá vòng 2', SECOND_REVIEW_FAILED: 'Không đạt đánh giá vòng 2', SUBMITTED: 'Đã gửi khách hàng'
  };
  const PEOPLE = [{ id: 'BS Tâm', role: 'internal' }, { id: 'BS Hải', role: 'internal' }, { id: 'BS Mai', role: 'internal' }, { id: 'BS Vinh', role: 'external' }];
  const PENDING = ['REVIEW_PENDING', 'IN_REVIEW', 'SECOND_REVIEW_PENDING'];
  const WAIT = ['REVIEW_PASSED', 'SECOND_REVIEW_REQUESTED', 'SECOND_REVIEW_PASSED'];
  const ROLES = { admin: 'Quản trị', staff: 'Nhân viên', internal: 'Người đánh giá nội bộ', external: 'Người đánh giá ngoài' };
  const fail = (code, message) => { throw new Error(message + ' (' + code + ')'); };
  const date = (s) => {
    const m = /^(\d{2})\/(\d{2})\/(\d{4})(?: (\d{2}):(\d{2}))?$/.exec(s || '');
    if (!m) return null;
    const d = new Date(+m[3], +m[2] - 1, +m[1], +(m[4] || 0), +(m[5] || 0));
    return d.getFullYear() === +m[3] && d.getMonth() === +m[2] - 1 && d.getDate() === +m[1] && +(m[4] || 0) < 24 && +(m[5] || 0) < 60 ? d : null;
  };
  const positions = (r) => (r.positions?.length ? r.positions : [{ title: r.title, qty: r.qty }]).map((p, i) => ({ ...p, id: p.id || 'p' + (i + 1) }));
  const current = (m) => (m.rounds || []).filter((r) => r.active !== false && r.state !== 'WITHDRAWN').at(-1);
  const staff = (actor) => ['admin', 'staff'].includes(actor.role);
  const visible = (m, actor) => {
    if (m.removedAt) return false;
    if (staff(actor)) return true;
    return (m.rounds || []).some((r) => r.active !== false && r.state !== 'WITHDRAWN' &&
      (r.who === actor.id || (actor.role === 'internal' && r.n === 1 && !r.who && r.state === 'PENDING')));
  };
  const due = (v, now) => { if (!date(v) || date(v) <= date(now)) fail('ERR-MAT-17', 'Hạn đánh giá phải sau thời điểm hiện tại'); };
  function apply(input, action, payload, ctx) {
    const m = JSON.parse(JSON.stringify(input)), { actor, request, position, now } = ctx, p = payload || {};
    const admin = actor.role === 'admin', isStaff = staff(actor), closed = ['CLOSED', 'CANCELLED'].includes(request.status);
    const old = m.status, round = current(m), change = (to) => {
      m.status = to; m.since = now;
      m.log = [...(m.log || []), { from: old, to, at: now, who: actor.id }];
    };
    if (closed) fail('ERR-REQ-35', 'Yêu cầu đã kết thúc, không thay đổi hồ sơ');
    if (m.removedAt && action !== 'ADD') fail('ERR-MAT-14', 'Hồ sơ đã bị bỏ khỏi yêu cầu');
    if (position.stopped && action !== 'REMOVE') fail('ERR-REQ-43', 'Vị trí đang ngừng tuyển');
    if (['ADD', 'SEND1', 'SEND2', 'SEND'].includes(action) && request.status !== 'SOURCING') fail('ERR-REQ-35', 'Yêu cầu phải ở Đang xử lý');
    if (['ADD', 'REMOVE', 'PRESCREEN', 'SEND1', 'SEND2', 'DUE', 'SEND'].includes(action) && !isStaff) fail('FORBIDDEN', 'Thao tác dành cho nhân viên');
    const expect = (...states) => { if (!states.includes(m.status)) fail('ERR-MAT-24', 'Hồ sơ vừa đổi trạng thái; tải lại trước khi thao tác'); };
    if (action === 'ADD') {
      if (!m.removedAt && m.existing) return m;
      m.archives = [...(m.archives || []), ...(m.removedAt ? [{ at: m.removedAt, by: m.removedBy, reason: m.removedReason, rounds: m.rounds || [], log: m.log || [], status: m.status }] : [])];
      m.rounds = (m.rounds || []).map((r) => ({ ...r, active: false }));
      m.log = [];
      Object.assign(m, { removedAt: '', removedBy: '', removedReason: '', comment: '', proposed: '', reviewer2: '', due: '', existing: true });
      change('SCREENING');
    } else if (action === 'REMOVE') {
      if (m.status === 'SUBMITTED') fail('ERR-MAT-08', 'Hồ sơ đã gửi khách hàng; rút ở ca tuyển');
      if ((m.rounds || []).length && !p.reason?.trim()) fail('ERR-MAT-20', 'Hồ sơ đã có lượt đánh giá, cần lý do bỏ');
      if ((p.reason || '').length > 255) fail('ERR-MAT-20', 'Lý do tối đa 255 ký tự');
      Object.assign(m, { removedAt: now, removedBy: actor.id, removedReason: (p.reason || '').trim() });
      m.rounds = (m.rounds || []).map((r) => r.state === 'PENDING' ? { ...r, state: 'WITHDRAWN', withdrawnAt: now, reason: m.removedReason } : r);
    } else if (action === 'PRESCREEN') {
      if (m.status === 'SUBMITTED') fail('ERR-MAT-14', 'Hồ sơ đã gửi khách, không ghi sơ vấn');
      if (!date(p.date) || !['Gọi điện', 'Gặp trực tiếp', 'Trực tuyến'].includes(p.mode)) fail('ERR-MAT-06', 'Chọn ngày và hình thức sơ vấn hợp lệ');
      if (date(p.date) > date(now)) fail('ERR-MAT-07', 'Ngày sơ vấn không được ở tương lai');
      m.prescreens = [...(m.prescreens || []), { ...p, note: (p.note || '').trim(), by: actor.id, at: now }];
    } else if (action === 'SEND1') {
      expect('SCREENING'); due(p.due, now);
      if ((m.rounds || []).some((r) => r.active !== false && r.n === 1)) fail('ERR-MAT-24', 'Đã có lượt vòng đầu');
      m.rounds = [...(m.rounds || []), { n: 1, who: '', sentAt: now, due: p.due, state: 'PENDING', active: true }];
      m.due = p.due; change('REVIEW_PENDING');
    } else if (action === 'CLAIM') {
      // Code gốc: quyền ai.review.claim thuộc EXPERT_REVIEWER (nội bộ) và TENANT_ADMIN
      if (!['internal', 'admin'].includes(actor.role)) fail('FORBIDDEN', 'Chỉ người đánh giá nội bộ hoặc quản trị nhận vòng đầu');
      if (round?.who || m.status !== 'REVIEW_PENDING') fail('ERR-MAT-21', 'Hồ sơ đã có người nhận');
      if (!round || round.n !== 1 || round.state !== 'PENDING') fail('ERR-MAT-24', 'Lượt đánh giá không còn chờ nhận');
      round.who = actor.id; round.claimedAt = now; change('IN_REVIEW');
    } else if (action === 'RELEASE') {
      expect('IN_REVIEW', 'SECOND_REVIEW_PENDING');
      if (!round || (!admin && !(actor.role === 'internal' && round.n === 1 && round.who === actor.id))) fail('FORBIDDEN', 'Chỉ quản trị hoặc người nhận vòng đầu trả lại');
      if (round.n === 1) { round.who = ''; round.claimedAt = ''; change('REVIEW_PENDING'); }
      else { round.state = 'WITHDRAWN'; round.withdrawnAt = now; change('SECOND_REVIEW_REQUESTED'); }
    } else if (action === 'SEND2') {
      expect('SECOND_REVIEW_REQUESTED'); due(p.due, now);
      const who = p.who || m.proposed, first = (m.rounds || []).findLast((r) => r.n === 1 && r.active !== false);
      if (!who) fail('ERR-MAT-22', 'Chọn người đánh giá vòng 2');
      if (!PEOPLE.some((r) => r.id === who)) fail('ERR-MAT-16', 'Người đánh giá không hoạt động');
      if (who === first?.who) fail('ERR-MAT-23', 'Vòng 2 phải khác người vòng đầu');
      m.rounds = [...(m.rounds || []), { n: 2, who, sentAt: now, due: p.due, state: 'PENDING', active: true }];
      m.reviewer2 = who; m.due = p.due; change('SECOND_REVIEW_PENDING');
    } else if (action === 'VERDICT') {
      expect('IN_REVIEW', 'SECOND_REVIEW_PENDING', 'REVIEW_PASSED', 'REVIEW_FAILED', 'SECOND_REVIEW_REQUESTED', 'SECOND_REVIEW_PASSED', 'SECOND_REVIEW_FAILED');
      if (!round || !['PENDING', 'REVIEWED'].includes(round.state) || round.who !== actor.id || !['internal', 'external'].includes(actor.role)) fail('FORBIDDEN', 'Chỉ người được giao lượt này kết luận');
      if (!p.comment?.trim()) fail('ERR-MAT-02', 'Nhập nhận xét đánh giá');
      if (!['PASS', 'FAIL', 'SECOND'].includes(p.result)) fail('ERR-MAT-24', 'Kết luận không hợp lệ');
      if (p.result === 'SECOND' && (round.n !== 1 || actor.role !== 'internal')) fail('ERR-MAT-24', 'Chỉ vòng đầu nội bộ được đề xuất vòng 2');
      if (p.result === 'SECOND' && !PEOPLE.some((r) => r.id === p.proposed && r.id !== actor.id)) fail('ERR-MAT-22', 'Chọn người vòng 2 khác người vòng đầu');
      round.verdicts = [...(round.verdicts || (round.result ? [{ result: round.result, comment: round.comment, at: round.at }] : [])), { result: p.result, comment: p.comment.trim(), at: now }];
      Object.assign(round, { state: 'REVIEWED', result: p.result, comment: p.comment.trim(), proposed: p.proposed || '', at: now });
      Object.assign(m, { comment: p.comment.trim(), proposed: p.proposed || '', due: '' });
      change(p.result === 'SECOND' ? 'SECOND_REVIEW_REQUESTED' : (round.n === 2 ? 'SECOND_REVIEW_' : 'REVIEW_') + (p.result === 'PASS' ? 'PASSED' : 'FAILED'));
    } else if (action === 'DUE') {
      if (!round || round.state !== 'PENDING' || !PENDING.includes(m.status)) fail('ERR-MAT-18', 'Lượt đã kết luận hoặc đã rút');
      due(p.due, now); round.due = p.due; m.due = p.due;
    } else if (action === 'SEND') {
      expect('REVIEW_PASSED', 'SECOND_REVIEW_PASSED');
      if (!date(p.date) || date(p.date) > date(now)) fail('ERR-PIP-01', 'Ngày gửi không hợp lệ hoặc ở tương lai');
      m.snapshot = { verdict: 'Đạt', comment: m.comment || '', at: now }; change('SUBMITTED');
    } else fail('UNKNOWN_ACTION', 'Thao tác không hợp lệ');
    m.audit = [...(m.audit || []), { action, by: actor.id, at: now }];
    return m;
  }
  const safeView = (m, actor, settings) => {
    if (!visible(m, actor)) return null;
    if (staff(actor)) return { ...m };
    const own = (m.rounds || []).filter((r) => r.active !== false && (r.who === actor.id || (!r.who && r.n === 1 && actor.role === 'internal')));
    const first = (m.rounds || []).findLast((r) => r.n === 1 && r.active !== false && r.state === 'REVIEWED');
    return { id: m.id, req: m.req, positionId: m.positionId, pos: m.pos, spec: m.spec, exp: m.exp, cchn: m.cchn, status: m.status,
      rounds: own, prescreens: settings.showPrescreen ? (m.prescreens || []).map(({ date, mode, note }) => ({ date, mode, note })) : [],
      firstResult: settings.showFirst && own.some((r) => r.n === 2) && first ? { result: first.result, comment: first.comment } : null };
  };
  root.MedReview = { STATUS, PEOPLE, PENDING, WAIT, ROLES, fail, date, positions, current, visible, safeView, apply, staff };
})(typeof window === 'undefined' ? globalThis : window);
