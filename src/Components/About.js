import React from 'react'
import Slider from './Slider'


export default function About(props) {


    const images =
        [
            'https://static.toiimg.com/photo/80387978.cms',
            'https://carsoid.com/wp-content/uploads/2018/03/BugattiChiron.jpg',
            'https://e1.pxfuel.com/desktop-wallpaper/650/210/desktop-wallpaper-top-10-most-expensive-cars-in-the-world-expensive.jpg',
            'https://e1.pxfuel.com/desktop-wallpaper/818/977/desktop-wallpaper-top-5-futuristic-cars-in-development-anything-that-counts-mercedes-biome.jpg'
        ];


    return (
        <div className='container my-5 mb-4 d-flex flex-column align-items-center'>
            <h2 className='text-center my-5'>Hello, this site is just for Notes</h2>

            <div className=' my-5 '>
                <h1 className='text-center mb-5'>Expensive Car Collection</h1>
                <Slider images={images} interval={3000} />
            </div>

        </div >
    )
}
