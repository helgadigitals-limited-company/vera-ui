"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useSafeSearchParams() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const searchParams = useSearchParams();
  
  return isClient ? searchParams : null;
}
