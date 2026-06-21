import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  DEFAULT_CONTENT,
  resolveContent,
  type SiteContent,
  type PartialSiteContent,
} from '@/lib/content';
import { API_BASE_URL, CONTENT_REFRESH_INTERVAL } from '@/lib/config';

const ContentContext = createContext<SiteContent>(DEFAULT_CONTENT);

/**
 * Fetches the full site content from the backend (which reads a Google Sheet)
 * and exposes it to all screens. Falls back to the built-in defaults whenever
 * the backend is unreachable or a section is missing, so the display never
 * breaks or goes blank.
 */
export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);

  useEffect(() => {
    let cancelled = false;

    const fetchContent = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/content`);
        if (!response.ok) return;
        const data = (await response.json()) as {
          success?: boolean;
          content?: PartialSiteContent;
        };
        if (!cancelled && data?.content) {
          setContent(resolveContent(data.content));
        }
      } catch (error) {
        console.warn('Failed to fetch site content, using defaults', error);
      }
    };

    fetchContent();
    const interval = setInterval(fetchContent, CONTENT_REFRESH_INTERVAL);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
}

/** Access the resolved site content from any screen. */
export function useContent(): SiteContent {
  return useContext(ContentContext);
}
