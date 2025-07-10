'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Create the client once per application load
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}