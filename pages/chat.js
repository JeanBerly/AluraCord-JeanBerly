import configs from '../config.json';
import React from 'react';
const colors = configs.theme.colors;
export default function chatPage() {
    const idMsg = 0;
    const [message, setMessage] = React.useState('');
    const [chatHistory, setChatHistory] = React.useState([]);
    let bloh = chatHistory.map((msg) => {
        const imgGit = `https://github.com/${msg.user}.png`;
        return (
            <>
                <div key={msg.id} >
                    <img src={imgGit}></img><span>{msg.user} {msg.date}</span>
                    <button value={msg.id} onClick={(event) => {
                        let aux = chatHistory.filter((msg) => {
                            return (!((msg.id) == event.target.value));
                        });
                        setChatHistory([
                            ...aux,
                        ]);
                    }} >X</button>
                    <p>{msg.text}</p>
                </div>
                <style jsx>{`
                    div{
                        display: block;
                        position: relative;
                        height: 10%;
                        min-height: fit-content;
                    }
                    img{
                        position: relative;
                        height: 2rem;
                        border-radius: 50%;
                    }
                    span{
                        position: absolute;
                        top: 0.5rem;
                        overflow-y: auto;
                    }
                    p{
                        position: relative;
                        min-height: fit-content;
                    }
                    button{
                        display: block;
                        width: 30px;
                        height: 30px;
                        position: absolute;
                        top: 0;
                        right: 0;
                        background-color: red;
                    }
                `}</style>
            </>
        )
    });
    function handleNewMessage(newMessage) {
        const message = {
            id: Date.now(),
            user: 'JeanBerly',
            text: newMessage,
            date: '15/12/2022'
        }
        setChatHistory([
            ...chatHistory,
            message
        ]);
    }
    return (
        <>
            <ChatBox>
                <Header></Header>
                <Chat chatHistory={chatHistory}>
                    {bloh}
                </Chat>
                <Footer handleNewMessage={handleNewMessage}></Footer>
            </ChatBox>
        </>
    )
}
function ChatBox(props) {
    return (
        <>
            <div>{props.children}</div>
            <style jsx>{`
                div{
                    display: flex;
                    position: absolute;
                    align-items: center;
                    position: relative;
                    flex-direction: column;
                    background-color: ${colors.neutrals[800]};
                    width: 90vw;
                    height: 85vh;
                }
            `}</style>
        </>
    )
}
function Header(props) {
    return (
        <>
            <header>
                <span>Chat</span>
                <span>Logout</span>
            </header>
            <style jsx>{`
                *{
                    color: white;
                }
                header{
                    display: flex;
                    position: relative;
                    width: 95%;
                    position: relative;
                }
                span{
                    font-size: 1.2rem;
                }
                span:first-of-type{
                    display: inline-block;
                    padding: 10px;
                    margin-right: auto;
                }
                span:nth-child(2){
                    padding: 10px;
                    display: inline-block;
                }
                span:nth-child(2):hover{
                    cursor: pointer;
                    background-color: rgba(255, 255, 255, 0.3);
                }
            `}</style>
        </>
    )
}
function Chat(props) {
    return (
        <>
            <main>{props.children}</main>
            <style jsx>{`
                main{
                    display: flex;
                    position: relative;
                    flex-direction: column;
                    color: white;
                    width: 95%;
                    height: 85%;
                    background-color: ${colors.neutrals[700]};
                    border-radius: 20px;
                    margin: auto 0;
                    min-height: fit-content;
                    overflow-y: auto;
                }
            `}</style>
        </>
    )
}
function Footer(props) {
    return (
        <>
            <footer>
                <input id="textoMsg" type="text" placeholder="Enter your message here" onKeyPress={(event) => {
                    if (event.key == 'Enter') {
                        const str = event.target.value
                        if (!(str.length == 0)) {
                            const newMessage = event.target.value;
                            props.handleNewMessage(newMessage);
                        }
                        event.target.value = '';
                    }
                }} ></input>
                <button onClick={() =>{
                    const msg = document.getElementById("textoMsg");
                    if (!(msg.value.length == 0)){
                        props.handleNewMessage(msg.value);
                        msg.value = '';
                    }
                }} id="buttonEmojis">Send</button>
            </footer>
            <style jsx>{`
                footer{
                    display: flex;
                    position: sticky;
                    bottom: 0;
                    justify-content: space-around;
                    align-items: center;
                    width: 95%;
                    height: 10%;
                    margin: auto 0;
                }
                input[type="text"]{
                    display: block;
                    margin-right: auto;
                    color: white;
                    font-size: 1.5rem;
                    width: 90%;
                    height: 100%;
                    border-radius: 20px;
                    background-color: ${colors.neutrals[900]};
                    overflow-wrap: scroll;
                }
                #buttonEmojis{
                    display: block;
                    position: relative;
                    width: calc(15px + 3.5vmax);
                    height: calc(15px + 3.5vmax);
                    margin-right: auto;
                    border-radius: 50%;
                    color: black;
                    font-size: calc(7.5px + 1vmax);
                }
                #buttonEmojis:hover{
                    cursor: pointer;
                }
            `}</style>
        </>
    )
}