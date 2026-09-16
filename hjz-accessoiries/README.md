# HJZ Accessoiries

Landing page + separate admin panel for an accessories store, built with React, Vite and Supabase.

## What's included

- **Public site** (`/`) — product cards (photo + price). Clicking a card opens the product's page in a new tab.
- **Product page** (`/product/:id`) — up to 5 photos, and an order form: first name, last name, phone number, and all 69 Algerian wilayas. Size selector appears only if the admin enabled sizes for that product.
- **Admin login** (`/admin`) — simple PIN screen.
- **Admin dashboard** (`/admin/dashboard`) — three tabs:
  - *Produits*: add a product (name, price, optional "has sizes" toggle with manually typed sizes, up to 5 photos), see and delete existing products.
  - *Commandes*: every order submitted on the site, with a status you can update (new / contacted / confirmed / cancelled).
  - *Messages*: the support chat — see every visitor conversation and reply as HJZ.
- **Support chat** — a floating button on every public page. Messages are stored in Supabase and sync live between the visitor and the admin dashboard (Supabase Realtime).

## 1. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** → **New query**, paste the contents of `supabase/schema.sql`, and run it. This creates the `products`, `orders`, and `chat_messages` tables plus the `product-images` storage bucket, all with permissive public-access policies (see the security note below).
3. Go to **Project Settings → API** and copy the **Project URL** and **anon public key**.

## 2. Configure the app

```bash
cp .env.example .env
```

Fill in `.env`:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_ADMIN_PIN=choose-a-pin-or-password
```

## 3. Run it locally

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` for the storefront and `http://localhost:5173/admin` for the admin login.

## 4. Deploy on Vercel

1. Push this project to a GitHub repo.
2. Import it in Vercel (framework preset: Vite).
3. Add the three environment variables from `.env` in Vercel's Project Settings → Environment Variables.
4. Deploy. The admin panel lives at `yourdomain.com/admin` — it isn't linked from the main navigation, only from a small "Espace administration" link in the footer.

## Security note

The admin panel is protected by a PIN typed against `VITE_ADMIN_PIN`, checked in the browser — that keeps casual visitors out, but it is **not** real authentication: the PIN ships inside the built JavaScript, and the current database policies let anyone with the public anon key read and write products, orders and chat directly. That's an intentional simplification to get you moving fast.

Before you're taking real customer data at scale, it's worth upgrading to Supabase Auth (email/password or magic link) for the admin account, and tightening the RLS policies in `supabase/schema.sql` so that only an authenticated admin can insert/update/delete products and read orders/chat. Happy to help wire that up when you're ready.

## Customizing

- Colors, fonts and spacing are all CSS variables at the top of `src/index.css` (`--bg`, `--gold`, `--serif`, etc.) — change them once and the whole site follows.
- The wilaya list lives in `src/data/wilayas.js`.
- Currency is displayed as `DA` (Algerian Dinar) in `ProductCard.jsx` and `ProductDetail.jsx`.
