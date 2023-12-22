import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import toast, { Toaster } from "react-hot-toast";
import usePublicAxios from "../../../Hooks/usePublicAxios";
import useAuth from "../../../Hooks/useAuth";
import { format } from "date-fns";
import SetTask from "./SetTask";




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
            return mTasks;
        })
    }

    return (
        <div ref={drop} className={`p-2 ${isOver ? "bg-slate-200" : ""}`}>
            <Header text={status} bg={bg} count={taskToMap?.length} />
            {
                taskToMap?.length > 0 && taskToMap?.map(task => <SetTask key={task._id} task={task} tasks={tasks} setTasks={setTasks} /> )
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

