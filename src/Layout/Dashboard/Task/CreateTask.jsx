import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import usePublicAxios from '../../../Hooks/usePublicAxios';
import useAuth from '../../../Hooks/useAuth';


// const CreateTask = ({ tasks, setTasks }) => {
const CreateTask = () => {
    const {user} = useAuth()
    const publicAxios = usePublicAxios()

    const [task, setTask] = useState({
        id: '',
        name: '',
        status: 'todo',
    });


    // const handleSubmits = (e) => {
    //     e.preventDefault();
    //     setTasks((prev) => {
    //         const list = [...(prev || []), task];

    //         localStorage.setItem("tasks", JSON.stringify(list));

    //         return list;
    //     });

    //     toast.success('Task Created')

    //     setTasks({
    //         id: '',
    //         name: '',
    //         status: 'todo',
    //     })
    // };

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
    
        const userData = {
            Title: data?.Title,
            Priority: data?.Priority,
            Descriptions: data?.Descriptions,
            date: data?.date,
            email: user?.email,
            status: 'todo',
            mainid: uuidv4()
        }

            publicAxios.post('/userData', userData)
            .then(res => {
                if (res.data.insertedId) {
                    reset()
                    toast.success('Task Created')
                }
            })
            
    }

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {/* <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    className="border-2 border-slate-400 bg-slate-100 rounded-1-64 px-1"
                    value={task.name}
                    onChange={(e) => setTask({ ...task, id: uuidv4(), name: e.target.value })}
                />
                <button type="submit" className=' btn btn-primary btn-sm' >Create</button>
            </form> */}

            <div className="hero min-h-screen w-full mx-auto bg-slate-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className=" grid grid-cols-2 gap-5">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Title</span>
                                    </label>
                                    <input type="text" {...register("Title", { required: true })} placeholder="title" className="input input-bordered" />
                                    {errors.firstName?.type === "required" && (
                                        <p className=" text-red-400">Title is required</p>
                                    )}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text mb-2">Priority</span>
                                    </label>
                                    <select {...register("Priority", { required: true })}>
                                        <option value="Low">Low</option>
                                        <option value="moderate">moderate</option>
                                        <option value="high">high</option>
                                    </select>

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Descriptions</span>
                                    </label>
                                    <textarea type='text' {...register("Descriptions")} placeholder="some text" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className=' mb-5'>Date:</label>
                                   <Controller
                                        name="date"
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker
                                                selected={field.value}
                                                onChange={(date) => field.onChange(date)}
                                                dateFormat="yyyy-MM-dd"
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" className="btn btn-primary bg-blue-800 " value="Create a Task" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
};

export default CreateTask;


