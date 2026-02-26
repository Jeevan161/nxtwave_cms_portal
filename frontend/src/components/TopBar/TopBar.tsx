import React, { useState } from 'react';
import { Bell, HelpCircle, ChevronRight, Menu } from 'lucide-react';
import type { TopBarProps } from './TopBar.types';
import { getTopBarStyles } from './TopBar.styles';
import { theme } from '../../styles/GlobalStyles';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

const TopBar: React.FC<TopBarProps> = ({
  isSidebarCollapsed,
  pageTitle,
  breadcrumbs = [],
  onSearch,
  isMobile = false,
  onToggleMobileSidebar,
}) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const sidebarWidth = isMobile
    ? '0px'
    : isSidebarCollapsed
      ? theme.layout.sidebarCollapsedWidth
      : theme.layout.sidebarWidth;

  const styles = getTopBarStyles(sidebarWidth);

  // Mock user - replace with actual auth context later
  const currentUser = {
    name: 'Content Admin',
    email: 'content@nxtwave.in',
    role: 'Technical Creator',
  };

  const renderIconButton = (
    id: string,
    icon: React.ReactNode,
    hasNotification = false,
    ariaLabel: string
  ) => (
    <button
      style={{
        ...styles.iconButton,
        ...(hoveredButton === id ? styles.iconButtonHover : {}),
      }}
      onMouseEnter={() => setHoveredButton(id)}
      onMouseLeave={() => setHoveredButton(null)}
      aria-label={ariaLabel}
    >
      {icon}
      {hasNotification && <span style={styles.notificationDot} />}
    </button>
  );

  return (
    <header className="topbar" style={styles.container}>
      {/* Left: Hamburger (mobile) + Title + Breadcrumbs */}
      <div style={styles.leftSection}>
        {/* Hamburger button - hidden by default, shown on mobile via CSS */}
        {isMobile && (
          <button
            className="hamburger-btn"
            style={styles.hamburgerButton}
            onClick={onToggleMobileSidebar}
            aria-label="Toggle navigation menu"
          >
            <Menu size={22} strokeWidth={1.8} />
          </button>
        )}

        <div style={styles.titleBlock as React.CSSProperties}>
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav style={styles.breadcrumbs} aria-label="Breadcrumb">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <ChevronRight
                      size={12}
                      strokeWidth={2}
                      style={{ color: '#94A3B8' }}
                    />
                  )}
                  {index === breadcrumbs.length - 1 ? (
                    <span style={styles.breadcrumbCurrent}>{crumb.label}</span>
                  ) : (
                    <span
                      style={styles.breadcrumbLink}
                      role="link"
                      tabIndex={0}
                    >
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}

          {/* Page Title */}
          <h1 style={styles.pageTitle}>{pageTitle}</h1>
        </div>
      </div>

      {/* Center: Search - hidden on mobile via CSS class */}
      <div className="topbar-search" style={styles.centerSection}>
        <SearchBar onSearch={onSearch} sidebarWidth={sidebarWidth} />
      </div>

      {/* Right: Actions + User */}
      <div style={styles.rightSection}>
        {renderIconButton(
          'help',
          <HelpCircle size={18} strokeWidth={1.8} />,
          false,
          'Help'
        )}
        {renderIconButton(
          'notifications',
          <Bell size={18} strokeWidth={1.8} />,
          true,
          'Notifications'
        )}

        <div style={styles.divider} />

        <UserMenu user={currentUser} sidebarWidth={sidebarWidth} />
      </div>
    </header>
  );
};

export default TopBar;
