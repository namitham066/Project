import React from "react";
import Carousel from "better-react-carousel";
import { Stack, useBreakpointValue } from "@chakra-ui/react";
import carouselimage1 from "../../assets/carousel1.webp"
import carouselimage2 from "../../assets/carousel4.avif"
import carouselimage3 from "../../assets/carousel3.avif"
import carouselimage4 from "../../assets/carousel4.avif"
import carouselimage5 from "../../assets/carousel5.avif"
import carouselimage6 from "../../assets/carousel6.jpg"



const CarouselHomepage = () => {
  return (
    <Stack w={useBreakpointValue({ base: "99%", lg: "62.5%" })}>
      <Carousel hideArrow showDots autoplay={5000} cols={2} rows={1} loop>
        <Carousel.Item>
          <img
            alt="carouselimage1" width="100%"src={carouselimage1}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            alt="carouselimage2" width="100%" src={carouselimage2}
            />
        </Carousel.Item>
        <Carousel.Item>
          <img
            alt="carouselimage3" width="100%" src={carouselimage3}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            alt="carouselimage4" width="100%" src={carouselimage3}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            alt="carouselimage5" width="100%" src={carouselimage4}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            alt="carouselimage6" width="100%" src={carouselimage5}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            alt="carouselimage7" width="100%" src={carouselimage6}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            alt="carouselimage8" width="100%" src={carouselimage4}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            alt="carouselimage10" width="100%" src={carouselimage3}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            alt="carouselimage11" width="100%" src={carouselimage2}
          />
        </Carousel.Item>
      </Carousel>
    </Stack>
  );
};

export default CarouselHomepage;
