import React from 'react'
import Link from 'next/link'
import { Avatar } from '@mui/material'
const SidebarListItem = ({item}) => {
  return (
    <div>
      <Link className='link' href={`/roomId=${item.id}`}>
        <div className='sidebar__chat'>
            <div className='avatar__container'>
                <Avatar src={item.photoURL || `https://avatars.dicebear.com/api/jdenticon/${item.id}.svg`} 
                style={{width:45, height:45}}/>
            </div>
            <div className='sidebar__chat--info'>
                <h2>{item.name}</h2>
            </div>
        </div>
      </Link>
    </div>
  )
}

export default SidebarListItem
