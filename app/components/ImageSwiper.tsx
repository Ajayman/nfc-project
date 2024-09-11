'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import '../../styles/styles.css'
import React, { useRef, useState } from 'react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image'



export default function ImageSwiper() {
    const image = [
        {
            imageSrc: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg",
            imageAlt: "Picture of the author1",
            imageHeight: 500,
            imageWidth: 500
        },
        {
            imageSrc: "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg",
            imageAlt: "Picture of the author2",
            imageHeight: 500,
            imageWidth: 500
        },
        {
            imageSrc: "https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg",
            imageAlt: "Picture of the author3",
            imageHeight: 500,
            imageWidth: 500
        },
        {
            imageSrc: "https://images.pexels.com/photos/1454720/pexels-photo-1454720.jpeg",
            imageAlt: "Picture of the author5",
            imageHeight: 500,
            imageWidth: 500
        }
    ]
    const [remoteImages, setRemoteImages] = useState(image)
    const [thumbsSwiper, setThumbsSwiper] = useState(null)

    return (
        <>
            <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {
                    remoteImages.map((img, i) => (
                        <SwiperSlide key={i}>
                            <Image src={img.imageSrc}
                                alt={img.imageAlt}
                                width={img.imageWidth}
                                height={img.imageHeight} />
                        </SwiperSlide>
                    ))

                }
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {
                    remoteImages.map((img, i) => (
                        <SwiperSlide key={i}>
                            <Image
                                src={img.imageSrc}
                                alt={img.imageAlt}
                                width={200}
                                height={200}
                            />
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </>
    )
}