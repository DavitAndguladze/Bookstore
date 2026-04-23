# Bookstore Backend

Production-style REST API for an online bookstore. Built as a portfolio project.

## Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express v5
- **Database:** PostgreSQL 16
- **ORM:** Prisma v7
- **Auth:** JWT
- **Payments:** Stripe
- **Infrastructure:** Docker Compose

## Getting Started

### Prerequisites

- Docker Desktop installed and running

### Run the app

```bash
# From the project root (where docker-compose.yml lives)
docker compose up
```

The API will be available at `http://localhost:3000`.
Swagger UI (API docs) at `http://localhost:3000/api/docs`.

### Rebuild after dependency changes

```bash
docker compose up --build
```

### Run a migration inside the container

```bash
docker compose exec backend npx prisma migrate dev --name <migration_name>
```

### Access the database

```bash
docker compose exec postgres psql -U postgres -d bookstore
```

---

## Environment Variables

Create a `.env` file at the **project root** (next to `docker-compose.yml`):

```env
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
PORT=3000
NYT_API_KEY=your_nyt_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

---

## API Modules

### Auth — `/api/auth`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/register` | Public | Register a new user |
| POST | `/login` | Public | Login and receive JWT |

### Books — `/api/books`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | List books (supports `title`, `author`, `genre`, `minPrice`, `maxPrice` query params) |
| GET | `/:id` | Public | Get single book |
| POST | `/` | Admin | Create a book |
| PATCH | `/:id` | Admin | Update a book |
| DELETE | `/:id` | Admin | Delete a book |

### Cart — `/api/cart`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Auth | Get current cart |
| POST | `/items` | Auth | Add item to cart |
| PATCH | `/items/:id` | Auth | Update item quantity |
| DELETE | `/items/:id` | Auth | Remove item from cart |

### Orders — `/api/orders`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/` | Auth | Place order from active cart |
| GET | `/` | Auth | Get all orders for current user |
| GET | `/:id` | Auth | Get single order (ownership check) |

### Payments — `/api/payments`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/:orderId` | Auth | Create Stripe Payment Intent, returns `clientSecret` |
| POST | `/webhook` | Stripe | Webhook — updates order to `PAID` or `FAILED` |

### Reviews — `/api/books/:id/reviews`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/` | Auth | Submit a review (rating 1–5, one per user per book) |
| GET | `/` | Public | Get all reviews for a book |

### NYT — `/api/nyt`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/lists` | Public | Get all synced NYT bestseller lists |
| GET | `/lists/:listName` | Public | Get books on a specific list |
| POST | `/sync-all` | Admin | Manually trigger sync of all lists |
| POST | `/sync/:listName` | Admin | Manually sync a specific list |

### Homepage — `/api/homepage`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | Get all featured books |
| POST | `/` | Admin | Add a book to a featured section |
| DELETE | `/:id` | Admin | Remove a featured entry |

### Addresses — `/api/addresses`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Auth | Get all addresses for current user |
| POST | `/` | Auth | Add a new address |
| DELETE | `/:id` | Auth | Remove an address (ownership check) |

---

## Architecture

Each feature follows the same 4-file module pattern:

```
module.repository.ts  → Prisma queries only, no business logic
module.service.ts     → Business logic, throws AppError
module.controller.ts  → HTTP handlers, try/catch + next(error)
module.routes.ts      → Express Router + Swagger JSDoc
```

```
src/
  config/         → env.ts, db.ts, swagger.ts, nyt.cron.ts
  modules/        → auth, books, cart, orders, nyt, reviews, homepage, address, payments
  shared/
    middleware/   → error.middleware.ts, auth.middleware.ts
    types/        → auth.types.ts
    utils/        → password.utils.ts, jwt.utils.ts
prisma/           → multi-file schema (one .prisma per model)
```

---

## Key Design Decisions

- **IDs are `bigint`** — serialized as strings in JSON responses
- **NYT books** — auto-created with `DRAFT` visibility and price `0.00`. Admin reviews and publishes them.
- **NYT cron** — runs every Sunday midnight, syncs 7 bestseller lists with a 7s delay between calls to respect rate limits
- **Stripe webhook** — registered before `express.json()` in `app.ts` to preserve the raw Buffer required for signature verification
- **Payments flow** — client calls `POST /api/payments/:orderId` → receives `clientSecret` → frontend charges card via Stripe.js → Stripe calls webhook → order status updated to `PAID` or `FAILED`
