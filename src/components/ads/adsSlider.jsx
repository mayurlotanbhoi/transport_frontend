import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import ad1 from "../assets/ad1.jpg"
// import ad2 from "../assets/ad2.jpeg"

const ImageCarousel = () => {
    const images = [
        { src: 'https://res.cloudinary.com/delunwtr6/image/upload/v1731402771/afydkuy8gjlvftvuhokv.png', alt: 'ads1', caption: 'Order Now' },
        { src: 'https://res.cloudinary.com/delunwtr6/image/upload/v1731402771/afydkuy8gjlvftvuhokv.png', alt: 'ads2', caption: 'Book Now' },
        // { src: 'https://res.cloudinary.com/delunwtr6/image/upload/v1731402771/afydkuy8gjlvftvuhokv.png', alt: 'ads3', caption: 'Shop Now' },
    ];

    const customPrevArrow = (onClickHandler, hasPrev, label) =>
        hasPrev && (
            <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full shadow-lg focus:outline-none z-10"
            >
                &larr;
            </button>
        );

    const customNextArrow = (onClickHandler, hasNext, label) =>
        hasNext && (
            <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full shadow-lg focus:outline-none z-10"
            >
                &rarr;
            </button>
        );

    return (
        <div className="carousel-container col-span-12 xl:col-span-8 dark:bg-black dark:text-white rounded-xl      overflow-hidden">
            <Carousel
                // showArrows={true}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={3000}
                className="carousel"
            // renderArrowPrev={customPrevArrow}
            // renderArrowNext={customNextArrow}
            >
                {images.map((image, index) => (
                    <div className='w-full flex justify-center rounded-md  p-2' key={index}>
                        <img className=' w-auto h-24 sm:h-30  rounded-md  object-cover' src={image.src} alt={image.alt} />
                        {/* <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white py-1 px-4 rounded-lg shadow-lg">
                            {image.caption}
                        </div> */}
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default ImageCarousel;
