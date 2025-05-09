// components/TodayDate.tsx
'use client'; // Required for client-side rendering

import React from 'react';

const TodayDate: React.FC = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',    // "Monday"
    year: 'numeric',    // "2025"
    month: 'long',      // "May"
    day: 'numeric'      // "7"
  });

  return <p>{formattedDate}</p>;
};

export default TodayDate;
