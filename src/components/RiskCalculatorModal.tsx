import React, { useState, useEffect } from 'react';
import { X, Calculator, ArrowUpRight, ArrowDownRight, DollarSign, Percent, ShieldCheck } from 'lucide-react';
import { Pattern } from '../types/pattern';

interface RiskCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillPattern?: Pattern | null;
}

export const RiskCalculatorModal: React.FC<RiskCalculatorModalProps> = ({
  isOpen,
  onClose,
  prefillPattern
}) => {
  const [accountBalance, setAccountBalance] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(1.5);
  const [entryPrice, setEntryPrice] = useState<number>(100);
  const [stopLoss, setStopLoss] = useState<number>(95);
  const [direction, setDirection] = useState<'long' | 'short'>('long');

  useEffect(() => {
    if (prefillPattern?.tradingStrategy.examplePrices) {
      const { entry, stopLoss: sl } = prefillPattern.tradingStrategy.examplePrices;
      setEntryPrice(entry);
      setStopLoss(sl);
      setDirection(prefillPattern.signal === 'bearish' ? 'short' : 'long');
    }
  }, [prefillPattern]);

  if (!isOpen) return null;

  // Calculations
  const dollarRisk = (accountBalance * riskPercent) / 100;
  const priceDistance = Math.abs(entryPrice - stopLoss);
  const isInvalidStop =
    (direction === 'long' && stopLoss >= entryPrice) ||
    (direction === 'short' && stopLoss <= entryPrice) ||
    priceDistance === 0;

  const positionSize = isInvalidStop ? 0 : dollarRisk / priceDistance;
  const positionValue = positionSize * entryPrice;

  // Target Projections
  const target1Distance = priceDistance * 2;
  const target2Distance = priceDistance * 3;

  const target1Price = direction === 'long' ? entryPrice + target1Distance : entryPrice - target1Distance;
  const target2Price = direction === 'long' ? entryPrice + target2Distance : entryPrice - target2Distance;

  const target1Profit = dollarRisk * 2;
  const target2Profit = dollarRisk * 3;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4 animate-fadeIn">
      <div className="relative w-full sm:max-w-md bg-[#101216] border border-[#2A2E39] sm:rounded-3xl rounded-t-3xl flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#2A2E39] bg-[#14171F] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#2962FF]/20 text-[#60A5FA] flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-none">
                Trade Size & Risk Calculator
              </h3>
              <p className="text-[11px] text-[#9B9FA9] mt-0.5">
                {prefillPattern ? `Configured for ${prefillPattern.name}` : 'Institutional Risk Management'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white hover:bg-[#2A2E39] bg-[#1E222D]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-4 overflow-y-auto max-h-[80vh] text-xs">
          {/* Long / Short Switch */}
          <div className="flex items-center p-1 bg-[#1E222D] rounded-xl border border-[#2A2E39]">
            <button
              onClick={() => setDirection('long')}
              className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-colors ${
                direction === 'long'
                  ? 'bg-[#089981] text-white shadow-md'
                  : 'text-[#9B9FA9] hover:text-white'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>LONG (Buy)</span>
            </button>
            <button
              onClick={() => setDirection('short')}
              className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-colors ${
                direction === 'short'
                  ? 'bg-[#F23645] text-white shadow-md'
                  : 'text-[#9B9FA9] hover:text-white'
              }`}
            >
              <ArrowDownRight className="w-4 h-4" />
              <span>SHORT (Sell)</span>
            </button>
          </div>

          {/* Account Balance & Risk % */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-[#9B9FA9] font-medium block mb-1">
                Account Balance ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-[#9B9FA9] font-mono">$</span>
                <input
                  type="number"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-[#1E222D] border border-[#2A2E39] rounded-xl py-2 pl-7 pr-3 text-white font-mono focus:border-[#2962FF] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-[#9B9FA9] font-medium block mb-1">
                Risk Per Trade (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(Math.max(0.1, Number(e.target.value)))}
                  className="w-full bg-[#1E222D] border border-[#2A2E39] rounded-xl py-2 pl-3 pr-7 text-white font-mono focus:border-[#2962FF] focus:outline-none"
                />
                <span className="absolute right-3 top-2.5 text-[#9B9FA9] font-mono">%</span>
              </div>
            </div>
          </div>

          {/* Entry & Stop Loss */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-[#9B9FA9] font-medium block mb-1">
                Entry Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={entryPrice}
                onChange={(e) => setEntryPrice(Number(e.target.value))}
                className="w-full bg-[#1E222D] border border-[#2A2E39] rounded-xl py-2 px-3 text-white font-mono focus:border-[#2962FF] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] text-[#9B9FA9] font-medium block mb-1">
                Stop Loss Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={stopLoss}
                onChange={(e) => setStopLoss(Number(e.target.value))}
                className={`w-full bg-[#1E222D] border rounded-xl py-2 px-3 text-white font-mono focus:outline-none ${
                  isInvalidStop ? 'border-[#F23645]' : 'border-[#2A2E39] focus:border-[#2962FF]'
                }`}
              />
            </div>
          </div>

          {isInvalidStop && (
            <p className="text-[11px] text-[#F23645] bg-[#F23645]/10 p-2 rounded-lg border border-[#F23645]/20">
              {direction === 'long'
                ? 'For a Long trade, Stop Loss must be BELOW Entry Price.'
                : 'For a Short trade, Stop Loss must be ABOVE Entry Price.'}
            </p>
          )}

          {/* Results Card */}
          <div className="bg-[#1E222D] p-4 rounded-2xl border border-[#2A2E39] space-y-3">
            <div className="flex items-center justify-between border-b border-[#2A2E39] pb-2">
              <span className="text-[#9B9FA9]">Maximum Risk Amount:</span>
              <span className="font-mono font-bold text-[#F23645] text-sm">
                ${dollarRisk.toFixed(2)} ({riskPercent}%)
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#2A2E39] pb-2">
              <span className="text-[#9B9FA9]">Position Size:</span>
              <span className="font-mono font-bold text-white text-base">
                {isInvalidStop ? '0.00' : positionSize.toFixed(2)} Units
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#2A2E39] pb-2">
              <span className="text-[#9B9FA9]">Total Position Value:</span>
              <span className="font-mono font-medium text-white">
                ${isInvalidStop ? '0.00' : positionValue.toFixed(2)}
              </span>
            </div>

            {/* Target 1 (1:2 R:R) */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-white font-medium block">Target 1 (1:2 R:R)</span>
                <span className="text-[10px] text-[#9B9FA9]">Profit: +${target1Profit.toFixed(2)}</span>
              </div>
              <span className="font-mono font-bold text-[#089981]">
                ${isInvalidStop ? '0.00' : target1Price.toFixed(2)}
              </span>
            </div>

            {/* Target 2 (1:3 R:R) */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium block">Target 2 (1:3 R:R)</span>
                <span className="text-[10px] text-[#9B9FA9]">Profit: +${target2Profit.toFixed(2)}</span>
              </div>
              <span className="font-mono font-bold text-[#089981]">
                ${isInvalidStop ? '0.00' : target2Price.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#9B9FA9] bg-[#14171F] p-2.5 rounded-xl border border-[#2A2E39]">
            <ShieldCheck className="w-4 h-4 text-[#089981] shrink-0" />
            <span>Never risk more than 1% to 2% of your equity on a single setup.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
