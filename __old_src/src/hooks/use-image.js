import { useState } from 'preact/hooks';

export function useImage({ cloudName }) {
  const [url, setUrl] = useState();

  const generateUrl = ({ publicId, transformations }) => {
    const host = `https://res.cloudinary.com/${cloudName}/image/upload`;
    const transformationString = [
      'q_auto',
      'f_auto',
      'c_fill',
      ...transformations,
    ].join(',');

    setUrl(`${host}/${transformationString}/${publicId}`);
  };

  return { url, generateUrl };
}
