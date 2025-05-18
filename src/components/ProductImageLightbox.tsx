import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

interface ProductImageLightboxProps {
  images: string[];
  alt: string;
}

const ProductImageLightbox: React.FC<ProductImageLightboxProps> = ({ images, alt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div 
        className="cursor-pointer overflow-hidden rounded-lg transition-transform hover:scale-105"
        onClick={() => setIsOpen(true)}
      >
        <img 
          src={images[0]} 
          alt={alt} 
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white bg-black/50 px-2 py-1 rounded text-sm">Voir l'image</span>
        </div>
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
          imageTitle={alt}
        />
      )}
    </>
  );
};

export default ProductImageLightbox;
