// "Kodu gör" sayfası. Adres /kodlar/<klasor>/kod/ şeklinde; klasör adını adresten okur.
(function () {
  const $ = id => document.getElementById(id);
  const klasor = decodeURIComponent((location.pathname.match(/\/kodlar\/([^/]+)\/kod/) || [])[1] || '');
  const bilgi = KODLAR.find(k => k.klasor === klasor) || { baslik: klasor, aciklama: '' };
  const kaynak = '/kodlar/' + encodeURIComponent(klasor) + '/';

  document.title = bilgi.baslik + ' · Kod · @leventcodes';
  $('baslik').textContent = bilgi.baslik;
  $('geri').innerHTML = ikon('geri', 16) + '<span>Kodlar</span>';
  $('izle').href = kaynak;
  $('izle').innerHTML = ikon('oynat', 14) + '<span>Canlı izle</span>';
  $('indir').href = kaynak + 'index.html';
  $('indir').setAttribute('download', klasor + '.html');
  $('indir').innerHTML = ikon('indir', 14) + '<span>İndir</span>';
  const kopyalaYazi = ikon('kopyala', 14) + '<span>Kopyala</span>';
  $('kopyala').innerHTML = kopyalaYazi;

  let metin = '';
  fetch(kaynak + 'index.html')
    .then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })
    .then(t => {
      metin = t;
      const satir = Vurgu.satirlar(t.replace(/\r\n/g, '\n').replace(/\n$/, ''));
      $('dosya').textContent = 'index.html · ' + satir.length + ' satır · ' + Math.round(new Blob([t]).size / 1024) + ' KB';
      $('kod').innerHTML = satir.map(s => '<span class="satir">' + (s || ' ') + '</span>').join('');
      $('kopyala').disabled = false;
    })
    .catch(() => { $('kod').textContent = 'Kod yüklenemedi. Sayfayı yenilemeyi dene.'; });

  function yedekKopyala(t) {
    const a = document.createElement('textarea');
    a.value = t; a.setAttribute('readonly', ''); a.style.position = 'fixed'; a.style.opacity = '0';
    document.body.appendChild(a); a.select();
    let ok = false; try { ok = document.execCommand('copy'); } catch (e) {}
    a.remove(); return ok;
  }

  let zaman;
  $('kopyala').addEventListener('click', async () => {
    let ok = false;
    try { await navigator.clipboard.writeText(metin); ok = true; } catch (e) { ok = yedekKopyala(metin); }
    $('kopyala').innerHTML = ok ? ikon('tamam', 14) + '<span>Kopyalandı</span>' : '<span>Kopyalanamadı</span>';
    $('kopyala').classList.toggle('tamam', ok);
    clearTimeout(zaman);
    zaman = setTimeout(() => { $('kopyala').innerHTML = kopyalaYazi; $('kopyala').classList.remove('tamam'); }, 1800);
  });
})();
