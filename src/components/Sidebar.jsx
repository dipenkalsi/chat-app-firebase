import { Add, ExitToApp, Home, PeopleAlt, SearchOutlined, Message } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React, { useState } from 'react'
import SidebarTab from './SidebarTab'
import SidebarList from './SidebarList'
import { useRouter } from 'next/navigation'
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
import { auth, db } from '@/utils/firebase'
import useRooms from '@/hooks/useRooms'
import useUsers from '@/hooks/useUsers'
import useChats from '@/hooks/useChats'

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
  const router = useRouter()
  const [menu, setMenu] = useState(1);

  //hook calls
  const rooms = useRooms();
  const users = useUsers(user);
  const chats = useChats(user)


  // states
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [searchResults, setSearchResults] = useState([])
  const [roomName, setRoomName] = useState('');


  async function searchRoomsAndUsers(event){
      event.preventDefault();
      const searchValue = event.target.elements.search.value
      const userQuery = query(collection(db, 'users'), where('name', '==', searchValue));
      const roomQuery = query(collection(db, 'rooms'), where('name', '==', searchValue));
      const userSnapshot = await getDocs(userQuery);
      const roomSnapshot = await getDocs(roomQuery);
      const userResults = userSnapshot?.docs.map(doc=>{
        const id = doc.id > user.uid? `${doc.id}${user.uid}` : `${user.uid}${doc.id}`
        return {id, ...doc.data()};
      })
      const roomResults = roomSnapshot?.docs.map(doc =>({
        id:doc.id,
        ...doc.data()
      }))
      const searchResults = [...userResults, ...roomResults]
      setMenu(4);
      setSearchResults(searchResults)
  }

  async function createRoom(){
    if(roomName?.trim()){
      if(roomName===''){
        alert('Room name cannot be empty');
        return;
      }
      const roomsRef = collection(db, 'rooms');
      const newDoc = await addDoc(roomsRef,{
        name: roomName,
        timestamp: serverTimestamp()
      })
      setIsCreatingRoom(false);
      setRoomName('');setMenu(2);
      router.push(`/?roomId=${newDoc.id}`)
    }
  }

  return (
    <div className='sidebar bg-gray-800'>
      <div className='sidebar__header'>
        <div className='sidebar__header--left'>
          <Tooltip title={user.displayName} postion='bottom' >
            <Avatar src={user.photoURL} alt={user.displayName}/>
          </Tooltip>
            <div className='flex flex-col items-start justify-start'>
            <h4 className='text-xl'>{user.displayName}</h4>
            <p className='text-xs ml-2.5 text-gray-500'>{user.email}</p>
            </div>
        </div>
        <div className='sidebar__header--right'>
          <Tooltip title='Log out'>
          <IconButton>
                <ExitToApp onClick={()=>auth.signOut()}/>
            </IconButton>
          </Tooltip>   
        </div>
      </div>

      {/* search */}
      <div className='sidebar__search'>
        <form className='sidebar__search--container' onSubmit={searchRoomsAndUsers}>
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
        <SidebarList title='Chats' data={chats}/>
      ):menu ===2?(
        <SidebarList title='Rooms' data={rooms}/>
      ):menu ===3?(
        <SidebarList title='People' data={users}/>
      ):menu ===4?(
        <SidebarList title='Search results' data={searchResults}/>
      ):null
      }

      {/* create room */}
      <div className='sidebar__chat--addRoom' onClick={() => setIsCreatingRoom(true)}>
        <Tooltip title='Create new' position='top'>
        <IconButton>
          <Add/>
        </IconButton>
        </Tooltip>
      </div>

      {/* create room dialog */}
      <Dialog maxWidth='sm' open={isCreatingRoom} onClose={() => setIsCreatingRoom(false)}>
        <DialogTitle fontSize='xl'>Create a new room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This room is going to be public by default. Any user can see and join this room.
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="roomName"
            label="Room name"
            type="text"
            fullWidth
            color='success'
            onChange={(e)=>setRoomName(e.target.value)}
            value={roomName}
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreatingRoom(false)}color='error' variant='outlined'>Cancel</Button>
          <Button onClick={createRoom} color='success' variant='outlined'>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Sidebar
