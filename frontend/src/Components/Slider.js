import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Slider = ({ images, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Move to the next slide
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);

        // Clear interval on component unmount or change of images
        return () => clearInterval(intervalId);
    }, [currentIndex, images, interval]);

    return (
        <Carousel showArrows={false} showStatus={false} showIndicators={false} selectedItem={currentIndex}>
            {images.map((image, index) => (
                <div key={index}>
                    <img src={image} alt={`Slide ${index + 1}`} />
                </div>
            ))}
        </Carousel>
    );
};

export default Slider;
