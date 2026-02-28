'use client';

import { PropsWithChildren } from 'react';
import useApiInterceptors from '@/hooks/useApiInterceptors';

export default function ApiInterceptorsProvider({ children }: PropsWithChildren) {
  // initialize API interceptors (registers request interceptor)
  useApiInterceptors();

  return <>{children}</>;
}
