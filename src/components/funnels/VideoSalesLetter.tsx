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
const VideoSalesLetter = ({
  videoId,
  videoUrl,
  title,
  subtitle
}: VideoSalesLetterProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
  const togglePlay = () => {
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const toggleMute = () => {
    if (videoElement) {
      videoElement.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  useEffect(() => {
    const video = document.getElementById('vsl-video') as HTMLVideoElement;
    if (video) {
      setVideoElement(video);
      video.addEventListener('timeupdate', () => {
        const currentProgress = video.currentTime / video.duration * 100;
        setProgress(isNaN(currentProgress) ? 0 : currentProgress);
      });
    }
    return () => {
      if (video) {
        video.removeEventListener('timeupdate', () => {});
      }
    };
  }, []);

  // Fix the missing actual video URL
  const actualVideoUrl = videoUrl || "";
  return <section className="py-8 md:py-12 bg-background">
      <div className="container-custom">
        

        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-xl overflow-hidden aspect-video bg-black/90 shadow-xl border border-foreground/10">
            {videoId ? <iframe title="Video Sales Letter" src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&controls=1&rel=0`} className="absolute inset-0 w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> : <>
                <video id="vsl-video" className="absolute inset-0 w-full h-full object-cover" poster="/lovable-uploads/65599be5-2766-4e8b-ad1f-126661cb6124.png" playsInline>
                  <source src={actualVideoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                  <div className="flex items-center justify-between">
                    <Button size="sm" variant="ghost" onClick={togglePlay} className="text-white hover:bg-white/20">
                      {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </Button>

                    <div className="flex-1 mx-4">
                      <div className="h-1.5 bg-white/30 rounded-full">
                        <div className="h-full bg-primary rounded-full" style={{
                      width: `${progress}%`
                    }} />
                      </div>
                    </div>

                    <Button size="sm" variant="ghost" onClick={toggleMute} className="text-white hover:bg-white/20">
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </Button>
                  </div>
                </div>
              </>}
          </div>

          <div className="mt-6 text-center">
            
          </div>
        </div>
      </div>
    </section>;
};
export default VideoSalesLetter;