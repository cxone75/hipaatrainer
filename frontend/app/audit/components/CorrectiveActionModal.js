'use client';

import { useState } from 'react';
import AlertModal from '../../components/AlertModal';

export default function CorrectiveActionModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
    priority: 'Medium',
    category: 'Administrative Safeguards',
    assignedTo: '',
    assignedToEmail: '',
    estimatedCost: '',
    riskReduction: '',
    compliance: [],
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertModal, setAlertModal] = useState({ isOpen: false, title: '', message: '', type: 'info' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setAlertModal({
        isOpen: true,
        title: 'Validation Error',
        message: 'Action title is required',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const newAction = {
        id: `ca-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        priority: formData.priority,
        status: 'Pending',
        assignedTo: formData.assignedTo || 'Unassigned',
        assignedToEmail: formData.assignedToEmail || '',
        dueDate: formData.dueDate,
        createdDate: new Date().toISOString().split('T')[0],
        completionDate: null,
        estimatedCost: formData.estimatedCost || '$0',
        riskReduction: formData.riskReduction || '0%',
        compliance: formData.compliance.filter(c => c.trim()),
        progress: 0,
        notes: formData.notes
      };

      await onSave(newAction);

      // Reset form
      setFormData({
        title: '',
        description: '',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        priority: 'Medium',
        category: 'Administrative Safeguards',
        assignedTo: '',
        assignedToEmail: '',
        estimatedCost: '',
        riskReduction: '',
        compliance: [],
        notes: ''
      });

      onClose();
    } catch (error) {
      console.error('Error saving corrective action:', error);
      setAlertModal({
        isOpen: true,
        title: 'Save Error',
        message: 'Failed to save corrective action. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleComplianceChange = (e) => {
    const value = e.target.value;
    const complianceArray = value.split(',').map(item => item.trim());
    setFormData(prev => ({
      ...prev,
      compliance: complianceArray
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add Corrective Action</h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Action Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Action Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="e.g., Conduct staff training session"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              placeholder="Detailed description of the corrective action"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-transparent"
            />
          </div>

          {/* Priority and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-transparent"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-transparent"
              >
                <option value="Administrative Safeguards">Administrative Safeguards</option>
                <option value="Physical Safeguards">Physical Safeguards</option>
                <option value="Technical Safeguards">Technical Safeguards</option>
                <option value="Organizational">Organizational</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-transparent"
            />
          </div>

          {/* Assignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-2">
                Assigned To
              </label>
              <input
                type="text"
                id="assignedTo"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleInputChange}
                placeholder="e.g., IT Security Team"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="assignedToEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                id="assignedToEmail"
                name="assignedToEmail"
                value={formData.assignedToEmail}
                onChange={handleInputChange}
                placeholder="contact@company.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-transparent"
              />
            </div>
          </div>

          {/* Cost and Risk Reduction */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="estimatedCost" className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Cost
              </label>
              <input
                type="text"
                id="estimatedCost"
                name="estimatedCost"
                value={formData.estimatedCost}
                onChange={handleInputChange}
                placeholder="e.g., $500"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="riskReduction" className="block text-sm font-medium text-gray-700 mb-2">
                Risk Reduction
              </label>
              <input
                type="text"
                id="riskReduction"
                name="riskReduction"
                value={formData.riskReduction}
                onChange={handleInputChange}
                placeholder="e.g., 15%"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-transparent"
              />
            </div>
          </div>

          {/* Compliance References */}
          <div>
            <label htmlFor="compliance" className="block text-sm font-medium text-gray-700 mb-2">
              Compliance References
            </label>
            <input
              type="text"
              id="compliance"
              name="compliance"
              value={formData.compliance.join(', ')}
              onChange={handleComplianceChange}
              placeholder="e.g., 164.308(a)(5), 164.530(b)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Separate multiple references with commas</p>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={2}
              placeholder="Additional notes or implementation details"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-800 focus:border-transparent"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-purple-800 focus:border-transparent disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed h-12"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Saving...</span>
                </div>
              ) : (
                'Save Action'
              )}
            </button>
          </div>
        </form>
      </div>

      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
      />
    </div>
  );
}