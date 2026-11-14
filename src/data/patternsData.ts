import { Pattern } from '../types/pattern';

export const PATTERNS_DATA: Pattern[] = [
  // ==========================================
  // A. SINGLE CANDLESTICK PATTERNS
  // ==========================================
  {
    id: 'standard-doji',
    name: 'Standard Doji',
    japaneseName: 'Dōji (同時)',
    category: 'single',
    categoryLabel: 'Single Candlestick',
    signal: 'neutral',
    reliability: 'Medium',
    trendContext: 'Can appear in Uptrend or Downtrend',
    shortDescription: 'Open and close prices are virtually identical with balanced upper and lower shadows, signaling market indecision.',
    psychology: 'Neither buyers nor sellers could take control during the session. Bulls pushed prices up, bears drove prices down, but the session ended where it started. It represents equilibrium and an impending transition of power.',
    identificationRules: [
      'Open and close prices are virtually identical (cross or plus shape).',
      'Upper and lower shadows are of roughly equal length.',
      'Preceded by a clear directional trending move.',
      'Occurs at a key support or resistance level for higher significance.'
    ],
    tradingStrategy: {
      entry: 'Wait for next confirmation candle. Buy on break above high (if bullish reversal) or short on break below low (if bearish reversal).',
      stopLoss: 'Placed on the opposite side of the Doji wick extreme (plus 2–3 ticks buffer).',
      target: 'Next major support/resistance swing pivot or minimum 1:2 R:R.',
      riskRewardRatio: '1:2 to 1:2.5',
      volumeConfirmation: 'Lower volume on the Doji itself followed by surge in volume on the confirmation candle.',
      recommendedTimeframes: ['1H', '4H', 'Daily'],
      commonPitfall: 'Trading immediately upon seeing a Doji without waiting for the next confirmation candle to close.',
      examplePrices: { entry: 102.50, stopLoss: 98.00, target1: 111.50, target2: 116.00 }
    },
    tags: ['indecision', 'neutral', 'cross', 'reversal-warning'],
    diagramId: 'standard-doji',
    diagramConfig: {
      type: 'candlestick',
      candles: [
        { open: 88, close: 92, high: 93, low: 86 },
        { open: 92, close: 98, high: 99, low: 90 },
        { open: 98, close: 104, high: 105, low: 96 },
        { open: 102, close: 102, high: 108, low: 96, label: 'Doji', highlight: true },
        { open: 101, close: 95, high: 102, low: 94 }
      ],
      levels: { entry: 95.50, stopLoss: 108.50, target: 82.00 }
    }
  },
  {
    id: 'long-legged-doji',
    name: 'Long-Legged Doji',
    japaneseName: 'Juji (十字)',
    category: 'single',
    categoryLabel: 'Single Candlestick',
    signal: 'neutral',
    reliability: 'Medium-High',
    trendContext: 'Extended trend top or bottom',
    shortDescription: 'Extremely long upper and lower wicks with open and close nearly equal, indicating intense high-volatility indecision.',
    psychology: 'Extreme tug-of-war. Bulls made massive runs upward and bears mounted deep counterattacks downward, yet both exhausted their ammunition and ended at a dead heat.',
    identificationRules: [
      'Very long upper shadow and very long lower shadow.',
      'Body is paper-thin (open and close almost equal) positioned near the center.',
      'Significantly higher volatility range than surrounding bars.',
      'Forms after prolonged directional rally or decline.'
    ],
    tradingStrategy: {
      entry: 'Wait for break above upper wick (for long) or break below lower wick (for short) with a full candle body close.',
      stopLoss: 'Beyond the midpoint of the Doji or opposite wick tip.',
      target: 'Prior trend origin or 1:2 reward-to-risk ratio.',
      riskRewardRatio: '1:2',
      volumeConfirmation: 'Unusually high volume indicates institutional churning.',
      recommendedTimeframes: ['15m', '1H', '4H', 'Daily'],
      commonPitfall: 'Prematurely entering inside the wide Doji span where choppy whipsaws trigger tight stops.',
      examplePrices: { entry: 115.00, stopLoss: 94.00, target1: 140.00, target2: 155.00 }
    },
    tags: ['volatility', 'long-wicks', 'indecision'],
    diagramId: 'long-legged-doji'
  },
  {
    id: 'dragonfly-doji',
    name: 'Dragonfly Doji',
    japaneseName: 'Tonbo (とんぼ)',
    category: 'single',
    categoryLabel: 'Single Candlestick',
    signal: 'bullish',
    reliability: 'High',
    trendContext: 'Bottom of a Downtrend / Support Zone',
    shortDescription: 'T-shaped candlestick with long lower shadow and virtually no upper shadow; open, high, and close are at the session peak.',
    psychology: 'Sellers dumped aggressive supply driving price sharply lower during the session. However, strong buyer liquidity stepped in at lows, rejecting prices and pushing it all the way back up to close at the open.',
    identificationRules: [
      'Open, high, and close are identical or very close to each other at the candle top.',
      'Long lower shadow (at least 2x-3x the candle body width).',
      'Little to no upper shadow.',
      'Must appear after an established downtrend or key horizontal demand area.'
    ],
    tradingStrategy: {
      entry: 'Enter long on a break 1-2 ticks above the Dragonfly Doji high, or wait for next green candle close.',
      stopLoss: 'Placed 1-2 ATR or tick buffer below the long lower shadow low.',
      target: 'Measured move of prior downtrend swing or 1:2.5 risk-to-reward.',
      riskRewardRatio: '1:2 to 1:3',
      volumeConfirmation: 'Heavy buying volume during the rejection off the lows.',
      recommendedTimeframes: ['1H', '4H', 'Daily'],
      commonPitfall: 'Trading a Dragonfly Doji in the middle of a consolidation range without trend context.',
      examplePrices: { entry: 50.50, stopLoss: 45.00, target1: 61.50, target2: 67.00 }
    },
    tags: ['bullish-reversal', 'demand', 'bottom', 'rejection'],
    diagramId: 'dragonfly-doji'
  },
  {
    id: 'gravestone-doji',
    name: 'Gravestone Doji',
    japaneseName: 'Tohba (墓石)',
    category: 'single',
    categoryLabel: 'Single Candlestick',
    signal: 'bearish',
    reliability: 'High',
    trendContext: 'Peak of an Uptrend / Resistance Zone',
    shortDescription: 'Inverted T-shape with long upper shadow and open, low, and close at the session bottom, signaling severe buyer rejection.',
    psychology: 'Bulls attempted to continue the rally by thrusting price to new highs, but institutional supply overwhelmed demand, knocking prices right back to the open. Bulls are now trapped at the highs.',
    identificationRules: [
      'Open, low, and close are essentially equal at the absolute base of the candle.',
      'Long upper shadow extending high above the body.',
      'Virtually non-existent lower shadow.',
      'Must appear at the climax of an uptrend or resistance hurdle.'
    ],
    tradingStrategy: {
      entry: 'Sell short when the subsequent candle breaks below the Gravestone Doji low.',
      stopLoss: 'Placed just above the peak of the long upper shadow.',
      target: 'Next major support level or 50% Fibonacci retracement of previous swing.',
      riskRewardRatio: '1:2 to 1:3',
      volumeConfirmation: 'Elevated volume indicates heavy institutional dumping into retail buyers.',
      recommendedTimeframes: ['1H', '4H', 'Daily'],
      commonPitfall: 'Shorting immediately before confirming that price actually trades below the candle bottom.',
      examplePrices: { entry: 120.00, stopLoss: 128.50, target1: 103.00, target2: 95.00 }
    },
    tags: ['bearish-reversal', 'supply-exhaustion', 'top', 'wick-rejection'],
    diagramId: 'gravestone-doji'
  },
  {
    id: 'hammer',
    name: 'Hammer',
    japaneseName: 'Takuri (金槌)',
    category: 'single',
    categoryLabel: 'Single Candlestick',
    signal: 'bullish',
    reliability: 'High',
    trendContext: 'Bottom of a sustained Downtrend',
    shortDescription: 'Small real body at the top with a lower shadow at least twice the body size and little to no upper shadow.',
    psychology: 'Bears forced deep new lows, but buyers aggressively bought the discount, hammering out a bottom. The closing price near highs indicates bulls dominated the second half of the period.',
    identificationRules: [
      'Small real body located near the upper end of the trading range (green is slightly stronger than red).',
      'Lower shadow is at least 2 times longer than the real body.',
      'Little or no upper shadow (upper shadow should not exceed 10% of body size).',
      'Formed at the bottom of a confirmed downward trend.'
    ],
    tradingStrategy: {
      entry: 'Place buy stop order 1-2 ticks above the high of the Hammer candle, or wait for next candle close above.',
      stopLoss: 'Place stop-loss 1-2 ticks below the lowest point of the Hammer shadow.',
      target: 'Target the prior swing high or a minimum 1:2 risk-to-reward ratio.',
      riskRewardRatio: '1:2 to 1:3',
      volumeConfirmation: 'High spike in volume signifies capitulation and strong institutional absorption.',
      recommendedTimeframes: ['15m', '1H', '4H', 'Daily'],
      commonPitfall: 'Failing to check if the hammer formed in clear air rather than at established support.',
      examplePrices: { entry: 85.00, stopLoss: 78.50, target1: 98.00, target2: 104.50 }
    },
    tags: ['bullish-reversal', 'hammer', 'demand-zone', 'bottom'],
    diagramId: 'hammer'
  },
  {
    id: 'inverted-hammer',
    name: 'Inverted Hammer',
    japaneseName: 'Toba Gyaku',
    category: 'single',
    categoryLabel: 'Single Candlestick',
    signal: 'bullish',
    reliability: 'Medium-High',
    trendContext: 'Bottom of a Downtrend',
    shortDescription: 'Small real body near the bottom with an upper shadow at least 2x the body size and minimal lower shadow.',
    psychology: 'Buyers demonstrated explosive intent to drive prices upward, testing seller resolve. While sellers pulled price back before the close, the presence of fierce buying interest signals the downtrend is vulnerable.',
    identificationRules: [
      'Small real body at the bottom of the candlestick range.',
      'Upper shadow is at least 2 to 3 times the height of the real body.',
      'Little to no lower shadow.',
      'Forms after a clear downtrend; requires next-bar bullish confirmation.'
    ],
    tradingStrategy: {
      entry: 'Wait for next candle to open or close above the Inverted Hammer body/high.',
      stopLoss: 'Below the low of the Inverted Hammer candle.',
      target: 'Prior swing resistance level or 1:2 R:R.',
      riskRewardRatio: '1:2',
      volumeConfirmation: 'Spike in volume on the rally attempt indicates strong buyer initiation.',
      recommendedTimeframes: ['1H', '4H', 'Daily'],
      commonPitfall: 'Confusing it with a Shooting Star (which occurs at tops, not bottoms) and trading without next-bar confirmation.',
      examplePrices: { entry: 64.00, stopLoss: 58.00, target1: 76.00, target2: 82.00 }
    },
    tags: ['bullish-reversal', 'bottom', 'testing-resistance'],
    diagramId: 'inverted-hammer'
  },
  {
    id: 'hanging-man',
    name: 'Hanging Man',
    japaneseName: 'Kubitsuri (首吊り)',
    category: 'single',
    categoryLabel: 'Single Candlestick',
    signal: 'bearish',
    reliability: 'Medium-High',
    trendContext: 'Top of an Uptrend / Resistance',
    shortDescription: 'Looks identical to a Hammer but appears at the peak of an uptrend, warning of sudden seller invasion.',
    psychology: 'The long lower shadow reveals that sellers were able to push price down significantly during the session for the first time in the uptrend. Even though bulls recovered, the crack in bullish defense has appeared.',
    identificationRules: [
      'Small real body at the upper end of the candle.',
      'Lower shadow is at least twice the length of the real body.',
      'Minimal or no upper shadow.',
      'Occurs at the top of a prolonged uptrend. Must be confirmed by a bearish candle next session.'
    ],
    tradingStrategy: {
      entry: 'Enter short once the following candle breaks and closes below the Hanging Man body/low.',
      stopLoss: 'Placed slightly above the high of the Hanging Man candle.',
      target: 'Next support area or 1:2 risk-to-reward.',
      riskRewardRatio: '1:2',
      volumeConfirmation: 'High volume on the drop indicates institutional profit taking.',
      recommendedTimeframes: ['1H', '4H', 'Daily'],
      commonPitfall: 'Shorting before confirmation; without a bearish follow-up, the uptrend can effortlessly resume.',
      examplePrices: { entry: 142.00, stopLoss: 149.00, target1: 128.00, target2: 121.00 }
    },
    tags: ['bearish-reversal', 'top-exhaustion', 'warning'],
    diagramId: 'hanging-man'
  },
  {
    id: 'shooting-star',
    name: 'Shooting Star',
    japaneseName: 'Nagareboshi (流れ星)',
    category: 'single',
    categoryLabel: 'Single Candlestick',
    signal: 'bearish',
    reliability: 'High',
    trendContext: 'Peak of an Uptrend',
    shortDescription: 'Small body near the session low with a long upper shadow at least twice the body size, signaling rejection of higher prices.',
    psychology: 'Bulls gapped or drove price higher with enthusiasm, but hit a massive wall of supply. Bears forcefully pushed prices back down to close near the open, leaving trapped buyers underwater.',
    identificationRules: [
      'Small real body situated at the lower boundary of the candle range.',
      'Upper shadow is at least 2 times the length of the body.',
      'Negligible or non-existent lower shadow.',
      'Appears after an established uptrend or retest of resistance.'
    ],
    tradingStrategy: {
      entry: 'Sell short on break below the Shooting Star low or upon close of the confirmation candle.',
      stopLoss: 'Place stop-loss 1-2 ticks above the upper wick peak.',
      target: 'Key support shelf below or minimum 1:2.5 risk-to-reward.',
      riskRewardRatio: '1:2.5 to 1:3',
      volumeConfirmation: 'High volume during the upper shadow rejection reinforces genuine seller dominance.',
      recommendedTimeframes: ['15m', '1H', '4H', 'Daily'],
      commonPitfall: 'Placing stop-loss right at the wick peak without room for a quick liquidity sweep.',
      examplePrices: { entry: 210.00, stopLoss: 222.00, target1: 186.00, target2: 174.00 }
    },
    tags: ['bearish-reversal', 'rejection', 'top', 'pinbar'],
    diagramId: 'shooting-star'
  },
  {
    id: 'bullish-marubozu',
    name: 'Bullish Marubozu',
    japaneseName: 'Marubōzu (丸坊主)',
    category: 'single',
    categoryLabel: 'Single Candlestick',
    signal: 'bullish',
    reliability: 'High',
    trendContext: 'Breakout from range or Continuation in Uptrend',
    shortDescription: 'Tall solid green candle with no upper or lower shadows; open equals low, close equals high.',
    psychology: 'Total, uncontested domination by buyers from the opening tick to the final bell. Sellers never had a chance to mount a counterattack at any moment in the period.',
    identificationRules: [
      'Long solid green/white body with virtually zero shadows.',
      'Open price is the absolute low of the period.',
      'Close price is the absolute high of the period.',
      'Significantly larger body size than previous 5-10 bars.'
    ],
    tradingStrategy: {
      entry: 'Enter long on retest of the Marubozu midpoint (50% level) or breakout continuation above high.',
      stopLoss: 'Below the low (open price) of the Marubozu candle.',
      target: 'Next resistance level or 1.5x the height of the Marubozu candle added to the breakout point.',
      riskRewardRatio: '1:2',
      volumeConfirmation: 'Heavy surge in trading volume confirming institutional participation.',
      recommendedTimeframes: ['5m', '15m', '1H', 'Daily'],
      commonPitfall: 'Chasing the top of the candle immediately without waiting for a brief retest pull-back.',
      examplePrices: { entry: 150.00, stopLoss: 141.00, target1: 168.00, target2: 177.00 }
    },
    tags: ['momentum', 'bullish-continuation', 'dominance', 'shaved-head'],
    diagramId: 'bullish-marubozu'
  },
  {
    id: 'bearish-marubozu',
    name: 'Bearish Marubozu',
    japaneseName: 'In no Marubōzu',
    category: 'single',
    categoryLabel: 'Single Candlestick',
    signal: 'bearish',
    reliability: 'High',
    trendContext: 'Breakdown from range or Continuation in Downtrend',
    shortDescription: 'Tall solid red candle with zero upper or lower shadows; open equals high, close equals low.',
    psychology: 'Unrelenting seller control from start to finish. Buyers were completely paralyzed, unable to trigger any bounce.',
    identificationRules: [
      'Long solid red/black body without noticeable shadows.',
      'Open price is the absolute high of the session.',
      'Close price is the absolute low of the session.',
      'Towering height compared to average true range (ATR).'
    ],
    tradingStrategy: {
      entry: 'Short on breakdown below the candle low or on a retracement to the 50% midpoint level.',
      stopLoss: 'Just above the open (high) of the Marubozu bar.',
      target: 'Next major support floor or measured height extension.',
      riskRewardRatio: '1:2',
      volumeConfirmation: 'High sell volume validates real breakdown rather than low-liquidity slippage.',
      recommendedTimeframes: ['15m', '1H', '4H', 'Daily'],
      commonPitfall: 'Entering at the very bottom when RSI is already deeply oversold; wait for retest.',
      examplePrices: { entry: 180.00, stopLoss: 191.00, target1: 158.00, target2: 147.00 }
    },
    tags: ['bearish-momentum', 'breakdown', 'seller-dominance'],
    diagramId: 'bearish-marubozu'
  },
  {
    id: 'spinning-top',
    name: 'Spinning Top',
    japaneseName: 'Koma (独楽)',
    category: 'single',
    categoryLabel: 'Single Candlestick',
    signal: 'neutral',
    reliability: 'Medium',
    trendContext: 'Can occur in any market condition',
    shortDescription: 'Small real body centered between upper and lower shadows of equal length, signifying hesitation.',
    psychology: 'Both buyers and sellers engaged in active trading but neither managed to establish a dominant advantage. Suggests trend loss of momentum.',
    identificationRules: [
      'Small real body (color does not matter much).',
      'Upper and lower shadows are distinctly visible and longer than the body.',
      'Body is centrally located within the range.'
    ],
    tradingStrategy: {
      entry: 'Wait for a directional breakout beyond the high or low of the spinning top.',
      stopLoss: 'Opposite side of the breakout direction.',
      target: 'Next horizontal level; 1:1.5 to 1:2 R:R.',
      riskRewardRatio: '1:1.5 to 1:2',
      volumeConfirmation: 'Declining volume confirms consolidation.',
      recommendedTimeframes: ['1H', '4H', 'Daily'],
      commonPitfall: 'Treating a spinning top as a definitive reversal rather than an alert for potential transition.',
      examplePrices: { entry: 72.00, stopLoss: 67.00, target1: 82.00, target2: 87.00 }
    },
    tags: ['indecision', 'consolidation', 'neutral'],
    diagramId: 'spinning-top'
  },

  // ==========================================
  // B. DOUBLE CANDLESTICK PATTERNS
  // ==========================================
  {
    id: 'bullish-engulfing',
    name: 'Bullish Engulfing',
    japaneseName: 'Tsutsumi (包み線)',
    category: 'double',
    categoryLabel: 'Double Candlestick',
    signal: 'bullish',
    reliability: 'Very High',
    trendContext: 'Bottom of a Downtrend',
    shortDescription: 'A small bearish candle followed by a large bullish candle whose body completely covers/engulfs the prior candle body.',
    psychology: 'Sellers were in charge on Candle 1. Candle 2 opens lower (or flat), but bulls seize immense control, overpowering all sellers and driving price well beyond the previous open.',
    identificationRules: [
      'Candle 1 is red (bearish), continuing prior downtrend.',
      'Candle 2 is green (bullish) and opens at or below Candle 1 close.',
      'Candle 2 real body completely covers the real body of Candle 1.',
      'Shadows do not necessarily need to be engulfed, but body engulfment is mandatory.'
    ],
    tradingStrategy: {
      entry: 'Enter long above the high of the engulfing green candle, or on a 38-50% retest of the engulfing body.',
      stopLoss: 'Placed 1-2 ticks below the lowest low of both candles.',
      target: 'Previous resistance high or measured move equaling the size of the engulfing candle.',
      riskRewardRatio: '1:2.5 to 1:3',
      volumeConfirmation: 'Candle 2 volume should be significantly larger than Candle 1 volume.',
      recommendedTimeframes: ['15m', '1H', '4H', 'Daily'],
      commonPitfall: 'Ignoring higher timeframe resistance right above the engulfing bar.',
      examplePrices: { entry: 105.00, stopLoss: 96.00, target1: 123.00, target2: 132.00 }
    },
    tags: ['bullish-reversal', 'engulfing', 'high-probability', 'demand'],
    diagramId: 'bullish-engulfing'
  },
  {
    id: 'bearish-engulfing',
    name: 'Bearish Engulfing',
    japaneseName: 'In no Tsutsumi',
    category: 'double',
    categoryLabel: 'Double Candlestick',
    signal: 'bearish',
    reliability: 'Very High',
    trendContext: 'Peak of an Uptrend',
    shortDescription: 'A small bullish candle followed by an expansive bearish candle whose body completely engulfs the prior candle.',
    psychology: 'Bulls pushed price up initially, but bears entered with overwhelming selling pressure, completely suffocating the bullish momentum and burying previous buyers in losses.',
    identificationRules: [
      'Candle 1 is green (bullish) in an uptrend.',
      'Candle 2 is a strong red (bearish) candle.',
      'The body of Candle 2 completely envelops the body of Candle 1.',
      'Formed at or near key resistance or Fibonacci levels.'
    ],
    tradingStrategy: {
      entry: 'Enter short on the break below Candle 2 low or on a retest of Candle 1 high.',
      stopLoss: 'Placed slightly above the high of Candle 2.',
      target: 'Next major support level or 1:2.5 risk-to-reward ratio.',
      riskRewardRatio: '1:2.5 to 1:3',
      volumeConfirmation: 'Substantial increase in volume on Candle 2.',
      recommendedTimeframes: ['15m', '1H', '4H', 'Daily'],
      commonPitfall: 'Shorting without checking if Candle 2 is just reacting to minor intraday news before trend resumes.',
      examplePrices: { entry: 220.00, stopLoss: 232.00, target1: 196.00, target2: 184.00 }
    },
    tags: ['bearish-reversal', 'engulfing', 'top', 'seller-trap'],
    diagramId: 'bearish-engulfing'
  },
  {
    id: 'piercing-line',
    name: 'Piercing Line',
    japaneseName: 'Kirikomi (切込線)',
    category: 'double',
    categoryLabel: 'Double Candlestick',
    signal: 'bullish',
    reliability: 'High',
    trendContext: 'Bottom of a Downtrend',
    shortDescription: 'A long bearish candle followed by a bullish candle that opens below the low but closes above the 50% midpoint of the first candle.',
    psychology: 'Bears opened with confidence at a fresh low, but buyers stepped in aggressively, pushing price up more than halfway through the previous day’s losses, severely shaking bear confidence.',
    identificationRules: [
      'First candle is a long bearish (red) body.',
      'Second candle opens with a gap down below the prior day’s close or low.',
      'Second candle closes more than 50% into the body of the first candle.',
      'Occurs at strong historical support.'
    ],
    tradingStrategy: {
      entry: 'Enter long on the open of Candle 3 or upon a break above Candle 2 high.',
      stopLoss: 'Placed 1-2 ticks below the low of Candle 2.',
      target: 'Previous swing high or 1:2 R:R.',
      riskRewardRatio: '1:2',
      volumeConfirmation: 'Heavy volume on Candle 2 confirms genuine institutional buying.',
      recommendedTimeframes: ['1H', '4H', 'Daily'],
      commonPitfall: 'Accepting a pattern where Candle 2 fails to penetrate the 50% midpoint (which is merely an "In-Neck" continuation pattern).',
      examplePrices: { entry: 80.00, stopLoss: 73.00, target1: 94.00, target2: 101.00 }
    },
    tags: ['bullish-reversal', 'gap-down-recovery', 'bottom'],
    diagramId: 'piercing-line'
  },
  {
    id: 'dark-cloud-cover',
    name: 'Dark Cloud Cover',
    japaneseName: 'Kabuse (被せ線)',
    category: 'double',
    categoryLabel: 'Double Candlestick',
    signal: 'bearish',
    reliability: 'High',
    trendContext: 'Peak of an Uptrend',
    shortDescription: 'A long bullish candle followed by a bearish candle that gaps up at the open but closes below the 50% midpoint of the first candle.',
    psychology: 'Bulls gapped higher at open anticipating another rally, but sellers slammed the market downward, taking back over half of the prior day’s gains and hanging a "dark cloud" over the rally.',
    identificationRules: [
      'First candle is a long bullish (green) candle.',
      'Second candle opens above the high/close of the first candle.',
      'Second candle closes deeply below the 50% midpoint of the first candle body.',
      'Does not necessarily have to engulf the entire first candle.'
    ],
    tradingStrategy: {
      entry: 'Sell short on break of the Dark Cloud Cover candle low.',
      stopLoss: 'Placed above the peak of Candle 2.',
      target: 'Next support area or 1:2.5 R:R.',
      riskRewardRatio: '1:2 to 1:2.5',
      volumeConfirmation: 'Increased volume on Candle 2 reinforces bear takeover.',
      recommendedTimeframes: ['1H', '4H', 'Daily'],
      commonPitfall: 'Entering if Candle 2 closes above the 50% mark of Candle 1.',
      examplePrices: { entry: 160.00, stopLoss: 169.00, target1: 142.00, target2: 133.00 }
    },
    tags: ['bearish-reversal', 'gap-up-rejection', 'top'],
    diagramId: 'dark-cloud-cover'
  },
  {
    id: 'tweezer-bottom',
    name: 'Tweezer Bottom',
    japaneseName: 'Kenuki Soko (毛抜き底)',
    category: 'double',
    categoryLabel: 'Double Candlestick',
    signal: 'bullish',
    reliability: 'High',
    trendContext: 'Bottom of a Downtrend',
    shortDescription: 'Two consecutive candles with identical or near-identical lows, demonstrating a rock-solid floor.',
    psychology: 'Sellers tried twice to punch through a specific price level, but buyers fiercely defended the exact price shelf both times, establishing an impenetrable support barrier.',
    identificationRules: [
      'First candle is bearish, matching prior downtrend.',
      'Second candle is bullish (or hammer/doji).',
      'The lows of both candles touch the exact same price level (tweezer alignment).',
      'Lower shadows reject the same horizontal support line.'
    ],
    tradingStrategy: {
      entry: 'Buy on break above the high of the second candle.',
      stopLoss: 'Placed 1-2 ticks below the dual tweezer low.',
      target: 'Next resistance zone or 1:2.5 R:R.',
      riskRewardRatio: '1:2 to 1:2.5',
      volumeConfirmation: 'Volume dry-up on the second probe followed by strong bounce.',
      recommendedTimeframes: ['15m', '1H', '4H', 'Daily'],
      commonPitfall: 'Trading tweezer bottoms that occur mid-range rather than at an established support level.',
      examplePrices: { entry: 45.00, stopLoss: 41.50, target1: 52.00, target2: 55.50 }
    },
    tags: ['double-rejection', 'support-test', 'bullish-bottom'],
    diagramId: 'tweezer-bottom'
  },
  {
    id: 'tweezer-top',
    name: 'Tweezer Top',
    japaneseName: 'Kenuki Tenjo (毛抜き天井)',
    category: 'double',
    categoryLabel: 'Double Candlestick',
    signal: 'bearish',
    reliability: 'High',
    trendContext: 'Peak of an Uptrend',
    shortDescription: 'Two consecutive candles with identical or near-identical highs, indicating a firm ceiling of resistance.',
    psychology: 'Bulls tested the ceiling twice, and both times massive institutional supply slapped the price down at the exact penny, confirming exhaustion.',
    identificationRules: [
      'First candle is bullish in an uptrend.',
      'Second candle is bearish.',
      'Both candles share identical highs (wicks touch the exact same ceiling).',
      'Occurs at prominent resistance or round psychological numbers.'
    ],
    tradingStrategy: {
      entry: 'Sell short on break below the low of the second tweezer candle.',
      stopLoss: 'Placed slightly above the dual tweezer peak.',
      target: 'Next key support level or 1:2.5 R:R.',
      riskRewardRatio: '1:2 to 1:2.5',
      volumeConfirmation: 'High volume on the second rejection confirms heavy supply.',
      recommendedTimeframes: ['15m', '1H', '4H', 'Daily'],
      commonPitfall: 'Shorting without waiting for the second candle to actually close and confirm the rejection.',
      examplePrices: { entry: 130.00, stopLoss: 136.00, target1: 118.00, target2: 112.00 }
    },
    tags: ['double-rejection', 'resistance-ceiling', 'bearish-top'],
    diagramId: 'tweezer-top'
  },
  {
    id: 'bullish-harami',
    name: 'Bullish Harami',
    japaneseName: 'Harami (孕み線 - Pregnant)',
    category: 'double',
    categoryLabel: 'Double Candlestick',
    signal: 'bullish',
    reliability: 'Medium-High',
    trendContext: 'Bottom of a Downtrend',
    shortDescription: 'A large red candle followed by a small green candle whose body is completely contained inside the prior candle’s body.',
    psychology: 'The steep downtrend is suddenly halted. Sellers failed to continue pushing lows, and price contracted inside the previous bar, signaling that selling pressure has dried up.',
    identificationRules: [
      'First candle is a large bearish (red) body.',
      'Second candle is a small bullish (green) body completely within the vertical span of the first candle body.',
      'Resembles a mother and child ("pregnant" in Japanese).',
      'Preceded by a steep downtrend.'
    ],
    tradingStrategy: {
      entry: 'Enter long when price breaks above the high of the small second candle (or Candle 1 for conservative traders).',
      stopLoss: 'Below the low of Candle 1.',
      target: 'Previous swing high or 1:2 R:R.',
      riskRewardRatio: '1:2',
      volumeConfirmation: 'Noticeable drop in volume on the small inside candle, indicating seller exhaustion.',
      recommendedTimeframes: ['1H', '4H', 'Daily'],
      commonPitfall: 'Trading inside bar breakouts in low-liquidity environments without a trend context.',
      examplePrices: { entry: 92.00, stopLoss: 85.00, target1: 106.00, target2: 113.00 }
    },
    tags: ['inside-bar', 'volatility-compression', 'bullish-reversal'],
    diagramId: 'bullish-harami'
  },
  {
    id: 'bearish-harami',
    name: 'Bearish Harami',
    japaneseName: 'In no Harami',
    category: 'double',
    categoryLabel: 'Double Candlestick',
    signal: 'bearish',
    reliability: 'Medium-High',
    trendContext: 'Peak of an Uptrend',
    shortDescription: 'A large green candle followed by a small red candle completely contained within the prior candle’s body.',
    psychology: 'Bulls dominated Candle 1, but Candle 2 failed to generate any higher highs. The buying momentum evaporated into a compressed inside bar.',
    identificationRules: [
      'First candle is a tall green (bullish) body.',
      'Second candle is a small red (bearish) body located entirely within the body of Candle 1.',
      'Signals trend deceleration and impending trend reversal.'
    ],
    tradingStrategy: {
      entry: 'Sell short when subsequent price breaks below the low of the inside candle.',
      stopLoss: 'Placed above the high of Candle 1.',
      target: 'Next support level or 1:2 R:R.',
      riskRewardRatio: '1:2',
      volumeConfirmation: 'Diminishing volume on Candle 2 followed by expanding volume on breakdown.',
      recommendedTimeframes: ['1H', '4H', 'Daily'],
      commonPitfall: 'Assuming an immediate crash without confirmation of a breakdown.',
      examplePrices: { entry: 175.00, stopLoss: 184.00, target1: 157.00, target2: 148.00 }
    },
    tags: ['inside-bar', 'uptrend-exhaustion', 'bearish-reversal'],
    diagramId: 'bearish-harami'
  },

  // ==========================================
  // C. TRIPLE CANDLESTICK PATTERNS
  // ==========================================
  {
    id: 'morning-star',
    name: 'Morning Star',
    japaneseName: 'Sankō Akebono (三空明けの明星)',
    category: 'triple',
    categoryLabel: 'Triple Candlestick',
    signal: 'bullish',
    reliability: 'Very High',
    trendContext: 'Bottom of an established Downtrend',
    shortDescription: 'A 3-candle bottom reversal: long red candle, small indecision candle gapping down, and a long green candle closing high.',
    psychology: 'Day 1: Bears in complete control. Day 2: Market gaps down but stalls into indecision. Day 3: Bulls aggressively take over and erase the majority of Day 1 losses. A dawn of a new bull trend.',
    identificationRules: [
      'Candle 1: Long bearish (red) candle in a downtrend.',
      'Candle 2: Small body (green or red) gapping down below Candle 1 body.',
      'Candle 3: Long bullish (green) candle closing at least 50% or higher into Candle 1 body.',
      'Classic high-reliability reversal formation.'
    ],
    tradingStrategy: {
      entry: 'Enter long at the close of Candle 3, or on a slight pullback to Candle 2 high.',
      stopLoss: 'Placed 1-2 ticks below the lowest point of Candle 2 (the star).',
      target: 'Swing high or 1:3 risk-to-reward ratio.',
      riskRewardRatio: '1:2.5 to 1:3.5',
      volumeConfirmation: 'Heavy volume on Candle 3 confirming institutional buying.',
      recommendedTimeframes: ['1H', '4H', 'Daily'],
      commonPitfall: 'Entering on Candle 2 before Candle 3 confirms the bullish reversal.',
      examplePrices: { entry: 110.00, stopLoss: 98.00, target1: 134.00, target2: 146.00 }
    },
    tags: ['top-tier', 'morning-star', 'three-bar-reversal', 'bullish'],
    diagramId: 'morning-star'
  },
  {
    id: 'evening-star',
    name: 'Evening Star',
    japaneseName: 'Yo no Myōjō (宵の明星)',
    category: 'triple',
    categoryLabel: 'Triple Candlestick',
    signal: 'bearish',
    reliability: 'Very High',
    trendContext: 'Peak of an established Uptrend',
    shortDescription: 'A 3-candle top reversal: long green candle, small star gapping up, and a long red candle plunging deeply into Candle 1.',
    psychology: 'Day 1: Bulls push price to new highs. Day 2: Gaps up but stalls as buyers run out of gas. Day 3: Bears slam price down, trapping late buyers at the absolute highs.',
    identificationRules: [
      'Candle 1: Long bullish (green) candle.',
      'Candle 2: Small body (green or red) gapping above Candle 1 body.',
      'Candle 3: Long bearish (red) candle closing deep into the body of Candle 1 (at least 50%).',
      'Forms at high-timeframe resistance.'
    ],
    tradingStrategy: {
      entry: 'Sell short on the close of Candle 3 or upon break of Candle 3 low.',
      stopLoss: 'Placed just above the highest wick of Candle 2 (the star).',
      target: 'Next major support level or 1:3 risk-to-reward ratio.',
      riskRewardRatio: '1:2.5 to 1:3.5',
      volumeConfirmation: 'Expanding volume on Candle 3 confirms institutional distribution.',
      recommendedTimeframes: ['1H', '4H', 'Daily'],
      commonPitfall: 'Ignoring Candle 3 close: if Candle 3 does not close past the 50% mark, the pattern is invalid.',
      examplePrices: { entry: 185.00, stopLoss: 200.00, target1: 155.00, target2: 140.00 }
    },
    tags: ['top-tier', 'evening-star', 'three-bar-reversal', 'bearish'],
    diagramId: 'evening-star'
  },
  {
    id: 'three-white-soldiers',
    name: 'Three White Soldiers',
    japaneseName: 'Aka Sanpei (赤三兵)',
    category: 'triple',
    categoryLabel: 'Triple Candlestick',
    signal: 'bullish',
    reliability: 'Very High',
    trendContext: 'Reversal from Downtrend or Breakout',
    shortDescription: 'Three consecutive long green candles, each opening within the previous body and closing at or near new highs.',
    psychology: 'Relentless institutional buying pressure across three consecutive periods. Each wave of supply is completely absorbed, signaling a massive regime shift from bears to bulls.',
    identificationRules: [
      'Three consecutive tall green candles with substantial bodies.',
      'Each candle opens within the real body of the previous candle.',
      'Each candle closes progressively higher near its period high (short upper wicks).',
      'Follows a downtrend or consolidation base.'
    ],
    tradingStrategy: {
      entry: 'Enter long on the close of the third candle or on a shallow retest of Candle 2 close.',
      stopLoss: 'Placed below the open of the first or second soldier candle.',
      target: 'Major resistance zone or 1:2.5 R:R.',
      riskRewardRatio: '1:2 to 1:2.5',
      volumeConfirmation: 'Steady or increasing volume across all three candles.',
      recommendedTimeframes: ['15m', '1H', '4H', 'Daily'],
      commonPitfall: 'Entering after the third soldier when RSI is already hyper-extended over 80 without waiting for a retest.',
      examplePrices: { entry: 125.00, stopLoss: 112.00, target1: 151.00, target2: 164.00 }
    },
    tags: ['strong-momentum', 'soldiers', 'bullish-continuation'],
    diagramId: 'three-white-soldiers'
  },
  {
    id: 'three-black-crows',
    name: 'Three Black Crows',
    japaneseName: 'Sanba Garasu (三羽烏)',
    category: 'triple',
    categoryLabel: 'Triple Candlestick',
    signal: 'bearish',
    reliability: 'Very High',
    trendContext: 'Top of an Uptrend or Breakdown',
    shortDescription: 'Three consecutive long red candles, each opening within the previous body and closing near new session lows.',
    psychology: 'Severe, cascading liquidation by institutions. Bulls attempt to bid at each open, but heavy selling quickly crushes each attempt into a deeper trough.',
    identificationRules: [
      'Three consecutive long red/black candles.',
      'Each candle opens inside the body of the preceding candle.',
      'Each candle closes at or near its absolute low with minimal lower wicks.',
      'Occurs at the top of an uptrend.'
    ],
    tradingStrategy: {
      entry: 'Sell short on the close of the third crow or upon a minor relief retest of Candle 2 low.',
      stopLoss: 'Placed above the open/high of Candle 2 or Candle 1.',
      target: 'Next horizontal support floor or 1:2.5 R:R.',
      riskRewardRatio: '1:2 to 1:2.5',
      volumeConfirmation: 'Heavy sell volume confirming panic and institutional dumping.',
      recommendedTimeframes: ['15m', '1H', '4H', 'Daily'],
      commonPitfall: 'Shorting at the bottom of the third candle when price is severely stretched below 20 EMA.',
      examplePrices: { entry: 95.00, stopLoss: 106.00, target1: 73.00, target2: 62.00 }
    },
    tags: ['strong-momentum', 'crows', 'bearish-continuation'],
    diagramId: 'three-black-crows'
  },
  {
    id: 'morning-doji-star',
    name: 'Morning Doji Star',
    japaneseName: 'Akebono Jūji',
    category: 'triple',
    categoryLabel: 'Triple Candlestick',
    signal: 'bullish',
    reliability: 'Very High',
    trendContext: 'Bottom of a prolonged Downtrend',
    shortDescription: 'Variation of the Morning Star where the middle candle is a Doji, signifying an even more dramatic halt to the downtrend.',
    psychology: 'The prior fierce selling runs into complete standstill (Doji). The subsequent green candle confirms that the bears have totally run out of fuel and buyers are taking charge.',
    identificationRules: [
      'Candle 1 is a long red candle.',
      'Candle 2 is a Doji (open = close) gapping below Candle 1.',
      'Candle 3 is a strong green candle closing high up into Candle 1 body.',
      'Higher reversal significance than a regular Morning Star.'
    ],
    tradingStrategy: {
      entry: 'Enter long on Candle 3 close or a break above its high.',
      stopLoss: 'Below the Doji lower shadow.',
      target: 'Key swing resistance or 1:3 R:R.',
      riskRewardRatio: '1:2.5 to 1:3.5',
      volumeConfirmation: 'Spike in volume on Candle 3 confirms strong accumulation.',
      recommendedTimeframes: ['1H', '4H', 'Daily'],
      commonPitfall: 'Not setting stop loss properly below the Doji wick.',
      examplePrices: { entry: 130.00, stopLoss: 119.00, target1: 152.00, target2: 163.00 }
    },
    tags: ['doji-star', 'morning-star', 'high-conviction'],
    diagramId: 'morning-doji-star'
  },
  {
    id: 'evening-doji-star',
    name: 'Evening Doji Star',
    japaneseName: 'Yo no Jūji',
    category: 'triple',
    categoryLabel: 'Triple Candlestick',
    signal: 'bearish',
    reliability: 'Very High',
    trendContext: 'Peak of an extended Uptrend',
    shortDescription: 'Variation of Evening Star where the middle candle is a Doji, signaling instant trend exhaustion at the peak.',
    psychology: 'After a soaring rally, the market stalls into a Doji at the highs. Day 3 confirms the exhaustion as price crashes down, trapping all high-level buyers.',
    identificationRules: [
      'Candle 1 is a strong green candle.',
      'Candle 2 is a Doji gapping above Candle 1.',
      'Candle 3 is a deep red candle penetrating well into Candle 1.',
      'Forms a quintessential top reversal.'
    ],
    tradingStrategy: {
      entry: 'Sell short on Candle 3 close or break below Candle 3 low.',
      stopLoss: 'Placed 1-2 ticks above the Doji high.',
      target: 'Key support shelf below or 1:3 R:R.',
      riskRewardRatio: '1:2.5 to 1:3.5',
      volumeConfirmation: 'Heavy volume on Candle 3 validates distribution.',
      recommendedTimeframes: ['1H', '4H', 'Daily'],
      commonPitfall: 'Overlooking a Doji that forms within Candle 1 body (needs to gap/protrude above).',
      examplePrices: { entry: 240.00, stopLoss: 255.00, target1: 210.00, target2: 195.00 }
    },
    tags: ['doji-star', 'evening-star', 'top-reversal'],
    diagramId: 'evening-doji-star'
  },

  // ==========================================
  // D. CLASSIC CHART PATTERNS - REVERSAL
  // ==========================================
  {
    id: 'head-and-shoulders',
    name: 'Head & Shoulders',
    category: 'chart_reversal',
    categoryLabel: 'Chart Pattern (Reversal)',
    signal: 'bearish',
    reliability: 'Very High',
    trendContext: 'Climax of an extended Uptrend',
    shortDescription: 'Three successive peaks: Left Shoulder, Head (highest peak), and Right Shoulder (lower peak) resting on a common Neckline.',
    psychology: 'The Left Shoulder and Head establish typical higher-highs in an uptrend. However, the Right Shoulder fails to make a higher high, revealing that buyers have exhausted their strength. When the Neckline cracks, all longs liquidate.',
    identificationRules: [
      'Left Shoulder: Moderate peak followed by a pullback.',
      'Head: Higher peak forming the top of the trend.',
      'Right Shoulder: Peak lower than the Head, indicating buying exhaustion.',
      'Neckline: Trendline connecting the two intervening swing troughs.',
      'Confirmation: Decisive candle close below the Neckline.'
    ],
    tradingStrategy: {
      entry: 'Aggressive: Sell immediately upon Neckline break. Conservative: Wait for a pullback/retest of the broken Neckline as new resistance.',
      stopLoss: 'Placed above the Right Shoulder peak (or 1-2 ticks above the retest high).',
      target: 'Target = Neckline price minus vertical height from Head to Neckline.',
      riskRewardRatio: '1:2.5 to 1:3.5',
      volumeConfirmation: 'Volume typically peaks at the Left Shoulder, diminishes on the Head, is weakest on the Right Shoulder, and explodes on the Neckline breakdown.',
      recommendedTimeframes: ['15m', '1H', '4H', 'Daily'],
      commonPitfall: 'Front-running the pattern before the Neckline is actually broken; right shoulders often morph into continuation flags.',
      examplePrices: { entry: 90.00, stopLoss: 98.00, target1: 74.00, target2: 66.00 }
    },
    tags: ['head-and-shoulders', 'classic-reversal', 'neckline', 'top'],
    diagramId: 'head-and-shoulders'
  },
  {
    id: 'inverse-head-and-shoulders',
    name: 'Inverse Head & Shoulders',
    category: 'chart_reversal',
    categoryLabel: 'Chart Pattern (Reversal)',
    signal: 'bullish',
    reliability: 'Very High',
    trendContext: 'Trough of an extended Downtrend',
    shortDescription: 'Three successive troughs: Left Shoulder, Head (lowest point), and Right Shoulder (higher low) against a common Neckline.',
    psychology: 'The Head marks the capitulation bottom. The Right Shoulder forms a higher low, proving sellers could not push price as deep. When the Neckline breaks, short sellers get squeezed and bulls drive the breakout.',
    identificationRules: [
      'Left Shoulder: Deep trough followed by a bounce.',
      'Head: Lower trough marking the absolute bottom.',
      'Right Shoulder: Higher trough indicating seller exhaustion.',
      'Neckline connects the two intervening swing peaks.',
      'Valid only after confirmed breakout above the Neckline.'
    ],
    tradingStrategy: {
      entry: 'Buy on Neckline breakout candle close or retest of the broken Neckline as new support.',
      stopLoss: 'Below the Right Shoulder low.',
      target: 'Target = Neckline price plus vertical height from Head to Neckline.',
      riskRewardRatio: '1:2.5 to 1:3.5',
      volumeConfirmation: 'Heavy surge in volume on the Neckline breakout candle.',
      recommendedTimeframes: ['15m', '1H', '4H', 'Daily'],
      commonPitfall: 'Buying at the bottom of the right shoulder without waiting for the Neckline breakout.',
      examplePrices: { entry: 110.00, stopLoss: 99.00, target1: 132.00, target2: 143.00 }
    },
    tags: ['inverse-head-shoulders', 'bottom-reversal', 'classic'],
    diagramId: 'inverse-head-and-shoulders'
  },
  {
    id: 'double-top',
    name: 'Double Top ("M" Pattern)',
    category: 'chart_reversal',
    categoryLabel: 'Chart Pattern (Reversal)',
    signal: 'bearish',
    reliability: 'High',
    trendContext: 'Peak of an Uptrend',
    shortDescription: 'Two prominent peaks at approximately the same price level separated by a trough, resembling the letter "M".',
    psychology: 'The market rallies to a high (Peak 1) and pulls back. Bulls launch a second attempt (Peak 2) but fail to overcome the previous high. When the intervening trough (neckline) breaks, bears take control.',
    identificationRules: [
      'Two peaks at roughly the same price level (within 1-3%).',
      'Intervening trough forms the Neckline.',
      'Peak 2 often shows lower volume or bearish RSI divergence.',
      'Pattern is confirmed only when price breaks and closes below the Neckline.'
    ],
    tradingStrategy: {
      entry: 'Sell short on a confirmed candle close below the Neckline, or on the retest of the broken Neckline.',
      stopLoss: 'Above the recent swing high or halfway between Neckline and Peak 2.',
      target: 'Measured move: Subtract the pattern height (Peak to Neckline) from the Neckline breakout point.',
      riskRewardRatio: '1:2 to 1:3',
      volumeConfirmation: 'Volume on Peak 2 is noticeably lower than Peak 1; breakout volume is high.',
      recommendedTimeframes: ['15m', '1H', '4H', 'Daily'],
      commonPitfall: 'Calling a double top too early while price is still oscillating at the highs.',
      examplePrices: { entry: 140.00, stopLoss: 152.00, target1: 116.00, target2: 104.00 }
    },
    tags: ['double-top', 'm-pattern', 'bearish-reversal'],
    diagramId: 'double-top'
  },
  {
    id: 'double-bottom',
    name: 'Double Bottom ("W" Pattern)',
    category: 'chart_reversal',
    categoryLabel: 'Chart Pattern (Reversal)',
    signal: 'bullish',
    reliability: 'High',
    trendContext: 'Bottom of a Downtrend',
    shortDescription: 'Two distinct swing troughs at nearly the same price level separated by a peak, forming a "W" shape.',
    psychology: 'Sellers make a low (Trough 1) and bounce. They test the floor a second time (Trough 2) but cannot break through, showing buyer liquidity absorption. Breaking above the intervening peak ignites short covering.',
    identificationRules: [
      'Two distinct bottoms at roughly identical price levels.',
      'Intervening peak creates the Neckline trigger.',
      'Second bottom often accompanies bullish divergence on MACD or RSI.',
      'Breakout above Neckline confirms the bottom.'
    ],
    tradingStrategy: {
      entry: 'Buy on breakout above the Neckline peak or upon retest of the Neckline as support.',
      stopLoss: 'Below the second trough low (or midway into the pattern for tighter risk).',
      target: 'Measured move: Add the pattern height to the Neckline price.',
      riskRewardRatio: '1:2 to 1:3',
      volumeConfirmation: 'Volume expands sharply when breaking above the Neckline.',
      recommendedTimeframes: ['15m', '1H', '4H', 'Daily'],
      commonPitfall: 'Buying before the Neckline breaks; price can easily consolidate into a descending triangle instead.',
      examplePrices: { entry: 75.00, stopLoss: 66.00, target1: 93.00, target2: 102.00 }
    },
    tags: ['double-bottom', 'w-pattern', 'bullish-reversal'],
    diagramId: 'double-bottom'
  },
  {
    id: 'triple-top',
    name: 'Triple Top',
    category: 'chart_reversal',
    categoryLabel: 'Chart Pattern (Reversal)',
    signal: 'bearish',
    reliability: 'High',
    trendContext: 'Peak of an Uptrend',
    shortDescription: 'Three distinct peaks reaching the same horizontal resistance barrier before failing and breaking support.',
    psychology: 'Bulls fought three consecutive times to clear a key resistance level. Each test was rebuffed by massive institutional supply. On the third failure, exhausted buyers throw in the towel.',
    identificationRules: [
      'Three peaks at nearly identical price levels.',
      'Two intervening troughs establish the support line.',
      'Sustained breakdown below the support line confirms the pattern.'
    ],
    tradingStrategy: {
      entry: 'Sell short on breakdown below the lowest trough support line.',
      stopLoss: 'Above the midpoint of the pattern or above Peak 3.',
      target: 'Measured height of the triple top projected downward from breakdown.',
      riskRewardRatio: '1:2 to 1:3',
      volumeConfirmation: 'Volume diminishes across peaks 1, 2, and 3, then surges on the breakdown.',
      recommendedTimeframes: ['1H', '4H', 'Daily'],
      commonPitfall: 'Prematurely shorting inside the range before the lower support shelf cracks.',
      examplePrices: { entry: 200.00, stopLoss: 215.00, target1: 170.00, target2: 155.00 }
    },
    tags: ['triple-top', 'strong-resistance', 'reversal'],
    diagramId: 'triple-top'
  },
  {
    id: 'triple-bottom',
    name: 'Triple Bottom',
    category: 'chart_reversal',
    categoryLabel: 'Chart Pattern (Reversal)',
    signal: 'bullish',
    reliability: 'High',
    trendContext: 'Bottom of a Downtrend',
    shortDescription: 'Three distinct troughs reaching the same horizontal support floor before breaking out above resistance.',
    psychology: 'Sellers tried three times to breach support and failed every time. Buyers gained immense confidence while short sellers got trapped and were forced to cover.',
    identificationRules: [
      'Three bottoms formed at roughly the same price level.',
      'Two intervening peaks establish the overhead resistance neckline.',
      'Confirmed on a strong candle breakout above the neckline.'
    ],
    tradingStrategy: {
      entry: 'Buy on breakout above the highest intervening peak or upon retest.',
      stopLoss: 'Below the lowest trough of the triple bottom.',
      target: 'Measured vertical height of pattern added to breakout point.',
      riskRewardRatio: '1:2 to 1:3',
      volumeConfirmation: 'Strong volume expansion on the final breakout.',
      recommendedTimeframes: ['1H', '4H', 'Daily'],
      commonPitfall: 'Failing to wait for a full candle close above the resistance neckline.',
      examplePrices: { entry: 50.00, stopLoss: 43.00, target1: 64.00, target2: 71.00 }
    },
    tags: ['triple-bottom', 'iron-support', 'bullish-reversal'],
    diagramId: 'triple-bottom'
  },

  // ==========================================
  // D. CLASSIC CHART PATTERNS - CONTINUATION
  // ==========================================
  {
    id: 'bull-flag',
    name: 'Bull Flag',
    category: 'chart_continuation',
    categoryLabel: 'Chart Pattern (Continuation)',
    signal: 'bullish',
    reliability: 'Very High',
    trendContext: 'Strong Uptrend (Following impulsive rally)',
    shortDescription: 'A sharp, near-vertical rally (the flagpole) followed by a compact, downward-sloping parallel consolidation channel (the flag).',
    psychology: 'After an explosive rally, early buyers take profits while institutions quietly accumulate shares in a controlled downward drift. When supply dries up, aggressive buyers step in for the next leg up.',
    identificationRules: [
      'Flagpole: Rapid, steep price advance on high volume.',
      'Flag: Compact downward-slanted consolidation with parallel trendlines.',
      'Retracement should not exceed 38.2% to 50% of the flagpole height.',
      'Volume dries up noticeably during flag formation.',
      'Confirmed when price breaks out above upper flag trendline.'
    ],
    tradingStrategy: {
      entry: 'Buy on breakout above the upper downward-sloping trendline or upon a 1-2 candle retest.',
      stopLoss: 'Placed just below the lowest point of the flag consolidation.',
      target: 'Flagpole Projection: Add the full length of the flagpole to the breakout price.',
      riskRewardRatio: '1:2.5 to 1:4',
      volumeConfirmation: 'Volume contracts during the flag and surges heavily on the breakout bar.',
      recommendedTimeframes: ['5m', '15m', '1H', '4H', 'Daily'],
      commonPitfall: 'Trading flags where the pullback retraces more than 60% of the pole (which invalidates the flag into a broad channel).',
      examplePrices: { entry: 120.00, stopLoss: 111.00, target1: 138.00, target2: 147.00 }
    },
    tags: ['flag', 'continuation', 'high-probability', 'momentum'],
    diagramId: 'bull-flag'
  },
  {
    id: 'bear-flag',
    name: 'Bear Flag',
    category: 'chart_continuation',
    categoryLabel: 'Chart Pattern (Continuation)',
    signal: 'bearish',
    reliability: 'Very High',
    trendContext: 'Strong Downtrend (Following sharp drop)',
    shortDescription: 'A steep drop (the flagpole) followed by a tight upward-sloping parallel channel before a resumption of the downtrend.',
    psychology: 'After a severe sell-off, shorts take profits causing a weak, low-volume relief rally. Buyers lack real conviction, and once lower trendline support snaps, another cascade of selling begins.',
    identificationRules: [
      'Flagpole: Sharp, rapid downward plunge on high volume.',
      'Flag: Mild upward-sloping consolidation between parallel lines.',
      'Retracement does not exceed 38.2% - 50% of the drop.',
      'Volume diminishes during the upward consolidation.',
      'Confirmed by a break below the lower flag trendline.'
    ],
    tradingStrategy: {
      entry: 'Sell short on a breakdown below the lower flag trendline.',
      stopLoss: 'Placed slightly above the highest point of the flag channel.',
      target: 'Subtract the height of the flagpole from the breakdown point.',
      riskRewardRatio: '1:2.5 to 1:4',
      volumeConfirmation: 'Low volume on the bounce, followed by heavy volume on the breakdown.',
      recommendedTimeframes: ['5m', '15m', '1H', '4H', 'Daily'],
      commonPitfall: 'Shorting too early inside the flag before the lower boundary breaks.',
      examplePrices: { entry: 85.00, stopLoss: 93.00, target1: 69.00, target2: 61.00 }
    },
    tags: ['flag', 'continuation', 'bearish-momentum'],
    diagramId: 'bear-flag'
  },
  {
    id: 'bullish-pennant',
    name: 'Bullish Pennant',
    category: 'chart_continuation',
    categoryLabel: 'Chart Pattern (Continuation)',
    signal: 'bullish',
    reliability: 'High',
    trendContext: 'Strong Uptrend',
    shortDescription: 'A steep flagpole followed by a small, converging symmetrical triangle consolidation before exploding upward.',
    psychology: 'Similar to a bull flag, but buyers and sellers reach a faster, triangular equilibrium with higher lows and lower highs. The tension compresses like a coiled spring before springing upward.',
    identificationRules: [
      'Prior steep flagpole rally.',
      'Pennant is a small converging triangle (not parallel like a flag).',
      'Typically resolves within 1 to 3 weeks (or 10-25 bars on intraday).',
      'Breakout occurs above the upper descending trendline.'
    ],
    tradingStrategy: {
      entry: 'Buy on breakout above the upper trendline.',
      stopLoss: 'Below the lowest point of the pennant triangle.',
      target: 'Flagpole height added to the breakout point.',
      riskRewardRatio: '1:3 to 1:4',
      volumeConfirmation: 'Volume declines steadily into the apex, then bursts higher on breakout.',
      recommendedTimeframes: ['15m', '1H', '4H', 'Daily'],
      commonPitfall: 'Confusing a large symmetrical triangle with a rapid, tight pennant.',
      examplePrices: { entry: 160.00, stopLoss: 151.00, target1: 178.00, target2: 187.00 }
    },
    tags: ['pennant', 'momentum', 'triangle-coil'],
    diagramId: 'bullish-pennant'
  },
  {
    id: 'bearish-pennant',
    name: 'Bearish Pennant',
    category: 'chart_continuation',
    categoryLabel: 'Chart Pattern (Continuation)',
    signal: 'bearish',
    reliability: 'High',
    trendContext: 'Strong Downtrend',
    shortDescription: 'A sharp plunge followed by a tight converging triangle consolidation before continuing the downward trend.',
    psychology: 'A brief pause in panic selling. Buyers and sellers coil tightly around a center point, but without genuine demand, the floor drops out.',
    identificationRules: [
      'Prior steep vertical sell-off.',
      'Tight converging symmetrical triangle consolidation.',
      'Declining volume during the coil.',
      'Breakout below lower ascending line triggers continuation.'
    ],
    tradingStrategy: {
      entry: 'Sell short on break below the lower trendline of the pennant.',
      stopLoss: 'Above the highest apex of the pennant.',
      target: 'Subtract flagpole height from breakdown level.',
      riskRewardRatio: '1:3',
      volumeConfirmation: 'Volume surges on breakdown bar.',
      recommendedTimeframes: ['15m', '1H', '4H', 'Daily'],
      commonPitfall: 'Prematurely shorting when the pennant has only formed 2 touches.',
      examplePrices: { entry: 100.00, stopLoss: 108.00, target1: 84.00, target2: 76.00 }
    },
    tags: ['bearish-pennant', 'breakdown', 'coil'],
    diagramId: 'bearish-pennant'
  },
  {
    id: 'cup-and-handle',
    name: 'Cup & Handle',
    category: 'chart_continuation',
    categoryLabel: 'Chart Pattern (Continuation)',
    signal: 'bullish',
    reliability: 'Very High',
    trendContext: 'Uptrend or Base building',
    shortDescription: 'A rounded "U" shaped bottom (the cup) followed by a short downward-drifting pullback (the handle) before a massive breakout.',
    psychology: 'The rounded cup reflects gradual accumulation: sellers slowly exhaust, price bottoms smoothly, and buyers regain control. The handle represents a final shakeout of weak hands before the breakout.',
    identificationRules: [
      'Cup is rounded ("U" shaped), never sharp "V" shape.',
      'Depth of the cup is typically 15% to 35% from the rim.',
      'Handle forms in the upper half of the cup, drifting downward slightly.',
      'Handle does not drop below the midpoint of the cup.',
      'Breakout above the cup rim resistance line completes the pattern.'
    ],
    tradingStrategy: {
      entry: 'Enter long on breakout above the rim resistance line, or buy the breakout from the handle trendline.',
      stopLoss: 'Placed just below the low of the handle.',
      target: 'Target = Rim price plus the depth of the cup (measured move).',
      riskRewardRatio: '1:2.5 to 1:4',
      volumeConfirmation: 'Volume dries up on the handle, then explodes on the rim breakout.',
      recommendedTimeframes: ['1H', '4H', 'Daily', 'Weekly'],
      commonPitfall: 'Trading a "V" shaped cup which lacks the accumulation period needed for steady momentum.',
      examplePrices: { entry: 150.00, stopLoss: 139.00, target1: 172.00, target2: 185.00 }
    },
    tags: ['cup-and-handle', 'william-oneil', 'super-bullish', 'classic'],
    diagramId: 'cup-and-handle'
  },
  {
    id: 'inverse-cup-and-handle',
    name: 'Inverse Cup & Handle',
    category: 'chart_continuation',
    categoryLabel: 'Chart Pattern (Continuation)',
    signal: 'bearish',
    reliability: 'High',
    trendContext: 'Downtrend or Top building',
    shortDescription: 'An inverted rounded dome (inverted cup) followed by a slight upward bounce (inverted handle) prior to a breakdown.',
    psychology: 'Gradual distribution across the rounded dome. Buyers fail to sustain any highs. The handle is a futile attempt to rally before buyers give up and price collapses.',
    identificationRules: [
      'Inverted rounded dome ("n" shaped).',
      'Handle forms as a shallow upward consolidation.',
      'Handle remains within the bottom half of the inverted cup.',
      'Breakout below support rim triggers the move.'
    ],
    tradingStrategy: {
      entry: 'Sell short on a breakdown below the rim support line.',
      stopLoss: 'Above the peak of the inverted handle.',
      target: 'Subtract inverted cup height from the support rim.',
      riskRewardRatio: '1:2.5 to 1:3.5',
      volumeConfirmation: 'Heavy volume on the breakdown below the rim.',
      recommendedTimeframes: ['1H', '4H', 'Daily'],
      commonPitfall: 'Shorting before the support line actually gives way.',
      examplePrices: { entry: 110.00, stopLoss: 121.00, target1: 88.00, target2: 77.00 }
    },
    tags: ['bearish-continuation', 'distribution', 'inverted-cup'],
    diagramId: 'inverse-cup-and-handle'
  },

  // ==========================================
  // D. CLASSIC CHART PATTERNS - TRIANGLES & WEDGES
  // ==========================================
  {
    id: 'ascending-triangle',
    name: 'Ascending Triangle',
    category: 'chart_triangles',
    categoryLabel: 'Triangle & Wedge Patterns',
    signal: 'bullish',
    reliability: 'High',
    trendContext: 'Uptrend continuation or Reversal base',
    shortDescription: 'A horizontal resistance line at the top with a rising trendline of higher lows at the bottom.',
    psychology: 'Bulls are becoming increasingly aggressive: each time price pulls back, buyers step in earlier at higher prices (higher lows). Sellers maintain a flat barrier, but will soon run out of supply.',
    identificationRules: [
      'Horizontal flat upper resistance line (at least 2 touches).',
      'Ascending lower support trendline forming higher lows (at least 2 touches).',
      'Volume diminishes as price coils into the apex.',
      'Confirmed by a decisive breakout above the flat resistance line.'
    ],
    tradingStrategy: {
      entry: 'Buy on confirmed candle close above the horizontal resistance line, or wait for retest.',
      stopLoss: 'Below the most recent swing higher-low inside the triangle.',
      target: 'Measured move: Add the widest vertical height of the triangle to the breakout point.',
      riskRewardRatio: '1:2 to 1:3',
      volumeConfirmation: 'Volume drops during consolidation and explodes on resistance breakout.',
      recommendedTimeframes: ['15m', '1H', '4H', 'Daily'],
      commonPitfall: 'Buying before the flat ceiling breaks; occasionally fakeouts sweep the ceiling before dumping.',
      examplePrices: { entry: 100.00, stopLoss: 93.00, target1: 114.00, target2: 121.00 }
    },
    tags: ['ascending-triangle', 'higher-lows', 'bullish-breakout'],
    diagramId: 'ascending-triangle'
  },
  {
    id: 'descending-triangle',
    name: 'Descending Triangle',
    category: 'chart_triangles',
    categoryLabel: 'Triangle & Wedge Patterns',
    signal: 'bearish',
    reliability: 'High',
    trendContext: 'Downtrend continuation or Top Reversal',
    shortDescription: 'A flat horizontal support floor at the bottom with a descending trendline of lower highs at the top.',
    psychology: 'Sellers are growing bolder: each rally is halted at lower prices (lower highs). Buyers are defending a fixed floor, but as demand gets chipped away, the floor finally caves in.',
    identificationRules: [
      'Flat horizontal support line (at least 2 distinct touches).',
      'Downward-sloping upper resistance line forming lower highs.',
      'Volume contracts as the price approaches the apex.',
      'Confirmed by a break below the horizontal support line.'
    ],
    tradingStrategy: {
      entry: 'Sell short on a candle close below the horizontal support line, or on a retest.',
      stopLoss: 'Above the most recent lower-high inside the triangle.',
      target: 'Measured move: Subtract the widest height of the triangle from the support line.',
      riskRewardRatio: '1:2 to 1:3',
      volumeConfirmation: 'Heavy volume on breakdown candle confirms institutional selling.',
      recommendedTimeframes: ['15m', '1H', '4H', 'Daily'],
      commonPitfall: 'Buying the support bounce on the 4th touch when the lower highs clearly signal waning demand.',
      examplePrices: { entry: 80.00, stopLoss: 87.00, target1: 66.00, target2: 59.00 }
    },
    tags: ['descending-triangle', 'lower-highs', 'bearish-breakdown'],
    diagramId: 'descending-triangle'
  },
  {
    id: 'symmetrical-triangle',
    name: 'Symmetrical Triangle',
    category: 'chart_triangles',
    categoryLabel: 'Triangle & Wedge Patterns',
    signal: 'neutral',
    reliability: 'Medium-High',
    trendContext: 'Continuation or Reversal (Trend agnostic)',
    shortDescription: 'Converging descending upper trendline and ascending lower trendline forming a symmetrical cone.',
    psychology: 'Buyers and sellers are in a fierce stalemate of equal aggression. Volatility compresses rapidly toward the apex until one side capitulates and a high-velocity breakout occurs.',
    identificationRules: [
      'Upper trendline slopes downward (lower highs).',
      'Lower trendline slopes upward (higher lows).',
      'Both trendlines converge at roughly equal angles.',
      'Typically breaks in the direction of the prevailing trend before the triangle.'
    ],
    tradingStrategy: {
      entry: 'Wait for a confirmed breakout close outside either trendline; trade in the direction of the break.',
      stopLoss: 'Placed on the opposite side of the breakout candle or the opposite trendline.',
      target: 'Measured height of the widest part of the triangle added/subtracted to breakout price.',
      riskRewardRatio: '1:2 to 1:3',
      volumeConfirmation: 'Volume declines steadily into the apex, then surges on the breakout bar.',
      recommendedTimeframes: ['15m', '1H', '4H', 'Daily'],
      commonPitfall: 'Guessing the breakout direction before it actually happens.',
      examplePrices: { entry: 110.00, stopLoss: 103.00, target1: 124.00, target2: 131.00 }
    },
    tags: ['symmetrical-triangle', 'volatility-compression', 'breakout'],
    diagramId: 'symmetrical-triangle'
  },
  {
    id: 'rising-wedge',
    name: 'Rising Wedge',
    category: 'chart_triangles',
    categoryLabel: 'Triangle & Wedge Patterns',
    signal: 'bearish',
    reliability: 'High',
    trendContext: 'Peak of an Uptrend (Reversal) or Downtrend pull-back',
    shortDescription: 'Both support and resistance trendlines slope upward, but the lower trendline is steeper, causing the lines to converge toward the top.',
    psychology: 'Even though price is making higher highs, each new high is achieved with weaker momentum and lower volume. The narrowing range shows buyer exhaustion. When lower support snaps, price falls rapidly.',
    identificationRules: [
      'Both trendlines slope upward.',
      'Lower support line is steeper than the upper resistance line.',
      'Trendlines converge toward a narrowing point at the top.',
      'Volume steadily drops throughout the wedge formation.',
      'Confirmed by a break below the lower ascending trendline.'
    ],
    tradingStrategy: {
      entry: 'Sell short on a breakdown below the lower support trendline.',
      stopLoss: 'Above the highest peak of the wedge.',
      target: 'Origin of the wedge (the lowest point where the wedge began) or 1:2.5 R:R.',
      riskRewardRatio: '1:2.5 to 1:3.5',
      volumeConfirmation: 'Volume decreases during the rise and spikes heavily on the breakdown.',
      recommendedTimeframes: ['15m', '1H', '4H', 'Daily'],
      commonPitfall: 'Shorting while price is still riding inside the wedge without waiting for the break.',
      examplePrices: { entry: 135.00, stopLoss: 144.00, target1: 117.00, target2: 108.00 }
    },
    tags: ['rising-wedge', 'exhaustion-rally', 'bearish-reversal'],
    diagramId: 'rising-wedge'
  },
  {
    id: 'falling-wedge',
    name: 'Falling Wedge',
    category: 'chart_triangles',
    categoryLabel: 'Triangle & Wedge Patterns',
    signal: 'bullish',
    reliability: 'High',
    trendContext: 'Bottom of a Downtrend (Reversal) or Uptrend pull-back',
    shortDescription: 'Both support and resistance lines slope downward, but the upper resistance line is steeper, converging into a narrow bottom.',
    psychology: 'Sellers are making lower lows, but the downward momentum is waning. Each sell wave is shorter than the last, and buyers are absorbing supply at higher relative velocity. A sharp upward breakout follows.',
    identificationRules: [
      'Both trendlines slope downward.',
      'Upper resistance line is steeper than the lower support line.',
      'Lines converge toward a point at the bottom.',
      'Volume declines as price nears the apex.',
      'Confirmed by an upside breakout above the descending resistance line.'
    ],
    tradingStrategy: {
      entry: 'Buy on breakout above the upper falling resistance line, or wait for retest.',
      stopLoss: 'Below the lowest trough of the wedge.',
      target: 'Origin of the wedge (the highest point where the wedge began) or 1:3 R:R.',
      riskRewardRatio: '1:2.5 to 1:3.5',
      volumeConfirmation: 'Volume surge on the upward breakout candle.',
      recommendedTimeframes: ['15m', '1H', '4H', 'Daily'],
      commonPitfall: 'Exiting too early; falling wedges frequently generate large multi-stage rallies.',
      examplePrices: { entry: 70.00, stopLoss: 62.00, target1: 86.00, target2: 94.00 }
    },
    tags: ['falling-wedge', 'exhaustion-drop', 'bullish-reversal'],
    diagramId: 'falling-wedge'
  }
];

