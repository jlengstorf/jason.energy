/** @jsx h */
import { h } from 'preact';

export function Image({
  wrapperClass = '',
  imageClass = '',
  alt,
  publicId,
  width,
  height,
  transformations = [],
}) {
  const host = 'https://res.cloudinary.com/jlengstorf/image/upload';
  const transformationString = [
    'q_auto',
    'f_auto',
    'c_fill',
    `w_${width}`,
    `h_${height}`,
    ...transformations,
  ].join(',');

  const url = `${host}/${transformationString}/${publicId}`;

  return (
    <div
      class={wrapperClass}
      style={{
        height: 0,
        maxWidth: '100%',
        paddingBottom: `${(height / width) * 100}%`,
        position: 'relative',
        width: `${width}px`,
      }}
    >
      <img
        loading="lazy"
        src={url}
        alt={alt}
        class={imageClass}
        height={height}
        width={width}
        style={{
          height: '100%',
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
        }}
      />
    </div>
  );
}
