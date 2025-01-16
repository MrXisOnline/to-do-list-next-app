"use client";
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPass, setShowPass] = React.useState(false);
  const router = useRouter();

  async function sendData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const res = await axios.post('/api/users/login', {email, password});
      console.log(res);
      if (res.data.status !== 200) {
        if (!res.data.done){
          router.push('/sign-up')
        }
        throw res.data.message;
      }
      router.push('/profile');
    } catch (error: any) {
      console.log("error occurred: " + error);
    }
  }
  return (
    <div className='flex flex-col justify-center text-center'>
      <h1 className='text-3xl font-bold py-2'>Sign Up Form</h1>
      <form className='flex flex-col justify-center text-center py-4' onSubmit={sendData}>
        <label className='my-4'>
          Email: 
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='border-2 border-black rounded-md mx-3'/>
        </label>
        <label className='my-4 flex items-center justify-center'>
          Password: 
          <div className='flex justify-center ml-3'>
            <div className='flex justify-center flex-col'>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='border-2 border-black rounded-md mx-3'/>
              {showPass ? <p>{password}</p> : ''}
            </div>
            <button type='button' onClick={() => setShowPass((v) => !v)}>Show</button>
          </div>
        </label>
        <button 
          className={`border-2 border-black rounded mx-auto px-1 w-32 ${((password.length > 0) && (email.length > 0)) ? '' : 'bg-gray-500'}`} 
          type="submit"
          disabled={!((password.length > 0) && (email.length > 0))}
        >
          Sign-Up
        </button>
      </form>
    </div>
  )
}

export default Login