/* English presentation for the public demo. Domain values, IDs and event
   handlers retain their original values so recruitment behavior is unchanged. */
(function () {
  'use strict';
  const dictionary = window.MedhuntEnglish;
  const React = window.React;
  if (!dictionary || !React) return;
  const normalize = value => value.replace(/\s+/g, ' ').trim();
  const lower = Object.fromEntries(Object.entries(dictionary).map(([key,value]) => [key.toLocaleLowerCase('vi'),value]));
  const keys = Object.keys(dictionary).filter(key => dictionary[key] !== key).sort((a,b) => b.length-a.length);
  const escaped = keys.map(key => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const matcher = new RegExp(escaped.join('|'), 'giu');
  const cache = new Map();
  const names = new Set(window.MedhuntEnglishNames || []);
  const nameMatcher = new RegExp('(' + [...names].sort((a,b)=>b.length-a.length).map(name=>name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|') + ')','gu');
  const translate = value => {
    if (typeof value !== 'string') return value;
    value = value.replace(/(\d),(\d)(?=\s*(?:million|billion|%))/g,'$1.$2')
      .replace(/\b\d{1,3}(?:\.\d{3})+(?=\s*(?:đ|VND))/g,number=>number.replace(/\./g,','));
    if (names.has(value.trim())) return value;
    const parts = value.split(nameMatcher);
    if (parts.length > 1) return parts.map(part=>names.has(part)?part:translate(part)).join('');
    if (/^Trang\s+\d+$/.test(value.trim())) return value.replace('Trang','Page');
    if (!/[À-ỹĐđ]|\b(?:CCHN|ca|Trang)\b/u.test(value)) return value;
    if (cache.has(value)) return cache.get(value);
    const clean = normalize(value);
    let result = dictionary[clean] || lower[clean.toLocaleLowerCase('vi')];
    if (!result || result === clean) result = clean.replace(matcher, (match, offset) => {
      // A one-word entry must not replace a syllable in a longer word or name.
      const before = clean[offset-1] || '', after = clean[offset+match.length] || '';
      if ((/\p{L}/u.test(before) && /\p{L}/u.test(match[0])) || (/\p{L}/u.test(after) && /\p{L}/u.test(match.at(-1)))) return match;
      return dictionary[match] || lower[match.toLocaleLowerCase('vi')];
    });
    if (/\p{L}/u.test(clean) && clean === clean.toLocaleUpperCase('vi')) result = result.toUpperCase();
    result = result.replace(/(\d),(\d)(?=\s*(?:million|billion|%))/g,'$1.$2');
    const leading = value.match(/^\s*/)[0], trailing = value.match(/\s*$/)[0];
    result = leading + result + trailing;
    cache.set(value,result);
    return result;
  };
  const createElement = React.createElement;
  React.createElement = function (type, props, ...children) {
    if (typeof type === 'string' && !['style','script'].includes(type)) {
      const next = props ? {...props} : props;
      if (next) {
        for (const key of ['title','placeholder','aria-label','aria-description','alt','data-tip']) {
          if (typeof next[key] === 'string') next[key] = translate(next[key]);
        }
        if (['button','submit','reset'].includes(next.type) && typeof next.value === 'string') next.value = translate(next.value);
      }
      // Only native-element text is translated. Component props and option
      // values continue to carry the domain's original strings.
      const text = child => Array.isArray(child) ? child.map(text) : translate(child);
      return createElement.call(this,type,next,...children.map(text));
    }
    return createElement.call(this,type,props,...children);
  };
  document.documentElement.lang = 'en';
  document.title = translate(document.title);
  // Static template fragments and SVG markup can bypass createElement.
  // Translate only leaf text and display attributes after those fragments mount.
  const attributes = ['title','placeholder','aria-label','aria-description','alt','data-tip'];
  const visit = node => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.parentElement?.closest('script,style,textarea,[contenteditable="true"]')) return;
      const translated = translate(node.data);
      if (translated !== node.data) node.data = translated;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.matches('script,style,textarea,[contenteditable="true"]')) return;
      for (const key of attributes) {
        const current = node.getAttribute(key);
        if (current !== null) { const translated = translate(current); if (translated !== current) node.setAttribute(key, translated); }
      }
      for (const child of node.childNodes) visit(child);
    }
  };
  const start = () => {
    visit(document.body);
    new MutationObserver(records => {
      for (const record of records) {
        if (record.type === 'childList') record.addedNodes.forEach(visit);
        else visit(record.target);
      }
    }).observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:attributes});
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',start);
  else start();
  window.MedhuntTranslate = translate;
})();
