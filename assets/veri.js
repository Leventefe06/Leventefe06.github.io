// ============================================================
//  Sitedeki tüm içerik bu dosyada. Başka bir yere dokunmana gerek yok.
//  Yeni kod eklemek için README.md'ye bak.
// ============================================================

const PROFIL = {
  ad: 'Levent Efe',
  kullanici: '@leventcodes',
  rol: 'Yazılım Geliştirme öğrencisi · Ankara',
  bio: 'Yazılım öğrenen bir öğrenci. Kodladıklarım burada.',
  // Fotoğraf koymak için: ../avatar-hazirla.sh foto.jpg çalıştır,
  // ya da assets/avatar.jpg'yi elle koy ve aşağıyı '/assets/avatar.jpg' yap.
  // Boş kalırsa "LE" harfleri görünür.
  avatar: '/assets/avatar.jpg',
};

// Kodlar: en yeni en üstte. Her öğenin bir klasörü var: kodlar/<klasor>/
//   kodlar/<klasor>/index.html   -> animasyonun kendisi (Canlı izle + İndir)
//   kodlar/<klasor>/kapak.webp   -> kart görseli (kare, 320x320 yeterli)
//   kodlar/<klasor>/kod/index.html -> "Kodu gör" sayfası (başka bir klasörden kopyala, değiştirme)
const KODLAR = [
  {
    klasor: 'kasimpati',
    baslik: 'Kasımpatı',
    aciklama: '',
    tarih: '2026-11-16',
  },
];

// Linkler: adres boş ('') ya da '#' ise sayfada görünmez.
// ikon: site | github | instagram | youtube | eposta
// altYazi: başlığın altında küçük açıklama (ör. @kullanici ya da kısa rol)
const LINKLER = [
  { baslik: 'Dexlet Studio', adres: 'https://dexletstudio.com', ikon: 'site', altYazi: 'Freelance web tasarım' },
  { baslik: 'GitHub', adres: 'https://github.com/Leventefe06', ikon: 'github', altYazi: '@Leventefe06' },
  { baslik: 'Instagram', adres: 'https://instagram.com/leventcodes', ikon: 'instagram', altYazi: '@leventcodes' },
  // TODO: YouTube kanal adresini yaz (örnek: 'https://youtube.com/@kanaladi'). '#' iken gizli.
  { baslik: 'YouTube', adres: '#', ikon: 'youtube' },
  // TODO: e-posta adresini yaz (örnek: 'mailto:ad@ornek.com'). Boşken gizli.
  { baslik: 'İletişim', adres: '', ikon: 'eposta', altYazi: '' },
];
