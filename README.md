# StokMate

Stok yönetimi case study'si. Repo iki bağımsız projeden oluşur:

```
stokmate-web/
├── server/   → .NET 8 Web API (InMemory veritabanı, JWT + refresh token auth)
└── client/   → React 19 + TypeScript admin paneli (Vite, TanStack Router/Query)
```

İkisi de ayrı ayrı çalıştırılır ve HTTP üzerinden haberleşir.

## Hızlı Başlangıç

**1. API** (`server/`, port `5080`):

```bash
cd server
dotnet run --project src/StokMate.Api
```

**2. Panel** (`client/`, port `5173`):

```bash
cd client
pnpm install
pnpm dev
```

Panelin API'yi bulabilmesi için `client/.env` içinde `VITE_API_BASE_URL=http://localhost:5080`
tanımlı olmalı. Detaylar için [`server/README.md`](server/README.md) ve
[`client/README.md`](client/README.md) dosyalarına bakın; endpoint referansı için
[`server/API.md`](server/API.md).

## Auth Akışı: Access Token + HttpOnly Refresh Cookie

Panel ile API arasındaki oturum yönetimi şu şekilde çalışır:

- **Access token** kısa ömürlüdür, API yanıt gövdesinde döner ve client tarafında
  (`shared/lib/token-storage`) saklanıp her isteğe `Authorization: Bearer` header'ı
  olarak eklenir (`app/axios/interceptors/request.interceptor.ts`).
- **Refresh token** artık response body'de dönmüyor; `AuthController` içindeki
  `SetRefreshTokenCookie` tarafından yalnızca `/auth` altındaki endpoint'lere giden,
  `HttpOnly` + `SameSite=Lax` bir cookie olarak set ediliyor (`login`, `refresh` ve
  `logout` bu mekanizmayı kullanır). JavaScript bu cookie'ye erişemez; tarayıcı isteklerle
  birlikte otomatik gönderir.
- Bu yüzden client `postAuthRefresh({})` çağrısını **boş body ile** yapar
  (`app/axios/refresh-token.ts`) — refresh token'ı kendisi taşımaz, tarayıcı cookie'yi
  otomatik ekler. Axios instance'ı bunun için `withCredentials: true` ile
  konfigüre edilmiştir (`shared/api/instance.ts`).
- Access token süresi dolmadan **~15 saniye önce** proaktif olarak yenilenir
  (`app/axios/proactive-refresh.ts`); ayrıca 401 alan herhangi bir istek de response
  interceptor tarafından otomatik retry edilir.
- `POST /auth/refresh`'te mobil client'lar için token body üzerinden de gönderilebilir,
  ancak cookie geldiyse **cookie önceliklidir**
  (`Request.Cookies["refreshToken"] ?? request.RefreshToken`).
- CORS, credentials'lı (cookie taşıyan) isteklerde wildcard (`*`) origin'e izin
  vermediğinden, `Program.cs` yalnızca loopback origin'lerine (`localhost`, herhangi
  bir port) `AllowCredentials()` ile izin verir.

## Backend Güncellemeleri

Ürün ve kullanıcı modellerine, panelin ihtiyaç duyduğu alanlar eklendi; entity → DTO →
service → seed verisi zincirinin tamamı buna göre güncellendi:

- **`Product`** (`Data/Entities.cs`) — `BrandId`, `SupplierId`, `CostPrice`, `Description`
  alanları eklendi. `ProductService.GetListAsync` artık ürünleri `Brand` ve `Supplier`
  ile birlikte `Include` ederek okuyor; bu dört alan `ProductDto`'da da mevcut, yani
  `GET /products` (liste) yanıtında da dönüyor — önceden yalnızca `GET /products/{id}`
  ile alınabiliyordu.
- **`GET /products/{id}`** — tek bir ürünün tüm alanlarını dönen yeni endpoint
  (`ProductsController.GetById` → `ProductService.GetByIdAsync`).
- **`User`** (`Data/Entities.cs`) ve **`UserDto`** (`Models/AuthDtos.cs`) — `ImageUrl`
  alanı eklendi; `AuthService.ToDto` bunu artık `/auth/login`, `/auth/refresh` ve
  `/auth/me` yanıtlarına dahil ediyor.
- **`DbSeeder`** — test kullanıcısına bir `ImageUrl` (pravatar) atandı; `ProductRows`
  seed dizisindeki her satıra `BrandId`, `SupplierId`, `CostPrice` değerleri ve
  türetilmiş bir `Description` eklendi.
- **Refresh token → HttpOnly cookie** — refresh token artık response body'de
  dönmüyor; `AuthController` içindeki `SetRefreshTokenCookie` tarafından yalnızca
  `/auth` altındaki endpoint'lere giden, `HttpOnly` + `SameSite=Lax` bir cookie
  olarak set ediliyor (detaylar için yukarıdaki "Auth Akışı" bölümüne bakın).
