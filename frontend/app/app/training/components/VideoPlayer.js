
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

        {/* Custom Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center space-x-4 text-white">
            {/* Progress Bar */}
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-1">
                <div
                  className="bg-white h-1 rounded-full transition-all duration-200"
                  style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
                ></div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2">
              {/* Captions Toggle */}
              <button
                onClick={() => setCaptionsEnabled(!captionsEnabled)}
                className={`p-2 rounded hover:bg-white/20 transition-colors ${
                  captionsEnabled ? 'bg-white/30' : ''
                }`}
                aria-label={`${captionsEnabled ? 'Disable' : 'Enable'} captions`}
                title={`${captionsEnabled ? 'Disable' : 'Enable'} captions`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z"/>
                </svg>
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded hover:bg-white/20 transition-colors"
                aria-label={`${isFullscreen ? 'Exit' : 'Enter'} fullscreen`}
                title={`${isFullscreen ? 'Exit' : 'Enter'} fullscreen`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  {isFullscreen ? (
                    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                  ) : (
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

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
