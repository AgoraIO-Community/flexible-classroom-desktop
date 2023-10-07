import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = (props: PathOptions) => (
  <g fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.8889 7.00018C10.8889 9.14819 9.14788 10.8892 6.99987 10.8892C4.85187 10.8892 3.11084 9.14819 3.11084 7.00018C3.11084 4.85217 4.85187 3.11115 6.99987 3.11115C9.14788 3.11115 10.8889 4.85217 10.8889 7.00018Z"
      fill="white"
      fillOpacity="0.5"
      stroke="white"
      strokeWidth="0.875"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.44247 8.23726L6.85742 7.2917V5.25385"
      stroke="white"
      strokeWidth="0.875"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </g>
);

export const viewBox = '0 0 14 14';
