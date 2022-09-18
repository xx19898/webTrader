import React from 'react';
import internal from 'stream';

interface RegisterIconProps{
  height: number
}

export const RegisterIcon = (props:RegisterIconProps) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width={424.25/484.02 * props.height} viewBox="0 0 424.25 484.02">
  <path fill="#fff" d="M73.5 213.6c-1.43 1.53-2.83 3.09-4.22 4.67h4.22Z"/>
  <path fill="#fff" d="M258.18 152.3a80.51 80.51 0 1 0-72.86 0 200.78 200.78 0 0 0-58.82 20.49v45.48H200v53h-73.5v73.5h-53v-73.5H35.75a201.73 201.73 0 0 0-16.5 80.25c0 111.84 90.66 132.5 202.5 132.5s202.5-20.66 202.5-132.5c0-99.4-71.62-182.06-166.07-199.22Z"/>
  <path fill="#020202" d="M200 218.27h-73.5v-73.5h-53v73.5H0v53h73.5v73.5h53v-73.5H200v-53z"/>
</svg>
    );
}
