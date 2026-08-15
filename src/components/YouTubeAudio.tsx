import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

interface YouTubeAudioProps {
  videoId?: string;
  isPlaying: boolean;
}

export default function YouTubeAudio({ videoId = 'eeD0bjlVggo', isPlaying }: YouTubeAudioProps) {
  const playerRef = useRef<any>(null);
  const isReadyRef = useRef(false);

  useEffect(() => {
    // 1. Load YouTube IFrame Player API script if not already present
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player('yt-bg-audio-container', {
          height: '1',
          width: '1',
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: videoId,
            controls: 0,
            playsinline: 1,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
          },
          events: {
            onReady: (event: any) => {
              isReadyRef.current = true;
              event.target.setVolume(75);
              if (isPlaying) {
                event.target.playVideo();
              } else {
                event.target.pauseVideo();
              }
            },
            onStateChange: (event: any) => {
              // Loop on end
              if (event.data === window.YT.PlayerState.ENDED) {
                event.target.playVideo();
              }
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    // 2. Browser Autoplay policy bypass on first user click/touch anywhere
    const handleFirstUserInteraction = () => {
      if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
        playerRef.current.playVideo();
        if (!isPlaying) {
          playerRef.current.pauseVideo();
        }
      }
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
    };

    window.addEventListener('click', handleFirstUserInteraction, { once: true });
    window.addEventListener('keydown', handleFirstUserInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstUserInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  // Sync state with isPlaying prop
  useEffect(() => {
    if (!isReadyRef.current || !playerRef.current) return;
    try {
      if (isPlaying) {
        playerRef.current.unMute?.();
        playerRef.current.playVideo?.();
      } else {
        playerRef.current.pauseVideo?.();
      }
    } catch {
      // Ignore iframe sync warnings
    }
  }, [isPlaying]);

  return (
    <div
      id="yt-bg-audio-container"
      className="fixed -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none select-none z-0"
      aria-hidden="true"
    />
  );
}
