# StokMate Panel

StokMate stok yönetimi API'si için hazırlanmış web paneli. Ürün, kategori, marka ve
tedarikçi verilerini yönetmek amacıyla kullanılır.

## Teknoloji Yığını

- **React 19 + TypeScript**
- **Vite** — geliştirme sunucusu ve build aracı
- **TanStack Router** — tip güvenli, kod tabanlı (dosyasız) routing
- **TanStack Query** — sunucu state yönetimi
- **TanStack Table** — veri tabloları
- **React Hook Form + Zod** — formlar ve doğrulama
- **Tailwind CSS 4** — shadcn/ui tarzı bir component seti üzerine kurulu stil altyapısı
- **Zustand** — client state (auth store)
- **i18next** — çoklu dil desteği (tr, en, ru)
- **Axios + Orval** — backend'in OpenAPI şemasından üretilen tipli API istemcisi
- **ESLint, Husky, lint-staged, commitlint** — kod kalitesi ve commit standardı

## Gereksinimler

- **Node.js 20+**
- **pnpm** (bu repo `pnpm-lock.yaml` kullanır)

## Başlarken

```bash
pnpm install
```

`.env` dosyası oluşturup API adresini tanımlayın:

```
VITE_API_BASE_URL=http://localhost:5080
```

> `pnpm dev` ve `pnpm build` öncesi çalışan `scripts/ensure-env.mjs`, `.env` yoksa onu
> `.env.example`'dan otomatik oluşturur. Repoda henüz bir `.env.example` bulunmadığından
> ilk kurulumda `.env` dosyasını yukarıdaki gibi elle oluşturmanız gerekir.

```bash
pnpm dev
```

> API'yi `server` klasöründen `dotnet run --project src/StokMate.Api` ile ayrı bir
> terminalde çalıştırmanız gerekir — bkz. [`../server/README.md`](../server/README.md).
> API varsayılan olarak `5080` portunda yayın yapar.

Uygulama `http://localhost:5173` adresinde açılır.

## Komutlar

| Komut | Açıklama |
| --- | --- |
| `pnpm dev` | Geliştirme sunucusunu başlatır |
| `pnpm build` | Tip kontrolü yapar (`tsc -b`) ve production build alır |
| `pnpm preview` | Production build'i yerelde önizler |
| `pnpm lint` | Projenin tamamında ESLint çalıştırır |
| `pnpm lint:fix` | ESLint hatalarını otomatik düzeltir |
| `pnpm generate:api` | Backend OpenAPI şemasından tipli API istemcisini yeniden üretir (Orval) |
| `pnpm commit` | Etkileşimli conventional-commit istemi (Commitizen) |

## Proje Yapısı

Kod tabanı, Feature-Sliced Design'dan esinlenen bir katman yapısını izler:

```
src/
├── app/          # Uygulama başlangıcı: router, providerlar, axios istemcisi
├── pages/        # Route seviyesindeki bileşenler (auth, dashboard, products, not-found, error-boundary)
├── widgets/      # Bağımsız arayüz blokları (header, sidebar, breadcrumb, layout'lar, language-switcher, product-stats)
├── features/     # Kullanıcıya dönük işlevsellik (auth: signin/logout · products: form/table/view)
├── entities/     # Domain modelleri ve veri çekme hook'ları (products, profile)
└── shared/       # Domain'den bağımsız, yeniden kullanılabilir kod
    ├── api/generated/  # Orval tarafından üretilen API istemcisi (elle düzenlenmez)
    ├── ui/             # Tasarım sistemi bileşenleri (button, form, table, dialog, ...) ve özel bileşenler (data-table, confirm-dialog, ...)
    ├── hooks/          # Genel amaçlı hook'lar (debounce, confirm-dialog, smooth-loading)
    ├── lib/            # Küçük yardımcı fonksiyonlar (cn, tarih/fiyat formatlama, token storage, hata yönetimi, ...)
    ├── i18n/           # Çeviri dosyaları ve i18next konfigürasyonu
    ├── config/         # Uygulama geneli sabitler ve env erişimi
    └── store/          # Zustand store'ları (auth-store)
```

