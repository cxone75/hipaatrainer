
'use client';

import { useState, useEffect } from 'react';
import MainLayout from '../components/Layout/MainLayout';

export default function TrainingCourses() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Sample courses data - replace with actual API call
    const sampleCourses = [
      {
        id: 'hipaa-fundamentals',
        title: 'HIPAA Fundamentals',
        description: 'Essential HIPAA compliance training for healthcare professionals',
        duration: '45 minutes',
        category: 'HIPAA',
        difficulty: 'Beginner',
        enrolled: true,
        progress: 100,
        status: 'completed',
        certificateEarned: true,
        lastAccessed: '2024-01-15',
        thumbnail: '/images/courses/hipaa-fundamentals.jpg'
      },
      {
        id: 'osha-safety',
        title: 'OSHA Workplace Safety',
        description: 'Comprehensive workplace safety training',
        duration: '30 minutes',
        category: 'OSHA',
        difficulty: 'Beginner',
        enrolled: true,
        progress: 75,
        status: 'in-progress',
        certificateEarned: false,
        lastAccessed: '2024-01-20',
        thumbnail: '/images/courses/osha-safety.jpg'
      },
      {
        id: 'advanced-privacy',
        title: 'Advanced Privacy Practices',
        description: 'Advanced training on privacy practices and data protection',
        duration: '60 minutes',
        category: 'HIPAA',
        difficulty: 'Advanced',
        enrolled: false,
        progress: 0,
        status: 'not-started',
        certificateEarned: false,
        lastAccessed: null,
        thumbnail: '/images/courses/advanced-privacy.jpg'
      },
      {
        id: 'incident-response',
        title: 'Incident Response Protocol',
        description: 'Learn how to properly respond to security incidents',
        duration: '40 minutes',
        category: 'Security',
        difficulty: 'Intermediate',
        enrolled: false,
        progress: 0,
        status: 'not-started',
        certificateEarned: false,
        lastAccessed: null,
        thumbnail: '/images/courses/incident-response.jpg'
      }
    ];
    setCourses(sampleCourses);
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesFilter = filter === 'all' || 
      (filter === 'enrolled' && course.enrolled) ||
      (filter === 'completed' && course.status === 'completed') ||
      (filter === 'in-progress' && course.status === 'in-progress') ||
      (filter === course.category.toLowerCase());

    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'not-started': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const breadcrumbItems = [
    { label: 'Training', href: '/training' }
  ];

  return (
    <MainLayout breadcrumbItems={breadcrumbItems}>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Training Courses</h1>
          <p className="text-gray-600">
            Complete your required training courses and earn certificates of completion.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-800 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {['all', 'enrolled', 'completed', 'in-progress', 'hipaa', 'osha', 'security'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  filter === filterOption
                    ? 'bg-purple-800 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Course Thumbnail */}
              <div className="h-48 bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <p className="font-medium">{course.category}</p>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                  {course.certificateEarned && (
                    <div className="text-yellow-500" title="Certificate Earned">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-4">{course.description}</p>

                {/* Course Meta */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                    {course.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                    {course.difficulty}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                    {course.duration}
                  </span>
                </div>

                {/* Progress Bar */}
                {course.enrolled && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-800 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Last Accessed */}
                {course.lastAccessed && (
                  <p className="text-xs text-gray-500 mb-4">
                    Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                  </p>
                )}

                {/* Action Button */}
                <div className="flex space-x-2">
                  {course.enrolled ? (
                    <a
                      href={`/training/${course.id}`}
                      className="flex-1 bg-purple-800 text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-purple-900 transition-colors"
                    >
                      {course.status === 'completed' ? 'Review Course' : 'Continue'}
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        // Enroll in course logic
                        setCourses(prev => prev.map(c => 
                          c.id === course.id ? { ...c, enrolled: true, status: 'in-progress' } : c
                        ));
                      }}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Enroll Now
                    </button>
                  )}

                  {course.certificateEarned && (
                    <a
                      href={`/training/${course.id}#certificate`}
                      className="px-4 py-2 border border-purple-800 text-purple-800 rounded-lg font-medium hover:bg-purple-50 transition-colors"
                      title="View Certificate"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
