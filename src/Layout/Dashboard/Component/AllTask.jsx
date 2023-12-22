import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import usePublicAxios from "../../../Hooks/usePublicAxios";
import { format } from "date-fns";
import AOS from 'aos';
import 'aos/dist/aos.css';

const AllTask = () => {
    const { user } = useAuth();
    const [ tasks , setTasks ] = useState([]);
    const publicAxios = usePublicAxios();

    useEffect(() => {
        publicAxios.get(`/userData?email=${user?.email}`)
            .then(res => setTasks(res?.data))
    }, [user?.email])

    AOS.init({
        easing: 'ease-out-quart',
        delay: 0,
        duration: 750
        })


    return (
        <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-5 lg:gap-10 w-11/12 mx-auto mt-10">
            {
            tasks?.map((task) => (
              <div key={task._id} data-aos="fade-left" className="card bg-base-100 shadow-xl ">
                <div className="card-body bg-slate-300 text-black">
                <h2 className="card-title">Title: {task.Title}</h2>
                    <p>{task.Descriptions}</p>
                    <p>{task.Priority}</p>
                    <p>{format(new Date(task.date), 'yyyy-MM-dd')}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary btn-sm">{task.status}</button>
                  </div>
                </div>
              </div>
            ))
          }
        </div> 
    );
};

export default AllTask;