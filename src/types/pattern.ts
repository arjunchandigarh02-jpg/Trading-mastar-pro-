export type PatternCategory =
  | 'all'
  | 'single'
  | 'double'
  | 'triple'
  | 'chart_reversal'
  | 'chart_continuation'
  | 'chart_triangles';

export type SignalType = 'bullish' | 'bearish' | 'neutral';

export type ReliabilityScore = 'Medium' | 'Medium-High' | 'High' | 'Very High';

export interface TradingStrategy {
  entry: string;
  stopLoss: string;
  target: string;
  riskRewardRatio: string;
  volumeConfirmation: string;
  recommendedTimeframes: string[];
  commonPitfall: string;
  examplePrices?: {
    entry: number;
    stopLoss: number;
    target1: number;
    target2: number;
  };
}

export interface Pattern {
  id: string;
  name: string;
  japaneseName?: string;
  category: 'single' | 'double' | 'triple' | 'chart_reversal' | 'chart_continuation' | 'chart_triangles';
  categoryLabel: string;
  signal: SignalType;
  reliability: ReliabilityScore;
  trendContext: string;
  shortDescription: string;
  psychology: string;
  identificationRules: string[];
  tradingStrategy: TradingStrategy;
  tags: string[];
  diagramId: string;
  // Specific visual parameters for rendering dynamic SVG diagram
  diagramConfig?: {
    type: 'candlestick' | 'chart_pattern';
    candles?: Array<{
      open: number;
      close: number;
      high: number;
      low: number;
      label?: string;
      highlight?: boolean;
    }>;
    levels?: {
      entry?: number;
      stopLoss?: number;
      target?: number;
      neckline?: number;
      resistance?: number;
      support?: number;
    };
    trendline?: Array<{ x1: number; y1: number; x2: number; y2: number; label?: string }>;
    breakoutDirection?: 'up' | 'down';
  };
}

export interface QuizQuestion {
  id: string;
  patternId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
