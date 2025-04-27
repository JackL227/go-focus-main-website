
import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BookingWidget from '@/components/BookingWidget';

interface VideoSalesLetterProps {
  videoId?: string;
  videoUrl?: string;
  title: string;
  subtitle: string;
}

const VideoSalesLetter = ({ videoId, videoUrl, title, subtitle }: VideoSalesLetterProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);

  // This is a placeholder - in production, you'd use the actual video
  const placeholderVideo = 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  const actualVideoUrl = videoUrl || (videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=0&rel=0` : placeholderVideo);

  useEffect(() => {
    const video = document.getElementById('vsl-video') as HTMLVideoElement;
    if (video) {
      setVideoElement(video);

      const updateProgress = () => {
        const value = (video.currentTime / video.duration) * 100;
        setProgress(value);
      };

      video.addEventListener('timeupdate', updateProgress);
      video.addEventListener('ended', () => setIsPlaying(false));

      return () => {
        video.removeEventListener('timeupdate', updateProgress);
        video.removeEventListener('ended', () => setIsPlaying(false));
      };
    }
  }, []);

  const togglePlay = () => {
    if (!videoElement) return;
    
    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoElement) return;
    
    videoElement.muted = !videoElement.muted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          <p className="mt-2 text-foreground/80">{subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-xl overflow-hidden aspect-video bg-black/90 shadow-xl border border-foreground/10">
            {/* VSL Video Element */}
            {videoId ? (
              <iframe 
                title="Video Sales Letter"
                src={actualVideoUrl}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              ></iframe>
            ) : (
              <>
                <video
                  id="vsl-video"
                  className="absolute inset-0 w-full h-full object-cover"
                  poster="/lovable-uploads/65599be5-2766-4e8b-ad1f-126661cb6124.png"
                  playsInline
                >
                  <source src={actualVideoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Custom Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                  <div className="flex items-center justify-between">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={togglePlay}
                      className="text-white hover:bg-white/20"
                    >
                      {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </Button>

                    <div className="flex-1 mx-4">
                      <div className="h-1.5 bg-white/30 rounded-full">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={toggleMute}
                      className="text-white hover:bg-white/20"
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* CTA Button */}
          <div className="mt-8 text-center">
            <BookingWidget 
              className="bg-primary hover:bg-primary/90 text-background text-lg px-7 py-4 rounded-xl shadow-lg group"
            >
              Book Your Strategy Call Now
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </BookingWidget>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSalesLetter;
