import React, { useState, useEffect, useCallback } from 'react';
import EnvironmentTabs from '../../components/EnvironmentTabs/EnvironmentTabs';
import { fetchCourses, getTopics, syncTopics, type Environment, type Course, type Topic } from '../../services/apiService';
import { theme } from '../../styles/GlobalStyles';

const ENV_BASE_URLS: Record<Environment, string> = {
  beta: 'https://learning-beta.earlywave.in',
  gamma: 'https://learning-gamma.earlywave.in',
  prod: 'https://learning.earlywave.in',
};

/* ─── Topic Details Modal ─────────────────────────────────── */

interface TopicModalProps {
  course: Course;
  activeEnv: Environment;
  onClose: () => void;
}

const TopicModal: React.FC<TopicModalProps> = ({ course, activeEnv, onClose }) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = ENV_BASE_URLS[activeEnv];

  const loadTopics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTopics(activeEnv, course.course_id);
      if (data.length > 0) {
        setTopics(data);
      } else {
        const synced = await syncTopics(activeEnv, course.course_id);
        setTopics(synced);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load topics');
    } finally {
      setLoading(false);
    }
  }, [activeEnv, course.course_id]);

  const handleSync = async () => {
    setSyncing(true);
    setError(null);
    try {
      const data = await syncTopics(activeEnv, course.course_id);
      setTopics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sync topics');
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    loadTopics();
  }, [loadTopics]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.container} className="topic-modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div style={modalStyles.header}>
          <div style={modalStyles.headerLeft}>
            <div style={modalStyles.headerIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <div>
              <h2 style={modalStyles.title}>{course.course_name}</h2>
              <p style={modalStyles.subtitle}>
                <span style={modalStyles.envBadge}>{activeEnv}</span>
                <span style={modalStyles.topicCount}>
                  {loading ? 'Loading topics...' : `${topics.length} topics`}
                </span>
              </p>
            </div>
          </div>
          <div style={modalStyles.headerActions}>
            <button
              onClick={handleSync}
              disabled={syncing || loading}
              style={{
                ...modalStyles.syncBtn,
                opacity: (syncing || loading) ? 0.6 : 1,
                cursor: (syncing || loading) ? 'not-allowed' : 'pointer',
              }}
            >
              <svg
                width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={syncing ? { animation: 'spin 1s linear infinite' } : undefined}
              >
                <path d="M21.5 2v6h-6" />
                <path d="M2.5 22v-6h6" />
                <path d="M2.5 11.5a10 10 0 0 1 18.8-4.3" />
                <path d="M21.5 12.5a10 10 0 0 1-18.8 4.2" />
              </svg>
              {syncing ? 'Syncing...' : 'Sync Topics'}
            </button>
            <button onClick={onClose} style={modalStyles.closeBtn} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={modalStyles.body}>
          {/* Error */}
          {error && (
            <div style={modalStyles.errorBanner}>
              <span>{error}</span>
              <button onClick={loadTopics} style={modalStyles.retryBtn}>Retry</button>
            </div>
          )}

          {/* Loading */}
          {loading && !error && (
            <div style={modalStyles.loadingContainer}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} style={modalStyles.skeletonRow}>
                  <div style={{ ...modalStyles.skeletonCircle }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
                    <div style={{ ...modalStyles.skeletonLine, width: '60%' }} />
                    <div style={{ ...modalStyles.skeletonLine, width: '35%', height: '10px' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Topics Table */}
          {!loading && !error && topics.length > 0 && (
            <>
              {/* Table Header */}
              <div style={modalStyles.tableHeader}>
                <span style={{ ...modalStyles.colOrder }}>Order</span>
                <span style={{ ...modalStyles.colName }}>Topic Name</span>
                <span style={{ ...modalStyles.colAction }}>Link</span>
              </div>

              {/* Rows */}
              <div style={modalStyles.tableBody}>
                {topics.map((topic) => (
                  <TopicRow
                    key={topic.id}
                    topic={topic}
                    courseId={course.course_id}
                    baseUrl={baseUrl}
                  />
                ))}
              </div>
            </>
          )}

          {/* Empty */}
          {!loading && !error && topics.length === 0 && (
            <div style={modalStyles.emptyState}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={theme.colors.textMuted} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              <p style={modalStyles.emptyTitle}>No topics found</p>
              <p style={modalStyles.emptySubtitle}>
                Try syncing to fetch topics from the source
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Single Topic Row ────────────────────────────────────── */

const TopicRow: React.FC<{ topic: Topic; courseId: string; baseUrl: string }> = ({
  topic, courseId, baseUrl,
}) => {
  const [hovered, setHovered] = useState(false);
  const topicUrl = `${baseUrl}/course?c_id=${courseId}&t_id=${topic.topic_uuid}`;

  return (
    <div
      style={{
        ...modalStyles.row,
        backgroundColor: hovered ? theme.colors.accentSubtle : 'transparent',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={modalStyles.orderBadge}>{topic.order}</span>
      <div style={modalStyles.topicInfo}>
        <span style={modalStyles.topicName}>{topic.topic_name}</span>
        <span style={modalStyles.topicUuid}>{topic.topic_uuid}</span>
      </div>
      <a
        href={topicUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          ...modalStyles.openBtn,
          backgroundColor: hovered ? theme.colors.accent : 'transparent',
          color: hovered ? '#fff' : theme.colors.accent,
          borderColor: theme.colors.accent,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        <span className="open-btn-text">Open Topic</span>
      </a>
    </div>
  );
};

/* ─── Course Card ─────────────────────────────────────────── */

const CourseCard: React.FC<{
  course: Course;
  activeEnv: Environment;
  formatDuration: (d: string) => string;
  onTopicDetails: (course: Course) => void;
}> = ({ course, activeEnv, formatDuration, onTopicDetails }) => {
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

        {/* Topic Details Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onTopicDetails(course); }}
          style={styles.topicDetailsBtn}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          Topic Details
        </button>
      </div>
    </div>
  );
};

/* ─── All Courses Page ────────────────────────────────────── */

const AllCourses: React.FC = () => {
  const [activeEnv, setActiveEnv] = useState<Environment>('beta');
  const [courses, setCourses] = useState<Course[]>([]);
  const [totalCourses, setTotalCourses] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalCourse, setModalCourse] = useState<Course | null>(null);

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
              onTopicDetails={setModalCourse}
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

      {/* Topic Details Modal */}
      {modalCourse && (
        <TopicModal
          course={modalCourse}
          activeEnv={activeEnv}
          onClose={() => setModalCourse(null)}
        />
      )}
    </div>
  );
};

/* ─── Card Styles ─────────────────────────────────────────── */

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
  topicDetailsBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '7px',
    width: '100%',
    padding: '10px 14px',
    marginTop: '4px',
    borderRadius: theme.layout.borderRadiusSm,
    border: 'none',
    background: `linear-gradient(135deg, ${theme.colors.accent}, #818CF8)`,
    color: '#fff',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily,
    cursor: 'pointer',
    transition: 'all 200ms ease',
    boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
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

/* ─── Modal Styles ────────────────────────────────────────── */

const modalStyles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(17, 14, 43, 0.6)',
    backdropFilter: 'blur(8px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    animation: 'fadeIn 200ms ease',
  },
  container: {
    width: '100%',
    maxWidth: '820px',
    maxHeight: 'calc(100vh - 48px)',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.layout.borderRadiusXl,
    boxShadow: '0 32px 64px -12px rgba(17, 14, 43, 0.3), 0 0 0 1px rgba(99, 102, 241, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    animation: 'modalSlideUp 300ms cubic-bezier(0.32, 0.72, 0, 1)',
  },

  /* Header */
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    padding: '20px 24px',
    borderBottom: `1px solid ${theme.colors.borderLight}`,
    background: `linear-gradient(135deg, ${theme.colors.accentSubtle}, ${theme.colors.background})`,
    flexShrink: 0,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    minWidth: 0,
    flex: 1,
  },
  headerIcon: {
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    background: `linear-gradient(135deg, ${theme.colors.accent}, #818CF8)`,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    margin: 0,
    lineHeight: 1.3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  } as React.CSSProperties,
  subtitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '4px',
  },
  envBadge: {
    fontSize: '10px',
    fontWeight: theme.typography.fontWeight.bold,
    textTransform: 'uppercase',
    color: theme.colors.accent,
    backgroundColor: theme.colors.accentLight,
    padding: '2px 8px',
    borderRadius: '6px',
    letterSpacing: '0.05em',
  } as React.CSSProperties,
  topicCount: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textMuted,
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0,
  },
  syncBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: theme.layout.borderRadiusSm,
    border: `1px solid ${theme.colors.success}55`,
    backgroundColor: theme.colors.successLight,
    color: theme.colors.success,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily,
    transition: 'all 150ms ease',
  },
  closeBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: 'transparent',
    color: theme.colors.textMuted,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 150ms ease',
  },

  /* Body */
  body: {
    flex: 1,
    overflowY: 'auto',
    padding: '0',
  } as React.CSSProperties,

  /* Table */
  tableHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 24px',
    borderBottom: `1px solid ${theme.colors.border}`,
    backgroundColor: theme.colors.background,
    position: 'sticky',
    top: 0,
    zIndex: 1,
    fontSize: '11px',
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  } as React.CSSProperties,
  colOrder: {
    width: '32px',
    marginRight: '48px',
    flexShrink: 0,
    textAlign: 'center',
  } as React.CSSProperties,
  colName: {
    flex: 1,
    minWidth: 0,
  },
  colAction: {
    flexShrink: 0,
    marginLeft: '16px',
    textAlign: 'left',
  } as React.CSSProperties,

  tableBody: {
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties,

  row: {
    display: 'flex',
    alignItems: 'center',
    padding: '14px 24px',
    borderBottom: `1px solid ${theme.colors.borderLight}`,
    transition: 'background-color 120ms ease',
    gap: '0',
  },
  orderBadge: {
    width: '32px',
    height: '32px',
    borderRadius: '10px',
    background: `linear-gradient(135deg, ${theme.colors.accentSubtle}, ${theme.colors.accentLight})`,
    color: theme.colors.accent,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginRight: '48px',
  },
  topicInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
    minWidth: 0,
  } as React.CSSProperties,
  topicName: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    lineHeight: 1.4,
  },
  topicUuid: {
    fontSize: '11px',
    color: theme.colors.textMuted,
    fontFamily: theme.typography.fontFamilyMono,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  } as React.CSSProperties,
  openBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '7px 14px',
    borderRadius: theme.layout.borderRadiusSm,
    border: `1.5px solid ${theme.colors.accent}`,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily,
    textDecoration: 'none',
    transition: 'all 180ms ease',
    flexShrink: 0,
    marginLeft: '16px',
    whiteSpace: 'nowrap',
  } as React.CSSProperties,

  /* Error / Empty / Loading */
  errorBanner: {
    margin: '24px',
    padding: '14px 18px',
    borderRadius: theme.layout.borderRadius,
    backgroundColor: theme.colors.errorLight,
    border: '1px solid #FECACA',
    color: theme.colors.error,
    fontSize: theme.typography.fontSize.md,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  retryBtn: {
    marginLeft: 'auto',
    padding: '6px 14px',
    borderRadius: theme.layout.borderRadiusSm,
    border: '1px solid #FECACA',
    backgroundColor: theme.colors.white,
    color: theme.colors.error,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: 'pointer',
    fontFamily: theme.typography.fontFamily,
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 24px',
    gap: '8px',
  } as React.CSSProperties,
  emptyTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    margin: 0,
  },
  emptySubtitle: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textMuted,
    margin: 0,
  },

  /* Loading skeletons */
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 24px',
    gap: '16px',
  } as React.CSSProperties,
  skeletonRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  skeletonCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '10px',
    backgroundColor: theme.colors.background,
    flexShrink: 0,
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  skeletonLine: {
    height: '13px',
    backgroundColor: theme.colors.background,
    borderRadius: '6px',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
};

export default AllCourses;
