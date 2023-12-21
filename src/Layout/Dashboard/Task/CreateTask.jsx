import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const CreateTask = ({ tasks, setTasks }) => {

    const [task, setTask] = useState({
        id: '',
        name: '',
        status: 'todo',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setTasks((prev) => {
            const list = [...(prev || []), task];

            localStorage.setItem("tasks", JSON.stringify(list));

            return list;
        });

        toast.success('Task Created')

        setTasks({
            id: '',
            name: '',
            status: 'todo',
        })
    };


    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    className="border-2 border-slate-400 bg-slate-100 rounded-1-64 px-1"
                    value={task.name}
                    onChange={(e) => setTask({ ...task, id: uuidv4(), name: e.target.value })}
                />
                <button type="submit" className=' btn btn-primary btn-sm' >Create</button>
            </form>
        </>
    );
};

export default CreateTask;


