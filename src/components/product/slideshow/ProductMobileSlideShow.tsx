"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./slideshow.css";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
  className?: string;
}
export const ProductMobileSlideShow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: "100vw",
          height: "500px",
        }}
        navigation={true}
        pagination
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[FreeMode, Autoplay, Navigation, Pagination]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              key={image}
              className="object-fill "
              src={`/products/${image}`}
              width={600}
              height={500}
              alt={title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
