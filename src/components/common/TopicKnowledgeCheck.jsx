import React, { useState } from 'react';
import { CheckCircle2, HelpCircle, XCircle } from 'lucide-react';
import { KNOWLEDGE_CHECKS } from '../../data/knowledgeCheckData';
import { useAuth } from '../../context/AuthContext';

export default function TopicKnowledgeCheck({ topicId, title }) {
  const questions = KNOWLEDGE_CHECKS[topicId] || [];
  const { markTopicComplete } = useAuth();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const currentQuestion = questions[questionIndex];
  const answered = selectedAnswer !== null;

  const handleAnswer = (optionIndex) => {
    if (answered) return;
    setSelectedAnswer(optionIndex);
    if (optionIndex === currentQuestion.correct) setScore((currentScore) => currentScore + 1);
  };

  const handleNext = () => {
    if (questionIndex === questions.length - 1) {
      setFinished(true);
      markTopicComplete(Number(topicId === 'what-is-ai' ? 1 : topicId === 'how-ai-works' ? 2 : topicId === 'prompt-engineering' ? 3 : topicId === 'ai-tools' ? 4 : 5));
      return;
    }
    setQuestionIndex((currentIndex) => currentIndex + 1);
    setSelectedAnswer(null);
  };

  if (!currentQuestion) return null;

  return <section className="p-6 md:p-8 rounded-3xl glass-panel border border-cyan-500/30 space-y-5">
    <h2 className="text-lg font-bold text-white flex items-center gap-2"><HelpCircle className="w-5 h-5 text-cyan-400" />{title || 'Knowledge Check'}</h2>
    {!finished ? <>
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
        <span>Question {questionIndex + 1} of {questions.length}</span>
        <span className="text-cyan-300">Difficulty: {currentQuestion.difficulty}</span>
      </div>
      <div className="h-1.5 rounded-full bg-dark-800 overflow-hidden"><div className="h-full bg-cyan-400 transition-all" style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div>
      <div className="rounded-xl bg-dark-900/90 border border-cyan-500/20 p-4 space-y-3">
        <p className="text-sm font-bold text-slate-100">{currentQuestion.question}</p>
        <div className="grid gap-2 sm:grid-cols-2">{currentQuestion.options.map((option, optionIndex) => {
          const isCorrect = optionIndex === currentQuestion.correct;
          const isSelected = selectedAnswer === optionIndex;
          const stateClass = answered && isCorrect ? 'border-emerald-400 text-emerald-300 bg-emerald-950/30' : answered && isSelected ? 'border-rose-400 text-rose-300 bg-rose-950/30' : isSelected ? 'border-cyan-400 text-cyan-300' : 'border-dark-700 text-slate-300';
          return <button key={option} disabled={answered} onClick={() => handleAnswer(optionIndex)} className={`rounded-lg border p-3 text-left text-xs transition-colors ${stateClass}`}>{String.fromCharCode(65 + optionIndex)}. {option}</button>;
        })}</div>
        {answered && <div className={`flex items-start gap-2 text-xs ${selectedAnswer === currentQuestion.correct ? 'text-emerald-300' : 'text-rose-300'}`}>
          {selectedAnswer === currentQuestion.correct ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
          <p><strong>{selectedAnswer === currentQuestion.correct ? 'Correct Answer' : 'Incorrect Answer'}</strong> {selectedAnswer !== currentQuestion.correct && <>Correct answer: <strong>{currentQuestion.options[currentQuestion.correct]}</strong>. </>}{currentQuestion.explanation}</p>
        </div>}
      </div>
      {answered && <button onClick={handleNext} className="w-full rounded-xl bg-cyan-500 py-3 text-sm font-bold text-dark-950">{questionIndex === questions.length - 1 ? 'Show Final Score' : 'Next Question'}</button>}
    </> : <div className="rounded-xl bg-dark-900/90 border border-emerald-500/30 p-6 text-center space-y-3"><CheckCircle2 className="mx-auto w-10 h-10 text-emerald-400" /><h3 className="text-xl font-bold text-white">Knowledge Check Complete</h3><p className="text-base text-emerald-300">Your Score: {score}/{questions.length}</p><p className="text-xs text-slate-400">You completed all {questions.length} questions.</p></div>}
  </section>;
}
