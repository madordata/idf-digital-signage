# Digital Signage Dashboard - Ruach Tzahal Unit

A full-screen, non-interactive digital signage dashboard designed for continuous display on TV screens in military units. Features automatic screen rotation, live ticker updates from Excel backend, RTL Hebrew support, and comprehensive military unit information displays.

## Features

### Frontend (React + Vite)
- **6 Rotating Screens**: Home, Procedures, Discipline, Services, Announcements, Safety
- **Auto-Rotation**: Screens rotate every 15 seconds with smooth fade transitions
- **Live Header**: Real-time clock, Hebrew & Gregorian dates, weather placeholder
- **Scrolling Ticker**: Bottom banner with announcements from backend
- **RTL Support**: Full Hebrew language support with right-to-left layout
- **TV Optimized**: Large text, high contrast, fullscreen (no scrollbars)

### Backend (Node.js + Express)
- **Excel Data Source**: Reads announcements from `updates.xlsx`
- **REST API**: `/api/updates` endpoint for ticker messages
- **Graceful Fallback**: Uses default messages if Excel file unavailable
- **CORS Enabled**: Frontend can fetch from backend easily

## Tech Stack

**Frontend:**
- React 19 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Framer Motion (screen transitions)
- shadcn/ui (UI components)
- Phosphor Icons (iconography)

**Backend:**
- Node.js + Express
- ExcelJS (Excel file parsing)
- CORS (cross-origin support)

**Fonts:**
- Rubik (Hebrew + Latin, headings)
- Assistant (Hebrew optimized, body text)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Sample Excel File

Run the script to generate a sample `updates.xlsx`:

```bash
node create-sample-excel.js
```

This creates an Excel file with sample Hebrew announcements.

### 3. Start the Backend Server

```bash
node server.js
```

The backend will run on `http://localhost:3001`

### 4. Start the Frontend

In a separate terminal:

```bash
npm run dev
```

The frontend will run on `http://localhost:5000` (or the port Vite assigns)

### 5. Open in Browser

Navigate to the frontend URL. For best TV display:
- Press F11 for fullscreen mode
- Use a modern browser (Chrome, Firefox, Edge)

## File Structure

```
/workspaces/spark-template/
├── server.js                    # Express backend server
├── create-sample-excel.js       # Excel file generator script
├── updates.xlsx                 # Excel data file (auto-generated)
├── src/
│   ├── App.tsx                  # Main app with carousel logic
│   ├── components/
│   │   ├── Header.tsx           # Top header with clock & dates
│   │   ├── Ticker.tsx           # Bottom scrolling banner
│   │   └── screens/
│   │       ├── HomeScreen.tsx
│   │       ├── ProceduresScreen.tsx
│   │       ├── DisciplineScreen.tsx
│   │       ├── ServicesScreen.tsx
│   │       ├── AnnouncementsScreen.tsx
│   │       └── SafetyScreen.tsx
│   ├── lib/
│   │   └── hebrewUtils.ts       # Hebrew date conversion utilities
│   └── index.css                # Theme & custom animations
└── PRD.md                       # Product Requirements Document
```

## API Endpoints

### GET /api/updates
Returns ticker messages from Excel file.

**Response:**
```json
{
  "success": true,
  "messages": [
    "ברוכים הבאים ליחידה - מחויבים למצוינות תמיד",
    "..."
  ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "excelFileExists": true
}
```

## Customization

### Change Screen Rotation Interval

Edit `SCREEN_ROTATION_INTERVAL` in `src/App.tsx`:

```typescript
const SCREEN_ROTATION_INTERVAL = 15000; // milliseconds (15 seconds)
```

### Update Ticker Messages

Edit `updates.xlsx` with Excel or LibreOffice. The file has one column named "Content" with messages.

### Modify Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --primary: oklch(0.25 0.05 240);    /* Deep Navy Blue */
  --secondary: oklch(0.45 0.08 120);  /* Olive Green */
  --accent: oklch(0.75 0.15 195);     /* Bright Cyan */
  /* ... */
}
```

### Add/Remove Screens

Edit the `screens` array in `src/App.tsx`:

```typescript
const screens = [
  { id: 'home', title: 'מסך הבית', component: HomeScreen },
  // Add or remove screens here
];
```

## Production Deployment

### Backend
1. Set `PORT` environment variable
2. Place `updates.xlsx` in server root
3. Run: `node server.js`

### Frontend
1. Build: `npm run build`
2. Serve `dist/` folder with any static server
3. Configure API endpoint URL if backend is on different host

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

## Notes

- **Non-Interactive**: No mouse/touch interaction required - fully automated
- **Always On**: Designed to run 24/7 without manual intervention
- **Failsafe**: Uses fallback messages if backend unavailable
- **RTL Native**: Proper Hebrew text rendering and layout

## Support

For issues or questions, refer to the PRD.md for detailed design decisions and component specifications.
