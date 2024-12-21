import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { SlideItem } from './style';

const SlideShowComponent = ({ slideImages }) => {
  return (
    <div className="slide-container">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <SlideItem background={slideImage.url}>
              {/* Nội dung slide như caption có thể thêm vào đây nếu cần */}
            </SlideItem>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default SlideShowComponent;
