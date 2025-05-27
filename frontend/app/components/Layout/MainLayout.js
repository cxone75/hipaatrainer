
'use client';

import { useState } from 'react';
import TopNavigation from './TopNavigation';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function MainLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="h-screen bg-gray-200 flex flex-col lg:flex-row overflow-hidden">
      {/* Desktop: Sidebar on Left */}
      <div className="hidden lg:block">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggleCollapse={handleToggleSidebar}
          isMobile={false}
        />
      </div>
      
      {/* Main Content Container */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Top Navigation */}
        <TopNavigation />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto pb-16 lg:pb-0">
          <div className="p-4 lg:p-6">
            {/* Page Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-300 min-h-96">
              {children}
            </div>
          </div>
        </main>
        
        {/* Desktop Footer */}
        <div className="hidden lg:block">
          <Footer />
        </div>
      </div>

      {/* Mobile: Bottom Toolbar */}
      <div className="lg:hidden">
        <Sidebar 
          collapsed={false} 
          onToggleCollapse={handleToggleSidebar}
          isMobile={true}
        />
      </div>
    </div>
  );
}
