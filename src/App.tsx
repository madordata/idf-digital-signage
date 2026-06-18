import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Ticker } from '@/components/Ticker';
import { HomeScreen } from '@/components/screens/HomeScreen';
import { ProceduresScreen } from '@/components/screens/ProceduresScreen';
import { DisciplineScreen } from '@/components/screens/DisciplineScreen';
import { ServicesScreen } from '@/components/screens/ServicesScreen';
import { AnnouncementsScreen } from '@/components/screens/AnnouncementsScreen';
import { SafetyScreen } from '@/components/screens/SafetyScreen';
import { motion, AnimatePresence } from 'framer-motion';
import {
  API_BASE_URL,
  SCREEN_ROTATION_INTERVAL,
  TICKER_REFRESH_INTERVAL,
} from '@/lib/config';

const screens = [
  { id: 'home', title: 'מסך הבית', component: HomeScreen },
  { id: 'procedures', title: 'מסך נהלים', component: ProceduresScreen },
  { id: 'discipline', title: 'מסך משמעת', component: DisciplineScreen },
  { id: 'services', title: 'שירותי היחידה', component: ServicesScreen },
  { id: 'announcements', title: 'הודעות', component: AnnouncementsScreen },
  { id: 'safety', title: 'בטיחות', component: SafetyScreen },
];

function App() {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [tickerMessages, setTickerMessages] = useState<string[]>([
    'ברוכים הבאים ליחידה - מחויבים למצוינות תמיד',
    'אנא שמרו על ניקיון והופעה ראויים בכל עת',
  ]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/updates`);
        const data = await response.json();
        if (data.success && data.messages && data.messages.length > 0) {
          setTickerMessages(data.messages);
        }
      } catch (error) {
        console.warn('Failed to fetch ticker updates, using defaults', error);
      }
    };

    fetchUpdates();
    const updateInterval = setInterval(fetchUpdates, TICKER_REFRESH_INTERVAL);

    return () => clearInterval(updateInterval);
  }, []);

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setCurrentScreenIndex((current) => (current + 1) % screens.length);
    }, SCREEN_ROTATION_INTERVAL);

    return () => clearInterval(rotationInterval);
  }, []);

  const CurrentScreenComponent = screens[currentScreenIndex].component;
  const currentScreenTitle = screens[currentScreenIndex].title;

  return (
    <div className="w-screen h-screen overflow-hidden bg-background">
      <Header currentScreenTitle={currentScreenTitle} />
      
      <main className="fixed top-32 bottom-28 left-0 right-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreenIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="h-full w-full"
          >
            <CurrentScreenComponent />
          </motion.div>
        </AnimatePresence>
      </main>

      <Ticker messages={tickerMessages} />
    </div>
  );
}

export default App;