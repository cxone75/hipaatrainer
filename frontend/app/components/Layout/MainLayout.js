
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
    <div className="min-h-screen bg-gray-200 flex">
      {/* Sidebar - Full Height */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggleCollapse={handleToggleSidebar}
      />
      
      {/* Right Side - Header + Main Content + Footer */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <TopNavigation />
        
        {/* Main Content Area */}
        <main className="flex-1">
          <div className="p-6">
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} />
            
            {/* Page Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-300 min-h-96">
              {children}
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
