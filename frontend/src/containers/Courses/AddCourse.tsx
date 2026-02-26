import React, { useState } from 'react';
import { addCourse, type Environment } from '../../services/apiService';
import { useToast } from '../../components/Toast';
import { theme } from '../../styles/GlobalStyles';

const portals: { label: string; value: Environment }[] = [
  { label: 'Beta', value: 'beta' },
  { label: 'Gamma', value: 'gamma' },
  { label: 'Prod', value: 'prod' },
];

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const AddCourse: React.FC = () => {
  const [courseId, setCourseId] = useState('');
  const [portal, setPortal] = useState<Environment>('beta');
  const [submitting, setSubmitting] = useState(false);
  const [courseIdError, setCourseIdError] = useState<string | null>(null);
  const [inputFocused, setInputFocused] = useState(false);
  const { addToast } = useToast();

  const validateCourseId = (value: string): boolean => {
    if (!value.trim()) {
      setCourseIdError('Course ID is required');
      return false;
    }
    if (!UUID_REGEX.test(value.trim())) {
      setCourseIdError('Please enter a valid UUID (e.g., 9d8188cb-fcd7-4390-8494-9c80b00caaee)');
      return false;
    }
    setCourseIdError(null);
    return true;
  };

  const handleCourseIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCourseId(value);
    if (courseIdError) {
      validateCourseId(value);
    }
  };

  const handleSubmit = async () => {
    if (!validateCourseId(courseId)) return;

    setSubmitting(true);
    try {
      await addCourse(portal, {
        course_id: courseId.trim(),
        portal,
      });
      addToast({ type: 'success', message: `Course added successfully to ${portal}!` });
      setCourseId('');
    } catch (err) {
      addToast({
        type: 'error',
        message: err instanceof Error ? err.message : 'Failed to add course',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getInputBorderColor = () => {
    if (courseIdError) return theme.colors.error;
    if (inputFocused) return theme.colors.accent;
    return theme.colors.border;
  };

  const getInputBoxShadow = () => {
    if (courseIdError) return '0 0 0 3px rgba(239, 68, 68, 0.1)';
    if (inputFocused) return theme.shadows.inputFocus;
    return theme.shadows.input;
  };

  return (
    <div className="form-page" style={styles.page}>
      <div>
        <h2 style={styles.title}>Add Course</h2>
        <p style={styles.subtitle}>Add an existing course by its UUID to a specific portal environment</p>
      </div>

      <div style={styles.formCard}>
        {/* Course ID Field */}
        <div style={styles.field}>
          <label style={styles.label}>
            Course ID <span style={{ color: theme.colors.error }}>*</span>
          </label>
          <input
            type="text"
            value={courseId}
            onChange={handleCourseIdChange}
            onFocus={() => setInputFocused(true)}
            onBlur={() => {
              setInputFocused(false);
              if (courseId) validateCourseId(courseId);
            }}
            placeholder="e.g., 9d8188cb-fcd7-4390-8494-9c80b00caaee"
            style={{
              ...styles.input,
              borderColor: getInputBorderColor(),
              boxShadow: getInputBoxShadow(),
              fontFamily: theme.typography.fontFamilyMono,
            }}
          />
          {courseIdError && <span style={styles.errorText}>{courseIdError}</span>}
          {!courseIdError && <span style={styles.hint}>Enter a valid UUID for the course</span>}
        </div>

        {/* Portal Field */}
        <div style={styles.field}>
          <label style={styles.label}>Portal</label>
          <div className="portal-group" style={styles.portalGroup}>
            {portals.map((p) => {
              const isSelected = portal === p.value;
              const dotColor = p.value === 'beta' ? '#6366F1' : p.value === 'gamma' ? '#F59E0B' : '#EF4444';
              return (
                <button
                  key={p.value}
                  onClick={() => setPortal(p.value)}
                  style={{
                    ...styles.portalOption,
                    borderColor: isSelected ? dotColor : theme.colors.border,
                    backgroundColor: isSelected
                      ? p.value === 'beta' ? '#EEF2FF'
                      : p.value === 'gamma' ? '#FFFBEB'
                      : '#FEF2F2'
                      : theme.colors.white,
                    color: isSelected
                      ? p.value === 'beta' ? '#4338CA'
                      : p.value === 'gamma' ? '#B45309'
                      : '#DC2626'
                      : theme.colors.textSecondary,
                    boxShadow: isSelected ? `0 0 0 3px ${dotColor}15` : 'none',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: dotColor,
                      flexShrink: 0,
                    }}
                  />
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <div style={styles.actions}>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            style={{
              ...styles.submitBtn,
              opacity: submitting ? 0.7 : 1,
              cursor: submitting ? 'not-allowed' : 'pointer',
            }}
          >
            {submitting ? 'Adding...' : 'Add Course'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '600px',
    margin: '0 auto',
    justifyContent: 'center',
    minHeight: '100%',
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
    margin: '6px 0 0 0',
    lineHeight: 1.5,
  },
  formCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.layout.borderRadiusLg,
    border: `1px solid ${theme.colors.border}`,
    padding: '28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    boxShadow: theme.shadows.card,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textPrimary,
  },
  input: {
    width: '100%',
    height: '44px',
    padding: '0 14px',
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.layout.borderRadiusSm,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textPrimary,
    outline: 'none',
    transition: 'all 150ms ease',
    fontFamily: theme.typography.fontFamilyMono,
    boxSizing: 'border-box' as const,
    backgroundColor: theme.colors.white,
  },
  hint: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textMuted,
  },
  errorText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.error,
    fontWeight: theme.typography.fontWeight.medium,
  },
  portalGroup: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  portalOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    borderRadius: theme.layout.borderRadiusSm,
    border: `1.5px solid ${theme.colors.border}`,
    backgroundColor: theme.colors.white,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: 'pointer',
    transition: 'all 150ms ease',
    fontFamily: theme.typography.fontFamily,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-start',
    paddingTop: '12px',
    borderTop: `1px solid ${theme.colors.borderLight}`,
    marginTop: '4px',
  },
  submitBtn: {
    padding: '10px 28px',
    borderRadius: theme.layout.borderRadiusSm,
    border: 'none',
    backgroundColor: theme.colors.accent,
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: 'pointer',
    fontFamily: theme.typography.fontFamily,
    transition: 'all 150ms ease',
    boxShadow: '0 1px 3px rgba(99, 102, 241, 0.3)',
  },
};

export default AddCourse;
