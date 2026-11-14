import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Bookmark,
  TrendingUp,
  TrendingDown,
  Scale,
  Sparkles,
  Smartphone,
  Monitor,
  X,
  SlidersHorizontal,
  Flame,
  BookOpen
} from 'lucide-react';
import { PATTERNS_DATA, CATEGORIES_LIST } from './data/patternsData';
import { Pattern, PatternCategory, SignalType } from './types/pattern';
import { PatternCard } from './components/PatternCard';
import { PatternDetailModal } from './components/PatternDetailModal';
import { BottomNav, TabType } from './components/BottomNav';
import { RiskCalculatorModal } from './components/RiskCalculatorModal';
import { QuizView } from './components/QuizView';
import { CheatSheetView } from './components/CheatSheetView';

const BOOKMARKS_STORAGE_KEY = 'trading_master_saved_patterns_v1';

export default function App() {
  // Navigation & View States
  const [currentTab, setCurrentTab] = useState<TabType>('explore');
  const [selectedCategory, setSelectedCategory] = useState<PatternCategory>('all');
  const [selectedSignal, setSelectedSignal] = useState<'all' | SignalType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSimulatorMode, setIsSimulatorMode] = useState<boolean>(false);

  // Bookmarks State
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['hammer', 'bullish-engulfing', 'head-and-shoulders', 'bull-flag'];
    } catch {
      return ['hammer', 'bullish-engulfing', 'head-and-shoulders'];
    }
  });

  // Modal States
  const [activePattern, setActivePattern] = useState<Pattern | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [calculatorPattern, setCalculatorPattern] = useState<Pattern | null>(null);

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarkedIds));
    } catch (err) {
      console.error('Failed to save bookmarks', err);
    }
  }, [bookmarkedIds]);

  const handleToggleBookmark = (patternId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(patternId) ? prev.filter((id) => id !== patternId) : [...prev, patternId]
    );
  };

  const handleOpenPattern = (pattern: Pattern) => {
    setActivePattern(pattern);
    setIsDetailModalOpen(true);
  };

  const handleOpenCalculatorForPattern = (pattern: Pattern) => {
    setCalculatorPattern(pattern);
    setIsDetailModalOpen(false);
    setIsCalculatorOpen(true);
  };

  // Filtered patterns logic
  const filteredPatterns = useMemo(() => {
    return PATTERNS_DATA.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Signal filter
      if (selectedSignal !== 'all' && p.signal !== selectedSignal) {
        return false;
      }
      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchJapanese = p.japaneseName?.toLowerCase().includes(query) ?? false;
        const matchDesc = p.shortDescription.toLowerCase().includes(query);
        const matchTags = p.tags.some((t) => t.toLowerCase().includes(query));
        const matchCategory = p.categoryLabel.toLowerCase().includes(query);
        if (!matchName && !matchJapanese && !matchDesc && !matchTags && !matchCategory) {
          return false;
        }
      }
      // Bookmarks tab filter
      if (currentTab === 'bookmarks') {
        if (!bookmarkedIds.includes(p.id)) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedSignal, searchQuery, currentTab, bookmarkedIds]);

  // Count helper
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: PATTERNS_DATA.length };
    CATEGORIES_LIST.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = PATTERNS_DATA.filter((p) => p.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-[#101216] text-white flex flex-col items-center">
      {/* Outer Shell for Mobile-First or Simulator View */}
      <div
        className={`w-full min-h-screen flex flex-col bg-[#101216] transition-all duration-300 pb-20 ${
          isSimulatorMode
            ? 'max-w-[430px] my-4 rounded-[40px] border-4 border-[#2A2E39] shadow-2xl overflow-hidden ring-1 ring-white/10'
            : 'max-w-2xl'
        }`}
      >
        {/* Top App Header */}
        <header className="sticky top-0 z-20 bg-[#14171F]/95 backdrop-blur-md border-b border-[#2A2E39] px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#089981] to-[#2962FF] p-0.5 flex items-center justify-center shadow-lg shadow-[#089981]/20">
                <div className="w-full h-full bg-[#101216] rounded-[10px] flex items-center justify-center">
                  <span className="font-mono font-black text-xs text-[#089981] tracking-tighter">
                    TM
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-sm font-extrabold text-white tracking-tight leading-none flex items-center gap-1.5">
                  <span>Trading Master</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#089981]/20 text-[#089981] border border-[#089981]/30">
                    PRO
                  </span>
                </h1>
                <p className="text-[10px] text-[#9B9FA9] mt-0.5">
                  Complete Chart & Candlestick Patterns
                </p>
              </div>
            </div>

            {/* Quick Actions (Simulator Toggle & Calc) */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsSimulatorMode(!isSimulatorMode)}
                title={isSimulatorMode ? 'Switch to Expanded View' : 'Switch to Mobile Frame'}
                className="hidden sm:flex items-center gap-1 p-2 rounded-xl bg-[#1E222D] hover:bg-[#2A2E39] text-[#9B9FA9] hover:text-white border border-[#2A2E39] text-xs transition-colors"
              >
                {isSimulatorMode ? (
                  <>
                    <Monitor className="w-3.5 h-3.5" />
                    <span className="text-[10px]">Expand</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-3.5 h-3.5" />
                    <span className="text-[10px]">Phone Bezel</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar (Shown in Explore & Bookmarks) */}
          {(currentTab === 'explore' || currentTab === 'bookmarks') && (
            <div className="mt-3 relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#9B9FA9]" />
              <input
                type="text"
                placeholder="Search 42 patterns, wicks, breakout rules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1E222D] border border-[#2A2E39] rounded-xl pl-9 pr-9 py-2 text-xs text-white placeholder-[#9B9FA9] focus:outline-none focus:border-[#2962FF] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-[#9B9FA9] hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Horizontal Category Filter Chips */}
          {currentTab === 'explore' && (
            <div className="mt-3 flex flex-col gap-2">
              {/* Category Chips Scroll */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {CATEGORIES_LIST.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  const count = categoryCounts[cat.id] ?? 0;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id as PatternCategory)}
                      className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#2962FF] text-white shadow-sm'
                          : 'bg-[#1E222D] text-[#9B9FA9] hover:text-white hover:bg-[#262B37] border border-[#2A2E39]'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className="text-[10px] opacity-75 font-mono">({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Signal Sub-filter Buttons (All, Bullish, Bearish, Neutral) */}
              <div className="flex items-center gap-1 pt-1 border-t border-[#2A2E39]/50">
                <button
                  onClick={() => setSelectedSignal('all')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    selectedSignal === 'all'
                      ? 'bg-[#2A2E39] text-white'
                      : 'text-[#9B9FA9] hover:text-white'
                  }`}
                >
                  All Signals
                </button>
                <button
                  onClick={() => setSelectedSignal('bullish')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    selectedSignal === 'bullish'
                      ? 'bg-[#089981]/25 text-[#089981] border border-[#089981]/40'
                      : 'text-[#9B9FA9] hover:text-[#089981]'
                  }`}
                >
                  <TrendingUp className="w-3 h-3" />
                  <span>Bullish</span>
                </button>
                <button
                  onClick={() => setSelectedSignal('bearish')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    selectedSignal === 'bearish'
                      ? 'bg-[#F23645]/25 text-[#F23645] border border-[#F23645]/40'
                      : 'text-[#9B9FA9] hover:text-[#F23645]'
                  }`}
                >
                  <TrendingDown className="w-3 h-3" />
                  <span>Bearish</span>
                </button>
                <button
                  onClick={() => setSelectedSignal('neutral')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    selectedSignal === 'neutral'
                      ? 'bg-[#F7A600]/25 text-[#F7A600] border border-[#F7A600]/40'
                      : 'text-[#9B9FA9] hover:text-[#F7A600]'
                  }`}
                >
                  <Scale className="w-3 h-3" />
                  <span>Neutral</span>
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Tab View Router */}
        <main className="flex-1">
          {currentTab === 'explore' && (
            <div className="p-4 space-y-4 animate-fadeIn">
              {/* Category Heading & Count */}
              <div className="flex items-center justify-between text-xs text-[#9B9FA9] px-1">
                <span>
                  Showing <strong className="text-white">{filteredPatterns.length}</strong> patterns
                </span>
                <span className="font-mono text-[11px]">
                  {selectedCategory === 'all' ? 'All Categories' : selectedCategory.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              {/* Patterns Grid */}
              {filteredPatterns.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {filteredPatterns.map((pattern) => (
                    <PatternCard
                      key={pattern.id}
                      pattern={pattern}
                      isBookmarked={bookmarkedIds.includes(pattern.id)}
                      onToggleBookmark={handleToggleBookmark}
                      onSelect={handleOpenPattern}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 px-4 bg-[#1E222D]/40 rounded-3xl border border-[#2A2E39] space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#2A2E39] text-[#9B9FA9] flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-white">No patterns found</h3>
                  <p className="text-xs text-[#9B9FA9] max-w-xs mx-auto">
                    No results matching &ldquo;{searchQuery}&rdquo;. Try another term or reset your signal filter.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedSignal('all');
                    }}
                    className="py-2 px-4 rounded-xl bg-[#2962FF] text-white text-xs font-bold"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Bookmarks Tab */}
          {currentTab === 'bookmarks' && (
            <div className="p-4 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between px-1">
                <div>
                  <h2 className="text-base font-black text-white">
                    Saved Watchlist ({bookmarkedIds.length})
                  </h2>
                  <p className="text-xs text-[#9B9FA9]">
                    Quick offline access to your high-conviction trading patterns
                  </p>
                </div>
              </div>

              {filteredPatterns.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {filteredPatterns.map((pattern) => (
                    <PatternCard
                      key={pattern.id}
                      pattern={pattern}
                      isBookmarked={bookmarkedIds.includes(pattern.id)}
                      onToggleBookmark={handleToggleBookmark}
                      onSelect={handleOpenPattern}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 px-4 bg-[#1E222D]/40 rounded-3xl border border-[#2A2E39] space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#F7A600]/10 text-[#F7A600] flex items-center justify-center mx-auto">
                    <Bookmark className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-white">No Bookmarks Saved Yet</h3>
                  <p className="text-xs text-[#9B9FA9] max-w-xs mx-auto">
                    Tap the bookmark ribbon on any pattern card to save it here for fast offline execution.
                  </p>
                  <button
                    onClick={() => setCurrentTab('explore')}
                    className="py-2.5 px-4 rounded-xl bg-[#2962FF] text-white text-xs font-bold"
                  >
                    Browse Pattern Directory
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Quiz Tab */}
          {currentTab === 'quiz' && (
            <QuizView onSelectPattern={handleOpenPattern} />
          )}

          {/* Calculator Tab */}
          {currentTab === 'calculator' && (
            <div className="p-4">
              <RiskCalculatorModal
                isOpen={true}
                onClose={() => setCurrentTab('explore')}
                prefillPattern={calculatorPattern}
              />
            </div>
          )}

          {/* Cheat Sheet Matrix Tab */}
          {currentTab === 'cheatsheet' && (
            <CheatSheetView onSelectPattern={handleOpenPattern} />
          )}
        </main>

        {/* Bottom Navigation */}
        <BottomNav
          currentTab={currentTab}
          onChangeTab={setCurrentTab}
          bookmarksCount={bookmarkedIds.length}
        />
      </div>

      {/* Pattern Detail Modal (Triggered on Card Click) */}
      <PatternDetailModal
        pattern={activePattern}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        isBookmarked={activePattern ? bookmarkedIds.includes(activePattern.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onOpenCalculator={handleOpenCalculatorForPattern}
      />

      {/* Dedicated Standalone Trade Calculator Modal (When triggered from inside Pattern Modal) */}
      <RiskCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        prefillPattern={calculatorPattern}
      />
    </div>
  );
}
