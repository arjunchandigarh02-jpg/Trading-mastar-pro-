import React from 'react';
import { Bookmark, TrendingUp, TrendingDown, Scale, ChevronRight } from 'lucide-react';
import { Pattern } from '../types/pattern';
import { PatternDiagram } from './PatternDiagram';

interface PatternCardProps {
  pattern: Pattern;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelect: (pattern: Pattern) => void;
}

export const PatternCard: React.FC<PatternCardProps> = ({
  pattern,
  isBookmarked,
  onToggleBookmark,
  onSelect
}) => {
  const isBullish = pattern.signal === 'bullish';
  const isBearish = pattern.signal === 'bearish';

  return (
    <div
      onClick={() => onSelect(pattern)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(pattern);
        }
      }}
      className="group relative bg-[#1E222D] hover:bg-[#262B37] active:scale-[0.985] transition-all duration-150 rounded-2xl p-3.5 border border-[#2A2E39] shadow-md flex flex-col gap-3 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#2962FF]"
    >
      {/* Top Header: Signal Badge & Bookmark Button */}
      <div className="flex items-center justify-between gap-2">
        {/* Signal Tag */}
        <div className="flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-md ${
              isBullish
                ? 'bg-[#089981]/20 text-[#089981] border border-[#089981]/30'
                : isBearish
                ? 'bg-[#F23645]/20 text-[#F23645] border border-[#F23645]/30'
                : 'bg-[#F7A600]/20 text-[#F7A600] border border-[#F7A600]/30'
            }`}
          >
            {isBullish ? (
              <>
                <TrendingUp className="w-3 h-3 stroke-[2.5]" /> Bullish 📈
              </>
            ) : isBearish ? (
              <>
                <TrendingDown className="w-3 h-3 stroke-[2.5]" /> Bearish 📉
              </>
            ) : (
              <>
                <Scale className="w-3 h-3 stroke-[2.5]" /> Neutral ⚖️
              </>
            )}
          </span>

          {/* Reliability Text */}
          <span className="text-[11px] text-[#9B9FA9] font-medium">
            · {pattern.reliability} Win Rate
          </span>
        </div>

        {/* Bookmark Icon */}
        <button
          type="button"
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark pattern'}
          onClick={(e) => onToggleBookmark(pattern.id, e)}
          className={`p-2 rounded-xl transition-colors ${
            isBookmarked
              ? 'text-[#F7A600] bg-[#F7A600]/15'
              : 'text-[#9B9FA9] hover:text-white bg-[#14171F]/60'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#F7A600]' : ''}`} />
        </button>
      </div>

      {/* Visual Chart Diagram Preview */}
      <div className="w-full pointer-events-none overflow-hidden rounded-xl">
        <PatternDiagram
          pattern={pattern}
          showAnnotations={false}
          showTradeLevels={false}
          className="aspect-[16/9] border-[#2A2E39]/80"
        />
      </div>

      {/* Pattern Title & Context */}
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-1">
          <h3 className="text-[15px] font-bold text-white tracking-tight leading-snug group-hover:text-[#60A5FA] transition-colors">
            {pattern.name}
          </h3>
          {pattern.japaneseName && (
            <span className="text-[11px] text-[#9B9FA9] font-mono shrink-0">
              {pattern.japaneseName}
            </span>
          )}
        </div>

        <p className="text-[12px] text-[#9B9FA9] line-clamp-2 leading-relaxed">
          {pattern.shortDescription}
        </p>
      </div>

      {/* Bottom Footer: Entry trigger preview & Details CTA */}
      <div className="pt-2 border-t border-[#2A2E39]/70 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 text-[#9B9FA9]">
          <span className="text-white/60 font-mono">R:R</span>
          <span className="text-white font-semibold font-mono">{pattern.tradingStrategy.riskRewardRatio}</span>
        </div>

        <div className="flex items-center gap-1 text-[#60A5FA] font-medium group-hover:translate-x-0.5 transition-transform">
          <span>View Rules & Trade</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
