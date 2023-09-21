'use client'
import Login from '@/components/Login'
import Sidebar from '@/components/Sidebar';
import useAuthUser from '@/hooks/useAuthUser'
import Image from 'next/image'

export default function Home() {
  const user = useAuthUser();
  return (
    <div>
      { !user ?
      <Login/>:
      <div className='bg-gray-300 h-screen w-screen app'>
        <div className='app__body'>
          <Sidebar user = {user}/>
        </div>
      </div>
      }
    </div>
  )
}
