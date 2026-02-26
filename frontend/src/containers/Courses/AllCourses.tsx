import React, { useState, useEffect } from 'react';
import EnvironmentTabs from '../../components/EnvironmentTabs/EnvironmentTabs';
import { fetchCourses, type Environment, type Course } from '../../services/apiService';
import { theme } from '../../styles/GlobalStyles';

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
          <span style={{ fontWeight: 600 }}>Error:</span> {error}
          <button onClick={() => setActiveEnv(activeEnv)} style={styles.retryBtn}>
            Retry
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="course-grid" style={styles.loadingGrid}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={styles.skeletonCard}>
              <div className="card-image" style={styles.skeletonImage} />
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ ...styles.skeletonLine, width: '70%' }} />
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
            <div key={course.id} style={styles.card}>
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

                <div style={styles.cardFooter}>
                  <div style={styles.metaItem}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{formatDuration(course.duration)}</span>
                  </div>
                  <span style={styles.courseId} title={course.course_id}>
                    {course.course_id.slice(0, 8)}...
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && courses.length === 0 && (
        <div style={styles.emptyState}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <p style={{ fontSize: '14px', color: '#94A3B8', marginTop: '12px' }}>
            No courses found in <strong>{activeEnv}</strong> environment
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
    fontSize: '20px',
    fontWeight: 700,
    color: theme.colors.textPrimary,
    margin: 0,
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '13px',
    color: theme.colors.textMuted,
    margin: '4px 0 0 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #E2E8F0',
    overflow: 'hidden',
    transition: 'box-shadow 200ms ease, transform 200ms ease',
    cursor: 'pointer',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: '160px',
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  categoryBadge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    color: '#FFFFFF',
    fontSize: '11px',
    fontWeight: 600,
    padding: '4px 10px',
    borderRadius: '6px',
    backdropFilter: 'blur(4px)',
  },
  cardContent: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  courseName: {
    fontSize: '15px',
    fontWeight: 600,
    color: theme.colors.textPrimary,
    margin: 0,
    lineHeight: 1.3,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  } as React.CSSProperties,
  courseDescription: {
    fontSize: '13px',
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
    borderTop: '1px solid #F1F5F9',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: theme.colors.textMuted,
  },
  courseId: {
    fontSize: '11px',
    color: theme.colors.textMuted,
    fontFamily: theme.typography.fontFamilyMono,
    backgroundColor: '#F1F5F9',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  errorBanner: {
    backgroundColor: '#FEF2F2',
    border: '1px solid #FECACA',
    borderRadius: '10px',
    padding: '12px 16px',
    color: '#DC2626',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  retryBtn: {
    marginLeft: 'auto',
    padding: '4px 12px',
    borderRadius: '6px',
    border: '1px solid #FECACA',
    backgroundColor: '#FFFFFF',
    color: '#DC2626',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: theme.typography.fontFamily,
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    border: '1px dashed #E2E8F0',
  },
  loadingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  skeletonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #E2E8F0',
    overflow: 'hidden',
  },
  skeletonImage: {
    width: '100%',
    height: '160px',
    backgroundColor: '#F1F5F9',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  skeletonLine: {
    height: '12px',
    backgroundColor: '#F1F5F9',
    borderRadius: '6px',
  },
};

export default AllCourses;
