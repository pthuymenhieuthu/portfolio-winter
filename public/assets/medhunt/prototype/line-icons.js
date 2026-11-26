// Icon dạng line (viewBox 24, stroke) dùng cho thẻ tổng quan; cùng bộ nét với Trang tổng quan.
(function (root) {
  root.MedIcons = {
    Doc: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6M8 13h8m-8 4h6',
    Wallet: 'M20 7H5a2 2 0 0 1 0-4h13v4m2 0v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5M16 13h2',
    Alert: 'M12 9v4m0 4h.01M10.3 3.6 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z',
    Clock: 'M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z',
    Act: 'M22 12h-4l-3 9L9 3l-3 9H2',
    Check: 'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3',
    Cross: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm3 6-6 6m0-6 6 6',
    Users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm14 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  };

  // Icon thẻ số: nét chuyển màu từ màu nhấn sang bản nhạt hơn, ruột tô cùng gradient ở độ mờ thấp. SVG không đọc được biến CSS của thẻ để dựng gradient,
  // nên đọc màu đã tính (color) của từng .dh-si rồi gắn gradient theo màu đó; chạy lại khi DOM hoặc class (đổi style) thay đổi.
  const NS = 'http://www.w3.org/2000/svg', FILL_OPACITY = 0.16, LIGHTEN = 0.5;
  let defs = null;
  const lighten = (c) => { const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(c); return m ? 'rgb(' + [1, 2, 3].map((i) => Math.round(+m[i] + (255 - +m[i]) * LIGHTEN)).join(',') + ')' : c; };
  const gradient = (color) => {
    if (!defs) { const svg = document.createElementNS(NS, 'svg'); svg.setAttribute('width', '0'); svg.setAttribute('height', '0'); svg.setAttribute('aria-hidden', 'true'); svg.style.position = 'absolute'; defs = document.createElementNS(NS, 'defs'); svg.appendChild(defs); document.body.appendChild(svg); }
    const id = 'ico-' + color.replace(/\D+/g, '-'); if (defs.querySelector('#' + id)) return id;
    const g = document.createElementNS(NS, 'linearGradient'); g.id = id; g.setAttribute('x1', '0'); g.setAttribute('y1', '0'); g.setAttribute('x2', '1'); g.setAttribute('y2', '1');
    [[0, color], [1, lighten(color)]].forEach(([o, c]) => { const st = document.createElementNS(NS, 'stop'); st.setAttribute('offset', o); st.setAttribute('stop-color', c); g.appendChild(st); });
    defs.appendChild(g); return id;
  };
  const paint = () => document.querySelectorAll('.dh-si svg').forEach((svg) => {
    const color = getComputedStyle(svg.parentNode).color, ref = 'url(#' + gradient(color) + ')';
    if (svg.dataset.ico === color) return;
    svg.dataset.ico = color; svg.style.stroke = ref; svg.style.fill = ref; svg.style.fillOpacity = FILL_OPACITY;
  });
  let queued = false;
  if (typeof MutationObserver === 'undefined') return; // môi trường test (node) không có DOM
  new MutationObserver(() => { if (queued) return; queued = true; setTimeout(() => { queued = false; paint(); }, 0); })
    .observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
})(window);
