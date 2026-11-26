(function (root) {
  root.MedModalFocus = function (close) {
    const before = document.activeElement, modal = Array.from(document.querySelectorAll('[role="dialog"]')).at(-1);
    if (!modal) return () => {};
    const focusables = () => Array.from(modal.querySelectorAll('button,input,select,textarea,[tabindex="0"]')).filter((e) => !e.disabled && e.getClientRects().length);
    const key = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); close?.(); }
      if (e.key !== 'Tab') return;
      const els = focusables(), first = els[0], last = els.at(-1);
      if (!first) { e.preventDefault(); return; }
      if (e.shiftKey && (document.activeElement === first || !modal.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (document.activeElement === last || !modal.contains(document.activeElement))) { e.preventDefault(); first.focus(); }
    };
    const timer = setTimeout(() => focusables()[0]?.focus(), 0);
    document.addEventListener('keydown', key);
    return () => { clearTimeout(timer); document.removeEventListener('keydown', key); if (before?.isConnected) before.focus(); };
  };
})(window);
