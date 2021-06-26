import "./SidebarChat.css"
import { Avatar } from '@material-ui/core';
import { React, useState, useEffect } from 'react'
import db from "./firebase.js";
import { Link } from "react-router-dom"


function SidebarChat({ id, name, addNewChat }) {

    const [seed, setSeed] = useState();
    const [message, setMessage] = useState([]);

    useEffect(() => {
        db.collection("rooms").doc(id).collection("message").orderBy("timestamp", "desc")
            .onSnapshot(snap => {
                setMessage(snap.docs.map(doc => doc.data()))
            })
    }, [id])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    function handleClick() {
        const newPerson = prompt("Enter the name of the Room?")
        if (newPerson) {
            db.collection("rooms").add({
                name: newPerson
            })
        }

    }

    return (
        !addNewChat ?
            (
                <Link to={`/rooms/${id}`}>

                    <div className="sidebar_chat">
                        <Avatar src={`https://avatars.dicebear.com/api/human/:${seed}.svg`} />
                        <div className="sidebar_chatInfo">
                            <h1>{name}</h1>
                            <p>{message[0]?.message}</p>

                        </div>

                    </div>
                </Link>
            )
            :
            (<div onClick={handleClick} className="sidebar_chat">
                <h2> Add New Chat</h2>

            </div>)
    )
}

export default SidebarChat
