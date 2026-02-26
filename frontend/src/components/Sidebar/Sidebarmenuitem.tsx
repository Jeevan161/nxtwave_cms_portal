import React, { useState } from 'react';
import { theme } from '../../styles/GlobalStyles';
const { colors } = theme;
import {
  LayoutDashboard, BookOpen, Video, HelpCircle, FileText,
  GraduationCap, Users, BarChart3, Settings, List, Plus,
  FolderTree, ChevronRight, type LucideIcon,
} from 'lucide-react';
import type { SidebarMenuItem as MenuItemType } from './Sidebar.types';
import { getSidebarStyles } from './Sidebar.styles';

// Icon registry for dynamic icon rendering
const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard, BookOpen, Video, HelpCircle, FileText,
  GraduationCap, Users, BarChart3, Settings, List, Plus,
  FolderTree, ChevronRight,
};

// Each menu item gets a unique accent color for its icon
const iconAccentMap: Record<string, { bg: string; glow: string }> = {
  LayoutDashboard: { bg: 'rgba(99, 102, 241, 0.18)', glow: 'rgba(99, 102, 241, 0.4)' },
  BookOpen:        { bg: 'rgba(139, 92, 246, 0.18)', glow: 'rgba(139, 92, 246, 0.4)' },
  Video:           { bg: 'rgba(236, 72, 153, 0.18)', glow: 'rgba(236, 72, 153, 0.4)' },
  HelpCircle:      { bg: 'rgba(14, 165, 233, 0.18)', glow: 'rgba(14, 165, 233, 0.4)' },
  FileText:        { bg: 'rgba(34, 197, 94, 0.18)',  glow: 'rgba(34, 197, 94, 0.4)' },
  GraduationCap:   { bg: 'rgba(249, 115, 22, 0.18)', glow: 'rgba(249, 115, 22, 0.4)' },
  Users:           { bg: 'rgba(6, 182, 212, 0.18)',  glow: 'rgba(6, 182, 212, 0.4)' },
  BarChart3:       { bg: 'rgba(168, 85, 247, 0.18)', glow: 'rgba(168, 85, 247, 0.4)' },
  Settings:        { bg: 'rgba(148, 163, 184, 0.15)', glow: 'rgba(148, 163, 184, 0.3)' },
  List:            { bg: 'rgba(129, 140, 248, 0.15)', glow: 'rgba(129, 140, 248, 0.3)' },
  Plus:            { bg: 'rgba(52, 211, 153, 0.15)', glow: 'rgba(52, 211, 153, 0.3)' },
};

// Icon color when active
const iconColorMap: Record<string, string> = {
  LayoutDashboard: '#818CF8',
  BookOpen:        '#A78BFA',
  Video:           '#F472B6',
  HelpCircle:      '#38BDF8',
  FileText:        '#4ADE80',
  GraduationCap:   '#FB923C',
  Users:           '#22D3EE',
  BarChart3:       '#C084FC',
  Settings:        '#CBD5E1',
  List:            '#A5B4FC',
  Plus:            '#6EE7B7',
};

interface SidebarMenuItemProps {
  item: MenuItemType;
  isCollapsed: boolean;
  isActive: boolean;
  activePath: string;
  onNavigate: (path: string) => void;
  isChild?: boolean;
}

