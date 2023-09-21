import { ExitToApp, SearchOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React from 'react'

const Sidebar = ({user}) => {
  return (
    <div className='sidebar bg-gray-800'>
      <div className='sidebar__header'>
        <div className='sidebar__header--left'>
            <Avatar src={user.photoURL} alt={user.displayName}/>
            <h4 className='text-xl'>{user.displayName}</h4>
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

      {/* create room */}

    </div>
  )
}

export default Sidebar
