'use client';

import { useState, useEffect } from 'react';

export function VersionBadge() {
  const [version, setVersion] = useState('Loading...');

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const res = await fetch('/api/version');
        if (res.ok) {
          const data = await res.json();
          setVersion(data.version || '1.0.0');
        } else {
          setVersion('1.0.0');
        }
      } catch {
        setVersion('1.0.0');
      }
    };

    fetchVersion();
  }, []);

  return (
    <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 mb-8">
      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
      Latest version {version}
    </div>
  );
}
