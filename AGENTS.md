# AGENTS.md

## Repo shape

- `frontend/` — React 19 + Vite 8 + TypeScript SPA. Tailwind v4, shadcn (`base-mira`), TanStack Query, Zustand, Clerk, Leaflet.
- `backend/` — Express 5 + Mongoose ESM API. Clerk auth, Cloudinary uploads, Socket.io.
- No root `package.json` or workspace. Run npm commands inside each app; each has its own `package-lock.json` and `node_modules`.
- No tests, test runner, migrations, or codegen. Mongoose models in `backend/models/` are the schema source of truth.

## Commands

```bash
# frontend
cd frontend
npm run dev
npm run lint
npm run build        # tsc -b && vite build

# backend
cd backend
npm run dev          # nodemon index.js
npm start            # node index.js
```

- There is no single-test command. Verify frontend changes with `npm run lint` then `npm run build`. The backend has no lint/typecheck/test script.

## Environment and setup

- Backend `.env` keys (no example file): `NODE_ENV`, `PORT`, `DB_URI`, `SITE_URL`, `BACKEND_URL`, `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `CLERK_WEBHOOK_SIGNING_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
- Frontend `.env` keys: `VITE_API_BASE_URL` (API root including `/api/v1`), `VITE_SOCKET_URL` (backend origin only), `VITE_CLERK_PUBLISHABLE_KEY`.
- `SITE_URL` is the frontend origin: it is the CORS origin for both Express and Socket.io, not the backend URL.
- There is no Vite proxy. Run both servers; the frontend calls absolute URLs.
- Clerk users are created in Mongo only by `POST /api/v1/webhook/clerk`. Until that webhook fires, `protectRoute` returns 404 `"User profile is not synced yet"`. Locally, forward Clerk webhooks (e.g. ngrok) or insert a matching `User` document.
- Property create/update and profile-photo upload use Cloudinary. Property creation requires at least 2 images; multer uses memory storage with a 5 MB per-file limit. Missing Cloudinary credentials break these endpoints.
- Property writes and profile updates use Mongo transactions (`startSession`). Local MongoDB must be a replica set (Atlas works); standalone `mongod` fails.

## Backend conventions and gotchas

- ESM (`"type": "module"`): relative imports need explicit `.js` extensions.
- `index.js` must use `app` and `server` exported from `lib/socket.js`; that is how Socket.io shares the HTTP server.
- Keep the Clerk webhook mounted with `express.raw(...)` before `express.json()`, or signature verification breaks.
- Route order in `routes/properties.route.js` matters: `/featured`, `/statuses`, `/me`, and `/pending` must stay above `/:id`.
- Auth: `protectRoute` resolves a Clerk Bearer token to the Mongo user in `req.user`; `requireAdmin` checks `req.user.role === "admin"`. Client-side dashboard gating is cosmetic.
- API routes live under `/api/v1` (health is `/health`). Response shapes vary (`data`, `properties`, `user`), so check the controller before consuming a new endpoint.
- Socket rooms are Mongo user `_id` strings; emit with `io.to(user._id.toString())`. `userSocketMap` is in-memory, so realtime works only on a single backend instance.
- Global rate limit is 500 requests / 10 min; save/unsave is 10 / min. Repeated manual testing can hit these.

## Frontend conventions and gotchas

- `@/` maps to `frontend/src`.
- `verbatimModuleSyntax`, `erasableSyntaxOnly`, and `noUnused*` are enabled: use `import type`, avoid TS enums/namespaces/parameter properties, and remove unused vars or the build fails.
- Tailwind v4 has no config file. Theme tokens live in `src/index.css` under `@theme inline`; use semantic classes (`bg-primary`, `text-text-secondary`, `bg-section`, `text-success`, etc.) and the custom `xs` breakpoint instead of raw hex colors.
- UI primitives are shadcn `base-mira` built on `@base-ui/react`, not Radix. Triggers use the `render` prop rather than `asChild`. App code uses `lucide-react`; Hugeicons appear inside `components/ui` primitives.
- Some component folders contain spaces: `components/dashboard/add property/`, `components/property details/`, `components/dashboard/pending properties/`, and `components/dashboard/properties/edit property/`. Quote paths in shell commands.
- Auth and socket lifecycle are centralized in `useInitAuth()` (`stores/useAuthStore.ts`) and the singleton in `lib/socket.ts`. Do not create extra socket clients; set `socket.auth = { token }` before connect/reconnect.
- React Compiler is enabled in `vite.config.ts`; do not add manual memoization by default.
- Fetch through `lib/apiCalls.ts`; server state uses TanStack Query, auth/user state uses Zustand.

## Current gaps (do not assume these exist)

- README claims Stripe, proposals, and transactions, but there is no Stripe dependency, no transactions route/page (`/dashboard/transactions` is a dead sidebar link), and proposals have only a model plus placeholder UI.
- Chat is not end-to-end: conversations can be created and listed, but there is no messages API and no socket send/receive events. `DashboardInboxChat` is a UI placeholder.
- Public `GET /properties` only excludes `Rejected`, so `Pending` listings are visible despite the README saying approval gates visibility. `GET /properties/featured` returns only `Available`.
