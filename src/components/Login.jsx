'use client'
import React from 'react'
import {BiLogoFirebase} from 'react-icons/bi'
import { Button } from '@material-tailwind/react'
import {useSignInWithGoogle} from 'react-firebase-hooks/auth'
import { auth } from '@/utils/firebase'
const Login = () => {
    const [signInWithGoogle] = useSignInWithGoogle(auth);
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center bg-gray-300'>
      <p className='text-5xl uppercase'>Chat App</p>
      <div className='text-sm text-gray-600 flex space-x-1'>
        <p>powered by</p>
        <span className='flex items-center justify-center text-orange-600'>
            <BiLogoFirebase/>
            <p className=''>Firebase</p>
        </span>
      </div>
      <Button onClick={()=>signInWithGoogle()} className='font-light px-5 py-3 mt-6'>Sign In with Google</Button>
      <div className='fixed bottom-0 p-3 text-xs text-gray-700'>
        Copyright &copy; Dipen Kalsi, 2023.
      </div>
    </div>
  )
}

export default Login
