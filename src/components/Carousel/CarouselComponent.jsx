/* eslint-disable no-unused-vars */
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { img } from "./image/data";

const CarouselComponent = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img?.map((imageItemLink, index) => (
          <img key={index} src={imageItemLink} alt={`Slide ${index + 1}`} />
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
