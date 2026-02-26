import type { SidebarSection } from './Sidebar.types';

export const sidebarConfig: SidebarSection[] = [
  {
    id: 'main',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'LayoutDashboard',
        path: '/dashboard',
      },
    ],
  },
  {
    id: 'content',
    title: 'Content',
    items: [
      {
        id: 'courses',
        label: 'Courses',
        icon: 'BookOpen',
        path: '/courses',
        badge: 12,
        children: [
          { id: 'all-courses', label: 'All Courses', icon: 'List', path: '/courses/all' },
          { id: 'add-course', label: 'Add Course', icon: 'Plus', path: '/courses/add' },
        ],
      },
      {
        id: 'sessions',
        label: 'Sessions',
        icon: 'Video',
        path: '/sessions',
      },
      {
        id: 'questions',
        label: 'Question Bank',
        icon: 'HelpCircle',
        path: '/questions',
        badge: 48,
      },
      {
        id: 'resources',
        label: 'Resources',
        icon: 'FileText',
        path: '/resources',
      },
    ],
  },
  {
    id: 'management',
    title: 'Management',
    items: [
      {
        id: 'universities',
        label: 'Universities',
        icon: 'GraduationCap',
        path: '/universities',
      },
      {
        id: 'instructors',
        label: 'Instructors',
        icon: 'Users',
        path: '/instructors',
      },
      {
        id: 'analytics',
        label: 'Analytics',
        icon: 'BarChart3',
        path: '/analytics',
      },
    ],
  },
  {
    id: 'system',
    title: 'System',
    items: [
      {
        id: 'settings',
        label: 'Settings',
        icon: 'Settings',
        path: '/settings',
      },
    ],
  },
];