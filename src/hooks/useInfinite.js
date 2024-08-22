import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function useInfinite() {
    const [photos, setPhotos] = useState([]);
    const getImage = useRef({});
    const [count, setCount] = useState(10)

    useEffect(() => {
        fetchApiData();
    }, [count]);

    useEffect(() => {
        const images = getImage.current.querySelector('.image-post:last-child');
        if (images) {
            const observer = new IntersectionObserver((entries) => {
                console.log({ entries });
                if (entries[0].isIntersecting) {
                    observer.disconnect();
                    setCount(prev => prev + 3);
                }
            });

            observer.observe(images);

            return () => observer.disconnect(images);
        }
    }, [photos])

    let fetchApiData = async () => {
        try {
            let images = await axios.get('https://jsonplaceholder.typicode.com/photos');
            let tenImages = images?.data?.slice(0, count);
            setPhotos([...tenImages]);
        } catch (error) {
            console.log(error);
        }
    };

    return ([
        getImage,
        photos
    ])
}

export default useInfinite;