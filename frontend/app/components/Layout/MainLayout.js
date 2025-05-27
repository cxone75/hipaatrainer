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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopNavigation />
      <Sidebar />
      {breadcrumbItems && (
        <div className="bg-white border-b border-gray-200 px-6 py-2">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      )}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}