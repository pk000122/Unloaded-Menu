import React, { useState, useRef, useEffect } from 'react';
import { Game } from '../types';
import { X, Maximize2, Minimize2, RefreshCw, AlertCircle } from 'lucide-react';

interface GamePlayerProps {
  game: Game | null;
  onClose: () => void;
}

const GamePlayer: React.FC<GamePlayerProps> = ({ game, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset fullscreen state when game changes
    setIsFullscreen(false);
  }, [game]);

  if (!game) return null;

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  
  // Listen for fullscreen change events (e.g. if user presses Esc)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleReload = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-0 md:p-6 animate-in fade-in duration-200">
      <div 
        ref={containerRef}
        className={`bg-slate-900 w-full h-full md:rounded-2xl overflow-hidden flex flex-col shadow-2xl relative border border-slate-800 ${isFullscreen ? 'rounded-none' : 'max-w-6xl max-h-[90vh]'}`}
      >
        {/* Header - Only visible if not fullscreen usually, but we keep it minimal in FS or hide it */}
        {!isFullscreen && (
          <div className="h-14 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center space-x-3">
              <h2 className="font-bold text-white truncate max-w-[200px] md:max-w-md">
                {game.title}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded bg-indigo-600/20 text-indigo-400 border border-indigo-600/30">
                {game.category}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleReload}
                className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                title="Reload Game"
              >
                <RefreshCw size={18} />
              </button>
              <button 
                onClick={toggleFullscreen}
                className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                title="Fullscreen"
              >
                <Maximize2 size={18} />
              </button>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg text-slate-400 transition-colors ml-2"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Fullscreen Close Button overlay if active */}
        {isFullscreen && (
          <div className="absolute top-0 right-0 p-4 z-50 opacity-0 hover:opacity-100 transition-opacity">
             <button 
                onClick={toggleFullscreen}
                className="p-3 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-sm"
              >
                <Minimize2 size={24} />
              </button>
          </div>
        )}

        {/* Game Area */}
        <div className="flex-1 bg-black relative w-full h-full">
          <iframe
            ref={iframeRef}
            src={game.embedUrl}
            title={game.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
          
          {/* Fallback/Loader behind iframe (visible if transparent or loading) */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center text-slate-600">
            <div className="flex flex-col items-center animate-pulse">
              <span className="text-4xl font-bold mb-2">NEBULA</span>
              <span>Loading Game Data...</span>
            </div>
          </div>
        </div>

        {/* Footer info (hidden in fullscreen) */}
        {!isFullscreen && (
          <div className="bg-slate-800 border-t border-slate-700 p-3 text-xs text-slate-400 flex items-center justify-between shrink-0">
             <div className="flex items-center space-x-2">
               <AlertCircle size={14} />
               <span>If the game doesn't load, it might be blocked by the source.</span>
             </div>
             <div>
               ID: {game.id}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePlayer;
