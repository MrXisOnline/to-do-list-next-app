"use client";
import React from 'react'
import axios from 'axios';
import { useParams } from 'next/navigation';
import Link from 'next/link';

function ListTasks() {
    const unwrappedParams = useParams();
    const [tasks, setTasks] = React.useState<{id: string, name: string, userID: string, listID: string}[]>([]);
    const [addTaskName, setAddTaskName] = React.useState('')
    const [showInput, setShowInput] = React.useState(false)

    async function getTasks() {
        try {
            const res = await axios.get(`/api/lists/${unwrappedParams.listId}`);
            if (res.data.status !== 200) {
                throw "error with response"
            }
            setTasks(res.data.data);
            console.log(res)
        } catch (error) {
            console.log("error occured: " + error);
        }
    }

    async function addTask(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            const res = await axios.post(`/api/lists/${unwrappedParams.listId}`, {name: addTaskName});
            if (res.data.status !== 200) {
                throw "Server Error: " + res.data.message;
            }
            setShowInput(false);
            getTasks();
        } catch (error) {
            console.log("error: " + error);
        }
    }

    async function deleteTask(id: string) {
        try {
            const res = await axios.delete(`/api/lists/${unwrappedParams.listId}`, {
                params: {id}
            })
            if (res.data.status !== 200) {
                throw "Server Error: " + res.data.message;
            }
            getTasks();
        } catch (error) {
            console.log("error: " + error)
        }
    }
    React.useEffect(() => {
        const func = async () => {getTasks()}
        func();
    }, [])
  return (
    <div>
        <h1>ListTasks {unwrappedParams.listId}</h1>
        <Link className="border-2 border-black rounded mx-2 px-1" href={'/app'}>Back</Link>
        <button type="button" className="border-2 border-black rounded mx-2 px-1" onClick={() => setShowInput(true)}>ADD</button>
        {showInput && <form onSubmit={addTask}>
            <label>
                Task Name: 
                <input type="text" value={addTaskName} onChange={(e) => setAddTaskName(e.target.value)}/>
            </label>
            <button type="submit" className="border-2 border-black rounded mx-2 px-1">Submit</button>
            </form>}
        <div>
            {tasks.map((v) => <div key={v.id} className="flex p-2">
                <p>{v.name}</p>
                <button type="button" className="border-2 border-black rounded mx-2 px-1" onClick={() => deleteTask(v.id)}>DELETE</button>
            </div>)}
        </div>
    </div>
  )
}

export default ListTasks