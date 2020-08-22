import React, { useState } from 'react';
import { useSfx } from '../hooks/use-sfx.js';
import { Button } from './button.js';
import { Image } from './image.js';

// this is how we import styles, because my life is a nightmare
const styles = preval`
  const fs = require('fs');
  const path = require('path');
  const parsedStylePath = path.resolve(__dirname, '../styles/photos.module.css.json');
  const styleJSON = fs.readFileSync(parsedStylePath, 'utf-8');

  module.exports = JSON.parse(styleJSON);
`;

const photos = [
  {
    publicId: 'jason.af/jason-lengstorf-tokyo',
    alt: 'Jason Lengstorf smiling and raising an eyebrow in a park.',
    caption: 'This is Jason’s most common profile photo.',
    credit: 'paint with stars',
    creditLink: 'https://paintwithstars.com/',
    width: 5760,
    height: 3840,
  },
  {
    publicId: 'jason.af/jason-lengstorf-hat',
    alt:
      'Jason Lengstorf wearing a hat and staring at the camera with a death glare.',
    caption: 'Jason is afflicted with Resting Murder Face™.',
    credit: 'Marisa Morby',
    creditLink: 'https://www.marisamorby.com',
    width: 3000,
    height: 2000,
  },
  {
    publicId: 'jason.af/jason-lengstorf-web-unleashed',
    alt: 'Jason Lengstorf smiling and holding his arms up high.',
    caption: '“I love hugs thiiiiiiiis much!”',
    credit: 'Web Unleashed',
    creditLink: 'https://fitc.ca/event/webu19/',
    width: 3000,
    height: 2000,
  },
  {
    publicId: 'jason.af/jason-lengstorf-bridge',
    alt:
      'Jason Lengstorf crossing his arms and smiling in front of a concrete wall.',
    caption: 'Smiling on bridges is one of Jason’s favorite hobbies.',
    credit: 'paint with stars',
    creditLink: 'https://paintwithstars.com/',
    width: 5760,
    height: 3840,
  },
  {
    publicId: 'jason.af/jason-lengstorf-web-unleashed-keynote',
    alt: 'Jason Lengstorf on stage giving a keynote presentation.',
    caption: 'Jason on stage at Web Unleashed 2019.',
    credit: 'Web Unleashed',
    creditLink: 'https://fitc.ca/event/webu19/',
    width: 3000,
    height: 2000,
  },
  {
    publicId: 'jason.af/jason-lengstorf-piggyback',
    alt: 'Jason Lengstorf giving Marisa Morby a piggyback ride.',
    caption: 'Piggyback rides!',
    credit: 'La Boutique de la Luz',
    creditLink: 'https://www.laboutiquedelaluz.com/',
    width: 4656,
    height: 3103,
  },
];

function Thumb({ photo, handleClick, isCurrent }) {
  const { playClick, playPop } = useSfx();

  return (
    <li className={styles.thumb}>
      <Button
        className={styles.thumbLink}
        hoverSound={playPop}
        clickSound={playClick}
        handleClick={handleClick}
      >
        <Image
          publicId={photo.publicId}
          alt={photo.alt}
          width={50}
          height={50}
          transformations={['g_faces', 'c_thumb']}
        />
      </Button>
    </li>
  );
}

export function Photos({ className }) {
  const [currentImage, setCurrentImage] = useState(photos[0]);

  return (
    <div className={className}>
      <figure className={styles.image}>
        <Image
          publicId={currentImage.publicId}
          alt={currentImage.alt}
          width={400}
          height={400}
          transformations={['g_faces', 'c_fill']}
        />
        <figcaption>
          {currentImage.caption}
          <div className={styles.links}>
            <a
              className={styles.fullSize}
              target="_blank"
              rel="noopener noreferrer"
              href={`https://res.cloudinary.com/jlengstorf/image/upload/${currentImage.publicId}.jpg`}
            >
              open full size
            </a>
            <span className={styles.credit}>
              Photo: <a href={currentImage.creditLink}>{currentImage.credit}</a>
            </span>
          </div>
        </figcaption>
      </figure>
      <div className={styles.morePhotos}>
        <h3 className={styles.photoHeading}>
          You can use any of these photos with credit:
        </h3>
        <ul className={styles.thumbnails}>
          {photos.map((photo, index) => (
            <Thumb
              key={`photo-${index}`}
              photo={photo}
              isCurrent={currentImage.publicId === photo.publicId}
              handleClick={() => {
                setCurrentImage(photo);
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
