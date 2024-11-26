'use client'

import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input, Button, Card, CardHeader, CardBody, Spacer } from '@nextui-org/react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';


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
            toast.error("Please fill in all fields")
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
    <div className='w-full h-screen flex justify-center items-center'>
      <Card className='w-full md:w-1/2 p-6 shadow-xl'>
        <CardHeader className='flex justify-center'>
          <h1 className='flex items-center text-2xl'>
            <FaUser className='mr-2' /> Log In
          </h1>
        </CardHeader>
        <CardBody>
          <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
             />
          <form className='w-full' onSubmit={handleLogin}>
            <Input
              isClearable
              fullWidth
              color="primary"
              size="lg"
              placeholder="Email"
              type='email'
              id='email'
              name='identifier'
              value={values.identifier}
              onChange={handleInputChange}
              className='my-2'
            />
            <Spacer y={1} />
            <Input
              isClearable
              fullWidth
              color="primary"
              size="lg"
              placeholder="Password"
              type='password'
              id='password'
              name="password"
              value={values.password}
              onChange={handleInputChange}
              className='my-2'
            />
            <Spacer y={1} />
            <Button type='submit' className='w-full' color="primary" size="lg">
              Login
            </Button>
          </form>
          <Spacer y={1} />
        </CardBody>
      </Card>
    </div>
  );
}