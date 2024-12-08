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



export default function ImageSwiper({imageList}) {
    const [remoteImages, setRemoteImages] = useState(imageList)
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
                            <Image src={img}
                                alt="image"
                                width={500}
                                height={800} />
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
                                src={img}
                                alt="image"
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