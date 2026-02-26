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
      ...(isChild ? styles.childItem : {}),
      backgroundColor: 'transparent',
      color: colors.sidebarText,
    };

    if (isActive) {
      base.backgroundColor = colors.sidebarActive;
      base.color = colors.sidebarTextActive;
    } else if (isHovered) {
      base.backgroundColor = colors.sidebarHover;
      base.color = colors.sidebarText;
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
        title={isCollapsed ? item.label : undefined}
        aria-label={item.label}
        aria-expanded={hasChildren ? isExpanded : undefined}
      >
        {/* Active indicator bar */}
        {isActive && !isCollapsed && <span style={styles.activeIndicator} />}

        {/* Icon */}
        <span style={styles.menuItemIcon}>
          {IconComponent && <IconComponent size={18} strokeWidth={1.8} />}
        </span>

        {/* Label */}
        <span style={styles.menuItemLabel}>{item.label}</span>

        {/* Badge */}
        {item.badge && !isCollapsed && (
          <span style={styles.badge}>{item.badge}</span>
        )}

        {/* Chevron for expandable items */}
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

        {/* Tooltip for collapsed mode */}
        {isCollapsed && isHovered && (
          <span style={styles.tooltip}>
            {item.label}
            {item.badge ? ` (${item.badge})` : ''}
          </span>
        )}
      </button>

      {/* Children */}
      {hasChildren && isExpanded && !isCollapsed && (
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
        </div>
      )}
    </>
  );
};

export default SidebarMenuItemComponent;