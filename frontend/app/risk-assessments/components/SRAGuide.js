
'use client';

import { useState, useEffect } from 'react';

export default function SRAGuide({ assessmentData, onUpdateData }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [expandedStep, setExpandedStep] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getAdaptiveQuestions = () => {
    const baseQuestions = [
      {
        id: 'encryption',
        question: 'Do you use encryption for data at rest and in transit?',
        type: 'radio',
        options: ['Yes', 'No', 'Partially'],
        required: true
      },
      {
        id: 'access_control',
        question: 'Do you have multi-factor authentication implemented?',
        type: 'radio',
        options: ['Yes', 'No', 'In Progress'],
        required: true
      },
      {
        id: 'backup',
        question: 'How frequently do you perform data backups?',
        type: 'radio',
        options: ['Daily', 'Weekly', 'Monthly', 'Rarely', 'Never'],
        required: true
      },
      {
        id: 'training',
        question: 'Do all employees receive cybersecurity training?',
        type: 'radio',
        options: ['Yes, regularly', 'Yes, annually', 'Occasionally', 'No'],
        required: true
      }
    ];

    // Adaptive questions based on previous answers
    const adaptiveQuestions = [...baseQuestions];

    if (answers.encryption === 'No' || answers.encryption === 'Partially') {
      adaptiveQuestions.push({
        id: 'encryption_plan',
        question: 'Do you have plans to implement full encryption?',
        type: 'radio',
        options: ['Yes, within 30 days', 'Yes, within 90 days', 'Yes, within 1 year', 'No current plans'],
        required: true
      });
    }

    if (answers.access_control === 'No') {
      adaptiveQuestions.push({
        id: 'mfa_timeline',
        question: 'When do you plan to implement multi-factor authentication?',
        type: 'radio',
        options: ['Within 30 days', 'Within 90 days', 'Within 6 months', 'No current plans'],
        required: true
      });
    }

    if (answers.backup === 'Rarely' || answers.backup === 'Never') {
      adaptiveQuestions.push({
        id: 'backup_plan',
        question: 'What is preventing regular backups?',
        type: 'checkbox',
        options: ['Lack of resources', 'Technical complexity', 'Cost concerns', 'Not a priority'],
        required: true
      });
    }

    return adaptiveQuestions;
  };

  const questions = getAdaptiveQuestions();
  const totalSteps = questions.length;

  const handleAnswerChange = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    
    // Update parent component
    onUpdateData({
      ...assessmentData,
      questionnaire: newAnswers
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      if (isMobile) {
        setExpandedStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      if (isMobile) {
        setExpandedStep(currentStep - 1);
      }
    }
  };

  const isStepComplete = (stepIndex) => {
    const question = questions[stepIndex];
    return question && answers[question.id] !== undefined;
  };

  const renderQuestion = (question, stepIndex) => {
    const isActive = stepIndex === currentStep;
    const isComplete = isStepComplete(stepIndex);

    return (
      <div 
        key={question.id}
        className={`border rounded-lg ${isActive ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
      >
        {/* Mobile Accordion Header */}
        {isMobile && (
          <button
            onClick={() => setExpandedStep(expandedStep === stepIndex ? -1 : stepIndex)}
            className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-t-lg"
            aria-label={`SRA Step ${stepIndex + 1} of ${totalSteps}`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isComplete ? 'bg-green-500 text-white' : isActive ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {isComplete ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepIndex + 1
                )}
              </div>
              <span className="font-medium">Step {stepIndex + 1}</span>
            </div>
            <svg 
              className={`w-5 h-5 transform transition-transform ${expandedStep === stepIndex ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}

        {/* Question Content */}
        <div className={`p-6 ${isMobile && expandedStep !== stepIndex ? 'hidden' : ''}`}>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {question.question}
            </h3>
            {question.required && (
              <span className="text-sm text-red-600">* Required</span>
            )}
          </div>

          <div className="space-y-3">
            {question.type === 'radio' && question.options.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="rounded-full border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-3 text-gray-700">{option}</span>
              </label>
            ))}

            {question.type === 'checkbox' && question.options.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  value={option}
                  checked={Array.isArray(answers[question.id]) && answers[question.id].includes(option)}
                  onChange={(e) => {
                    const currentValues = Array.isArray(answers[question.id]) ? answers[question.id] : [];
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter(v => v !== option);
                    handleAnswerChange(question.id, newValues);
                  }}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-3 text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Security Risk Assessment Questionnaire</h2>
        <p className="text-gray-600">Answer the following questions to assess your organization's security posture</p>
      </div>

      {/* Desktop Stepper Progress */}
      {!isMobile && (
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {questions.map((_, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isStepComplete(index) ? 'bg-green-500 text-white' : 
                  index === currentStep ? 'bg-purple-500 text-white' : 
                  'bg-gray-200 text-gray-600'
                }`}>
                  {isStepComplete(index) ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                {index < questions.length - 1 && (
                  <div className={`h-1 w-full mx-4 ${
                    isStepComplete(index) ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-600 text-center">
            Step {currentStep + 1} of {totalSteps}
          </div>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {isMobile ? (
          // Mobile: Show all questions as accordion
          questions.map((question, index) => renderQuestion(question, index))
        ) : (
          // Desktop: Show only current question
          questions[currentStep] && renderQuestion(questions[currentStep], currentStep)
        )}
      </div>

      {/* Navigation */}
      {!isMobile && (
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Previous</span>
          </button>

          <div className="text-sm text-gray-500">
            {Object.keys(answers).length} of {totalSteps} questions completed
          </div>

          <button
            onClick={handleNext}
            disabled={currentStep === totalSteps - 1 || !isStepComplete(currentStep)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
