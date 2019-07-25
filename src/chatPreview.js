import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://10.79.36.85:8000');
const Preview = () => {

const [text, setText] = useState(['Here your Sent messages  will come, Start by typing your name']);
const [recievedMessage, setRecievedMessage] = useState(['Recieved Message'])

const openSocket = () => client.onopen = () => {
    console.log('WebSocket Client Connected');
};

useEffect(() => {
    console.log('herer', client)
    openSocket();
}, []);
client.onmessage = (message) => {
    console.log('include', text, message.data,text.includes(message.data))
    if(!text.includes(message.data)) {
    setRecievedMessage([...recievedMessage, JSON.stringify(message.data)]);
    console.log('recieved msgs', recievedMessage);
    }
};
function handleEnterEvent(event) {
    console.log(' ia m here', event)
    if(event.key === 'Enter') {
    const existingValues = text;
    setText([...existingValues, event.target.value]);
    client.send(event.target.value)
    }
}

return (<div style={{display: 'grid'}}> 
    {
        text.map(txt => <div> {txt} </div>)
    }
    <br />
    recieved message:
    {
        recievedMessage.map(txt => <div> {txt} </div>)
    }
    <br/>
    <input type="text" name="Chat" placeholder="Type Here !As if it wasn't obvious" onKeyPress={(event) => handleEnterEvent(event)}></input> </div>)}

export default Preview;