const SidebarMenuItemComponent: React.FC<SidebarMenuItemProps> = ({
  item,
  isCollapsed,
  isActive,
  activePath,
  onNavigate,
  isChild = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const styles = getSidebarStyles(isCollapsed);

  const IconComponent = iconMap[item.icon];
  const hasChildren = item.children && item.children.length > 0;
  const iconAccent = iconAccentMap[item.icon] || { bg: 'rgba(99, 102, 241, 0.15)', glow: 'rgba(99, 102, 241, 0.3)' };
  const iconColor = iconColorMap[item.icon] || '#818CF8';

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded((prev) => !prev);
    } else {
      onNavigate(item.path);
    }
  };

  const getItemStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      ...styles.menuItem,
      ...(isChild && isCollapsed ? styles.childItemCollapsed : {}),
      ...(isChild && !isCollapsed ? styles.childItem : {}),
      backgroundColor: 'transparent',
      color: colors.sidebarText,
    };

    if (isActive) {
      base.background = 'linear-gradient(90deg, rgba(99, 102, 241, 0.14), rgba(139, 92, 246, 0.08))';
      base.color = colors.sidebarTextActive;
      base.fontWeight = theme.typography.fontWeight.semibold;
    } else if (isHovered) {
      base.backgroundColor = colors.sidebarHover;
      base.color = colors.sidebarTextHover;
    }

    return base;
  };

  const getIconWrapperStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = { ...styles.menuItemIcon };

    if (isActive || isHovered) {
      base.backgroundColor = iconAccent.bg;
      base.boxShadow = isActive ? `0 0 12px ${iconAccent.glow}` : 'none';
    }

    return base;
  };

  return (
    <>
      <button
        style={getItemStyle()}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={item.label}
        aria-expanded={hasChildren ? isExpanded : undefined}
      >
        {/* Active indicator */}
        {isActive && <span style={styles.activeIndicator} />}

        {/* Icon with colored wrapper */}
        <span style={getIconWrapperStyle()}>
          {IconComponent && (
            <IconComponent
              size={isCollapsed && isChild ? 16 : isCollapsed ? 20 : 18}
              strokeWidth={isActive ? 2.2 : 1.8}
              color={isActive ? iconColor : isHovered ? colors.sidebarTextHover : undefined}
            />
          )}
        </span>

        {/* Label (hidden when collapsed) */}
        <span style={styles.menuItemLabel}>{item.label}</span>

        {/* Badge (expanded mode) */}
        {item.badge && !isCollapsed && (
          <span style={styles.badge}>{item.badge}</span>
        )}

        {/* Badge dot (collapsed mode) */}
        {item.badge && isCollapsed && !isChild && (
          <span
            style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #818CF8, #A78BFA)',
              boxShadow: `0 0 6px rgba(99, 102, 241, 0.5), 0 0 0 2px ${colors.sidebarBg}`,
            }}
          />
        )}

        {/* Chevron for expandable items (expanded mode) */}
        {hasChildren && !isCollapsed && (
          <ChevronRight
            size={14}
            strokeWidth={2}
            style={{
              ...styles.chevron,
              ...(isExpanded ? styles.chevronOpen : {}),
            }}
          />
        )}

        {/* Tooltip on hover (collapsed mode, no children only) */}
        {isCollapsed && isHovered && !hasChildren && (
          <>
            <span style={styles.tooltipArrow} />
            <span style={styles.tooltip}>
              {item.label}
              {item.badge ? (
                <span
                  style={{
                    marginLeft: '8px',
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(167, 139, 250, 0.3))',
                    color: '#C4B5FD',
                    padding: '2px 8px',
                    borderRadius: '8px',
                    fontSize: theme.typography.fontSize.xs,
                    fontWeight: theme.typography.fontWeight.bold,
                  }}
                >
                  {item.badge}
                </span>
              ) : null}
            </span>
          </>
        )}

        {/* Tooltip for parent with children (collapsed mode, only when NOT expanded) */}
        {isCollapsed && isHovered && hasChildren && !isExpanded && (
          <>
            <span style={styles.tooltipArrow} />
            <span style={styles.tooltip}>{item.label}</span>
          </>
        )}
      </button>

      {/* Children: render when expanded in BOTH collapsed and expanded sidebar */}
      {hasChildren && isExpanded && (
        <div>
          {item.children!.map((child) => (
            <SidebarMenuItemComponent
              key={child.id}
              item={child}
              isCollapsed={isCollapsed}
              isActive={activePath === child.path}
              activePath={activePath}
              onNavigate={onNavigate}
              isChild
            />
          ))}
          {/* Divider after children group in collapsed mode */}
          {isCollapsed && <div style={styles.childrenDivider} />}
        </div>
      )}
    </>
  );
};

export default SidebarMenuItemComponent;
