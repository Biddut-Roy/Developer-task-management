import axios from "axios";
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Gallery = () => {
    const [data, setData] = useState([]);

    AOS.init({
        easing: 'ease-out-quart',
        delay: 0,
        duration: 750
        })

    useEffect(() => {
        axios("gallery.json")
            .then(res => setData(res.data))
    }, [])

    return (
        <div className=" bg-slate-50 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-5 lg:gap-8 py-12 ">
           {
            data?.map(item => (
                <div key={item.id}  data-aos="flip-up" className="card bg-white shadow-xl">
                <figure><img src={item.url} alt="img" /></figure>
            </div>
            ))
           }
        </div>
    );
};

export default Gallery;