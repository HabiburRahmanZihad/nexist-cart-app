# Nexist Cart — Technical Assessment

> **Fullstack Support Engineer Assessment · Nexist**
> A production-ready e-commerce cart built with Next.js 16, TypeScript, Redux Toolkit, and shadcn/ui.

---

## Live Features

| Feature | Details |
|---|---|
| 🛍 Product catalog | 12 products across 5 categories with ratings, reviews, and badges |
| 🔍 Search & filter | Real-time search + category filter pills |
| 🛒 Cart management | Add, remove, quantity controls, clear all |
| 💾 State persistence | Cart survives page refresh via localStorage |
| 🚫 Duplicate prevention | UI + Redux both guard against duplicate additions |
| 💰 Price calculation | Real-time subtotal, shipping threshold, and order total |
| 🎉 Toast feedback | Success/error notifications on every cart action |
| 📦 Free shipping bar | Animated progress toward the $100 free-shipping threshold |
| 📱 Responsive | 1-column mobile → 4-column desktop grid |

---

## The Client's Problem — and the Fix

**Client report:** *"When I refresh the page, my selected items disappear."*

### Root Cause

Redux store lives in memory. On every page refresh the JavaScript bundle re-executes, a fresh store is created, and the previous cart state is gone — this is the default behaviour of every in-memory state manager.

### Solution: localStorage + Hydration Pattern

Two pieces work together:

**1 — Middleware persists every mutation** (`src/redux/store.ts`)

```ts
const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type === "cart/clearCart") {
    localStorage.removeItem("nexist-cart");
  } else if (action.type.startsWith("cart/") && /* skip UI-only actions */) {
    localStorage.setItem("nexist-cart", JSON.stringify(state.cart.items));
  }
  return result;
};
```

**2 — `CartHydration` component restores state on mount** (`src/providers/CartHydration.tsx`)

```ts
useEffect(() => {
  const saved = localStorage.getItem("nexist-cart");
  if (saved) dispatch(hydrate(JSON.parse(saved)));
}, [dispatch]);
```

This component runs inside `ReduxProvider` at the layout level, so it fires once when the app first loads — **before** any user interaction. `try/catch` handles corrupt data gracefully.

**Why not read localStorage in the Redux initial state?**
Next.js renders components on the server where `window` doesn't exist. Accessing `localStorage` during SSR throws a `ReferenceError`. The `useEffect` approach is strictly client-side and safe.

---

## Duplicate Prevention

Both layers prevent the same product being added twice:

| Layer | Implementation |
|---|---|
| **Redux** | `addToCart` checks `items.some(i => i.id === id)` and silently no-ops |
| **UI** | Button switches to "Added to Cart ✓" state and becomes `disabled` when `isInCart(id)` is true |
| **Visual** | A semi-transparent "In Cart" overlay appears over the product image |

---

## UX Improvements (5 implemented)

1. **Empty cart state** — Animated floating cart icon with a helpful CTA instead of a blank panel
2. **Toast notifications** — `sonner` toasts confirm every add/remove/clear/checkout action with product name and price
3. **Button state change** — "Add to Cart" → "Added to Cart ✓" (disabled) with smooth transition
4. **Free-shipping progress bar** — Shows how far the user is from the $100 free-shipping threshold, updates live
5. **Clear cart button** — One-tap clear with confirmation toast; available only when cart has items

---

## Bonus Features

- **Quantity controls** (+ / −) per item in the cart sidebar; decreasing to 0 auto-removes the item
- **Total price calculation** — subtotal, conditional shipping fee, and order total update in real time
- **Search + category filter** — instant filtering with a "no results" empty state and "Clear filters" shortcut
- **Framer Motion animations** — card hover lift, staggered grid entry, add/remove slide transitions, animated cart-count badge, floating empty-cart icon

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| State | Redux Toolkit + React-Redux |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui + Radix UI |
| Animation | Framer Motion |
| Toasts | Sonner |
| Icons | Lucide React |

---

## Project Structure

```
src/
├── app/
│   ├── globals.css         # Design tokens (violet primary, dark mode)
│   ├── layout.tsx          # Root layout: providers, Navbar, CartSidebar, Toaster
│   └── page.tsx            # Hero + ProductGrid
├── components/
│   ├── cart/
│   │   ├── CartItem.tsx    # Quantity controls, remove, line total
│   │   ├── CartSidebar.tsx # Sheet drawer, summary, checkout
│   │   └── EmptyCart.tsx   # Animated empty state
│   ├── product/
│   │   ├── ProductCard.tsx # Framer Motion card, Add/Added button
│   │   └── ProductGrid.tsx # Search, category filter, staggered grid
│   ├── shared/
│   │   └── Navbar.tsx      # Sticky header with animated cart badge
│   └── ui/                 # shadcn/ui components (auto-generated)
├── data/
│   └── products.json       # 12 static products across 5 categories
├── hooks/
│   └── useCart.ts          # Typed selector + dispatcher hook
├── providers/
│   ├── CartHydration.tsx   # localStorage → Redux on mount
│   └── ReduxProvider.tsx   # store Provider wrapper
├── redux/
│   ├── cartSlice.ts        # addToCart, removeFromCart, updateQuantity, clearCart, hydrate
│   └── store.ts            # configureStore + localStorageMiddleware
└── types/
    └── index.ts            # Product, CartItem, CartState, Category
```

---

## Architecture Decisions

**Why Redux Toolkit over Zustand/Context?**
The assessment specifies Redux. RTK eliminates boilerplate (no action creators, no switch statements) while keeping the Redux DevTools workflow intact for debugging.

