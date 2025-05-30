
'use client';

import MainLayout from '../components/Layout/MainLayout';
import AuthGuard from '../components/AuthGuard';

export default function AppLayout({ children }) {
  return (
    <AuthGuard>
      <MainLayout>{children}</MainLayout>
    </AuthGuard>
  );
}
