"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";

function App() {
  return (
    <div>
        <h1>To-Do List</h1>
        <Link href={'/profile'}>Profile</Link>
    </div>
  )
}

export default App