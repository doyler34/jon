"use client"
import { useEffect } from 'react';

export default function ComingSoon() {
  useEffect(() => {
    document.body.classList.add('coming-soon');
    return () => document.body.classList.remove('coming-soon');
  }, []);

  return (
    <div className="container">
      <div className="content">
        <h1>JON SPIRIT</h1>
        <p className="subtitle">Something amazing is coming soon</p>
        <div className="social-section">
          <p>Follow on Instagram for updates</p>
          <a href="https://instagram.com/jonspirit.mp4" className="instagram-link" target="_blank" rel="noopener noreferrer">
            @jonspirit.mp4
          </a>
        </div>
      </div>
    </div>
  );
} 