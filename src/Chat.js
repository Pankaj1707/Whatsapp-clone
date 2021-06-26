import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from "react-router-dom";
import db from "./firebase.js";
import { useStateValue } from './StateProvider';
import firebase from "firebase";


function Chat() {
    const [{ user }, dispatch] = useStateValue();
    const [seed, setState] = useState();
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [message, setMessage] = useState([]);


    useEffect(() => {
        if (roomId) {
            db.collection("rooms").doc(roomId).onSnapshot(snap =>
                setRoomName(snap.data().name))


            db.collection("rooms").doc(roomId).collection("message")
                .orderBy("timestamp", "asc").onSnapshot(snap => {
                    setMessage(
                        snap.docs.map(doc => doc.data())
                    )
                })
        }



    }, [roomId])

    useEffect(() => {
        setState(Math.floor(Math.random * 5000));
    }, [roomId])


    function handleClick(e) {
        e.preventDefault();
        db.collection("rooms").doc(roomId).collection("message").add({
            name: user.displayName,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput("");

    }


    return (
        <div className="chat">
            <div className="chat_header">
                <IconButton>
                    <Avatar src={`https://avatars.dicebear.com/api/human/:${seed}.svg`} />
                </IconButton>
                <div className="chat_personInfo">
                    <h1>{roomName}</h1>
                    <p> {new Date(message[message.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>

                </div>
            </div>
            <div className="chat_body">
                {message.map(mess => (
                    <div className={`chat_message ${mess.name === user.displayName && "chat_reciever"}`}>
                        <span className="chat_name">
                            {mess.name}
                        </span>
                        <span className="chat_mess">
                            {mess.message}
                        </span>
                        <span className="chat_timestamp">
                            {new Date(mess.timestamp?.toDate()).toUTCString()}
                        </span>
                    </div>
                ))}


            </div>
            <div className="chat_footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="type message here"></input>
                    <button onClick={handleClick} type="submit">Send message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
