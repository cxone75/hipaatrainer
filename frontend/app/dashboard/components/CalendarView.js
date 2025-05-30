
'use client';

import { useState, useEffect } from 'react';

export default function CalendarView({ events, onEventClick, onSendReminder }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getEventStatusColor = (status) => {
    switch (status) {
      case 'urgent':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'warning':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'upcoming':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'training':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'risk':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'policy':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getDaysUntil = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
    if (onEventClick) {
      onEventClick(event);
    }
  };

  const handleSendReminder = () => {
    if (selectedEvent && onSendReminder) {
      onSendReminder(selectedEvent.id);
      setShowModal(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => {
          const daysUntil = getDaysUntil(event.date);
          return (
            <div
              key={event.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${getEventStatusColor(event.status)}`}
              onClick={() => handleEventClick(event)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleEventClick(event);
                }
              }}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {getEventTypeIcon(event.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{event.title}</h3>
                  <p className="text-xs mt-1">{isClient ? formatDate(event.date) : event.date}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs font-medium">
                      {isClient ? (daysUntil > 0 ? `${daysUntil} days` : daysUntil === 0 ? 'Today' : 'Overdue') : 'Loading...'}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${
                      event.status === 'urgent' ? 'bg-red-500' :
                      event.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Event Details Modal */}
      {showModal && selectedEvent && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{selectedEvent.title}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">Date:</span>
                <span className="ml-2 text-sm text-gray-900">{isClient ? formatDate(selectedEvent.date) : selectedEvent.date}</span>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-600">Status:</span>
                <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  selectedEvent.status === 'urgent' ? 'bg-red-100 text-red-800' :
                  selectedEvent.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                </span>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-600">Description:</span>
                <p className="mt-1 text-sm text-gray-900">{selectedEvent.description}</p>
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  onClick={handleSendReminder}
                  className="flex-1 bg-purple-800 text-white px-4 py-2 rounded font-medium hover:bg-purple-900 transition-colors"
                >
                  Send Reminder
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded font-medium hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
