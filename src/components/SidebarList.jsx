import React from 'react'

const SidebarList = ({title, data}) => {
    if(!data){
        return( 
        <div className='loader__container sidebar__loader'>

        </div>
        )
    }
  return (
    <div className='sidebar__chat--container'>
      <h2 className='text-xl text-green-700'>{title}</h2>
    </div>
  )
}

export default SidebarList
