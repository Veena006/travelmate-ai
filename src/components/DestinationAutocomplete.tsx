'use client';

import React, { useState, useEffect, useRef } from 'react';
import { searchDestinations, DestinationOption } from '@/lib/destinations';
import { MapPin, Check, X, Sparkles, Navigation } from 'lucide-react';

interface DestinationAutocompleteProps {
  id?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  error?: string;
  quickSuggestions?: string[];
  required?: boolean;
}

export default function DestinationAutocomplete({
  id,
  name,
  value,
  onChange,
  placeholder = 'e.g. Mumbai, Mysore, Malaysia...',
  label,
  icon: Icon = MapPin,
  error,
  quickSuggestions = ['Mumbai', 'Mangalore', 'Mysore', 'Malaysia', 'Goa'],
  required = false,
}: DestinationAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<DestinationOption[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update suggestions whenever value changes
  useEffect(() => {
    const results = searchDestinations(value, 8);
    setSuggestions(results);
    setHighlightedIndex(-1);
  }, [value]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (destName: string) => {
    onChange(destName);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsOpen(true);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (isOpen && highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        e.preventDefault();
        handleSelect(suggestions[highlightedIndex].name);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Highlight matched prefix or substring
  const renderHighlighted = (text: string, query: string) => {
    if (!query.trim()) return <span>{text}</span>;
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const idx = lowerText.indexOf(lowerQuery);
    if (idx === -1) return <span>{text}</span>;

    const before = text.substring(0, idx);
    const match = text.substring(idx, idx + query.length);
    const after = text.substring(idx + query.length);

    return (
      <span>
        {before}
        <strong className="text-blue-600 dark:text-blue-400 font-extrabold underline decoration-blue-500/50">
          {match}
        </strong>
        {after}
      </span>
    );
  };

  return (
    <div ref={containerRef} className="relative space-y-2">
      {/* Label */}
      <label
        htmlFor={id || name}
        className="block text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between"
      >
        <span className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-blue-500 shrink-0" />
          <span>{label} {required && <span className="text-rose-500">*</span>}</span>
        </span>
        <span className="text-[11px] font-normal text-slate-400 dark:text-slate-500 hidden sm:inline">
          Interactive autocomplete
        </span>
      </label>

      {/* Input container */}
      <div className="relative">
        <input
          ref={inputRef}
          id={id || name}
          type="text"
          name={name}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full px-4 py-3.5 pr-10 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm font-medium shadow-xs"
        />

        {value && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md transition-colors"
            title="Clear text"
            aria-label="Clear input"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown List */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/90 rounded-2xl shadow-2xl overflow-hidden max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80 backdrop-blur-xl">
          <div className="px-3.5 py-2 bg-slate-50 dark:bg-slate-950/70 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
            <span>Suggestions {value ? `for "${value}"` : 'popular destinations'}</span>
            <span>{suggestions.length} places</span>
          </div>

          {suggestions.map((dest, idx) => {
            const isHighlighted = idx === highlightedIndex;
            const isSelected = value.trim().toLowerCase() === dest.name.toLowerCase();

            return (
              <button
                key={`${dest.name}-${idx}`}
                type="button"
                onClick={() => handleSelect(dest.name)}
                onMouseEnter={() => setHighlightedIndex(idx)}
                className={`w-full px-4 py-3 text-left transition-colors flex items-center justify-between gap-3 ${
                  isHighlighted
                    ? 'bg-blue-50 dark:bg-blue-600/20 text-blue-900 dark:text-white'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold truncate">
                      {renderHighlighted(dest.name, value)}
                      <span className="text-xs font-normal text-slate-500 dark:text-slate-400 ml-2">
                        {dest.region}, {dest.country}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5 truncate">
                      <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {dest.category}
                      </span>
                      {dest.popularSpots && dest.popularSpots.length > 0 && (
                        <span className="truncate text-[11px] text-slate-400 dark:text-slate-500">
                          • {dest.popularSpots.slice(0, 2).join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="shrink-0 p-1 text-emerald-600 dark:text-emerald-400">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Quick Suggestion Pills */}
      {quickSuggestions && quickSuggestions.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Quick picks:
          </span>
          {quickSuggestions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleSelect(item)}
              className={`text-xs px-2.5 py-0.5 rounded-full border transition-all ${
                value.toLowerCase() === item.toLowerCase()
                  ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-rose-500 text-xs mt-1 font-medium flex items-center gap-1">
          <span>⚠️</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
