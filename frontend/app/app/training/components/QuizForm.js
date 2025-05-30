
'use client';

import { useState, useEffect } from 'react';

export default function QuizForm({ quiz, attempts, maxAttempts, onSubmit, passed }) {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes

  useEffect(() => {
    // Timer for quiz
    if (!showResults && !passed && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showResults, passed, timeRemaining]);

  const handleAnswerChange = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await onSubmit(answers);
      setQuizResult(result);
      setShowResults(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
    setQuizResult(null);
    setTimeRemaining(1800);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score) => {
    if (score >= quiz.passingScore) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const isAllAnswered = () => {
    return quiz.questions.every(question => answers[question.id] !== undefined);
  };

  if (passed) {
    return (
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Quiz Completed!</h3>
        <p className="text-gray-600">You have successfully passed this quiz. You can now download your certificate.</p>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="p-6">
        <div className="text-center mb-8">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
            quizResult?.passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {quizResult?.passed ? (
              <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            ) : (
              <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            )}
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Results</h3>
          <div className={`text-3xl font-bold ${getScoreColor(quizResult?.score || 0)} mb-4`}>
            {quizResult?.score || 0}%
          </div>
          
          {quizResult?.passed ? (
            <p className="text-green-600 font-medium mb-4">
              Congratulations! You passed the quiz.
            </p>
          ) : (
            <div className="text-red-600 mb-4">
              <p className="font-medium">You did not pass this time.</p>
              <p className="text-sm">You need {quiz.passingScore}% to pass. You can retry {maxAttempts - attempts} more time(s).</p>
            </div>
          )}
        </div>

        {/* Question Review */}
        <div className="space-y-6 mb-8">
          <h4 className="text-lg font-bold text-gray-900">Question Review</h4>
          {quiz.questions.map((question, index) => {
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-3 mb-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {isCorrect ? '✓' : '✗'}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 mb-2">
                      Question {index + 1}: {question.question}
                    </h5>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div 
                          key={optionIndex}
                          className={`p-2 rounded text-sm ${
                            optionIndex === question.correctAnswer 
                              ? 'bg-green-50 text-green-800 border border-green-200'
                              : optionIndex === userAnswer && !isCorrect
                              ? 'bg-red-50 text-red-800 border border-red-200'
                              : 'bg-gray-50 text-gray-700'
                          }`}
                        >
                          {option}
                          {optionIndex === question.correctAnswer && (
                            <span className="ml-2 text-xs font-medium">(Correct Answer)</span>
                          )}
                          {optionIndex === userAnswer && !isCorrect && (
                            <span className="ml-2 text-xs font-medium">(Your Answer)</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          {!quizResult?.passed && attempts < maxAttempts && (
            <button
              onClick={resetQuiz}
              className="bg-purple-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-900 transition-colors"
            >
              Retake Quiz
            </button>
          )}
          <button
            onClick={() => window.location.href = '/app/training'}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
          >
            Back to Training
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Quiz Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Knowledge Check</h3>
          <p className="text-gray-600">
            Answer all questions to complete the training. Passing score: {quiz.passingScore}%
          </p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <div className="text-sm text-gray-600 mb-1">Time Remaining</div>
          <div className={`text-lg font-mono font-bold ${
            timeRemaining < 300 ? 'text-red-600' : 'text-gray-900'
          }`}>
            {formatTime(timeRemaining)}
          </div>
          <div className="text-sm text-gray-600">
            Attempt {attempts + 1} of {maxAttempts}
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
          <span>{Object.keys(answers).length} answered</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-800 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        {quiz.questions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuestion(index)}
            className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
              index === currentQuestion
                ? 'bg-purple-800 text-white'
                : answers[quiz.questions[index].id] !== undefined
                ? 'bg-green-100 text-green-800 border-2 border-green-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            aria-label={`Go to question ${index + 1}${
              answers[quiz.questions[index].id] !== undefined ? ' (answered)' : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Current Question */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h4 className="text-lg font-medium text-gray-900 mb-6">
          Question {currentQuestion + 1}: {quiz.questions[currentQuestion].question}
        </h4>
        
        <div className="space-y-3">
          {quiz.questions[currentQuestion].options.map((option, index) => (
            <label
              key={index}
              className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                answers[quiz.questions[currentQuestion].id] === index
                  ? 'border-purple-800 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              aria-label={`Option ${index + 1}: ${option}`}
            >
              <input
                type="radio"
                name={`question-${quiz.questions[currentQuestion].id}`}
                value={index}
                checked={answers[quiz.questions[currentQuestion].id] === index}
                onChange={() => handleAnswerChange(quiz.questions[currentQuestion].id, index)}
                className="mt-1 h-4 w-4 text-purple-800 border-gray-300 focus:ring-purple-800"
                aria-describedby={`option-${index}-text`}
              />
              <span id={`option-${index}-text`} className="flex-1 text-gray-900">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentQuestion(Math.min(quiz.questions.length - 1, currentQuestion + 1))}
            disabled={currentQuestion === quiz.questions.length - 1}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={!isAllAnswered() || isSubmitting}
          className="bg-purple-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
        </button>
      </div>

      {/* Submission Requirements */}
      {!isAllAnswered() && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            Please answer all questions before submitting the quiz.
          </p>
        </div>
      )}
    </div>
  );
}
