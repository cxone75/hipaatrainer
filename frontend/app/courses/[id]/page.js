
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '../../components/Layout/MainLayout';

export default function CoursePage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [loading, setLoading] = useState(true);

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
                videoUrl: 'https://player.vimeo.com/video/123456789',
                content: 'This lesson introduces the basics of HIPAA and its importance in healthcare.',
                completed: false
              },
              {
                id: 2,
                title: 'Importance of PHI',
                duration: '17:45',
                videoUrl: 'https://player.vimeo.com/video/123456790',
                content: 'Understanding Protected Health Information and why it matters.',
                completed: false
              },
              {
                id: 3,
                title: 'HIPAA Privacy',
                duration: '17:45',
                videoUrl: 'https://player.vimeo.com/video/123456791',
                content: 'Privacy rules and regulations under HIPAA.',
                completed: false
              },
              {
                id: 4,
                title: 'HIPAA Security',
                duration: '17:45',
                videoUrl: 'https://player.vimeo.com/video/123456792',
                content: 'Security requirements and best practices.',
                completed: false
              },
              {
                id: 5,
                title: 'HIPAA and State Laws',
                duration: '17:45',
                videoUrl: 'https://player.vimeo.com/video/123456793',
                content: 'How HIPAA interacts with state-specific laws.',
                completed: false
              },
              {
                id: 6,
                title: 'HIPAA Compliance',
                duration: '17:45',
                videoUrl: 'https://player.vimeo.com/video/123456794',
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

  const breadcrumbItems = [
    { label: 'Training', href: '/training' },
    { label: course?.title || 'Course', href: `/courses/${id}` }
  ];

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
            <h1 className="text-xl font-bold text-purple-800 mb-2">{course.title}</h1>
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
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-white">
                <div className="mb-4">
                  <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-lg">Video Player</p>
                <p className="text-sm opacity-75">Lesson {currentLesson + 1}: {currentLessonData?.title}</p>
              </div>
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
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Lesson Quiz</h3>
            <p className="text-gray-600 mb-6">
              Test your knowledge of {currentLessonData?.title} with this quick quiz.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowQuiz(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowQuiz(false);
                  // Navigate to quiz page
                  window.location.href = `/courses/${id}/quiz/${currentLessonData.id}`;
                }}
                className="flex-1 bg-purple-800 text-white px-4 py-2 rounded-lg hover:bg-purple-900"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
