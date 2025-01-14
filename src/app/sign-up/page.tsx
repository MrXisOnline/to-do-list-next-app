"use client";
import React from 'react'

function Signup() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [conPassword, setConPassword] = React.useState('');

  function sendData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }
  return (
    <div className='flex flex-col justify-center text-center'>
      <h1 className='text-3xl font-bold py-2'>Sign Up Form</h1>
      <form className='flex flex-col justify-center text-center py-4' onSubmit={sendData}>
        <label className='my-4'>
          Name: 
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='border-2 border-black rounded-md mx-3'/>
        </label>
        <label className='my-4'>
          Email: 
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='border-2 border-black rounded-md mx-3'/>
        </label>
        <label className='my-4'>
          Password: 
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='border-2 border-black rounded-md mx-3'/>
        </label>
        <label className='my-4'>
          Confirm Password: 
          <input type="password" value={conPassword} onChange={(e) => setConPassword(e.target.value)} className='border-2 border-black rounded-md mx-3'/>
        </label>
        <button 
          className={`border-2 border-black rounded mx-auto px-1 w-32 ${((password.length > 0) && (conPassword.length > 0) && (name.length > 0) && (email.length > 0) && (password.localeCompare(conPassword) === 0)) ? '' : 'bg-gray-500'}`} 
          type="submit"
          disabled={!((password.length > 0) && (conPassword.length > 0) && (name.length > 0) && (email.length > 0) && (password.localeCompare(conPassword) === 0))}
        >
          Sign-Up
        </button>
      </form>
    </div>
  )
}

export default Signup