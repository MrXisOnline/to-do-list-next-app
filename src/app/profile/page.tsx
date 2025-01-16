"use client";
import axios from 'axios';
import React from 'react';
import { useRouter } from 'next/navigation';


function Profile() {
  const router = useRouter();
  async function Logout() {
    try {
      const res = await axios.get('/api/users/logout')
      if (res.data.status !== 200) {
        throw "Server Error"
      }
      router.push('/');
    } catch (error) {
      console.log('error occured: ' + error)
    }

  }
  return (
    <div>
      <button className="border-2 border-black rounded mx-2 px-1" onClick={Logout}>Logout</button>
    </div>
  )
}

export default Profile