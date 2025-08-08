'use client';
import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import { Autoplay, FreeMode } from 'swiper/modules';

const logos = [
    { src: '/BrandsLogos/amd.png', alt: 'AMD Logo', name: 'AMD' },
    { src: '/BrandsLogos/airbnb.png', alt: 'Airbnb Logo', name: 'Airbnb' },
    { src: '/BrandsLogos/dell.png', alt: 'Dell Logo', name: 'Dell' },
    { src: '/BrandsLogos/google.png', alt: 'Google Logo', name: 'Google' },
    { src: '/BrandsLogos/IBM.png', alt: 'IBM Logo', name: 'IBM' },
    { src: '/BrandsLogos/microsoft.png', alt: 'Microsoft Logo', name: 'Microsoft' },
    { src: '/BrandsLogos/netflix.png', alt: 'Netflix Logo', name: 'Netflix' },
    { src: '/BrandsLogos/paypal.png', alt: 'PayPal Logo', name: 'PayPal' },
    { src: '/BrandsLogos/intel.png', alt: 'Intel Logo', name: 'Intel' },
    { src: '/BrandsLogos/mastercard.png', alt: 'Mastercard Logo', name: 'Mastercard' },
    { src: '/BrandsLogos/shopify.png', alt: 'Shopify Logo', name: 'Shopify' },
];

const HomeLogoSlider = () => {
    return (
        <div className="bg-gray-100 dark:bg-gray-800 py-8 w-screen">
            <h2 className="text-3xl font-bold leading-tight text-center mb-6">Trusted by Leading Companies</h2>
            <div className='p-2 relative'>
                {/* Left fade effect */}
                <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-100 dark:from-gray-800 to-transparent z-10 pointer-events-none"></div>
                
                {/* Right fade effect */}
                <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-100 dark:from-gray-800 to-transparent z-10 pointer-events-none"></div>
                
                <Swiper
                    modules={[FreeMode, Autoplay]}
                    spaceBetween={30}
                    slidesPerView="auto"
                    loop={true}
                    autoplay={{ 
                        delay: 0,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                        reverseDirection: false
                    }}
                    speed={8000}
                    freeMode={true}
                    allowTouchMove={false}
                    centeredSlides={false}
                    breakpoints={{
                        320: { slidesPerView: 2, spaceBetween: 6 },
                        640: { slidesPerView: 3, spaceBetween: 8 },
                        768: { slidesPerView: 4, spaceBetween: 8 },
                        1024: { slidesPerView: 5, spaceBetween: 10 },
                        1280: { slidesPerView: 6, spaceBetween: 10 }
                    }}
                    >
                    {
                        logos.map((logo, index) => (
                        <SwiperSlide key={index} className="flex flex-row justify-center items-center">
                            <div className="h-full flex flex-row justify-center items-center grayscale hover:grayscale-0 dark:grayscale-0 transition-all duration-500 ease-in-out transform hover:scale-125">
                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    width={100}
                                    height={40}
                                    className="h-10 w-auto object-contain transition-transform duration-300"
                                />
                                <p className="ml-2 text-2xl font-extrabold leading-tight text-gray-700 dark:text-gray-100 transition-colors duration-300">{logo.name}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

        </div>


        </div >
    )
}

export default HomeLogoSlider