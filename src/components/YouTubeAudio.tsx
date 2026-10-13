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
  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    // 1. Tải script YouTube IFrame Player API ngay từ đầu (trong lúc Loading màn hình đen)
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
              if (isPlayingRef.current) {
                event.target.unMute();
                event.target.playVideo();
              } else {
                // Pre-buffer video trong nền để sẵn sàng phát tức thì 0ms delay khi loading xong
                event.target.mute();
                event.target.playVideo();
                setTimeout(() => {
                  if (!isPlayingRef.current && playerRef.current) {
                    playerRef.current.pauseVideo?.();
                    playerRef.current.seekTo?.(0, true);
                  }
                }, 200);
              }
            },
            onStateChange: (event: any) => {
              // Lặp lại bản nhạc khi kết thúc
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

    // 2. Tự động kích hoạt ngay lập tức khi người dùng cuộn chuột, chạm màn hình hoặc click
    const handleUserInteraction = () => {
      if (playerRef.current && isPlayingRef.current) {
        try {
          playerRef.current.unMute?.();
          playerRef.current.setVolume?.(75);
          playerRef.current.playVideo?.();
        } catch {}
      }
    };

    window.addEventListener('click', handleUserInteraction, { passive: true });
    window.addEventListener('keydown', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });
    window.addEventListener('pointerdown', handleUserInteraction, { passive: true });
    window.addEventListener('wheel', handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('pointerdown', handleUserInteraction);
      window.removeEventListener('wheel', handleUserInteraction);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  // Đồng bộ hóa trạng thái play/pause ngay khi loading xong và xuất hiện chấm pixel
  useEffect(() => {
    if (!isReadyRef.current || !playerRef.current) return;
    try {
      if (isPlaying) {
        playerRef.current.unMute?.();
        playerRef.current.setVolume?.(75);
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
