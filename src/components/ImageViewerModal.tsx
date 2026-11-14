import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Eye, EyeOff, Layers } from 'lucide-react';
import { Pattern } from '../types/pattern';
import { PatternDiagram } from './PatternDiagram';

interface ImageViewerModalProps {
  pattern: Pattern;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  pattern,
  isOpen,
  onClose
}) => {
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true);
  const [showTradeLevels, setShowTradeLevels] = useState<boolean>(true);

  // Dragging state
  const isDragging = useRef<boolean>(false);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastTap = useRef<number>(0);
  const initialTouchDist = useRef<number | null>(null);

  // Reset when pattern or modal changes
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen, pattern.id]);

  // Keyboard escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Double tap to zoom
  const handleDoubleTap = useCallback(() => {
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2);
    }
  }, [scale]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch to zoom initiation
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      initialTouchDist.current = dist;
    } else if (e.touches.length === 1) {
      // Double tap check
      const now = Date.now();
      if (now - lastTap.current < 300) {
        handleDoubleTap();
      }
      lastTap.current = now;

      if (scale > 1) {
        isDragging.current = true;
        dragStart.current = {
          x: e.touches[0].clientX - position.x,
          y: e.touches[0].clientY - position.y
        };
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialTouchDist.current !== null) {
      // Pinch to zoom
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = currentDist / initialTouchDist.current;
      setScale((prev) => Math.min(3.5, Math.max(0.8, prev * factor)));
      initialTouchDist.current = currentDist;
    } else if (e.touches.length === 1 && isDragging.current && scale > 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.current.x,
        y: e.touches[0].clientY - dragStart.current.y
      });
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    initialTouchDist.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      isDragging.current = true;
      dragStart.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#101216]/95 backdrop-blur-md flex flex-col justify-between select-none animate-fadeIn">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A2E39] bg-[#14171F]">
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-xs font-mono text-[#9B9FA9] uppercase tracking-wider">
              High-Res Chart Inspection
            </span>
            <span className="text-sm font-bold text-white">
              {pattern.name}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-[#1E222D] hover:bg-[#2A2E39] text-white transition-colors"
          aria-label="Close image viewer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Viewport Container */}
      <div
        className="flex-1 overflow-hidden relative flex items-center justify-center p-4 cursor-grab active:cursor-grabbing touch-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onDoubleClick={handleDoubleTap}
      >
        <div
          className="transition-transform duration-75 ease-out max-w-4xl w-full"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`
          }}
        >
          <PatternDiagram
            pattern={pattern}
            showAnnotations={showAnnotations}
            showTradeLevels={showTradeLevels}
            className="w-full shadow-2xl border-[#363C4E]"
          />
        </div>

        {/* Tip Badge */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#1E222D]/90 border border-[#2A2E39] text-[11px] text-[#9B9FA9] pointer-events-none">
          Double-tap or pinch to zoom · Drag to pan
        </div>
      </div>

      {/* Bottom Floating Control Bar */}
      <div className="p-4 border-t border-[#2A2E39] bg-[#14171F] flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Layer Toggles */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowTradeLevels(!showTradeLevels)}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
              showTradeLevels
                ? 'bg-[#2962FF]/20 text-[#60A5FA] border-[#2962FF]/40'
                : 'bg-[#1E222D] text-[#9B9FA9] border-[#2A2E39]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{showTradeLevels ? 'Hide Levels' : 'Show Levels'}</span>
          </button>

          <button
            onClick={() => setShowAnnotations(!showAnnotations)}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
              showAnnotations
                ? 'bg-[#089981]/20 text-[#089981] border-[#089981]/40'
                : 'bg-[#1E222D] text-[#9B9FA9] border-[#2A2E39]'
            }`}
          >
            {showAnnotations ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>Labels</span>
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setScale((s) => Math.max(0.8, s - 0.25))}
            className="p-2 rounded-xl bg-[#1E222D] hover:bg-[#2A2E39] text-white border border-[#2A2E39]"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <span className="font-mono text-xs text-white min-w-[45px] text-center">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={() => setScale((s) => Math.min(3.5, s + 0.25))}
            className="p-2 rounded-xl bg-[#1E222D] hover:bg-[#2A2E39] text-white border border-[#2A2E39]"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={handleResetZoom}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[#1E222D] hover:bg-[#2A2E39] text-xs font-medium text-white border border-[#2A2E39]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
