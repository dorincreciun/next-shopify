# next-shopify

Aplicație fullstack Next.js cu arhitectură **Feature Slice Design**, separare clară între zona de **admin** și zona de **client**, și un layer de **backend** bazat pe API Routes + Server Actions.

---

## Structura proiectului

```
next-shopify/
├── public/
└── src/
    │
    ├── app/                                    # Next.js App Router
    │   │
    │   ├── (admin)/                            # Route group PRIVAT — necesită autentificare admin
    │   │   ├── admin/
    │   │   │   ├── dashboard/
    │   │   │   │   └── page.tsx
    │   │   │   ├── products/
    │   │   │   │   ├── page.tsx                # lista produse
    │   │   │   │   ├── new/page.tsx            # creare produs nou
    │   │   │   │   └── [id]/page.tsx           # editare produs
    │   │   │   ├── orders/
    │   │   │   │   └── page.tsx
    │   │   │   ├── users/
    │   │   │   │   └── page.tsx
    │   │   │   └── settings/
    │   │   │       └── page.tsx
    │   │   └── layout.tsx                      # AdminShell — sidebar + header admin
    │   │
    │   ├── (client)/                           # Route group PUBLIC — accesibil fără autentificare
    │   │   ├── shop/
    │   │   │   └── [category]/page.tsx
    │   │   ├── product/
    │   │   │   └── [slug]/page.tsx
    │   │   ├── cart/
    │   │   │   └── page.tsx
    │   │   ├── checkout/
    │   │   │   └── page.tsx
    │   │   ├── account/
    │   │   │   ├── orders/page.tsx
    │   │   │   └── profile/page.tsx
    │   │   ├── layout.tsx                      # ClientShell — navbar + footer
    │   │   └── page.tsx                        # Homepage
    │   │
    │   ├── api/                                # BACKEND — Route Handlers (REST endpoints)
    │   │   ├── products/
    │   │   │   ├── route.ts                    # GET /api/products, POST /api/products
    │   │   │   └── [id]/route.ts               # GET, PUT, DELETE /api/products/:id
    │   │   ├── orders/
    │   │   │   └── route.ts
    │   │   ├── auth/
    │   │   │   ├── [...nextauth]/route.ts
    │   │   │   └── register/route.ts
    │   │   └── webhooks/
    │   │       └── stripe/route.ts
    │   │
    │   ├── actions/                            # BACKEND — Server Actions (mutații din componente)
    │   │   ├── product.actions.ts
    │   │   ├── order.actions.ts
    │   │   └── auth.actions.ts
    │   │
    │   └── layout.tsx                          # Root layout — fonturi, providers globali
    │
    ├── features/                               # Feature Slice Design — logică izolată pe domeniu
    │   │
    │   ├── auth/                               # Autentificare
    │   │   ├── api/                            # fetch calls către /api/auth
    │   │   ├── hooks/                          # useAuth, useSession
    │   │   ├── store/                          # Zustand slice auth
    │   │   ├── ui/                             # LoginForm, RegisterForm
    │   │   └── types.ts
    │   │
    │   ├── products/                           # Produse (zona client)
    │   │   ├── api/
    │   │   ├── hooks/                          # useProducts, useProduct
    │   │   ├── store/
    │   │   ├── ui/                             # ProductCard, ProductGrid, ProductFilters
    │   │   └── types.ts
    │   │
    │   ├── cart/                               # Coș de cumpărături
    │   │   ├── hooks/                          # useCart
    │   │   ├── store/                          # Zustand cart store
    │   │   ├── ui/                             # CartItem, CartSummary
    │   │   └── types.ts
    │   │
    │   ├── checkout/                           # Procesare comandă
    │   │   ├── api/
    │   │   ├── hooks/                          # useCheckout
    │   │   ├── ui/                             # CheckoutForm, OrderSummary
    │   │   └── types.ts
    │   │
    │   ├── admin-dashboard/                    # Feature exclusiv admin
    │   │   ├── hooks/                          # useStats, useSalesData
    │   │   └── ui/                             # StatsCard, SalesChart, RecentOrders
    │   │
    │   ├── admin-products/                     # CRUD produse (zona admin)
    │   │   ├── api/
    │   │   ├── hooks/                          # useAdminProducts
    │   │   └── ui/                             # ProductForm, ProductTable, ImageUpload
    │   │
    │   └── admin-orders/                       # Management comenzi (zona admin)
    │       ├── api/
    │       ├── hooks/
    │       └── ui/                             # OrderTable, OrderStatusBadge
    │
    ├── shared/                                 # Cod reutilizabil global (fără logică de business)
    │   ├── ui/                                 # Button, Input, Modal, Table, Badge, Spinner
    │   ├── hooks/                              # useDebounce, useLocalStorage, useMediaQuery
    │   ├── utils/                              # formatPrice, formatDate, cn (classnames)
    │   ├── types/                              # tipuri TypeScript globale
    │   └── constants/                          # ROUTES, API_ENDPOINTS, CONFIG
    │
    ├── lib/                                    # Inițializări clienți externi
    │   ├── prisma.ts                           # Singleton Prisma Client
    │   ├── auth.ts                             # NextAuth config
    │   ├── stripe.ts                           # Stripe client
    │   └── cloudinary.ts                       # Cloudinary config
    │
    └── server/                                 # Logică EXCLUSIV server-side (nu se importă în client)
        ├── repositories/                       # Acces direct la baza de date
        │   ├── product.repository.ts
        │   ├── order.repository.ts
        │   └── user.repository.ts
        ├── services/                           # Business logic
        │   ├── product.service.ts
        │   ├── order.service.ts
        │   └── payment.service.ts
        └── validators/                         # Zod schemas pentru validare
            ├── product.schema.ts
            └── order.schema.ts
```

---

## Reguli de arhitectură

### Separarea layerelor

| Layer | Poate importa din | Nu poate importa din |
|---|---|---|
| `app/` (pages) | `features/`, `shared/`, `lib/` | `server/` direct |
| `features/` | `shared/`, `lib/` | alte `features/` |
| `shared/` | nimic intern | `features/`, `server/` |
| `app/api/` & `app/actions/` | `server/services/`, `lib/` | — |
| `server/` | `lib/` | `features/`, `shared/` |

### Route groups

- `(admin)/` — toate paginile din această zonă sunt protejate. Verificarea sesiunii se face în `middleware.ts` sau direct în `layout.tsx`.
- `(client)/` — accesibil public. Unele sub-rute (ex. `/account`) necesită autentificare de utilizator obișnuit.

### Zustand stores

Fiecare feature care are nevoie de state global definește propriul slice Zustand în `features/<name>/store/`. Nu există un store global unic.

### Path aliases (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "paths": {
      "@app/*":      ["./src/app/*"],
      "@features/*": ["./src/features/*"],
      "@shared/*":   ["./src/shared/*"],
      "@lib/*":      ["./src/lib/*"],
      "@server/*":   ["./src/server/*"]
    }
  }
}
```

---

## Stack

- **Framework**: Next.js 14+ (App Router)
- **Limbaj**: TypeScript
- **Styling**: Tailwind CSS
- **State management**: Zustand
- **ORM**: Prisma
- **Autentificare**: NextAuth.js
- **Plăți**: Stripe
- **Validare**: Zod
- **Build tool**: Vite / Turbopack