export const CATEGORIES_LIST = [
  { id: 'all', label: 'All Patterns' },
  { id: 'single', label: 'Single Candlestick' },
  { id: 'double', label: 'Double Candlestick' },
  { id: 'triple', label: 'Triple Candlestick' },
  { id: 'chart_reversal', label: 'Classic Reversal' },
  { id: 'chart_continuation', label: 'Continuation' },
  { id: 'chart_triangles', label: 'Triangles & Wedges' }
];

export const SAMPLE_QUIZ_QUESTIONS = [
  {
    id: 'q1',
    patternId: 'hammer',
    question: 'A trader spots a candle at the bottom of a downtrend with a small body near the top and a lower shadow twice the body size. What pattern is this?',
    options: ['Shooting Star', 'Hammer', 'Hanging Man', 'Gravestone Doji'],
    correctIndex: 1,
    explanation: 'A Hammer forms at the bottom of a downtrend with a long lower shadow (at least 2x body) showing buyer rejection of lower prices.'
  },
  {
    id: 'q2',
    patternId: 'bullish-engulfing',
    question: 'Which rule is mandatory for a valid Bullish Engulfing pattern?',
    options: [
      'The green candle body must completely cover the preceding red candle body',
      'The wicks of the second candle must be shorter than 5%',
      'The pattern must occur after an extended uptrend',
      'The first candle must be a doji'
    ],
    correctIndex: 0,
    explanation: 'In a Bullish Engulfing pattern, the second candle (green) body must completely cover/engulf the body of the first candle (red).'
  },
  {
    id: 'q3',
    patternId: 'head-and-shoulders',
    question: 'In a classic Head & Shoulders pattern, where is the standard measured target calculated from?',
    options: [
      'The distance from Head to Right Shoulder',
      'The vertical distance from Head peak to the Neckline projected downward from the breakout',
      'Twice the height of the Left Shoulder',
      'The 50% Fibonacci level of the Right Shoulder'
    ],
    correctIndex: 1,
    explanation: 'The classic price target for Head & Shoulders is the vertical height from the Head to the Neckline, subtracted from the Neckline breakout point.'
  },
  {
    id: 'q4',
    patternId: 'shooting-star',
    question: 'How do you distinguish a Shooting Star from an Inverted Hammer?',
    options: [
      'Shooting Star appears at the top of an uptrend; Inverted Hammer appears at the bottom of a downtrend',
      'Shooting Star has no upper shadow',
      'Inverted Hammer is always a red candle',
      'Shooting Star is only found on 1-minute charts'
    ],
    correctIndex: 0,
    explanation: 'Both share identical candle anatomy (small body at bottom, long upper shadow), but Shooting Star appears at tops (bearish) whereas Inverted Hammer appears at bottoms (bullish).'
  },
  {
    id: 'q5',
    patternId: 'bull-flag',
    question: 'What is a key volume characteristic during the consolidation phase of a Bull Flag?',
    options: [
      'Volume should hit record all-time highs',
      'Volume should dry up / contract noticeably',
      'Volume should be completely erratic',
      'Volume is irrelevant for flag patterns'
    ],
    correctIndex: 1,
    explanation: 'During the flag consolidation, volume should diminish noticeably as supply dries up, before exploding upon breakout.'
  },
  {
    id: 'q6',
    patternId: 'cup-and-handle',
    question: 'What shape should the Cup ideally form in a high-probability Cup and Handle pattern?',
    options: [
      'A sharp "V" bottom with extreme volatility',
      'A smooth, rounded "U" shaped accumulation base',
      'A double bottom with equal troughs',
      'A downward sloping descending triangle'
    ],
    correctIndex: 1,
    explanation: 'A high-probability Cup and Handle requires a rounded "U" shape showing gradual accumulation and steady sentiment transition, rather than a sharp "V".'
  }
];
