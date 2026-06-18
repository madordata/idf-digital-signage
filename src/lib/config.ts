/**
 * Runtime configuration for the frontend.
 *
 * Values can be overridden with a `.env` file (see `.env.example`).
 * All Vite-exposed variables must be prefixed with `VITE_`.
 */

/** Base URL of the backend API that serves ticker messages. */
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:4100';

/** How often (ms) the rotating screens advance. */
export const SCREEN_ROTATION_INTERVAL = 15000;

/** How often (ms) the ticker re-fetches messages from the backend. */
export const TICKER_REFRESH_INTERVAL = 60000;
