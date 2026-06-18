import { useEffect, useState } from 'react';
import { MegaphoneSimple } from '@phosphor-icons/react';

interface TickerProps {
  messages: string[];
}

export function Ticker({ messages }: TickerProps) {
  const [displayMessages, setDisplayMessages] = useState<string[]>(messages);

  useEffect(() => {
    if (messages.length > 0) {
      setDisplayMessages(messages);
    }
  }, [messages]);

  const combinedMessage = displayMessages.join('  •  ');
  const repeatedMessage = `${combinedMessage}  •  ${combinedMessage}  •  ${combinedMessage}`;

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-primary border-t-4 border-accent z-50 overflow-hidden">
      <div className="flex items-center py-5 px-8">
        <div className="flex items-center gap-4 pl-4">
          <MegaphoneSimple size={44} weight="fill" className="text-accent flex-shrink-0" />
          <span className="text-3xl font-bold text-accent flex-shrink-0" style={{ fontFamily: 'Rubik' }} dir="rtl">
            עדכונים חשובים
          </span>
        </div>
        
        <div className="flex-1 overflow-hidden mr-8">
          <div className="animate-marquee whitespace-nowrap">
            <span className="text-3xl font-semibold text-foreground" style={{ fontFamily: 'Assistant' }} dir="rtl">
              {repeatedMessage}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
