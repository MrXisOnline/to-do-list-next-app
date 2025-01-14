"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function Login(){
    router.push('/login')
  }
  function Signup() {
    router.push('/sign-up')
  }
  return (
    <div className="flex flex-col justify-center text-center">
      <h1 className="text-5xl font-bold py-5 text-green-700">To Do List</h1>
      <p className="max-w-3xl place-self-center py-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae pariatur nobis aliquid necessitatibus autem magni dolores ipsa facere aut iste porro veritatis soluta dicta itaque inventore, est corporis natus eveniet?
      </p>
      <div className="flex justify-center">
        <button className="border-2 border-black rounded mx-2 px-1" onClick={Login}>Login</button>
        <button className="border-2 border-black rounded mx-2 px-1" onClick={Signup}>Signup</button>
      </div>
    </div>
  );
}
