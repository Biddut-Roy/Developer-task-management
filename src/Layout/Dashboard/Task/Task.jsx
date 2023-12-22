import { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import ListTask from "./ListTask";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Task = () => {

    return (
        <DndProvider backend={HTML5Backend}>
            <div className=" flex flex-col items-center">
                <ListTask />
            </div>
        </DndProvider>

    );
};

export default Task;