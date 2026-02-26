import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { getTopBarStyles } from './TopBar.styles.ts';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  sidebarWidth: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, sidebarWidth }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const styles = getTopBarStyles(sidebarWidth);

  // Keyboard shortcut: Ctrl/Cmd + K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape' && isFocused) {
        inputRef.current?.blur();
        setIsFocused(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocused]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.searchWrapper}>
      <span style={styles.searchIcon}>
        <Search size={16} strokeWidth={1.8} />
      </span>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search courses, sessions, questions..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          ...styles.searchInput,
          ...(isFocused ? styles.searchInputFocused : {}),
        }}
        aria-label="Search"
      />
      {!isFocused && (
        <span style={styles.searchShortcut}>⌘K</span>
      )}
    </form>
  );
};

export default SearchBar;