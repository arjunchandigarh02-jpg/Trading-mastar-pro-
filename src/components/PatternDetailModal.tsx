import React, { useState } from 'react';
import {
  X,
  Bookmark,
  Share2,
  TrendingUp,
  TrendingDown,
  Scale,
  Maximize2,
  CheckCircle2,
  ShieldAlert,
  Target,
  ArrowRight,
  Clock,
  Volume2,
  Calculator,
  Sparkles,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';
import { Pattern } from '../types/pattern';
import { PatternDiagram } from './PatternDiagram';
import { ImageViewerModal } from './ImageViewerModal';

interface PatternDetailModalProps {
  pattern: Pattern | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onOpenCalculator: (pattern: Pattern) => void;
}

export const PatternDetailModal: React.FC<PatternDetailModalProps> = ({
  pattern,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onOpenCalculator
}) => {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !pattern) return null;

  const isBullish = pattern.signal === 'bullish';
  const isBearish = pattern.signal === 'bearish';

  const handleShare = async () => {
    const textToShare = `${pattern.name} (${pattern.signal.toUpperCase()}) - Trading Master Guide\nStrategy: ${pattern.tradingStrategy.entry}\nStop Loss: ${pattern.tradingStrategy.stopLoss}\nTarget: ${pattern.tradingStrategy.target}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Trading Master: ${pattern.name}`,
          text: textToShare
        });
      } catch {
        // Fallback copy
        copyToClipboard(textToShare);
      }
    } else {
      copyToClipboard(textToShare);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4 animate-fadeIn">
        {/* Modal Container */}
        <div className="relative w-full sm:max-w-xl max-h-[92vh] sm:max-h-[88vh] bg-[#101216] border border-[#2A2E39] sm:rounded-3xl rounded-t-3xl flex flex-col overflow-hidden shadow-2xl animate-slideUp">
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#2A2E39] bg-[#14171F] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
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
              <span className="text-xs text-[#9B9FA9] font-mono">
                {pattern.categoryLabel}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => onToggleBookmark(pattern.id, e)}
                aria-label="Bookmark"
                className={`p-2 rounded-xl transition-colors ${
                  isBookmarked
                    ? 'text-[#F7A600] bg-[#F7A600]/15'
                    : 'text-[#9B9FA9] hover:text-white bg-[#1E222D]'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#F7A600]' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                aria-label="Share"
                className="p-2 rounded-xl text-[#9B9FA9] hover:text-white bg-[#1E222D] transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-[#089981]" /> : <Share2 className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                aria-label="Close"
                className="p-2 rounded-xl text-white hover:bg-[#2A2E39] bg-[#1E222D] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Body Content */}
          <div className="overflow-y-auto px-5 py-5 space-y-6 flex-1 text-sm">
            {/* Title & Japanese Kanji */}
            <div>
              <div className="flex items-baseline justify-between">
                <h2 className="text-2xl font-black text-white tracking-tight">
                  {pattern.name}
                </h2>
                {pattern.japaneseName && (
                  <span className="text-xs text-[#9B9FA9] font-mono bg-[#1E222D] px-2.5 py-1 rounded-lg border border-[#2A2E39]">
                    {pattern.japaneseName}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#9B9FA9] mt-1 flex items-center gap-2">
                <span>Context: <strong className="text-white font-medium">{pattern.trendContext}</strong></span>
                <span>·</span>
                <span>Reliability: <strong className="text-emerald-400 font-medium">{pattern.reliability}</strong></span>
              </p>
            </div>

            {/* High-Resolution Interactive Visual Diagram */}
            <div className="relative group cursor-pointer" onClick={() => setIsImageViewerOpen(true)}>
              <PatternDiagram pattern={pattern} showAnnotations showTradeLevels />
              <button
                type="button"
                className="absolute top-2.5 right-2.5 px-2.5 py-1.5 rounded-lg bg-[#101216]/80 backdrop-blur-md border border-[#2A2E39] text-[11px] font-medium text-white flex items-center gap-1.5 group-hover:bg-[#2962FF] transition-colors shadow-lg"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Pinch / Zoom</span>
              </button>
            </div>

            {/* 1. Market Psychology & Summary */}
            <div className="bg-[#1E222D] rounded-2xl p-4 border border-[#2A2E39] space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Sparkles className="w-4 h-4 text-[#F7A600]" />
                <span>Pattern Psychology & Market Sentiment</span>
              </div>
              <p className="text-xs text-[#9B9FA9] leading-relaxed">
                {pattern.psychology}
              </p>
            </div>

            {/* 2. Step-by-Step Identification Rules */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#089981]" />
                <span>Step-by-Step Identification Checklist</span>
              </div>
              <ul className="space-y-2">
                {pattern.identificationRules.map((rule, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 bg-[#1E222D]/60 p-3 rounded-xl border border-[#2A2E39]/80 text-xs text-white/90 leading-relaxed"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#089981]/20 text-[#089981] flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Professional Trading Strategy (Entry, SL, Target) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Target className="w-4 h-4 text-[#60A5FA]" />
                  <span>Execution & Risk Strategy</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#2962FF]/15 text-[#60A5FA] border border-[#2962FF]/30">
                  R:R {pattern.tradingStrategy.riskRewardRatio}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Entry */}
                <div className="bg-[#1E222D] p-3.5 rounded-xl border border-[#2A2E39]">
                  <div className="text-[11px] font-bold text-[#089981] flex items-center gap-1.5 uppercase font-mono">
                    <ArrowRight className="w-3.5 h-3.5" />
                    Entry Trigger
                  </div>
                  <p className="text-xs text-white mt-1 leading-snug">
                    {pattern.tradingStrategy.entry}
                  </p>
                </div>

                {/* Stop Loss */}
                <div className="bg-[#1E222D] p-3.5 rounded-xl border border-[#2A2E39]">
                  <div className="text-[11px] font-bold text-[#F23645] flex items-center gap-1.5 uppercase font-mono">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Exact Stop-Loss
                  </div>
                  <p className="text-xs text-white mt-1 leading-snug">
                    {pattern.tradingStrategy.stopLoss}
                  </p>
                </div>

                {/* Target Price */}
                <div className="bg-[#1E222D] p-3.5 rounded-xl border border-[#2A2E39]">
                  <div className="text-[11px] font-bold text-[#38BDF8] flex items-center gap-1.5 uppercase font-mono">
                    <Target className="w-3.5 h-3.5" />
                    Target Projection
                  </div>
                  <p className="text-xs text-white mt-1 leading-snug">
                    {pattern.tradingStrategy.target}
                  </p>
                </div>

                {/* Volume & Timeframe */}
                <div className="bg-[#1E222D] p-3.5 rounded-xl border border-[#2A2E39]">
                  <div className="text-[11px] font-bold text-[#FBBF24] flex items-center gap-1.5 uppercase font-mono">
                    <Volume2 className="w-3.5 h-3.5" />
                    Volume Confirmation
                  </div>
                  <p className="text-xs text-white mt-1 leading-snug">
                    {pattern.tradingStrategy.volumeConfirmation}
                  </p>
                </div>
              </div>

              {/* Recommended Timeframes */}
              <div className="flex items-center gap-2 pt-1 text-xs text-[#9B9FA9]">
                <Clock className="w-3.5 h-3.5" />
                <span>Best Timeframes:</span>
                <div className="flex items-center gap-1.5">
                  {pattern.tradingStrategy.recommendedTimeframes.map((tf) => (
                    <span
                      key={tf}
                      className="px-2 py-0.5 bg-[#1E222D] border border-[#2A2E39] rounded text-[11px] font-mono text-white"
                    >
                      {tf}
                    </span>
                  ))}
                </div>
              </div>

              {/* Common Pitfall Warning */}
              <div className="bg-[#F23645]/10 border border-[#F23645]/25 p-3 rounded-xl flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-[#F23645] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-[#F23645]">Trader Trap: </span>
                  <span className="text-white/80">{pattern.tradingStrategy.commonPitfall}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer: Quick Launch Risk/Reward Calculator */}
          <div className="p-4 border-t border-[#2A2E39] bg-[#14171F] flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenCalculator(pattern)}
              className="flex-1 py-3 px-4 rounded-xl bg-[#2962FF] hover:bg-[#1E4BD8] active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#2962FF]/20 transition-all"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Position Size & Risk for this Pattern</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Pinch & Zoom Modal */}
      <ImageViewerModal
        pattern={pattern}
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />
    </>
  );
};
