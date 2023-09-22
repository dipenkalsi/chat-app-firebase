import React from 'react'
import SidebarListItem from './SidebarListItem'
import { CircularProgress } from '@mui/material'
import { CancelOutlined, SearchOutlined } from '@mui/icons-material'
const SidebarList = ({title, data}) => {
    if(!data){
        return( 
        <div className='loader__container sidebar__loader'>
            <CircularProgress color='success'/>
        </div>
        )
    }

    if(data.length===0){
      return(
        <div className='no-result'>
            <div>
              <SearchOutlined/>
              <div className='cancel-root'>
                <CancelOutlined/>
              </div>
            </div>
            <h2>No {title}</h2>
        </div>
      )
    }

  return (
    <div className='sidebar__chat--container'>
      <h2 className='text-xl text-green-700'>{title}</h2>
      {data.map(item=>(
        <SidebarListItem key={item.id} item = {item} />
      ))}
    </div>
  )
}

export default SidebarList
