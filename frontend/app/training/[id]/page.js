
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '../../components/Layout/MainLayout';
import VideoPlayer from '../components/VideoPlayer';
import QuizForm from '../components/QuizForm';
import Certificate from '../components/Certificate';

export default function TrainingCourse() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('video');
  const [quizAttempts, setQuizAttempts] = useState(0);
  const [quizPassed, setQuizPassed] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load course data - this would typically come from an API
    const loadCourse = async () => {
      try {
        // Simulated course data - replace with actual API call
        const courseData = {
          'hipaa-fundamentals': {
            id: 'hipaa-fundamentals',
            title: 'HIPAA Fundamentals',
            description: 'Essential HIPAA compliance training for healthcare professionals',
            videoUrl: 'https://player.vimeo.com/video/123456789',
            duration: '45 minutes',
            quiz: {
              questions: [
                {
                  id: 1,
                  question: 'What does HIPAA stand for?',
                  options: [
                    'Health Insurance Portability and Accountability Act',
                    'Healthcare Information Privacy and Access Act',
                    'Health Information Protection and Analysis Act',
                    'Healthcare Insurance Privacy and Authorization Act'
                  ],
                  correctAnswer: 0
                },
                {
                  id: 2,
                  question: 'Which of the following is considered PHI (Protected Health Information)?',
                  options: [
                    'Patient name only',
                    'Medical record number only',
                    'Any information that can identify a patient',
                    'Only diagnostic codes'
                  ],
                  correctAnswer: 2
                },
                {
                  id: 3,
                  question: 'What is the minimum necessary standard?',
                  options: [
                    'Using the least amount of PHI necessary',
                    'Sharing all available patient information',
                    'Only sharing information with doctors',
                    'Encrypting all data transmissions'
                  ],
                  correctAnswer: 0
                }
              ],
              passingScore: 80
            },
            certificateTemplate: 'hipaa-fundamentals-cert'
          },
          'osha-safety': {
            id: 'osha-safety',
            title: 'OSHA Workplace Safety',
            description: 'Comprehensive workplace safety training',
            videoUrl: 'https://player.vimeo.com/video/987654321',
            duration: '30 minutes',
            quiz: {
              questions: [
                {
                  id: 1,
                  question: 'What is the primary purpose of OSHA?',
                  options: [
                    'To regulate healthcare',
                    'To ensure safe working conditions',
                    'To manage insurance claims',
                    'To provide medical training'
                  ],
                  correctAnswer: 1
                }
              ],
              passingScore: 80
            },
            certificateTemplate: 'osha-safety-cert'
          }
        };

        const selectedCourse = courseData[id];
        if (selectedCourse) {
          setCourse(selectedCourse);
          setProgress(0);
        } else {
          throw new Error('Course not found');
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

  const handleVideoProgress = (progressPercent) => {
    setProgress(Math.max(progress, progressPercent * 0.7)); // Video is 70% of total progress
    if (progressPercent >= 90 && !videoCompleted) {
      setVideoCompleted(true);
      setCurrentSection('quiz');
    }
  };

  const handleQuizSubmit = async (answers) => {
    try {
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: course.id,
          answers,
          attempt: quizAttempts + 1,
        }),
      });

      const result = await response.json();
      setQuizAttempts(prev => prev + 1);

      if (result.passed) {
        setQuizPassed(true);
        setProgress(100);
        setCurrentSection('certificate');
      }

      return result;
    } catch (error) {
      console.error('Error submitting quiz:', error);
      return { passed: false, score: 0, error: 'Failed to submit quiz' };
    }
  };

  const breadcrumbItems = [
    { label: 'Training', href: '/training' },
    { label: course?.title || 'Course', href: `/training/${id}` }
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

  return (
    <MainLayout breadcrumbItems={breadcrumbItems}>
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex-1">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-purple-800 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label={`Course progress: ${Math.round(progress)}%`}
                ></div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Duration: {course.duration}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setCurrentSection('video')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                currentSection === 'video'
                  ? 'border-purple-800 text-purple-800'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Video Training
            </button>
            <button
              onClick={() => setCurrentSection('quiz')}
              disabled={!videoCompleted}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                currentSection === 'quiz'
                  ? 'border-purple-800 text-purple-800'
                  : videoCompleted
                  ? 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  : 'border-transparent text-gray-400 cursor-not-allowed'
              }`}
            >
              Quiz
              {quizAttempts > 0 && (
                <span className="ml-1 bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {quizAttempts}/3
                </span>
              )}
            </button>
            <button
              onClick={() => setCurrentSection('certificate')}
              disabled={!quizPassed}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                currentSection === 'certificate'
                  ? 'border-purple-800 text-purple-800'
                  : quizPassed
                  ? 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  : 'border-transparent text-gray-400 cursor-not-allowed'
              }`}
            >
              Certificate
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {currentSection === 'video' && (
            <VideoPlayer
              videoUrl={course.videoUrl}
              title={course.title}
              onProgress={handleVideoProgress}
            />
          )}

          {currentSection === 'quiz' && videoCompleted && (
            <QuizForm
              quiz={course.quiz}
              attempts={quizAttempts}
              maxAttempts={3}
              onSubmit={handleQuizSubmit}
              passed={quizPassed}
            />
          )}

          {currentSection === 'certificate' && quizPassed && (
            <Certificate
              courseTitle={course.title}
              courseId={course.id}
              template={course.certificateTemplate}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
}
