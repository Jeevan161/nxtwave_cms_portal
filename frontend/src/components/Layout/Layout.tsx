import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import TopBar from '../TopBar/TopBar';
import { theme } from '../../styles/GlobalStyles';

const Layout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activePath, setActivePath] = useState('/dashboard');

  const sidebarWidth = isSidebarCollapsed
    ? theme.layout.sidebarCollapsedWidth
    : theme.layout.sidebarWidth;

  const getPageTitle = (path: string): string => {
    const titles: Record<string, string> = {
      '/dashboard': 'Dashboard',
      '/courses': 'Courses',
      '/courses/all': 'All Courses',
      '/courses/create': 'Create Course',
      '/courses/categories': 'Categories',
      '/sessions': 'Sessions',
      '/questions': 'Question Bank',
      '/resources': 'Resources',
      '/universities': 'Universities',
      '/instructors': 'Instructors',
      '/analytics': 'Analytics',
      '/settings': 'Settings',
    };
    return titles[path] || 'Dashboard';
  };

  const getBreadcrumbs = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    if (segments.length <= 1) return [];
    return segments.map((seg, i) => ({
      label: seg.charAt(0).toUpperCase() + seg.slice(1),
      path: '/' + segments.slice(0, i + 1).join('/'),
    }));
  };

  return (
    <div style={{ fontFamily: theme.typography.fontFamily, backgroundColor: theme.colors.background, minHeight: '100vh' }}>
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        activePath={activePath}
        onNavigate={setActivePath}
      />
      <TopBar
        isSidebarCollapsed={isSidebarCollapsed}
        pageTitle={getPageTitle(activePath)}
        breadcrumbs={getBreadcrumbs(activePath)}
        onSearch={(query) => console.log('Search:', query)}
      />
      <main
        style={{
          marginLeft: sidebarWidth,
          marginTop: theme.layout.topBarHeight,
          padding: theme.spacing['2xl'],
          transition: `margin-left ${theme.transitions.slow}`,
          minHeight: `calc(100vh - ${theme.layout.topBarHeight})`,
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.layout.borderRadiusLg,
            border: `1px solid ${theme.colors.border}`,
            padding: theme.spacing['3xl'],
            minHeight: '400px',
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.colors.textMuted,
            fontSize: theme.typography.fontSize.md,
          }}
        >
          {getPageTitle(activePath)} content will be rendered here
        </div>
      </main>
    </div>
  );
};

export default Layout;