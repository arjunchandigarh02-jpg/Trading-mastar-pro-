import React from 'react';
import { Pattern } from '../types/pattern';

interface PatternDiagramProps {
  pattern: Pattern;
  showAnnotations?: boolean;
  showTradeLevels?: boolean;
  className?: string;
  zoomScale?: number;
}

export const PatternDiagram: React.FC<PatternDiagramProps> = ({
  pattern,
  showAnnotations = true,
  showTradeLevels = true,
  className = '',
  zoomScale = 1
}) => {
  const isBullish = pattern.signal === 'bullish';
  const isBearish = pattern.signal === 'bearish';

  // Diagram container styling with TradingView dark chart aesthetic
  return (
    <div className={`relative w-full aspect-[16/10] bg-[#14171F] rounded-xl overflow-hidden border border-[#2A2E39] select-none flex items-center justify-center ${className}`}>
      {/* Background Grid Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`grid-${pattern.id}`} width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#4A5268" strokeWidth="0.7" strokeDasharray="2,2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${pattern.id})`} />
      </svg>

      {/* Main SVG Graphic */}
      <svg
        viewBox="0 0 400 250"
        className="w-full h-full relative z-10 transition-transform duration-200"
        style={{ transform: `scale(${zoomScale})` }}
      >
        {renderDiagramContent(pattern, showAnnotations, showTradeLevels, isBullish, isBearish)}
      </svg>

      {/* Watermark badge */}
      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-[#1E222D]/80 backdrop-blur-xs border border-[#2A2E39] text-[9px] font-mono text-[#9B9FA9] pointer-events-none">
        TRADING MASTER • {pattern.categoryLabel.toUpperCase()}
      </div>
    </div>
  );
};

function renderDiagramContent(
  pattern: Pattern,
  showAnnotations: boolean,
  showTradeLevels: boolean,
  isBullish: boolean,
  isBearish: boolean
) {
  const green = '#089981';
  const red = '#F23645';
  const textMuted = '#9B9FA9';
  const textLight = '#FFFFFF';

  // Render by pattern ID for precision
  switch (pattern.id) {
    // ----------------------------------------------------
    // SINGLE CANDLESTICK PATTERNS
    // ----------------------------------------------------
    case 'hammer':
    case 'dragonfly-doji':
      return (
        <g>
          {/* Prior downtrend candles */}
          <Candle x={60} open={60} close={100} high={50} low={105} isGreen={false} />
          <Candle x={110} open={95} close={140} high={90} low={145} isGreen={false} />
          <Candle x={160} open={135} close={170} high={130} low={175} isGreen={false} />

          {/* Hammer / Dragonfly candle */}
          {pattern.id === 'hammer' ? (
            <Candle x={215} open={175} close={165} high={162} low={225} isGreen={true} highlight />
          ) : (
            /* Dragonfly Doji */
            <g>
              <line x1={215} y1={165} x2={215} y2={228} stroke={green} strokeWidth="3" />
              <line x1={200} y1={165} x2={230} y2={165} stroke={green} strokeWidth="4" strokeLinecap="round" />
            </g>
          )}

          {/* Reversal Confirmation candle */}
          <Candle x={270} open={168} close={130} high={125} low={172} isGreen={true} />
          <Candle x={325} open={132} close={90} high={85} low={136} isGreen={true} />

          {/* Support Zone */}
          <rect x="180" y="222" width="130" height="8" fill={green} fillOpacity="0.15" rx="3" />
          <line x1="170" y1="225" x2="315" y2="225" stroke={green} strokeWidth="1" strokeDasharray="3,3" />
          <text x="185" y="240" fill={green} fontSize="10" fontWeight="600" fontFamily="sans-serif">SUPPORT ZONE</text>

          {showAnnotations && (
            <g>
              <text x={215} y={150} fill={textLight} fontSize="11" fontWeight="bold" textAnchor="middle">
                {pattern.name}
              </text>
              <text x={215} y={210} fill={textMuted} fontSize="9" textAnchor="middle">
                Long rejection wick (2x body)
              </text>
            </g>
          )}

          {showTradeLevels && (
            <g>
              {/* Entry level */}
              <line x1="200" y1="160" x2="380" y2="160" stroke={green} strokeWidth="1.5" strokeDasharray="4,4" />
              <rect x="310" y="150" width="80" height="18" fill="#1E222D" stroke={green} strokeWidth="1" rx="4" />
              <text x="350" y="163" fill={green} fontSize="9" fontWeight="bold" textAnchor="middle">ENTRY TRIGGER</text>

              {/* Stop loss */}
              <line x1="190" y1="230" x2="380" y2="230" stroke={red} strokeWidth="1.5" strokeDasharray="4,4" />
              <rect x="315" y="220" width="75" height="18" fill="#1E222D" stroke={red} strokeWidth="1" rx="4" />
              <text x="352" y="233" fill={red} fontSize="9" fontWeight="bold" textAnchor="middle">STOP LOSS</text>

              {/* Target */}
              <line x1="260" y1="80" x2="380" y2="80" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4,4" />
              <rect x="310" y="70" width="80" height="18" fill="#1E222D" stroke="#38BDF8" strokeWidth="1" rx="4" />
              <text x="350" y="83" fill="#38BDF8" fontSize="9" fontWeight="bold" textAnchor="middle">TARGET (1:2.5)</text>
            </g>
          )}
        </g>
      );

    case 'shooting-star':
    case 'gravestone-doji':
      return (
        <g>
          {/* Prior uptrend candles */}
          <Candle x={60} open={190} close={150} high={145} low={195} isGreen={true} />
          <Candle x={110} open={155} close={115} high={110} low={160} isGreen={true} />
          <Candle x={160} open={120} close={85} high={80} low={125} isGreen={true} />

          {/* Shooting Star / Gravestone */}
          {pattern.id === 'shooting-star' ? (
            <Candle x={215} open={80} close={90} high={25} low={93} isGreen={false} highlight />
          ) : (
            <g>
              <line x1={215} y1={90} x2={215} y2={25} stroke={red} strokeWidth="3" />
              <line x1={200} y1={90} x2={230} y2={90} stroke={red} strokeWidth="4" strokeLinecap="round" />
            </g>
          )}

          {/* Downward reversal candles */}
          <Candle x={270} open={88} close={130} high={85} low={135} isGreen={false} />
          <Candle x={325} open={128} close={175} high={125} low={180} isGreen={false} />

          {/* Resistance ceiling */}
          <line x1="170" y1="24" x2="330" y2="24" stroke={red} strokeWidth="1" strokeDasharray="3,3" />
          <text x="185" y="18" fill={red} fontSize="10" fontWeight="600">KEY RESISTANCE</text>

          {showAnnotations && (
            <g>
              <text x={215} y={115} fill={textLight} fontSize="11" fontWeight="bold" textAnchor="middle">
                {pattern.name}
              </text>
              <text x={215} y={45} fill={textMuted} fontSize="9" textAnchor="middle">
                Severe upper wick rejection
              </text>
            </g>
          )}

          {showTradeLevels && (
            <g>
              {/* Stop loss */}
              <line x1="200" y1="20" x2="385" y2="20" stroke={red} strokeWidth="1.5" strokeDasharray="4,4" />
              <rect x="315" y="10" width="75" height="18" fill="#1E222D" stroke={red} strokeWidth="1" rx="4" />
              <text x="352" y="23" fill={red} fontSize="9" fontWeight="bold" textAnchor="middle">STOP LOSS</text>

              {/* Entry level */}
              <line x1="200" y1="95" x2="385" y2="95" stroke={red} strokeWidth="1.5" strokeDasharray="4,4" />
              <rect x="310" y="85" width="80" height="18" fill="#1E222D" stroke={red} strokeWidth="1" rx="4" />
              <text x="350" y="98" fill={red} fontSize="9" fontWeight="bold" textAnchor="middle">ENTRY SHORT</text>

              {/* Target */}
              <line x1="260" y1="185" x2="385" y2="185" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4,4" />
              <rect x="310" y="175" width="80" height="18" fill="#1E222D" stroke="#38BDF8" strokeWidth="1" rx="4" />
              <text x="350" y="188" fill="#38BDF8" fontSize="9" fontWeight="bold" textAnchor="middle">TARGET (1:2.5)</text>
            </g>
          )}
        </g>
      );

    case 'inverted-hammer':
      return (
        <g>
          <Candle x={60} open={60} close={105} high={55} low={110} isGreen={false} />
          <Candle x={110} open={100} close={145} high={95} low={150} isGreen={false} />
          <Candle x={160} open={140} close={175} high={135} low={180} isGreen={false} />
          {/* Inverted hammer */}
          <Candle x={215} open={180} close={170} high={115} low={182} isGreen={true} highlight />
          {/* Bullish confirmation */}
          <Candle x={270} open={168} close={125} high={120} low={172} isGreen={true} />
          <Candle x={325} open={128} close={80} high={75} low={130} isGreen={true} />

          {showTradeLevels && (
            <g>
              <line x1="200" y1="165" x2="380" y2="165" stroke={green} strokeWidth="1.5" strokeDasharray="4,4" />
              <rect x="310" y="155" width="80" height="18" fill="#1E222D" stroke={green} strokeWidth="1" rx="4" />
              <text x="350" y="168" fill={green} fontSize="9" fontWeight="bold" textAnchor="middle">ENTRY TRIGGER</text>

              <line x1="200" y1="188" x2="380" y2="188" stroke={red} strokeWidth="1.5" strokeDasharray="4,4" />
              <rect x="315" y="178" width="75" height="18" fill="#1E222D" stroke={red} strokeWidth="1" rx="4" />
              <text x="352" y="191" fill={red} fontSize="9" fontWeight="bold" textAnchor="middle">STOP LOSS</text>
            </g>
          )}
        </g>
      );

    case 'hanging-man':
      return (
        <g>
          <Candle x={60} open={190} close={150} high={145} low={195} isGreen={true} />
          <Candle x={110} open={155} close={110} high={105} low={160} isGreen={true} />
          <Candle x={160} open={115} close={75} high={70} low={120} isGreen={true} />
          {/* Hanging man */}
          <Candle x={215} open={73} close={82} high={70} low={140} isGreen={false} highlight />
          {/* Bearish confirmation */}
          <Candle x={270} open={85} close={135} high={82} low={140} isGreen={false} />
          <Candle x={325} open={133} close={185} high={130} low={190} isGreen={false} />

          {showTradeLevels && (
            <g>
              <line x1="200" y1="88" x2="380" y2="88" stroke={red} strokeWidth="1.5" strokeDasharray="4,4" />
              <rect x="310" y="78" width="80" height="18" fill="#1E222D" stroke={red} strokeWidth="1" rx="4" />
              <text x="350" y="91" fill={red} fontSize="9" fontWeight="bold" textAnchor="middle">CONFIRM BREAK</text>

              <line x1="200" y1="65" x2="380" y2="65" stroke={red} strokeWidth="1.5" strokeDasharray="4,4" />
              <rect x="315" y="55" width="75" height="18" fill="#1E222D" stroke={red} strokeWidth="1" rx="4" />
              <text x="352" y="68" fill={red} fontSize="9" fontWeight="bold" textAnchor="middle">STOP LOSS</text>
            </g>
          )}
        </g>
      );

    case 'standard-doji':
    case 'long-legged-doji':
    case 'spinning-top':
      return (
        <g>
          <Candle x={70} open={80} close={130} high={75} low={135} isGreen={false} />
          <Candle x={130} open={128} close={170} high={124} low={175} isGreen={false} />

          {/* Center Indecision Candle */}
          {pattern.id === 'standard-doji' ? (
            <g>
              <line x1={200} y1={140} x2={200} y2={200} stroke="#38BDF8" strokeWidth="2.5" />
              <line x1={185} y1={170} x2={215} y2={170} stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
            </g>
          ) : pattern.id === 'long-legged-doji' ? (
            <g>
              <line x1={200} y1={100} x2={200} y2={230} stroke="#38BDF8" strokeWidth="2.5" />
              <line x1={182} y1={165} x2={218} y2={165} stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
            </g>
          ) : (
            /* Spinning top */
            <Candle x={200} open={175} close={165} high={130} low={210} isGreen={true} highlight />
          )}

          <Candle x={270} open={168} close={120} high={115} low={172} isGreen={true} />
          <Candle x={330} open={122} close={75} high={70} low={126} isGreen={true} />

          {showAnnotations && (
            <text x={200} y={90} fill={textLight} fontSize="11" fontWeight="bold" textAnchor="middle">
              {pattern.name} • Market Equilibrium
            </text>
          )}
        </g>
      );

    case 'bullish-marubozu':
    case 'bearish-marubozu':
      return (
        <g>
          {pattern.id === 'bullish-marubozu' ? (
            <>
              <Candle x={70} open={180} close={155} high={150} low={185} isGreen={true} />
              <Candle x={130} open={157} close={140} high={135} low={162} isGreen={true} />
              {/* Marubozu: No wicks, huge solid body */}
              <rect x="180" y="50" width="40" height="135" fill={green} rx="2" />
              <rect x="180" y="50" width="40" height="135" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" rx="2" />
              <Candle x={265} open={52} close={35} high={30} low={55} isGreen={true} />
              <Candle x={325} open={38} close={20} high={15} low={40} isGreen={true} />
              <text x={200} y={40} fill={green} fontSize="11" fontWeight="bold" textAnchor="middle">ZERO SHADOWS (100% BUYERS)</text>
            </>
          ) : (
            <>
              <Candle x={70} open={60} close={85} high={55} low={90} isGreen={false} />
              <Candle x={130} open={83} close={100} high={80} low={105} isGreen={false} />
              {/* Bearish Marubozu */}
              <rect x="180" y="65" width="40" height="135" fill={red} rx="2" />
              <rect x="180" y="65" width="40" height="135" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" rx="2" />
              <Candle x={265} open={198} close={218} high={195} low={222} isGreen={false} />
              <Candle x={325} open={216} close={235} high={214} low={240} isGreen={false} />
              <text x={200} y={55} fill={red} fontSize="11" fontWeight="bold" textAnchor="middle">ZERO SHADOWS (100% SELLER DUMP)</text>
            </>
          )}
        </g>
      );

    // ----------------------------------------------------
    // DOUBLE CANDLESTICK PATTERNS
    // ----------------------------------------------------
    case 'bullish-engulfing':
      return (
        <g>
          {/* Downtrend */}
          <Candle x={60} open={70} close={110} high={65} low={115} isGreen={false} />
          <Candle x={110} open={105} close={145} high={100} low={150} isGreen={false} />

          {/* Candle 1 (Small Red) */}
          <Candle x={165} open={140} close={170} high={135} low={175} isGreen={false} />

          {/* Candle 2 (Large Engulfing Green) */}
          <Candle x={215} open={178} close={120} high={115} low={182} isGreen={true} width={28} highlight />

          {/* Engulfing bracket annotation */}
          <path d="M 195 120 L 190 120 L 190 178 L 195 178" fill="none" stroke={green} strokeWidth="1.5" />
          <text x={235} y={105} fill={green} fontSize="10" fontWeight="bold">ENGULFS CANDLE 1</text>

          {/* Continuation */}
          <Candle x={275} open={122} close={85} high={80} low={125} isGreen={true} />
          <Candle x={325} open={88} close={50} high={45} low={92} isGreen={true} />

          {showTradeLevels && (
            <g>
              <line x1="200" y1="115" x2="385" y2="115" stroke={green} strokeWidth="1.5" strokeDasharray="4,4" />
              <rect x="310" y="105" width="80" height="18" fill="#1E222D" stroke={green} strokeWidth="1" rx="4" />
              <text x="350" y="118" fill={green} fontSize="9" fontWeight="bold" textAnchor="middle">ENTRY BUY</text>

              <line x1="200" y1="185" x2="385" y2="185" stroke={red} strokeWidth="1.5" strokeDasharray="4,4" />
              <rect x="315" y="175" width="75" height="18" fill="#1E222D" stroke={red} strokeWidth="1" rx="4" />
              <text x="352" y="188" fill={red} fontSize="9" fontWeight="bold" textAnchor="middle">STOP LOSS</text>
            </g>
          )}
        </g>
      );

    case 'bearish-engulfing':
      return (
        <g>
          <Candle x={60} open={180} close={140} high={135} low={185} isGreen={true} />
          <Candle x={110} open={145} close={110} high={105} low={150} isGreen={true} />

          {/* Candle 1 (Small Green) */}
          <Candle x={165} open={115} close={90} high={85} low={120} isGreen={true} />

          {/* Candle 2 (Large Engulfing Red) */}
          <Candle x={215} open={85} close={145} high={80} low={150} isGreen={false} width={28} highlight />

          <Candle x={275} open={142} close={180} high={140} low={185} isGreen={false} />
          <Candle x={325} open={178} close={215} high={175} low={220} isGreen={false} />

          {showTradeLevels && (
            <g>
              <line x1="200" y1="78" x2="385" y2="78" stroke={red} strokeWidth="1.5" strokeDasharray="4,4" />
              <rect x="315" y="68" width="75" height="18" fill="#1E222D" stroke={red} strokeWidth="1" rx="4" />
              <text x="352" y="81" fill={red} fontSize="9" fontWeight="bold" textAnchor="middle">STOP LOSS</text>

              <line x1="200" y1="152" x2="385" y2="152" stroke={red} strokeWidth="1.5" strokeDasharray="4,4" />
              <rect x="310" y="142" width="80" height="18" fill="#1E222D" stroke={red} strokeWidth="1" rx="4" />
              <text x="350" y="155" fill={red} fontSize="9" fontWeight="bold" textAnchor="middle">ENTRY SHORT</text>
            </g>
          )}
        </g>
      );

    case 'piercing-line':
    case 'dark-cloud-cover':
      return (
        <g>
          {pattern.id === 'piercing-line' ? (
            <>
              <Candle x={90} open={90} close={165} high={85} low={170} isGreen={false} width={24} />
              <Candle x={150} open={185} close={120} high={115} low={190} isGreen={true} width={24} highlight />
              {/* 50% Midpoint Line */}
              <line x1="70" y1="127.5" x2="220" y2="127.5" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x="230" y="131" fill="#FBBF24" fontSize="9" fontWeight="bold">50% MIDPOINT PENETRATION</text>
              <Candle x={210} open={122} close={80} high={75} low={125} isGreen={true} />
            </>
          ) : (
            <>
              <Candle x={90} open={165} close={90} high={85} low={170} isGreen={true} width={24} />
              <Candle x={150} open={75} close={135} high={70} low={140} isGreen={false} width={24} highlight />
              {/* 50% Midpoint Line */}
              <line x1="70" y1="127.5" x2="220" y2="127.5" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x="230" y="131" fill="#FBBF24" fontSize="9" fontWeight="bold">50% MIDPOINT PENETRATION</text>
              <Candle x={210} open={133} close={185} high={130} low={190} isGreen={false} />
            </>
          )}
        </g>
      );

    case 'tweezer-bottom':
    case 'tweezer-top':
      return (
        <g>
          {pattern.id === 'tweezer-bottom' ? (
            <>
              <Candle x={90} open={100} close={155} high={95} low={195} isGreen={false} />
              {/* Identical lows */}
              <Candle x={160} open={155} close={180} high={150} low={195} isGreen={false} />
              <Candle x={200} open={182} close={145} high={140} low={195} isGreen={true} highlight />
              {/* Dual bottom line */}
              <line x1="130" y1="195" x2="260" y2="195" stroke={green} strokeWidth="2.5" />
              <text x="180" y="215" fill={green} fontSize="10" fontWeight="bold" textAnchor="middle">IDENTICAL LOWS (TWEEZER)</text>
              <Candle x={270} open={147} close={95} high={90} low={150} isGreen={true} />
            </>
          ) : (
            <>
              <Candle x={90} open={160} close={105} high={75} low={165} isGreen={true} />
              {/* Identical highs */}
              <Candle x={160} open={110} close={85} high={65} low={115} isGreen={true} />
              <Candle x={200} open={88} close={120} high={65} low={125} isGreen={false} highlight />
              {/* Dual top line */}
              <line x1="130" y1="65" x2="260" y2="65" stroke={red} strokeWidth="2.5" />
              <text x="180" y="55" fill={red} fontSize="10" fontWeight="bold" textAnchor="middle">IDENTICAL HIGHS (TWEEZER)</text>
              <Candle x={270} open={118} close={170} high={115} low={175} isGreen={false} />
            </>
          )}
        </g>
      );

    case 'bullish-harami':
    case 'bearish-harami':
      return (
        <g>
          {pattern.id === 'bullish-harami' ? (
            <>
              <Candle x={80} open={80} close={120} high={75} low={125} isGreen={false} />
              {/* Mother Candle */}
              <Candle x={140} open={115} close={185} high={110} low={190} isGreen={false} width={26} />
              {/* Inside Baby Candle */}
              <Candle x={185} open={165} close={140} high={135} low={170} isGreen={true} width={16} highlight />
              <rect x="130" y="110" width="80" height="85" fill="none" stroke="#60A5FA" strokeWidth="1" strokeDasharray="3,3" rx="4" />
              <text x="220" y="155" fill="#60A5FA" fontSize="9" fontWeight="bold">INSIDE BAR</text>
              <Candle x={250} open={142} close={95} high={90} low={145} isGreen={true} />
            </>
          ) : (
            <>
              <Candle x={80} open={180} close={135} high={130} low={185} isGreen={true} />
              {/* Mother Candle */}
              <Candle x={140} open={140} close={70} high={65} low={145} isGreen={true} width={26} />
              {/* Inside Baby Candle */}
              <Candle x={185} open={85} close={110} high={80} low={115} isGreen={false} width={16} highlight />
              <rect x="130" y="65" width="80" height="85" fill="none" stroke="#60A5FA" strokeWidth="1" strokeDasharray="3,3" rx="4" />
              <text x="220" y="100" fill="#60A5FA" fontSize="9" fontWeight="bold">INSIDE BAR</text>
              <Candle x={250} open={112} close={165} high={110} low={170} isGreen={false} />
            </>
          )}
        </g>
      );

    // ----------------------------------------------------
    // TRIPLE CANDLESTICK PATTERNS
    // ----------------------------------------------------
    case 'morning-star':
    case 'morning-doji-star':
      return (
        <g>
          <Candle x={50} open={60} close={100} high={55} low={105} isGreen={false} />
          {/* Candle 1: Tall red */}
          <Candle x={110} open={95} close={165} high={90} low={170} isGreen={false} width={24} />

          {/* Candle 2: Star at bottom */}
          {pattern.id === 'morning-star' ? (
            <Candle x={175} open={185} close={180} high={175} low={205} isGreen={true} width={16} highlight />
          ) : (
            <g>
              <line x1={175} y1={180} x2={175} y2={210} stroke="#38BDF8" strokeWidth="2.5" />
              <line x1={162} y1={195} x2={188} y2={195} stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
            </g>
          )}

          {/* Candle 3: Tall green piercing up */}
          <Candle x={240} open={170} close={110} high={105} low={175} isGreen={true} width={24} highlight />

          {/* Subsequent follow-through */}
          <Candle x={305} open={112} close={65} high={60} low={115} isGreen={true} />

          <line x1="80" y1="130" x2="270" y2="130" stroke="#FBBF24" strokeWidth="1" strokeDasharray="3,3" />
          <text x="175" y="225" fill={green} fontSize="10" fontWeight="bold" textAnchor="middle">
            MORNING STAR DAWN
          </text>

          {showTradeLevels && (
            <g>
              <line x1="220" y1="105" x2="385" y2="105" stroke={green} strokeWidth="1.5" strokeDasharray="4,4" />
              <rect x="310" y="95" width="80" height="18" fill="#1E222D" stroke={green} strokeWidth="1" rx="4" />
              <text x="350" y="108" fill={green} fontSize="9" fontWeight="bold" textAnchor="middle">ENTRY BUY</text>

              <line x1="160" y1="210" x2="385" y2="210" stroke={red} strokeWidth="1.5" strokeDasharray="4,4" />
              <rect x="315" y="200" width="75" height="18" fill="#1E222D" stroke={red} strokeWidth="1" rx="4" />
              <text x="352" y="213" fill={red} fontSize="9" fontWeight="bold" textAnchor="middle">STOP LOSS</text>
            </g>
          )}
        </g>
      );

    case 'evening-star':
    case 'evening-doji-star':
      return (
        <g>
          <Candle x={50} open={190} close={150} high={145} low={195} isGreen={true} />
          {/* Candle 1: Tall green */}
          <Candle x={110} open={155} close={85} high={80} low={160} isGreen={true} width={24} />

          {/* Candle 2: Star at peak */}
          {pattern.id === 'evening-star' ? (
            <Candle x={175} open={68} close={73} high={45} low={78} isGreen={false} width={16} highlight />
          ) : (
            <g>
              <line x1={175} y1={45} x2={175} y2={75} stroke="#38BDF8" strokeWidth="2.5" />
              <line x1={162} y1={60} x2={188} y2={60} stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
            </g>
          )}

          {/* Candle 3: Tall red plunging */}
          <Candle x={240} open={80} close={140} high={75} low={145} isGreen={false} width={24} highlight />

          <Candle x={305} open={138} close={185} high={135} low={190} isGreen={false} />

          {showTradeLevels && (
            <g>
              <line x1="160" y1="40" x2="385" y2="40" stroke={red} strokeWidth="1.5" strokeDasharray="4,4" />
              <rect x="315" y="30" width="75" height="18" fill="#1E222D" stroke={red} strokeWidth="1" rx="4" />
              <text x="352" y="43" fill={red} fontSize="9" fontWeight="bold" textAnchor="middle">STOP LOSS</text>

              <line x1="220" y1="145" x2="385" y2="145" stroke={red} strokeWidth="1.5" strokeDasharray="4,4" />
              <rect x="310" y="135" width="80" height="18" fill="#1E222D" stroke={red} strokeWidth="1" rx="4" />
              <text x="350" y="148" fill={red} fontSize="9" fontWeight="bold" textAnchor="middle">ENTRY SHORT</text>
            </g>
          )}
        </g>
      );

    case 'three-white-soldiers':
      return (
        <g>
          <Candle x={60} open={180} close={195} high={175} low={200} isGreen={false} />
          {/* Soldier 1 */}
          <Candle x={120} open={190} close={140} high={135} low={195} isGreen={true} width={22} highlight />
          {/* Soldier 2 */}
          <Candle x={180} open={148} close={95} high={90} low={152} isGreen={true} width={22} highlight />
          {/* Soldier 3 */}
          <Candle x={240} open={102} close={50} high={45} low={106} isGreen={true} width={22} highlight />
          {/* Follow through */}
          <Candle x={305} open={52} close={25} high={20} low={55} isGreen={true} />

          <text x={180} y={235} fill={green} fontSize="11" fontWeight="bold" textAnchor="middle">
            THREE WHITE SOLDIERS (STEEP MOMENTUM)
          </text>
        </g>
      );

    case 'three-black-crows':
      return (
        <g>
          <Candle x={60} open={70} close={55} high={50} low={75} isGreen={true} />
          {/* Crow 1 */}
          <Candle x={120} open={60} close={110} high={55} low={115} isGreen={false} width={22} highlight />
          {/* Crow 2 */}
          <Candle x={180} open={102} close={155} high={98} low={160} isGreen={false} width={22} highlight />
          {/* Crow 3 */}
          <Candle x={240} open={148} close={205} high={145} low={210} isGreen={false} width={22} highlight />
          {/* Follow through */}
          <Candle x={305} open={200} close={230} high={195} low={235} isGreen={false} />

          <text x={180} y={30} fill={red} fontSize="11" fontWeight="bold" textAnchor="middle">
            THREE BLACK CROWS (CASCADE SELLING)
          </text>
        </g>
      );

    // ----------------------------------------------------
    // CLASSIC CHART PATTERNS - REVERSAL
    // ----------------------------------------------------
    case 'head-and-shoulders':
      return (
        <g>
          {/* Chart line geometry */}
          <path
            d="M 20 180 Q 50 150 70 90 T 110 160 Q 150 130 180 40 T 250 160 Q 280 130 300 100 T 340 185 L 380 230"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Neckline */}
          <line x1="80" y1="160" x2="360" y2="160" stroke="#FBBF24" strokeWidth="2.5" strokeDasharray="5,4" />
          <text x="90" y="152" fill="#FBBF24" fontSize="10" fontWeight="bold">NECKLINE SUPPORT</text>

          {/* Left Shoulder */}
          <circle cx="70" cy="90" r="5" fill="#3B82F6" />
          <text x="70" y="75" fill={textLight} fontSize="9" fontWeight="bold" textAnchor="middle">LEFT SHOULDER</text>

          {/* Head */}
          <circle cx="180" cy="40" r="6" fill="#EF4444" />
          <text x="180" y="25" fill="#EF4444" fontSize="11" fontWeight="bold" textAnchor="middle">HEAD (PEAK)</text>

          {/* Right Shoulder */}
          <circle cx="300" cy="100" r="5" fill="#3B82F6" />
          <text x="300" y="85" fill={textLight} fontSize="9" fontWeight="bold" textAnchor="middle">RIGHT SHOULDER</text>

          {/* Breakdown point arrow */}
          <path d="M 340 165 L 360 205 L 350 205 L 355 225" fill="none" stroke={red} strokeWidth="2.5" />
          <polygon points="360,205 350,195 370,195" fill={red} transform="rotate(180 360 200)" />

          {showTradeLevels && (
            <g>
              {/* Entry */}
              <line x1="280" y1="162" x2="385" y2="162" stroke={red} strokeWidth="1.5" strokeDasharray="3,3" />
              <rect x="300" y="152" width="90" height="18" fill="#1E222D" stroke={red} strokeWidth="1" rx="4" />
              <text x="345" y="165" fill={red} fontSize="9" fontWeight="bold" textAnchor="middle">BREAKOUT ENTRY</text>

              {/* Stop loss */}
              <line x1="260" y1="95" x2="385" y2="95" stroke={red} strokeWidth="1.5" strokeDasharray="3,3" />
              <rect x="315" y="85" width="75" height="18" fill="#1E222D" stroke={red} strokeWidth="1" rx="4" />
              <text x="352" y="98" fill={red} fontSize="9" fontWeight="bold" textAnchor="middle">STOP LOSS</text>

              {/* Measured Height Target */}
              <line x1="180" y1="40" x2="180" y2="160" stroke="#FBBF24" strokeWidth="1" strokeDasharray="2,2" />
              <text x="185" y="105" fill="#FBBF24" fontSize="8">HEIGHT (H)</text>
              <line x1="340" y1="160" x2="340" y2="245" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x="330" y="240" fill="#38BDF8" fontSize="9" fontWeight="bold" textAnchor="end">TARGET (-H)</text>
            </g>
          )}
        </g>
      );

    case 'inverse-head-and-shoulders':
      return (
        <g>
          <path
            d="M 20 70 Q 50 100 70 160 T 110 90 Q 150 120 180 210 T 250 90 Q 280 120 300 150 T 340 65 L 380 20"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Neckline */}
          <line x1="80" y1="90" x2="360" y2="90" stroke="#FBBF24" strokeWidth="2.5" strokeDasharray="5,4" />
          <text x="90" y="80" fill="#FBBF24" fontSize="10" fontWeight="bold">NECKLINE RESISTANCE</text>

          {/* Shoulders and head */}
          <circle cx="70" cy="160" r="5" fill="#3B82F6" />
          <text x="70" y="180" fill={textLight} fontSize="9" fontWeight="bold" textAnchor="middle">LEFT SHOULDER</text>

          <circle cx="180" cy="210" r="6" fill={green} />
          <text x="180" y="235" fill={green} fontSize="11" fontWeight="bold" textAnchor="middle">HEAD (BOTTOM)</text>

          <circle cx="300" cy="150" r="5" fill="#3B82F6" />
          <text x="300" y="175" fill={textLight} fontSize="9" fontWeight="bold" textAnchor="middle">RIGHT SHOULDER</text>

          {showTradeLevels && (
            <g>
              <line x1="280" y1="88" x2="385" y2="88" stroke={green} strokeWidth="1.5" strokeDasharray="3,3" />
              <rect x="300" y="78" width="90" height="18" fill="#1E222D" stroke={green} strokeWidth="1" rx="4" />
              <text x="345" y="91" fill={green} fontSize="9" fontWeight="bold" textAnchor="middle">BREAKOUT ENTRY</text>

              <line x1="260" y1="155" x2="385" y2="155" stroke={red} strokeWidth="1.5" strokeDasharray="3,3" />
              <rect x="315" y="145" width="75" height="18" fill="#1E222D" stroke={red} strokeWidth="1" rx="4" />
              <text x="352" y="158" fill={red} fontSize="9" fontWeight="bold" textAnchor="middle">STOP LOSS</text>
            </g>
          )}
        </g>
      );

    case 'double-top':
    case 'triple-top':
      return (
        <g>
          {pattern.id === 'double-top' ? (
            <>
              {/* "M" Pattern */}
              <path
                d="M 30 200 L 90 70 L 160 160 L 230 70 L 300 160 L 360 220"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Resistance line touching both tops */}
              <line x1="70" y1="70" x2="260" y2="70" stroke={red} strokeWidth="2.5" />
              <circle cx="90" cy="70" r="6" fill={red} />
              <circle cx="230" cy="70" r="6" fill={red} />
              <text x="90" y="55" fill={red} fontSize="10" fontWeight="bold" textAnchor="middle">PEAK 1</text>
              <text x="230" y="55" fill={red} fontSize="10" fontWeight="bold" textAnchor="middle">PEAK 2</text>

              {/* Neckline */}
              <line x1="120" y1="160" x2="370" y2="160" stroke="#FBBF24" strokeWidth="2" strokeDasharray="4,4" />
              <text x="140" y="152" fill="#FBBF24" fontSize="10" fontWeight="bold">NECKLINE BREAKDOWN</text>
            </>
          ) : (
            <>
              {/* Triple Top */}
              <path
                d="M 20 200 L 70 70 L 120 160 L 170 70 L 220 160 L 270 70 L 320 160 L 370 220"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line x1="50" y1="70" x2="300" y2="70" stroke={red} strokeWidth="2.5" />
              <circle cx="70" cy="70" r="5" fill={red} />
              <circle cx="170" cy="70" r="5" fill={red} />
              <circle cx="270" cy="70" r="5" fill={red} />
              <text x="170" y="50" fill={red} fontSize="11" fontWeight="bold" textAnchor="middle">3x REJECTION CEILING</text>
              <line x1="100" y1="160" x2="380" y2="160" stroke="#FBBF24" strokeWidth="2" strokeDasharray="4,4" />
            </>
          )}

          {showTradeLevels && (
            <g>
              <rect x="290" y="168" width="90" height="18" fill="#1E222D" stroke={red} strokeWidth="1" rx="4" />
              <text x="335" y="181" fill={red} fontSize="9" fontWeight="bold" textAnchor="middle">SELL SHORT</text>
            </g>
          )}
        </g>
      );

    case 'double-bottom':
    case 'triple-bottom':
      return (
        <g>
          {pattern.id === 'double-bottom' ? (
            <>
              {/* "W" Pattern */}
              <path
                d="M 30 50 L 90 180 L 160 90 L 230 180 L 300 90 L 360 30"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Support floor touching both bottoms */}
              <line x1="70" y1="180" x2="260" y2="180" stroke={green} strokeWidth="2.5" />
              <circle cx="90" cy="180" r="6" fill={green} />
              <circle cx="230" cy="180" r="6" fill={green} />
              <text x="90" y="200" fill={green} fontSize="10" fontWeight="bold" textAnchor="middle">BOTTOM 1</text>
              <text x="230" y="200" fill={green} fontSize="10" fontWeight="bold" textAnchor="middle">BOTTOM 2</text>

              {/* Neckline */}
              <line x1="120" y1="90" x2="370" y2="90" stroke="#FBBF24" strokeWidth="2" strokeDasharray="4,4" />
              <text x="140" y="80" fill="#FBBF24" fontSize="10" fontWeight="bold">NECKLINE BREAKOUT</text>
            </>
          ) : (
            <>
              <path
                d="M 20 50 L 70 180 L 120 90 L 170 180 L 220 90 L 270 180 L 320 90 L 370 30"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line x1="50" y1="180" x2="300" y2="180" stroke={green} strokeWidth="2.5" />
              <circle cx="70" cy="180" r="5" fill={green} />
              <circle cx="170" cy="180" r="5" fill={green} />
              <circle cx="270" cy="180" r="5" fill={green} />
              <text x="170" y="205" fill={green} fontSize="11" fontWeight="bold" textAnchor="middle">TRIPLE SUPPORT BASE</text>
              <line x1="100" y1="90" x2="380" y2="90" stroke="#FBBF24" strokeWidth="2" strokeDasharray="4,4" />
            </>
          )}

          {showTradeLevels && (
            <g>
              <rect x="290" y="65" width="90" height="18" fill="#1E222D" stroke={green} strokeWidth="1" rx="4" />
              <text x="335" y="78" fill={green} fontSize="9" fontWeight="bold" textAnchor="middle">BUY BREAKOUT</text>
            </g>
          )}
        </g>
      );

    // ----------------------------------------------------
    // CLASSIC CONTINUATION PATTERNS
    // ----------------------------------------------------
    case 'bull-flag':
      return (
        <g>
          {/* Flagpole */}
          <line x1="50" y1="210" x2="160" y2="70" stroke={green} strokeWidth="5" strokeLinecap="round" />
          <text x="90" y="145" fill={green} fontSize="10" fontWeight="bold" transform="rotate(-52 90 145)">FLAGPOLE (MOMENTUM)</text>

          {/* Flag Channel */}
          <polygon points="160,70 260,110 240,155 140,115" fill={green} fillOpacity="0.08" />
          <line x1="140" y1="60" x2="270" y2="115" stroke="#60A5FA" strokeWidth="2.5" />
          <line x1="120" y1="105" x2="250" y2="160" stroke="#60A5FA" strokeWidth="2.5" />

          {/* Price oscillation inside flag */}
          <path d="M 160 70 L 180 135 L 210 90 L 230 150 L 255 105" fill="none" stroke="#FFFFFF" strokeWidth="2" />

          {/* Breakout Arrow */}
          <line x1="255" y1="105" x2="360" y2="25" stroke={green} strokeWidth="4" strokeLinecap="round" />
          <polygon points="360,25 345,28 355,42" fill={green} />

          {showTradeLevels && (
            <g>
              <line x1="240" y1="102" x2="380" y2="102" stroke={green} strokeWidth="1.5" strokeDasharray="3,3" />
              <rect x="290" y="92" width="90" height="18" fill="#1E222D" stroke={green} strokeWidth="1" rx="4" />
              <text x="335" y="105" fill={green} fontSize="9" fontWeight="bold" textAnchor="middle">BREAKOUT ENTRY</text>

              <line x1="220" y1="165" x2="380" y2="165" stroke={red} strokeWidth="1.5" strokeDasharray="3,3" />
              <rect x="305" y="155" width="75" height="18" fill="#1E222D" stroke={red} strokeWidth="1" rx="4" />
              <text x="342" y="168" fill={red} fontSize="9" fontWeight="bold" textAnchor="middle">STOP LOSS</text>
            </g>
          )}
        </g>
      );

    case 'bear-flag':
      return (
        <g>
          {/* Flagpole down */}
          <line x1="50" y1="40" x2="160" y2="180" stroke={red} strokeWidth="5" strokeLinecap="round" />
          <text x="90" y="105" fill={red} fontSize="10" fontWeight="bold" transform="rotate(52 90 105)">BEAR POLE</text>

          {/* Channel slanting up */}
          <polygon points="160,180 260,140 240,95 140,135" fill={red} fillOpacity="0.08" />
          <line x1="140" y1="190" x2="270" y2="135" stroke="#60A5FA" strokeWidth="2.5" />
          <line x1="120" y1="145" x2="250" y2="90" stroke="#60A5FA" strokeWidth="2.5" />

          {/* Wiggles inside */}
          <path d="M 160 180 L 180 115 L 210 160 L 230 100 L 255 145" fill="none" stroke="#FFFFFF" strokeWidth="2" />

          {/* Breakdown Arrow */}
          <line x1="255" y1="145" x2="360" y2="225" stroke={red} strokeWidth="4" strokeLinecap="round" />
          <polygon points="360,225 355,208 345,222" fill={red} />

          {showTradeLevels && (
            <g>
              <line x1="240" y1="150" x2="380" y2="150" stroke={red} strokeWidth="1.5" strokeDasharray="3,3" />
              <rect x="290" y="140" width="90" height="18" fill="#1E222D" stroke={red} strokeWidth="1" rx="4" />
              <text x="335" y="153" fill={red} fontSize="9" fontWeight="bold" textAnchor="middle">ENTRY SHORT</text>
            </g>
          )}
        </g>
      );

    case 'bullish-pennant':
    case 'bearish-pennant':
      return (
        <g>
          {pattern.id === 'bullish-pennant' ? (
            <>
              <line x1="50" y1="210" x2="160" y2="70" stroke={green} strokeWidth="5" strokeLinecap="round" />
              {/* Converging triangle lines */}
              <line x1="160" y1="70" x2="270" y2="120" stroke="#60A5FA" strokeWidth="2.5" />
              <line x1="160" y1="170" x2="270" y2="120" stroke="#60A5FA" strokeWidth="2.5" />
              <path d="M 160 70 L 180 160 L 210 85 L 230 145 L 260 115" fill="none" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="260" y1="115" x2="360" y2="40" stroke={green} strokeWidth="4" strokeLinecap="round" />
              <polygon points="360,40 345,43 355,57" fill={green} />
              <text x="215" y="60" fill={green} fontSize="10" fontWeight="bold">CONVERGING APEX</text>
            </>
          ) : (
            <>
              <line x1="50" y1="40" x2="160" y2="180" stroke={red} strokeWidth="5" strokeLinecap="round" />
              <line x1="160" y1="180" x2="270" y2="130" stroke="#60A5FA" strokeWidth="2.5" />
              <line x1="160" y1="80" x2="270" y2="130" stroke="#60A5FA" strokeWidth="2.5" />
              <path d="M 160 180 L 180 90 L 210 165 L 230 105 L 260 135" fill="none" stroke="#FFFFFF" strokeWidth="2" />
              <line x1="260" y1="135" x2="360" y2="210" stroke={red} strokeWidth="4" strokeLinecap="round" />
              <polygon points="360,210 355,193 345,207" fill={red} />
              <text x="215" y="195" fill={red} fontSize="10" fontWeight="bold">CONVERGING APEX</text>
            </>
          )}
        </g>
      );

    case 'cup-and-handle':
    case 'inverse-cup-and-handle':
      return (
        <g>
          {pattern.id === 'cup-and-handle' ? (
            <>
              {/* Cup Rim Resistance */}
              <line x1="40" y1="70" x2="330" y2="70" stroke="#FBBF24" strokeWidth="2.5" strokeDasharray="4,4" />
              <text x="60" y="60" fill="#FBBF24" fontSize="10" fontWeight="bold">CUP RIM RESISTANCE</text>

              {/* Smooth Rounded Cup */}
              <path
                d="M 60 70 C 80 200, 200 200, 220 70"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <text x="140" y="180" fill="#60A5FA" fontSize="11" fontWeight="bold" textAnchor="middle">ROUNDED "U" CUP</text>

              {/* Handle */}
              <path
                d="M 220 70 Q 240 105 260 95"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="3.5"
              />
              <text x="250" y="125" fill={textLight} fontSize="9" fontWeight="bold">HANDLE</text>

              {/* Breakout */}
              <line x1="260" y1="95" x2="340" y2="25" stroke={green} strokeWidth="4" strokeLinecap="round" />
              <polygon points="340,25 325,28 335,42" fill={green} />
            </>
          ) : (
            <>
              {/* Inverse Cup Rim */}
              <line x1="40" y1="180" x2="330" y2="180" stroke="#FBBF24" strokeWidth="2.5" strokeDasharray="4,4" />
              <text x="60" y="195" fill="#FBBF24" fontSize="10" fontWeight="bold">INVERSE RIM SUPPORT</text>

              {/* Inverted Dome */}
              <path
                d="M 60 180 C 80 50, 200 50, 220 180"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <text x="140" y="70" fill="#60A5FA" fontSize="11" fontWeight="bold" textAnchor="middle">INVERTED CUP</text>

              {/* Inverted Handle */}
              <path
                d="M 220 180 Q 240 145 260 155"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="3.5"
              />

              {/* Breakdown */}
              <line x1="260" y1="155" x2="340" y2="225" stroke={red} strokeWidth="4" strokeLinecap="round" />
              <polygon points="340,225 335,208 325,222" fill={red} />
            </>
          )}

          {showTradeLevels && (
            <g>
              <rect x="270" y="60" width="105" height="18" fill="#1E222D" stroke={pattern.id === 'cup-and-handle' ? green : red} strokeWidth="1" rx="4" />
              <text x="322" y="73" fill={pattern.id === 'cup-and-handle' ? green : red} fontSize="9" fontWeight="bold" textAnchor="middle">
                {pattern.id === 'cup-and-handle' ? 'BREAKOUT ENTRY' : 'BREAKDOWN SHORT'}
              </text>
            </g>
          )}
        </g>
      );

    // ----------------------------------------------------
    // TRIANGLES & WEDGES
    // ----------------------------------------------------
    case 'ascending-triangle':
      return (
        <g>
          {/* Flat Resistance Top */}
          <line x1="50" y1="70" x2="310" y2="70" stroke={red} strokeWidth="3" />
          <text x="60" y="60" fill={red} fontSize="10" fontWeight="bold">FLAT RESISTANCE CEILING</text>

          {/* Ascending Higher Lows Line */}
          <line x1="50" y1="210" x2="310" y2="70" stroke={green} strokeWidth="3" />
          <text x="100" y="195" fill={green} fontSize="9" fontWeight="bold">RISING HIGHER LOWS</text>

          {/* Price oscillation */}
          <path d="M 50 210 L 90 70 L 140 160 L 190 70 L 230 120 L 270 70" fill="none" stroke="#60A5FA" strokeWidth="2.5" />

          {/* Breakout */}
          <line x1="270" y1="70" x2="360" y2="20" stroke={green} strokeWidth="4" strokeLinecap="round" />
          <polygon points="360,20 345,23 355,37" fill={green} />

          {showTradeLevels && (
            <g>
              <line x1="260" y1="68" x2="385" y2="68" stroke={green} strokeWidth="1.5" strokeDasharray="3,3" />
              <rect x="290" y="58" width="90" height="18" fill="#1E222D" stroke={green} strokeWidth="1" rx="4" />
              <text x="335" y="71" fill={green} fontSize="9" fontWeight="bold" textAnchor="middle">BREAKOUT ENTRY</text>

              <line x1="220" y1="125" x2="385" y2="125" stroke={red} strokeWidth="1.5" strokeDasharray="3,3" />
              <rect x="315" y="115" width="75" height="18" fill="#1E222D" stroke={red} strokeWidth="1" rx="4" />
              <text x="352" y="128" fill={red} fontSize="9" fontWeight="bold" textAnchor="middle">STOP LOSS</text>
            </g>
          )}
        </g>
      );

    case 'descending-triangle':
      return (
        <g>
          {/* Flat Support Floor */}
          <line x1="50" y1="180" x2="310" y2="180" stroke={green} strokeWidth="3" />
          <text x="60" y="195" fill={green} fontSize="10" fontWeight="bold">FLAT SUPPORT FLOOR</text>

          {/* Descending Lower Highs */}
          <line x1="50" y1="40" x2="310" y2="180" stroke={red} strokeWidth="3" />
          <text x="100" y="60" fill={red} fontSize="9" fontWeight="bold">FALLING LOWER HIGHS</text>

          {/* Price oscillation */}
          <path d="M 50 40 L 90 180 L 140 90 L 190 180 L 230 130 L 270 180" fill="none" stroke="#60A5FA" strokeWidth="2.5" />

          {/* Breakdown */}
          <line x1="270" y1="180" x2="360" y2="230" stroke={red} strokeWidth="4" strokeLinecap="round" />
          <polygon points="360,230 355,213 345,227" fill={red} />

          {showTradeLevels && (
            <g>
              <line x1="260" y1="182" x2="385" y2="182" stroke={red} strokeWidth="1.5" strokeDasharray="3,3" />
              <rect x="290" y="172" width="90" height="18" fill="#1E222D" stroke={red} strokeWidth="1" rx="4" />
              <text x="335" y="185" fill={red} fontSize="9" fontWeight="bold" textAnchor="middle">BREAKDOWN ENTRY</text>
            </g>
          )}
        </g>
      );

    case 'symmetrical-triangle':
      return (
        <g>
          <line x1="50" y1="40" x2="310" y2="130" stroke="#FBBF24" strokeWidth="2.5" />
          <line x1="50" y1="220" x2="310" y2="130" stroke="#FBBF24" strokeWidth="2.5" />
          <path d="M 50 40 L 90 205 L 145 75 L 195 175 L 240 100 L 280 145" fill="none" stroke="#60A5FA" strokeWidth="2.5" />
          <text x="160" y="25" fill="#FBBF24" fontSize="10" fontWeight="bold" textAnchor="middle">SYMMETRICAL COIL (EQUAL ANGLES)</text>

          {/* Either way breakout */}
          <line x1="270" y1="110" x2="360" y2="50" stroke={green} strokeWidth="3.5" strokeDasharray="4,2" />
          <line x1="270" y1="150" x2="360" y2="210" stroke={red} strokeWidth="3.5" strokeDasharray="4,2" />
          <text x="365" y="45" fill={green} fontSize="9" fontWeight="bold">UP BREAK</text>
          <text x="365" y="215" fill={red} fontSize="9" fontWeight="bold">DOWN BREAK</text>
        </g>
      );

    case 'rising-wedge':
    case 'falling-wedge':
      return (
        <g>
          {pattern.id === 'rising-wedge' ? (
            <>
              {/* Converging upward lines: bottom line steeper */}
              <line x1="40" y1="160" x2="300" y2="40" stroke="#FBBF24" strokeWidth="2" />
              <line x1="40" y1="210" x2="300" y2="50" stroke="#FBBF24" strokeWidth="2.5" />
              <path d="M 40 210 L 80 145 L 130 185 L 180 115 L 230 145 L 275 80" fill="none" stroke="#60A5FA" strokeWidth="2.5" />
              <text x="160" y="235" fill={red} fontSize="10" fontWeight="bold" textAnchor="middle">RISING WEDGE (BEARISH EXHAUSTION)</text>

              {/* Breakdown */}
              <line x1="270" y1="90" x2="360" y2="180" stroke={red} strokeWidth="4" strokeLinecap="round" />
              <polygon points="360,180 355,163 345,177" fill={red} />
            </>
          ) : (
            <>
              {/* Converging downward lines: top line steeper */}
              <line x1="40" y1="90" x2="300" y2="210" stroke="#FBBF24" strokeWidth="2.5" />
              <line x1="40" y1="40" x2="300" y2="200" stroke="#FBBF24" strokeWidth="2" />
              <path d="M 40 40 L 80 105 L 130 65 L 180 135 L 230 105 L 275 170" fill="none" stroke="#60A5FA" strokeWidth="2.5" />
              <text x="160" y="25" fill={green} fontSize="10" fontWeight="bold" textAnchor="middle">FALLING WEDGE (BULLISH REVERSAL)</text>

              {/* Breakout */}
              <line x1="270" y1="160" x2="360" y2="70" stroke={green} strokeWidth="4" strokeLinecap="round" />
              <polygon points="360,70 345,73 355,87" fill={green} />
            </>
          )}

          {showTradeLevels && (
            <g>
              <rect x="280" y="20" width="105" height="18" fill="#1E222D" stroke={pattern.id === 'rising-wedge' ? red : green} strokeWidth="1" rx="4" />
              <text x="332" y="33" fill={pattern.id === 'rising-wedge' ? red : green} fontSize="9" fontWeight="bold" textAnchor="middle">
                {pattern.id === 'rising-wedge' ? 'SELL BREAKDOWN' : 'BUY BREAKOUT'}
              </text>
            </g>
          )}
        </g>
      );

    default:
      // Fallback clean geometric pattern
      return (
        <g>
          <Candle x={80} open={140} close={100} high={90} low={145} isGreen={isBullish} />
          <Candle x={150} open={110} close={160} high={105} low={165} isGreen={isBearish} />
          <Candle x={220} open={150} close={80} high={75} low={155} isGreen={isBullish} highlight />
          <Candle x={290} open={90} close={50} high={45} low={95} isGreen={isBullish} />
          <text x={200} y={35} fill={textLight} fontSize="12" fontWeight="bold" textAnchor="middle">
            {pattern.name}
          </text>
        </g>
      );
  }
}

