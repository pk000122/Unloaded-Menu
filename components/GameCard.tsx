import React from 'react';
import { Game } from '../types';
import { Play } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  return (
    <div 
      className="group relative bg-slate-800 rounded-xl overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 border border-slate-700/50 hover:border-indigo-500/50"
      onClick={() => onClick(game)}
    >
      {/* Thumbnail */}
      <div className="aspect-video w-full overflow-hidden relative">
        <img 
          src={game.thumbnailUrl} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
            <Play className="text-white ml-1" size={24} fill="white" />
          </div>
        </div>

        <span className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-md text-xs font-bold px-2 py-1 rounded text-white border border-slate-700">
          {game.category}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-white text-lg truncate mb-1">{game.title}</h3>
        <p className="text-slate-400 text-sm line-clamp-2">{game.description}</p>
      </div>
    </div>
  );
};

export default GameCard;
