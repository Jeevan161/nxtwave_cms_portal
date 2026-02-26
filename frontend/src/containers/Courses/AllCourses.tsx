import React, { useState, useEffect } from 'react';
import EnvironmentTabs from '../../components/EnvironmentTabs/EnvironmentTabs';
import { fetchCourses, type Environment, type Course } from '../../services/apiService';
import { theme } from '../../styles/GlobalStyles';

const ENV_BASE_URLS: Record<Environment, string> = {
  beta: 'https://learning-beta.earlywave.in',
  gamma: 'https://learning-gamma.earlywave.in',
  prod: 'https://learning.earlywave.in',
};

const CourseCard: React.FC<{ course: Course; activeEnv: Environment; formatDuration: (d: string) => string }> = ({
  course,
  activeEnv,
  formatDuration,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        boxShadow: isHovered ? theme.shadows.cardHover : theme.shadows.card,
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        borderColor: isHovered ? theme.colors.accentLight : theme.colors.border,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="card-image" style={styles.imageWrapper}>
        <img
          src={course.multimedia_url}
          alt={course.course_name}
          style={styles.image}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://via.placeholder.com/400x200?text=No+Image';
          }}
        />
        <span style={styles.categoryBadge}>
          {course.course_category === '---------' ? 'Uncategorized' : course.course_category}
        </span>
      </div>

      {/* Content */}
      <div style={styles.cardContent}>
        <h3 style={styles.courseName}>{course.course_name}</h3>
        <p style={styles.courseDescription}>{course.description}</p>

        <div style={styles.courseIdRow}>
          <span style={styles.courseIdLabel}>ID:</span>
          <span style={styles.courseIdFull}>{course.course_id}</span>
        </div>

        <div style={styles.cardFooter}>
          <div style={styles.metaItem}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{formatDuration(course.duration)}</span>
          </div>
          <a
            href={`${ENV_BASE_URLS[activeEnv]}/course?c_id=${course.course_id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.courseLink}
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Open Course
          </a>
        </div>
      </div>
    </div>
  );
};

const AllCourses: React.FC = () => {
  const [activeEnv, setActiveEnv] = useState<Environment>('beta');
  const [courses, setCourses] = useState<Course[]>([]);
  const [totalCourses, setTotalCourses] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCourses(activeEnv);
        setCourses(data.courses);
        setTotalCourses(data.total_courses);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch courses');
        setCourses([]);
        setTotalCourses(0);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, [activeEnv]);

  const formatDuration = (duration: string): string => {
    const parts = duration.split(':');
    if (parts.length === 3) {
      const hours = parseInt(parts[0], 10);
      const mins = parseInt(parts[1], 10);
      if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
      if (hours > 0) return `${hours}h`;
      return `${mins}m`;
    }
    return duration;
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div className="page-header" style={styles.header}>
        <div>
          <h2 style={styles.title}>All Courses</h2>
          <p style={styles.subtitle}>
            {loading ? 'Loading...' : `${totalCourses} courses found in ${activeEnv}`}
          </p>
        </div>
        <EnvironmentTabs activeEnv={activeEnv} onEnvChange={setActiveEnv} />
      </div>

      {/* Error State */}
      {error && (
        <div style={styles.errorBanner}>
          <div style={styles.errorIcon}>!</div>
          <span>{error}</span>
          <button onClick={() => setActiveEnv(activeEnv)} style={styles.retryBtn}>
            Retry
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="course-grid" style={styles.loadingGrid}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} style={styles.skeletonCard}>
              <div className="card-image" style={styles.skeletonImage} />
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ ...styles.skeletonLine, width: '70%', height: '14px' }} />
                <div style={{ ...styles.skeletonLine, width: '100%' }} />
                <div style={{ ...styles.skeletonLine, width: '40%' }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Course Grid */}
      {!loading && !error && courses.length > 0 && (
        <div className="course-grid" style={styles.grid}>
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              activeEnv={activeEnv}
              formatDuration={formatDuration}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && courses.length === 0 && (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <p style={styles.emptyTitle}>No courses found</p>
          <p style={styles.emptySubtitle}>
            No courses available in the <strong>{activeEnv}</strong> environment
          </p>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '16px',
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    margin: 0,
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textMuted,
    margin: '4px 0 0 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.layout.borderRadiusLg,
    border: `1px solid ${theme.colors.border}`,
    overflow: 'hidden',
    transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    boxShadow: theme.shadows.card,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: '170px',
    backgroundColor: theme.colors.background,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 300ms ease',
  },
  categoryBadge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    color: '#FFFFFF',
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    padding: '4px 10px',
    borderRadius: '6px',
    backdropFilter: 'blur(8px)',
    letterSpacing: '0.01em',
  },
  cardContent: {
    padding: '16px 18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  courseName: {
    fontSize: '15px',
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    margin: 0,
    lineHeight: 1.4,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  } as React.CSSProperties,
  courseDescription: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textSecondary,
    margin: 0,
    lineHeight: 1.5,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  } as React.CSSProperties,
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px',
    paddingTop: '12px',
    borderTop: `1px solid ${theme.colors.borderLight}`,
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textMuted,
  },
  courseIdRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '4px',
    backgroundColor: theme.colors.background,
    padding: '6px 8px',
    borderRadius: '6px',
  },
  courseIdLabel: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textMuted,
    fontWeight: theme.typography.fontWeight.medium,
    flexShrink: 0,
  },
  courseIdFull: {
    fontSize: '11px',
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamilyMono,
    wordBreak: 'break-all',
    lineHeight: 1.4,
  } as React.CSSProperties,
  courseLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.accent,
    textDecoration: 'none',
    fontWeight: theme.typography.fontWeight.medium,
    padding: '4px 10px',
    borderRadius: '6px',
    backgroundColor: theme.colors.accentLight + '33',
    transition: 'all 150ms ease',
  },
  errorBanner: {
    backgroundColor: theme.colors.errorLight,
    border: `1px solid #FECACA`,
    borderRadius: theme.layout.borderRadius,
    padding: '14px 18px',
    color: theme.colors.error,
    fontSize: theme.typography.fontSize.md,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  errorIcon: {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    backgroundColor: theme.colors.error,
    color: '#FFFFFF',
    fontSize: '12px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  retryBtn: {
    marginLeft: 'auto',
    padding: '6px 16px',
    borderRadius: theme.layout.borderRadiusSm,
    border: '1px solid #FECACA',
    backgroundColor: theme.colors.white,
    color: theme.colors.error,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: 'pointer',
    fontFamily: theme.typography.fontFamily,
    transition: 'all 150ms ease',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 20px',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.layout.borderRadiusLg,
    border: `2px dashed ${theme.colors.border}`,
  },
  emptyIcon: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    backgroundColor: theme.colors.background,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  emptyTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    margin: 0,
  },
  emptySubtitle: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textMuted,
    marginTop: '4px',
  },
  loadingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  skeletonCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.layout.borderRadiusLg,
    border: `1px solid ${theme.colors.border}`,
    overflow: 'hidden',
  },
  skeletonImage: {
    width: '100%',
    height: '170px',
    backgroundColor: theme.colors.background,
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  skeletonLine: {
    height: '12px',
    backgroundColor: theme.colors.background,
    borderRadius: '6px',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
};

export default AllCourses;
