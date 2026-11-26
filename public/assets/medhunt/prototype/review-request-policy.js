(function (root) {
  const D = root.MedReview;
  function wrap(host, C, api, view) {
    const guard = (name, check) => {
      const original = api[name];
      api[name] = (...args) => {
        const s = host.state, actor = root.MedReviewStore.actor(s), r = root.MedReviewStore.reqs(s, C).find((r) => r.code === args[0]);
        try {
          if (!r || !D.staff(actor)) D.fail('FORBIDDEN', 'Thao tác dành cho nhân viên');
          check(r, actor, args);
          const result = original(...args); return result || { ok: true };
        } catch (e) { return { ok: false, message: e.message }; }
      };
    };
    const open = (r) => { if (!['DRAFT', 'SUBMITTED', 'SOURCING'].includes(r.status)) D.fail('ERR-REQ-35', 'Yêu cầu đã kết thúc'); };
    const cases = (r) => [...C.CASES, ...host.state.extraCases].map((c) => ({ ...c, ...host.state.cOver[c.id] })).filter((c) => c.req === r.code);
    const hasRunning = (cs) => cs.some((c) => c.stage >= 4 && c.stage <= 6);
    guard('assign', (r, a, args) => {
      open(r);
      if (r.status === 'SOURCING' && a.role !== 'admin') D.fail('ERR-REQ-36', 'Chỉ quản trị đổi người phụ trách');
      if (!args[1]?.length) D.fail('ERR-REQ-17', 'Cần ít nhất một người phụ trách');
    });
    guard('edit', (r) => open(r));
    guard('setQty', (r, a, args) => {
      open(r); if (!Number.isInteger(args[1]) || args[1] < 1 || !args[2]?.trim()) D.fail('ERR-REQ-28', 'Nhập số lượng nguyên dương và lý do');
    });
    guard('setPosStop', (r, a, args) => {
      open(r); const ps = D.positions(r), pos = ps[args[1]];
      if (!pos) D.fail('ERR-REQ-43', 'Không tìm thấy vị trí');
      if (args[2] && hasRunning(cases(r).filter((c) => (c.positionId || ps[0].id) === pos.id))) D.fail('ERR-REQ-26', 'Vị trí còn ca đang thử việc hoặc bảo hành');
      if (!args[2] && ps.some((p) => p.id !== pos.id && !p.stopped && p.title.trim() === pos.title.trim())) D.fail('ERR-REQ-46', 'Vị trí trùng với vị trí đang tuyển');
    });
    guard('cancelReq', (r, a, args) => {
      open(r);
      if (r.status !== 'DRAFT' && a.role !== 'admin') D.fail('ERR-REQ-40', 'Chỉ quản trị huỷ yêu cầu đã gửi');
      if (r.status !== 'DRAFT' && args[3] !== r.code) D.fail('ERR-REQ-39', 'Gõ lại đúng mã yêu cầu');
      if (hasRunning(cases(r))) D.fail('ERR-REQ-26', 'Yêu cầu còn ca đang thử việc hoặc bảo hành');
      if (args[1] === 'OTHER' && !args[2]?.trim()) D.fail('ERR-REQ-32', 'Nhập ghi chú cho lý do Khác');
    });
    guard('reopenReq', (r, a, args) => {
      if (a.role !== 'admin') D.fail('ERR-REQ-37', 'Chỉ quản trị mở lại yêu cầu');
      if (!['CLOSED', 'CANCELLED'].includes(r.status) || !args[1]?.trim()) D.fail('ERR-REQ-35', 'Yêu cầu chưa kết thúc hoặc thiếu lý do');
    });
    guard('status', (r, a, args) => {
      if (args[1] !== 'CLOSED' || r.status !== 'SOURCING') D.fail('ERR-REQ-35', 'Chỉ hoàn thành yêu cầu đang xử lý');
      const cs = cases(r), ledger = view.ledger, fee = (c) => ledger.find((l) => l.id === c.id) || { leftN: 0, insts: [] };
      const done = cs.filter((c) => c.stage === 7 && fee(c).leftN <= 0), ps = D.positions(r), errs = [];
      if (cs.some((c) => c.stage <= 6)) errs.push('Còn ca đang chạy (ERR-REQ-11)');
      if (!cs.some((c) => c.stage === 7)) errs.push('Chưa có ca hết bảo hành (ERR-REQ-41)');
      if (ps.filter((p) => !p.stopped).some((p) => done.filter((c) => (c.positionId || ps[0].id) === p.id).length < +p.qty)) errs.push('Chưa đủ người theo từng vị trí (ERR-REQ-27)');
      if (cs.some((c) => c.stage === 7 && fee(c).leftN > 0 || c.stage === 8 && (fee(c).insts || []).some((i) => i.status === 'overdue'))) errs.push('Còn phí phải thu (ERR-REQ-31)');
      if (!view.contracts[r.code]?.signed) errs.push('Chưa có hợp đồng đã ký (ERR-REQ-18)');
      if (errs.length) D.fail('COMPLETE_BLOCKED', errs.join('\n'));
    });
    return api;
  }
  root.MedRequestPolicy = { wrap };
})(typeof window === 'undefined' ? globalThis : window);
