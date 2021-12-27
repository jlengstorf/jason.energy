import { h } from 'preact';
import { useBoop } from '../hooks/use-boop.js';

export function BoopDrop(props) {
  const { boopRef } = useBoop();

  return (
    <canvas
      ref={boopRef}
      class={props.class}
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
