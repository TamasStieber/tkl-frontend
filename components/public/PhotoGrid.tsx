import { Photo } from '@/interfaces/interfaces';
import styles from '@/styles/Home.module.css';
import React, { useState } from 'react';
import PhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';

interface PhotoGridProps {
  photos: Photo[];
}

const PhotoGrid = ({ photos }: PhotoGridProps) => {
  const [index, setIndex] = useState(-1);

  const convertedPhotos = photos.map((photo) => {
    return { src: photo.url, width: 800, height: 800 };
  });

  return (
    <>
      <div className={styles.photo_grid}>
        <PhotoAlbum
          layout='rows'
          photos={convertedPhotos}
          targetRowHeight={250}
          onClick={() => setIndex(0)}
          rowConstraints={{ minPhotos: 1, maxPhotos: 3 }}
        />
      </div>
      <Lightbox
        slides={convertedPhotos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Thumbnails, Zoom]}
      />
    </>
  );
};

export default PhotoGrid;
