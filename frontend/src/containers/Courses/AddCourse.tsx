import React, { useState } from 'react';
import { addCourse, type Environment } from '../../services/apiService';
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
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [courseIdError, setCourseIdError] = useState<string | null>(null);

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
    setResult(null);
    try {
      await addCourse(portal, {
        course_id: courseId.trim(),
        portal,
      });
      setResult({ type: 'success', message: `Course added successfully to ${portal}!` });
      setCourseId('');
    } catch (err) {
      setResult({
        type: 'error',
        message: err instanceof Error ? err.message : 'Failed to add course',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-page" style={styles.page}>
      <div>
        <h2 style={styles.title}>Add Course</h2>
        <p style={styles.subtitle}>Add an existing course by its UUID to a specific portal environment</p>
      </div>

      <div style={styles.formCard}>
        {/* Result Banner */}
        {result && (
          <div
            style={{
              ...styles.resultBanner,
              backgroundColor: result.type === 'success' ? '#F0FDF4' : '#FEF2F2',
              borderColor: result.type === 'success' ? '#BBF7D0' : '#FECACA',
              color: result.type === 'success' ? '#166534' : '#DC2626',
            }}
          >
            <span style={{ fontWeight: 600 }}>
              {result.type === 'success' ? '✓' : '✕'}
            </span>
            {result.message}
            <button
              onClick={() => setResult(null)}
              style={styles.dismissBtn}
            >
              ✕
            </button>
          </div>
        )}

        {/* Course ID Field */}
        <div style={styles.field}>
          <label style={styles.label}>
            Course ID <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <input
            type="text"
            value={courseId}
            onChange={handleCourseIdChange}
            onBlur={() => courseId && validateCourseId(courseId)}
            placeholder="e.g., 9d8188cb-fcd7-4390-8494-9c80b00caaee"
            style={{
              ...styles.input,
              borderColor: courseIdError ? '#EF4444' : '#E2E8F0',
              fontFamily: theme.typography.fontFamilyMono,
            }}
          />
          {courseIdError && <span style={styles.errorText}>{courseIdError}</span>}
          <span style={styles.hint}>Enter a valid UUID for the course</span>
        </div>

        {/* Portal Field */}
        <div style={styles.field}>
          <label style={styles.label}>Portal</label>
          <div className="portal-group" style={styles.portalGroup}>
            {portals.map((p) => {
              const isSelected = portal === p.value;
              return (
                <button
                  key={p.value}
                  onClick={() => setPortal(p.value)}
                  style={{
                    ...styles.portalOption,
                    borderColor: isSelected ? '#3B82F6' : '#E2E8F0',
                    backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                    color: isSelected ? '#1D4ED8' : theme.colors.textSecondary,
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor:
                        p.value === 'beta' ? '#3B82F6' : p.value === 'gamma' ? '#F59E0B' : '#EF4444',
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
    lineHeight: 1.5,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #E2E8F0',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: 600,
    color: theme.colors.textPrimary,
  },
  input: {
    width: '100%',
    height: '40px',
    padding: '0 12px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    fontSize: '13px',
    color: theme.colors.textPrimary,
    outline: 'none',
    transition: 'border-color 150ms ease',
    fontFamily: theme.typography.fontFamilyMono,
    boxSizing: 'border-box' as const,
  },
  hint: {
    fontSize: '11px',
    color: theme.colors.textMuted,
  },
  errorText: {
    fontSize: '12px',
    color: '#EF4444',
    fontWeight: 500,
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
    borderRadius: '8px',
    border: '1.5px solid #E2E8F0',
    backgroundColor: '#FFFFFF',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 150ms ease',
    fontFamily: theme.typography.fontFamily,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-start',
    paddingTop: '8px',
    borderTop: '1px solid #F1F5F9',
    marginTop: '4px',
  },
  submitBtn: {
    padding: '10px 24px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: theme.typography.fontFamily,
    transition: 'opacity 150ms ease',
  },
  resultBanner: {
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  dismissBtn: {
    marginLeft: 'auto',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    color: 'inherit',
    opacity: 0.6,
    padding: '0 4px',
  },
};

export default AddCourse;
