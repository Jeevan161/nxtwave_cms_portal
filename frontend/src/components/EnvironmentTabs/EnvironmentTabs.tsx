import React from 'react';
import type { Environment } from '../../services/apiService';
import { theme } from '../../styles/GlobalStyles';

interface EnvironmentTabsProps {
  activeEnv: Environment;
  onEnvChange: (env: Environment) => void;
}

const environments: { label: string; value: Environment }[] = [
  { label: 'Beta', value: 'beta' },
  { label: 'Gamma', value: 'gamma' },
  { label: 'Prod', value: 'prod' },
];

const EnvironmentTabs: React.FC<EnvironmentTabsProps> = ({ activeEnv, onEnvChange }) => {
  return (
    <div className="env-tabs" style={styles.container}>
      {environments.map((env) => {
        const isActive = activeEnv === env.value;
        return (
          <button
            key={env.value}
            onClick={() => onEnvChange(env.value)}
            style={{
              ...styles.tab,
              ...(isActive ? styles.tabActive : {}),
              ...(env.value === 'prod' && isActive ? styles.tabProd : {}),
            }}
          >
            <span
              style={{
                ...styles.dot,
                backgroundColor:
                  env.value === 'beta'
                    ? '#6366F1'
                    : env.value === 'gamma'
                    ? '#F59E0B'
                    : '#EF4444',
              }}
            />
            {env.label}
          </button>
        );
      })}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    gap: '4px',
    padding: '4px',
    backgroundColor: theme.colors.background,
    borderRadius: theme.layout.borderRadius,
    width: 'fit-content',
    border: `1px solid ${theme.colors.border}`,
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: theme.layout.borderRadiusSm,
    border: 'none',
    backgroundColor: 'transparent',
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    fontFamily: theme.typography.fontFamily,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  tabActive: {
    backgroundColor: theme.colors.white,
    color: theme.colors.textPrimary,
    boxShadow: theme.shadows.sm,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  tabProd: {
    backgroundColor: theme.colors.white,
    color: '#EF4444',
  },
  dot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    flexShrink: 0,
  },
};

export default EnvironmentTabs;
