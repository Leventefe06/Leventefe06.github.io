// Kendi yazdığımız küçük sözdizimi renklendirici (HTML + CSS + JS). CDN yok, kütüphane yok.
const Vurgu = (function () {
  const JS_ANAHTAR = new Set(('break case catch class const continue debugger default delete do else export extends finally for function if import in instanceof let new of return static super switch this throw try typeof var void while with yield async await').split(' '));
  const JS_SABIT = new Set(['true', 'false', 'null', 'undefined', 'NaN', 'Infinity']);

  function js(kod, out) {
    const re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|('(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|`(?:\\[\s\S]|[^`\\])*`)|(\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b|\.\d+\b)|([\p{L}_$][\p{L}\p{N}_$]*)|(\s+)|([\s\S])/uy;
    let m, onceki = '';
    re.lastIndex = 0;
    while ((m = re.exec(kod))) {
      const t = m[0];
      if (m[1]) out.push(['yorum', t]);
      else if (m[2]) out.push(['metin', t]);
      else if (m[3]) out.push(['sayi', t]);
      else if (m[4]) {
        const sonra = kod.slice(re.lastIndex).match(/^\s*\(/);
        if (JS_ANAHTAR.has(t)) out.push(['anahtar', t]);
        else if (JS_SABIT.has(t)) out.push(['sabit', t]);
        else if (onceki === '.') out.push([sonra ? 'fonk' : 'ozellik', t]);
        else if (sonra) out.push(['fonk', t]);
        else out.push(['', t]);
      } else if (m[5]) out.push(['', t]);
      else out.push(['isaret', t]);
      if (!m[5]) onceki = t;
    }
  }

  function css(kod, out) {
    const re = /(\/\*[\s\S]*?\*\/)|('(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*")|(@[\w-]+)|(#[0-9a-fA-F]{3,8}\b)|(-?\d*\.?\d+(?:%|[a-z]+)?)|([\w-]+)|(\s+)|([\s\S])/y;
    let m, derinlik = 0;
    re.lastIndex = 0;
    while ((m = re.exec(kod))) {
      const t = m[0];
      if (m[1]) out.push(['yorum', t]);
      else if (m[2]) out.push(['metin', t]);
      else if (m[3]) out.push(['anahtar', t]);
      else if (m[4] || (m[5] && derinlik > 0)) out.push(['sayi', t]);
      else if (m[6] || m[5]) {
        if (derinlik === 0) out.push(['secici', t]);
        else if (/^\s*:/.test(kod.slice(re.lastIndex))) out.push(['ozellik', t]);
        else out.push(['', t]);
      } else if (m[7]) out.push(['', t]);
      else {
        if (t === '{') derinlik++;
        if (t === '}') derinlik = Math.max(0, derinlik - 1);
        out.push([derinlik === 0 && t !== '}' ? 'secici' : 'isaret', t]);
      }
    }
  }

  function etiket(t, out) {
    const re = /(<\/?|\/?>)|([\w:-]+)(?=\s*=)|("[^"]*"|'[^']*')|([\w:-]+)|(\s+)|([\s\S])/y;
    let m, ilk = true;
    while ((m = re.exec(t))) {
      if (m[1]) out.push(['isaret', m[0]]);
      else if (m[2]) out.push(['nitelik', m[0]]);
      else if (m[3]) out.push(['metin', m[0]]);
      else if (m[4]) { out.push([ilk ? 'etiket' : 'nitelik', m[0]]); ilk = false; }
      else out.push(m[6] === '=' ? ['isaret', '='] : ['', m[0]]);
    }
  }

  function html(kod) {
    const out = [];
    const re = /<!--[\s\S]*?-->|<!DOCTYPE[^>]*>|<\/?[a-zA-Z][^>]*>/gi;
    let son = 0, m;
    while ((m = re.exec(kod))) {
      if (m.index > son) out.push(['', kod.slice(son, m.index)]);
      const t = m[0];
      if (t.startsWith('<!--')) out.push(['yorum', t]);
      else if (/^<!DOCTYPE/i.test(t)) out.push(['yorum', t]);
      else {
        etiket(t, out);
        const ad = (t.match(/^<([a-zA-Z]+)/) || [])[1];
        if (ad && /^(script|style)$/i.test(ad)) {
          const kapanis = kod.toLowerCase().indexOf('</' + ad.toLowerCase(), re.lastIndex);
          const bitis = kapanis === -1 ? kod.length : kapanis;
          (ad.toLowerCase() === 'script' ? js : css)(kod.slice(re.lastIndex, bitis), out);
          re.lastIndex = bitis;
        }
      }
      son = re.lastIndex;
    }
    if (son < kod.length) out.push(['', kod.slice(son)]);
    return out;
  }

  const kacis = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Parçaları satırlara böler; birden fazla satıra yayılan yorumlar da doğru renklenir.
  function satirlar(kod) {
    const satir = [''];
    for (const [sinif, metin] of html(kod)) {
      metin.split('\n').forEach((p, i) => {
        if (i > 0) satir.push('');
        if (p) satir[satir.length - 1] += sinif ? '<span class="v-' + sinif + '">' + kacis(p) + '</span>' : kacis(p);
      });
    }
    return satir;
  }

  return { satirlar };
})();
