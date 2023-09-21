import React from 'react'

const SidebarTab = ({onClick, isActive, children}) => {
  return (
    <div className={`${isActive ? 'sidebar__menu--selected':''}`} onClick={onClick}>
      {children}
    </div>
  )
}

export default SidebarTab
