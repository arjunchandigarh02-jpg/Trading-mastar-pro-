import React, { useState } from 'react';
import { PATTERNS_DATA } from '../data/patternsData';
import { Pattern, SignalType } from '../types/pattern';
import { Search, ArrowUpDown, ChevronRight, TrendingUp, TrendingDown, Scale } from 'lucide-react';

export const CheatSheetView: React.FC<{ onSelectPattern: (p: Pattern) => void }> = ({ onSelectPattern }) => {
  const [filterSignal, setFilterSignal] = useState<'all' | SignalType>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filtered = PATTERNS_DATA.filter((p) => {
    const matchSignal = filterSignal === 'all' || p.signal === filterSignal;
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSignal && matchSearch;
  });

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto animate-fadeIn">
      {/* Header Info */}
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-black text-white">
          Pattern Quick Reference Matrix
        </h2>
        <p className="text-xs text-[#9B9FA9]">
          Fast lookup table for entry triggers, stop-losses, and reward ratios.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#9B9FA9]" />
          <input
            type="text"
            placeholder="Filter matrix by pattern..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1E222D] border border-[#2A2E39] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#9B9FA9] focus:outline-none focus:border-[#2962FF]"
          />
        </div>

        <div className="flex items-center gap-1 bg-[#1E222D] p-1 rounded-xl border border-[#2A2E39]">
          <button
            onClick={() => setFilterSignal('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterSignal === 'all' ? 'bg-[#2A2E39] text-white' : 'text-[#9B9FA9]'
            }`}
          >
            All ({PATTERNS_DATA.length})
          </button>
          <button
            onClick={() => setFilterSignal('bullish')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterSignal === 'bullish' ? 'bg-[#089981]/20 text-[#089981]' : 'text-[#9B9FA9]'
            }`}
          >
            Bullish
          </button>
          <button
            onClick={() => setFilterSignal('bearish')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterSignal === 'bearish' ? 'bg-[#F23645]/20 text-[#F23645]' : 'text-[#9B9FA9]'
            }`}
          >
            Bearish
          </button>
        </div>
      </div>

      {/* Matrix List / Cards */}
      <div className="space-y-2">
        {filtered.map((pattern) => {
          const isBull = pattern.signal === 'bullish';
          const isBear = pattern.signal === 'bearish';

          return (
            <div
              key={pattern.id}
              onClick={() => onSelectPattern(pattern)}
              className="bg-[#1E222D] hover:bg-[#262B37] p-3.5 rounded-xl border border-[#2A2E39] flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer transition-all group"
            >
              <div className="flex items-start sm:items-center gap-3">
                <span
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isBull
                      ? 'bg-[#089981]/15 text-[#089981]'
                      : isBear
                      ? 'bg-[#F23645]/15 text-[#F23645]'
                      : 'bg-[#F7A600]/15 text-[#F7A600]'
                  }`}
                >
                  {isBull ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : isBear ? (
                    <TrendingDown className="w-4 h-4" />
                  ) : (
                    <Scale className="w-4 h-4" />
                  )}
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white group-hover:text-[#60A5FA] transition-colors">
                      {pattern.name}
                    </h4>
                    <span className="text-[10px] text-[#9B9FA9] font-mono">
                      · {pattern.categoryLabel}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#9B9FA9] mt-0.5 line-clamp-1">
                    <span className="text-[#089981] font-medium">Trigger: </span>
                    {pattern.tradingStrategy.entry}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 text-xs">
                <div className="text-right">
                  <span className="text-[10px] text-[#9B9FA9] block">R:R Ratio</span>
                  <span className="font-mono font-bold text-white">
                    {pattern.tradingStrategy.riskRewardRatio}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#9B9FA9] block">Reliability</span>
                  <span className="font-semibold text-emerald-400">
                    {pattern.reliability}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#9B9FA9] group-hover:translate-x-1 group-hover:text-white transition-all" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
