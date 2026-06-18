# Planning Guide

A non-interactive, full-screen digital signage dashboard for military unit operations, designed to run continuously on TV screens with RTL Hebrew support, cycling through informational screens with live updates from backend data sources.

**Experience Qualities**:
1. **Authoritative**: Clear, bold military aesthetic with high-contrast design that commands attention and conveys official information with unmistakable clarity.
2. **Ambient**: Smooth, unobtrusive transitions that allow the display to function as environmental information without demanding active interaction.
3. **Dependable**: Rock-solid data presentation with graceful fallbacks ensuring the system never fails, maintaining constant uptime for critical unit communications.

**Complexity Level**: Light Application (multiple features with basic state)
The application cycles through 6 information screens, fetches backend data for ticker updates, and manages time-based transitions. While it includes multiple views and data sources, the interaction model is purely automated with no user input required.

## Essential Features

### Auto-Rotating Screen Carousel
- **Functionality**: Automatically cycles through 6 distinct content screens every 15 seconds with smooth fade transitions
- **Purpose**: Ensures all critical unit information is displayed regularly without manual intervention
- **Trigger**: Application load starts the rotation cycle automatically
- **Progression**: App loads → First screen displayed → 15s timer → Fade out → Next screen fades in → Continue cycle
- **Success criteria**: Seamless transitions between all 6 screens with no visual glitches, configurable interval timing

### Live Updates Ticker (Footer Marquee)
- **Functionality**: Continuously scrolling horizontal banner displaying announcements fetched from backend Excel file
- **Purpose**: Provides real-time critical updates and announcements visible on every screen
- **Trigger**: Component mount initiates data fetch and continuous scroll animation
- **Progression**: Backend fetches Excel data → API returns messages array → Frontend receives data → Ticker scrolls RTL continuously
- **Success criteria**: Smooth scrolling motion, automatic data refresh, fallback to default messages if backend unavailable

### Real-Time Clock & Date Display
- **Functionality**: Live updating digital clock (HH:MM:SS) with day of week, Hebrew date, and Gregorian date
- **Purpose**: Provides temporal context for all displayed information
- **Trigger**: Component mount starts clock update interval
- **Progression**: Component mounts → setInterval updates every second → Display refreshes → Hebrew calendar calculated
- **Success criteria**: Accurate time display, proper Hebrew calendar conversion, no performance degradation

### Backend Excel Data Parser
- **Functionality**: Node.js Express server reads local Excel file and exposes data via REST API
- **Purpose**: Allows non-technical staff to update announcements by editing an Excel file
- **Trigger**: API endpoint called by frontend
- **Progression**: GET request to /api/updates → Server reads updates.xlsx → Parse Content column → Return JSON array → Frontend updates ticker
- **Success criteria**: Successfully parses Excel, handles missing files gracefully, returns valid JSON

### Multi-Screen Information Architecture
- **Functionality**: Six dedicated screens covering Home, Procedures, Discipline, Services, Announcements, and Safety
- **Purpose**: Organizes all unit information into logical categories for easy consumption
- **Trigger**: Carousel rotation activates each screen in sequence
- **Progression**: Screen activates → Content fades in → Displays for 15s → Fades out → Next screen
- **Success criteria**: All content readable from distance, proper RTL text rendering, consistent layout patterns

### Hebrew Calendar Integration
- **Functionality**: Displays current Hebrew date and upcoming Israeli holidays
- **Purpose**: Provides culturally relevant calendar information for Hebrew-speaking military unit
- **Trigger**: Component mount and daily refresh
- **Progression**: App loads → Calculate Hebrew date → Fetch holiday list → Display formatted dates
- **Success criteria**: Accurate Hebrew date conversion, proper RTL formatting, holiday list displays correctly

## Edge Case Handling

- **Backend Unavailable**: Fallback to hardcoded default messages array so ticker never shows empty/error state
- **Excel File Missing**: Server returns default messages with console warning instead of crashing
- **Network Timeout**: Frontend uses cached data from previous successful fetch
- **Invalid Excel Format**: Parser validates structure and returns empty array if corrupted, triggering fallback messages
- **Screen Resize**: Layout uses viewport units and flexbox to adapt to any TV resolution automatically
- **Hebrew Rendering Issues**: Explicit RTL directionality on all text containers with unicode-bidi support
- **Long Ticker Messages**: Marquee animation calculates width dynamically to ensure complete message visibility

## Design Direction

