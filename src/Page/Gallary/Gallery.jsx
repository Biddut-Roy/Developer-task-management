import axios from "axios";
import { useEffect, useState } from "react";


const Gallery = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios("gallery.json")
            .then(res => setData(res.data))
    }, [])
    console.log(data);
    return (
        <div className=" bg-slate-50 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-5 lg:gap-8 py-12 ">
           {
            data?.map(item => (
                <div key={item.id} className="card bg-white shadow-xl">
                <figure><img src={item.url} alt="img" /></figure>
            </div>
            ))
           }
        </div>
    );
};

export default Gallery;