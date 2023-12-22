import { useDrag } from "react-dnd";
import toast, { Toaster } from "react-hot-toast";
import usePublicAxios from "../../../Hooks/usePublicAxios";
import { format } from "date-fns";
import { useState } from "react";


const SetTask = ({ setTasks, task, tasks, }) => {
    const publicAxios = usePublicAxios();
    const [mainId, setMainId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { mainid: task.mainid },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))


    const handelRemove = (id) => {
        const fTasks = tasks.filter((t) => t.id !== id);
        setTasks(fTasks)

        publicAxios.delete(`/userData/${id}`)
            .then((res) => {
                if (res.data.deletedCount) {
                    toast.success('Task delete successful', { icon: "💀" })
                }
            });
        const timeoutId = setTimeout(() => {
            window.location.reload();
        }, 1000);
        return () => clearTimeout(timeoutId)
    }



    const handelChange = (e) => {
        e.preventDefault();
        const data = e.target;

        const Title = data.Title.value;
        const Descriptions = data.Descriptions.value;
        const Priority = data.Priority.value;
        const status = data.status.value;
        const mainid = mainId

        const EData = {
            Title,
            Descriptions,
            Priority,
            mainid,
            status
        }

        publicAxios.patch(`/userDataEC`, EData)
            .then((res) => {
                if (res.data.modifiedCount) {
                    toast.success('Edit task successful', { icon: "😊" })
                };
                document.getElementById('myModel').close();
            });

            const timeoutId = setTimeout(() => {
                window.location.reload();
            }, 1000);
            return () => clearTimeout(timeoutId)
    }

    const handleOpenModal = (task) => {
        setMainId(task.mainid);
        setTitle(task.Title);
        setDescription(task.Descriptions)
        setPriority(task.Priority);
        setStatus(task.status);
        document.getElementById('myModel').showModal();
    };


    return (
        <div  className={`relative  mt-2 shadow-md rounded-md cursor-grab ${isDragging ? "opacity-25" : "opacity-100"
            } `}>
            <div  ref={drag} className="card bg-primary text-primary-content">
                <div className="p-2 pb-6">
                    <h2 className="card-title">Title: {task.Title}</h2>
                    <p>{task.Descriptions}</p>
                    <p>{task.Priority}</p>
                    <p>{format(new Date(task.date), 'yyyy-MM-dd')}</p>
                </div>
            </div>
            <button className=" absolute bottom-1 right-1 text-slate-400" onClick={() => handelRemove(task.mainid)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" data-slot="icon" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
            <button className=" absolute bottom-1 left-1 text-slate-400" onClick={() => handleOpenModal(task)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>

            </button>

            <dialog id="myModel" className="modal">
                <div className="modal-box bg-slate-50">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handelChange}>
                        <div>
                            <div>
                                <label className="label">
                                    <span className="label-text text-black mb-2">Title</span>
                                </label>
                                <input required type="text" name="Title" className="bg-slate-300 text-black" placeholder={title} />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text text-black mb-2">Description</span>
                                </label>
                                <textarea required type="text" name="Descriptions" className=" bg-slate-300 text-black" placeholder={description} ></textarea>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text text-black mb-2">Priority</span>
                                </label>
                                <select name="Priority" defaultValue={priority}>
                                    <option value="Low">Low</option>
                                    <option value="moderate">moderate</option>
                                    <option value="high">high</option>
                                </select>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text text-black mb-2">status</span>
                                </label>
                                <select name="status" defaultValue={status}>
                                    <option value="todo">todo</option>
                                    <option value="ongoing">ongoing</option>
                                    <option value="completed">completed</option>
                                </select>
                            </div>
                        </div>
                        <div className=" text-center">
                            <input type="submit" className="btn btn-primary btn-sm " value="Edit" />
                        </div>
                    </form>
                </div>
            </dialog>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default SetTask;