The design should evoke military professionalism, reliability, and clarity. Think Israeli Defense Forces visual language: strong geometric shapes, high-contrast color blocking, bold sans-serif typography, and a sense of structured hierarchy. The aesthetic should feel authoritative yet modern, with crisp edges and purposeful spacing that remains legible from across a large room.

## Color Selection

Military-inspired color palette with emphasis on readability and hierarchy.

- **Primary Color**: Deep Navy Blue (oklch(0.25 0.05 240)) - Represents authority, military tradition, and official communications
- **Secondary Colors**: 
  - Olive Green (oklch(0.45 0.08 120)) - Military association, service branches
  - Slate Gray (oklch(0.35 0.02 240)) - Professional backgrounds, card surfaces
- **Accent Color**: Bright Cyan (oklch(0.75 0.15 195)) - High visibility for important callouts, active states, and attention elements
- **Foreground/Background Pairings**: 
  - Primary Navy (oklch(0.25 0.05 240)): White text (oklch(0.98 0 0)) - Ratio 11.2:1 ✓
  - Olive Green (oklch(0.45 0.08 120)): White text (oklch(0.98 0 0)) - Ratio 5.8:1 ✓
  - Slate backgrounds (oklch(0.35 0.02 240)): White text (oklch(0.98 0 0)) - Ratio 8.1:1 ✓
  - Accent Cyan (oklch(0.75 0.15 195)): Navy text (oklch(0.25 0.05 240)) - Ratio 6.4:1 ✓

## Font Selection

Bold, geometric Hebrew-supporting typeface that maintains legibility at large sizes and from distance, with strong visual weight suitable for military/official context.

- **Primary Font**: Rubik (Hebrew + Latin support, geometric sans-serif, excellent screen rendering)
- **Accent Font**: Assistant (Hebrew optimized, clean lines for body text and secondary information)

- **Typographic Hierarchy**:
  - H1 (Screen Titles): Rubik Bold/64px/tight tracking/-0.02em
  - H2 (Section Headers): Rubik SemiBold/48px/normal tracking
  - H3 (Card Titles): Rubik Medium/36px/normal tracking
  - Body Large (Main Content): Assistant SemiBold/32px/relaxed leading/1.6
  - Body Medium (Details): Assistant Regular/28px/relaxed leading/1.5
  - Clock Display: Rubik Bold/56px/tabular nums/monospace figures
  - Ticker Text: Assistant Bold/40px/uppercase where appropriate

## Animations

Animations should be minimal and functional, supporting the ambient nature of the display while ensuring smooth transitions that don't distract from information consumption.

- **Screen Transitions**: 800ms cross-fade (opacity) with ease-in-out timing for seamless content rotation
- **Ticker Scroll**: Linear continuous motion at 50px/second, infinite loop with seamless wrap-around
- **Clock Updates**: No animation on second updates to avoid distraction, simple text replacement
- **Component Entry**: 400ms fade-in on mount for graceful initial load
- **Data Updates**: 300ms subtle pulse on ticker when new data fetched from backend

## Component Selection

- **Components**: 
  - Card (primary container for all 6 screen layouts and info blocks)
  - Badge (for status indicators, category labels, holiday markers)
  - Separator (visual dividers between header sections)
  - Alert (for important warnings on Safety screen)
  - ScrollArea (if any screen content exceeds viewport, though should be avoided)
  
- **Customizations**: 
  - Custom Marquee component for ticker with continuous RTL animation
  - Custom ScreenCarousel component managing fade transitions and auto-rotation
  - Custom HebrewCalendar component for date calculations and holiday display
  - Custom Clock component with real-time updates
  
- **States**: 
  - Cards: Default elevated state with subtle shadow, no hover (non-interactive)
  - Headers: Always prominent with contrasting backgrounds
  - Ticker: Single continuous animated state
  - Screens: Active (visible, opacity 1) and Inactive (hidden, opacity 0) with transition
  
- **Icon Selection**: 
  - Clock: solid weight for header clock display
  - CalendarDots: for date/calendar sections
  - ShieldCheck: safety and security screens
  - Bell: announcements and alerts
  - Buildings: unit services locations
  - Scales: discipline and procedures
  
- **Spacing**: 
  - Header/Footer padding: p-6 (24px) for breathing room
  - Card padding: p-8 (32px) for generous internal space
  - Grid gaps: gap-6 (24px) for clear separation
  - Section margins: mb-8 (32px) between major sections
  
- **Mobile**: 
  - Not applicable - this is TV-only, fixed landscape orientation, designed for 1080p+ displays
  - All sizing uses viewport units (vh/vw) and fixed pixel values for TV optimization
