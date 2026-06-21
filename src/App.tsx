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
import { SCREEN_ROTATION_INTERVAL, FADE_TRANSITION_DURATION } from '@/lib/config';
import { ContentProvider, useContent } from '@/lib/ContentContext';

const screens = [
  { id: 'home', title: 'מסך הבית', component: HomeScreen },
  { id: 'procedures', title: 'מסך נהלים', component: ProceduresScreen },
  { id: 'discipline', title: 'מסך משמעת', component: DisciplineScreen },
  { id: 'services', title: 'שירותי היחידה', component: ServicesScreen },
  { id: 'announcements', title: 'הודעות', component: AnnouncementsScreen },
  { id: 'safety', title: 'בטיחות', component: SafetyScreen },
];

function SignageApp() {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const { ticker } = useContent();

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
            transition={{ duration: FADE_TRANSITION_DURATION, ease: 'easeInOut' }}
            className="h-full w-full"
          >
            <CurrentScreenComponent />
          </motion.div>
        </AnimatePresence>
      </main>

      <Ticker messages={ticker} />
    </div>
  );
}

function App() {
  return (
    <ContentProvider>
      <SignageApp />
    </ContentProvider>
  );
}

export default App;