Import kuralı: alt katmanlar üst katmanlardan import edemez (`shared`, `entities`'i
tanımaz; `entities`, `features`'ı tanımaz; ve bu şekilde devam eder). Birden fazla
dosya içeren her katman, dışa açık API'sini bir `index.ts` üzerinden yeniden export eder.

### Sayfalar

- **Auth** — giriş (`/signin`). Token'lar cookie'de tutulur, süresi dolmadan önce
  arka planda otomatik yenilenir (`app/axios/proactive-refresh.ts`).
- **Dashboard** — giriş yapan kullanıcıya karşılama ve ürün istatistikleri özeti
  (`widgets/product-stats`: toplam ürün, stok durumu vb.).
- **Ürünler** — listeleme/filtreleme (`product-table`), oluşturma, güncelleme ve
  detay görüntüleme (`product-form`, `product-view`).
- **404 (Not Found)** — bilinmeyen bir route'a gidildiğinde gösterilir; dashboard'a
  veya ürünlere dönüş linki içerir.
- **Error Boundary** — render sırasında beklenmeyen bir hata oluştuğunda uygulamanın
  tamamen çökmesini engelleyen genel hata ekranı; dashboard'a dönüş linki sunar.

## Liste Verisinin Güncel Kalması

Ürün listesi, TanStack Query'nin `refetchInterval` özelliği ile her
`PRODUCTS_LIST_REFETCH_INTERVAL_MS` (30 saniye) periyodunda arka planda otomatik
olarak yeniden çekilir (`entities/products/queries.ts` → `useProducts`). Böylece bir
ürün başka bir yerden (örn. mobil uygulamadan) güncellendiğinde, web'de liste açık
kalsa bile en geç 30 saniye içinde güncel veriyi yansıtır — kullanıcının sayfayı
yenilemesine gerek kalmaz. Oluşturma/güncelleme/silme gibi kendi yaptığımız
mutasyonlardan sonra ise `useProductsInvalidateQueries` ile ilgili cache anında
invalidate edilip beklemeden yeniden çekilir.

## API İstemcisi

`src/shared/api/generated` altındaki API katmanı elle yazılmaz, üretilir. Backend'in
OpenAPI şemasından (`src/shared/api/swagger.json`) Orval ile, tag başına ayrı klasörler
halinde (`auth`, `products`, `lookups`, `models`) üretilir (bkz. `orval.config.ts`).
Backend sözleşmesi değiştiğinde yeniden üretmek için:

```bash
pnpm generate:api
```

`entities/<domain>/queries.ts`, üretilen react-query hook'larının üzerine ince bir
katmandır; response cast'leme ve uygulamaya özgü query kompozisyonu (örn. `entities/profile`
altında `useGetCurrentUser`) burada yaşar.

## Kod Kalitesi ve Git Hook'ları

Bu repo kalite kontrollerini otomatik olarak uygular, bu yüzden manuel çalıştırmayı
hatırlamanız gerekmez:

- **ESLint** — `vite-plugin-checker` ile dev sunucusunda canlı çalışır ve gerçek
  hataları (kullanılmayan değişken, hatalı hook kullanımı gibi kural ihlallerini)
  tarayıcı overlay'inde engeller.
- **Husky pre-commit** — `lint-staged` çalıştırır; yalnızca commit edilen dosyaları
  lint'ler (ve otomatik düzeltir).
- **Husky commit-msg** — commit mesajını Conventional Commits'e göre `commitlint` ile
  doğrular. Kurala uymayan mesajlar reddedilir.

### Commit mesaj formatı

```
<tip>(<opsiyonel kapsam>): <özet>

<opsiyonel gövde>
```

Yaygın tipler: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `style`, `perf`, `ci`, `build`, `revert`.

```bash
git commit -m "feat(products): stok filtresine kategori eklendi"
```

Ya da mesajı elle yazmak yerine etkileşimli istemi kullanın:

```bash
pnpm commit
```

## Çoklu Dil Desteği

Çeviri dosyaları `src/shared/i18n/<dil>/*.json` altında, özellik alanı başına bir
namespace olacak şekilde (`common`, `auth`, `dashboard`, `products`) tr, en ve ru için
bulunur. Varsayılan ve fallback dil `tr`'dir; kullanıcının daha önce açıkça seçtiği dil
`localStorage`'da hatırlanır, tarayıcı/işletim sistemi dili dikkate alınmaz. Dil
değiştirme header'daki `language-switcher` widget'ından yapılır.

## Responsive Tasarım

Uygulama tamamen responsive'dir; mobil, tablet ve masaüstü ekranlarda kullanılabilir.
Sidebar geniş ekranlarda sabit bir panel olarak, dar ekranlarda ise açılıp kapanan bir
mobil menüye (`use-mobile-nav`) dönüşür. Layout ve bileşenler Tailwind'in `md:` gibi
breakpoint'leriyle ekran boyutuna göre uyarlanır (bkz. `widgets/layouts/dashboard-layout`).
