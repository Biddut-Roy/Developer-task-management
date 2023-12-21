import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import toast, { Toaster } from "react-hot-toast";



const ListTask = ({ tasks, setTasks }) => {
    const [todos, setTodos] = useState();
    const [inProgress, setInProgress] = useState();
    const [active, setActive] = useState();

    useEffect(() => {
        const fTodos = tasks?.filter((task) => task.status === "todo")
        const fInProgress = tasks?.filter((task) => task.status === "inProgress")
        const fActive = tasks?.filter((task) => task.status === "active")

        setTodos(fTodos)
        setInProgress(fInProgress)
        setActive(fActive)
    }, [tasks])

    const statuses = ["todo", "inProgress", "active"];

    return (
        <div className="flex gap-16">
            {
                statuses.map((status, idx) => (<Section
                    key={idx}
                    tasks={tasks}
                    setTasks={setTasks}
                    inProgress={inProgress}
                    active={active}
                    status={status}
                    todos={todos}
                ></Section>))
            }
        </div>
    );
};

export default ListTask;

const Section = ({ status, active, tasks, setTasks, inProgress, todos }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => addItemToSection(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    let text = "Todo";
    let bg = 'bg-slate-500';
    let taskToMap = todos;

    if (status === 'inProgress') {
        text = 'InProgress';
        bg = 'bg-purple-500';
        taskToMap = inProgress;
    }
    if (status === 'active') {
        text = 'Active';
        bg = 'bg-green-500';
        taskToMap = active;
    }

    const addItemToSection = (id) => {
        setTasks((prev) => {
            const mTasks = prev.map(t => {
                if (t.id === id) {
                    return {...t , status: status}
                }
                return t;
            })
            localStorage.setItem("tasks" , JSON.stringify(mTasks));
            toast.success('Task state change' , {icon : "😊"})
            return mTasks;
        })
    }

    return (
        <div ref={drop} className={`p-2 ${isOver ? "bg-slate-200" : ""}`}>
            <Header text={status} bg={bg} count={taskToMap?.length} />
            {
                taskToMap?.length > 0 && taskToMap?.map(task => <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />)
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

const Task = ({ setTasks, task, tasks }) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))


    const handelRemove = (id) => {
        const fTasks = tasks.filter((t) => t.id !== id);
        localStorage.setItem("tasks", JSON.stringify(fTasks));
        setTasks(fTasks)
        toast.success('Task Remove' , {icon: "💀"})
    }
    return (
        <div ref={drag} className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${isDragging ? "opacity-25" : "opacity-100"
            } `}>
            <p className=" text-black">{task?.name}</p>
            <button className=" absolute bottom-1 right-1 text-slate-400" onClick={() => handelRemove(task.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" data-slot="icon" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    )
}