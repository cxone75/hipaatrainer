
'use client';

import { useState, useEffect, useRef } from 'react';

export default function VideoPlayer({ videoUrl, title, onProgress }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Vimeo Player API integration
    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.onload = initializePlayer;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [videoUrl]);

  const initializePlayer = () => {
    if (window.Vimeo && iframeRef.current) {
      const player = new window.Vimeo.Player(iframeRef.current);

      player.on('play', () => {
        setIsPlaying(true);
      });

      player.on('pause', () => {
        setIsPlaying(false);
      });

      player.on('timeupdate', (data) => {
        setCurrentTime(data.seconds);
        if (duration > 0) {
          const progressPercent = (data.seconds / duration) * 100;
          onProgress(Math.min(progressPercent, 100));
        }
      });

      player.on('loaded', () => {
        player.getDuration().then((dur) => {
          setDuration(dur);
        });
      });

      player.on('ended', () => {
        setIsPlaying(false);
        onProgress(100);
      });
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="w-full h-full">
      <div 
        ref={containerRef}
        className={`relative bg-black overflow-hidden w-full h-full ${
          isFullscreen ? 'fixed inset-0 z-50' : ''
        }`}
      >
        {/* Video Player */}
        <iframe
          ref={iframeRef}
          src={`${videoUrl}?autoplay=0&loop=0&muted=0&gesture=media&playsinline=1&byline=0&portrait=0&title=0`}
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          aria-label={`Training Video: ${title}`}
          title={`Training Video: ${title}`}
        ></iframe>

        

        {/* Loading State */}
        {duration === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
              <p>Loading video...</p>
            </div>
          </div>
        )}
      </div>

      
    </div>
  );
}
