export interface SidebarMenuItem {
  id: string;
  label: string;
  icon: string;       // Lucide icon name
  path: string;
  badge?: number;
  children?: SidebarMenuItem[];
}

export interface SidebarSection {
  id: string;
  title?: string;     // Optional section header
  items: SidebarMenuItem[];
}

export interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  activePath: string;
  onNavigate: (path: string) => void;
  isMobile?: boolean;
  isMobileOpen?: boolean;
}
