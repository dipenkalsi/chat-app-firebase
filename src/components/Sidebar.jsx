import { Add, ExitToApp, Home, PeopleAlt, SearchOutlined, Message } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React, { useState } from 'react'
import SidebarTab from './SidebarTab'
import SidebarList from './SidebarList'

const tabs = [
  {
    id:1,
    icon: <Home/>
  },
  {
    id:2,
    icon: <Message/>
  },
  {
    id:3,
    icon: <PeopleAlt/>
  },
]

const Sidebar = ({user}) => {
  const [menu, setMenu] = useState(1);
  const data = [{
    id:1,
    name:'John Doe',
    photoURL:'https://lh3.googleusercontent.com/a/ACg8ocLoOSGvFqWhyyvoYFkEh9djqT4iB2zhoUTwfsCnsDqsKrE=s96-c'
  }]
  return (
    <div className='sidebar bg-gray-800'>
      <div className='sidebar__header'>
        <div className='sidebar__header--left'>
            <Avatar src={user.photoURL} alt={user.displayName}/>
            <div className='flex flex-col items-start justify-start'>
            <h4 className='text-xl'>{user.displayName}</h4>
            <p className='text-xs ml-2.5 text-gray-500'>{user.email}</p>
            </div>
        </div>
        <div className='sidebar__header--right'>
            <IconButton>
                <ExitToApp/>
            </IconButton>
        </div>
      </div>

      {/* search */}
      <div className='sidebar__search'>
        <form className='sidebar__search--container'>
            <SearchOutlined/>
            <input type="text" 
            id='search' placeholder='Search for users or rooms'/>
        </form>
      </div>

      <div className='sidebar__menu'>
        {tabs.map((tab)=>(
          <SidebarTab key={tab.id} onClick={()=>setMenu(tab.id)} isActive={tab.id===menu}>
            <div className='sidebar__menu--home'>
              {tab.icon}
              <div className='sidebar__menu--line'/>
            </div>
          </SidebarTab>
        ))}
      </div>

      {menu===1?(
        <SidebarList title='Chats' data={data}/>
      ):menu ===2?(
        <SidebarList title='Rooms' data={data}/>
      ):menu ===3?(
        <SidebarList title='People' data={data}/>
      ):menu ===4?(
        <SidebarList title='Search results' data={data}/>
      ):null
      }

      {/* create room */}
      <div className='sidebar__chat--addRoom'>
        <IconButton>
          <Add/>
        </IconButton>
      </div>
    </div>
  )
}

export default Sidebar
