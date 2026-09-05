# 🏰 HAVEN — Premier Luxury Real Estate Portal

A responsive, production-ready real estate property listing portal built with **Next.js (latest v16.3.4)**, **React 19**, **TypeScript**, and **Material UI (MUI v6)**. Designed with a luxury aesthetic, debounced location search, multi-faceted filtering, full pagination, dynamic property detail routing, interactive mortgage/EMI calculator, and real-time form validation.

---

## 🌟 Key Highlights & Feature Matrix

| Feature | Implementation | Details |
| :--- | :--- | :--- |
| **1. Property Cards** | `PropertyCard.tsx` | High-res photography, Title, Price formatted (₹ Cr / Lacs / /mo), Location with pin icon, BHK, Baths, Carpet area, Verified badge, and animated Favorite toggle. |
| **2. Debounced Search** | `useDebounce.ts` + `HeroSection.tsx` | 350ms custom debounce hook with active search indicator, instant clear button, and trending locality quick-tags (Bandra, Worli, Indiranagar, Whitefield, DLF Phase 5). |
| **3. Buy / Rent Toggle** | `FilterBar.tsx` + `Navbar.tsx` | Segmented toggle with instant pricing scale adaptation (Crores for sale vs /mo for rent) and synced with active navigation tabs. |
| **4. BHK Filtering** | `FilterBar.tsx` + `MobileFilterDrawer.tsx` | Multi-select chips for 1 BHK, 2 BHK, 3 BHK, 4 BHK, 5 BHK with instant reactive filtering. |
| **5. Full Pagination** | `PropertyGrid.tsx` | Configurable items per page (6 / 9 / 12), smooth auto-scroll to top, first/last page jump buttons, and range counter (*"Showing 1–6 of 24 residences"*). |
| **6. Dynamic Detail Page** | `src/app/properties/[id]/page.tsx` | Next.js App Router dynamic route with high-res photo gallery with thumbnails, specs grid, RERA title verification, amenities with icons, and similar listings. |
| **7. Skeleton Loader** | `PropertyCardSkeleton.tsx` | Exact 1:1 anatomical skeleton placeholders with animated wave effect during initial data fetching and transitions. |
| **8. Mobile Responsive** | `MobileFilterDrawer.tsx` | Responsive CSS Grid (1 col on mobile, 2 on tablet, 3 on desktop) + floating action button opening a slide-up bottom filter drawer on mobile viewports. |
| **9. Form Validation** | `ContactAgentModal.tsx` + `ListPropertyModal.tsx` | Strict validation with inline errors (Phone: 10 digits regex, Email: RFC regex, Name: min 3 chars, Date: future check, Price & Area numeric checks) + confirmed reference code. |
| **10. "List Property Free"** | `ListPropertyModal.tsx` | Fully functional modal allowing direct owners to publish properties live into portal state with immediate listing feedback. |
| **11. Functional Navigation** | `Navbar.tsx` + `Footer.tsx` | Working header tabs ("Explore All", "Buy", "Rent", "Featured Penthouses"), working footer locality filters ("Bandra", "Worli", "Koregaon Park"), newsletter with regex validation, and legal policy modals (Privacy, Terms, RERA). |
| **12. Saved Favorites** | `useFavorites.ts` | Persistent localStorage bookmarking with heart icons and dedicated "Saved Favorites" view toggle. |

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16.3.4](https://nextjs.org/) (App Router, Turbopack)
- **UI Library**: [Material UI (MUI v6)](https://mui.com/) (`@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`)
- **Next.js Integration**: `@mui/material-nextjs` (v16 AppRouterCacheProvider)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type-checking)
- **Typography**: [Google Font Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via `next/font/google`
- **Data Source**: `src/data/properties.json` (24 rich, diversified residential listings covering all BHKs and Buy/Rent categories)

---

## 📁 Project Structure

```
real-estate-portal/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout with Plus Jakarta Sans & ThemeRegistry
│   │   ├── page.tsx                    # Main Property Listing Page (Hero, Filters, Grid, Pagination)
│   │   ├── properties/
│   │   │   └── [id]/
│   │   │       └── page.tsx            # Dynamic Property Detail View (/properties/[id])
│   │   └── globals.css                 # Custom scrollbar, selection styling, smooth scroll
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx              # Responsive navbar with tabs, favorites badge, list property trigger
│   │   │   └── Footer.tsx              # Luxury footer with city/locality filters & newsletter validation
│   │   ├── listing/
│   │   │   ├── HeroSection.tsx         # Hero banner with debounced search & trust metrics
│   │   │   ├── FilterBar.tsx           # Buy/Rent toggle, BHK chips, Price slider, Sort dropdown
│   │   │   ├── ActiveFilters.tsx       # Dismissible active filter pills & clear all
│   │   │   ├── PropertyCard.tsx        # Card with badges, formatted price, specs, favorite toggle
│   │   │   ├── PropertyCardSkeleton.tsx # Anatomical skeleton loader
│   │   │   ├── PropertyGrid.tsx        # Grid layout with pagination & empty state
│   │   │   ├── MobileFilterDrawer.tsx  # Floating button & slide-up drawer for mobile screens
│   │   │   └── ListPropertyModal.tsx   # Direct owner property listing form with full validation
│   │   ├── detail/
│   │   │   ├── PropertyGallery.tsx     # Hero image with interactive thumbnail selector
│   │   │   ├── PropertyOverview.tsx    # Specs table (BHK, baths, carpet area, facing, floor)
│   │   │   ├── AmenitiesList.tsx       # Amenities grid with dedicated Material icons
│   │   │   ├── EmiCalculator.tsx       # Interactive mortgage & EMI loan slider calculator
│   │   │   ├── ContactAgentModal.tsx   # Tour scheduling dialog with phone/email/date validation
│   │   │   └── SimilarProperties.tsx   # Related properties recommendations
│   │   └── common/
│   │       ├── ThemeRegistry.tsx       # App Router Emotion Cache & MUI ThemeProvider
│   │       ├── ToastNotification.tsx   # Alert notifications for favorites, share, subscriptions
│   │       └── PolicyModal.tsx         # Privacy, Terms of Service, and RERA compliance modal
│   ├── data/
│   │   └── properties.json             # 24 diverse properties across Mumbai, Bengaluru, Gurugram, etc.
│   ├── hooks/
│   │   ├── useDebounce.ts              # Generic debounce hook for location search
│   │   └── useFavorites.ts             # LocalStorage persistent favorites manager
│   ├── theme/
│   │   └── theme.ts                    # Custom Luxury Real Estate MUI theme
│   ├── types/
│   │   └── property.ts                 # TypeScript interfaces (Property, FilterState, etc.)
│   └── utils/
│       └── formatters.ts               # Indian currency formatters (₹ Cr, Lacs, /mo)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started (Local Development)

### 1. Prerequisites
- **Node.js**: v18+ (tested on Node v24.18)
- **npm**: v9+ (tested on npm 11.16)

### 2. Installation
```bash
# Navigate to project directory
cd real-estate-portal

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🌐 Bonus: Deployment on Vercel

1. Push this project to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: complete luxury real estate portal assignment"
   git branch -M main
   git remote add origin https://github.com/<your-username>/real-estate-portal.git
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Select Framework Preset: **Next.js** (Root directory: `./` if repo root is the project folder).
5. Click **Deploy**. Vercel will automatically build and deploy with zero configuration needed.
