import { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import ListTask from "./ListTask";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Task = () => {
    // const [tasks, setTasks] = useState();

    // useEffect(() => {
    //     setTasks(JSON.parse(localStorage.getItem("tasks")));
    // }, [])

    return (
        <DndProvider backend={HTML5Backend}>
            <div className=" flex flex-col items-center">
                {/* <CreateTask /> */}
                <ListTask />
                {/* <CreateTask tasks={tasks} setTasks={setTasks} />
                <ListTask tasks={tasks} setTasks={setTasks} /> */}
            </div>
        </DndProvider>

    );
};

export default Task;