
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '../../components/Layout/MainLayout';
import AlertModal from '../../components/AlertModal';

export default function TrainingCourse() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [loading, setLoading] = useState(true);

  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const quizData = {
    questions: [
      {
        id: 1,
        question: "What creates Protected Health Information (PHI)?",
        options: [
          "A patient's name alone",
          "Any medical record",
          "Electronic health records only",
          "Individually identifiable information combined with health data"
        ],
        correctAnswer: 3,
        explanation: "PHI is created when individually identifiable information is combined with health data. This means information that can identify a specific individual along with their health information."
      },
      {
        id: 2,
        question: "Who can access PHI under HIPAA?",
        options: [
          "Anyone who works at a healthcare facility",
          "Only doctors and nurses",
          "Only individuals with a business need and proper authorization",
          "Any employee of a covered entity"
        ],
        correctAnswer: 2,
        explanation: "PHI can only be accessed by individuals who have a legitimate business need and proper authorization. This follows the minimum necessary standard."
      },
      {
        id: 3,
        question: "What is the minimum necessary standard?",
        options: [
          "Using the least amount of PHI needed to accomplish a task",
          "Keeping PHI for the minimum time required",
          "Having the minimum number of people access PHI",
          "Using minimum security measures"
        ],
        correctAnswer: 0,
        explanation: "The minimum necessary standard requires that only the minimum amount of PHI necessary to accomplish a specific purpose should be used, disclosed, or requested."
      }
    ]
  };

  useEffect(() => {
    // Load course data
    const loadCourse = async () => {
      try {
        const courseData = {
          'hipaa-fundamentals': {
            id: 'hipaa-fundamentals',
            title: 'HIPAA FUNDAMENTALS',
            description: 'Essential HIPAA compliance training for healthcare professionals',
            lessons: [
              {
                id: 1,
                title: 'Introduction to HIPAA',
                duration: '17:45',
                videoUrl: 'https://player.vimeo.com/video/1092212034/fd595af824',
                content: 'This lesson introduces the basics of HIPAA and its importance in healthcare.',
                completed: false
              },
              {
                id: 2,
                title: 'Importance of PHI',
                duration: '17:45',
                videoUrl: 'https://player.vimeo.com/video/1092212034/fd595af824',
                content: 'Understanding Protected Health Information and why it matters.',
                completed: false
              },
              {
                id: 3,
                title: 'HIPAA Privacy',
                duration: '17:45',
                videoUrl: 'https://player.vimeo.com/video/1092212034/fd595af824',
                content: 'Privacy rules and regulations under HIPAA.',
                completed: false
              },
              {
                id: 4,
                title: 'HIPAA Security',
                duration: '17:45',
                videoUrl: 'https://player.vimeo.com/video/1092212034/fd595af824',
                content: 'Security requirements and best practices.',
                completed: false
              },
              {
                id: 5,
                title: 'HIPAA and State Laws',
                duration: '17:45',
                videoUrl: 'https://player.vimeo.com/video/1092212034/fd595af824',
                content: 'How HIPAA interacts with state-specific laws.',
                completed: false
              },
              {
                id: 6,
                title: 'HIPAA Compliance',
                duration: '17:45',
                videoUrl: 'https://player.vimeo.com/video/1092212034/fd595af824',
                content: 'Ensuring ongoing compliance with HIPAA requirements.',
                completed: false
              }
            ],
            finalExam: {
              available: false,
              questions: 25,
              timeLimit: '45 minutes'
            }
          },
          'osha-safety': {
            id: 'osha-safety',
            title: 'OSHA WORKPLACE SAFETY',
            description: 'Comprehensive workplace safety training',
            lessons: [
              {
                id: 1,
                title: 'Introduction to OSHA',
                duration: '15:30',
                videoUrl: 'https://player.vimeo.com/video/123456789',
                content: 'Understanding OSHA regulations and workplace safety.',
                completed: false
              },
              {
                id: 2,
                title: 'Hazard Identification',
                duration: '14:45',
                videoUrl: 'https://player.vimeo.com/video/123456790',
                content: 'Learning to identify workplace hazards.',
                completed: false
              }
            ],
            finalExam: {
              available: false,
              questions: 20,
              timeLimit: '30 minutes'
            }
          },
          'advanced-privacy': {
            id: 'advanced-privacy',
            title: 'ADVANCED PRIVACY PRACTICES',
            description: 'Advanced training on privacy practices and data protection',
            lessons: [
              {
                id: 1,
                title: 'Privacy Frameworks',
                duration: '20:00',
                videoUrl: 'https://player.vimeo.com/video/123456789',
                content: 'Understanding advanced privacy frameworks.',
                completed: false
              },
              {
                id: 2,
                title: 'Data Protection Strategies',
                duration: '25:30',
                videoUrl: 'https://player.vimeo.com/video/123456790',
                content: 'Implementing data protection strategies.',
                completed: false
              },
              {
                id: 3,
                title: 'Compliance Monitoring',
                duration: '14:30',
                videoUrl: 'https://player.vimeo.com/video/123456791',
                content: 'Monitoring compliance with privacy regulations.',
                completed: false
              }
            ],
            finalExam: {
              available: false,
              questions: 30,
              timeLimit: '60 minutes'
            }
          },
          'incident-response': {
            id: 'incident-response',
            title: 'INCIDENT RESPONSE PROTOCOL',
            description: 'Learn how to properly respond to security incidents',
            lessons: [
              {
                id: 1,
                title: 'Incident Identification',
                duration: '12:45',
                videoUrl: 'https://player.vimeo.com/video/123456789',
                content: 'How to identify security incidents.',
                completed: false
              },
              {
                id: 2,
                title: 'Response Procedures',
                duration: '18:30',
                videoUrl: 'https://player.vimeo.com/video/123456790',
                content: 'Step-by-step incident response procedures.',
                completed: false
              },
              {
                id: 3,
                title: 'Documentation and Reporting',
                duration: '8:45',
                videoUrl: 'https://player.vimeo.com/video/123456791',
                content: 'Proper documentation and reporting of incidents.',
                completed: false
              }
            ],
            finalExam: {
              available: false,
              questions: 25,
              timeLimit: '40 minutes'
            }
          }
        };

        const selectedCourse = courseData[id];
        if (selectedCourse) {
          setCourse(selectedCourse);
        }
      } catch (error) {
        console.error('Error loading course:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadCourse();
    }
  }, [id]);

  const handleLessonComplete = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }

    // Check if all lessons are completed to enable final exam
    if (completedLessons.length + 1 === course?.lessons.length) {
      setCourse(prev => ({
        ...prev,
        finalExam: { ...prev.finalExam, available: true }
      }));
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showAnswer) return; // Prevent changing answer after revealing
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const currentQuestionData = quizData.questions[currentQuestion];
    const isCorrect = selectedAnswer === currentQuestionData.correctAnswer;

    // Store the answer
    const newAnswer = {
      questionId: currentQuestionData.id,
      selectedAnswer,
      correctAnswer: currentQuestionData.correctAnswer,
      isCorrect
    };

    setAnswers([...answers, newAnswer]);
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setAnswers([]);
    setQuizCompleted(false);
  };

  const calculateGrade = () => {
    const correctAnswers = answers.filter(answer => answer.isCorrect).length;
    return Math.round((correctAnswers / quizData.questions.length) * 100);
  };

  const currentQuestionData = quizData.questions[currentQuestion];

  const breadcrumbItems = [
    { label: 'Training', href: '/training' },
    { label: course?.title || 'Course', href: `/training/${id}` }
  ];
  const [alertModal, setAlertModal] = useState({ isOpen: false, title: '', message: '', type: 'info' });

  if (loading) {
    return (
      <MainLayout breadcrumbItems={breadcrumbItems}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-800 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading course...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!course) {
    return (
      <MainLayout breadcrumbItems={breadcrumbItems}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
            <p className="text-gray-600 mb-4">The requested course could not be found.</p>
            <a href="/training" className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-900">
              Back to Training
            </a>
          </div>
        </div>
      </MainLayout>
    );
  }

  const currentLessonData = course.lessons[currentLesson];

  return (
    <MainLayout breadcrumbItems={breadcrumbItems}>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Course Header */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-purple-800 mb-4">{course.title}</h1>

            {/* Progress Bar */}
            <div className="mb-2">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Progress</span>
                <span>{Math.round((completedLessons.length / course.lessons.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-800 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedLessons.length / course.lessons.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Lessons List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-2">
              {course.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  onClick={() => setCurrentLesson(index)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    currentLesson === index
                      ? 'bg-purple-100 border-l-4 border-purple-800'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      completedLessons.includes(lesson.id)
                        ? 'bg-green-500 text-white'
                        : currentLesson === index
                        ? 'bg-purple-800 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {completedLessons.includes(lesson.id) ? '✓' : lesson.id}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{lesson.title}</div>
                          <div className="text-xs text-gray-500">{lesson.duration}</div>
                        </div>
                        {index === 0 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowQuiz(true);
                            }}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-600 transition-colors"
                          >
                            Quiz
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Final Exam Section */}
            <div className="p-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">Ready for the final exam?</p>
                <button
                  disabled={!course.finalExam.available}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                    course.finalExam.available
                      ? 'bg-purple-800 hover:bg-purple-900'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Start Final Exam
                </button>
                {!course.finalExam.available && (
                  <p className="text-xs text-gray-500 mt-2">Complete all lessons to unlock</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Video Player Area */}
          <div className="flex-1 bg-black relative">
            {/* Video Player */}
            <div className="w-full h-full">
              <iframe
                src={currentLessonData?.videoUrl || 'https://player.vimeo.com/video/1092212034/fd595af824'}
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={`Lesson ${currentLesson + 1}: ${currentLessonData?.title}`}
              ></iframe>
            </div>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="flex items-center justify-between text-white">
                <div>
                  <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium mb-2">
                    Lesson {currentLesson + 1}
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{currentLessonData?.title}</h2>
                  <p className="text-sm opacity-90">{currentLessonData?.content}</p>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span>Completion time: {currentLessonData?.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Navigation */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
                disabled={currentLesson === 0}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleLessonComplete(currentLessonData.id)}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Mark as Complete
                </button>
              </div>

              <button
                onClick={() => setCurrentLesson(Math.min(course.lessons.length - 1, currentLesson + 1))}
                disabled={currentLesson === course.lessons.length - 1}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <AlertModal
          isOpen={alertModal.isOpen}
          onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
          title={alertModal.title}
          message={alertModal.message}
          type={alertModal.type}
        />
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden mx-4">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Quiz</h2>
              <button
                onClick={() => setShowQuiz(false)}
                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300"
              >
                ×
              </button>
            </div>

            {/* Quiz Content */}
            <div className="p-6 max-h-[75vh] overflow-y-auto">
              {!quizCompleted ? (
                <>
                  {/* Required passing grade */}
                  <p className="text-gray-600 mb-6">Required passing grade: 75%</p>

                  {/* Question counter and progress */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-gray-600">Question {currentQuestion + 1} of {quizData.questions.length}</span>
                    <div className="flex space-x-1">
                      {quizData.questions.map((_, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full ${
                            index === currentQuestion ? 'bg-purple-600' : 
                            index < currentQuestion ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Question */}
                  <div className="mb-8">
                    <h3 className="text-xl font-medium text-gray-900 mb-6">
                      {currentQuestionData.question}
                    </h3>

                    {/* Answer options */}
                    <div className="space-y-4">
                      {currentQuestionData.options.map((option, index) => (
                        <label 
                          key={index}
                          className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                            showAnswer
                              ? index === currentQuestionData.correctAnswer
                                ? 'border-green-500 bg-green-50'
                                : index === selectedAnswer && selectedAnswer !== currentQuestionData.correctAnswer
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 bg-gray-50'
                              : selectedAnswer === index
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`quiz-question-${currentQuestion}`}
                            checked={selectedAnswer === index}
                            onChange={() => handleAnswerSelect(index)}
                            disabled={showAnswer}
                            className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                          />
                          <span className="flex-1 text-gray-900">{option}</span>
                          {showAnswer && index === currentQuestionData.correctAnswer && (
                            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                          )}
                          {showAnswer && index === selectedAnswer && selectedAnswer !== currentQuestionData.correctAnswer && (
                            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                          )}
                        </label>
                      ))}
                    </div>

                    {/* Answer explanation */}
                    {showAnswer && (
                      <div className={`mt-6 p-4 rounded-lg ${
                        selectedAnswer === currentQuestionData.correctAnswer 
                          ? 'bg-green-50 border border-green-200' 
                          : 'bg-red-50 border border-red-200'
                      }`}>
                        <div className="flex items-start space-x-3">
                          {selectedAnswer === currentQuestionData.correctAnswer ? (
                            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                          )}
                          <div>
                            <p className={`font-medium ${
                              selectedAnswer === currentQuestionData.correctAnswer 
                                ? 'text-green-800' 
                                : 'text-red-800'
                            }`}>
                              {selectedAnswer === currentQuestionData.correctAnswer ? 'Correct!' : 'Incorrect'}
                            </p>
                            <p className={`text-sm mt-1 ${
                              selectedAnswer === currentQuestionData.correctAnswer 
                                ? 'text-green-700' 
                                : 'text-red-700'
                            }`}>
                              {currentQuestionData.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex justify-between">
                    <button
                      onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                      disabled={currentQuestion === 0}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                      </svg>
                      <span>Previous</span>
                    </button>

                    <div className="flex space-x-4">
                      {!showAnswer ? (
                        <button 
                          onClick={handleSubmitAnswer}
                          disabled={selectedAnswer === null}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Submit Answer
                        </button>
                      ) : (
                        <button 
                          onClick={handleNextQuestion}
                          className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          <span>{currentQuestion === quizData.questions.length - 1 ? 'Finish Quiz' : 'Next'}</span>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                /* Quiz Results */
                <div className="text-center">
                  <div className="mb-8">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      calculateGrade() >= 75 ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {calculateGrade() >= 75 ? (
                        <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      ) : (
                        <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h3>
                    <div className={`text-4xl font-bold mb-4 ${
                      calculateGrade() >= 75 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {calculateGrade()}%
                    </div>

                    <p className={`text-lg font-medium ${
                      calculateGrade() >= 75 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {calculateGrade() >= 75 ? 'Congratulations! You passed!' : 'You need 75% to pass. Try again!'}
                    </p>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700">
                        You answered {answers.filter(a => a.isCorrect).length} out of {quizData.questions.length} questions correctly.
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={resetQuiz}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Retake Quiz
                    </button>
                    <button
                      onClick={() => setShowQuiz(false)}
                      className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
