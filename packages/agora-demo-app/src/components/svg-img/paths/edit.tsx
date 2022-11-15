import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = (props: PathOptions) => (
  <g fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.75158 13.5685L2.14146 9.2258C2.16764 8.93424 2.29534 8.66105 2.50228 8.45399L7.02993 3.92336L11.9326 9.25755L7.18487 13.8937C6.95131 14.1217 6.63791 14.2494 6.31153 14.2494H2.37408C2.00683 14.2494 1.71874 13.9342 1.75158 13.5685ZM12.5277 8.67649L13.517 7.71042C14.4896 6.76067 14.5251 5.20772 13.5967 4.21458L12.0486 2.55843C11.0829 1.52542 9.45343 1.49822 8.45393 2.49844L7.61806 3.33482L12.5277 8.67649Z"
      fill={props.fill || '#BDBEC6'}
    />
    <path
      d="M9.84882 12.4014L8.02239 14.2279C8.0142 14.2361 8.02001 14.25 8.03151 14.25H13.3128C13.8305 14.25 14.2503 13.8303 14.2503 13.3125C14.2503 12.7947 13.8305 12.375 13.3128 12.375H9.9127C9.8887 12.375 9.86576 12.3845 9.84882 12.4014Z"
      fill={props.fill || '#BDBEC6'}
    />
  </g>
);

export const viewBox = '0 0 16 16';