import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { UserProfile } from './TopBar.types.ts';
import { getTopBarStyles } from './TopBar.styles.ts';

interface UserMenuProps {
  user: UserProfile;
  sidebarWidth: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, sidebarWidth }) => {
  const [isHovered, setIsHovered] = useState(false);
  const styles = getTopBarStyles(sidebarWidth);

  // Generate initials from name
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <button
      style={{
        ...styles.userProfile,
        ...(isHovered ? styles.userProfileHover : {}),
        border: 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="User menu"
      aria-haspopup="true"
    >
      {/* Avatar */}
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          style={{ ...styles.avatar, objectFit: 'cover' as const }}
        />
      ) : (
        <div style={styles.avatar}>{initials}</div>
      )}

      {/* User info - hidden on tablet via CSS */}
      <div className="topbar-user-info" style={styles.userInfo as React.CSSProperties}>
        <span style={styles.userName}>{user.name}</span>
        <span style={styles.userRole}>{user.role}</span>
      </div>

      <span className="topbar-user-chevron">
        <ChevronDown size={14} color="#94A3B8" />
      </span>
    </button>
  );
};

export default UserMenu;
