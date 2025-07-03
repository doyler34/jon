import React from "react";

// X (Twitter) Icon
export function XIcon({ className = "w-8 h-8", ...props }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="white" strokeWidth="4" className={className} {...props}>
      <path d="M0 0L120 120M120 0L0 120" />
    </svg>
  );
}

// Facebook Icon
export function FacebookIcon({ className = "w-8 h-8", ...props }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} {...props}>
      <circle cx="16" cy="16" r="16" fill="#1877F3"/>
      <path d="M21 16h-3v8h-4v-8h-2v-3h2v-2c0-2 1-3 3-3h3v3h-2c-1 0-1 .5-1 1v1h3l-1 3z" fill="#fff"/>
    </svg>
  );
}

// YouTube Icon
export function YouTubeIcon({ className = "w-8 h-8", ...props }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} {...props}>
      <circle cx="16" cy="16" r="16" fill="#FF0000"/>
      <polygon points="13,11 23,16 13,21" fill="#fff"/>
    </svg>
  );
} 