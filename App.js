import React, { useState, useMemo } from 'react';
import htm from 'htm';
import { GAMES_LIBRARY } from './services/gamesData.js';
import { GameCategory } from './types.js';
import Sidebar from './components/Sidebar.js';
import GameCard from './components/GameCard.js';
import GamePlayer from './components/GamePlayer.js';
import { Search, Menu, Sparkles } from 'lucide-react';

const html = htm.bind(React.createElement);

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(GameCategory.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGame, setActiveGame] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredGames = useMemo(() => {
    return GAMES_LIBRARY.filter(game => {
      const matchesCategory = selectedCategory === GameCategory.ALL || game.category === selectedCategory;
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            game.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredGames = useMemo(() => {
    return GAMES_LIBRARY.filter(g => g.featured);
  }, []);

  return html`
    <div className="flex min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden">
      
      <${Sidebar} 
        selectedCategory=${selectedCategory}
        onSelectCategory=${setSelectedCategory}
        isOpen=${isSidebarOpen}
        onCloseMobile=${() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-4 md:px-8 shrink-0 z-30 sticky top-0">
          <div className="flex items-center flex-1 max-w-2xl">
            <button 
              className="md:hidden mr-4 p-2 text-slate-400 hover:text-white"
              onClick=${() => setIsSidebarOpen(true)}
            >
              <${Menu} size=${24} />
            </button>
            
            <div className="relative w-full max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <${Search} className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg leading-5 bg-slate-900 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-all"
                placeholder="Search games..."
                value=${searchQuery}
                onChange=${(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-sm text-right">
              <div className="font-medium text-white">Guest User</div>
              <div className="text-xs text-slate-500">Level 1</div>
            </div>
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">
              G
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          
          ${selectedCategory === GameCategory.ALL && !searchQuery && html`
            <div className="mb-10">
              <div className="flex items-center space-x-2 mb-4">
                <${Sparkles} className="text-yellow-500" size=${20} />
                <h2 className="text-xl font-bold text-white">Featured Picks</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${featuredGames.map(game => html`
                   <div 
                      key=${game.id}
                      onClick=${() => setActiveGame(game)}
                      className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
                    >
                      <img 
                        src=${game.thumbnailUrl} 
                        alt=${game.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-90" />
                      <div className="absolute bottom-0 left-0 p-6 w-full">
                        <span className="inline-block px-2 py-1 mb-2 text-xs font-semibold bg-indigo-600 rounded-md text-white">
                          Featured
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                          ${game.title}
                        </h3>
                        <p className="text-slate-300 text-sm line-clamp-1">
                          ${game.description}
                        </p>
                      </div>
                   </div>
                `)}
              </div>
            </div>
          `}

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                ${searchQuery ? `Search Results for "${searchQuery}"` : `${selectedCategory} Games`}
              </h2>
              <span className="text-sm text-slate-500">
                ${filteredGames.length} games found
              </span>
            </div>
            
            ${filteredGames.length > 0 ? html`
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                ${filteredGames.map(game => html`
                  <${GameCard} 
                    key=${game.id} 
                    game=${game} 
                    onClick=${setActiveGame} 
                  />
                `)}
              </div>
            ` : html`
              <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                <${Search} size=${48} className="mb-4 opacity-50" />
                <p className="text-lg font-medium">No games found</p>
                <p className="text-sm">Try adjusting your search or category.</p>
              </div>
            `}
          </div>

          <footer className="mt-12 py-6 border-t border-slate-800 text-center text-slate-600 text-sm">
            <p>&copy; 2024 Nebula Games. All rights reserved.</p>
            <p className="mt-2 text-xs">Games are property of their respective owners. Used for educational purposes.</p>
          </footer>
        </div>
      </main>

      ${activeGame && html`
        <${GamePlayer} 
          game=${activeGame} 
          onClose=${() => setActiveGame(null)} 
        />
      `}
    </div>
  `;
};

export default App;