// Helper component for crisp rendering of an individual candlestick
interface CandleProps {
  x: number;
  open: number;
  close: number;
  high: number;
  low: number;
  isGreen: boolean;
  width?: number;
  highlight?: boolean;
}

const Candle: React.FC<CandleProps> = ({
  x,
  open,
  close,
  high,
  low,
  isGreen,
  width = 18,
  highlight = false
}) => {
  const green = '#089981';
  const red = '#F23645';
  const color = isGreen ? green : red;
  const top = Math.min(open, close);
  const height = Math.max(Math.abs(close - open), 3);

  return (
    <g>
      {/* High-Low Shadow Wick */}
      <line
        x1={x}
        y1={high}
        x2={x}
        y2={low}
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Real Body */}
      <rect
        x={x - width / 2}
        y={top}
        width={width}
        height={height}
        fill={color}
        rx="2"
        stroke={highlight ? '#FFFFFF' : 'none'}
        strokeWidth={highlight ? 1.5 : 0}
      />

      {/* Highlight glow if critical pattern candle */}
      {highlight && (
        <rect
          x={x - width / 2 - 3}
          y={top - 3}
          width={width + 6}
          height={height + 6}
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="2,2"
          rx="4"
          opacity="0.6"
        />
      )}
    </g>
  );
};
