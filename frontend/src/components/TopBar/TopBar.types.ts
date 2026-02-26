export interface TopBarProps {
  isSidebarCollapsed: boolean;
  pageTitle: string;
  breadcrumbs?: BreadcrumbItem[];
  onSearch?: (query: string) => void;
  isMobile?: boolean;
  onToggleMobileSidebar?: () => void;
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role: string;
}
