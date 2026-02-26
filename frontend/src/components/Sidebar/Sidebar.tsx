import React from 'react';
import { PanelLeftClose, PanelLeft, X } from 'lucide-react';
import type { SidebarProps } from './Sidebar.types';
import { sidebarConfig } from './Sidebar.config';
import { getSidebarStyles } from './Sidebar.styles';
import SidebarMenuItemComponent from './Sidebarmenuitem';

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  activePath,
  onNavigate,
  isMobile = false,
  isMobileOpen = false,
}) => {
  const styles = getSidebarStyles(isCollapsed);

  const sidebarClassName = [
    'sidebar',
    isMobile && isMobileOpen ? 'sidebar-open' : '',
  ].filter(Boolean).join(' ');

  return (
    <aside
      className={sidebarClassName}
      style={styles.container}
      aria-label="Main navigation"
    >
      {/* Logo / Brand */}
      <div style={styles.logo} onClick={() => onNavigate('/dashboard')}>
        <div style={styles.logoIcon}>
          <span>N</span>
        </div>
        <div style={styles.logoText as React.CSSProperties}>
          <span style={styles.logoTitle}>NxtWave</span>
          <span style={styles.logoSubtitle}>CMS Portal</span>
        </div>
        {/* Mobile close button */}
        {isMobile && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCollapse();
            }}
            style={{
              marginLeft: 'auto',
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close sidebar"
          >
            <X size={20} strokeWidth={1.8} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav style={styles.nav}>
        {sidebarConfig.map((section) => (
          <div key={section.id}>
            {/* Section Title */}
            {section.title && (
              <div style={styles.sectionTitle}>{section.title}</div>
            )}

            {/* Menu Items */}
            {section.items.map((item) => (
              <SidebarMenuItemComponent
                key={item.id}
                item={item}
                isCollapsed={isCollapsed}
                isActive={
                  activePath === item.path ||
                  activePath.startsWith(item.path + '/')
                }
                activePath={activePath}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        ))}
      </nav>

      {/* Collapse Toggle - only show on desktop */}
      {!isMobile && (
        <button
          style={styles.collapseButton}
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#E2E8F0';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#94A3B8';
          }}
        >
          {isCollapsed ? (
            <PanelLeft size={18} strokeWidth={1.8} />
          ) : (
            <>
              <PanelLeftClose size={18} strokeWidth={1.8} />
              <span style={{ flex: 1, textAlign: 'left' }}>Collapse</span>
            </>
          )}
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
