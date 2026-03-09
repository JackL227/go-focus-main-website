import React, { useRef, useState } from 'react';
import { Star, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const videoTestimonials = [
  {
    id: 'v1',
    name: 'Ayden',
    position: 'AI Agency Owner',
    headline: '5 clients onboarded in the last week',
    content: 'Ethan & Jack from GoFocus AI are true professionals. In the past week alone, my agency has onboarded 5 clients.',
    videoUrl: 'https://storage.googleapis.com/msgsndr/doLxfSTZlMuqW2GDO2r0/media/692a63dc313bfd4c29e65921.mov',
  },
  {
    id: 'v2',
    name: 'Sofia',
    position: 'Agency Owner',
    headline: 'Their level of knowledge is incredible',
    content: 'Working with GoFocus has been an absolute pleasure. Trust, transparency and results is what they offer.',
    videoUrl: 'https://storage.googleapis.com/msgsndr/doLxfSTZlMuqW2GDO2r0/media/6903cb1b7ad561522eaa368b.mov',
  },
  {
    id: 'v3',
    name: 'Matt Berg',
    position: 'Online Business Owner',
    headline: 'Gave my business the momentum',
    content: "They've helped me scale my personal brand and my online business. They gave it the momentum it needed.",
    videoUrl: 'https://storage.googleapis.com/msgsndr/doLxfSTZlMuqW2GDO2r0/media/692a63e96a32b27a82b19af6.mov',
  },
  {
    id: 'v4',
    name: 'Nick Gallegos',
    position: 'Trading Mentor',
    headline: 'From $500 to $4.8k within the first few days',
    content: 'Jack and Ethan from GoFocus are top tier. Within 24 hours of launching all the systems they built, my MRR went from $500 to $4800. Highly recommend.',
    videoUrl: 'https://storage.googleapis.com/msgsndr/doLxfSTZlMuqW2GDO2r0/media/6903cb2a521c840dfcfe6f9b.mov',
  },
];

const textTestimonials = [
  {
    id: 5,
    name: 'Valon Berisha',
    position: 'Home Remodeler',
    company: 'SpotOn Building Solutions',
    content: 'Working with Ethan and Jack has made me over $105k in the last 2 months. Their systems got me top quality leads and I closed them in person. They treat you like family.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Daniel',
    position: 'Vehicle Aesthetic Consultant',
    company: 'Carbon Performance',
    content: "The AI agent has transformed my lead management. I'm now booking more consultations without spending hours chasing leads, giving me more time to focus on delivering exceptional vehicle aesthetic services.",
    rating: 5,
  },
  {
    id: 7,
    name: 'Arik B',
    position: 'Founder',
    company: 'Innoveum',
    content: 'As an engineering and energy auditing firm, our time is critical. The AI agent streamlines our lead qualification process, ensuring we only engage with serious clients.',
    rating: 5,
  },
  {
    id: 8,
    name: 'Yosef Hadad',
    position: 'Restaurant Owner',
    company: 'Deli 770',
    content: 'Love working with Ethan and Jack. They answer very quickly and make sure to always make changes needed for better results. They care about their work and they want us to win.',
    rating: 5,
  },
  {
    id: 9,
    name: 'Matt Bergin',
    position: 'Founder',
    company: 'The Trading Club',
    content: "GoFocus AI has helped me scale my brand so heavily. Without their systems and expertise in growth, my business wouldn't be where it is today. Highly recommend these guys.",
    rating: 5,
  },
];

const VideoCard = ({ t, index }: { t: typeof videoTestimonials[0]; index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-200"
    >
      {/* Video player */}
      <div
        className="relative bg-black cursor-pointer group"
        style={{ aspectRatio: '9/16', maxHeight: '320px' }}
        onClick={handlePlay}
      >
        <video
          ref={videoRef}
          src={t.videoUrl}
          preload="metadata"
          playsInline
          className="w-full h-full object-contain"
          onEnded={() => setPlaying(false)}
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
        />
        {/* Play overlay */}
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 text-black fill-black ml-0.5" />
            </div>
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="p-4">
        <div className="flex gap-0.5 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
          ))}
        </div>
        <p className="text-sm font-semibold text-white mb-1.5">"{t.headline}"</p>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">{t.content}</p>
        <div>
          <p className="font-medium text-white text-sm">{t.name}</p>
          <p className="text-xs text-muted-foreground">{t.position}</p>
        </div>
      </div>
    </motion.div>
  );
};

const SocialProofSection = () => {
  return (
    <section id="testimonials" className="section border-t border-white/5">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="section-label">
            <span>Testimonials</span>
          </div>
          <h2 className="mb-6">
            Hear it from our clients
          </h2>
        </motion.div>

        {/* Video testimonials */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-6xl mx-auto mb-8">
          {videoTestimonials.map((t, index) => (
            <VideoCard key={t.id} t={t} index={index} />
          ))}
        </div>

        {/* Text testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {textTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.05]"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              <div>
                <p className="font-medium text-white text-sm">
                  {testimonial.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.position}{testimonial.company ? `, ${testimonial.company}` : ''}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
