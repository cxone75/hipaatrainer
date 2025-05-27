
'use client';

import { useState } from 'react';
import TopNavigation from './TopNavigation';
import Sidebar from './Sidebar';
import Breadcrumb from './Breadcrumb';
import Footer from './Footer';

export default function MainLayout({ children, breadcrumbItems = [] }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      {/* Top Navigation */}
      <TopNavigation />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggleCollapse={handleToggleSidebar}
        />
        
        {/* Main Content Area */}
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-0' : 'ml-0'}`}>
          <div className="p-6">
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} />
            
            {/* Page Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-300 min-h-96">
              {children}
            </div>
          </div>
        </main>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
