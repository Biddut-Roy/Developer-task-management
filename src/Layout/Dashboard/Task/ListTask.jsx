import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import toast, { Toaster } from "react-hot-toast";
import usePublicAxios from "../../../Hooks/usePublicAxios";
import useAuth from "../../../Hooks/useAuth";
import { format } from "date-fns";




const ListTask = () => {
    const { user } = useAuth()
    const publicAxios = usePublicAxios();
    const [tasks, setTasks] = useState([])
    const [todos, setTodos] = useState();
    const [ongoing, setOngoing] = useState();
    const [completed, setCompleted] = useState();

    useEffect(() => {
        publicAxios.get(`/userData?email=${user?.email}`)
            .then(res => setTasks(res?.data))
    }, [user?.email])

    useEffect(() => {
        const fTodos = tasks?.filter((task) => task.status === "todo")
        const fOngoing = tasks?.filter((task) => task.status === "ongoing")
        const fCompleted = tasks?.filter((task) => task.status === "completed")

        setTodos(fTodos)
        setOngoing(fOngoing)
        setCompleted(fCompleted)
    }, [tasks])

    const statuses = ["todo", "ongoing", "completed"];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-5 lg:gap-5">
            {
                statuses.map((status, idx) => (<Section
                    key={idx}
                    status={status}
                    tasks={tasks}
                    setTasks={setTasks}
                    ongoing={ongoing}
                    completed={completed}
                    todos={todos}
                    publicAxios={publicAxios}
                ></Section>))
            }
        </div>
    );
};

export default ListTask;

const Section = ({ status, completed, tasks, setTasks, ongoing, todos, publicAxios }) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => addItemToSection(item.mainid),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    let text = "Todo";
    let bg = 'bg-slate-500';
    let taskToMap = todos;

    if (status === 'ongoing') {
        text = 'ongoing';
        bg = 'bg-purple-500';
        taskToMap = ongoing;
    }
    if (status === 'completed') {
        text = 'completed';
        bg = 'bg-green-500';
        taskToMap = completed;
    }

    const addItemToSection = (id) => {
        setTasks((prev) => {
            const mTasks = prev.map(t => {
                if (t.mainid === id) {
                    return { ...t, status: status }
                }
                return t;
            })
            const cData = { status: status, mainid: id }
            publicAxios.patch(`/userDataSC`, cData)
                .then((res) => {
                    console.log(res.data.modifiedCount);
                    toast.success('Task state change', { icon: "😊" })
                });

            // localStorage.setItem("tasks", JSON.stringify(mTasks));
            // toast.success('Task state change' , {icon : "😊"})
            return mTasks;
        })
    }

    return (
        <div ref={drop} className={`p-2 ${isOver ? "bg-slate-200" : ""}`}>
            <Header text={status} bg={bg} count={taskToMap?.length} />
            {
                taskToMap?.length > 0 && taskToMap?.map(task => <Task publicAxios={publicAxios} key={task._id} task={task} tasks={tasks} setTasks={setTasks} />)
            }
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    )
}

const Header = ({ text, bg, count }) => {
    return (
        <div className={`${bg}  flex items-center h-12 px-4 rounded-md uppercase text-sm text-white`}>
            {text}
            <div className=" ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
                {count}
            </div>
        </div>
    )
}

const Task = ({ setTasks, task, tasks, publicAxios }) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { mainid: task.mainid },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    const handelRemove = (id) => {
        const fTasks = tasks.filter((t) => t.id !== id);
        localStorage.setItem("tasks", JSON.stringify(fTasks));
        setTasks(fTasks)
        toast.success('Task Remove', { icon: "💀" })
    }

    const handelChange = (e) => {
        e.preventDefault();
        const data = e.target;
        const Title = data.Title.value;
        const Descriptions = data.Descriptions.value;
        const Priority = data.Priority.value;
        const status = data.status.value;
        const mainid = data.mainid.value;

        const EData = {
            Title,
            Descriptions,
            Priority,
            mainid,
            status
        }
        publicAxios.patch(`/userDataEC`, EData)
                .then((res) => {
                    console.log(res.data.modifiedCount);
                    toast.success('Edit task successful', { icon: "😊" })
                });
    }

    return (
        <div ref={drag} className={`relative  mt-2 shadow-md rounded-md cursor-grab ${isDragging ? "opacity-25" : "opacity-100"
            } `}>
            <div className="card bg-primary text-primary-content">
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
            <button className=" absolute bottom-1 left-1 text-slate-400" onClick={() => document.getElementById('my_modal_3').showModal({taskData: task})}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>

            </button>

            <dialog id="my_modal_3" className="modal">
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
                                <input type="text" name="Title" className="bg-slate-300 text-black" placeholder={task.Title} />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text text-black mb-2">Priority</span>
                                </label>
                                <input type="text" name="Descriptions" className=" bg-slate-300 text-black" placeholder={task.Descriptions} />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text text-black mb-2">Priority</span>
                                </label>
                                <select name="Priority" defaultValue={task.Priority}>
                                    <option value="Low">Low</option>
                                    <option value="moderate">moderate</option>
                                    <option value="high">high</option>
                                </select>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text text-black mb-2">status</span>
                                </label>
                                <select name="status" defaultValue={task.status}>
                                    <option value="todo">todo</option>
                                    <option value="ongoing">ongoing</option>
                                    <option value="completed">completed</option>
                                </select>
                            </div>
                            <div>
                                <input type="hidden" name="mainid" value={task.mainid} />
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
    )
}