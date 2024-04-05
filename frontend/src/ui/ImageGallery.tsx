import React from 'react';
import './css/ImageGallery.css';

interface Props {
  imageFiles: File[];
}

const ImageGallery: React.FC<Props> = ({imageFiles}) => {
  return (
    <div className="image-gallery">
      {imageFiles.map((file, index) => (
        <div key={index} className="image-container">
          <img
            key={index}
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="gallery-image"/>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;