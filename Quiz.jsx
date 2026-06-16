import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function Quiz() {
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Mock questions
  const questions = [
    { question: "What is React?", options: ["Library", "Framework", "Database"], correct: 0 },
    { question: "What is JSX?", options: ["JavaScript XML", "JSON", "Style sheet"], correct: 0 }
  ];

  const handleAnswer = (index) => {
    if (index === questions[currentQuestion].correct) setScore(score + 1);
    
    const next = currentQuestion + 1;
    if (next < questions.length) setCurrentQuestion(next);
    else setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        
        {showResult ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm text-center">
            <h2 className="text-3xl font-bold text-slate-900">Quiz Completed!</h2>
            <p className="text-xl mt-4 text-slate-600">Your Score: {score} / {questions.length}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
            <div className="mb-8 text-sm font-bold text-indigo-600 uppercase tracking-wider">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <h2 className="text-2xl font-bold mb-8 text-slate-900">{questions[currentQuestion].question}</h2>
            
            <div className="grid gap-4">
              {questions[currentQuestion].options.map((opt, i) => (
                <button 
                  key={i} 
                  className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all font-medium text-slate-700" 
                  onClick={() => handleAnswer(i)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Quiz;