**Why middleware for localStorage instead of `useEffect` in components?**
Reducers must be pure. The middleware intercepts after the reducer runs, reads the new state, and persists it — zero coupling between the persistence layer and UI components.

**Why App Router over Pages Router?**
App Router is the current Next.js standard. Server Components render the Hero and static shell; Client Components (`"use client"`) are scoped to interactive islands (cart, product cards, search).

**Why Sonner over shadcn Toast?**
shadcn deprecated its own Toast in favour of Sonner. Sonner has a simpler API and better stacking behaviour out of the box.

---

## Setup Instructions

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd nexist-cart-app

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
open http://localhost:3000
```

**Production build:**
```bash
npm run build && npm start
```

No environment variables required — the app is fully static.

---

## E2E Testing — Issues Found & Fixed

| # | Issue | How to reproduce | Fix applied |
|---|---|---|---|
| 1 | Cart cleared on refresh | Add items, then hit F5 | localStorage middleware + CartHydration |
| 2 | Same product added twice | Rapid double-click on "Add to Cart" | Reducer no-ops on duplicate id; button disabled |
| 3 | Cart total stale after qty change | Increase item quantity, check total | `totalPrice` computed from `quantity * price` per item |
| 4 | SSR crash on localStorage access | Any server render without guard | `typeof window !== "undefined"` check in middleware; hydration via `useEffect` only |

---

## Example Git Commit Messages

```
feat: scaffold Next.js project with TypeScript, Tailwind v4, and shadcn/ui

feat: add Redux Toolkit store with cartSlice (add, remove, updateQuantity, clearCart)

fix: persist cart to localStorage via middleware to survive page refresh

feat: implement CartHydration component to restore state from localStorage on mount

feat: add ProductCard with Framer Motion hover animation and Add/Added button state

feat: build ProductGrid with real-time search and category filter

feat: build CartSidebar with quantity controls, free-shipping progress, and checkout

fix: prevent duplicate cart entries in Redux reducer and UI button state

feat: add Sonner toast notifications for all cart actions

style: apply violet design tokens and custom scrollbar to globals.css

docs: write README with setup guide, architecture decisions, and Loom script
```

---

## Loom Video Script (5–8 min)

### 0:00 – 0:30 | Introduction
> "Hi, I'm [your name]. This is my submission for the Nexist Fullstack Support Engineer assessment. I'll walk you through the app, the bug fix, my approach to the UX improvements, and finally show how a non-technical client would use this."

### 0:30 – 1:30 | App Demo
- Open `localhost:3000` — show the hero section and product grid
- Scroll through the 12 products, point out category badges, ratings, and sale prices
- Click the cart icon in the Navbar — show the empty cart state with the animated icon
- Add 2–3 items — show the toast notification, the button changing to "Added to Cart ✓", and the cart badge animating

### 1:30 – 3:00 | The State Persistence Bug
> "The client reported their cart disappearing on refresh. Let me reproduce the original problem."
- Add items to cart, then refresh the page — show the cart is **still populated** (the fix is already live)
- Open DevTools → Application → Local Storage → show the `nexist-cart` key with the JSON data
- Explain: *"Before my fix, the Redux store was reinitialised fresh on every page load. I solved this with two things: a localStorage middleware that saves the cart after every mutation, and a CartHydration component that reads that saved data and dispatches it into the store on the very first client render — before the user sees anything."*

### 3:00 – 4:00 | Duplicate Prevention
> "The assessment also asks for duplicate prevention."
- Add a product. Show the button now says "Added to Cart ✓" and is disabled
- Show the "In Cart" overlay on the product image
- Try adding the same product again — nothing happens
- Explain: *"Prevention happens at two levels: the Redux reducer checks the array before pushing, so even if a bug bypassed the button it would still be a no-op in state."*

### 4:00 – 5:30 | UX Improvements
- **Toast notifications** — Add and remove items, pointing out the green/red toasts
- **Free shipping bar** — Add items until the bar fills and the message changes to "🎉 You qualify for free shipping!"
- **Quantity controls** — Open cart, use + / − buttons, show total updating in real time
- **Clear all** — Click "Clear all" in the sidebar header; show the empty cart animation
- **Search + filter** — Type "coffee" in the search bar; switch to "Electronics" category; show "No products found" empty state with "Clear filters"

### 5:30 – 6:30 | Code Walkthrough
- Show `redux/cartSlice.ts` — point out `hydrate` action and `addToCart` duplicate guard
- Show `redux/store.ts` — point out `localStorageMiddleware`
- Show `providers/CartHydration.tsx` — explain the `useEffect` SSR-safe pattern
- Show `hooks/useCart.ts` — explain the single hook abstraction that keeps components clean

### 6:30 – 7:30 | Non-Technical Client Walkthrough
> "Now I'll explain this the way I would to a non-technical client."
- *"Think of the cart like a shopping basket at a supermarket. When you put something in, it stays there even if you walk out and come back in — that's what this fix does for the website."*
- Walk through the full user journey: browse → search → add to cart → open cart → adjust quantity → see total → checkout
- Show the order confirmation toast

### 7:30 – 8:00 | Wrap-up
> "To summarise: I fixed the state persistence bug with localStorage, added duplicate guards at two independent layers, and implemented five UX improvements including real-time search, quantity controls, toast feedback, an animated empty state, and a free-shipping progress bar. The code is fully typed with TypeScript and follows a clean, modular architecture. Thank you for the opportunity — I'd love to discuss it further."
