'use client'

import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";


export default function LoginPage() {

    const { error, loginUser, } = useAuth();
    
    const [values, setValues] = useState({
        identifier: '',
        password: '',
    });

    useEffect(() => {
        if (error) {
            toast.error(error.message);
        }
    }, [error]);

    const handleInputChange = (e: { target: { name: any; value: string; }; }) => {

        // the 'name' property in each input allows state to be changed with one function.
        const {name, value} = e.target
        // spread operator across values, update state with the value of target.
        setValues({...values, [name]: value})
    }

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        const hasEmptyFields = Object.values(values).some((element) => element === '')
  
        if(hasEmptyFields) {
        
            toast.error("Empty fields!")
            return
        } 

        else {
            const user = {
                identifier: values.identifier,
                password: values.password,
            };

            loginUser(user)
        }
    }
    

    return (
    
    <div className='w-full h-screen md:w-1/2 m-auto p-1 md:p-6 shadow-xl flex flex-col justify-center items-center'>
            <h1 className='flex items-center text-2xl'>
                <FaUser /> Log In
            </h1>

            <ToastContainer />

            

            <form className='w-full px-2' onSubmit={handleLogin}> 
                <div className='flex flex-col my-2'>
                    <label className='font-bold mb-2' htmlFor='email'>Email</label>
                    <input className='bg-slate-500 h-4 p-4 rounded w-full text-white' type='email' id='email' name='identifier' value={values.identifier} onChange={handleInputChange}/>
                </div>

                <div className='flex flex-col my-2'>
                    <label className='font-bold mb-2' htmlFor='password'>Password</label>
                    <input className='bg-slate-500 h-4 p-4 rounded w-full' type='password' id='password' name="password" value={values.password} onChange={handleInputChange}/>
                </div>

                <button type='submit' value='Login' className='btn my-4 w-full'>Login</button>
            </form>

            <p className='my-2'>Don&apos;t have an account? <Link className='underline' href='/register'>Register</Link></p>
        </div>
  )
}