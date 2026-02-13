import React from 'react';
import { GameCategory } from '../types';
import { Gamepad2, Sword, Puzzle, Car, Trophy, BrainCircuit, LayoutGrid } from 'lucide-react';

interface SidebarProps {
  selectedCategory: GameCategory;
  onSelectCategory: (category: GameCategory) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onSelectCategory, isOpen, onCloseMobile }) => {
  
  const getIcon = (cat: GameCategory) => {
    switch (cat) {
      case GameCategory.ACTION: return <Sword size={20} />;
      case GameCategory.PUZZLE: return <Puzzle size={20} />;
      case GameCategory.ARCADE: return <Gamepad2 size={20} />;
      case GameCategory.STRATEGY: return <BrainCircuit size={20} />;
      case GameCategory.CLASSIC: return <Trophy size={20} />;
      default: return <LayoutGrid size={20} />;
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 z-50 h-screen w-64 bg-slate-900 border-r border-slate-800
        transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:block
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Gamepad2 className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Nebula
          </h1>
        </div>

        <nav className="p-4 space-y-1">
          <p className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Library
          </p>
          {Object.values(GameCategory).map((category) => (
            <button
              key={category}
              onClick={() => {
                onSelectCategory(category);
                onCloseMobile();
              }}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                ${selectedCategory === category 
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
              `}
            >
              {getIcon(category)}
              <span>{category}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-white mb-1">Pro Tip</h3>
            <p className="text-xs text-slate-400">
              Press F11 for full immersion when playing games.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
