"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";

function App() {
    const [lists, setList] = React.useState<{ id: string, name: string, userid: string }[]>([])
    const [addListName, setAddListName] = React.useState('')
    const [showInput, setShowInput] = React.useState(false)

    async function addList(e: React.FormEvent<HTMLFormElement>){
        try {
            e.preventDefault()
            setShowInput(false);
            const res = await axios.post('/api/lists', {name: addListName});
            if (res.data.status !== 200)  {
                throw "Server Error: " + res.data.message;
            }
            console.log('getting updated list');
            getLists();
        } catch (error) {
            console.log("error: " + error)
        }
    }
    async function deleteList(id: string) {
        try {
            const res = await axios.delete('/api/lists', {
                params: {id}
            })
            if (res.data.status !== 200) {
                throw "Server Error: " + res.data.message;
            }
            getLists();
        } catch (error) {
            console.log("error: " + error)
        }
    }
    async function getLists() {
        try {
            const res = await axios.get('/api/lists');
            if (res.data.status !== 200) {
                throw "error with response"
            }
            setList(res.data.data);
        } catch (error) {
            console.log('error occured: ' + error)
        }

    }
    React.useEffect(() => {
        const func = async () => {getLists()}
        func();
    }, [])
  return (
    <div>
        <h1>To-Do List</h1>
        <Link className="border-2 border-black rounded mx-2 px-1" href={'/profile'}>Profile</Link>
        <button type="button" className="border-2 border-black rounded mx-2 px-1" onClick={() => setShowInput(true)}>ADD</button>
        {showInput && <form onSubmit={addList}>
            <label>
                List Name: 
                <input type="text" value={addListName} onChange={(e) => setAddListName(e.target.value)}/>
            </label>
            <button type="submit" className="border-2 border-black rounded mx-2 px-1">Submit</button>
            </form>}
        <div>
            {lists.map((v) => <div key={v.id} className="flex p-2">
                <Link href={`/app/${v.id}`}><p>{v.name}</p></Link>
                <button type="button" className="border-2 border-black rounded mx-2 px-1" onClick={() => deleteList(v.id)}>DELETE</button>
            </div>)}
        </div>
    </div>
  )
}

export default App