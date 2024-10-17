"use client"
import NavBar from '@/components/NavBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const queryClient = new QueryClient();
const layout = ({children}) => {
  return (
    <div>
      <NavBar/>
                <QueryClientProvider client={queryClient}>

      {children}
      </QueryClientProvider>
    </div>
  )
}

export default layout
