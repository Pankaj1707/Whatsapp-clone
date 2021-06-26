import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { SearchOutlined } from '@material-ui/icons';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SidebarChat from "./SidebarChat";
import db from './firebase';
import { useStateValue } from './StateProvider';


function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        db.collection("rooms").onSnapshot(snap => {
            setRooms(
                snap.docs.map((doc) => {
                    return {
                        id: doc.id,
                        data: doc.data()
                    }
                })
            )
        })
    }, [])


    return (

        <div className="sidebar">

            <div className="sidebar_header">
                <IconButton>

                    <Avatar src={user.photoURL} />
                </IconButton>

                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>

                </div>

            </div>


            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input placeholder="search here" type="text"></input>
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat addNewChat />
                {rooms.map(room => {
                    return <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                })}



            </div>

        </div>
    )
}

export default Sidebar
