// Ana sayfa: veri.js içindeki PROFIL, KODLAR ve LINKLER'i ekrana basar.
(function () {
  const $ = id => document.getElementById(id);
  const kacis = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const AYLAR = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

  function basHarfler(ad) {
    const harf = String(ad || '').trim().split(/\s+/).filter(Boolean).map(s => s[0]).join('');
    return (harf || 'LE').slice(0, 2).toLocaleUpperCase('tr-TR');
  }

  function tarihYazi(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
    if (!m) return '';
    return Number(m[3]) + ' ' + AYLAR[Number(m[2]) - 1] + ' ' + m[1];
  }

  function harfAvatar() {
    const el = $('avatar');
    el.classList.remove('foto');
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<span class="harf">' + kacis(basHarfler(PROFIL.ad)) + '</span>';
  }

  // Profil
  $('ad').textContent = PROFIL.ad;
  $('kullanici').textContent = PROFIL.kullanici;
  const rol = $('rol');
  if (PROFIL.rol) rol.textContent = PROFIL.rol;
  else rol.hidden = true;
  $('bio').textContent = PROFIL.bio;
  if (PROFIL.avatar) {
    const el = $('avatar');
    el.classList.add('foto');
    el.removeAttribute('aria-hidden');
    const img = document.createElement('img');
    img.src = PROFIL.avatar;
    img.alt = PROFIL.ad;
    img.width = 96;
    img.height = 96;
    img.addEventListener('error', harfAvatar);
    el.innerHTML = '';
    el.appendChild(img);
  } else {
    harfAvatar();
  }

  // Kodlar (en yeni üstte)
  const kodlar = KODLAR.slice().sort((a, b) => (b.tarih || '').localeCompare(a.tarih || ''));
  $('kod-sayisi').textContent = String(kodlar.length).padStart(2, '0');
  $('kodlar').innerHTML = kodlar.map(k => {
    const yol = '/kodlar/' + encodeURIComponent(k.klasor) + '/';
    const tarih = tarihYazi(k.tarih);
    return '<li class="kart kod-kart">' +
      '<a class="kod-ust" href="' + yol + '">' +
        '<img class="kapak" src="' + yol + 'kapak.webp" alt="" width="76" height="76" loading="lazy" decoding="async">' +
        '<span class="kod-metin"><span class="kod-baslik">' + kacis(k.baslik) + '</span>' +
        (k.aciklama ? '<span class="kod-aciklama">' + kacis(k.aciklama) + '</span>' : '') +
        (tarih ? '<span class="kod-tarih">' + kacis(tarih) + '</span>' : '') +
        '</span>' +
      '</a>' +
      '<div class="eylemler">' +
        '<a class="eylem" href="' + yol + '">' + ikon('oynat', 14) + '<span>Canlı izle</span></a>' +
        '<a class="eylem" href="' + yol + 'kod/">' + ikon('kod', 14) + '<span>Kodu gör</span></a>' +
        '<a class="eylem" href="' + yol + 'index.html" download="' + kacis(k.klasor) + '.html">' + ikon('indir', 14) + '<span>İndir</span></a>' +
      '</div>' +
    '</li>';
  }).join('');

  // Linkler (adresi boş ya da '#' olanlar gizli)
  const linkler = LINKLER.filter(l => l.adres && l.adres !== '#');
  $('linkler').innerHTML = linkler.map(l => {
    const dis = /^https?:/.test(l.adres);
    return '<li><a class="kart link-kart" href="' + kacis(l.adres) + '"' + (dis ? ' target="_blank" rel="noopener"' : '') + '>' +
      '<span class="link-ikon">' + ikon(l.ikon) + '</span>' +
      '<span class="link-metin"><span class="link-baslik">' + kacis(l.baslik) + '</span>' +
      (l.altYazi ? '<span class="link-alt">' + kacis(l.altYazi) + '</span>' : '') + '</span>' +
      '<span class="link-ok">' + ikon('ok', 16) + '</span>' +
    '</a></li>';
  }).join('');

  $('alt-ig').innerHTML = ikon('instagram', 22);
})();
