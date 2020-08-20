import React from 'react';
import { useBoop } from '../hooks/use-boop.js';

export function BoopDrop({ className }) {
  const { boopRef } = useBoop();

  return (
    <canvas
      ref={boopRef}
      className={className}
      style={{
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
      }}
    />
  );
}
