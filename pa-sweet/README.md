# Pa Sweet Bakery — Website, AI Cake Studio & Staff Dashboard

Front-end build of the Pa Sweet platform, styled from the Pa Sweet reference sheet (home, shop, product, custom cake designer, cart, account, contact) and the official logo.

**Pa Sweet Bakery** · 70 Wilkinson Road, Freetown (opposite Basha Restaurant) · 030 552220 | 088 111666 · Open 08:00–21:30 · Facebook: Pa Sweet Bakery

## Run it

No build step. Open `index.html` in a browser, or serve the folder:

```bash
npx serve .        # or: python3 -m http.server 8080
```

Deploy to Netlify / GitHub Pages by uploading the folder as-is. `dist/pa-sweet.html` is a single self-contained file (images inlined) if you prefer one file.

## Files

| File | What it is |
|---|---|
| `index.html` | Page shell (fonts, Three.js r128 from cdnjs) |
| `styles.css` | Design system: blush/wine palette, Playfair Display + DM Sans |
| `app.js` | The whole app: router, shop, cart, checkout, AI Cake Studio, 3D cake, account, staff dashboard |
| `assets/` | Logo (from Pa Sweet's logo card) and product photos taken from the reference sheet |
| `schema.sql` | PostgreSQL schema for the production backend, with multi-bakery row-level security |
| `build.py` | Rebuilds `dist/pa-sweet.html` (single file) |

## What works now

- **Pages:** Home (hero slider, bestsellers, categories, banners, celebration planner), Shop (search with typo tolerance, category/price/availability/occasion filters, sorting, grid/list), Product detail (sizes priced per variant, flavour/frosting, gallery zoom, allergen tab, related), Cart (qty, remove, promo codes, you may also like), Checkout (details, collection/delivery zones, date/time inside opening hours with lead-time + capacity + closed-date checks, allergy notes, double-submit protection), Order confirmation, My Account, Contact (enquiry form, FAQs, map), About, Policies.
- **AI Cake Studio:** describe a cake in plain words → structured, editable spec (tiers, shape, size, colours, flavour, filling, decorations, message, occasion, budget) with “still to decide” questions and warnings for branded characters; manual option panels; 6 templates; inspiration photo upload (type/size checks, colour palette extracted on-device); **interactive 3D cake** (Three.js: drag/pinch/zoom, tiers, round/square/heart, drip, pearls, sugar roses, berries, sprinkles, ruffles, candles, star topper, piped message) with a 2D fallback; rule-based price estimate with breakdown and “Price requires bakery review” for complex designs; feasibility checks; save/duplicate designs with revisions; quote request → staff review → quote → customer accepts → checkout.
- **Customer:** profile, order history with status timeline and reorder (re-priced), favourites, saved designs & quotes, Sweet Rewards (points only from completed orders), Celebration Memory Book with reminders, addresses, data export/erase.
- **Dessert box builder:** pick exactly 6 or 12 items.
- **Staff dashboard:** role switcher (Owner/Manager/Baker/Support) with per-role tabs; overview counts from real data; orders (status changes, record payment, history); production kanban (Confirmed → Ready); custom cake requests (quote, request changes, decline, open in Studio); products (price, lead time, on sale, featured, verified allergens, add/edit with photo); ingredient inventory (units, reorder alerts, stock in/used/waste log); promo codes (dates, min spend, usage limits); customers; enquiries inbox; settings (announcement, hero text, lead days, capacity, closed dates, tax, delivery zones, loyalty rate, cake pricing rules); bakeries (multi-bakery onboarding drafts); audit log.

## Demonstration data — please confirm

- **Products and prices** come from the reference design (e.g. Chocolate Fudge Cake Le 350). They are labelled as sample prices until you tick “Prices are confirmed” in Staff → Products.
- **Delivery zones and fees**, custom-cake pricing rules, flavour list, loyalty rate (1 pt / Le 10), capacity limits — all sample values, editable in Staff → Settings.
- **Ingredients and allergens** are blank on purpose. Products show “not confirmed yet — call the bakery” until staff add verified details.
- **About story, policies** are clearly marked placeholders for the owner to write.
- No reviews, ratings or testimonials are invented. Reviews open only to customers with a completed order and need staff approval.
- Product photos are crops from the reference mockup; replace with real Pa Sweet photos when available (Staff → Products → More → Photo).

## Not connected yet (needs a backend / service)

| Feature | Status | What's needed |
|---|---|---|
| Data storage | Saved in the visitor's browser (localStorage) — **not shared** between devices or with staff on other computers | API + PostgreSQL (`schema.sql`) |
| Sign-in | Device-only profile, no password | Auth provider (Supabase Auth, Clerk, Firebase) |
| Online payments | Disabled; orders use “Pay at collection/delivery” | Payment provider for Sierra Leone mobile money/cards (e.g. **Monime**), with server-side verification + webhooks |
| AI text reading | Local keyword parser (labelled in the UI) | LLM API call from the server returning the same spec JSON |
| AI image generation | Not connected; Preview tab shows example photos | Image-generation API |
| Photo analysis | Colour palette only (on-device) | Vision model on the server |
| Email / SMS / WhatsApp | Not sent; screens say so | Email (Resend/SendGrid), SMS/WhatsApp provider |
| Courier tracking | Internal status steps only | Courier integration if used |

## Environment variables (backend)

```
DATABASE_URL=postgres://...
AUTH_SECRET=...
PAYMENT_PROVIDER_KEY=...            # never in front-end code
PAYMENT_WEBHOOK_SECRET=...
AI_API_KEY=...
EMAIL_API_KEY=...
SMS_API_KEY=...
ACTIVE_BAKERY_ID=pa-sweet
```

## Multi-bakery architecture

Every record carries `bakeryId` (`bakery_id` in SQL). The front end reads through tenant-scoped helpers (`T.products()`, `T.orders()`…); the database enforces isolation with row-level security per request (`app.bakery_id`). New bakeries start as drafts and are only published after validation. Pa Sweet is the active storefront.

## Testing checklist

1. Shop → filter by Cakes, sort by price, search “choclate” (typo) → finds Chocolate Fudge Cake.
2. Product → change size (price updates) → Add to Cart → Checkout with a date before the lead time (blocked) → valid date → Place order.
3. Cake Studio → Generate Concepts → edit tiers/colours → Request a Quote.
4. Staff Dashboard → Custom Cake Requests → enter price → Send quote.
5. My Account → Saved Designs → Accept quote → checkout.
6. Staff → Orders → Confirmed → Production board → move through stages → Completed → Rewards points appear.
7. Switch role to Baker → finance/settings tabs disappear.

## Install as an app

**Phone (PWA):** open the live site in Chrome → menu → *Add to Home screen* / *Install app*.

**Android APK:** in GitHub go to *Actions → Build Android APK → Run workflow*. After ~5–8 minutes download `pa-sweet-apk` from the run's Artifacts, unzip it and install `app-debug.apk` (allow “install unknown apps”). This is a debug build for testing and client demos. The Play Store needs a signed release build (AAB).
