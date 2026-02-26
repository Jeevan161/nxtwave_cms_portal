import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import TopBar from './components/TopBar/TopBar';
import AllCourses from './containers/Courses/AllCourses';
import AddCourse from './containers/Courses/AddCourse';
import { theme } from './styles/GlobalStyles';

const MOBILE_BREAKPOINT = 768;

const App: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT);
  const [activePath, setActivePath] = useState('/dashboard');

  // Track window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarWidth = isMobile
    ? '0px'
    : isSidebarCollapsed
      ? theme.layout.sidebarCollapsedWidth
      : theme.layout.sidebarWidth;

  const getPageTitle = (path: string): string => {
    const titles: Record<string, string> = {
      '/dashboard': 'Dashboard',
      '/courses': 'Courses',
      '/courses/all': 'All Courses',
      '/courses/add': 'Add Course',
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

  const handleSearch = (query: string) => {
    console.log('Search:', query);
  };

  const handleNavigate = useCallback((path: string) => {
    setActivePath(path);
    // Close mobile sidebar on navigation
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
  }, [isMobile]);

  const handleToggleMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen((prev) => !prev);
  }, []);

  // Render the correct page based on activePath
  const renderContent = () => {
    switch (activePath) {
      case '/courses/all':
        return <AllCourses />;
      case '/courses/add':
        return <AddCourse />;
      default:
        return (
          <div
            style={{
              backgroundColor: theme.colors.surface,
              borderRadius: theme.layout.borderRadiusLg,
              border: `1px solid ${theme.colors.border}`,
              padding: theme.spacing['3xl'],
              minHeight: '400px',
              width: '100%',
              boxSizing: 'border-box' as const,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.colors.textMuted,
              fontSize: theme.typography.fontSize.md,
            }}
          >
            {getPageTitle(activePath)} content will be rendered here
          </div>
        );
    }
  };

  return (
    <div
      style={{
        fontFamily: theme.typography.fontFamily,
        backgroundColor: theme.colors.background,
        minHeight: '100vh',
        color: theme.colors.textPrimary,
      }}
    >
      {/* Mobile overlay backdrop */}
      {isMobile && (
        <div
          className={`sidebar-overlay${isMobileSidebarOpen ? ' active' : ''}`}
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isCollapsed={isMobile ? false : isSidebarCollapsed}
        onToggleCollapse={() => {
          if (isMobile) {
            setIsMobileSidebarOpen(false);
          } else {
            setIsSidebarCollapsed((prev) => !prev);
          }
        }}
        activePath={activePath}
        onNavigate={handleNavigate}
        isMobile={isMobile}
        isMobileOpen={isMobileSidebarOpen}
      />

      {/* TopBar */}
      <TopBar
        isSidebarCollapsed={isSidebarCollapsed}
        pageTitle={getPageTitle(activePath)}
        breadcrumbs={getBreadcrumbs(activePath)}
        onSearch={handleSearch}
        isMobile={isMobile}
        onToggleMobileSidebar={handleToggleMobileSidebar}
      />

      {/* Main Content Area */}
      <main
        className="main-content"
        style={{
          marginLeft: sidebarWidth,
          marginTop: theme.layout.topBarHeight,
          padding: theme.spacing['2xl'],
          transition: `margin-left ${theme.transitions.slow}`,
          minHeight: `calc(100vh - ${theme.layout.topBarHeight})`,
          boxSizing: 'border-box' as const,
          overflowX: 'hidden' as const,
        }}
      >
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
