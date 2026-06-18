# IDF Digital Signage — Agent Instructions

These instructions apply to all work in this repository. Always follow them when
adding features, refactoring, or styling. The product is a **view-only Digital
Signage / Dashboard** website that runs continuously on a TV screen. It is
**non-interactive** (no mouse, no touch) and optimized for viewing from a
distance.

## Technical Stack

- **Frontend:** React (with Vite) + Tailwind CSS.
- **Backend:** Node.js with Express.
- **Libraries:** `xlsx` or `exceljs` (parse Excel on the backend), `cors`.
- **Direction:** RTL (Right-to-Left) with full Hebrew support.

## Color Palette (REQUIRED)

The palette must convey **trust and high society**. Use a **navy blue** base
accented with **cyan**.

- **Primary / Backgrounds:** Deep navy blue (e.g. `#0A1F44`, `#0D2A5C`,
  `#102E63`). Use navy for headers, footer, screen backgrounds, and card bases.
- **Accent / Highlights:** Cyan (e.g. `#22D3EE`, `#06B6D4`, `#38BDF8`). Use cyan
  for the active screen title, key values (clock, temperatures), borders,
  dividers, ticker accents, and focal numbers.
- **Text:** High-contrast white / near-white (`#FFFFFF`, `#F8FAFC`) on navy.
  Secondary text may use a light slate/cyan tint (`#CBD5E1`, `#A5F3FC`).
- **Warnings (Safety/Discipline only):** Keep high-contrast warning colors
  (amber/red borders) where the spec demands strict warnings, but blend them
  into the navy/cyan theme rather than replacing it.
- Maintain strong contrast at all times for distance readability. Avoid low-
  contrast navy-on-navy or cyan-on-white combinations.

Prefer defining these as CSS variables / Tailwind theme tokens (in `theme.json`,
`tailwind.config.js`, or `src/styles/theme.css`) and referencing the tokens
instead of hardcoding hex values across components.

## UI & UX Core Rules (TV Optimization)

1. **Typography:** All text must be extra-large (`text-4xl`, `text-6xl`,
   `text-8xl`). Colors must be high-contrast.
2. **Layout:** Fullscreen (`100vh` / `100vw`), **no scrollbars**
   (`overflow-hidden`).
3. **Resolution:** Optimized for standard TV screens (1080p / 4K).

## Layout Architecture

The screen is split into 3 vertical sections:

### 1. HEADER (fixed at top)

- Flexbox row distributing items to the sides and center.
- **Right side:** Day of the week, digital clock (`HH:MM:SS`), current weather
  (icon + temp).
- **Center:** Dynamic title that changes with the active screen (render in
  **cyan** for emphasis on navy).
- **Left side:** Hebrew date + Gregorian date.
- **Logos:** Two round, high-quality placeholder avatar-style image slots next
  to the dates.

### 2. FOOTER (fixed at bottom)

- Horizontal ticker / marquee banner with important updates and announcements.
- Text scrolls continuously and smoothly from left to right.
- **Data source:** Fetch from the Node.js backend API which reads an Excel file.
- Use a navy background with a cyan accent line/glow.

### 3. MAIN CONTENT AREA (center — dynamic carousel)

- Automatically cycles through **6 screens**.
- Transition: smooth fade-in / fade-out, default every **15 seconds**. Keep the
  interval **configurable in code** (single constant / config value).

## The 6 Screens

1. **המסך הבית (Home):** Top banner placeholder for "רוח צה"ל"; calendar
   component (Gregorian + Hebrew date, day, upcoming Israeli holidays/מועדים);
   bottom info box with unit-wide daily notes placeholder.
2. **מסך נהלים (Procedures):** 3 large cards — יוהל"ם, סמים ואלכוהול (zero
   tolerance), ביטחון מידע.
3. **מסך משמעת (Discipline):** 4 equal blocks — הופעה ולבוש, דלת פתוחה, מסדרים
   ותורנויות, הצדעה.
4. **מסך שירותי היחידה (Unit Services):** grid of hours & locations — כוורת,
   חד"א, חד"כ, מספרה, בית כנסת, מרפאה, אפסנאות.
5. **מסך הודעות (Announcements):** left column large notice board; right column
   split into פינות עישון and דרכי הגעה ליחידה.
6. **מסך בטיחות (Safety):** 3 heavy-border warning cards — התגוננות, תדרוך
   יציאה (no טרמפים), נשיאת נשק.

## Backend Requirements (Node.js)

1. Simple Express server.
2. File watcher or read-on-request for a local Excel file `updates.xlsx` in the
   server root.
3. Excel has a `Content` column. Parse it and expose `GET /api/updates`
   returning an array of string messages.
4. Always provide a **fallback array** of static strings if the Excel file is
   missing or corrupted — the screen must never break.

## General Engineering Rules

- Keep the app non-interactive: no hover-only content, no click-required flows.
- Centralize timing, screen order, and API URLs in config.
- Fail gracefully everywhere (network, parsing, missing assets) so the display
  never shows an error screen or goes blank.
- Keep components clean, large-typography, and consistent with the navy + cyan
  theme.
