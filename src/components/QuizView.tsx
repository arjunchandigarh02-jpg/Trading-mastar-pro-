import React, { useState } from 'react';
import { SAMPLE_QUIZ_QUESTIONS, PATTERNS_DATA } from '../data/patternsData';
import { PatternDiagram } from './PatternDiagram';
import { CheckCircle2, XCircle, Trophy, RotateCcw, ArrowRight, Award, Zap } from 'lucide-react';
import { Pattern } from '../types/pattern';

export const QuizView: React.FC<{ onSelectPattern: (p: Pattern) => void }> = ({ onSelectPattern }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const question = SAMPLE_QUIZ_QUESTIONS[currentIdx];
  const associatedPattern = PATTERNS_DATA.find((p) => p.id === question.patternId);

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === question.correctIndex) {
      setScore((s) => s + 1);
      setStreak((st) => st + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < SAMPLE_QUIZ_QUESTIONS.length) {
      setCurrentIdx((c) => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setIsComplete(false);
  };

  if (isComplete) {
    const percentage = Math.round((score / SAMPLE_QUIZ_QUESTIONS.length) * 100);
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 animate-fadeIn">
        <div className="w-16 h-16 rounded-3xl bg-[#089981]/20 text-[#089981] flex items-center justify-center border border-[#089981]/30">
          <Trophy className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-black text-white">Quiz Completed!</h2>
          <p className="text-xs text-[#9B9FA9] mt-1">
            You scored {score} out of {SAMPLE_QUIZ_QUESTIONS.length} ({percentage}%)
          </p>
        </div>

        <div className="bg-[#1E222D] p-4 rounded-2xl border border-[#2A2E39] w-full max-w-xs space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#9B9FA9]">Trader Rank:</span>
            <span className="font-bold text-[#60A5FA]">
              {percentage >= 80 ? 'Master Technician' : percentage >= 50 ? 'Intermediate Trader' : 'Apprentice'}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#9B9FA9]">Pattern Accuracy:</span>
            <span className="font-mono font-bold text-white">{percentage}%</span>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="py-3 px-6 rounded-xl bg-[#2962FF] hover:bg-[#1E4BD8] text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retake Quiz</span>
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 max-w-lg mx-auto animate-fadeIn">
      {/* Quiz Progress & Stats */}
      <div className="flex items-center justify-between bg-[#1E222D] p-3 rounded-2xl border border-[#2A2E39]">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#60A5FA]" />
          <span className="text-xs font-bold text-white">
            Question {currentIdx + 1} of {SAMPLE_QUIZ_QUESTIONS.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {streak > 1 && (
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#F7A600] bg-[#F7A600]/10 px-2 py-0.5 rounded-md border border-[#F7A600]/20">
              <Zap className="w-3 h-3 fill-[#F7A600]" />
              <span>{streak} Streak</span>
            </div>
          )}
          <span className="text-xs font-mono font-bold text-[#089981]">
            Score: {score}
          </span>
        </div>
      </div>

      {/* Visual Chart if pattern exists */}
      {associatedPattern && (
        <div className="rounded-2xl overflow-hidden border border-[#2A2E39]">
          <PatternDiagram
            pattern={associatedPattern}
            showAnnotations={false}
            showTradeLevels={false}
            className="aspect-[16/9]"
          />
        </div>
      )}

      {/* Question Text */}
      <div className="bg-[#1E222D] p-4 rounded-2xl border border-[#2A2E39]">
        <h3 className="text-sm font-bold text-white leading-relaxed">
          {question.question}
        </h3>
      </div>

      {/* Multiple Choice Options */}
      <div className="space-y-2">
        {question.options.map((option, idx) => {
          let btnStyle = 'bg-[#1E222D] border-[#2A2E39] text-white hover:bg-[#262B37]';
          if (isAnswered) {
            if (idx === question.correctIndex) {
              btnStyle = 'bg-[#089981]/20 border-[#089981] text-[#089981] font-bold';
            } else if (idx === selectedOption) {
              btnStyle = 'bg-[#F23645]/20 border-[#F23645] text-[#F23645]';
            } else {
              btnStyle = 'bg-[#1E222D]/40 border-[#2A2E39]/40 text-[#9B9FA9] opacity-60';
            }
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleSelectOption(idx)}
              className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
            >
              <span>{option}</span>
              {isAnswered && idx === question.correctIndex && (
                <CheckCircle2 className="w-4 h-4 text-[#089981] shrink-0" />
              )}
              {isAnswered && idx === selectedOption && idx !== question.correctIndex && (
                <XCircle className="w-4 h-4 text-[#F23645] shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Box */}
      {isAnswered && (
        <div className="p-3.5 rounded-xl bg-[#14171F] border border-[#2A2E39] space-y-2 animate-slideUp">
          <p className="text-xs text-[#9B9FA9] leading-relaxed">
            <strong className="text-white">Explanation: </strong>
            {question.explanation}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-[#2A2E39]">
            {associatedPattern && (
              <button
                onClick={() => onSelectPattern(associatedPattern)}
                className="text-[11px] text-[#60A5FA] font-medium hover:underline"
              >
                Study {associatedPattern.name} Guide →
              </button>
            )}

            <button
              onClick={handleNext}
              className="ml-auto py-2 px-4 rounded-xl bg-[#2962FF] hover:bg-[#1E4BD8] text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <span>{currentIdx + 1 === SAMPLE_QUIZ_QUESTIONS.length ? 'Finish' : 'Next Question'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
