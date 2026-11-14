import React from 'react';
import { LayoutGrid, Award, Calculator, Bookmark, TableProperties } from 'lucide-react';

export type TabType = 'explore' | 'quiz' | 'calculator' | 'bookmarks' | 'cheatsheet';

interface BottomNavProps {
  currentTab: TabType;
  onChangeTab: (tab: TabType) => void;
  bookmarksCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onChangeTab,
  bookmarksCount
}) => {
  const tabs = [
    { id: 'explore' as TabType, label: 'Patterns', icon: LayoutGrid },
    { id: 'quiz' as TabType, label: 'Quiz', icon: Award },
    { id: 'calculator' as TabType, label: 'Calculator', icon: Calculator },
    { id: 'bookmarks' as TabType, label: 'Saved', icon: Bookmark, badge: bookmarksCount },
    { id: 'cheatsheet' as TabType, label: 'Matrix', icon: TableProperties }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#14171F]/95 backdrop-blur-md border-t border-[#2A2E39] pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-lg mx-auto flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex flex-col items-center justify-center flex-1 h-full py-1 text-xs font-medium transition-all ${
                isActive
                  ? 'text-[#2962FF]'
                  : 'text-[#9B9FA9] hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {typeof tab.badge === 'number' && tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 px-1.5 py-0.2 rounded-full bg-[#F7A600] text-[9px] font-bold text-black font-mono">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 transition-colors ${isActive ? 'font-bold text-white' : ''}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-5 h-0.5 rounded-full bg-[#2962FF]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
