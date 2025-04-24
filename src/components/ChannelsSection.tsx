
import React from 'react';
import { WhatsappIcon, MessengerIcon, MessageIcon, EmailIcon, LiveChatIcon, VoiceIcon } from './icons/CommunicationIcons';
import { cn } from '@/lib/utils';

const channels = [
  { icon: WhatsappIcon, label: 'WhatsApp', available: true },
  { icon: MessengerIcon, label: 'Messenger', available: true },
  { icon: MessageIcon, label: 'SMS', available: true },
  { icon: EmailIcon, label: 'Email', available: true },
  { icon: LiveChatIcon, label: 'Live Chat', available: true },
  { icon: VoiceIcon, label: 'Voice', available: true } // Updated voice channel
];

const ChannelsSection = () => {
  return (
    <section className="mb-16">
      <div className="glass-card p-8 md:p-12">
        <h3 className="text-center text-xl md:text-2xl font-bold tracking-wide mb-8">
          CONNECT INSTANTLY ON ANY CHANNEL
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 items-start justify-items-center">
          {channels.map((channel, index) => (
            <div
              key={channel.label}
              className={cn(
                "flex flex-col items-center gap-3 group",
                "transition-all duration-300 ease-in-out",
                channel.available ? "opacity-100" : "opacity-60"
              )}
              aria-label={`${channel.label}${!channel.available ? ' - Coming Soon' : ''}`}
            >
              <div 
                className={cn(
                  "w-12 h-12 md:w-14 md:h-14 flex items-center justify-center",
                  "rounded-full bg-foreground/5 border border-foreground/10",
                  "transition-all duration-300 ease-in-out",
                  "group-hover:scale-110 group-hover:border-primary/30",
                  "group-hover:shadow-glow"
                )}
              >
                <channel.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
              </div>
              <span className="text-sm md:text-base font-medium text-center">
                {channel.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChannelsSection;
