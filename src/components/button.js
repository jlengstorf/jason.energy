import React from 'react';

export function Button({
  children,
  className,
  handleClick,
  hoverSound,
  clickSound,
  forceSoundEnabled = false,
}) {
  return (
    <button
      className={className}
      onKeyPress={event => {
        if (event.key !== 'Enter') return;
        handleClick();
        clickSound({ forceSoundEnabled });
      }}
      onMouseDown={event => {
        event.preventDefault();
        event.stopPropagation();
        handleClick();
        clickSound({ forceSoundEnabled });
      }}
      onMouseEnter={hoverSound}
      onFocus={hoverSound}
    >
      {children}
    </button>
  );
}
