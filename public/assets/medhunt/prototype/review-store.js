(function (root) {
  const D = root.MedReview, KEY = 'medhunt.phase01.demo', VERSION = 1;
  const ACTIONS = { ADD: 'Chọn hồ sơ', REMOVE: 'Bỏ khỏi yêu cầu', PRESCREEN: 'Ghi sơ vấn', SEND1: 'Gửi đánh giá vòng đầu', SEND2: 'Gửi đánh giá vòng 2', CLAIM: 'Nhận hồ sơ', RELEASE: 'Trả lại lượt đánh giá', VERDICT: 'Lưu kết luận', DUE: 'Sửa hạn', SEND: 'Gửi khách hàng' };
  const FIELDS = ['simDay', 'flow', 'sampleClient', 'cmem', 'cst', 'crv', 'over', 'extraReqs', 'extraCases', 'extraCands', 'extraClients', 'extraContacts', 'contracts', 'contacts', 'invites', 'cliEdit', 'cOver', 'clog', 'evs', 'vers', 'hires', 'pays', 'offers', 'ivs', 'reviewSettings'];
  let storageError = '';
  function load() {
    try { const v = JSON.parse(localStorage.getItem(KEY) || 'null'); if (!v) return {}; if (v.version !== VERSION) { storageError = 'Dữ liệu demo thuộc phiên bản khác; bản lưu được giữ nguyên.'; return {}; }
      const data = v.data;
      if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid stored demo');
      for (const key of ['cmem', 'cst', 'crv', 'over', 'evs', 'reviewSettings']) if (key in data && (!data[key] || typeof data[key] !== 'object' || Array.isArray(data[key]))) throw new Error('Invalid stored map');
      for (const key of ['extraReqs', 'extraCases', 'extraCands', 'extraClients', 'extraContacts']) if (data[key] != null && !Array.isArray(data[key])) throw new Error('Invalid stored list');
      return Object.fromEntries(FIELDS.filter((k) => k in data).map((k) => [k, data[k]])); }
    catch (_) { storageError = 'Không đọc được bản lưu demo. Dữ liệu cũ được giữ nguyên.'; return {}; }
  }
  function save(state) {
    try { const old = localStorage.getItem(KEY); if (old && JSON.parse(old).version !== VERSION) return;
      localStorage.setItem(KEY, JSON.stringify({ version: VERSION, data: Object.fromEntries(FIELDS.map((k) => [k, state[k]])) }));
    } catch (_) { storageError = 'Trình duyệt không lưu được dữ liệu demo. Hãy giữ tab mở để tiếp tục.'; }
  }
  const actor = (s) => ({ role: s.role, id: s.role === 'external' ? 'BS Vinh' : s.role === 'internal' ? (s.reviewer || 'BS Tâm') : 'Lan Phạm' });
  const reqs = (s, C) => [...s.extraReqs, ...(s.flow === 'onboard' ? [] : C.REQ)].map((r) => ({ ...r, ...(s.over[r.code] || {}) }));
  const members = (s, code) => s.cmem[code] || (s.flow === 'onboard' ? [] : code === 'YC-013' ? ['U1', 'U2', 'U3', 'U4', 'U5', 'U6'] : ['U1', 'U2', 'U3', 'U4']);
  function record(s, C, code, id) {
    const rq = reqs(s, C).find((r) => r.code === code); if (!rq) throw new Error('Không tìm thấy yêu cầu');
    const blank = s.flow === 'onboard', p = { ...(blank ? {} : C.CRV_SEED[code]?.[id]), ...s.crv[code]?.[id] };
    const candidateId = id.split('~')[0], u = [...s.extraCands, ...C.CANDS].find((c) => c.id === candidateId);
    if (!u) throw new Error('Không tìm thấy hồ sơ');
    const pos = D.positions(rq).find((x) => x.id === (p.positionId || id.split('~')[1] || 'p1')) || D.positions(rq)[0];
    return { ...u, ...p, id, candidateId, req: code, positionId: pos.id, pos: pos.title, existing: members(s, code).includes(id),
      status: s.cst[code]?.[id] || (!blank && C.CST_SEED[code]?.[id]) || 'SCREENING' };
  }
  const records = (s, C) => reqs(s, C).flatMap((r) => [...new Set(members(s, r.code))].map((id) => record(s, C, r.code, id)));
  const settings = (s) => ({ showPrescreen: false, showFirst: false, slowHours: '', ...s.reviewSettings });
  function bridge(host, C) {
    const run = (code, ids, action, payload = {}) => {
      const s = host.state, rq = reqs(s, C).find((r) => r.code === code), who = actor(s), results = [], errors = [];
      for (const id of [...new Set(ids)]) {
        try { const old = record(s, C, code, id), position = D.positions(rq).find((p) => p.id === old.positionId);
          const p = typeof payload === 'function' ? payload(id, old) : payload;
          results.push(D.apply(old, action, p, { actor: who, request: rq, position, now: s.simDay + ' 09:00' }));
        } catch (e) { errors.push(id + ': ' + e.message); }
      }
      if (results.length) {
        const crv = { ...(s.crv[code] || {}) }, cst = { ...(s.cst[code] || {}) };
        results.forEach((m) => { crv[m.id] = m; cst[m.id] = m.status; });
        const cmem = [...new Set([...members(s, code), ...results.map((m) => m.id)])];
        const next = { crv: { ...s.crv, [code]: crv }, cst: { ...s.cst, [code]: cst }, cmem: { ...s.cmem, [code]: cmem },
          evs: { ...s.evs, [code]: [...(s.evs[code] || []), { at: s.simDay, kind: 'Hồ sơ', tone: 'info', text: ACTIONS[action] + ' · ' + results.length + ' hồ sơ · ' + who.id }] } };
        host.setState(next); save({ ...s, ...next });
      }
      return { ok: results.length > 0, message: (results.length ? 'Đã lưu ' + results.length + ' hồ sơ.' : '') + (errors.length ? '\n' + errors.join('\n') : ''), results };
    };
    const add = (code, ids, positionId) => {
      const rq = reqs(host.state, C).find((r) => r.code === code), ps = D.positions(rq), pos = ps.find((p) => p.id === positionId);
      if (!pos) return { ok: false, message: 'Chọn vị trí cần tuyển.' };
      return run(code, ids.map((id) => pos.id === 'p1' ? id : id + '~' + pos.id), 'ADD');
    };
    const setCands = (code, ids, status, patch) => {
      const map = Array.isArray(ids) ? Object.fromEntries(ids.map((i) => [i, status])) : ids;
      const outputs = Object.entries(map).map(([id, to]) => {
        const m = record(host.state, C, code, id), p = typeof patch === 'function' ? patch(id, m) : patch || {};
        const action = to === 'REVIEW_PENDING' ? (m.status === 'SCREENING' ? 'SEND1' : 'RELEASE') : to === 'SECOND_REVIEW_PENDING' && m.status === 'SECOND_REVIEW_REQUESTED' ? 'SEND2' : to === 'SECOND_REVIEW_REQUESTED' && m.status === 'SECOND_REVIEW_PENDING' ? 'RELEASE' : to === m.status ? 'DUE' : 'UNSUPPORTED';
        return run(code, [id], action, { due: p.due, who: p.reviewer2 });
      });
      return { ok: outputs.some((o) => o.ok), message: outputs.map((o) => o.message).join('\n') };
    };
    return { reviewAction: run, addCands: add, setCands,
      removeCands: (code, ids, reason) => run(code, ids, 'REMOVE', { reason }),
      restoreCands: () => ({ ok: false, message: 'Dùng Tìm hồ sơ để chọn lại; lịch sử lượt cũ được giữ nguyên.' }) };
  }
  function workspace(s, C) {
    const who = actor(s), cfg = settings(s);
    return records(s, C).filter((m) => {
      const rq = reqs(s, C).find((r) => r.code === m.req), pos = D.positions(rq).find((p) => p.id === m.positionId);
      return !['CLOSED', 'CANCELLED'].includes(rq.status) && !pos.stopped && D.visible(m, who) && (D.staff(who) ? (m.rounds || []).length > 0 : true);
    }).map((m) => D.safeView(m, who, cfg));
  }
  root.MedReviewStore = { load, save, actor, reqs, members, record, records, settings, bridge, workspace, error: () => storageError };
})(typeof window === 'undefined' ? globalThis : window);
