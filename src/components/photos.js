import React, { useState, useEffect } from 'react';
import Image from 'gatsby-image';
import { getFixedImageObject } from 'gatsby-transformer-cloudinary';
import styles from '../styles/photos.module.css';
import { useSfx } from '../hooks/use-sfx';
import { Button } from './button';

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
  const [fixed, setFixed] = useState(false);
  const { playClick, playPop } = useSfx();

  useEffect(() => {
    getFixedImageObject({
      public_id: photo.publicId,
      cloudName: 'jlengstorf',
      originalHeight: photo.height,
      originalWidth: photo.width,
      width: 50,
      transformations: ['g_faces', 'c_thumb', 'ar_1'],
    }).then(setFixed);
  }, [photo]);

  return fixed ? (
    <li className={styles.thumb}>
      <Button
        className={styles.thumbLink}
        hoverSound={playPop}
        clickSound={playClick}
        handleClick={handleClick}
      >
        <Image
          className={`${styles.thumbnail} ${isCurrent ? styles.active : ''}`}
          fixed={fixed}
          alt={photo.alt}
        />
      </Button>
    </li>
  ) : null;
}

export function Photos({ className }) {
  const [currentImage, setCurrentImage] = useState(photos[0]);
  const [fixed, setFixed] = useState(false);

  useEffect(() => {
    getFixedImageObject({
      public_id: currentImage.publicId,
      cloudName: 'jlengstorf',
      originalHeight: currentImage.height,
      originalWidth: currentImage.width,
      width: 400,
      transformations: ['g_faces', 'c_fill', 'ar_1'],
    }).then(setFixed);
  }, [currentImage]);

  return (
    <div className={className}>
      <figure className={styles.image}>
        {fixed && (
          <Image fixed={fixed} src={currentImage.url} alt={currentImage.alt} />
        )}
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
